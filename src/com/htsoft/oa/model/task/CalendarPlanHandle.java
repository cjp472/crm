package com.htsoft.oa.model.task;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.util.Date;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.google.gson.annotations.Expose;

public class CalendarPlanHandle extends com.htsoft.core.model.BaseModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CalendarPlanHandle () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CalendarPlan
	 */
	public CalendarPlanHandle (Long handleId) {
		this.setHandleId(handleId);
    }
	
	@Expose
    protected Long handleId;	//内码
	@Expose
	protected Long planId;  //任务id
	@Expose
	protected Long assignerId; //分配人
	@Expose
	protected String assignerName;  //分配人名称
	@Expose
	protected Date assignTime; //分配时间
	@Expose
	protected Long executor; //执行人(被分配人)
	@Expose
	protected String executorName; //执行人(被分配人)名称
	@Expose
	protected Date executeTime;	//执行时间
	@Expose
	protected Date finishTime;	//结束时间
	@Expose
	protected Long dealUser; //处理人
	@Expose
	protected Long dealHandleResult; //处理结果
	@Expose
	protected String handleReason; //原因
	
	protected CalendarPlan calendarplan;
	
	public Long getHandleId() {
		return handleId;
	}

	public void setHandleId(Long handleId) {
		this.handleId = handleId;
	}
	
	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public Long getAssignerId() {
		return assignerId;
	}

	public void setAssignerId(Long assignerId) {
		this.assignerId = assignerId;
	}

	public String getAssignerName() {
		return assignerName;
	}

	public void setAssignerName(String assignerName) {
		this.assignerName = assignerName;
	}

	public Date getAssignTime() {
		return assignTime;
	}

	public void setAssignTime(Date assignTime) {
		this.assignTime = assignTime;
	}

	public Long getExecutor() {
		return executor;
	}

	public void setExecutor(Long executor) {
		this.executor = executor;
	}

	public Date getExecuteTime() {
		return executeTime;
	}

	public void setExecuteTime(Date executeTime) {
		this.executeTime = executeTime;
	}

	public Date getFinishTime() {
		return finishTime;
	}

	public void setFinishTime(Date finishTime) {
		this.finishTime = finishTime;
	}

	public Long getDealUser() {
		return dealUser;
	}

	public void setDealUser(Long dealUser) {
		this.dealUser = dealUser;
	}

	public String getHandleReason() {
		return handleReason;
	}

	public void setHandleReason(String handleReason) {
		this.handleReason = handleReason;
	}

	public Long getDealHandleResult() {
		return dealHandleResult;
	}

	public void setDealHandleResult(Long dealHandleResult) {
		this.dealHandleResult = dealHandleResult;
	}
	
	public CalendarPlan getCalendarplan() {
		return calendarplan;
	}

	public void setCalendarplan(CalendarPlan calendarplan) {
		this.calendarplan = calendarplan;
	}
	
	public String getExecutorName() {
		return executorName;
	}

	public void setExecutorName(String executorName) {
		this.executorName = executorName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CalendarPlanHandle)) {
			return false;
		}
		CalendarPlanHandle rhs = (CalendarPlanHandle) object;
		return new EqualsBuilder()
				.append(this.handleId, rhs.handleId)
				.append(this.planId, rhs.planId)
				.append(this.assignerId, rhs.assignerId)
				.append(this.assignerName, rhs.assignerName)
				.append(this.assignTime, rhs.assignTime)
				.append(this.executor, rhs.executor)
				.append(this.executeTime, rhs.executeTime)
				.append(this.finishTime, rhs.finishTime)
				.append(this.dealUser, rhs.dealUser)
				.append(this.handleReason, rhs.handleReason)
				.append(this.dealHandleResult, rhs.dealHandleResult)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.handleId)
				.append(this.planId) 
				.append(this.assignerId) 
				.append(this.assignerName) 
				.append(this.assignTime) 
				.append(this.executor) 
				.append(this.executeTime)
				.append(this.finishTime)
				.append(this.dealUser)
				.append(this.handleReason)
				.append(this.dealHandleResult)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("planId", this.handleId) 
				.append("planId", this.planId) 
				.append("assignerId", this.assignerId) 
				.append("assignerName", this.assignerName) 
				.append("assignTime", this.assignTime) 
				.append("executor", this.executor) 
				.append("executeTime", this.executeTime) 
				.append("finishTime", this.finishTime) 
				.append("dealUser", this.dealUser) 
				.append("dealHandleResult", this.dealHandleResult)
				.append("handleReason", this.handleReason)
				.toString();
	}
}
