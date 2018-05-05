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
 * ObFeeRuleValue Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObFeeRuleValue extends com.htsoft.core.model.BaseModel {

    protected Long feeRuleValueId;
	protected java.math.BigDecimal minimum;
	protected java.math.BigDecimal maximum;
	protected java.math.BigDecimal coefficient;
	protected java.math.BigDecimal increase;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected com.ulane.customer.model.fee.ObFeeRule obFeeRule;


	/**
	 * Default Empty Constructor for class ObFeeRuleValue
	 */
	public ObFeeRuleValue () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObFeeRuleValue
	 */
	public ObFeeRuleValue (
		 Long in_feeRuleValueId
        ) {
		this.setFeeRuleValueId(in_feeRuleValueId);
    }

	
	public com.ulane.customer.model.fee.ObFeeRule getObFeeRule () {
		return obFeeRule;
	}	
	
	public void setObFeeRule (com.ulane.customer.model.fee.ObFeeRule in_obFeeRule) {
		this.obFeeRule = in_obFeeRule;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="FEE_RULE_VALUE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFeeRuleValueId() {
		return this.feeRuleValueId;
	}
	
	/**
	 * Set the feeRuleValueId
	 */	
	public void setFeeRuleValueId(Long aValue) {
		this.feeRuleValueId = aValue;
	}	

	/**
	 * 佣金规则内码	 * @return Long
	 */
	public Long getFeeRuleId() {
		return this.getObFeeRule()==null?null:this.getObFeeRule().getFeeRuleId();
	}
	
	/**
	 * Set the feeRuleId
	 */	
	public void setFeeRuleId(Long aValue) {
	    if (aValue==null) {
	    	obFeeRule = null;
	    } else if (obFeeRule == null) {
	        obFeeRule = new com.ulane.customer.model.fee.ObFeeRule(aValue);
	        obFeeRule.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obFeeRule.setFeeRuleId(aValue);
	    }
	}	

	/**
	 * 最小值	 * @return java.math.BigDecimal
	 * @hibernate.property column="MINIMUM" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getMinimum() {
		return this.minimum;
	}
	
	/**
	 * Set the minimum
	 */	
	public void setMinimum(java.math.BigDecimal aValue) {
		this.minimum = aValue;
	}	

	/**
	 * 最大值	 * @return java.math.BigDecimal
	 * @hibernate.property column="MAXIMUM" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getMaximum() {
		return this.maximum;
	}
	
	/**
	 * Set the maximum
	 */	
	public void setMaximum(java.math.BigDecimal aValue) {
		this.maximum = aValue;
	}	

	/**
	 * 系数	 * @return java.math.BigDecimal
	 * @hibernate.property column="COEFFICIENT" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getCoefficient() {
		return this.coefficient;
	}
	
	/**
	 * Set the coefficient
	 */	
	public void setCoefficient(java.math.BigDecimal aValue) {
		this.coefficient = aValue;
	}	

	/**
	 * 增加额度	 * @return java.math.BigDecimal
	 * @hibernate.property column="INCREASE" type="java.math.BigDecimal" length="10" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getIncrease() {
		return this.increase;
	}
	
	/**
	 * Set the increase
	 */	
	public void setIncrease(java.math.BigDecimal aValue) {
		this.increase = aValue;
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
		if (!(object instanceof ObFeeRuleValue)) {
			return false;
		}
		ObFeeRuleValue rhs = (ObFeeRuleValue) object;
		return new EqualsBuilder()
				.append(this.feeRuleValueId, rhs.feeRuleValueId)
						.append(this.minimum, rhs.minimum)
				.append(this.maximum, rhs.maximum)
				.append(this.coefficient, rhs.coefficient)
				.append(this.increase, rhs.increase)
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
				.append(this.feeRuleValueId) 
						.append(this.minimum) 
				.append(this.maximum) 
				.append(this.coefficient) 
				.append(this.increase) 
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
				.append("feeRuleValueId", this.feeRuleValueId) 
						.append("minimum", this.minimum) 
				.append("maximum", this.maximum) 
				.append("coefficient", this.coefficient) 
				.append("increase", this.increase) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.toString();
	}



}
