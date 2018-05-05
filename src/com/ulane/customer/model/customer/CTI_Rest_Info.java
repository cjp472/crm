package com.ulane.customer.model.customer;

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *	CTI 软电话 - 小休明细CTI数据记录
 *	CTI_Login_Info
 * @author Fernando Hu
 */
@SuppressWarnings("serial")
public class CTI_Rest_Info extends com.htsoft.core.model.BaseModel {
	private Long rid;

	private String rStartTime;
	
	private String rEndTime;
	
	private String rDate;
	
	private String rMachineID;
	
	private String rAgentID;
	
	private String rType;

	public Long getRid() {
		return rid;
	}

	public void setRid(Long rid) {
		this.rid = rid;
	}

	public String getrStartTime() {
		return rStartTime;
	}

	public void setrStartTime(String rStartTime) {
		this.rStartTime = rStartTime;
	}

	public String getrEndTime() {
		return rEndTime;
	}

	public void setrEndTime(String rEndTime) {
		this.rEndTime = rEndTime;
	}

	public String getrDate() {
		return rDate;
	}

	public void setrDate(String rDate) {
		this.rDate = rDate;
	}

	public String getrMachineID() {
		return rMachineID;
	}

	public void setrMachineID(String rMachineID) {
		this.rMachineID = rMachineID;
	}

	public String getrAgentID() {
		return rAgentID;
	}

	public void setrAgentID(String rAgentID) {
		this.rAgentID = rAgentID;
	}

	public String getrType() {
		return rType;
	}

	public void setrType(String rType) {
		this.rType = rType;
	}

	
}
