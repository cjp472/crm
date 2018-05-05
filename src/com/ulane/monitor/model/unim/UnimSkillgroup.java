package com.ulane.monitor.model.unim;
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
 * UnimSkillgroup Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimSkillgroup extends com.htsoft.core.model.BaseModel {

    protected Long skgId;
	protected String skgCode;
	protected String skgName;
	protected String remark;
	protected Short status;
	
	
	public static final Short STA_ENABLE = 1;		//1——有效&QC_MBZT
	public static final Short STA_DISABLE = 2;		//2——无效&QC_MBZT
	
	protected java.util.Set unimAgentSkillgroups = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class UnimSkillgroup
	 */
	public UnimSkillgroup () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimSkillgroup
	 */
	public UnimSkillgroup (
		 Long in_skgId
        ) {
		this.setSkgId(in_skgId);
    }


	public java.util.Set getUnimAgentSkillgroups () {
		return unimAgentSkillgroups;
	}	
	
	public void setUnimAgentSkillgroups (java.util.Set in_unimAgentSkillgroups) {
		this.unimAgentSkillgroups = in_unimAgentSkillgroups;
	}
    

	/**
	 * ID	 * @return Long
     * @hibernate.id column="SKG_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getSkgId() {
		return this.skgId;
	}
	
	/**
	 * Set the skgId
	 */	
	public void setSkgId(Long aValue) {
		this.skgId = aValue;
	}	

	/**
	 * 编码	 * @return String
	 * @hibernate.property column="SKG_CODE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getSkgCode() {
		return this.skgCode;
	}
	
	/**
	 * Set the skgCode
	 */	
	public void setSkgCode(String aValue) {
		this.skgCode = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="SKG_NAME" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getSkgName() {
		return this.skgName;
	}
	
	/**
	 * Set the skgName
	 */	
	public void setSkgName(String aValue) {
		this.skgName = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	public Short getStatus() {
		return status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimSkillgroup)) {
			return false;
		}
		UnimSkillgroup rhs = (UnimSkillgroup) object;
		return new EqualsBuilder()
				.append(this.skgId, rhs.skgId)
				.append(this.skgCode, rhs.skgCode)
				.append(this.skgName, rhs.skgName)
				.append(this.remark, rhs.remark)
				.append(this.status, rhs.status)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.skgId) 
				.append(this.skgCode) 
				.append(this.skgName) 
				.append(this.remark)
				.append(this.status)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("skgId", this.skgId) 
				.append("skgCode", this.skgCode) 
				.append("skgName", this.skgName) 
				.append("remark", this.remark)
				.append("status",this.status)
				.toString();
	}



}
