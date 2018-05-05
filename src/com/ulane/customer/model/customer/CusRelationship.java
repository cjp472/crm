package com.ulane.customer.model.customer;
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
 * CusRelationship Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CusRelationship extends com.htsoft.core.model.BaseModel {

    protected Long relationshipId;
	protected com.htsoft.oa.model.customer.Customer cusCustomer;
	protected java.util.Date creDat;
	protected Short relationshipType;
	protected Long creUseId;
	protected com.htsoft.oa.model.customer.Customer customer;


	/**
	 * Default Empty Constructor for class CusRelationship
	 */
	public CusRelationship () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CusRelationship
	 */
	public CusRelationship (
		 Long in_relationshipId
        ) {
		this.setRelationshipId(in_relationshipId);
    }

	
	public com.htsoft.oa.model.customer.Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
		this.customer = in_customer;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="RELATIONSHIP_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getRelationshipId() {
		return this.relationshipId;
	}
	
	/**
	 * Set the relationshipId
	 */	
	public void setRelationshipId(Long aValue) {
		this.relationshipId = aValue;
	}	

	/**
	 * 推荐客户	 * @return Long
	 */
	public Long getCustomerid() {
		return this.getCustomer()==null?null:this.getCustomer().getCustomerId();
	}
	
	/**
	 * Set the customerid
	 */	
	public void setCustomerid(Long aValue) {
	    if (aValue==null) {
	    	customer = null;
	    } else if (customer == null) {
	        customer = new com.htsoft.oa.model.customer.Customer(aValue);
	        customer.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			customer.setCustomerId(aValue);
	    }
	}	

    public com.htsoft.oa.model.customer.Customer getCusCustomer() {
        return cusCustomer;
    }   
    
    public void setCusCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
        this.cusCustomer = in_customer;
    }
	/**
	 * 被推荐客户	 * @return Long
	 * @hibernate.property column="CUS_CUSTOMERID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCusCustomerId() {
	    return this.getCusCustomer()==null?null:this.getCusCustomer().getCustomerId();
	}
	
	/**
	 * Set the cusCustomerid
	 */	
	public void setCusCustomerid(Long aValue) {
	    if (aValue==null) {
	        cusCustomer = null;
        } else if (cusCustomer == null) {
            cusCustomer = new com.htsoft.oa.model.customer.Customer(aValue);
            cusCustomer.setVersion(new Integer(0));//set a version to cheat hibernate only
        } else {
            //
            cusCustomer.setCustomerId(aValue);
        }
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}
	
	/**
	 * Set the creDat
	 */	
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}	

	/**
	 * 类型	 * @return Short
	 * @hibernate.property column="RELATIONSHIP_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getRelationshipType() {
		return this.relationshipType;
	}
	
	/**
	 * Set the relationshipType
	 */	
	public void setRelationshipType(Short aValue) {
		this.relationshipType = aValue;
	}	

	/**
	 * 创建人ID	 * @return Long
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCreUseId() {
		return this.creUseId;
	}
	
	/**
	 * Set the creUseId
	 */	
	public void setCreUseId(Long aValue) {
		this.creUseId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CusRelationship)) {
			return false;
		}
		CusRelationship rhs = (CusRelationship) object;
		return new EqualsBuilder()
				.append(this.relationshipId, rhs.relationshipId)
				.append(this.creDat, rhs.creDat)
				.append(this.relationshipType, rhs.relationshipType)
				.append(this.creUseId, rhs.creUseId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.relationshipId) 
				.append(this.creDat) 
				.append(this.relationshipType) 
				.append(this.creUseId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("relationshipId", this.relationshipId) 
				.append("creDat", this.creDat) 
				.append("relationshipType", this.relationshipType) 
				.append("creUseId", this.creUseId) 
				.toString();
	}



}
