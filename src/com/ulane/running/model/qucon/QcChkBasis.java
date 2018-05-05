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
 * QcChkBasis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcChkBasis extends com.htsoft.core.model.BaseModel {

    protected Long chkBasId;
	protected Short chkBasisType;
	protected String chkBasisObj;
	protected String chkBasisRemark;
	protected com.ulane.running.model.qucon.QcCheck qcCheck;


	/**
	 * Default Empty Constructor for class QcChkBasis
	 */
	public QcChkBasis () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcChkBasis
	 */
	public QcChkBasis (
		 Long in_chkBasId
        ) {
		this.setChkBasId(in_chkBasId);
    }

	
	public com.ulane.running.model.qucon.QcCheck getQcCheck () {
		return qcCheck;
	}	
	
	public void setQcCheck (com.ulane.running.model.qucon.QcCheck in_qcCheck) {
		this.qcCheck = in_qcCheck;
	}
    

	/**
	 * 考核依据内码	 * @return Long
     * @hibernate.id column="CHK_BAS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getChkBasId() {
		return this.chkBasId;
	}
	
	/**
	 * Set the chkBasId
	 */	
	public void setChkBasId(Long aValue) {
		this.chkBasId = aValue;
	}	

	/**
	 * 考核结果	 * @return Long
	 */
	public Long getChkId() {
		return this.getQcCheck()==null?null:this.getQcCheck().getChkId();
	}
	
	/**
	 * Set the chkId
	 */	
	public void setChkId(Long aValue) {
	    if (aValue==null) {
	    	qcCheck = null;
	    } else if (qcCheck == null) {
	        qcCheck = new com.ulane.running.model.qucon.QcCheck(aValue);
	        qcCheck.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			qcCheck.setChkId(aValue);
	    }
	}	

	/**
	 * 考核依据&QC_KHYJ	 * @return Short
	 * @hibernate.property column="CHK_BASIS_TYPE" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getChkBasisType() {
		return this.chkBasisType;
	}
	
	/**
	 * Set the chkBasisType
	 * @spring.validator type="required"
	 */	
	public void setChkBasisType(Short aValue) {
		this.chkBasisType = aValue;
	}	

	/**
	 * 依据对象	 * @return String
	 * @hibernate.property column="CHK_BASIS_OBJ" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getChkBasisObj() {
		return this.chkBasisObj;
	}
	
	/**
	 * Set the chkBasisObj
	 */	
	public void setChkBasisObj(String aValue) {
		this.chkBasisObj = aValue;
	}	

	/**
	 * 依据备注	 * @return String
	 * @hibernate.property column="CHK_BASIS_REMARK" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getChkBasisRemark() {
		return this.chkBasisRemark;
	}
	
	/**
	 * Set the chkBasisRemark
	 */	
	public void setChkBasisRemark(String aValue) {
		this.chkBasisRemark = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcChkBasis)) {
			return false;
		}
		QcChkBasis rhs = (QcChkBasis) object;
		return new EqualsBuilder()
				.append(this.chkBasId, rhs.chkBasId)
						.append(this.chkBasisType, rhs.chkBasisType)
				.append(this.chkBasisObj, rhs.chkBasisObj)
				.append(this.chkBasisRemark, rhs.chkBasisRemark)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.chkBasId) 
						.append(this.chkBasisType) 
				.append(this.chkBasisObj) 
				.append(this.chkBasisRemark) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("chkBasId", this.chkBasId) 
						.append("chkBasisType", this.chkBasisType) 
				.append("chkBasisObj", this.chkBasisObj) 
				.append("chkBasisRemark", this.chkBasisRemark) 
				.toString();
	}



}
