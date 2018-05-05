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
 * ScBoStockDetail Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScBoStockDetail extends com.htsoft.core.model.BaseModel {

    protected Long bizOrderDetailId;
	protected java.math.BigDecimal goodsUnitPrice;
	protected Long goodsCount;
	protected String desc;
	protected String ext1;
	protected String ext2;
	protected String ext3;
	protected String ext4;
	protected String ext5;
	protected String ext6;
	protected String ext7;
	protected String ext8;
	protected String ext9;
	protected String ext10;
	protected java.math.BigDecimal ext11;
	protected java.math.BigDecimal ext12;
	protected java.math.BigDecimal ext13;
	protected java.math.BigDecimal ext14;
	protected java.math.BigDecimal ext15;
	protected java.util.Date ext16;
	protected java.util.Date ext17;
	protected java.util.Date ext18;
	protected java.util.Date ext19;
	protected java.util.Date ext20;
	protected com.ulane.supply.model.stock.ScBizOrderStock scBizOrderStock;
	protected com.ulane.supply.model.goods.ScGoods scGoods;
	protected com.ulane.supply.model.stock.ScWarehouse scWarehouse;

	protected java.util.Set scBoStockClassifys = new java.util.HashSet();
	protected java.util.Set scBoStockDetailProInsts = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScBoStockDetail
	 */
	public ScBoStockDetail () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScBoStockDetail
	 */
	public ScBoStockDetail (
		 Long in_bizOrderDetailId
        ) {
		this.setBizOrderDetailId(in_bizOrderDetailId);
    }

	
	public com.ulane.supply.model.stock.ScBizOrderStock getScBizOrderStock () {
		return scBizOrderStock;
	}	
	
	public void setScBizOrderStock (com.ulane.supply.model.stock.ScBizOrderStock in_scBizOrderStock) {
		this.scBizOrderStock = in_scBizOrderStock;
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

	public java.util.Set getScBoStockClassifys () {
		return scBoStockClassifys;
	}	
	
	public void setScBoStockClassifys (java.util.Set in_scBoStockClassifys) {
		this.scBoStockClassifys = in_scBoStockClassifys;
	}

	public java.util.Set getScBoStockDetailProInsts () {
		return scBoStockDetailProInsts;
	}	
	
	public void setScBoStockDetailProInsts (java.util.Set in_scBoStockDetailProInsts) {
		this.scBoStockDetailProInsts = in_scBoStockDetailProInsts;
	}
    

	/**
	 * 业务单明细内码	 * @return Long
     * @hibernate.id column="BIZ_ORDER_DETAIL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBizOrderDetailId() {
		return this.bizOrderDetailId;
	}
	
	/**
	 * Set the bizOrderDetailId
	 */	
	public void setBizOrderDetailId(Long aValue) {
		this.bizOrderDetailId = aValue;
	}	

	/**
	 * 业务单内码	 * @return Long
	 */
	public Long getBizOrderId() {
		return this.getScBizOrderStock()==null?null:this.getScBizOrderStock().getBizOrderId();
	}
	
	/**
	 * Set the bizOrderId
	 */	
	public void setBizOrderId(Long aValue) {
	    if (aValue==null) {
	    	scBizOrderStock = null;
	    } else if (scBizOrderStock == null) {
	        scBizOrderStock = new com.ulane.supply.model.stock.ScBizOrderStock(aValue);
	        scBizOrderStock.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			scBizOrderStock.setBizOrderId(aValue);
	    }
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
	 * 商品价格	 * @return java.math.BigDecimal
	 * @hibernate.property column="GOODS_UNIT_PRICE" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getGoodsUnitPrice() {
		return this.goodsUnitPrice;
	}
	
	/**
	 * Set the goodsUnitPrice
	 */	
	public void setGoodsUnitPrice(java.math.BigDecimal aValue) {
		this.goodsUnitPrice = aValue;
	}	

	/**
	 * 商品数量	 * @return Long
	 * @hibernate.property column="GOODS_COUNT" type="java.lang.Long" length="15" not-null="false" unique="false"
	 */
	public Long getGoodsCount() {
		return this.goodsCount;
	}
	
	/**
	 * Set the goodsCount
	 */	
	public void setGoodsCount(Long aValue) {
		this.goodsCount = aValue;
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
	 * 扩展1	 * @return String
	 * @hibernate.property column="EXT_1" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt1() {
		return this.ext1;
	}
	
	/**
	 * Set the ext1
	 */	
	public void setExt1(String aValue) {
		this.ext1 = aValue;
	}	

	/**
	 * 扩展2	 * @return String
	 * @hibernate.property column="EXT_2" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt2() {
		return this.ext2;
	}
	
	/**
	 * Set the ext2
	 */	
	public void setExt2(String aValue) {
		this.ext2 = aValue;
	}	

	/**
	 * 扩展3	 * @return String
	 * @hibernate.property column="EXT_3" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt3() {
		return this.ext3;
	}
	
	/**
	 * Set the ext3
	 */	
	public void setExt3(String aValue) {
		this.ext3 = aValue;
	}	

	/**
	 * 扩展4	 * @return String
	 * @hibernate.property column="EXT_4" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt4() {
		return this.ext4;
	}
	
	/**
	 * Set the ext4
	 */	
	public void setExt4(String aValue) {
		this.ext4 = aValue;
	}	

	/**
	 * 扩展5	 * @return String
	 * @hibernate.property column="EXT_5" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt5() {
		return this.ext5;
	}
	
	/**
	 * Set the ext5
	 */	
	public void setExt5(String aValue) {
		this.ext5 = aValue;
	}	

	/**
	 * 扩展6	 * @return String
	 * @hibernate.property column="EXT_6" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt6() {
		return this.ext6;
	}
	
	/**
	 * Set the ext6
	 */	
	public void setExt6(String aValue) {
		this.ext6 = aValue;
	}	

	/**
	 * 扩展7	 * @return String
	 * @hibernate.property column="EXT_7" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt7() {
		return this.ext7;
	}
	
	/**
	 * Set the ext7
	 */	
	public void setExt7(String aValue) {
		this.ext7 = aValue;
	}	

	/**
	 * 扩展8	 * @return String
	 * @hibernate.property column="EXT_8" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt8() {
		return this.ext8;
	}
	
	/**
	 * Set the ext8
	 */	
	public void setExt8(String aValue) {
		this.ext8 = aValue;
	}	

	/**
	 * 扩展9	 * @return String
	 * @hibernate.property column="EXT_9" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt9() {
		return this.ext9;
	}
	
	/**
	 * Set the ext9
	 */	
	public void setExt9(String aValue) {
		this.ext9 = aValue;
	}	

	/**
	 * 扩展10	 * @return String
	 * @hibernate.property column="EXT_10" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt10() {
		return this.ext10;
	}
	
	/**
	 * Set the ext10
	 */	
	public void setExt10(String aValue) {
		this.ext10 = aValue;
	}	

	/**
	 * 扩展11	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_11" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt11() {
		return this.ext11;
	}
	
	/**
	 * Set the ext11
	 */	
	public void setExt11(java.math.BigDecimal aValue) {
		this.ext11 = aValue;
	}	

	/**
	 * 扩展12	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_12" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt12() {
		return this.ext12;
	}
	
	/**
	 * Set the ext12
	 */	
	public void setExt12(java.math.BigDecimal aValue) {
		this.ext12 = aValue;
	}	

	/**
	 * 扩展13	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_13" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt13() {
		return this.ext13;
	}
	
	/**
	 * Set the ext13
	 */	
	public void setExt13(java.math.BigDecimal aValue) {
		this.ext13 = aValue;
	}	

	/**
	 * 扩展14	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_14" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt14() {
		return this.ext14;
	}
	
	/**
	 * Set the ext14
	 */	
	public void setExt14(java.math.BigDecimal aValue) {
		this.ext14 = aValue;
	}	

	/**
	 * 扩展15	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_15" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt15() {
		return this.ext15;
	}
	
	/**
	 * Set the ext15
	 */	
	public void setExt15(java.math.BigDecimal aValue) {
		this.ext15 = aValue;
	}	

	/**
	 * 扩展16	 * @return java.util.Date
	 * @hibernate.property column="EXT_16" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getExt16() {
		return this.ext16;
	}
	
	/**
	 * Set the ext16
	 */	
	public void setExt16(java.util.Date aValue) {
		this.ext16 = aValue;
	}	

	/**
	 * 扩展17	 * @return java.util.Date
	 * @hibernate.property column="EXT_17" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getExt17() {
		return this.ext17;
	}
	
	/**
	 * Set the ext17
	 */	
	public void setExt17(java.util.Date aValue) {
		this.ext17 = aValue;
	}	

	/**
	 * 扩展18	 * @return java.util.Date
	 * @hibernate.property column="EXT_18" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getExt18() {
		return this.ext18;
	}
	
	/**
	 * Set the ext18
	 */	
	public void setExt18(java.util.Date aValue) {
		this.ext18 = aValue;
	}	

	/**
	 * 扩展19	 * @return java.util.Date
	 * @hibernate.property column="EXT_19" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getExt19() {
		return this.ext19;
	}
	
	/**
	 * Set the ext19
	 */	
	public void setExt19(java.util.Date aValue) {
		this.ext19 = aValue;
	}	

	/**
	 * 扩展20	 * @return java.util.Date
	 * @hibernate.property column="EXT_20" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getExt20() {
		return this.ext20;
	}
	
	/**
	 * Set the ext20
	 */	
	public void setExt20(java.util.Date aValue) {
		this.ext20 = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScBoStockDetail)) {
			return false;
		}
		ScBoStockDetail rhs = (ScBoStockDetail) object;
		return new EqualsBuilder()
				.append(this.bizOrderDetailId, rhs.bizOrderDetailId)
								.append(this.goodsUnitPrice, rhs.goodsUnitPrice)
				.append(this.goodsCount, rhs.goodsCount)
						.append(this.desc, rhs.desc)
				.append(this.ext1, rhs.ext1)
				.append(this.ext2, rhs.ext2)
				.append(this.ext3, rhs.ext3)
				.append(this.ext4, rhs.ext4)
				.append(this.ext5, rhs.ext5)
				.append(this.ext6, rhs.ext6)
				.append(this.ext7, rhs.ext7)
				.append(this.ext8, rhs.ext8)
				.append(this.ext9, rhs.ext9)
				.append(this.ext10, rhs.ext10)
				.append(this.ext11, rhs.ext11)
				.append(this.ext12, rhs.ext12)
				.append(this.ext13, rhs.ext13)
				.append(this.ext14, rhs.ext14)
				.append(this.ext15, rhs.ext15)
				.append(this.ext16, rhs.ext16)
				.append(this.ext17, rhs.ext17)
				.append(this.ext18, rhs.ext18)
				.append(this.ext19, rhs.ext19)
				.append(this.ext20, rhs.ext20)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bizOrderDetailId) 
								.append(this.goodsUnitPrice) 
				.append(this.goodsCount) 
						.append(this.desc) 
				.append(this.ext1) 
				.append(this.ext2) 
				.append(this.ext3) 
				.append(this.ext4) 
				.append(this.ext5) 
				.append(this.ext6) 
				.append(this.ext7) 
				.append(this.ext8) 
				.append(this.ext9) 
				.append(this.ext10) 
				.append(this.ext11) 
				.append(this.ext12) 
				.append(this.ext13) 
				.append(this.ext14) 
				.append(this.ext15) 
				.append(this.ext16) 
				.append(this.ext17) 
				.append(this.ext18) 
				.append(this.ext19) 
				.append(this.ext20) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bizOrderDetailId", this.bizOrderDetailId) 
								.append("goodsUnitPrice", this.goodsUnitPrice) 
				.append("goodsCount", this.goodsCount) 
						.append("desc", this.desc) 
				.append("ext1", this.ext1) 
				.append("ext2", this.ext2) 
				.append("ext3", this.ext3) 
				.append("ext4", this.ext4) 
				.append("ext5", this.ext5) 
				.append("ext6", this.ext6) 
				.append("ext7", this.ext7) 
				.append("ext8", this.ext8) 
				.append("ext9", this.ext9) 
				.append("ext10", this.ext10) 
				.append("ext11", this.ext11) 
				.append("ext12", this.ext12) 
				.append("ext13", this.ext13) 
				.append("ext14", this.ext14) 
				.append("ext15", this.ext15) 
				.append("ext16", this.ext16) 
				.append("ext17", this.ext17) 
				.append("ext18", this.ext18) 
				.append("ext19", this.ext19) 
				.append("ext20", this.ext20) 
				.toString();
	}



}