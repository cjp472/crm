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
 * UlUgroupUser Base Java Bean, base class for the.base.model, mapped directly
 * to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UlUgroupUser extends com.htsoft.core.model.BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6785135506869602068L;
	
	protected Long ugUserId;
	protected com.htsoft.oa.model.system.AppUser appUser;
	
	protected com.ulane.base.model.xitong.UlUsergroup ulUsergroup;

	public com.htsoft.oa.model.system.AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(com.htsoft.oa.model.system.AppUser appUser) {
		this.appUser = appUser;
	}

	/**
	 * Default Empty Constructor for class UlUgroupUser
	 */
	public UlUgroupUser() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class UlUgroupUser
	 */
	public UlUgroupUser(Long in_ugUId) {
		this.setUgUserId(in_ugUId);
	}

	public com.ulane.base.model.xitong.UlUsergroup getUlUsergroup() {
		return ulUsergroup;
	}

	public void setUlUsergroup(
			com.ulane.base.model.xitong.UlUsergroup in_ulUsergroup) {
		this.ulUsergroup = in_ulUsergroup;
	}

	/**
	 * * @return Long
	 */
	public Long getPkUsergroupId() {
		return this.getUlUsergroup() == null ? null : this.getUlUsergroup()
				.getPkUsergroupId();
	}

	/**
	 * Set the pkUsergroupId
	 */
	public void setPkUsergroupId(Long aValue) {
		if (aValue == null) {
			ulUsergroup = null;
		} else if (ulUsergroup == null) {
			ulUsergroup = new com.ulane.base.model.xitong.UlUsergroup(aValue);
			ulUsergroup.setVersion(new Integer(0));// set a version to cheat
													// hibernate only
		} else {
			//
			ulUsergroup.setPkUsergroupId(aValue);
		}
	}

	// /**
	// * * @return Long
	// * @hibernate.property column="userId" type="java.lang.Long" length="18"
	// not-null="false" unique="false"
	// */
	// public Long getUserid() {
	// return this.userid;
	// }
	//	
	// /**
	// * Set the userid
	// */
	// public void setUserid(Long aValue) {
	// this.userid = aValue;
	// }

	/**
	 * * @return Long
	 * 
	 * @hibernate.id column="UG_U_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	
	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UlUgroupUser)) {
			return false;
		}
		UlUgroupUser rhs = (UlUgroupUser) object;
		return new EqualsBuilder()
			.append(this.ugUserId, rhs.ugUserId).isEquals();
	}

	public Long getUgUserId() {
		return ugUserId;
	}

	public void setUgUserId(Long ugUserId) {
		this.ugUserId = ugUserId;
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
		 .append(this.appUser.getUserId())
				.append(this.ugUserId).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("ugUId", this.ugUserId).toString();
	}

}
