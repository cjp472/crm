package com.ulane.core.plugin.soap.impl;

import java.util.List;

//import javax.jws.WebService;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.RegionService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.core.plugin.soap.GongDanSoapServer;
import com.ulane.customer.dao.customer.CsOrderDao;
import com.ulane.customer.model.customer.CsOrder;
import com.ulane.customer.service.customer.CsOrderService;

//@WebService(StringBuffer str = new StringBuffer("{'tarId':1,'tarTopic': 1,'tarContent':'中国','remark':null,'creDat':'2012','updUseId':1,'updDat':null,'staId':1,'tarCatId':1}" );)
//@WebService
public class GongDanSoapServerImpl implements GongDanSoapServer{
	Logger logger = Logger.getLogger(GongDanSoapServerImpl.class);//?
	
	private CsOrder csOrder;//声明实体类CsOrder对象的变量
	
	private FlowRunInfo flowRunInfo = new FlowRunInfo();
	
	public CsOrder  getCsOrder(){
		return csOrder;
	}

	@Override
	public String addGongDan(String xmlStr) {
		// TODO Auto-generated method stub
//		System.out.println(">>>>>KYQ>>>>>>>xmlStr="+xmlStr);//判断xmlStr参数有没有传过来
		//分两步
		//		String ud=xmlStr.substring("UlDepartment");
		//		csOrder.setUlDepartment(ulDepartmentService.getByNo(ud));
		Gson gson = new Gson();
		AppUser auser = null;
		csOrder = gson.fromJson(xmlStr, CsOrder.class);//?CsOrder.class指定对象的类型，
		CsOrderDao csOrderDao = (CsOrderDao)AppUtil.getBean("csOrderDao");
		CsOrderService csOrderService = (CsOrderService)AppUtil.getBean("csOrderService");
		AppUserService appUserService = (AppUserService)AppUtil.getBean("appUserService");
		RegionService regionService = (RegionService) AppUtil.getBean("regionService");
		UlDepartmentService ulDepService = (UlDepartmentService)AppUtil.getBean("ulDepartmentService");
		
		StringBuffer buff = new StringBuffer(); //页面输出参数，对结果进行反馈
		//保存工单信息
	 
			if (csOrder.getOrderId() == null || csOrder.getOrderId().equals("")){
//			 从json串中获得appUser-employeeid值、UlDepartment-depNo值、Region-areaNo值
				String eid = csOrder.getAppUserNo();
				String rno = csOrder.getRegionNo();
				String udno = csOrder.getUlDepartmentNo();
//				String eid = csOrder.getAppUser().getEmployeeid();
//				String rno = csOrder.getRegion().getAreaNo();
//				String udno = csOrder.getUlDepartment().getDepNo();
				//员工
				if(eid != null){
					// 从数据库里查询与json串相对应的appUser的id值
					QueryFilter filter = new QueryFilter();
					filter.addFilter("Q_employeeid_S_EQ", eid);
					List<AppUser> ausers = appUserService.getAllNoRequest(filter);
					auser = ausers.get(0);
					csOrder.setAppUser(auser);//set AppUser 对象
				}
				//区域
				if(rno != null){
					// 从数据库里查询与json串相对应的Region的id值
					QueryFilter filter1 = new QueryFilter();
					filter1.addFilter("Q_areaNo_S_EQ", rno);
					List<Region> regs = regionService.getAllNoRequest(filter1);
					Region reg  = regs.get(0);
					csOrder.setRegion(reg);//set Region 对象
				}
				//部门
				if(udno != null){
					// 从数据库里查询与json串相对应的UlDepartment的id值
					QueryFilter filter2 = new QueryFilter();
					filter2.addFilter("Q_depNo_S_EQ", udno);
					List<UlDepartment> ulds = ulDepService.getAllNoRequest(filter2);
					UlDepartment uld = ulds.get(0);
					csOrder.setUlDepartment(uld);
				}
			
				csOrder = csOrderService.save(csOrder);//对数据进行保存
			}
		  
		if (csOrder != null){
			try {
				//添加工单流程启动  by wangzj
				Short orderType = csOrder.getOrderType();
				if(orderType == 1){
					flowRunInfo.setDefId("10260");
				} else if(orderType == 2){
					flowRunInfo.setDefId("10280");
				}
				flowRunInfo.setCustomDate(true);
				flowRunInfo.setStartFlow(true);
				flowRunInfo.setUseTemplate(true);
				flowRunInfo.setAfterHandler("csOrderService.saveSoapRunId");
				flowRunInfo.setPreHandler("csOrderService.saveSoapHeadId");
				flowRunInfo.setFlowResponseTime(csOrder.getResponseTime());
				flowRunInfo.setFlowCompletionTime(csOrder.getCompletionTime());
				flowRunInfo.setPkId(csOrder.getOrderId().toString());
				flowRunInfo.setCsOrderType(orderType.toString());
				
				String destName = "";
				if(flowRunInfo.getDefId() != null && !flowRunInfo.getDefId().equals("")){
					String result = csOrderService.startTrans(new Long(flowRunInfo.getDefId()));
//					Transform transform = gson.fromJson(result, Transform.class);
//					destName = transform.getDestination();
//					result = result.substring(1, result.length()-1);
					
//					JSONObject jsonObj = JSONObject.fromObject(result);
//					destName = jsonObj.getString("destination");
					
					destName = result;
					flowRunInfo.setDestName(destName);
				}
				if(!destName.equals("")){
					String userStr = csOrderService.users(new Long(flowRunInfo.getDefId()), destName, auser.getUserId());
//					JSONObject jsonObj = JSONObject.fromObject(userStr);
//					String userIds = jsonObj.getString("userIds");
					
					String flowAssignId = destName + "|" + userStr;
					flowRunInfo.setdAssignId(flowAssignId);
				}
				String retStr = csOrderService.saveSoapStart(flowRunInfo,csOrder.getAppUser());
				if(retStr.equals("success")){
					buff.append("{success:true,'orderId':"+ csOrder.getOrderId() + ",msg:'操作成功!'}");
				} else if(retStr.equals("failure")) {
					buff.append("{success:false,'orderId':"+ csOrder.getOrderId() + ",msg:'启动工单流程失败!'}");
					csOrderService.remove(csOrder);
				} else {
					buff.append("{success:false,'orderId':"+ csOrder.getOrderId() + ",msg:'未知错误!'}");
					csOrderService.remove(csOrder);
				}
			} catch (Exception e) {
				e.printStackTrace();
				csOrderService.remove(csOrder);
			}
		}else {
			buff.append("{success:false,msg:'操作失败!请联系管理员'}");
		}
		
		return buff.toString();
	}
}
