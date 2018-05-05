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
 * ScProductInst Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScProductInst extends com.htsoft.core.model.BaseModel {

    protected Long productInstId;
	protected String productEsnId;
	protected String productName;
	protected Short isLocked;
	protected Short productModelFlag;
	protected Long supplierId;
	protected Short productStatus;
	protected Long warehouseId;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime;
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
	protected com.ulane.supply.model.goods.ScGoods scGoods;

	protected java.util.Set scBoPurchaseDetailProInsts = new java.util.HashSet();
	protected java.util.Set scBoSalesDetailProInsts = new java.util.HashSet();
	protected java.util.Set scBoStockDetailProInsts = new java.util.HashSet();
	protected java.util.Set scGoodsStockProductInsts = new java.util.HashSet();
	protected java.util.Set scProductInstNotes = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScProductInst
	 */
	public ScProductInst () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScProductInst
	 */
	public ScProductInst (
		 Long in_productInstId
        ) {
		this.setProductInstId(in_productInstId);
    }

	
	public com.ulane.supply.model.goods.ScGoods getScGoods () {
		return scGoods;
	}	
	
	public void setScGoods (com.ulane.supply.model.goods.ScGoods in_scGoods) {
		this.scGoods = in_scGoods;
	}

	public java.util.Set getScBoPurchaseDetailProInsts () {
		return scBoPurchaseDetailProInsts;
	}	
	
	public void setScBoPurchaseDetailProInsts (java.util.Set in_scBoPurchaseDetailProInsts) {
		this.scBoPurchaseDetailProInsts = in_scBoPurchaseDetailProInsts;
	}

	public java.util.Set getScBoSalesDetailProInsts () {
		return scBoSalesDetailProInsts;
	}	
	
	public void setScBoSalesDetailProInsts (java.util.Set in_scBoSalesDetailProInsts) {
		this.scBoSalesDetailProInsts = in_scBoSalesDetailProInsts;
	}

	public java.util.Set getScBoStockDetailProInsts () {
		return scBoStockDetailProInsts;
	}	
	
	public void setScBoStockDetailProInsts (java.util.Set in_scBoStockDetailProInsts) {
		this.scBoStockDetailProInsts = in_scBoStockDetailProInsts;
	}

	public java.util.Set getScGoodsStockProductInsts () {
		return scGoodsStockProductInsts;
	}	
	
	public void setScGoodsStockProductInsts (java.util.Set in_scGoodsStockProductInsts) {
		this.scGoodsStockProductInsts = in_scGoodsStockProductInsts;
	}

	public java.util.Set getScProductInstNotes () {
		return scProductInstNotes;
	}	
	
	public void setScProductInstNotes (java.util.Set in_scProductInstNotes) {
		this.scProductInstNotes = in_scProductInstNotes;
	}
    

	/**
	 * 产品实例内码	 * @return Long
     * @hibernate.id column="PRODUCT_INST_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getProductInstId() {
		return this.productInstId;
	}
	
	/**
	 * Set the productInstId
	 */	
	public void setProductInstId(Long aValue) {
		this.productInstId = aValue;
	}	

	/**
	 * 条码	 * @return String
	 * @hibernate.property column="PRODUCT_ESN_ID" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getProductEsnId() {
		return this.productEsnId;
	}
	
	/**
	 * Set the productEsnId
	 */	
	public void setProductEsnId(String aValue) {
		this.productEsnId = aValue;
	}	

	/**
	 * 产品名称	 * @return String
	 * @hibernate.property column="PRODUCT_NAME" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getProductName() {
		return this.productName;
	}
	
	/**
	 * Set the productName
	 */	
	public void setProductName(String aValue) {
		this.productName = aValue;
	}	

	/**
	 * 是否锁定&CON_T_IS_LOCK	 * @return Short
	 * @hibernate.property column="IS_LOCKED" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getIsLocked() {
		return this.isLocked;
	}
	
	/**
	 * Set the isLocked
	 * @spring.validator type="required"
	 */	
	public void setIsLocked(Short aValue) {
		this.isLocked = aValue;
	}	

	/**
	 * 产品型号标志	 * @return Short
	 * @hibernate.property column="PRODUCT_MODEL_FLAG" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getProductModelFlag() {
		return this.productModelFlag;
	}
	
	/**
	 * Set the productModelFlag
	 * @spring.validator type="required"
	 */	
	public void setProductModelFlag(Short aValue) {
		this.productModelFlag = aValue;
	}	

	/**
	 * 供货商内码	 * @return Long
	 * @hibernate.property column="SUPPLIER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getSupplierId() {
		return this.supplierId;
	}
	
	/**
	 * Set the supplierId
	 */	
	public void setSupplierId(Long aValue) {
		this.supplierId = aValue;
	}	

	/**
	 * 商品资源状态&CON_T_PRO_STATUS	 * @return Short
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScProductInst)) {
			return false;
		}
		ScProductInst rhs = (ScProductInst) object;
		return new EqualsBuilder()
				.append(this.productInstId, rhs.productInstId)
				.append(this.productEsnId, rhs.productEsnId)
				.append(this.productName, rhs.productName)
				.append(this.isLocked, rhs.isLocked)
				.append(this.productModelFlag, rhs.productModelFlag)
				.append(this.supplierId, rhs.supplierId)
				.append(this.productStatus, rhs.productStatus)
				.append(this.warehouseId, rhs.warehouseId)
				.append(this.createUserId, rhs.createUserId)
				.append(this.createTime, rhs.createTime)
				.append(this.updateUserId, rhs.updateUserId)
				.append(this.updateTime, rhs.updateTime)
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
				.append(this.productInstId) 
				.append(this.productEsnId) 
				.append(this.productName) 
				.append(this.isLocked) 
				.append(this.productModelFlag) 
				.append(this.supplierId) 
				.append(this.productStatus) 
				.append(this.warehouseId) 
				.append(this.createUserId) 
				.append(this.createTime) 
				.append(this.updateUserId) 
				.append(this.updateTime) 
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
				.append("productInstId", this.productInstId) 
				.append("productEsnId", this.productEsnId) 
				.append("productName", this.productName) 
				.append("isLocked", this.isLocked) 
				.append("productModelFlag", this.productModelFlag) 
				.append("supplierId", this.supplierId) 
				.append("productStatus", this.productStatus) 
				.append("warehouseId", this.warehouseId) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime", this.updateTime) 
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
