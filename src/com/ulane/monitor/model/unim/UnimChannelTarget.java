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
 * UnimChannelTarget Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimChannelTarget extends com.htsoft.core.model.BaseModel {

    protected Long targetId;
	protected String targetName;
	protected String targetCode;
	protected Short srcTypeId;
	protected String remark;
	protected Long orderno;
	protected Short status;
	protected String channelIdStr;
	protected com.ulane.monitor.model.unim.UnimChannel unimChannel;

	public static final Short STA_ENABLE 	= 1;		//1——启用&ZZJGZT0001
	public static final Short STA_CANCELED	= 2;		//2——注销&ZZJGZT0001
	
	protected java.util.Set unimChaTarPars = new java.util.HashSet();
	protected java.util.Set unimChaTarThrlevls = new java.util.HashSet();

	//处理字段
	protected String thrlevladv; //阀值提醒
	protected String thrlevlwar; //阀值警告
	protected Long thrlevlId;	//业务阀值id
	public Long getThrlevlId() {
		return thrlevlId;
	}

	public void setThrlevlId(Long thrlevlId) {
		this.thrlevlId = thrlevlId;
	}

	public String getThrlevladv() {
		return thrlevladv;
	}

	public void setThrlevladv(String thrlevladv) {
		this.thrlevladv = thrlevladv;
	}

	public String getThrlevlwar() {
		return thrlevlwar;
	}

	public void setThrlevlwar(String thrlevlwar) {
		this.thrlevlwar = thrlevlwar;
	}

	/**
	 * Default Empty Constructor for class UnimChannelTarget
	 */
	public UnimChannelTarget () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimChannelTarget
	 */
	public UnimChannelTarget (
		 Long in_targetId
        ) {
		this.setTargetId(in_targetId);
    }

	
	public com.ulane.monitor.model.unim.UnimChannel getUnimChannel () {
		return unimChannel;
	}	
	
	public void setUnimChannel (com.ulane.monitor.model.unim.UnimChannel in_unimChannel) {
		this.unimChannel = in_unimChannel;
	}

	public java.util.Set getUnimChaTarPars () {
		return unimChaTarPars;
	}	
	
	public void setUnimChaTarPars (java.util.Set in_unimChaTarPars) {
		this.unimChaTarPars = in_unimChaTarPars;
	}

	public java.util.Set getUnimChaTarThrlevls () {
		return unimChaTarThrlevls;
	}	
	
	public void setUnimChaTarThrlevls (java.util.Set in_unimChaTarThrlevls) {
		this.unimChaTarThrlevls = in_unimChaTarThrlevls;
	}
    

	/**
	 * 指标ID	 * @return Long
     * @hibernate.id column="TARGET_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTargetId() {
		return this.targetId;
	}
	
	/**
	 * Set the targetId
	 */	
	public void setTargetId(Long aValue) {
		this.targetId = aValue;
	}	

	/**
	 * 渠道ID	 * @return Long
	 */
	public Long getChannelId() {
		return this.getUnimChannel()==null?null:this.getUnimChannel().getChannelId();
	}
	
	/**
	 * Set the channelId
	 */	
	public void setChannelId(Long aValue) {
	    if (aValue==null) {
	    	unimChannel = null;
	    } else if (unimChannel == null) {
	        unimChannel = new com.ulane.monitor.model.unim.UnimChannel(aValue);
	        unimChannel.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimChannel.setChannelId(aValue);
	    }
	}	

	/**
	 * 指标名称	 * @return String
	 * @hibernate.property column="TARGET_NAME" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getTargetName() {
		return this.targetName;
	}
	
	/**
	 * Set the targetName
	 * @spring.validator type="required"
	 */	
	public void setTargetName(String aValue) {
		this.targetName = aValue;
	}	

	/**
	 * 指标编号	 * @return String
	 * @hibernate.property column="TARGET_CODE" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getTargetCode() {
		return this.targetCode;
	}
	
	/**
	 * Set the targetCode
	 * @spring.validator type="required"
	 */	
	public void setTargetCode(String aValue) {
		this.targetCode = aValue;
	}	

	/**
	 * 数据来源：自动推送、参数配置	 * @return Short
	 * @hibernate.property column="SRC_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getSrcTypeId() {
		return this.srcTypeId;
	}
	
	/**
	 * Set the srcTypeId
	 * @spring.validator type="required"
	 */	
	public void setSrcTypeId(Short aValue) {
		this.srcTypeId = aValue;
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
	 * 状态：启用、注销	 * @return Short
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

	public String getChannelIdStr() {
		return channelIdStr;
	}

	public void setChannelIdStr(String channelIdStr) {
		this.channelIdStr = channelIdStr;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimChannelTarget)) {
			return false;
		}
		UnimChannelTarget rhs = (UnimChannelTarget) object;
		return new EqualsBuilder()
				.append(this.targetId, rhs.targetId)
						.append(this.targetName, rhs.targetName)
				.append(this.targetCode, rhs.targetCode)
				.append(this.srcTypeId, rhs.srcTypeId)
				.append(this.remark, rhs.remark)
				.append(this.orderno, rhs.orderno)
				.append(this.status, rhs.status)
				.append(this.channelIdStr, rhs.channelIdStr)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.targetId) 
						.append(this.targetName) 
				.append(this.targetCode) 
				.append(this.srcTypeId) 
				.append(this.remark) 
				.append(this.orderno) 
				.append(this.status) 
				.append(this.channelIdStr)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("targetId", this.targetId) 
						.append("targetName", this.targetName) 
				.append("targetCode", this.targetCode) 
				.append("srcTypeId", this.srcTypeId) 
				.append("remark", this.remark) 
				.append("orderno", this.orderno) 
				.append("status", this.status)
				.append("channelIdStr",this.channelIdStr)
				.toString();
	}



}
