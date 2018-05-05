package com.ulane.supply.model.stock;
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
 * ScThresholdLevel Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScThresholdLevel extends com.htsoft.core.model.BaseModel {

    protected Long threshLevelId;
	protected java.math.BigDecimal upLevel;
	protected java.math.BigDecimal downLevel;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime2;
	protected String desc;
	protected com.ulane.supply.model.goods.ScGoods scGoods;
	protected com.ulane.supply.model.stock.ScWarehouse scWarehouse;


	/**
	 * Default Empty Constructor for class ScThresholdLevel
	 */
	public ScThresholdLevel () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScThresholdLevel
	 */
	public ScThresholdLevel (
		 Long in_threshLevelId
        ) {
		this.setThreshLevelId(in_threshLevelId);
    }

	
	public com.ulane.supply.model.goods.ScGoods getScGoods () {
		return scGoods;
	}	
	
	public void setScGoods (com.ulane.supply.model.goods.ScGoods in_scGoods) {
		this.scGoods = in_scGoods;
	}
	
	public com.ulane.supply.model.stock.ScWarehouse getScWarehouse () {
		return scWarehouse;
	}	
	
	public void setScWarehouse (com.ulane.supply.model.stock.ScWarehouse in_scWarehouse) {
		this.scWarehouse = in_scWarehouse;
	}
    

	/**
	 * 阀值内码	 * @return Long
     * @hibernate.id column="THRESH_LEVEL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getThreshLevelId() {
		return this.threshLevelId;
	}
	
	/**
	 * Set the threshLevelId
	 */	
	public void setThreshLevelId(Long aValue) {
		this.threshLevelId = aValue;
	}	

	/**
	 * 商品内码	 * @return Long
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
	 * 仓库内码	 * @return Long
	 */
	public Long getWarehouseId() {
		return this.getScWarehouse()==null?null:this.getScWarehouse().getWarehouseId();
	}
	
	/**
	 * Set the warehouseId
	 */	
	public void setWarehouseId(Long aValue) {
	    if (aValue==null) {
	    	scWarehouse = null;
	    } else if (scWarehouse == null) {
	        scWarehouse = new com.ulane.supply.model.stock.ScWarehouse(aValue);
	        scWarehouse.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			scWarehouse.setWarehouseId(aValue);
	    }
	}	

	/**
	 * 上线	 * @return java.math.BigDecimal
	 * @hibernate.property column="UP_LEVEL" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getUpLevel() {
		return this.upLevel;
	}
	
	/**
	 * Set the upLevel
	 */	
	public void setUpLevel(java.math.BigDecimal aValue) {
		this.upLevel = aValue;
	}	

	/**
	 * 下线	 * @return java.math.BigDecimal
	 * @hibernate.property column="DOWN_LEVEL" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getDownLevel() {
		return this.downLevel;
	}
	
	/**
	 * Set the downLevel
	 */	
	public void setDownLevel(java.math.BigDecimal aValue) {
		this.downLevel = aValue;
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
		if (!(object instanceof ScThresholdLevel)) {
			return false;
		}
		ScThresholdLevel rhs = (ScThresholdLevel) object;
		return new EqualsBuilder()
				.append(this.threshLevelId, rhs.threshLevelId)
								.append(this.upLevel, rhs.upLevel)
				.append(this.downLevel, rhs.downLevel)
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
				.append(this.threshLevelId) 
								.append(this.upLevel) 
				.append(this.downLevel) 
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
				.append("threshLevelId", this.threshLevelId) 
								.append("upLevel", this.upLevel) 
				.append("downLevel", this.downLevel) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime2", this.updateTime2) 
				.append("desc", this.desc) 
				.toString();
	}



}
