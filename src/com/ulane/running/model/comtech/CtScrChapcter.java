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
 * CtScrChapcter Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CtScrChapcter extends com.htsoft.core.model.BaseModel {

    protected Long queCatId;
	protected String queCatName;
	protected String remark;
	protected Short disorder;
	protected Short staId;
	protected com.ulane.running.model.comtech.CtScrTemplate ctScrTemplate;

	protected java.util.Set ctScrTemQues = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class CtScrChapcter
	 */
	public CtScrChapcter () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CtScrChapcter
	 */
	public CtScrChapcter (
		 Long in_queCatId
        ) {
		this.setQueCatId(in_queCatId);
    }

	
	public com.ulane.running.model.comtech.CtScrTemplate getCtScrTemplate () {
		return ctScrTemplate;
	}	
	
	public void setCtScrTemplate (com.ulane.running.model.comtech.CtScrTemplate in_ctScrTemplate) {
		this.ctScrTemplate = in_ctScrTemplate;
	}

	public java.util.Set getCtScrTemQues () {
		return ctScrTemQues;
	}	
	
	public void setCtScrTemQues (java.util.Set in_ctScrTemQues) {
		this.ctScrTemQues = in_ctScrTemQues;
	}
    

	/**
	 * 章节内码	 * @return Long
     * @hibernate.id column="QUE_CAT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getQueCatId() {
		return this.queCatId;
	}
	
	/**
	 * Set the queCatId
	 */	
	public void setQueCatId(Long aValue) {
		this.queCatId = aValue;
	}	

	/**
	 * 话术	 * @return Long
	 */
	public Long getScrId() {
		return this.getCtScrTemplate()==null?null:this.getCtScrTemplate().getTmpId();
	}
	
	/**
	 * Set the scrId
	 */	
	public void setScrId(Long aValue) {
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
	 * 名称	 * @return String
	 * @hibernate.property column="QUE_CAT_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getQueCatName() {
		return this.queCatName;
	}
	
	/**
	 * Set the queCatName
	 * @spring.validator type="required"
	 */	
	public void setQueCatName(String aValue) {
		this.queCatName = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
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
		if (!(object instanceof CtScrChapcter)) {
			return false;
		}
		CtScrChapcter rhs = (CtScrChapcter) object;
		return new EqualsBuilder()
				.append(this.queCatId, rhs.queCatId)
						.append(this.queCatName, rhs.queCatName)
				.append(this.remark, rhs.remark)
				.append(this.disorder, rhs.disorder)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.queCatId) 
						.append(this.queCatName) 
				.append(this.remark) 
				.append(this.disorder) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("queCatId", this.queCatId) 
						.append("queCatName", this.queCatName) 
				.append("remark", this.remark) 
				.append("disorder", this.disorder) 
				.append("staId", this.staId) 
				.toString();
	}



}
