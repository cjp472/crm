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
 * CtScrAnsDetail Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CtScrAnsDetail extends com.htsoft.core.model.BaseModel {

    protected Long ctScrAnsDetailId;
	protected String ans;
	protected com.ulane.running.model.comtech.CtScrAnsSummary ctScrAnsSummary;
	protected com.ulane.running.model.comtech.CtScrQueOpt ctScrQueOpt;
	protected com.ulane.running.model.comtech.CtScrTemQue ctScrTemQue;


	/**
	 * Default Empty Constructor for class CtScrAnsDetail
	 */
	public CtScrAnsDetail () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CtScrAnsDetail
	 */
	public CtScrAnsDetail (
		 Long in_ctScrAnsDetailId
        ) {
		this.setCtScrAnsDetailId(in_ctScrAnsDetailId);
    }

	
	public com.ulane.running.model.comtech.CtScrAnsSummary getCtScrAnsSummary () {
		return ctScrAnsSummary;
	}	
	
	public void setCtScrAnsSummary (com.ulane.running.model.comtech.CtScrAnsSummary in_ctScrAnsSummary) {
		this.ctScrAnsSummary = in_ctScrAnsSummary;
	}
	
	public com.ulane.running.model.comtech.CtScrQueOpt getCtScrQueOpt () {
		return ctScrQueOpt;
	}	
	
	public void setCtScrQueOpt (com.ulane.running.model.comtech.CtScrQueOpt in_ctScrQueOpt) {
		this.ctScrQueOpt = in_ctScrQueOpt;
	}
	
	public com.ulane.running.model.comtech.CtScrTemQue getCtScrTemQue () {
		return ctScrTemQue;
	}	
	
	public void setCtScrTemQue (com.ulane.running.model.comtech.CtScrTemQue in_ctScrTemQue) {
		this.ctScrTemQue = in_ctScrTemQue;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="CT_SCR_ANS_DETAIL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getCtScrAnsDetailId() {
		return this.ctScrAnsDetailId;
	}
	
	/**
	 * Set the ctScrAnsDetailId
	 */	
	public void setCtScrAnsDetailId(Long aValue) {
		this.ctScrAnsDetailId = aValue;
	}	

	/**
	 * 话术结果	 * @return Long
	 */
	public Long getScrAnsId() {
		return this.getCtScrAnsSummary()==null?null:this.getCtScrAnsSummary().getScrAnsId();
	}
	
	/**
	 * Set the scrAnsId
	 */	
	public void setScrAnsId(Long aValue) {
	    if (aValue==null) {
	    	ctScrAnsSummary = null;
	    } else if (ctScrAnsSummary == null) {
	        ctScrAnsSummary = new com.ulane.running.model.comtech.CtScrAnsSummary(aValue);
	        ctScrAnsSummary.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ctScrAnsSummary.setScrAnsId(aValue);
	    }
	}	

	/**
	 * 话术题目	 * @return Long
	 */
	public Long getScrQueId() {
		return this.getCtScrTemQue()==null?null:this.getCtScrTemQue().getScrQueId();
	}
	
	/**
	 * Set the scrQueId
	 */	
	public void setScrQueId(Long aValue) {
	    if (aValue==null) {
	    	ctScrTemQue = null;
	    } else if (ctScrTemQue == null) {
	        ctScrTemQue = new com.ulane.running.model.comtech.CtScrTemQue(aValue);
	        ctScrTemQue.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ctScrTemQue.setScrQueId(aValue);
	    }
	}	

	/**
	 * 题项编号	 * @return Long
	 */
	public Long getOptId() {
		return this.getCtScrQueOpt()==null?null:this.getCtScrQueOpt().getOptId();
	}
	
	/**
	 * Set the optId
	 */	
	public void setOptId(Long aValue) {
	    if (aValue==null) {
	    	ctScrQueOpt = null;
	    } else if (ctScrQueOpt == null) {
	        ctScrQueOpt = new com.ulane.running.model.comtech.CtScrQueOpt(aValue);
	        ctScrQueOpt.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ctScrQueOpt.setOptId(aValue);
	    }
	}	

	/**
	 * 答案	 * @return String
	 * @hibernate.property column="ANS" type="java.lang.String" length="4000" not-null="true" unique="false"
	 */
	public String getAns() {
		return this.ans;
	}
	
	/**
	 * Set the ans
	 * @spring.validator type="required"
	 */	
	public void setAns(String aValue) {
		this.ans = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CtScrAnsDetail)) {
			return false;
		}
		CtScrAnsDetail rhs = (CtScrAnsDetail) object;
		return new EqualsBuilder()
				.append(this.ctScrAnsDetailId, rhs.ctScrAnsDetailId)
										.append(this.ans, rhs.ans)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.ctScrAnsDetailId) 
										.append(this.ans) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("ctScrAnsDetailId", this.ctScrAnsDetailId) 
										.append("ans", this.ans) 
				.toString();
	}



}
