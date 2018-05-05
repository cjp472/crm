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
 * ObFeeIndexProject Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObFeeIndexProject extends com.htsoft.core.model.BaseModel {

    protected Long feeIndexProjectId;
	protected String feeIndexProjectName;
	protected String formula;

	protected java.util.Set obFees = new java.util.HashSet();
	protected java.util.Set obFeeIndexLevels = new java.util.HashSet();
	protected java.util.Set obFeeRules = new java.util.HashSet();
	
	public static final Long INDEX_CLOSE_CASES 		=	1L;		//结案客户数
	public static final Long INDEX_ENABLE_ORDERS 	= 	2L;		//有效订单数
	public static final Long INDEX_SALES 			= 	3L;		//销售额
	public static final Long INDEX_ORDER_SALES 		= 	4L;		//订单销售额
	/**
	 * Default Empty Constructor for class ObFeeIndexProject
	 */
	public ObFeeIndexProject () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObFeeIndexProject
	 */
	public ObFeeIndexProject (
		 Long in_feeIndexProjectId
        ) {
		this.setFeeIndexProjectId(in_feeIndexProjectId);
    }


	public java.util.Set getObFees () {
		return obFees;
	}	
	
	public void setObFees (java.util.Set in_obFees) {
		this.obFees = in_obFees;
	}

	public java.util.Set getObFeeIndexLevels () {
		return obFeeIndexLevels;
	}	
	
	public void setObFeeIndexLevels (java.util.Set in_obFeeIndexLevels) {
		this.obFeeIndexLevels = in_obFeeIndexLevels;
	}

	public java.util.Set getObFeeRules () {
		return obFeeRules;
	}	
	
	public void setObFeeRules (java.util.Set in_obFeeRules) {
		this.obFeeRules = in_obFeeRules;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="FEE_INDEX_PROJECT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFeeIndexProjectId() {
		return this.feeIndexProjectId;
	}
	
	/**
	 * Set the feeIndexProjectId
	 */	
	public void setFeeIndexProjectId(Long aValue) {
		this.feeIndexProjectId = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="FEE_INDEX_PROJECT_NAME" type="java.lang.String" length="120" not-null="false" unique="false"
	 */
	public String getFeeIndexProjectName() {
		return this.feeIndexProjectName;
	}
	
	/**
	 * Set the feeIndexProjectName
	 */	
	public void setFeeIndexProjectName(String aValue) {
		this.feeIndexProjectName = aValue;
	}	

	/**
	 * 计算公式	 * @return String
	 * @hibernate.property column="FORMULA" type="java.lang.String" length="120" not-null="false" unique="false"
	 */
	public String getFormula() {
		return this.formula;
	}
	
	/**
	 * Set the formula
	 */	
	public void setFormula(String aValue) {
		this.formula = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObFeeIndexProject)) {
			return false;
		}
		ObFeeIndexProject rhs = (ObFeeIndexProject) object;
		return new EqualsBuilder()
				.append(this.feeIndexProjectId, rhs.feeIndexProjectId)
				.append(this.feeIndexProjectName, rhs.feeIndexProjectName)
				.append(this.formula, rhs.formula)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.feeIndexProjectId) 
				.append(this.feeIndexProjectName) 
				.append(this.formula) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("feeIndexProjectId", this.feeIndexProjectId) 
				.append("feeIndexProjectName", this.feeIndexProjectName) 
				.append("formula", this.formula) 
				.toString();
	}



}
