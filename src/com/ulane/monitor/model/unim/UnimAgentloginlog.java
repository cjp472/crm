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
 * UnimAgentloginlog Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAgentloginlog extends com.htsoft.core.model.BaseModel {

    protected Long logId;
    protected String aid;
	protected String station;
	protected String locId;
	protected Long alTenant;
	protected String loginDate;
	protected java.util.Date loginTime;
	protected String logoutDate;
	protected java.util.Date logoutTime;
	protected Short logoutReason;


	/**
	 * Default Empty Constructor for class UnimAgentloginlog
	 */
	public UnimAgentloginlog () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAgentloginlog
	 */
	public UnimAgentloginlog (
		 Long in_logId
        ) {
		this.setLogId(in_logId);
    }

    

	public Long getLogId() {
		return logId;
	}

	public void setLogId(Long logId) {
		this.logId = logId;
	}

	/**
	 * 工号	 * @return String
     * @hibernate.id column="AID" type="java.lang.Long" generator-class="native"
	 */
	public String getAid() {
		return this.aid;
	}
	
	/**
	 * Set the aid
	 */	
	public void setAid(String aValue) {
		this.aid = aValue;
	}	

	/**
	 * 登录的分机号	 * @return String
	 * @hibernate.property column="STATION" type="java.lang.String" length="15" not-null="true" unique="false"
	 */
	public String getStation() {
		return this.station;
	}
	
	/**
	 * Set the station
	 * @spring.validator type="required"
	 */	
	public void setStation(String aValue) {
		this.station = aValue;
	}	

	/**
	 * CTI地址  可以是IP地址等CTI的连接信息	 * @return String
	 * @hibernate.property column="LOC_ID" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getLocId() {
		return this.locId;
	}
	
	/**
	 * Set the locId
	 */	
	public void setLocId(String aValue) {
		this.locId = aValue;
	}	

	/**
	 * 租户  备注：对应多租户平台	 * @return Long
	 * @hibernate.property column="AL_TENANT" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getAlTenant() {
		return this.alTenant;
	}
	
	/**
	 * Set the alTenant
	 */	
	public void setAlTenant(Long aValue) {
		this.alTenant = aValue;
	}	

	/**
	 * 登录日期  YYYY-MM-DD	 * @return String
	 * @hibernate.property column="LOGIN_DATE" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getLoginDate() {
		return this.loginDate;
	}
	
	/**
	 * Set the loginDate
	 */	
	public void setLoginDate(String aValue) {
		this.loginDate = aValue;
	}	

	/**
	 * 登录时间  YYYY-MM-DD 24H:MM:SS	 * @return java.util.Date
	 * @hibernate.property column="LOGIN_TIME" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getLoginTime() {
		return this.loginTime;
	}
	
	/**
	 * Set the loginTime
	 * @spring.validator type="required"
	 */	
	public void setLoginTime(java.util.Date aValue) {
		this.loginTime = aValue;
	}	

	/**
	 * 登出日期  YYYY-MM-DD	 * @return String
	 * @hibernate.property column="LOGOUT_DATE" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getLogoutDate() {
		return this.logoutDate;
	}
	
	/**
	 * Set the logoutDate
	 */	
	public void setLogoutDate(String aValue) {
		this.logoutDate = aValue;
	}	

	/**
	 * 登出时间  YYYY-MM-DD 24H:MM:SS	 * @return java.util.Date
	 * @hibernate.property column="LOGOUT_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getLogoutTime() {
		return this.logoutTime;
	}
	
	/**
	 * Set the logoutTime
	 */	
	public void setLogoutTime(java.util.Date aValue) {
		this.logoutTime = aValue;
	}	

	/**
	 * 登出原因  0、默认；99、强制签出	 * @return Short
	 * @hibernate.property column="LOGOUT_REASON" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getLogoutReason() {
		return this.logoutReason;
	}
	
	/**
	 * Set the logoutReason
	 */	
	public void setLogoutReason(Short aValue) {
		this.logoutReason = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimAgentloginlog)) {
			return false;
		}
		UnimAgentloginlog rhs = (UnimAgentloginlog) object;
		return new EqualsBuilder()
				.append(this.logId, rhs.logId)
				.append(this.aid, rhs.aid)
				.append(this.station, rhs.station)
				.append(this.locId, rhs.locId)
				.append(this.alTenant, rhs.alTenant)
				.append(this.loginDate, rhs.loginDate)
				.append(this.loginTime, rhs.loginTime)
				.append(this.logoutDate, rhs.logoutDate)
				.append(this.logoutTime, rhs.logoutTime)
				.append(this.logoutReason, rhs.logoutReason)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.logId) 
				.append(this.aid) 
				.append(this.station) 
				.append(this.locId) 
				.append(this.alTenant) 
				.append(this.loginDate) 
				.append(this.loginTime) 
				.append(this.logoutDate) 
				.append(this.logoutTime) 
				.append(this.logoutReason) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("logId", this.logId) 
				.append("aid", this.aid) 
				.append("station", this.station) 
				.append("locId", this.locId) 
				.append("alTenant", this.alTenant) 
				.append("loginDate", this.loginDate) 
				.append("loginTime", this.loginTime) 
				.append("logoutDate", this.logoutDate) 
				.append("logoutTime", this.logoutTime) 
				.append("logoutReason", this.logoutReason) 
				.toString();
	}



}
