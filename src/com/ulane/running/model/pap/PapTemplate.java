package com.ulane.running.model.pap;
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
 * PapTemplate Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class PapTemplate extends com.htsoft.core.model.BaseModel {

    protected Long tmpId;
	protected String tmpName;
	protected String tmpContent;
	protected Short displayLayoutId;
	protected Short displayStyleId;
	protected String remark;
	protected String guideFilePath;
	protected Short applyAnsNo;
	protected Short needPassChk;
	protected Short applyAnsMuti;
	protected Short applyViewRes;
	protected Short displayGuide;
	protected Long creUseId;
	protected java.util.Date creDat;
	protected Long updUseId;
	protected java.util.Date updDat;
	protected Short staId;

	protected java.util.Set papChapcters = new java.util.HashSet();
	protected java.util.Set papReleases = new java.util.HashSet();
	protected java.util.Set papTemGotoRules = new java.util.HashSet();
	protected java.util.Set papTemQues = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class PapTemplate
	 */
	public PapTemplate () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PapTemplate
	 */
	public PapTemplate (
		 Long in_tmpId
        ) {
		this.setTmpId(in_tmpId);
    }


	public java.util.Set getPapChapcters () {
		return papChapcters;
	}	
	
	public void setPapChapcters (java.util.Set in_papChapcters) {
		this.papChapcters = in_papChapcters;
	}

	public java.util.Set getPapReleases () {
		return papReleases;
	}	
	
	public void setPapReleases (java.util.Set in_papReleases) {
		this.papReleases = in_papReleases;
	}

	public java.util.Set getPapTemGotoRules () {
		return papTemGotoRules;
	}	
	
	public void setPapTemGotoRules (java.util.Set in_papTemGotoRules) {
		this.papTemGotoRules = in_papTemGotoRules;
	}

	public java.util.Set getPapTemQues () {
		return papTemQues;
	}	
	
	public void setPapTemQues (java.util.Set in_papTemQues) {
		this.papTemQues = in_papTemQues;
	}
    

	/**
	 * 问卷模板内码	 * @return Long
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
	 * 展示布局：全部展示、按树展示、按标签展示	 * @return Short
	 * @hibernate.property column="DISPLAY_LAYOUT_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDisplayLayoutId() {
		return this.displayLayoutId;
	}
	
	/**
	 * Set the displayLayoutId
	 * @spring.validator type="required"
	 */	
	public void setDisplayLayoutId(Short aValue) {
		this.displayLayoutId = aValue;
	}	

	/**
	 * 展示样式：按跳题展示、全部展示、展示当前题目	 * @return Short
	 * @hibernate.property column="DISPLAY_STYLE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDisplayStyleId() {
		return this.displayStyleId;
	}
	
	/**
	 * Set the displayStyleId
	 * @spring.validator type="required"
	 */	
	public void setDisplayStyleId(Short aValue) {
		this.displayStyleId = aValue;
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
	 * 前导页文件地址	 * @return String
	 * @hibernate.property column="GUIDE_FILE_PATH" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getGuideFilePath() {
		return this.guideFilePath;
	}
	
	/**
	 * Set the guideFilePath
	 */	
	public void setGuideFilePath(String aValue) {
		this.guideFilePath = aValue;
	}	

	/**
	 * 是否允许匿名答卷&YorN	 * @return Short
	 * @hibernate.property column="APPLY_ANS_NO" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getApplyAnsNo() {
		return this.applyAnsNo;
	}
	
	/**
	 * Set the applyAnsNo
	 * @spring.validator type="required"
	 */	
	public void setApplyAnsNo(Short aValue) {
		this.applyAnsNo = aValue;
	}	

	/**
	 * 是否需要密码验证&YorN	 * @return Short
	 * @hibernate.property column="NEED_PASS_CHK" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getNeedPassChk() {
		return this.needPassChk;
	}
	
	/**
	 * Set the needPassChk
	 * @spring.validator type="required"
	 */	
	public void setNeedPassChk(Short aValue) {
		this.needPassChk = aValue;
	}	

	/**
	 * 是否允许多次答卷&YorN	 * @return Short
	 * @hibernate.property column="APPLY_ANS_MUTI" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getApplyAnsMuti() {
		return this.applyAnsMuti;
	}
	
	/**
	 * Set the applyAnsMuti
	 * @spring.validator type="required"
	 */	
	public void setApplyAnsMuti(Short aValue) {
		this.applyAnsMuti = aValue;
	}	

	/**
	 * 是否允许查看结果&YorN	 * @return Short
	 * @hibernate.property column="APPLY_VIEW_RES" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getApplyViewRes() {
		return this.applyViewRes;
	}
	
	/**
	 * Set the applyViewRes
	 * @spring.validator type="required"
	 */	
	public void setApplyViewRes(Short aValue) {
		this.applyViewRes = aValue;
	}	

	/**
	 * 是否显示前导页&YorN	 * @return Short
	 * @hibernate.property column="DISPLAY_GUIDE" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDisplayGuide() {
		return this.displayGuide;
	}
	
	/**
	 * Set the displayGuide
	 * @spring.validator type="required"
	 */	
	public void setDisplayGuide(Short aValue) {
		this.displayGuide = aValue;
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
	 * 状态：有效、注销&PAP_ZT	 * @return Short
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
		if (!(object instanceof PapTemplate)) {
			return false;
		}
		PapTemplate rhs = (PapTemplate) object;
		return new EqualsBuilder()
				.append(this.tmpId, rhs.tmpId)
				.append(this.tmpName, rhs.tmpName)
				.append(this.tmpContent, rhs.tmpContent)
				.append(this.displayLayoutId, rhs.displayLayoutId)
				.append(this.displayStyleId, rhs.displayStyleId)
				.append(this.remark, rhs.remark)
				.append(this.guideFilePath, rhs.guideFilePath)
				.append(this.applyAnsNo, rhs.applyAnsNo)
				.append(this.needPassChk, rhs.needPassChk)
				.append(this.applyAnsMuti, rhs.applyAnsMuti)
				.append(this.applyViewRes, rhs.applyViewRes)
				.append(this.displayGuide, rhs.displayGuide)
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
				.append(this.displayLayoutId) 
				.append(this.displayStyleId) 
				.append(this.remark) 
				.append(this.guideFilePath) 
				.append(this.applyAnsNo) 
				.append(this.needPassChk) 
				.append(this.applyAnsMuti) 
				.append(this.applyViewRes) 
				.append(this.displayGuide) 
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
				.append("displayLayoutId", this.displayLayoutId) 
				.append("displayStyleId", this.displayStyleId) 
				.append("remark", this.remark) 
				.append("guideFilePath", this.guideFilePath) 
				.append("applyAnsNo", this.applyAnsNo) 
				.append("needPassChk", this.needPassChk) 
				.append("applyAnsMuti", this.applyAnsMuti) 
				.append("applyViewRes", this.applyViewRes) 
				.append("displayGuide", this.displayGuide) 
				.append("creUseId", this.creUseId) 
				.append("creDat", this.creDat) 
				.append("updUseId", this.updUseId) 
				.append("updDat", this.updDat) 
				.append("staId", this.staId) 
				.toString();
	}



}
