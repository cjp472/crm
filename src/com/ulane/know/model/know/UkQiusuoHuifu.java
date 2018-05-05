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
 * UkQiusuoHuifu Base Java Bean, base class for the.base.model, mapped directly
 * to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UkQiusuoHuifu extends com.htsoft.core.model.BaseModel {

	protected Long qiusuoHuifuId;
	protected String content;
	protected AppUser reply;
	protected java.sql.Timestamp replytime;
	protected Long isdelete;
	protected java.sql.Timestamp updatetime;
	protected com.ulane.know.model.know.UkQiusuo ukQiusuo;

	protected java.util.Set ukQiusuoHuifuFiles = new java.util.HashSet();
	protected java.util.Set ukQiusuoHuifuKnows = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class UkQiusuoHuifu
	 */
	public UkQiusuoHuifu() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class UkQiusuoHuifu
	 */
	public UkQiusuoHuifu(Long in_qiusuoHuifuId) {
		this.setQiusuoHuifuId(in_qiusuoHuifuId);
	}

	public com.ulane.know.model.know.UkQiusuo getUkQiusuo() {
		return ukQiusuo;
	}

	public void setUkQiusuo(com.ulane.know.model.know.UkQiusuo in_ukQiusuo) {
		this.ukQiusuo = in_ukQiusuo;
	}

	public java.util.Set getUkQiusuoHuifuFiles() {
		return ukQiusuoHuifuFiles;
	}

	public void setUkQiusuoHuifuFiles(java.util.Set in_ukQiusuoHuifuFiles) {
		this.ukQiusuoHuifuFiles = in_ukQiusuoHuifuFiles;
	}

	public java.util.Set getUkQiusuoHuifuKnows() {
		return ukQiusuoHuifuKnows;
	}

	public void setUkQiusuoHuifuKnows(java.util.Set in_ukQiusuoHuifuKnows) {
		this.ukQiusuoHuifuKnows = in_ukQiusuoHuifuKnows;
	}

	/**
	 * QIUSUO_HUIFU_ID * @return Long
	 * 
	 * @hibernate.id column="QIUSUO_HUIFU_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getQiusuoHuifuId() {
		return this.qiusuoHuifuId;
	}

	/**
	 * Set the qiusuoHuifuId
	 */
	public void setQiusuoHuifuId(Long aValue) {
		this.qiusuoHuifuId = aValue;
	}

	/**
	 * 求索内码 * @return Long
	 */
	public Long getQiusuoId() {
		return this.getUkQiusuo() == null ? null : this.getUkQiusuo()
				.getQiusuoId();
	}

	/**
	 * Set the qiusuoId
	 */
	public void setQiusuoId(Long aValue) {
		if (aValue == null) {
			ukQiusuo = null;
		} else if (ukQiusuo == null) {
			ukQiusuo = new com.ulane.know.model.know.UkQiusuo(aValue);
			ukQiusuo.setVersion(new Integer(0));// set a version to cheat
												// hibernate only
		} else {
			//
			ukQiusuo.setQiusuoId(aValue);
		}
	}

	/**
	 * 回复内容 * @return String
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
	 * 回复人 * @return String
	 * 
	 * @hibernate.property column="REPLY" type="java.lang.String" length="200"
	 *                     not-null="false" unique="false"
	 */
	public AppUser getReply() {
		return this.reply;
	}

	/**
	 * Set the reply
	 */
	public void setReply(AppUser aValue) {
		this.reply = aValue;
	}

	/**
	 * 回复时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="REPLYTIME" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getReplytime() {
		return this.replytime;
	}

	/**
	 * Set the replytime
	 */
	public void setReplytime(java.sql.Timestamp aValue) {
		this.replytime = aValue;
	}

	/**
	 * 删除标记 * @return Long
	 * 
	 * @hibernate.property column="ISDELETE" type="java.lang.Long" length="22"
	 *                     not-null="false" unique="false"
	 */
	public Long getIsdelete() {
		return this.isdelete;
	}

	/**
	 * Set the isdelete
	 */
	public void setIsdelete(Long aValue) {
		this.isdelete = aValue;
	}

	/**
	 * 修改时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="UPDATETIME" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getUpdatetime() {
		return this.updatetime;
	}

	/**
	 * Set the updatetime
	 */
	public void setUpdatetime(java.sql.Timestamp aValue) {
		this.updatetime = aValue;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkQiusuoHuifu)) {
			return false;
		}
		UkQiusuoHuifu rhs = (UkQiusuoHuifu) object;
		return new EqualsBuilder()
				.append(this.qiusuoHuifuId, rhs.qiusuoHuifuId)
				.append(this.content, rhs.content)
				.append(this.reply, rhs.reply)
				.append(this.replytime, rhs.replytime)
				.append(this.isdelete, rhs.isdelete)
				.append(this.updatetime, rhs.updatetime).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.qiusuoHuifuId).append(this.content)
				.append(this.reply).append(this.replytime)
				.append(this.isdelete).append(this.updatetime).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("qiusuoHuifuId", this.qiusuoHuifuId)
				.append("content", this.content).append("reply", this.reply)
				.append("replytime", this.replytime)
				.append("isdelete", this.isdelete)
				.append("updatetime", this.updatetime).toString();
	}

}
