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
 * CtScrAnsSummary Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CtScrAnsSummary extends com.htsoft.core.model.BaseModel {

    protected Long scrAnsId;
	protected Long ansUseId;
	protected java.util.Date ansTimeSta;
	protected java.util.Date ansTimeEnd;
	protected String ansRemark;
	protected com.ulane.running.model.comtech.CtScrRelease ctScrRelease;

	protected java.util.Set ctScrAnsDetails = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class CtScrAnsSummary
	 */
	public CtScrAnsSummary () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CtScrAnsSummary
	 */
	public CtScrAnsSummary (
		 Long in_scrAnsId
        ) {
		this.setScrAnsId(in_scrAnsId);
    }

	
	public com.ulane.running.model.comtech.CtScrRelease getCtScrRelease () {
		return ctScrRelease;
	}	
	
	public void setCtScrRelease (com.ulane.running.model.comtech.CtScrRelease in_ctScrRelease) {
		this.ctScrRelease = in_ctScrRelease;
	}

	public java.util.Set getCtScrAnsDetails () {
		return ctScrAnsDetails;
	}	
	
	public void setCtScrAnsDetails (java.util.Set in_ctScrAnsDetails) {
		this.ctScrAnsDetails = in_ctScrAnsDetails;
	}
    

	/**
	 * 话术结果内码	 * @return Long
     * @hibernate.id column="SCR_ANS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getScrAnsId() {
		return this.scrAnsId;
	}
	
	/**
	 * Set the scrAnsId
	 */	
	public void setScrAnsId(Long aValue) {
		this.scrAnsId = aValue;
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
	 * 答卷人	 * @return Long
	 * @hibernate.property column="ANS_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getAnsUseId() {
		return this.ansUseId;
	}
	
	/**
	 * Set the ansUseId
	 * @spring.validator type="required"
	 */	
	public void setAnsUseId(Long aValue) {
		this.ansUseId = aValue;
	}	

	/**
	 * 答卷时间	 * @return java.util.Date
	 * @hibernate.property column="ANS_TIME_STA" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getAnsTimeSta() {
		return this.ansTimeSta;
	}
	
	/**
	 * Set the ansTimeSta
	 * @spring.validator type="required"
	 */	
	public void setAnsTimeSta(java.util.Date aValue) {
		this.ansTimeSta = aValue;
	}	

	/**
	 * 答卷结束时间	 * @return java.util.Date
	 * @hibernate.property column="ANS_TIME_END" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getAnsTimeEnd() {
		return this.ansTimeEnd;
	}
	
	/**
	 * Set the ansTimeEnd
	 * @spring.validator type="required"
	 */	
	public void setAnsTimeEnd(java.util.Date aValue) {
		this.ansTimeEnd = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="ANS_REMARK" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getAnsRemark() {
		return this.ansRemark;
	}
	
	/**
	 * Set the ansRemark
	 */	
	public void setAnsRemark(String aValue) {
		this.ansRemark = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CtScrAnsSummary)) {
			return false;
		}
		CtScrAnsSummary rhs = (CtScrAnsSummary) object;
		return new EqualsBuilder()
				.append(this.scrAnsId, rhs.scrAnsId)
						.append(this.ansUseId, rhs.ansUseId)
				.append(this.ansTimeSta, rhs.ansTimeSta)
				.append(this.ansTimeEnd, rhs.ansTimeEnd)
				.append(this.ansRemark, rhs.ansRemark)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.scrAnsId) 
						.append(this.ansUseId) 
				.append(this.ansTimeSta) 
				.append(this.ansTimeEnd) 
				.append(this.ansRemark) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("scrAnsId", this.scrAnsId) 
						.append("ansUseId", this.ansUseId) 
				.append("ansTimeSta", this.ansTimeSta) 
				.append("ansTimeEnd", this.ansTimeEnd) 
				.append("ansRemark", this.ansRemark) 
				.toString();
	}



}
