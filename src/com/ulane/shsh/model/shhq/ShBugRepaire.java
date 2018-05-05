package com.ulane.shsh.model.shhq;
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
 * ShBugRepaire Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ShBugRepaire extends com.htsoft.core.model.BaseModel {

    protected Long repId;
	protected String applyContent;
	protected Short status;
	protected String applyPersons;
	protected java.util.Date staDat;
	protected java.util.Date finishDat;
	protected Short applyResult;
	protected String unApplyReason;
	protected Long creUserid;
	protected Long perIncharge;
	protected java.util.Date creDat;
	protected java.util.Date updDat;
	protected com.ulane.shsh.model.shhq.ShBugReport shBugReport;

	protected java.util.Set shBugRepStuffs = new java.util.HashSet();
	protected java.util.Set shRepaireFiles = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ShBugRepaire
	 */
	public ShBugRepaire () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ShBugRepaire
	 */
	public ShBugRepaire (
		 Long in_repId
        ) {
		this.setRepId(in_repId);
    }

	
	public com.ulane.shsh.model.shhq.ShBugReport getShBugReport () {
		return shBugReport;
	}	
	
	public void setShBugReport (com.ulane.shsh.model.shhq.ShBugReport in_shBugReport) {
		this.shBugReport = in_shBugReport;
	}

	public java.util.Set getShBugRepStuffs () {
		return shBugRepStuffs;
	}	
	
	public void setShBugRepStuffs (java.util.Set in_shBugRepStuffs) {
		this.shBugRepStuffs = in_shBugRepStuffs;
	}

	public java.util.Set getShRepaireFiles () {
		return shRepaireFiles;
	}	
	
	public void setShRepaireFiles (java.util.Set in_shRepaireFiles) {
		this.shRepaireFiles = in_shRepaireFiles;
	}
    

	/**
	 * 维修单内码	 * @return Long
     * @hibernate.id column="REP_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getRepId() {
		return this.repId;
	}
	
	/**
	 * Set the repId
	 */	
	public void setRepId(Long aValue) {
		this.repId = aValue;
	}	

	/**
	 * 申请内码	 * @return Long
	 */
	public Long getApplyId() {
		return this.getShBugReport()==null?null:this.getShBugReport().getApplyId();
	}
	
	/**
	 * Set the applyId
	 */	
	public void setApplyId(Long aValue) {
	    if (aValue==null) {
	    	shBugReport = null;
	    } else if (shBugReport == null) {
	        shBugReport = new com.ulane.shsh.model.shhq.ShBugReport(aValue);
	        shBugReport.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			shBugReport.setApplyId(aValue);
	    }
	}	

	/**
	 * 维修情况	 * @return String
	 * @hibernate.property column="APPLY_CONTENT" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getApplyContent() {
		return this.applyContent;
	}
	
	/**
	 * Set the applyContent
	 */	
	public void setApplyContent(String aValue) {
		this.applyContent = aValue;
	}	

	/**
	 * 状态	 * @return Short
	 * @hibernate.property column="STATUS" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * 维修参与人	 * @return String
	 * @hibernate.property column="APPLY_PERSONS" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getApplyPersons() {
		return this.applyPersons;
	}
	
	/**
	 * Set the applyPersons
	 */	
	public void setApplyPersons(String aValue) {
		this.applyPersons = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="STA_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getStaDat() {
		return this.staDat;
	}
	
	/**
	 * Set the staDat
	 */	
	public void setStaDat(java.util.Date aValue) {
		this.staDat = aValue;
	}	

	/**
	 * 完成时间	 * @return java.util.Date
	 * @hibernate.property column="FINISH_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getFinishDat() {
		return this.finishDat;
	}
	
	/**
	 * Set the finishDat
	 */	
	public void setFinishDat(java.util.Date aValue) {
		this.finishDat = aValue;
	}	

	/**
	 * 维修结果	 * @return Short
	 * @hibernate.property column="APPLY_RESULT" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getApplyResult() {
		return this.applyResult;
	}
	
	/**
	 * Set the applyResult
	 */	
	public void setApplyResult(Short aValue) {
		this.applyResult = aValue;
	}	

	/**
	 * 未维修原因	 * @return String
	 * @hibernate.property column="UN_APPLY_REASON" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getUnApplyReason() {
		return this.unApplyReason;
	}
	
	/**
	 * Set the unApplyReason
	 */	
	public void setUnApplyReason(String aValue) {
		this.unApplyReason = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CRE_USERID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCreUserid() {
		return this.creUserid;
	}
	
	/**
	 * Set the creUserid
	 */	
	public void setCreUserid(Long aValue) {
		this.creUserid = aValue;
	}	

	/**
	 * 负责人	 * @return Long
	 * @hibernate.property column="PER_INCHARGE" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getPerIncharge() {
		return this.perIncharge;
	}
	
	/**
	 * Set the perIncharge
	 */	
	public void setPerIncharge(Long aValue) {
		this.perIncharge = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}
	
	/**
	 * Set the creDat
	 */	
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
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
		if (!(object instanceof ShBugRepaire)) {
			return false;
		}
		ShBugRepaire rhs = (ShBugRepaire) object;
		return new EqualsBuilder()
				.append(this.repId, rhs.repId)
						.append(this.applyContent, rhs.applyContent)
				.append(this.status, rhs.status)
				.append(this.applyPersons, rhs.applyPersons)
				.append(this.staDat, rhs.staDat)
				.append(this.finishDat, rhs.finishDat)
				.append(this.applyResult, rhs.applyResult)
				.append(this.unApplyReason, rhs.unApplyReason)
				.append(this.creUserid, rhs.creUserid)
				.append(this.perIncharge, rhs.perIncharge)
				.append(this.creDat, rhs.creDat)
				.append(this.updDat, rhs.updDat)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.repId) 
						.append(this.applyContent) 
				.append(this.status) 
				.append(this.applyPersons) 
				.append(this.staDat) 
				.append(this.finishDat) 
				.append(this.applyResult) 
				.append(this.unApplyReason) 
				.append(this.creUserid) 
				.append(this.perIncharge) 
				.append(this.creDat) 
				.append(this.updDat) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("repId", this.repId) 
						.append("applyContent", this.applyContent) 
				.append("status", this.status) 
				.append("applyPersons", this.applyPersons) 
				.append("staDat", this.staDat) 
				.append("finishDat", this.finishDat) 
				.append("applyResult", this.applyResult) 
				.append("unApplyReason", this.unApplyReason) 
				.append("creUserid", this.creUserid) 
				.append("perIncharge", this.perIncharge) 
				.append("creDat", this.creDat) 
				.append("updDat", this.updDat) 
				.toString();
	}



}
