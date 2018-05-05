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
 * CtScrQueOpt Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CtScrQueOpt extends com.htsoft.core.model.BaseModel {

    protected Long optId;
	protected String optContent;
	protected Short disorder;
	protected Short isDefault;
	protected Short staId;
	protected com.ulane.running.model.comtech.CtScrQue ctScrQue;

	protected java.util.Set ctScrAnsDetails = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class CtScrQueOpt
	 */
	public CtScrQueOpt () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CtScrQueOpt
	 */
	public CtScrQueOpt (
		 Long in_optId
        ) {
		this.setOptId(in_optId);
    }

	
	public com.ulane.running.model.comtech.CtScrQue getCtScrQue () {
		return ctScrQue;
	}	
	
	public void setCtScrQue (com.ulane.running.model.comtech.CtScrQue in_ctScrQue) {
		this.ctScrQue = in_ctScrQue;
	}

	public java.util.Set getCtScrAnsDetails () {
		return ctScrAnsDetails;
	}	
	
	public void setCtScrAnsDetails (java.util.Set in_ctScrAnsDetails) {
		this.ctScrAnsDetails = in_ctScrAnsDetails;
	}
    

	/**
	 * 题项内码	 * @return Long
     * @hibernate.id column="OPT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getOptId() {
		return this.optId;
	}
	
	/**
	 * Set the optId
	 */	
	public void setOptId(Long aValue) {
		this.optId = aValue;
	}	

	/**
	 * 题目	 * @return Long
	 */
	public Long getQueId() {
		return this.getCtScrQue()==null?null:this.getCtScrQue().getQueId();
	}
	
	/**
	 * Set the queId
	 */	
	public void setQueId(Long aValue) {
	    if (aValue==null) {
	    	ctScrQue = null;
	    } else if (ctScrQue == null) {
	        ctScrQue = new com.ulane.running.model.comtech.CtScrQue(aValue);
	        ctScrQue.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ctScrQue.setQueId(aValue);
	    }
	}	

	/**
	 * 题项	 * @return String
	 * @hibernate.property column="OPT_CONTENT" type="java.lang.String" length="2048" not-null="true" unique="false"
	 */
	public String getOptContent() {
		return this.optContent;
	}
	
	/**
	 * Set the optContent
	 * @spring.validator type="required"
	 */	
	public void setOptContent(String aValue) {
		this.optContent = aValue;
	}	

	/**
	 * 序号	 * @return Short
	 * @hibernate.property column="DISORDER" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDisorder() {
		return this.disorder;
	}
	
	/**
	 * Set the disorder
	 * @spring.validator type="required"
	 */	
	public void setDisorder(Short aValue) {
		this.disorder = aValue;
	}	

	/**
	 * 是否默认&YorN	 * @return Short
	 * @hibernate.property column="IS_DEFAULT" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getIsDefault() {
		return this.isDefault;
	}
	
	/**
	 * Set the isDefault
	 * @spring.validator type="required"
	 */	
	public void setIsDefault(Short aValue) {
		this.isDefault = aValue;
	}	

	/**
	 * 状态：有效、注销&CT_ZT	 * @return Short
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
		if (!(object instanceof CtScrQueOpt)) {
			return false;
		}
		CtScrQueOpt rhs = (CtScrQueOpt) object;
		return new EqualsBuilder()
				.append(this.optId, rhs.optId)
						.append(this.optContent, rhs.optContent)
				.append(this.disorder, rhs.disorder)
				.append(this.isDefault, rhs.isDefault)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.optId) 
						.append(this.optContent) 
				.append(this.disorder) 
				.append(this.isDefault) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("optId", this.optId) 
						.append("optContent", this.optContent) 
				.append("disorder", this.disorder) 
				.append("isDefault", this.isDefault) 
				.append("staId", this.staId) 
				.toString();
	}



}
