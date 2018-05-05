package com.ulane.supply.model.supply;
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
 * ScBizOrderRelated Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScBizOrderRelated extends com.htsoft.core.model.BaseModel {

    protected Long bizOrderRelatedId;
	protected Long masterBizOrderId;
	protected Short masterBizOrderType;
	protected Long slaveBizOrderId;
	protected Short slaveBizOrderType;
	protected com.ulane.supply.model.supply.ScBizRelationType scBizRelationType;


	/**
	 * Default Empty Constructor for class ScBizOrderRelated
	 */
	public ScBizOrderRelated () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScBizOrderRelated
	 */
	public ScBizOrderRelated (
		 Long in_bizOrderRelatedId
        ) {
		this.setBizOrderRelatedId(in_bizOrderRelatedId);
    }

	
	public com.ulane.supply.model.supply.ScBizRelationType getScBizRelationType () {
		return scBizRelationType;
	}	
	
	public void setScBizRelationType (com.ulane.supply.model.supply.ScBizRelationType in_scBizRelationType) {
		this.scBizRelationType = in_scBizRelationType;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="BIZ_ORDER_RELATED_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBizOrderRelatedId() {
		return this.bizOrderRelatedId;
	}
	
	/**
	 * Set the bizOrderRelatedId
	 */	
	public void setBizOrderRelatedId(Long aValue) {
		this.bizOrderRelatedId = aValue;
	}	

	/**
	 * 主业务单标识	 * @return Long
	 * @hibernate.property column="MASTER_BIZ_ORDER_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getMasterBizOrderId() {
		return this.masterBizOrderId;
	}
	
	/**
	 * Set the masterBizOrderId
	 * @spring.validator type="required"
	 */	
	public void setMasterBizOrderId(Long aValue) {
		this.masterBizOrderId = aValue;
	}	

	/**
	 * 主业务单类型&CON_T_BIZ_ORDER_TYPE	 * @return Short
	 * @hibernate.property column="MASTER_BIZ_ORDER_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getMasterBizOrderType() {
		return this.masterBizOrderType;
	}
	
	/**
	 * Set the masterBizOrderType
	 */	
	public void setMasterBizOrderType(Short aValue) {
		this.masterBizOrderType = aValue;
	}	

	/**
	 * 从业务单标识	 * @return Long
	 * @hibernate.property column="SLAVE_BIZ_ORDER_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getSlaveBizOrderId() {
		return this.slaveBizOrderId;
	}
	
	/**
	 * Set the slaveBizOrderId
	 * @spring.validator type="required"
	 */	
	public void setSlaveBizOrderId(Long aValue) {
		this.slaveBizOrderId = aValue;
	}	

	/**
	 * 从业务单类型&CON_T_BIZ_ORDER_TYPE	 * @return Short
	 * @hibernate.property column="SLAVE_BIZ_ORDER_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getSlaveBizOrderType() {
		return this.slaveBizOrderType;
	}
	
	/**
	 * Set the slaveBizOrderType
	 */	
	public void setSlaveBizOrderType(Short aValue) {
		this.slaveBizOrderType = aValue;
	}	

	/**
	 * 业务单关联类型进货：主----采购单，从----入库单
采购入库：主－采购单，从－入库单
代理商批发：主－批发单，从－出库单
大客户批发：主－批发单，从－出库单
调拨出库：主－调拨单，从－出库单
调拨入库：主－调拨单，从－入库单
县级合作平台批发：主－批发单，从－出库单	 * @return Long
	 */
	public Long getBizOrderRelationType() {
		return this.getScBizRelationType()==null?null:this.getScBizRelationType().getBizOrderRelationType();
	}
	
	/**
	 * Set the bizOrderRelationType
	 */	
	public void setBizOrderRelationType(Long aValue) {
	    if (aValue==null) {
	    	scBizRelationType = null;
	    } else if (scBizRelationType == null) {
	        scBizRelationType = new com.ulane.supply.model.supply.ScBizRelationType(aValue);
	        scBizRelationType.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			scBizRelationType.setBizOrderRelationType(aValue);
	    }
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScBizOrderRelated)) {
			return false;
		}
		ScBizOrderRelated rhs = (ScBizOrderRelated) object;
		return new EqualsBuilder()
				.append(this.bizOrderRelatedId, rhs.bizOrderRelatedId)
				.append(this.masterBizOrderId, rhs.masterBizOrderId)
				.append(this.masterBizOrderType, rhs.masterBizOrderType)
				.append(this.slaveBizOrderId, rhs.slaveBizOrderId)
				.append(this.slaveBizOrderType, rhs.slaveBizOrderType)
						.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bizOrderRelatedId) 
				.append(this.masterBizOrderId) 
				.append(this.masterBizOrderType) 
				.append(this.slaveBizOrderId) 
				.append(this.slaveBizOrderType) 
						.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bizOrderRelatedId", this.bizOrderRelatedId) 
				.append("masterBizOrderId", this.masterBizOrderId) 
				.append("masterBizOrderType", this.masterBizOrderType) 
				.append("slaveBizOrderId", this.slaveBizOrderId) 
				.append("slaveBizOrderType", this.slaveBizOrderType) 
						.toString();
	}



}
