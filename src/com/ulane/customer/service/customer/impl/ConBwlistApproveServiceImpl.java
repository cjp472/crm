package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.jbpm.api.ProcessInstance;

import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.ulane.core.service.FlowResultService;
import com.ulane.customer.dao.customer.ConBwlistApproveDao;
import com.ulane.customer.model.customer.ConBwList;
import com.ulane.customer.model.customer.ConBwlistApprove;
import com.ulane.customer.service.customer.ConBwListService;
import com.ulane.customer.service.customer.ConBwlistApproveService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConBwlistApproveServiceImpl extends BaseServiceImpl<ConBwlistApprove> implements ConBwlistApproveService{
	@SuppressWarnings("unused")
	private ConBwlistApproveDao dao;
	@Resource
	private FlowResultService flowResultService;
	@Resource
	private ConBwlistApproveService conBwlistApproveService;
	@Resource
	private ConBwListService conBwListService;
	@Resource
	private ProcessRunService processRunService;
	
	private static final Short SHEN_PI_ZHONG = 2;//审核中
	private static final Short SHEN_PI_PASS = 3;//审核通过
	private static final Short SHEN_PI_UNPASS = 4;//审核通过
	
	public ConBwlistApproveServiceImpl(ConBwlistApproveDao dao) {
		super(dao);
		this.dao=dao;
	}
	private String pKId;

	public String getpKId() {
		return pKId;
	}

	public void setpKId(String pKId) {
		this.pKId = pKId;
	}
	
	@Override
	public ConBwlistApprove save(FlowRunInfo flowRunInfo) {
		ConBwlistApprove conBwlistApprove = new ConBwlistApprove();
		if(flowRunInfo.getRequest().getParameter("pKId")!=""&&flowRunInfo.getRequest().getParameter("pKId")!=null){
			conBwlistApprove.setBwlistApproveId(new Long(flowRunInfo.getRequest().getParameter("pKId")));
		}
		String params = flowRunInfo.getRequest().getParameter("params");
		conBwlistApprove.setApproveTitle(flowRunInfo.getRequest().getParameter("conBwlistApprove.approveTitle"));
		conBwlistApprove.setApproveComment(flowRunInfo.getRequest().getParameter("conBwlistApprove.approveComment"));
		if(conBwlistApprove.getBwlistApproveId()==null){
			conBwlistApprove.setBwlistStatus(1);//状态CONZT 1=正常 2=注销
			conBwlistApprove.setCreateBy(ContextUtil.getCurrentUser().getUsername());
			conBwlistApprove.setCreateDate(new Date());
			conBwlistApprove.setApplyUser(ContextUtil.getCurrentUser());
			conBwlistApprove.setIsDelete(new Integer(Constants.FLAG_UNDELETED));
			conBwlistApprove.setApprovalStatus("待审批");
			conBwlistApproveService.save(conBwlistApprove);
			List<ConBwList> bwList = new ArrayList<ConBwList>();
			String[] bwId = params.trim().split(",");
			if(params!=null){
				for(String id : bwId){
					ConBwList orgConBwList = conBwListService.get(new Long(id));
					bwList.add(orgConBwList);
				}
			}
			for(ConBwList list : bwList){
				list.setCheckStateId(SHEN_PI_ZHONG);
				list.setConBwlistApprove(conBwlistApprove);
				conBwListService.save(list);
			}
		} else {
			ConBwlistApprove orgConBwlistApprove = conBwlistApproveService.get(conBwlistApprove.getBwlistApproveId());
			try {
				BeanUtil.copyNotNullProperties(orgConBwlistApprove, conBwlistApprove);
				orgConBwlistApprove.setUpdateBy(ContextUtil.getCurrentUser().getUsername());
				orgConBwlistApprove.setUpdateDate(new Date());
				conBwlistApproveService.save(orgConBwlistApprove);
			} catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		return conBwlistApprove;
	}


	@Override
	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId) {
		return dao.getSelectId(start, limit, userId, type, firstId);
	}

	@Override
	public Integer saveHeadId(FlowRunInfo flowRunInfo) {
		String bwlistApproveId = flowRunInfo.getRequest().getParameter("pKId");
		ConBwlistApprove conBwlistApprove = save(flowRunInfo);
		bwlistApproveId = conBwlistApprove.getBwlistApproveId().toString();
		this.setpKId(bwlistApproveId);

		flowRunInfo.getVariables().put("bwlistApproveId", getpKId()); //
		// 放入工作流待办时候的名称
		flowRunInfo.setFlowSubject("黑名单审批" + getpKId()); //
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
			ConBwlistApprove bwlistApprove = get(new Long(getpKId()));
			QueryFilter filter = new QueryFilter();
			filter.addFilter("Q_conBwlistApprove.bwlistApproveId_L_EQ", bwlistApprove.getBwlistApproveId().toString());
			List<ConBwList> bwLists = conBwListService.getAllNoRequest(filter);
			for(ConBwList bw : bwLists){
				bw.setCheckStateId(SHEN_PI_PASS);
				conBwListService.save(bw);
			}
		}
		// 审批不通过更新业务单据状态
		if (flowInfo.getDestName().contains("不通过")) {
			dao.updateStatusByNodeName("审批完毕", new Long(getpKId()), true);
			ConBwlistApprove bwlistApprove = get(new Long(getpKId()));
			QueryFilter filter = new QueryFilter();
			filter.addFilter("Q_conBwlistApprove.bwlistApproveId_L_EQ", bwlistApprove.getBwlistApproveId().toString());
			List<ConBwList> bwLists = conBwListService.getAllNoRequest(filter);
			for(ConBwList bw : bwLists){
				bw.setCheckStateId(SHEN_PI_UNPASS);
				conBwListService.save(bw);
			}
			// 审批不通过之后结束实例及流程
			processRunService.end(bwlistApprove.getRunid().toString());
		
			
		}
		
		if (flowInfo.getDestName().contains("驳回")==false && flowInfo.isStartFlow() == false && flowInfo.getDestName().contains("结束")==false) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}

		// 更新节点
		flowResultService.flowResultHandle(flowInfo, new Long(getpKId()),
				flowType);
		return 1;
	}
	
}