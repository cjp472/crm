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
 * CusBusiInvoke Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CusBusiInvoke extends com.htsoft.core.model.BaseModel {

    protected Long busiHisId;
	protected Short chanTypeId;
	protected Long ownerId;
	protected Short busiTypeId;
	protected java.util.Date staTime;
	protected java.util.Date endTime;
	protected String busiCode;
	protected Short busiResId;
	protected String cusCardNo;
	protected String remarks;
	protected com.htsoft.oa.model.customer.Customer customer;


	/**
	 * Default Empty Constructor for class CusBusiInvoke
	 */
	public CusBusiInvoke () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CusBusiInvoke
	 */
	public CusBusiInvoke (
		 Long in_busiHisId
        ) {
		this.setBusiHisId(in_busiHisId);
    }

	
	public com.htsoft.oa.model.customer.Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
		this.customer = in_customer;
	}
    

	/**
	 * 业务历史ID	 * @return Long
     * @hibernate.id column="BUSI_HIS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBusiHisId() {
		return this.busiHisId;
	}
	
	/**
	 * Set the busiHisId
	 */	
	public void setBusiHisId(Long aValue) {
		this.busiHisId = aValue;
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
	 * 渠道类别&CUSQDLB	 * @return Short
	 * @hibernate.property column="CHAN_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getChanTypeId() {
		return this.chanTypeId;
	}
	
	/**
	 * Set the chanTypeId
	 * @spring.validator type="required"
	 */	
	public void setChanTypeId(Short aValue) {
		this.chanTypeId = aValue;
	}	

	/**
	 * 业务处理人（坐席）	 * @return Long
	 * @hibernate.property column="OWNER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getOwnerId() {
		return this.ownerId;
	}
	
	/**
	 * Set the ownerId
	 */	
	public void setOwnerId(Long aValue) {
		this.ownerId = aValue;
	}	

	/**
	 * 交易类型&CUSJYLX	 * @return Short
	 * @hibernate.property column="BUSI_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getBusiTypeId() {
		return this.busiTypeId;
	}
	
	/**
	 * Set the busiTypeId
	 * @spring.validator type="required"
	 */	
	public void setBusiTypeId(Short aValue) {
		this.busiTypeId = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="STA_TIME" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getStaTime() {
		return this.staTime;
	}
	
	/**
	 * Set the staTime
	 * @spring.validator type="required"
	 */	
	public void setStaTime(java.util.Date aValue) {
		this.staTime = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="END_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEndTime() {
		return this.endTime;
	}
	
	/**
	 * Set the endTime
	 */	
	public void setEndTime(java.util.Date aValue) {
		this.endTime = aValue;
	}	

	/**
	 * 交易码	 * @return String
	 * @hibernate.property column="BUSI_CODE" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getBusiCode() {
		return this.busiCode;
	}
	
	/**
	 * Set the busiCode
	 */	
	public void setBusiCode(String aValue) {
		this.busiCode = aValue;
	}	

	/**
	 * 交易状态&CUSJYZT	 * @return Short
	 * @hibernate.property column="BUSI_RES_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getBusiResId() {
		return this.busiResId;
	}
	
	/**
	 * Set the busiResId
	 * @spring.validator type="required"
	 */	
	public void setBusiResId(Short aValue) {
		this.busiResId = aValue;
	}	

	/**
	 * 客户卡号	 * @return String
	 * @hibernate.property column="CUS_CARD_NO" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getCusCardNo() {
		return this.cusCardNo;
	}
	
	/**
	 * Set the cusCardNo
	 */	
	public void setCusCardNo(String aValue) {
		this.cusCardNo = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARKS" type="java.lang.String" length="2000" not-null="false" unique="false"
	 */
	public String getRemarks() {
		return this.remarks;
	}
	
	/**
	 * Set the remarks
	 */	
	public void setRemarks(String aValue) {
		this.remarks = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CusBusiInvoke)) {
			return false;
		}
		CusBusiInvoke rhs = (CusBusiInvoke) object;
		return new EqualsBuilder()
				.append(this.busiHisId, rhs.busiHisId)
						.append(this.chanTypeId, rhs.chanTypeId)
				.append(this.ownerId, rhs.ownerId)
				.append(this.busiTypeId, rhs.busiTypeId)
				.append(this.staTime, rhs.staTime)
				.append(this.endTime, rhs.endTime)
				.append(this.busiCode, rhs.busiCode)
				.append(this.busiResId, rhs.busiResId)
				.append(this.cusCardNo, rhs.cusCardNo)
				.append(this.remarks, rhs.remarks)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.busiHisId) 
						.append(this.chanTypeId) 
				.append(this.ownerId) 
				.append(this.busiTypeId) 
				.append(this.staTime) 
				.append(this.endTime) 
				.append(this.busiCode) 
				.append(this.busiResId) 
				.append(this.cusCardNo) 
				.append(this.remarks) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("busiHisId", this.busiHisId) 
						.append("chanTypeId", this.chanTypeId) 
				.append("ownerId", this.ownerId) 
				.append("busiTypeId", this.busiTypeId) 
				.append("staTime", this.staTime) 
				.append("endTime", this.endTime) 
				.append("busiCode", this.busiCode) 
				.append("busiResId", this.busiResId) 
				.append("cusCardNo", this.cusCardNo) 
				.append("remarks", this.remarks) 
				.toString();
	}



}
