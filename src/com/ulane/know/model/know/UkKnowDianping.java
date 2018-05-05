package com.ulane.know.model.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * UkKnowDianping Base Java Bean, base class for the.base.model, mapped directly
 * to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UkKnowDianping extends com.htsoft.core.model.BaseModel {

	protected Long dianpingId;
	protected Integer dianpingValue;
	protected java.sql.Timestamp dianpingTime;
	protected String dianpingComment;
	protected Long userid;
	protected Integer knowStatus;
	protected String title;
	protected com.ulane.know.model.know.UkSysKnow ukSysKnow;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * Default Empty Constructor for class UkKnowDianping
	 */
	public UkKnowDianping() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class UkKnowDianping
	 */
	public UkKnowDianping(Long in_dianpingId) {
		this.setDianpingId(in_dianpingId);
	}

	public com.ulane.know.model.know.UkSysKnow getUkSysKnow() {
		return ukSysKnow;
	}

	public void setUkSysKnow(com.ulane.know.model.know.UkSysKnow in_ukSysKnow) {
		this.ukSysKnow = in_ukSysKnow;
	}

	/**
	 * 点评内码 * @return Long
	 * 
	 * @hibernate.id column="DIANPING_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getDianpingId() {
		return this.dianpingId;
	}

	/**
	 * Set the dianpingId
	 */
	public void setDianpingId(Long aValue) {
		this.dianpingId = aValue;
	}

	/**
	 * 系统知识内码 * @return Long
	 */
	public Long getKnowId() {
		return this.getUkSysKnow() == null ? null : this.getUkSysKnow()
				.getKnowId();
	}

	/**
	 * Set the knowId
	 */
	public void setKnowId(Long aValue) {
		if (aValue == null) {
			ukSysKnow = null;
		} else if (ukSysKnow == null) {
			ukSysKnow = new com.ulane.know.model.know.UkSysKnow(aValue);
			ukSysKnow.setVersion(new Integer(0));// set a version to cheat
													// hibernate only
		} else {
			//
			ukSysKnow.setKnowId(aValue);
		}
	}

	/**
	 * 点评值 * @return Integer
	 * 
	 * @hibernate.property column="DIANPING_VALUE" type="java.lang.Integer"
	 *                     length="10" not-null="false" unique="false"
	 */
	public Integer getDianpingValue() {
		return this.dianpingValue;
	}

	/**
	 * Set the dianpingValue
	 */
	public void setDianpingValue(Integer aValue) {
		this.dianpingValue = aValue;
	}

	/**
	 * 点评时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="DIANPING_TIME" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getDianpingTime() {
		return this.dianpingTime;
	}

	/**
	 * Set the dianpingTime
	 */
	public void setDianpingTime(java.sql.Timestamp aValue) {
		this.dianpingTime = aValue;
	}

	/**
	 * 备注 * @return String
	 * 
	 * @hibernate.property column="DIANPING_COMMENT" type="java.lang.String"
	 *                     length="500" not-null="false" unique="false"
	 */
	public String getDianpingComment() {
		return this.dianpingComment;
	}

	/**
	 * Set the dianpingComment
	 */
	public void setDianpingComment(String aValue) {
		this.dianpingComment = aValue;
	}

	/**
	 * 点评人 * @return Long
	 * 
	 * @hibernate.property column="USERID" type="java.lang.Long" length="38"
	 *                     not-null="false" unique="false"
	 */
	public Long getUserid() {
		return this.userid;
	}

	/**
	 * Set the userid
	 */
	public void setUserid(Long aValue) {
		this.userid = aValue;
	}

	/**
	 * 状态&KNOW_STATUS * @return Integer
	 * 
	 * @hibernate.property column="KNOW_STATUS" type="java.lang.Integer"
	 *                     length="10" not-null="false" unique="false"
	 */
	public Integer getKnowStatus() {
		return this.knowStatus;
	}

	/**
	 * Set the knowStatus
	 */
	public void setKnowStatus(Integer aValue) {
		this.knowStatus = aValue;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkKnowDianping)) {
			return false;
		}
		UkKnowDianping rhs = (UkKnowDianping) object;
		return new EqualsBuilder().append(this.dianpingId, rhs.dianpingId)
				.append(this.dianpingValue, rhs.dianpingValue)
				.append(this.dianpingTime, rhs.dianpingTime)
				.append(this.dianpingComment, rhs.dianpingComment)
				.append(this.userid, rhs.userid)
				.append(this.knowStatus, rhs.knowStatus).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.dianpingId).append(this.dianpingValue)
				.append(this.dianpingTime).append(this.dianpingComment)
				.append(this.userid).append(this.knowStatus).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("dianpingId", this.dianpingId)
				.append("dianpingValue", this.dianpingValue)
				.append("dianpingTime", this.dianpingTime)
				.append("dianpingComment", this.dianpingComment)
				.append("userid", this.userid)
				.append("knowStatus", this.knowStatus).toString();
	}

}
