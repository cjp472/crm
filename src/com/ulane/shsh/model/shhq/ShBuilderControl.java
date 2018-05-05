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
 * ShBuilderControl Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ShBuilderControl extends com.htsoft.core.model.BaseModel {

    protected Long contlId;
	protected String title;
	protected String code;
	protected String contlContent;
	protected String applyAddress;
	protected String hourseName;
	protected String resource;
	protected Long applyUserid;
	protected Long applyDepid;
	protected Long perIncharge;
	protected java.util.Date applyDat;
	protected Short status;
	protected Long signPerson;
	protected Long creUserid;
	protected java.util.Date creDat;
	protected com.ulane.shsh.model.shhq.ShBuilderApply shBuilderApply;

	protected java.util.Set shAcptCtrls = new java.util.HashSet();
	protected java.util.Set shCtrlFiles = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ShBuilderControl
	 */
	public ShBuilderControl () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ShBuilderControl
	 */
	public ShBuilderControl (
		 Long in_contlId
        ) {
		this.setContlId(in_contlId);
    }

	
	public com.ulane.shsh.model.shhq.ShBuilderApply getShBuilderApply () {
		return shBuilderApply;
	}	
	
	public void setShBuilderApply (com.ulane.shsh.model.shhq.ShBuilderApply in_shBuilderApply) {
		this.shBuilderApply = in_shBuilderApply;
	}

	public java.util.Set getShAcptCtrls () {
		return shAcptCtrls;
	}	
	
	public void setShAcptCtrls (java.util.Set in_shAcptCtrls) {
		this.shAcptCtrls = in_shAcptCtrls;
	}

	public java.util.Set getShCtrlFiles () {
		return shCtrlFiles;
	}	
	
	public void setShCtrlFiles (java.util.Set in_shCtrlFiles) {
		this.shCtrlFiles = in_shCtrlFiles;
	}
    

	/**
	 * 监管单内码	 * @return Long
     * @hibernate.id column="CONTL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getContlId() {
		return this.contlId;
	}
	
	/**
	 * Set the contlId
	 */	
	public void setContlId(Long aValue) {
		this.contlId = aValue;
	}	

	/**
	 * 申请内码	 * @return Long
	 */
	public Long getApplyId() {
		return this.getShBuilderApply()==null?null:this.getShBuilderApply().getApplyId();
	}
	
	/**
	 * Set the applyId
	 */	
	public void setApplyId(Long aValue) {
	    if (aValue==null) {
	    	shBuilderApply = null;
	    } else if (shBuilderApply == null) {
	        shBuilderApply = new com.ulane.shsh.model.shhq.ShBuilderApply(aValue);
	        shBuilderApply.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			shBuilderApply.setApplyId(aValue);
	    }
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
	 * 监管内容	 * @return String
	 * @hibernate.property column="CONTL_CONTENT" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getContlContent() {
		return this.contlContent;
	}
	
	/**
	 * Set the contlContent
	 */	
	public void setContlContent(String aValue) {
		this.contlContent = aValue;
	}	

	/**
	 * 施工地点	 * @return String
	 * @hibernate.property column="APPLY_ADDRESS" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getApplyAddress() {
		return this.applyAddress;
	}
	
	/**
	 * Set the applyAddress
	 */	
	public void setApplyAddress(String aValue) {
		this.applyAddress = aValue;
	}	

	/**
	 * 机房名称	 * @return String
	 * @hibernate.property column="HOURSE_NAME" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getHourseName() {
		return this.hourseName;
	}
	
	/**
	 * Set the hourseName
	 */	
	public void setHourseName(String aValue) {
		this.hourseName = aValue;
	}	

	/**
	 * 动用资源	 * @return String
	 * @hibernate.property column="RESOURCE" type="java.lang.String" length="300" not-null="false" unique="false"
	 */
	public String getResource() {
		return this.resource;
	}
	
	/**
	 * Set the resource
	 */	
	public void setResource(String aValue) {
		this.resource = aValue;
	}	

	/**
	 * 施工方	 * @return Long
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
	 * 施工单位	 * @return Long
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
	 * 施工时间	 * @return java.util.Date
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
	 * 签字人	 * @return Long
	 * @hibernate.property column="SIGN_PERSON" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getSignPerson() {
		return this.signPerson;
	}
	
	/**
	 * Set the signPerson
	 */	
	public void setSignPerson(Long aValue) {
		this.signPerson = aValue;
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ShBuilderControl)) {
			return false;
		}
		ShBuilderControl rhs = (ShBuilderControl) object;
		return new EqualsBuilder()
				.append(this.contlId, rhs.contlId)
						.append(this.title, rhs.title)
				.append(this.code, rhs.code)
				.append(this.contlContent, rhs.contlContent)
				.append(this.applyAddress, rhs.applyAddress)
				.append(this.hourseName, rhs.hourseName)
				.append(this.resource, rhs.resource)
				.append(this.applyUserid, rhs.applyUserid)
				.append(this.applyDepid, rhs.applyDepid)
				.append(this.perIncharge, rhs.perIncharge)
				.append(this.applyDat, rhs.applyDat)
				.append(this.status, rhs.status)
				.append(this.signPerson, rhs.signPerson)
				.append(this.creUserid, rhs.creUserid)
				.append(this.creDat, rhs.creDat)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.contlId) 
						.append(this.title) 
				.append(this.code) 
				.append(this.contlContent) 
				.append(this.applyAddress) 
				.append(this.hourseName) 
				.append(this.resource) 
				.append(this.applyUserid) 
				.append(this.applyDepid) 
				.append(this.perIncharge) 
				.append(this.applyDat) 
				.append(this.status) 
				.append(this.signPerson) 
				.append(this.creUserid) 
				.append(this.creDat) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("contlId", this.contlId) 
						.append("title", this.title) 
				.append("code", this.code) 
				.append("contlContent", this.contlContent) 
				.append("applyAddress", this.applyAddress) 
				.append("hourseName", this.hourseName) 
				.append("resource", this.resource) 
				.append("applyUserid", this.applyUserid) 
				.append("applyDepid", this.applyDepid) 
				.append("perIncharge", this.perIncharge) 
				.append("applyDat", this.applyDat) 
				.append("status", this.status) 
				.append("signPerson", this.signPerson) 
				.append("creUserid", this.creUserid) 
				.append("creDat", this.creDat) 
				.toString();
	}



}
