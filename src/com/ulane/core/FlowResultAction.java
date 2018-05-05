package com.ulane.core;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import org.jbpm.api.task.Task;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.core.model.FlowResult;
import com.ulane.core.service.FlowResultService;


/**
 * 
 * @author 
 *
 */
public class FlowResultAction extends BaseAction{
	@Resource
	private FlowResultService flowResultService;
	private FlowResult flowResult;
	
	private Long flowResultId;

	public Long getFlowResultId() {
		return flowResultId;
	}

	public void setFlowResultId(Long flowResultId) {
		this.flowResultId = flowResultId;
	}

	public FlowResult getFlowResult() {
		return flowResult;
	}

	public void setFlowResult(FlowResult flowResult) {
		this.flowResult = flowResult;
	}

	@Resource
	private JbpmService jbpmService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private AppUserService appUserService;
	//private Long runid;
	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<FlowResult> list= flowResultService.getAll(filter);
		
		Type type=new TypeToken<List<FlowResult>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
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
				flowResultService.remove(new Long(id));
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
		FlowResult flowResult=flowResultService.get(flowResultId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(flowResult));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	
	public String getTask(){
		String runidstr=null;
		runidstr = getRequest().getParameter("runid");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
		.create();
		StringBuffer buff = new StringBuffer("{success:true,data:{");
		if (runidstr != null) {// 把当前正在运行的任务加载出来，以方便用户查找,但会影响性能
			ProcessRun processRun = processRunService
					.get(new Long(runidstr));
			if (processRun.getPiId() != null) {
				buff.append("piId:'").append(processRun.getPiId())
						.append("'");
				List<Task> curTasks = jbpmService
						.getTasksByPiId(processRun.getPiId());
				buff.append(",tasks:[");
				for (Task task : curTasks) {
					buff.append("{taskId:").append(task.getId())
							.append(",taskName:").append(
									gson.toJson(task.getName()));
					if (task.getAssignee() != null) {
						AppUser user = appUserService.get(new Long(task
								.getAssignee()));
						if (user != null) {
							buff.append(",userId:").append(
									task.getAssignee()).append(
									",fullname:").append(
									gson.toJson(user.getFullname()));
						}
					}
					buff.append("},");
				}
				if (curTasks.size() > 0) {
					buff.deleteCharAt(buff.length() - 1);
				}
				buff.append("]");
			}
		}
		buff.append("}}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
		/**
	 * 添加及保存操作
	 */
	public String save(){
		if(flowResult.getFlowResultId()==null){
			flowResultService.save(flowResult);
		}else{
			FlowResult orgFlowResult=flowResultService.get(flowResult.getFlowResultId());
			try{
				BeanUtil.copyNotNullProperties(orgFlowResult, flowResult);
				flowResultService.save(orgFlowResult);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
