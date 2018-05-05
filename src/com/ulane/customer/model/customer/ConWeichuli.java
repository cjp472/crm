package com.ulane.customer.model.customer;
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
 * ConWeichuli Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ConWeichuli extends com.htsoft.core.model.BaseModel {

    protected Long conId;
	protected Short srcTypeId;
	protected Short dirId;
	protected Short contactTypeId;
	protected String preContactNum;
	protected String mainContactNum;
	protected String lastContactNum;
	protected String content;
	protected java.util.Date creTime;
	protected java.util.Date synTime;
	protected Integer assignId;
	protected java.util.Date assignTime;
	protected Integer ownerId;
	protected java.util.Date acceptTime;
	protected Short dealStaId;
	protected Short dealResId;
	protected String dealRemarks;


	/**
	 * Default Empty Constructor for class ConWeichuli
	 */
	public ConWeichuli () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConWeichuli
	 */
	public ConWeichuli (
		 Long in_conId
        ) {
		this.setConId(in_conId);
    }

    

	/**
	 * 联络ID	 * @return Long
     * @hibernate.id column="CON_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getConId() {
		return this.conId;
	}
	
	/**
	 * Set the conId
	 */	
	public void setConId(Long aValue) {
		this.conId = aValue;
	}	

	/**
	 * 来源：项目定义	 * @return Short
	 * @hibernate.property column="SRC_TYPE_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getSrcTypeId() {
		return this.srcTypeId;
	}
	
	/**
	 * Set the srcTypeId
	 */	
	public void setSrcTypeId(Short aValue) {
		this.srcTypeId = aValue;
	}	

	/**
	 * 方向：呼入、呼出	 * @return Short
	 * @hibernate.property column="DIR_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDirId() {
		return this.dirId;
	}
	
	/**
	 * Set the dirId
	 * @spring.validator type="required"
	 */	
	public void setDirId(Short aValue) {
		this.dirId = aValue;
	}	

	/**
	 * 联系方式：地址、Email、QQ、MSN等	 * @return Short
	 * @hibernate.property column="CONTACT_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getContactTypeId() {
		return this.contactTypeId;
	}
	
	/**
	 * Set the contactTypeId
	 * @spring.validator type="required"
	 */	
	public void setContactTypeId(Short aValue) {
		this.contactTypeId = aValue;
	}	

	/**
	 * 区号/地区号	 * @return String
	 * @hibernate.property column="PRE_CONTACT_NUM" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getPreContactNum() {
		return this.preContactNum;
	}
	
	/**
	 * Set the preContactNum
	 */	
	public void setPreContactNum(String aValue) {
		this.preContactNum = aValue;
	}	

	/**
	 * 号码/详细地址	 * @return String
	 * @hibernate.property column="MAIN_CONTACT_NUM" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getMainContactNum() {
		return this.mainContactNum;
	}
	
	/**
	 * Set the mainContactNum
	 * @spring.validator type="required"
	 */	
	public void setMainContactNum(String aValue) {
		this.mainContactNum = aValue;
	}	

	/**
	 * 分机号/邮编	 * @return String
	 * @hibernate.property column="LAST_CONTACT_NUM" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getLastContactNum() {
		return this.lastContactNum;
	}
	
	/**
	 * Set the lastContactNum
	 */	
	public void setLastContactNum(String aValue) {
		this.lastContactNum = aValue;
	}	

	/**
	 * 联络内容	 * @return String
	 * @hibernate.property column="CONTENT" type="java.lang.String" length="2000" not-null="false" unique="false"
	 */
	public String getContent() {
		return this.content;
	}
	
	/**
	 * Set the content
	 */	
	public void setContent(String aValue) {
		this.content = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CRE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreTime() {
		return this.creTime;
	}
	
	/**
	 * Set the creTime
	 */	
	public void setCreTime(java.util.Date aValue) {
		this.creTime = aValue;
	}	

	/**
	 * 同步时间	 * @return java.util.Date
	 * @hibernate.property column="SYN_TIME" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getSynTime() {
		return this.synTime;
	}
	
	/**
	 * Set the synTime
	 * @spring.validator type="required"
	 */	
	public void setSynTime(java.util.Date aValue) {
		this.synTime = aValue;
	}	

	/**
	 * 分配人	 * @return Integer
	 * @hibernate.property column="ASSIGN_ID" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getAssignId() {
		return this.assignId;
	}
	
	/**
	 * Set the assignId
	 */	
	public void setAssignId(Integer aValue) {
		this.assignId = aValue;
	}	

	/**
	 * 分配时间	 * @return java.util.Date
	 * @hibernate.property column="ASSIGN_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getAssignTime() {
		return this.assignTime;
	}
	
	/**
	 * Set the assignTime
	 */	
	public void setAssignTime(java.util.Date aValue) {
		this.assignTime = aValue;
	}	

	/**
	 * 负责人	 * @return Integer
	 * @hibernate.property column="OWNER_ID" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getOwnerId() {
		return this.ownerId;
	}
	
	/**
	 * Set the ownerId
	 */	
	public void setOwnerId(Integer aValue) {
		this.ownerId = aValue;
	}	

	/**
	 * 领用时间	 * @return java.util.Date
	 * @hibernate.property column="ACCEPT_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getAcceptTime() {
		return this.acceptTime;
	}
	
	/**
	 * Set the acceptTime
	 */	
	public void setAcceptTime(java.util.Date aValue) {
		this.acceptTime = aValue;
	}	

	/**
	 * 处理状态	 * @return Short
	 * @hibernate.property column="DEAL_STA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getDealStaId() {
		return this.dealStaId;
	}
	
	/**
	 * Set the dealStaId
	 */	
	public void setDealStaId(Short aValue) {
		this.dealStaId = aValue;
	}	

	/**
	 * 处理结果	 * @return Short
	 * @hibernate.property column="DEAL_RES_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getDealResId() {
		return this.dealResId;
	}
	
	/**
	 * Set the dealResId
	 */	
	public void setDealResId(Short aValue) {
		this.dealResId = aValue;
	}	

	/**
	 * 处理备注	 * @return String
	 * @hibernate.property column="DEAL_REMARKS" type="java.lang.String" length="2000" not-null="false" unique="false"
	 */
	public String getDealRemarks() {
		return this.dealRemarks;
	}
	
	/**
	 * Set the dealRemarks
	 */	
	public void setDealRemarks(String aValue) {
		this.dealRemarks = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConWeichuli)) {
			return false;
		}
		ConWeichuli rhs = (ConWeichuli) object;
		return new EqualsBuilder()
				.append(this.conId, rhs.conId)
				.append(this.srcTypeId, rhs.srcTypeId)
				.append(this.dirId, rhs.dirId)
				.append(this.contactTypeId, rhs.contactTypeId)
				.append(this.preContactNum, rhs.preContactNum)
				.append(this.mainContactNum, rhs.mainContactNum)
				.append(this.lastContactNum, rhs.lastContactNum)
				.append(this.content, rhs.content)
				.append(this.creTime, rhs.creTime)
				.append(this.synTime, rhs.synTime)
				.append(this.assignId, rhs.assignId)
				.append(this.assignTime, rhs.assignTime)
				.append(this.ownerId, rhs.ownerId)
				.append(this.acceptTime, rhs.acceptTime)
				.append(this.dealStaId, rhs.dealStaId)
				.append(this.dealResId, rhs.dealResId)
				.append(this.dealRemarks, rhs.dealRemarks)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.conId) 
				.append(this.srcTypeId) 
				.append(this.dirId) 
				.append(this.contactTypeId) 
				.append(this.preContactNum) 
				.append(this.mainContactNum) 
				.append(this.lastContactNum) 
				.append(this.content) 
				.append(this.creTime) 
				.append(this.synTime) 
				.append(this.assignId) 
				.append(this.assignTime) 
				.append(this.ownerId) 
				.append(this.acceptTime) 
				.append(this.dealStaId) 
				.append(this.dealResId) 
				.append(this.dealRemarks) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("conId", this.conId) 
				.append("srcTypeId", this.srcTypeId) 
				.append("dirId", this.dirId) 
				.append("contactTypeId", this.contactTypeId) 
				.append("preContactNum", this.preContactNum) 
				.append("mainContactNum", this.mainContactNum) 
				.append("lastContactNum", this.lastContactNum) 
				.append("content", this.content) 
				.append("creTime", this.creTime) 
				.append("synTime", this.synTime) 
				.append("assignId", this.assignId) 
				.append("assignTime", this.assignTime) 
				.append("ownerId", this.ownerId) 
				.append("acceptTime", this.acceptTime) 
				.append("dealStaId", this.dealStaId) 
				.append("dealResId", this.dealResId) 
				.append("dealRemarks", this.dealRemarks) 
				.toString();
	}



}
