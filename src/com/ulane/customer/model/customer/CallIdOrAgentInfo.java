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
@SuppressWarnings("serial")
public class CallIdOrAgentInfo extends com.htsoft.core.model.BaseModel {
	private Long id;
	
	private String callId;  //软电话callid
	
	private String agentId; //座席端agentid

	private String machineId; //座席端agentid

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCallId() {
		return callId;
	}

	public void setCallId(String callId) {
		this.callId = callId;
	}

	public String getAgentId() {
		return agentId;
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}

	public String getMachineId() {
		return machineId;
	}

	public void setMachineId(String machineId) {
		this.machineId = machineId;
	}
	
	
  
}
