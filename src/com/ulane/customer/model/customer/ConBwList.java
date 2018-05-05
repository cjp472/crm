package com.ulane.customer.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.model.system.AppUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * ConBwList Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ConBwList extends com.htsoft.core.model.BaseModel {

    protected Long bwId;
	protected Short bwTypId;
	protected Short objTypId;
	protected Short dirId;
	protected Short contactTypeId;
	protected String preContactNum;
	protected String mainContactNum;
	protected String lastContactNum;
	protected Short dealTypId;
	protected Short bwTime;
	protected Short bwBusi;
	protected Short applyReaId;
	protected java.util.Date applyTime;
	protected String applyRemark;
	protected Short checkStateId;
	protected Short statusId;
	//需要获取CusPersonal中的数据by wangzj
//    protected CusPersonal cusPersonal;
    protected Customer customer;
    protected AppUser apply;
    protected com.ulane.customer.model.customer.ConBwlistApprove conBwlistApprove;
    
    //新增审批信息
    protected AppUser approveUser;
    protected java.util.Date approveTime;
    protected Short approveReason;
    protected String approveDesc;
	
	protected java.util.Set<ConBwListBusRul> conBwListBusRuls = new java.util.HashSet<ConBwListBusRul>();
	protected java.util.Set<ConHis> conHiss = new java.util.HashSet<ConHis>();
	protected java.util.Set<ConBwListTimeRul> conBwListTimeRuls = new java.util.HashSet<ConBwListTimeRul>();

	/**
	 * Default Empty Constructor for class ConBwList
	 */
	public ConBwList () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConBwList
	 */
	public ConBwList (
		 Long in_bwId
        ) {
		this.setBwId(in_bwId);
    }


	public AppUser getApproveUser() {
		return approveUser;
	}

	public void setApproveUser(AppUser approveUser) {
		this.approveUser = approveUser;
	}

	public java.util.Date getApproveTime() {
		return approveTime;
	}

	public void setApproveTime(java.util.Date approveTime) {
		this.approveTime = approveTime;
	}

	public Short getApproveReason() {
		return approveReason;
	}

	public void setApproveReason(Short approveReason) {
		this.approveReason = approveReason;
	}

	public String getApproveDesc() {
		return approveDesc;
	}

	public void setApproveDesc(String approveDesc) {
		this.approveDesc = approveDesc;
	}

	public java.util.Set getConBwListBusRuls () {
		return conBwListBusRuls;
	}	
	
	public void setConBwListBusRuls (java.util.Set in_conBwListBusRuls) {
		this.conBwListBusRuls = in_conBwListBusRuls;
	}

	public java.util.Set<ConHis> getConHiss () {
		return conHiss;
	}	
	
	public void setConHiss (java.util.Set<ConHis> in_conHiss) {
		this.conHiss = in_conHiss;
	}

	public java.util.Set getConBwListTimeRuls () {
		return conBwListTimeRuls;
	}	
	
	public void setConBwListTimeRuls (java.util.Set in_conBwListTimeRuls) {
		this.conBwListTimeRuls = in_conBwListTimeRuls;
	}
    

	/**
	 * 黑白名单内码	 * @return Long
     * @hibernate.id column="BW_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getBwId() {
		return this.bwId;
	}
	
	/**
	 * Set the bwId
	 */	
	public void setBwId(Long aValue) {
		this.bwId = aValue;
	}	

	/**
	 * 禁呼类别：黑名单、白名单&CONJHLB	 * @return Short
	 * @hibernate.property column="BW_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getBwTypId() {
		return this.bwTypId;
	}
	
	/**
	 * Set the bwTypId
	 * @spring.validator type="required"
	 */	
	public void setBwTypId(Short aValue) {
		this.bwTypId = aValue;
	}	

	/**
	 * 禁呼类型：客户、联络方式&CONJHLX	 * @return Short
	 * @hibernate.property column="OBJ_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getObjTypId() {
		return this.objTypId;
	}
	
	/**
	 * Set the objTypId
	 * @spring.validator type="required"
	 */	
	public void setObjTypId(Short aValue) {
		this.objTypId = aValue;
	}	

	/**
	 * 方向：呼入、呼出&CONFX	 * @return Short
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

	public com.ulane.customer.model.customer.ConBwlistApprove getConBwlistApprove() {
		return conBwlistApprove;
	}

	public void setConBwlistApprove(
			com.ulane.customer.model.customer.ConBwlistApprove conBwlistApprove) {
		this.conBwlistApprove = conBwlistApprove;
	}

	/**
	 * 客户	 * @return Long
	 * @hibernate.property column="CUS_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Customer getCustomer() {
		return this.customer;
	}
	
	/**
	 * Set the cusId
	 */	
	public void setCustomer(Customer aValue) {
		this.customer = aValue;
	}	
    /**
     *   * @return Long
     */
    public Long getCustomerId() {
        return this.getCustomer()==null?null:this.getCustomer().getCustomerId();
    }
    
    /**
     * Set the typeId
     */ 
    public void setCustomerId(Long aValue) {
        if (aValue==null) {
        	customer = null;
        } else if (customer == null) {
        	customer = new CusPersonal(aValue);
        	customer.setVersion(new Integer(0));//set a version to cheat hibernate only
        } else {
        	customer.setCustomerId(aValue);
        }
    }   

	/**
	 * 黑名单审批单内码 * @return Long
	 */
//	public Long getBwlistApproveId() {
//		return this.getConBwlistApprove() == null ? null : this.getConBwlistApprove()
//				.getBwlistApproveId();
//	}

	/**
	 * Set the bwlistApproveId
	 */
//	public void setBwlistApproveId(Long aValue) {
//		if (aValue == null) {
//			conBwlistApprove = null;
//		} else if (conBwlistApprove == null) {
//			conBwlistApprove = new com.ulane.customer.model.customer.ConBwlistApprove(aValue);
//			conBwlistApprove.setVersion(new Integer(0));// set a version to cheat
//														// hibernate only
//		} else {
//			//
//			conBwlistApprove.setBwlistApproveId(aValue);
//		}
//	}

	/**
	 * 联系方式：地址、手机、固话、Email、QQ、MSN等&CONLXLX	 * @return Short
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
	 * 处理方式：挂机、示忙、提醒、转IVR、优先接入&CONCLFS	 * @return Short
	 * @hibernate.property column="DEAL_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDealTypId() {
		return this.dealTypId;
	}
	
	/**
	 * Set the dealTypId
	 * @spring.validator type="required"
	 */	
	public void setDealTypId(Short aValue) {
		this.dealTypId = aValue;
	}	

	/**
	 * 时间限制：不限、指定&CONSJXZ	 * @return Short
	 * @hibernate.property column="BW_TIME" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getBwTime() {
		return this.bwTime;
	}
	
	/**
	 * Set the bwTime
	 * @spring.validator type="required"
	 */	
	public void setBwTime(Short aValue) {
		this.bwTime = aValue;
	}	

	/**
	 * 业务限制：不限、指定&CONYWXZ	 * @return Short
	 * @hibernate.property column="BW_BUSI" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getBwBusi() {
		return this.bwBusi;
	}
	
	/**
	 * Set the bwBusi
	 * @spring.validator type="required"
	 */	
	public void setBwBusi(Short aValue) {
		this.bwBusi = aValue;
	}	

	/**
	 * 申请原因&CONSQYY	 * @return Short
	 * @hibernate.property column="APPLY_REA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getApplyReaId() {
		return this.applyReaId;
	}
	
	/**
	 * Set the applyReaId
	 * @spring.validator type="required"
	 */	
	public void setApplyReaId(Short aValue) {
		this.applyReaId = aValue;
	}	

	/**
	 * 申请人	 * @return Long
	 * @hibernate.property column="APPLY_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public AppUser getApply() {
		return this.apply;
	}
	
	/**
	 * Set the applyId
	 * @spring.validator type="required"
	 */	
	public void setApply(AppUser aValue) {
		this.apply = aValue;
	}	
	
    /**
     *   * @return Long
     */
    public Long getUserId() {
        return this.getApply()==null?null:this.getApply().getUserId();
    }
    
    /**
     * Set the typeId
     */ 
    public void setUserId(Long aValue) {
        if (aValue==null) {
            apply = null;
        } else if (apply == null) {
            apply = new AppUser(aValue);
            apply.setVersion(new Integer(0));//set a version to cheat hibernate only
        } else {
            apply.setUserId(aValue);
        }
    }   

	/**
	 * 申请时间	 * @return java.util.Date
	 * @hibernate.property column="APPLY_TIME" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getApplyTime() {
		return this.applyTime;
	}
	
	/**
	 * Set the applyTime
	 * @spring.validator type="required"
	 */	
	public void setApplyTime(java.util.Date aValue) {
		this.applyTime = aValue;
	}	

	/**
	 * 申请备注	 * @return String
	 * @hibernate.property column="APPLY_REMARK" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getApplyRemark() {
		return this.applyRemark;
	}
	
	/**
	 * Set the applyRemark
	 * @spring.validator type="required"
	 */	
	public void setApplyRemark(String aValue) {
		this.applyRemark = aValue;
	}	

	/**
	 * 审核状态：待审核、审核通过、审核不通过&CONSHZT	 * @return Short
	 * @hibernate.property column="CHECK_STATE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getCheckStateId() {
		return this.checkStateId;
	}
	
	/**
	 * Set the checkStateId
	 * @spring.validator type="required"
	 */	
	public void setCheckStateId(Short aValue) {
		this.checkStateId = aValue;
	}	

	/**
	 * 状态&CONZT	 * @return Short
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

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConBwList)) {
			return false;
		}
		ConBwList rhs = (ConBwList) object;
		return new EqualsBuilder()
				.append(this.bwId, rhs.bwId)
				.append(this.bwTypId, rhs.bwTypId)
				.append(this.objTypId, rhs.objTypId)
				.append(this.dirId, rhs.dirId)
				.append(this.contactTypeId, rhs.contactTypeId)
				.append(this.preContactNum, rhs.preContactNum)
				.append(this.mainContactNum, rhs.mainContactNum)
				.append(this.lastContactNum, rhs.lastContactNum)
				.append(this.dealTypId, rhs.dealTypId)
				.append(this.bwTime, rhs.bwTime)
				.append(this.bwBusi, rhs.bwBusi)
				.append(this.applyReaId, rhs.applyReaId)
				.append(this.applyTime, rhs.applyTime)
				.append(this.applyRemark, rhs.applyRemark)
				.append(this.checkStateId, rhs.checkStateId)
				.append(this.statusId, rhs.statusId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.bwId) 
				.append(this.bwTypId) 
				.append(this.objTypId) 
				.append(this.dirId) 
				.append(this.contactTypeId) 
				.append(this.preContactNum) 
				.append(this.mainContactNum) 
				.append(this.lastContactNum) 
				.append(this.dealTypId) 
				.append(this.bwTime) 
				.append(this.bwBusi) 
				.append(this.applyReaId) 
				.append(this.applyTime) 
				.append(this.applyRemark) 
				.append(this.checkStateId) 
				.append(this.statusId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("bwId", this.bwId) 
				.append("bwTypId", this.bwTypId) 
				.append("objTypId", this.objTypId) 
				.append("dirId", this.dirId) 
				.append("contactTypeId", this.contactTypeId) 
				.append("preContactNum", this.preContactNum) 
				.append("mainContactNum", this.mainContactNum) 
				.append("lastContactNum", this.lastContactNum) 
				.append("dealTypId", this.dealTypId) 
				.append("bwTime", this.bwTime) 
				.append("bwBusi", this.bwBusi) 
				.append("applyReaId", this.applyReaId) 
				.append("applyTime", this.applyTime) 
				.append("applyRemark", this.applyRemark) 
				.append("checkStateId", this.checkStateId) 
				.append("statusId", this.statusId) 
				.toString();
	}



}
