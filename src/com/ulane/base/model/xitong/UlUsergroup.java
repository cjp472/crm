package com.ulane.base.model.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.customer.model.fee.ObFeeRule;

/**
 * UlUsergroup Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlUsergroup extends com.htsoft.core.model.BaseModel {

    protected Long pkUsergroupId;
    protected String usergroupName;
    protected Long parentId;
    protected String comment;
    protected Long usergroupLevel;
    protected String path;
    protected Long isUpdate;
    protected Long isDelete;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String createBy;
	protected String updateBy;
	protected Long isHidden;

    protected Set<AppRole> roles = new HashSet<AppRole>();
    protected Set<AppUser> users = new HashSet<AppUser>();
    protected java.util.Set<ObCom> obComs = new java.util.HashSet<ObCom>();//活动
    protected java.util.Set<ObFeeRule> obFeeRule = new java.util.HashSet<ObFeeRule>();//佣金规则
    
	public static final short ULUSERGROUP_DELETE_NO=0;//未删除
	public static final short ULUSERGROUP_DELETE_YES=1;//已删除
	
	public static final short ULUSERGROUP_HIDDEN_NO=0;//未隐藏
	public static final short ULUSERGROUP_HIDDEN_YES=1;//已隐藏	
    public java.util.Set<ObCom> getObComs() {
		return obComs;
	}

	public void setObComs(java.util.Set<ObCom> obComs) {
		this.obComs = obComs;
	}

	public java.util.Set<ObFeeRule> getObFeeRule() {
		return obFeeRule;
	}

	public void setObFeeRule(java.util.Set<ObFeeRule> obFeeRule) {
		this.obFeeRule = obFeeRule;
	}

	/**
     * Default Empty Constructor for class UlUsergroup
     */
    public UlUsergroup () {
        super();
    }
    
    /**
     * Default Key Fields Constructor for class UlUsergroup
     */
    public UlUsergroup (
         Long in_pkUsergroupId
        ) {
        this.setPkUsergroupId(in_pkUsergroupId);
    }
    
    public Long getUsergroupLevel() {
		return usergroupLevel;
	}

	public void setUsergroupLevel(Long usergroupLevel) {
		this.usergroupLevel = usergroupLevel;
	}

	public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Set<AppRole> getRoles() {
		return roles;
	}

	public void setRoles(Set<AppRole> roles) {
		this.roles = roles;
	}

	public Set<AppUser> getUsers() {
		return users;
	}

	public void setUsers(Set<AppUser> users) {
		this.users = users;
	}

	/**
     *   * @return Long
     * @hibernate.id column="PK_USERGROUP_ID" type="java.lang.Long" generator-class="native"
     */
    public Long getPkUsergroupId() {
        return this.pkUsergroupId;
    }
    
    /**
     * Set the pkUsergroupId
     */ 
    public void setPkUsergroupId(Long aValue) {
        this.pkUsergroupId = aValue;
    }   

    /**
     *   * @return String
     * @hibernate.property column="USERGROUP_NAME" type="java.lang.String" length="20" not-null="false" unique="false"
     */
    public String getUsergroupName() {
        return this.usergroupName;
    }
    
    /**
     * Set the usergroupName
     */ 
    public void setUsergroupName(String aValue) {
        this.usergroupName = aValue;
    }   

    /**
     *   * @return Long
     * @hibernate.property column="PARENT_ID" type="java.lang.Long" length="38" not-null="false" unique="false"
     */
    public Long getParentId() {
        return this.parentId;
    }
    
    /**
     * Set the parentId
     */ 
    public void setParentId(Long aValue) {
        this.parentId = aValue;
    }   

    /**
     *   * @return String
     * @hibernate.property column="COMMENT" type="java.lang.String" length="1000" not-null="false" unique="false"
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

    public Long getIsUpdate() {
		return isUpdate;
	}

	public void setIsUpdate(Long isUpdate) {
		this.isUpdate = isUpdate;
	}

	public Long getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Long isDelete) {
		this.isDelete = isDelete;
	}

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public java.util.Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(java.util.Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Long getIsHidden() {
		return isHidden;
	}

	public void setIsHidden(Long isHidden) {
		this.isHidden = isHidden;
	}

	/**
     * @see java.lang.Object#equals(Object)
     */
    public boolean equals(Object object) {
        if (!(object instanceof UlUsergroup)) {
            return false;
        }
        UlUsergroup rhs = (UlUsergroup) object;
        return new EqualsBuilder()
                .append(this.pkUsergroupId, rhs.pkUsergroupId)
                .append(this.usergroupName, rhs.usergroupName)
                .append(this.parentId, rhs.parentId)
                .append(this.comment, rhs.comment)
                .append(this.isUpdate, rhs.isUpdate)
				.append(this.isDelete, rhs.isDelete)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.isHidden, rhs.isHidden)
                .isEquals();
    }

    /**
     * @see java.lang.Object#hashCode()
     */
    public int hashCode() {
        return new HashCodeBuilder(-82280557, -700257973)
                .append(this.pkUsergroupId) 
                .append(this.usergroupName) 
                .append(this.parentId) 
                .append(this.comment) 
				.append(this.isUpdate) 
				.append(this.isDelete) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.isHidden)
                .toHashCode();
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        return new ToStringBuilder(this)
                .append("pkUsergroupId", this.pkUsergroupId) 
                .append("usergroupName", this.usergroupName) 
                .append("parentId", this.parentId) 
                .append("comment", this.comment) 
				.append("isUpdate", this.isUpdate) 
				.append("isDelete", this.isDelete) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("isHidden", this.isHidden)
                .toString();
    }



}
