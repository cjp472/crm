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
 * PapTemQue Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class PapTemQue extends com.htsoft.core.model.BaseModel {

    protected Long papQueId;
	protected Short disorder;
	protected com.ulane.running.model.pap.PapChapcter papChapcter;
	protected com.ulane.running.model.pap.PapQue papQue;
	protected com.ulane.running.model.pap.PapTemplate papTemplate;

	protected java.util.Set papAnsDetails = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class PapTemQue
	 */
	public PapTemQue () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PapTemQue
	 */
	public PapTemQue (
		 Long in_papQueId
        ) {
		this.setPapQueId(in_papQueId);
    }

	
	public com.ulane.running.model.pap.PapChapcter getPapChapcter () {
		return papChapcter;
	}	
	
	public void setPapChapcter (com.ulane.running.model.pap.PapChapcter in_papChapcter) {
		this.papChapcter = in_papChapcter;
	}
	
	public com.ulane.running.model.pap.PapQue getPapQue () {
		return papQue;
	}	
	
	public void setPapQue (com.ulane.running.model.pap.PapQue in_papQue) {
		this.papQue = in_papQue;
	}
	
	public com.ulane.running.model.pap.PapTemplate getPapTemplate () {
		return papTemplate;
	}	
	
	public void setPapTemplate (com.ulane.running.model.pap.PapTemplate in_papTemplate) {
		this.papTemplate = in_papTemplate;
	}

	public java.util.Set getPapAnsDetails () {
		return papAnsDetails;
	}	
	
	public void setPapAnsDetails (java.util.Set in_papAnsDetails) {
		this.papAnsDetails = in_papAnsDetails;
	}
    

	/**
	 * 问卷题目内码	 * @return Long
     * @hibernate.id column="PAP_QUE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getPapQueId() {
		return this.papQueId;
	}
	
	/**
	 * Set the papQueId
	 */	
	public void setPapQueId(Long aValue) {
		this.papQueId = aValue;
	}	

	/**
	 * 问卷模板ID	 * @return Long
	 */
	public Long getTmpId() {
		return this.getPapTemplate()==null?null:this.getPapTemplate().getTmpId();
	}
	
	/**
	 * Set the tmpId
	 */	
	public void setTmpId(Long aValue) {
	    if (aValue==null) {
	    	papTemplate = null;
	    } else if (papTemplate == null) {
	        papTemplate = new com.ulane.running.model.pap.PapTemplate(aValue);
	        papTemplate.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			papTemplate.setTmpId(aValue);
	    }
	}	

	/**
	 * 章节编号ID	 * @return Long
	 */
	public Long getQueCatId() {
		return this.getPapChapcter()==null?null:this.getPapChapcter().getQueCatId();
	}
	
	/**
	 * Set the queCatId
	 */	
	public void setQueCatId(Long aValue) {
	    if (aValue==null) {
	    	papChapcter = null;
	    } else if (papChapcter == null) {
	        papChapcter = new com.ulane.running.model.pap.PapChapcter(aValue);
	        papChapcter.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			papChapcter.setQueCatId(aValue);
	    }
	}	

	/**
	 * 题目编号ID	 * @return Long
	 */
	public Long getQueId() {
		return this.getPapQue()==null?null:this.getPapQue().getQueId();
	}
	
	/**
	 * Set the queId
	 */	
	public void setQueId(Long aValue) {
	    if (aValue==null) {
	    	papQue = null;
	    } else if (papQue == null) {
	        papQue = new com.ulane.running.model.pap.PapQue(aValue);
	        papQue.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			papQue.setQueId(aValue);
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
		if (!(object instanceof PapTemQue)) {
			return false;
		}
		PapTemQue rhs = (PapTemQue) object;
		return new EqualsBuilder()
				.append(this.papQueId, rhs.papQueId)
										.append(this.disorder, rhs.disorder)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.papQueId) 
										.append(this.disorder) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("papQueId", this.papQueId) 
										.append("disorder", this.disorder) 
				.toString();
	}



}
