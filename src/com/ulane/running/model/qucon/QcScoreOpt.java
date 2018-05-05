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
 * QcScoreOpt Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcScoreOpt extends com.htsoft.core.model.BaseModel {

    protected Long scoreOptId;
	protected String optName;
	protected java.math.BigDecimal optScore;
	protected Short disorder;
	protected com.ulane.running.model.qucon.QcTemplate qcTemplate;

	protected java.util.Set qcCheckDetails = new java.util.HashSet();
	protected java.util.Set<QcTempTar> qcTempTars = new java.util.HashSet<QcTempTar>();

	/**
	 * Default Empty Constructor for class QcScoreOpt
	 */
	public QcScoreOpt () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcScoreOpt
	 */
	public QcScoreOpt (
		 Long in_scoreOptId
        ) {
		this.setScoreOptId(in_scoreOptId);
    }

	
	public com.ulane.running.model.qucon.QcTemplate getQcTemplate () {
		return qcTemplate;
	}	
	
	public void setQcTemplate (com.ulane.running.model.qucon.QcTemplate in_qcTemplate) {
		this.qcTemplate = in_qcTemplate;
	}

	public java.util.Set getQcCheckDetails () {
		return qcCheckDetails;
	}	
	
	public void setQcCheckDetails (java.util.Set in_qcCheckDetails) {
		this.qcCheckDetails = in_qcCheckDetails;
	}

	public java.util.Set<QcTempTar> getQcTempTars () {
		return qcTempTars;
	}	
	
	public void setQcTempTars (java.util.Set<QcTempTar> in_qcTempTars) {
		this.qcTempTars = in_qcTempTars;
	}
    

	/**
	 * 评分项内码	 * @return Long
     * @hibernate.id column="SCORE_OPT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getScoreOptId() {
		return this.scoreOptId;
	}
	
	/**
	 * Set the scoreOptId
	 */	
	public void setScoreOptId(Long aValue) {
		this.scoreOptId = aValue;
	}	

	/**
	 * 模板ID	 * @return Long
	 */
	public Long getTmpId() {
		return this.getQcTemplate()==null?null:this.getQcTemplate().getTmpId();
	}
	
	/**
	 * Set the tmpId
	 */	
	public void setTmpId(Long aValue) {
	    if (aValue==null) {
	    	qcTemplate = null;
	    } else if (qcTemplate == null) {
	        qcTemplate = new com.ulane.running.model.qucon.QcTemplate(aValue);
	        qcTemplate.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			qcTemplate.setTmpId(aValue);
	    }
	}	

	/**
	 * 名称	 * @return Short
	 * @hibernate.property column="OPT_NAME" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public String getOptName() {
		return this.optName;
	}
	
	/**
	 * Set the optName
	 * @spring.validator type="required"
	 */	
	public void setOptName(String aValue) {
		this.optName = aValue;
	}	

	/**
	 * 分数	 * @return java.math.BigDecimal
	 * @hibernate.property column="OPT_SCORE" type="java.math.BigDecimal" length="5" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getOptScore() {
		return this.optScore;
	}
	
	/**
	 * Set the optScore
	 * @spring.validator type="required"
	 */	
	public void setOptScore(java.math.BigDecimal aValue) {
		this.optScore = aValue;
	}	

	/**
	 * 序号	 * @return Short
	 * @hibernate.property column="DISORDER" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDisorder() {
		return this.disorder;
	}
	
	/**
	 * Set the disorder
	 * @spring.validator type="required"
	 */	
	public void setDisorder(Short aValue) {
		this.disorder = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcScoreOpt)) {
			return false;
		}
		QcScoreOpt rhs = (QcScoreOpt) object;
		return new EqualsBuilder()
				.append(this.scoreOptId, rhs.scoreOptId)
						.append(this.optName, rhs.optName)
				.append(this.optScore, rhs.optScore)
				.append(this.disorder, rhs.disorder)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.scoreOptId) 
						.append(this.optName) 
				.append(this.optScore) 
				.append(this.disorder) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("scoreOptId", this.scoreOptId) 
						.append("optName", this.optName) 
				.append("optScore", this.optScore) 
				.append("disorder", this.disorder) 
				.toString();
	}



}
