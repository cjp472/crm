package com.ulane.know.model.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.system.AppUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UkKnowDimensionality Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UkKnowDimensionality extends com.htsoft.core.model.BaseModel {

    protected Long dimensionalityId;
	protected String classifyName;
	protected Long parentId;
	protected String describe;
	protected Long bussinessType;
	protected Long visitManage;
	protected String visitRole;
	protected Long isDelete;//UG001 ： 0=未启用，1=启用
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected AppUser createBy;
	protected AppUser updateBy;
	protected Long category;

	protected java.util.Set ukDimensionalityKnows = new java.util.HashSet();
	
	public static final short UNQIYONG = 0;//表示未启用状态
	public static final short QIYONG = 1;//表示启用状态
	public static final short CLOSE = 2;//表示关闭状态

	/**
	 * Default Empty Constructor for class UkKnowDimensionality
	 */
	public UkKnowDimensionality () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UkKnowDimensionality
	 */
	public UkKnowDimensionality (
		 Long in_dimensionalityId
        ) {
		this.setDimensionalityId(in_dimensionalityId);
    }


	public java.util.Set getUkDimensionalityKnows () {
		return ukDimensionalityKnows;
	}	
	
	public void setUkDimensionalityKnows (java.util.Set in_ukDimensionalityKnows) {
		this.ukDimensionalityKnows = in_ukDimensionalityKnows;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="DIMENSIONALITY_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getDimensionalityId() {
		return this.dimensionalityId;
	}
	
	/**
	 * Set the dimensionalityId
	 */	
	public void setDimensionalityId(Long aValue) {
		this.dimensionalityId = aValue;
	}	

	/**
	 * 维度名称	 * @return String
	 * @hibernate.property column="CLASSIFY_NAME" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getClassifyName() {
		return this.classifyName;
	}
	
	/**
	 * Set the classifyName
	 */	
	public void setClassifyName(String aValue) {
		this.classifyName = aValue;
	}	

	/**
	 * 上级分类	 * @return Long
	 * @hibernate.property column="PARENT_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getParentId() {
		return this.parentId;
	}
	
	/**
	 * Set the parentId
	 */	
	public void setParentId(Long aValue) {
		this.parentId = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="DESCRIBE" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getDescribe() {
		return this.describe;
	}
	
	/**
	 * Set the describe
	 */	
	public void setDescribe(String aValue) {
		this.describe = aValue;
	}	

	/**
	 * 业务类型	 * @return Long
	 * @hibernate.property column="BUSSINESS_TYPE" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getBussinessType() {
		return this.bussinessType;
	}
	
	/**
	 * Set the bussinessType
	 */	
	public void setBussinessType(Long aValue) {
		this.bussinessType = aValue;
	}	

	/**
	 * 访问管理	 * @return Long
	 * @hibernate.property column="VISIT_MANAGE" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getVisitManage() {
		return this.visitManage;
	}
	
	/**
	 * Set the visitManage
	 */	
	public void setVisitManage(Long aValue) {
		this.visitManage = aValue;
	}	

	/**
	 * 访问授权	 * @return String
	 * @hibernate.property column="VISIT_ROLE" type="java.lang.String" length="200" not-null="false" unique="false"
	 */
	public String getVisitRole() {
		return this.visitRole;
	}
	
	/**
	 * Set the visitRole
	 */	
	public void setVisitRole(String aValue) {
		this.visitRole = aValue;
	}	

	/**
	 * 删除标示	 * @return Long
	 * @hibernate.property column="IS_DELETE" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsDelete() {
		return this.isDelete;
	}
	
	/**
	 * Set the isDelete
	 */	
	public void setIsDelete(Long aValue) {
		this.isDelete = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 */	
	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateDate() {
		return this.updateDate;
	}
	
	/**
	 * Set the updateDate
	 */	
	public void setUpdateDate(java.util.Date aValue) {
		this.updateDate = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public AppUser getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(AppUser aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public AppUser getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(AppUser aValue) {
		this.updateBy = aValue;
	}	

	/**
	 * 类别	 * @return Long
	 * @hibernate.property column="CATEGORY" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getCategory() {
		return this.category;
	}
	
	/**
	 * Set the category
	 */	
	public void setCategory(Long aValue) {
		this.category = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkKnowDimensionality)) {
			return false;
		}
		UkKnowDimensionality rhs = (UkKnowDimensionality) object;
		return new EqualsBuilder()
				.append(this.dimensionalityId, rhs.dimensionalityId)
				.append(this.classifyName, rhs.classifyName)
				.append(this.parentId, rhs.parentId)
				.append(this.describe, rhs.describe)
				.append(this.bussinessType, rhs.bussinessType)
				.append(this.visitManage, rhs.visitManage)
				.append(this.visitRole, rhs.visitRole)
				.append(this.isDelete, rhs.isDelete)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.category, rhs.category)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.dimensionalityId) 
				.append(this.classifyName) 
				.append(this.parentId) 
				.append(this.describe) 
				.append(this.bussinessType) 
				.append(this.visitManage) 
				.append(this.visitRole) 
				.append(this.isDelete) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.category) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("dimensionalityId", this.dimensionalityId) 
				.append("classifyName", this.classifyName) 
				.append("parentId", this.parentId) 
				.append("describe", this.describe) 
				.append("bussinessType", this.bussinessType) 
				.append("visitManage", this.visitManage) 
				.append("visitRole", this.visitRole) 
				.append("isDelete", this.isDelete) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("category", this.category) 
				.toString();
	}



}
