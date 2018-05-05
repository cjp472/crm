package com.htsoft.oa.model.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.google.gson.annotations.Expose;
import com.htsoft.oa.model.system.AppUser;

/**
 * News Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ������
 */
public class News extends com.htsoft.core.model.BaseModel {

	@Expose
    protected Long newsId;
	
	@Expose
    protected Long sectionId;
	@Expose
	protected String subjectIcon;
	@Expose
	protected String subject;
	@Expose
	protected String author;
	@Expose
	protected java.util.Date createtime;
	@Expose
	protected java.util.Date expTime;
	@Expose
	protected Integer replyCounts;
	@Expose
	protected Integer viewCounts;
	@Expose
	protected String issuer;
	@Expose
	protected String content;
	@Expose
	protected java.util.Date updateTime;
	@Expose
	protected Short status;
	@Expose
	protected Short isDeskImage;
	@Expose
	protected Short isNotice;
	@Expose
	protected Integer sn;
	@Expose
	protected com.htsoft.oa.model.info.Section section;
	@Expose
	protected AppUser appUser;
	@Expose
	protected java.util.Set newsComments = new java.util.HashSet();
	
	protected String joinerGroup;											//接收组
	protected String joiner;												//接收人

	/**
	 * Default Empty Constructor for class News
	 */
	public News () {
		super();
	}
	
	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	public String getJoinerGroup() {
		return joinerGroup;
	}

	public void setJoinerGroup(String joinerGroup) {
		this.joinerGroup = joinerGroup;
	}

	public String getJoiner() {
		return joiner;
	}

	public void setJoiner(String joiner) {
		this.joiner = joiner;
	}

	/**
	 * Default Key Fields Constructor for class News
	 */
	public News (
		 Long in_newsId
        ) {
		this.setNewsId(in_newsId);
    }

	
	public com.htsoft.oa.model.info.Section getSection () {
		return section;
	}	
	
	public void setSection (com.htsoft.oa.model.info.Section in_section) {
		this.section = in_section;
	}

	public java.util.Set getNewsComments () {
		return newsComments;
	}	
	
	public void setNewsComments (java.util.Set in_newsComments) {
		this.newsComments = in_newsComments;
	}
    

	/**
	 * ID	 * @return Long
     * @hibernate.id column="newsId" type="java.lang.Long" generator-class="native"
	 */
	public Long getNewsId() {
		return this.newsId;
	}
	
	/**
	 * Set the newsId
	 */	
	public void setNewsId(Long aValue) {
		this.newsId = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getSectionId() {
		return this.getSection()==null?null:this.getSection().getSectionId();
	}
	
	/**
	 * Set the sectionId
	 */	
	public void setSectionId(Long aValue) {
	    if (aValue==null) {
	    	section = null;
	    } else if (section == null) {
	        section = new com.htsoft.oa.model.info.Section(aValue);
	        section.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			section.setSectionId(aValue);
	    }
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="subjectIcon" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getSubjectIcon() {
		return this.subjectIcon;
	}
	
	/**
	 * Set the subjectIcon
	 */	
	public void setSubjectIcon(String aValue) {
		this.subjectIcon = aValue;
	}	

	/**
	 * 新闻标题	 * @return String
	 * @hibernate.property column="subject" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getSubject() {
		return this.subject;
	}
	
	/**
	 * Set the subject
	 * @spring.validator type="required"
	 */	
	public void setSubject(String aValue) {
		this.subject = aValue;
	}	

	/**
	 * 作者	 * @return String
	 * @hibernate.property column="author" type="java.lang.String" length="32" not-null="true" unique="false"
	 */
	public String getAuthor() {
		return this.author;
	}
	
	/**
	 * Set the author
	 * @spring.validator type="required"
	 */	
	public void setAuthor(String aValue) {
		this.author = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="createtime" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getCreatetime() {
		return this.createtime;
	}
	
	/**
	 * Set the createtime
	 * @spring.validator type="required"
	 */	
	public void setCreatetime(java.util.Date aValue) {
		this.createtime = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="expTime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getExpTime() {
		return this.expTime;
	}
	
	/**
	 * Set the expTime
	 */	
	public void setExpTime(java.util.Date aValue) {
		this.expTime = aValue;
	}	

	/**
	 * 	 * @return Integer
	 * @hibernate.property column="replyCounts" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getReplyCounts() {
		return this.replyCounts;
	}
	
	/**
	 * Set the replyCounts
	 */	
	public void setReplyCounts(Integer aValue) {
		this.replyCounts = aValue;
	}	

	/**
	 * 浏览数	 * @return Integer
	 * @hibernate.property column="viewCounts" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getViewCounts() {
		return this.viewCounts;
	}
	
	/**
	 * Set the viewCounts
	 */	
	public void setViewCounts(Integer aValue) {
		this.viewCounts = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="issuer" type="java.lang.String" length="32" not-null="true" unique="false"
	 */
	public String getIssuer() {
		return this.issuer;
	}
	
	/**
	 * Set the issuer
	 * @spring.validator type="required"
	 */	
	public void setIssuer(String aValue) {
		this.issuer = aValue;
	}	

	/**
	 * 内容	 * @return String
	 * @hibernate.property column="content" type="java.lang.String" length="65535" not-null="true" unique="false"
	 */
	public String getContent() {
		return this.content;
	}
	
	/**
	 * Set the content
	 * @spring.validator type="required"
	 */	
	public void setContent(String aValue) {
		this.content = aValue;
	}	

	/**
	 * 	 * @return java.util.Date
	 * @hibernate.property column="updateTime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}
	
	/**
	 * Set the updateTime
	 */	
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}	

	/**
	 * 
            0=待审核
            1=审核通过	 * @return Short
	 * @hibernate.property column="status" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 * @spring.validator type="required"
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * 是否为桌面新闻	 * @return Short
	 * @hibernate.property column="isDeskImage" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getIsDeskImage() {
		return this.isDeskImage;
	}
	
	/**
	 * Set the isDeskImage
	 */	
	public void setIsDeskImage(Short aValue) {
		this.isDeskImage = aValue;
	}	

	/**
	 * 	 * @return Short
	 * @hibernate.property column="isNotice" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getIsNotice() {
		return this.isNotice;
	}
	
	/**
	 * Set the isNotice
	 */	
	public void setIsNotice(Short aValue) {
		this.isNotice = aValue;
	}	

	/**
	 * 	 * @return Integer
	 * @hibernate.property column="sn" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getSn() {
		return this.sn;
	}
	
	/**
	 * Set the sn
	 */	
	public void setSn(Integer aValue) {
		this.sn = aValue;
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		News other = (News) obj;
		if (appUser == null) {
			if (other.appUser != null)
				return false;
		} else if (!appUser.equals(other.appUser))
			return false;
		if (author == null) {
			if (other.author != null)
				return false;
		} else if (!author.equals(other.author))
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
		if (expTime == null) {
			if (other.expTime != null)
				return false;
		} else if (!expTime.equals(other.expTime))
			return false;
		if (isDeskImage == null) {
			if (other.isDeskImage != null)
				return false;
		} else if (!isDeskImage.equals(other.isDeskImage))
			return false;
		if (isNotice == null) {
			if (other.isNotice != null)
				return false;
		} else if (!isNotice.equals(other.isNotice))
			return false;
		if (issuer == null) {
			if (other.issuer != null)
				return false;
		} else if (!issuer.equals(other.issuer))
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
		if (newsComments == null) {
			if (other.newsComments != null)
				return false;
		} else if (!newsComments.equals(other.newsComments))
			return false;
		if (newsId == null) {
			if (other.newsId != null)
				return false;
		} else if (!newsId.equals(other.newsId))
			return false;
		if (replyCounts == null) {
			if (other.replyCounts != null)
				return false;
		} else if (!replyCounts.equals(other.replyCounts))
			return false;
		if (section == null) {
			if (other.section != null)
				return false;
		} else if (!section.equals(other.section))
			return false;
		if (sn == null) {
			if (other.sn != null)
				return false;
		} else if (!sn.equals(other.sn))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (subject == null) {
			if (other.subject != null)
				return false;
		} else if (!subject.equals(other.subject))
			return false;
		if (subjectIcon == null) {
			if (other.subjectIcon != null)
				return false;
		} else if (!subjectIcon.equals(other.subjectIcon))
			return false;
		if (updateTime == null) {
			if (other.updateTime != null)
				return false;
		} else if (!updateTime.equals(other.updateTime))
			return false;
		if (viewCounts == null) {
			if (other.viewCounts != null)
				return false;
		} else if (!viewCounts.equals(other.viewCounts))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((appUser == null) ? 0 : appUser.hashCode());
		result = prime * result + ((author == null) ? 0 : author.hashCode());
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result
				+ ((createtime == null) ? 0 : createtime.hashCode());
		result = prime * result + ((expTime == null) ? 0 : expTime.hashCode());
		result = prime * result
				+ ((isDeskImage == null) ? 0 : isDeskImage.hashCode());
		result = prime * result
				+ ((isNotice == null) ? 0 : isNotice.hashCode());
		result = prime * result + ((issuer == null) ? 0 : issuer.hashCode());
		result = prime * result + ((joiner == null) ? 0 : joiner.hashCode());
		result = prime * result
				+ ((joinerGroup == null) ? 0 : joinerGroup.hashCode());
		result = prime * result
				+ ((newsComments == null) ? 0 : newsComments.hashCode());
		result = prime * result + ((newsId == null) ? 0 : newsId.hashCode());
		result = prime * result
				+ ((replyCounts == null) ? 0 : replyCounts.hashCode());
		result = prime * result + ((section == null) ? 0 : section.hashCode());
		result = prime * result + ((sn == null) ? 0 : sn.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((subject == null) ? 0 : subject.hashCode());
		result = prime * result
				+ ((subjectIcon == null) ? 0 : subjectIcon.hashCode());
		result = prime * result
				+ ((updateTime == null) ? 0 : updateTime.hashCode());
		result = prime * result
				+ ((viewCounts == null) ? 0 : viewCounts.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "News [appUser=" + appUser + ", author=" + author + ", content="
				+ content + ", createtime=" + createtime + ", expTime="
				+ expTime + ", isDeskImage=" + isDeskImage + ", isNotice="
				+ isNotice + ", issuer=" + issuer + ", joiner=" + joiner
				+ ", joinerGroup=" + joinerGroup + ", newsComments="
				+ newsComments + ", newsId=" + newsId + ", replyCounts="
				+ replyCounts + ", section=" + section + ", sn=" + sn
				+ ", status=" + status + ", subject=" + subject
				+ ", subjectIcon=" + subjectIcon + ", updateTime=" + updateTime
				+ ", viewCounts=" + viewCounts + "]";
	}



}
