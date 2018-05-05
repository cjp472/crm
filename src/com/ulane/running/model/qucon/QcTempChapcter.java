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
 * QcTempChapcter Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcTempChapcter extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = -2087748982151477101L;
	protected Long tempCatId;
	protected String catName;
	protected String remark;
	protected java.math.BigDecimal score;
	protected Short disorder;
	protected Short staId;
	protected com.ulane.running.model.qucon.QcTemplate qcTemplate;
	protected Short type;

	protected java.util.Set<QcTempTar> qcTempTars = new java.util.HashSet<QcTempTar>();
	
	public static final Short ADD = 1;
	public static final Short CUT = 2;
	public static final Short YANZHONG = 3;
	/**
	 * Default Empty Constructor for class QcTempChapcter
	 */
	public QcTempChapcter () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcTempChapcter
	 */
	public QcTempChapcter (
		 Long in_tempCatId
        ) {
		this.setTempCatId(in_tempCatId);
    }

	public Short getType() {
		return type;
	}

	public void setType(Short type) {
		this.type = type;
	}

	public com.ulane.running.model.qucon.QcTemplate getQcTemplate () {
		return qcTemplate;
	}	
	
	public void setQcTemplate (com.ulane.running.model.qucon.QcTemplate in_qcTemplate) {
		this.qcTemplate = in_qcTemplate;
	}

	public java.util.Set<QcTempTar> getQcTempTars () {
		return qcTempTars;
	}	
	
	public void setQcTempTars (java.util.Set<QcTempTar> in_qcTempTars) {
		this.qcTempTars = in_qcTempTars;
	}
    

	/**
	 * 章节内码	 * @return Long
     * @hibernate.id column="TEMP_CAT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTempCatId() {
		return this.tempCatId;
	}
	
	/**
	 * Set the tempCatId
	 */	
	public void setTempCatId(Long aValue) {
		this.tempCatId = aValue;
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
	 * 名称	 * @return String
	 * @hibernate.property column="CAT_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getCatName() {
		return this.catName;
	}
	
	/**
	 * Set the catName
	 * @spring.validator type="required"
	 */	
	public void setCatName(String aValue) {
		this.catName = aValue;
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
		if (!(object instanceof QcTempChapcter)) {
			return false;
		}
		QcTempChapcter rhs = (QcTempChapcter) object;
		return new EqualsBuilder()
				.append(this.tempCatId, rhs.tempCatId)
						.append(this.catName, rhs.catName)
				.append(this.remark, rhs.remark)
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
				.append(this.tempCatId) 
						.append(this.catName) 
				.append(this.remark) 
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
				.append("tempCatId", this.tempCatId) 
						.append("catName", this.catName) 
				.append("remark", this.remark) 
				.append("score", this.score) 
				.append("disorder", this.disorder) 
				.append("staId", this.staId) 
				.toString();
	}



}
