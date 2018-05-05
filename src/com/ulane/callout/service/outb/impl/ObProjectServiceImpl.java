package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;
import com.ulane.callout.dao.outb.ObProjectDao;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObProject;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.callout.service.outb.ObProjectService;
import com.ulane.core.service.FlowResultService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObProjectServiceImpl extends BaseServiceImpl<ObProject> implements ObProjectService{
	@SuppressWarnings("unused")
	private ObProjectDao dao;
	@Resource
	private ObComService obComService; 
	public ObProjectServiceImpl(ObProjectDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	@Resource
	private FlowResultService flowResultService;
	@Resource
	private FileAttachService fileAttachService;
	private String pKId;
	
	public String getpKId() {
		return pKId;
	}

	public void setpKId(String pKId) {
		this.pKId = pKId;
	}

	@Override
	public ObProject save(FlowRunInfo flowRunInfo) {
		ObProject obProject = new ObProject();
//		obProject.setProjId(new Long(flowRunInfo.getRequest().getParameter("obProject.projId")));
		String fileIds=flowRunInfo.getRequest().getParameter("fileIds");							//附件
		if(StringUtils.isNotEmpty(fileIds)){
			obProject.getFileAttachs().clear();
			String[] ids=fileIds.split(",");
			for(int i=0;i<ids.length;i++){
			   FileAttach fileAttach=fileAttachService.get(new Long(ids[i]));
			   obProject.getFileAttachs().add(fileAttach);
			}
		}
		String projId = flowRunInfo.getRequest().getParameter("obProject.projId");
		if (null==projId) {
			obProject.setProjNam(flowRunInfo.getRequest().getParameter("obProject.projNam"));
			obProject.setProjAliNam(flowRunInfo.getRequest().getParameter("obProject.projAliNam"));
			obProject.setProjCod(flowRunInfo.getRequest().getParameter("obProject.projCod"));
			obProject.setProjTypId(Short.valueOf(flowRunInfo.getRequest().getParameter("obProject.projTypId")));
			obProject.setOwnerTeam(new Long(flowRunInfo.getRequest().getParameter("obProject.ownerTeam")));				//所属机构
			obProject.setPerIncharge(new Long(flowRunInfo.getRequest().getParameter("obProject.perIncharge")));		//负责人
			obProject.setSrouceId(Short.valueOf(flowRunInfo.getRequest().getParameter("obProject.srouceId")));
			try {
				obProject.setEndDat(DateUtil.parse(flowRunInfo.getRequest().getParameter("obProject.endDat"),"yyyy-MM-dd"));
				obProject.setStaDat(DateUtil.parse(flowRunInfo.getRequest().getParameter("obProject.staDat"),"yyyy-MM-dd"));
			} catch (ParseException e) {
				logger.error(e.getMessage());
				e.printStackTrace();
			}
			obProject.setExecTypId(Short.valueOf(flowRunInfo.getRequest().getParameter("obProject.execTypId")));
			obProject.setProjJianjie(flowRunInfo.getRequest().getParameter("obProject.projJianjie"));
//			obProject.setProjConFile(flowRunInfo.getRequest().getParameter());										//项目描述：该字段暂无
			obProject.setRemark(flowRunInfo.getRequest().getParameter("obProject.remark"));
			obProject.setCreUseId(ContextUtil.getCurrentUserId());
			obProject.setCreTime(new Timestamp(System.currentTimeMillis()));
			obProject.setProjStaId(Short.valueOf("0")); 															//默认状态为：0——未启动
			obProject.setAprovalStatus("待审批");
			obProject = dao.save(obProject);
		} else {
			ObProject obj = dao.get(obProject.getProjId());
			try {
				BeanUtil.copyNotNullProperties(obj, obProject);
				obj.setUpdUseId(ContextUtil.getCurrentUserId());
				obj.setUpdTime(new Timestamp(System.currentTimeMillis()));
				dao.save(obj);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}

		return obProject;
	}

	@Override
	public Integer saveHeadId(FlowRunInfo flowRunInfo) {
		String projFlowId = flowRunInfo.getRequest().getParameter("pKId");
		if(projFlowId==null || "".endsWith(projFlowId)){
			ObProject obProject = save(flowRunInfo);
			projFlowId = obProject.getProjId().toString();
		}
		this.setpKId(projFlowId);

		flowRunInfo.getVariables().put("projId", getpKId());					//
		// 放入工作流待办时候的名称
		flowRunInfo.setFlowSubject("营销项目审批" + getpKId());					//
		return 1;
	}

	@Override
	public Integer saveRunId(FlowRunInfo flowInfo) {
		String flowType = flowInfo.getRequest().getParameter("flowType");

		// 更新runid 和节点名称
		dao.saveRunidAndNodeName(flowInfo.getProcessRun().getRunId(), flowInfo
				.getDestName(), new Long(getpKId()));
		// 流程开始增加状态
		if (flowInfo.isStartFlow() == true) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()));
		}
		// 流程结束更新业务单据状态
		if (flowInfo.getDestName().indexOf("结束") > 0) {
			dao.updateStatusByNodeName("审批完毕", new Long(getpKId()));
			ObProject obProject = get(new Long(getpKId()));
			/**
			 * 默认为：审批完毕 将ProjStaId 改成未启动 用于项目启动。
			 * 根据具体项目进行设值，三种状态：0——未启动、1——启动、2——关闭
			 */
			obProject.setProjStaId(Short.valueOf("0"));			
			save(obProject);
		}

		// 更新节点
		flowResultService.flowResultHandle(flowInfo, new Long(getpKId()),flowType);
		return 1;
	}
	
	//该项目下所属的活动是否已经关闭，默认为false——未关闭
	@Override
	public boolean isStatusComs(Long projId,Short status) {
		ObProject obProject = this.dao.get(projId);
		Set<ObCom> comSet = obProject.getObComs();
		
		//项目：其他状态——>改为“关闭”状态
		if(ObCom.STATUS_CLOSE.equals(status)) {
			//判断该项目下面是否存在有“启用”状态的活动
			for(ObCom obCom : comSet) {
				//判断该活动是否处于"启用"状态
				boolean isStatus = obComService.isStatusCom(obCom.getObComStaId(), ObCom.STATUS_ENABLED);
				if(isStatus) {
					return false;
				}
			}
			//所有的活动都通过了验证
			return true;
		}
		
		//项目：“执行中”——>改为“停止”状态
		if(ObCom.STATUS_PAUSE.equals(status)) {
			for(ObCom obCom : comSet) {
				//判断该活动是否处于"启用"状态
				boolean isStatus = obComService.isStatusCom(obCom.getComId(), ObCom.STATUS_ENABLED);
				if(isStatus) {//存在还有“启用”状态的活动
					return false;
				}
			}
			//如果所有的活动都通过了验证，则为true
			return true;
		}
		
		return false;
	}

	@Override
	public void pauseProj(Long projId) {
		ObProject obProject = this.dao.get(projId);
		obProject.setProjStaId(ObProject.FLAG_PAUSE);
		this.dao.save(obProject);
	}
	
}