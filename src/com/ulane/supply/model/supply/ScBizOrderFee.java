package com.ulane.supply.model.supply;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.ulane.supply.model.sales.ScBizSalesDetail;
/**
 * ScBizOrderFee Base Java Bean, base class for the.base.model, mapped directly
 * to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class ScBizOrderFee extends com.htsoft.core.model.BaseModel {

	protected Long bizOrderFeeInst;
	protected Long bizOrderId;
	protected String bizOrderFeeType;
	protected Short feeFlag;
	protected Short sumFlag;
	protected Long optUserId;
	protected String bankTransferReceiptNumber;
	protected Short businessPersonalFlag;
	protected String extBankName;
	protected String extBankAcct;
	protected String receiptSet;
	protected java.math.BigDecimal changedAmount;
	protected java.util.Date changedTime;
	protected Short status;
	protected Short payModelType;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime;
	protected String remark;

	/**
	 * 业务单费用状态
	 */
	public static final Short STATUS_UNDO = 0; // 未完成
	public static final Short STATUS_FINISH = 1; // 已完成
	public static final Short STATUS_CANCELED = 2; // 已取消

	public static final Short FEE_TYPE_RETAIL = 0; // 零售业务单费用

	/**
	 * Default Empty Constructor for class ScBizOrderFee
	 */
	public ScBizOrderFee() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class ScBizOrderFee
	 */
	public ScBizOrderFee(Long in_bizOrderFeeInst) {
		this.setBizOrderFeeInst(in_bizOrderFeeInst);
	}

	/**
	 * 业务单费用内码 * @return Long
	 * 
	 * @hibernate.id column="BIZ_ORDER_FEE_INST" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getBizOrderFeeInst() {
		return this.bizOrderFeeInst;
	}

	/**
	 * Set the bizOrderFeeInst
	 */
	public void setBizOrderFeeInst(Long aValue) {
		this.bizOrderFeeInst = aValue;
	}

	/**
	 * 业务单内码 * @return Long
	 * 
	 * @hibernate.property column="BIZ_ORDER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getBizOrderId() {
		return this.bizOrderId;
	}

	/**
	 * Set the bizOrderId
	 */
	public void setBizOrderId(Long aValue) {
		this.bizOrderId = aValue;
	}

	/**
	 * 业务单费用类型 * @return String
	 * 
	 * @hibernate.property column="BIZ_ORDER_FEE_TYPE" type="java.lang.String"
	 *                     length="60" not-null="true" unique="false"
	 */
	public String getBizOrderFeeType() {
		return this.bizOrderFeeType;
	}

	/**
	 * Set the bizOrderFeeType
	 * 
	 * @spring.validator type="required"
	 */
	public void setBizOrderFeeType(String aValue) {
		this.bizOrderFeeType = aValue;
	}

	/**
	 * 费用标志0-现金、1-银行转帐、2-代金券、3-供货商抵用金&CON_T_FEE_FLAG * @return Short
	 * 
	 * @hibernate.property column="FEE_FLAG" type="java.lang.Short" length="5"
	 *                     not-null="true" unique="false"
	 */
	public Short getFeeFlag() {
		return this.feeFlag;
	}

	/**
	 * Set the feeFlag
	 * 
	 * @spring.validator type="required"
	 */
	public void setFeeFlag(Short aValue) {
		this.feeFlag = aValue;
	}

	/**
	 * 参与计算标志-1--减、0--不参与计算、1--增&CON_T_SUM_FLAG * @return Short
	 * 
	 * @hibernate.property column="SUM_FLAG" type="java.lang.Short" length="5"
	 *                     not-null="true" unique="false"
	 */
	public Short getSumFlag() {
		return this.sumFlag;
	}

	/**
	 * Set the sumFlag
	 * 
	 * @spring.validator type="required"
	 */
	public void setSumFlag(Short aValue) {
		this.sumFlag = aValue;
	}

	/**
	 * 操作员标识 * @return Long
	 * 
	 * @hibernate.property column="OPT_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getOptUserId() {
		return this.optUserId;
	}

	/**
	 * Set the optUserId
	 */
	public void setOptUserId(Long aValue) {
		this.optUserId = aValue;
	}

	/**
	 * 凭证流水号 * @return String
	 * 
	 * @hibernate.property column="BANK_TRANSFER_RECEIPT_NUMBER"
	 *                     type="java.lang.String" length="60" not-null="false"
	 *                     unique="false"
	 */
	public String getBankTransferReceiptNumber() {
		return this.bankTransferReceiptNumber;
	}

	/**
	 * Set the bankTransferReceiptNumber
	 */
	public void setBankTransferReceiptNumber(String aValue) {
		this.bankTransferReceiptNumber = aValue;
	}

	/**
	 * 公私标识：0--对私、1--对公&CON_T_BP_FLAG * @return Short
	 * 
	 * @hibernate.property column="BUSINESS_PERSONAL_FLAG"
	 *                     type="java.lang.Short" length="5" not-null="false"
	 *                     unique="false"
	 */
	public Short getBusinessPersonalFlag() {
		return this.businessPersonalFlag;
	}

	/**
	 * Set the businessPersonalFlag
	 */
	public void setBusinessPersonalFlag(Short aValue) {
		this.businessPersonalFlag = aValue;
	}

	/**
	 * 它方银行名称 * @return String
	 * 
	 * @hibernate.property column="EXT_BANK_NAME" type="java.lang.String"
	 *                     length="60" not-null="false" unique="false"
	 */
	public String getExtBankName() {
		return this.extBankName;
	}

	/**
	 * Set the extBankName
	 */
	public void setExtBankName(String aValue) {
		this.extBankName = aValue;
	}

	/**
	 * 它方银行账号 * @return String
	 * 
	 * @hibernate.property column="EXT_BANK_ACCT" type="java.lang.String"
	 *                     length="60" not-null="false" unique="false"
	 */
	public String getExtBankAcct() {
		return this.extBankAcct;
	}

	/**
	 * Set the extBankAcct
	 */
	public void setExtBankAcct(String aValue) {
		this.extBankAcct = aValue;
	}

	/**
	 * 凭证附件集如果有多个附件，则用逗号分割 * @return String
	 * 
	 * @hibernate.property column="RECEIPT_SET" type="java.lang.String"
	 *                     length="200" not-null="false" unique="false"
	 */
	public String getReceiptSet() {
		return this.receiptSet;
	}

	/**
	 * Set the receiptSet
	 */
	public void setReceiptSet(String aValue) {
		this.receiptSet = aValue;
	}

	/**
	 * 发生金额-为减、+为增 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="CHANGED_AMOUNT" type="java.math.BigDecimal"
	 *                     length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getChangedAmount() {
		return this.changedAmount;
	}

	/**
	 * Set the changedAmount
	 * 
	 * @spring.validator type="required"
	 */
	public void setChangedAmount(java.math.BigDecimal aValue) {
		this.changedAmount = aValue;
	}

	/**
	 * 发生时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="CHANGED_TIME" type="java.util.Date"
	 *                     length="7" not-null="true" unique="false"
	 */
	public java.util.Date getChangedTime() {
		return this.changedTime;
	}

	/**
	 * Set the changedTime
	 * 
	 * @spring.validator type="required"
	 */
	public void setChangedTime(java.util.Date aValue) {
		this.changedTime = aValue;
	}

	/**
	 * 状态0-未完成、1-已完成、2-已取消&CON_T_FEE_STATUS * @return Short
	 * 
	 * @hibernate.property column="STATUS" type="java.lang.Short" length="5"
	 *                     not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}

	/**
	 * Set the status
	 * 
	 * @spring.validator type="required"
	 */
	public void setStatus(Short aValue) {
		this.status = aValue;
	}

	/**
	 * 付款模式：0--小金额现付、1--打款、2--铺货代销&CON_T_PAY_MODEL * @return Short
	 * 
	 * @hibernate.property column="PAY_MODEL_TYPE" type="java.lang.Short"
	 *                     length="5" not-null="false" unique="false"
	 */
	public Short getPayModelType() {
		return this.payModelType;
	}

	/**
	 * Set the payModelType
	 */
	public void setPayModelType(Short aValue) {
		this.payModelType = aValue;
	}

	/**
	 * 创建人 * @return Long
	 * 
	 * @hibernate.property column="CREATE_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getCreateUserId() {
		return this.createUserId;
	}

	/**
	 * Set the createUserId
	 */
	public void setCreateUserId(Long aValue) {
		this.createUserId = aValue;
	}

	/**
	 * 创建时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="CREATE_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
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
	 * 修改人 * @return Long
	 * 
	 * @hibernate.property column="UPDATE_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getUpdateUserId() {
		return this.updateUserId;
	}

	/**
	 * Set the updateUserId
	 */
	public void setUpdateUserId(Long aValue) {
		this.updateUserId = aValue;
	}

	/**
	 * 修改时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
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

	/**
	 * 备注 * @return String
	 * 
	 * @hibernate.property column="remark" type="java.lang.String" length="500"
	 *                     not-null="false" unique="false"
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScBizOrderFee)) {
			return false;
		}
		ScBizOrderFee rhs = (ScBizOrderFee) object;
		return new EqualsBuilder()
				.append(this.bizOrderFeeInst, rhs.bizOrderFeeInst)
				.append(this.bizOrderId, rhs.bizOrderId)
				.append(this.bizOrderFeeType, rhs.bizOrderFeeType)
				.append(this.feeFlag, rhs.feeFlag)
				.append(this.sumFlag, rhs.sumFlag)
				.append(this.optUserId, rhs.optUserId)
				.append(this.bankTransferReceiptNumber,
						rhs.bankTransferReceiptNumber)
				.append(this.businessPersonalFlag, rhs.businessPersonalFlag)
				.append(this.extBankName, rhs.extBankName)
				.append(this.extBankAcct, rhs.extBankAcct)
				.append(this.receiptSet, rhs.receiptSet)
				.append(this.changedAmount, rhs.changedAmount)
				.append(this.changedTime, rhs.changedTime)
				.append(this.status, rhs.status)
				.append(this.payModelType, rhs.payModelType)
				.append(this.createUserId, rhs.createUserId)
				.append(this.createTime, rhs.createTime)
				.append(this.updateUserId, rhs.updateUserId)
				.append(this.updateTime, rhs.updateTime)
				.append(this.remark, rhs.remark).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bizOrderFeeInst).append(this.bizOrderId)
				.append(this.bizOrderFeeType).append(this.feeFlag)
				.append(this.sumFlag).append(this.optUserId)
				.append(this.bankTransferReceiptNumber)
				.append(this.businessPersonalFlag).append(this.extBankName)
				.append(this.extBankAcct).append(this.receiptSet)
				.append(this.changedAmount).append(this.changedTime)
				.append(this.status).append(this.payModelType)
				.append(this.createUserId).append(this.createTime)
				.append(this.updateUserId).append(this.updateTime)
				.append(this.remark).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bizOrderFeeInst", this.bizOrderFeeInst)
				.append("bizOrderId", this.bizOrderId)
				.append("bizOrderFeeType", this.bizOrderFeeType)
				.append("feeFlag", this.feeFlag)
				.append("sumFlag", this.sumFlag)
				.append("optUserId", this.optUserId)
				.append("bankTransferReceiptNumber",
						this.bankTransferReceiptNumber)
				.append("businessPersonalFlag", this.businessPersonalFlag)
				.append("extBankName", this.extBankName)
				.append("extBankAcct", this.extBankAcct)
				.append("receiptSet", this.receiptSet)
				.append("changedAmount", this.changedAmount)
				.append("changedTime", this.changedTime)
				.append("status", this.status)
				.append("payModelType", this.payModelType)
				.append("createUserId", this.createUserId)
				.append("createTime", this.createTime)
				.append("updateUserId", this.updateUserId)
				.append("updateTime", this.updateTime)
				.append("remark", this.remark).toString();
	}

}
