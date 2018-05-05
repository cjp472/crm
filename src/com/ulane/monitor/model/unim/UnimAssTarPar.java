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
 * UnimAssTarPar Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAssTarPar extends com.htsoft.core.model.BaseModel {

    protected Long paraId;
	protected String paraName;
	protected String paraValue;
	protected String remark;
	protected Long orderno;
	protected Short status;
	protected com.ulane.monitor.model.unim.UnimAssets unimAssets;
	protected com.ulane.monitor.model.unim.UnimAssetsTarget unimAssetsTarget;

	protected String dataSend1;							
	
	public static final Short STA_UNENABLE	= 0;		//0——未启用&ZZJGZT0001
	public static final Short STA_ENABLE 	= 1;		//1——启用&ZZJGZT0001
	public static final Short STA_CANCELED	= 2;		//2——注销&ZZJGZT0001
	
	/**
	 * Default Empty Constructor for class UnimAssTarPar
	 */
	public UnimAssTarPar () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAssTarPar
	 */
	public UnimAssTarPar (
		 Long in_paraId
        ) {
		this.setParaId(in_paraId);
    }

	
	public com.ulane.monitor.model.unim.UnimAssets getUnimAssets () {
		return unimAssets;
	}	
	
	public void setUnimAssets (com.ulane.monitor.model.unim.UnimAssets in_unimAssets) {
		this.unimAssets = in_unimAssets;
	}
	
	public com.ulane.monitor.model.unim.UnimAssetsTarget getUnimAssetsTarget () {
		return unimAssetsTarget;
	}	
	
	public void setUnimAssetsTarget (com.ulane.monitor.model.unim.UnimAssetsTarget in_unimAssetsTarget) {
		this.unimAssetsTarget = in_unimAssetsTarget;
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
	 * 指标ID	 * @return Long
	 */
	public Long getTargetId() {
		return this.getUnimAssetsTarget()==null?null:this.getUnimAssetsTarget().getTargetId();
	}
	
	/**
	 * Set the targetId
	 */	
	public void setTargetId(Long aValue) {
	    if (aValue==null) {
	    	unimAssetsTarget = null;
	    } else if (unimAssetsTarget == null) {
	        unimAssetsTarget = new com.ulane.monitor.model.unim.UnimAssetsTarget(aValue);
	        unimAssetsTarget.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimAssetsTarget.setTargetId(aValue);
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

	public String getDataSend1() {
		return dataSend1;
	}

	public void setDataSend1(String dataSend1) {
		this.dataSend1 = dataSend1;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimAssTarPar)) {
			return false;
		}
		UnimAssTarPar rhs = (UnimAssTarPar) object;
		return new EqualsBuilder()
				.append(this.paraId, rhs.paraId)
								.append(this.paraName, rhs.paraName)
				.append(this.paraValue, rhs.paraValue)
				.append(this.remark, rhs.remark)
				.append(this.orderno, rhs.orderno)
				.append(this.status, rhs.status)
				.append(this.dataSend1, rhs.dataSend1)
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
				.append(this.dataSend1)
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
				.append("dataSend1",this.dataSend1)
				.toString();
	}



}
