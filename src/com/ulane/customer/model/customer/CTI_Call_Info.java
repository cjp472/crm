package com.ulane.customer.model.customer;

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *	CTI 软电话 - 通话明细CTI数据记录
 *	CTI_Ringing_Info
 * @author Fernando Hu
 */
@SuppressWarnings("serial")
public class CTI_Call_Info extends com.htsoft.core.model.BaseModel {
	private Long cid;

	private String cStartTime;
	
	private String cEndTime;
	
	private String cDate;
	
	private String cMachineID;
	
	private String cAgentID;
	
	private String cTermNum;

	public Long getCid() {
		return cid;
	}

	public void setCid(Long cid) {
		this.cid = cid;
	}

	public String getcStartTime() {
		return cStartTime;
	}

	public void setcStartTime(String cStartTime) {
		this.cStartTime = cStartTime;
	}

	public String getcEndTime() {
		return cEndTime;
	}

	public void setcEndTime(String cEndTime) {
		this.cEndTime = cEndTime;
	}

	public String getcDate() {
		return cDate;
	}

	public void setcDate(String cDate) {
		this.cDate = cDate;
	}

	public String getcMachineID() {
		return cMachineID;
	}

	public void setcMachineID(String cMachineID) {
		this.cMachineID = cMachineID;
	}

	public String getcAgentID() {
		return cAgentID;
	}

	public void setcAgentID(String cAgentID) {
		this.cAgentID = cAgentID;
	}

	public String getcTermNum() {
		return cTermNum;
	}

	public void setcTermNum(String cTermNum) {
		this.cTermNum = cTermNum;
	}
	
	
}
