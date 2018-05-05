package com.ulane.running.model.comtech;
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
 * CtScrRelease Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CtScrRelease extends com.htsoft.core.model.BaseModel {

    protected Long scrId;
	protected String scrName;
	protected String scrContent;
	protected java.util.Date staDat;
	protected java.util.Date endDat;
	protected Short busiDir;
	protected String userUser;
	protected String userUsegroup;
	protected String userSkill;
	protected String releaseFilePath;
	protected String remark;
	protected Long relaseUseId;
	protected java.util.Date relaseDat;
	protected Short staId;
	protected com.ulane.running.model.comtech.CtScrTemplate ctScrTemplate;

	protected java.util.Set ctScrAnsSummarys = new java.util.HashSet();
	protected java.util.Set ctScrReleaseObjs = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class CtScrRelease
	 */
	public CtScrRelease () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CtScrRelease
	 */
	public CtScrRelease (
		 Long in_scrId
        ) {
		this.setScrId(in_scrId);
    }

	
	public com.ulane.running.model.comtech.CtScrTemplate getCtScrTemplate () {
		return ctScrTemplate;
	}	
	
	public void setCtScrTemplate (com.ulane.running.model.comtech.CtScrTemplate in_ctScrTemplate) {
		this.ctScrTemplate = in_ctScrTemplate;
	}

	public java.util.Set getCtScrAnsSummarys () {
		return ctScrAnsSummarys;
	}	
	
	public void setCtScrAnsSummarys (java.util.Set in_ctScrAnsSummarys) {
		this.ctScrAnsSummarys = in_ctScrAnsSummarys;
	}

	public java.util.Set getCtScrReleaseObjs () {
		return ctScrReleaseObjs;
	}	
	
	public void setCtScrReleaseObjs (java.util.Set in_ctScrReleaseObjs) {
		this.ctScrReleaseObjs = in_ctScrReleaseObjs;
	}
    

	/**
	 * 话术内码	 * @return Long
     * @hibernate.id column="SCR_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getScrId() {
		return this.scrId;
	}
	
	/**
	 * Set the scrId
	 */	
	public void setScrId(Long aValue) {
		this.scrId = aValue;
	}	

	/**
	 * 话术模板	 * @return Long
	 */
	public Long getTmpId() {
		return this.getCtScrTemplate()==null?null:this.getCtScrTemplate().getTmpId();
	}
	
	/**
	 * Set the tmpId
	 */	
	public void setTmpId(Long aValue) {
	    if (aValue==null) {
	    	ctScrTemplate = null;
	    } else if (ctScrTemplate == null) {
	        ctScrTemplate = new com.ulane.running.model.comtech.CtScrTemplate(aValue);
	        ctScrTemplate.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ctScrTemplate.setTmpId(aValue);
	    }
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="SCR_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getScrName() {
		return this.scrName;
	}
	
	/**
	 * Set the scrName
	 * @spring.validator type="required"
	 */	
	public void setScrName(String aValue) {
		this.scrName = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="SCR_CONTENT" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getScrContent() {
		return this.scrContent;
	}
	
	/**
	 * Set the scrContent
	 */	
	public void setScrContent(String aValue) {
		this.scrContent = aValue;
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
	 * 业务方向：呼入、呼出&CT_YWFX	 * @return Short
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
	 * 使用用户：用逗号分隔	 * @return String
	 * @hibernate.property column="USER_USER" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getUserUser() {
		return this.userUser;
	}
	
	/**
	 * Set the userUser
	 */	
	public void setUserUser(String aValue) {
		this.userUser = aValue;
	}	

	/**
	 * 使用用户组：用逗号分隔	 * @return String
	 * @hibernate.property column="USER_USEGROUP" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getUserUsegroup() {
		return this.userUsegroup;
	}
	
	/**
	 * Set the userUsegroup
	 */	
	public void setUserUsegroup(String aValue) {
		this.userUsegroup = aValue;
	}	

	/**
	 * 使用人员技能：用逗号分隔	 * @return String
	 * @hibernate.property column="USER_SKILL" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getUserSkill() {
		return this.userSkill;
	}
	
	/**
	 * Set the userSkill
	 */	
	public void setUserSkill(String aValue) {
		this.userSkill = aValue;
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
	 * 发布人	 * @return Long
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
	 * 状态：有效、注销&CT_ZT	 * @return Short
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
		if (!(object instanceof CtScrRelease)) {
			return false;
		}
		CtScrRelease rhs = (CtScrRelease) object;
		return new EqualsBuilder()
				.append(this.scrId, rhs.scrId)
						.append(this.scrName, rhs.scrName)
				.append(this.scrContent, rhs.scrContent)
				.append(this.staDat, rhs.staDat)
				.append(this.endDat, rhs.endDat)
				.append(this.busiDir, rhs.busiDir)
				.append(this.userUser, rhs.userUser)
				.append(this.userUsegroup, rhs.userUsegroup)
				.append(this.userSkill, rhs.userSkill)
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
				.append(this.scrId) 
						.append(this.scrName) 
				.append(this.scrContent) 
				.append(this.staDat) 
				.append(this.endDat) 
				.append(this.busiDir) 
				.append(this.userUser) 
				.append(this.userUsegroup) 
				.append(this.userSkill) 
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
				.append("scrId", this.scrId) 
						.append("scrName", this.scrName) 
				.append("scrContent", this.scrContent) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("busiDir", this.busiDir) 
				.append("userUser", this.userUser) 
				.append("userUsegroup", this.userUsegroup) 
				.append("userSkill", this.userSkill) 
				.append("releaseFilePath", this.releaseFilePath) 
				.append("remark", this.remark) 
				.append("relaseUseId", this.relaseUseId) 
				.append("relaseDat", this.relaseDat) 
				.append("staId", this.staId) 
				.toString();
	}



}
