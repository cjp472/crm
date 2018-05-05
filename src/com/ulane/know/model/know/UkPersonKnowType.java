package com.ulane.know.model.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UkPersonKnowType Base Java Bean, base class for the.base.model, mapped
 * directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UkPersonKnowType extends com.htsoft.core.model.BaseModel {

	protected Long personKnowTypeId;
	protected Long knowTmpId;
	protected String name;
	protected String comMent;
	protected Long parentId;
	protected java.util.Date updateTime;
	protected Integer knowTypeStatus;
	protected Integer knowSort;
	protected String createBy;
	protected String updateBy;
	protected java.sql.Timestamp createDate;
	protected java.sql.Timestamp updateDate;
	protected String path;
	protected com.htsoft.oa.model.system.AppUser appUser;

	protected java.util.Set ukPersonKnows = new java.util.HashSet();

	public static final String DESC = "私有知识分类";

	/**
	 * Default Empty Constructor for class UkPersonKnowType
	 */
	public UkPersonKnowType() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class UkPersonKnowType
	 */
	public UkPersonKnowType(Long in_personKnowTypeId) {
		this.setPersonKnowTypeId(in_personKnowTypeId);
	}

	public com.htsoft.oa.model.system.AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(com.htsoft.oa.model.system.AppUser in_appUser) {
		this.appUser = in_appUser;
	}

	public java.util.Set getUkPersonKnows() {
		return ukPersonKnows;
	}

	public void setUkPersonKnows(java.util.Set in_ukPersonKnows) {
		this.ukPersonKnows = in_ukPersonKnows;
	}

	/**
	 * 私有知识库分类内码 * @return Long
	 * 
	 * @hibernate.id column="PERSON_KNOW_TYPE_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getPersonKnowTypeId() {
		return this.personKnowTypeId;
	}

	/**
	 * Set the personKnowTypeId
	 */
	public void setPersonKnowTypeId(Long aValue) {
		this.personKnowTypeId = aValue;
	}

	/**
	 * 用户内码 * @return Long
	 */
	public Long getUserid() {
		return this.getAppUser() == null ? null : this.getAppUser().getUserId();
	}

	/**
	 * Set the userid
	 */
	public void setUserid(Long aValue) {
		if (aValue == null) {
			appUser = null;
		} else if (appUser == null) {
			appUser = new com.htsoft.oa.model.system.AppUser(aValue);
			appUser.setVersion(new Integer(0));// set a version to cheat
												// hibernate only
		} else {
			//
			appUser.setUserId(aValue);
		}
	}

	/**
	 * 知识模板编号 * @return Long
	 * 
	 * @hibernate.property column="KNOW_TMP_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getKnowTmpId() {
		return this.knowTmpId;
	}

	/**
	 * Set the knowTmpId
	 */
	public void setKnowTmpId(Long aValue) {
		this.knowTmpId = aValue;
	}

	/**
	 * 名称 * @return String
	 * 
	 * @hibernate.property column="NAME" type="java.lang.String" length="30"
	 *                     not-null="false" unique="false"
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * Set the name
	 */
	public void setName(String aValue) {
		this.name = aValue;
	}

	/**
	 * 备注 * @return String
	 * 
	 * @hibernate.property column="COM_MENT" type="java.lang.String"
	 *                     length="100" not-null="false" unique="false"
	 */
	public String getComMent() {
		return this.comMent;
	}

	/**
	 * Set the comMent
	 */
	public void setComMent(String aValue) {
		this.comMent = aValue;
	}

	/**
	 * 父知识对象 * @return Long
	 * 
	 * @hibernate.property column="PARENT_ID" type="java.lang.Long" length="18"
	 *                     not-null="false" unique="false"
	 */
	public Long getParentId() {
		return this.parentId;
	}

	/**
	 * Set the parentId
	 */
	public void setParentId(Long aValue) {
		this.parentId = aValue;
	}

	/**
	 * 更新时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}

	/**
	 * Set the updateTime
	 */
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}

	/**
	 * 状态 * @return Integer
	 * 
	 * @hibernate.property column="KNOW_TYPE_STATUS" type="java.lang.Integer"
	 *                     length="10" not-null="false" unique="false"
	 */
	public Integer getKnowTypeStatus() {
		return this.knowTypeStatus;
	}

	/**
	 * Set the knowTypeStatus
	 */
	public void setKnowTypeStatus(Integer aValue) {
		this.knowTypeStatus = aValue;
	}

	/**
	 * 顺序 * @return Integer
	 * 
	 * @hibernate.property column="KNOW_SORT" type="java.lang.Integer"
	 *                     length="10" not-null="false" unique="false"
	 */
	public Integer getKnowSort() {
		return this.knowSort;
	}

	/**
	 * Set the knowSort
	 */
	public void setKnowSort(Integer aValue) {
		this.knowSort = aValue;
	}

	/**
	 * 创建人姓名 * @return String
	 * 
	 * @hibernate.property column="CREATE_BY" type="java.lang.String"
	 *                     length="100" not-null="false" unique="false"
	 */
	public String getCreateBy() {
		return this.createBy;
	}

	/**
	 * Set the createBy
	 */
	public void setCreateBy(String aValue) {
		this.createBy = aValue;
	}

	/**
	 * 修改人 * @return String
	 * 
	 * @hibernate.property column="UPDATE_BY" type="java.lang.String"
	 *                     length="100" not-null="false" unique="false"
	 */
	public String getUpdateBy() {
		return this.updateBy;
	}

	/**
	 * Set the updateBy
	 */
	public void setUpdateBy(String aValue) {
		this.updateBy = aValue;
	}

	/**
	 * 创建时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="CREATE_DATE" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getCreateDate() {
		return this.createDate;
	}

	/**
	 * Set the createDate
	 */
	public void setCreateDate(java.sql.Timestamp aValue) {
		this.createDate = aValue;
	}

	/**
	 * 修改时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="UPDATE_DATE" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getUpdateDate() {
		return this.updateDate;
	}

	/**
	 * Set the updateDate
	 */
	public void setUpdateDate(java.sql.Timestamp aValue) {
		this.updateDate = aValue;
	}

	/**
	 * 路径 * @return String
	 * 
	 * @hibernate.property column="PATH" type="java.lang.String" length="100"
	 *                     not-null="false" unique="false"
	 */
	public String getPath() {
		return this.path;
	}

	/**
	 * Set the path
	 */
	public void setPath(String aValue) {
		this.path = aValue;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkPersonKnowType)) {
			return false;
		}
		UkPersonKnowType rhs = (UkPersonKnowType) object;
		return new EqualsBuilder()
				.append(this.personKnowTypeId, rhs.personKnowTypeId)
				.append(this.knowTmpId, rhs.knowTmpId)
				.append(this.name, rhs.name).append(this.comMent, rhs.comMent)
				.append(this.parentId, rhs.parentId)
				.append(this.updateTime, rhs.updateTime)
				.append(this.knowTypeStatus, rhs.knowTypeStatus)
				.append(this.knowSort, rhs.knowSort)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.path, rhs.path).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.personKnowTypeId).append(this.knowTmpId)
				.append(this.name).append(this.comMent).append(this.parentId)
				.append(this.updateTime).append(this.knowTypeStatus)
				.append(this.knowSort).append(this.createBy)
				.append(this.updateBy).append(this.createDate)
				.append(this.updateDate).append(this.path).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("personKnowTypeId", this.personKnowTypeId)
				.append("knowTmpId", this.knowTmpId).append("name", this.name)
				.append("comMent", this.comMent)
				.append("parentId", this.parentId)
				.append("updateTime", this.updateTime)
				.append("knowTypeStatus", this.knowTypeStatus)
				.append("knowSort", this.knowSort)
				.append("createBy", this.createBy)
				.append("updateBy", this.updateBy)
				.append("createDate", this.createDate)
				.append("updateDate", this.updateDate)
				.append("path", this.path).toString();
	}

}
