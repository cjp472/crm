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
 * ShBuilderMethod Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ShBuilderMethod extends com.htsoft.core.model.BaseModel {

    protected Long metdId;
	protected Short buildType;
	protected String applyContent;
	protected java.util.Date staDat;
	protected java.util.Date endDat;
	protected Long buildPerson;
	protected Long buildDepid;
	protected Long perIncharge;
	protected Short status;
	protected Integer runid;
	protected Long userid;
	protected java.util.Date applyDat;
	protected String title;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected Integer isDelete;
	protected String nodeName;
	protected String approvalStatus;

	protected java.util.Set shAcptMetds = new java.util.HashSet();
	protected java.util.Set shBuilderApplys = new java.util.HashSet();
	protected java.util.Set shMetdFiles = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ShBuilderMethod
	 */
	public ShBuilderMethod () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ShBuilderMethod
	 */
	public ShBuilderMethod (
		 Long in_metdId
        ) {
		this.setMetdId(in_metdId);
    }


	public java.util.Set getShAcptMetds () {
		return shAcptMetds;
	}	
	
	public void setShAcptMetds (java.util.Set in_shAcptMetds) {
		this.shAcptMetds = in_shAcptMetds;
	}

	public java.util.Set getShBuilderApplys () {
		return shBuilderApplys;
	}	
	
	public void setShBuilderApplys (java.util.Set in_shBuilderApplys) {
		this.shBuilderApplys = in_shBuilderApplys;
	}

	public java.util.Set getShMetdFiles () {
		return shMetdFiles;
	}	
	
	public void setShMetdFiles (java.util.Set in_shMetdFiles) {
		this.shMetdFiles = in_shMetdFiles;
	}
    

	/**
	 * 方案内码	 * @return Long
     * @hibernate.id column="METD_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getMetdId() {
		return this.metdId;
	}
	
	/**
	 * Set the metdId
	 */	
	public void setMetdId(Long aValue) {
		this.metdId = aValue;
	}	

	/**
	 * 施工类型	 * @return Short
	 * @hibernate.property column="BUILD_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBuildType() {
		return this.buildType;
	}
	
	/**
	 * Set the buildType
	 */	
	public void setBuildType(Short aValue) {
		this.buildType = aValue;
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
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="STA_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getStaDat() {
		return this.staDat;
	}
	
	/**
	 * Set the staDat
	 */	
	public void setStaDat(java.util.Date aValue) {
		this.staDat = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="END_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEndDat() {
		return this.endDat;
	}
	
	/**
	 * Set the endDat
	 */	
	public void setEndDat(java.util.Date aValue) {
		this.endDat = aValue;
	}	

	/**
	 * 施工方	 * @return Long
	 * @hibernate.property column="BUILD_PERSON" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getBuildPerson() {
		return this.buildPerson;
	}
	
	/**
	 * Set the buildPerson
	 */	
	public void setBuildPerson(Long aValue) {
		this.buildPerson = aValue;
	}	

	/**
	 * 施工部门	 * @return Long
	 * @hibernate.property column="BUILD_DEPID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getBuildDepid() {
		return this.buildDepid;
	}
	
	/**
	 * Set the buildDepid
	 */	
	public void setBuildDepid(Long aValue) {
		this.buildDepid = aValue;
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
	 * 申请人	 * @return Long
	 * @hibernate.property column="USERID" type="java.lang.Long" length="18" not-null="false" unique="false"
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
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(Long aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(Long aValue) {
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
		if (!(object instanceof ShBuilderMethod)) {
			return false;
		}
		ShBuilderMethod rhs = (ShBuilderMethod) object;
		return new EqualsBuilder()
				.append(this.metdId, rhs.metdId)
				.append(this.buildType, rhs.buildType)
				.append(this.applyContent, rhs.applyContent)
				.append(this.staDat, rhs.staDat)
				.append(this.endDat, rhs.endDat)
				.append(this.buildPerson, rhs.buildPerson)
				.append(this.buildDepid, rhs.buildDepid)
				.append(this.perIncharge, rhs.perIncharge)
				.append(this.status, rhs.status)
				.append(this.runid, rhs.runid)
				.append(this.userid, rhs.userid)
				.append(this.applyDat, rhs.applyDat)
				.append(this.title, rhs.title)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
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
				.append(this.metdId) 
				.append(this.buildType) 
				.append(this.applyContent) 
				.append(this.staDat) 
				.append(this.endDat) 
				.append(this.buildPerson) 
				.append(this.buildDepid) 
				.append(this.perIncharge) 
				.append(this.status) 
				.append(this.runid) 
				.append(this.userid) 
				.append(this.applyDat) 
				.append(this.title) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
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
				.append("metdId", this.metdId) 
				.append("buildType", this.buildType) 
				.append("applyContent", this.applyContent) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("buildPerson", this.buildPerson) 
				.append("buildDepid", this.buildDepid) 
				.append("perIncharge", this.perIncharge) 
				.append("status", this.status) 
				.append("runid", this.runid) 
				.append("userid", this.userid) 
				.append("applyDat", this.applyDat) 
				.append("title", this.title) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("isDelete", this.isDelete) 
				.append("nodeName", this.nodeName) 
				.append("approvalStatus", this.approvalStatus) 
				.toString();
	}



}
