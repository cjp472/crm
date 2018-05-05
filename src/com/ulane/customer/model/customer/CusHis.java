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
 * CusHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CusHis extends com.htsoft.core.model.BaseModel {

    protected Long opeHisId;//操作历史ID
	protected Integer opeUseId;//操作人ID
	protected java.util.Date rowDat;//记录时间
	protected Short opeTypId;//操作类型
	protected String opeResDesc;//操作结果描述
	protected com.htsoft.oa.model.customer.Customer customer;//客户


	/**
	 * Default Empty Constructor for class CusHis
	 */
	public CusHis () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CusHis
	 */
	public CusHis (
		 Long in_opeHisId
        ) {
		this.setOpeHisId(in_opeHisId);
    }

	
	public com.htsoft.oa.model.customer.Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
		this.customer = in_customer;
	}
    

	/**
	 * 操作历史ID	 * @return Long
     * @hibernate.id column="OPE_HIS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getOpeHisId() {
		return this.opeHisId;
	}
	
	/**
	 * Set the opeHisId
	 */	
	public void setOpeHisId(Long aValue) {
		this.opeHisId = aValue;
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
	 * 操作人	 * @return Integer
	 * @hibernate.property column="OPE_USE_ID" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getOpeUseId() {
		return this.opeUseId;
	}
	
	/**
	 * Set the opeUseId
	 * @spring.validator type="required"
	 */	
	public void setOpeUseId(Integer aValue) {
		this.opeUseId = aValue;
	}	

	/**
	 * 记录时间	 * @return java.util.Date
	 * @hibernate.property column="ROW_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getRowDat() {
		return this.rowDat;
	}
	
	/**
	 * Set the rowDat
	 * @spring.validator type="required"
	 */	
	public void setRowDat(java.util.Date aValue) {
		this.rowDat = aValue;
	}	

	/**
	 * 操作类型：手工录入、导入、复制生成、修改、分配、回收、拨打	 * @return Short
	 * @hibernate.property column="OPE_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getOpeTypId() {
		return this.opeTypId;
	}
	
	/**
	 * Set the opeTypId
	 * @spring.validator type="required"
	 */	
	public void setOpeTypId(Short aValue) {
		this.opeTypId = aValue;
	}	

	/**
	 * 操作结果描述	 * @return String
	 * @hibernate.property column="OPE_RES_DESC" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getOpeResDesc() {
		return this.opeResDesc;
	}
	
	/**
	 * Set the opeResDesc
	 */	
	public void setOpeResDesc(String aValue) {
		this.opeResDesc = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CusHis)) {
			return false;
		}
		CusHis rhs = (CusHis) object;
		return new EqualsBuilder()
				.append(this.opeHisId, rhs.opeHisId)
						.append(this.opeUseId, rhs.opeUseId)
				.append(this.rowDat, rhs.rowDat)
				.append(this.opeTypId, rhs.opeTypId)
				.append(this.opeResDesc, rhs.opeResDesc)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.opeHisId) 
						.append(this.opeUseId) 
				.append(this.rowDat) 
				.append(this.opeTypId) 
				.append(this.opeResDesc) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("opeHisId", this.opeHisId) 
						.append("opeUseId", this.opeUseId) 
				.append("rowDat", this.rowDat) 
				.append("opeTypId", this.opeTypId) 
				.append("opeResDesc", this.opeResDesc) 
				.toString();
	}



}
