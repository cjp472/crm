package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.ulane.core.service.FlowResultService;
import com.ulane.know.dao.know.UkKnowApproveDao;
import com.ulane.know.model.know.UkKnowApprove;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowApproveService;
import com.ulane.know.service.know.UkSysKnowService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowApproveServiceImpl extends BaseServiceImpl<UkKnowApprove> implements UkKnowApproveService{
	private UkKnowApproveDao dao;
	
	public UkKnowApproveServiceImpl(UkKnowApproveDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Resource
	private FlowResultService flowResultService;
	@Resource
	private UkKnowApproveService ukKnowApproveService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	
	private static final Integer DAI_SHEN_PI = 2;
	private static final Integer SHEN_PI_ZHONG = 3;
	private static final Integer DAI_FA_BU = 4;
	
	private String pKId;

	public String getpKId() {
		return pKId;
	}

	public void setpKId(String pKId) {
		this.pKId = pKId;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Integer saveHeadId(FlowRunInfo flowRunInfo) {
		String priceApproveLineId = flowRunInfo.getRequest().getParameter("pKId");
		
//		if(priceApproveLineId==null || "".endsWith(priceApproveLineId)){
			UkKnowApprove ukKnowApprove = save(flowRunInfo);
			priceApproveLineId = ukKnowApprove.getKnowApproveId().toString();
//		}
		
		this.setpKId(priceApproveLineId);

		flowRunInfo.getVariables().put("knowApproveId", getpKId());					//
		// 放入工作流待办时候的名称
		flowRunInfo.setFlowSubject("知识审批发布" + getpKId());					//
		return 1;
	}

	@Override
	public Integer saveRunId(FlowRunInfo flowInfo) {
		String flowType = flowInfo.getRequest().getParameter("flowType");
		// 更新runid 和节点名称
		dao.saveRunidAndNodeName(flowInfo.getProcessRun().getRunId(), flowInfo.getDestName(), new Long(getpKId()));
		// 流程开始增加状态
		if (flowInfo.isStartFlow() == true) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()));
		}
		if (flowInfo.getDestName().indexOf("驳回") > 0) {
			dao.updateStatusByNodeName("驳回", new Long(getpKId()));
		}
		// 流程审批增加状态
		
		// 流程结束更新业务单据状态
		if (flowInfo.getDestName().indexOf("结束") >= 0) {
			dao.updateStatusByNodeName("审批完毕", new Long(getpKId()));
			UkKnowApprove ukKnowApprove = get(new Long(getpKId()));
			QueryFilter filter=new QueryFilter();
			filter.addFilter("Q_ukKnowApprove.knowApproveId_L_EQ",ukKnowApprove.getKnowApproveId().toString());
			List<UkSysKnow> knowList =  ukSysKnowService.getAllNoRequest(filter);
			for(UkSysKnow know : knowList){
				if(know.getAccessManage()==1 || "1".equals(know.getAccessManage())){
					know.setSysKnowStatus(5);
				}else{
					know.setSysKnowStatus(DAI_FA_BU);
				}
				ukSysKnowService.save(know);
			}
		}
		
		if (flowInfo.getDestName().contains("驳回")==false && flowInfo.isStartFlow() == false && flowInfo.getDestName().contains("结束")==false) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()));
		}
		
		// 更新节点
		flowResultService.flowResultHandle(flowInfo, new Long(getpKId()),flowType);
		return 1;
	}

	@Override
	public UkKnowApprove save(FlowRunInfo flowRunInfo) {
		UkKnowApprove knowApprove = new UkKnowApprove();
		
		if(flowRunInfo.getRequest().getParameter("pKId")!=""&&flowRunInfo.getRequest().getParameter("pKId")!=null){
			knowApprove.setKnowApproveId(new Long(flowRunInfo.getRequest().getParameter("pKId")));
		}
		String params = flowRunInfo.getRequest().getParameter("params");
		knowApprove.setApproveTitle(flowRunInfo.getRequest().getParameter("ukKnowApprove.approveTitle"));
		knowApprove.setApproveComment(flowRunInfo.getRequest().getParameter("ukKnowApprove.approveComment"));
		if (knowApprove.getKnowApproveId() == null){
			knowApprove.setCreateBy(ContextUtil.getCurrentUser().getUsername());
			knowApprove.setCreateDate(new Date());
			knowApprove.setIsDelete(new Long(Constants.FLAG_UNDELETED));
			knowApprove.setApprovalStatus("待审批");
			ukKnowApproveService.save(knowApprove);
			
			List<UkSysKnow> knowList = new ArrayList<UkSysKnow>();
			String[] knowIds = params.trim().split(",");
			if (params != null) {
				for (String id : knowIds) {
					if(id != null && id != ""){
						UkSysKnow orgUkSysKnow = ukSysKnowService.get(new Long(id));
						knowList.add(orgUkSysKnow);
					}
					
				}
			}
			for (UkSysKnow sysKnow : knowList){
				sysKnow.setSysKnowStatus(SHEN_PI_ZHONG);
				sysKnow.setUkKnowApprove(knowApprove);
				ukSysKnowService.save(sysKnow);
			}
		}else{
			UkKnowApprove orgUkKnowApprove=ukKnowApproveService.get(knowApprove.getKnowApproveId());
			try{
				BeanUtil.copyNotNullProperties(orgUkKnowApprove, knowApprove);
				orgUkKnowApprove.setUpdateBy(ContextUtil.getCurrentUser().getUsername());
				orgUkKnowApprove.setUpdateDate(new Date());
				ukKnowApproveService.save(orgUkKnowApprove);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		return knowApprove;
	}

}