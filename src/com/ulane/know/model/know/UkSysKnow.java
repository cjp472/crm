package com.ulane.know.model.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;

/**
 * UkSysKnow Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UkSysKnow extends com.htsoft.core.model.BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected Long knowId;
	protected String tiTle;
	protected Long busiType;
	protected java.util.Date enableTime;
	protected java.util.Date pastTime;
	protected Integer sysKnowStatus;
	protected Integer viewCount;
	protected Integer dianpingCount;
	protected String sysKnowComment;
	protected String plus1;
	protected String plus2;
	protected String plus3;
	protected String plus4;
	protected String plus5;
	protected String plus6;
	protected String plus7;
	protected String plus8;
	protected String isDel;
	protected Integer sysKnowVersion;
	// protected Long createBy;
	// protected Long updateBy;

	protected AppUser createBy;
	protected AppUser updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected com.ulane.know.model.know.UkKnowApprove ukKnowApprove;
	protected com.ulane.know.model.know.UkKnowTemplate ukKnowTemplate;
	// protected AppUser appUser;
	protected Long fankuiShu;
	protected Long accessManage; //访问管理
	protected java.util.Date filingTime; //归档时间
	
	protected String  knowKeyWords;	//KNOW_KEYWORDS   关键字文字存储

	public String getIsDel() {
		return isDel;
	}

	public void setIsDel(String isDel) {
		this.isDel = isDel;
	}

	public Long getAccessManage() {
		return accessManage;
	}

	public void setAccessManage(Long accessManage) {
		this.accessManage = accessManage;
	}

	public java.util.Date getFilingTime() {
		return filingTime;
	}

	public void setFilingTime(java.util.Date filingTime) {
		this.filingTime = filingTime;
	}
	
	public String getKnowKeyWords() {
		return knowKeyWords;
	}

	public void setKnowKeyWords(String knowKeyWords) {
		this.knowKeyWords = knowKeyWords;
	}

	/**
	 * 新增字段
	 */
	protected Long contentType;// CONTENT_TYPE 内容显示方式 1: 编辑内容 2:上传文件作为内容 3:选择模版

	protected java.util.Set<UkKnowDianping> ukKnowDianpings = new java.util.HashSet<UkKnowDianping>();
	protected java.util.Set<UkKnowFankui> ukKnowFankuis = new java.util.HashSet<UkKnowFankui>();
	protected java.util.Set<UkPerKnow> ukPerKnows = new java.util.HashSet<UkPerKnow>();
	protected java.util.Set<UkRelativeKnow> ukRelativeKnows = new java.util.HashSet<UkRelativeKnow>();

	protected java.util.Set<FileAttach> fileAttachs = new java.util.HashSet<FileAttach>();
	protected java.util.Set<UkKnowKeyword> ukKnowKeywords = new java.util.HashSet<UkKnowKeyword>();
	protected java.util.Set<UkKnowType> ukKnowTypes = new java.util.HashSet<UkKnowType>();
	protected java.util.Set<UkKnowApply> ukKnowApplys = new java.util.HashSet<UkKnowApply>();
	
	//系统知识和知识维度中间表
	protected java.util.Set<UkDimensionalityKnow> ukDimensionalityKnows = new java.util.HashSet<UkDimensionalityKnow>();
	/**
	 * @author zhangyl
	 * @createtime 2012年6月7日 10:44:54
	 */
	protected Integer delReason; // 删除原因
	protected String delRemark; // 删除备注
	protected java.util.Set<AppRole> roleKnows = new java.util.HashSet<AppRole>();			//知识发布,发布到角色
	protected String busiTypeMapName; 	//BUSI_TYPE_MAPNAME 业务分类字典MapName项
	//知识点评平均分
	protected Double averageCount;
	//系统知识和我的收藏中间表
	protected java.util.Set<UkKnowCollectType> ukKnowCollectTypes = new java.util.HashSet<UkKnowCollectType>();
	/**
	 * Default Empty Constructor for class UkSysKnow
	 */
	public UkSysKnow() {
		super();
	}


	public Double getAverageCount() {
		return averageCount;
	}

	public void setAverageCount(Double averageCount) {
		this.averageCount = averageCount;
	}

	public String getBusiTypeMapName() {
		return busiTypeMapName;
	}

	public void setBusiTypeMapName(String busiTypeMapName) {
		this.busiTypeMapName = busiTypeMapName;
	}

	public Long getContentType() {
		return contentType;
	}

	public void setContentType(Long contentType) {
		this.contentType = contentType;
	}
	
	public java.util.Set<AppRole> getRoleKnows() {
		return roleKnows;
	}

	public void setRoleKnows(java.util.Set<AppRole> roleKnows) {
		this.roleKnows = roleKnows;
	}

	public java.util.Set<UkDimensionalityKnow> getUkDimensionalityKnows() {
		return ukDimensionalityKnows;
	}

	public void setUkDimensionalityKnows(
			java.util.Set<UkDimensionalityKnow> ukDimensionalityKnows) {
		this.ukDimensionalityKnows = ukDimensionalityKnows;
	}

	public java.util.Set<UkKnowCollectType> getUkKnowCollectTypes() {
		return ukKnowCollectTypes;
	}

	public void setUkKnowCollectTypes(
			java.util.Set<UkKnowCollectType> ukKnowCollectTypes) {
		this.ukKnowCollectTypes = ukKnowCollectTypes;
	}

	/**
	 * Default Key Fields Constructor for class UkSysKnow
	 */
	public UkSysKnow(Long in_knowId) {
		this.setKnowId(in_knowId);
	}

	public void setCreateBy(AppUser createBy) {
		this.createBy = createBy;
	}

	public void setUpdateBy(AppUser updateBy) {
		this.updateBy = updateBy;
	}

	public void setUserId(Long userId) {

	}

	public Integer getDelReason() {
		return delReason;
	}

	public void setDelReason(Integer delReason) {
		this.delReason = delReason;
	}

	public String getDelRemark() {
		return delRemark;
	}

	public void setDelRemark(String delRemark) {
		this.delRemark = delRemark;
	}

	public com.ulane.know.model.know.UkKnowApprove getUkKnowApprove() {
		return ukKnowApprove;
	}

	public void setUkKnowApprove(
			com.ulane.know.model.know.UkKnowApprove in_ukKnowApprove) {
		this.ukKnowApprove = in_ukKnowApprove;
	}

	public com.ulane.know.model.know.UkKnowTemplate getUkKnowTemplate() {
		return ukKnowTemplate;
	}

	public void setUkKnowTemplate(
			com.ulane.know.model.know.UkKnowTemplate in_ukKnowTemplate) {
		this.ukKnowTemplate = in_ukKnowTemplate;
	}

	public java.util.Set<FileAttach> getFileAttachs() {
		return fileAttachs;
	}

	public void setFileAttachs(java.util.Set<FileAttach> in_fileAttachs) {
		this.fileAttachs = in_fileAttachs;
	}

	public java.util.Set getUkKnowDianpings() {
		return ukKnowDianpings;
	}

	public void setUkKnowDianpings(java.util.Set in_ukKnowDianpings) {
		this.ukKnowDianpings = in_ukKnowDianpings;
	}

	public java.util.Set getUkKnowFankuis() {
		return ukKnowFankuis;
	}

	public void setUkKnowFankuis(java.util.Set in_ukKnowFankuis) {
		this.ukKnowFankuis = in_ukKnowFankuis;
	}

	public java.util.Set<UkKnowKeyword> getUkKnowKeywords() {
		return ukKnowKeywords;
	}

	public void setUkKnowKeywords(java.util.Set<UkKnowKeyword> in_ukKnowKeywords) {
		this.ukKnowKeywords = in_ukKnowKeywords;
	}

	public java.util.Set<UkKnowType> getUkKnowTypes() {
		return ukKnowTypes;
	}

	public void setUkKnowTypes(java.util.Set<UkKnowType> in_ukKnowTypes) {
		this.ukKnowTypes = in_ukKnowTypes;
	}

	public java.util.Set getUkPerKnows() {
		return ukPerKnows;
	}

	public void setUkPerKnows(java.util.Set in_ukPerKnows) {
		this.ukPerKnows = in_ukPerKnows;
	}

	public java.util.Set getUkRelativeKnows() {
		return ukRelativeKnows;
	}

	public void setUkRelativeKnows(java.util.Set in_ukRelativeKnows) {
		this.ukRelativeKnows = in_ukRelativeKnows;
	}

	public java.util.Set<UkKnowApply> getUkKnowApplys() {
		return ukKnowApplys;
	}

	public void setUkKnowApplys(java.util.Set<UkKnowApply> in_ukKnowApplys) {
		this.ukKnowApplys = in_ukKnowApplys;
	}

	public Long getFankuiShu() {
		return fankuiShu;
	}

	public void setFankuiShu(Long fankuiShu) {
		this.fankuiShu = fankuiShu;
	}

	/**
	 * 系统知识内码 * @return Long
	 * 
	 * @hibernate.id column="KNOW_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getKnowId() {
		return this.knowId;
	}

	/**
	 * Set the knowId
	 */
	public void setKnowId(Long aValue) {
		this.knowId = aValue;
	}

	/**
	 * 知识模板编号 * @return Long
	 */
	public Long getKnowTmpId() {
		return this.getUkKnowTemplate() == null ? null : this
				.getUkKnowTemplate().getKnowTmpId();
	}

	/**
	 * Set the knowTmpId
	 */
	public void setKnowTmpId(Long aValue) {
		if (aValue == null) {
			ukKnowTemplate = null;
		} else if (ukKnowTemplate == null) {
			ukKnowTemplate = new com.ulane.know.model.know.UkKnowTemplate(
					aValue);
			ukKnowTemplate.setVersion(new Integer(0));// set a version to cheat
														// hibernate only
		} else {
			//
			ukKnowTemplate.setKnowTmpId(aValue);
		}
	}

	/**
	 * 知识审批单内码 * @return Long
	 */
	public Long getKnowApproveId() {
		return this.getUkKnowApprove() == null ? null : this.getUkKnowApprove()
				.getKnowApproveId();
	}

	/**
	 * Set the knowApproveId
	 */
	public void setKnowApproveId(Long aValue) {
		if (aValue == null) {
			ukKnowApprove = null;
		} else if (ukKnowApprove == null) {
			ukKnowApprove = new com.ulane.know.model.know.UkKnowApprove(aValue);
			ukKnowApprove.setVersion(new Integer(0));// set a version to cheat
														// hibernate only
		} else {
			//
			ukKnowApprove.setKnowApproveId(aValue);
		}
	}

	/**
	 * 标题 * @return String
	 * 
	 * @hibernate.property column="TI_TLE" type="java.lang.String" length="30"
	 *                     not-null="false" unique="false"
	 */
	public String getTiTle() {
		return this.tiTle;
	}

	/**
	 * Set the tiTle
	 */
	public void setTiTle(String aValue) {
		this.tiTle = aValue;
	}

	/**
	 * 业务分类&BUSI_TYPE * @return Long
	 * 
	 * @hibernate.property column="BUSI_TYPE" type="java.lang.Long" length="38"
	 *                     not-null="false" unique="false"
	 */
	public Long getBusiType() {
		return this.busiType;
	}

	/**
	 * Set the busiType
	 */
	public void setBusiType(Long aValue) {
		this.busiType = aValue;
	}

	/**
	 * 生效时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="ENABLE_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getEnableTime() {
		return this.enableTime;
	}

	/**
	 * Set the enableTime
	 */
	public void setEnableTime(java.util.Date aValue) {
		this.enableTime = aValue;
	}

	/**
	 * 过期时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="PAST_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getPastTime() {
		return this.pastTime;
	}

	/**
	 * Set the pastTime
	 */
	public void setPastTime(java.util.Date aValue) {
		this.pastTime = aValue;
	}

	/**
	 * 状态&KNOW_STATUS * @return Integer
	 * 
	 * @hibernate.property column="SYS_KNOW_STATUS" type="java.lang.Integer"
	 *                     length="10" not-null="false" unique="false"
	 */
	public Integer getSysKnowStatus() {
		return this.sysKnowStatus;
	}

	/**
	 * Set the sysKnowStatus
	 */
	public void setSysKnowStatus(Integer aValue) {
		this.sysKnowStatus = aValue;
	}

	/**
	 * 浏览数 * @return Integer
	 * 
	 * @hibernate.property column="VIEW_COUNT" type="java.lang.Integer"
	 *                     length="10" not-null="false" unique="false"
	 */
	public Integer getViewCount() {
		return this.viewCount;
	}

	/**
	 * Set the viewCount
	 */
	public void setViewCount(Integer aValue) {
		this.viewCount = aValue;
	}

	public Integer getDianpingCount() {
		return dianpingCount;
	}

	public void setDianpingCount(Integer dianpingCount) {
		this.dianpingCount = dianpingCount;
	}

	/**
	 * 摘要 * @return String
	 * 
	 * @hibernate.property column="SYS_KNOW_COMMENT" type="java.lang.String"
	 *                     length="200" not-null="false" unique="false"
	 */
	public String getSysKnowComment() {
		return this.sysKnowComment;
	}

	/**
	 * Set the sysKnowComment
	 */
	public void setSysKnowComment(String aValue) {
		this.sysKnowComment = aValue;
	}

	/**
	 * 附加字段1 * @return String
	 * 
	 * @hibernate.property column="PLUS1" type="java.lang.String" length="4000"
	 *                     not-null="false" unique="false"
	 */
	public String getPlus1() {
		return this.plus1;
	}

	/**
	 * Set the plus1
	 */
	public void setPlus1(String aValue) {
		this.plus1 = aValue;
	}

	/**
	 * 附加字段2 * @return String
	 * 
	 * @hibernate.property column="PLUS2" type="java.lang.String" length="4000"
	 *                     not-null="false" unique="false"
	 */
	public String getPlus2() {
		return this.plus2;
	}

	/**
	 * Set the plus2
	 */
	public void setPlus2(String aValue) {
		this.plus2 = aValue;
	}

	/**
	 * 附加字段3 * @return String
	 * 
	 * @hibernate.property column="PLUS3" type="java.lang.String" length="4000"
	 *                     not-null="false" unique="false"
	 */
	public String getPlus3() {
		return this.plus3;
	}

	/**
	 * Set the plus3
	 */
	public void setPlus3(String aValue) {
		this.plus3 = aValue;
	}

	/**
	 * 附加字段4 * @return String
	 * 
	 * @hibernate.property column="PLUS4" type="java.lang.String" length="4000"
	 *                     not-null="false" unique="false"
	 */
	public String getPlus4() {
		return this.plus4;
	}

	/**
	 * Set the plus4
	 */
	public void setPlus4(String aValue) {
		this.plus4 = aValue;
	}

	/**
	 * 附加字段5 * @return String
	 * 
	 * @hibernate.property column="PLUS5" type="java.lang.String" length="4000"
	 *                     not-null="false" unique="false"
	 */
	public String getPlus5() {
		return this.plus5;
	}

	/**
	 * Set the plus5
	 */
	public void setPlus5(String aValue) {
		this.plus5 = aValue;
	}

	/**
	 * 附加字段6 * @return String
	 * 
	 * @hibernate.property column="PLUS6" type="java.lang.String" length="4000"
	 *                     not-null="false" unique="false"
	 */
	public String getPlus6() {
		return this.plus6;
	}

	/**
	 * Set the plus6
	 */
	public void setPlus6(String aValue) {
		this.plus6 = aValue;
	}

	/**
	 * 附加字段7 * @return String
	 * 
	 * @hibernate.property column="PLUS7" type="java.lang.String" length="4000"
	 *                     not-null="false" unique="false"
	 */
	public String getPlus7() {
		return this.plus7;
	}

	/**
	 * Set the plus7
	 */
	public void setPlus7(String aValue) {
		this.plus7 = aValue;
	}

	/**
	 * 附加字段8 * @return String
	 * 
	 * @hibernate.property column="PLUS8" type="java.lang.String" length="4000"
	 *                     not-null="false" unique="false"
	 */
	public String getPlus8() {
		return this.plus8;
	}

	/**
	 * Set the plus8
	 */
	public void setPlus8(String aValue) {
		this.plus8 = aValue;
	}

	/**
	 * 版本号 * @return Integer
	 * 
	 * @hibernate.property column="SYS_KNOW_VERSION" type="java.lang.Integer"
	 *                     length="10" not-null="false" unique="false"
	 */
	public Integer getSysKnowVersion() {
		return this.sysKnowVersion;
	}

	/**
	 * Set the sysKnowVersion
	 */
	public void setSysKnowVersion(Integer aValue) {
		this.sysKnowVersion = aValue;
	}

	// /**
	// * 创建人 * @return Long
	// * @hibernate.property column="CREATE_BY" type="java.lang.Long"
	// length="38" not-null="false" unique="false"
	// */
	// public Long getCreateBy() {
	// return this.createBy;
	// }
	//
	// /**
	// * Set the createBy
	// */
	// public void setCreateBy(Long aValue) {
	// this.createBy = aValue;
	// }
	//
	// /**
	// * 修改人 * @return Long
	// * @hibernate.property column="UPDATE_BY" type="java.lang.Long"
	// length="38" not-null="false" unique="false"
	// */
	// public Long getUpdateBy() {
	// return this.updateBy;
	// }
	//
	// /**
	// * Set the updateBy
	// */
	// public void setUpdateBy(Long aValue) {
	// this.updateBy = aValue;
	// }

	/**
	 * 创建时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="CREATE_DATE" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}

	/**
	 * Set the createDate
	 */
	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
	}

	public AppUser getCreateBy() {
		return createBy;
	}

	public AppUser getUpdateBy() {
		return updateBy;
	}

	/**
	 * 修改时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="UPDATE_DATE" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateDate() {
		return this.updateDate;
	}

	/**
	 * Set the updateDate
	 */
	public void setUpdateDate(java.util.Date aValue) {
		this.updateDate = aValue;
	}


	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkSysKnow)) {
			return false;
		}
		UkSysKnow rhs = (UkSysKnow) object;
		return new EqualsBuilder().append(this.knowId, rhs.knowId)
				.append(this.tiTle, rhs.tiTle)
				.append(this.busiType, rhs.busiType)
				.append(this.enableTime, rhs.enableTime)
				.append(this.pastTime, rhs.pastTime)
				.append(this.sysKnowStatus, rhs.sysKnowStatus)
				.append(this.viewCount, rhs.viewCount)
				.append(this.sysKnowComment, rhs.sysKnowComment)
				.append(this.plus1, rhs.plus1).append(this.plus2, rhs.plus2)
				.append(this.plus3, rhs.plus3).append(this.plus4, rhs.plus4)
				.append(this.plus5, rhs.plus5).append(this.plus6, rhs.plus6)
				.append(this.plus7, rhs.plus7).append(this.plus8, rhs.plus8)
				.append(this.sysKnowVersion, rhs.sysKnowVersion)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.accessManage, rhs.accessManage)
				.append(this.fankuiShu, rhs.fankuiShu)
				.append(this.filingTime, rhs.filingTime)
				.append(this.contentType, rhs.contentType)
				.append(this.ukKnowTypes, rhs.ukKnowTypes).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.knowId)
				.append(this.tiTle).append(this.busiType)
				.append(this.enableTime).append(this.pastTime)
				.append(this.sysKnowStatus).append(this.viewCount)
				.append(this.sysKnowComment).append(this.plus1)
				.append(this.plus2).append(this.plus3).append(this.plus4)
				.append(this.plus5).append(this.plus6).append(this.plus7)
				.append(this.plus8).append(this.sysKnowVersion)
				.append(this.createBy).append(this.updateBy)
				.append(this.createDate).append(this.updateDate)
				.append(this.ukKnowTypes).append(this.delReason)
				.append(this.filingTime).append(this.accessManage)
				.append(this.delRemark).append(this.ukKnowTypes)
				.append(this.contentType).append(this.roleKnows).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("knowId", this.knowId)
				.append("tiTle", this.tiTle).append("busiType", this.busiType)
				.append("enableTime", this.enableTime)
				.append("pastTime", this.pastTime)
				.append("sysKnowStatus", this.sysKnowStatus)
				.append("viewCount", this.viewCount)
				.append("sysKnowComment", this.sysKnowComment)
				.append("plus1", this.plus1).append("plus2", this.plus2)
				.append("plus3", this.plus3).append("plus4", this.plus4)
				.append("plus5", this.plus5).append("plus6", this.plus6)
				.append("plus7", this.plus7).append("plus8", this.plus8)
				.append("sysKnowVersion", this.sysKnowVersion)
				.append("createBy", this.createBy)
				.append("updateBy", this.updateBy)
				.append("createDate", this.createDate)
				.append("updateDate", this.updateDate)
				.append("fankuiShu", this.fankuiShu)
				.append("ukKnowTypes", this.ukKnowTypes)
				.append("DelReason", this.delReason)
				.append("DelRemark", this.delRemark)
				.append("ukKnowTypes", this.ukKnowTypes)
				.append("accessManage", this.accessManage)
				.append("filingTime", this.filingTime)
				.append("contentType", this.contentType)
				.append("roleKnows", this.roleKnows).toString();
	}

}
