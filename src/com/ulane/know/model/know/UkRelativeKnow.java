package com.ulane.know.model.know;
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
 * UkRelativeKnow Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UkRelativeKnow extends com.htsoft.core.model.BaseModel {

    protected Long relativeId;
	protected Long ukKnowId;
	protected com.ulane.know.model.know.UkSysKnow ukSysKnow;


	/**
	 * Default Empty Constructor for class UkRelativeKnow
	 */
	public UkRelativeKnow () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UkRelativeKnow
	 */
	public UkRelativeKnow (
		 Long in_relativeId
        ) {
		this.setRelativeId(in_relativeId);
    }

	
	public com.ulane.know.model.know.UkSysKnow getUkSysKnow () {
		return ukSysKnow;
	}	
	
	public void setUkSysKnow (com.ulane.know.model.know.UkSysKnow in_ukSysKnow) {
		this.ukSysKnow = in_ukSysKnow;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="RELATIVE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getRelativeId() {
		return this.relativeId;
	}
	
	/**
	 * Set the relativeId
	 */	
	public void setRelativeId(Long aValue) {
		this.relativeId = aValue;
	}	

	/**
	 * 系统知识内码	 * @return Long
	 */
	public Long getKnowId() {
		return this.getUkSysKnow()==null?null:this.getUkSysKnow().getKnowId();
	}
	
	/**
	 * Set the knowId
	 */	
	public void setKnowId(Long aValue) {
	    if (aValue==null) {
	    	ukSysKnow = null;
	    } else if (ukSysKnow == null) {
	        ukSysKnow = new com.ulane.know.model.know.UkSysKnow(aValue);
	        ukSysKnow.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ukSysKnow.setKnowId(aValue);
	    }
	}	

	/**
	 * 关联系统知识内码	 * @return Long
	 * @hibernate.property column="UK_KNOW_ID" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUkKnowId() {
		return this.ukKnowId;
	}
	
	/**
	 * Set the ukKnowId
	 */	
	public void setUkKnowId(Long aValue) {
		this.ukKnowId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkRelativeKnow)) {
			return false;
		}
		UkRelativeKnow rhs = (UkRelativeKnow) object;
		return new EqualsBuilder()
				.append(this.relativeId, rhs.relativeId)
						.append(this.ukKnowId, rhs.ukKnowId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.relativeId) 
						.append(this.ukKnowId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("relativeId", this.relativeId) 
						.append("ukKnowId", this.ukKnowId) 
				.toString();
	}



}
