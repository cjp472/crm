package com.ulane.running.model.pap;
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
 * PapReleaseObj Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class PapReleaseObj extends com.htsoft.core.model.BaseModel {

    protected Long releaseObjId;
	protected Long usrId;
	protected Long usrGrpId;
	protected com.ulane.running.model.pap.PapRelease papRelease;


	/**
	 * Default Empty Constructor for class PapReleaseObj
	 */
	public PapReleaseObj () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PapReleaseObj
	 */
	public PapReleaseObj (
		 Long in_releaseObjId
        ) {
		this.setReleaseObjId(in_releaseObjId);
    }

	
	public com.ulane.running.model.pap.PapRelease getPapRelease () {
		return papRelease;
	}	
	
	public void setPapRelease (com.ulane.running.model.pap.PapRelease in_papRelease) {
		this.papRelease = in_papRelease;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="RELEASE_OBJ_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getReleaseObjId() {
		return this.releaseObjId;
	}
	
	/**
	 * Set the releaseObjId
	 */	
	public void setReleaseObjId(Long aValue) {
		this.releaseObjId = aValue;
	}	

	/**
	 * 问卷发布ID	 * @return Long
	 */
	public Long getPapId() {
		return this.getPapRelease()==null?null:this.getPapRelease().getPapId();
	}
	
	/**
	 * Set the papId
	 */	
	public void setPapId(Long aValue) {
	    if (aValue==null) {
	    	papRelease = null;
	    } else if (papRelease == null) {
	        papRelease = new com.ulane.running.model.pap.PapRelease(aValue);
	        papRelease.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			papRelease.setPapId(aValue);
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
		if (!(object instanceof PapReleaseObj)) {
			return false;
		}
		PapReleaseObj rhs = (PapReleaseObj) object;
		return new EqualsBuilder()
				.append(this.releaseObjId, rhs.releaseObjId)
						.append(this.usrId, rhs.usrId)
				.append(this.usrGrpId, rhs.usrGrpId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.releaseObjId) 
						.append(this.usrId) 
				.append(this.usrGrpId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("releaseObjId", this.releaseObjId) 
						.append("usrId", this.usrId) 
				.append("usrGrpId", this.usrGrpId) 
				.toString();
	}



}
