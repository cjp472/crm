package com.ulane.know.model.know;
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
 * UkKnowApprove Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UkKnowApprove extends com.htsoft.core.model.BaseModel {

    protected Long knowApproveId;
	protected String approveTitle;
	protected String approveComment;
	protected Integer knowStatus;
	protected Integer runid;
	protected Long isDelete;
	protected String createBy;
	protected String updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected Long userid;
	protected com.ulane.know.model.know.UkKnowApply ukKnowApply;

	protected java.util.Set ukSysKnows = new java.util.HashSet();
	
	/**
	 * 新增工作流字段
	 */
	protected String nodeName;//审批节点名称
	protected String approvalStatus;//审批状态 

	public String getNodeName() {
		return nodeName;
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
	 * Default Empty Constructor for class UkKnowApprove
	 */
	public UkKnowApprove () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UkKnowApprove
	 */
	public UkKnowApprove (
		 Long in_knowApproveId
        ) {
		this.setKnowApproveId(in_knowApproveId);
    }

	
	public Long getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Long isDelete) {
		this.isDelete = isDelete;
	}

	public com.ulane.know.model.know.UkKnowApply getUkKnowApply () {
		return ukKnowApply;
	}	
	
	public void setUkKnowApply (com.ulane.know.model.know.UkKnowApply in_ukKnowApply) {
		this.ukKnowApply = in_ukKnowApply;
	}

	public java.util.Set getUkSysKnows () {
		return ukSysKnows;
	}	
	
	public void setUkSysKnows (java.util.Set in_ukSysKnows) {
		this.ukSysKnows = in_ukSysKnows;
	}
    

	/**
	 * 知识审批单内码	 * @return Long
     * @hibernate.id column="KNOW_APPROVE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getKnowApproveId() {
		return this.knowApproveId;
	}
	
	/**
	 * Set the knowApproveId
	 */	
	public void setKnowApproveId(Long aValue) {
		this.knowApproveId = aValue;
	}	

	/**
	 * 申请内码	 * @return Long
	 */
	public Long getApplyId() {
		return this.getUkKnowApply()==null?null:this.getUkKnowApply().getApplyId();
	}
	
	/**
	 * Set the applyId
	 */	
	public void setApplyId(Long aValue) {
	    if (aValue==null) {
	    	ukKnowApply = null;
	    } else if (ukKnowApply == null) {
	        ukKnowApply = new com.ulane.know.model.know.UkKnowApply(aValue);
	        ukKnowApply.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ukKnowApply.setApplyId(aValue);
	    }
	}	

	/**
	 * 知识审批单头	 * @return String
	 * @hibernate.property column="APPROVE_TITLE" type="java.lang.String" length="30" not-null="false" unique="false"
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
	 * @hibernate.property column="KNOW_STATUS" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getKnowStatus() {
		return this.knowStatus;
	}
	
	/**
	 * Set the knowStatus
	 */	
	public void setKnowStatus(Integer aValue) {
		this.knowStatus = aValue;
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
	 * @hibernate.property column="CREATE_BY" type="java.lang.String" length="38" not-null="false" unique="false"
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
	 * @hibernate.property column="UPDATE_BY" type="java.lang.String" length="38" not-null="false" unique="false"
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
	 * 创建时间	 * @return java.sql.Timestamp
	 * @hibernate.property column="CREATE_DATE" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
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
	 * 修改时间	 * @return java.sql.Timestamp
	 * @hibernate.property column="UPDATE_DATE" type="java.sql.Timestamp" length="11" not-null="false" unique="false"
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
	 * @hibernate.property column="USERID" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUserid() {
		return this.userid;
	}
	
	/**
	 * Set the userid
	 */	
	public void setUserid(Long aValue) {
		this.userid = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UkKnowApprove)) {
			return false;
		}
		UkKnowApprove rhs = (UkKnowApprove) object;
		return new EqualsBuilder()
				.append(this.knowApproveId, rhs.knowApproveId)
						.append(this.approveTitle, rhs.approveTitle)
				.append(this.approveComment, rhs.approveComment)
				.append(this.knowStatus, rhs.knowStatus)
				.append(this.runid, rhs.runid)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.userid, rhs.userid)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.knowApproveId) 
						.append(this.approveTitle) 
				.append(this.approveComment) 
				.append(this.knowStatus) 
				.append(this.runid) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.userid) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("knowApproveId", this.knowApproveId) 
						.append("approveTitle", this.approveTitle) 
				.append("approveComment", this.approveComment) 
				.append("knowStatus", this.knowStatus) 
				.append("runid", this.runid) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("userid", this.userid) 
				.toString();
	}



}
