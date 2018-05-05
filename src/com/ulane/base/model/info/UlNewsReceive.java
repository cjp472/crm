package com.ulane.base.model.info;
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

import com.htsoft.oa.model.system.AppUser;

/**
 * UlNewsReceive Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlNewsReceive extends com.htsoft.core.model.BaseModel {

    protected Long receiveId;
	protected AppUser appUser;   //receiver    接收人
	protected java.sql.Timestamp receivetime;
	protected java.sql.Timestamp readtime;
	protected Long readstatus;
	protected com.htsoft.oa.model.info.News news;


	/**
	 * Default Empty Constructor for class UlNewsReceive
	 */
	public UlNewsReceive () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UlNewsReceive
	 */
	public UlNewsReceive (
		 Long in_receiveId
        ) {
		this.setReceiveId(in_receiveId);
    }

	
	public com.htsoft.oa.model.info.News getNews () {
		return news;
	}	
	
	public void setNews (com.htsoft.oa.model.info.News in_news) {
		this.news = in_news;
	}
    
	
	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="RECEIVE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getReceiveId() {
		return this.receiveId;
	}
	
	/**
	 * Set the receiveId
	 */	
	public void setReceiveId(Long aValue) {
		this.receiveId = aValue;
	}	

	/**
	 * 新闻公告内码	 * @return Long
	 */
	public Long getNewsId() {
		return this.getNews()==null?null:this.getNews().getNewsId();
	}
	
	/**
	 * Set the newsId
	 */	
	public void setNewsId(Long aValue) {
	    if (aValue==null) {
	    	news = null;
	    } else if (news == null) {
	        news = new com.htsoft.oa.model.info.News(aValue);
	        news.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			news.setNewsId(aValue);
	    }
	}	



	/**
	 * 接收时间	 * @return java.sql.Timestamp
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
	 * 阅读事件	 * @return java.sql.Timestamp
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
	 * 阅读状态  0:未阅读 1:已阅读	 * @return Long
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
		UlNewsReceive other = (UlNewsReceive) obj;
		if (appUser == null) {
			if (other.appUser != null)
				return false;
		} else if (!appUser.equals(other.appUser))
			return false;
		if (news == null) {
			if (other.news != null)
				return false;
		} else if (!news.equals(other.news))
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
		if (receiveId == null) {
			if (other.receiveId != null)
				return false;
		} else if (!receiveId.equals(other.receiveId))
			return false;
		if (receivetime == null) {
			if (other.receivetime != null)
				return false;
		} else if (!receivetime.equals(other.receivetime))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((appUser == null) ? 0 : appUser.hashCode());
		result = prime * result + ((news == null) ? 0 : news.hashCode());
		result = prime * result
				+ ((readstatus == null) ? 0 : readstatus.hashCode());
		result = prime * result
				+ ((readtime == null) ? 0 : readtime.hashCode());
		result = prime * result
				+ ((receiveId == null) ? 0 : receiveId.hashCode());
		result = prime * result
				+ ((receivetime == null) ? 0 : receivetime.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UlNewsReceive [appUser=" + appUser + ", news=" + news
				+ ", readstatus=" + readstatus + ", readtime=" + readtime
				+ ", receiveId=" + receiveId + ", receivetime=" + receivetime
				+ "]";
	}



}
