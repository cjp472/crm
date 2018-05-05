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
 * CtScrTemQue Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CtScrTemQue extends com.htsoft.core.model.BaseModel {

    protected Long scrQueId;
	protected Short disorder;
	protected com.ulane.running.model.comtech.CtScrChapcter ctScrChapcter;
	protected com.ulane.running.model.comtech.CtScrQue ctScrQue;
	protected com.ulane.running.model.comtech.CtScrTemplate ctScrTemplate;

	protected java.util.Set ctScrAnsDetails = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class CtScrTemQue
	 */
	public CtScrTemQue () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CtScrTemQue
	 */
	public CtScrTemQue (
		 Long in_scrQueId
        ) {
		this.setScrQueId(in_scrQueId);
    }

	
	public com.ulane.running.model.comtech.CtScrChapcter getCtScrChapcter () {
		return ctScrChapcter;
	}	
	
	public void setCtScrChapcter (com.ulane.running.model.comtech.CtScrChapcter in_ctScrChapcter) {
		this.ctScrChapcter = in_ctScrChapcter;
	}
	
	public com.ulane.running.model.comtech.CtScrQue getCtScrQue () {
		return ctScrQue;
	}	
	
	public void setCtScrQue (com.ulane.running.model.comtech.CtScrQue in_ctScrQue) {
		this.ctScrQue = in_ctScrQue;
	}
	
	public com.ulane.running.model.comtech.CtScrTemplate getCtScrTemplate () {
		return ctScrTemplate;
	}	
	
	public void setCtScrTemplate (com.ulane.running.model.comtech.CtScrTemplate in_ctScrTemplate) {
		this.ctScrTemplate = in_ctScrTemplate;
	}

	public java.util.Set getCtScrAnsDetails () {
		return ctScrAnsDetails;
	}	
	
	public void setCtScrAnsDetails (java.util.Set in_ctScrAnsDetails) {
		this.ctScrAnsDetails = in_ctScrAnsDetails;
	}
    

	/**
	 * 话术题目内码	 * @return Long
     * @hibernate.id column="SCR_QUE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getScrQueId() {
		return this.scrQueId;
	}
	
	/**
	 * Set the scrQueId
	 */	
	public void setScrQueId(Long aValue) {
		this.scrQueId = aValue;
	}	

	/**
	 * 话术模板	 * @return Long
	 */
	public Long getTmpId() {
		return this.getCtScrTemplate()==null?null:this.getCtScrTemplate().getTmpId();
	}
	
	/**
	 * Set the tmpId
	 */	
	public void setTmpId(Long aValue) {
	    if (aValue==null) {
	    	ctScrTemplate = null;
	    } else if (ctScrTemplate == null) {
	        ctScrTemplate = new com.ulane.running.model.comtech.CtScrTemplate(aValue);
	        ctScrTemplate.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ctScrTemplate.setTmpId(aValue);
	    }
	}	

	/**
	 * 章节	 * @return Long
	 */
	public Long getQueCatId() {
		return this.getCtScrChapcter()==null?null:this.getCtScrChapcter().getQueCatId();
	}
	
	/**
	 * Set the queCatId
	 */	
	public void setQueCatId(Long aValue) {
	    if (aValue==null) {
	    	ctScrChapcter = null;
	    } else if (ctScrChapcter == null) {
	        ctScrChapcter = new com.ulane.running.model.comtech.CtScrChapcter(aValue);
	        ctScrChapcter.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ctScrChapcter.setQueCatId(aValue);
	    }
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CtScrTemQue)) {
			return false;
		}
		CtScrTemQue rhs = (CtScrTemQue) object;
		return new EqualsBuilder()
				.append(this.scrQueId, rhs.scrQueId)
										.append(this.disorder, rhs.disorder)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.scrQueId) 
										.append(this.disorder) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("scrQueId", this.scrQueId) 
										.append("disorder", this.disorder) 
				.toString();
	}



}
