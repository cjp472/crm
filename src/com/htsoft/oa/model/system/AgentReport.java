package com.htsoft.oa.model.system;

import com.htsoft.core.model.BaseModel;

public class AgentReport extends BaseModel {
	
//	private long indexs;
//	
//	public long getIndexs() {
//		return indexs;
//	}
//
//	public void setIndexs(long indexs) {
//		this.indexs = indexs;
//	}

	private long ID;
	
	private String agentuid;
	
	private String username;
	
	private String node;
	
	private String dates;
	
	private long logincount;
	
	private long logintime;
	
	private String logindate;
	
	//ENDINBOUNDCOUNT
	private long endinboundcount;
	
	//INBOUNDTIME
	private long inboundtime;
	
	//ENDOUTBOUNDCOUNT
	private long endoutboundcount;
	
	//RESTCOUNT  RESTTIME   UNANSWEREDCOUNT   MEETINGCOUNT  MEETINGTIME  LOGINNAME(str)
	private long outboundtime;
	
	private long restcount;
	
	private long resttime;
	
	private long unansweredcount;
	
	private long meetingcount;
	
	private long meetingtime;
	
	private String loginname;

	public long getID() {
		return ID;
	}

	public void setID(long iD) {
		ID = iD;
	}

	public String getAgentuid() {
		return agentuid;
	}

	public void setAgentuid(String agentuid) {
		this.agentuid = agentuid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNode() {
		return node;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String getDates() {
		return dates;
	}

	public void setDates(String dates) {
		this.dates = dates;
	}

	public long getLogincount() {
		return logincount;
	}

	public void setLogincount(long logincount) {
		this.logincount = logincount;
	}

	public long getLogintime() {
		return logintime;
	}

	public void setLogintime(long logintime) {
		this.logintime = logintime;
	}

	public String getLogindate() {
		return logindate;
	}

	public void setLogindate(String logindate) {
		this.logindate = logindate;
	}

	public long getEndinboundcount() {
		return endinboundcount;
	}

	public void setEndinboundcount(long endinboundcount) {
		this.endinboundcount = endinboundcount;
	}

	public long getInboundtime() {
		return inboundtime;
	}

	public void setInboundtime(long inboundtime) {
		this.inboundtime = inboundtime;
	}

	public long getEndoutboundcount() {
		return endoutboundcount;
	}

	public void setEndoutboundcount(long endoutboundcount) {
		this.endoutboundcount = endoutboundcount;
	}

	public long getOutboundtime() {
		return outboundtime;
	}

	public void setOutboundtime(long outboundtime) {
		this.outboundtime = outboundtime;
	}

	public long getRestcount() {
		return restcount;
	}

	public void setRestcount(long restcount) {
		this.restcount = restcount;
	}

	public long getResttime() {
		return resttime;
	}

	public void setResttime(long resttime) {
		this.resttime = resttime;
	}

	public long getUnansweredcount() {
		return unansweredcount;
	}

	public void setUnansweredcount(long unansweredcount) {
		this.unansweredcount = unansweredcount;
	}

	public long getMeetingcount() {
		return meetingcount;
	}

	public void setMeetingcount(long meetingcount) {
		this.meetingcount = meetingcount;
	}

	public long getMeetingtime() {
		return meetingtime;
	}

	public void setMeetingtime(long meetingtime) {
		this.meetingtime = meetingtime;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}
	
	
	
}
