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
 * ServiceWsdlManager Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ServiceWsdlManager extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = 5285354543397564500L;
	
	protected Long serviceWsdlId;
	protected String serviceWsdlName;
	protected String serviceWsdlUrl;
	protected String comMent;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;

	protected String createrName;
	protected String updaterName;
	
	protected java.util.Set<ServiceWsdlMethod> serviceWsdlMethods = new java.util.HashSet<ServiceWsdlMethod>();

	/**
	 * Default Empty Constructor for class ServiceWsdlManager
	 */
	public ServiceWsdlManager () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ServiceWsdlManager
	 */
	public ServiceWsdlManager (
		 Long in_serviceWsdlId
        ) {
		this.setServiceWsdlId(in_serviceWsdlId);
    }

	public String getCreaterName() {
		return createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public String getUpdaterName() {
		return updaterName;
	}

	public void setUpdaterName(String updaterName) {
		this.updaterName = updaterName;
	}

	public java.util.Set<ServiceWsdlMethod> getServiceWsdlMethods () {
		return serviceWsdlMethods;
	}	
	
	private void setServiceWsdlMethods (java.util.Set<ServiceWsdlMethod> in_serviceWsdlMethods) {
		this.serviceWsdlMethods = in_serviceWsdlMethods;
	}
	
	public void addMethod(ServiceWsdlMethod method){
		this.serviceWsdlMethods.add(method);
	}
    

	/**
	 * 接口内码	 * @return Long
     * @hibernate.id column="SERVICE_WSDL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getServiceWsdlId() {
		return this.serviceWsdlId;
	}
	
	/**
	 * Set the serviceWsdlId
	 */	
	public void setServiceWsdlId(Long aValue) {
		this.serviceWsdlId = aValue;
	}	

	/**
	 * 接口名称	 * @return String
	 * @hibernate.property column="SERVICE_WSDL_NAME" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getServiceWsdlName() {
		return this.serviceWsdlName;
	}
	
	/**
	 * Set the serviceWsdlName
	 */	
	public void setServiceWsdlName(String aValue) {
		this.serviceWsdlName = aValue;
	}	

	/**
	 * 接口URL地址	 * @return String
	 * @hibernate.property column="SERVICE_WSDL_URL" type="java.lang.String" length="150" not-null="false" unique="false"
	 */
	public String getServiceWsdlUrl() {
		return this.serviceWsdlUrl;
	}
	
	/**
	 * Set the serviceWsdlUrl
	 */	
	public void setServiceWsdlUrl(String aValue) {
		this.serviceWsdlUrl = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="COMMENT" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComMent() {
		return this.comMent;
	}
	
	/**
	 * Set the comment
	 */	
	public void setComMent(String aValue) {
		this.comMent = aValue;
	}	

	/**
	 * 创建人	 * @return Long
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
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 */	
	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateDate() {
		return this.updateDate;
	}
	
	/**
	 * Set the updateDate
	 */	
	public void setUpdateDate(java.util.Date aValue) {
		this.updateDate = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ServiceWsdlManager)) {
			return false;
		}
		ServiceWsdlManager rhs = (ServiceWsdlManager) object;
		return new EqualsBuilder()
				.append(this.serviceWsdlId, rhs.serviceWsdlId)
				.append(this.serviceWsdlName, rhs.serviceWsdlName)
				.append(this.serviceWsdlUrl, rhs.serviceWsdlUrl)
				.append(this.comMent, rhs.comMent)
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
				.append(this.serviceWsdlId) 
				.append(this.serviceWsdlName) 
				.append(this.serviceWsdlUrl) 
				.append(this.comMent) 
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
				.append("serviceWsdlId", this.serviceWsdlId) 
				.append("serviceWsdlName", this.serviceWsdlName) 
				.append("serviceWsdlUrl", this.serviceWsdlUrl) 
				.append("comment", this.comMent) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.toString();
	}



}
