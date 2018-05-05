package com.ulane.shsh.model.shhq;
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
 * ShBuilderTime Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ShBuilderTime extends com.htsoft.core.model.BaseModel {

    protected Long timeId;
	protected java.util.Date 开始日期;
	protected java.util.Date 结束日期;
	protected java.sql.Timestamp 开始时间;
	protected java.sql.Timestamp 结束时间;
	protected com.ulane.shsh.model.shhq.ShBuilderApply shBuilderApply;


	/**
	 * Default Empty Constructor for class ShBuilderTime
	 */
	public ShBuilderTime () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ShBuilderTime
	 */
	public ShBuilderTime (
		 Long in_timeId
        ) {
		this.setTimeId(in_timeId);
    }

	
	public com.ulane.shsh.model.shhq.ShBuilderApply getShBuilderApply () {
		return shBuilderApply;
	}	
	
	public void setShBuilderApply (com.ulane.shsh.model.shhq.ShBuilderApply in_shBuilderApply) {
		this.shBuilderApply = in_shBuilderApply;
	}
    

	/**
	 * 申请内码	 * @return Long
	 */
	public Long getApplyId() {
		return this.getShBuilderApply()==null?null:this.getShBuilderApply().getApplyId();
	}
	
	/**
	 * Set the applyId
	 */	
	public void setApplyId(Long aValue) {
	    if (aValue==null) {
	    	shBuilderApply = null;
	    } else if (shBuilderApply == null) {
	        shBuilderApply = new com.ulane.shsh.model.shhq.ShBuilderApply(aValue);
	        shBuilderApply.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			shBuilderApply.setApplyId(aValue);
	    }
	}	

	/**
	 * 施工时间内码	 * @return Long
     * @hibernate.id column="TIME_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTimeId() {
		return this.timeId;
	}
	
	/**
	 * Set the timeId
	 */	
	public void setTimeId(Long aValue) {
		this.timeId = aValue;
	}	

	/**
	 * 开始日期(年月日)	 * @return java.util.Date
	 * @hibernate.property column="开始日期" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date get开始日期() {
		return this.开始日期;
	}
	
	/**
	 * Set the 开始日期
	 */	
	public void set开始日期(java.util.Date aValue) {
		this.开始日期 = aValue;
	}	

	/**
	 * 结束日期(年月日)	 * @return java.util.Date
	 * @hibernate.property column="结束日期" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date get结束日期() {
		return this.结束日期;
	}
	
	/**
	 * Set the 结束日期
	 */	
	public void set结束日期(java.util.Date aValue) {
		this.结束日期 = aValue;
	}	

	/**
	 * 开始时间(时分)	 * @return java.sql.Timestamp
	 * @hibernate.property column="开始时间" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp get开始时间() {
		return this.开始时间;
	}
	
	/**
	 * Set the 开始时间
	 */	
	public void set开始时间(java.sql.Timestamp aValue) {
		this.开始时间 = aValue;
	}	

	/**
	 * 结束时间(时分)	 * @return java.sql.Timestamp
	 * @hibernate.property column="结束时间" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp get结束时间() {
		return this.结束时间;
	}
	
	/**
	 * Set the 结束时间
	 */	
	public void set结束时间(java.sql.Timestamp aValue) {
		this.结束时间 = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ShBuilderTime)) {
			return false;
		}
		ShBuilderTime rhs = (ShBuilderTime) object;
		return new EqualsBuilder()
						.append(this.timeId, rhs.timeId)
				.append(this.开始日期, rhs.开始日期)
				.append(this.结束日期, rhs.结束日期)
				.append(this.开始时间, rhs.开始时间)
				.append(this.结束时间, rhs.结束时间)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
						.append(this.timeId) 
				.append(this.开始日期) 
				.append(this.结束日期) 
				.append(this.开始时间) 
				.append(this.结束时间) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
						.append("timeId", this.timeId) 
				.append("开始日期", this.开始日期) 
				.append("结束日期", this.结束日期) 
				.append("开始时间", this.开始时间) 
				.append("结束时间", this.结束时间) 
				.toString();
	}



}
