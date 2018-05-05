package com.ulane.base.model.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;

/**
 * UlBbsHuati Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlBbsHuati extends com.htsoft.core.model.BaseModel {

    protected Long bbsHuatiId;
	protected String title;
	protected Long businessType;
	protected String content;
	protected String attachmentUrl;
	protected String joinerGroup;
	protected String joiner;
	protected String updateby;
	protected java.sql.Timestamp updatetime;
	protected java.sql.Timestamp createtime;
//	protected String createby;
	protected Long status;
	protected Long liulanshu;
	protected Long huifushu;
	protected AppUser appUser;
	
	protected Set<FileAttach> ulBbsHuatiFile = new HashSet<FileAttach>();
	protected java.util.Set ulBbsHuifus = new java.util.HashSet();
	protected java.util.Set ulBbsJieshous = new java.util.HashSet();

	
	
	public Set<FileAttach> getUlBbsHuatiFile() {
		return ulBbsHuatiFile;
	}

	public void setUlBbsHuatiFile(Set<FileAttach> ulBbsHuatiFile) {
		this.ulBbsHuatiFile = ulBbsHuatiFile;
	}

	public Long getLiulanshu() {
		return liulanshu;
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	public void setLiulanshu(Long liulanshu) {
		this.liulanshu = liulanshu;
	}

	public Long getHuifushu() {
		if(huifushu==null){
			huifushu=0l;
		}
		return huifushu;
	}

	public void setHuifushu(Long huifushu) {
		this.huifushu = huifushu;
	}

	/**
	 * Default Empty Constructor for class UlBbsHuati
	 */
	public UlBbsHuati () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UlBbsHuati
	 */
	public UlBbsHuati (
		 Long in_bbsHuatiId
        ) {
		this.setBbsHuatiId(in_bbsHuatiId);
    }


	public java.util.Set getUlBbsHuifus () {
		return ulBbsHuifus;
	}	
	
	public void setUlBbsHuifus (java.util.Set in_ulBbsHuifus) {
		this.ulBbsHuifus = in_ulBbsHuifus;
	}

	public java.util.Set getUlBbsJieshous () {
		return ulBbsJieshous;
	}	
	
	public void setUlBbsJieshous (java.util.Set in_ulBbsJieshous) {
		this.ulBbsJieshous = in_ulBbsJieshous;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="BBS_HUATI_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBbsHuatiId() {
		return this.bbsHuatiId;
	}
	
	/**
	 * Set the bbsHuatiId
	 */	
	public void setBbsHuatiId(Long aValue) {
		this.bbsHuatiId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="TITLE" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getTitle() {
		return this.title;
	}
	
	/**
	 * Set the title
	 */	
	public void setTitle(String aValue) {
		this.title = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="BUSINESS_TYPE" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getBusinessType() {
		return this.businessType;
	}
	
	/**
	 * Set the businessType
	 */	
	public void setBusinessType(Long aValue) {
		this.businessType = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="CONTENT" type="java.lang.String" length="1000" not-null="false" unique="false"
	 */
	public String getContent() {
		return this.content;
	}
	
	/**
	 * Set the content
	 */	
	public void setContent(String aValue) {
		this.content = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="ATTACHMENT_URL" type="java.lang.String" length="200" not-null="false" unique="false"
	 */
	public String getAttachmentUrl() {
		return this.attachmentUrl;
	}
	
	/**
	 * Set the attachmentUrl
	 */	
	public void setAttachmentUrl(String aValue) {
		this.attachmentUrl = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="JOINER_GROUP" type="java.lang.String" length="200" not-null="false" unique="false"
	 */
	public String getJoinerGroup() {
		return this.joinerGroup;
	}
	
	/**
	 * Set the joinerGroup
	 */	
	public void setJoinerGroup(String aValue) {
		this.joinerGroup = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="JOINER" type="java.lang.String" length="200" not-null="false" unique="false"
	 */
	public String getJoiner() {
		return this.joiner;
	}
	
	/**
	 * Set the joiner
	 */	
	public void setJoiner(String aValue) {
		this.joiner = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="UPDATEBY" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getUpdateby() {
		return this.updateby;
	}
	
	/**
	 * Set the updateby
	 */	
	public void setUpdateby(String aValue) {
		this.updateby = aValue;
	}	

	/**
	 * 	 * @return java.sql.Timestamp
	 * @hibernate.property column="UPDATETIME" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getUpdatetime() {
		return this.updatetime;
	}
	
	/**
	 * Set the updatetime
	 */	
	public void setUpdatetime(java.sql.Timestamp aValue) {
		this.updatetime = aValue;
	}	

	/**
	 * 	 * @return java.sql.Timestamp
	 * @hibernate.property column="CREATETIME" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getCreatetime() {
		return this.createtime;
	}
	
	/**
	 * Set the createtime
	 */	
	public void setCreatetime(java.sql.Timestamp aValue) {
		this.createtime = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="CREATEBY" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
//	public String getCreateby() {
//		return this.createby;
//	}
//	
//	/**
//	 * Set the createby
//	 */	
//	public void setCreateby(String aValue) {
//		this.createby = aValue;
//	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="STATUS" type="java.lang.Long" length="38" not-null="false" unique="false"
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

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UlBbsHuati other = (UlBbsHuati) obj;
		if (appUser == null) {
			if (other.appUser != null)
				return false;
		} else if (!appUser.equals(other.appUser))
			return false;
		if (attachmentUrl == null) {
			if (other.attachmentUrl != null)
				return false;
		} else if (!attachmentUrl.equals(other.attachmentUrl))
			return false;
		if (bbsHuatiId == null) {
			if (other.bbsHuatiId != null)
				return false;
		} else if (!bbsHuatiId.equals(other.bbsHuatiId))
			return false;
		if (businessType == null) {
			if (other.businessType != null)
				return false;
		} else if (!businessType.equals(other.businessType))
			return false;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		if (createtime == null) {
			if (other.createtime != null)
				return false;
		} else if (!createtime.equals(other.createtime))
			return false;
		if (huifushu == null) {
			if (other.huifushu != null)
				return false;
		} else if (!huifushu.equals(other.huifushu))
			return false;
		if (joiner == null) {
			if (other.joiner != null)
				return false;
		} else if (!joiner.equals(other.joiner))
			return false;
		if (joinerGroup == null) {
			if (other.joinerGroup != null)
				return false;
		} else if (!joinerGroup.equals(other.joinerGroup))
			return false;
		if (liulanshu == null) {
			if (other.liulanshu != null)
				return false;
		} else if (!liulanshu.equals(other.liulanshu))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		if (updateby == null) {
			if (other.updateby != null)
				return false;
		} else if (!updateby.equals(other.updateby))
			return false;
		if (updatetime == null) {
			if (other.updatetime != null)
				return false;
		} else if (!updatetime.equals(other.updatetime))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((appUser == null) ? 0 : appUser.hashCode());
		result = prime * result
				+ ((attachmentUrl == null) ? 0 : attachmentUrl.hashCode());
		result = prime * result
				+ ((bbsHuatiId == null) ? 0 : bbsHuatiId.hashCode());
		result = prime * result
				+ ((businessType == null) ? 0 : businessType.hashCode());
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result
				+ ((createtime == null) ? 0 : createtime.hashCode());
		result = prime * result
				+ ((huifushu == null) ? 0 : huifushu.hashCode());
		result = prime * result + ((joiner == null) ? 0 : joiner.hashCode());
		result = prime * result
				+ ((joinerGroup == null) ? 0 : joinerGroup.hashCode());
		result = prime * result
				+ ((liulanshu == null) ? 0 : liulanshu.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		result = prime * result
				+ ((updateby == null) ? 0 : updateby.hashCode());
		result = prime * result
				+ ((updatetime == null) ? 0 : updatetime.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UlBbsHuati [appUser=" + appUser + ", attachmentUrl="
				+ attachmentUrl + ", bbsHuatiId=" + bbsHuatiId
				+ ", businessType=" + businessType + ", content=" + content
				+ ", createtime=" + createtime + ", huifushu=" + huifushu
				+ ", joiner=" + joiner + ", joinerGroup=" + joinerGroup
				+ ", liulanshu=" + liulanshu + ", status=" + status
				+ ", title=" + title + ", updateby=" + updateby
				+ ", updatetime=" + updatetime + "]";
	}



}
