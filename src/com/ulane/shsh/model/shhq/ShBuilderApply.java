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
 * ShBuilderApply Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ShBuilderApply extends com.htsoft.core.model.BaseModel {

    protected Long applyId;
	protected Long applyUserid;
	protected java.util.Date applyTime;
	protected String applyTitle;
	protected String applyComment;
	protected String applyContent;
	protected String applyDescribe;
	protected String code;
	protected String buldAddress;
	protected String buildHouse;
	protected String buildArear;
	protected Short isFire;
	protected Short isHeight;
	protected Long perIncharge;
	protected String perCall;
	protected String perPhone;
	protected Short applyStatus;
	protected Long runid;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String nodeName;
	protected String approvalStatus;
	protected com.ulane.shsh.model.shhq.ShBuilderMethod shBuilderMethod;

	protected java.util.Set shAcptApplys = new java.util.HashSet();
	protected java.util.Set shBuilderControls = new java.util.HashSet();
	protected java.util.Set shBuilderTimes = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ShBuilderApply
	 */
	public ShBuilderApply () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ShBuilderApply
	 */
	public ShBuilderApply (
		 Long in_applyId
        ) {
		this.setApplyId(in_applyId);
    }

	
	public com.ulane.shsh.model.shhq.ShBuilderMethod getShBuilderMethod () {
		return shBuilderMethod;
	}	
	
	public void setShBuilderMethod (com.ulane.shsh.model.shhq.ShBuilderMethod in_shBuilderMethod) {
		this.shBuilderMethod = in_shBuilderMethod;
	}

	public java.util.Set getShAcptApplys () {
		return shAcptApplys;
	}	
	
	public void setShAcptApplys (java.util.Set in_shAcptApplys) {
		this.shAcptApplys = in_shAcptApplys;
	}

	public java.util.Set getShBuilderControls () {
		return shBuilderControls;
	}	
	
	public void setShBuilderControls (java.util.Set in_shBuilderControls) {
		this.shBuilderControls = in_shBuilderControls;
	}

	public java.util.Set getShBuilderTimes () {
		return shBuilderTimes;
	}	
	
	public void setShBuilderTimes (java.util.Set in_shBuilderTimes) {
		this.shBuilderTimes = in_shBuilderTimes;
	}
    

	/**
	 * 申请内码	 * @return Long
     * @hibernate.id column="APPLY_ID" type="java.lang.Long" generator-class="native"
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
	 * 方案内码	 * @return Long
	 */
	public Long getMetdId() {
		return this.getShBuilderMethod()==null?null:this.getShBuilderMethod().getMetdId();
	}
	
	/**
	 * Set the metdId
	 */	
	public void setMetdId(Long aValue) {
	    if (aValue==null) {
	    	shBuilderMethod = null;
	    } else if (shBuilderMethod == null) {
	        shBuilderMethod = new com.ulane.shsh.model.shhq.ShBuilderMethod(aValue);
	        shBuilderMethod.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			shBuilderMethod.setMetdId(aValue);
	    }
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
	 * @hibernate.property column="APPLY_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getApplyTime() {
		return this.applyTime;
	}
	
	/**
	 * Set the applyTime
	 */	
	public void setApplyTime(java.util.Date aValue) {
		this.applyTime = aValue;
	}	

	/**
	 * 标题	 * @return String
	 * @hibernate.property column="APPLY_TITLE" type="java.lang.String" length="128" not-null="false" unique="false"
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
	 * 备注	 * @return String
	 * @hibernate.property column="APPLY_COMMENT" type="java.lang.String" length="500" not-null="false" unique="false"
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
	 * 施工内容	 * @return String
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
	 * 施工内容说明	 * @return String
	 * @hibernate.property column="APPLY_DESCRIBE" type="java.lang.String" length="500" not-null="false" unique="false"
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
	 * 施工地点	 * @return String
	 * @hibernate.property column="BULD_ADDRESS" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getBuldAddress() {
		return this.buldAddress;
	}
	
	/**
	 * Set the buldAddress
	 */	
	public void setBuldAddress(String aValue) {
		this.buldAddress = aValue;
	}	

	/**
	 * 机房名称	 * @return String
	 * @hibernate.property column="BUILD_HOUSE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getBuildHouse() {
		return this.buildHouse;
	}
	
	/**
	 * Set the buildHouse
	 */	
	public void setBuildHouse(String aValue) {
		this.buildHouse = aValue;
	}	

	/**
	 * 施工面积	 * @return String
	 * @hibernate.property column="BUILD_AREAR" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getBuildArear() {
		return this.buildArear;
	}
	
	/**
	 * Set the buildArear
	 */	
	public void setBuildArear(String aValue) {
		this.buildArear = aValue;
	}	

	/**
	 * 是否动火施工	 * @return Short
	 * @hibernate.property column="IS_FIRE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getIsFire() {
		return this.isFire;
	}
	
	/**
	 * Set the isFire
	 */	
	public void setIsFire(Short aValue) {
		this.isFire = aValue;
	}	

	/**
	 * 是否登高施工	 * @return Short
	 * @hibernate.property column="IS_HEIGHT" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getIsHeight() {
		return this.isHeight;
	}
	
	/**
	 * Set the isHeight
	 */	
	public void setIsHeight(Short aValue) {
		this.isHeight = aValue;
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
	 * @hibernate.property column="PER_CALL" type="java.lang.String" length="128" not-null="false" unique="false"
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
	 * @hibernate.property column="PER_PHONE" type="java.lang.String" length="128" not-null="false" unique="false"
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
	 * 状态	 * @return Short
	 * @hibernate.property column="APPLY_STATUS" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getApplyStatus() {
		return this.applyStatus;
	}
	
	/**
	 * Set the applyStatus
	 */	
	public void setApplyStatus(Short aValue) {
		this.applyStatus = aValue;
	}	

	/**
	 * RUNID	 * @return Long
	 * @hibernate.property column="RUNID" type="java.lang.Long" length="38" not-null="false" unique="false"
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
		if (!(object instanceof ShBuilderApply)) {
			return false;
		}
		ShBuilderApply rhs = (ShBuilderApply) object;
		return new EqualsBuilder()
				.append(this.applyId, rhs.applyId)
						.append(this.applyUserid, rhs.applyUserid)
				.append(this.applyTime, rhs.applyTime)
				.append(this.applyTitle, rhs.applyTitle)
				.append(this.applyComment, rhs.applyComment)
				.append(this.applyContent, rhs.applyContent)
				.append(this.applyDescribe, rhs.applyDescribe)
				.append(this.code, rhs.code)
				.append(this.buldAddress, rhs.buldAddress)
				.append(this.buildHouse, rhs.buildHouse)
				.append(this.buildArear, rhs.buildArear)
				.append(this.isFire, rhs.isFire)
				.append(this.isHeight, rhs.isHeight)
				.append(this.perIncharge, rhs.perIncharge)
				.append(this.perCall, rhs.perCall)
				.append(this.perPhone, rhs.perPhone)
				.append(this.applyStatus, rhs.applyStatus)
				.append(this.runid, rhs.runid)
				.append(this.createBy, rhs.createBy)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.nodeName, rhs.nodeName)
				.append(this.approvalStatus, rhs.approvalStatus)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.applyId) 
						.append(this.applyUserid) 
				.append(this.applyTime) 
				.append(this.applyTitle) 
				.append(this.applyComment) 
				.append(this.applyContent) 
				.append(this.applyDescribe) 
				.append(this.code) 
				.append(this.buldAddress) 
				.append(this.buildHouse) 
				.append(this.buildArear) 
				.append(this.isFire) 
				.append(this.isHeight) 
				.append(this.perIncharge) 
				.append(this.perCall) 
				.append(this.perPhone) 
				.append(this.applyStatus) 
				.append(this.runid) 
				.append(this.createBy) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.nodeName) 
				.append(this.approvalStatus) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("applyId", this.applyId) 
						.append("applyUserid", this.applyUserid) 
				.append("applyTime", this.applyTime) 
				.append("applyTitle", this.applyTitle) 
				.append("applyComment", this.applyComment) 
				.append("applyContent", this.applyContent) 
				.append("applyDescribe", this.applyDescribe) 
				.append("code", this.code) 
				.append("buldAddress", this.buldAddress) 
				.append("buildHouse", this.buildHouse) 
				.append("buildArear", this.buildArear) 
				.append("isFire", this.isFire) 
				.append("isHeight", this.isHeight) 
				.append("perIncharge", this.perIncharge) 
				.append("perCall", this.perCall) 
				.append("perPhone", this.perPhone) 
				.append("applyStatus", this.applyStatus) 
				.append("runid", this.runid) 
				.append("createBy", this.createBy) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("nodeName", this.nodeName) 
				.append("approvalStatus", this.approvalStatus) 
				.toString();
	}



}
