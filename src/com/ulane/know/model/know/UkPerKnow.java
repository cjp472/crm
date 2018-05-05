package com.ulane.know.model.know;
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
 * UkPerKnow Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UkPerKnow extends com.htsoft.core.model.BaseModel {

    protected Long perKnowId;
	protected Long userid;
	protected Long referee;
	protected Long operateType;
	protected java.sql.Timestamp operateTime;
	protected Long status;
	protected java.sql.Timestamp readTime;
	protected com.ulane.know.model.know.UkSysKnow ukSysKnow;
	protected String accepterName;
	protected String startName;
	
	public static Long DINGYUE = 1l;
	public static Long SHOUCANG = 2l;
	public static Long TUIJIAN = 3l;
	
	/**
	 * Default Empty Constructor for class UkPerKnow
	 */
	public UkPerKnow () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UkPerKnow
	 */
	public UkPerKnow (
		 Long in_perKnowId
        ) {
		this.setPerKnowId(in_perKnowId);
    }

	
	public com.ulane.know.model.know.UkSysKnow getUkSysKnow () {
		return ukSysKnow;
	}	
	
	public void setUkSysKnow (com.ulane.know.model.know.UkSysKnow in_ukSysKnow) {
		this.ukSysKnow = in_ukSysKnow;
	}
    

	/**
	 * 个人知识内码	 * @return Long
     * @hibernate.id column="PER_KNOW_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getPerKnowId() {
		return this.perKnowId;
	}
	
	/**
	 * Set the perKnowId
	 */	
	public void setPerKnowId(Long aValue) {
		this.perKnowId = aValue;
	}	

	/**
	 * 系统知识内码	 * @return Long
	 */
	public Long getKnowId() {
		return this.getUkSysKnow()==null?null:this.getUkSysKnow().getKnowId();
	}
	
	/**
	 * Set the knowId
	 */	
	public void setKnowId(Long aValue) {
	    if (aValue==null) {
	    	ukSysKnow = null;
	    } else if (ukSysKnow == null) {
	        ukSysKnow = new com.ulane.know.model.know.UkSysKnow(aValue);
	        ukSysKnow.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ukSysKnow.setKnowId(aValue);
	    }
	}	

	/**
	 * 用户	 * @return Long
	 * @hibernate.property column="USERID" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUserid() {
		return this.userid;
	}
	
	/**
	 * Set the userid
	 */	
	public void setUserid(Long aValue) {
		this.userid = aValue;
	}	

	/**
	 * 操作类型&KNOW_OPERATE_TYPE	 * @return Long
	 * @hibernate.property column="OPERATE_TYPE" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getOperateType() {
		return this.operateType;
	}
	
	/**
	 * Set the operateType
	 */	
	public void setOperateType(Long aValue) {
		this.operateType = aValue;
	}	

	/**
	 * 操作时间	 * @return java.sql.Timestamp
	 * @hibernate.property column="OPERATE_TIME" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getOperateTime() {
		return this.operateTime;
	}
	
	/**
	 * Set the operateTime
	 */	
	public void setOperateTime(java.sql.Timestamp aValue) {
		this.operateTime = aValue;
	}	

	/**
	 * 状态&KNOW_STATUS	 * @return Long
	 * @hibernate.property column="STATUS" type="java.lang.Long" length="22" not-null="false" unique="false"
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
	 * 阅读时间	 * @return java.sql.Timestamp
	 * @hibernate.property column="READ_TIME" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getReadTime() {
		return this.readTime;
	}
	
	/**
	 * Set the readTime
	 */	
	public void setReadTime(java.sql.Timestamp aValue) {
		this.readTime = aValue;
	}	

	
	public Long getReferee() {
		return referee;
	}

	public void setReferee(Long referee) {
		this.referee = referee;
	}

	public String getAccepterName() {
		return accepterName;
	}

	public void setAccepterName(String accepterName) {
		this.accepterName = accepterName;
	}

	public String getStartName() {
		return startName;
	}

	public void setStartName(String startName) {
		this.startName = startName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkPerKnow)) {
			return false;
		}
		UkPerKnow rhs = (UkPerKnow) object;
		return new EqualsBuilder()
				.append(this.perKnowId, rhs.perKnowId)
						.append(this.userid, rhs.userid)
				.append(this.operateType, rhs.operateType)
				.append(this.operateTime, rhs.operateTime)
				.append(this.status, rhs.status)
				.append(this.readTime, rhs.readTime)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.perKnowId) 
						.append(this.userid) 
				.append(this.operateType) 
				.append(this.operateTime) 
				.append(this.status) 
				.append(this.readTime) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("perKnowId", this.perKnowId) 
						.append("userid", this.userid) 
				.append("operateType", this.operateType) 
				.append("operateTime", this.operateTime) 
				.append("status", this.status) 
				.append("readTime", this.readTime) 
				.toString();
	}



}
