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
 * UnimAssets Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAssets extends com.htsoft.core.model.BaseModel {

    protected Long assetsId;
	protected String assetsName;
	protected String assetsCode;
	protected Long depId;
	protected Long perincharId;
	protected String assDesc;
	protected String remark;
	protected Short status;
	public com.ulane.monitor.model.unim.UnimAssCategory unimAssCategory;
	public com.ulane.monitor.model.unim.UnimAssType unimAssType;
	
	protected String perName;
	protected String depName;
	protected String catName;
	protected String typName;
	
	protected java.util.Set unimAssetsTargets = new java.util.HashSet();
	protected java.util.Set unimAssTarPars = new java.util.HashSet();
	protected java.util.Set unimAssTarThrlevls = new java.util.HashSet();
	
	public static final Short STA_UNENABLE 	= 0;		//0——未启用&ZZJGZT0001
	public static final Short STA_ENABLE 	= 1;		//1——启用&ZZJGZT0001
	public static final Short STA_CANCELED	= 2;		//2——注销&ZZJGZT0001
	
	/**
	 * Default Empty Constructor for class UnimAssets
	 */
	public UnimAssets () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAssets
	 */
	public UnimAssets (
		 Long in_assetsId
        ) {
		this.setAssetsId(in_assetsId);
    }

	
	public com.ulane.monitor.model.unim.UnimAssCategory getUnimAssCategory () {
		return unimAssCategory;
	}	
	
	public void setUnimAssCategory (com.ulane.monitor.model.unim.UnimAssCategory in_unimAssCategory) {
		this.unimAssCategory = in_unimAssCategory;
	}
	
	public com.ulane.monitor.model.unim.UnimAssType getUnimAssType () {
		return unimAssType;
	}	
	
	public void setUnimAssType (com.ulane.monitor.model.unim.UnimAssType in_unimAssType) {
		this.unimAssType = in_unimAssType;
	}

	public java.util.Set getUnimAssetsTargets () {
		return unimAssetsTargets;
	}	
	
	public void setUnimAssetsTargets (java.util.Set in_unimAssetsTargets) {
		this.unimAssetsTargets = in_unimAssetsTargets;
	}

	public java.util.Set getUnimAssTarPars () {
		return unimAssTarPars;
	}	
	
	public void setUnimAssTarPars (java.util.Set in_unimAssTarPars) {
		this.unimAssTarPars = in_unimAssTarPars;
	}

	public java.util.Set getUnimAssTarThrlevls () {
		return unimAssTarThrlevls;
	}	
	
	public void setUnimAssTarThrlevls (java.util.Set in_unimAssTarThrlevls) {
		this.unimAssTarThrlevls = in_unimAssTarThrlevls;
	}
    

	/**
	 * 资产ID	 * @return Long
     * @hibernate.id column="ASSETS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getAssetsId() {
		return this.assetsId;
	}
	
	/**
	 * Set the assetsId
	 */	
	public void setAssetsId(Long aValue) {
		this.assetsId = aValue;
	}	

	/**
	 * 资产名称	 * @return String
	 * @hibernate.property column="ASSETS_NAME" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getAssetsName() {
		return this.assetsName;
	}
	
	/**
	 * Set the assetsName
	 * @spring.validator type="required"
	 */	
	public void setAssetsName(String aValue) {
		this.assetsName = aValue;
	}	

	/**
	 * 资产编号	 * @return String
	 * @hibernate.property column="ASSETS_CODE" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getAssetsCode() {
		return this.assetsCode;
	}
	
	/**
	 * Set the assetsCode
	 * @spring.validator type="required"
	 */	
	public void setAssetsCode(String aValue) {
		this.assetsCode = aValue;
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
	 * 资产类别ID	 * @return Long
	 */
	public Long getTypeId() {
		return this.getUnimAssType()==null?null:this.getUnimAssType().getTypeId();
	}
	
	/**
	 * Set the typeId
	 */	
	public void setTypeId(Long aValue) {
	    if (aValue==null) {
	    	unimAssType = null;
	    } else if (unimAssType == null) {
	        unimAssType = new com.ulane.monitor.model.unim.UnimAssType(aValue);
	        unimAssType.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimAssType.setTypeId(aValue);
	    }
	}	

	/**
	 * 部门ID	 * @return Long
	 * @hibernate.property column="DEP_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getDepId() {
		return this.depId;
	}
	
	/**
	 * Set the depId
	 */	
	public void setDepId(Long aValue) {
		this.depId = aValue;
	}	

	/**
	 * 负责人ID	 * @return Long
	 * @hibernate.property column="PERINCHAR_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getPerincharId() {
		return this.perincharId;
	}
	
	/**
	 * Set the perincharId
	 */	
	public void setPerincharId(Long aValue) {
		this.perincharId = aValue;
	}	

	public String getAssDesc() {
		return assDesc;
	}

	public void setAssDesc(String assDesc) {
		this.assDesc = assDesc;
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
	 * 状态：未启用、启用、注销	 * @return Short
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

	public String getPerName() {
		return perName;
	}

	public void setPerName(String perName) {
		this.perName = perName;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public String getTypName() {
		return typName;
	}

	public void setTypName(String typName) {
		this.typName = typName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimAssets)) {
			return false;
		}
		UnimAssets rhs = (UnimAssets) object;
		return new EqualsBuilder()
				.append(this.assetsId, rhs.assetsId)
				.append(this.assetsName, rhs.assetsName)
				.append(this.assetsCode, rhs.assetsCode)
								.append(this.depId, rhs.depId)
				.append(this.perincharId, rhs.perincharId)
				.append(this.assDesc, rhs.assDesc)
				.append(this.remark, rhs.remark)
				.append(this.status, rhs.status)
				.append(this.depName, rhs.depName)
				.append(this.perName, rhs.perName)
				.append(this.catName, rhs.catName)
				.append(this.typName, rhs.typName)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.assetsId) 
				.append(this.assetsName) 
				.append(this.assetsCode) 
								.append(this.depId) 
				.append(this.perincharId) 
				.append(this.assDesc) 
				.append(this.remark) 
				.append(this.status)
				.append(this.depName)
				.append(this.perName)
				.append(this.catName)
				.append(this.typName)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("assetsId", this.assetsId) 
				.append("assetsName", this.assetsName) 
				.append("assetsCode", this.assetsCode) 
								.append("depId", this.depId) 
				.append("perincharId", this.perincharId) 
				.append("assDesc", this.assDesc) 
				.append("remark", this.remark) 
				.append("status", this.status)
				.append("depName",this.depName)
				.append("perName",this.perName)
				.append("catName",this.catName)
				.append("typName",this.typName)
				.toString();
	}



}
