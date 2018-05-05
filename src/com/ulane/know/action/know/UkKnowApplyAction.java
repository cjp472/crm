package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.jbpm.api.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.core.service.FlowResultService;
import com.ulane.know.model.know.UkKnowApply;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowApplyService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkKnowApplyAction extends BaseAction {
	private Logger log = LoggerFactory.getLogger(UkKnowApplyAction.class);

	@Resource
	private UkKnowApplyService ukKnowApplyService;
	private UkKnowApply ukKnowApply;

	@Resource
	private AppUserService appUserService;
	@Resource
	private FlowResultService flowResultService;
	@Resource
	private JbpmService jbpmService;
	@Resource
	private ProcessRunService processRunService;

	private Long applyId;

	private int tmp = 0;

	public Long getApplyId() {
		return applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}

	public UkKnowApply getUkKnowApply() {
		return ukKnowApply;
	}

	public void setUkKnowApply(UkKnowApply ukKnowApply) {
		this.ukKnowApply = ukKnowApply;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<UkKnowApply> list = ukKnowApplyService.getAll(filter);

		// Type type=new TypeToken<List<UkKnowApply>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		// Gson gson=new Gson();
		// buff.append(gson.toJson(list, type));

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
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
				ukKnowApplyService.remove(new Long(id));
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
		UkKnowApply ukKnowApply = ukKnowApplyService.get(applyId);

		// Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		ser.transform(new DateTransformer("yyyy-MM-dd"), "applyTime");
		ser.transform(new DateTransformer("yyyy-MM-dd"), "requireTime");
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.serialize(ukKnowApply));
		sb.deleteCharAt(sb.length() - 1);
		Set<UkSysKnow> ukRelativeKnows = ukKnowApply.getUkRelativeKnows();
		if (ukRelativeKnows.size() > 0) {
			sb.append(",\"ukRelativeKnows\":").append(
					ser.serialize(ukRelativeKnows)); // 相关知识
		}
		Set<FileAttach> ukRelativeFiles = ukKnowApply.getUkRelativeFiles();
		if (ukRelativeFiles.size() > 0) {
			sb.append(",\"ukRelativeFiles\":").append(
					ser.serialize(ukRelativeFiles)); // 相关知识
		}
		sb.append("}}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ukKnowApply.getApplyId() == null) {
			ukKnowApply.setApplyUser(ContextUtil.getCurrentUser());
			ukKnowApply.setApplyTime(new Timestamp(System.currentTimeMillis()));
			ukKnowApply.setCreateBy(ContextUtil.getCurrentUser());
			ukKnowApply.setApprovalStatus("待审批");
			ukKnowApply
					.setCreateDate(new Timestamp(System.currentTimeMillis()));
			ukKnowApplyService.save(ukKnowApply);
		} else {
			UkKnowApply orgUkKnowApply = ukKnowApplyService.get(ukKnowApply
					.getApplyId());
			try {
				BeanUtil.copyNotNullProperties(orgUkKnowApply, ukKnowApply);
				orgUkKnowApply.setUpdateBy(ContextUtil.getCurrentUser());
				orgUkKnowApply.setUpdateDate(new Timestamp(System
						.currentTimeMillis()));
				ukKnowApplyService.save(orgUkKnowApply);
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

		// String flowType = getRequest().getParameter("flowType");
		// String loginId = ContextUtil.getCurrentUserId().toString();
		// Map<Long, FlowResult> map = flowResultService.getFlowResultMap(
		// flowType, null, null);
		// QueryFilter filter = new QueryFilter(getRequest());
		//
		// Collection<FlowResult> c = map.values();
		// Iterator<FlowResult> it = c.iterator();
		// String qIdLIN = "";
		// int i = 0;
		// for (; it.hasNext();) {
		// FlowResult f = (FlowResult) it.next();
		// if (i > 0)
		// qIdLIN += ",";
		// qIdLIN += f.getFlowPk().toString();// flowPK保存的是知识申请的主键ID
		// i++;
		// }
		// if (i > 1) {
		// filter.addFilter("Q_applyId_S_LIN", qIdLIN);
		// } else if (i == 1) {
		// filter.addFilter("Q_applyId_L_EQ", qIdLIN);
		// }
		//
		// filter.addSorted("createDate", "desc");
		//
		// // 得到工作流的所有知识申请，包括不为当前登录人的，故不可在此处进行合并申请人的知识申请
		// List<UkKnowApply> list = ukKnowApplyService.getAll(filter);
		// // 保存知识申请中，执行人为当前登录用户的知识申请id
		// Map<Long, Boolean> applyId_assignee = new HashMap<Long, Boolean>();
		//
		// StringBuffer buff = new StringBuffer(
		// "{success:true,'totalCounts':?,result:[");
		//
		// for (UkKnowApply ai : list) {
		// fillData_apply(ai, map, applyId_assignee, buff, true);
		// }
		//
		// // 添加申请人的数据
		// QueryFilter qf = new QueryFilter();
		// qf.addFilter("Q_applyUser.userId_L_EQ", loginId);
		// List<UkKnowApply> list_apply =
		// ukKnowApplyService.getAllNoRequest(qf);
		// for (UkKnowApply tmp : list_apply) {
		// if (applyId_assignee.get(tmp.getApplyId()) == null) {
		// fillData_apply(tmp, map, applyId_assignee, buff, false);
		// }
		// }
		// // 删除,
		// if (list.size() > 0 && map.size() != 0) {
		// buff.deleteCharAt(buff.length() - 1);
		// }
		//
		// buff.append("]}");
		// jsonString = buff.toString().replace("?",
		// String.valueOf(applyId_assignee.keySet().size()));
		// JSONSerializer ser = JsonUtil.getJSONSerializer();
		// Map<Long, String> rs =
		// flowResultService.getMyApplyAndMyTask(flowType,
		// ContextUtil.getCurrentUserId());
		// QueryFilter filter = new QueryFilter(getRequest());
		// StringBuffer ids = new StringBuffer();
		// for (Long id : rs.keySet()) {
		// ids.append(id + ",");
		// }
		// ids.deleteCharAt(ids.length() - 1);
		// if (ids.length() > 1) {
		// filter.addFilter("Q_applyId_S_LIN", ids.toString());
		// } else {
		// filter.addFilter("Q_applyId_L_EQ", ids.toString());
		// }
		// filter.addSorted("createDate", "desc");
		// List<UkKnowApply> list = ukKnowApplyService.getAll(filter);
		int start = Integer.parseInt(getRequest().getParameter("start"));
		int limit = Integer.parseInt(getRequest().getParameter("limit"));

		QueryFilter qf = new QueryFilter(getRequest(), true);
		List<UkKnowApply> rs_first = ukKnowApplyService.getAllNoRequest(qf);
		StringBuffer ids_first = new StringBuffer();
		if (rs_first.size() > 0) {
			for (UkKnowApply uka : rs_first) {
				ids_first.append(uka.getApplyId() + ",");
			}
		}
		log.debug("firstId:" + ids_first);
		if (ids_first.length() == 0) {
			ids_first.append("-1");
		}
		Map<Long, Boolean> ids = ukKnowApplyService.getSelectId(start, limit,
				ContextUtil.getCurrentUserId().toString(),
				"UkKnowApplyFlowView", ids_first.toString());

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':"
				+ ukKnowApplyService.getSelectIdCount(start, limit, ContextUtil
						.getCurrentUserId().toString(), "UkKnowApplyFlowView",
						ids_first.toString()) + ",result:[");

		for (Long id : ids.keySet()) {
			log.debug("get id:" + id + ",finish:" + ids.get(id));
			UkKnowApply uka = ukKnowApplyService.get(id);
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

	/**
	 * 知识采集显示列表
	 */
	public String listApplyStatus() {

		QueryFilter filter = new QueryFilter(getRequest());
		// filter.addFilter("Q_applyStatus_L_NOTNULL", "0"); // 按applyStatus查询
		// 审批通过将会set值
		List<UkKnowApply> list = ukKnowApplyService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));

		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	private void fillData_apply(UkKnowApply ai, StringBuffer buff,
			Boolean isFinish) {
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.create();
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		List<Task> curTasks = new ArrayList<Task>();
		// if (map.containsKey(ai.getApplyId())) {
		if (ai.getRunid() != null) {// 把当前正在运行的任务加载出来，以方便用户查找,但会影响性能
			ProcessRun processRun = processRunService.get(ai.getRunid());
			buff.append(ser.exclude("createBy").exclude("updateBy")
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
					} else {
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
}
