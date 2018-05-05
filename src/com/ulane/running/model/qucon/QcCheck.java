package com.ulane.running.model.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.system.AppUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * QcCheck Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcCheck extends com.htsoft.core.model.BaseModel {

    protected Long chkId;
	protected Long chkUseId;
	protected Long toUseId;
	protected java.util.Date chkTimeSta;
	protected java.util.Date chkTimeEnd;
	protected java.math.BigDecimal chkResult;
	protected String chkSummary;
	protected Short confirmResult;
	protected String confirmRemark;
	protected Short staId;
	protected com.ulane.running.model.qucon.QcTempRelease qcTempRelease;
	
	
	/**
	 * 严重项被选择时，分数为-1
	 */
	public static final Short YANZHONG_CHECK = -1;
	/**
	 * 严重项被选择时，分数为-2
	 */
	public static final Short YANZHONG_UNCHECK = -2;
	/**待确认 */
	public static final Short NEED_CONFIRM = 2;
	/**己完成*/
	public static final Short PASS_CONFIRMED = 3;
	public static final Short UNPASSED_CONFIRMFAIL = 4;
	public static final Short PSSS_UNNEED_CONFIRM = 5;
	
	
	protected String chkUserName;
	protected String toUserName;
	
	public String getChkUserName() {
		return chkUserName;
	}

	public void setChkUserName(String chkUserName) {
		this.chkUserName = chkUserName;
	}

	public String getToUserName() {
		return toUserName;
	}

	public void setToUserName(String toUserName) {
		this.toUserName = toUserName;
	}

	protected java.util.Set<QcCheckDetail> qcCheckDetails = new java.util.HashSet<QcCheckDetail>();
	protected java.util.Set qcChkBasiss = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class QcCheck
	 */
	public QcCheck () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcCheck
	 */
	public QcCheck (
		 Long in_chkId
        ) {
		this.setChkId(in_chkId);
    }

	
	public com.ulane.running.model.qucon.QcTempRelease getQcTempRelease () {
		return qcTempRelease;
	}	
	
	public void setQcTempRelease (com.ulane.running.model.qucon.QcTempRelease in_qcTempRelease) {
		this.qcTempRelease = in_qcTempRelease;
	}

	public java.util.Set<QcCheckDetail> getQcCheckDetails () {
		return qcCheckDetails;
	}	
	
	public void setQcCheckDetails (java.util.Set<QcCheckDetail> in_qcCheckDetails) {
		this.qcCheckDetails = in_qcCheckDetails;
	}

	public java.util.Set getQcChkBasiss () {
		return qcChkBasiss;
	}	
	
	public void setQcChkBasiss (java.util.Set in_qcChkBasiss) {
		this.qcChkBasiss = in_qcChkBasiss;
	}
    

	/**
	 * 考核结果内码	 * @return Long
     * @hibernate.id column="CHK_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getChkId() {
		return this.chkId;
	}
	
	/**
	 * Set the chkId
	 */	
	public void setChkId(Long aValue) {
		this.chkId = aValue;
	}	

	/**
	 * 发布模板	 * @return Long
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
	 * 考核人	 * @return Long
	 * @hibernate.property column="CHK_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getChkUseId() {
		return this.chkUseId;
	}
	
	/**
	 * Set the chkUseId
	 * @spring.validator type="required"
	 */	
	public void setChkUseId(Long aValue) {
		this.chkUseId = aValue;
	}	

	/**
	 * 被考核人	 * @return Long
	 * @hibernate.property column="TO_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getToUseId() {
		return this.toUseId;
	}
	
	/**
	 * Set the toUseId
	 * @spring.validator type="required"
	 */	
	public void setToUseId(Long aValue) {
		this.toUseId = aValue;
	}	

	/**
	 * 考核时间	 * @return java.util.Date
	 * @hibernate.property column="CHK_TIME_STA" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getChkTimeSta() {
		return this.chkTimeSta;
	}
	
	/**
	 * Set the chkTimeSta
	 */	
	public void setChkTimeSta(java.util.Date aValue) {
		this.chkTimeSta = aValue;
	}	

	/**
	 * 考核结束时间	 * @return java.util.Date
	 * @hibernate.property column="CHK_TIME_END" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getChkTimeEnd() {
		return this.chkTimeEnd;
	}
	
	/**
	 * Set the chkTimeEnd
	 */	
	public void setChkTimeEnd(java.util.Date aValue) {
		this.chkTimeEnd = aValue;
	}	

	/**
	 * 考核结果(分数)	 * @return java.math.BigDecimal
	 * @hibernate.property column="CHK_RESULT" type="java.math.BigDecimal" length="5" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getChkResult() {
		return this.chkResult;
	}
	
	/**
	 * Set the chkResult
	 */	
	public void setChkResult(java.math.BigDecimal aValue) {
		this.chkResult = aValue;
	}	

	/**
	 * 综合评价	 * @return String
	 * @hibernate.property column="CHK_SUMMARY" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getChkSummary() {
		return this.chkSummary;
	}
	
	/**
	 * Set the chkSummary
	 */	
	public void setChkSummary(String aValue) {
		this.chkSummary = aValue;
	}	

	/**
	 * 确认结果:被考核人确认&YorN	 * @return Short
	 * @hibernate.property column="CONFIRM_RESULT" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getConfirmResult() {
		return this.confirmResult;
	}
	
	/**
	 * Set the confirmResult
	 */	
	public void setConfirmResult(Short aValue) {
		this.confirmResult = aValue;
	}	

	/**
	 * 确认备注	 * @return String
	 * @hibernate.property column="CONFIRM_REMARK" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getConfirmRemark() {
		return this.confirmRemark;
	}
	
	/**
	 * Set the confirmRemark
	 */	
	public void setConfirmRemark(String aValue) {
		this.confirmRemark = aValue;
	}	

	/**
	 * 考核状态&QC_KGZT	 * @return Short
	 * @hibernate.property column="STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStaId() {
		return this.staId;
	}
	
	/**
	 * Set the staId
	 * @spring.validator type="required"
	 */	
	public void setStaId(Short aValue) {
		this.staId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcCheck)) {
			return false;
		}
		QcCheck rhs = (QcCheck) object;
		return new EqualsBuilder()
				.append(this.chkId, rhs.chkId)
						.append(this.chkUseId, rhs.chkUseId)
				.append(this.toUseId, rhs.toUseId)
				.append(this.chkTimeSta, rhs.chkTimeSta)
				.append(this.chkTimeEnd, rhs.chkTimeEnd)
				.append(this.chkResult, rhs.chkResult)
				.append(this.chkSummary, rhs.chkSummary)
				.append(this.confirmResult, rhs.confirmResult)
				.append(this.confirmRemark, rhs.confirmRemark)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.chkId) 
						.append(this.chkUseId) 
				.append(this.toUseId) 
				.append(this.chkTimeSta) 
				.append(this.chkTimeEnd) 
				.append(this.chkResult) 
				.append(this.chkSummary) 
				.append(this.confirmResult) 
				.append(this.confirmRemark) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("chkId", this.chkId) 
						.append("chkUseId", this.chkUseId) 
				.append("toUseId", this.toUseId) 
				.append("chkTimeSta", this.chkTimeSta) 
				.append("chkTimeEnd", this.chkTimeEnd) 
				.append("chkResult", this.chkResult) 
				.append("chkSummary", this.chkSummary) 
				.append("confirmResult", this.confirmResult) 
				.append("confirmRemark", this.confirmRemark) 
				.append("staId", this.staId) 
				.toString();
	}



}
