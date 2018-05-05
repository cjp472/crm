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
 * ScPurchasePrice Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScPurchasePrice extends com.htsoft.core.model.BaseModel {

    protected Long purPriceId;
	protected java.math.BigDecimal purGuidPrice;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime;
	protected Short status;
	protected String desc;

	protected java.util.Set scGoodss = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScPurchasePrice
	 */
	public ScPurchasePrice () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScPurchasePrice
	 */
	public ScPurchasePrice (
		 Long in_purPriceId
        ) {
		this.setPurPriceId(in_purPriceId);
    }


	public java.util.Set getScGoodss () {
		return scGoodss;
	}	
	
	public void setScGoodss (java.util.Set in_scGoodss) {
		this.scGoodss = in_scGoodss;
	}
    

	/**
	 * 采购价目内码	 * @return Long
     * @hibernate.id column="PUR_PRICE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getPurPriceId() {
		return this.purPriceId;
	}
	
	/**
	 * Set the purPriceId
	 */	
	public void setPurPriceId(Long aValue) {
		this.purPriceId = aValue;
	}	

	/**
	 * 采购指导价	 * @return java.math.BigDecimal
	 * @hibernate.property column="PUR_GUID_PRICE" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getPurGuidPrice() {
		return this.purGuidPrice;
	}
	
	/**
	 * Set the purGuidPrice
	 */	
	public void setPurGuidPrice(java.math.BigDecimal aValue) {
		this.purGuidPrice = aValue;
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
	 * 状态：0--未审批、1--已启用、2--已关闭&CON_T_PRICE_ZT	 * @return Short
	 * @hibernate.property column="STATUS" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
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
		if (!(object instanceof ScPurchasePrice)) {
			return false;
		}
		ScPurchasePrice rhs = (ScPurchasePrice) object;
		return new EqualsBuilder()
				.append(this.purPriceId, rhs.purPriceId)
				.append(this.purGuidPrice, rhs.purGuidPrice)
				.append(this.createUserId, rhs.createUserId)
				.append(this.createTime, rhs.createTime)
				.append(this.updateUserId, rhs.updateUserId)
				.append(this.updateTime, rhs.updateTime)
				.append(this.status, rhs.status)
				.append(this.desc, rhs.desc)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.purPriceId) 
				.append(this.purGuidPrice) 
				.append(this.createUserId) 
				.append(this.createTime) 
				.append(this.updateUserId) 
				.append(this.updateTime) 
				.append(this.status) 
				.append(this.desc) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("purPriceId", this.purPriceId) 
				.append("purGuidPrice", this.purGuidPrice) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime", this.updateTime) 
				.append("status", this.status) 
				.append("desc", this.desc) 
				.toString();
	}



}
