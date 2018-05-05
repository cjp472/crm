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
 * PapAnsSummary Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class PapAnsSummary extends com.htsoft.core.model.BaseModel {

    protected Long papAnsId;
	protected Long ansUseId;
	protected java.util.Date ansTimeSta;
	protected java.util.Date ansTimeEnd;
	protected String ansRemark;
	protected com.ulane.running.model.pap.PapRelease papRelease;

	protected java.util.Set papAnsDetails = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class PapAnsSummary
	 */
	public PapAnsSummary () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PapAnsSummary
	 */
	public PapAnsSummary (
		 Long in_papAnsId
        ) {
		this.setPapAnsId(in_papAnsId);
    }

	
	public com.ulane.running.model.pap.PapRelease getPapRelease () {
		return papRelease;
	}	
	
	public void setPapRelease (com.ulane.running.model.pap.PapRelease in_papRelease) {
		this.papRelease = in_papRelease;
	}

	public java.util.Set getPapAnsDetails () {
		return papAnsDetails;
	}	
	
	public void setPapAnsDetails (java.util.Set in_papAnsDetails) {
		this.papAnsDetails = in_papAnsDetails;
	}
    

	/**
	 * 问卷结果内码	 * @return Long
     * @hibernate.id column="PAP_ANS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getPapAnsId() {
		return this.papAnsId;
	}
	
	/**
	 * Set the papAnsId
	 */	
	public void setPapAnsId(Long aValue) {
		this.papAnsId = aValue;
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
		if (!(object instanceof PapAnsSummary)) {
			return false;
		}
		PapAnsSummary rhs = (PapAnsSummary) object;
		return new EqualsBuilder()
				.append(this.papAnsId, rhs.papAnsId)
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
				.append(this.papAnsId) 
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
				.append("papAnsId", this.papAnsId) 
						.append("ansUseId", this.ansUseId) 
				.append("ansTimeSta", this.ansTimeSta) 
				.append("ansTimeEnd", this.ansTimeEnd) 
				.append("ansRemark", this.ansRemark) 
				.toString();
	}



}
