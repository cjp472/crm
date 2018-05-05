package com.ulane.running.model.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;


/**
 * 评分指标详情对象
 * 
 */
public class QcTempTar extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = 388122811502686367L;
	protected Long tmpTarId;
	protected java.math.BigDecimal score;
	protected Short disorder;
	protected Short staId;
	protected String score_opt;
	protected Long maxScore;
	protected Long minScore;
	protected com.ulane.running.model.qucon.QcTarget qcTarget;
	protected com.ulane.running.model.qucon.QcTemplate qcTemplate;
	protected com.ulane.running.model.qucon.QcTempChapcter qcTempChapcter;
	protected java.util.Set qcCheckDetails = new java.util.HashSet();
	protected java.util.Set<QcScoreOpt> qcScoreOpts = new java.util.HashSet<QcScoreOpt>();
	
	protected String designHTML;
	protected String qcHTML;
	
	public String getDesignHTML() {
		return designHTML;
	}

	public void setDesignHTML(String designHTML) {
		this.designHTML = designHTML;
	}

	public String getQcHTML() {
		return qcHTML;
	}

	public void setQcHTML(String qcHTML) {
		this.qcHTML = qcHTML;
	}

	/**
	 * Default Empty Constructor for class QcTempTar
	 */
	public QcTempTar () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcTempTar
	 */
	public QcTempTar (
		 Long in_tmpTarId
        ) {
		this.setTmpTarId(in_tmpTarId);
    }

	public String getScore_opt() {
		return score_opt;
	}

	public void setScore_opt(String score_opt) {
		this.score_opt = score_opt;
	}

	public Long getMaxScore() {
		return maxScore;
	}

	public void setMaxScore(Long maxScore) {
		this.maxScore = maxScore;
	}

	public Long getMinScore() {
		return minScore;
	}

	public void setMinScore(Long minScore) {
		this.minScore = minScore;
	}

	public com.ulane.running.model.qucon.QcTarget getQcTarget () {
		return qcTarget;
	}	
	
	public void setQcTarget (com.ulane.running.model.qucon.QcTarget in_qcTarget) {
		this.qcTarget = in_qcTarget;
	}
	
	public com.ulane.running.model.qucon.QcTemplate getQcTemplate () {
		return qcTemplate;
	}	
	
	public void setQcTemplate (com.ulane.running.model.qucon.QcTemplate in_qcTemplate) {
		this.qcTemplate = in_qcTemplate;
	}
	
	public com.ulane.running.model.qucon.QcTempChapcter getQcTempChapcter () {
		return qcTempChapcter;
	}	
	
	public void setQcTempChapcter (com.ulane.running.model.qucon.QcTempChapcter in_qcTempChapcter) {
		this.qcTempChapcter = in_qcTempChapcter;
	}

	public java.util.Set getQcCheckDetails () {
		return qcCheckDetails;
	}	
	
	public void setQcCheckDetails (java.util.Set in_qcCheckDetails) {
		this.qcCheckDetails = in_qcCheckDetails;
	}

	public java.util.Set<QcScoreOpt> getQcScoreOpts () {
		return qcScoreOpts;
	}	
	
	public void setQcScoreOpts (java.util.Set<QcScoreOpt> in_qcScoreOpts) {
		this.qcScoreOpts = in_qcScoreOpts;
	}
    

	/**
	 * 模板指标内码	 * @return Long
     * @hibernate.id column="TMP_TAR_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTmpTarId() {
		return this.tmpTarId;
	}
	
	/**
	 * Set the tmpTarId
	 */	
	public void setTmpTarId(Long aValue) {
		this.tmpTarId = aValue;
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
	 * 章节ID	 * @return Long
	 */
	public Long getTempCatId() {
		return this.getQcTempChapcter()==null?null:this.getQcTempChapcter().getTempCatId();
	}
	
	/**
	 * Set the tempCatId
	 */	
	public void setTempCatId(Long aValue) {
	    if (aValue==null) {
	    	qcTempChapcter = null;
	    } else if (qcTempChapcter == null) {
	        qcTempChapcter = new com.ulane.running.model.qucon.QcTempChapcter(aValue);
	        qcTempChapcter.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			qcTempChapcter.setTempCatId(aValue);
	    }
	}	

	/**
	 * 指标ID	 * @return Long
	 */
//	public Long getTarId() {
//		return this.getQcTarget()==null?null:this.getQcTarget().getTarId();
//	}
	
	/**
	 * Set the tarId
	 */	
//	public void setTarId(Long aValue) {
//	    if (aValue==null) {
//	    	qcTarget = null;
//	    } else if (qcTarget == null) {
//	        qcTarget = new com.ulane.running.model.qucon.QcTarget(aValue);
//	        qcTarget.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//			qcTarget.setTarId(aValue);
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
	 * 状态：有效、注销&QC_ZT	 * @return Short
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
		if (!(object instanceof QcTempTar)) {
			return false;
		}
		QcTempTar rhs = (QcTempTar) object;
		return new EqualsBuilder()
				.append(this.tmpTarId, rhs.tmpTarId)
										.append(this.score, rhs.score)
				.append(this.disorder, rhs.disorder)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.tmpTarId) 
										.append(this.score) 
				.append(this.disorder) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("tmpTarId", this.tmpTarId) 
										.append("score", this.score) 
				.append("disorder", this.disorder) 
				.append("staId", this.staId) 
				.toString();
	}



}
