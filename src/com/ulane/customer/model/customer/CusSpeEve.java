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
 * CusSpeEve Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CusSpeEve extends com.htsoft.core.model.BaseModel {

    protected Long eveId;
	protected String eveContent;
	protected String remark;
	protected Long creUseId;
	protected java.util.Date creDat;
	protected Long updUseId;
	protected java.util.Date updDat;
	protected Short staId;
	protected com.htsoft.oa.model.customer.Customer customer;


	/**
	 * Default Empty Constructor for class CusSpeEve
	 */
	public CusSpeEve () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CusSpeEve
	 */
	public CusSpeEve (
		 Long in_eveId
        ) {
		this.setEveId(in_eveId);
    }

	
	public com.htsoft.oa.model.customer.Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
		this.customer = in_customer;
	}
    

	/**
	 * 事项ID	 * @return Long
     * @hibernate.id column="EVE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getEveId() {
		return this.eveId;
	}
	
	/**
	 * Set the eveId
	 */	
	public void setEveId(Long aValue) {
		this.eveId = aValue;
	}	

	/**
	 * 客户ID	 * @return Long
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

	/**
	 * 事项内容	 * @return String
	 * @hibernate.property column="EVE_CONTENT" type="java.lang.String" length="2000" not-null="true" unique="false"
	 */
	public String getEveContent() {
		return this.eveContent;
	}
	
	/**
	 * Set the eveContent
	 * @spring.validator type="required"
	 */	
	public void setEveContent(String aValue) {
		this.eveContent = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="2048" not-null="false" unique="false"
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
	 * 创建人ID	 * @return Long
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getCreUseId() {
		return this.creUseId;
	}
	
	/**
	 * Set the creUseId
	 * @spring.validator type="required"
	 */	
	public void setCreUseId(Long aValue) {
		this.creUseId = aValue;
	}	

	/**
	 * 创建日期	 * @return java.util.Date
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}
	
	/**
	 * Set the creDat
	 * @spring.validator type="required"
	 */	
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}	

	/**
	 * 修改人ID	 * @return Long
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdUseId() {
		return this.updUseId;
	}
	
	/**
	 * Set the updUseId
	 */	
	public void setUpdUseId(Long aValue) {
		this.updUseId = aValue;
	}	

	/**
	 * 修改日期	 * @return java.util.Date
	 * @hibernate.property column="UPD_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdDat() {
		return this.updDat;
	}
	
	/**
	 * Set the updDat
	 */	
	public void setUpdDat(java.util.Date aValue) {
		this.updDat = aValue;
	}	

	/**
	 * 状态&CONZT	 * @return Short
	 * @hibernate.property column="STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStaId() {
		return this.staId;
	}
	
	/**
	 * Set the staId
	 * @spring.validator type="required"
	 */	
	public void setStaId(Short aValue) {
		this.staId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CusSpeEve)) {
			return false;
		}
		CusSpeEve rhs = (CusSpeEve) object;
		return new EqualsBuilder()
				.append(this.eveId, rhs.eveId)
						.append(this.eveContent, rhs.eveContent)
				.append(this.remark, rhs.remark)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creDat, rhs.creDat)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updDat, rhs.updDat)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.eveId) 
						.append(this.eveContent) 
				.append(this.remark) 
				.append(this.creUseId) 
				.append(this.creDat) 
				.append(this.updUseId) 
				.append(this.updDat) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("eveId", this.eveId) 
						.append("eveContent", this.eveContent) 
				.append("remark", this.remark) 
				.append("creUseId", this.creUseId) 
				.append("creDat", this.creDat) 
				.append("updUseId", this.updUseId) 
				.append("updDat", this.updDat) 
				.append("staId", this.staId) 
				.toString();
	}



}
