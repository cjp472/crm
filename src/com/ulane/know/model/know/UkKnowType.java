package com.ulane.know.model.know;
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

import com.ulane.customer.model.customer.CusPersonalEven;

/**
 * UkKnowType Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UkKnowType extends com.htsoft.core.model.BaseModel {

    protected Long knowTypeId;
//    protected Long knowTmpId;//添加的。和ukKnowTemplate映射一个数据字段
	protected String name;
	protected String comMent;
	protected Long parentId;
	protected java.util.Date updateTime;
	protected String path;
	protected Integer knowTypeStatus;
	protected Integer knowSort;
	protected Long createBy;
	protected Long updateBy;
	protected java.sql.Timestamp createDate;
	protected java.sql.Timestamp updateDate;
	protected com.ulane.know.model.know.UkKnowTemplate ukKnowTemplate;

	protected java.util.Set ukKnowDingyues = new java.util.HashSet();
	protected java.util.Set ukKnowKeywords = new java.util.HashSet();
	protected java.util.Set ukSysKnows = new java.util.HashSet();
	
	/**
	 * 新增字段
	 */
	protected Long grantAccess;		//GRANT_ACCESS 访问管理
	protected Long accessPurview;		//ACCESS_PURVIEW 访问权限
	protected java.util.Set ukKnowTypeRoles = new java.util.HashSet();

	protected String parentName; 	//父节点名称     --临时字段
	/**
	 * Default Empty Constructor for class UkKnowType
	 */
	public UkKnowType () {
		super();
		new CusPersonalEven();
	}
	
	/**
	 * Default Key Fields Constructor for class UkKnowType
	 */
	public UkKnowType (
		 Long in_knowTypeId
        ) {
		this.setKnowTypeId(in_knowTypeId);
    }

	
	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public com.ulane.know.model.know.UkKnowTemplate getUkKnowTemplate () {
		return ukKnowTemplate;
	}	
	
	public void setUkKnowTemplate (com.ulane.know.model.know.UkKnowTemplate in_ukKnowTemplate) {
		this.ukKnowTemplate = in_ukKnowTemplate;
	}

	public java.util.Set getUkKnowDingyues () {
		return ukKnowDingyues;
	}	
	
	public void setUkKnowDingyues (java.util.Set in_ukKnowDingyues) {
		this.ukKnowDingyues = in_ukKnowDingyues;
	}

	public java.util.Set getUkKnowKeywords () {
		return ukKnowKeywords;
	}	
	
	public void setUkKnowKeywords (java.util.Set in_ukKnowKeywords) {
		this.ukKnowKeywords = in_ukKnowKeywords;
	}

    public java.util.Set getUkSysKnows () {
        return ukSysKnows;
    }   
    
    public void setUkSysKnows (java.util.Set in_ukSysKnows) {
        this.ukSysKnows = in_ukSysKnows;
    }

	public java.util.Set getUkKnowTypeRoles() {
		return ukKnowTypeRoles;
	}

	public void setUkKnowTypeRoles(java.util.Set ukKnowTypeRoles) {
		this.ukKnowTypeRoles = ukKnowTypeRoles;
	}

	/**
	 * 知识分类内码	 * @return Long
     * @hibernate.id column="KNOW_TYPE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getKnowTypeId() {
		return this.knowTypeId;
	}
	
	/**
	 * Set the knowTypeId
	 */	
	public void setKnowTypeId(Long aValue) {
		this.knowTypeId = aValue;
	}	

	/**
	 * 知识模板编号	 * @return Long
	 */
	public Long getKnowTmpId() {
		return this.getUkKnowTemplate()==null?null:this.getUkKnowTemplate().getKnowTmpId();
//		return this.knowTmpId;
	}
	
	/**
	 * Set the knowTmpId
	 */	
	public void setKnowTmpId(Long aValue) {
	    if (aValue==null) {
	    	ukKnowTemplate = null;
	    } else if (ukKnowTemplate == null) {
	        ukKnowTemplate = new com.ulane.know.model.know.UkKnowTemplate(aValue);
	        ukKnowTemplate.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ukKnowTemplate.setKnowTmpId(aValue);
	    }
//		this.knowTmpId = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="NAME" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getName() {
		return this.name;
	}
	
	/**
	 * Set the name
	 */	
	public void setName(String aValue) {
		this.name = aValue;
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
	 * 父知识对象	 * @return Long
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
	 * 创建人	 * @return Long
	 * @hibernate.property column="USERID" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public String getPath() {
		return this.path;
	}
	
	/**
	 * Set the userid
	 */	
	public void setPath(String path) {
		this.path = path;
	}	

	/**
	 * 状态&KNOW_STATUS	 * @return Integer
	 * @hibernate.property column="KNOW_TYPE_STATUS" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getKnowTypeStatus() {
		return this.knowTypeStatus;
	}
	
	/**
	 * Set the knowTypeStatus
	 */	
	public void setKnowTypeStatus(Integer aValue) {
		this.knowTypeStatus = aValue;
	}	

	/**
	 * 顺序	 * @return Integer
	 * @hibernate.property column="KNOW_SORT" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getKnowSort() {
		return this.knowSort;
	}
	
	/**
	 * Set the knowSort
	 */	
	public void setKnowSort(Integer aValue) {
		this.knowSort = aValue;
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
	
	
	public Long getGrantAccess() {
		return grantAccess;
	}

	public void setGrantAccess(Long grantAccess) {
		this.grantAccess = grantAccess;
	}

	public Long getAccessPurview() {
		return accessPurview;
	}

	public void setAccessPurview(Long accessPurview) {
		this.accessPurview = accessPurview;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkKnowType)) {
			return false;
		}
		UkKnowType rhs = (UkKnowType) object;
		return new EqualsBuilder()
				.append(this.knowTypeId, rhs.knowTypeId)
						.append(this.name, rhs.name)
				.append(this.comMent, rhs.comMent)
				.append(this.parentId, rhs.parentId)
				.append(this.updateTime, rhs.updateTime)
				.append(this.path, rhs.path)
				.append(this.knowTypeStatus, rhs.knowTypeStatus)
				.append(this.knowSort, rhs.knowSort)
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
				.append(this.knowTypeId) 
						.append(this.name) 
				.append(this.comMent) 
				.append(this.parentId) 
				.append(this.updateTime) 
				.append(this.path) 
				.append(this.knowTypeStatus) 
				.append(this.knowSort) 
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
				.append("knowTypeId", this.knowTypeId) 
						.append("name", this.name) 
				.append("comMent", this.comMent) 
				.append("parentId", this.parentId) 
				.append("updateTime", this.updateTime) 
				.append("userid", this.path) 
				.append("knowTypeStatus", this.knowTypeStatus) 
				.append("knowSort", this.knowSort) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.toString();
	}



}
