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
 * UnimAssType Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAssType extends com.htsoft.core.model.BaseModel {

    protected Long typeId;
	protected String typeName;
	protected String typeCode;
	protected String extend1;
	protected String extend2;
	protected String extend3;
	protected String extend4;
	protected String remark;
	protected Short status;
	protected com.ulane.monitor.model.unim.UnimAssCategory unimAssCategory;

	protected java.util.Set unimAssetss = new java.util.HashSet();
	
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
	 * Default Empty Constructor for class UnimAssType
	 */
	public UnimAssType () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAssType
	 */
	public UnimAssType (
		 Long in_typeId
        ) {
		this.setTypeId(in_typeId);
    }

	
	public com.ulane.monitor.model.unim.UnimAssCategory getUnimAssCategory () {
		return unimAssCategory;
	}	
	
	public void setUnimAssCategory (com.ulane.monitor.model.unim.UnimAssCategory in_unimAssCategory) {
		this.unimAssCategory = in_unimAssCategory;
	}

	public java.util.Set getUnimAssetss () {
		return unimAssetss;
	}	
	
	public void setUnimAssetss (java.util.Set in_unimAssetss) {
		this.unimAssetss = in_unimAssetss;
	}
    

	/**
	 * 资产类别ID	 * @return Long
     * @hibernate.id column="TYPE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTypeId() {
		return this.typeId;
	}
	
	/**
	 * Set the typeId
	 */	
	public void setTypeId(Long aValue) {
		this.typeId = aValue;
	}	

	/**
	 * 资产类型ID	 * @return Long
	 */
	public Long getCatId() {
		return this.getUnimAssCategory()==null?null:this.getUnimAssCategory().getCatId();
	}
	
	/**
	 * Set the catId
	 */	
	public void setCatId(Long aValue) {
	    if (aValue==null) {
	    	unimAssCategory = null;
	    } else if (unimAssCategory == null) {
	        unimAssCategory = new com.ulane.monitor.model.unim.UnimAssCategory(aValue);
	        unimAssCategory.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimAssCategory.setCatId(aValue);
	    }
	}	

	/**
	 * 资产类别名称	 * @return String
	 * @hibernate.property column="TYPE_NAME" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getTypeName() {
		return this.typeName;
	}
	
	/**
	 * Set the typeName
	 * @spring.validator type="required"
	 */	
	public void setTypeName(String aValue) {
		this.typeName = aValue;
	}	

	/**
	 * 资产类别编号	 * @return String
	 * @hibernate.property column="TYPE_CODE" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getTypeCode() {
		return this.typeCode;
	}
	
	/**
	 * Set the typeCode
	 * @spring.validator type="required"
	 */	
	public void setTypeCode(String aValue) {
		this.typeCode = aValue;
	}	

	/**
	 * 扩展字段1（显示颜色1）	 * @return String
	 * @hibernate.property column="EXTEND1" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend1() {
		return this.extend1;
	}
	
	/**
	 * Set the extend1
	 */	
	public void setExtend1(String aValue) {
		this.extend1 = aValue;
	}	

	/**
	 * 扩展字段2	 * @return String
	 * @hibernate.property column="EXTEND2" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend2() {
		return this.extend2;
	}
	
	/**
	 * Set the extend2
	 */	
	public void setExtend2(String aValue) {
		this.extend2 = aValue;
	}	

	/**
	 * 扩展字段3	 * @return String
	 * @hibernate.property column="EXTEND3" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend3() {
		return this.extend3;
	}
	
	/**
	 * Set the extend3
	 */	
	public void setExtend3(String aValue) {
		this.extend3 = aValue;
	}	

	/**
	 * 扩展字段4	 * @return String
	 * @hibernate.property column="EXTEND4" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend4() {
		return this.extend4;
	}
	
	/**
	 * Set the extend4
	 */	
	public void setExtend4(String aValue) {
		this.extend4 = aValue;
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
		if (!(object instanceof UnimAssType)) {
			return false;
		}
		UnimAssType rhs = (UnimAssType) object;
		return new EqualsBuilder()
				.append(this.typeId, rhs.typeId)
						.append(this.typeName, rhs.typeName)
				.append(this.typeCode, rhs.typeCode)
				.append(this.extend1, rhs.extend1)
				.append(this.extend2, rhs.extend2)
				.append(this.extend3, rhs.extend3)
				.append(this.extend4, rhs.extend4)
				.append(this.remark, rhs.remark)
				.append(this.status, rhs.status)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.typeId) 
						.append(this.typeName) 
				.append(this.typeCode) 
				.append(this.extend1) 
				.append(this.extend2) 
				.append(this.extend3) 
				.append(this.extend4) 
				.append(this.remark) 
				.append(this.status) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("typeId", this.typeId) 
						.append("typeName", this.typeName) 
				.append("typeCode", this.typeCode) 
				.append("extend1", this.extend1) 
				.append("extend2", this.extend2) 
				.append("extend3", this.extend3) 
				.append("extend4", this.extend4) 
				.append("remark", this.remark) 
				.append("status", this.status) 
				.toString();
	}



}
