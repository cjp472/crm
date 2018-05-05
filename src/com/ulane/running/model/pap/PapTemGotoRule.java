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
 * PapTemGotoRule Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class PapTemGotoRule extends com.htsoft.core.model.BaseModel {

    protected Long temGotoRuleId;
	protected Long queId;
	protected String optVal;
	protected com.ulane.running.model.pap.PapQue papQue;
	protected com.ulane.running.model.pap.PapTemplate papTemplate;


	/**
	 * Default Empty Constructor for class PapTemGotoRule
	 */
	public PapTemGotoRule () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PapTemGotoRule
	 */
	public PapTemGotoRule (
		 Long in_temGotoRuleId
        ) {
		this.setTemGotoRuleId(in_temGotoRuleId);
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
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="TEM_GOTO_RULE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTemGotoRuleId() {
		return this.temGotoRuleId;
	}
	
	/**
	 * Set the temGotoRuleId
	 */	
	public void setTemGotoRuleId(Long aValue) {
		this.temGotoRuleId = aValue;
	}	

	/**
	 * 话术模板ID	 * @return Long
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
	 * 题目编号ID	 * @return Long
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
	 * 目标题目ID	 * @return Long
	 */
	public Long getTarQueId() {
		return this.getPapQue()==null?null:this.getPapQue().getQueId();
	}
	
	/**
	 * Set the tarQueId
	 */	
	public void setTarQueId(Long aValue) {
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof PapTemGotoRule)) {
			return false;
		}
		PapTemGotoRule rhs = (PapTemGotoRule) object;
		return new EqualsBuilder()
				.append(this.temGotoRuleId, rhs.temGotoRuleId)
						.append(this.queId, rhs.queId)
				.append(this.optVal, rhs.optVal)
						.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.temGotoRuleId) 
						.append(this.queId) 
				.append(this.optVal) 
						.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("temGotoRuleId", this.temGotoRuleId) 
						.append("queId", this.queId) 
				.append("optVal", this.optVal) 
						.toString();
	}



}
