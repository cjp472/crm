package com.ulane.customer.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * ConBwListTimeRul Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ConBwListTimeRul extends com.htsoft.core.model.BaseModel {

	protected Date staDate;
	protected Date endDate;
	protected String staTime;
	protected String endTime;
    protected Long bwListTimeRulId;
	protected com.ulane.customer.model.customer.ConBwList conBwList;


	/**
	 * Default Empty Constructor for class ConBwListTimeRul
	 */
	public ConBwListTimeRul () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConBwListTimeRul
	 */
	public ConBwListTimeRul (
		 Long in_bwListTimeRulId
        ) {
		this.setBwListTimeRulId(in_bwListTimeRulId);
    }

	
	public com.ulane.customer.model.customer.ConBwList getConBwList () {
		return conBwList;
	}	
	
	public void setConBwList (com.ulane.customer.model.customer.ConBwList in_conBwList) {
		this.conBwList = in_conBwList;
	}
    

	/**
	 * 黑白名单ID	 * @return Long
	 */
	public Long getBwId() {
		return this.getConBwList()==null?null:this.getConBwList().getBwId();
	}
	
	/**
	 * Set the bwId
	 */	
	public void setBwId(Long aValue) {
	    if (aValue==null) {
	    	conBwList = null;
	    } else if (conBwList == null) {
	        conBwList = new com.ulane.customer.model.customer.ConBwList(aValue);
	        conBwList.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			conBwList.setBwId(aValue);
	    }
	}	

	/**
	 * 开始时间	 * @return String
	 * @hibernate.property column="STA_TIME" type="java.util.String" length="18" unique="false"
	 */
	public String getStaTime() {
		return this.staTime;
	}
	
	/**
	 * Set the staTime
	 * @spring.validator type="required"
	 */	
	public void setStaTime(String aValue) {
		this.staTime = aValue;
	}	

	/**
	 * 结束时间	 * @return String
	 * @hibernate.property column="END_TIME" type="java.util.String" length="18"  unique="false"
	 */
	public String getEndTime() {
		return this.endTime;
	}
	
	/**
	 * Set the endTime
	 * @spring.validator type="required"
	 */	
	public void setEndTime(String aValue) {
		this.endTime = aValue;
	}	

	/**
	 * 开始日期	 * @return java.util.Date
	 * @hibernate.property column="STA_DATE" type="java.util.Date" length="7" unique="false"
	 */
	public Date getStaDate() {
		return this.staDate;
	}
	
	/**
	 * Set the staDate
	 * @spring.validator type="required"
	 */	
	public void setStaDate(Date aValue) {
		this.staDate = aValue;
	}	

	/**
	 * 结束日期	 * @return java.util.Date
	 * @hibernate.property column="END_DATE" type="java.util.Date" length="7" unique="false"
	 */
	public Date getEndDate() {
		return this.endDate;
	}
	
	/**
	 * Set the endDate
	 * @spring.validator type="required"
	 */	
	public void setEndDate(Date aValue) {
		this.endDate = aValue;
	}
	
	/**
	 * 内码	 * @return Long
     * @hibernate.id column="BW_LIST_TIME_RUL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBwListTimeRulId() {
		return this.bwListTimeRulId;
	}
	
	/**
	 * Set the bwListTimeRulId
	 */	
	public void setBwListTimeRulId(Long aValue) {
		this.bwListTimeRulId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConBwListTimeRul)) {
			return false;
		}
		ConBwListTimeRul rhs = (ConBwListTimeRul) object;
		return new EqualsBuilder()
				.append(this.staDate, rhs.staDate)
				.append(this.endDate, rhs.endDate)
				.append(this.staTime, rhs.staTime)
				.append(this.endTime, rhs.endTime)
				.append(this.bwListTimeRulId, rhs.bwListTimeRulId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.staDate)
				.append(this.endDate)
				.append(this.staTime) 
				.append(this.endTime) 
				.append(this.bwListTimeRulId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
						.append("staDate", this.staDate)
						.append("staTime", this.staTime) 
						.append("endDate", this.endDate)
				.append("endTime", this.endTime) 
				.append("bwListTimeRulId", this.bwListTimeRulId) 
				.toString();
	}



}
