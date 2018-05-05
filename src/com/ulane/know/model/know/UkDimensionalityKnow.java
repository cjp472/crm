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
 * UkDimensionalityKnow Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class UkDimensionalityKnow extends com.htsoft.core.model.BaseModel {

    protected Long dimensionalityKnowId;
	protected Long dimensionalityType; //[[123,1或2或3]] 1代表维度    2代表机构    3代表岗位
	protected String dimName;
	
	protected com.ulane.know.model.know.UkSysKnow ukSysKnow;
	protected com.ulane.know.model.know.UkKnowDimensionality ukKnowDimensionality;
	
	protected com.ulane.base.model.xitong.UlDepartment ulDepartment;
	protected com.htsoft.oa.model.system.Dictionary dictionary;
	
	/**
	 * Default Empty Constructor for class UkDimensionalityKnow
	 */
	public UkDimensionalityKnow () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UkDimensionalityKnow
	 */
	public UkDimensionalityKnow (
		 Long in_dimensionalityKnowId
        ) {
		this.setDimensionalityKnowId(in_dimensionalityKnowId);
    }
	
	public String getDimName() {
		return dimName;
	}

	public void setDimName(String dimName) {
		this.dimName = dimName;
	}

	public com.ulane.base.model.xitong.UlDepartment getUlDepartment() {
		return ulDepartment;
	}

	public void setUlDepartment(
			com.ulane.base.model.xitong.UlDepartment ulDepartment) {
		this.ulDepartment = ulDepartment;
	}

	public com.htsoft.oa.model.system.Dictionary getDictionary() {
		return dictionary;
	}

	public void setDictionary(com.htsoft.oa.model.system.Dictionary dictionary) {
		this.dictionary = dictionary;
	}

	public Long getDimensionalityKnowId() {
		return dimensionalityKnowId;
	}

	public void setDimensionalityKnowId(Long dimensionalityKnowId) {
		this.dimensionalityKnowId = dimensionalityKnowId;
	}

	public Long getDimensionalityType() {
		return dimensionalityType;
	}

	public void setDimensionalityType(Long dimensionalityType) {
		this.dimensionalityType = dimensionalityType;
	}

	public com.ulane.know.model.know.UkSysKnow getUkSysKnow() {
		return ukSysKnow;
	}

	public void setUkSysKnow(com.ulane.know.model.know.UkSysKnow ukSysKnow) {
		this.ukSysKnow = ukSysKnow;
	}

	public com.ulane.know.model.know.UkKnowDimensionality getUkKnowDimensionality() {
		return ukKnowDimensionality;
	}

	public void setUkKnowDimensionality(
			com.ulane.know.model.know.UkKnowDimensionality ukKnowDimensionality) {
		this.ukKnowDimensionality = ukKnowDimensionality;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkDimensionalityKnow)) {
			return false;
		}
		UkDimensionalityKnow rhs = (UkDimensionalityKnow) object;
		return new EqualsBuilder()
				.append(this.dimensionalityKnowId, rhs.dimensionalityKnowId)
				.append(this.dimensionalityType, rhs.dimensionalityType)
				.append(this.dimName, rhs.dimName)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.dimensionalityKnowId) 
				.append(this.dimensionalityType)
				.append(this.dimName)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("dimensionalityKnowId", this.dimensionalityKnowId) 
				.append("dimensionalityType", this.dimensionalityType)
				.append("dimName", this.dimName)
				.toString();
	}
}
