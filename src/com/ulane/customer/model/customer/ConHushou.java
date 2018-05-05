package com.ulane.customer.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * ConHushou Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ConHushou extends com.htsoft.core.model.BaseModel {

    protected Long conId;
	protected String origAni;
	protected String origDnis;
	protected java.util.Date enterTime;
	protected java.util.Date endTime;
	protected Short endReason;
	protected String vdn;
	protected String split;
	protected String ivrNod;
	protected String agentid;
	protected String station;
	protected Integer dur;
	protected String synTime;
	protected Integer assignId;
	protected java.util.Date assignTime;
	protected Integer ownerId;
	protected java.util.Date acceptTime;
	protected Short dealStaId;
	protected Short dealResId;
	protected String dealRemarks;


	/**
	 * Default Empty Constructor for class ConHushou
	 */
	public ConHushou () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConHushou
	 */
	public ConHushou (
		 Long in_conId
        ) {
		this.setConId(in_conId);
    }

    

	/**
	 * 联络ID	 * @return Long
     * @hibernate.id column="CON_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getConId() {
		return this.conId;
	}
	
	/**
	 * Set the conId
	 */	
	public void setConId(Long aValue) {
		this.conId = aValue;
	}	

	/**
	 * 主叫	 * @return String
	 * @hibernate.property column="ORIG_ANI" type="java.lang.String" length="20" not-null="true" unique="false"
	 */
	public String getOrigAni() {
		return this.origAni;
	}
	
	/**
	 * Set the origAni
	 * @spring.validator type="required"
	 */	
	public void setOrigAni(String aValue) {
		this.origAni = aValue;
	}	

	/**
	 * 被叫	 * @return String
	 * @hibernate.property column="ORIG_DNIS" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getOrigDnis() {
		return this.origDnis;
	}
	
	/**
	 * Set the origDnis
	 */	
	public void setOrigDnis(String aValue) {
		this.origDnis = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="Enter_Time" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getEnterTime() {
		return this.enterTime;
	}
	
	/**
	 * Set the enterTime
	 * @spring.validator type="required"
	 */	
	public void setEnterTime(java.util.Date aValue) {
		this.enterTime = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="End_Time" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getEndTime() {
		return this.endTime;
	}
	
	/**
	 * Set the endTime
	 * @spring.validator type="required"
	 */	
	public void setEndTime(java.util.Date aValue) {
		this.endTime = aValue;
	}	

	/**
	 * 呼损原因:VDN、技能组、IVR、振铃	 * @return Short
	 * @hibernate.property column="END_REASON" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getEndReason() {
		return this.endReason;
	}
	
	/**
	 * Set the endReason
	 * @spring.validator type="required"
	 */	
	public void setEndReason(Short aValue) {
		this.endReason = aValue;
	}	

	/**
	 * VDN	 * @return String
	 * @hibernate.property column="VDN" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getVdn() {
		return this.vdn;
	}
	
	/**
	 * Set the vdn
	 */	
	public void setVdn(String aValue) {
		this.vdn = aValue;
	}	

	/**
	 * 技能组	 * @return String
	 * @hibernate.property column="Split" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getSplit() {
		return this.split;
	}
	
	/**
	 * Set the split
	 */	
	public void setSplit(String aValue) {
		this.split = aValue;
	}	

	/**
	 * IVR节点	 * @return String
	 * @hibernate.property column="IVR_NOD" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getIvrNod() {
		return this.ivrNod;
	}
	
	/**
	 * Set the ivrNod
	 */	
	public void setIvrNod(String aValue) {
		this.ivrNod = aValue;
	}	

	/**
	 * 接入工号	 * @return String
	 * @hibernate.property column="AgentID" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getAgentid() {
		return this.agentid;
	}
	
	/**
	 * Set the agentid
	 */	
	public void setAgentid(String aValue) {
		this.agentid = aValue;
	}	

	/**
	 * 接入分机号	 * @return String
	 * @hibernate.property column="Station" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getStation() {
		return this.station;
	}
	
	/**
	 * Set the station
	 */	
	public void setStation(String aValue) {
		this.station = aValue;
	}	

	/**
	 * 时长	 * @return Integer
	 * @hibernate.property column="DUR" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getDur() {
		return this.dur;
	}
	
	/**
	 * Set the dur
	 * @spring.validator type="required"
	 */	
	public void setDur(Integer aValue) {
		this.dur = aValue;
	}	

	/**
	 * 同步时间	 * @return String
	 * @hibernate.property column="SYN_TIME" type="java.lang.String" length="30" not-null="true" unique="false"
	 */
	public String getSynTime() {
		return this.synTime;
	}
	
	/**
	 * Set the synTime
	 * @spring.validator type="required"
	 */	
	public void setSynTime(String aValue) {
		this.synTime = aValue;
	}	

	/**
	 * 分配人	 * @return Integer
	 * @hibernate.property column="ASSIGN_ID" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getAssignId() {
		return this.assignId;
	}
	
	/**
	 * Set the assignId
	 */	
	public void setAssignId(Integer aValue) {
		this.assignId = aValue;
	}	

	/**
	 * 分配时间	 * @return java.util.Date
	 * @hibernate.property column="ASSIGN_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getAssignTime() {
		return this.assignTime;
	}
	
	/**
	 * Set the assignTime
	 */	
	public void setAssignTime(java.util.Date aValue) {
		this.assignTime = aValue;
	}	

	/**
	 * 负责人	 * @return Integer
	 * @hibernate.property column="OWNER_ID" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getOwnerId() {
		return this.ownerId;
	}
	
	/**
	 * Set the ownerId
	 */	
	public void setOwnerId(Integer aValue) {
		this.ownerId = aValue;
	}	

	/**
	 * 领用时间	 * @return java.util.Date
	 * @hibernate.property column="ACCEPT_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getAcceptTime() {
		return this.acceptTime;
	}
	
	/**
	 * Set the acceptTime
	 */	
	public void setAcceptTime(java.util.Date aValue) {
		this.acceptTime = aValue;
	}	

	/**
	 * 处理状态	 * @return Short
	 * @hibernate.property column="DEAL_STA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getDealStaId() {
		return this.dealStaId;
	}
	
	/**
	 * Set the dealStaId
	 */	
	public void setDealStaId(Short aValue) {
		this.dealStaId = aValue;
	}	

	/**
	 * 处理结果	 * @return Short
	 * @hibernate.property column="DEAL_RES_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getDealResId() {
		return this.dealResId;
	}
	
	/**
	 * Set the dealResId
	 */	
	public void setDealResId(Short aValue) {
		this.dealResId = aValue;
	}	

	/**
	 * 处理备注	 * @return String
	 * @hibernate.property column="DEAL_REMARKS" type="java.lang.String" length="2000" not-null="false" unique="false"
	 */
	public String getDealRemarks() {
		return this.dealRemarks;
	}
	
	/**
	 * Set the dealRemarks
	 */	
	public void setDealRemarks(String aValue) {
		this.dealRemarks = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConHushou)) {
			return false;
		}
		ConHushou rhs = (ConHushou) object;
		return new EqualsBuilder()
				.append(this.conId, rhs.conId)
				.append(this.origAni, rhs.origAni)
				.append(this.origDnis, rhs.origDnis)
				.append(this.enterTime, rhs.enterTime)
				.append(this.endTime, rhs.endTime)
				.append(this.endReason, rhs.endReason)
				.append(this.vdn, rhs.vdn)
				.append(this.split, rhs.split)
				.append(this.ivrNod, rhs.ivrNod)
				.append(this.agentid, rhs.agentid)
				.append(this.station, rhs.station)
				.append(this.dur, rhs.dur)
				.append(this.synTime, rhs.synTime)
				.append(this.assignId, rhs.assignId)
				.append(this.assignTime, rhs.assignTime)
				.append(this.ownerId, rhs.ownerId)
				.append(this.acceptTime, rhs.acceptTime)
				.append(this.dealStaId, rhs.dealStaId)
				.append(this.dealResId, rhs.dealResId)
				.append(this.dealRemarks, rhs.dealRemarks)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.conId) 
				.append(this.origAni) 
				.append(this.origDnis) 
				.append(this.enterTime) 
				.append(this.endTime) 
				.append(this.endReason) 
				.append(this.vdn) 
				.append(this.split) 
				.append(this.ivrNod) 
				.append(this.agentid) 
				.append(this.station) 
				.append(this.dur) 
				.append(this.synTime) 
				.append(this.assignId) 
				.append(this.assignTime) 
				.append(this.ownerId) 
				.append(this.acceptTime) 
				.append(this.dealStaId) 
				.append(this.dealResId) 
				.append(this.dealRemarks) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("conId", this.conId) 
				.append("origAni", this.origAni) 
				.append("origDnis", this.origDnis) 
				.append("enterTime", this.enterTime) 
				.append("endTime", this.endTime) 
				.append("endReason", this.endReason) 
				.append("vdn", this.vdn) 
				.append("split", this.split) 
				.append("ivrNod", this.ivrNod) 
				.append("agentid", this.agentid) 
				.append("station", this.station) 
				.append("dur", this.dur) 
				.append("synTime", this.synTime) 
				.append("assignId", this.assignId) 
				.append("assignTime", this.assignTime) 
				.append("ownerId", this.ownerId) 
				.append("acceptTime", this.acceptTime) 
				.append("dealStaId", this.dealStaId) 
				.append("dealResId", this.dealResId) 
				.append("dealRemarks", this.dealRemarks) 
				.toString();
	}



}
