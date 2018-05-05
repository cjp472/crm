package com.ulane.base.model.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * BmBillNum Base Java Bean, base class for the.erp.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class BmBillNum extends com.htsoft.core.model.BaseModel {

    protected Long billNumId;
	protected Long billType;
	protected Long isCheckUniqueness;
	protected Long isDeleteRetain;
	protected Long isAutoFill;
	protected String prefix;
	protected Long factor1Median;
	protected Long factor2Median;
	protected Long yearMedian;
	protected Long isYear;
	protected Long monthMedian;
	protected Long isMonth;
	protected Long dayMedian;
	protected Long isDay;
	protected Long zeroLogo;
	protected Long numberMedian;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String createBy;
	protected String updateBy;
	protected String comments;
//	protected com.ulane.base.model.xitong.BmFactor bmFactor1;
//	protected com.ulane.base.model.xitong.BmFactor bmFactor2;


	/**
	 * Default Empty Constructor for class BmBillNum
	 */
	public BmBillNum () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class BmBillNum
	 */
	public BmBillNum (
		 Long in_billNumId
        ) {
		this.setBillNumId(in_billNumId);
    }

//	
//	public com.ulane.base.model.xitong.BmFactor getBmFactor1 () {
//		return bmFactor1;
//	}	
//	
//	public void setBmFactor1 (com.ulane.base.model.xitong.BmFactor in_bmFactor) {
//		this.bmFactor1 = in_bmFactor;
//	}
//    
//	public com.ulane.base.model.xitong.BmFactor getBmFactor2 () {
//		return bmFactor2;
//	}	
//	
//	public void setBmFactor2 (com.ulane.base.model.xitong.BmFactor in_bmFactor) {
//		this.bmFactor2 = in_bmFactor;
//	}

	/**
	 * 主键	 * @return Long
     * @hibernate.id column="BILL_NUM_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBillNumId() {
		return this.billNumId;
	}
	
	/**
	 * Set the billNumId
	 */	
	public void setBillNumId(Long aValue) {
		this.billNumId = aValue;
	}	

	/**
	 * 单据类型	 * @return Long
	 * @hibernate.property column="BILL_TYPE" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getBillType() {
		return this.billType;
	}
	
	/**
	 * Set the billType
	 */	
	public void setBillType(Long aValue) {
		this.billType = aValue;
	}	

	/**
	 * 生成单据号时检查唯一性	 * @return Long
	 * @hibernate.property column="IS_CHECK_UNIQUENESS" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsCheckUniqueness() {
		return this.isCheckUniqueness;
	}
	
	/**
	 * Set the isCheckUniqueness
	 */	
	public void setIsCheckUniqueness(Long aValue) {
		this.isCheckUniqueness = aValue;
	}	

	/**
	 * 删除单据时保留占用	 * @return Long
	 * @hibernate.property column="IS_DELETE_RETAIN" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsDeleteRetain() {
		return this.isDeleteRetain;
	}
	
	/**
	 * Set the isDeleteRetain
	 */	
	public void setIsDeleteRetain(Long aValue) {
		this.isDeleteRetain = aValue;
	}	

	/**
	 * 自动进行断号补号	 * @return Long
	 * @hibernate.property column="IS_AUTO_FILL" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsAutoFill() {
		return this.isAutoFill;
	}
	
	/**
	 * Set the isAutoFill
	 */	
	public void setIsAutoFill(Long aValue) {
		this.isAutoFill = aValue;
	}	

	/**
	 * 前缀	 * @return String
	 * @hibernate.property column="PREFIX" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getPrefix() {
		return this.prefix;
	}
	
	/**
	 * Set the prefix
	 */	
	public void setPrefix(String aValue) {
		this.prefix = aValue;
	}	
//
//	/**
//	 * 对象一影响因素	 * @return Long
//	 */
//	public Long getFactor1Id() {
//		return this.getBmFactor1()==null?null:this.getBmFactor1().getFactorId();
//	}
//	
//	/**
//	 * 对象一影响因素
//	 * Set the factor1Id
//	 */	
//	public void setFactor1Id(Long aValue) {
//	    if (aValue==null) {
//	    	bmFactor1 = null;
//	    } else if (bmFactor1 == null) {
//	        bmFactor1 = new com.ulane.base.model.xitong.BmFactor(aValue);
//	        bmFactor1.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//			bmFactor1.setFactorId(aValue);
//	    }
//	}	

	/**
	 * 对象一位数	 * @return Long
	 * @hibernate.property column="FACTOR1_MEDIAN" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getFactor1Median() {
		return this.factor1Median;
	}
	
	/**
	 * Set the factor1Median
	 */	
	public void setFactor1Median(Long aValue) {
		this.factor1Median = aValue;
	}	

//	/**
//	 * 对象二影响因素	 * @return Long
//	 * @hibernate.property column="FACTOR2_ID" type="java.lang.Long" length="22" not-null="false" unique="false"
//	 */
//	public Long getFactor2Id() {
//		return this.getBmFactor2()==null?null:this.getBmFactor2().getFactorId();
//	}
	
//	/**
//	 * 对象二影响因素
//	 * Set the factor1Id
//	 */	
//	public void setFactor2Id(Long aValue) {
//	    if (aValue==null) {
//	    	bmFactor2 = null;
//	    } else if (bmFactor2 == null) {
//	        bmFactor2 = new com.ulane.base.model.xitong.BmFactor(aValue);
//	        bmFactor2.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//			bmFactor2.setFactorId(aValue);
//	    }
//	}	

	/**
	 * 对象二位数	 * @return Long
	 * @hibernate.property column="FACTOR2_MEDIAN" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getFactor2Median() {
		return this.factor2Median;
	}
	
	/**
	 * Set the factor2Median
	 */	
	public void setFactor2Median(Long aValue) {
		this.factor2Median = aValue;
	}	

	/**
	 * 年位数	 * @return Long
	 * @hibernate.property column="YEAR_MEDIAN" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getYearMedian() {
		return this.yearMedian;
	}
	
	/**
	 * Set the yearMedian
	 */	
	public void setYearMedian(Long aValue) {
		this.yearMedian = aValue;
	}	

	/**
	 * 年选项	 * @return Long
	 * @hibernate.property column="IS_YEAR" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsYear() {
		return this.isYear;
	}
	
	/**
	 * Set the isYear
	 */	
	public void setIsYear(Long aValue) {
		this.isYear = aValue;
	}	

	/**
	 * 月位数	 * @return Long
	 * @hibernate.property column="MONTH_MEDIAN" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getMonthMedian() {
		return this.monthMedian;
	}
	
	/**
	 * Set the monthMedian
	 */	
	public void setMonthMedian(Long aValue) {
		this.monthMedian = aValue;
	}	

	/**
	 * 月选项	 * @return Long
	 * @hibernate.property column="IS_MONTH" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsMonth() {
		return this.isMonth;
	}
	
	/**
	 * Set the isMonth
	 */	
	public void setIsMonth(Long aValue) {
		this.isMonth = aValue;
	}	

	/**
	 * 日位数	 * @return Long
	 * @hibernate.property column="DAY_MEDIAN" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getDayMedian() {
		return this.dayMedian;
	}
	
	/**
	 * Set the dayMedian
	 */	
	public void setDayMedian(Long aValue) {
		this.dayMedian = aValue;
	}	

	/**
	 * 日选项	 * @return Long
	 * @hibernate.property column="IS_DAY" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getIsDay() {
		return this.isDay;
	}
	
	/**
	 * Set the isDay
	 */	
	public void setIsDay(Long aValue) {
		this.isDay = aValue;
	}	

	/**
	 * 流水号归零标示	 * @return Long
	 * @hibernate.property column="ZERO_LOGO" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getZeroLogo() {
		return this.zeroLogo;
	}
	
	/**
	 * Set the zeroLogo
	 */	
	public void setZeroLogo(Long aValue) {
		this.zeroLogo = aValue;
	}	

	/**
	 * 流水号位数	 * @return Long
	 * @hibernate.property column="NUMBER_MEDIAN" type="java.lang.Long" length="22" not-null="false" unique="false"
	 */
	public Long getNumberMedian() {
		return this.numberMedian;
	}
	
	/**
	 * Set the numberMedian
	 */	
	public void setNumberMedian(Long aValue) {
		this.numberMedian = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 * @spring.validator type="required"
	 */	
	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateDate() {
		return this.updateDate;
	}
	
	/**
	 * Set the updateDate
	 */	
	public void setUpdateDate(java.util.Date aValue) {
		this.updateDate = aValue;
	}	

	/**
	 * 创建人	 * @return String
	 * @hibernate.property column="CREATE_BY" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(String aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return String
	 * @hibernate.property column="UPDATE_BY" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(String aValue) {
		this.updateBy = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="COMMENTS" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComments() {
		return this.comments;
	}
	
	/**
	 * Set the comments
	 */	
	public void setComments(String aValue) {
		this.comments = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BmBillNum)) {
			return false;
		}
		BmBillNum rhs = (BmBillNum) object;
		return new EqualsBuilder()
				.append(this.billNumId, rhs.billNumId)
				.append(this.billType, rhs.billType)
				.append(this.isCheckUniqueness, rhs.isCheckUniqueness)
				.append(this.isDeleteRetain, rhs.isDeleteRetain)
				.append(this.isAutoFill, rhs.isAutoFill)
				.append(this.prefix, rhs.prefix)
				.append(this.factor1Median, rhs.factor1Median)
				.append(this.factor2Median, rhs.factor2Median)
				.append(this.yearMedian, rhs.yearMedian)
				.append(this.isYear, rhs.isYear)
				.append(this.monthMedian, rhs.monthMedian)
				.append(this.isMonth, rhs.isMonth)
				.append(this.dayMedian, rhs.dayMedian)
				.append(this.isDay, rhs.isDay)
				.append(this.zeroLogo, rhs.zeroLogo)
				.append(this.numberMedian, rhs.numberMedian)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.comments, rhs.comments)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.billNumId) 
				.append(this.billType) 
				.append(this.isCheckUniqueness) 
				.append(this.isDeleteRetain) 
				.append(this.isAutoFill) 
				.append(this.prefix) 
				.append(this.factor1Median) 
				.append(this.factor2Median) 
				.append(this.yearMedian) 
				.append(this.isYear) 
				.append(this.monthMedian) 
				.append(this.isMonth) 
				.append(this.dayMedian) 
				.append(this.isDay) 
				.append(this.zeroLogo) 
				.append(this.numberMedian) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.comments) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("billNumId", this.billNumId) 
				.append("billType", this.billType) 
				.append("isCheckUniqueness", this.isCheckUniqueness) 
				.append("isDeleteRetain", this.isDeleteRetain) 
				.append("isAutoFill", this.isAutoFill) 
				.append("prefix", this.prefix) 
				.append("factor1Median", this.factor1Median) 
				.append("factor2Median", this.factor2Median) 
				.append("yearMedian", this.yearMedian) 
				.append("isYear", this.isYear) 
				.append("monthMedian", this.monthMedian) 
				.append("isMonth", this.isMonth) 
				.append("dayMedian", this.dayMedian) 
				.append("isDay", this.isDay) 
				.append("zeroLogo", this.zeroLogo) 
				.append("numberMedian", this.numberMedian) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("comments", this.comments) 
				.toString();
	}



}
