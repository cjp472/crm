package com.ulane.customer.model.customer;

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *质检考勤模块
 *
 * @author wangkaijuan
 */
@SuppressWarnings("serial")
public class SysWorkattendance extends com.htsoft.core.model.BaseModel {
	private Long id;

	private String agentId;   //用户的工号

	private String loginTime;   //登录系统时间
	private String loginCtiTime;  //电话登录时间
	
	private String logoutTime;  //退出系统时间
	
	private String status;  //退出状态
	private String reason;   //退出原因

	private Long bsNum;    //    
	private String remarks;//备注
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public String getLoginTime() {
		return loginTime;
	}
	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}
	public String getLoginCtiTime() {
		return loginCtiTime;
	}
	public void setLoginCtiTime(String loginCtiTime) {
		this.loginCtiTime = loginCtiTime;
	}
	public String getLogoutTime() {
		return logoutTime;
	}
	public void setLogoutTime(String logoutTime) {
		this.logoutTime = logoutTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Long getBsNum() {
		return bsNum;
	}
	public void setBsNum(Long bsNum) {
		this.bsNum = bsNum;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	
	
	
}
