package com.ulane.supply.model.goods;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * ScGoodsPrice Base Java Bean, base class for the.base.model, mapped directly
 * to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class ScGoodsPrice extends com.htsoft.core.model.BaseModel {

	protected Long goodsPriceId;
	protected java.math.BigDecimal purchasePrice;
	protected java.math.BigDecimal reportPrice;// 市场价
	protected java.math.BigDecimal retailPrice;// 售价
	protected java.math.BigDecimal wholesalePrice;
	protected java.math.BigDecimal defaultSubsidyAmount;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime2;
	protected String desc;

	protected java.util.Set scGoodss = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScGoodsPrice
	 */
	public ScGoodsPrice() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class ScGoodsPrice
	 */
	public ScGoodsPrice(Long in_goodsPriceId) {
		this.setGoodsPriceId(in_goodsPriceId);
	}

	public java.util.Set getScGoodss() {
		return scGoodss;
	}

	public void setScGoodss(java.util.Set in_scGoodss) {
		this.scGoodss = in_scGoodss;
	}

	/**
	 * 商品价目内码 * @return Long
	 * 
	 * @hibernate.id column="GOODS_PRICE_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getGoodsPriceId() {
		return this.goodsPriceId;
	}

	/**
	 * Set the goodsPriceId
	 */
	public void setGoodsPriceId(Long aValue) {
		this.goodsPriceId = aValue;
	}

	/**
	 * 进货价格 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="PURCHASE_PRICE" type="java.math.BigDecimal"
	 *                     length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getPurchasePrice() {
		return this.purchasePrice;
	}

	/**
	 * Set the purchasePrice
	 * 
	 * @spring.validator type="required"
	 */
	public void setPurchasePrice(java.math.BigDecimal aValue) {
		this.purchasePrice = aValue;
	}

	/**
	 * 上报价格 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="REPORT_PRICE" type="java.math.BigDecimal"
	 *                     length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getReportPrice() {
		return this.reportPrice;
	}

	/**
	 * Set the reportPrice
	 * 
	 * @spring.validator type="required"
	 */
	public void setReportPrice(java.math.BigDecimal aValue) {
		this.reportPrice = aValue;
	}

	/**
	 * 零售价格 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="RETAIL_PRICE" type="java.math.BigDecimal"
	 *                     length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getRetailPrice() {
		return this.retailPrice;
	}

	/**
	 * Set the retailPrice
	 * 
	 * @spring.validator type="required"
	 */
	public void setRetailPrice(java.math.BigDecimal aValue) {
		this.retailPrice = aValue;
	}

	/**
	 * 平台直供价格 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="WHOLESALE_PRICE" type="java.math.BigDecimal"
	 *                     length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getWholesalePrice() {
		return this.wholesalePrice;
	}

	/**
	 * Set the wholesalePrice
	 * 
	 * @spring.validator type="required"
	 */
	public void setWholesalePrice(java.math.BigDecimal aValue) {
		this.wholesalePrice = aValue;
	}

	/**
	 * 缺省平台补贴金额 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="DEFAULT_SUBSIDY_AMOUNT"
	 *                     type="java.math.BigDecimal" length="15"
	 *                     not-null="true" unique="false"
	 */
	public java.math.BigDecimal getDefaultSubsidyAmount() {
		return this.defaultSubsidyAmount;
	}

	/**
	 * Set the defaultSubsidyAmount
	 * 
	 * @spring.validator type="required"
	 */
	public void setDefaultSubsidyAmount(java.math.BigDecimal aValue) {
		this.defaultSubsidyAmount = aValue;
	}

	/**
	 * 创建人 * @return Long
	 * 
	 * @hibernate.property column="CREATE_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
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
	 * 创建时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="CREATE_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
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
	 * 修改人 * @return Long
	 * 
	 * @hibernate.property column="UPDATE_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
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
	 * 修改时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="UPDATE_TIME2" type="java.util.Date"
	 *                     length="7" not-null="false" unique="false"
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
	 * 备注 * @return String
	 * 
	 * @hibernate.property column="DESC" type="java.lang.String" length="500"
	 *                     not-null="false" unique="false"
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
		if (!(object instanceof ScGoodsPrice)) {
			return false;
		}
		ScGoodsPrice rhs = (ScGoodsPrice) object;
		return new EqualsBuilder().append(this.goodsPriceId, rhs.goodsPriceId)
				.append(this.purchasePrice, rhs.purchasePrice)
				.append(this.reportPrice, rhs.reportPrice)
				.append(this.retailPrice, rhs.retailPrice)
				.append(this.wholesalePrice, rhs.wholesalePrice)
				.append(this.defaultSubsidyAmount, rhs.defaultSubsidyAmount)
				.append(this.createUserId, rhs.createUserId)
				.append(this.createTime, rhs.createTime)
				.append(this.updateUserId, rhs.updateUserId)
				.append(this.updateTime2, rhs.updateTime2)
				.append(this.desc, rhs.desc).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.goodsPriceId).append(this.purchasePrice)
				.append(this.reportPrice).append(this.retailPrice)
				.append(this.wholesalePrice).append(this.defaultSubsidyAmount)
				.append(this.createUserId).append(this.createTime)
				.append(this.updateUserId).append(this.updateTime2)
				.append(this.desc).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("goodsPriceId", this.goodsPriceId)
				.append("purchasePrice", this.purchasePrice)
				.append("reportPrice", this.reportPrice)
				.append("retailPrice", this.retailPrice)
				.append("wholesalePrice", this.wholesalePrice)
				.append("defaultSubsidyAmount", this.defaultSubsidyAmount)
				.append("createUserId", this.createUserId)
				.append("createTime", this.createTime)
				.append("updateUserId", this.updateUserId)
				.append("updateTime2", this.updateTime2)
				.append("desc", this.desc).toString();
	}

}
