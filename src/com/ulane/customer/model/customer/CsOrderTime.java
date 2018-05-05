package com.ulane.customer.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.flow.ProUserAssign;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Dictionary;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
import com.htsoft.oa.model.system.GlobalType;

/**
 * CsOrderTime Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CsOrderTime extends com.htsoft.core.model.BaseModel {

    protected Long orderTimeId;
	protected Short orderSorce;
	protected Short order;
	protected Short orderProject;
	protected Short orderLevel;
	protected Short cusLevel;
	protected java.math.BigDecimal responseTime;
	protected java.math.BigDecimal completionTime;
	protected AppUser createUser; 			// createUserId;
	protected java.util.Date createTime;
	protected AppUser updateUser;       // updateUserId;
	protected java.util.Date updateTime;
	protected ProUserAssign proUserAssign;
	
	/**
	 * 新增字段
	 * 数据字典ID
	 */
	protected Dictionary idDictionary;
	/**
	 * 数据字典KEY
	 */
	protected GlobalType globalType;
	/**
	 * 要求响应时间类型
	 */
	protected Long responseTimeType;
	/**
	 *要求完成时间类型 
	 */
	protected Long completionTimeType;
	
	/**
	 * Default Empty Constructor for class CsOrderTime
	 */
	public CsOrderTime () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CsOrderTime
	 */
	public CsOrderTime (
		 Long in_orderTimeId
        ) {
		this.setOrderTimeId(in_orderTimeId);
    }

	
	public AppUser getCreateUser() {
		return createUser;
	}

	public void setCreateUser(AppUser createUser) {
		this.createUser = createUser;
	}

	public AppUser getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(AppUser updateUser) {
		this.updateUser = updateUser;
	}

	public ProUserAssign getProUserAssign () {
		return proUserAssign;
	}	
	
	public void setProUserAssign (ProUserAssign in_proUserAssign) {
		this.proUserAssign = in_proUserAssign;
	}
    
	

	public Long getResponseTimeType() {
		return responseTimeType;
	}

	public void setResponseTimeType(Long responseTimeType) {
		this.responseTimeType = responseTimeType;
	}

	public Long getCompletionTimeType() {
		return completionTimeType;
	}

	public void setCompletionTimeType(Long completionTimeType) {
		this.completionTimeType = completionTimeType;
	}

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="ORDER_TIME_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getOrderTimeId() {
		return this.orderTimeId;
	}
	
	/**
	 * Set the orderTimeId
	 */	
	public void setOrderTimeId(Long aValue) {
		this.orderTimeId = aValue;
	}	

	/**
	 * 授权ID	 * @return Long
	 */
	public Long getAssignid() {
		return this.getProUserAssign()==null?null:this.getProUserAssign().getAssignId();
	}
	
	/**
	 * Set the assignid
	 */	
	public void setAssignid(Long aValue) {
	    if (aValue==null) {
	    	proUserAssign = null;
	    } else if (proUserAssign == null) {
	        proUserAssign = new ProUserAssign(aValue);
	        proUserAssign.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			proUserAssign.setAssignId(aValue);
	    }
	}	

	/**
	 * 工单来源	 * @return Short
	 * @hibernate.property column="ORDER_SORCE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getOrderSorce() {
		return this.orderSorce;
	}
	
	/**
	 * Set the orderSorce
	 */	
	public void setOrderSorce(Short aValue) {
		this.orderSorce = aValue;
	}	

	/**
	 * 工单类型	 * @return Short
	 * @hibernate.property column="ORDER_" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getOrder() {
		return this.order;
	}
	
	/**
	 * Set the order
	 */	
	public void setOrder(Short aValue) {
		this.order = aValue;
	}	

	/**
	 * 工单项目	 * @return Short
	 * @hibernate.property column="ORDER_PROJECT" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getOrderProject() {
		return this.orderProject;
	}
	
	/**
	 * Set the orderProject
	 */	
	public void setOrderProject(Short aValue) {
		this.orderProject = aValue;
	}	

	/**
	 * 投诉等级	 * @return Short
	 * @hibernate.property column="ORDER_LEVEL" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getOrderLevel() {
		return this.orderLevel;
	}
	
	/**
	 * Set the orderLevel
	 */	
	public void setOrderLevel(Short aValue) {
		this.orderLevel = aValue;
	}	

	/**
	 * 客户等级	 * @return Short
	 * @hibernate.property column="CUS_LEVEL" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusLevel() {
		return this.cusLevel;
	}
	
	/**
	 * Set the cusLevel
	 */	
	public void setCusLevel(Short aValue) {
		this.cusLevel = aValue;
	}	

	/**
	 * 要求响应时间	 * @return java.math.BigDecimal
	 * @hibernate.property column="RESPONSE_TIME" type="java.math.BigDecimal" length="5" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getResponseTime() {
		return this.responseTime;
	}
	
	/**
	 * Set the responseTime
	 */	
	public void setResponseTime(java.math.BigDecimal aValue) {
		this.responseTime = aValue;
	}	

	/**
	 * 要求完成时间	 * @return java.math.BigDecimal
	 * @hibernate.property column="COMPLETION_TIME" type="java.math.BigDecimal" length="5" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getCompletionTime() {
		return this.completionTime;
	}
	
	/**
	 * Set the completionTime
	 */	
	public void setCompletionTime(java.math.BigDecimal aValue) {
		this.completionTime = aValue;
	}	



	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreateTime() {
		return this.createTime;
	}
	
	/**
	 * Set the createTime
	 */	
	public void setCreateTime(java.util.Date aValue) {
		this.createTime = aValue;
	}	


	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}
	
	/**
	 * Set the updateTime
	 */	
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}	
	
	

	public Dictionary getIdDictionary() {
		return idDictionary;
	}

	public GlobalType getGlobalType() {
		return globalType;
	}

	public void setGlobalType(GlobalType globalType) {
		this.globalType = globalType;
	}

	public void setIdDictionary(Dictionary idDictionary) {
		this.idDictionary = idDictionary;
	}

	public Long getDicId() {
		return this.idDictionary == null ? null : this.idDictionary.getDicId();
	}

	
	public void setDicId(Long aValue) {
		if (aValue == null) {
			this.idDictionary = null;
		} else if (this.idDictionary == null) {
			this.idDictionary = new Dictionary(aValue);
			this.idDictionary.setVersion(new Integer(0));// set a version to cheat
			// hibernate only
		} else {
			//
			this.idDictionary.setDicId(aValue);
		}
	}
	
	public Long getProTypeId() {
		return this.globalType == null ? null : this.globalType.getProTypeId();
	}

	
	public void setProTypeId(Long aValue) {
		if (aValue == null) {
			this.globalType = null;
		} else if (this.globalType == null) {
			this.globalType = new GlobalType(aValue);
			this.globalType.setVersion(new Integer(0));// set a version to cheat
			// hibernate only
		} else {
			//
			this.globalType.setProTypeId(aValue);
		}
	}
	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CsOrderTime)) {
			return false;
		}
		CsOrderTime rhs = (CsOrderTime) object;
		return new EqualsBuilder()
				.append(this.orderTimeId, rhs.orderTimeId)
						.append(this.orderSorce, rhs.orderSorce)
				.append(this.order, rhs.order)
				.append(this.orderProject, rhs.orderProject)
				.append(this.orderLevel, rhs.orderLevel)
				.append(this.cusLevel, rhs.cusLevel)
				.append(this.responseTime, rhs.responseTime)
				.append(this.completionTime, rhs.completionTime)
				.append(this.createTime, rhs.createTime)
				.append(this.updateTime, rhs.updateTime)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.orderTimeId) 
						.append(this.orderSorce) 
				.append(this.order) 
				.append(this.orderProject) 
				.append(this.orderLevel) 
				.append(this.cusLevel) 
				.append(this.responseTime) 
				.append(this.completionTime) 
				.append(this.createTime) 
				.append(this.updateTime) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("orderTimeId", this.orderTimeId) 
						.append("orderSorce", this.orderSorce) 
				.append("order", this.order) 
				.append("orderProject", this.orderProject) 
				.append("orderLevel", this.orderLevel) 
				.append("cusLevel", this.cusLevel) 
				.append("responseTime", this.responseTime) 
				.append("completionTime", this.completionTime) 
				.append("createTime", this.createTime) 
				.append("updateTime", this.updateTime) 
				.toString();
	}



}
