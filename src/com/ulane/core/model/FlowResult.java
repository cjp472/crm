package com.ulane.core.model;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * FlowResult Base Java Bean, base class for the.erp.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class FlowResult extends com.htsoft.core.model.BaseModel {

    protected Long flowResultId;
	protected String flowType;
	protected Long flowPk;
	protected String flowNode;
	protected String flowStatus;
	protected Long runId;

	/**
	 * Default Empty Constructor for class FlowResult
	 */
	public FlowResult () {
		super();
	}
	
	public Long getRunId() {
		return runId;
	}

	public void setRunId(Long runId) {
		this.runId = runId;
	}

	/**
	 * Default Key Fields Constructor for class FlowResult
	 */
	public FlowResult (
		 Long in_flowResultId
        ) {
		this.setFlowResultId(in_flowResultId);
    }
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="FLOW_RESULT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFlowResultId() {
		return this.flowResultId;
	}
	
	/**
	 * Set the flowResultId
	 */	
	public void setFlowResultId(Long aValue) {
		this.flowResultId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="FLOW_TYPE" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getFlowType() {
		return this.flowType;
	}
	
	/**
	 * Set the flowType
	 */	
	public void setFlowType(String aValue) {
		this.flowType = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="FLOW_PK" type="java.lang.Long" length="38" not-null="true" unique="false"
	 */
	public Long getFlowPk() {
		return this.flowPk;
	}
	
	/**
	 * Set the flowPk
	 * @spring.validator type="required"
	 */	
	public void setFlowPk(Long aValue) {
		this.flowPk = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="FLOW_NODE" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getFlowNode() {
		return this.flowNode;
	}
	
	/**
	 * Set the flowNode
	 */	
	public void setFlowNode(String aValue) {
		this.flowNode = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="FLOW_STATUS" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getFlowStatus() {
		return this.flowStatus;
	}
	
	/**
	 * Set the flowStatus
	 */	
	public void setFlowStatus(String aValue) {
		this.flowStatus = aValue;
	}	
	
	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof FlowResult)) {
			return false;
		}
		FlowResult rhs = (FlowResult) object;
		return new EqualsBuilder()
				.append(this.flowResultId, rhs.flowResultId)
				.append(this.flowType, rhs.flowType)
				.append(this.flowPk, rhs.flowPk)
				.append(this.flowNode, rhs.flowNode)
				.append(this.flowStatus, rhs.flowStatus)
						.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.flowResultId) 
				.append(this.flowType) 
				.append(this.flowPk) 
				.append(this.flowNode) 
				.append(this.flowStatus) 
						.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("flowResultId", this.flowResultId) 
				.append("flowType", this.flowType) 
				.append("flowPk", this.flowPk) 
				.append("flowNode", this.flowNode) 
				.append("flowStatus", this.flowStatus) 
						.toString();
	}



}
