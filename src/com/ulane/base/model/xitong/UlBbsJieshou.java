package com.ulane.base.model.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.system.AppUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UlBbsJieshou Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlBbsJieshou extends com.htsoft.core.model.BaseModel {

    protected Long bbsJieshouId;
	protected AppUser appUser;
	protected java.sql.Timestamp receivetime;
	protected java.sql.Timestamp readtime;
	protected Long readstatus;
	protected com.ulane.base.model.xitong.UlBbsHuati ulBbsHuati;


	/**
	 * Default Empty Constructor for class UlBbsJieshou
	 */
	public UlBbsJieshou () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UlBbsJieshou
	 */
	public UlBbsJieshou (
		 Long in_bbsJieshouId
        ) {
		this.setBbsJieshouId(in_bbsJieshouId);
    }

	
	public com.ulane.base.model.xitong.UlBbsHuati getUlBbsHuati () {
		return ulBbsHuati;
	}	
	
	public void setUlBbsHuati (com.ulane.base.model.xitong.UlBbsHuati in_ulBbsHuati) {
		this.ulBbsHuati = in_ulBbsHuati;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="BBS_JIESHOU_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBbsJieshouId() {
		return this.bbsJieshouId;
	}
	
	/**
	 * Set the bbsJieshouId
	 */	
	public void setBbsJieshouId(Long aValue) {
		this.bbsJieshouId = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getBbsHuatiId() {
		return this.getUlBbsHuati()==null?null:this.getUlBbsHuati().getBbsHuatiId();
	}
	
	/**
	 * Set the bbsHuatiId
	 */	
	public void setBbsHuatiId(Long aValue) {
	    if (aValue==null) {
	    	ulBbsHuati = null;
	    } else if (ulBbsHuati == null) {
	        ulBbsHuati = new com.ulane.base.model.xitong.UlBbsHuati(aValue);
	        ulBbsHuati.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ulBbsHuati.setBbsHuatiId(aValue);
	    }
	}	



	/**
	 * 	 * @return java.sql.Timestamp
	 * @hibernate.property column="RECEIVETIME" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getReceivetime() {
		return this.receivetime;
	}
	
	/**
	 * Set the receivetime
	 */	
	public void setReceivetime(java.sql.Timestamp aValue) {
		this.receivetime = aValue;
	}	

	/**
	 * 	 * @return java.sql.Timestamp
	 * @hibernate.property column="READTIME" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getReadtime() {
		return this.readtime;
	}
	
	/**
	 * Set the readtime
	 */	
	public void setReadtime(java.sql.Timestamp aValue) {
		this.readtime = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="READSTATUS" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getReadstatus() {
		return this.readstatus;
	}
	
	/**
	 * Set the readstatus
	 */	
	public void setReadstatus(Long aValue) {
		this.readstatus = aValue;
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UlBbsJieshou other = (UlBbsJieshou) obj;
		if (appUser == null) {
			if (other.appUser != null)
				return false;
		} else if (!appUser.equals(other.appUser))
			return false;
		if (bbsJieshouId == null) {
			if (other.bbsJieshouId != null)
				return false;
		} else if (!bbsJieshouId.equals(other.bbsJieshouId))
			return false;
		if (readstatus == null) {
			if (other.readstatus != null)
				return false;
		} else if (!readstatus.equals(other.readstatus))
			return false;
		if (readtime == null) {
			if (other.readtime != null)
				return false;
		} else if (!readtime.equals(other.readtime))
			return false;
		if (receivetime == null) {
			if (other.receivetime != null)
				return false;
		} else if (!receivetime.equals(other.receivetime))
			return false;
		if (ulBbsHuati == null) {
			if (other.ulBbsHuati != null)
				return false;
		} else if (!ulBbsHuati.equals(other.ulBbsHuati))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((appUser == null) ? 0 : appUser.hashCode());
		result = prime * result
				+ ((bbsJieshouId == null) ? 0 : bbsJieshouId.hashCode());
		result = prime * result
				+ ((readstatus == null) ? 0 : readstatus.hashCode());
		result = prime * result
				+ ((readtime == null) ? 0 : readtime.hashCode());
		result = prime * result
				+ ((receivetime == null) ? 0 : receivetime.hashCode());
		result = prime * result
				+ ((ulBbsHuati == null) ? 0 : ulBbsHuati.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UlBbsJieshou [appUser=" + appUser + ", bbsJieshouId="
				+ bbsJieshouId + ", readstatus=" + readstatus + ", readtime="
				+ readtime + ", receivetime=" + receivetime + ", ulBbsHuati="
				+ ulBbsHuati + "]";
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}



}
