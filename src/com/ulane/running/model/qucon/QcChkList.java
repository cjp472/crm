package com.ulane.running.model.qucon;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * QcChkList Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class QcChkList extends com.htsoft.core.model.BaseModel {

	protected Long chkListId;
	protected Long chkUseId;
	protected Long objTyeId;
	protected String objId;
	protected java.util.Date assTime;
	protected Short chkStaId;
	protected java.util.Date chkTimeSta;
	protected java.util.Date chkTimeEnd;

	/**
	 * Default Empty Constructor for class QcChkList
	 */
	public QcChkList() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class QcChkList
	 */
	public QcChkList(Long in_chkListId) {
		this.setChkListId(in_chkListId);
	}

	/**
	 * 考核列表内码 * @return Long
	 * 
	 * @hibernate.id column="CHK_LIST_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getChkListId() {
		return this.chkListId;
	}

	/**
	 * Set the chkListId
	 */
	public void setChkListId(Long aValue) {
		this.chkListId = aValue;
	}

	/**
	 * 质检人 * @return Long
	 * 
	 * @hibernate.property column="CHK_USE_ID" type="java.lang.Long" length="18"
	 *                     not-null="true" unique="false"
	 */
	public Long getChkUseId() {
		return this.chkUseId;
	}

	/**
	 * Set the chkUseId
	 * 
	 * @spring.validator type="required"
	 */
	public void setChkUseId(Long aValue) {
		this.chkUseId = aValue;
	}

	/**
	 * 考核对象类型:联络历史、工单等 * @return Long
	 * 
	 * @hibernate.property column="OBJ_TYE_ID" type="java.lang.Long" length="18"
	 *                     not-null="true" unique="false"
	 */
	public Long getObjTyeId() {
		return this.objTyeId;
	}

	/**
	 * Set the objTyeId
	 * 
	 * @spring.validator type="required"
	 */
	public void setObjTyeId(Long aValue) {
		this.objTyeId = aValue;
	}

	/**
	 * 对象编号 * @return String
	 * 
	 * @hibernate.property column="OBJ_ID" type="java.lang.String" length="100"
	 *                     not-null="true" unique="false"
	 */
	public String getObjId() {
		return this.objId;
	}

	/**
	 * Set the objId
	 * 
	 * @spring.validator type="required"
	 */
	public void setObjId(String aValue) {
		this.objId = aValue;
	}

	/**
	 * 分配时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="ASS_TIME" type="java.util.Date" length="7"
	 *                     not-null="true" unique="false"
	 */
	public java.util.Date getAssTime() {
		return this.assTime;
	}

	/**
	 * Set the assTime
	 * 
	 * @spring.validator type="required"
	 */
	public void setAssTime(java.util.Date aValue) {
		this.assTime = aValue;
	}

	/**
	 * 考核状态 * @return Short
	 * 
	 * @hibernate.property column="CHK_STA_ID" type="java.lang.Short" length="5"
	 *                     not-null="true" unique="false"
	 */
	public Short getChkStaId() {
		return this.chkStaId;
	}

	/**
	 * Set the chkStaId
	 * 
	 * @spring.validator type="required"
	 */
	public void setChkStaId(Short aValue) {
		this.chkStaId = aValue;
	}

	/**
	 * 考核开始时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="CHK_TIME_STA" type="java.util.Date"
	 *                     length="7" not-null="false" unique="false"
	 */
	public java.util.Date getChkTimeSta() {
		return this.chkTimeSta;
	}

	/**
	 * Set the chkTimeSta
	 */
	public void setChkTimeSta(java.util.Date aValue) {
		this.chkTimeSta = aValue;
	}

	/**
	 * 考核完成时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="CHK_TIME_END" type="java.util.Date"
	 *                     length="7" not-null="false" unique="false"
	 */
	public java.util.Date getChkTimeEnd() {
		return this.chkTimeEnd;
	}

	/**
	 * Set the chkTimeEnd
	 */
	public void setChkTimeEnd(java.util.Date aValue) {
		this.chkTimeEnd = aValue;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcChkList)) {
			return false;
		}
		QcChkList rhs = (QcChkList) object;
		return new EqualsBuilder().append(this.chkListId, rhs.chkListId)
				.append(this.chkUseId, rhs.chkUseId)
				.append(this.objTyeId, rhs.objTyeId)
				.append(this.objId, rhs.objId)
				.append(this.assTime, rhs.assTime)
				.append(this.chkStaId, rhs.chkStaId)
				.append(this.chkTimeSta, rhs.chkTimeSta)
				.append(this.chkTimeEnd, rhs.chkTimeEnd).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.chkListId).append(this.chkUseId)
				.append(this.objTyeId).append(this.objId).append(this.assTime)
				.append(this.chkStaId).append(this.chkTimeSta)
				.append(this.chkTimeEnd).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("chkListId", this.chkListId)
				.append("chkUseId", this.chkUseId)
				.append("objTyeId", this.objTyeId).append("objId", this.objId)
				.append("assTime", this.assTime)
				.append("chkStaId", this.chkStaId)
				.append("chkTimeSta", this.chkTimeSta)
				.append("chkTimeEnd", this.chkTimeEnd).toString();
	}

}
