package com.htsoft.core.model;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Dictionary;

/**
 * @createtime 2012年8月8日 17:33:44
 * @author zhangyl
 * {@用于建造JPBM工单所有需要的信息}
 */
public class TaskLink implements Serializable{
	/**
	 * 业务表单ID
	 */
	private Long flowPk;
	/**
	 * 流程实例ID
	 */
	private Long runId;
	/**
	 * 流程key
	 */
	private	String flowType;
	/**
	 * 创建人
	 */
	private AppUser creater;
	/**
	 * PIID
	 */
	private String piId;
	/**
	 * 受理人
	 */
	private String taskUser;
	/**
	 * 流转节点
	 */
	private String taskName;
	/**
	 * 过期时间
	 */
	private Timestamp dueDate;
	/**
	 * 工单类型 : 请假单.知识申请单等
	 */
	private Long busType;
	/**
	 *工单类别 : 内部工单,外部工单 
	 */
	private Long busClasses;
	/**
	 * 工单创建时间
	 */
	private Date createTime;
	/**
	 * 受理时间(此流程的开始时间,上级通过传递到我手里的时间)
	 */
	private Date acceptanceTime;
	/**
	 * 任务ID
	 */
	private Long taskId;
	/**
	 * 实例状态
	 */
	private Long runStatus;
	
	/**
	 * 要求完成时间
	 */
	private Date needsTime;
	/**
	 * 实际完成时间
	 */
	private Date finishTime;
	
	/**
	 * 申请人(客户)
	 */
	private Customer customer; 
	/**
	 * 申请时间
	 */
	private Date customerTime;
	/**
	 * 流程定义ID
	 */
	private Long defId;
	/**
	 * 流程名称
	 */
	private String defName;
	/**
	 * 工单类型名称
	 */
	private String busTypeName;			//----废弃
	
	/**
	 * 工单类型对象
	 */
	
	private Dictionary runType;
	
	/**
	 * 增加临时变量
	 * 受理人的名称
	 */
	private String taskUserName;
	/**
	 * 增加临时变量
	 * 申请人的名称
	 */
	private String applyName;
	/**
	 * 增加临时变量
	 * 申请人时间
	 */
	private Date applyTime;
	
	/**
	 * 增加临时变量
	 * 剩余时长
	 */
	private String residueTime; 
	
	/**
	 * 增加临时变量
	 * 任务剩余时间
	 */
	private String dueDateStr;
	
	/**
	 * 增加临时变量
	 * 任务是否过期
	 */
	private String dueDatePass;
	public Long getFlowPk() {
		return flowPk;
	}
	public void setFlowPk(Long flowPk) {
		this.flowPk = flowPk;
	}
	public Long getRunId() {
		return runId;
	}
	public void setRunId(Long runId) {
		this.runId = runId;
	}
	public String getFlowType() {
		return flowType;
	}
	public void setFlowType(String flowType) {
		this.flowType = flowType;
	}
	public AppUser getCreater() {
		return creater;
	}
	public void setCreater(AppUser creater) {
		this.creater = creater;
	}
	public String getPiId() {
		return piId;
	}
	public void setPiId(String piId) {
		this.piId = piId;
	}
	public String getTaskUser() {
		return taskUser;
	}
	public void setTaskUser(String taskUser) {
		this.taskUser = taskUser;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public Timestamp getDueDate() {
		return dueDate;
	}
	public void setDueDate(Timestamp dueDate) {
		this.dueDate = dueDate;
	}
	public Long getBusType() {
		return busType;
	}
	public void setBusType(Long busType) {
		this.busType = busType;
	}
	public Long getBusClasses() {
		return busClasses;
	}
	public void setBusClasses(Long busClasses) {
		this.busClasses = busClasses;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getAcceptanceTime() {
		return acceptanceTime;
	}
	public void setAcceptanceTime(Date acceptanceTime) {
		this.acceptanceTime = acceptanceTime;
	}
	public Long getTaskId() {
		return taskId;
	}
	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}
	public Long getRunStatus() {
		return runStatus;
	}
	public void setRunStatus(Long runStatus) {
		this.runStatus = runStatus;
	}
	public String getTaskUserName() {
		return taskUserName;
	}
	public void setTaskUserName(String taskUserName) {
		this.taskUserName = taskUserName;
	}
	public Date getNeedsTime() {
		return needsTime;
	}
	public void setNeedsTime(Date needsTime) {
		this.needsTime = needsTime;
	}
	public Date getFinishTime() {
		return finishTime;
	}
	public void setFinishTime(Date finishTime) {
		this.finishTime = finishTime;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Date getCustomerTime() {
		return customerTime;
	}
	public void setCustomerTime(Date customerTime) {
		this.customerTime = customerTime;
	}
	public String getApplyName() {
		return applyName;
	}
	public void setApplyName(String applyName) {
		this.applyName = applyName;
	}
	public Date getApplyTime() {
		return applyTime;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	public String getResidueTime() {
		return residueTime;
	}
	public void setResidueTime(String residueTime) {
		this.residueTime = residueTime;
	}
	public Long getDefId() {
		return defId;
	}
	public void setDefId(Long defId) {
		this.defId = defId;
	}
	public String getDefName() {
		return defName;
	}
	public void setDefName(String defName) {
		this.defName = defName;
	}
	public String getBusTypeName() {
		return busTypeName;
	}
	public void setBusTypeName(String busTypeName) {
		this.busTypeName = busTypeName;
	}
	public String getDueDateStr() {
		return dueDateStr;
	}
	public void setDueDateStr(String dueDateStr) {
		this.dueDateStr = dueDateStr;
	}
	public String getDueDatePass() {
		return dueDatePass;
	}
	public void setDueDatePass(String dueDatePass) {
		this.dueDatePass = dueDatePass;
	}
	public Dictionary getRunType() {
		return runType;
	}
	public void setRunType(Dictionary runType) {
		this.runType = runType;
	}
	
	
	
}
