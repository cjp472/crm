package com.ulane.monitor.model.unim;
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
 * UnimExtension Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimExtension extends com.htsoft.core.model.BaseModel {

    protected Long extId;
	protected String extCode;
	protected String ipaddress;
	protected String ipport;
	protected String username;
	protected String password;


	/**
	 * Default Empty Constructor for class UnimExtension
	 */
	public UnimExtension () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimExtension
	 */
	public UnimExtension (
		 Long in_extId
        ) {
		this.setExtId(in_extId);
    }

    

	/**
	 * ID	 * @return Long
     * @hibernate.id column="EXT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getExtId() {
		return this.extId;
	}
	
	/**
	 * Set the extId
	 */	
	public void setExtId(Long aValue) {
		this.extId = aValue;
	}	

	/**
	 * 编码	 * @return String
	 * @hibernate.property column="EXT_CODE" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getExtCode() {
		return this.extCode;
	}
	
	/**
	 * Set the extCode
	 */	
	public void setExtCode(String aValue) {
		this.extCode = aValue;
	}	

	/**
	 * IP地址	 * @return String
	 * @hibernate.property column="IPADDRESS" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getIpaddress() {
		return this.ipaddress;
	}
	
	/**
	 * Set the ipaddress
	 */	
	public void setIpaddress(String aValue) {
		this.ipaddress = aValue;
	}	

	/**
	 * 端口	 * @return String
	 * @hibernate.property column="IPPORT" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getIpport() {
		return this.ipport;
	}
	
	/**
	 * Set the ipport
	 */	
	public void setIpport(String aValue) {
		this.ipport = aValue;
	}	

	/**
	 * 用户名	 * @return String
	 * @hibernate.property column="USERNAME" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getUsername() {
		return this.username;
	}
	
	/**
	 * Set the username
	 */	
	public void setUsername(String aValue) {
		this.username = aValue;
	}	

	/**
	 * 密码	 * @return String
	 * @hibernate.property column="PASSWORD" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getPassword() {
		return this.password;
	}
	
	/**
	 * Set the password
	 */	
	public void setPassword(String aValue) {
		this.password = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimExtension)) {
			return false;
		}
		UnimExtension rhs = (UnimExtension) object;
		return new EqualsBuilder()
				.append(this.extId, rhs.extId)
				.append(this.extCode, rhs.extCode)
				.append(this.ipaddress, rhs.ipaddress)
				.append(this.ipport, rhs.ipport)
				.append(this.username, rhs.username)
				.append(this.password, rhs.password)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.extId) 
				.append(this.extCode) 
				.append(this.ipaddress) 
				.append(this.ipport) 
				.append(this.username) 
				.append(this.password) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("extId", this.extId) 
				.append("extCode", this.extCode) 
				.append("ipaddress", this.ipaddress) 
				.append("ipport", this.ipport) 
				.append("username", this.username) 
				.append("password", this.password) 
				.toString();
	}



}
