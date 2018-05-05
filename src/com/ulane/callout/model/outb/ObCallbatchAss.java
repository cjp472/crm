package com.ulane.callout.model.outb;
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
 * ObCallbatchAss Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObCallbatchAss extends com.htsoft.core.model.BaseModel {
	
    protected Long callbatchAssId;			//分配历史内码
	protected Long parentCallbatchAssId;	//上级分配历史内码
	protected Long fromUseId;				//分配人内码
	protected Long retriveUseId;				//回收人内码
	protected Long assStepId;				//阶段
	protected Long assTypId;				//分配方式
	protected Long toUseId;					//接收人内码
	protected String toUserNo;              //接收人工号
	protected java.util.Date staDat;		//开始时间
	protected java.util.Date endDat;		//结束时间
	protected java.util.Date retriveDat;		//回收时间
	protected Integer assignCount;			//接收分配数量
	protected Integer retriveCount;			//被回收数量
	protected Integer retriveCountAdmin;			//被管理员回收的数量
	protected Integer retriveCountJL;			//被经理回收的数量
	protected Integer retriveCountZZ;			//被组长回收的数量
	protected Integer holdCount;			//剩余数量
	protected Integer canReceiveCount;			//可回收数量(总)
	protected com.ulane.callout.model.outb.ObCallbatch obCallbatch;
	protected String callbatchNam;
	protected com.ulane.callout.model.outb.ObCalllist obCalllist;
	protected String calllistNam;
	public com.ulane.callout.model.outb.ObCom obCom;
	protected String comNam;
	protected String projNam;
    protected com.htsoft.oa.model.system.AppUser fromAppUser;
    protected com.htsoft.oa.model.system.AppUser toAppUser;
    protected com.htsoft.oa.model.system.AppUser retriveAppUser;
    protected Integer assignedCount;//已分配数量
    
    protected String callbatchAssIds;
	/**
	 * 新增字段：分配人姓名、接收人姓名
	 */
	public String fromUseName;
	public String toUserName;
	protected String userNo;
	
//	@SuppressWarnings("unchecked")
//    protected java.util.Set obCallbatchAssTasks = new java.util.HashSet();
	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchCuss = new java.util.HashSet();	//OB名单批次_客户
	@SuppressWarnings("unchecked")
    protected java.util.Set obSaletasks = new java.util.HashSet();
	
    public static final String OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN="0";//管理员分配
    public static final String OB_CALLBATCH_ASS_ASS_STEP_JINGLI="1";//经理分配
    public static final String OB_CALLBATCH_ASS_ASS_STEP_ZUZHANG="2";//组长分配	
    
    public static final String OB_ASSIGN_TYPE_PERCENT="0";//按比例分配
    public static final String OB_ASSIGN_TYPE_SETCOUNT="1";//指定数量分配
    public static final String OB_ASSIGN_TYPE_INCHARGE="2";//按负责人分配
    
    public static final String OB_CALLBATCH_ASS_ASS_TYP_CUS="0";//手动分配
    public static final String OB_CALLBATCH_ASS_ASS_TYP_POOL="1";//池分配
    
    public static final String OB_RETIRVE_TYPE_ALL="0";//全部回收
    public static final String OB_RETIRVE_TYPE_SETCOUNT="1";//指定数量回收    

	/**
	 * Default Empty Constructor for class ObCallbatchAss
	 */
	public ObCallbatchAss () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObCallbatchAss
	 */
	public ObCallbatchAss (
		 Long in_callbatchAssId
        ) {
		this.setCallbatchAssId(in_callbatchAssId);
    }

	
	public com.ulane.callout.model.outb.ObCallbatch getObCallbatch () {
		return obCallbatch;
	}	
	
	public void setObCallbatch (com.ulane.callout.model.outb.ObCallbatch in_obCallbatch) {
		this.obCallbatch = in_obCallbatch;
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

//	@SuppressWarnings("unchecked")
//    public java.util.Set getObCallbatchAssTasks () {
//		return obCallbatchAssTasks;
//	}	
//	
//	@SuppressWarnings("unchecked")
//    public void setObCallbatchAssTasks (java.util.Set in_obCallbatchAssTasks) {
//		this.obCallbatchAssTasks = in_obCallbatchAssTasks;
//	}

	@SuppressWarnings("unchecked")
    public java.util.Set getObCallbatchCuss () {
		return obCallbatchCuss;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObCallbatchCuss (java.util.Set in_obCallbatchCuss) {
		this.obCallbatchCuss = in_obCallbatchCuss;
	}

	@SuppressWarnings("unchecked")
    public java.util.Set getObSaletasks () {
		return obSaletasks;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObSaletasks (java.util.Set in_obSaletasks) {
		this.obSaletasks = in_obSaletasks;
	}
    

	/**
	 * 分配历史内码	 * @return Long
     * @hibernate.id column="CALLBATCH_ASS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getCallbatchAssId() {
		return this.callbatchAssId;
	}
	
	/**
	 * Set the callbatchAssId
	 */	
	public void setCallbatchAssId(Long aValue) {
		this.callbatchAssId = aValue;
	}	

	/**
	 * 上级分配历史内码	 * @return Long
	 * @hibernate.property column="PARENT_CALLBATCH_ASS_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getParentCallbatchAssId() {
		return this.parentCallbatchAssId;
	}
	
	/**
	 * Set the parentCallbatchAssId
	 */	
	public void setParentCallbatchAssId(Long aValue) {
		this.parentCallbatchAssId = aValue;
	}	

	/**
	 * 名单批次内码	 * @return Long
	 */
	public Long getCallbatchId() {
		return this.getObCallbatch()==null?null:this.getObCallbatch().getCallbatchId();
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
	 * 活动内码	 * @return Long
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
	 * 分配人内码	 * @return Long
	 * @hibernate.property column="FROM_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getFromUseId() {
		return this.fromUseId;
	}
	
	/**
	 * Set the fromUseId
	 * @spring.validator type="required"
	 */	
	public void setFromUseId(Long aValue) {
		this.fromUseId = aValue;
	}	

	/**
	 * 阶段：0-数据管理员分配、1-组长分配、2-班长分配&CONOB_CALLBATCH_ASS_JD	 * @return Short
	 * @hibernate.property column="ASS_STEP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Long getAssStepId() {
		return this.assStepId;
	}
	
	/**
	 * Set the assStepId
	 * @spring.validator type="required"
	 */	
	public void setAssStepId(Long aValue) {
		this.assStepId = aValue;
	}	

	/**
	 * 分配方式：0=名单分配 1=名单池分配&CONOB_CALLBATCH_ASS_FPFS	 * @return Short
	 * @hibernate.property column="ASS_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Long getAssTypId() {
		return this.assTypId;
	}
	
	/**
	 * Set the assTypId
	 * @spring.validator type="required"
	 */	
	public void setAssTypId(Long aValue) {
		this.assTypId = aValue;
	}	

	/**
	 * 接收人内码：分配方式为名单分配必填	 * @return Long
	 * @hibernate.property column="TO_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getToUseId() {
		return this.toUseId;
	}
	
	/**
	 * Set the toUseId
	 */	
	public void setToUseId(Long aValue) {
		this.toUseId = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="STA_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getStaDat() {
		return this.staDat;
	}
	
	/**
	 * Set the staDat
	 */	
	public void setStaDat(java.util.Date aValue) {
		this.staDat = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="END_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEndDat() {
		return this.endDat;
	}
	
	/**
	 * Set the endDat
	 */	
	public void setEndDat(java.util.Date aValue) {
		this.endDat = aValue;
	}	

	/**
	 * 接收分配数量，此次被上级分配到的数量	 * @return Integer
	 * @hibernate.property column="ASSIGN_COUNT" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getAssignCount() {
		return this.assignCount;
	}
	
	/**
	 * Set the assignCount
	 * @spring.validator type="required"
	 */	
	public void setAssignCount(Integer aValue) {
		this.assignCount = aValue;
	}	

	/**
	 * 被回收数量	 * @return Integer
	 * @hibernate.property column="RETRIVE_COUNT" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getRetriveCount() {
		return this.retriveCount;
	}
	
	/**
	 * Set the retriveCount
	 * @spring.validator type="required"
	 */	
	public void setRetriveCount(Integer aValue) {
		this.retriveCount = aValue;
	}	

	/**
	 * 剩余数量，可分配给下级的数量。如果接收人身份为坐席，则可分配数量不可用，置为0，否则：未分配给下级时=分配数量，分配给下级后要减去分配给下级的数量，直至为0.	 * @return Integer
	 * @hibernate.property column="HOLD_COUNT" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getHoldCount() {
		return this.holdCount;
	}
	
	/**
	 * Set the holdCount
	 * @spring.validator type="required"
	 */	
	public void setHoldCount(Integer aValue) {
		this.holdCount = aValue;
	}	

	public String getFromUseName() {
		return fromUseName;
	}

	public void setFromUseName(String fromUseName) {
		this.fromUseName = fromUseName;
	}

	public String getToUserName() {
		return toUserName;
	}

	public void setToUserName(String toUserName) {
		this.toUserName = toUserName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObCallbatchAss)) {
			return false;
		}
		ObCallbatchAss rhs = (ObCallbatchAss) object;
		return new EqualsBuilder()
				.append(this.callbatchAssId, rhs.callbatchAssId)
				.append(this.parentCallbatchAssId, rhs.parentCallbatchAssId)
										.append(this.fromUseId, rhs.fromUseId)
				.append(this.assStepId, rhs.assStepId)
				.append(this.assTypId, rhs.assTypId)
				.append(this.toUseId, rhs.toUseId)
				.append(this.staDat, rhs.staDat)
				.append(this.endDat, rhs.endDat)
				.append(this.assignCount, rhs.assignCount)
				.append(this.retriveCount, rhs.retriveCount)
				.append(this.holdCount, rhs.holdCount)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.callbatchAssId) 
				.append(this.parentCallbatchAssId) 
										.append(this.fromUseId) 
				.append(this.assStepId) 
				.append(this.assTypId) 
				.append(this.toUseId) 
				.append(this.staDat) 
				.append(this.endDat) 
				.append(this.assignCount) 
				.append(this.retriveCount) 
				.append(this.holdCount) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("callbatchAssId", this.callbatchAssId) 
				.append("parentCallbatchAssId", this.parentCallbatchAssId) 
										.append("fromUseId", this.fromUseId) 
				.append("assStepId", this.assStepId) 
				.append("assTypId", this.assTypId) 
				.append("toUseId", this.toUseId) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("assignCount", this.assignCount) 
				.append("retriveCount", this.retriveCount) 
				.append("holdCount", this.holdCount) 
				.toString();
	}

	public Integer getAssignedCount() {
		return assignedCount;
	}

	public void setAssignedCount(Integer assignedCount) {
		this.assignedCount = assignedCount;
	}

	public String getCallbatchAssIds() {
		return callbatchAssIds;
	}

	public void setCallbatchAssIds(String callbatchAssIds) {
		this.callbatchAssIds = callbatchAssIds;
	}

	public String getCallbatchNam() {
		return callbatchNam;
	}

	public void setCallbatchNam(String callbatchNam) {
		this.callbatchNam = callbatchNam;
	}

	public String getCalllistNam() {
		return calllistNam;
	}

	public void setCalllistNam(String calllistNam) {
		this.calllistNam = calllistNam;
	}

	public String getComNam() {
		return comNam;
	}

	public void setComNam(String comNam) {
		this.comNam = comNam;
	}

	public String getProjNam() {
		return projNam;
	}

	public void setProjNam(String projNam) {
		this.projNam = projNam;
	}

	public String getUserNo() {
		return userNo;
	}

	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}

	public Integer getCanReceiveCount() {
		return canReceiveCount;
	}

	public void setCanReceiveCount(Integer canReceiveCount) {
		this.canReceiveCount = canReceiveCount;
	}

	public Integer getRetriveCountAdmin() {
		return retriveCountAdmin;
	}

	public void setRetriveCountAdmin(Integer retriveCountAdmin) {
		this.retriveCountAdmin = retriveCountAdmin;
	}

	public Integer getRetriveCountJL() {
		return retriveCountJL;
	}

	public void setRetriveCountJL(Integer retriveCountJL) {
		this.retriveCountJL = retriveCountJL;
	}

	public Integer getRetriveCountZZ() {
		return retriveCountZZ;
	}

	public void setRetriveCountZZ(Integer retriveCountZZ) {
		this.retriveCountZZ = retriveCountZZ;
	}

	public java.util.Date getRetriveDat() {
		return retriveDat;
	}

	public void setRetriveDat(java.util.Date retriveDat) {
		this.retriveDat = retriveDat;
	}

	public String getToUserNo() {
		return toUserNo;
	}

	public void setToUserNo(String toUserNo) {
		this.toUserNo = toUserNo;
	}

	public com.htsoft.oa.model.system.AppUser getFromAppUser() {
		return fromAppUser;
	}

	public void setFromAppUser(com.htsoft.oa.model.system.AppUser fromAppUser) {
		this.fromAppUser = fromAppUser;
	}

	public com.htsoft.oa.model.system.AppUser getToAppUser() {
		return toAppUser;
	}

	public void setToAppUser(com.htsoft.oa.model.system.AppUser toAppUser) {
		this.toAppUser = toAppUser;
	}

	public Long getRetriveUseId() {
		return retriveUseId;
	}

	public void setRetriveUseId(Long retriveUseId) {
		this.retriveUseId = retriveUseId;
	}

	public com.htsoft.oa.model.system.AppUser getRetriveAppUser() {
		return retriveAppUser;
	}

	public void setRetriveAppUser(com.htsoft.oa.model.system.AppUser retriveAppUser) {
		this.retriveAppUser = retriveAppUser;
	}



}
