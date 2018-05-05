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
 * ScProductInstNote Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScProductInstNote extends com.htsoft.core.model.BaseModel {

    protected Long instStockId;
	protected Short instStockType;
	protected Long bizOrderId;
	protected java.util.Date entryTime;
	protected Short productStatus;
	protected String sellArea;
	protected Long warehouseId;
	protected Long count;
	protected java.math.BigDecimal price;
	protected java.util.Date updateTime;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime2;
	protected String desc;
	protected com.ulane.supply.model.goods.ScProductInst scProductInst;


	/**
	 * Default Empty Constructor for class ScProductInstNote
	 */
	public ScProductInstNote () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScProductInstNote
	 */
	public ScProductInstNote (
		 Long in_instStockId
        ) {
		this.setInstStockId(in_instStockId);
    }

	
	public com.ulane.supply.model.goods.ScProductInst getScProductInst () {
		return scProductInst;
	}	
	
	public void setScProductInst (com.ulane.supply.model.goods.ScProductInst in_scProductInst) {
		this.scProductInst = in_scProductInst;
	}
    

	/**
	 * 出入库内码	 * @return Long
     * @hibernate.id column="INST_STOCK_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getInstStockId() {
		return this.instStockId;
	}
	
	/**
	 * Set the instStockId
	 */	
	public void setInstStockId(Long aValue) {
		this.instStockId = aValue;
	}	

	/**
	 * 产品实例内码	 * @return Long
	 */
	public Long getProductInstId() {
		return this.getScProductInst()==null?null:this.getScProductInst().getProductInstId();
	}
	
	/**
	 * Set the productInstId
	 */	
	public void setProductInstId(Long aValue) {
	    if (aValue==null) {
	    	scProductInst = null;
	    } else if (scProductInst == null) {
	        scProductInst = new com.ulane.supply.model.goods.ScProductInst(aValue);
	        scProductInst.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			scProductInst.setProductInstId(aValue);
	    }
	}	

	/**
	 * 出入库类型：&CON_T_STOCK_TYPE	 * @return Short
	 * @hibernate.property column="INST_STOCK_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getInstStockType() {
		return this.instStockType;
	}
	
	/**
	 * Set the instStockType
	 */	
	public void setInstStockType(Short aValue) {
		this.instStockType = aValue;
	}	

	/**
	 * 业务单内码	 * @return Long
	 * @hibernate.property column="BIZ_ORDER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getBizOrderId() {
		return this.bizOrderId;
	}
	
	/**
	 * Set the bizOrderId
	 */	
	public void setBizOrderId(Long aValue) {
		this.bizOrderId = aValue;
	}	

	/**
	 * 发生时间	 * @return java.util.Date
	 * @hibernate.property column="ENTRY_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEntryTime() {
		return this.entryTime;
	}
	
	/**
	 * Set the entryTime
	 */	
	public void setEntryTime(java.util.Date aValue) {
		this.entryTime = aValue;
	}	

	/**
	 * 商品资源状态0-临时状态、1-正式未销售、2-零售销售、3-批发销售&CON_T_PRO_STATUS	 * @return Short
	 * @hibernate.property column="PRODUCT_STATUS" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getProductStatus() {
		return this.productStatus;
	}
	
	/**
	 * Set the productStatus
	 * @spring.validator type="required"
	 */	
	public void setProductStatus(Short aValue) {
		this.productStatus = aValue;
	}	

	/**
	 * 销售地区	 * @return String
	 * @hibernate.property column="SELL_AREA" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getSellArea() {
		return this.sellArea;
	}
	
	/**
	 * Set the sellArea
	 */	
	public void setSellArea(String aValue) {
		this.sellArea = aValue;
	}	

	/**
	 * 当前仓库内码	 * @return Long
	 * @hibernate.property column="WAREHOUSE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getWarehouseId() {
		return this.warehouseId;
	}
	
	/**
	 * Set the warehouseId
	 */	
	public void setWarehouseId(Long aValue) {
		this.warehouseId = aValue;
	}	

	/**
	 * 数量	 * @return Long
	 * @hibernate.property column="COUNT" type="java.lang.Long" length="15" not-null="false" unique="false"
	 */
	public Long getCount() {
		return this.count;
	}
	
	/**
	 * Set the count
	 */	
	public void setCount(Long aValue) {
		this.count = aValue;
	}	

	/**
	 * 单价	 * @return java.math.BigDecimal
	 * @hibernate.property column="PRICE" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getPrice() {
		return this.price;
	}
	
	/**
	 * Set the price
	 */	
	public void setPrice(java.math.BigDecimal aValue) {
		this.price = aValue;
	}	

	/**
	 * 状态变更时间	 * @return java.util.Date
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
		if (!(object instanceof ScProductInstNote)) {
			return false;
		}
		ScProductInstNote rhs = (ScProductInstNote) object;
		return new EqualsBuilder()
				.append(this.instStockId, rhs.instStockId)
						.append(this.instStockType, rhs.instStockType)
				.append(this.bizOrderId, rhs.bizOrderId)
				.append(this.entryTime, rhs.entryTime)
				.append(this.productStatus, rhs.productStatus)
				.append(this.sellArea, rhs.sellArea)
				.append(this.warehouseId, rhs.warehouseId)
				.append(this.count, rhs.count)
				.append(this.price, rhs.price)
				.append(this.updateTime, rhs.updateTime)
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
				.append(this.instStockId) 
						.append(this.instStockType) 
				.append(this.bizOrderId) 
				.append(this.entryTime) 
				.append(this.productStatus) 
				.append(this.sellArea) 
				.append(this.warehouseId) 
				.append(this.count) 
				.append(this.price) 
				.append(this.updateTime) 
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
				.append("instStockId", this.instStockId) 
						.append("instStockType", this.instStockType) 
				.append("bizOrderId", this.bizOrderId) 
				.append("entryTime", this.entryTime) 
				.append("productStatus", this.productStatus) 
				.append("sellArea", this.sellArea) 
				.append("warehouseId", this.warehouseId) 
				.append("count", this.count) 
				.append("price", this.price) 
				.append("updateTime", this.updateTime) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime2", this.updateTime2) 
				.append("desc", this.desc) 
				.toString();
	}



}
