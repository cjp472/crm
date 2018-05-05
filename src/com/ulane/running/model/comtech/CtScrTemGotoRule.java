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
 * CtScrTemGotoRule Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CtScrTemGotoRule extends com.htsoft.core.model.BaseModel {

    protected Long scrTemGotoRuleId;
	protected Long queId;
	protected String optVal;
	protected com.ulane.running.model.comtech.CtScrQue ctScrQue;
	protected com.ulane.running.model.comtech.CtScrTemplate ctScrTemplate;


	/**
	 * Default Empty Constructor for class CtScrTemGotoRule
	 */
	public CtScrTemGotoRule () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CtScrTemGotoRule
	 */
	public CtScrTemGotoRule (
		 Long in_scrTemGotoRuleId
        ) {
		this.setScrTemGotoRuleId(in_scrTemGotoRuleId);
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
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="SCR_TEM_GOTO_RULE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getScrTemGotoRuleId() {
		return this.scrTemGotoRuleId;
	}
	
	/**
	 * Set the scrTemGotoRuleId
	 */	
	public void setScrTemGotoRuleId(Long aValue) {
		this.scrTemGotoRuleId = aValue;
	}	

	/**
	 * 话术	 * @return Long
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
	 * 题目	 * @return Long
	 * @hibernate.property column="QUE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getQueId() {
		return this.queId;
	}
	
	/**
	 * Set the queId
	 * @spring.validator type="required"
	 */	
	public void setQueId(Long aValue) {
		this.queId = aValue;
	}	

	/**
	 * 题项编号：对应数据字典或题项表ID	 * @return String
	 * @hibernate.property column="OPT_VAL" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getOptVal() {
		return this.optVal;
	}
	
	/**
	 * Set the optVal
	 * @spring.validator type="required"
	 */	
	public void setOptVal(String aValue) {
		this.optVal = aValue;
	}	

	/**
	 * 目标题目	 * @return Long
	 */
	public Long getTarQueId() {
		return this.getCtScrQue()==null?null:this.getCtScrQue().getQueId();
	}
	
	/**
	 * Set the tarQueId
	 */	
	public void setTarQueId(Long aValue) {
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CtScrTemGotoRule)) {
			return false;
		}
		CtScrTemGotoRule rhs = (CtScrTemGotoRule) object;
		return new EqualsBuilder()
				.append(this.scrTemGotoRuleId, rhs.scrTemGotoRuleId)
						.append(this.queId, rhs.queId)
				.append(this.optVal, rhs.optVal)
						.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.scrTemGotoRuleId) 
						.append(this.queId) 
				.append(this.optVal) 
						.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("scrTemGotoRuleId", this.scrTemGotoRuleId) 
						.append("queId", this.queId) 
				.append("optVal", this.optVal) 
						.toString();
	}



}
