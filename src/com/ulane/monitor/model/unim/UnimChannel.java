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
 * UnimChannel Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimChannel extends com.htsoft.core.model.BaseModel {

    protected Long channelId;
	protected String channelName;
	protected String channelCode;
	protected String remark;
	protected Long orderno;
	protected Short status;
	
	public static final Short STA_ENABLE 	= 1;		//1——启用&ZZJGZT0001
	public static final Short STA_CANCELED	= 2;		//2——注销&ZZJGZT0001
	
	protected java.util.Set<UnimChannelTarget> unimChannelTargets = new java.util.HashSet<UnimChannelTarget>();
	protected java.util.Set<UnimChaTarPar> unimChaTarPars = new java.util.HashSet<UnimChaTarPar>();
//	protected java.util.Set unimChaTarThrlevls = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class UnimChannel
	 */
	public UnimChannel () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimChannel
	 */
	public UnimChannel (
		 Long in_channelId
        ) {
		this.setChannelId(in_channelId);
    }


	public java.util.Set<UnimChannelTarget> getUnimChannelTargets () {
		return unimChannelTargets;
	}	
	
	public void setUnimChannelTargets (java.util.Set<UnimChannelTarget> in_unimChannelTargets) {
		this.unimChannelTargets = in_unimChannelTargets;
	}

	public java.util.Set<UnimChaTarPar> getUnimChaTarPars () {
		return unimChaTarPars;
	}	
	
	public void setUnimChaTarPars (java.util.Set<UnimChaTarPar> in_unimChaTarPars) {
		this.unimChaTarPars = in_unimChaTarPars;
	}

//	public java.util.Set getUnimChaTarThrlevls () {
//		return unimChaTarThrlevls;
//	}	
//	
//	public void setUnimChaTarThrlevls (java.util.Set in_unimChaTarThrlevls) {
//		this.unimChaTarThrlevls = in_unimChaTarThrlevls;
//	}
    

	/**
	 * 渠道ID	 * @return Long
     * @hibernate.id column="CHANNEL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getChannelId() {
		return this.channelId;
	}
	
	/**
	 * Set the channelId
	 */	
	public void setChannelId(Long aValue) {
		this.channelId = aValue;
	}	

	/**
	 * 渠道名称	 * @return String
	 * @hibernate.property column="CHANNEL_NAME" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getChannelName() {
		return this.channelName;
	}
	
	/**
	 * Set the channelName
	 * @spring.validator type="required"
	 */	
	public void setChannelName(String aValue) {
		this.channelName = aValue;
	}	

	/**
	 * 渠道编号	 * @return String
	 * @hibernate.property column="CHANNEL_CODE" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getChannelCode() {
		return this.channelCode;
	}
	
	/**
	 * Set the channelCode
	 * @spring.validator type="required"
	 */	
	public void setChannelCode(String aValue) {
		this.channelCode = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="4000" not-null="false" unique="false"
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

	/**
	 * 顺序号	 * @return Long
	 * @hibernate.property column="ORDERNO" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getOrderno() {
		return this.orderno;
	}
	
	/**
	 * Set the orderno
	 * @spring.validator type="required"
	 */	
	public void setOrderno(Long aValue) {
		this.orderno = aValue;
	}	

	/**
	 * 状态：是否启用	 * @return Short
	 * @hibernate.property column="STATUS" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 * @spring.validator type="required"
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimChannel)) {
			return false;
		}
		UnimChannel rhs = (UnimChannel) object;
		return new EqualsBuilder()
				.append(this.channelId, rhs.channelId)
				.append(this.channelName, rhs.channelName)
				.append(this.channelCode, rhs.channelCode)
				.append(this.remark, rhs.remark)
				.append(this.orderno, rhs.orderno)
				.append(this.status, rhs.status)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.channelId) 
				.append(this.channelName) 
				.append(this.channelCode) 
				.append(this.remark) 
				.append(this.orderno) 
				.append(this.status) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("channelId", this.channelId) 
				.append("channelName", this.channelName) 
				.append("channelCode", this.channelCode) 
				.append("remark", this.remark) 
				.append("orderno", this.orderno) 
				.append("status", this.status) 
				.toString();
	}



}
