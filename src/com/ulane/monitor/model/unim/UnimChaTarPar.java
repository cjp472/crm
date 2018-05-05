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
 * UnimChaTarPar Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimChaTarPar extends com.htsoft.core.model.BaseModel {

    protected Long paraId;
	protected String paraName;
	protected String paraValue;
	protected String remark;
	protected Long orderno;
	protected Short status;
	protected String chTargetId;
	
	protected String targetName;
	
	protected com.ulane.monitor.model.unim.UnimChannel unimChannel;
	protected com.ulane.monitor.model.unim.UnimChannelTarget unimChannelTarget;

	public static final Short STA_UNENABLE	= 0;		//0——未启用&ZZJGZT0001
	public static final Short STA_ENABLE 	= 1;		//1——启用&ZZJGZT0001
	public static final Short STA_CANCELED	= 2;		//2——注销&ZZJGZT0001
	
	/**
	 * Default Empty Constructor for class UnimChaTarPar
	 */
	public UnimChaTarPar () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimChaTarPar
	 */
	public UnimChaTarPar (
		 Long in_paraId
        ) {
		this.setParaId(in_paraId);
    }

	
	public com.ulane.monitor.model.unim.UnimChannel getUnimChannel () {
		return unimChannel;
	}	
	
	public void setUnimChannel (com.ulane.monitor.model.unim.UnimChannel in_unimChannel) {
		this.unimChannel = in_unimChannel;
	}
	
	public com.ulane.monitor.model.unim.UnimChannelTarget getUnimChannelTarget () {
		return unimChannelTarget;
	}	
	
	public void setUnimChannelTarget (com.ulane.monitor.model.unim.UnimChannelTarget in_unimChannelTarget) {
		this.unimChannelTarget = in_unimChannelTarget;
	}
    

	/**
	 * 参数ID	 * @return Long
     * @hibernate.id column="PARA_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getParaId() {
		return this.paraId;
	}
	
	/**
	 * Set the paraId
	 */	
	public void setParaId(Long aValue) {
		this.paraId = aValue;
	}	

	/**
	 * 指标ID	 * @return Long
	 */
	public Long getTargetId() {
		return this.getUnimChannelTarget()==null?null:this.getUnimChannelTarget().getTargetId();
	}
	
	/**
	 * Set the targetId
	 */	
	public void setTargetId(Long aValue) {
	    if (aValue==null) {
	    	unimChannelTarget = null;
	    } else if (unimChannelTarget == null) {
	        unimChannelTarget = new com.ulane.monitor.model.unim.UnimChannelTarget(aValue);
	        unimChannelTarget.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimChannelTarget.setTargetId(aValue);
	    }
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
	 * 参数名称	 * @return String
	 * @hibernate.property column="PARA_NAME" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getParaName() {
		return this.paraName;
	}
	
	/**
	 * Set the paraName
	 * @spring.validator type="required"
	 */	
	public void setParaName(String aValue) {
		this.paraName = aValue;
	}	

	/**
	 * 参数值	 * @return String
	 * @hibernate.property column="PARA_VALUE" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getParaValue() {
		return this.paraValue;
	}
	
	/**
	 * Set the paraValue
	 * @spring.validator type="required"
	 */	
	public void setParaValue(String aValue) {
		this.paraValue = aValue;
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

	public String getChTargetId() {
		return chTargetId;
	}

	public void setChTargetId(String chTargetId) {
		this.chTargetId = chTargetId;
	}

	public String getTargetName() {
		return targetName;
	}

	public void setTargetName(String targetName) {
		this.targetName = targetName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimChaTarPar)) {
			return false;
		}
		UnimChaTarPar rhs = (UnimChaTarPar) object;
		return new EqualsBuilder()
				.append(this.paraId, rhs.paraId)
								.append(this.paraName, rhs.paraName)
				.append(this.paraValue, rhs.paraValue)
				.append(this.remark, rhs.remark)
				.append(this.orderno, rhs.orderno)
				.append(this.status, rhs.status)
				.append(this.chTargetId, rhs.chTargetId)
				.append(this.targetName, rhs.targetName)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.paraId) 
								.append(this.paraName) 
				.append(this.paraValue) 
				.append(this.remark) 
				.append(this.orderno) 
				.append(this.status)
				.append(this.chTargetId)
				.append(this.targetName)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("paraId", this.paraId) 
								.append("paraName", this.paraName) 
				.append("paraValue", this.paraValue) 
				.append("remark", this.remark) 
				.append("orderno", this.orderno) 
				.append("status", this.status)
				.append("chTargetId",this.chTargetId)
				.append("targetName",this.targetName)
				.toString();
	}



}
