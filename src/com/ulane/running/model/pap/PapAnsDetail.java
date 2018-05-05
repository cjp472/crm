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
 * PapAnsDetail Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class PapAnsDetail extends com.htsoft.core.model.BaseModel {

    protected Long ansDetailId;
	protected String ans;
	protected com.ulane.running.model.pap.PapAnsSummary papAnsSummary;
	protected com.ulane.running.model.pap.PapQueOpt papQueOpt;
	protected com.ulane.running.model.pap.PapTemQue papTemQue;


	/**
	 * Default Empty Constructor for class PapAnsDetail
	 */
	public PapAnsDetail () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PapAnsDetail
	 */
	public PapAnsDetail (
		 Long in_ansDetailId
        ) {
		this.setAnsDetailId(in_ansDetailId);
    }

	
	public com.ulane.running.model.pap.PapAnsSummary getPapAnsSummary () {
		return papAnsSummary;
	}	
	
	public void setPapAnsSummary (com.ulane.running.model.pap.PapAnsSummary in_papAnsSummary) {
		this.papAnsSummary = in_papAnsSummary;
	}
	
	public com.ulane.running.model.pap.PapQueOpt getPapQueOpt () {
		return papQueOpt;
	}	
	
	public void setPapQueOpt (com.ulane.running.model.pap.PapQueOpt in_papQueOpt) {
		this.papQueOpt = in_papQueOpt;
	}
	
	public com.ulane.running.model.pap.PapTemQue getPapTemQue () {
		return papTemQue;
	}	
	
	public void setPapTemQue (com.ulane.running.model.pap.PapTemQue in_papTemQue) {
		this.papTemQue = in_papTemQue;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="ANS_DETAIL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getAnsDetailId() {
		return this.ansDetailId;
	}
	
	/**
	 * Set the ansDetailId
	 */	
	public void setAnsDetailId(Long aValue) {
		this.ansDetailId = aValue;
	}	

	/**
	 * 问卷题目ID	 * @return Long
	 */
	public Long getPapQueId() {
		return this.getPapTemQue()==null?null:this.getPapTemQue().getPapQueId();
	}
	
	/**
	 * Set the papQueId
	 */	
	public void setPapQueId(Long aValue) {
	    if (aValue==null) {
	    	papTemQue = null;
	    } else if (papTemQue == null) {
	        papTemQue = new com.ulane.running.model.pap.PapTemQue(aValue);
	        papTemQue.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			papTemQue.setPapQueId(aValue);
	    }
	}	

	/**
	 * 题项编号ID	 * @return Long
	 */
	public Long getOptId() {
		return this.getPapQueOpt()==null?null:this.getPapQueOpt().getOptId();
	}
	
	/**
	 * Set the optId
	 */	
	public void setOptId(Long aValue) {
	    if (aValue==null) {
	    	papQueOpt = null;
	    } else if (papQueOpt == null) {
	        papQueOpt = new com.ulane.running.model.pap.PapQueOpt(aValue);
	        papQueOpt.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			papQueOpt.setOptId(aValue);
	    }
	}	

	/**
	 * 问卷结果内码	 * @return Long
	 */
	public Long getPapAnsId() {
		return this.getPapAnsSummary()==null?null:this.getPapAnsSummary().getPapAnsId();
	}
	
	/**
	 * Set the papAnsId
	 */	
	public void setPapAnsId(Long aValue) {
	    if (aValue==null) {
	    	papAnsSummary = null;
	    } else if (papAnsSummary == null) {
	        papAnsSummary = new com.ulane.running.model.pap.PapAnsSummary(aValue);
	        papAnsSummary.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			papAnsSummary.setPapAnsId(aValue);
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
		if (!(object instanceof PapAnsDetail)) {
			return false;
		}
		PapAnsDetail rhs = (PapAnsDetail) object;
		return new EqualsBuilder()
				.append(this.ansDetailId, rhs.ansDetailId)
										.append(this.ans, rhs.ans)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.ansDetailId) 
										.append(this.ans) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("ansDetailId", this.ansDetailId) 
										.append("ans", this.ans) 
				.toString();
	}



}
