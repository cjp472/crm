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

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ConHis extends com.htsoft.core.model.BaseModel {

    protected Long conHisId;
    //来源类别       1代表服务请求   字典：SYSSSOURCE  活动的没有加，需要找数据字典对应的
	protected Short srcTypeId;	
	//方向       数据字典CONFX  :		1呼入      2  呼出
	protected Short dirId;	
	
	protected Long planId; //任务id
	//来源id   对应任务里的sourceId
	protected Long serviceId; 
	
	protected Short dealStaId;	//处理结果    联络状态对应数据字典：CON_REQ_SUBSTATUS
	
	protected Short busTypId;	//联络事项    对应联系小结的事项
	
	protected Short conResId;	//联络结果   注： 只有呼出有这个字段，呼入暂时不用（结果有： 连通、挂机等）
	
	protected Short contactTypeId;	//联系类型		数据字典 ： LXFS001     1代表电话
	
	protected String preContactNum;	//区号或地区号
	
	protected String mainContactNum;	//号码或详细地址
	
	protected String lastContactNum;	//分机号、邮编
	
	protected java.util.Date staTime;	//开始时间
	
	protected java.util.Date endTime;	//结束时间
	
	protected String conResRemarks;	//联络结果备注
	
	protected String content;	//联络内容
	
	protected String remarks;	//备注
	
	protected Integer ownerId;	//负责人
	
	protected Short statusId;	//状态
	//下面三个是北京银行新增加属性
	protected String cusName;	//客户名称
	protected String credNum;	//证件号
	protected String serialNum; //流水号
	protected String agentName; //座席员号
	
	protected com.htsoft.oa.model.customer.Customer customer;
	protected com.htsoft.oa.model.customer.CusLinkman cusLinkman;
	protected com.htsoft.oa.model.system.AppUser owner;
	//对应的数据字典名称是：CONFX
	public static final Short DIR_IN 	= 1;				//呼入
	public static final Short DIR_OUT	= 2;				//呼出
	public static final Short DIR_INNER	= 3;				//内部
	
	public static final Short STA_EXECUTING		= 0;	//处理中
	public static final Short STA_FINISH		= 1;	//完成
	public static final Short STA_FAILURE		= 2;	//失败
	
	public static final Short SRC_TYPE_CUS_SERVER = 1;		//客户服务中心
	public static final Short SRC_TYPE_CUS_MARKET = 2;		//客户营销中心
	public static final Short SRC_TYPE_INTERNET	  = 3;		//网络
	public static final Short SRC_TYPE_PHONE	  = 4;		//手机终端
	
	public static final Short CON_RES_BUSIY 	  = 1;		//占线
	public static final Short CON_RES_NULL_NUM	  = 2;		//空号
	public static final Short CON_RES_HUNG_UP	  = 3;		//对方挂机
	public static final Short CON_RES_SUCCESS	  = 4;		//接通
	
	public static final Short CON_TYPE_PHONE 	  = 1;		//联系类型：1——电话
	protected java.util.Set conChaInsCuss = new java.util.HashSet();
	protected java.util.Set<ConBwList> conBwLists = new java.util.HashSet<ConBwList>();
	
	protected java.util.Set<ConAttach> conAttachs = new java.util.HashSet<ConAttach>();
	
//	protected String ifanswer;	//是否配合回答
//	
//	protected String ifusa;	// 是否是美国人
//	
//	protected String raterNum;	//纳税人识别号
	
	
	
	/**
	 * Default Empty Constructor for class ConHis
	 */
	public ConHis () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConHis
	 */
	public ConHis (
		 Long in_conHisId
        ) {
		this.setConHisId(in_conHisId);
    }
	
	public java.util.Set<ConAttach> getConAttachs() {
		return conAttachs;
	}

	public void setConAttachs(java.util.Set<ConAttach> conAttachs) {
		this.conAttachs = conAttachs;
	}

	public java.util.Set<ConBwList> getConBwLists() {
        return conBwLists;
    }

    public void setConBwLists(java.util.Set<ConBwList> conBwLists) {
        this.conBwLists = conBwLists;
    }

    public com.htsoft.oa.model.customer.Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
		this.customer = in_customer;
	}
	
	public com.htsoft.oa.model.customer.CusLinkman getCusLinkman () {
		return cusLinkman;
	}	
	
	public void setCusLinkman (com.htsoft.oa.model.customer.CusLinkman in_cusLinkman) {
		this.cusLinkman = in_cusLinkman;
	}

	public java.util.Set getConChaInsCuss () {
		return conChaInsCuss;
	}	
	
	public void setConChaInsCuss (java.util.Set in_conChaInsCuss) {
		this.conChaInsCuss = in_conChaInsCuss;
	}
    
	public String getCusName() {
		return cusName;
	}

	public void setCusName(String cusName) {
		this.cusName = cusName;
	}

	public String getCredNum() {
		return credNum;
	}

	public void setCredNum(String credNum) {
		this.credNum = credNum;
	}

	public String getSerialNum() {
		return serialNum;
	}

	public void setSerialNum(String serialNum) {
		this.serialNum = serialNum;
	}

	/**
	 * 联络历史ID	 * @return Long
     * @hibernate.id column="CON_HIS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getConHisId() {
		return this.conHisId;
	}
	
	/**
	 * Set the conHisId
	 */	
	public void setConHisId(Long aValue) {
		this.conHisId = aValue;
	}	

	/**
	 * 客户ID	 * @return Long
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
	        customer = new com.htsoft.oa.model.customer.Customer(aValue);
	        customer.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			customer.setCustomerId(aValue);
	    }
	}	

	/**
	 * 联系人ID	 * @return Long
	 */
	public Long getLinkmanid() {
		return this.getCusLinkman()==null?null:this.getCusLinkman().getLinkmanId();
	}
	
	/**
	 * Set the linkmanid
	 */	
	public void setLinkmanid(Long aValue) {
	    if (aValue==null) {
	    	cusLinkman = null;
	    } else if (cusLinkman == null) {
	        cusLinkman = new com.htsoft.oa.model.customer.CusLinkman(aValue);
	        cusLinkman.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			cusLinkman.setLinkmanId(aValue);
	    }
	}	

	/**
	 * 来源：项目定义	 * @return Short
	 * @hibernate.property column="SRC_TYPE_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getSrcTypeId() {
		return this.srcTypeId;
	}
	
	/**
	 * Set the srcTypeId
	 */	
	public void setSrcTypeId(Short aValue) {
		this.srcTypeId = aValue;
	}	

	/**
	 * 方向：呼入、呼出	 * @return Short
	 * @hibernate.property column="DIR_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDirId() {
		return this.dirId;
	}
	
	/**
	 * Set the dirId
	 * @spring.validator type="required"
	 */	
	public void setDirId(Short aValue) {
		this.dirId = aValue;
	}	

	/**
	 * 联系方式：地址、手机、固话、Email、QQ、MSN等	 * @return Short
	 * @hibernate.property column="CONTACT_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getContactTypeId() {
		return this.contactTypeId;
	}
	
	/**
	 * Set the contactTypeId
	 * @spring.validator type="required"
	 */	
	public void setContactTypeId(Short aValue) {
		this.contactTypeId = aValue;
	}	

	/**
	 * 区号/地区号	 * @return String
	 * @hibernate.property column="PRE_CONTACT_NUM" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getPreContactNum() {
		return this.preContactNum;
	}
	
	/**
	 * Set the preContactNum
	 */	
	public void setPreContactNum(String aValue) {
		this.preContactNum = aValue;
	}	

	/**
	 * 号码/详细地址	 * @return String
	 * @hibernate.property column="MAIN_CONTACT_NUM" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getMainContactNum() {
		return this.mainContactNum;
	}
	
	/**
	 * Set the mainContactNum
	 * @spring.validator type="required"
	 */	
	public void setMainContactNum(String aValue) {
		this.mainContactNum = aValue;
	}	

	/**
	 * 分机号/邮编	 * @return String
	 * @hibernate.property column="LAST_CONTACT_NUM" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getLastContactNum() {
		return this.lastContactNum;
	}
	
	/**
	 * Set the lastContactNum
	 */	
	public void setLastContactNum(String aValue) {
		this.lastContactNum = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="STA_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getStaTime() {
		return this.staTime;
	}
	
	/**
	 * Set the staTime
	 */	
	public void setStaTime(java.util.Date aValue) {
		this.staTime = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="END_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEndTime() {
		return this.endTime;
	}
	
	/**
	 * Set the endTime
	 */	
	public void setEndTime(java.util.Date aValue) {
		this.endTime = aValue;
	}	

	/**
	 * 联络事项	 * @return Short
	 * @hibernate.property column="BUS_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBusTypId() {
		return this.busTypId;
	}
	
	/**
	 * Set the busTypId
	 */	
	public void setBusTypId(Short aValue) {
		this.busTypId = aValue;
	}	

	/**
	 * 联络结果	 * @return Short
	 * @hibernate.property column="CON_RES_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getConResId() {
		return this.conResId;
	}
	
	/**
	 * Set the conResId
	 */	
	public void setConResId(Short aValue) {
		this.conResId = aValue;
	}	

	/**
	 * 联络结果备注	 * @return String
	 * @hibernate.property column="CON_RES_REMARKS" type="java.lang.String" length="2000" not-null="false" unique="false"
	 */
	public String getConResRemarks() {
		return this.conResRemarks;
	}
	
	/**
	 * Set the conResRemarks
	 */	
	public void setConResRemarks(String aValue) {
		this.conResRemarks = aValue;
	}	

	/**
	 * 联络内容	 * @return String
	 * @hibernate.property column="CONTENT" type="java.lang.String" length="2000" not-null="false" unique="false"
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
	 * 处理状态	 * @return Short
	 * @hibernate.property column="DEAL_STA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getDealStaId() {
		return this.dealStaId;
	}
	
	/**
	 * Set the dealStaId
	 */	
	public void setDealStaId(Short aValue) {
		this.dealStaId = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARKS" type="java.lang.String" length="2000" not-null="false" unique="false"
	 */
	public String getRemarks() {
		return this.remarks;
	}
	
	/**
	 * Set the remarks
	 */	
	public void setRemarks(String aValue) {
		this.remarks = aValue;
	}	

	/**
	 * 负责人	 * @return Integer
	 * @hibernate.property column="OWNER_ID" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getOwnerId() {
		return this.ownerId;
	}
	
	/**
	 * Set the ownerId
	 */	
	public void setOwnerId(Integer aValue) {
		this.ownerId = aValue;
	}	

	/**
	 * 状态：0=有效 1=无效	 * @return Short
	 * @hibernate.property column="STATUS_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatusId() {
		return this.statusId;
	}
	
	/**
	 * Set the statusId
	 * @spring.validator type="required"
	 */	
	public void setStatusId(Short aValue) {
		this.statusId = aValue;
	}	

	public com.htsoft.oa.model.system.AppUser getOwner() {
		return owner;
	}

	public void setOwner(com.htsoft.oa.model.system.AppUser owner) {
		this.owner = owner;
	}

	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public Long getServiceId() {
		return serviceId;
	}

	public void setServiceId(Long serviceId) {
		this.serviceId = serviceId;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConHis)) {
			return false;
		}
		ConHis rhs = (ConHis) object;
		return new EqualsBuilder()
				.append(this.conHisId, rhs.conHisId)
								.append(this.srcTypeId, rhs.srcTypeId)
				.append(this.dirId, rhs.dirId)
				.append(this.contactTypeId, rhs.contactTypeId)
				.append(this.preContactNum, rhs.preContactNum)
				.append(this.mainContactNum, rhs.mainContactNum)
				.append(this.lastContactNum, rhs.lastContactNum)
				.append(this.staTime, rhs.staTime)
				.append(this.endTime, rhs.endTime)
				.append(this.busTypId, rhs.busTypId)
				.append(this.conResId, rhs.conResId)
				.append(this.conResRemarks, rhs.conResRemarks)
				.append(this.content, rhs.content)
				.append(this.dealStaId, rhs.dealStaId)
				.append(this.remarks, rhs.remarks)
				.append(this.ownerId, rhs.ownerId)
				.append(this.statusId, rhs.statusId)
				.append(this.planId, rhs.planId)
				.append(this.serviceId, rhs.serviceId)
				.append(this.cusName, rhs.cusName)
				.append(this.credNum, rhs.credNum)
				.append(this.serialNum, rhs.serialNum)
				.append(this.agentName, rhs.agentName)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.conHisId) 
				.append(this.srcTypeId) 
				.append(this.dirId) 
				.append(this.contactTypeId) 
				.append(this.preContactNum) 
				.append(this.mainContactNum) 
				.append(this.lastContactNum) 
				.append(this.staTime) 
				.append(this.endTime) 
				.append(this.busTypId) 
				.append(this.conResId) 
				.append(this.conResRemarks) 
				.append(this.content) 
				.append(this.dealStaId) 
				.append(this.remarks) 
				.append(this.ownerId) 
				.append(this.statusId) 
				.append(this.planId)
				.append(this.serviceId)
				.append(this.cusName)
				.append(this.credNum)
				.append(this.serialNum)
				.append(this.agentName)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("conHisId", this.conHisId) 
				.append("srcTypeId", this.srcTypeId) 
				.append("dirId", this.dirId) 
				.append("contactTypeId", this.contactTypeId) 
				.append("preContactNum", this.preContactNum) 
				.append("mainContactNum", this.mainContactNum) 
				.append("lastContactNum", this.lastContactNum) 
				.append("staTime", this.staTime) 
				.append("endTime", this.endTime) 
				.append("busTypId", this.busTypId) 
				.append("conResId", this.conResId) 
				.append("conResRemarks", this.conResRemarks) 
				.append("content", this.content) 
				.append("dealStaId", this.dealStaId) 
				.append("remarks", this.remarks) 
				.append("ownerId", this.ownerId) 
				.append("statusId", this.statusId) 
				.append("planId", this.planId)
				.append("serviceId", this.serviceId)
				.append("cusName", this.cusName)
				.append("credNum", this.credNum)
				.append("serialNum", this.serialNum)
				.append("agentName", this.agentName)
//				.append("ifanswer", this.ifanswer)
//				.append("ifusa", this.ifusa)
//				.append("raterNum", this.raterNum)
				.toString();
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

//	public String getIfanswer() {
//		return ifanswer;
//	}
//	
//	public void setIfanswer(String ifanswer) {
//		this.ifanswer = ifanswer;
//	}
//
//	public String getIfusa() {
//		return ifusa;
//	}
//
//	public void setIfusa(String ifusa) {
//		this.ifusa = ifusa;
//	}
//
//	public String getRaterNum() {
//		return raterNum;
//	}
//
//	public void setRaterNum(String raterNum) {
//		this.raterNum = raterNum;
//	}
	
	
}
