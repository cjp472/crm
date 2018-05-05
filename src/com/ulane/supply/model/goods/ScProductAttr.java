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
 * ScProductAttr Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScProductAttr extends com.htsoft.core.model.BaseModel {

    protected Long productAttrCode;
	protected String productAttrVal;
	protected String fieldName;
	protected Short fieldType;
	protected Short formType;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime;
	protected String desc;
	protected com.ulane.supply.model.goods.ScProductClassify scProductClassify;

	protected java.util.Set scProductAttrVals = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScProductAttr
	 */
	public ScProductAttr () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScProductAttr
	 */
	public ScProductAttr (
		 Long in_productAttrCode
        ) {
		this.setProductAttrCode(in_productAttrCode);
    }

	
	public com.ulane.supply.model.goods.ScProductClassify getScProductClassify () {
		return scProductClassify;
	}	
	
	public void setScProductClassify (com.ulane.supply.model.goods.ScProductClassify in_scProductClassify) {
		this.scProductClassify = in_scProductClassify;
	}

	public java.util.Set getScProductAttrVals () {
		return scProductAttrVals;
	}	
	
	public void setScProductAttrVals (java.util.Set in_scProductAttrVals) {
		this.scProductAttrVals = in_scProductAttrVals;
	}
    

	/**
	 * 产品属性编码	 * @return Long
     * @hibernate.id column="PRODUCT_ATTR_CODE" type="java.lang.Long" generator-class="native"
	 */
	public Long getProductAttrCode() {
		return this.productAttrCode;
	}
	
	/**
	 * Set the productAttrCode
	 */	
	public void setProductAttrCode(Long aValue) {
		this.productAttrCode = aValue;
	}	

	/**
	 * 产品分类 内码	 * @return Long
	 */
	public Long getProductClassifyId() {
		return this.getScProductClassify()==null?null:this.getScProductClassify().getProductClassifyId();
	}
	
	/**
	 * Set the productClassifyId
	 */	
	public void setProductClassifyId(Long aValue) {
	    if (aValue==null) {
	    	scProductClassify = null;
	    } else if (scProductClassify == null) {
	        scProductClassify = new com.ulane.supply.model.goods.ScProductClassify(aValue);
	        scProductClassify.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			scProductClassify.setProductClassifyId(aValue);
	    }
	}	

	/**
	 * 产品属性名	 * @return String
	 * @hibernate.property column="PRODUCT_ATTR_VAL" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getProductAttrVal() {
		return this.productAttrVal;
	}
	
	/**
	 * Set the productAttrVal
	 */	
	public void setProductAttrVal(String aValue) {
		this.productAttrVal = aValue;
	}	

	/**
	 * 字段名	 * @return String
	 * @hibernate.property column="FIELD_NAME" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getFieldName() {
		return this.fieldName;
	}
	
	/**
	 * Set the fieldName
	 */	
	public void setFieldName(String aValue) {
		this.fieldName = aValue;
	}	

	/**
	 * 字段类型文本、数值、时间&CON_T_FLELD_TYPE	 * @return Short
	 * @hibernate.property column="FIELD_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getFieldType() {
		return this.fieldType;
	}
	
	/**
	 * Set the fieldType
	 */	
	public void setFieldType(Short aValue) {
		this.fieldType = aValue;
	}	

	/**
	 * 表单类型&CON_T_FORM_TYPE	 * @return Short
	 * @hibernate.property column="FORM_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getFormType() {
		return this.formType;
	}
	
	/**
	 * Set the formType
	 */	
	public void setFormType(Short aValue) {
		this.formType = aValue;
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
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
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
		if (!(object instanceof ScProductAttr)) {
			return false;
		}
		ScProductAttr rhs = (ScProductAttr) object;
		return new EqualsBuilder()
				.append(this.productAttrCode, rhs.productAttrCode)
						.append(this.productAttrVal, rhs.productAttrVal)
				.append(this.fieldName, rhs.fieldName)
				.append(this.fieldType, rhs.fieldType)
				.append(this.formType, rhs.formType)
				.append(this.createUserId, rhs.createUserId)
				.append(this.createTime, rhs.createTime)
				.append(this.updateUserId, rhs.updateUserId)
				.append(this.updateTime, rhs.updateTime)
				.append(this.desc, rhs.desc)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.productAttrCode) 
						.append(this.productAttrVal) 
				.append(this.fieldName) 
				.append(this.fieldType) 
				.append(this.formType) 
				.append(this.createUserId) 
				.append(this.createTime) 
				.append(this.updateUserId) 
				.append(this.updateTime) 
				.append(this.desc) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("productAttrCode", this.productAttrCode) 
						.append("productAttrVal", this.productAttrVal) 
				.append("fieldName", this.fieldName) 
				.append("fieldType", this.fieldType) 
				.append("formType", this.formType) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime", this.updateTime) 
				.append("desc", this.desc) 
				.toString();
	}



}
