package com.ulane.customer.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.system.AppUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * ConBwlistApprove Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ConBwlistApprove extends com.htsoft.core.model.BaseModel {

    protected Long bwlistApproveId;
	protected String approveTitle;
	protected String approveComment;
	protected Integer bwlistStatus;
	protected Integer runid;
	protected String createBy;
	protected String updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected AppUser applyUser;
	protected Integer isDelete;
	protected String nodeName;
	protected String approvalStatus;

	protected java.util.Set conBwLists = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ConBwlistApprove
	 */
	public ConBwlistApprove () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConBwlistApprove
	 */
	public ConBwlistApprove (
		 Long in_bwlistApproveId
        ) {
		this.setBwlistApproveId(in_bwlistApproveId);
    }


	public java.util.Set getConBwLists () {
		return conBwLists;
	}	
	
	public void setConBwLists (java.util.Set in_conBwLists) {
		this.conBwLists = in_conBwLists;
	}
    

	/**
	 * 知识审批单内码	 * @return Long
     * @hibernate.id column="BWLIST_APPROVE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBwlistApproveId() {
		return this.bwlistApproveId;
	}
	
	/**
	 * Set the bwlistApproveId
	 */	
	public void setBwlistApproveId(Long aValue) {
		this.bwlistApproveId = aValue;
	}	

	/**
	 * 知识审批单头	 * @return String
	 * @hibernate.property column="APPROVE_TITLE" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getApproveTitle() {
		return this.approveTitle;
	}
	
	/**
	 * Set the approveTitle
	 */	
	public void setApproveTitle(String aValue) {
		this.approveTitle = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="APPROVE_COMMENT" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getApproveComment() {
		return this.approveComment;
	}
	
	/**
	 * Set the approveComment
	 */	
	public void setApproveComment(String aValue) {
		this.approveComment = aValue;
	}	

	/**
	 * 状态&KNOW_STATUS	 * @return Integer
	 * @hibernate.property column="BWLIST_STATUS" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getBwlistStatus() {
		return this.bwlistStatus;
	}
	
	/**
	 * Set the bwlistStatus
	 */	
	public void setBwlistStatus(Integer aValue) {
		this.bwlistStatus = aValue;
	}	

	/**
	 * RUNID	 * @return Integer
	 * @hibernate.property column="RUNID" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getRunid() {
		return this.runid;
	}
	
	/**
	 * Set the runid
	 */	
	public void setRunid(Integer aValue) {
		this.runid = aValue;
	}	

	/**
	 * 创建人	 * @return String
	 * @hibernate.property column="CREATE_BY" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(String aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return String
	 * @hibernate.property column="UPDATE_BY" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(String aValue) {
		this.updateBy = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
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

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 申请人	 * @return Long
	 * @hibernate.property column="USERID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public AppUser getApplyUser() {
		return applyUser;
	}

	/**
	 * Set the userid
	 */	
	public void setApplyUser(AppUser applyUser) {
		this.applyUser = applyUser;
	}

	/**
	 * 删除标记	 * @return Integer
	 * @hibernate.property column="IS_DELETE" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getIsDelete() {
		return this.isDelete;
	}
	
	/**
	 * Set the isDelete
	 */	
	public void setIsDelete(Integer aValue) {
		this.isDelete = aValue;
	}	

	/**
	 * 审批节点名称	 * @return String
	 * @hibernate.property column="NODE_NAME" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getNodeName() {
		return this.nodeName;
	}
	
	/**
	 * Set the nodeName
	 */	
	public void setNodeName(String aValue) {
		this.nodeName = aValue;
	}	

	/**
	 * 审批状态	 * @return String
	 * @hibernate.property column="APPROVAL_STATUS" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getApprovalStatus() {
		return this.approvalStatus;
	}
	
	/**
	 * Set the approvalStatus
	 */	
	public void setApprovalStatus(String aValue) {
		this.approvalStatus = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConBwlistApprove)) {
			return false;
		}
		ConBwlistApprove rhs = (ConBwlistApprove) object;
		return new EqualsBuilder()
				.append(this.bwlistApproveId, rhs.bwlistApproveId)
				.append(this.approveTitle, rhs.approveTitle)
				.append(this.approveComment, rhs.approveComment)
				.append(this.bwlistStatus, rhs.bwlistStatus)
				.append(this.runid, rhs.runid)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.applyUser, rhs.applyUser)
				.append(this.isDelete, rhs.isDelete)
				.append(this.nodeName, rhs.nodeName)
				.append(this.approvalStatus, rhs.approvalStatus)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bwlistApproveId) 
				.append(this.approveTitle) 
				.append(this.approveComment) 
				.append(this.bwlistStatus) 
				.append(this.runid) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.applyUser) 
				.append(this.isDelete) 
				.append(this.nodeName) 
				.append(this.approvalStatus) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bwlistApproveId", this.bwlistApproveId) 
				.append("approveTitle", this.approveTitle) 
				.append("approveComment", this.approveComment) 
				.append("bwlistStatus", this.bwlistStatus) 
				.append("runid", this.runid) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("applyUser", this.applyUser) 
				.append("isDelete", this.isDelete) 
				.append("nodeName", this.nodeName) 
				.append("approvalStatus", this.approvalStatus) 
				.toString();
	}



}
