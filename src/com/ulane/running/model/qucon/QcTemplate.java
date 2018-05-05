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
 * QcTemplate Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcTemplate extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = -5325940919753608040L;
	protected Long tmpId;
	protected String tmpName;
	protected String tmpContent;
	protected Short chkTypeId;
	protected Short allowRemark;
	protected Short allowRecheck;
	protected java.math.BigDecimal baseScore;
	protected java.math.BigDecimal minScore;
	protected java.math.BigDecimal maxScore;
	protected String remark;
	protected Long creUseId;
	protected java.util.Date creDat;
	protected Long updUseId;
	protected java.util.Date updDat;
	protected Short staId;
	protected Short allowTarRemark;

	public static final Short DISABLED = 2;
	public static final Short ENABLED = 1;
	
	public static final Short YES = 1;
	public static final Short NO = 0;

	public static final Short SCORE_INPUT = 1;
	public static final Short SCORE_OPT = 2;
	
	protected String updName;
	protected String creName;
	
	public Short getAllowTarRemark() {
		return allowTarRemark;
	}

	public void setAllowTarRemark(Short allowTarRemark) {
		this.allowTarRemark = allowTarRemark;
	}

	public String getUpdName() {
		return updName;
	}

	public void setUpdName(String updName) {
		this.updName = updName;
	}

	public String getCreName() {
		return creName;
	}

	public void setCreName(String creName) {
		this.creName = creName;
	}

	protected String allHTML;
	
	public String getAllHTML() {
		return allHTML;
	}

	public void setAllHTML(String allHTML) {
		this.allHTML = allHTML;
	}

	/**
	 * 评分项
	 */
	protected java.util.Set<QcScoreOpt> qcScoreOpts = new java.util.HashSet<QcScoreOpt> ();
	/**
	 * 章节
	 */
	protected java.util.Set<QcTempChapcter> qcTempChapcters = new java.util.HashSet<QcTempChapcter>();
	protected java.util.Set qcTempReleases = new java.util.HashSet();
	protected java.util.Set<QcTempTar> qcTempTars = new java.util.HashSet<QcTempTar>();

	/**
	 * Default Empty Constructor for class QcTemplate
	 */
	public QcTemplate () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcTemplate
	 */
	public QcTemplate (
		 Long in_tmpId
        ) {
		this.setTmpId(in_tmpId);
    }

	public java.util.Set<QcScoreOpt> getQcScoreOpts() {
		return qcScoreOpts;
	}

	public void setQcScoreOpts(java.util.Set<QcScoreOpt> qcScoreOpts) {
		this.qcScoreOpts = qcScoreOpts;
	}

	public java.util.Set<QcTempChapcter> getQcTempChapcters() {
		return qcTempChapcters;
	}

	public void setQcTempChapcters(java.util.Set<QcTempChapcter> qcTempChapcters) {
		this.qcTempChapcters = qcTempChapcters;
	}

	public void setQcTempReleases (java.util.Set in_qcTempReleases) {
		this.qcTempReleases = in_qcTempReleases;
	}

	public java.util.Set<QcTempTar> getQcTempTars () {
		return qcTempTars;
	}	
	
	public void setQcTempTars (java.util.Set<QcTempTar> in_qcTempTars) {
		this.qcTempTars = in_qcTempTars;
	}
    

	/**
	 * 模板内码	 * @return Long
     * @hibernate.id column="TMP_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTmpId() {
		return this.tmpId;
	}
	
	/**
	 * Set the tmpId
	 */	
	public void setTmpId(Long aValue) {
		this.tmpId = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="TMP_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getTmpName() {
		return this.tmpName;
	}
	
	/**
	 * Set the tmpName
	 * @spring.validator type="required"
	 */	
	public void setTmpName(String aValue) {
		this.tmpName = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="TMP_CONTENT" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getTmpContent() {
		return this.tmpContent;
	}
	
	/**
	 * Set the tmpContent
	 */	
	public void setTmpContent(String aValue) {
		this.tmpContent = aValue;
	}	

	/**
	 * 考评方式&QC_PFFS	 * @return Short
	 * @hibernate.property column="CHK_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getChkTypeId() {
		return this.chkTypeId;
	}
	
	/**
	 * Set the chkTypeId
	 * @spring.validator type="required"
	 */	
	public void setChkTypeId(Short aValue) {
		this.chkTypeId = aValue;
	}	

	/**
	 * 是否允许填写备注&YorN	 * @return Short
	 * @hibernate.property column="ALLOW_REMARK" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getAllowRemark() {
		return this.allowRemark;
	}
	
	/**
	 * Set the allowRemark
	 * @spring.validator type="required"
	 */	
	public void setAllowRemark(Short aValue) {
		this.allowRemark = aValue;
	}	

	/**
	 * 是否允许复议&YorN	 * @return Short
	 * @hibernate.property column="ALLOW_RECHECK" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getAllowRecheck() {
		return this.allowRecheck;
	}
	
	/**
	 * Set the allowRecheck
	 * @spring.validator type="required"
	 */	
	public void setAllowRecheck(Short aValue) {
		this.allowRecheck = aValue;
	}	

	/**
	 * 基础分	 * @return java.math.BigDecimal
	 * @hibernate.property column="BASE_SCORE" type="java.math.BigDecimal" length="5" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getBaseScore() {
		return this.baseScore;
	}
	
	/**
	 * Set the baseScore
	 * @spring.validator type="required"
	 */	
	public void setBaseScore(java.math.BigDecimal aValue) {
		this.baseScore = aValue;
	}	

	/**
	 * 最低分	 * @return java.math.BigDecimal
	 * @hibernate.property column="MIN_SCORE" type="java.math.BigDecimal" length="5" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getMinScore() {
		return this.minScore;
	}
	
	/**
	 * Set the minScore
	 * @spring.validator type="required"
	 */	
	public void setMinScore(java.math.BigDecimal aValue) {
		this.minScore = aValue;
	}	

	/**
	 * 最高分	 * @return java.math.BigDecimal
	 * @hibernate.property column="MAX_SCORE" type="java.math.BigDecimal" length="5" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getMaxScore() {
		return this.maxScore;
	}
	
	/**
	 * Set the maxScore
	 * @spring.validator type="required"
	 */	
	public void setMaxScore(java.math.BigDecimal aValue) {
		this.maxScore = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	/**
	 * 创建人ID	 * @return Long
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getCreUseId() {
		return this.creUseId;
	}
	
	/**
	 * Set the creUseId
	 * @spring.validator type="required"
	 */	
	public void setCreUseId(Long aValue) {
		this.creUseId = aValue;
	}	

	/**
	 * 创建日期	 * @return java.util.Date
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}
	
	/**
	 * Set the creDat
	 * @spring.validator type="required"
	 */	
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}	

	/**
	 * 修改人ID	 * @return Long
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdUseId() {
		return this.updUseId;
	}
	
	/**
	 * Set the updUseId
	 */	
	public void setUpdUseId(Long aValue) {
		this.updUseId = aValue;
	}	

	/**
	 * 修改日期	 * @return java.util.Date
	 * @hibernate.property column="UPD_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdDat() {
		return this.updDat;
	}
	
	/**
	 * Set the updDat
	 */	
	public void setUpdDat(java.util.Date aValue) {
		this.updDat = aValue;
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

	public java.util.Set getQcTempReleases() {
		return qcTempReleases;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcTemplate)) {
			return false;
		}
		QcTemplate rhs = (QcTemplate) object;
		return new EqualsBuilder()
				.append(this.tmpId, rhs.tmpId)
				.append(this.tmpName, rhs.tmpName)
				.append(this.tmpContent, rhs.tmpContent)
				.append(this.chkTypeId, rhs.chkTypeId)
				.append(this.allowRemark, rhs.allowRemark)
				.append(this.allowRecheck, rhs.allowRecheck)
				.append(this.baseScore, rhs.baseScore)
				.append(this.minScore, rhs.minScore)
				.append(this.maxScore, rhs.maxScore)
				.append(this.remark, rhs.remark)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creDat, rhs.creDat)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updDat, rhs.updDat)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.tmpId) 
				.append(this.tmpName) 
				.append(this.tmpContent) 
				.append(this.chkTypeId) 
				.append(this.allowRemark) 
				.append(this.allowRecheck) 
				.append(this.baseScore) 
				.append(this.minScore) 
				.append(this.maxScore) 
				.append(this.remark) 
				.append(this.creUseId) 
				.append(this.creDat) 
				.append(this.updUseId) 
				.append(this.updDat) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("tmpId", this.tmpId) 
				.append("tmpName", this.tmpName) 
				.append("tmpContent", this.tmpContent) 
				.append("chkTypeId", this.chkTypeId) 
				.append("allowRemark", this.allowRemark) 
				.append("allowRecheck", this.allowRecheck) 
				.append("baseScore", this.baseScore) 
				.append("minScore", this.minScore) 
				.append("maxScore", this.maxScore) 
				.append("remark", this.remark) 
				.append("creUseId", this.creUseId) 
				.append("creDat", this.creDat) 
				.append("updUseId", this.updUseId) 
				.append("updDat", this.updDat) 
				.append("staId", this.staId) 
				.toString();
	}



}
