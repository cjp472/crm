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
 * SysTemType Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class SysTemType extends com.htsoft.core.model.BaseModel {

    protected Long tmpTypeId;
	protected String tmpTypeName;
	protected String comMent;
	protected Long parentId;
	protected java.util.Date updateTime;
	protected Integer ukTmpTypeStatus;				//0:有效 1:无效
	protected Integer kukTmpTypeSort;
	protected Long createBy;
	protected Long updateBy;
	protected java.sql.Timestamp createDate;
	protected java.sql.Timestamp updateDate;
	protected String path;
	
	/**
	 * 新增字段
	 */
	protected String key;						//key值 用来根据这个值创建目录


	/**
	 * Default Empty Constructor for class SysTemType
	 */
	public SysTemType () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class SysTemType
	 */
	public SysTemType (
		 Long in_tmpTypeId
        ) {
		this.setTmpTypeId(in_tmpTypeId);
    }

    

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	/**
	 * 知识分类内码	 * @return Long
     * @hibernate.id column="TMP_TYPE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTmpTypeId() {
		return this.tmpTypeId;
	}
	
	/**
	 * Set the tmpTypeId
	 */	
	public void setTmpTypeId(Long aValue) {
		this.tmpTypeId = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="TMP_TYPE_NAME" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getTmpTypeName() {
		return this.tmpTypeName;
	}
	
	/**
	 * Set the tmpTypeName
	 */	
	public void setTmpTypeName(String aValue) {
		this.tmpTypeName = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="COM_MENT" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getComMent() {
		return this.comMent;
	}
	
	/**
	 * Set the comMent
	 */	
	public void setComMent(String aValue) {
		this.comMent = aValue;
	}	

	/**
	 * 父模板分类对象	 * @return Long
	 * @hibernate.property column="PARENT_ID" type="java.lang.Long" length="38" not-null="false" unique="false"
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
	 * 更新时间	 * @return java.util.Date
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
	 * 状态&UK_TMP_TYPE_STATUS	 * @return Integer
	 * @hibernate.property column="UK_TMP_TYPE_STATUS" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getUkTmpTypeStatus() {
		return this.ukTmpTypeStatus;
	}
	
	/**
	 * Set the ukTmpTypeStatus
	 */	
	public void setUkTmpTypeStatus(Integer aValue) {
		this.ukTmpTypeStatus = aValue;
	}	

	/**
	 * 顺序	 * @return Integer
	 * @hibernate.property column="KUK_TMP_TYPE_SORT" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getKukTmpTypeSort() {
		return this.kukTmpTypeSort;
	}
	
	/**
	 * Set the kukTmpTypeSort
	 */	
	public void setKukTmpTypeSort(Integer aValue) {
		this.kukTmpTypeSort = aValue;
	}	

	/**
	 * 创建人姓名	 * @return Long
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
	 * 创建时间	 * @return java.sql.Timestamp
	 * @hibernate.property column="CREATE_DATE" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 */	
	public void setCreateDate(java.sql.Timestamp aValue) {
		this.createDate = aValue;
	}	

	/**
	 * 修改时间	 * @return java.sql.Timestamp
	 * @hibernate.property column="UPDATE_DATE" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getUpdateDate() {
		return this.updateDate;
	}
	
	/**
	 * Set the updateDate
	 */	
	public void setUpdateDate(java.sql.Timestamp aValue) {
		this.updateDate = aValue;
	}	

	/**
	 * 路径	 * @return String
	 * @hibernate.property column="PATH" type="java.lang.String" length="100" not-null="false" unique="false"
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

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof SysTemType)) {
			return false;
		}
		SysTemType rhs = (SysTemType) object;
		return new EqualsBuilder()
				.append(this.tmpTypeId, rhs.tmpTypeId)
				.append(this.tmpTypeName, rhs.tmpTypeName)
				.append(this.comMent, rhs.comMent)
				.append(this.parentId, rhs.parentId)
				.append(this.updateTime, rhs.updateTime)
				.append(this.ukTmpTypeStatus, rhs.ukTmpTypeStatus)
				.append(this.kukTmpTypeSort, rhs.kukTmpTypeSort)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.path, rhs.path)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.tmpTypeId) 
				.append(this.tmpTypeName) 
				.append(this.comMent) 
				.append(this.parentId) 
				.append(this.updateTime) 
				.append(this.ukTmpTypeStatus) 
				.append(this.kukTmpTypeSort) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.path) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("tmpTypeId", this.tmpTypeId) 
				.append("tmpTypeName", this.tmpTypeName) 
				.append("comMent", this.comMent) 
				.append("parentId", this.parentId) 
				.append("updateTime", this.updateTime) 
				.append("ukTmpTypeStatus", this.ukTmpTypeStatus) 
				.append("kukTmpTypeSort", this.kukTmpTypeSort) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("path", this.path) 
				.toString();
	}



}
