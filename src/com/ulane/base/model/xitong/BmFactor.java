package com.ulane.base.model.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * BmFactor Base Java Bean, base class for the.erp.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class BmFactor extends com.htsoft.core.model.BaseModel {

    protected Long factorId;
	protected String factorName;
	protected String classObj;
	protected String classValue;
	protected String className;
	protected String condition;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String createBy;
	protected String updateBy;
	protected String comments;

	protected java.util.Set bmBillNums1 = new java.util.HashSet();

	protected java.util.Set bmBillNums2 = new java.util.HashSet();
	
	protected java.util.Set bmFactorValues = new java.util.HashSet();
	
	
	
	
    public java.util.Set getBmBillNums1() {
		return bmBillNums1;
	}
	public void setBmBillNums1(java.util.Set bmBillNums1) {
		this.bmBillNums1 = bmBillNums1;
	}
	public java.util.Set getBmBillNums2() {
		return bmBillNums2;
	}
	public void setBmBillNums2(java.util.Set bmBillNums2) {
		this.bmBillNums2 = bmBillNums2;
	}
	public java.util.Set getBmFactorValues() {
		return bmFactorValues;
	}
	public void setBmFactorValues(java.util.Set bmFactorValues) {
		this.bmFactorValues = bmFactorValues;
	}
/**
 * 筛选条件
 * @return
 */
	public String getCondition() {
		return condition;
	}
/**
 * 筛选条件
 * @param condition
 */
	public void setCondition(String condition) {
		this.condition = condition;
	}

	
	/**
	 * 类对象	 * @return String
	 * @hibernate.property column="CLASS_OBJ" type="java.lang.String" length="250" not-null="false" unique="false"
	 */
	public String getClassObj() {
		return this.classObj;
	}
	
	/**
	 *  类对象
	 * Set the classObj
	 */	
	public void setClassObj(String aValue) {
		this.classObj = aValue;
	}	

	/**
	 * 参数值	 * @return String
	 * @hibernate.property column="CLASS_VALUE" type="java.lang.String" length="250" not-null="false" unique="false"
	 */
	public String getClassValue() {
		return this.classValue;
	}
	
	/**
	 * 参数值
	 * Set the classValue
	 */	
	public void setClassValue(String aValue) {
		this.classValue = aValue;
	}	

	/**
	 * 显示值	 * @return String
	 * @hibernate.property column="CLASS_NAME" type="java.lang.String" length="250" not-null="false" unique="false"
	 */
	public String getClassName() {
		return this.className;
	}
	
	/**
	 * 显示值
	 * Set the className
	 */	
	public void setClassName(String aValue) {
		this.className = aValue;
	}	

	
	/**
	 * Default Empty Constructor for class BmFactor
	 */
	public BmFactor () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BmFactor
	 */
	public BmFactor (
		 Long in_factorId
        ) {
		this.setFactorId(in_factorId);
    }
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="FACTOR_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFactorId() {
		return this.factorId;
	}
	
	/**
	 * Set the factorId
	 */	
	public void setFactorId(Long aValue) {
		this.factorId = aValue;
	}	

	/**
	 * 影响因素名称	 * @return String
	 * @hibernate.property column="FACTOR_NAME" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getFactorName() {
		return this.factorName;
	}
	
	/**
	 * Set the factorName
	 */	
	public void setFactorName(String aValue) {
		this.factorName = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 */	
	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateDate() {
		return this.updateDate;
	}
	
	/**
	 * Set the updateDate
	 */	
	public void setUpdateDate(java.util.Date aValue) {
		this.updateDate = aValue;
	}	

	/**
	 * 创建人	 * @return String
	 * @hibernate.property column="CREATE_BY" type="java.lang.String" length="30" not-null="false" unique="false"
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
	 * 修改人	 * @return String
	 * @hibernate.property column="UPDATE_BY" type="java.lang.String" length="30" not-null="false" unique="false"
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
	 * 描述	 * @return String
	 * @hibernate.property column="COMMENTS" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComments() {
		return this.comments;
	}
	
	/**
	 * Set the comments
	 */	
	public void setComments(String aValue) {
		this.comments = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BmFactor)) {
			return false;
		}
		BmFactor rhs = (BmFactor) object;
		return new EqualsBuilder()
				.append(this.factorId, rhs.factorId)
				.append(this.factorName, rhs.factorName)
				.append(this.classObj, rhs.classObj)
				.append(this.classValue, rhs.classValue)
				.append(this.className, rhs.className)
				.append(this.condition, rhs.condition)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.comments, rhs.comments)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.factorId) 
				.append(this.factorName)
				.append(this.classObj) 
				.append(this.classValue) 
				.append(this.className) 
				.append(this.condition) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.comments) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("factorId", this.factorId) 
				.append("factorName", this.factorName)
				.append("classObj", this.classObj) 
				.append("classValue", this.classValue) 
				.append("className", this.className) 
				.append("condition", this.condition) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("comments", this.comments) 
				.toString();
	}



}
