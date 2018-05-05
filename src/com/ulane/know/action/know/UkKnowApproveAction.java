package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.jbpm.api.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.core.service.FlowResultService;
import com.ulane.know.model.know.UkKnowApply;
import com.ulane.know.model.know.UkKnowApprove;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowApplyService;
import com.ulane.know.service.know.UkKnowApproveService;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkKnowApproveAction extends BaseAction {
	Logger log = LoggerFactory.getLogger(UkKnowApproveAction.class);

	@Resource
	private UkKnowApproveService ukKnowApproveService;
	private UkKnowApprove ukKnowApprove;
	@Resource
	private UkKnowApplyService ukKnowApplyService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private FlowResultService flowResultService;
	@Resource
	private JbpmService jbpmService;
	@Resource
	private ProcessRunService processRunService;

	private Long knowApproveId;

	public Long getKnowApproveId() {
		return knowApproveId;
	}

	public void setKnowApproveId(Long knowApproveId) {
		this.knowApproveId = knowApproveId;
	}

	public UkKnowApprove getUkKnowApprove() {
		return ukKnowApprove;
	}

	public void setUkKnowApprove(UkKnowApprove ukKnowApprove) {
		this.ukKnowApprove = ukKnowApprove;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("createDate", "desc");
		List<UkKnowApprove> list = ukKnowApproveService.getAll(filter);
		JSONSerializer jsonSer = new JSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"createDate", "updateDate" });
		// Type type=new TypeToken<List<UkKnowApprove>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		// Gson gson=new Gson();
		buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				ukKnowApproveService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		UkKnowApprove ukKnowApprove = ukKnowApproveService.get(knowApproveId);

		JSONSerializer ser = JsonUtil.getJSONSerializer();
		// Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.serialize(ukKnowApprove));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ukKnowApprove.getKnowApproveId() == null) {
			ukKnowApprove.setCreateBy(ContextUtil.getCurrentUser()
					.getFullname());
			ukKnowApprove.setCreateDate(new Date());
			ukKnowApprove.setIsDelete(new Long(Constants.FLAG_UNDELETED));
			ukKnowApprove.setApprovalStatus("待审批");
			ukKnowApproveService.save(ukKnowApprove);
		} else {
			UkKnowApprove orgUkKnowApprove = ukKnowApproveService
					.get(ukKnowApprove.getKnowApproveId());
			try {
				BeanUtil.copyNotNullProperties(orgUkKnowApprove, ukKnowApprove);
				orgUkKnowApprove.setUpdateBy(ContextUtil.getCurrentUser()
						.getFamilyName());
				orgUkKnowApprove.setUpdateDate(new Date());
				ukKnowApproveService.save(orgUkKnowApprove);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	public String combo() {
		return SUCCESS;
	}

	/**
	 * 工作流显示列表
	 */
	public String listFlow() {
		//
		// String flowNode = getRequest().getParameter("flowNode");
		// String flowType = getRequest().getParameter("flowType");
		// String approveStatus = getRequest().getParameter("approveStatus");
		//
		// logger.debug("节点名称 " + flowNode);
		// Map<Long, FlowResult> map =
		// flowResultService.getFlowResultMap(flowType, flowNode,
		// approveStatus);
		// QueryFilter filter = new QueryFilter(getRequest());
		//
		// Collection<FlowResult> c = map.values();
		// Iterator it = c.iterator();
		// String qIdLIN = "";
		// int i = 0;
		// for (; it.hasNext();) {
		// FlowResult f = (FlowResult) it.next();
		// if (i > 0)
		// qIdLIN += ",";
		// qIdLIN += f.getFlowPk().toString();
		// i++;
		// }
		// if (i > 1) {
		// filter.addFilter("Q_knowApproveId_S_LIN", qIdLIN);
		// } else if (i == 1) {
		// filter.addFilter("Q_knowApproveId_L_EQ", qIdLIN);
		// }
		//
		// filter.addSorted("createDate", "desc");
		// Gson gson = new
		// GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		// List<UkKnowApprove> list = ukKnowApproveService.getAll(filter);
		//
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// JSONSerializer ser = JsonUtil.getJSONSerializer();
		// StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		// .append(filter.getPagingBean().getTotalItems()).append(",result:[");
		// int TotalCount = 0;
		//
		// for (UkKnowApprove ai : list) {
		// if (map.containsKey(ai.getKnowApproveId())) {
		//
		// TotalCount++;
		// buff.append(ser.serialize(ai));
		// buff.deleteCharAt(buff.length() - 1);// 对于一个
		//
		// buff.append(",approveResult:'").append(map.get(ai.getKnowApproveId()).getFlowStatus()).append("'");
		//
		// if (ai.getRunid() != null) {// 把当前正在运行的任务加载出来，以方便用户查找,但会影响性能
		// ProcessRun processRun = processRunService.get(new
		// Long(ai.getRunid()));
		// if (processRun.getPiId() != null) {
		// buff.append(",piId:'").append(processRun.getPiId())
		// .append("'");
		// List<Task> curTasks = jbpmService
		// .getTasksByPiId(processRun.getPiId());
		// buff.append(",tasks:[");
		// for (Task task : curTasks) {
		// buff.append("{taskId:").append(task.getId())
		// .append(",taskName:").append(gson.toJson(task.getName()));
		// if (task.getAssignee() != null) {
		// AppUser user = appUserService.get(new Long(task.getAssignee()));
		// if (user != null) {
		// buff.append(",userId:").append(task.getAssignee()).append(",fullname:").append(gson.toJson(user.getFullname()));
		// }
		// }
		// buff.append("},");
		// }
		// if (curTasks.size() > 0) {
		// buff.deleteCharAt(buff.length() - 1);
		// }
		// buff.append("]");
		// }
		// }
		// buff.append("},");
		//
		// }
		//
		// }
		//
		// if (list.size() > 0 && map.size() != 0) {
		// buff.deleteCharAt(buff.length() - 1);
		// }
		// buff.append("]}");
		// jsonString = buff.toString();
		//
		// return SUCCESS;
		int start = Integer.parseInt(getRequest().getParameter("start"));
		int limit = Integer.parseInt(getRequest().getParameter("limit"));

		QueryFilter qf = new QueryFilter(getRequest());
		qf.addSorted("createDate", "desc");
		List<UkKnowApprove> rs_first = ukKnowApproveService.getAll(qf);
		StringBuffer ids_first = new StringBuffer();
		if (rs_first.size() > 0) {
			for (UkKnowApprove uka : rs_first) {
				ids_first.append(uka.getKnowApproveId() + ",");
			}
		}
		log.debug("firstId:" + ids_first);
		if (ids_first.length() == 0) {
			ids_first.append("-1");
		}
		log.debug("firstId:" + ids_first);
		Map<Long, Boolean> ids = ukKnowApplyService.getSelectId(start, limit,
				ContextUtil.getCurrentUserId().toString(),
				"UkKnowApproveFlowView", ids_first.toString());

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':"
				+ ukKnowApplyService.getSelectIdCount(start, limit, ContextUtil
						.getCurrentUserId().toString(),
						"UkKnowApproveFlowView", ids_first.toString())
				+ ",result:[");

		for (Long id : ids.keySet()) {
			log.debug("get id:" + id + ",finish:" + ids.get(id));
			UkKnowApprove uka = ukKnowApproveService.get(id);
			if (uka != null) {
				fillData_apply(uka, buff, ids.get(id));
			}
		}
		// 删除,
		if (ids.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}

		buff.append("]}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	private void fillData_apply(UkKnowApprove ai, StringBuffer buff,
			Boolean isFinish) {
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.create();
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		List<Task> curTasks = new ArrayList<Task>();
		// if (map.containsKey(ai.getApplyId())) {
		if (ai.getRunid() != null) {// 把当前正在运行的任务加载出来，以方便用户查找,但会影响性能
			ProcessRun processRun = processRunService.get(ai.getRunid()
					.longValue());
			buff.append(ser.include("createBy").exclude("createBy").exclude(
					"updateBy").serialize(ai));
			buff.deleteCharAt(buff.length() - 1);// 对于一个
			if (isFinish) {
				buff.append(",'approveResult':'流程结束'");
			} else {
				buff.append(",'approveResult':'待审批'");
			}
			if (processRun.getPiId() != null) {
				curTasks = jbpmService.getTasksByPiId(processRun.getPiId());
				// 添加状态
				buff.append(",'piId':'").append(processRun.getPiId()).append(
						"'");
				buff.append(",'tasks':");
				List<Map<String, Object>> tasks = new ArrayList<Map<String, Object>>();

				for (Task task : curTasks) {
					if (task.getAssignee() != null) {
						String[] assigneeArr = task.getAssignee().split(",");
						for (String id : assigneeArr) {
							if (!"".equals(id)) {
								Map<String, Object> m = new HashMap<String, Object>();
								m.put("taskId", task.getId());
								m.put("taskName", task.getName());
								// TODO assignee String类型 暂需转化
								AppUser user = appUserService.get(new Long(id));
								if (user != null) {
									m.put("userId", id);
									m.put("fullname", user.getFullname());
								}
								tasks.add(m);
							}
						}
					}else{
						Map<String, Object> m = new HashMap<String, Object>();
						m.put("taskId", task.getId());
						m.put("taskName", task.getName());
						m.put("userId", ""); 
						m.put("fullname", "无");
						tasks.add(m);
					}
				}
				buff.append(JsonUtil.getJSONSerializer().serialize(tasks));
				buff.append("},");
			} else {
				buff.append(",'piId':null");
				buff.append(",'tasks':[]},");
			}
		}
	}
	
	/**
	 * 审批通过不通过
	 * 
	 * @return
	 */
	public String trasCheck() {

		String ids = getRequest().getParameter("ids");
		String pass = getRequest().getParameter("pass");
		if (StringUtils.isNotEmpty(ids)) {
			String[] knowIds = ids.split("[,]");
			for (String id : knowIds) {
				UkSysKnow know = ukSysKnowService.get(new Long(id));
				if("1".equals(pass)){
					if(know.getAccessManage()==1 || "1".equals(know.getAccessManage())){
						ukSysKnowService.updateKnowStatus(id,"5");
//						know.setSysKnowStatus(5);	//已发布
					}else{
//						know.setSysKnowStatus(4);	//待发布
						ukSysKnowService.updateKnowStatus(id,"4");
					}
				}else if("2".equals(pass)){
//					know.setSysKnowStatus(9);  //不通过
					ukSysKnowService.updateKnowStatus(id,"9");
				}
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
}
