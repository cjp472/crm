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

import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObComPap;

/**
 * PapRelease Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class PapRelease extends com.htsoft.core.model.BaseModel {

    protected Long papId;
	protected Short relChannel;
	protected String papName;
	protected String papContent;
	protected java.util.Date staDat;
	protected java.util.Date endDat;
	protected Short busiDir;
	protected String releaseFilePath;
	protected Short applyAnsNo;
	protected Short needPassChk;
	protected Short applyAnsMuti;
	protected Short applyViewRes;
	protected Short displayGuide;
	protected String remark;
	protected Long relaseUseId;
	protected java.util.Date relaseDat;
	protected Short staId;
	protected Long papstaid;
	public Long getPapstaid() {
		return papstaid;
	}

	public void setPapstaid(Long papstaid) {
		this.papstaid = papstaid;
	}

	protected com.ulane.running.model.pap.PapTemplate papTemplate;
	protected java.util.Set<ObCom> obComs = new java.util.HashSet<ObCom>();
	protected java.util.Set<ObComPap> obComPap = new java.util.HashSet<ObComPap>();//问卷
	public java.util.Set<ObComPap> getObComPap() {
		return obComPap;
	}

	public void setObComPap(java.util.Set<ObComPap> obComPap) {
		this.obComPap = obComPap;
	}

	protected java.util.Set papAnsSummarys = new java.util.HashSet();
	protected java.util.Set papReleaseObjs = new java.util.HashSet();


	/**
	 * Default Empty Constructor for class PapRelease
	 */
	public PapRelease () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PapRelease
	 */
	public PapRelease (
		 Long in_papId
        ) {
		this.setPapId(in_papId);
    }

	public java.util.Set<ObCom> getObComs() {
		return obComs;
	}

	public void setObComs(java.util.Set<ObCom> obComs) {
		this.obComs = obComs;
	}
	public com.ulane.running.model.pap.PapTemplate getPapTemplate () {
		return papTemplate;
	}	
	
	public void setPapTemplate (com.ulane.running.model.pap.PapTemplate in_papTemplate) {
		this.papTemplate = in_papTemplate;
	}

	public java.util.Set getPapAnsSummarys () {
		return papAnsSummarys;
	}	
	
	public void setPapAnsSummarys (java.util.Set in_papAnsSummarys) {
		this.papAnsSummarys = in_papAnsSummarys;
	}

	public java.util.Set getPapReleaseObjs () {
		return papReleaseObjs;
	}	
	
	public void setPapReleaseObjs (java.util.Set in_papReleaseObjs) {
		this.papReleaseObjs = in_papReleaseObjs;
	}
    

	/**
	 * 问卷发布内码	 * @return Long
     * @hibernate.id column="PAP_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getPapId() {
		return this.papId;
	}
	
	/**
	 * Set the papId
	 */	
	public void setPapId(Long aValue) {
		this.papId = aValue;
	}	

	/**
	 * 问卷模板ID	 * @return Long
	 */
	public Long getTmpId() {
		return this.getPapTemplate()==null?null:this.getPapTemplate().getTmpId();
	}
	
	/**
	 * Set the tmpId
	 */	
	public void setTmpId(Long aValue) {
	    if (aValue==null) {
	    	papTemplate = null;
	    } else if (papTemplate == null) {
	        papTemplate = new com.ulane.running.model.pap.PapTemplate(aValue);
	        papTemplate.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			papTemplate.setTmpId(aValue);
	    }
	}	

	/**
	 * 发布渠道：网站、呼叫中心&PAP_FBQD	 * @return Short
	 * @hibernate.property column="REL_CHANNEL" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getRelChannel() {
		return this.relChannel;
	}
	
	/**
	 * Set the relChannel
	 * @spring.validator type="required"
	 */	
	public void setRelChannel(Short aValue) {
		this.relChannel = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="PAP_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getPapName() {
		return this.papName;
	}
	
	/**
	 * Set the papName
	 * @spring.validator type="required"
	 */	
	public void setPapName(String aValue) {
		this.papName = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="PAP_CONTENT" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getPapContent() {
		return this.papContent;
	}
	
	/**
	 * Set the papContent
	 */	
	public void setPapContent(String aValue) {
		this.papContent = aValue;
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
	 * 业务方向：呼入、呼出&PAP_YWFX	 * @return Short
	 * @hibernate.property column="BUSI_DIR" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getBusiDir() {
		return this.busiDir;
	}
	
	/**
	 * Set the busiDir
	 * @spring.validator type="required"
	 */	
	public void setBusiDir(Short aValue) {
		this.busiDir = aValue;
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
		if (!(object instanceof PapRelease)) {
			return false;
		}
		PapRelease rhs = (PapRelease) object;
		return new EqualsBuilder()
				.append(this.papId, rhs.papId)
						.append(this.relChannel, rhs.relChannel)
				.append(this.papName, rhs.papName)
				.append(this.papContent, rhs.papContent)
				.append(this.staDat, rhs.staDat)
				.append(this.endDat, rhs.endDat)
				.append(this.busiDir, rhs.busiDir)
				.append(this.releaseFilePath, rhs.releaseFilePath)
				.append(this.applyAnsNo, rhs.applyAnsNo)
				.append(this.needPassChk, rhs.needPassChk)
				.append(this.applyAnsMuti, rhs.applyAnsMuti)
				.append(this.applyViewRes, rhs.applyViewRes)
				.append(this.displayGuide, rhs.displayGuide)
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
				.append(this.papId) 
						.append(this.relChannel) 
				.append(this.papName) 
				.append(this.papContent) 
				.append(this.staDat) 
				.append(this.endDat) 
				.append(this.busiDir) 
				.append(this.releaseFilePath) 
				.append(this.applyAnsNo) 
				.append(this.needPassChk) 
				.append(this.applyAnsMuti) 
				.append(this.applyViewRes) 
				.append(this.displayGuide) 
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
				.append("papId", this.papId) 
						.append("relChannel", this.relChannel) 
				.append("papName", this.papName) 
				.append("papContent", this.papContent) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("busiDir", this.busiDir) 
				.append("releaseFilePath", this.releaseFilePath) 
				.append("applyAnsNo", this.applyAnsNo) 
				.append("needPassChk", this.needPassChk) 
				.append("applyAnsMuti", this.applyAnsMuti) 
				.append("applyViewRes", this.applyViewRes) 
				.append("displayGuide", this.displayGuide) 
				.append("remark", this.remark) 
				.append("relaseUseId", this.relaseUseId) 
				.append("relaseDat", this.relaseDat) 
				.append("staId", this.staId) 
				.toString();
	}



}
