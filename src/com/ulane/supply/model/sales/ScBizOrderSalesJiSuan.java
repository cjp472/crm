package com.ulane.supply.model.sales;
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
 * ScBizOrderSales Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScBizOrderSalesJiSuan extends com.htsoft.core.model.BaseModel {

    protected Long bizOrderId;							//业务单号
	protected Short bizOrderType;						//业务单类型
	protected String bizOrderDispName;					//业务单显示名
	protected java.util.Date alertTime;					//预警时间
	protected Long masterBizOrderId;					//主业务单号
	protected java.math.BigDecimal totalOutAmount;		//总支出金额

	protected Long totalCount;							//总数量
	protected Long createUserId;						//创建者ID
	protected java.math.BigDecimal factTotalOutAmount;	//实际总支出金额
	protected java.math.BigDecimal factTotalInAmount;	//实际总收入金额
	protected Long factTotalCount;						//实际发生数量
	protected java.math.BigDecimal planOutAmount;		//计划支出金额
	protected java.math.BigDecimal planInAmount;		//计划收入金额
	protected java.util.Date createTime;				//创建时间
	protected Long approvedUserId;						//审核人ID
	protected java.util.Date updateTime;				//更新时间
	protected Long createDeptId;						//创建人部门ID
	protected Long salesUserId;							//销售人员ID
	protected Long salesDeptId;							//销售人员部门ID
	protected String custContPerson;					//客户联系人
	protected String custContPhone;						//客户联系电话
	
	
	//处理字段
	protected java.math.BigDecimal totalInAmount;		//总收入金额
	protected java.math.BigDecimal quxiaoInAmount;      //取消订单金额
	
	
	public java.math.BigDecimal getQuxiaoInAmount() {
		return quxiaoInAmount;
	}
	public void setQuxiaoInAmount(java.math.BigDecimal quxiaoInAmount) {
		this.quxiaoInAmount = quxiaoInAmount;
	}
	public Long getBizOrderId() {
		return bizOrderId;
	}
	public void setBizOrderId(Long bizOrderId) {
		this.bizOrderId = bizOrderId;
	}
	public Short getBizOrderType() {
		return bizOrderType;
	}
	public void setBizOrderType(Short bizOrderType) {
		this.bizOrderType = bizOrderType;
	}
	public String getBizOrderDispName() {
		return bizOrderDispName;
	}
	public void setBizOrderDispName(String bizOrderDispName) {
		this.bizOrderDispName = bizOrderDispName;
	}
	public java.util.Date getAlertTime() {
		return alertTime;
	}
	public void setAlertTime(java.util.Date alertTime) {
		this.alertTime = alertTime;
	}
	public Long getMasterBizOrderId() {
		return masterBizOrderId;
	}
	public void setMasterBizOrderId(Long masterBizOrderId) {
		this.masterBizOrderId = masterBizOrderId;
	}
	public java.math.BigDecimal getTotalOutAmount() {
		return totalOutAmount;
	}
	public void setTotalOutAmount(java.math.BigDecimal totalOutAmount) {
		this.totalOutAmount = totalOutAmount;
	}
	public java.math.BigDecimal getTotalInAmount() {
		return totalInAmount;
	}
	public void setTotalInAmount(java.math.BigDecimal totalInAmount) {
		this.totalInAmount = totalInAmount;
	}
	public Long getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}
	public Long getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(Long createUserId) {
		this.createUserId = createUserId;
	}
	public java.math.BigDecimal getFactTotalOutAmount() {
		return factTotalOutAmount;
	}
	public void setFactTotalOutAmount(java.math.BigDecimal factTotalOutAmount) {
		this.factTotalOutAmount = factTotalOutAmount;
	}
	public java.math.BigDecimal getFactTotalInAmount() {
		return factTotalInAmount;
	}
	public void setFactTotalInAmount(java.math.BigDecimal factTotalInAmount) {
		this.factTotalInAmount = factTotalInAmount;
	}
	public Long getFactTotalCount() {
		return factTotalCount;
	}
	public void setFactTotalCount(Long factTotalCount) {
		this.factTotalCount = factTotalCount;
	}
	public java.math.BigDecimal getPlanOutAmount() {
		return planOutAmount;
	}
	public void setPlanOutAmount(java.math.BigDecimal planOutAmount) {
		this.planOutAmount = planOutAmount;
	}
	public java.math.BigDecimal getPlanInAmount() {
		return planInAmount;
	}
	public void setPlanInAmount(java.math.BigDecimal planInAmount) {
		this.planInAmount = planInAmount;
	}
	public java.util.Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(java.util.Date createTime) {
		this.createTime = createTime;
	}
	public Long getApprovedUserId() {
		return approvedUserId;
	}
	public void setApprovedUserId(Long approvedUserId) {
		this.approvedUserId = approvedUserId;
	}
	public java.util.Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(java.util.Date updateTime) {
		this.updateTime = updateTime;
	}
	public Long getCreateDeptId() {
		return createDeptId;
	}
	public void setCreateDeptId(Long createDeptId) {
		this.createDeptId = createDeptId;
	}
	public Long getSalesUserId() {
		return salesUserId;
	}
	public void setSalesUserId(Long salesUserId) {
		this.salesUserId = salesUserId;
	}
	public Long getSalesDeptId() {
		return salesDeptId;
	}
	public void setSalesDeptId(Long salesDeptId) {
		this.salesDeptId = salesDeptId;
	}
	public String getCustContPerson() {
		return custContPerson;
	}
	public void setCustContPerson(String custContPerson) {
		this.custContPerson = custContPerson;
	}
	public String getCustContPhone() {
		return custContPhone;
	}
	public void setCustContPhone(String custContPhone) {
		this.custContPhone = custContPhone;
	}
	public java.util.Date getFinishTime() {
		return finishTime;
	}
	public void setFinishTime(java.util.Date finishTime) {
		this.finishTime = finishTime;
	}
	public Long getCustId() {
		return custId;
	}
	public void setCustId(Long custId) {
		this.custId = custId;
	}
	public java.math.BigDecimal getDiscountForeSubtotal() {
		return discountForeSubtotal;
	}
	public void setDiscountForeSubtotal(java.math.BigDecimal discountForeSubtotal) {
		this.discountForeSubtotal = discountForeSubtotal;
	}
	public String getDiscount() {
		return discount;
	}
	public void setDiscount(String discount) {
		this.discount = discount;
	}
	public java.math.BigDecimal getChangedAmount() {
		return changedAmount;
	}
	public void setChangedAmount(java.math.BigDecimal changedAmount) {
		this.changedAmount = changedAmount;
	}
	public java.math.BigDecimal getDiscountAfterSubtotal() {
		return discountAfterSubtotal;
	}
	public void setDiscountAfterSubtotal(java.math.BigDecimal discountAfterSubtotal) {
		this.discountAfterSubtotal = discountAfterSubtotal;
	}
	public String getBizOrderDesc() {
		return bizOrderDesc;
	}
	public void setBizOrderDesc(String bizOrderDesc) {
		this.bizOrderDesc = bizOrderDesc;
	}
	public Short getBizOrderStatus() {
		return bizOrderStatus;
	}
	public void setBizOrderStatus(Short bizOrderStatus) {
		this.bizOrderStatus = bizOrderStatus;
	}
	public Short getBizOrderSubStatus() {
		return bizOrderSubStatus;
	}
	public void setBizOrderSubStatus(Short bizOrderSubStatus) {
		this.bizOrderSubStatus = bizOrderSubStatus;
	}
	public Short getSalesModelType() {
		return salesModelType;
	}
	public void setSalesModelType(Short salesModelType) {
		this.salesModelType = salesModelType;
	}
	public String getSalesDesc() {
		return salesDesc;
	}
	public void setSalesDesc(String salesDesc) {
		this.salesDesc = salesDesc;
	}
	protected java.util.Date finishTime;				//完成时间
	protected Long custId;								//客户ID
	protected java.math.BigDecimal discountForeSubtotal;//折前小结
	protected String discount;							//折扣
	protected java.math.BigDecimal changedAmount;		//增减款
	protected java.math.BigDecimal discountAfterSubtotal;//折后小计
	protected String bizOrderDesc;						//业务单描述
	protected Short bizOrderStatus;						//业务单状态
	protected Short bizOrderSubStatus;					//业务单子状态
	protected Short salesModelType;						//销售模式
	protected String salesDesc;							//业务单描述

}
