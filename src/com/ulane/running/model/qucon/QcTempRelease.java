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
 * QcTempRelease Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcTempRelease extends com.htsoft.core.model.BaseModel {

    protected Long tempReleId;
	protected Short chkChannel;
	protected String releName;
	protected String releContent;
	protected Short chkTypeId;
	protected Short allowRemark;
	protected Short allowRecheck;
	protected java.math.BigDecimal baseScore;
	protected java.math.BigDecimal minScore;
	protected java.math.BigDecimal maxScore;
	protected java.util.Date staDat;
	protected java.util.Date endDat;
	protected String releaseFilePath;
	protected String remark;
	protected Long relaseUseId;
	protected String relaseUerName;
	protected java.util.Date relaseDat;
	protected Short staId;
	protected com.ulane.running.model.qucon.QcTemplate qcTemplate;

	protected java.util.Set qcChecks = new java.util.HashSet();
	protected java.util.Set<QcTempReObj> qcTempReObjs = new java.util.HashSet<QcTempReObj> ();
	protected java.util.Set<QcTempReCha> qcTempReChas = new java.util.HashSet<QcTempReCha> ();
	/**
	 * Default Empty Constructor for class QcTempRelease
	 */
	public QcTempRelease () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcTempRelease
	 */
	public QcTempRelease (Long in_tempReleId) {
		this.setTempReleId(in_tempReleId);
    }

	public String getRelaseUerName() {
		return relaseUerName;
	}

	public void setRelaseUerName(String relaseUerName) {
		this.relaseUerName = relaseUerName;
	}

	public java.util.Set<QcTempReObj> getQcTempReObjs() {
		return qcTempReObjs;
	}

	public void setQcTempReObjs(java.util.Set<QcTempReObj> qcTempReObjs) {
		this.qcTempReObjs = qcTempReObjs;
	}

	public java.util.Set<QcTempReCha> getQcTempReChas() {
		return qcTempReChas;
	}

	public void setQcTempReChas(java.util.Set<QcTempReCha> qcTempReChas) {
		this.qcTempReChas = qcTempReChas;
	}

	public com.ulane.running.model.qucon.QcTemplate getQcTemplate () {
		return qcTemplate;
	}	
	
	public void setQcTemplate (com.ulane.running.model.qucon.QcTemplate in_qcTemplate) {
		this.qcTemplate = in_qcTemplate;
	}

	public java.util.Set getQcChecks () {
		return qcChecks;
	}	
	
	public void setQcChecks (java.util.Set in_qcChecks) {
		this.qcChecks = in_qcChecks;
	}

	/**
	 * 发布模板内码	 * @return Long
     * @hibernate.id column="TEMP_RELE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTempReleId() {
		return this.tempReleId;
	}
	
	/**
	 * Set the tempReleId
	 */	
	public void setTempReleId(Long aValue) {
		this.tempReleId = aValue;
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
	 * 考核渠道&CONLYLB	 * @return Short
	 * @hibernate.property column="CHK_CHANNEL" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getChkChannel() {
		return this.chkChannel;
	}
	
	/**
	 * Set the chkChannel
	 * @spring.validator type="required"
	 */	
	public void setChkChannel(Short aValue) {
		this.chkChannel = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="RELE_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getReleName() {
		return this.releName;
	}
	
	/**
	 * Set the releName
	 * @spring.validator type="required"
	 */	
	public void setReleName(String aValue) {
		this.releName = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="RELE_CONTENT" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getReleContent() {
		return this.releContent;
	}
	
	/**
	 * Set the releContent
	 */	
	public void setReleContent(String aValue) {
		this.releContent = aValue;
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
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="STA_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getStaDat() {
		return this.staDat;
	}
	
	/**
	 * Set the staDat
	 * @spring.validator type="required"
	 */	
	public void setStaDat(java.util.Date aValue) {
		this.staDat = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="END_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getEndDat() {
		return this.endDat;
	}
	
	/**
	 * Set the endDat
	 * @spring.validator type="required"
	 */	
	public void setEndDat(java.util.Date aValue) {
		this.endDat = aValue;
	}	

	/**
	 * 发布文件	 * @return String
	 * @hibernate.property column="RELEASE_FILE_PATH" type="java.lang.String" length="2048" not-null="true" unique="false"
	 */
	public String getReleaseFilePath() {
		return this.releaseFilePath;
	}
	
	/**
	 * Set the releaseFilePath
	 * @spring.validator type="required"
	 */	
	public void setReleaseFilePath(String aValue) {
		this.releaseFilePath = aValue;
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
	 * 发布人ID	 * @return Long
	 * @hibernate.property column="RELASE_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getRelaseUseId() {
		return this.relaseUseId;
	}
	
	/**
	 * Set the relaseUseId
	 * @spring.validator type="required"
	 */	
	public void setRelaseUseId(Long aValue) {
		this.relaseUseId = aValue;
	}	

	/**
	 * 发布日期	 * @return java.util.Date
	 * @hibernate.property column="RELASE_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getRelaseDat() {
		return this.relaseDat;
	}
	
	/**
	 * Set the relaseDat
	 * @spring.validator type="required"
	 */	
	public void setRelaseDat(java.util.Date aValue) {
		this.relaseDat = aValue;
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
		if (!(object instanceof QcTempRelease)) {
			return false;
		}
		QcTempRelease rhs = (QcTempRelease) object;
		return new EqualsBuilder()
				.append(this.tempReleId, rhs.tempReleId)
						.append(this.chkChannel, rhs.chkChannel)
				.append(this.releName, rhs.releName)
				.append(this.releContent, rhs.releContent)
				.append(this.chkTypeId, rhs.chkTypeId)
				.append(this.allowRemark, rhs.allowRemark)
				.append(this.allowRecheck, rhs.allowRecheck)
				.append(this.baseScore, rhs.baseScore)
				.append(this.minScore, rhs.minScore)
				.append(this.maxScore, rhs.maxScore)
				.append(this.staDat, rhs.staDat)
				.append(this.endDat, rhs.endDat)
				.append(this.releaseFilePath, rhs.releaseFilePath)
				.append(this.remark, rhs.remark)
				.append(this.relaseUseId, rhs.relaseUseId)
				.append(this.relaseDat, rhs.relaseDat)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.tempReleId) 
						.append(this.chkChannel) 
				.append(this.releName) 
				.append(this.releContent) 
				.append(this.chkTypeId) 
				.append(this.allowRemark) 
				.append(this.allowRecheck) 
				.append(this.baseScore) 
				.append(this.minScore) 
				.append(this.maxScore) 
				.append(this.staDat) 
				.append(this.endDat) 
				.append(this.releaseFilePath) 
				.append(this.remark) 
				.append(this.relaseUseId) 
				.append(this.relaseDat) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("tempReleId", this.tempReleId) 
						.append("chkChannel", this.chkChannel) 
				.append("releName", this.releName) 
				.append("releContent", this.releContent) 
				.append("chkTypeId", this.chkTypeId) 
				.append("allowRemark", this.allowRemark) 
				.append("allowRecheck", this.allowRecheck) 
				.append("baseScore", this.baseScore) 
				.append("minScore", this.minScore) 
				.append("maxScore", this.maxScore) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("releaseFilePath", this.releaseFilePath) 
				.append("remark", this.remark) 
				.append("relaseUseId", this.relaseUseId) 
				.append("relaseDat", this.relaseDat) 
				.append("staId", this.staId) 
				.toString();
	}



}
