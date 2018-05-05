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
 * UnimServerConfig Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimServerConfig extends com.htsoft.core.model.BaseModel {

    protected Long serverId;
	protected String serverCode;
	protected String serverName;
	protected String serverType;
	protected String ipAddress;
	protected Long ipPort;
	protected String remark;

	protected java.util.Set unimAgents = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class UnimServerConfig
	 */
	public UnimServerConfig () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimServerConfig
	 */
	public UnimServerConfig (
		 Long in_serverId
        ) {
		this.setServerId(in_serverId);
    }


	public java.util.Set getUnimAgents () {
		return unimAgents;
	}	
	
	public void setUnimAgents (java.util.Set in_unimAgents) {
		this.unimAgents = in_unimAgents;
	}
    

	/**
	 * ID	 * @return Long
     * @hibernate.id column="SERVER_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getServerId() {
		return this.serverId;
	}
	
	/**
	 * Set the serverId
	 */	
	public void setServerId(Long aValue) {
		this.serverId = aValue;
	}	

	/**
	 * 编号	 * @return String
	 * @hibernate.property column="SERVER_CODE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getServerCode() {
		return this.serverCode;
	}
	
	/**
	 * Set the serverCode
	 */	
	public void setServerCode(String aValue) {
		this.serverCode = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="SERVER_NAME" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getServerName() {
		return this.serverName;
	}
	
	/**
	 * Set the serverName
	 */	
	public void setServerName(String aValue) {
		this.serverName = aValue;
	}	

	/**
	 * 类型	 * @return String
	 * @hibernate.property column="SERVER_TYPE" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getServerType() {
		return this.serverType;
	}
	
	/**
	 * Set the serverType
	 */	
	public void setServerType(String aValue) {
		this.serverType = aValue;
	}	

	/**
	 * IP地址	 * @return String
	 * @hibernate.property column="IP_ADDRESS" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getIpAddress() {
		return this.ipAddress;
	}
	
	/**
	 * Set the ipAddress
	 */	
	public void setIpAddress(String aValue) {
		this.ipAddress = aValue;
	}	

	/**
	 * 端口	 * @return Long
	 * @hibernate.property column="IP_PORT" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getIpPort() {
		return this.ipPort;
	}
	
	/**
	 * Set the ipPort
	 */	
	public void setIpPort(Long aValue) {
		this.ipPort = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimServerConfig)) {
			return false;
		}
		UnimServerConfig rhs = (UnimServerConfig) object;
		return new EqualsBuilder()
				.append(this.serverId, rhs.serverId)
				.append(this.serverCode, rhs.serverCode)
				.append(this.serverName, rhs.serverName)
				.append(this.serverType, rhs.serverType)
				.append(this.ipAddress, rhs.ipAddress)
				.append(this.ipPort, rhs.ipPort)
				.append(this.remark, rhs.remark)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.serverId) 
				.append(this.serverCode) 
				.append(this.serverName) 
				.append(this.serverType) 
				.append(this.ipAddress) 
				.append(this.ipPort) 
				.append(this.remark) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("serverId", this.serverId) 
				.append("serverCode", this.serverCode) 
				.append("serverName", this.serverName) 
				.append("serverType", this.serverType) 
				.append("ipAddress", this.ipAddress) 
				.append("ipPort", this.ipPort) 
				.append("remark", this.remark) 
				.toString();
	}



}
