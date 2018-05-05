package com.ulane.base.model.xitong;
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
 * BeanObject Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class BeanObject extends com.htsoft.core.model.BaseModel {

    protected Long beanObjectId;
	protected String beanObjectName;
	protected String beanObjectName2;
	protected String beanObjectTname;
	protected String comment;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;

	protected java.util.Set beanObjectColumnss = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class BeanObject
	 */
	public BeanObject () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BeanObject
	 */
	public BeanObject (
		 Long in_beanObjectId
        ) {
		this.setBeanObjectId(in_beanObjectId);
    }


	public java.util.Set getBeanObjectColumnss () {
		return beanObjectColumnss;
	}	
	
	public void setBeanObjectColumnss (java.util.Set in_beanObjectColumnss) {
		this.beanObjectColumnss = in_beanObjectColumnss;
	}
    

	/**
	 * 数据实体内码	 * @return Long
     * @hibernate.id column="BEAN_OBJECT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBeanObjectId() {
		return this.beanObjectId;
	}
	
	/**
	 * Set the beanObjectId
	 */	
	public void setBeanObjectId(Long aValue) {
		this.beanObjectId = aValue;
	}	

	/**
	 * 数据实体名称	 * @return String
	 * @hibernate.property column="BEAN_OBJECT_NAME" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getBeanObjectName() {
		return this.beanObjectName;
	}
	
	/**
	 * Set the beanObjectName
	 */	
	public void setBeanObjectName(String aValue) {
		this.beanObjectName = aValue;
	}	

	/**
	 * 数据实体	 * @return String
	 * @hibernate.property column="BEAN_OBJECT_NAME2" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getBeanObjectName2() {
		return this.beanObjectName2;
	}
	
	/**
	 * Set the beanObjectName2
	 */	
	public void setBeanObjectName2(String aValue) {
		this.beanObjectName2 = aValue;
	}	

	/**
	 * 数据实体表名	 * @return String
	 * @hibernate.property column="BEAN_OBJECT_TNAME" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getBeanObjectTname() {
		return this.beanObjectTname;
	}
	
	/**
	 * Set the beanObjectTname
	 */	
	public void setBeanObjectTname(String aValue) {
		this.beanObjectTname = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="COMMENT" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComment() {
		return this.comment;
	}
	
	/**
	 * Set the comment
	 */	
	public void setComment(String aValue) {
		this.comment = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(Long aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(Long aValue) {
		this.updateBy = aValue;
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BeanObject)) {
			return false;
		}
		BeanObject rhs = (BeanObject) object;
		return new EqualsBuilder()
				.append(this.beanObjectId, rhs.beanObjectId)
				.append(this.beanObjectName, rhs.beanObjectName)
				.append(this.beanObjectName2, rhs.beanObjectName2)
				.append(this.beanObjectTname, rhs.beanObjectTname)
				.append(this.comment, rhs.comment)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.beanObjectId) 
				.append(this.beanObjectName) 
				.append(this.beanObjectName2) 
				.append(this.beanObjectTname) 
				.append(this.comment) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("beanObjectId", this.beanObjectId) 
				.append("beanObjectName", this.beanObjectName) 
				.append("beanObjectName2", this.beanObjectName2) 
				.append("beanObjectTname", this.beanObjectTname) 
				.append("comment", this.comment) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.toString();
	}



}
