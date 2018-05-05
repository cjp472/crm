package com.ulane.base.model.xitong;

import java.io.Serializable;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
/**
 * UlContactEmpl Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlContactDep extends com.htsoft.core.model.BaseModel  implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -5551208818808735433L;
	protected Long contactEmplId;
//	protected Long depid;
    protected UlDepartment ulDepartment; 					//一对多  声明对象
	protected Long contactType;
	protected String contactValue;
    protected Short delFlag;
    
	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}

	/**
	 * Default Empty Constructor for class UlContactEmpl
	 */
	public UlContactDep () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UlContactEmpl
	 */
	public UlContactDep (
		 Long in_contactEmplId
        ) {
		this.setContactEmplId(in_contactEmplId);
    }

    

	public UlDepartment getUlDepartment() {
		return ulDepartment;
	}

	public void setUlDepartment(UlDepartment ulDepartment) {
		this.ulDepartment = ulDepartment;
	}

	/**
	 * 联系方式内码	 * @return Long
     * @hibernate.id column="CONTACT_EMPL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getContactEmplId() {
		return this.contactEmplId;
	}
	
	/**
	 * Set the contactEmplId
	 */	
	public void setContactEmplId(Long aValue) {
		this.contactEmplId = aValue;
	}	

	/**
	 * 联系方式类型	 * @return Long
	 * @hibernate.property column="CONTACT_TYPE" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getContactType() {
		return this.contactType;
	}
	
	/**
	 * Set the contactType
	 */	
	public void setContactType(Long aValue) {
		this.contactType = aValue;
	}	

	/**
	 * 联系方式值	 * @return String
	 * @hibernate.property column="CONTACT_VALUE" type="java.lang.String" length="200" not-null="false" unique="false"
	 */
	public String getContactValue() {
		return this.contactValue;
	}
	
	/**
	 * Set the contactValue
	 */	
	public void setContactValue(String aValue) {
		this.contactValue = aValue;
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UlContactDep other = (UlContactDep) obj;
		if (contactEmplId == null) {
			if (other.contactEmplId != null)
				return false;
		} else if (!contactEmplId.equals(other.contactEmplId))
			return false;
		if (contactType == null) {
			if (other.contactType != null)
				return false;
		} else if (!contactType.equals(other.contactType))
			return false;
		if (contactValue == null) {
			if (other.contactValue != null)
				return false;
		} else if (!contactValue.equals(other.contactValue))
			return false;
		if (delFlag == null) {
			if (other.delFlag != null)
				return false;
		} else if (!delFlag.equals(other.delFlag))
			return false;
		if (ulDepartment == null) {
			if (other.ulDepartment != null)
				return false;
		} else if (!ulDepartment.equals(other.ulDepartment))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((contactEmplId == null) ? 0 : contactEmplId.hashCode());
		result = prime * result
				+ ((contactType == null) ? 0 : contactType.hashCode());
		result = prime * result
				+ ((contactValue == null) ? 0 : contactValue.hashCode());
		result = prime * result + ((delFlag == null) ? 0 : delFlag.hashCode());
		result = prime * result
				+ ((ulDepartment == null) ? 0 : ulDepartment.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UlContactDep [contactEmplId=" + contactEmplId
				+ ", contactType=" + contactType + ", contactValue="
				+ contactValue + ", delFlag=" + delFlag + ", ulDepartment="
				+ ulDepartment + "]";
	}



}
