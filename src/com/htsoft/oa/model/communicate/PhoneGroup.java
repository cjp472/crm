package com.htsoft.oa.model.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.google.gson.annotations.Expose;
import com.ulane.base.model.xitong.UlEmployee;

/**
 * PhoneGroup Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class PhoneGroup extends com.htsoft.core.model.BaseModel {

	public static Short IS_PUBLIC=1;
    @Expose
	protected Long groupId;
    @Expose
	protected String groupName;
    @Expose
	protected Short isShared;
    @Expose
	protected Integer sn;
    @Expose
    protected Short isPublic;
	protected com.htsoft.oa.model.system.AppUser appUser;
	protected java.util.Set<UlEmployee> ulEmployees = new java.util.HashSet<UlEmployee>();
//    protected Set<com.htsoft.oa.model.communicate.PhoneGroup> phoneBooks=new HashSet<com.htsoft.oa.model.communicate.PhoneGroup>();
//
//	public Set<com.htsoft.oa.model.communicate.PhoneGroup> getPhoneBooks() {
//		return phoneBooks;
//	}
//
//	public void setPhoneBooks(
//			Set<com.htsoft.oa.model.communicate.PhoneGroup> phoneBooks) {
//		this.phoneBooks = phoneBooks;
//	}

	/**
	 * Default Empty Constructor for class PhoneGroup
	 */
	public PhoneGroup () {
		super();
	}
	
	public java.util.Set<UlEmployee> getUlEmployees() {
		return ulEmployees;
	}

	public void setUlEmployees(java.util.Set<UlEmployee> ulEmployees) {
		this.ulEmployees = ulEmployees;
	}

	/**
	 * Default Key Fields Constructor for class PhoneGroup
	 */
	public PhoneGroup (
		 Long in_groupId
        ) {
		this.setGroupId(in_groupId);
    }

	
	public com.htsoft.oa.model.system.AppUser getAppUser () {
		return appUser;
	}	
	
	public void setAppUser (com.htsoft.oa.model.system.AppUser in_appUser) {
		this.appUser = in_appUser;
	}

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="groupId" type="java.lang.Long" generator-class="native"
	 */
	public Long getGroupId() {
		return this.groupId;
	}
	
	/**
	 * Set the groupId
	 */	
	public void setGroupId(Long aValue) {
		this.groupId = aValue;
	}	

	/**
	 * 分组名称	 * @return String
	 * @hibernate.property column="groupName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getGroupName() {
		return this.groupName;
	}
	
	/**
	 * Set the groupName
	 * @spring.validator type="required"
	 */	
	public void setGroupName(String aValue) {
		this.groupName = aValue;
	}	

	/**
	 * 1=共享
            0=私有	 * @return Short
	 * @hibernate.property column="isShared" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getIsShared() {
		return this.isShared;
	}
	
	/**
	 * Set the isShared
	 * @spring.validator type="required"
	 */	
	public void setIsShared(Short aValue) {
		this.isShared = aValue;
	}	

	/**
	 * 	 * @return Integer
	 * @hibernate.property column="SN" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getSn() {
		return this.sn;
	}
	
	/**
	 * Set the sN
	 * @spring.validator type="required"
	 */	
	public void setSn(Integer aValue) {
		this.sn = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getUserId() {
		return this.getAppUser()==null?null:this.getAppUser().getUserId();
	}
	
	/**
	 * Set the userId
	 */	
	public void setUserId(Long aValue) {
	    if (aValue==null) {
	    	appUser = null;
	    } else if (appUser == null) {
	        appUser = new com.htsoft.oa.model.system.AppUser(aValue);
	        appUser.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			appUser.setUserId(aValue);
	    }
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PhoneGroup other = (PhoneGroup) obj;
		if (appUser == null) {
			if (other.appUser != null)
				return false;
		} else if (!appUser.equals(other.appUser))
			return false;
		if (groupId == null) {
			if (other.groupId != null)
				return false;
		} else if (!groupId.equals(other.groupId))
			return false;
		if (groupName == null) {
			if (other.groupName != null)
				return false;
		} else if (!groupName.equals(other.groupName))
			return false;
		if (isPublic == null) {
			if (other.isPublic != null)
				return false;
		} else if (!isPublic.equals(other.isPublic))
			return false;
		if (isShared == null) {
			if (other.isShared != null)
				return false;
		} else if (!isShared.equals(other.isShared))
			return false;
		if (sn == null) {
			if (other.sn != null)
				return false;
		} else if (!sn.equals(other.sn))
			return false;
		if (ulEmployees == null) {
			if (other.ulEmployees != null)
				return false;
		} else if (!ulEmployees.equals(other.ulEmployees))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((appUser == null) ? 0 : appUser.hashCode());
		result = prime * result + ((groupId == null) ? 0 : groupId.hashCode());
		result = prime * result
				+ ((groupName == null) ? 0 : groupName.hashCode());
		result = prime * result
				+ ((isPublic == null) ? 0 : isPublic.hashCode());
		result = prime * result
				+ ((isShared == null) ? 0 : isShared.hashCode());
		result = prime * result + ((sn == null) ? 0 : sn.hashCode());
		result = prime * result
				+ ((ulEmployees == null) ? 0 : ulEmployees.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "PhoneGroup [appUser=" + appUser + ", groupId=" + groupId
				+ ", groupName=" + groupName + ", isPublic=" + isPublic
				+ ", isShared=" + isShared + ", sn=" + sn + ", ulEmployees="
				+ ulEmployees + "]";
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "groupId";
	}
	
	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	public Long getId() {
		return groupId;
	}

	public Short getIsPublic() {
		return isPublic;
	}

	public void setIsPublic(Short isPublic) {
		this.isPublic = isPublic;
	}
	
	

}
