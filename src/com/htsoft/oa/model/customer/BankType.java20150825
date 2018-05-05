package com.htsoft.oa.model.customer;
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
@SuppressWarnings("serial")
public class BankType extends com.htsoft.core.model.BaseModel {
    protected Long bankTypeId;//编号
	protected String bankname;//名称
	protected Long parentId;//上级部门id
	protected String  branchId;// 网点号
	protected String path;//
	protected Integer bankTypeStatus;//状态
	protected Long createBy;//创建人
	//protected Long updateBy;
	//protected java.sql.Timestamp createDate;
	protected java.util.Date createDate;//创建时间
	protected java.util.Date updateDate;//修改时间
	protected String parentName; 	//父节点名称     --临时字段
	//考虑周需加入的字段
	
	protected Long rootid;//本部门id
	protected Long childrenid;//下级部门id
	//关联设备关联新增字段
	
	//protected  String  equipmentId;// 机具号
	//protected  String   branchId;//网点号
	//protected  String   operatorId;//柜员号
	
	
	
	
	//protected Long id;//id
	/**
	 * Default Empty Constructor for class UkKnowType
	 */
	public BankType () {
		super();
		new CusPersonalEven();
	}
	
	/**
	 * Default Key Fields Constructor for class UkKnowType
	 */
	public BankType (
		 Long in_bankTypeId
        ) {
		this.setBankTypeId(in_bankTypeId);
    }
	
	public Long getBankTypeId() {
		return this.bankTypeId;
	}

	public java.util.Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(java.util.Date updateDate) {
		this.updateDate = updateDate;
	}

	public Long getRootid() {
		return rootid;
	}

	public void setRootid(Long rootid) {
		this.rootid = rootid;
	}

	public Long getChildrenid() {
		return childrenid;
	}

	public void setChildrenid(Long childrenid) {
		this.childrenid = childrenid;
	}

	public void setBankTypeId(Long bankTypeId) {
		this.bankTypeId = bankTypeId;
	}

	public String getBankname() {
		return bankname;
	}

	public void setBankname(String bankname) {
		this.bankname = bankname;
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


	public String getBranchId() {
		return branchId;
	}

	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}

	public String getPath() {
		return this.path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Integer getBankTypeStatus() {
		return this.bankTypeStatus;
	}

	public void setBankTypeStatus(Integer bankTypeStatus) {
		this.bankTypeStatus = bankTypeStatus;
	}

	/**
	 * 创建人姓名	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getCreateBy() {
		return this.createBy;
	}
	


	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
	}

	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}

	//	/**
//	 * Set the createBy
//	 */	
//	public void setCreateBy(Long aValue) {
//		this.createBy = aValue;
//	}	
//
//	/**
//	 * 创建时间	 * @return java.sql.Timestamp
//	 * @hibernate.property column="CREATE_DATE" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
//	 */
//	public java.sql.Timestamp getCreateDate() {
//		return this.createDate;
//	}
//	
	/**
	 * Set the createDate
	 */	
//	public void setCreateDate(java.sql.Timestamp aValue) {
//		this.createDate = aValue;
//	}	
	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BankType)) {
			return false;
		}
		BankType rhs = (BankType) object;
		return new EqualsBuilder()
				.append(this.bankTypeId, rhs.bankTypeId)
						.append(this.bankname, rhs.bankname)
				
				.append(this.parentId, rhs.parentId)
				.append(this.branchId, rhs.branchId)
				.append(this.path, rhs.path)
				.append(this.bankTypeStatus, rhs.bankTypeStatus)
				
				.append(this.createBy, rhs.createBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.rootid, rhs.rootid)
				.append(this.childrenid, rhs.childrenid)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bankTypeId) 
						.append(this.bankname) 
				 
				.append(this.parentId) 
				.append(this.branchId) 
				.append(this.path) 
				.append(this.bankTypeStatus) 
				
				.append(this.createBy) 
				
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.rootid) 
				.append(this.childrenid) 
				
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bankTypeId", this.bankTypeId) 
						.append("bankname", this.bankname) 
				.append("parentId", this.parentId) 
				.append("branchId", this.branchId) 
				.append("userid", this.path) 
				.append("bankTypeStatus", this.bankTypeStatus) 
				.append("createBy", this.createBy) 	
				.append("createDate", this.createDate) 	
				.append("updateDate", this.updateDate) 	
				.append("rootid", this.rootid) 	
				.append("childrenid", this.childrenid) 	
				.toString();
	}



}
