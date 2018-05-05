package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * ObSaletask Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObSaletask extends com.htsoft.core.model.BaseModel {
    protected Long saletaskId;				//营销任务内码
	protected Short typId;					//名单获取方式&CONOB_SALETASK_MDHQFS
	protected Long cusGrpId;				//用户组内码
	protected Long useId;					//执行坐席内码
	protected String toUserNo;              //接收人工号
	protected Long cusId;					//客户内码
	protected String callbatchNam;			//批次名称
	protected String calllistNam;			//名单列表名称
	protected String comNam;				//活动主题
	protected java.util.Date asgDat;		//分配时间
	protected java.util.Date booTim;		//预约时间
	protected String booRemark;				//预约备注
	protected Short diaCou;					//已外拨次数
	protected Long conStaId;				//拨打结果&CONOB_SALETASK_BDJG
	protected java.util.Date firstDiaDat;	//首次拨打时间
	protected java.util.Date lastDiaDat;	//最后拨打时间
	protected String des;					//结果描述
	protected Short busiStaId;				//营销状态&CONOB_SALETASK_YXZT
	protected Short busiRelId;				//营销结果&CONOB_SALETASK_YXJG
	protected Short servTypId;				//服务类型&CONOB_SALETASK_FWLX
	protected Short servStaId;				//服务状态&CONOB_SALETASK_FWZT
	protected Short taskStaId;				//任务状态&CONOB_TASK_STA
	protected com.ulane.callout.model.outb.ObCallbatch obCallbatch;			//名单批次
	protected com.ulane.callout.model.outb.ObCallbatchAss obCallbatchAss;	//名单批次_分配历史
	protected com.ulane.callout.model.outb.ObCalllist obCalllist;			//名单列表
	protected com.ulane.callout.model.outb.ObCom obCom;						//活动
	
	@SuppressWarnings("unchecked")
    protected java.util.Set obSaletaskBos = new java.util.HashSet();					//
//	protected java.util.Set<ObConhis> obConhiss = new java.util.HashSet<ObConhis>();	//营销任务_联络 历史
	/**
	 * 新增字段
	 */
	protected java.util.Date lastOpeDate;								//最后处理时间
	protected String taskExecType;										//处理类型：失败原因/任务来源
	protected Short busiStagId;											//营销阶段&CONOB_SALETASK_YXJD
	
	/**
	 * 传递数据
	 */
	protected String remainTime;										//剩余时间
	public static final String DATE_PATTEN = "yyyy-MM-dd HH:mm:ss";
	//-----营销状态
	public static final Short MARKET_PLAN 	   	 	=  0;				//预约
	public static final Short MARKET_NO_EXEC  		=  1;				//未执行
	public static final Short MARKET_LAY_UP        	=  2;				//搁置
	public static final Short MARKET_FLOWING 		=  3;				//待追踪
	public static final Short MARKET_SUCC_CASE   	=  4;				//已成功结案
	public static final Short MARKET_FAIL_CASE   	=  5;				//已失败结案
	public static final Short MARKET_CANCELED      	=  6;				//已取消
	
	//-----服务状态
	public static final Short SERV_UNDO 			= 0;				//未处理
	public static final Short SERV_EXECUTING 		= 1;				//处理中
	public static final Short SERV_CLOSE 			= 2;				//已完成
	
	//-----名单获取方式
	public static final Short TYPE_ID_CALLLIST		= 0;				//指定名单
	public static final Short TYPE_ID_POOL 			= 1;				//名单池
	
	//-----营销任务状态
	public static final Short TASK_STA_UNDO			= 0;				//待处理
	public static final Short TASK_STA_EXEC			= 1;				//处理中
	public static final Short TASK_STA_CLOSE		= 2;				//关闭
	public static final Short TASK_STA_CANCELED		= 3;				//取消
	
	public static final Short BUSI_STAG_UNDO		= 0;				//营销阶段：未开始
	public static final String DEFAULT_DISP = "已过预约期";
	/**
	 * 新增：个人客户信息
	 */
	protected com.ulane.customer.model.customer.CusPersonal cusPersonal;
	/**
	 * Default Empty Constructor for class ObSaletask
	 */
	public ObSaletask () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObSaletask
	 */
	public ObSaletask (
		 Long in_saletaskId
        ) {
		this.setSaletaskId(in_saletaskId);
    }

	
	public com.ulane.callout.model.outb.ObCallbatch getObCallbatch () {
		return obCallbatch;
	}	
	
	public void setObCallbatch (com.ulane.callout.model.outb.ObCallbatch in_obCallbatch) {
		this.obCallbatch = in_obCallbatch;
	}
	
	public com.ulane.callout.model.outb.ObCallbatchAss getObCallbatchAss () {
		return obCallbatchAss;
	}	
	
	public void setObCallbatchAss (com.ulane.callout.model.outb.ObCallbatchAss in_obCallbatchAss) {
		this.obCallbatchAss = in_obCallbatchAss;
	}
	
	public com.ulane.callout.model.outb.ObCalllist getObCalllist () {
		return obCalllist;
	}	
	
	public void setObCalllist (com.ulane.callout.model.outb.ObCalllist in_obCalllist) {
		this.obCalllist = in_obCalllist;
	}
	
	public com.ulane.callout.model.outb.ObCom getObCom () {
		return obCom;
	}	
	
	public void setObCom (com.ulane.callout.model.outb.ObCom in_obCom) {
		this.obCom = in_obCom;
	}

	@SuppressWarnings("unchecked")
    public java.util.Set getObSaletaskBos () {
		return obSaletaskBos;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObSaletaskBos (java.util.Set in_obSaletaskBos) {
		this.obSaletaskBos = in_obSaletaskBos;
	}
    

	/**
	 * 营销任务内码	 * @return Long
     * @hibernate.id column="SALETASK_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getSaletaskId() {
		return this.saletaskId;
	}
	
	/**
	 * Set the saletaskId
	 */	
	public void setSaletaskId(Long aValue) {
		this.saletaskId = aValue;
	}	

	/**
	 * 名单获取方式：0=指定名单 1=取名单池&CONOB_SALETASK_MDHQFS	 * @return Short
	 * @hibernate.property column="TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getTypId() {
		return this.typId;
	}
	
	/**
	 * Set the typId
	 * @spring.validator type="required"
	 */	
	public void setTypId(Short aValue) {
		this.typId = aValue;
	}	

	/**
	 * 用户组内码：名单池营销必填	 * @return Long
	 * @hibernate.property column="CUS_GRP_ID" type="java.lang.Long" length="30" not-null="false" unique="false"
	 */
	public Long getCusGrpId() {
		return this.cusGrpId;
	}
	
	/**
	 * Set the cusGrpId
	 */	
	public void setCusGrpId(Long aValue) {
		this.cusGrpId = aValue;
	}	

	/**
	 * 执行坐席内码：名单营销必填	 * @return Long
	 * @hibernate.property column="USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUseId() {
		return this.useId;
	}
	
	/**
	 * Set the useId
	 */	
	public void setUseId(Long aValue) {
		this.useId = aValue;
	}	

	/**
	 * 客户内码	 * @return Long
	 * @hibernate.property column="CUS_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getCusId() {
		return this.cusId;
	}
	
	/**
	 * Set the cusId
	 * @spring.validator type="required"
	 */	
	public void setCusId(Long aValue) {
		this.cusId = aValue;
	}	

	/**
	 * 分配历史内码	 * @return Long
	 */
	public Long getCallbatchAssId() {
		return this.getObCallbatchAss()==null?null:this.getObCallbatchAss().getCallbatchAssId();
	}
	
	/**
	 * Set the callbatchAssId
	 */	
	public void setCallbatchAssId(Long aValue) {
	    if (aValue==null) {
	    	obCallbatchAss = null;
	    } else if (obCallbatchAss == null) {
	        obCallbatchAss = new com.ulane.callout.model.outb.ObCallbatchAss(aValue);
	        obCallbatchAss.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCallbatchAss.setCallbatchAssId(aValue);
	    }
	}	

	/**
	 * 名单批次内码	 * @return Long
	 */
	public Long getCallbatchId() {
		return this.getObCallbatch()==null?null:this.getObCallbatch().getCallbatchId();
	}
	
	public com.ulane.customer.model.customer.CusPersonal getCusPersonal() {
		return cusPersonal;
	}

	public void setCusPersonal(
			com.ulane.customer.model.customer.CusPersonal cusPersonal) {
		this.cusPersonal = cusPersonal;
	}

	/**
	 * Set the callbatchId
	 */	
	public void setCallbatchId(Long aValue) {
	    if (aValue==null) {
	    	obCallbatch = null;
	    } else if (obCallbatch == null) {
	        obCallbatch = new com.ulane.callout.model.outb.ObCallbatch(aValue);
	        obCallbatch.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCallbatch.setCallbatchId(aValue);
	    }
	}	

	/**
	 * 批次名称	 * @return String
	 * @hibernate.property column="CALLBATCH_NAM" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getCallbatchNam() {
		return this.callbatchNam;
	}
	
	/**
	 * Set the callbatchNam
	 */	
	public void setCallbatchNam(String aValue) {
		this.callbatchNam = aValue;
	}	

	/**
	 * 名单列表内码	 * @return Long
	 */
	public Long getCalllistId() {
		return this.getObCalllist()==null?null:this.getObCalllist().getCalllistId();
	}
	
	/**
	 * Set the calllistId
	 */	
	public void setCalllistId(Long aValue) {
	    if (aValue==null) {
	    	obCalllist = null;
	    } else if (obCalllist == null) {
	        obCalllist = new com.ulane.callout.model.outb.ObCalllist(aValue);
	        obCalllist.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCalllist.setCalllistId(aValue);
	    }
	}	

	/**
	 * 名单列表名称	 * @return String
	 * @hibernate.property column="CALLLIST_NAM" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getCalllistNam() {
		return this.calllistNam;
	}
	
	/**
	 * Set the calllistNam
	 */	
	public void setCalllistNam(String aValue) {
		this.calllistNam = aValue;
	}	

	/**
	 * 外拨活动内码	 * @return Long
	 */
	public Long getComId() {
		return this.getObCom()==null?null:this.getObCom().getComId();
	}
	
	/**
	 * Set the comId
	 */	
	public void setComId(Long aValue) {
	    if (aValue==null) {
	    	obCom = null;
	    } else if (obCom == null) {
	        obCom = new com.ulane.callout.model.outb.ObCom(aValue);
	        obCom.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCom.setComId(aValue);
	    }
	}	

	/**
	 * 活动主题	 * @return String
	 * @hibernate.property column="COM_NAM" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getComNam() {
		return this.comNam;
	}
	
	/**
	 * Set the comNam
	 */	
	public void setComNam(String aValue) {
		this.comNam = aValue;
	}	

	/**
	 * 分配时间	 * @return java.util.Date
	 * @hibernate.property column="ASG_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
	 */
	public java.util.Date getAsgDat() {
		return this.asgDat;
	}
	
	/**
	 * Set the asgDat
	 * @spring.validator type="required"
	 */	
	public void setAsgDat(java.util.Date aValue) {
		this.asgDat = aValue;
	}	

	/**
	 * 预约时间	 * @return java.util.Date
	 * @hibernate.property column="BOO_TIM" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getBooTim() {
		return this.booTim;
	}
	
	/**
	 * Set the booTim
	 */	
	public void setBooTim(java.util.Date aValue) {
		this.booTim = aValue;
	}	

	/**
	 * 预约备注	 * @return String
	 * @hibernate.property column="BOO_REMARK" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getBooRemark() {
		return this.booRemark;
	}
	
	/**
	 * Set the booRemark
	 */	
	public void setBooRemark(String aValue) {
		this.booRemark = aValue;
	}	

	/**
	 * 已外拨次数	 * @return Short
	 * @hibernate.property column="DIA_COU" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDiaCou() {
		return this.diaCou;
	}
	
	/**
	 * Set the diaCou
	 * @spring.validator type="required"
	 */	
	public void setDiaCou(Short aValue) {
		this.diaCou = aValue;
	}	

	/**
	 * 拨打结果：拨打结果定义表&CONOB_SALETASK_BDJG	 * @return Short
	 * @hibernate.property column="CON_STA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Long getConStaId() {
		return this.conStaId;
	}
	
	/**
	 * Set the conStaId
	 */	
	public void setConStaId(Long aValue) {
		this.conStaId = aValue;
	}	

	/**
	 * 首次拨打时间	 * @return java.util.Date
	 * @hibernate.property column="FIRST_DIA_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getFirstDiaDat() {
		return this.firstDiaDat;
	}
	
	/**
	 * Set the firstDiaDat
	 */	
	public void setFirstDiaDat(java.util.Date aValue) {
		this.firstDiaDat = aValue;
	}	

	/**
	 * 最后拨打时间	 * @return java.util.Date
	 * @hibernate.property column="LAST_DIA_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getLastDiaDat() {
		return this.lastDiaDat;
	}
	
	/**
	 * Set the lastDiaDat
	 */	
	public void setLastDiaDat(java.util.Date aValue) {
		this.lastDiaDat = aValue;
	}	

	/**
	 * 结果描述	 * @return String
	 * @hibernate.property column="DES" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getDes() {
		return this.des;
	}
	
	/**
	 * Set the des
	 */	
	public void setDes(String aValue) {
		this.des = aValue;
	}	

	/**
	 * 营销状态：业务自定义回写&CONOB_SALETASK_YXZT	 * @return Short
	 * @hibernate.property column="BUSI_STA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBusiStaId() {
		return this.busiStaId;
	}
	
	/**
	 * Set the busiStaId
	 */	
	public void setBusiStaId(Short aValue) {
		this.busiStaId = aValue;
	}	

	/**
	 * 营销结果：对应生成结果的内码&CONOB_SALETASK_YXJG	 * @return Short
	 * @hibernate.property column="BUSI_REL_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getBusiRelId() {
		return this.busiRelId;
	}
	
	/**
	 * Set the busiRelId
	 */	
	public void setBusiRelId(Short aValue) {
		this.busiRelId = aValue;
	}	

	/**
	 * 服务类型：0-可自定义，1-挽留、2-扣款失败通知等&CONOB_SALETASK_FWLX	 * @return Short
	 * @hibernate.property column="SERV_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getServTypId() {
		return this.servTypId;
	}
	
	/**
	 * Set the servTypId
	 */	
	public void setServTypId(Short aValue) {
		this.servTypId = aValue;
	}	

	/**
	 * 服务状态：0-处理中、1-已关闭&CONOB_SALETASK_FWZT	 * @return Short
	 * @hibernate.property column="SERV_STA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getServStaId() {
		return this.servStaId;
	}
	
	/**
	 * Set the servStaId
	 */	
	public void setServStaId(Short aValue) {
		this.servStaId = aValue;
	}	

	/**
	 * 任务状态：回收、撤销	 * @return Short
	 * @hibernate.property column="TASK_STA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getTaskStaId() {
		return this.taskStaId;
	}
	
	/**
	 * Set the taskStaId
	 */	
	public void setTaskStaId(Short aValue) {
		this.taskStaId = aValue;
	}	

	public java.util.Date getLastOpeDate() {
		return lastOpeDate;
	}

	public void setLastOpeDate(java.util.Date lastOpeDate) {
		this.lastOpeDate = lastOpeDate;
	}

	public String getTaskExecType() {
		return taskExecType;
	}

	public void setTaskExecType(String taskExecType) {
		this.taskExecType = taskExecType;
	}

	public Short getBusiStagId() {
		return busiStagId;
	}

	public void setBusiStagId(Short busiStagId) {
		this.busiStagId = busiStagId;
	}

	public String getRemainTime() {
		return remainTime;
	}

	public void setRemainTime(String remainTime) {
		this.remainTime = remainTime;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObSaletask)) {
			return false;
		}
		ObSaletask rhs = (ObSaletask) object;
		return new EqualsBuilder()
				.append(this.saletaskId, rhs.saletaskId)
				.append(this.typId, rhs.typId)
				.append(this.cusGrpId, rhs.cusGrpId)
				.append(this.useId, rhs.useId)
				.append(this.cusId, rhs.cusId)
								.append(this.callbatchNam, rhs.callbatchNam)
						.append(this.calllistNam, rhs.calllistNam)
						.append(this.comNam, rhs.comNam)
				.append(this.asgDat, rhs.asgDat)
				.append(this.booTim, rhs.booTim)
				.append(this.booRemark, rhs.booRemark)
				.append(this.diaCou, rhs.diaCou)
				.append(this.conStaId, rhs.conStaId)
				.append(this.firstDiaDat, rhs.firstDiaDat)
				.append(this.lastDiaDat, rhs.lastDiaDat)
				.append(this.des, rhs.des)
				.append(this.busiStaId, rhs.busiStaId)
				.append(this.busiRelId, rhs.busiRelId)
				.append(this.servTypId, rhs.servTypId)
				.append(this.servStaId, rhs.servStaId)
				.append(this.taskStaId, rhs.taskStaId)
				.append(this.lastOpeDate, rhs.lastOpeDate)
				.append(this.taskExecType, rhs.taskExecType)
				.append(this.busiStagId, rhs.busiStagId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.saletaskId) 
				.append(this.typId) 
				.append(this.cusGrpId) 
				.append(this.useId) 
				.append(this.cusId) 
						.append(this.callbatchNam) 
						.append(this.calllistNam) 
						.append(this.comNam) 
				.append(this.asgDat) 
				.append(this.booTim) 
				.append(this.booRemark) 
				.append(this.diaCou) 
				.append(this.conStaId) 
				.append(this.firstDiaDat) 
				.append(this.lastDiaDat) 
				.append(this.des) 
				.append(this.busiStaId) 
				.append(this.busiRelId) 
				.append(this.servTypId) 
				.append(this.servStaId) 
				.append(this.taskStaId)
				.append(this.lastOpeDate)
				.append(this.taskExecType)
				.append(this.busiStagId)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("saletaskId", this.saletaskId) 
				.append("typId", this.typId) 
				.append("cusGrpId", this.cusGrpId) 
				.append("useId", this.useId) 
				.append("cusId", this.cusId) 
						.append("callbatchNam", this.callbatchNam) 
						.append("calllistNam", this.calllistNam) 
						.append("comNam", this.comNam) 
				.append("asgDat", this.asgDat) 
				.append("booTim", this.booTim) 
				.append("booRemark", this.booRemark) 
				.append("diaCou", this.diaCou) 
				.append("conStaId", this.conStaId) 
				.append("firstDiaDat", this.firstDiaDat) 
				.append("lastDiaDat", this.lastDiaDat) 
				.append("des", this.des) 
				.append("busiStaId", this.busiStaId) 
				.append("busiRelId", this.busiRelId) 
				.append("servTypId", this.servTypId) 
				.append("servStaId", this.servStaId) 
				.append("taskStaId", this.taskStaId)
				.append("lastOpeDate",this.lastOpeDate)
				.append("taskExecType",this.taskExecType)
				.append("busiStagId",this.busiStagId)
				.toString();
	}

	public String getToUserNo() {
		return toUserNo;
	}

	public void setToUserNo(String toUserNo) {
		this.toUserNo = toUserNo;
	}



}
