package com.ulane.customer.model.fee;
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
 * ObFeeIndexLevel Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObFeeIndexLevel extends com.htsoft.core.model.BaseModel {

    protected Long feeIndexLevelId;
	protected String month;
	protected String quarter;
	protected java.math.BigDecimal feeIndexValue;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected com.ulane.customer.model.fee.ObFeeIndex obFeeIndex;
	protected com.ulane.customer.model.fee.ObFeeIndexProject obFeeIndexProject;

    
	/**
	 * Default Empty Constructor for class ObFeeIndexLevel
	 */
	public ObFeeIndexLevel () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObFeeIndexLevel
	 */
	public ObFeeIndexLevel (
		 Long in_feeIndexLevelId
        ) {
		this.setFeeIndexLevelId(in_feeIndexLevelId);
    }

	
	public com.ulane.customer.model.fee.ObFeeIndex getObFeeIndex () {
		return obFeeIndex;
	}	
	
	public void setObFeeIndex (com.ulane.customer.model.fee.ObFeeIndex in_obFeeIndex) {
		this.obFeeIndex = in_obFeeIndex;
	}
	
	public com.ulane.customer.model.fee.ObFeeIndexProject getObFeeIndexProject () {
		return obFeeIndexProject;
	}	
	
	public void setObFeeIndexProject (com.ulane.customer.model.fee.ObFeeIndexProject in_obFeeIndexProject) {
		this.obFeeIndexProject = in_obFeeIndexProject;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="FEE_INDEX_LEVEL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFeeIndexLevelId() {
		return this.feeIndexLevelId;
	}
	
	/**
	 * Set the feeIndexLevelId
	 */	
	public void setFeeIndexLevelId(Long aValue) {
		this.feeIndexLevelId = aValue;
	}	

	/**
	 * 佣金指标内码	 * @return Long
	 */
	public Long getFeeIndexId() {
		return this.getObFeeIndex()==null?null:this.getObFeeIndex().getFeeIndexId();
	}
	
	/**
	 * Set the feeIndexId
	 */	
	public void setFeeIndexId(Long aValue) {
	    if (aValue==null) {
	    	obFeeIndex = null;
	    } else if (obFeeIndex == null) {
	        obFeeIndex = new com.ulane.customer.model.fee.ObFeeIndex(aValue);
	        obFeeIndex.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obFeeIndex.setFeeIndexId(aValue);
	    }
	}	

	/**
	 * 佣金指标项内码	 * @return Long
	 */
	public Long getFeeIndexProjectId() {
		return this.getObFeeIndexProject()==null?null:this.getObFeeIndexProject().getFeeIndexProjectId();
	}
	
	/**
	 * Set the feeIndexProjectId
	 */	
	public void setFeeIndexProjectId(Long aValue) {
	    if (aValue==null) {
	    	obFeeIndexProject = null;
	    } else if (obFeeIndexProject == null) {
	        obFeeIndexProject = new com.ulane.customer.model.fee.ObFeeIndexProject(aValue);
	        obFeeIndexProject.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obFeeIndexProject.setFeeIndexProjectId(aValue);
	    }
	}	

	/**
	 * 月份	 * @return Short
	 * @hibernate.property column="MONTH" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public String getMonth() {
		return this.month;
	}
	
	/**
	 * Set the month
	 */	
	public void setMonth(String aValue) {
		this.month = aValue;
	}	

	/**
	 * 季度	 * @return Short
	 * @hibernate.property column="QUARTER" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public String getQuarter() {
		return this.quarter;
	}
	
	/**
	 * Set the quarter
	 */	
	public void setQuarter(String aValue) {
		this.quarter = aValue;
	}	

	/**
	 * 值	 * @return java.math.BigDecimal
	 * @hibernate.property column="FEE_INDEX_VALUE" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getFeeIndexValue() {
		return this.feeIndexValue;
	}
	
	/**
	 * Set the feeIndexValue
	 */	
	public void setFeeIndexValue(java.math.BigDecimal aValue) {
		this.feeIndexValue = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(Long aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(Long aValue) {
		this.updateBy = aValue;
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObFeeIndexLevel)) {
			return false;
		}
		ObFeeIndexLevel rhs = (ObFeeIndexLevel) object;
		return new EqualsBuilder()
				.append(this.feeIndexLevelId, rhs.feeIndexLevelId)
								.append(this.month, rhs.month)
				.append(this.quarter, rhs.quarter)
				.append(this.feeIndexValue, rhs.feeIndexValue)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.feeIndexLevelId) 
								.append(this.month) 
				.append(this.quarter) 
				.append(this.feeIndexValue) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("feeIndexLevelId", this.feeIndexLevelId) 
								.append("month", this.month) 
				.append("quarter", this.quarter) 
				.append("feeIndexValue", this.feeIndexValue) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.toString();
	}



}
