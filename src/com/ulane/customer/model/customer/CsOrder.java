package com.ulane.customer.model.customer;
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

import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Region;
import com.ulane.base.model.xitong.UlDepartment;

/**
 * CsOrder Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CsOrder extends com.htsoft.core.model.BaseModel {

    protected Long orderId;
	protected Short orderType; //类型
	protected String customerName;  //客户姓名
	protected Short customerGender; //客户性别
	protected Short customerGrade; //客户等级
	protected String customerNo;  //客户号码
	protected String contacta;	//联系方式1
	protected String contactb;  //联系方式2
	protected Short orderSorce;  //工单来源
	protected Short order;	//工单类型
	protected Short orderProject;	//工单项目
	protected Short level;	//投诉等级
	protected java.util.Date responseTime;	//要求响应时间
	protected java.util.Date completionTime;	//要求完成时间
	protected String content;	//内容
	protected String noteAppeal;	//备注或诉求
	protected Short detailType;	//附属单据类型
	protected Long detailId;	//附属单据内码
	protected Long runid;	//工作流ID
	protected String nodeName;	//审批节点名称
	protected String approvalStatus;	//审批状态
	protected java.util.Date orderTime;	//发起时间
	protected AppUser appUser;
	protected Customer customer;
	protected Region region;	//区域
	protected UlDepartment ulDepartment;
	//新增 工单编号
	protected String orderNum;

	//接口新增临时变量
	protected String ulDepartmentNo;
	protected String appUserNo;
	protected String regionNo;
	
	/**
	 * Default Empty Constructor for class CsOrder
	 */
	public CsOrder () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CsOrder
	 */
	public CsOrder (
		 Long in_orderId
        ) {
		this.setOrderId(in_orderId);
    }
	
	public String getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}

	public String getUlDepartmentNo() {
		return ulDepartmentNo;
	}

	public void setUlDepartmentNo(String ulDepartmentNo) {
		this.ulDepartmentNo = ulDepartmentNo;
	}

	public String getAppUserNo() {
		return appUserNo;
	}

	public void setAppUserNo(String appUserNo) {
		this.appUserNo = appUserNo;
	}

	public String getRegionNo() {
		return regionNo;
	}

	public void setRegionNo(String regionNo) {
		this.regionNo = regionNo;
	}

	public AppUser getAppUser () {
		return appUser;
	}	
	
	public void setAppUser (AppUser in_appUser) {
		this.appUser = in_appUser;
	}
	
	public Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (Customer in_customer) {
		this.customer = in_customer;
	}
	
	public Region getRegion () {
		return region;
	}	
	
	public void setRegion (Region in_region) {
		this.region = in_region;
	}
	
	public UlDepartment getUlDepartment () {
		return ulDepartment;
	}	
	
	public void setUlDepartment (UlDepartment in_ulDepartment) {
		this.ulDepartment = in_ulDepartment;
	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="ORDER_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getOrderId() {
		return this.orderId;
	}
	
	/**
	 * Set the orderId
	 */	
	public void setOrderId(Long aValue) {
		this.orderId = aValue;
	}	

	/**
	 * 类型	 * @return Short
	 * @hibernate.property column="ORDER_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getOrderType() {
		return this.orderType;
	}
	
	/**
	 * Set the orderType
	 */	
	public void setOrderType(Short aValue) {
		this.orderType = aValue;
	}	

	/**
	 * 客户内码	 * @return Long
	 */
	public Long getCustomerid() {
		return this.getCustomer()==null?null:this.getCustomer().getCustomerId();
	}
	
	/**
	 * Set the customerid
	 */	
	public void setCustomerid(Long aValue) {
	    if (aValue==null) {
	    	customer = null;
	    } else if (customer == null) {
	        customer = new Customer(aValue);
	        customer.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			customer.setCustomerId(aValue);
	    }
	}	

	/**
	 * 客户姓名	 * @return String
	 * @hibernate.property column="CUSTOMER_NAME" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getCustomerName() {
		return this.customerName;
	}
	
	/**
	 * Set the customerName
	 */	
	public void setCustomerName(String aValue) {
		this.customerName = aValue;
	}	

	/**
	 * 客户性别	 * @return Short
	 * @hibernate.property column="CUSTOMER_GENDER" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCustomerGender() {
		return this.customerGender;
	}
	
	/**
	 * Set the customerGender
	 */	
	public void setCustomerGender(Short aValue) {
		this.customerGender = aValue;
	}	

	public Short getCustomerGrade() {
		return customerGrade;
	}

	public void setCustomerGrade(Short customerGrade) {
		this.customerGrade = customerGrade;
	}

	/**
	 * 接单部门内码	 * @return Long
	 */
	public Long getDepid() {
		return this.getUlDepartment()==null?null:this.getUlDepartment().getDepid();
	}
	
	/**
	 * Set the depid
	 */	
	public void setDepid(Long aValue) {
	    if (aValue==null) {
	    	ulDepartment = null;
	    } else if (ulDepartment == null) {
	        ulDepartment = new UlDepartment(aValue);
	        ulDepartment.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			ulDepartment.setDepid(aValue);
	    }
	}	

	/**
	 * 发起人	 * @return Long
	 */
	public Long getUserid() {
		return this.getAppUser()==null?null:this.getAppUser().getUserId();
	}
	
	/**
	 * Set the userid
	 */	
	public void setUserid(Long aValue) {
	    if (aValue==null) {
	    	appUser = null;
	    } else if (appUser == null) {
	        appUser = new AppUser(aValue);
	        appUser.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			appUser.setUserId(aValue);
	    }
	}	

	/**
	 * 地区	 * @return Long
	 */
	public Long getRegionid() {
		return this.getRegion()==null?null:this.getRegion().getRegionId();
	}
	
	/**
	 * Set the regionid
	 */	
	public void setRegionid(Long aValue) {
	    if (aValue==null) {
	    	region = null;
	    } else if (region == null) {
	        region = new Region(aValue);
	        region.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			region.setRegionId(aValue);
	    }
	}	

	/**
	 * 客户号码	 * @return String
	 * @hibernate.property column="CUSTOMER_NO" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getCustomerNo() {
		return this.customerNo;
	}
	
	/**
	 * Set the customerNo
	 */	
	public void setCustomerNo(String aValue) {
		this.customerNo = aValue;
	}	

	/**
	 * 联系方式1	 * @return String
	 * @hibernate.property column="CONTACTA" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getContacta() {
		return this.contacta;
	}
	
	/**
	 * Set the contacta
	 */	
	public void setContacta(String aValue) {
		this.contacta = aValue;
	}	

	/**
	 * 联系方式2	 * @return String
	 * @hibernate.property column="CONTACTB" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getContactb() {
		return this.contactb;
	}
	
	/**
	 * Set the contactb
	 */	
	public void setContactb(String aValue) {
		this.contactb = aValue;
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
	 * @hibernate.property column="LEVEL" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getLevel() {
		return this.level;
	}
	
	/**
	 * Set the level
	 */	
	public void setLevel(Short aValue) {
		this.level = aValue;
	}	

	/**
	 * 要求响应时间	 * @return java.util.Date
	 * @hibernate.property column="RESPONSE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getResponseTime() {
		return this.responseTime;
	}
	
	/**
	 * Set the responseTime
	 */	
	public void setResponseTime(java.util.Date aValue) {
		this.responseTime = aValue;
	}	

	/**
	 * 要求完成时间	 * @return java.util.Date
	 * @hibernate.property column="COMPLETION_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCompletionTime() {
		return this.completionTime;
	}
	
	/**
	 * Set the completionTime
	 */	
	public void setCompletionTime(java.util.Date aValue) {
		this.completionTime = aValue;
	}	

	/**
	 * 内容	 * @return String
	 * @hibernate.property column="CONTENT" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getContent() {
		return this.content;
	}
	
	/**
	 * Set the content
	 */	
	public void setContent(String aValue) {
		this.content = aValue;
	}	

	/**
	 * 备注或诉求	 * @return String
	 * @hibernate.property column="NOTE_APPEAL" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getNoteAppeal() {
		return this.noteAppeal;
	}
	
	/**
	 * Set the noteAppeal
	 */	
	public void setNoteAppeal(String aValue) {
		this.noteAppeal = aValue;
	}	

	/**
	 * 附属单据类型	 * @return Short
	 * @hibernate.property column="DETAIL_TYPE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getDetailType() {
		return this.detailType;
	}
	
	/**
	 * Set the detailType
	 */	
	public void setDetailType(Short aValue) {
		this.detailType = aValue;
	}	

	/**
	 * 附属单据内码	 * @return Long
	 * @hibernate.property column="DETAIL_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getDetailId() {
		return this.detailId;
	}
	
	/**
	 * Set the detailId
	 */	
	public void setDetailId(Long aValue) {
		this.detailId = aValue;
	}	

	/**
	 * RUNID	 * @return Long
	 * @hibernate.property column="RUNID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getRunid() {
		return this.runid;
	}
	
	/**
	 * Set the runid
	 */	
	public void setRunid(Long aValue) {
		this.runid = aValue;
	}	

	/**
	 * 审批节点名称	 * @return String
	 * @hibernate.property column="NODE_NAME" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getNodeName() {
		return this.nodeName;
	}
	
	/**
	 * Set the nodeName
	 */	
	public void setNodeName(String aValue) {
		this.nodeName = aValue;
	}	

	/**
	 * 审批状态	 * @return String
	 * @hibernate.property column="APPROVAL_STATUS" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getApprovalStatus() {
		return this.approvalStatus;
	}
	
	/**
	 * Set the approvalStatus
	 */	
	public void setApprovalStatus(String aValue) {
		this.approvalStatus = aValue;
	}	

	/**
	 * 发起时间	 * @return java.util.Date
	 * @hibernate.property column="ORDER_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getOrderTime() {
		return this.orderTime;
	}
	
	/**
	 * Set the orderTime
	 */	
	public void setOrderTime(java.util.Date aValue) {
		this.orderTime = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CsOrder)) {
			return false;
		}
		CsOrder rhs = (CsOrder) object;
		return new EqualsBuilder()
				.append(this.orderId, rhs.orderId)
				.append(this.orderType, rhs.orderType)
						.append(this.customerName, rhs.customerName)
				.append(this.customerGender, rhs.customerGender)
										.append(this.customerNo, rhs.customerNo)
				.append(this.contacta, rhs.contacta)
				.append(this.contactb, rhs.contactb)
				.append(this.orderSorce, rhs.orderSorce)
				.append(this.order, rhs.order)
				.append(this.orderProject, rhs.orderProject)
				.append(this.level, rhs.level)
				.append(this.responseTime, rhs.responseTime)
				.append(this.completionTime, rhs.completionTime)
				.append(this.content, rhs.content)
				.append(this.noteAppeal, rhs.noteAppeal)
				.append(this.detailType, rhs.detailType)
				.append(this.detailId, rhs.detailId)
				.append(this.runid, rhs.runid)
				.append(this.nodeName, rhs.nodeName)
				.append(this.approvalStatus, rhs.approvalStatus)
				.append(this.orderTime, rhs.orderTime)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.orderId) 
				.append(this.orderType) 
						.append(this.customerName) 
				.append(this.customerGender) 
										.append(this.customerNo) 
				.append(this.contacta) 
				.append(this.contactb) 
				.append(this.orderSorce) 
				.append(this.order) 
				.append(this.orderProject) 
				.append(this.level) 
				.append(this.responseTime) 
				.append(this.completionTime) 
				.append(this.content) 
				.append(this.noteAppeal) 
				.append(this.detailType) 
				.append(this.detailId) 
				.append(this.runid) 
				.append(this.nodeName) 
				.append(this.approvalStatus) 
				.append(this.orderTime) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("orderId", this.orderId) 
				.append("orderType", this.orderType) 
						.append("customerName", this.customerName) 
				.append("customerGender", this.customerGender) 
										.append("customerNo", this.customerNo) 
				.append("contacta", this.contacta) 
				.append("contactb", this.contactb) 
				.append("orderSorce", this.orderSorce) 
				.append("order", this.order) 
				.append("orderProject", this.orderProject) 
				.append("level", this.level) 
				.append("responseTime", this.responseTime) 
				.append("completionTime", this.completionTime) 
				.append("content", this.content) 
				.append("noteAppeal", this.noteAppeal) 
				.append("detailType", this.detailType) 
				.append("detailId", this.detailId) 
				.append("runid", this.runid) 
				.append("nodeName", this.nodeName) 
				.append("approvalStatus", this.approvalStatus) 
				.append("orderTime", this.orderTime) 
				.toString();
	}



}
