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

import bsh.This;

import com.google.gson.annotations.Expose;

/**
 * UlUgroupRole Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlUgroupRole extends com.htsoft.core.model.BaseModel {
	
	@Expose
    protected Long ugRoleId;
	transient protected com.ulane.base.model.xitong.UlUsergroup ulUsergroup;
	//添加AppRole对象，并生成getter和setter方法
	protected com.htsoft.oa.model.system.AppRole appRole;

	public com.htsoft.oa.model.system.AppRole getAppRole() {
		return appRole;
	}

	public void setAppRole(com.htsoft.oa.model.system.AppRole appRole) {
		this.appRole = appRole;
	}

	/**
	 * Default Empty Constructor for class UlUgroupRole
	 */
	public UlUgroupRole () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UlUgroupRole
	 */
	public UlUgroupRole (
		 Long in_ugRoleId
        ) {
		this.setUgRoleId(in_ugRoleId);
    }

	
	public com.ulane.base.model.xitong.UlUsergroup getUlUsergroup () {
		return ulUsergroup;
	}	
	
	public void setUlUsergroup (com.ulane.base.model.xitong.UlUsergroup in_ulUsergroup) {
		this.ulUsergroup = in_ulUsergroup;
	}
    

	/**
	 * 	 * @return Long
	 */
	public Long getPkUsergroupId() {
		return this.getUlUsergroup()==null?null:this.getUlUsergroup().getPkUsergroupId();
	}
	
	/**
	 * Set the pkUsergroupId
	 */	
	public void setPkUsergroupId(Long aValue) {
	    if (aValue==null) {
	    	ulUsergroup = null;
	    } else if (ulUsergroup == null) {
	        ulUsergroup = new com.ulane.base.model.xitong.UlUsergroup(aValue);
	        ulUsergroup.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ulUsergroup.setPkUsergroupId(aValue);
	    }
	}	


	/**
	 * 	 * @return Long
     * @hibernate.id column="UG_ROLE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getUgRoleId() {
		return this.ugRoleId;
	}
	
	/**
	 * Set the ugRoleId
	 */	
	public void setUgRoleId(Long aValue) {
		this.ugRoleId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UlUgroupRole)) {
			return false;
		}
		UlUgroupRole rhs = (UlUgroupRole) object;
		return new EqualsBuilder()
				.append(this.ugRoleId, rhs.ugRoleId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.ugRoleId)
				.append(this.appRole.getRoleId()) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("ugRoleId", this.ugRoleId)
				.toString();
	}



}
