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
 * ConServiceRequest Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ConServiceRequest extends com.htsoft.core.model.BaseModel {

    protected Long serviceRequestId;
	protected Long type;	//请求类型
	protected Long busType;	//请求事项
	protected String content;	//内容
	protected String accept;	//受理人
	protected java.util.Date acceptDate;	//受理时间
	protected Long urgent;	//紧急程度
	protected java.util.Date starttime;	//要求完成时间
	protected java.util.Date endtime;	//完成时间
	protected Long source;		//来源
	protected Long status;		//状态
	protected Long substatus;	//子状态
	protected Long creUseId;		//创建人
	protected java.util.Date creDat;	//创建时间
	protected Long updUseId;		//修改人
	protected java.util.Date updDat;	//修改时间
	protected String note;		//说明
	protected Long linkType;	//联系方式
	protected Long callNo;		//主叫号码
	protected com.htsoft.oa.model.customer.Customer customer;
	protected com.htsoft.oa.model.customer.CusLinkman cusLinkman;


	/**
	 * Default Empty Constructor for class ConServiceRequest
	 */
	public ConServiceRequest () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConServiceRequest
	 */
	public ConServiceRequest (
		 Long in_serviceRequestId
        ) {
		this.setServiceRequestId(in_serviceRequestId);
    }

	
	public com.htsoft.oa.model.customer.Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
		this.customer = in_customer;
	}
	
	public com.htsoft.oa.model.customer.CusLinkman getCusLinkman () {
		return cusLinkman;
	}	
	
	public void setCusLinkman (com.htsoft.oa.model.customer.CusLinkman in_cusLinkman) {
		this.cusLinkman = in_cusLinkman;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="SERVICE_REQUEST_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getServiceRequestId() {
		return this.serviceRequestId;
	}
	
	/**
	 * Set the serviceRequestId
	 */	
	public void setServiceRequestId(Long aValue) {
		this.serviceRequestId = aValue;
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
	 * 联系人ID	 * @return Long
	 */
	public Long getLinkmanid() {
		return this.getCusLinkman()==null?null:this.getCusLinkman().getLinkmanId();
	}
	
	/**
	 * Set the linkmanid
	 */	
	public void setLinkmanid(Long aValue) {
	    if (aValue==null) {
	    	cusLinkman = null;
	    } else if (cusLinkman == null) {
	        cusLinkman = new com.htsoft.oa.model.customer.CusLinkman(aValue);
	        cusLinkman.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			cusLinkman.setLinkmanId(aValue);
	    }
	}	

	/**
	 * 类型	 * @return Long
	 * @hibernate.property column="TYPE" type="java.lang.Long" length="5" not-null="false" unique="false"
	 */
	public Long getType() {
		return this.type;
	}
	
	/**
	 * Set the type
	 */	
	public void setType(Long aValue) {
		this.type = aValue;
	}	

	/**
	 * 业务类型	 * @return Long
	 * @hibernate.property column="BUS_TYPE" type="java.lang.Long" length="5" not-null="false" unique="false"
	 */
	public Long getBusType() {
		return this.busType;
	}
	
	/**
	 * Set the busType
	 */	
	public void setBusType(Long aValue) {
		this.busType = aValue;
	}	

	/**
	 * 内容	 * @return String
	 * @hibernate.property column="CONTENT" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getContent() {
		return this.content;
	}
	
	/**
	 * Set the content
	 */	
	public void setContent(String aValue) {
		this.content = aValue;
	}	

	/**
	 * 受理人	 * @return Long
	 * @hibernate.property column="ACCEPT" type="java.lang.String" length="18" not-null="false" unique="false"
	 */
	public String getAccept() {
		return this.accept;
	}
	
	/**
	 * Set the accept
	 */	
	public void setAccept(String aValue) {
		this.accept = aValue;
	}	

	/**
	 * 受理时间	 * @return java.util.Date
	 * @hibernate.property column="ACCEPT_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getAcceptDate() {
		return this.acceptDate;
	}
	
	/**
	 * Set the acceptDate
	 */	
	public void setAcceptDate(java.util.Date aValue) {
		this.acceptDate = aValue;
	}	

	/**
	 * 紧急程度	 * @return Long
	 * @hibernate.property column="URGENT" type="java.lang.Long" length="5" not-null="false" unique="false"
	 */
	public Long getUrgent() {
		return this.urgent;
	}
	
	/**
	 * Set the urgent
	 */	
	public void setUrgent(Long aValue) {
		this.urgent = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="STARTTIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getStarttime() {
		return this.starttime;
	}
	
	/**
	 * Set the starttime
	 */	
	public void setStarttime(java.util.Date aValue) {
		this.starttime = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="ENDTIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEndtime() {
		return this.endtime;
	}
	
	/**
	 * Set the endtime
	 */	
	public void setEndtime(java.util.Date aValue) {
		this.endtime = aValue;
	}	

	/**
	 * 来源	 * @return Long
	 * @hibernate.property column="SOURCE" type="java.lang.Long" length="5" not-null="false" unique="false"
	 */
	public Long getSource() {
		return this.source;
	}
	
	/**
	 * Set the source
	 */	
	public void setSource(Long aValue) {
		this.source = aValue;
	}	

	/**
	 * 状态	 * @return Long
	 * @hibernate.property column="STATUS" type="java.lang.Long" length="5" not-null="false" unique="false"
	 */
	public Long getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 */	
	public void setStatus(Long aValue) {
		this.status = aValue;
	}	

	/**
	 * 子状态	 * @return Long
	 * @hibernate.property column="SUBSTATUS" type="java.lang.Long" length="5" not-null="false" unique="false"
	 */
	public Long getSubstatus() {
		return this.substatus;
	}
	
	/**
	 * Set the substatus
	 */	
	public void setSubstatus(Long aValue) {
		this.substatus = aValue;
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
	 * 备注	 * @return String
	 * @hibernate.property column="NOTE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getNote() {
		return this.note;
	}
	
	/**
	 * Set the note
	 */	
	public void setNote(String aValue) {
		this.note = aValue;
	}	

	/**
	 * 联系方式	 * @return Long
	 * @hibernate.property column="LINK_TYPE" type="java.lang.Long" length="2" not-null="false" unique="false"
	 */
	public Long getLinkType() {
		return linkType;
	}

	/**
	 * Set the linkType
	 */	
	public void setLinkType(Long linkType) {
		this.linkType = linkType;
	}

	/**
	 * 主叫号码	 * @return Long
	 * @hibernate.property column="CALL_NO" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCallNo() {
		return callNo;
	}

	/**
	 * Set the callNo
	 */	
	public void setCallNo(Long callNo) {
		this.callNo = callNo;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConServiceRequest)) {
			return false;
		}
		ConServiceRequest rhs = (ConServiceRequest) object;
		return new EqualsBuilder()
				.append(this.serviceRequestId, rhs.serviceRequestId)
								.append(this.type, rhs.type)
				.append(this.busType, rhs.busType)
				.append(this.content, rhs.content)
				.append(this.accept, rhs.accept)
				.append(this.acceptDate, rhs.acceptDate)
				.append(this.urgent, rhs.urgent)
				.append(this.starttime, rhs.starttime)
				.append(this.endtime, rhs.endtime)
				.append(this.source, rhs.source)
				.append(this.status, rhs.status)
				.append(this.substatus, rhs.substatus)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creDat, rhs.creDat)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updDat, rhs.updDat)
				.append(this.note, rhs.note)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.serviceRequestId) 
								.append(this.type) 
				.append(this.busType) 
				.append(this.content) 
				.append(this.accept) 
				.append(this.acceptDate) 
				.append(this.urgent) 
				.append(this.starttime) 
				.append(this.endtime) 
				.append(this.source) 
				.append(this.status) 
				.append(this.substatus) 
				.append(this.creUseId) 
				.append(this.creDat) 
				.append(this.updUseId) 
				.append(this.updDat) 
				.append(this.note) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("serviceRequestId", this.serviceRequestId) 
								.append("type", this.type) 
				.append("busType", this.busType) 
				.append("content", this.content) 
				.append("accept", this.accept) 
				.append("acceptDate", this.acceptDate) 
				.append("urgent", this.urgent) 
				.append("starttime", this.starttime) 
				.append("endtime", this.endtime) 
				.append("source", this.source) 
				.append("status", this.status) 
				.append("substatus", this.substatus) 
				.append("creUseId", this.creUseId) 
				.append("creDat", this.creDat) 
				.append("updUseId", this.updUseId) 
				.append("updDat", this.updDat) 
				.append("note", this.note) 
				.toString();
	}



}
