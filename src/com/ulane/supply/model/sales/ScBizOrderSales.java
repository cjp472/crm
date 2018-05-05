package com.ulane.supply.model.sales;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.system.AppUser;
import com.ulane.customer.model.customer.CusDelivery;
import com.ulane.supply.model.supply.ScBizOrderFee;

/**
 * ScBizOrderSales Base Java Bean, base class for the.base.model, mapped
 * directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class ScBizOrderSales extends com.htsoft.core.model.BaseModel {

	protected Long bizOrderId; // 业务单id
	protected Short bizOrderType; // 业务单类型
	protected String bizOrderDispName; // 业务单显示名
	protected java.util.Date alertTime; // 预警时间
	protected Long masterBizOrderId; // 主业务单号
	protected java.math.BigDecimal totalOutAmount; // 总支出金额
	protected java.math.BigDecimal totalInAmount; // 总收入金额
	protected Long totalCount; // 总数量
	protected AppUser createUser; // 创建者ID
	protected java.math.BigDecimal factTotalOutAmount; // 实际总支出金额
	protected java.math.BigDecimal factTotalInAmount; // 实际总收入金额
	protected Long factTotalCount; // 实际发生数量
	protected java.math.BigDecimal planOutAmount; // 计划支出金额
	protected java.math.BigDecimal planInAmount; // 计划收入金额
	protected java.util.Date createTime; // 创建时间
	protected Long approvedUserId; // 审核人ID
	protected java.util.Date updateTime; // 更新时间
	protected Long createDeptId; // 创建人部门ID
	protected Long salesUserId; // 销售人员ID
	protected Long salesDeptId; // 销售人员部门ID
	protected String custContPerson; // 客户联系人
	protected String custContPhone; // 客户联系电话
	protected java.util.Date finishTime; // 完成时间
	protected Long custId; // 客户ID
	protected java.math.BigDecimal discountForeSubtotal;// 折前小结
	protected String discount; // 折扣
	protected java.math.BigDecimal changedAmount; // 增减款
	protected java.math.BigDecimal discountAfterSubtotal;// 折后小计
	protected String bizOrderDesc; // 业务单描述
	protected Short bizOrderStatus; // 业务单状态
	protected Short bizOrderSubStatus; // 业务单子状态
	protected Short salesModelType; // 销售模式
	protected String salesDesc; // 业务单描述
	protected String ext1;
	protected String ext2;
	protected String ext3;
	protected String ext4;
	protected String ext5;
	protected String ext6;
	protected String ext7;
	protected String ext8;
	protected String ext9;
	protected String ext10;
	protected java.math.BigDecimal ext11;// 运费
	protected java.math.BigDecimal ext12;// 商品总金额
	protected java.math.BigDecimal ext13;
	protected java.math.BigDecimal ext14;
	protected java.math.BigDecimal ext15;
	protected java.util.Date ext16;
	protected java.util.Date ext17;
	protected java.util.Date ext18;
	protected java.util.Date ext19;
	protected java.util.Date ext20;

	protected String channel;
	protected String bizOrderNumber;// 业务单号

	public String payInfo;
	public String cusName;
	
	//新增字段：工号（家有）
	public String employeeNo;
	/**
	 * 新增工作流字段
	 */
	protected Long runid;
	protected String nodeName;// 审批节点名称
	protected String approvalStatus;// 审批状态

	protected java.util.Set<ScBizSalesDetail> scBizSalesDetails = new java.util.HashSet<ScBizSalesDetail>();
	protected java.util.Set<ScBizOrderFee> scBizOrderFees = new java.util.HashSet<ScBizOrderFee>();

	public java.util.Set<ScBizOrderFee> getScBizOrderFees() {
		return scBizOrderFees;
	}

	public void setScBizOrderFees(java.util.Set<ScBizOrderFee> scBizOrderFees) {
		this.scBizOrderFees = scBizOrderFees;
	}

	public static final Short YONGJIN_DINGDAN = 1; // 订单
	public static final Short YONGJIN_TUIDAN = 2; // 退单
	public static final Short YONGJIN_HUANDAN = 3; // 换单
	
	public static final Short YEWUDAN_SHENGCHENG = 0; // 已生成
	public static final Short YEWUDAN_SHENHE = 1; // 审核中
	public static final Short YEWUDAN_ZHIXINGZHONG = 2; // 执行中
	public static final Short YEWUDAN_WANCHENG = 3; // 已完成
	public static final Short YEWUDAN_HUITUI = 4; // 回退中
	public static final Short YEWUDAN_ZHUXIAO = 5; // 注销
	public static final Short YEWUDAN_GUANBI = 6; // 关闭

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getBizOrderNumber() {
		return bizOrderNumber;
	}

	public void setBizOrderNumber(String bizOrderNumber) {
		this.bizOrderNumber = bizOrderNumber;
	}

	public Long getRunid() {
		return runid;
	}

	public void setRunid(Long runid) {
		this.runid = runid;
	}

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	protected CusDelivery cusDelivery;

	/**
	 * Default Empty Constructor for class ScBizOrderSales
	 */
	public ScBizOrderSales() {
		super();
	}

	public CusDelivery getCusDelivery() {
		return cusDelivery;
	}

	public void setCusDelivery(CusDelivery cusDelivery) {
		this.cusDelivery = cusDelivery;
	}

	/**
	 * Default Key Fields Constructor for class ScBizOrderSales
	 */
	public ScBizOrderSales(Long in_bizOrderId) {
		this.setBizOrderId(in_bizOrderId);
	}

	public java.util.Set<ScBizSalesDetail> getScBizSalesDetails() {
		return scBizSalesDetails;
	}

	private void setScBizSalesDetails(
			java.util.Set<ScBizSalesDetail> in_scBizSalesDetails) {
		this.scBizSalesDetails = in_scBizSalesDetails;
	}

	public void addDetsils(ScBizSalesDetail detail) {
		this.scBizSalesDetails.add(detail);
	}

	/**
	 * 业务单内码 * @return Long
	 * 
	 * @hibernate.id column="BIZ_ORDER_ID" type="java.lang.Long"
	 *               generator-class="native"
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
	 * 业务单类型：&CON_T_BO_TYPE * @return Short
	 * 
	 * @hibernate.property column="BIZ_ORDER_TYPE" type="java.lang.Short"
	 *                     length="5" not-null="false" unique="false"
	 */
	public Short getBizOrderType() {
		return this.bizOrderType;
	}

	/**
	 * Set the bizOrderType
	 */
	public void setBizOrderType(Short aValue) {
		this.bizOrderType = aValue;
	}

	/**
	 * 业务单显示名称 * @return String
	 * 
	 * @hibernate.property column="BIZ_ORDER_DISP_NAME" type="java.lang.String"
	 *                     length="500" not-null="false" unique="false"
	 */
	public String getBizOrderDispName() {
		return this.bizOrderDispName;
	}

	/**
	 * Set the bizOrderDispName
	 */
	public void setBizOrderDispName(String aValue) {
		this.bizOrderDispName = aValue;
	}

	/**
	 * 预警时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="ALERT_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getAlertTime() {
		return this.alertTime;
	}

	/**
	 * Set the alertTime
	 */
	public void setAlertTime(java.util.Date aValue) {
		this.alertTime = aValue;
	}

	/**
	 * 主业务单内码 * @return Long
	 * 
	 * @hibernate.property column="MASTER_BIZ_ORDER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getMasterBizOrderId() {
		return this.masterBizOrderId;
	}

	/**
	 * Set the masterBizOrderId
	 */
	public void setMasterBizOrderId(Long aValue) {
		this.masterBizOrderId = aValue;
	}

	/**
	 * 应支出总费用 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="TOTAL_OUT_AMOUNT" type="java.math.BigDecimal"
	 *                     length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getTotalOutAmount() {
		return this.totalOutAmount;
	}

	/**
	 * Set the totalOutAmount
	 * 
	 * @spring.validator type="required"
	 */
	public void setTotalOutAmount(java.math.BigDecimal aValue) {
		this.totalOutAmount = aValue;
	}

	/**
	 * 应收入总费用 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="TOTAL_IN_AMOUNT" type="java.math.BigDecimal"
	 *                     length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getTotalInAmount() {
		return this.totalInAmount;
	}

	/**
	 * Set the totalInAmount
	 * 
	 * @spring.validator type="required"
	 */
	public void setTotalInAmount(java.math.BigDecimal aValue) {
		this.totalInAmount = aValue;
	}

	/**
	 * 应发生总数量 * @return Long
	 * 
	 * @hibernate.property column="TOTAL_COUNT" type="java.lang.Long"
	 *                     length="15" not-null="false" unique="false"
	 */
	public Long getTotalCount() {
		return this.totalCount;
	}

	/**
	 * Set the totalCount
	 */
	public void setTotalCount(Long aValue) {
		this.totalCount = aValue;
	}

	public AppUser getCreateUser() {
		return createUser;
	}

	public void setCreateUser(AppUser createUser) {
		this.createUser = createUser;
	}

	/**
	 * 已支出总费用 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="FACT_TOTAL_OUT_AMOUNT"
	 *                     type="java.math.BigDecimal" length="15"
	 *                     not-null="true" unique="false"
	 */
	public java.math.BigDecimal getFactTotalOutAmount() {
		return this.factTotalOutAmount;
	}

	/**
	 * Set the factTotalOutAmount
	 * 
	 * @spring.validator type="required"
	 */
	public void setFactTotalOutAmount(java.math.BigDecimal aValue) {
		this.factTotalOutAmount = aValue;
	}

	/**
	 * 已收入总费用 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="FACT_TOTAL_IN_AMOUNT"
	 *                     type="java.math.BigDecimal" length="15"
	 *                     not-null="true" unique="false"
	 */
	public java.math.BigDecimal getFactTotalInAmount() {
		return this.factTotalInAmount;
	}

	/**
	 * Set the factTotalInAmount
	 * 
	 * @spring.validator type="required"
	 */
	public void setFactTotalInAmount(java.math.BigDecimal aValue) {
		this.factTotalInAmount = aValue;
	}

	/**
	 * 已发生数量 * @return Long
	 * 
	 * @hibernate.property column="FACT_TOTAL_COUNT" type="java.lang.Long"
	 *                     length="15" not-null="true" unique="false"
	 */
	public Long getFactTotalCount() {
		return this.factTotalCount;
	}

	/**
	 * Set the factTotalCount
	 * 
	 * @spring.validator type="required"
	 */
	public void setFactTotalCount(Long aValue) {
		this.factTotalCount = aValue;
	}

	/**
	 * 计划支出总费用 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="PLAN_OUT_AMOUNT" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getPlanOutAmount() {
		return this.planOutAmount;
	}

	/**
	 * Set the planOutAmount
	 */
	public void setPlanOutAmount(java.math.BigDecimal aValue) {
		this.planOutAmount = aValue;
	}

	/**
	 * 计划收入总费用 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="PLAN_IN_AMOUNT" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getPlanInAmount() {
		return this.planInAmount;
	}

	/**
	 * Set the planInAmount
	 */
	public void setPlanInAmount(java.math.BigDecimal aValue) {
		this.planInAmount = aValue;
	}

	/**
	 * 生成时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="CREATE_TIME" type="java.util.Date" length="7"
	 *                     not-null="true" unique="false"
	 */
	public java.util.Date getCreateTime() {
		return this.createTime;
	}

	/**
	 * Set the createTime
	 * 
	 * @spring.validator type="required"
	 */
	public void setCreateTime(java.util.Date aValue) {
		this.createTime = aValue;
	}

	/**
	 * 审批用户内码 * @return Long
	 * 
	 * @hibernate.property column="APPROVED_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getApprovedUserId() {
		return this.approvedUserId;
	}

	/**
	 * Set the approvedUserId
	 */
	public void setApprovedUserId(Long aValue) {
		this.approvedUserId = aValue;
	}

	/**
	 * 更新时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="7"
	 *                     not-null="true" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}

	/**
	 * Set the updateTime
	 * 
	 * @spring.validator type="required"
	 */
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}

	/**
	 * 创建用户部门内码 * @return Long
	 * 
	 * @hibernate.property column="CREATE_DEPT_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getCreateDeptId() {
		return this.createDeptId;
	}

	/**
	 * Set the createDeptId
	 */
	public void setCreateDeptId(Long aValue) {
		this.createDeptId = aValue;
	}

	/**
	 * 销售用户内码 * @return Long
	 * 
	 * @hibernate.property column="SALES_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getSalesUserId() {
		return this.salesUserId;
	}

	/**
	 * Set the salesUserId
	 */
	public void setSalesUserId(Long aValue) {
		this.salesUserId = aValue;
	}

	/**
	 * 销售用户部门内码 * @return Long
	 * 
	 * @hibernate.property column="SALES_DEPT_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getSalesDeptId() {
		return this.salesDeptId;
	}

	/**
	 * Set the salesDeptId
	 */
	public void setSalesDeptId(Long aValue) {
		this.salesDeptId = aValue;
	}

	/**
	 * 客户联系人 * @return String
	 * 
	 * @hibernate.property column="CUST_CONT_PERSON" type="java.lang.String"
	 *                     length="60" not-null="false" unique="false"
	 */
	public String getCustContPerson() {
		return this.custContPerson;
	}

	/**
	 * Set the custContPerson
	 */
	public void setCustContPerson(String aValue) {
		this.custContPerson = aValue;
	}

	/**
	 * 客户联系电话 * @return String
	 * 
	 * @hibernate.property column="CUST_CONT_PHONE" type="java.lang.String"
	 *                     length="20" not-null="false" unique="false"
	 */
	public String getCustContPhone() {
		return this.custContPhone;
	}

	/**
	 * Set the custContPhone
	 */
	public void setCustContPhone(String aValue) {
		this.custContPhone = aValue;
	}

	/**
	 * 结束时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="FINISH_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getFinishTime() {
		return this.finishTime;
	}

	/**
	 * Set the finishTime
	 */
	public void setFinishTime(java.util.Date aValue) {
		this.finishTime = aValue;
	}

	/**
	 * 客户内码 * @return Long
	 * 
	 * @hibernate.property column="CUST_ID" type="java.lang.Long" length="18"
	 *                     not-null="false" unique="false"
	 */
	public Long getCustId() {
		return this.custId;
	}

	/**
	 * Set the custId
	 */
	public void setCustId(Long aValue) {
		this.custId = aValue;
	}

	/**
	 * 折前小计 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="DISCOUNT_FORE_SUBTOTAL"
	 *                     type="java.math.BigDecimal" length="15"
	 *                     not-null="false" unique="false"
	 */
	public java.math.BigDecimal getDiscountForeSubtotal() {
		return this.discountForeSubtotal;
	}

	/**
	 * Set the discountForeSubtotal
	 */
	public void setDiscountForeSubtotal(java.math.BigDecimal aValue) {
		this.discountForeSubtotal = aValue;
	}

	/**
	 * 折扣 * @return String
	 * 
	 * @hibernate.property column="DISCOUNT" type="java.lang.String" length="8"
	 *                     not-null="false" unique="false"
	 */
	public String getDiscount() {
		return this.discount;
	}

	/**
	 * Set the discount
	 */
	public void setDiscount(String aValue) {
		this.discount = aValue;
	}

	/**
	 * 增减款 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="CHANGED_AMOUNT" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getChangedAmount() {
		return this.changedAmount;
	}

	/**
	 * Set the changedAmount
	 */
	public void setChangedAmount(java.math.BigDecimal aValue) {
		this.changedAmount = aValue;
	}

	/**
	 * 折后小计 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="DISCOUNT_AFTER_SUBTOTAL"
	 *                     type="java.math.BigDecimal" length="15"
	 *                     not-null="false" unique="false"
	 */
	public java.math.BigDecimal getDiscountAfterSubtotal() {
		return this.discountAfterSubtotal;
	}

	/**
	 * Set the discountAfterSubtotal
	 */
	public void setDiscountAfterSubtotal(java.math.BigDecimal aValue) {
		this.discountAfterSubtotal = aValue;
	}

	/**
	 * 业务单描述 * @return String
	 * 
	 * @hibernate.property column="BIZ_ORDER_DESC" type="java.lang.String"
	 *                     length="500" not-null="false" unique="false"
	 */
	public String getBizOrderDesc() {
		return this.bizOrderDesc;
	}

	/**
	 * Set the bizOrderDesc
	 */
	public void setBizOrderDesc(String aValue) {
		this.bizOrderDesc = aValue;
	}

	/**
	 * 业务单状态0--已生成、1--审核中、2--执行中、3--完成、4--回退中、5--注销、6--关闭&CON_T_BO_STATUS * @return
	 * Short
	 * 
	 * @hibernate.property column="BIZ_ORDER_STATUS" type="java.lang.Short"
	 *                     length="5" not-null="false" unique="false"
	 */
	public Short getBizOrderStatus() {
		return this.bizOrderStatus;
	}

	/**
	 * Set the bizOrderStatus
	 */
	public void setBizOrderStatus(Short aValue) {
		this.bizOrderStatus = aValue;
	}

	/**
	 * 业务单子状态0--未付款、1--已付款、2--部分付款、3--正在入库、4--已收货等&CON_T_BO_SUB_STATUS * @return
	 * Short
	 * 
	 * @hibernate.property column="BIZ_ORDER_SUB_STATUS" type="java.lang.Short"
	 *                     length="5" not-null="false" unique="false"
	 */
	public Short getBizOrderSubStatus() {
		return this.bizOrderSubStatus;
	}

	/**
	 * Set the bizOrderSubStatus
	 */
	public void setBizOrderSubStatus(Short aValue) {
		this.bizOrderSubStatus = aValue;
	}

	/**
	 * 销售模式：0--正常、1--特价、2--赠送&CON_T_SALES_MODEL * @return Short
	 * 
	 * @hibernate.property column="SALES_MODEL_TYPE" type="java.lang.Short"
	 *                     length="5" not-null="false" unique="false"
	 */
	public Short getSalesModelType() {
		return this.salesModelType;
	}

	/**
	 * Set the salesModelType
	 */
	public void setSalesModelType(Short aValue) {
		this.salesModelType = aValue;
	}

	/**
	 * 扩展1 * @return String
	 * 
	 * @hibernate.property column="EXT_1" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt1() {
		return this.ext1;
	}

	public String getSalesDesc() {
		return salesDesc;
	}

	public void setSalesDesc(String salesDesc) {
		this.salesDesc = salesDesc;
	}

	/**
	 * Set the ext1
	 */
	public void setExt1(String aValue) {
		this.ext1 = aValue;
	}

	/**
	 * 扩展2 * @return String
	 * 
	 * @hibernate.property column="EXT_2" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt2() {
		return this.ext2;
	}

	/**
	 * Set the ext2
	 */
	public void setExt2(String aValue) {
		this.ext2 = aValue;
	}

	/**
	 * 扩展3 * @return String
	 * 
	 * @hibernate.property column="EXT_3" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt3() {
		return this.ext3;
	}

	/**
	 * Set the ext3
	 */
	public void setExt3(String aValue) {
		this.ext3 = aValue;
	}

	/**
	 * 扩展4 * @return String
	 * 
	 * @hibernate.property column="EXT_4" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt4() {
		return this.ext4;
	}

	/**
	 * Set the ext4
	 */
	public void setExt4(String aValue) {
		this.ext4 = aValue;
	}

	/**
	 * 扩展5 * @return String
	 * 
	 * @hibernate.property column="EXT_5" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt5() {
		return this.ext5;
	}

	/**
	 * Set the ext5
	 */
	public void setExt5(String aValue) {
		this.ext5 = aValue;
	}

	/**
	 * 扩展6 * @return String
	 * 
	 * @hibernate.property column="EXT_6" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt6() {
		return this.ext6;
	}

	/**
	 * Set the ext6
	 */
	public void setExt6(String aValue) {
		this.ext6 = aValue;
	}

	/**
	 * 扩展7 * @return String
	 * 
	 * @hibernate.property column="EXT_7" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt7() {
		return this.ext7;
	}

	/**
	 * Set the ext7
	 */
	public void setExt7(String aValue) {
		this.ext7 = aValue;
	}

	/**
	 * 扩展8 * @return String
	 * 
	 * @hibernate.property column="EXT_8" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt8() {
		return this.ext8;
	}

	/**
	 * Set the ext8
	 */
	public void setExt8(String aValue) {
		this.ext8 = aValue;
	}

	/**
	 * 扩展9 * @return String
	 * 
	 * @hibernate.property column="EXT_9" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt9() {
		return this.ext9;
	}

	/**
	 * Set the ext9
	 */
	public void setExt9(String aValue) {
		this.ext9 = aValue;
	}

	/**
	 * 扩展10 * @return String
	 * 
	 * @hibernate.property column="EXT_10" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
	 */
	public String getExt10() {
		return this.ext10;
	}

	/**
	 * Set the ext10
	 */
	public void setExt10(String aValue) {
		this.ext10 = aValue;
	}

	/**
	 * 扩展11 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_11" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt11() {
		return this.ext11;
	}

	/**
	 * Set the ext11
	 */
	public void setExt11(java.math.BigDecimal aValue) {
		this.ext11 = aValue;
	}

	/**
	 * 扩展12 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_12" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt12() {
		return this.ext12;
	}

	/**
	 * Set the ext12
	 */
	public void setExt12(java.math.BigDecimal aValue) {
		this.ext12 = aValue;
	}

	/**
	 * 扩展13 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_13" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt13() {
		return this.ext13;
	}

	/**
	 * Set the ext13
	 */
	public void setExt13(java.math.BigDecimal aValue) {
		this.ext13 = aValue;
	}

	/**
	 * 扩展14 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_14" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt14() {
		return this.ext14;
	}

	/**
	 * Set the ext14
	 */
	public void setExt14(java.math.BigDecimal aValue) {
		this.ext14 = aValue;
	}

	/**
	 * 扩展15 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_15" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt15() {
		return this.ext15;
	}

	/**
	 * Set the ext15
	 */
	public void setExt15(java.math.BigDecimal aValue) {
		this.ext15 = aValue;
	}

	/**
	 * 扩展16 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_16" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt16() {
		return this.ext16;
	}

	/**
	 * Set the ext16
	 */
	public void setExt16(java.util.Date aValue) {
		this.ext16 = aValue;
	}

	/**
	 * 扩展17 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_17" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt17() {
		return this.ext17;
	}

	/**
	 * Set the ext17
	 */
	public void setExt17(java.util.Date aValue) {
		this.ext17 = aValue;
	}

	/**
	 * 扩展18 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_18" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt18() {
		return this.ext18;
	}

	/**
	 * Set the ext18
	 */
	public void setExt18(java.util.Date aValue) {
		this.ext18 = aValue;
	}

	/**
	 * 扩展19 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_19" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt19() {
		return this.ext19;
	}

	/**
	 * Set the ext19
	 */
	public void setExt19(java.util.Date aValue) {
		this.ext19 = aValue;
	}

	/**
	 * 扩展20 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_20" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt20() {
		return this.ext20;
	}

	/**
	 * Set the ext20
	 */
	public void setExt20(java.util.Date aValue) {
		this.ext20 = aValue;
	}

	public String getEmployeeNo() {
		return employeeNo;
	}

	public void setEmployeeNo(String employeeNo) {
		this.employeeNo = employeeNo;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ScBizOrderSales other = (ScBizOrderSales) obj;
		if (alertTime == null) {
			if (other.alertTime != null)
				return false;
		} else if (!alertTime.equals(other.alertTime))
			return false;
		if (approvalStatus == null) {
			if (other.approvalStatus != null)
				return false;
		} else if (!approvalStatus.equals(other.approvalStatus))
			return false;
		if (approvedUserId == null) {
			if (other.approvedUserId != null)
				return false;
		} else if (!approvedUserId.equals(other.approvedUserId))
			return false;
		if (bizOrderDesc == null) {
			if (other.bizOrderDesc != null)
				return false;
		} else if (!bizOrderDesc.equals(other.bizOrderDesc))
			return false;
		if (bizOrderDispName == null) {
			if (other.bizOrderDispName != null)
				return false;
		} else if (!bizOrderDispName.equals(other.bizOrderDispName))
			return false;
		if (bizOrderId == null) {
			if (other.bizOrderId != null)
				return false;
		} else if (!bizOrderId.equals(other.bizOrderId))
			return false;
		if (bizOrderNumber == null) {
			if (other.bizOrderNumber != null)
				return false;
		} else if (!bizOrderNumber.equals(other.bizOrderNumber))
			return false;
		if (bizOrderStatus == null) {
			if (other.bizOrderStatus != null)
				return false;
		} else if (!bizOrderStatus.equals(other.bizOrderStatus))
			return false;
		if (bizOrderSubStatus == null) {
			if (other.bizOrderSubStatus != null)
				return false;
		} else if (!bizOrderSubStatus.equals(other.bizOrderSubStatus))
			return false;
		if (bizOrderType == null) {
			if (other.bizOrderType != null)
				return false;
		} else if (!bizOrderType.equals(other.bizOrderType))
			return false;
		if (changedAmount == null) {
			if (other.changedAmount != null)
				return false;
		} else if (!changedAmount.equals(other.changedAmount))
			return false;
		if (channel == null) {
			if (other.channel != null)
				return false;
		} else if (!channel.equals(other.channel))
			return false;
		if (createDeptId == null) {
			if (other.createDeptId != null)
				return false;
		} else if (!createDeptId.equals(other.createDeptId))
			return false;
		if (createTime == null) {
			if (other.createTime != null)
				return false;
		} else if (!createTime.equals(other.createTime))
			return false;
		if (createUser == null) {
			if (other.createUser != null)
				return false;
		} else if (!createUser.equals(other.createUser))
			return false;
		if (cusDelivery == null) {
			if (other.cusDelivery != null)
				return false;
		} else if (!cusDelivery.equals(other.cusDelivery))
			return false;
		if (custContPerson == null) {
			if (other.custContPerson != null)
				return false;
		} else if (!custContPerson.equals(other.custContPerson))
			return false;
		if (custContPhone == null) {
			if (other.custContPhone != null)
				return false;
		} else if (!custContPhone.equals(other.custContPhone))
			return false;
		if (custId == null) {
			if (other.custId != null)
				return false;
		} else if (!custId.equals(other.custId))
			return false;
		if (discount == null) {
			if (other.discount != null)
				return false;
		} else if (!discount.equals(other.discount))
			return false;
		if (discountAfterSubtotal == null) {
			if (other.discountAfterSubtotal != null)
				return false;
		} else if (!discountAfterSubtotal.equals(other.discountAfterSubtotal))
			return false;
		if (discountForeSubtotal == null) {
			if (other.discountForeSubtotal != null)
				return false;
		} else if (!discountForeSubtotal.equals(other.discountForeSubtotal))
			return false;
		if (employeeNo == null) {
			if (other.employeeNo != null)
				return false;
		} else if (!employeeNo.equals(other.employeeNo))
			return false;
		if (ext1 == null) {
			if (other.ext1 != null)
				return false;
		} else if (!ext1.equals(other.ext1))
			return false;
		if (ext10 == null) {
			if (other.ext10 != null)
				return false;
		} else if (!ext10.equals(other.ext10))
			return false;
		if (ext11 == null) {
			if (other.ext11 != null)
				return false;
		} else if (!ext11.equals(other.ext11))
			return false;
		if (ext12 == null) {
			if (other.ext12 != null)
				return false;
		} else if (!ext12.equals(other.ext12))
			return false;
		if (ext13 == null) {
			if (other.ext13 != null)
				return false;
		} else if (!ext13.equals(other.ext13))
			return false;
		if (ext14 == null) {
			if (other.ext14 != null)
				return false;
		} else if (!ext14.equals(other.ext14))
			return false;
		if (ext15 == null) {
			if (other.ext15 != null)
				return false;
		} else if (!ext15.equals(other.ext15))
			return false;
		if (ext16 == null) {
			if (other.ext16 != null)
				return false;
		} else if (!ext16.equals(other.ext16))
			return false;
		if (ext17 == null) {
			if (other.ext17 != null)
				return false;
		} else if (!ext17.equals(other.ext17))
			return false;
		if (ext18 == null) {
			if (other.ext18 != null)
				return false;
		} else if (!ext18.equals(other.ext18))
			return false;
		if (ext19 == null) {
			if (other.ext19 != null)
				return false;
		} else if (!ext19.equals(other.ext19))
			return false;
		if (ext2 == null) {
			if (other.ext2 != null)
				return false;
		} else if (!ext2.equals(other.ext2))
			return false;
		if (ext20 == null) {
			if (other.ext20 != null)
				return false;
		} else if (!ext20.equals(other.ext20))
			return false;
		if (ext3 == null) {
			if (other.ext3 != null)
				return false;
		} else if (!ext3.equals(other.ext3))
			return false;
		if (ext4 == null) {
			if (other.ext4 != null)
				return false;
		} else if (!ext4.equals(other.ext4))
			return false;
		if (ext5 == null) {
			if (other.ext5 != null)
				return false;
		} else if (!ext5.equals(other.ext5))
			return false;
		if (ext6 == null) {
			if (other.ext6 != null)
				return false;
		} else if (!ext6.equals(other.ext6))
			return false;
		if (ext7 == null) {
			if (other.ext7 != null)
				return false;
		} else if (!ext7.equals(other.ext7))
			return false;
		if (ext8 == null) {
			if (other.ext8 != null)
				return false;
		} else if (!ext8.equals(other.ext8))
			return false;
		if (ext9 == null) {
			if (other.ext9 != null)
				return false;
		} else if (!ext9.equals(other.ext9))
			return false;
		if (factTotalCount == null) {
			if (other.factTotalCount != null)
				return false;
		} else if (!factTotalCount.equals(other.factTotalCount))
			return false;
		if (factTotalInAmount == null) {
			if (other.factTotalInAmount != null)
				return false;
		} else if (!factTotalInAmount.equals(other.factTotalInAmount))
			return false;
		if (factTotalOutAmount == null) {
			if (other.factTotalOutAmount != null)
				return false;
		} else if (!factTotalOutAmount.equals(other.factTotalOutAmount))
			return false;
		if (finishTime == null) {
			if (other.finishTime != null)
				return false;
		} else if (!finishTime.equals(other.finishTime))
			return false;
		if (masterBizOrderId == null) {
			if (other.masterBizOrderId != null)
				return false;
		} else if (!masterBizOrderId.equals(other.masterBizOrderId))
			return false;
		if (nodeName == null) {
			if (other.nodeName != null)
				return false;
		} else if (!nodeName.equals(other.nodeName))
			return false;
		if (planInAmount == null) {
			if (other.planInAmount != null)
				return false;
		} else if (!planInAmount.equals(other.planInAmount))
			return false;
		if (planOutAmount == null) {
			if (other.planOutAmount != null)
				return false;
		} else if (!planOutAmount.equals(other.planOutAmount))
			return false;
		if (runid == null) {
			if (other.runid != null)
				return false;
		} else if (!runid.equals(other.runid))
			return false;
		if (salesDeptId == null) {
			if (other.salesDeptId != null)
				return false;
		} else if (!salesDeptId.equals(other.salesDeptId))
			return false;
		if (salesDesc == null) {
			if (other.salesDesc != null)
				return false;
		} else if (!salesDesc.equals(other.salesDesc))
			return false;
		if (salesModelType == null) {
			if (other.salesModelType != null)
				return false;
		} else if (!salesModelType.equals(other.salesModelType))
			return false;
		if (salesUserId == null) {
			if (other.salesUserId != null)
				return false;
		} else if (!salesUserId.equals(other.salesUserId))
			return false;
		if (scBizOrderFees == null) {
			if (other.scBizOrderFees != null)
				return false;
		} else if (!scBizOrderFees.equals(other.scBizOrderFees))
			return false;
		if (scBizSalesDetails == null) {
			if (other.scBizSalesDetails != null)
				return false;
		} else if (!scBizSalesDetails.equals(other.scBizSalesDetails))
			return false;
		if (totalCount == null) {
			if (other.totalCount != null)
				return false;
		} else if (!totalCount.equals(other.totalCount))
			return false;
		if (totalInAmount == null) {
			if (other.totalInAmount != null)
				return false;
		} else if (!totalInAmount.equals(other.totalInAmount))
			return false;
		if (totalOutAmount == null) {
			if (other.totalOutAmount != null)
				return false;
		} else if (!totalOutAmount.equals(other.totalOutAmount))
			return false;
		if (updateTime == null) {
			if (other.updateTime != null)
				return false;
		} else if (!updateTime.equals(other.updateTime))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((alertTime == null) ? 0 : alertTime.hashCode());
		result = prime * result
				+ ((approvalStatus == null) ? 0 : approvalStatus.hashCode());
		result = prime * result
				+ ((approvedUserId == null) ? 0 : approvedUserId.hashCode());
		result = prime * result
				+ ((bizOrderDesc == null) ? 0 : bizOrderDesc.hashCode());
		result = prime
				* result
				+ ((bizOrderDispName == null) ? 0 : bizOrderDispName.hashCode());
		result = prime * result
				+ ((bizOrderId == null) ? 0 : bizOrderId.hashCode());
		result = prime * result
				+ ((bizOrderNumber == null) ? 0 : bizOrderNumber.hashCode());
		result = prime * result
				+ ((bizOrderStatus == null) ? 0 : bizOrderStatus.hashCode());
		result = prime
				* result
				+ ((bizOrderSubStatus == null) ? 0 : bizOrderSubStatus
						.hashCode());
		result = prime * result
				+ ((bizOrderType == null) ? 0 : bizOrderType.hashCode());
		result = prime * result
				+ ((changedAmount == null) ? 0 : changedAmount.hashCode());
		result = prime * result + ((channel == null) ? 0 : channel.hashCode());
		result = prime * result
				+ ((createDeptId == null) ? 0 : createDeptId.hashCode());
		result = prime * result
				+ ((createTime == null) ? 0 : createTime.hashCode());
		result = prime * result
				+ ((createUser == null) ? 0 : createUser.hashCode());
		result = prime * result
				+ ((cusDelivery == null) ? 0 : cusDelivery.hashCode());
		result = prime * result
				+ ((custContPerson == null) ? 0 : custContPerson.hashCode());
		result = prime * result
				+ ((custContPhone == null) ? 0 : custContPhone.hashCode());
		result = prime * result + ((custId == null) ? 0 : custId.hashCode());
		result = prime * result
				+ ((discount == null) ? 0 : discount.hashCode());
		result = prime
				* result
				+ ((discountAfterSubtotal == null) ? 0 : discountAfterSubtotal
						.hashCode());
		result = prime
				* result
				+ ((discountForeSubtotal == null) ? 0 : discountForeSubtotal
						.hashCode());
		result = prime * result
				+ ((employeeNo == null) ? 0 : employeeNo.hashCode());
		result = prime * result + ((ext1 == null) ? 0 : ext1.hashCode());
		result = prime * result + ((ext10 == null) ? 0 : ext10.hashCode());
		result = prime * result + ((ext11 == null) ? 0 : ext11.hashCode());
		result = prime * result + ((ext12 == null) ? 0 : ext12.hashCode());
		result = prime * result + ((ext13 == null) ? 0 : ext13.hashCode());
		result = prime * result + ((ext14 == null) ? 0 : ext14.hashCode());
		result = prime * result + ((ext15 == null) ? 0 : ext15.hashCode());
		result = prime * result + ((ext16 == null) ? 0 : ext16.hashCode());
		result = prime * result + ((ext17 == null) ? 0 : ext17.hashCode());
		result = prime * result + ((ext18 == null) ? 0 : ext18.hashCode());
		result = prime * result + ((ext19 == null) ? 0 : ext19.hashCode());
		result = prime * result + ((ext2 == null) ? 0 : ext2.hashCode());
		result = prime * result + ((ext20 == null) ? 0 : ext20.hashCode());
		result = prime * result + ((ext3 == null) ? 0 : ext3.hashCode());
		result = prime * result + ((ext4 == null) ? 0 : ext4.hashCode());
		result = prime * result + ((ext5 == null) ? 0 : ext5.hashCode());
		result = prime * result + ((ext6 == null) ? 0 : ext6.hashCode());
		result = prime * result + ((ext7 == null) ? 0 : ext7.hashCode());
		result = prime * result + ((ext8 == null) ? 0 : ext8.hashCode());
		result = prime * result + ((ext9 == null) ? 0 : ext9.hashCode());
		result = prime * result
				+ ((factTotalCount == null) ? 0 : factTotalCount.hashCode());
		result = prime
				* result
				+ ((factTotalInAmount == null) ? 0 : factTotalInAmount
						.hashCode());
		result = prime
				* result
				+ ((factTotalOutAmount == null) ? 0 : factTotalOutAmount
						.hashCode());
		result = prime * result
				+ ((finishTime == null) ? 0 : finishTime.hashCode());
		result = prime
				* result
				+ ((masterBizOrderId == null) ? 0 : masterBizOrderId.hashCode());
		result = prime * result
				+ ((nodeName == null) ? 0 : nodeName.hashCode());
		result = prime * result
				+ ((planInAmount == null) ? 0 : planInAmount.hashCode());
		result = prime * result
				+ ((planOutAmount == null) ? 0 : planOutAmount.hashCode());
		result = prime * result + ((runid == null) ? 0 : runid.hashCode());
		result = prime * result
				+ ((salesDeptId == null) ? 0 : salesDeptId.hashCode());
		result = prime * result
				+ ((salesDesc == null) ? 0 : salesDesc.hashCode());
		result = prime * result
				+ ((salesModelType == null) ? 0 : salesModelType.hashCode());
		result = prime * result
				+ ((salesUserId == null) ? 0 : salesUserId.hashCode());
		result = prime * result
				+ ((scBizOrderFees == null) ? 0 : scBizOrderFees.hashCode());
		result = prime
				* result
				+ ((scBizSalesDetails == null) ? 0 : scBizSalesDetails
						.hashCode());
		result = prime * result
				+ ((totalCount == null) ? 0 : totalCount.hashCode());
		result = prime * result
				+ ((totalInAmount == null) ? 0 : totalInAmount.hashCode());
		result = prime * result
				+ ((totalOutAmount == null) ? 0 : totalOutAmount.hashCode());
		result = prime * result
				+ ((updateTime == null) ? 0 : updateTime.hashCode());
		return result;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("bizOrderId", this.bizOrderId)
				.append("bizOrderType", this.bizOrderType)
				.append("bizOrderDispName", this.bizOrderDispName)
				.append("alertTime", this.alertTime)
				.append("masterBizOrderId", this.masterBizOrderId)
				.append("totalOutAmount", this.totalOutAmount)
				.append("totalInAmount", this.totalInAmount)
				.append("totalCount", this.totalCount)
				.append("createUser", this.createUser)
				.append("factTotalOutAmount", this.factTotalOutAmount)
				.append("factTotalInAmount", this.factTotalInAmount)
				.append("factTotalCount", this.factTotalCount)
				.append("planOutAmount", this.planOutAmount)
				.append("planInAmount", this.planInAmount)
				.append("createTime", this.createTime)
				.append("approvedUserId", this.approvedUserId)
				.append("updateTime", this.updateTime)
				.append("createDeptId", this.createDeptId)
				.append("salesUserId", this.salesUserId)
				.append("salesDeptId", this.salesDeptId)
				.append("custContPerson", this.custContPerson)
				.append("custContPhone", this.custContPhone)
				.append("finishTime", this.finishTime)
				.append("custId", this.custId)
				.append("discountForeSubtotal", this.discountForeSubtotal)
				.append("discount", this.discount)
				.append("changedAmount", this.changedAmount)
				.append("discountAfterSubtotal", this.discountAfterSubtotal)
				.append("bizOrderDesc", this.bizOrderDesc)
				.append("bizOrderStatus", this.bizOrderStatus)
				.append("bizOrderSubStatus", this.bizOrderSubStatus)
				.append("salesModelType", this.salesModelType)
				.append("desc", this.salesDesc).append("ext1", this.ext1)
				.append("ext2", this.ext2).append("ext3", this.ext3)
				.append("ext4", this.ext4).append("ext5", this.ext5)
				.append("ext6", this.ext6).append("ext7", this.ext7)
				.append("ext8", this.ext8).append("ext9", this.ext9)
				.append("ext10", this.ext10).append("ext11", this.ext11)
				.append("ext12", this.ext12).append("ext13", this.ext13)
				.append("ext14", this.ext14).append("ext15", this.ext15)
				.append("ext16", this.ext16).append("ext17", this.ext17)
				.append("ext18", this.ext18).append("ext19", this.ext19)
				.append("ext20", this.ext20).append("runid", this.runid)
				.append("nodeName", this.nodeName)
				.append("approvalStatus", this.approvalStatus).toString();
	}

}
