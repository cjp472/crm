package com.ulane.know.service.know.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;
import com.ulane.core.service.FlowResultService;
import com.ulane.know.dao.know.UkKnowApplyDao;
import com.ulane.know.model.know.UkKnowApply;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowApplyService;
import com.ulane.know.service.know.UkSysKnowService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class UkKnowApplyServiceImpl extends BaseServiceImpl<UkKnowApply>
		implements UkKnowApplyService {
	@SuppressWarnings("unused")
	private UkKnowApplyDao dao;
	@Resource
	private UkSysKnowService ukSysKnowService;
	@Resource
	private FileAttachService fileAttachService;

	public UkKnowApplyServiceImpl(UkKnowApplyDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Resource
	private FlowResultService flowResultService;

	private String pKId;

	public String getpKId() {
		return pKId;
	}

	public void setpKId(String pKId) {
		this.pKId = pKId;
	}

	@Override
	public UkKnowApply save(FlowRunInfo flowRunInfo) {
		UkKnowApply ukKnowApply = new UkKnowApply();
		if (flowRunInfo.getRequest().getParameter("pKId") != ""
				&& flowRunInfo.getRequest().getParameter("pKId") != null) {
			ukKnowApply.setApplyId(new Long(flowRunInfo.getRequest()
					.getParameter("pKId")));
		}
		
		if(ukKnowApply.getApplyId() == null){
			String a = flowRunInfo.getRequest().getParameter("ukKnowApply.applyType");
			ukKnowApply.setApplyType(new Long(a));
			// ukKnowApply.setBusiType(new
			// Long(flowRunInfo.getRequest().getParameter("ukKnowApply.busiType")));
			// //业务类型
			ukKnowApply.setApplyComment(flowRunInfo.getRequest().getParameter(
					"ukKnowApply.applyComment"));
			ukKnowApply.setApplyContent(flowRunInfo.getRequest().getParameter(
					"ukKnowApply.applyContent"));
			ukKnowApply.setApplyDescribe(flowRunInfo.getRequest().getParameter(
					"ukKnowApply.applyDescribe"));
			if(ukKnowApply.getApplyType() == 1){
				ukKnowApply.setKonwType(Long.parseLong(flowRunInfo.getRequest()
						.getParameter("ukKnowApply.konwType")));
			}
			String b = flowRunInfo.getRequest().getParameter(
					"ukKnowApply.requireTime"); // 转换时间
			SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
			Date d = new Date();
			try {
				d = f.parse(b);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			ukKnowApply.setRequireTime(d);
			ukKnowApply.setApplyTitle(flowRunInfo.getRequest().getParameter(
					"ukKnowApply.applyTitle"));
		}
		
		if(!flowRunInfo.getRequest().getParameter("ukKnowApply.applyType").equals("1")){
			String knowledgeIds = flowRunInfo.getRequest().getParameter("relatedKnowIds"); // 相关知识
			if (StringUtils.isNotEmpty(knowledgeIds)) {
				ukKnowApply.getUkRelativeKnows().clear();
				String[] ids = knowledgeIds.split(",");
				for (int i = 0; i < ids.length; i++) {
					UkSysKnow uksyKnow = ukSysKnowService.get(new Long(ids[i]));
					ukKnowApply.getUkRelativeKnows().add(uksyKnow);
				}
			}
		}
	
		String fileIds = flowRunInfo.getRequest()
				.getParameter("relatedFileIds"); // 相关附件
		if (StringUtils.isNotEmpty(fileIds)) {
			ukKnowApply.getUkRelativeFiles().clear();
			String[] ids = fileIds.split(",");
			for (int i = 0; i < ids.length; i++) {
				FileAttach f = fileAttachService.get(new Long(ids[i]));
				ukKnowApply.getUkRelativeFiles().add(f);
			}
		}
		

		if (ukKnowApply.getApplyId() == null) {
			ukKnowApply.setApplyUser(ContextUtil.getCurrentUser());
			ukKnowApply.setApplyTime(new Timestamp(System.currentTimeMillis()));
			ukKnowApply.setCreateBy(ContextUtil.getCurrentUser());
			ukKnowApply.setApprovalStatus("待审批");
			ukKnowApply
					.setCreateDate(new Timestamp(System.currentTimeMillis()));
			dao.save(ukKnowApply);
		} else {
			UkKnowApply orgUkKnowApply = dao.get(ukKnowApply.getApplyId());
			try {
				BeanUtil.copyNotNullProperties(orgUkKnowApply, ukKnowApply);
				orgUkKnowApply.setUpdateBy(ContextUtil.getCurrentUser());
				orgUkKnowApply.setUpdateDate(new Timestamp(System
						.currentTimeMillis()));
				dao.save(orgUkKnowApply);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}

		return ukKnowApply;

	}

	@Override
	public Integer saveHeadId(FlowRunInfo flowRunInfo) {
		String priceApplyLineId = flowRunInfo.getRequest().getParameter("pKId");
		UkKnowApply ukKnowApply = save(flowRunInfo);
		priceApplyLineId = ukKnowApply.getApplyId().toString();
		this.setpKId(priceApplyLineId);

		flowRunInfo.getVariables().put("applyId", getpKId()); //
		// 放入工作流待办时候的名称
		flowRunInfo.setFlowSubject("知识申请审批" + getpKId()); //
		return 1;
	}

	@Override
	public Integer saveRunId(FlowRunInfo flowInfo) {
		String flowType = flowInfo.getRequest().getParameter("flowType");

		// 更新runid 和节点名称
		dao.saveRunidAndNodeName(flowInfo.getProcessRun().getRunId(),
				flowInfo.getDestName(), new Long(getpKId()));
		// 流程开始增加状态
		if (flowInfo.isStartFlow() == true) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}
		if (flowInfo.getDestName().indexOf("驳回") > 0) {
			dao.updateStatusByNodeName("驳回", new Long(getpKId()), false);
		}
		// 流程结束更新业务单据状态
		if (flowInfo.getDestName().contains("结束")) {
			dao.updateStatusByNodeName("审批完毕", new Long(getpKId()), true);
			// UkKnowApply ukApply = get(new Long(getpKId()));
			// ukApply.setApplyStatus(new Long(0)); // 审批完毕 将ApplyStatus 改成未采集
			// 用于采集列表
			// save(ukApply);
		}

		if (flowInfo.getDestName().contains("驳回") == false
				&& flowInfo.isStartFlow() == false
				&& flowInfo.getDestName().contains("结束") == false) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}

		// 更新节点
		flowResultService.flowResultHandle(flowInfo, new Long(getpKId()),
				flowType);
		return 1;
	}

	@Override
	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId) {
		return dao.getSelectId(start, limit, userId, type, firstId);
	}

	@Override
	public int getSelectIdCount(int start, int limit, Long userId, String type,
			String firstId) {
		return dao.getSelectIdCount(start, limit, userId, type, firstId);
	}
}