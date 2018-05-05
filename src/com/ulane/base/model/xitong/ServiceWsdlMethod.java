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
 * ServiceWsdlMethod Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ServiceWsdlMethod extends com.htsoft.core.model.BaseModel {

    protected Long serviceWsdlMethodId;
	protected String serviceWsdlMethod;
	protected String serviceWsdlMethodName;
	protected String serviceWsdlMethodColumns;
	protected String serviceWsdlMethodReturn;
	protected String comment;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected com.ulane.base.model.xitong.ServiceWsdlManager serviceWsdlManager;


	/**
	 * Default Empty Constructor for class ServiceWsdlMethod
	 */
	public ServiceWsdlMethod () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ServiceWsdlMethod
	 */
	public ServiceWsdlMethod (
		 Long in_serviceWsdlMethodId
        ) {
		this.setServiceWsdlMethodId(in_serviceWsdlMethodId);
    }

	
	public com.ulane.base.model.xitong.ServiceWsdlManager getServiceWsdlManager () {
		return serviceWsdlManager;
	}	
	
	public void setServiceWsdlManager (com.ulane.base.model.xitong.ServiceWsdlManager in_serviceWsdlManager) {
		this.serviceWsdlManager = in_serviceWsdlManager;
	}
    

	/**
	 * 接口方法内码	 * @return Long
     * @hibernate.id column="SERVICE_WSDL_METHOD_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getServiceWsdlMethodId() {
		return this.serviceWsdlMethodId;
	}
	
	/**
	 * Set the serviceWsdlMethodId
	 */	
	public void setServiceWsdlMethodId(Long aValue) {
		this.serviceWsdlMethodId = aValue;
	}	

	/**
	 * 接口内码	 * @return Long
	 */
	public Long getServiceWsdlId() {
		return this.getServiceWsdlManager()==null?null:this.getServiceWsdlManager().getServiceWsdlId();
	}
	
	/**
	 * Set the serviceWsdlId
	 */	
	public void setServiceWsdlId(Long aValue) {
	    if (aValue==null) {
	    	serviceWsdlManager = null;
	    } else if (serviceWsdlManager == null) {
	        serviceWsdlManager = new com.ulane.base.model.xitong.ServiceWsdlManager(aValue);
	        serviceWsdlManager.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			serviceWsdlManager.setServiceWsdlId(aValue);
	    }
	}	

	/**
	 * 接口方法名称	 * @return String
	 * @hibernate.property column="SERVICE_WSDL_METHOD" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getServiceWsdlMethod() {
		return this.serviceWsdlMethod;
	}
	
	/**
	 * Set the serviceWsdlMethod
	 */	
	public void setServiceWsdlMethod(String aValue) {
		this.serviceWsdlMethod = aValue;
	}	

	/**
	 * 接口方法	 * @return String
	 * @hibernate.property column="SERVICE_WSDL_METHOD_NAME" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getServiceWsdlMethodName() {
		return this.serviceWsdlMethodName;
	}
	
	/**
	 * Set the serviceWsdlMethodName
	 */	
	public void setServiceWsdlMethodName(String aValue) {
		this.serviceWsdlMethodName = aValue;
	}	

	/**
	 * 接口参数	 * @return String
	 * @hibernate.property column="SERVICE_WSDL_METHOD_COLUMNS" type="java.lang.String" length="150" not-null="false" unique="false"
	 */
	public String getServiceWsdlMethodColumns() {
		return this.serviceWsdlMethodColumns;
	}
	
	/**
	 * Set the serviceWsdlMethodColumns
	 */	
	public void setServiceWsdlMethodColumns(String aValue) {
		this.serviceWsdlMethodColumns = aValue;
	}	

	/**
	 * 接口数据返回格式	 * @return String
	 * @hibernate.property column="SERVICE_WSDL_METHOD_RETURN" type="java.lang.String" length="250" not-null="false" unique="false"
	 */
	public String getServiceWsdlMethodReturn() {
		return this.serviceWsdlMethodReturn;
	}
	
	/**
	 * Set the serviceWsdlMethodReturn
	 */	
	public void setServiceWsdlMethodReturn(String aValue) {
		this.serviceWsdlMethodReturn = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="COMMENT" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComment() {
		return this.comment;
	}
	
	/**
	 * Set the comment
	 */	
	public void setComment(String aValue) {
		this.comment = aValue;
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
		if (!(object instanceof ServiceWsdlMethod)) {
			return false;
		}
		ServiceWsdlMethod rhs = (ServiceWsdlMethod) object;
		return new EqualsBuilder()
				.append(this.serviceWsdlMethodId, rhs.serviceWsdlMethodId)
						.append(this.serviceWsdlMethod, rhs.serviceWsdlMethod)
				.append(this.serviceWsdlMethodName, rhs.serviceWsdlMethodName)
				.append(this.serviceWsdlMethodColumns, rhs.serviceWsdlMethodColumns)
				.append(this.serviceWsdlMethodReturn, rhs.serviceWsdlMethodReturn)
				.append(this.comment, rhs.comment)
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
				.append(this.serviceWsdlMethodId) 
						.append(this.serviceWsdlMethod) 
				.append(this.serviceWsdlMethodName) 
				.append(this.serviceWsdlMethodColumns) 
				.append(this.serviceWsdlMethodReturn) 
				.append(this.comment) 
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
				.append("serviceWsdlMethodId", this.serviceWsdlMethodId) 
						.append("serviceWsdlMethod", this.serviceWsdlMethod) 
				.append("serviceWsdlMethodName", this.serviceWsdlMethodName) 
				.append("serviceWsdlMethodColumns", this.serviceWsdlMethodColumns) 
				.append("serviceWsdlMethodReturn", this.serviceWsdlMethodReturn) 
				.append("comment", this.comment) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.toString();
	}



}
