package com.ulane.supply.model.goods;
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
 * ScPriceVersion Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScPriceVersion extends com.htsoft.core.model.BaseModel {

    protected Long versionId;
	protected Short versionType;
	protected String versionNum;
	protected String versionName;
	protected java.util.Date effectTime;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime2;
	protected String desc;

	protected java.util.Set scGoodsPriceRules = new java.util.HashSet();
	protected java.util.Set scGoodsPriceVersions = new java.util.HashSet();
	protected java.util.Set scPurpriceVersions = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScPriceVersion
	 */
	public ScPriceVersion () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScPriceVersion
	 */
	public ScPriceVersion (
		 Long in_versionId
        ) {
		this.setVersionId(in_versionId);
    }


	public java.util.Set getScGoodsPriceRules () {
		return scGoodsPriceRules;
	}	
	
	public void setScGoodsPriceRules (java.util.Set in_scGoodsPriceRules) {
		this.scGoodsPriceRules = in_scGoodsPriceRules;
	}

	public java.util.Set getScGoodsPriceVersions () {
		return scGoodsPriceVersions;
	}	
	
	public void setScGoodsPriceVersions (java.util.Set in_scGoodsPriceVersions) {
		this.scGoodsPriceVersions = in_scGoodsPriceVersions;
	}

	public java.util.Set getScPurpriceVersions () {
		return scPurpriceVersions;
	}	
	
	public void setScPurpriceVersions (java.util.Set in_scPurpriceVersions) {
		this.scPurpriceVersions = in_scPurpriceVersions;
	}
    

	/**
	 * 版本内码	 * @return Long
     * @hibernate.id column="VERSION_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getVersionId() {
		return this.versionId;
	}
	
	/**
	 * Set the versionId
	 */	
	public void setVersionId(Long aValue) {
		this.versionId = aValue;
	}	

	/**
	 * 版本类型	 * @return Short
	 * @hibernate.property column="VERSION_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getVersionType() {
		return this.versionType;
	}
	
	/**
	 * Set the versionType
	 */	
	public void setVersionType(Short aValue) {
		this.versionType = aValue;
	}	

	/**
	 * 版本号	 * @return String
	 * @hibernate.property column="VERSION_NUM" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getVersionNum() {
		return this.versionNum;
	}
	
	/**
	 * Set the versionNum
	 */	
	public void setVersionNum(String aValue) {
		this.versionNum = aValue;
	}	

	/**
	 * 版本名	 * @return String
	 * @hibernate.property column="VERSION_NAME" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getVersionName() {
		return this.versionName;
	}
	
	/**
	 * Set the versionName
	 */	
	public void setVersionName(String aValue) {
		this.versionName = aValue;
	}	

	/**
	 * 生效时间	 * @return java.util.Date
	 * @hibernate.property column="EFFECT_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEffectTime() {
		return this.effectTime;
	}
	
	/**
	 * Set the effectTime
	 */	
	public void setEffectTime(java.util.Date aValue) {
		this.effectTime = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_USER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCreateUserId() {
		return this.createUserId;
	}
	
	/**
	 * Set the createUserId
	 */	
	public void setCreateUserId(Long aValue) {
		this.createUserId = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreateTime() {
		return this.createTime;
	}
	
	/**
	 * Set the createTime
	 */	
	public void setCreateTime(java.util.Date aValue) {
		this.createTime = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_USER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdateUserId() {
		return this.updateUserId;
	}
	
	/**
	 * Set the updateUserId
	 */	
	public void setUpdateUserId(Long aValue) {
		this.updateUserId = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_TIME2" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateTime2() {
		return this.updateTime2;
	}
	
	/**
	 * Set the updateTime2
	 */	
	public void setUpdateTime2(java.util.Date aValue) {
		this.updateTime2 = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="DESC" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getDesc() {
		return this.desc;
	}
	
	/**
	 * Set the desc
	 */	
	public void setDesc(String aValue) {
		this.desc = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScPriceVersion)) {
			return false;
		}
		ScPriceVersion rhs = (ScPriceVersion) object;
		return new EqualsBuilder()
				.append(this.versionId, rhs.versionId)
				.append(this.versionType, rhs.versionType)
				.append(this.versionNum, rhs.versionNum)
				.append(this.versionName, rhs.versionName)
				.append(this.effectTime, rhs.effectTime)
				.append(this.createUserId, rhs.createUserId)
				.append(this.createTime, rhs.createTime)
				.append(this.updateUserId, rhs.updateUserId)
				.append(this.updateTime2, rhs.updateTime2)
				.append(this.desc, rhs.desc)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.versionId) 
				.append(this.versionType) 
				.append(this.versionNum) 
				.append(this.versionName) 
				.append(this.effectTime) 
				.append(this.createUserId) 
				.append(this.createTime) 
				.append(this.updateUserId) 
				.append(this.updateTime2) 
				.append(this.desc) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("versionId", this.versionId) 
				.append("versionType", this.versionType) 
				.append("versionNum", this.versionNum) 
				.append("versionName", this.versionName) 
				.append("effectTime", this.effectTime) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime2", this.updateTime2) 
				.append("desc", this.desc) 
				.toString();
	}



}
