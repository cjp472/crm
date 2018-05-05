package com.ulane.shsh.model.shhq;
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
 * ShBuilderAccept Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ShBuilderAccept extends com.htsoft.core.model.BaseModel {

    protected Long acptId;
	protected String title;
	protected String code;
	protected Long applyUserid;
	protected java.util.Date applyDat;
	protected String applyContent;
	protected Long perIncharge;
	protected String perCall;
	protected String perPhone;
	protected Short acptResult;
	protected String acptContent;
	protected Long creUserid;
	protected java.util.Date creDat;
	protected Long updUserid;
	protected java.util.Date updDat;
	protected String nodeName;
	protected String approvalStatus;
	protected Short status;
	protected Integer runid;
	protected Integer isDelete;

	protected java.util.Set shAcptApplys = new java.util.HashSet();
	protected java.util.Set shAcptCtrls = new java.util.HashSet();
	protected java.util.Set shAcptFiles = new java.util.HashSet();
	protected java.util.Set shAcptMetds = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ShBuilderAccept
	 */
	public ShBuilderAccept () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ShBuilderAccept
	 */
	public ShBuilderAccept (
		 Long in_acptId
        ) {
		this.setAcptId(in_acptId);
    }


	public java.util.Set getShAcptApplys () {
		return shAcptApplys;
	}	
	
	public void setShAcptApplys (java.util.Set in_shAcptApplys) {
		this.shAcptApplys = in_shAcptApplys;
	}

	public java.util.Set getShAcptCtrls () {
		return shAcptCtrls;
	}	
	
	public void setShAcptCtrls (java.util.Set in_shAcptCtrls) {
		this.shAcptCtrls = in_shAcptCtrls;
	}

	public java.util.Set getShAcptFiles () {
		return shAcptFiles;
	}	
	
	public void setShAcptFiles (java.util.Set in_shAcptFiles) {
		this.shAcptFiles = in_shAcptFiles;
	}

	public java.util.Set getShAcptMetds () {
		return shAcptMetds;
	}	
	
	public void setShAcptMetds (java.util.Set in_shAcptMetds) {
		this.shAcptMetds = in_shAcptMetds;
	}
    

	/**
	 * 验收单内码	 * @return Long
     * @hibernate.id column="ACPT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getAcptId() {
		return this.acptId;
	}
	
	/**
	 * Set the acptId
	 */	
	public void setAcptId(Long aValue) {
		this.acptId = aValue;
	}	

	/**
	 * 标题	 * @return String
	 * @hibernate.property column="TITLE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getTitle() {
		return this.title;
	}
	
	/**
	 * Set the title
	 */	
	public void setTitle(String aValue) {
		this.title = aValue;
	}	

	/**
	 * 编号	 * @return String
	 * @hibernate.property column="CODE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getCode() {
		return this.code;
	}
	
	/**
	 * Set the code
	 */	
	public void setCode(String aValue) {
		this.code = aValue;
	}	

	/**
	 * 申请人	 * @return Long
	 * @hibernate.property column="APPLY_USERID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getApplyUserid() {
		return this.applyUserid;
	}
	
	/**
	 * Set the applyUserid
	 */	
	public void setApplyUserid(Long aValue) {
		this.applyUserid = aValue;
	}	

	/**
	 * 申请时间	 * @return java.util.Date
	 * @hibernate.property column="APPLY_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getApplyDat() {
		return this.applyDat;
	}
	
	/**
	 * Set the applyDat
	 */	
	public void setApplyDat(java.util.Date aValue) {
		this.applyDat = aValue;
	}	

	/**
	 * 申请说明	 * @return String
	 * @hibernate.property column="APPLY_CONTENT" type="java.lang.String" length="500" not-null="false" unique="false"
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
	 * 负责人	 * @return Long
	 * @hibernate.property column="PER_INCHARGE" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getPerIncharge() {
		return this.perIncharge;
	}
	
	/**
	 * Set the perIncharge
	 */	
	public void setPerIncharge(Long aValue) {
		this.perIncharge = aValue;
	}	

	/**
	 * 负责人电话	 * @return String
	 * @hibernate.property column="PER_CALL" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getPerCall() {
		return this.perCall;
	}
	
	/**
	 * Set the perCall
	 */	
	public void setPerCall(String aValue) {
		this.perCall = aValue;
	}	

	/**
	 * 负责人手机	 * @return String
	 * @hibernate.property column="PER_PHONE" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getPerPhone() {
		return this.perPhone;
	}
	
	/**
	 * Set the perPhone
	 */	
	public void setPerPhone(String aValue) {
		this.perPhone = aValue;
	}	

	/**
	 * 验收结果	 * @return Short
	 * @hibernate.property column="ACPT_RESULT" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getAcptResult() {
		return this.acptResult;
	}
	
	/**
	 * Set the acptResult
	 */	
	public void setAcptResult(Short aValue) {
		this.acptResult = aValue;
	}	

	/**
	 * 验收说明	 * @return String
	 * @hibernate.property column="ACPT_CONTENT" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getAcptContent() {
		return this.acptContent;
	}
	
	/**
	 * Set the acptContent
	 */	
	public void setAcptContent(String aValue) {
		this.acptContent = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CRE_USERID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCreUserid() {
		return this.creUserid;
	}
	
	/**
	 * Set the creUserid
	 */	
	public void setCreUserid(Long aValue) {
		this.creUserid = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}
	
	/**
	 * Set the creDat
	 */	
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPD_USERID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdUserid() {
		return this.updUserid;
	}
	
	/**
	 * Set the updUserid
	 */	
	public void setUpdUserid(Long aValue) {
		this.updUserid = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
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
	 * 状态	 * @return Short
	 * @hibernate.property column="STATUS" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ShBuilderAccept)) {
			return false;
		}
		ShBuilderAccept rhs = (ShBuilderAccept) object;
		return new EqualsBuilder()
				.append(this.acptId, rhs.acptId)
				.append(this.title, rhs.title)
				.append(this.code, rhs.code)
				.append(this.applyUserid, rhs.applyUserid)
				.append(this.applyDat, rhs.applyDat)
				.append(this.applyContent, rhs.applyContent)
				.append(this.perIncharge, rhs.perIncharge)
				.append(this.perCall, rhs.perCall)
				.append(this.perPhone, rhs.perPhone)
				.append(this.acptResult, rhs.acptResult)
				.append(this.acptContent, rhs.acptContent)
				.append(this.creUserid, rhs.creUserid)
				.append(this.creDat, rhs.creDat)
				.append(this.updUserid, rhs.updUserid)
				.append(this.updDat, rhs.updDat)
				.append(this.nodeName, rhs.nodeName)
				.append(this.approvalStatus, rhs.approvalStatus)
				.append(this.status, rhs.status)
				.append(this.runid, rhs.runid)
				.append(this.isDelete, rhs.isDelete)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.acptId) 
				.append(this.title) 
				.append(this.code) 
				.append(this.applyUserid) 
				.append(this.applyDat) 
				.append(this.applyContent) 
				.append(this.perIncharge) 
				.append(this.perCall) 
				.append(this.perPhone) 
				.append(this.acptResult) 
				.append(this.acptContent) 
				.append(this.creUserid) 
				.append(this.creDat) 
				.append(this.updUserid) 
				.append(this.updDat) 
				.append(this.nodeName) 
				.append(this.approvalStatus) 
				.append(this.status) 
				.append(this.runid) 
				.append(this.isDelete) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("acptId", this.acptId) 
				.append("title", this.title) 
				.append("code", this.code) 
				.append("applyUserid", this.applyUserid) 
				.append("applyDat", this.applyDat) 
				.append("applyContent", this.applyContent) 
				.append("perIncharge", this.perIncharge) 
				.append("perCall", this.perCall) 
				.append("perPhone", this.perPhone) 
				.append("acptResult", this.acptResult) 
				.append("acptContent", this.acptContent) 
				.append("creUserid", this.creUserid) 
				.append("creDat", this.creDat) 
				.append("updUserid", this.updUserid) 
				.append("updDat", this.updDat) 
				.append("nodeName", this.nodeName) 
				.append("approvalStatus", this.approvalStatus) 
				.append("status", this.status) 
				.append("runid", this.runid) 
				.append("isDelete", this.isDelete) 
				.toString();
	}



}
