package com.ulane.base.model.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * BmFactorValue Base Java Bean, base class for the.erp.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class BmFactorValue extends com.htsoft.core.model.BaseModel {

    protected Long factorValueId;
	protected String factorNum;
	protected String factorValue;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String createBy;
	protected String updateBy;
	protected String comments;
	protected com.ulane.base.model.xitong.BmFactor bmFactor;


	/**
	 * Default Empty Constructor for class BmFactorValue
	 */
	public BmFactorValue () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BmFactorValue
	 */
	public BmFactorValue (
		 Long in_factorValueId
        ) {
		this.setFactorValueId(in_factorValueId);
    }

	
	public com.ulane.base.model.xitong.BmFactor getBmFactor () {
		return bmFactor;
	}	
	
	public void setBmFactor (com.ulane.base.model.xitong.BmFactor in_bmFactor) {
		this.bmFactor = in_bmFactor;
	}
    

	/**
	 * 主键	 * @return Long
     * @hibernate.id column="FACTOR_VALUE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFactorValueId() {
		return this.factorValueId;
	}
	
	/**
	 * Set the factorValueId
	 */	
	public void setFactorValueId(Long aValue) {
		this.factorValueId = aValue;
	}	

	/**
	 * 影响因素主键	 * @return Long
	 */
	public Long getFactorId() {
		return this.getBmFactor()==null?null:this.getBmFactor().getFactorId();
	}
	
	/**
	 * Set the factorId
	 */	
	public void setFactorId(Long aValue) {
	    if (aValue==null) {
	    	bmFactor = null;
	    } else if (bmFactor == null) {
	        bmFactor = new com.ulane.base.model.xitong.BmFactor(aValue);
	        bmFactor.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			bmFactor.setFactorId(aValue);
	    }
	}	

	/**
	 * 影响因素标识	 * @return String
	 * @hibernate.property column="FACTOR_NUM" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getFactorNum() {
		return this.factorNum;
	}
	
	/**
	 * Set the factorNum
	 */	
	public void setFactorNum(String aValue) {
		this.factorNum = aValue;
	}	

	/**
	 * 影响因素值	 * @return String
	 * @hibernate.property column="FACTOR_VALUE" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getFactorValue() {
		return this.factorValue;
	}
	
	/**
	 * Set the factorValue
	 */	
	public void setFactorValue(String aValue) {
		this.factorValue = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 * @spring.validator type="required"
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
		if (!(object instanceof BmFactorValue)) {
			return false;
		}
		BmFactorValue rhs = (BmFactorValue) object;
		return new EqualsBuilder()
				.append(this.factorValueId, rhs.factorValueId)
						.append(this.factorNum, rhs.factorNum)
				.append(this.factorValue, rhs.factorValue)
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
				.append(this.factorValueId) 
						.append(this.factorNum) 
				.append(this.factorValue) 
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
				.append("factorValueId", this.factorValueId) 
						.append("factorNum", this.factorNum) 
				.append("factorValue", this.factorValue) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("comments", this.comments) 
				.toString();
	}



}
