package com.ulane.running.model.qucon;
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
 * QcTempReObj Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcTempReObj extends com.htsoft.core.model.BaseModel {

    protected Long tempReObjId;
	protected Long usrId;
	protected Long usrGrpId;
	protected com.ulane.running.model.qucon.QcTempRelease qcTempRelease;


	/**
	 * Default Empty Constructor for class QcTempReObj
	 */
	public QcTempReObj () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcTempReObj
	 */
	public QcTempReObj (
		 Long in_tempReObjId
        ) {
		this.setTempReObjId(in_tempReObjId);
    }

	
	public com.ulane.running.model.qucon.QcTempRelease getQcTempRelease () {
		return qcTempRelease;
	}	
	
	public void setQcTempRelease (com.ulane.running.model.qucon.QcTempRelease in_qcTempRelease) {
		this.qcTempRelease = in_qcTempRelease;
	}
    

	/**
	 * 考评模板发布对象内码	 * @return Long
     * @hibernate.id column="TEMP_RE_OBJ_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTempReObjId() {
		return this.tempReObjId;
	}
	
	/**
	 * Set the tempReObjId
	 */	
	public void setTempReObjId(Long aValue) {
		this.tempReObjId = aValue;
	}	

	/**
	 * 发布模板ID	 * @return Long
	 */
	public Long getTempReleId() {
		return this.getQcTempRelease()==null?null:this.getQcTempRelease().getTempReleId();
	}
	
	/**
	 * Set the tempReleId
	 */	
	public void setTempReleId(Long aValue) {
	    if (aValue==null) {
	    	qcTempRelease = null;
	    } else if (qcTempRelease == null) {
	        qcTempRelease = new com.ulane.running.model.qucon.QcTempRelease(aValue);
	        qcTempRelease.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			qcTempRelease.setTempReleId(aValue);
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
		if (!(object instanceof QcTempReObj)) {
			return false;
		}
		QcTempReObj rhs = (QcTempReObj) object;
		return new EqualsBuilder()
				.append(this.tempReObjId, rhs.tempReObjId)
						.append(this.usrId, rhs.usrId)
				.append(this.usrGrpId, rhs.usrGrpId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.tempReObjId) 
						.append(this.usrId) 
				.append(this.usrGrpId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("tempReObjId", this.tempReObjId) 
						.append("usrId", this.usrId) 
				.append("usrGrpId", this.usrGrpId) 
				.toString();
	}



}
