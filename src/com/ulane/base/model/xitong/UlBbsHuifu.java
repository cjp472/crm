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
 * UlBbsHuifu Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UlBbsHuifu extends com.htsoft.core.model.BaseModel {

    protected Long bbsHuifu;
	protected String content;
	protected String reply;
	protected java.sql.Timestamp replytime;
	protected Long paertId;
	protected Long isdelete;
	protected java.sql.Timestamp updatetime;
	protected com.ulane.base.model.xitong.UlBbsHuati ulBbsHuati;
	protected java.util.Set ulBbsHuifuKnows = new java.util.HashSet(); 
	protected java.util.Set ulBbsHuifuFiles = new java.util.HashSet(); 

	/**
	 * Default Empty Constructor for class UlBbsHuifu
	 */
	public UlBbsHuifu () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UlBbsHuifu
	 */
	public UlBbsHuifu (
		 Long in_bbsHuifu
        ) {
		this.setBbsHuifu(in_bbsHuifu);
    }

	
	public com.ulane.base.model.xitong.UlBbsHuati getUlBbsHuati () {
		return ulBbsHuati;
	}	
	
	public void setUlBbsHuati (com.ulane.base.model.xitong.UlBbsHuati in_ulBbsHuati) {
		this.ulBbsHuati = in_ulBbsHuati;
	}
    

	
	
	public java.util.Set getUlBbsHuifuKnows() {
		return ulBbsHuifuKnows;
	}

	public void setUlBbsHuifuKnows(java.util.Set ulBbsHuifuKnows) {
		this.ulBbsHuifuKnows = ulBbsHuifuKnows;
	}

	public java.util.Set getUlBbsHuifuFiles() {
		return ulBbsHuifuFiles;
	}

	public void setUlBbsHuifuFiles(java.util.Set ulBbsHuifuFiles) {
		this.ulBbsHuifuFiles = ulBbsHuifuFiles;
	}

	/**
	 * 	 * @return Long
     * @hibernate.id column="BBS_HUIFU" type="java.lang.Long" generator-class="native"
	 */
	public Long getBbsHuifu() {
		return this.bbsHuifu;
	}
	
	/**
	 * Set the bbsHuifu
	 */	
	public void setBbsHuifu(Long aValue) {
		this.bbsHuifu = aValue;
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
	 * @hibernate.property column="REPLY" type="java.lang.String" length="200" not-null="false" unique="false"
	 */
	public String getReply() {
		return this.reply;
	}
	
	/**
	 * Set the reply
	 */	
	public void setReply(String aValue) {
		this.reply = aValue;
	}	

	/**
	 * 	 * @return java.sql.Timestamp
	 * @hibernate.property column="REPLYTIME" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getReplytime() {
		return this.replytime;
	}
	
	/**
	 * Set the replytime
	 */	
	public void setReplytime(java.sql.Timestamp aValue) {
		this.replytime = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="PAERT_ID" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getPaertId() {
		return this.paertId;
	}
	
	/**
	 * Set the paertId
	 */	
	public void setPaertId(Long aValue) {
		this.paertId = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="ISDELETE" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsdelete() {
		return this.isdelete;
	}
	
	/**
	 * Set the isdelete
	 */	
	public void setIsdelete(Long aValue) {
		this.isdelete = aValue;
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UlBbsHuifu)) {
			return false;
		}
		UlBbsHuifu rhs = (UlBbsHuifu) object;
		return new EqualsBuilder()
				.append(this.bbsHuifu, rhs.bbsHuifu)
						.append(this.content, rhs.content)
				.append(this.reply, rhs.reply)
				.append(this.replytime, rhs.replytime)
				.append(this.paertId, rhs.paertId)
				.append(this.isdelete, rhs.isdelete)
				.append(this.updatetime, rhs.updatetime)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bbsHuifu) 
						.append(this.content) 
				.append(this.reply) 
				.append(this.replytime) 
				.append(this.paertId) 
				.append(this.isdelete) 
				.append(this.updatetime) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bbsHuifu", this.bbsHuifu) 
						.append("content", this.content) 
				.append("reply", this.reply) 
				.append("replytime", this.replytime) 
				.append("paertId", this.paertId) 
				.append("isdelete", this.isdelete) 
				.append("updatetime", this.updatetime) 
				.toString();
	}



}
