package com.ulane.customer.model.customer;

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *	登录明细数据记录
 *	CTI_Login_Info
 * @author Fernando Hu
 */
@SuppressWarnings("serial")
public class CTI_Login_Info extends com.htsoft.core.model.BaseModel {
	private Long id;

	private String LoginTime;
	
	private String LogoutTime;
	
	private String LoginDate;
	
	private String MachineID;
	
	private String AgentID;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLoginTime() {
		return LoginTime;
	}

	public void setLoginTime(String loginTime) {
		LoginTime = loginTime;
	}

	public String getLogoutTime() {
		return LogoutTime;
	}

	public void setLogoutTime(String logoutTime) {
		LogoutTime = logoutTime;
	}

	public String getLoginDate() {
		return LoginDate;
	}

	public void setLoginDate(String loginDate) {
		LoginDate = loginDate;
	}

	public String getMachineID() {
		return MachineID;
	}

	public void setMachineID(String machineID) {
		MachineID = machineID;
	}

	public String getAgentID() {
		return AgentID;
	}

	public void setAgentID(String agentID) {
		AgentID = agentID;
	}
}
