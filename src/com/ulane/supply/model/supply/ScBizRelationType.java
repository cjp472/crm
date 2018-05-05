package com.ulane.supply.model.supply;
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
 * ScBizRelationType Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScBizRelationType extends com.htsoft.core.model.BaseModel {

    protected Long bizOrderRelationType;
	protected String bizOrderRelationTypeName;
	protected String bizOrderRelationTypeDesc;

	protected java.util.Set scBizOrderRelateds = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScBizRelationType
	 */
	public ScBizRelationType () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScBizRelationType
	 */
	public ScBizRelationType (
		 Long in_bizOrderRelationType
        ) {
		this.setBizOrderRelationType(in_bizOrderRelationType);
    }


	public java.util.Set getScBizOrderRelateds () {
		return scBizOrderRelateds;
	}	
	
	public void setScBizOrderRelateds (java.util.Set in_scBizOrderRelateds) {
		this.scBizOrderRelateds = in_scBizOrderRelateds;
	}
    

	/**
	 * 业务单关联类型内码	 * @return Long
     * @hibernate.id column="BIZ_ORDER_RELATION_TYPE" type="java.lang.Long" generator-class="native"
	 */
	public Long getBizOrderRelationType() {
		return this.bizOrderRelationType;
	}
	
	/**
	 * Set the bizOrderRelationType
	 */	
	public void setBizOrderRelationType(Long aValue) {
		this.bizOrderRelationType = aValue;
	}	

	/**
	 * 业务单关联类型名称	 * @return String
	 * @hibernate.property column="BIZ_ORDER_RELATION_TYPE_NAME" type="java.lang.String" length="60" not-null="true" unique="false"
	 */
	public String getBizOrderRelationTypeName() {
		return this.bizOrderRelationTypeName;
	}
	
	/**
	 * Set the bizOrderRelationTypeName
	 * @spring.validator type="required"
	 */	
	public void setBizOrderRelationTypeName(String aValue) {
		this.bizOrderRelationTypeName = aValue;
	}	

	/**
	 * 业务单关联类型描述	 * @return String
	 * @hibernate.property column="BIZ_ORDER_RELATION_TYPE_DESC" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getBizOrderRelationTypeDesc() {
		return this.bizOrderRelationTypeDesc;
	}
	
	/**
	 * Set the bizOrderRelationTypeDesc
	 */	
	public void setBizOrderRelationTypeDesc(String aValue) {
		this.bizOrderRelationTypeDesc = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScBizRelationType)) {
			return false;
		}
		ScBizRelationType rhs = (ScBizRelationType) object;
		return new EqualsBuilder()
				.append(this.bizOrderRelationType, rhs.bizOrderRelationType)
				.append(this.bizOrderRelationTypeName, rhs.bizOrderRelationTypeName)
				.append(this.bizOrderRelationTypeDesc, rhs.bizOrderRelationTypeDesc)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bizOrderRelationType) 
				.append(this.bizOrderRelationTypeName) 
				.append(this.bizOrderRelationTypeDesc) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bizOrderRelationType", this.bizOrderRelationType) 
				.append("bizOrderRelationTypeName", this.bizOrderRelationTypeName) 
				.append("bizOrderRelationTypeDesc", this.bizOrderRelationTypeDesc) 
				.toString();
	}



}
