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
 * UlContactEmpl Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlContactEmpl extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = 970086544338247038L;
	protected Long contactEmplId;
//	protected Long useid;
	protected Long contactType;
	protected String contactValue;
    protected Short delFlag;
    protected UlEmployee ulEmployee; 					//一对多  声明对象
    
	public UlEmployee getUlEmployee() {
		return ulEmployee;
	}

	public void setUlEmployee(UlEmployee ulEmployee) {
		this.ulEmployee = ulEmployee;
	}

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}

	/**
	 * Default Empty Constructor for class UlContactEmpl
	 */
	public UlContactEmpl () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UlContactEmpl
	 */
	public UlContactEmpl (
		 Long in_contactEmplId
        ) {
		this.setContactEmplId(in_contactEmplId);
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

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UlContactEmpl)) {
			return false;
		}
		UlContactEmpl rhs = (UlContactEmpl) object;
		return new EqualsBuilder()
				.append(this.contactEmplId, rhs.contactEmplId)
				.append(this.contactType, rhs.contactType)
				.append(this.contactValue, rhs.contactValue)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.contactEmplId) 
				.append(this.contactType) 
				.append(this.contactValue) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("contactEmplId", this.contactEmplId) 
				.append("contactType", this.contactType) 
				.append("contactValue", this.contactValue) 
				.toString();
	}



}
