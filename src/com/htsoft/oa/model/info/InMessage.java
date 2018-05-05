package com.htsoft.oa.model.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import com.htsoft.core.model.BaseModel;

public class InMessage extends BaseModel {
	
	public final static Short FLAG_READ=1;
	public final static Short FLAG_UNREAD=0;
	
	private Long receiveId;
//	private Long messageId;
	private ShortMessage shortMessage;
	private Long userId;
	private String userFullname;
	private Short readFlag;
    private Short delFlag;	
    private String messageForm;
    private Long formId;
   
    public InMessage(){
    	
    }

	public Long getReceiveId() {
		return receiveId;
	}
	
	
//	public Long getMessageId() {
//		return messageId;
//	}
//
//	public void setMessageId(Long messageId) {
//		this.messageId = messageId;
//	}


	public ShortMessage getShortMessage() {
		return shortMessage;
	}

	public void setShortMessage(ShortMessage shortMessage) {
		this.shortMessage = shortMessage;
	}

	public void setReceiveId(Long receiveId) {
		this.receiveId = receiveId;
	}


	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserFullname() {
		return userFullname;
	}

	public void setUserFullname(String userFullname) {
		this.userFullname = userFullname;
	}

	public Short getReadFlag() {
		return readFlag;
	}

	public void setReadFlag(Short readFlag) {
		this.readFlag = readFlag;
	}

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}

	public String getMessageForm() {
		return messageForm;
	}

	public void setMessageForm(String messageForm) {
		this.messageForm = messageForm;
	}

	public Long getFormId() {
		return formId;
	}

	public void setFormId(Long formId) {
		this.formId = formId;
	}

}
