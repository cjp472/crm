package com.ulane.customer.model.customer;

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *	CTI 软电话 - 振铃明细CTI数据记录
 *	CTI_Ringing_Info  2015/12/08修改
 * @author Fernando Hu
 */
@SuppressWarnings("serial")
public class CTI_Ringing_Info extends com.htsoft.core.model.BaseModel {
	private long rid;

	private String rStartTime;
	
	private String rEndTime;
	
	private String rDate;
	
	private String rMachineID;
	
	private String rAgentID;
	
	private long rType;

	private String rCallID;
	
	private String rCallNum;
	
	private long rRingingTime;   //来电振铃时长
	
	private String rBothTime;
	
	private long rBothTimeType;

	public long getRid() {
		return rid;
	}

	public void setRid(long rid) {
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

	public long getrType() {
		return rType;
	}

	public void setrType(long rType) {
		this.rType = rType;
	}

	public String getrCallID() {
		return rCallID;
	}

	public void setrCallID(String rCallID) {
		this.rCallID = rCallID;
	}

	public String getrCallNum() {
		return rCallNum;
	}

	public void setrCallNum(String rCallNum) {
		this.rCallNum = rCallNum;
	}

	public long getrRingingTime() {
		return rRingingTime;
	}

	public void setrRingingTime(long rRingingTime) {
		this.rRingingTime = rRingingTime;
	}

	public String getrBothTime() {
		return rBothTime;
	}

	public void setrBothTime(String rBothTime) {
		this.rBothTime = rBothTime;
	}

	public long getrBothTimeType() {
		return rBothTimeType;
	}

	public void setrBothTimeType(long rBothTimeType) {
		this.rBothTimeType = rBothTimeType;
	}
	

	
}
