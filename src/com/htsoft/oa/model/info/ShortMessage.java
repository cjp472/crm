package com.htsoft.oa.model.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.htsoft.core.model.BaseModel;

public class ShortMessage extends BaseModel {
	
	private Long messageId;
	private String content;
	private Long senderId;
	private String sender;
    //private Short msgType;
	private Short msgType;
    private Date sendTime;
    private String sendMsgType;
    private String fileId;
    private String fileName;
    /**
     * 1=个人信息
	   2=日程安排
	   3=计划任务
	   4=代办任务提醒
	   5=系统提醒
	   6=新闻
	   7=公告
     */
    public final static Short MSG_TYPE_PERSONAL=1;
    public final static Short MSG_TYPE_CALENDAR=2;
    public final static Short MSG_TYPE_PLAN=3;
    public final static Short MSG_TYPE_TASK=4;
    public final static Short MSG_TYPE_SYS=5;
    public final static Short MSG_TYPE_NEWS=6;
    public final static Short MSG_TYPE_NOTICE=7;
   
    
    private Set<InMessage> messages=new HashSet<InMessage>();
   
    public ShortMessage(){
    	
    }

    
	public Set<InMessage> getMessages() {
		return messages;
	}


	public void setMessages(Set<InMessage> messages) {
		this.messages = messages;
	}

	public Long getMessageId() {
		return messageId;
	}

	public void setMessageId(Long messageId) {
		this.messageId = messageId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getSenderId() {
		return senderId;
	}

	public void setSenderId(Long senderId) {
		this.senderId = senderId;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public Short getMsgType() {
		return msgType;
	}

	public void setMsgType(Short msgType) {
		this.msgType = msgType;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}


	public String getSendMsgType() {
		return sendMsgType;
	}


	public void setSendMsgType(String sendMsgType) {
		this.sendMsgType = sendMsgType;
	}


	public String getFileid() {
		return fileId;
	}


	public void setFileid(String fileId) {
		this.fileId = fileId;
	}


	public String getFilename() {
		return fileName;
	}


	public void setFilename(String fileName) {
		this.fileName = fileName;
	}
    
}
