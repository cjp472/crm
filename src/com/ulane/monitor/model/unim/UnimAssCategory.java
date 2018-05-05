package com.ulane.monitor.model.unim;
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
 * UnimAssCategory Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAssCategory extends com.htsoft.core.model.BaseModel {

    protected Long catId;
	protected String catName;
	protected String catCode;
	protected String remark;
	protected Long orderno;
	protected Short status;

	protected java.util.Set unimAssetss = new java.util.HashSet();
	protected java.util.Set unimAssStatuss = new java.util.HashSet();
	protected java.util.Set unimAssTypes = new java.util.HashSet();

	public static final Short UNIM_ASS_STATUS_YYOUXIAO = 1;	//有效
	public static final Short UNIM_ASS_STATUS_ZHUXIAO = 2;	//有效
	//处理字段
	protected String ziChanLx;
	public String getZiChanLx() {
		return ziChanLx;
	}

	public void setZiChanLx(String ziChanLx) {
		this.ziChanLx = ziChanLx;
	}

	/**
	 * Default Empty Constructor for class UnimAssCategory
	 */
	public UnimAssCategory () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAssCategory
	 */
	public UnimAssCategory (
		 Long in_catId
        ) {
		this.setCatId(in_catId);
    }


	public java.util.Set getUnimAssetss () {
		return unimAssetss;
	}	
	
	public void setUnimAssetss (java.util.Set in_unimAssetss) {
		this.unimAssetss = in_unimAssetss;
	}

	public java.util.Set getUnimAssStatuss () {
		return unimAssStatuss;
	}	
	
	public void setUnimAssStatuss (java.util.Set in_unimAssStatuss) {
		this.unimAssStatuss = in_unimAssStatuss;
	}

	public java.util.Set getUnimAssTypes () {
		return unimAssTypes;
	}	
	
	public void setUnimAssTypes (java.util.Set in_unimAssTypes) {
		this.unimAssTypes = in_unimAssTypes;
	}
    

	/**
	 * 资产类型ID	 * @return Long
     * @hibernate.id column="CAT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getCatId() {
		return this.catId;
	}
	
	/**
	 * Set the catId
	 */	
	public void setCatId(Long aValue) {
		this.catId = aValue;
	}	

	/**
	 * 资产类型名称	 * @return String
	 * @hibernate.property column="CAT_NAME" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getCatName() {
		return this.catName;
	}
	
	/**
	 * Set the catName
	 * @spring.validator type="required"
	 */	
	public void setCatName(String aValue) {
		this.catName = aValue;
	}	

	/**
	 * 资产类型编号	 * @return String
	 * @hibernate.property column="CAT_CODE" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getCatCode() {
		return this.catCode;
	}
	
	/**
	 * Set the catCode
	 * @spring.validator type="required"
	 */	
	public void setCatCode(String aValue) {
		this.catCode = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="4000" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	/**
	 * 顺序号	 * @return Long
	 * @hibernate.property column="ORDERNO" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getOrderno() {
		return this.orderno;
	}
	
	/**
	 * Set the orderno
	 * @spring.validator type="required"
	 */	
	public void setOrderno(Long aValue) {
		this.orderno = aValue;
	}	

	/**
	 * 状态：启用、注销	 * @return Short
	 * @hibernate.property column="STATUS" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 * @spring.validator type="required"
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimAssCategory)) {
			return false;
		}
		UnimAssCategory rhs = (UnimAssCategory) object;
		return new EqualsBuilder()
				.append(this.catId, rhs.catId)
				.append(this.catName, rhs.catName)
				.append(this.catCode, rhs.catCode)
				.append(this.remark, rhs.remark)
				.append(this.orderno, rhs.orderno)
				.append(this.status, rhs.status)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.catId) 
				.append(this.catName) 
				.append(this.catCode) 
				.append(this.remark) 
				.append(this.orderno) 
				.append(this.status) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("catId", this.catId) 
				.append("catName", this.catName) 
				.append("catCode", this.catCode) 
				.append("remark", this.remark) 
				.append("orderno", this.orderno) 
				.append("status", this.status) 
				.toString();
	}



}
