package com.ulane.supply.model.stock;
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
 * ScBizOrderStock Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ScBizOrderStock extends com.htsoft.core.model.BaseModel {

    protected Long bizOrderId;
	protected Short bizOrderType;
	protected String bizOrderDispName;
	protected java.util.Date alertTime;
	protected Long masterBizOrderId;
	protected java.math.BigDecimal totalOutAmount;
	protected java.math.BigDecimal totalInAmount;
	protected java.math.BigDecimal totalCount;
	protected Long createUserId;
	protected java.math.BigDecimal factTotalOutAmount;
	protected java.math.BigDecimal factTotalInAmount;
	protected java.math.BigDecimal factTotalCount;
	protected java.math.BigDecimal planOutAmount;
	protected java.math.BigDecimal planInAmount;
	protected java.util.Date createTime;
	protected Long approvedUserId;
	protected java.util.Date updateTime;
	protected Long createDeptId;
	protected Long salesUserId;
	protected Long salesDeptId;
	protected String custContPerson;
	protected String custContPhone;
	protected java.util.Date finishTime;
	protected Long custId;
	protected Long warehouseId;
	protected String bizOrderRelationType;
	protected String bizOrderDesc;
	protected Short bizOrderStatus;
	protected Short bizOrderSubStatus;
	protected Short stockModelType;
	protected String desc;
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
	protected java.math.BigDecimal ext11;
	protected java.math.BigDecimal ext12;
	protected java.math.BigDecimal ext13;
	protected java.math.BigDecimal ext14;
	protected java.math.BigDecimal ext15;
	protected java.util.Date ext16;
	protected java.util.Date ext17;
	protected java.util.Date ext18;
	protected java.util.Date ext19;
	protected java.util.Date ext20;

	protected java.util.Set scBoStockDetails = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ScBizOrderStock
	 */
	public ScBizOrderStock () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ScBizOrderStock
	 */
	public ScBizOrderStock (
		 Long in_bizOrderId
        ) {
		this.setBizOrderId(in_bizOrderId);
    }


	public java.util.Set getScBoStockDetails () {
		return scBoStockDetails;
	}	
	
	public void setScBoStockDetails (java.util.Set in_scBoStockDetails) {
		this.scBoStockDetails = in_scBoStockDetails;
	}
    

	/**
	 * 业务单内码	 * @return Long
     * @hibernate.id column="BIZ_ORDER_ID" type="java.lang.Long" generator-class="native"
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
	 * 业务单类型：&CON_T_BO_TYPE	 * @return Short
	 * @hibernate.property column="BIZ_ORDER_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
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
	 * 业务单显示名称	 * @return String
	 * @hibernate.property column="BIZ_ORDER_DISP_NAME" type="java.lang.String" length="500" not-null="false" unique="false"
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
	 * 预警时间	 * @return java.util.Date
	 * @hibernate.property column="ALERT_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 主业务单内码	 * @return Long
	 * @hibernate.property column="MASTER_BIZ_ORDER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
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
	 * 应支出总费用	 * @return java.math.BigDecimal
	 * @hibernate.property column="TOTAL_OUT_AMOUNT" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getTotalOutAmount() {
		return this.totalOutAmount;
	}
	
	/**
	 * Set the totalOutAmount
	 * @spring.validator type="required"
	 */	
	public void setTotalOutAmount(java.math.BigDecimal aValue) {
		this.totalOutAmount = aValue;
	}	

	/**
	 * 应收入总费用	 * @return java.math.BigDecimal
	 * @hibernate.property column="TOTAL_IN_AMOUNT" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getTotalInAmount() {
		return this.totalInAmount;
	}
	
	/**
	 * Set the totalInAmount
	 * @spring.validator type="required"
	 */	
	public void setTotalInAmount(java.math.BigDecimal aValue) {
		this.totalInAmount = aValue;
	}	

	/**
	 * 应发生总数量	 * @return java.math.BigDecimal
	 * @hibernate.property column="TOTAL_COUNT" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getTotalCount() {
		return this.totalCount;
	}
	
	/**
	 * Set the totalCount
	 */	
	public void setTotalCount(java.math.BigDecimal aValue) {
		this.totalCount = aValue;
	}	

	/**
	 * 创建用户内码	 * @return Long
	 * @hibernate.property column="CREATE_USER_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getCreateUserId() {
		return this.createUserId;
	}
	
	/**
	 * Set the createUserId
	 * @spring.validator type="required"
	 */	
	public void setCreateUserId(Long aValue) {
		this.createUserId = aValue;
	}	

	/**
	 * 已支出总费用	 * @return java.math.BigDecimal
	 * @hibernate.property column="FACT_TOTAL_OUT_AMOUNT" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getFactTotalOutAmount() {
		return this.factTotalOutAmount;
	}
	
	/**
	 * Set the factTotalOutAmount
	 * @spring.validator type="required"
	 */	
	public void setFactTotalOutAmount(java.math.BigDecimal aValue) {
		this.factTotalOutAmount = aValue;
	}	

	/**
	 * 已收入总费用	 * @return java.math.BigDecimal
	 * @hibernate.property column="FACT_TOTAL_IN_AMOUNT" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getFactTotalInAmount() {
		return this.factTotalInAmount;
	}
	
	/**
	 * Set the factTotalInAmount
	 * @spring.validator type="required"
	 */	
	public void setFactTotalInAmount(java.math.BigDecimal aValue) {
		this.factTotalInAmount = aValue;
	}	

	/**
	 * 已发生数量	 * @return java.math.BigDecimal
	 * @hibernate.property column="FACT_TOTAL_COUNT" type="java.math.BigDecimal" length="15" not-null="true" unique="false"
	 */
	public java.math.BigDecimal getFactTotalCount() {
		return this.factTotalCount;
	}
	
	/**
	 * Set the factTotalCount
	 * @spring.validator type="required"
	 */	
	public void setFactTotalCount(java.math.BigDecimal aValue) {
		this.factTotalCount = aValue;
	}	

	/**
	 * 计划支出总费用	 * @return java.math.BigDecimal
	 * @hibernate.property column="PLAN_OUT_AMOUNT" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
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
	 * 计划收入总费用	 * @return java.math.BigDecimal
	 * @hibernate.property column="PLAN_IN_AMOUNT" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
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
	 * 生成时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_TIME" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getCreateTime() {
		return this.createTime;
	}
	
	/**
	 * Set the createTime
	 * @spring.validator type="required"
	 */	
	public void setCreateTime(java.util.Date aValue) {
		this.createTime = aValue;
	}	

	/**
	 * 审批用户内码	 * @return Long
	 * @hibernate.property column="APPROVED_USER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
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
	 * 更新时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}
	
	/**
	 * Set the updateTime
	 * @spring.validator type="required"
	 */	
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}	

	/**
	 * 创建用户部门内码	 * @return Long
	 * @hibernate.property column="CREATE_DEPT_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
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
	 * 销售用户内码	 * @return Long
	 * @hibernate.property column="SALES_USER_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
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
	 * 销售用户部门内码	 * @return Long
	 * @hibernate.property column="SALES_DEPT_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
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
	 * 客户联系人	 * @return String
	 * @hibernate.property column="CUST_CONT_PERSON" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 客户联系电话	 * @return String
	 * @hibernate.property column="CUST_CONT_PHONE" type="java.lang.String" length="20" not-null="false" unique="false"
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
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="FINISH_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 客户内码	 * @return Long
	 * @hibernate.property column="CUST_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
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
	 * 仓库内码	 * @return Long
	 * @hibernate.property column="WAREHOUSE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getWarehouseId() {
		return this.warehouseId;
	}
	
	/**
	 * Set the warehouseId
	 */	
	public void setWarehouseId(Long aValue) {
		this.warehouseId = aValue;
	}	

	/**
	 * 业务单关联类型	 * @return String
	 * @hibernate.property column="BIZ_ORDER_RELATION_TYPE" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getBizOrderRelationType() {
		return this.bizOrderRelationType;
	}
	
	/**
	 * Set the bizOrderRelationType
	 */	
	public void setBizOrderRelationType(String aValue) {
		this.bizOrderRelationType = aValue;
	}	

	/**
	 * 业务单描述	 * @return String
	 * @hibernate.property column="BIZ_ORDER_DESC" type="java.lang.String" length="500" not-null="false" unique="false"
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
	 * 业务单状态0--已生成、1--审核中、2--执行中、3--完成、4--回退中、5--注销、6--关闭&CON_T_BO_STATUS	 * @return Short
	 * @hibernate.property column="BIZ_ORDER_STATUS" type="java.lang.Short" length="5" not-null="false" unique="false"
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
	 * 业务单子状态0--未付款、1--已付款、2--部分付款、3--正在入库、4--已收货等&CON_T_BO_SUB_STATUS	 * @return Short
	 * @hibernate.property column="BIZ_ORDER_SUB_STATUS" type="java.lang.Short" length="5" not-null="false" unique="false"
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
	 * 库存模式&CON_T_STOCK_MODEL	 * @return Short
	 * @hibernate.property column="STOCK_MODEL_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getStockModelType() {
		return this.stockModelType;
	}
	
	/**
	 * Set the stockModelType
	 */	
	public void setStockModelType(Short aValue) {
		this.stockModelType = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="DESC" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getDesc() {
		return this.desc;
	}
	
	/**
	 * Set the desc
	 */	
	public void setDesc(String aValue) {
		this.desc = aValue;
	}	

	/**
	 * 扩展1	 * @return String
	 * @hibernate.property column="EXT_1" type="java.lang.String" length="60" not-null="false" unique="false"
	 */
	public String getExt1() {
		return this.ext1;
	}
	
	/**
	 * Set the ext1
	 */	
	public void setExt1(String aValue) {
		this.ext1 = aValue;
	}	

	/**
	 * 扩展2	 * @return String
	 * @hibernate.property column="EXT_2" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展3	 * @return String
	 * @hibernate.property column="EXT_3" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展4	 * @return String
	 * @hibernate.property column="EXT_4" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展5	 * @return String
	 * @hibernate.property column="EXT_5" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展6	 * @return String
	 * @hibernate.property column="EXT_6" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展7	 * @return String
	 * @hibernate.property column="EXT_7" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展8	 * @return String
	 * @hibernate.property column="EXT_8" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展9	 * @return String
	 * @hibernate.property column="EXT_9" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展10	 * @return String
	 * @hibernate.property column="EXT_10" type="java.lang.String" length="60" not-null="false" unique="false"
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
	 * 扩展11	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_11" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
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
	 * 扩展12	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_12" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
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
	 * 扩展13	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_13" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
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
	 * 扩展14	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_14" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
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
	 * 扩展15	 * @return java.math.BigDecimal
	 * @hibernate.property column="EXT_15" type="java.math.BigDecimal" length="15" not-null="false" unique="false"
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
	 * 扩展16	 * @return java.util.Date
	 * @hibernate.property column="EXT_16" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 扩展17	 * @return java.util.Date
	 * @hibernate.property column="EXT_17" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 扩展18	 * @return java.util.Date
	 * @hibernate.property column="EXT_18" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 扩展19	 * @return java.util.Date
	 * @hibernate.property column="EXT_19" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 扩展20	 * @return java.util.Date
	 * @hibernate.property column="EXT_20" type="java.util.Date" length="7" not-null="false" unique="false"
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

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ScBizOrderStock)) {
			return false;
		}
		ScBizOrderStock rhs = (ScBizOrderStock) object;
		return new EqualsBuilder()
				.append(this.bizOrderId, rhs.bizOrderId)
				.append(this.bizOrderType, rhs.bizOrderType)
				.append(this.bizOrderDispName, rhs.bizOrderDispName)
				.append(this.alertTime, rhs.alertTime)
				.append(this.masterBizOrderId, rhs.masterBizOrderId)
				.append(this.totalOutAmount, rhs.totalOutAmount)
				.append(this.totalInAmount, rhs.totalInAmount)
				.append(this.totalCount, rhs.totalCount)
				.append(this.createUserId, rhs.createUserId)
				.append(this.factTotalOutAmount, rhs.factTotalOutAmount)
				.append(this.factTotalInAmount, rhs.factTotalInAmount)
				.append(this.factTotalCount, rhs.factTotalCount)
				.append(this.planOutAmount, rhs.planOutAmount)
				.append(this.planInAmount, rhs.planInAmount)
				.append(this.createTime, rhs.createTime)
				.append(this.approvedUserId, rhs.approvedUserId)
				.append(this.updateTime, rhs.updateTime)
				.append(this.createDeptId, rhs.createDeptId)
				.append(this.salesUserId, rhs.salesUserId)
				.append(this.salesDeptId, rhs.salesDeptId)
				.append(this.custContPerson, rhs.custContPerson)
				.append(this.custContPhone, rhs.custContPhone)
				.append(this.finishTime, rhs.finishTime)
				.append(this.custId, rhs.custId)
				.append(this.warehouseId, rhs.warehouseId)
				.append(this.bizOrderRelationType, rhs.bizOrderRelationType)
				.append(this.bizOrderDesc, rhs.bizOrderDesc)
				.append(this.bizOrderStatus, rhs.bizOrderStatus)
				.append(this.bizOrderSubStatus, rhs.bizOrderSubStatus)
				.append(this.stockModelType, rhs.stockModelType)
				.append(this.desc, rhs.desc)
				.append(this.ext1, rhs.ext1)
				.append(this.ext2, rhs.ext2)
				.append(this.ext3, rhs.ext3)
				.append(this.ext4, rhs.ext4)
				.append(this.ext5, rhs.ext5)
				.append(this.ext6, rhs.ext6)
				.append(this.ext7, rhs.ext7)
				.append(this.ext8, rhs.ext8)
				.append(this.ext9, rhs.ext9)
				.append(this.ext10, rhs.ext10)
				.append(this.ext11, rhs.ext11)
				.append(this.ext12, rhs.ext12)
				.append(this.ext13, rhs.ext13)
				.append(this.ext14, rhs.ext14)
				.append(this.ext15, rhs.ext15)
				.append(this.ext16, rhs.ext16)
				.append(this.ext17, rhs.ext17)
				.append(this.ext18, rhs.ext18)
				.append(this.ext19, rhs.ext19)
				.append(this.ext20, rhs.ext20)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bizOrderId) 
				.append(this.bizOrderType) 
				.append(this.bizOrderDispName) 
				.append(this.alertTime) 
				.append(this.masterBizOrderId) 
				.append(this.totalOutAmount) 
				.append(this.totalInAmount) 
				.append(this.totalCount) 
				.append(this.createUserId) 
				.append(this.factTotalOutAmount) 
				.append(this.factTotalInAmount) 
				.append(this.factTotalCount) 
				.append(this.planOutAmount) 
				.append(this.planInAmount) 
				.append(this.createTime) 
				.append(this.approvedUserId) 
				.append(this.updateTime) 
				.append(this.createDeptId) 
				.append(this.salesUserId) 
				.append(this.salesDeptId) 
				.append(this.custContPerson) 
				.append(this.custContPhone) 
				.append(this.finishTime) 
				.append(this.custId) 
				.append(this.warehouseId) 
				.append(this.bizOrderRelationType) 
				.append(this.bizOrderDesc) 
				.append(this.bizOrderStatus) 
				.append(this.bizOrderSubStatus) 
				.append(this.stockModelType) 
				.append(this.desc) 
				.append(this.ext1) 
				.append(this.ext2) 
				.append(this.ext3) 
				.append(this.ext4) 
				.append(this.ext5) 
				.append(this.ext6) 
				.append(this.ext7) 
				.append(this.ext8) 
				.append(this.ext9) 
				.append(this.ext10) 
				.append(this.ext11) 
				.append(this.ext12) 
				.append(this.ext13) 
				.append(this.ext14) 
				.append(this.ext15) 
				.append(this.ext16) 
				.append(this.ext17) 
				.append(this.ext18) 
				.append(this.ext19) 
				.append(this.ext20) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bizOrderId", this.bizOrderId) 
				.append("bizOrderType", this.bizOrderType) 
				.append("bizOrderDispName", this.bizOrderDispName) 
				.append("alertTime", this.alertTime) 
				.append("masterBizOrderId", this.masterBizOrderId) 
				.append("totalOutAmount", this.totalOutAmount) 
				.append("totalInAmount", this.totalInAmount) 
				.append("totalCount", this.totalCount) 
				.append("createUserId", this.createUserId) 
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
				.append("warehouseId", this.warehouseId) 
				.append("bizOrderRelationType", this.bizOrderRelationType) 
				.append("bizOrderDesc", this.bizOrderDesc) 
				.append("bizOrderStatus", this.bizOrderStatus) 
				.append("bizOrderSubStatus", this.bizOrderSubStatus) 
				.append("stockModelType", this.stockModelType) 
				.append("desc", this.desc) 
				.append("ext1", this.ext1) 
				.append("ext2", this.ext2) 
				.append("ext3", this.ext3) 
				.append("ext4", this.ext4) 
				.append("ext5", this.ext5) 
				.append("ext6", this.ext6) 
				.append("ext7", this.ext7) 
				.append("ext8", this.ext8) 
				.append("ext9", this.ext9) 
				.append("ext10", this.ext10) 
				.append("ext11", this.ext11) 
				.append("ext12", this.ext12) 
				.append("ext13", this.ext13) 
				.append("ext14", this.ext14) 
				.append("ext15", this.ext15) 
				.append("ext16", this.ext16) 
				.append("ext17", this.ext17) 
				.append("ext18", this.ext18) 
				.append("ext19", this.ext19) 
				.append("ext20", this.ext20) 
				.toString();
	}



}
