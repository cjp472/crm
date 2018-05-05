package com.ulane.callout.model.outb;
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
 * ObCallbatchExtract Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObCallbatchExtract extends com.htsoft.core.model.BaseModel {

    protected Long extractId;
	protected Long userId;
	protected Long fromCallbatchId;
	protected Long toCallbatchId;
	protected java.util.Date staDat;
	protected AppUser user;
	protected com.ulane.callout.model.outb.ObCallbatch fromObCallbatch;
	protected com.ulane.callout.model.outb.ObCallbatch toObCallbatch;


	public com.ulane.callout.model.outb.ObCallbatch getFromObCallbatch() {
		return fromObCallbatch;
	}

	public void setFromObCallbatch(
			com.ulane.callout.model.outb.ObCallbatch fromObCallbatch) {
		this.fromObCallbatch = fromObCallbatch;
	}

	public com.ulane.callout.model.outb.ObCallbatch getToObCallbatch() {
		return toObCallbatch;
	}

	public void setToObCallbatch(
			com.ulane.callout.model.outb.ObCallbatch toObCallbatch) {
		this.toObCallbatch = toObCallbatch;
	}

	/**
	 * Default Empty Constructor for class ObCallbatchExtract
	 */
	public ObCallbatchExtract () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObCallbatchExtract
	 */
	public ObCallbatchExtract (
		 Long in_extractId
        ) {
		this.setExtractId(in_extractId);
    }

    

	/**
	 * 抽取历史内码	 * @return Long
     * @hibernate.id column="EXTRACT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getExtractId() {
		return this.extractId;
	}
	
	/**
	 * Set the extractId
	 */	
	public void setExtractId(Long aValue) {
		this.extractId = aValue;
	}	

	/**
	 * 抽取人	 * @return Long
	 * @hibernate.property column="USER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUserId() {
		return this.userId;
	}
	
	/**
	 * Set the userId
	 */	
	public void setUserId(Long aValue) {
		this.userId = aValue;
	}	

	/**
	 * 来源批次	 * @return Long
	 * @hibernate.property column="FROM_CALLBATCH_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getFromCallbatchId() {
		return this.fromCallbatchId;
	}
	
	/**
	 * Set the fromCallbatchId
	 */	
	public void setFromCallbatchId(Long aValue) {
		this.fromCallbatchId = aValue;
	}	

	/**
	 * 目标批次	 * @return Long
	 * @hibernate.property column="TO_CALLBATCH_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getToCallbatchId() {
		return this.toCallbatchId;
	}
	
	/**
	 * Set the toCallbatchId
	 */	
	public void setToCallbatchId(Long aValue) {
		this.toCallbatchId = aValue;
	}	

	/**
	 * 抽取时间	 * @return java.util.Date
	 * @hibernate.property column="STA_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getStaDat() {
		return this.staDat;
	}
	
	/**
	 * Set the staDat
	 */	
	public void setStaDat(java.util.Date aValue) {
		this.staDat = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObCallbatchExtract)) {
			return false;
		}
		ObCallbatchExtract rhs = (ObCallbatchExtract) object;
		return new EqualsBuilder()
				.append(this.extractId, rhs.extractId)
				.append(this.userId, rhs.userId)
				.append(this.fromCallbatchId, rhs.fromCallbatchId)
				.append(this.toCallbatchId, rhs.toCallbatchId)
				.append(this.staDat, rhs.staDat)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.extractId) 
				.append(this.userId) 
				.append(this.fromCallbatchId) 
				.append(this.toCallbatchId) 
				.append(this.staDat) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("extractId", this.extractId) 
				.append("userId", this.userId) 
				.append("fromCallbatchId", this.fromCallbatchId) 
				.append("toCallbatchId", this.toCallbatchId) 
				.append("staDat", this.staDat) 
				.toString();
	}

	public AppUser getUser() {
		return user;
	}

	public void setUser(AppUser user) {
		this.user = user;
	}



}
