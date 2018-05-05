package com.htsoft.oa.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

public class CustomerMail{
	
	private String ids;
	private String names;
	private String subject;
	private String mailContent;
	private String files;
	private Short type;
	
	public Short getType() {
		return type;
	}
	public void setType(Short type) {
		this.type = type;
	}
	public String getIds() {
		return ids;
	}
	public void setIds(String ids) {
		this.ids = ids;
	}
	public String getNames() {
		return names;
	}
	public void setNames(String names) {
		this.names = names;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMailContent() {
		return mailContent;
	}
	public void setMailContent(String mailContent) {
		this.mailContent = mailContent;
	}
	public String getFiles() {
		return files;
	}
	public void setFiles(String files) {
		this.files = files;
	}
}