package com.ulane.base.model.xitong;

import com.ulane.customer.model.customer.ConAttach;
import com.ulane.customer.model.customer.ConBwList;

public class ConhisOrEquipment {
	    protected Long EId;
	    protected   String  equipmentId;// 机具号
  	    protected  String  equipmentName;//网点名称
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
		/**
		 * Default Empty Constructor for class ConHis
		 */
		
		
		public java.util.Set<ConAttach> getConAttachs() {
			return conAttachs;
		}

		public Long getEId() {
			return EId;
		}

		public void setEId(Long eId) {
			EId = eId;
		}

		public String getEquipmentId() {
			return equipmentId;
		}

		public void setEquipmentId(String equipmentId) {
			this.equipmentId = equipmentId;
		}

		public String getEquipmentName() {
			return equipmentName;
		}

		public void setEquipmentName(String equipmentName) {
			this.equipmentName = equipmentName;
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
		public String getAgentName() {
			return agentName;
		}

		public void setAgentName(String agentName) {
			this.agentName = agentName;
		}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
