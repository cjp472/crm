package com.ulane.customer.model.customer;

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *	CTI 软电话 - 事后处理明细CTI数据记录
 *	CTI_Login_Info
 * @author Fernando Hu
 */
@SuppressWarnings("serial")
public class CTI_AfterWork_Info extends com.htsoft.core.model.BaseModel {
	private Long aid;

	private String aStartTime;
	
	private String aEndTime;
	
	private String aDate;
	
	private String aMachineID;
	
	private String aAgentID;

	public Long getAid() {
		return aid;
	}

	public void setAid(Long aid) {
		this.aid = aid;
	}

	public String getaStartTime() {
		return aStartTime;
	}

	public void setaStartTime(String aStartTime) {
		this.aStartTime = aStartTime;
	}

	public String getaEndTime() {
		return aEndTime;
	}

	public void setaEndTime(String aEndTime) {
		this.aEndTime = aEndTime;
	}

	public String getaDate() {
		return aDate;
	}

	public void setaDate(String aDate) {
		this.aDate = aDate;
	}

	public String getaMachineID() {
		return aMachineID;
	}

	public void setaMachineID(String aMachineID) {
		this.aMachineID = aMachineID;
	}

	public String getaAgentID() {
		return aAgentID;
	}

	public void setaAgentID(String aAgentID) {
		this.aAgentID = aAgentID;
	}
}
