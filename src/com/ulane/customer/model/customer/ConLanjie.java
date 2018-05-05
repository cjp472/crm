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
 * ConLanjie Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ConLanjie extends com.htsoft.core.model.BaseModel {

    protected Long conId;
	protected Short srcTypeId;
	protected Short dirId;
	protected Short contactTypeId;
	protected String preContactNum;
	protected String mainContactNum;
	protected String lastContactNum;
	protected String content;
	protected java.util.Date interceptTime;
	protected Short interceptReason;
	protected java.util.Date synTime;
	protected Short isMove;


	/**
	 * Default Empty Constructor for class ConLanjie
	 */
	public ConLanjie () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConLanjie
	 */
	public ConLanjie (
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
	 * 联系方式：地址、手机、固话、Email、QQ、MSN等	 * @return Short
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
	 * 拦截时间	 * @return java.util.Date
	 * @hibernate.property column="INTERCEPT_TIME" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getInterceptTime() {
		return this.interceptTime;
	}
	
	/**
	 * Set the interceptTime
	 * @spring.validator type="required"
	 */	
	public void setInterceptTime(java.util.Date aValue) {
		this.interceptTime = aValue;
	}	

	/**
	 * 拦截原因	 * @return Short
	 * @hibernate.property column="INTERCEPT_REASON" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getInterceptReason() {
		return this.interceptReason;
	}
	
	/**
	 * Set the interceptReason
	 * @spring.validator type="required"
	 */	
	public void setInterceptReason(Short aValue) {
		this.interceptReason = aValue;
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

	public Short getIsMove() {
		return isMove;
	}

	public void setIsMove(Short isMove) {
		this.isMove = isMove;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConLanjie)) {
			return false;
		}
		ConLanjie rhs = (ConLanjie) object;
		return new EqualsBuilder()
				.append(this.conId, rhs.conId)
				.append(this.srcTypeId, rhs.srcTypeId)
				.append(this.dirId, rhs.dirId)
				.append(this.contactTypeId, rhs.contactTypeId)
				.append(this.preContactNum, rhs.preContactNum)
				.append(this.mainContactNum, rhs.mainContactNum)
				.append(this.lastContactNum, rhs.lastContactNum)
				.append(this.content, rhs.content)
				.append(this.interceptTime, rhs.interceptTime)
				.append(this.interceptReason, rhs.interceptReason)
				.append(this.synTime, rhs.synTime)
				.append(this.isMove, rhs.isMove)
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
				.append(this.interceptTime) 
				.append(this.interceptReason) 
				.append(this.synTime) 
				.append(this.isMove)
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
				.append("interceptTime", this.interceptTime) 
				.append("interceptReason", this.interceptReason) 
				.append("synTime", this.synTime) 
				.append("isMove", this.isMove)
				.toString();
	}



}
