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
 * ScProductAttrVal Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScProductAttrVal extends com.htsoft.core.model.BaseModel {

    protected Long productAttrVal;
	protected String productDispVal;
	protected String productTranVal;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime;
	protected String desc;
	protected com.ulane.supply.model.goods.ScProductAttr scProductAttr;

	protected java.util.Set scProAttrRelations = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScProductAttrVal
	 */
	public ScProductAttrVal () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScProductAttrVal
	 */
	public ScProductAttrVal (
		 Long in_productAttrVal
        ) {
		this.setProductAttrVal(in_productAttrVal);
    }

	
	public com.ulane.supply.model.goods.ScProductAttr getScProductAttr () {
		return scProductAttr;
	}	
	
	public void setScProductAttr (com.ulane.supply.model.goods.ScProductAttr in_scProductAttr) {
		this.scProductAttr = in_scProductAttr;
	}

	public java.util.Set getScProAttrRelations () {
		return scProAttrRelations;
	}	
	
	public void setScProAttrRelations (java.util.Set in_scProAttrRelations) {
		this.scProAttrRelations = in_scProAttrRelations;
	}
    

	/**
	 * 产品属性值内码	 * @return Long
     * @hibernate.id column="PRODUCT_ATTR_VAL" type="java.lang.Long" generator-class="native"
	 */
	public Long getProductAttrVal() {
		return this.productAttrVal;
	}
	
	/**
	 * Set the productAttrVal
	 */	
	public void setProductAttrVal(Long aValue) {
		this.productAttrVal = aValue;
	}	

	/**
	 * 产品属性编码	 * @return Long
	 */
	public Long getProductAttrCode() {
		return this.getScProductAttr()==null?null:this.getScProductAttr().getProductAttrCode();
	}
	
	/**
	 * Set the productAttrCode
	 */	
	public void setProductAttrCode(Long aValue) {
	    if (aValue==null) {
	    	scProductAttr = null;
	    } else if (scProductAttr == null) {
	        scProductAttr = new com.ulane.supply.model.goods.ScProductAttr(aValue);
	        scProductAttr.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			scProductAttr.setProductAttrCode(aValue);
	    }
	}	

	/**
	 * 显示值	 * @return String
	 * @hibernate.property column="PRODUCT_DISP_VAL" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getProductDispVal() {
		return this.productDispVal;
	}
	
	/**
	 * Set the productDispVal
	 */	
	public void setProductDispVal(String aValue) {
		this.productDispVal = aValue;
	}	

	/**
	 * 传递值	 * @return String
	 * @hibernate.property column="PRODUCT_TRAN_VAL" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getProductTranVal() {
		return this.productTranVal;
	}
	
	/**
	 * Set the productTranVal
	 */	
	public void setProductTranVal(String aValue) {
		this.productTranVal = aValue;
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
		if (!(object instanceof ScProductAttrVal)) {
			return false;
		}
		ScProductAttrVal rhs = (ScProductAttrVal) object;
		return new EqualsBuilder()
				.append(this.productAttrVal, rhs.productAttrVal)
						.append(this.productDispVal, rhs.productDispVal)
				.append(this.productTranVal, rhs.productTranVal)
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
				.append(this.productAttrVal) 
						.append(this.productDispVal) 
				.append(this.productTranVal) 
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
				.append("productAttrVal", this.productAttrVal) 
						.append("productDispVal", this.productDispVal) 
				.append("productTranVal", this.productTranVal) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime", this.updateTime) 
				.append("desc", this.desc) 
				.toString();
	}



}
