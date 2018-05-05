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
 * ScGoodsPriceHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScGoodsPriceHis extends com.htsoft.core.model.BaseModel {

    protected Long goodsPriceHisSeq;
	protected java.math.BigDecimal purchasePrice;
	protected java.math.BigDecimal reportPrice;
	protected java.math.BigDecimal retailPrice;
	protected java.math.BigDecimal wholesalePrice;
	protected java.math.BigDecimal defaultSubsidyAmount;
	protected java.util.Date updateTime;
	protected Long optUserId;
	protected com.ulane.supply.model.goods.ScGoods scGoods;


	/**
	 * Default Empty Constructor for class ScGoodsPriceHis
	 */
	public ScGoodsPriceHis () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScGoodsPriceHis
	 */
	public ScGoodsPriceHis (
		 Long in_goodsPriceHisSeq
        ) {
		this.setGoodsPriceHisSeq(in_goodsPriceHisSeq);
    }

	
	public com.ulane.supply.model.goods.ScGoods getScGoods () {
		return scGoods;
	}	
	
	public void setScGoods (com.ulane.supply.model.goods.ScGoods in_scGoods) {
		this.scGoods = in_scGoods;
	}
    

	/**
	 * 商品价目表历史流水	 * @return Long
     * @hibernate.id column="GOODS_PRICE_HIS_SEQ" type="java.lang.Long" generator-class="native"
	 */
	public Long getGoodsPriceHisSeq() {
		return this.goodsPriceHisSeq;
	}
	
	/**
	 * Set the goodsPriceHisSeq
	 */	
	public void setGoodsPriceHisSeq(Long aValue) {
		this.goodsPriceHisSeq = aValue;
	}	

	/**
	 * 商品标识	 * @return Long
	 */
	public Long getGoodsId() {
		return this.getScGoods()==null?null:this.getScGoods().getGoodsId();
	}
	
	/**
	 * Set the goodsId
	 */	
	public void setGoodsId(Long aValue) {
	    if (aValue==null) {
	    	scGoods = null;
	    } else if (scGoods == null) {
	        scGoods = new com.ulane.supply.model.goods.ScGoods(aValue);
	        scGoods.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			scGoods.setGoodsId(aValue);
	    }
	}	

	/**
	 * 进货价格	 * @return java.math.BigDecimal
	 * @hibernate.property column="PURCHASE_PRICE" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getPurchasePrice() {
		return this.purchasePrice;
	}
	
	/**
	 * Set the purchasePrice
	 * @spring.validator type="required"
	 */	
	public void setPurchasePrice(java.math.BigDecimal aValue) {
		this.purchasePrice = aValue;
	}	

	/**
	 * 上报价格	 * @return java.math.BigDecimal
	 * @hibernate.property column="REPORT_PRICE" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getReportPrice() {
		return this.reportPrice;
	}
	
	/**
	 * Set the reportPrice
	 * @spring.validator type="required"
	 */	
	public void setReportPrice(java.math.BigDecimal aValue) {
		this.reportPrice = aValue;
	}	

	/**
	 * 零售价格	 * @return java.math.BigDecimal
	 * @hibernate.property column="RETAIL_PRICE" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getRetailPrice() {
		return this.retailPrice;
	}
	
	/**
	 * Set the retailPrice
	 * @spring.validator type="required"
	 */	
	public void setRetailPrice(java.math.BigDecimal aValue) {
		this.retailPrice = aValue;
	}	

	/**
	 * 平台直供价格	 * @return java.math.BigDecimal
	 * @hibernate.property column="WHOLESALE_PRICE" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getWholesalePrice() {
		return this.wholesalePrice;
	}
	
	/**
	 * Set the wholesalePrice
	 * @spring.validator type="required"
	 */	
	public void setWholesalePrice(java.math.BigDecimal aValue) {
		this.wholesalePrice = aValue;
	}	

	/**
	 * 缺省平台补贴金额	 * @return java.math.BigDecimal
	 * @hibernate.property column="DEFAULT_SUBSIDY_AMOUNT" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getDefaultSubsidyAmount() {
		return this.defaultSubsidyAmount;
	}
	
	/**
	 * Set the defaultSubsidyAmount
	 * @spring.validator type="required"
	 */	
	public void setDefaultSubsidyAmount(java.math.BigDecimal aValue) {
		this.defaultSubsidyAmount = aValue;
	}	

	/**
	 * 更新时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}
	
	/**
	 * Set the updateTime
	 * @spring.validator type="required"
	 */	
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}	

	/**
	 * 操作员内码	 * @return Long
	 * @hibernate.property column="OPT_USER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getOptUserId() {
		return this.optUserId;
	}
	
	/**
	 * Set the optUserId
	 */	
	public void setOptUserId(Long aValue) {
		this.optUserId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScGoodsPriceHis)) {
			return false;
		}
		ScGoodsPriceHis rhs = (ScGoodsPriceHis) object;
		return new EqualsBuilder()
				.append(this.goodsPriceHisSeq, rhs.goodsPriceHisSeq)
						.append(this.purchasePrice, rhs.purchasePrice)
				.append(this.reportPrice, rhs.reportPrice)
				.append(this.retailPrice, rhs.retailPrice)
				.append(this.wholesalePrice, rhs.wholesalePrice)
				.append(this.defaultSubsidyAmount, rhs.defaultSubsidyAmount)
				.append(this.updateTime, rhs.updateTime)
				.append(this.optUserId, rhs.optUserId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.goodsPriceHisSeq) 
						.append(this.purchasePrice) 
				.append(this.reportPrice) 
				.append(this.retailPrice) 
				.append(this.wholesalePrice) 
				.append(this.defaultSubsidyAmount) 
				.append(this.updateTime) 
				.append(this.optUserId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("goodsPriceHisSeq", this.goodsPriceHisSeq) 
						.append("purchasePrice", this.purchasePrice) 
				.append("reportPrice", this.reportPrice) 
				.append("retailPrice", this.retailPrice) 
				.append("wholesalePrice", this.wholesalePrice) 
				.append("defaultSubsidyAmount", this.defaultSubsidyAmount) 
				.append("updateTime", this.updateTime) 
				.append("optUserId", this.optUserId) 
				.toString();
	}



}
