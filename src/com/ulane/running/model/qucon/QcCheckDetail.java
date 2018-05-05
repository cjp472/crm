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
 * QcCheckDetail Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcCheckDetail extends com.htsoft.core.model.BaseModel {

    protected Long checkDetailId;
	protected java.math.BigDecimal score;
	protected String remark;
	protected com.ulane.running.model.qucon.QcCheck qcCheck;
//	protected com.ulane.running.model.qucon.QcScoreOpt qcScoreOpt;
	protected com.ulane.running.model.qucon.QcTempTar qcTempTar;


	/**
	 * Default Empty Constructor for class QcCheckDetail
	 */
	public QcCheckDetail () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcCheckDetail
	 */
	public QcCheckDetail (
		 Long in_checkDetailId
        ) {
		this.setCheckDetailId(in_checkDetailId);
    }

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public com.ulane.running.model.qucon.QcCheck getQcCheck () {
		return qcCheck;
	}	
	
	public void setQcCheck (com.ulane.running.model.qucon.QcCheck in_qcCheck) {
		this.qcCheck = in_qcCheck;
	}
	
//	public com.ulane.running.model.qucon.QcScoreOpt getQcScoreOpt () {
//		return qcScoreOpt;
//	}	
//	
//	public void setQcScoreOpt (com.ulane.running.model.qucon.QcScoreOpt in_qcScoreOpt) {
//		this.qcScoreOpt = in_qcScoreOpt;
//	}
	
	public com.ulane.running.model.qucon.QcTempTar getQcTempTar () {
		return qcTempTar;
	}	
	
	public void setQcTempTar (com.ulane.running.model.qucon.QcTempTar in_qcTempTar) {
		this.qcTempTar = in_qcTempTar;
	}
    

	/**
	 * 考核结果内码	 * @return Long
     * @hibernate.id column="CHECK_DETAIL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getCheckDetailId() {
		return this.checkDetailId;
	}
	
	/**
	 * Set the checkDetailId
	 */	
	public void setCheckDetailId(Long aValue) {
		this.checkDetailId = aValue;
	}	

	/**
	 * 考核结果ID	 * @return Long
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
	 * 模板指标ID	 * @return Long
	 */
	public Long getTmpTarId() {
		return this.getQcTempTar()==null?null:this.getQcTempTar().getTmpTarId();
	}
	
	/**
	 * Set the tmpTarId
	 */	
	public void setTmpTarId(Long aValue) {
	    if (aValue==null) {
	    	qcTempTar = null;
	    } else if (qcTempTar == null) {
	        qcTempTar = new com.ulane.running.model.qucon.QcTempTar(aValue);
	        qcTempTar.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			qcTempTar.setTmpTarId(aValue);
	    }
	}	

//	/**
//	 * 评分项ID	 * @return Long
//	 */
//	public Long getScoreOptId() {
//		return this.getQcScoreOpt()==null?null:this.getQcScoreOpt().getScoreOptId();
//	}
	
//	/**
//	 * Set the scoreOptId
//	 */	
//	public void setScoreOptId(Long aValue) {
//	    if (aValue==null) {
//	    	qcScoreOpt = null;
//	    } else if (qcScoreOpt == null) {
//	        qcScoreOpt = new com.ulane.running.model.qucon.QcScoreOpt(aValue);
//	        qcScoreOpt.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//			qcScoreOpt.setScoreOptId(aValue);
//	    }
//	}	

	/**
	 * 分值,加分、减分时适用	 * @return java.math.BigDecimal
	 * @hibernate.property column="SCORE" type="java.math.BigDecimal" length="5" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getScore() {
		return this.score;
	}
	
	/**
	 * Set the score
	 * @spring.validator type="required"
	 */	
	public void setScore(java.math.BigDecimal aValue) {
		this.score = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcCheckDetail)) {
			return false;
		}
		QcCheckDetail rhs = (QcCheckDetail) object;
		return new EqualsBuilder()
				.append(this.checkDetailId, rhs.checkDetailId)
				.append(this.qcTempTar.tmpTarId, rhs.qcTempTar.tmpTarId)
				.append(this.score, rhs.score)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.checkDetailId)
				.append(this.qcTempTar.tmpTarId)
				.append(this.score) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("checkDetailId", this.checkDetailId) 
										.append("score", this.score) 
				.toString();
	}



}
