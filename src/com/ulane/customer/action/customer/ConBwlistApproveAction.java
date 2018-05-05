package com.ulane.customer.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.jbpm.api.task.Task;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.system.AppUserService;


import com.ulane.customer.model.customer.ConBwlistApprove;
import com.ulane.customer.service.customer.ConBwlistApproveService;
import com.ulane.know.model.know.UkKnowApprove;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ConBwlistApproveAction extends BaseAction{
	@Resource
	private ConBwlistApproveService conBwlistApproveService;
	@Resource
	private JbpmService jbpmService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private AppUserService appUserService;
	private ConBwlistApprove conBwlistApprove;
	
	private Long bwlistApproveId;

	public Long getBwlistApproveId() {
		return bwlistApproveId;
	}

	public void setBwlistApproveId(Long bwlistApproveId) {
		this.bwlistApproveId = bwlistApproveId;
	}

	public ConBwlistApprove getConBwlistApprove() {
		return conBwlistApprove;
	}

	public void setConBwlistApprove(ConBwlistApprove conBwlistApprove) {
		this.conBwlistApprove = conBwlistApprove;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ConBwlistApprove> list= conBwlistApproveService.getAll(filter);
		
//		Type type=new TypeToken<List<ConBwlistApprove>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));
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
				conBwlistApproveService.remove(new Long(id));
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
		ConBwlistApprove conBwlistApprove=conBwlistApproveService.get(bwlistApproveId);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.serialize(conBwlistApprove));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if (conBwlistApprove.getBwlistApproveId() == null) {
			conBwlistApprove.setCreateBy(ContextUtil.getCurrentUser()
					.getFullname());
			conBwlistApprove.setCreateDate(new Date());
			conBwlistApprove.setIsDelete(new Integer(Constants.FLAG_UNDELETED));
			conBwlistApprove.setApprovalStatus("待审批");
			conBwlistApproveService.save(conBwlistApprove);
		} else {
			ConBwlistApprove orgConBwlistApprove = conBwlistApproveService.get(conBwlistApprove.getBwlistApproveId());
			try {
				BeanUtil.copyNotNullProperties(orgConBwlistApprove, conBwlistApprove);
				orgConBwlistApprove.setUpdateBy(ContextUtil.getCurrentUser().getFamilyName());
				orgConBwlistApprove.setUpdateDate(new Date());
				conBwlistApproveService.save(orgConBwlistApprove);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
	
	/**
	 * 工作流显示列表
	 */
	public String listFlow() {
		int start = Integer.parseInt(getRequest().getParameter("start"));
		int limit = Integer.parseInt(getRequest().getParameter("limit"));

		QueryFilter qf = new QueryFilter(getRequest());
		List<ConBwlistApprove> rs_first = conBwlistApproveService.getAll(qf);
		StringBuffer ids_first = new StringBuffer();
		for (ConBwlistApprove cba : rs_first) {
			ids_first.append(cba.getBwlistApproveId() + ",");
		}

		if(ids_first.length() > 0){
			Map<Long, Boolean> ids = conBwlistApproveService.getSelectId(start, limit,
					ContextUtil.getCurrentUserId().toString(), "ConBwListFlowView",
					ids_first.toString());
			
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':"
					+ conBwlistApproveService.getSelectIdCount(start, limit,
							ContextUtil.getCurrentUserId().toString(),
							"ConBwListFlowView", ids_first.toString())
							+ ",result:[");
			
			for (Long id : ids.keySet()) {
				ConBwlistApprove cba = conBwlistApproveService.get(id);
				if (cba != null) {
					fillData_apply(cba, buff, ids.get(id));
				}
			}
			// 删除,
			if (ids.size() > 0) {
				buff.deleteCharAt(buff.length() - 1);
			}
			
			buff.append("]}");
			jsonString = buff.toString();
		} else {
			setJsonString("{success:true,'totalCounts':0,result:[]}");
		}
		return SUCCESS;
	}

	private void fillData_apply(ConBwlistApprove ai, StringBuffer buff,
			Boolean isFinish) {
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.create();
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		List<Task> curTasks = new ArrayList<Task>();
		// if (map.containsKey(ai.getApplyId())) {
		if (ai.getRunid() != null) {// 把当前正在运行的任务加载出来，以方便用户查找,但会影响性能
			ProcessRun processRun = processRunService.get(ai.getRunid()
					.longValue());
			buff.append(ser.include("createBy").exclude("createBy").exclude("updateBy")
					.serialize(ai));
			buff.deleteCharAt(buff.length() - 1);// 对于一个
			if (isFinish) {
				buff.append(",'approveResult':'流程结束'");
			} else {
				buff.append(",'approveResult':'待审批'");
			}
			if (processRun.getPiId() != null) {
				curTasks = jbpmService.getTasksByPiId(processRun.getPiId());
				// 添加状态
				buff.append(",'piId':'").append(processRun.getPiId())
						.append("'");
				buff.append(",'tasks':[");

				for (Task task : curTasks) {
					
					if (task.getAssignee() != null) {
						String[] assigneeArr =  task.getAssignee().split(",");
						
						for(String id : assigneeArr){
							if(!"".equals(id)){
								buff.append("{taskId:").append(task.getId())
								.append(",taskName:")
								.append(gson.toJson(task.getName()));
								//TODO assignee String类型  暂需转化
								
								AppUser user = appUserService.get(new Long(id));
								if (user != null) {
									buff.append(",userId:").append(id)
											.append(",fullname:")
											.append(gson.toJson(user.getFullname()));
								}
							}
						}
					}
					buff.append("},");
				}
				if (curTasks.size() > 0) {
					buff.deleteCharAt(buff.length() - 1);
				}
				buff.append("]},");
			} else {
				buff.append(",'piId':null");
				buff.append(",'tasks':[]},");
			}
		}
	}
}
