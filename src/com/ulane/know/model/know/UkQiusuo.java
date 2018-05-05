package com.ulane.know.model.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.system.AppUser;

/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UkQiusuo Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UkQiusuo extends com.htsoft.core.model.BaseModel {

	protected Long qiusuoId;
	protected String content;
	protected java.sql.Timestamp createtime;
	protected java.sql.Timestamp closetime;
	protected AppUser createby;
	protected Long status;
	protected Long score;
	protected String mark;
	protected Integer huifuCount;

	protected java.util.Set ukQiusuoHuifus = new java.util.HashSet();
	protected java.util.Set HuifusOff = new java.util.HashSet();

	public static final Long ON = 0l;
	public static final Long OFF = 1l;
	public static final Long CANCLE = 2l;

	public java.sql.Timestamp getClosetime() {
		return closetime;
	}

	public void setClosetime(java.sql.Timestamp closetime) {
		this.closetime = closetime;
	}

	public java.util.Set getHuifusOff() {
		return HuifusOff;
	}

	public void setHuifusOff(java.util.Set huifusOff) {
		HuifusOff = huifusOff;
	}

	/**
	 * Default Empty Constructor for class UkQiusuo
	 */
	public UkQiusuo() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class UkQiusuo
	 */
	public UkQiusuo(Long in_qiusuoId) {
		this.setQiusuoId(in_qiusuoId);
	}

	public java.util.Set getUkQiusuoHuifus() {
		return ukQiusuoHuifus;
	}

	public void setUkQiusuoHuifus(java.util.Set in_ukQiusuoHuifus) {
		this.ukQiusuoHuifus = in_ukQiusuoHuifus;
	}

	/**
	 * QIUSUO_ID * @return Long
	 * 
	 * @hibernate.id column="QIUSUO_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getQiusuoId() {
		return this.qiusuoId;
	}

	/**
	 * Set the qiusuoId
	 */
	public void setQiusuoId(Long aValue) {
		this.qiusuoId = aValue;
	}

	/**
	 * 内容 * @return String
	 * 
	 * @hibernate.property column="CONTENT" type="java.lang.String"
	 *                     length="1000" not-null="false" unique="false"
	 */
	public String getContent() {
		return this.content;
	}

	/**
	 * Set the content
	 */
	public void setContent(String aValue) {
		this.content = aValue;
	}

	/**
	 * 发起时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="CREATETIME" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getCreatetime() {
		return this.createtime;
	}

	/**
	 * Set the createtime
	 */
	public void setCreatetime(java.sql.Timestamp aValue) {
		this.createtime = aValue;
	}

	/**
	 * 发起人 * @return Long
	 * 
	 * @hibernate.property column="CREATEBY" type="java.lang.Long" length="38"
	 *                     not-null="false" unique="false"
	 */
	public AppUser getCreateby() {
		return this.createby;
	}

	/**
	 * Set the createby
	 */
	public void setCreateby(AppUser aValue) {
		this.createby = aValue;
	}

	/**
	 * 状态 * @return Long
	 * 
	 * @hibernate.property column="STATUS" type="java.lang.Long" length="38"
	 *                     not-null="false" unique="false"
	 */
	public Long getStatus() {
		return this.status;
	}

	/**
	 * Set the status
	 */
	public void setStatus(Long aValue) {
		this.status = aValue;
	}

	/**
	 * 悬赏分数 * @return Long
	 * 
	 * @hibernate.property column="SCORE" type="java.lang.Long" length="38"
	 *                     not-null="false" unique="false"
	 */
	public Long getScore() {
		return this.score;
	}

	/**
	 * Set the score
	 */
	public void setScore(Long aValue) {
		this.score = aValue;
	}

	/**
	 * 说明 * @return String
	 * 
	 * @hibernate.property column="MARK" type="java.lang.String" length="1000"
	 *                     not-null="false" unique="false"
	 */
	public String getMark() {
		return this.mark;
	}

	/**
	 * Set the mark
	 */
	public void setMark(String aValue) {
		this.mark = aValue;
	}

	public Integer getHuifuCount() {
		return huifuCount;
	}

	public void setHuifuCount(Integer huifuCount) {
		this.huifuCount = huifuCount;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkQiusuo)) {
			return false;
		}
		UkQiusuo rhs = (UkQiusuo) object;
		return new EqualsBuilder().append(this.qiusuoId, rhs.qiusuoId)
				.append(this.content, rhs.content)
				.append(this.createtime, rhs.createtime)
				.append(this.createby, rhs.createby)
				.append(this.status, rhs.status).append(this.score, rhs.score)
				.append(this.mark, rhs.mark).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.qiusuoId)
				.append(this.content).append(this.createtime)
				.append(this.createby).append(this.status).append(this.score)
				.append(this.mark).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("qiusuoId", this.qiusuoId)
				.append("content", this.content)
				.append("createtime", this.createtime)
				.append("createby", this.createby)
				.append("status", this.status).append("score", this.score)
				.append("mark", this.mark).toString();
	}

}
