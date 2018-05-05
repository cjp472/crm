package com.ulane.running.model.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * QcChkRul Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcChkRul extends com.htsoft.core.model.BaseModel {

    protected Long chkRulId;
	protected String rulName;
	protected Long objTyeId;
	protected Long objSubTyeId;
	protected java.util.Date rulTimeSta;
	protected java.util.Date rulTimeEnd;
	protected Short rulStaId;
	
	protected Long createBy;
	protected Long updateBy;
	protected java.sql.Timestamp createDate;
	protected java.sql.Timestamp updateDate;
	
	protected String remark;
	
	protected String createByName;
	
	public static final Short OBJECT_TYPE_RESULT = 5;
	public static final Short OBJECT_TYPE_SKILL = 3;
	public static final Short OBJECT_TYPE_USERGROUP = 1;
	public static final Short OBJECT_TYPE_USER = 2;
	
	public static final Short TYPE_PERCENT = 1;
	public static final Short TYPE_AMOUNT = 2;
	
	public static final Short RULE_EVERY = 1;
	public static final Short RULE_GROUP = 2;
	
	public static final Short CHECK_HIS = 1;
	public static final Short CHECK_ORDER = 2;
	
	public String getCreateByName() {
		return createByName;
	}

	public void setCreateByName(String createByName) {
		this.createByName = createByName;
	}

	protected Set<QcChkRulDetail> qcChkRulDetails = new HashSet<QcChkRulDetail>();

	public Long getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}

	public Long getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}

	public java.sql.Timestamp getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.sql.Timestamp createDate) {
		this.createDate = createDate;
	}

	public java.sql.Timestamp getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(java.sql.Timestamp updateDate) {
		this.updateDate = updateDate;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Set<QcChkRulDetail> getQcChkRulDetails() {
		return qcChkRulDetails;
	}

	private void setQcChkRulDetails(Set<QcChkRulDetail> qcChkRulDetails) {
		this.qcChkRulDetails = qcChkRulDetails;
	}
	
	public void addQcChkRulDeails(QcChkRulDetail qcChkRulDetails){
		this.qcChkRulDetails.add(qcChkRulDetails);
	}

	/**
	 * Default Empty Constructor for class QcChkRul
	 */
	public QcChkRul () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcChkRul
	 */
	public QcChkRul (
		 Long in_chkRulId
        ) {
		this.setChkRulId(in_chkRulId);
    }

    

	/**
	 * 考核规则内码	 * @return Long
     * @hibernate.id column="CHK_RUL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getChkRulId() {
		return this.chkRulId;
	}
	
	/**
	 * Set the chkRulId
	 */	
	public void setChkRulId(Long aValue) {
		this.chkRulId = aValue;
	}	

	/**
	 * 规则名称	 * @return String
	 * @hibernate.property column="RUL_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getRulName() {
		return this.rulName;
	}
	
	/**
	 * Set the rulName
	 * @spring.validator type="required"
	 */	
	public void setRulName(String aValue) {
		this.rulName = aValue;
	}	

	/**
	 * 考核对象类型:联络历史、工单等	 * @return Long
	 * @hibernate.property column="OBJ_TYE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getObjTyeId() {
		return this.objTyeId;
	}
	
	/**
	 * Set the objTyeId
	 * @spring.validator type="required"
	 */	
	public void setObjTyeId(Long aValue) {
		this.objTyeId = aValue;
	}	

	/**
	 * 考核对象子类型:联络历史的录音、邮件等	 * @return Long
	 * @hibernate.property column="OBJ_SUB_TYE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getObjSubTyeId() {
		return this.objSubTyeId;
	}
	
	/**
	 * Set the objSubTyeId
	 * @spring.validator type="required"
	 */	
	public void setObjSubTyeId(Long aValue) {
		this.objSubTyeId = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="RUL_TIME_STA" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getRulTimeSta() {
		return this.rulTimeSta;
	}
	
	/**
	 * Set the rulTimeSta
	 */	
	public void setRulTimeSta(java.util.Date aValue) {
		this.rulTimeSta = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="RUL_TIME_END" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getRulTimeEnd() {
		return this.rulTimeEnd;
	}
	
	/**
	 * Set the rulTimeEnd
	 */	
	public void setRulTimeEnd(java.util.Date aValue) {
		this.rulTimeEnd = aValue;
	}	

	/**
	 * 规则状态	 * @return Short
	 * @hibernate.property column="RUL_STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getRulStaId() {
		return this.rulStaId;
	}
	
	/**
	 * Set the rulStaId
	 * @spring.validator type="required"
	 */	
	public void setRulStaId(Short aValue) {
		this.rulStaId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcChkRul)) {
			return false;
		}
		QcChkRul rhs = (QcChkRul) object;
		return new EqualsBuilder()
				.append(this.chkRulId, rhs.chkRulId)
				.append(this.rulName, rhs.rulName)
				.append(this.objTyeId, rhs.objTyeId)
				.append(this.objSubTyeId, rhs.objSubTyeId)
				.append(this.rulTimeSta, rhs.rulTimeSta)
				.append(this.rulTimeEnd, rhs.rulTimeEnd)
				.append(this.rulStaId, rhs.rulStaId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.chkRulId) 
				.append(this.rulName) 
				.append(this.objTyeId) 
				.append(this.objSubTyeId) 
				.append(this.rulTimeSta) 
				.append(this.rulTimeEnd) 
				.append(this.rulStaId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("chkRulId", this.chkRulId) 
				.append("rulName", this.rulName) 
				.append("objTyeId", this.objTyeId) 
				.append("objSubTyeId", this.objSubTyeId) 
				.append("rulTimeSta", this.rulTimeSta) 
				.append("rulTimeEnd", this.rulTimeEnd) 
				.append("rulStaId", this.rulStaId) 
				.toString();
	}
}
