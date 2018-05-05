package com.ulane.customer.model.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.system.AppUser;
import com.ulane.base.model.xitong.UlEmployee;

/**
 * ObFee Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObFee extends com.htsoft.core.model.BaseModel {
    protected Long feeId;
	protected Short month;
	protected Short quarter;
	protected java.math.BigDecimal amount;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected java.math.BigDecimal changedAmount;
	protected String comments;
	protected Short staId;
	protected AppUser appUser;
	protected com.ulane.customer.model.fee.ObFeeIndexProject obFeeIndexProject;
	protected com.ulane.base.model.xitong.UlEmployee  ulEmployee ;
	protected String feeValue;
    public String getFeeValue() {
		return feeValue;
	}

	public com.ulane.base.model.xitong.UlEmployee getUlEmployee() {
		return ulEmployee;
	}

	public void setUlEmployee(com.ulane.base.model.xitong.UlEmployee ulEmployee) {
		this.ulEmployee = ulEmployee;
	}

	public void setFeeValue(String feeValue) {
		this.feeValue = feeValue;
	}

	//处理字段
	protected String createByNam;
	protected String userNam;
	protected String userNo;
	protected String deparetNam;
	public String getCreateByNam() {
		return createByNam;
	}

	public void setCreateByNam(String createByNam) {
		this.createByNam = createByNam;
	}
	public String getUserNam() {
		return userNam;
	}

	public void setUserNam(String userNam) {
		this.userNam = userNam;
	}

	public String getUserNo() {
		return userNo;
	}

	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}

	public String getDeparetNam() {
		return deparetNam;
	}

	public void setDeparetNam(String deparetNam) {
		this.deparetNam = deparetNam;
	}

	/**
	 * Default Empty Constructor for class ObFee
	 */
	public ObFee () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObFee
	 */
	public ObFee (
		 Long in_feeId
        ) {
		this.setFeeId(in_feeId);
    }

	
	public AppUser getAppUser () {
		return appUser;
	}	
	
	public void setAppUser (AppUser in_appUser) {
		this.appUser = in_appUser;
	}
	
	public com.ulane.customer.model.fee.ObFeeIndexProject getObFeeIndexProject () {
		return obFeeIndexProject;
	}	
	
	public void setObFeeIndexProject (com.ulane.customer.model.fee.ObFeeIndexProject in_obFeeIndexProject) {
		this.obFeeIndexProject = in_obFeeIndexProject;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="FEE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFeeId() {
		return this.feeId;
	}
	
	/**
	 * Set the feeId
	 */	
	public void setFeeId(Long aValue) {
		this.feeId = aValue;
	}	

    /**
     * 员工内码 * @return Long
     * 
     * @hibernate.id column="USEID" type="java.lang.Long"
     *               generator-class="native"
     */
    public Long getUseid() {
        return this.getUlEmployee()==null?null:this.getUlEmployee().getUseid();
    }

    /**
     * Set the useid
     */
    public void setUseid(Long aValue) {
	    if (aValue==null) {
	    	ulEmployee = null;
	    } else if (ulEmployee == null) {
	    	ulEmployee = new UlEmployee(aValue);
	    	ulEmployee.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
	    	ulEmployee.setUseid(aValue);
	    }
    }
	/**
	 * 用户内码	 * @return Long
	 */
	public Long getUserid() {
		return this.getAppUser()==null?null:this.getAppUser().getUserId();
	}
	
	/**
	 * Set the userid
	 */	
	public void setUserid(Long aValue) {
	    if (aValue==null) {
	    	appUser = null;
	    } else if (appUser == null) {
	        appUser = new AppUser(aValue);
	        appUser.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			appUser.setUserId(aValue);
	    }
	}	

	/**
	 * 指标项内码	 * @return Long
	 */
	public Long getFeeIndexProjectId() {
		return this.getObFeeIndexProject()==null?null:this.getObFeeIndexProject().getFeeIndexProjectId();
	}
	
	/**
	 * Set the feeIndexProjectId
	 */	
	public void setFeeIndexProjectId(Long aValue) {
	    if (aValue==null) {
	    	obFeeIndexProject = null;
	    } else if (obFeeIndexProject == null) {
	        obFeeIndexProject = new com.ulane.customer.model.fee.ObFeeIndexProject(aValue);
	        obFeeIndexProject.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obFeeIndexProject.setFeeIndexProjectId(aValue);
	    }
	}	

	/**
	 * 月份	 * @return Short
	 * @hibernate.property column="MONTH" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getMonth() {
		return this.month;
	}
	
	/**
	 * Set the month
	 */	
	public void setMonth(Short aValue) {
		this.month = aValue;
	}	

	/**
	 * 季度	 * @return Short
	 * @hibernate.property column="QUARTER" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getQuarter() {
		return this.quarter;
	}
	
	/**
	 * Set the quarter
	 */	
	public void setQuarter(Short aValue) {
		this.quarter = aValue;
	}	

	/**
	 * 金额	 * @return java.math.BigDecimal
	 * @hibernate.property column="AMOUNT" type="java.math.BigDecimal" length="18" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getAmount() {
		return this.amount;
	}
	
	/**
	 * Set the amount
	 */	
	public void setAmount(java.math.BigDecimal aValue) {
		this.amount = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(Long aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(Long aValue) {
		this.updateBy = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
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
	 * 增减款	 * @return java.math.BigDecimal
	 * @hibernate.property column="CHANGED_AMOUNT" type="java.math.BigDecimal" length="18" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getChangedAmount() {
		return this.changedAmount;
	}
	
	/**
	 * Set the changedAmount
	 */	
	public void setChangedAmount(java.math.BigDecimal aValue) {
		this.changedAmount = aValue;
	}	

	/**
	 * 备注	 * @return String
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
	 * 状态	 * @return Short
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
		if (!(object instanceof ObFee)) {
			return false;
		}
		ObFee rhs = (ObFee) object;
		return new EqualsBuilder()
				.append(this.feeId, rhs.feeId)
								.append(this.month, rhs.month)
				.append(this.quarter, rhs.quarter)
				.append(this.amount, rhs.amount)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.changedAmount, rhs.changedAmount)
				.append(this.comments, rhs.comments)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.feeId) 
								.append(this.month) 
				.append(this.quarter) 
				.append(this.amount) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.changedAmount) 
				.append(this.comments) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("feeId", this.feeId) 
								.append("month", this.month) 
				.append("quarter", this.quarter) 
				.append("amount", this.amount) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("changedAmount", this.changedAmount) 
				.append("comments", this.comments) 
				.append("staId", this.staId) 
				.toString();
	}



}
