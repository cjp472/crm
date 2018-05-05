package com.ulane.running.model.qucon;
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
 * QcChkRulDetail Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcChkRulDetail extends com.htsoft.core.model.BaseModel {

    protected Long detailId;
	protected Long typId;
	protected String val;
	protected String valSta;
	protected String valEnd;
	protected Short rulStaId;
	protected Short rul;
	
	protected Short detailType;
	protected Long objectId;
	
	protected String name;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	protected QcChkRul qcChkRul;
	
	public QcChkRul getQcChkRul() {
		return qcChkRul;
	}

	public void setQcChkRul(QcChkRul qcChkRul) {
		this.qcChkRul = qcChkRul;
	}

	public Short getDetailType() {
		return detailType;
	}

	public void setDetailType(Short detailType) {
		this.detailType = detailType;
	}

	public Long getObjectId() {
		return objectId;
	}

	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	public Short getRul() {
		return rul;
	}

	public void setRul(Short rul) {
		this.rul = rul;
	}

	/**
	 * Default Empty Constructor for class QcChkRulDetail
	 */
	public QcChkRulDetail () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcChkRulDetail
	 */
	public QcChkRulDetail (
		 Long in_detailId
        ) {
		this.setDetailId(in_detailId);
    }

    

	/**
	 * 考核规则明细内码	 * @return Long
     * @hibernate.id column="DETAIL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getDetailId() {
		return this.detailId;
	}
	
	/**
	 * Set the detailId
	 */	
	public void setDetailId(Long aValue) {
		this.detailId = aValue;
	}	


	/**
	 * 方式:按百分比、指定个数	 * @return Long
	 * @hibernate.property column="TYP_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getTypId() {
		return this.typId;
	}
	
	/**
	 * Set the typId
	 * @spring.validator type="required"
	 */	
	public void setTypId(Long aValue) {
		this.typId = aValue;
	}	

	/**
	 * 值	 * @return String
	 * @hibernate.property column="VAL" type="java.lang.String" length="10" not-null="true" unique="false"
	 */
	public String getVal() {
		return this.val;
	}
	
	/**
	 * Set the val
	 * @spring.validator type="required"
	 */	
	public void setVal(String aValue) {
		this.val = aValue;
	}	

	/**
	 * 条件开始值	 * @return String
	 * @hibernate.property column="VAL_STA" type="java.lang.String" length="10" not-null="false" unique="false"
	 */
	public String getValSta() {
		return this.valSta;
	}
	
	/**
	 * Set the valSta
	 */	
	public void setValSta(String aValue) {
		this.valSta = aValue;
	}	

	/**
	 * 条件结束值	 * @return String
	 * @hibernate.property column="VAL_END" type="java.lang.String" length="10" not-null="false" unique="false"
	 */
	public String getValEnd() {
		return this.valEnd;
	}
	
	/**
	 * Set the valEnd
	 */	
	public void setValEnd(String aValue) {
		this.valEnd = aValue;
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
		if (!(object instanceof QcChkRulDetail)) {
			return false;
		}
		QcChkRulDetail rhs = (QcChkRulDetail) object;
		return new EqualsBuilder()
				.append(this.detailId, rhs.detailId)
				.append(this.typId, rhs.typId)
				.append(this.val, rhs.val)
				.append(this.valSta, rhs.valSta)
				.append(this.valEnd, rhs.valEnd)
				.append(this.rulStaId, rhs.rulStaId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.detailId) 
				.append(this.typId) 
				.append(this.val) 
				.append(this.valSta) 
				.append(this.valEnd) 
				.append(this.rulStaId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("detailId", this.detailId) 
				.append("typId", this.typId) 
				.append("val", this.val) 
				.append("valSta", this.valSta) 
				.append("valEnd", this.valEnd) 
				.append("rulStaId", this.rulStaId) 
				.toString();
	}



}
