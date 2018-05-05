package com.ulane.callout.action.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.model.outb.ObCallbatchImpTmp;
import com.ulane.callout.model.outb.ObCallbatchImpWash;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.service.outb.ObCallbatchAssService;
import com.ulane.callout.service.outb.ObCallbatchImpTmpService;
import com.ulane.callout.service.outb.ObCallbatchImpWashService;
import com.ulane.callout.service.outb.ObCallbatchService;
import com.ulane.callout.service.outb.ObCalllistService;
import com.ulane.callout.service.outb.ObConCalllistService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObCallbatchAction extends BaseAction{
	@Resource
	private ObCallbatchService obCallbatchService;
	@Resource
	private ObConCalllistService obConCalllistService;
	@Resource
	private ObCallbatchAssService obCallbatchAssService;
	@Resource
	private UlEmployeeService ulEmployeeService;
	@Resource
	private ObCallbatchImpWashService obCallbatchImpWashService;
	@Resource
	private ObCalllistService obCalllistService;
	@Resource
	private ObCallbatchImpTmpService obCallbatchImpTmpService;
	
	private ObCallbatch obCallbatch;
	
	private Long callbatchId;

	public Long getCallbatchId() {
		return callbatchId;
	}

	public void setCallbatchId(Long callbatchId) {
		this.callbatchId = callbatchId;
	}

	public ObCallbatch getObCallbatch() {
		return obCallbatch;
	}

	public void setObCallbatch(ObCallbatch obCallbatch) {
		this.obCallbatch = obCallbatch;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		//String staDat=getRequest().getParameter("staDat");
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("staDat", "desc");
		List<ObCallbatch> list= obCallbatchService.getAll(filter);
		
		Type type=new TypeToken<List<ObCallbatch>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
//		List<ObCallbatch> list2=new ArrayList<ObCallbatch>();
//
//		for(ObCallbatch obCallbatch:list) {
//			if(staDat==null||staDat.equals("")) {
//				if(obCallbatch.getStaDat()!=null) {
//					list2.add(obCallbatch);
//				}
//			} else {
//				if((obCallbatch.getStaDat()!=null)&&(obCallbatch.getStaDat().toString().indexOf(staDat)>=0)) {
//					list2.add(obCallbatch);
//				}
//			}
//		}
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
//		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
//		"staDat"});	
        buff.append(jsonSer
        		.include("callbatchId","callbatchNam","callbatchTypId","callbatchSrcId","callbatchRegion","staDat"
						,"endDat","totalCount","inavlidCount","avlidCount","holdCount","callbatchStaId")
		        .exclude("*")
		        .serialize(list));		
		
//		buff.append(jsonSer.serialize(list));
		
		buff.append("}");
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 名单管理——>导入批次——>批次导入详细——>批次名单列表
	 * @return
	 */
	public String listConCalllist() {
		String callbatchId=getRequest().getParameter("callbatchId");
		ObCallbatch callbatch=obCallbatchService.get(Long.valueOf(callbatchId));
		if(callbatch.getCallbatchStaId().equals(ObCallbatch.FLAG_ENABLED)) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_obCallbatch.callbatchId_L_EQ", callbatchId);
			List<ObConCalllist> list = obConCalllistService.getAll(filter);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
			.append(filter.getPagingBean().getTotalItems()).append(
			",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			if(list!=null&&list.size()>0) {
				for(ObConCalllist conCalllist:list) {
					if(conCalllist.getExt1()!=null&&!conCalllist.getExt1().equals("")) {
						UlEmployee employee=ulEmployeeService.getEmployeeByUserNo(conCalllist.getExt1());
						if(employee!=null&&employee.getFullname()!=null)
							conCalllist.setFullname(employee.getFullname());
					}
				}			
			}
			
			buff.append(jsonSer.serialize(list));
			buff.append("}");
			
			jsonString = buff.toString();
		} else if(callbatch.getCallbatchStaId().equals(ObCallbatch.FLAG_UNENABLED)) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_obCallbatch.callbatchId_L_EQ", callbatchId);
			List<ObCallbatchImpTmp> list = obCallbatchImpTmpService.getAll(filter);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
			.append(filter.getPagingBean().getTotalItems()).append(
			",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			if(list!=null&&list.size()>0) {
				for(ObCallbatchImpTmp obCallbatchImpTmp:list) {
					if(obCallbatchImpTmp.getInchargePerson()!=null&&!obCallbatchImpTmp.getInchargePerson().equals("")) {
						UlEmployee employee=ulEmployeeService.getEmployeeByUserNo(obCallbatchImpTmp.getInchargePerson().toString());
						if(employee!=null&&employee.getFullname()!=null)
							obCallbatchImpTmp.setFullname(employee.getFullname());
					}
				}			
			}
			
			buff.append(jsonSer.serialize(list));
			buff.append("}");
			
			jsonString = buff.toString();
		}
		
		
		return SUCCESS;
	}
	
	/**
	 * 名单管理——>导入批次——>批次导入详细——>批次名单列表
	 * @return
	 */
	public String listCusWash() {
		String callbatchID = getRequest().getParameter("callbatchID");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_obCallbatch.callbatchId_L_EQ", callbatchID);
		List<ObCallbatchImpWash> list = obCallbatchImpWashService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		
		buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
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
				//批次列表：如果状态为未启用，那么删除，如果状态是启用，则改为关闭
				ObCallbatch obCallbatch=obCallbatchService.get(new Long(id));
				if(ObCallbatch.FLAG_UNENABLED.equals(obCallbatch.getCallbatchStaId())) {
					List<ObCallbatchImpTmp> listImpTmps=obCallbatchImpTmpService.listImpTmpsByCallbathId(obCallbatch.getCallbatchId());
					if(listImpTmps!=null&&listImpTmps.size()>0) {
						for(ObCallbatchImpTmp obCallbatchImpTmp:listImpTmps) {
							obCallbatchImpTmpService.remove(obCallbatchImpTmp);
						}
					}
					obCallbatchService.remove(new Long(id));
				} else if(ObCallbatch.FLAG_ENABLED.equals(obCallbatch.getCallbatchStaId())) {
					obCallbatch.setCallbatchStaId(ObCallbatch.FLAG_INVALID);
					obCallbatchService.merge(obCallbatch);
				}
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
		ObCallbatch obCallbatch=obCallbatchService.get(callbatchId);
		Set<ObCom> obComs=obCallbatch.getObCalllist().getObComs();
		String comNam=null;
		if(obComs!=null&&obComs.size()>0) {
			for(ObCom obCom:obComs) {
				comNam=obCom.getObComNam();
				break;
			}
		}
		obCallbatch.setComNam(comNam);
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(jsonSer.serialize(obCallbatch));
		sb.append("}");
		
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obCallbatch.getCallbatchId()==null){
			obCallbatchService.save(obCallbatch);
		}else{
			ObCallbatch orgObCallbatch=obCallbatchService.get(obCallbatch.getCallbatchId());
			try{
				BeanUtil.copyNotNullProperties(orgObCallbatch, obCallbatch);
				obCallbatchService.save(orgObCallbatch);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 批量和单个启用
	 * @return
	 */
	public String multiEnable(){
		
		String[]ids=getRequest().getParameterValues("ids");						//批量启用
		String callbatchId = getRequest().getParameter("callbatchId");			//单个启用
		
		String calllistResouce = getRequest().getParameter("calllistResouce");
		
		if(ids!=null){
			for(String id:ids){
				ObCallbatch obCallbatch=obCallbatchService.get(new Long(id));
				obCallbatch.setCallbatchStaId(ObCallbatch.FLAG_ENABLED);
				obCallbatchService.save(obCallbatch);
				obCalllistService.transfterCusTmp2Customer(obCallbatch);
			}
		}
		if(callbatchId != null && callbatchId != ""){
			ObCallbatch obCallbatch=obCallbatchService.get(new Long(callbatchId));
			obCallbatch.setCallbatchStaId(ObCallbatch.FLAG_ENABLED);
			obCallbatchService.save(obCallbatch);
			obCalllistService.transfterCusTmp2Customer(obCallbatch);

		}
		jsonString="{success:true}";
		
		return SUCCESS;
	}	
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////名单清洗			////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
	public String listClearnView(){
		QueryFilter filter = new QueryFilter(getRequest());
		PagingBean pagBean = filter.getPagingBean();
		Map<String,String> param = new HashMap<String,String>();
		param.put("clearnTyp", getRequest().getParameter("clearnTyp"));
		param.put("startTime", getRequest().getParameter("startTime"));
		param.put("endTime", getRequest().getParameter("endTime"));
		String result = obCallbatchService.listClearnBatch(param, pagBean);
		setJsonString(result);
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDelClean(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				//如果项目状态为0——未启用，那么删除该项目；状态为1——启用，改为状态2——关闭
				obCallbatchService.remove(new Long(id));
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 判断批次是否启用
	 * @return
	 */
	public String isEnable() {
		String callbatchId = getRequest().getParameter("callbatchId");
		ObCallbatch obCallbatch = obCallbatchService.get(Long.parseLong(callbatchId));
		HashMap<String,String> hsmp = new HashMap<String,String>();
		String flag = "YES_ENABLE";
		if(obCallbatch.getCallbatchStaId().equals(ObCallbatch.FLAG_UNENABLED)) {
			flag = "NO_ENABLE";
		}
		hsmp.put("flag", flag);
		setJsonString(JsonUtil.hsmp2JSON(hsmp));
		return SUCCESS;
	}
	
	public String checkCanDel() {
		String[] calllistIDs = getRequest().getParameterValues("calllistID");
		int index =Integer.valueOf(getRequest().getParameter("index"));
		if(index==1) {
			calllistIDs=calllistIDs[0].split(",");
		}
		Integer flag=null;
		for(String calllistID:calllistIDs) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_obCalllist.calllistId_L_EQ", calllistID);
			filter.addFilter("Q_callbatchStaId_SN_EQ", ObCallbatch.FLAG_ENABLED.toString());
			List<ObCallbatch> list = obCallbatchService.getAll(filter);	
			if(list!=null&&list.size()>0) {
				flag=0;
				break;
			} else {
				flag=1;
			}
		}
		if(flag==0) {
			jsonString="{success:false}";
			return SUCCESS;
		} else {
			jsonString="{success:true}";
			return SUCCESS;	
		}
	}
}
