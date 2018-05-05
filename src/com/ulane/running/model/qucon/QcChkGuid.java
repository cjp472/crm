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
 * QcChkGuid Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcChkGuid extends com.htsoft.core.model.BaseModel {

    protected Long chkGuidId;
	protected Long guidUseId;
	protected String guidContent;
	protected String guidRemark;
	protected Long creUseId;
	protected java.util.Date creDat;
	protected Long updUseId;
	protected java.util.Date updDat;
	protected com.ulane.running.model.qucon.QcCheck qcCheck;
//  课件暂时不存咋
//	protected java.util.Set qcChkGuidCoursewares = new java.util.HashSet();
	protected java.util.Set qcChkGuidFiles = new java.util.HashSet();
	protected java.util.Set qcChkGuidKms = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class QcChkGuid
	 */
	public QcChkGuid () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcChkGuid
	 */
	public QcChkGuid (
		 Long in_chkGuidId
        ) {
		this.setChkGuidId(in_chkGuidId);
    }

	
	public com.ulane.running.model.qucon.QcCheck getQcCheck () {
		return qcCheck;
	}	
	
	public void setQcCheck (com.ulane.running.model.qucon.QcCheck in_qcCheck) {
		this.qcCheck = in_qcCheck;
	}

//	public java.util.Set getQcChkGuidCoursewares () {
//		return qcChkGuidCoursewares;
//	}	
//	
//	public void setQcChkGuidCoursewares (java.util.Set in_qcChkGuidCoursewares) {
//		this.qcChkGuidCoursewares = in_qcChkGuidCoursewares;
//	}

	public java.util.Set getQcChkGuidFiles () {
		return qcChkGuidFiles;
	}	
	
	public void setQcChkGuidFiles (java.util.Set in_qcChkGuidFiles) {
		this.qcChkGuidFiles = in_qcChkGuidFiles;
	}

	public java.util.Set getQcChkGuidKms () {
		return qcChkGuidKms;
	}	
	
	public void setQcChkGuidKms (java.util.Set in_qcChkGuidKms) {
		this.qcChkGuidKms = in_qcChkGuidKms;
	}
    

	/**
	 * 考核辅导内码	 * @return Long
     * @hibernate.id column="CHK_GUID_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getChkGuidId() {
		return this.chkGuidId;
	}
	
	/**
	 * Set the chkGuidId
	 */	
	public void setChkGuidId(Long aValue) {
		this.chkGuidId = aValue;
	}	

	/**
	 * 考核结果内码	 * @return Long
	 */
	public Long getChkId() {
		return this.getQcCheck()==null?null:this.getQcCheck().getChkId();
	}
	
	/**
	 * Set the chkId
	 */	
	public void setChkId(Long aValue) {
	    if (aValue==null) {
	    	qcCheck = null;
	    } else if (qcCheck == null) {
	        qcCheck = new com.ulane.running.model.qucon.QcCheck(aValue);
	        qcCheck.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			qcCheck.setChkId(aValue);
	    }
	}	

	/**
	 * 辅导人	 * @return Long
	 * @hibernate.property column="GUID_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getGuidUseId() {
		return this.guidUseId;
	}
	
	/**
	 * Set the guidUseId
	 * @spring.validator type="required"
	 */	
	public void setGuidUseId(Long aValue) {
		this.guidUseId = aValue;
	}	

	/**
	 * 辅导说明	 * @return String
	 * @hibernate.property column="GUID_CONTENT" type="java.lang.String" length="2048" not-null="true" unique="false"
	 */
	public String getGuidContent() {
		return this.guidContent;
	}
	
	/**
	 * Set the guidContent
	 * @spring.validator type="required"
	 */	
	public void setGuidContent(String aValue) {
		this.guidContent = aValue;
	}	

	/**
	 * 辅导备注	 * @return String
	 * @hibernate.property column="GUID_REMARK" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getGuidRemark() {
		return this.guidRemark;
	}
	
	/**
	 * Set the guidRemark
	 */	
	public void setGuidRemark(String aValue) {
		this.guidRemark = aValue;
	}	

	/**
	 * 创建人ID	 * @return Long
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getCreUseId() {
		return this.creUseId;
	}
	
	/**
	 * Set the creUseId
	 * @spring.validator type="required"
	 */	
	public void setCreUseId(Long aValue) {
		this.creUseId = aValue;
	}	

	/**
	 * 创建日期	 * @return java.util.Date
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}
	
	/**
	 * Set the creDat
	 * @spring.validator type="required"
	 */	
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}	

	/**
	 * 修改人ID	 * @return Long
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdUseId() {
		return this.updUseId;
	}
	
	/**
	 * Set the updUseId
	 */	
	public void setUpdUseId(Long aValue) {
		this.updUseId = aValue;
	}	

	/**
	 * 修改日期	 * @return java.util.Date
	 * @hibernate.property column="UPD_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdDat() {
		return this.updDat;
	}
	
	/**
	 * Set the updDat
	 */	
	public void setUpdDat(java.util.Date aValue) {
		this.updDat = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcChkGuid)) {
			return false;
		}
		QcChkGuid rhs = (QcChkGuid) object;
		return new EqualsBuilder()
				.append(this.chkGuidId, rhs.chkGuidId)
						.append(this.guidUseId, rhs.guidUseId)
				.append(this.guidContent, rhs.guidContent)
				.append(this.guidRemark, rhs.guidRemark)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creDat, rhs.creDat)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updDat, rhs.updDat)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.chkGuidId) 
						.append(this.guidUseId) 
				.append(this.guidContent) 
				.append(this.guidRemark) 
				.append(this.creUseId) 
				.append(this.creDat) 
				.append(this.updUseId) 
				.append(this.updDat) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("chkGuidId", this.chkGuidId) 
						.append("guidUseId", this.guidUseId) 
				.append("guidContent", this.guidContent) 
				.append("guidRemark", this.guidRemark) 
				.append("creUseId", this.creUseId) 
				.append("creDat", this.creDat) 
				.append("updUseId", this.updUseId) 
				.append("updDat", this.updDat) 
				.toString();
	}



}
