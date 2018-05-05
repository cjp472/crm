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
 * ShBugReport Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ShBugReport extends com.htsoft.core.model.BaseModel {

    protected Long applyId;
	protected Long applyDepid;
	protected String reportPhone;
	protected Short bugResource;
	protected String bugAddress;
	protected java.util.Date bugTime;
	protected Short bugProperties;
	protected Short bugType;
	protected Short effectArear;
	protected String bugDesc;
	protected Short urgencyLevel;
	protected Short bugPriority;
	protected Long registerPerson;
	protected java.util.Date registerTime;
	protected Long creUserid;
	protected Long perDepid;
	protected String bugFacility;
	protected Long applyUserid;
	protected String applyComment;
	protected String code;
	protected Long perIncharge;
	protected Short applyStatus;
	protected Long runid;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected String nodeName;
	protected String approvalStatus;
	protected Short cusSatisDegree;
	protected Short cusFeebackInfo;

	protected java.util.Set shBugCuss = new java.util.HashSet();
	protected java.util.Set shBugRepaires = new java.util.HashSet();
	protected java.util.Set shReportFiles = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ShBugReport
	 */
	public ShBugReport () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ShBugReport
	 */
	public ShBugReport (
		 Long in_applyId
        ) {
		this.setApplyId(in_applyId);
    }


	public java.util.Set getShBugCuss () {
		return shBugCuss;
	}	
	
	public void setShBugCuss (java.util.Set in_shBugCuss) {
		this.shBugCuss = in_shBugCuss;
	}

	public java.util.Set getShBugRepaires () {
		return shBugRepaires;
	}	
	
	public void setShBugRepaires (java.util.Set in_shBugRepaires) {
		this.shBugRepaires = in_shBugRepaires;
	}

	public java.util.Set getShReportFiles () {
		return shReportFiles;
	}	
	
	public void setShReportFiles (java.util.Set in_shReportFiles) {
		this.shReportFiles = in_shReportFiles;
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
	 * 所在单位	 * @return Long
	 * @hibernate.property column="APPLY_DEPID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getApplyDepid() {
		return this.applyDepid;
	}
	
	/**
	 * Set the applyDepid
	 */	
	public void setApplyDepid(Long aValue) {
		this.applyDepid = aValue;
	}	

	/**
	 * 报修电话	 * @return String
	 * @hibernate.property column="REPORT_PHONE" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getReportPhone() {
		return this.reportPhone;
	}
	
	/**
	 * Set the reportPhone
	 */	
	public void setReportPhone(String aValue) {
		this.reportPhone = aValue;
	}	

	/**
	 * 故障来源	 * @return Short
	 * @hibernate.property column="BUG_RESOURCE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBugResource() {
		return this.bugResource;
	}
	
	/**
	 * Set the bugResource
	 */	
	public void setBugResource(Short aValue) {
		this.bugResource = aValue;
	}	

	/**
	 * 故障地点	 * @return String
	 * @hibernate.property column="BUG_ADDRESS" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getBugAddress() {
		return this.bugAddress;
	}
	
	/**
	 * Set the bugAddress
	 */	
	public void setBugAddress(String aValue) {
		this.bugAddress = aValue;
	}	

	/**
	 * 故障时间	 * @return java.util.Date
	 * @hibernate.property column="BUG_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getBugTime() {
		return this.bugTime;
	}
	
	/**
	 * Set the bugTime
	 */	
	public void setBugTime(java.util.Date aValue) {
		this.bugTime = aValue;
	}	

	/**
	 * 故障性质	 * @return Short
	 * @hibernate.property column="BUG_PROPERTIES" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBugProperties() {
		return this.bugProperties;
	}
	
	/**
	 * Set the bugProperties
	 */	
	public void setBugProperties(Short aValue) {
		this.bugProperties = aValue;
	}	

	/**
	 * 故障分类	 * @return Short
	 * @hibernate.property column="BUG_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBugType() {
		return this.bugType;
	}
	
	/**
	 * Set the bugType
	 */	
	public void setBugType(Short aValue) {
		this.bugType = aValue;
	}	

	/**
	 * 影响范围	 * @return Short
	 * @hibernate.property column="EFFECT_AREAR" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getEffectArear() {
		return this.effectArear;
	}
	
	/**
	 * Set the effectArear
	 */	
	public void setEffectArear(Short aValue) {
		this.effectArear = aValue;
	}	

	/**
	 * 故障描述	 * @return String
	 * @hibernate.property column="BUG_DESC" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getBugDesc() {
		return this.bugDesc;
	}
	
	/**
	 * Set the bugDesc
	 */	
	public void setBugDesc(String aValue) {
		this.bugDesc = aValue;
	}	

	/**
	 * 紧急程度	 * @return Short
	 * @hibernate.property column="URGENCY_LEVEL" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getUrgencyLevel() {
		return this.urgencyLevel;
	}
	
	/**
	 * Set the urgencyLevel
	 */	
	public void setUrgencyLevel(Short aValue) {
		this.urgencyLevel = aValue;
	}	

	/**
	 * 故障优先级	 * @return Short
	 * @hibernate.property column="BUG_PRIORITY" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBugPriority() {
		return this.bugPriority;
	}
	
	/**
	 * Set the bugPriority
	 */	
	public void setBugPriority(Short aValue) {
		this.bugPriority = aValue;
	}	

	/**
	 * 登记人	 * @return Long
	 * @hibernate.property column="REGISTER_PERSON" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getRegisterPerson() {
		return this.registerPerson;
	}
	
	/**
	 * Set the registerPerson
	 */	
	public void setRegisterPerson(Long aValue) {
		this.registerPerson = aValue;
	}	

	/**
	 * 登记时间	 * @return java.util.Date
	 * @hibernate.property column="REGISTER_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getRegisterTime() {
		return this.registerTime;
	}
	
	/**
	 * Set the registerTime
	 */	
	public void setRegisterTime(java.util.Date aValue) {
		this.registerTime = aValue;
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
	 * 负责部门	 * @return Long
	 * @hibernate.property column="PER_DEPID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getPerDepid() {
		return this.perDepid;
	}
	
	/**
	 * Set the perDepid
	 */	
	public void setPerDepid(Long aValue) {
		this.perDepid = aValue;
	}	

	/**
	 * 故障设备	 * @return String
	 * @hibernate.property column="BUG_FACILITY" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getBugFacility() {
		return this.bugFacility;
	}
	
	/**
	 * Set the bugFacility
	 */	
	public void setBugFacility(String aValue) {
		this.bugFacility = aValue;
	}	

	/**
	 * 报修人	 * @return Long
	 * @hibernate.property column="APPLY_USERID" type="java.lang.Long" length="38" not-null="false" unique="false"
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
	 * 编号	 * @return String
	 * @hibernate.property column="CODE" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
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
	 * 客户满意度	 * @return Short
	 * @hibernate.property column="CUS_SATIS_DEGREE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusSatisDegree() {
		return this.cusSatisDegree;
	}
	
	/**
	 * Set the cusSatisDegree
	 */	
	public void setCusSatisDegree(Short aValue) {
		this.cusSatisDegree = aValue;
	}	

	/**
	 * 用户反馈信息	 * @return Short
	 * @hibernate.property column="CUS_FEEBACK_INFO" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusFeebackInfo() {
		return this.cusFeebackInfo;
	}
	
	/**
	 * Set the cusFeebackInfo
	 */	
	public void setCusFeebackInfo(Short aValue) {
		this.cusFeebackInfo = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ShBugReport)) {
			return false;
		}
		ShBugReport rhs = (ShBugReport) object;
		return new EqualsBuilder()
				.append(this.applyId, rhs.applyId)
				.append(this.applyDepid, rhs.applyDepid)
				.append(this.reportPhone, rhs.reportPhone)
				.append(this.bugResource, rhs.bugResource)
				.append(this.bugAddress, rhs.bugAddress)
				.append(this.bugTime, rhs.bugTime)
				.append(this.bugProperties, rhs.bugProperties)
				.append(this.bugType, rhs.bugType)
				.append(this.effectArear, rhs.effectArear)
				.append(this.bugDesc, rhs.bugDesc)
				.append(this.urgencyLevel, rhs.urgencyLevel)
				.append(this.bugPriority, rhs.bugPriority)
				.append(this.registerPerson, rhs.registerPerson)
				.append(this.registerTime, rhs.registerTime)
				.append(this.creUserid, rhs.creUserid)
				.append(this.perDepid, rhs.perDepid)
				.append(this.bugFacility, rhs.bugFacility)
				.append(this.applyUserid, rhs.applyUserid)
				.append(this.applyComment, rhs.applyComment)
				.append(this.code, rhs.code)
				.append(this.perIncharge, rhs.perIncharge)
				.append(this.applyStatus, rhs.applyStatus)
				.append(this.runid, rhs.runid)
				.append(this.updateBy, rhs.updateBy)
				.append(this.createDate, rhs.createDate)
				.append(this.updateDate, rhs.updateDate)
				.append(this.nodeName, rhs.nodeName)
				.append(this.approvalStatus, rhs.approvalStatus)
				.append(this.cusSatisDegree, rhs.cusSatisDegree)
				.append(this.cusFeebackInfo, rhs.cusFeebackInfo)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.applyId) 
				.append(this.applyDepid) 
				.append(this.reportPhone) 
				.append(this.bugResource) 
				.append(this.bugAddress) 
				.append(this.bugTime) 
				.append(this.bugProperties) 
				.append(this.bugType) 
				.append(this.effectArear) 
				.append(this.bugDesc) 
				.append(this.urgencyLevel) 
				.append(this.bugPriority) 
				.append(this.registerPerson) 
				.append(this.registerTime) 
				.append(this.creUserid) 
				.append(this.perDepid) 
				.append(this.bugFacility) 
				.append(this.applyUserid) 
				.append(this.applyComment) 
				.append(this.code) 
				.append(this.perIncharge) 
				.append(this.applyStatus) 
				.append(this.runid) 
				.append(this.updateBy) 
				.append(this.createDate) 
				.append(this.updateDate) 
				.append(this.nodeName) 
				.append(this.approvalStatus) 
				.append(this.cusSatisDegree) 
				.append(this.cusFeebackInfo) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("applyId", this.applyId) 
				.append("applyDepid", this.applyDepid) 
				.append("reportPhone", this.reportPhone) 
				.append("bugResource", this.bugResource) 
				.append("bugAddress", this.bugAddress) 
				.append("bugTime", this.bugTime) 
				.append("bugProperties", this.bugProperties) 
				.append("bugType", this.bugType) 
				.append("effectArear", this.effectArear) 
				.append("bugDesc", this.bugDesc) 
				.append("urgencyLevel", this.urgencyLevel) 
				.append("bugPriority", this.bugPriority) 
				.append("registerPerson", this.registerPerson) 
				.append("registerTime", this.registerTime) 
				.append("creUserid", this.creUserid) 
				.append("perDepid", this.perDepid) 
				.append("bugFacility", this.bugFacility) 
				.append("applyUserid", this.applyUserid) 
				.append("applyComment", this.applyComment) 
				.append("code", this.code) 
				.append("perIncharge", this.perIncharge) 
				.append("applyStatus", this.applyStatus) 
				.append("runid", this.runid) 
				.append("updateBy", this.updateBy) 
				.append("createDate", this.createDate) 
				.append("updateDate", this.updateDate) 
				.append("nodeName", this.nodeName) 
				.append("approvalStatus", this.approvalStatus) 
				.append("cusSatisDegree", this.cusSatisDegree) 
				.append("cusFeebackInfo", this.cusFeebackInfo) 
				.toString();
	}



}
