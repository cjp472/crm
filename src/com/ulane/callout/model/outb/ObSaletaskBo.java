package com.ulane.callout.model.outb;
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
 * ObSaletaskBo Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObSaletaskBo extends com.htsoft.core.model.BaseModel {

    protected Long saletaskBoId;			//预约内码
	protected java.util.Date booTim;		//预约时间
	protected Long conCusId;				//被联络人内码
	protected Short tasMetId;				//联系方式
	protected String conNumber;				//地址/号码
	protected String remark;				//备注
	protected Short booStaId;				//状态
	protected com.ulane.callout.model.outb.ObSaletask obSaletask;

	public static final Short BOO_STA_UNDO		= 0;	//待执行
	public static final Short BOO_STA_FINISH	= 1;	//已执行
	public static final Short BOO_STA_CANCELED	= 2;	//已取消
	/**
	 * Default Empty Constructor for class ObSaletaskBo
	 */
	public ObSaletaskBo () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObSaletaskBo
	 */
	public ObSaletaskBo (
		 Long in_saletaskBoId
        ) {
		this.setSaletaskBoId(in_saletaskBoId);
    }

	
	public com.ulane.callout.model.outb.ObSaletask getObSaletask () {
		return obSaletask;
	}	
	
	public void setObSaletask (com.ulane.callout.model.outb.ObSaletask in_obSaletask) {
		this.obSaletask = in_obSaletask;
	}
    

	/**
	 * 预约内码	 * @return Long
     * @hibernate.id column="SALETASK_BO_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getSaletaskBoId() {
		return this.saletaskBoId;
	}
	
	/**
	 * Set the saletaskBoId
	 */	
	public void setSaletaskBoId(Long aValue) {
		this.saletaskBoId = aValue;
	}	

	/**
	 * 营销任务内码	 * @return Long
	 */
	public Long getSaletaskId() {
		return this.getObSaletask()==null?null:this.getObSaletask().getSaletaskId();
	}
	
	/**
	 * Set the saletaskId
	 */	
	public void setSaletaskId(Long aValue) {
	    if (aValue==null) {
	    	obSaletask = null;
	    } else if (obSaletask == null) {
	        obSaletask = new com.ulane.callout.model.outb.ObSaletask(aValue);
	        obSaletask.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obSaletask.setSaletaskId(aValue);
	    }
	}	

	/**
	 * 预约时间	 * @return java.util.Date
	 * @hibernate.property column="BOO_TIM" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getBooTim() {
		return this.booTim;
	}
	
	/**
	 * Set the booTim
	 * @spring.validator type="required"
	 */	
	public void setBooTim(java.util.Date aValue) {
		this.booTim = aValue;
	}	

	/**
	 * 被联络人内码	 * @return Long
	 * @hibernate.property column="CON_CUS_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getConCusId() {
		return this.conCusId;
	}
	
	/**
	 * Set the conCusId
	 */	
	public void setConCusId(Long aValue) {
		this.conCusId = aValue;
	}	

	/**
	 * 联系方式：0-电话、1-传真、2-短信、3-电邮、4-邮寄&CONOB_SALETASK_BO_LXFS	 * @return Short
	 * @hibernate.property column="TAS_MET_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getTasMetId() {
		return this.tasMetId;
	}
	
	/**
	 * Set the tasMetId
	 */	
	public void setTasMetId(Short aValue) {
		this.tasMetId = aValue;
	}	

	/**
	 * 地址/号码	 * @return String
	 * @hibernate.property column="CON_NUMBER" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getConNumber() {
		return this.conNumber;
	}
	
	/**
	 * Set the conNumber
	 */	
	public void setConNumber(String aValue) {
		this.conNumber = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="1024" not-null="false" unique="false"
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
	 * 状态：0-待执行、1-已执行、2-已取消&CONOB_SALETASK_BO_ZT	 * @return Short
	 * @hibernate.property column="BOO_STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getBooStaId() {
		return this.booStaId;
	}
	
	/**
	 * Set the booStaId
	 * @spring.validator type="required"
	 */	
	public void setBooStaId(Short aValue) {
		this.booStaId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObSaletaskBo)) {
			return false;
		}
		ObSaletaskBo rhs = (ObSaletaskBo) object;
		return new EqualsBuilder()
				.append(this.saletaskBoId, rhs.saletaskBoId)
						.append(this.booTim, rhs.booTim)
				.append(this.conCusId, rhs.conCusId)
				.append(this.tasMetId, rhs.tasMetId)
				.append(this.conNumber, rhs.conNumber)
				.append(this.remark, rhs.remark)
				.append(this.booStaId, rhs.booStaId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.saletaskBoId) 
						.append(this.booTim) 
				.append(this.conCusId) 
				.append(this.tasMetId) 
				.append(this.conNumber) 
				.append(this.remark) 
				.append(this.booStaId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("saletaskBoId", this.saletaskBoId) 
						.append("booTim", this.booTim) 
				.append("conCusId", this.conCusId) 
				.append("tasMetId", this.tasMetId) 
				.append("conNumber", this.conNumber) 
				.append("remark", this.remark) 
				.append("booStaId", this.booStaId) 
				.toString();
	}



}
