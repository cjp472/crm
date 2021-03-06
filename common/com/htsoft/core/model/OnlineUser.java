package com.htsoft.core.model;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
/**
 * 在线用户
 * 
 * @author cf0666@gmail.com
 * 
 */
public class OnlineUser {
	/**
	 * sessionId
	 */
	private String sessionId;
	/**
	 * AppUser userId
	 */
	private Long userId;
	/**
	 * AppUser username
	 */
	private String username;
	/**
	 * AppUser fullname
	 */
	private String fullname;

	/**
	 * 部门Path
	 */
	private String depPath;
	/**
	 * 角色IDS
	 */
	private String roleIds;
	
	/**
	 * 工号
	 */
	private String employeeid;

	private Short title;
	public OnlineUser() {

	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getDepPath() {
		return depPath;
	}

	public void setDepPath(String depPath) {
		this.depPath = depPath;
	}

	public String getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}

	public Short getTitle() {
		return title;
	}

	public void setTitle(Short title) {
		this.title = title;
	}

	public String getEmployeeid() {
		return employeeid;
	}

	public void setEmployeeid(String employeeid) {
		this.employeeid = employeeid;
	}

}	
