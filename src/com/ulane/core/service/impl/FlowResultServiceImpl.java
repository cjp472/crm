package com.ulane.core.service.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.jbpm.api.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.core.dao.FlowResultDao;
import com.ulane.core.model.FlowResult;
import com.ulane.core.service.FlowResultService;
import com.ulane.know.model.know.UkKnowApply;
import com.ulane.know.service.know.UkKnowApplyService;

public class FlowResultServiceImpl extends BaseServiceImpl<FlowResult>
		implements FlowResultService {
	private Logger log = LoggerFactory.getLogger(FlowResultServiceImpl.class);
	private FlowResultDao dao;
	@Resource
	private AppUserService appUserService;
	@Resource
	private JbpmService jbpmService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private UkKnowApplyService ukKnowApplyService;

	public FlowResultServiceImpl(FlowResultDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public void updateFlowResultStatus(Long runid, String status) {
		dao.updateFlowResultStatus(runid, status);
	}

	@Override
	public Integer getFlowResultCount(String node, Long runid) {
		return dao.getFlowResultCount(node, runid);
	}

	@Override
	public List<FlowResult> getFlowResultPK(Long runid) {
		return dao.getFlowResultPK(runid);
	}

	@Override
	public Map<Long, FlowResult> getFlowResultMap(String flowType, String node,
			String approveStatus) {
		Map<Long, FlowResult> map = new HashMap<Long, FlowResult>();
		List<FlowResult> list = dao.getFlowResultMap(flowType, node,
				approveStatus);
		for (FlowResult fr : list) {
			map.put(fr.getFlowPk(), fr);
		}
		return map;
	}

	@Override
	public void flowResultHandle(FlowRunInfo flowInfo, Long PK, String flowType) {
		if (flowInfo.isBack()) {
			// 如果驳回，修改原有所有节点状态
			// deleteFlowResultInfo(flowInfo.getProcessRun().getRunId());
		} else {
			// 如果是以前没有驳回过，直接新增下一节点
			if (getFlowResultCount(flowInfo.getDestName(),
					flowInfo.getProcessRun().getRunId()).intValue() == 0) {

				// 如果在前面被修改过修改前面的
				List<FlowResult> flowResul = getFlowResultPK(flowInfo
						.getProcessRun().getRunId());
				for (FlowResult fr : flowResul) {
					fr.setFlowStatus("审批完毕");
					if (fr.getFlowNode() == flowInfo.getDestName()) {
						save(fr);
					}
				}

				FlowResult flowResult = new FlowResult();
				flowResult.setFlowPk(PK);
				flowResult.setFlowNode(flowInfo.getDestName());
				flowResult.setFlowStatus("待审批");
				flowResult.setRunId(flowInfo.getProcessRun().getRunId());
				flowResult.setFlowType(flowType);
				save(flowResult);
			} else {
				// 如果是以前被驳回过，修改下一节点的状态
				List<FlowResult> flowResul = getFlowResultPK(flowInfo
						.getProcessRun().getRunId());
				for (FlowResult fr : flowResul) {
					fr.setFlowStatus("审批完毕");
					if (fr.getFlowNode() == flowInfo.getDestName()) {
						save(fr);
					}

				}

			}
		}

	}

	@Override
	public void deleteFlowResultInfo(Long runid) {
		dao.deleteFlowResultInfo(runid);

	}

	@Override
	public Map<Long, String> getMyApplyAndMyTask(String flowType, Long userId) {
		Map<Long, String> rs_myTask = getMyTask(flowType, userId);
		Map<Long, String> rs_myApply = getMyApply(flowType, userId);
		for (Long tmp : rs_myApply.keySet()) {
			rs_myTask.put(tmp, rs_myApply.get(tmp));
		}
		return rs_myTask;
	}

	public Map<Long, String> getMyApply(String flowType, Long userId) {
		Map<Long, String> rs = new HashMap<Long, String>();
		QueryFilter qf = new QueryFilter();
		qf.addFilter("Q_applyUser.userId_L_EQ", userId.toString());
		List<UkKnowApply> list_apply = ukKnowApplyService.getAllNoRequest(qf);

		for (UkKnowApply tmp : list_apply) {
			QueryFilter qf2 = new QueryFilter();
			qf2.addFilter("Q_flowPk_L_EQ", tmp.getApplyId().toString());
			qf2.addFilter("Q_flowStatus_S_EQ", "待审批");
			qf2.addFilter("Q_flowType_S_EQ", flowType);
			FlowResult lastFlow = getAllNoRequest(qf2).get(0);
			String info = getInfo(lastFlow, userId, false);
			log.debug("获取我的知识申请任务信息：知识申请id" + tmp.getApplyId() + "流程信息：" + info);
			if (!StringUtils.isEmpty(info)) {
				rs.put(tmp.getApplyId(), info);
			}
		}
		return rs;
	}

	public Map<Long, String> getMyTask(String flowType, Long userId) {
		List<FlowResult> data = dao.getFlowResultMap(flowType, null, null);
		Map<Long, String> rs = new HashMap<Long, String>();
		for (FlowResult fr : data) {
			String info = getInfo(fr, userId, true);
			log.debug("获取我的知识申请任务信息：知识申请id" + fr.getFlowPk() + "流程信息：" + info);
			if (!StringUtils.isEmpty(info)) {
				rs.put(fr.getFlowPk(), info);
			}
		}
		return rs;
	}

	private String getInfo(FlowResult fr, Long userId, boolean searchAssignee) {
		if (fr.getRunId() == null) {
			return "";
		}
		boolean dele = false;// 默认不删除
		StringBuffer buff = new StringBuffer();
		ProcessRun processRun = processRunService.get(fr.getRunId());
		if (processRun.getPiId() != null) {
			List<Task> curTasks = jbpmService.getTasksByPiId(processRun
					.getPiId());
			if (searchAssignee) {
				boolean flag_find = false;
				for (Task task : curTasks) {
					if (task.getAssignee().equals(userId)) {
						flag_find = true;
						break;
					}
				}
				dele = !flag_find;// 如果找到记录，flag_find=true，dele=false
			}
			if (!dele) {
				buff.append(",'approveResult':'").append(fr.getFlowStatus())
						.append("'");
				buff.append(",'piId':'").append(processRun.getPiId())
						.append("'");
				buff.append(",'tasks':[");

				for (Task task : curTasks) {
					buff.append("{taskId:").append(task.getId())
							.append(",taskName:")
							.append("\"" + task.getName() + "\"");
					if (task.getAssignee() != null) {
						AppUser user = appUserService.get(new Long(task
								.getAssignee()));
						if (user != null) {
							buff.append(",userId:").append(task.getAssignee());
							buff.append(",fullname:").append(
									"\"" + user.getFullname() + "\"");
						}
					}
					buff.append("},");
				}
				if (curTasks.size() > 0) {
					buff.deleteCharAt(buff.length() - 1);
				}
				buff.append("]},");
			}
		}
		return buff.toString();
	}
}