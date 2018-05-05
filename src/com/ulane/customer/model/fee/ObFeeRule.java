package com.ulane.customer.model.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlUsergroup;

/**
 * ObFeeRule Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObFeeRule extends com.htsoft.core.model.BaseModel {

    protected Long feeRuleId;
	protected String ruleName;
	protected java.util.Date effectiveTime;
	protected java.util.Date failureTime;
	protected Short calculationWay;
	protected Short calculationMethod;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String comments;
	protected Short staId;
	protected com.ulane.customer.model.fee.ObFeeIndexProject obFeeIndexProject;
	protected java.util.Set<com.htsoft.oa.model.system.AppUser> obFeeRuleUsers = new java.util.HashSet<com.htsoft.oa.model.system.AppUser>();
	protected java.util.Set<ObFeeRuleValue> obFeeRuleValues = new java.util.HashSet<ObFeeRuleValue>();
	protected java.util.Set<UlUsergroup> ulUsergroups = new java.util.HashSet<UlUsergroup>(); //用户组
	protected java.util.Set<UlDepartment> ulDepartment = new java.util.HashSet<UlDepartment>(); //组织机构
	public static final Short YJGZ_WEIQIYONG    = 0; //未启用
	public static final Short YJGZ_YOUXIAO    	= 1; //有效
	public static final Short YJGZ_WUXIAO    	= 2; //无效
	
	
	//处理字段
	protected String createByName;
	protected String obFeeIndexProjectNam;
	protected String zhiwei;
	protected String zhiji;
	public String getZhiwei() {
		return zhiwei;
	}
	public void setZhiwei(String zhiwei) {
		this.zhiwei = zhiwei;
	}
	public String getZhiji() {
		return zhiji;
	}
	public void setZhiji(String zhiji) {
		this.zhiji = zhiji;
	}
	public String getObFeeIndexProjectNam() {
		return obFeeIndexProjectNam;
	}
	public void setObFeeIndexProjectNam(String obFeeIndexProjectNam) {
		this.obFeeIndexProjectNam = obFeeIndexProjectNam;
	}
	public java.util.Set<UlDepartment> getUlDepartment() {
		return ulDepartment;
	}
	public void setUlDepartment(java.util.Set<UlDepartment> ulDepartment) {
		this.ulDepartment = ulDepartment;
	}

	public String getCreateByName() {
		return createByName;
	}
	public void setCreateByName(String createByName) {
		this.createByName = createByName;
	}
	public java.util.Set<UlUsergroup> getUlUsergroups() {
		return ulUsergroups;
	}
	public void setUlUsergroups(java.util.Set<UlUsergroup> ulUsergroups) {
		this.ulUsergroups = ulUsergroups;
	}
	
	/**
	 * Default Empty Constructor for class ObFeeRule
	 */
	public ObFeeRule () {
		super();
	}
	/**
	 * Default Key Fields Constructor for class ObFeeRule
	 */
	public ObFeeRule (
		 Long in_feeRuleId
        ) {
		this.setFeeRuleId(in_feeRuleId);
    }

	
	public com.ulane.customer.model.fee.ObFeeIndexProject getObFeeIndexProject () {
		return obFeeIndexProject;
	}	
	
	public void setObFeeIndexProject (com.ulane.customer.model.fee.ObFeeIndexProject in_obFeeIndexProject) {
		this.obFeeIndexProject = in_obFeeIndexProject;
	}

	public java.util.Set<com.htsoft.oa.model.system.AppUser> getObFeeRuleUsers () {
		return obFeeRuleUsers;
	}	
	
	public void setObFeeRuleUsers (java.util.Set<com.htsoft.oa.model.system.AppUser> in_obFeeRuleUsers) {
		this.obFeeRuleUsers = in_obFeeRuleUsers;
	}


    

	public java.util.Set<ObFeeRuleValue> getObFeeRuleValues() {
		return obFeeRuleValues;
	}
	public void setObFeeRuleValues(java.util.Set<ObFeeRuleValue> obFeeRuleValues) {
		this.obFeeRuleValues = obFeeRuleValues;
	}
	/**
	 * 佣金规则内码	 * @return Long
     * @hibernate.id column="FEE_RULE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFeeRuleId() {
		return this.feeRuleId;
	}
	
	/**
	 * Set the feeRuleId
	 */	
	public void setFeeRuleId(Long aValue) {
		this.feeRuleId = aValue;
	}	

	/**
	 * 内码	 * @return Long
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
	 * 规则名	 * @return String
	 * @hibernate.property column="RULE_NAME" type="java.lang.String" length="120" not-null="false" unique="false"
	 */
	public String getRuleName() {
		return this.ruleName;
	}
	
	/**
	 * Set the ruleName
	 */	
	public void setRuleName(String aValue) {
		this.ruleName = aValue;
	}	

	/**
	 * 有效时间	 * @return java.util.Date
	 * @hibernate.property column="EFFECTIVE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEffectiveTime() {
		return this.effectiveTime;
	}
	
	/**
	 * Set the effectiveTime
	 */	
	public void setEffectiveTime(java.util.Date aValue) {
		this.effectiveTime = aValue;
	}	

	/**
	 * 失效时间	 * @return java.util.Date
	 * @hibernate.property column="FAILURE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getFailureTime() {
		return this.failureTime;
	}
	
	/**
	 * Set the failureTime
	 */	
	public void setFailureTime(java.util.Date aValue) {
		this.failureTime = aValue;
	}	

	/**
	 * 计算方式	 * @return Short
	 * @hibernate.property column="CALCULATION_WAY" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCalculationWay() {
		return this.calculationWay;
	}
	
	/**
	 * Set the calculationWay
	 */	
	public void setCalculationWay(Short aValue) {
		this.calculationWay = aValue;
	}	

	/**
	 * 计算方法	 * @return Short
	 * @hibernate.property column="CALCULATION_METHOD" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCalculationMethod() {
		return this.calculationMethod;
	}
	
	/**
	 * Set the calculationMethod
	 */	
	public void setCalculationMethod(Short aValue) {
		this.calculationMethod = aValue;
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
		if (!(object instanceof ObFeeRule)) {
			return false;
		}
		ObFeeRule rhs = (ObFeeRule) object;
		return new EqualsBuilder()
				.append(this.feeRuleId, rhs.feeRuleId)
						.append(this.ruleName, rhs.ruleName)
				.append(this.effectiveTime, rhs.effectiveTime)
				.append(this.failureTime, rhs.failureTime)
				.append(this.calculationWay, rhs.calculationWay)
				.append(this.calculationMethod, rhs.calculationMethod)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.comments, rhs.comments)
				.append(this.zhiwei, rhs.zhiwei)
				.append(this.zhiji, rhs.zhiji)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.feeRuleId) 
						.append(this.ruleName) 
				.append(this.effectiveTime) 
				.append(this.failureTime) 
				.append(this.calculationWay) 
				.append(this.calculationMethod) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.comments) 
				.append(this.staId) 
				.append(this.zhiwei) 
				.append(this.zhiji) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("feeRuleId", this.feeRuleId) 
						.append("ruleName", this.ruleName) 
				.append("effectiveTime", this.effectiveTime) 
				.append("failureTime", this.failureTime) 
				.append("calculationWay", this.calculationWay) 
				.append("calculationMethod", this.calculationMethod) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("comments", this.comments) 
				.append("staId", this.staId) 
				.append("zhiwei", this.zhiwei) 
				.append("zhiji", this.zhiji) 
				.toString();
	}



}
