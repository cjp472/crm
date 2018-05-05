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
 * BeanObjectColumns Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class BeanObjectColumns extends com.htsoft.core.model.BaseModel {

    protected Long beanObjectColumnsId;
	protected String beanObjectColumns;
	protected String beanObjectColumnsName;
	protected String beanObjectColumnsTame;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String comment;
	protected Long isExt;
	protected Long columnType;
	protected com.ulane.base.model.xitong.BeanObject beanObject;


	/**
	 * Default Empty Constructor for class BeanObjectColumns
	 */
	public BeanObjectColumns () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BeanObjectColumns
	 */
	public BeanObjectColumns (
		 Long in_beanObjectColumnsId
        ) {
		this.setBeanObjectColumnsId(in_beanObjectColumnsId);
    }

	
	public com.ulane.base.model.xitong.BeanObject getBeanObject () {
		return beanObject;
	}	
	
	public void setBeanObject (com.ulane.base.model.xitong.BeanObject in_beanObject) {
		this.beanObject = in_beanObject;
	}
    

	/**
	 * 数据实体参数内码	 * @return Long
     * @hibernate.id column="BEAN_OBJECT_COLUMNS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBeanObjectColumnsId() {
		return this.beanObjectColumnsId;
	}
	
	/**
	 * Set the beanObjectColumnsId
	 */	
	public void setBeanObjectColumnsId(Long aValue) {
		this.beanObjectColumnsId = aValue;
	}	

	/**
	 * 数据实体内码	 * @return Long
	 */
	public Long getBeanObjectId() {
		return this.getBeanObject()==null?null:this.getBeanObject().getBeanObjectId();
	}
	
	/**
	 * Set the beanObjectId
	 */	
	public void setBeanObjectId(Long aValue) {
	    if (aValue==null) {
	    	beanObject = null;
	    } else if (beanObject == null) {
	        beanObject = new com.ulane.base.model.xitong.BeanObject(aValue);
	        beanObject.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			beanObject.setBeanObjectId(aValue);
	    }
	}	

	/**
	 * 数据实体参数	 * @return String
	 * @hibernate.property column="BEAN_OBJECT_COLUMNS" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getBeanObjectColumns() {
		return this.beanObjectColumns;
	}
	
	/**
	 * Set the beanObjectColumns
	 */	
	public void setBeanObjectColumns(String aValue) {
		this.beanObjectColumns = aValue;
	}	

	/**
	 * 数据实体参数名	 * @return String
	 * @hibernate.property column="BEAN_OBJECT_COLUMNS_NAME" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getBeanObjectColumnsName() {
		return this.beanObjectColumnsName;
	}
	
	/**
	 * Set the beanObjectColumnsName
	 */	
	public void setBeanObjectColumnsName(String aValue) {
		this.beanObjectColumnsName = aValue;
	}	

	/**
	 * 数据实体参数字段名	 * @return String
	 * @hibernate.property column="BEAN_OBJECT_COLUMNS_TAME" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getBeanObjectColumnsTame() {
		return this.beanObjectColumnsTame;
	}
	
	/**
	 * Set the beanObjectColumnsTame
	 */	
	public void setBeanObjectColumnsTame(String aValue) {
		this.beanObjectColumnsTame = aValue;
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

	public Long getIsExt() {
		return isExt;
	}
	/**
	 * Set the isExt
	 */	
	public void setIsExt(Long isExt) {
		this.isExt = isExt;
	}

	public Long getColumnType() {
		return columnType;
	}
	/**
	 * Set the columnType
	 */	
	public void setColumnType(Long columnType) {
		this.columnType = columnType;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BeanObjectColumns)) {
			return false;
		}
		BeanObjectColumns rhs = (BeanObjectColumns) object;
		return new EqualsBuilder()
				.append(this.beanObjectColumnsId, rhs.beanObjectColumnsId)
						.append(this.beanObjectColumns, rhs.beanObjectColumns)
				.append(this.beanObjectColumnsName, rhs.beanObjectColumnsName)
				.append(this.beanObjectColumnsTame, rhs.beanObjectColumnsTame)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.comment, rhs.comment)
				.append(this.columnType, rhs.columnType)
				.append(this.isExt, rhs.isExt)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.beanObjectColumnsId) 
						.append(this.beanObjectColumns) 
				.append(this.beanObjectColumnsName) 
				.append(this.beanObjectColumnsTame) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.comment) 
				.append(this.columnType)
				.append(this.isExt)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("beanObjectColumnsId", this.beanObjectColumnsId) 
						.append("beanObjectColumns", this.beanObjectColumns) 
				.append("beanObjectColumnsName", this.beanObjectColumnsName) 
				.append("beanObjectColumnsTame", this.beanObjectColumnsTame) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("comment", this.comment) 
				.append("isExt",this.isExt)
				.append("columnType",this.columnType)
				.toString();
	}



}
