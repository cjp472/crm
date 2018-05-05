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
 * ScProductClassify Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScProductClassify extends com.htsoft.core.model.BaseModel {

    protected Long productClassifyId;
	protected String productClassifyName;
	protected String productClassifyPinyin;
	protected String productClassifyDispCode;
	protected String productClassifyRemarks;
	protected Short productModelFlag;
	protected Long masterProductClassifyId;
	protected String path;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime;
	protected String desc;
	protected Short status;
	protected String parentName;

	protected java.util.Set scGoodss = new java.util.HashSet();
	protected java.util.Set scProductAttrs = new java.util.HashSet();
	 
	/**
     * 代表未启用
     */
    public static final Short FLAG_DISABLED = 0;
    /**
     * 代表已启用
     */
    public static final Short FLAG_ENABLED = 1;
    /**
     * 代表已删除
     */
    public static final Short FLAG_DELETED = 2;
    
	/**
	 * Default Empty Constructor for class ScProductClassify
	 */
	public ScProductClassify () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScProductClassify
	 */
	public ScProductClassify (
		 Long in_productClassifyId
        ) {
		this.setProductClassifyId(in_productClassifyId);
    }


	public java.util.Set getScGoodss () {
		return scGoodss;
	}	
	
	public void setScGoodss (java.util.Set in_scGoodss) {
		this.scGoodss = in_scGoodss;
	}

	public java.util.Set getScProductAttrs () {
		return scProductAttrs;
	}	
	
	public void setScProductAttrs (java.util.Set in_scProductAttrs) {
		this.scProductAttrs = in_scProductAttrs;
	}
    

	/**
	 * 产品分类内码	 * @return Long
     * @hibernate.id column="PRODUCT_CLASSIFY_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getProductClassifyId() {
		return this.productClassifyId;
	}
	
	/**
	 * Set the productClassifyId
	 */	
	public void setProductClassifyId(Long aValue) {
		this.productClassifyId = aValue;
	}	

	/**
	 * 产品分类名称	 * @return String
	 * @hibernate.property column="PRODUCT_CLASSIFY_NAME" type="java.lang.String" length="60" not-null="true" unique="false"
	 */
	public String getProductClassifyName() {
		return this.productClassifyName;
	}
	
	/**
	 * Set the productClassifyName
	 * @spring.validator type="required"
	 */	
	public void setProductClassifyName(String aValue) {
		this.productClassifyName = aValue;
	}	

	/**
	 * 产品分类拼音	 * @return String
	 * @hibernate.property column="PRODUCT_CLASSIFY_PINYIN" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getProductClassifyPinyin() {
		return this.productClassifyPinyin;
	}
	
	/**
	 * Set the productClassifyPinyin
	 */	
	public void setProductClassifyPinyin(String aValue) {
		this.productClassifyPinyin = aValue;
	}	

	/**
	 * 产品分类代码	 * @return String
	 * @hibernate.property column="PRODUCT_CLASSIFY_DISP_CODE" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getProductClassifyDispCode() {
		return this.productClassifyDispCode;
	}
	
	/**
	 * Set the productClassifyDispCode
	 */	
	public void setProductClassifyDispCode(String aValue) {
		this.productClassifyDispCode = aValue;
	}	

	/**
	 * 产品分类描述	 * @return String
	 * @hibernate.property column="PRODUCT_CLASSIFY_REMARKS" type="java.lang.String" length="600" not-null="false" unique="false"
	 */
	public String getProductClassifyRemarks() {
		return this.productClassifyRemarks;
	}
	
	/**
	 * Set the productClassifyRemarks
	 */	
	public void setProductClassifyRemarks(String aValue) {
		this.productClassifyRemarks = aValue;
	}	

	/**
	 * 产品型号标识0-配件，不带串号的商品，不可以单独跟踪，1-手机，带串号的商品，可以单独跟踪。&CON_T_PMODEL_FLAG	 * @return Short
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
	 * 父级产品分类内码	 * @return Long
	 * @hibernate.property column="MASTER_PRODUCT_CLASSIFY_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getMasterProductClassifyId() {
		return this.masterProductClassifyId;
	}
	
	/**
	 * Set the masterProductClassifyId
	 */	
	public void setMasterProductClassifyId(Long aValue) {
		this.masterProductClassifyId = aValue;
	}	

	/**
	 * PATH	 * @return String
	 * @hibernate.property column="PATH" type="java.lang.String" length="200" not-null="false" unique="false"
	 */
	public String getPath() {
		return this.path;
	}
	
	/**
	 * Set the path
	 */	
	public void setPath(String aValue) {
		this.path = aValue;
	}	

	public Short getStatus() {
		return status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
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
		if (!(object instanceof ScProductClassify)) {
			return false;
		}
		ScProductClassify rhs = (ScProductClassify) object;
		return new EqualsBuilder()
				.append(this.productClassifyId, rhs.productClassifyId)
				.append(this.productClassifyName, rhs.productClassifyName)
				.append(this.productClassifyPinyin, rhs.productClassifyPinyin)
				.append(this.productClassifyDispCode, rhs.productClassifyDispCode)
				.append(this.productClassifyRemarks, rhs.productClassifyRemarks)
				.append(this.productModelFlag, rhs.productModelFlag)
				.append(this.masterProductClassifyId, rhs.masterProductClassifyId)
				.append(this.path, rhs.path)
				.append(this.createUserId, rhs.createUserId)
				.append(this.createTime, rhs.createTime)
				.append(this.updateUserId, rhs.updateUserId)
				.append(this.updateTime, rhs.updateTime)
				.append(this.desc, rhs.desc)
				.append(this.status, rhs.status)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.productClassifyId) 
				.append(this.productClassifyName) 
				.append(this.productClassifyPinyin) 
				.append(this.productClassifyDispCode) 
				.append(this.productClassifyRemarks) 
				.append(this.productModelFlag) 
				.append(this.masterProductClassifyId) 
				.append(this.path) 
				.append(this.createUserId) 
				.append(this.createTime) 
				.append(this.updateUserId) 
				.append(this.updateTime) 
				.append(this.desc) 
				.append(this.status) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("productClassifyId", this.productClassifyId) 
				.append("productClassifyName", this.productClassifyName) 
				.append("productClassifyPinyin", this.productClassifyPinyin) 
				.append("productClassifyDispCode", this.productClassifyDispCode) 
				.append("productClassifyRemarks", this.productClassifyRemarks) 
				.append("productModelFlag", this.productModelFlag) 
				.append("masterProductClassifyId", this.masterProductClassifyId) 
				.append("path", this.path) 
				.append("createUserId", this.createUserId) 
				.append("createTime", this.createTime) 
				.append("updateUserId", this.updateUserId) 
				.append("updateTime", this.updateTime) 
				.append("desc", this.desc) 
				.append("status", this.status) 
				.toString();
	}



}
