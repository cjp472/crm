package com.ulane.customer.model.customer;

/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
// 2014-12-18 14:23   Hyman  
@SuppressWarnings("serial")
public class OperationData extends com.htsoft.core.model.BaseModel {
	private Long id;
	
	private Long BS_Num;    //表示ID
	
	private String agentId;  //坐席编号
	
	private String insertTime; //时间

	private String Stype; //类别

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getBS_Num() {
		return BS_Num;
	}

	public void setBS_Num(Long bS_Num) {
		BS_Num = bS_Num;
	}

	public String getAgentId() {
		return agentId;
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}

	public String getInsertTime() {
		return insertTime;
	}

	public void setInsertTime(String insertTime) {
		this.insertTime = insertTime;
	}

	public String getStype() {
		return Stype;
	}

	public void setStype(String stype) {
		Stype = stype;
	}
	
	
  
}
