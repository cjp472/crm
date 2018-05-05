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
 * UnimAssetsTarget Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAssetsTarget extends com.htsoft.core.model.BaseModel {

    protected Long targetId;
	protected String targetName;
	protected String targetCode;
	protected Short srcTypeId;
	protected String remark;
	protected Long orderno;
	protected Short status;
	protected com.ulane.monitor.model.unim.UnimAssets unimAssets;

	public static final Short STA_ENABLE 	= 1;		//1——启用&ZZJGZT0001
	public static final Short STA_CANCELED	= 2;		//2——注销&ZZJGZT0001
	
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

	public Long getThrlevlId() {
		return thrlevlId;
	}

	public void setThrlevlId(Long thrlevlId) {
		this.thrlevlId = thrlevlId;
	}

	protected java.util.Set unimAssTarPars = new java.util.HashSet();
	protected java.util.Set unimAssTarThrlevls = new java.util.HashSet();

	//处理字段
	protected String thrlevladv; //阀值提醒
	protected String thrlevlwar; //阀值警告
	protected Long thrlevlId;	//业务阀值id


	/**
	 * Default Empty Constructor for class UnimAssetsTarget
	 */
	public UnimAssetsTarget () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAssetsTarget
	 */
	public UnimAssetsTarget (
		 Long in_targetId
        ) {
		this.setTargetId(in_targetId);
    }

	
	public com.ulane.monitor.model.unim.UnimAssets getUnimAssets () {
		return unimAssets;
	}	
	
	public void setUnimAssets (com.ulane.monitor.model.unim.UnimAssets in_unimAssets) {
		this.unimAssets = in_unimAssets;
	}

	public java.util.Set getUnimAssTarPars () {
		return unimAssTarPars;
	}	
	
	public void setUnimAssTarPars (java.util.Set in_unimAssTarPars) {
		this.unimAssTarPars = in_unimAssTarPars;
	}

	public java.util.Set getUnimAssTarThrlevls () {
		return unimAssTarThrlevls;
	}	
	
	public void setUnimAssTarThrlevls (java.util.Set in_unimAssTarThrlevls) {
		this.unimAssTarThrlevls = in_unimAssTarThrlevls;
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
	 * 资产ID	 * @return Long
	 */
	public Long getAssetsId() {
		return this.getUnimAssets()==null?null:this.getUnimAssets().getAssetsId();
	}
	
	/**
	 * Set the assetsId
	 */	
	public void setAssetsId(Long aValue) {
	    if (aValue==null) {
	    	unimAssets = null;
	    } else if (unimAssets == null) {
	        unimAssets = new com.ulane.monitor.model.unim.UnimAssets(aValue);
	        unimAssets.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimAssets.setAssetsId(aValue);
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

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UnimAssetsTarget other = (UnimAssetsTarget) obj;
		if (orderno == null) {
			if (other.orderno != null)
				return false;
		} else if (!orderno.equals(other.orderno))
			return false;
		if (remark == null) {
			if (other.remark != null)
				return false;
		} else if (!remark.equals(other.remark))
			return false;
		if (srcTypeId == null) {
			if (other.srcTypeId != null)
				return false;
		} else if (!srcTypeId.equals(other.srcTypeId))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (targetCode == null) {
			if (other.targetCode != null)
				return false;
		} else if (!targetCode.equals(other.targetCode))
			return false;
		if (targetId == null) {
			if (other.targetId != null)
				return false;
		} else if (!targetId.equals(other.targetId))
			return false;
		if (targetName == null) {
			if (other.targetName != null)
				return false;
		} else if (!targetName.equals(other.targetName))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((orderno == null) ? 0 : orderno.hashCode());
		result = prime * result + ((remark == null) ? 0 : remark.hashCode());
		result = prime * result
				+ ((srcTypeId == null) ? 0 : srcTypeId.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result
				+ ((targetCode == null) ? 0 : targetCode.hashCode());
		result = prime * result
				+ ((targetId == null) ? 0 : targetId.hashCode());
		result = prime * result
				+ ((targetName == null) ? 0 : targetName.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UnimAssetsTarget [orderno=" + orderno + ", remark=" + remark
				+ ", srcTypeId=" + srcTypeId + ", status=" + status
				+ ", targetCode=" + targetCode + ", targetId=" + targetId
				+ ", targetName=" + targetName + "]";
	}



}
