package com.ulane.callout.action.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.service.customer.CustomerService;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.service.outb.ObConCalllistService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObConCalllistAction extends BaseAction{
	@Resource
	private ObConCalllistService obConCalllistService;
	private ObConCalllist obConCalllist;
	@Resource
	private UlEmployeeService ulEmployeeService;	
	@Resource
	private CustomerService customerService;
	private Long cusId;

	public Long getCusId() {
		return cusId;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	public ObConCalllist getObConCalllist() {
		return obConCalllist;
	}

	public void setObConCalllist(ObConCalllist obConCalllist) {
		this.obConCalllist = obConCalllist;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ObConCalllist> list= obConCalllistService.getAll(filter);
		
		Type type=new TypeToken<List<ObConCalllist>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				obConCalllistService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ObConCalllist obConCalllist=obConCalllistService.get(cusId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(obConCalllist));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obConCalllist.getCusId()==null){
			obConCalllistService.save(obConCalllist);
		}else{
			ObConCalllist orgObConCalllist=obConCalllistService.get(obConCalllist.getCusId());
			try{
				BeanUtil.copyNotNullProperties(orgObConCalllist, obConCalllist);
				obConCalllistService.save(orgObConCalllist);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 名单管理——>导入批次——>批次导入详细——>批次名单列表
	 * @return
	 */
	public String listConCalllist() throws Exception{
		String id=getRequest().getParameter("calllistId");
		if(id!=null&&!id.equals("")&&!id.equals("undefined")) {
//			long calllistId =Long.valueOf(id);
//			int start=Integer.valueOf(getRequest().getParameter("start"));
//			int limit=Integer.valueOf(getRequest().getParameter("limit"));
//			List<ObConCalllist> list =obConCalllistService.findConCalllist(calllistId,callbatchNam,start,limit);
//			long count=obConCalllistService.getCount(calllistId,callbatchNam);
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_obCallbatch.obCalllist.calllistId_L_EQ", id);
			String callbatchNam=getRequest().getParameter("callbatchNam");
			if(callbatchNam!=null) {
				callbatchNam=new String(callbatchNam.getBytes("iso8859-1"),"utf-8");
				filter.addFilter("Q_obCallbatch.callbatchNam_S_LK", callbatchNam);
			}
			List<ObConCalllist> list =obConCalllistService.getAll(filter);
			if(list!=null&&list.size()>0) {
				for(ObConCalllist conCalllist:list) {
					if(conCalllist.getExt1()!=null&&!conCalllist.getExt1().equals("")) {
						UlEmployee employee=ulEmployeeService.getEmployeeByUserNo(conCalllist.getExt1());
						if(employee!=null&&employee.getFullname()!=null)
						    conCalllist.setFullname(employee.getFullname());
					}
						
				}
				StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems())
				.append(
				",result:");
				JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		        buff.append(jsonSer
		        		.include("nameCn","cusCode","age", "gender", "credTypId", "birthday",
								"credNum",  "fullname")
				        .exclude("*")
				        .serialize(list));					
				
				//buff.append(jsonSer.serialize(list));
				buff.append("}");
				
				jsonString = buff.toString();
			}
			
		}
		return SUCCESS;
	}	
	
	public String listConCalllistByToCallbatch() {
		String toCallbatchId=getRequest().getParameter("toCallbatchId");
		String staDat=getRequest().getParameter("staDat");		
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_obCallbatch.callbatchId_L_EQ", toCallbatchId);
		filter.addFilter("Q_creDat_D_EQ", staDat);
		List<ObConCalllist> list =obConCalllistService.getAll(filter);
		
		if(list!=null&&list.size()>0) {
			for(ObConCalllist conCalllist:list) {
				if(conCalllist.getExt1()!=null&&!conCalllist.getExt1().equals("")) {
					UlEmployee employee=ulEmployeeService.getEmployeeByUserNo(conCalllist.getExt1());
					if(employee!=null&&employee.getFullname()!=null)
					    conCalllist.setFullname(employee.getFullname());
				}
			}
		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		
		buff.append(jsonSer.serialize(list));
		buff.append("}");
		jsonString=buff.toString();		
		return SUCCESS;	
	}
	
	/**
	 * 从呼叫记录表中读取客户基础信息
	 * @return
	 */
	public String getBaseCusInfo() {
		String cusId = getRequest().getParameter("cusId");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_customerId_L_EQ", cusId);
		List<ObConCalllist> list = obConCalllistService.getAll(filter);
		if(null!=list && list.size()>0) {
			HashMap<String,String> row = new HashMap<String,String>();
			if(null!=list.get(0)) {
				//从呼叫名单表中读取数据
				row.put("cusId", String.valueOf(list.get(0).getCustomerId()));						//客户内码
				
				//从基础客户表 中读取数据
				if(null!=list.get(0).getCusId()) {
					Customer cus = customerService.get(list.get(0).getCustomerId());				//
					if(null!=cus) {
						row.put("isMail", String.valueOf(cus.getIsMail()));					//发送邮件
						row.put("happyCall", String.valueOf(cus.getHappyCall()));			//happy_call
						row.put("isDm", String.valueOf(cus.getIsDm()));						//是否接收DM
					}
					
				}
//							cusPersonal.birthdayType														//生日类型（存在于个人客户表中）
//							cusPersonal.cusFromId															//客户来源（存在于个人客户表中）
				
				row.put("customerNo", list.get(0).getCusCode());					//客户业务编号(用于两个系统之间数据同步)
				row.put("nameCn", list.get(0).getNameCn());								//客户名称
				row.put("gender", list.get(0).getGender());								//客户性别
				row.put("credTypId",String.valueOf(list.get(0).getCredTypId()));		//证件类型
				row.put("credNum", list.get(0).getCredNum());							//证件号码
				row.put("cusGraId", String.valueOf(list.get(0).getCusTypId()));			//客户级别
				row.put("birthday", list.get(0).getBirthday());							//出生日期
				setJsonString(JsonUtil.hsmp2JSON(row));
			}
		}
		return SUCCESS;
	}
}
