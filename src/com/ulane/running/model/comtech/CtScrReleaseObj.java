package com.ulane.running.model.comtech;
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
 * CtScrReleaseObj Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CtScrReleaseObj extends com.htsoft.core.model.BaseModel {

    protected Long scrReleaseObjId;
	protected Long usrId;
	protected Long usrGrpId;
	protected com.ulane.running.model.comtech.CtScrRelease ctScrRelease;


	/**
	 * Default Empty Constructor for class CtScrReleaseObj
	 */
	public CtScrReleaseObj () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CtScrReleaseObj
	 */
	public CtScrReleaseObj (
		 Long in_scrReleaseObjId
        ) {
		this.setScrReleaseObjId(in_scrReleaseObjId);
    }

	
	public com.ulane.running.model.comtech.CtScrRelease getCtScrRelease () {
		return ctScrRelease;
	}	
	
	public void setCtScrRelease (com.ulane.running.model.comtech.CtScrRelease in_ctScrRelease) {
		this.ctScrRelease = in_ctScrRelease;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="SCR_RELEASE_OBJ_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getScrReleaseObjId() {
		return this.scrReleaseObjId;
	}
	
	/**
	 * Set the scrReleaseObjId
	 */	
	public void setScrReleaseObjId(Long aValue) {
		this.scrReleaseObjId = aValue;
	}	

	/**
	 * 话术	 * @return Long
	 */
	public Long getScrId() {
		return this.getCtScrRelease()==null?null:this.getCtScrRelease().getScrId();
	}
	
	/**
	 * Set the scrId
	 */	
	public void setScrId(Long aValue) {
	    if (aValue==null) {
	    	ctScrRelease = null;
	    } else if (ctScrRelease == null) {
	        ctScrRelease = new com.ulane.running.model.comtech.CtScrRelease(aValue);
	        ctScrRelease.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ctScrRelease.setScrId(aValue);
	    }
	}	

	/**
	 * 用户	 * @return Long
	 * @hibernate.property column="USR_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUsrId() {
		return this.usrId;
	}
	
	/**
	 * Set the usrId
	 */	
	public void setUsrId(Long aValue) {
		this.usrId = aValue;
	}	

	/**
	 * 用户组	 * @return Long
	 * @hibernate.property column="USR_GRP_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUsrGrpId() {
		return this.usrGrpId;
	}
	
	/**
	 * Set the usrGrpId
	 */	
	public void setUsrGrpId(Long aValue) {
		this.usrGrpId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CtScrReleaseObj)) {
			return false;
		}
		CtScrReleaseObj rhs = (CtScrReleaseObj) object;
		return new EqualsBuilder()
				.append(this.scrReleaseObjId, rhs.scrReleaseObjId)
						.append(this.usrId, rhs.usrId)
				.append(this.usrGrpId, rhs.usrGrpId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.scrReleaseObjId) 
						.append(this.usrId) 
				.append(this.usrGrpId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("scrReleaseObjId", this.scrReleaseObjId) 
						.append("usrId", this.usrId) 
				.append("usrGrpId", this.usrGrpId) 
				.toString();
	}



}
