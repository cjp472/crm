package com.ulane.know.model.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;

/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UkKnowApply Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UkKnowApply extends com.htsoft.core.model.BaseModel {

	protected Long applyId;
	// protected Long applyUserid;
	protected AppUser applyUser;
	protected java.sql.Timestamp applyTime;
	protected String applyTitle;
	protected String applyDescribe;
	protected String applyContent;
	protected String applyComment;
	protected java.util.Date requireTime;
	protected java.util.Date holdTime;
	protected Long busiType;
	protected Long applyType;
	protected Long applyStatus;
	protected Long runid;
	// protected Long createBy;
	// protected Long updateBy;
	protected AppUser createBy;
	protected AppUser updateBy;
	protected java.sql.Timestamp createDate;
	protected java.sql.Timestamp updateDate;
	protected java.util.Set<UkSysKnow> ukRelativeKnows = new java.util.HashSet<UkSysKnow>();
	// protected java.util.Set ukKnowApproves = new java.util.HashSet();
	// protected java.util.Set ukSysKnows = new java.util.HashSet();
	protected java.util.Set<FileAttach> ukRelativeFiles = new java.util.HashSet<FileAttach>();
	/**
	 * 新增工作流字段
	 */
	protected String nodeName;// 审批节点名称
	protected String approvalStatus;// 审批状态

	protected Long konwType;

	public Long getKonwType() {
		return konwType;
	}

	public void setKonwType(Long konwType) {
		this.konwType = konwType;
	}

	public java.util.Set<FileAttach> getUkRelativeFiles() {
		return ukRelativeFiles;
	}

	public void setUkRelativeFiles(java.util.Set<FileAttach> ukRelativeFiles) {
		this.ukRelativeFiles = ukRelativeFiles;
	}

	public String getNodeName() {
		return nodeName;
	}

	public java.util.Set<UkSysKnow> getUkRelativeKnows() {
		return ukRelativeKnows;
	}

	public void setUkRelativeKnows(java.util.Set<UkSysKnow> ukRelativeKnows) {
		this.ukRelativeKnows = ukRelativeKnows;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	/**
	 * Default Empty Constructor for class UkKnowApply
	 */
	public UkKnowApply() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class UkKnowApply
	 */
	public UkKnowApply(Long in_applyId) {
		this.setApplyId(in_applyId);
	}

	//
	// public java.util.Set getUkKnowApproves () {
	// return ukKnowApproves;
	// }

	// public void setUkKnowApproves (java.util.Set in_ukKnowApproves) {
	// this.ukKnowApproves = in_ukKnowApproves;
	// }

	// public java.util.Set getUkSysKnows () {
	// return ukSysKnows;
	// }

	// public void setUkSysKnows (java.util.Set in_ukSysKnows) {
	// this.ukSysKnows = in_ukSysKnows;
	// }

	public AppUser getApplyUser() {
		return applyUser;
	}

	public void setApplyUser(AppUser applyUser) {
		this.applyUser = applyUser;
	}

	public AppUser getCreateBy() {
		return createBy;
	}

	public void setCreateBy(AppUser createBy) {
		this.createBy = createBy;
	}

	public AppUser getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(AppUser updateBy) {
		this.updateBy = updateBy;
	}

	/**
	 * 申请内码 * @return Long
	 * 
	 * @hibernate.id column="APPLY_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getApplyId() {
		return this.applyId;
	}

	/**
	 * Set the applyId
	 */
	public void setApplyId(Long aValue) {
		this.applyId = aValue;
	}

	/**
	 * 申请时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="APPLY_TIME" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getApplyTime() {
		return this.applyTime;
	}

	/**
	 * Set the applyTime
	 */
	public void setApplyTime(java.sql.Timestamp aValue) {
		this.applyTime = aValue;
	}

	/**
	 * 标题 * @return String
	 * 
	 * @hibernate.property column="APPLY_TITLE" type="java.lang.String"
	 *                     length="30" not-null="false" unique="false"
	 */
	public String getApplyTitle() {
		return this.applyTitle;
	}

	/**
	 * Set the applyTitle
	 */
	public void setApplyTitle(String aValue) {
		this.applyTitle = aValue;
	}

	/**
	 * 说明 * @return String
	 * 
	 * @hibernate.property column="APPLY_DESCRIBE" type="java.lang.String"
	 *                     length="300" not-null="false" unique="false"
	 */
	public String getApplyDescribe() {
		return this.applyDescribe;
	}

	/**
	 * Set the applyDescribe
	 */
	public void setApplyDescribe(String aValue) {
		this.applyDescribe = aValue;
	}

	/**
	 * 内容 * @return String
	 * 
	 * @hibernate.property column="APPLY_CONTENT" type="java.lang.String"
	 *                     length="300" not-null="false" unique="false"
	 */
	public String getApplyContent() {
		return this.applyContent;
	}

	/**
	 * Set the applyContent
	 */
	public void setApplyContent(String aValue) {
		this.applyContent = aValue;
	}

	/**
	 * 备注 * @return String
	 * 
	 * @hibernate.property column="APPLY_COMMENT" type="java.lang.String"
	 *                     length="300" not-null="false" unique="false"
	 */
	public String getApplyComment() {
		return this.applyComment;
	}

	/**
	 * Set the applyComment
	 */
	public void setApplyComment(String aValue) {
		this.applyComment = aValue;
	}

	/**
	 * 要求时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="REQUIRE_TIME" type="java.util.Date"
	 *                     length="7" not-null="false" unique="false"
	 */
	public java.util.Date getRequireTime() {
		return this.requireTime;
	}

	/**
	 * Set the requireTime
	 */
	public void setRequireTime(java.util.Date aValue) {
		this.requireTime = aValue;
	}

	/**
	 * 暂存时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="HOLD_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getHoldTime() {
		return this.holdTime;
	}

	/**
	 * Set the holdTime
	 */
	public void setHoldTime(java.util.Date aValue) {
		this.holdTime = aValue;
	}

	/**
	 * 业务类别&BUSI_TYPE * @return Long
	 * 
	 * @hibernate.property column="BUSI_TYPE" type="java.lang.Long" length="22"
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
	 * 事项 * @return Long
	 * 
	 * @hibernate.property column="APPLY_TYPE" type="java.lang.Long" length="22"
	 *                     not-null="false" unique="false"
	 */
	public Long getApplyType() {
		return this.applyType;
	}

	/**
	 * Set the applyType
	 */
	public void setApplyType(Long aValue) {
		this.applyType = aValue;
	}

	/**
	 * 状态&KNOW_STATUS * @return Long
	 * 
	 * @hibernate.property column="APPLY_STATUS" type="java.lang.Long"
	 *                     length="22" not-null="false" unique="false"
	 */
	public Long getApplyStatus() {
		return this.applyStatus;
	}

	/**
	 * Set the applyStatus
	 */
	public void setApplyStatus(Long aValue) {
		this.applyStatus = aValue;
	}

	/**
	 * RUNID * @return Long
	 * 
	 * @hibernate.property column="RUNID" type="java.lang.Long" length="38"
	 *                     not-null="false" unique="false"
	 */
	public Long getRunid() {
		return this.runid;
	}

	/**
	 * Set the runid
	 */
	public void setRunid(Long aValue) {
		this.runid = aValue;
	}

	/**
	 * 创建时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="CREATE_DATE" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getCreateDate() {
		return this.createDate;
	}

	/**
	 * Set the createDate
	 */
	public void setCreateDate(java.sql.Timestamp aValue) {
		this.createDate = aValue;
	}

	/**
	 * 修改时间 * @return java.sql.Timestamp
	 * 
	 * @hibernate.property column="UPDATE_DATE" type="java.sql.Timestamp"
	 *                     length="11" not-null="false" unique="false"
	 */
	public java.sql.Timestamp getUpdateDate() {
		return this.updateDate;
	}

	/**
	 * Set the updateDate
	 */
	public void setUpdateDate(java.sql.Timestamp aValue) {
		this.updateDate = aValue;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UkKnowApply other = (UkKnowApply) obj;
		if (applyComment == null) {
			if (other.applyComment != null)
				return false;
		} else if (!applyComment.equals(other.applyComment))
			return false;
		if (applyContent == null) {
			if (other.applyContent != null)
				return false;
		} else if (!applyContent.equals(other.applyContent))
			return false;
		if (applyDescribe == null) {
			if (other.applyDescribe != null)
				return false;
		} else if (!applyDescribe.equals(other.applyDescribe))
			return false;
		if (applyId == null) {
			if (other.applyId != null)
				return false;
		} else if (!applyId.equals(other.applyId))
			return false;
		if (applyStatus == null) {
			if (other.applyStatus != null)
				return false;
		} else if (!applyStatus.equals(other.applyStatus))
			return false;
		if (applyTime == null) {
			if (other.applyTime != null)
				return false;
		} else if (!applyTime.equals(other.applyTime))
			return false;
		if (applyTitle == null) {
			if (other.applyTitle != null)
				return false;
		} else if (!applyTitle.equals(other.applyTitle))
			return false;
		if (applyType == null) {
			if (other.applyType != null)
				return false;
		} else if (!applyType.equals(other.applyType))
			return false;
		if (applyUser == null) {
			if (other.applyUser != null)
				return false;
		} else if (!applyUser.equals(other.applyUser))
			return false;
		if (approvalStatus == null) {
			if (other.approvalStatus != null)
				return false;
		} else if (!approvalStatus.equals(other.approvalStatus))
			return false;
		if (busiType == null) {
			if (other.busiType != null)
				return false;
		} else if (!busiType.equals(other.busiType))
			return false;
		if (createBy == null) {
			if (other.createBy != null)
				return false;
		} else if (!createBy.equals(other.createBy))
			return false;
		if (createDate == null) {
			if (other.createDate != null)
				return false;
		} else if (!createDate.equals(other.createDate))
			return false;
		if (holdTime == null) {
			if (other.holdTime != null)
				return false;
		} else if (!holdTime.equals(other.holdTime))
			return false;
		if (nodeName == null) {
			if (other.nodeName != null)
				return false;
		} else if (!nodeName.equals(other.nodeName))
			return false;
		if (requireTime == null) {
			if (other.requireTime != null)
				return false;
		} else if (!requireTime.equals(other.requireTime))
			return false;
		if (runid == null) {
			if (other.runid != null)
				return false;
		} else if (!runid.equals(other.runid))
			return false;
		if (updateBy == null) {
			if (other.updateBy != null)
				return false;
		} else if (!updateBy.equals(other.updateBy))
			return false;
		if (updateDate == null) {
			if (other.updateDate != null)
				return false;
		} else if (!updateDate.equals(other.updateDate))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((applyComment == null) ? 0 : applyComment.hashCode());
		result = prime * result
				+ ((applyContent == null) ? 0 : applyContent.hashCode());
		result = prime * result
				+ ((applyDescribe == null) ? 0 : applyDescribe.hashCode());
		result = prime * result + ((applyId == null) ? 0 : applyId.hashCode());
		result = prime * result
				+ ((applyStatus == null) ? 0 : applyStatus.hashCode());
		result = prime * result
				+ ((applyTime == null) ? 0 : applyTime.hashCode());
		result = prime * result
				+ ((applyTitle == null) ? 0 : applyTitle.hashCode());
		result = prime * result
				+ ((applyType == null) ? 0 : applyType.hashCode());
		result = prime * result
				+ ((applyUser == null) ? 0 : applyUser.hashCode());
		result = prime * result
				+ ((approvalStatus == null) ? 0 : approvalStatus.hashCode());
		result = prime * result
				+ ((busiType == null) ? 0 : busiType.hashCode());
		result = prime * result
				+ ((createBy == null) ? 0 : createBy.hashCode());
		result = prime * result
				+ ((createDate == null) ? 0 : createDate.hashCode());
		result = prime * result
				+ ((holdTime == null) ? 0 : holdTime.hashCode());
		result = prime * result
				+ ((nodeName == null) ? 0 : nodeName.hashCode());
		result = prime * result
				+ ((requireTime == null) ? 0 : requireTime.hashCode());
		result = prime * result + ((runid == null) ? 0 : runid.hashCode());
		result = prime * result
				+ ((updateBy == null) ? 0 : updateBy.hashCode());
		result = prime * result
				+ ((updateDate == null) ? 0 : updateDate.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UkKnowApply [applyComment=" + applyComment + ", applyContent="
				+ applyContent + ", applyDescribe=" + applyDescribe
				+ ", applyId=" + applyId + ", applyStatus=" + applyStatus
				+ ", applyTime=" + applyTime + ", applyTitle=" + applyTitle
				+ ", applyType=" + applyType + ", applyUser=" + applyUser
				+ ", approvalStatus=" + approvalStatus + ", busiType="
				+ busiType + ", createBy=" + createBy + ", createDate="
				+ createDate + ", holdTime=" + holdTime + ", nodeName="
				+ nodeName + ", requireTime=" + requireTime + ", runid="
				+ runid + ", updateBy=" + updateBy + ", updateDate="
				+ updateDate + "]";
	}

}
