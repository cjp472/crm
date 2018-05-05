package com.ulane.know.model.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.system.FileAttach;

/**
 * UkKnowFankui Base Java Bean, base class for the.base.model, mapped directly
 * to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UkKnowFankui extends com.htsoft.core.model.BaseModel {

	protected Long fankuiId;
	protected String fankuiTitle;
	protected java.sql.Timestamp fankuiTime;
	protected String fankuiContent;
	protected Long userid;
	protected String fileid;
	protected String reKnowId;
	protected Integer knowStatus;
	protected com.ulane.know.model.know.UkSysKnow ukSysKnow;

	protected Set<FileAttach> ukKnowFankuiFile = new HashSet<FileAttach>();
	protected Set<UkSysKnow> reKnow = new HashSet<UkSysKnow>();

	public Set<UkSysKnow> getReKnow() {
		return reKnow;
	}

	public void setReKnow(Set<UkSysKnow> reKnow) {
		this.reKnow = reKnow;
	}

	public String getReKnowId() {
		return reKnowId;
	}

	public void setReKnowId(String reKnowId) {
		this.reKnowId = reKnowId;
	}

	/**
	 * Default Empty Constructor for class UkKnowFankui
	 */
	public UkKnowFankui() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class UkKnowFankui
	 */
	public UkKnowFankui(Long in_fankuiId) {
		this.setFankuiId(in_fankuiId);
	}

	public Set<FileAttach> getUkKnowFankuiFile() {
		return ukKnowFankuiFile;
	}

	public void setUkKnowFankuiFile(Set<FileAttach> ukKnowFankuiFile) {
		this.ukKnowFankuiFile = ukKnowFankuiFile;
	}

	public com.ulane.know.model.know.UkSysKnow getUkSysKnow() {
		return ukSysKnow;
	}

	public void setUkSysKnow(com.ulane.know.model.know.UkSysKnow in_ukSysKnow) {
		this.ukSysKnow = in_ukSysKnow;
	}

	/**
	 * 反馈内码 * @return Long
	 * 
	 * @hibernate.id column="FANKUI_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getFankuiId() {
		return this.fankuiId;
	}

	/**
	 * Set the fankuiId
	 */
	public void setFankuiId(Long aValue) {
		this.fankuiId = aValue;
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
	 * 标题 * @return String
	 * 
	 * @hibernate.property column="FANKUI_TITLE" type="java.lang.String"
	 *                     length="30" not-null="false" unique="false"
	 */
	public String getFankuiTitle() {
		return this.fankuiTitle;
	}

	/**
	 * Set the fankuiTitle
	 */
	public void setFankuiTitle(String aValue) {
		this.fankuiTitle = aValue;
	}

	/**
	 * 反馈时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="FANKUI_TIME" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getFankuiTime() {
		return this.fankuiTime;
	}

	/**
	 * Set the fankuiTime
	 */
	public void setFankuiTime(java.sql.Timestamp aValue) {
		this.fankuiTime = aValue;
	}

	/**
	 * 反馈内容 * @return String
	 * 
	 * @hibernate.property column="FANKUI_CONTENT" type="java.lang.String"
	 *                     length="300" not-null="false" unique="false"
	 */
	public String getFankuiContent() {
		return this.fankuiContent;
	}

	/**
	 * Set the fankuiContent
	 */
	public void setFankuiContent(String aValue) {
		this.fankuiContent = aValue;
	}

	/**
	 * 反馈人 * @return Long
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
	 * 附件 * @return Long
	 * 
	 * @hibernate.property column="FILEID" type="java.lang.Long" length="38"
	 *                     not-null="false" unique="false"
	 */
	public String getFileid() {
		return this.fileid;
	}

	/**
	 * Set the fileid
	 */
	public void setFileid(String aValue) {
		this.fileid = aValue;
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
		if (!(object instanceof UkKnowFankui)) {
			return false;
		}
		UkKnowFankui rhs = (UkKnowFankui) object;
		return new EqualsBuilder().append(this.fankuiId, rhs.fankuiId)
				.append(this.fankuiTitle, rhs.fankuiTitle)
				.append(this.fankuiTime, rhs.fankuiTime)
				.append(this.fankuiContent, rhs.fankuiContent)
				.append(this.userid, rhs.userid)
				.append(this.fileid, rhs.fileid)
				.append(this.knowStatus, rhs.knowStatus).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.fankuiId)
				.append(this.fankuiTitle).append(this.fankuiTime)
				.append(this.fankuiContent).append(this.userid)
				.append(this.fileid).append(this.knowStatus).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("fankuiId", this.fankuiId)
				.append("fankuiTitle", this.fankuiTitle)
				.append("fankuiTime", this.fankuiTime)
				.append("fankuiContent", this.fankuiContent)
				.append("userid", this.userid).append("fileid", this.fileid)
				.append("knowStatus", this.knowStatus).toString();
	}

}
