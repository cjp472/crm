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
 * ScGoodsPriceRule Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScGoodsPriceRule extends com.htsoft.core.model.BaseModel {

    protected Long priceRuleId;
	protected String priceChange;
	protected String priceCondition;
	protected Short priorLevel;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime2;
	protected String desc;
	protected com.ulane.supply.model.goods.ScPriceVersion scPriceVersion;

	protected java.util.Set scGoodsPriceRuleGoodss = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScGoodsPriceRule
	 */
	public ScGoodsPriceRule () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScGoodsPriceRule
	 */
	public ScGoodsPriceRule (
		 Long in_priceRuleId
        ) {
		this.setPriceRuleId(in_priceRuleId);
    }

	
	public com.ulane.supply.model.goods.ScPriceVersion getScPriceVersion () {
		return scPriceVersion;
	}	
	
	public void setScPriceVersion (com.ulane.supply.model.goods.ScPriceVersion in_scPriceVersion) {
		this.scPriceVersion = in_scPriceVersion;
	}

	public java.util.Set getScGoodsPriceRuleGoodss () {
		return scGoodsPriceRuleGoodss;
	}	
	
	public void setScGoodsPriceRuleGoodss (java.util.Set in_scGoodsPriceRuleGoodss) {
		this.scGoodsPriceRuleGoodss = in_scGoodsPriceRuleGoodss;
	}
    

	/**
	 * 规则内码	 * @return Long
     * @hibernate.id column="PRICE_RULE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getPriceRuleId() {
		return this.priceRuleId;
	}
	
	/**
	 * Set the priceRuleId
	 */	
	public void setPriceRuleId(Long aValue) {
		this.priceRuleId = aValue;
	}	

	/**
	 * 版本内码	 * @return Long
	 */
	public Long getVersionId() {
		return this.getScPriceVersion()==null?null:this.getScPriceVersion().getVersionId();
	}
	
	/**
	 * Set the versionId
	 */	
	public void setVersionId(Long aValue) {
	    if (aValue==null) {
	    	scPriceVersion = null;
	    } else if (scPriceVersion == null) {
	        scPriceVersion = new com.ulane.supply.model.goods.ScPriceVersion(aValue);
	        scPriceVersion.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			scPriceVersion.setVersionId(aValue);
	    }
	}	

	/**
	 * 价格变化	 * @return String
	 * @hibernate.property column="PRICE_CHANGE" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getPriceChange() {
		return this.priceChange;
	}
	
	/**
	 * Set the priceChange
	 */	
	public void setPriceChange(String aValue) {
		this.priceChange = aValue;
	}	

	/**
	 * 价格条件	 * @return String
	 * @hibernate.property column="PRICE_CONDITION" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getPriceCondition() {
		return this.priceCondition;
	}
	
	/**
	 * Set the priceCondition
	 */	
	public void setPriceCondition(String aValue) {
		this.priceCondition = aValue;
	}	

	/**
	 * 优先级	 * @return Short
	 * @hibernate.property column="PRIOR_LEVEL" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getPriorLevel() {
		return this.priorLevel;
	}
	
	/**
	 * Set the priorLevel
	 */	
	public void setPriorLevel(Short aValue) {
		this.priorLevel = aValue;
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
		if (!(object instanceof ScGoodsPriceRule)) {
			return false;
		}
		ScGoodsPriceRule rhs = (ScGoodsPriceRule) object;
		return new EqualsBuilder()
				.append(this.priceRuleId, rhs.priceRuleId)
						.append(this.priceChange, rhs.priceChange)
				.append(this.priceCondition, rhs.priceCondition)
				.append(this.priorLevel, rhs.priorLevel)
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
				.append(this.priceRuleId) 
						.append(this.priceChange) 
				.append(this.priceCondition) 
				.append(this.priorLevel) 
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
				.append("priceRuleId", this.priceRuleId) 
						.append("priceChange", this.priceChange) 
				.append("priceCondition", this.priceCondition) 
				.append("priorLevel", this.priorLevel) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime2", this.updateTime2) 
				.append("desc", this.desc) 
				.toString();
	}



}
