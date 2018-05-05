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
 * ScWarehouse Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScWarehouse extends com.htsoft.core.model.BaseModel {

    protected Long warehouseId;
    protected String warehouseNo;	//仓库编号
	protected String warehouseName;
	protected String warehousePinyin;
	protected Long warehouseMgr;
	protected String whCellphone;
	protected String whPhone;
	protected String whFax;
	protected String whAddr;
	protected String whPostcode;
	protected Long ownerDeptId;
	protected String coverArea;
	protected String warehouseDesc;
	protected Short warehouseStatus;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime2;
	protected String desc;

	protected java.util.Set scBizSalesDetails = new java.util.HashSet();
	protected java.util.Set scBoPurchaseDetails = new java.util.HashSet();
	protected java.util.Set scBoStockDetails = new java.util.HashSet();
	protected java.util.Set scGoodsStocks = new java.util.HashSet();
	protected java.util.Set scThresholdLevels = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScWarehouse
	 */
	public ScWarehouse () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScWarehouse
	 */
	public ScWarehouse (
		 Long in_warehouseId
        ) {
		this.setWarehouseId(in_warehouseId);
    }


	public java.util.Set getScBizSalesDetails () {
		return scBizSalesDetails;
	}	
	
	public void setScBizSalesDetails (java.util.Set in_scBizSalesDetails) {
		this.scBizSalesDetails = in_scBizSalesDetails;
	}

	public java.util.Set getScBoPurchaseDetails () {
		return scBoPurchaseDetails;
	}	
	
	public void setScBoPurchaseDetails (java.util.Set in_scBoPurchaseDetails) {
		this.scBoPurchaseDetails = in_scBoPurchaseDetails;
	}

	public java.util.Set getScBoStockDetails () {
		return scBoStockDetails;
	}	
	
	public void setScBoStockDetails (java.util.Set in_scBoStockDetails) {
		this.scBoStockDetails = in_scBoStockDetails;
	}

	public java.util.Set getScGoodsStocks () {
		return scGoodsStocks;
	}	
	
	public void setScGoodsStocks (java.util.Set in_scGoodsStocks) {
		this.scGoodsStocks = in_scGoodsStocks;
	}

	public java.util.Set getScThresholdLevels () {
		return scThresholdLevels;
	}	
	
	public void setScThresholdLevels (java.util.Set in_scThresholdLevels) {
		this.scThresholdLevels = in_scThresholdLevels;
	}
    

	/**
	 * 仓库内码	 * @return Long
     * @hibernate.id column="WAREHOUSE_ID" type="java.lang.Long" generator-class="native"
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
	 * 仓库名称	 * @return String
	 * @hibernate.property column="WAREHOUSE_NAME" type="java.lang.String" length="60" not-null="true" unique="false"
	 */
	public String getWarehouseName() {
		return this.warehouseName;
	}
	
	/**
	 * Set the warehouseName
	 * @spring.validator type="required"
	 */	
	public void setWarehouseName(String aValue) {
		this.warehouseName = aValue;
	}	

	/**
	 * 用于输入快速过虑	 * @return String
	 * @hibernate.property column="WAREHOUSE_PINYIN" type="java.lang.String" length="60" not-null="true" unique="false"
	 */
	public String getWarehousePinyin() {
		return this.warehousePinyin;
	}
	
	/**
	 * Set the warehousePinyin
	 * @spring.validator type="required"
	 */	
	public void setWarehousePinyin(String aValue) {
		this.warehousePinyin = aValue;
	}	

	/**
	 * 仓库负责人	 * @return Long
	 * @hibernate.property column="WAREHOUSE_MGR" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getWarehouseMgr() {
		return this.warehouseMgr;
	}
	
	/**
	 * Set the warehouseMgr
	 * @spring.validator type="required"
	 */	
	public void setWarehouseMgr(Long aValue) {
		this.warehouseMgr = aValue;
	}	

	/**
	 * 手机号码	 * @return String
	 * @hibernate.property column="WH_CELLPHONE" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getWhCellphone() {
		return this.whCellphone;
	}
	
	/**
	 * Set the whCellphone
	 */	
	public void setWhCellphone(String aValue) {
		this.whCellphone = aValue;
	}	

	/**
	 * 固定电话	 * @return String
	 * @hibernate.property column="WH_PHONE" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getWhPhone() {
		return this.whPhone;
	}
	
	/**
	 * Set the whPhone
	 */	
	public void setWhPhone(String aValue) {
		this.whPhone = aValue;
	}	

	/**
	 * 传真	 * @return String
	 * @hibernate.property column="WH_FAX" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getWhFax() {
		return this.whFax;
	}
	
	/**
	 * Set the whFax
	 */	
	public void setWhFax(String aValue) {
		this.whFax = aValue;
	}	

	/**
	 * 仓库地址	 * @return String
	 * @hibernate.property column="WH_ADDR" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getWhAddr() {
		return this.whAddr;
	}
	
	/**
	 * Set the whAddr
	 */	
	public void setWhAddr(String aValue) {
		this.whAddr = aValue;
	}	

	/**
	 * 邮政编码	 * @return String
	 * @hibernate.property column="WH_POSTCODE" type="java.lang.String" length="6" not-null="false" unique="false"
	 */
	public String getWhPostcode() {
		return this.whPostcode;
	}
	
	/**
	 * Set the whPostcode
	 */	
	public void setWhPostcode(String aValue) {
		this.whPostcode = aValue;
	}	

	/**
	 * 所属部门标识	 * @return Long
	 * @hibernate.property column="OWNER_DEPT_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getOwnerDeptId() {
		return this.ownerDeptId;
	}
	
	/**
	 * Set the ownerDeptId
	 */	
	public void setOwnerDeptId(Long aValue) {
		this.ownerDeptId = aValue;
	}	

	/**
	 * 覆盖区域	 * @return String
	 * @hibernate.property column="COVER_AREA" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getCoverArea() {
		return this.coverArea;
	}
	
	/**
	 * Set the coverArea
	 */	
	public void setCoverArea(String aValue) {
		this.coverArea = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="WAREHOUSE_DESC" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getWarehouseDesc() {
		return this.warehouseDesc;
	}
	
	/**
	 * Set the warehouseDesc
	 */	
	public void setWarehouseDesc(String aValue) {
		this.warehouseDesc = aValue;
	}	

	/**
	 * 仓库状态&CON_T_WH_STATUS	 * @return Short
	 * @hibernate.property column="WAREHOUSE_STATUS" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getWarehouseStatus() {
		return this.warehouseStatus;
	}
	
	/**
	 * Set the warehouseStatus
	 */	
	public void setWarehouseStatus(Short aValue) {
		this.warehouseStatus = aValue;
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

	public String getWarehouseNo() {
		return warehouseNo;
	}

	public void setWarehouseNo(String warehouseNo) {
		this.warehouseNo = warehouseNo;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScWarehouse)) {
			return false;
		}
		ScWarehouse rhs = (ScWarehouse) object;
		return new EqualsBuilder()
				.append(this.warehouseId, rhs.warehouseId)
				.append(this.warehouseNo, rhs.warehouseNo)
				.append(this.warehouseName, rhs.warehouseName)
				.append(this.warehousePinyin, rhs.warehousePinyin)
				.append(this.warehouseMgr, rhs.warehouseMgr)
				.append(this.whCellphone, rhs.whCellphone)
				.append(this.whPhone, rhs.whPhone)
				.append(this.whFax, rhs.whFax)
				.append(this.whAddr, rhs.whAddr)
				.append(this.whPostcode, rhs.whPostcode)
				.append(this.ownerDeptId, rhs.ownerDeptId)
				.append(this.coverArea, rhs.coverArea)
				.append(this.warehouseDesc, rhs.warehouseDesc)
				.append(this.warehouseStatus, rhs.warehouseStatus)
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
				.append(this.warehouseId) 
				.append(this.warehouseNo)
				.append(this.warehouseName) 
				.append(this.warehousePinyin) 
				.append(this.warehouseMgr) 
				.append(this.whCellphone) 
				.append(this.whPhone) 
				.append(this.whFax) 
				.append(this.whAddr) 
				.append(this.whPostcode) 
				.append(this.ownerDeptId) 
				.append(this.coverArea) 
				.append(this.warehouseDesc) 
				.append(this.warehouseStatus) 
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
				.append("warehouseId", this.warehouseId) 
				.append("warehouseNo",this.warehouseNo)
				.append("warehouseName", this.warehouseName) 
				.append("warehousePinyin", this.warehousePinyin) 
				.append("warehouseMgr", this.warehouseMgr) 
				.append("whCellphone", this.whCellphone) 
				.append("whPhone", this.whPhone) 
				.append("whFax", this.whFax) 
				.append("whAddr", this.whAddr) 
				.append("whPostcode", this.whPostcode) 
				.append("ownerDeptId", this.ownerDeptId) 
				.append("coverArea", this.coverArea) 
				.append("warehouseDesc", this.warehouseDesc) 
				.append("warehouseStatus", this.warehouseStatus) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime2", this.updateTime2) 
				.append("desc", this.desc) 
				.toString();
	}



}
