package com.htsoft.core.jbpm.pv;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;

/**
 * 流程中的参与人员
 * @author cf0666@gmail.com
 *
 */
public class UserInfo implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 用户的DB对应中的id
	 */
	private Long userId;
	/**
	 * 用户的账号
	 */
	private String username;
	/**
	 * 用户的姓名
	 */
	private String fullname;

	public UserInfo() {
		
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
	
}
