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
 * CusContact Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class CusContact extends com.htsoft.core.model.BaseModel {
	
	/**
	 * 代表状态正常
	 */
	public static final Short FLAG_VALID=1;
	/**
	 * 代表状态注销
	 */
	public static final Short FLAG_INVALID=0;

    protected Long contactId;					//联系方式ID
	protected Short contactTypeId;				//联系方式：地址、手机、固话、Email、QQ、MSN等&LXFS001
	protected Short contactSubTypeId;			//电话：家庭电话、办公电话、紧急联系人电话；与联系类型级联
	protected String preContactNum;				//区号/地区号
	protected String mainContactNum;			//号码/详细地址
	protected String lastContactNum;			//分机号/邮编
	protected Short isDefault;					//是否默认
	protected Short isChecked;					//是否核实
	protected String contactRemarks;			//备注
	protected java.util.Date createTime;		//创建时间
	protected java.util.Date lastUpdateTime;	//最后修改日期
	protected Short statusId;					//状态：0=注销 1=正常
	protected com.htsoft.oa.model.customer.Customer customer;	//客户

	
	
	/**
	 * Default Empty Constructor for class CusContact
	 */
	public CusContact () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CusContact
	 */
	public CusContact (
		 Long in_contactId
        ) {
		this.setContactId(in_contactId);
    }

	
	public com.htsoft.oa.model.customer.Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
		this.customer = in_customer;
	}
    

	/**
	 * 联系方式ID	 * @return Long
     * @hibernate.id column="CONTACT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getContactId() {
		return this.contactId;
	}
	
	/**
	 * Set the contactId
	 */	
	public void setContactId(Long aValue) {
		this.contactId = aValue;
	}	

	/**
	 * 客户ID	 * @return Long
	 */
	public Long getCustomerId() {
		return this.getCustomer()==null?null:this.getCustomer().getCustomerId();
	}
	
	/**
	 * Set the customerid
	 */	
	public void setCustomerId(Long aValue) {
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
	 * 联系方式：地址、手机、固话、Email、QQ、MSN等	 * @return Short
	 * @hibernate.property column="CONTACT_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getContactTypeId() {
		return this.contactTypeId;
	}
	
	/**
	 * Set the contactTypeId
	 * @spring.validator type="required"
	 */	
	public void setContactTypeId(Short aValue) {
		this.contactTypeId = aValue;
	}	

	/**
	 * 家庭电话、办公电话、紧急联系人电话；与联系类型级联	 * @return Short
	 * @hibernate.property column="CONTACT_SUB_TYPE_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getContactSubTypeId() {
		return this.contactSubTypeId;
	}
	
	/**
	 * Set the contactSubTypeId
	 */	
	public void setContactSubTypeId(Short aValue) {
		this.contactSubTypeId = aValue;
	}	

	/**
	 * 区号/地区号	 * @return String
	 * @hibernate.property column="PRE_CONTACT_NUM" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getPreContactNum() {
		return this.preContactNum;
	}
	
	/**
	 * Set the preContactNum
	 */	
	public void setPreContactNum(String aValue) {
		this.preContactNum = aValue;
	}	

	/**
	 * 号码/详细地址	 * @return String
	 * @hibernate.property column="MAIN_CONTACT_NUM" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getMainContactNum() {
		return this.mainContactNum;
	}
	
	/**
	 * Set the mainContactNum
	 * @spring.validator type="required"
	 */	
	public void setMainContactNum(String aValue) {
		this.mainContactNum = aValue;
	}	

	/**
	 * 分机号/邮编	 * @return String
	 * @hibernate.property column="LAST_CONTACT_NUM" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getLastContactNum() {
		return this.lastContactNum;
	}
	
	/**
	 * Set the lastContactNum
	 */	
	public void setLastContactNum(String aValue) {
		this.lastContactNum = aValue;
	}	

	/**
	 * 是否默认	 * @return Short
	 * @hibernate.property column="IS_DEFAULT" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getIsDefault() {
		return this.isDefault;
	}
	
	/**
	 * Set the isDefault
	 */	
	public void setIsDefault(Short aValue) {
		this.isDefault = aValue;
	}	

	/**
	 * 是否核实	 * @return Short
	 * @hibernate.property column="IS_CHECKED" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getIsChecked() {
		return this.isChecked;
	}
	
	/**
	 * Set the isChecked
	 */	
	public void setIsChecked(Short aValue) {
		this.isChecked = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="CONTACT_REMARKS" type="java.lang.String" length="2000" not-null="false" unique="false"
	 */
	public String getContactRemarks() {
		return this.contactRemarks;
	}
	
	/**
	 * Set the contactRemarks
	 */	
	public void setContactRemarks(String aValue) {
		this.contactRemarks = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreateTime() {
		return this.createTime;
	}
	
	/**
	 * Set the createTime
	 */	
	public void setCreateTime(java.util.Date aValue) {
		this.createTime = aValue;
	}	

	/**
	 * 最后修改日期	 * @return java.util.Date
	 * @hibernate.property column="LAST_UPDATE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getLastUpdateTime() {
		return this.lastUpdateTime;
	}
	
	/**
	 * Set the lastUpdateTime
	 */	
	public void setLastUpdateTime(java.util.Date aValue) {
		this.lastUpdateTime = aValue;
	}	

	/**
	 * 状态：0=有效 1=无效	 * @return Short
	 * @hibernate.property column="STATUS_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatusId() {
		return this.statusId;
	}
	
	/**
	 * Set the statusId
	 * @spring.validator type="required"
	 */	
	public void setStatusId(Short aValue) {
		this.statusId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CusContact)) {
			return false;
		}
		CusContact rhs = (CusContact) object;
		return new EqualsBuilder()
				.append(this.contactId, rhs.contactId)
						.append(this.contactTypeId, rhs.contactTypeId)
				.append(this.contactSubTypeId, rhs.contactSubTypeId)
				.append(this.preContactNum, rhs.preContactNum)
				.append(this.mainContactNum, rhs.mainContactNum)
				.append(this.lastContactNum, rhs.lastContactNum)
				.append(this.isDefault, rhs.isDefault)
				.append(this.isChecked, rhs.isChecked)
				.append(this.contactRemarks, rhs.contactRemarks)
				.append(this.createTime, rhs.createTime)
				.append(this.lastUpdateTime, rhs.lastUpdateTime)
				.append(this.statusId, rhs.statusId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.contactId) 
						.append(this.contactTypeId) 
				.append(this.contactSubTypeId) 
				.append(this.preContactNum) 
				.append(this.mainContactNum) 
				.append(this.lastContactNum) 
				.append(this.isDefault) 
				.append(this.isChecked) 
				.append(this.contactRemarks) 
				.append(this.createTime) 
				.append(this.lastUpdateTime) 
				.append(this.statusId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("contactId", this.contactId) 
						.append("contactTypeId", this.contactTypeId) 
				.append("contactSubTypeId", this.contactSubTypeId) 
				.append("preContactNum", this.preContactNum) 
				.append("mainContactNum", this.mainContactNum) 
				.append("lastContactNum", this.lastContactNum) 
				.append("isDefault", this.isDefault) 
				.append("isChecked", this.isChecked) 
				.append("contactRemarks", this.contactRemarks) 
				.append("createTime", this.createTime) 
				.append("lastUpdateTime", this.lastUpdateTime) 
				.append("statusId", this.statusId) 
				.toString();
	}



}
