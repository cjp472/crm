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
 * ObCalllist Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObCalllist extends com.htsoft.core.model.BaseModel {

    protected Long calllistId;
	protected String calllistNam;
	protected Short calllistResouce;
	protected Long ownerTeam;
	protected String ownerTeamName;
	protected Short calllistTypId;
	protected Short cusTypId;
	protected java.util.Date staDat;
	protected java.util.Date endDat;
	protected String remark;
	protected Long creUseId;
	protected java.util.Date creTime;
	protected Long updUseId;
	protected java.util.Date updTime;
	protected Short calllistStaId;
	protected com.ulane.callout.model.outb.ObProject obProject;
//    protected com.ulane.callout.model.outb.ObComCalllist obComCalllist;
	@SuppressWarnings("unchecked")
    protected java.util.Set<ObCallbatch> obCallbatchs = new java.util.HashSet<ObCallbatch>();
	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchAsss = new java.util.HashSet();
	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchHiss = new java.util.HashSet();
    protected java.util.Set<ObCom> obComs = new java.util.HashSet<ObCom>();
	@SuppressWarnings("unchecked")
    protected java.util.Set obSaletasks = new java.util.HashSet();
	
	public static final String G_FLAG_ENABLE 	= "1";//对应名单启动（无其他限制）
	public static final String G_FLAG_ALL		= "2";//对应名单的全部（无其他限制）
	/**
	 * 新增：创建人名称、修改人名称字段
	 */
	protected String creUseName;
	protected String updUseName;
	
	
	protected String projNam;
	protected String comNam;
	protected Long comId;
	
	protected String calllistCode;
	
	protected  String isCanClear; //用于判断此名单下是否有未启用的批次，有未启用的批次，才显示清洗按钮
    //1--有 2--没有	
	
	public static final Short VALID = 0;				//有效(启用)
	public static final Short INVALID = 1;				//无效(注销)
	public static final Short CLOSE = 2;				//关闭(未启用)
	
	public static final Short CUSTYPE = 0;				//
	public static final Short ZHUXIAO = 2;				//注销
	
	//外呼名单来源
	public static final Short MDLY_LOCAL = 2;		    //本地客户数据
	public static final Short MDLY_OUT = 1;				//外部客户数据
	

	
	/**
	 * Default Empty Constructor for class ObCalllist
	 */
	public ObCalllist () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObCalllist
	 */
	public ObCalllist (
		 Long in_calllistId
        ) {
		this.setCalllistId(in_calllistId);
    }

	
	public String getOwnerTeamName() {
		return ownerTeamName;
	}

	public void setOwnerTeamName(String ownerTeamName) {
		this.ownerTeamName = ownerTeamName;
	}

	public com.ulane.callout.model.outb.ObProject getObProject () {
		return obProject;
	}	
	
	public void setObProject (com.ulane.callout.model.outb.ObProject in_obProject) {
		this.obProject = in_obProject;
	}

	@SuppressWarnings("unchecked")
    public java.util.Set getObCallbatchs () {
		return obCallbatchs;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObCallbatchs (java.util.Set in_obCallbatchs) {
		this.obCallbatchs = in_obCallbatchs;
	}

	@SuppressWarnings("unchecked")
    public java.util.Set getObCallbatchAsss () {
		return obCallbatchAsss;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObCallbatchAsss (java.util.Set in_obCallbatchAsss) {
		this.obCallbatchAsss = in_obCallbatchAsss;
	}

	@SuppressWarnings("unchecked")
    public java.util.Set getObCallbatchHiss () {
		return obCallbatchHiss;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObCallbatchHiss (java.util.Set in_obCallbatchHiss) {
		this.obCallbatchHiss = in_obCallbatchHiss;
	}

    public java.util.Set<ObCom> getObComs () {
		return obComs;
	}	
	
    public void setObComs (java.util.Set<ObCom> in_obComs) {
		this.obComs = in_obComs;
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
	 * 名单列表内码	 * @return Long
     * @hibernate.id column="CALLLIST_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getCalllistId() {
		return this.calllistId;
	}
	
	/**
	 * Set the calllistId
	 */	
	public void setCalllistId(Long aValue) {
		this.calllistId = aValue;
	}	

	/**
	 * 项目内码	 * @return Long
	 */
	public Long getProjId() {
		return this.getObProject()==null?null:this.getObProject().getProjId();
	}
	
	/**
	 * Set the projId
	 */	
	public void setProjId(Long aValue) {
	    if (aValue==null) {
	    	obProject = null;
	    } else if (obProject == null) {
	        obProject = new com.ulane.callout.model.outb.ObProject(aValue);
	        obProject.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obProject.setProjId(aValue);
	    }
	}	

	/**
	 * 名单列表名称	 * @return String
	 * @hibernate.property column="CALLLIST_NAM" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getCalllistNam() {
		return this.calllistNam;
	}
	
	/**
	 * Set the calllistNam
	 * @spring.validator type="required"
	 */	
	public void setCalllistNam(String aValue) {
		this.calllistNam = aValue;
	}	

	/**
	 * 名单来源&CONOB_MDLY	 * @return Short
	 * @hibernate.property column="CALLLIST_RESOUCE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCalllistResouce() {
		return this.calllistResouce;
	}
	
	/**
	 * Set the calllistResouce
	 */	
	public void setCalllistResouce(Short aValue) {
		this.calllistResouce = aValue;
	}	

	/**
	 * 所属机构	 * @return Long
	 * @hibernate.property column="OWNER_TEAM" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getOwnerTeam() {
		return this.ownerTeam;
	}
	
	/**
	 * Set the ownerTeam
	 */	
	public void setOwnerTeam(Long aValue) {
		this.ownerTeam = aValue;
	}	

	/**
	 * 名单类型：自定义&CONOB_CALLLIST_MDLX	 * @return Short
	 * @hibernate.property column="CALLLIST_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCalllistTypId() {
		return this.calllistTypId;
	}
	
	/**
	 * Set the calllistTypId
	 */	
	public void setCalllistTypId(Short aValue) {
		this.calllistTypId = aValue;
	}	

	/**
	 * 客户类型：个人客户，企业客户&CONOB_CALLLIST_KHLX	 * @return Short
	 * @hibernate.property column="CUS_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getCusTypId() {
		return this.cusTypId;
	}
	
	/**
	 * Set the cusTypId
	 * @spring.validator type="required"
	 */	
	public void setCusTypId(Short aValue) {
		this.cusTypId = aValue;
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
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="1024" not-null="false" unique="false"
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
	 * 创建人	 * @return Integer
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getCreUseId() {
		return this.creUseId;
	}
	
	/**
	 * Set the creUseId
	 */	
	public void setCreUseId(Long aValue) {
		this.creUseId = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CRE_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreTime() {
		return this.creTime;
	}
	
	/**
	 * Set the creTime
	 */	
	public void setCreTime(java.util.Date aValue) {
		this.creTime = aValue;
	}	

	/**
	 * 修改人	 * @return Integer
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdUseId() {
		return this.updUseId;
	}
	
	/**
	 * Set the updUseId
	 */	
	public void setUpdUseId(Long aValue) {
		this.updUseId = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPD_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getUpdTime() {
		return this.updTime;
	}
	
	/**
	 * Set the updTime
	 */	
	public void setUpdTime(java.util.Date aValue) {
		this.updTime = aValue;
	}	

	/**
	 * 状态：0=有效 1=无效 2=关闭&CONOB_CALLLIST_ZT	 * @return Short
	 * @hibernate.property column="CALLLIST_STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getCalllistStaId() {
		return this.calllistStaId;
	}
	
	/**
	 * Set the calllistStaId
	 * @spring.validator type="required"
	 */	
	public void setCalllistStaId(Short aValue) {
		this.calllistStaId = aValue;
	}	

	public String getCreUseName() {
		return creUseName;
	}

	public void setCreUseName(String creUseName) {
		this.creUseName = creUseName;
	}

	public String getUpdUseName() {
		return updUseName;
	}

	public void setUpdUseName(String updUseName) {
		this.updUseName = updUseName;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof ObCalllist)) {
			return false;
		}
		ObCalllist rhs = (ObCalllist) object;
		return new EqualsBuilder()
				.append(this.calllistId, rhs.calllistId)
				.append(this.calllistNam, rhs.calllistNam)
				.append(this.calllistResouce, rhs.calllistResouce)
				.append(this.calllistStaId, rhs.calllistStaId)
				.append(this.ownerTeam, rhs.ownerTeam)
				.append(this.calllistTypId, rhs.calllistTypId)
				.append(this.creTime, rhs.creTime)
				.append(this.creUseId, rhs.creUseId)
				.append(this.cusTypId, rhs.cusTypId)
				.append(this.endDat, rhs.endDat)
//				.append(this.obCallbatchAsss, rhs.obCallbatchAsss)
//				.append(this.obCallbatchHiss, rhs.obCallbatchHiss)
//				.append(this.obCallbatchs, rhs.obCallbatchs)
//				.append(this.obComs, rhs.obComs)
//				.append(this.obProject, rhs.obProject)
//				.append(this.obSaletasks, rhs.obSaletasks)
				.append(this.ownerTeam, rhs.ownerTeam)
				.append(this.remark, rhs.remark)
				.append(this.staDat, rhs.staDat)
				.append(this.updTime, rhs.updTime)
				.append(this.updUseId, rhs.updUseId)
				.isEquals();	
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
		.append(this.calllistId)
		.append(this.calllistNam)
		.append(this.calllistResouce)
		.append(this.calllistStaId)
		.append(this.ownerTeam)
		.append(this.calllistTypId)
		.append(this.creTime)
		.append(this.creUseId)
		.append(this.cusTypId)
		.append(this.endDat)
//		.append(this.obCallbatchAsss)
//		.append(this.obCallbatchHiss)
//		.append(this.obCallbatchs)
//		.append(this.obComs)
//		.append(this.obProject)
//		.append(this.obSaletasks)
		.append(this.ownerTeam)
		.append(this.remark)
		.append(this.staDat)
		.append(this.updTime)
		.append(this.updUseId)
		.toHashCode();		
	}

//	public com.ulane.callout.model.outb.ObComCalllist getObComCalllist() {
//		return obComCalllist;
//	}
//
//	public void setObComCalllist(
//			com.ulane.callout.model.outb.ObComCalllist obComCalllist) {
//		this.obComCalllist = obComCalllist;
//	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("calllistId", this.calllistId) 
						.append("calllistNam", this.calllistNam) 
				.append("calllistResouce", this.calllistResouce) 
				.append("ownerTeam", this.ownerTeam) 
				.append("calllistTypId", this.calllistTypId) 
				.append("cusTypId", this.cusTypId) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("remark", this.remark) 
				.append("creUseId", this.creUseId) 
				.append("creTime", this.creTime) 
				.append("updUseId", this.updUseId) 
				.append("updTime", this.updTime) 
				.append("calllistStaId", this.calllistStaId) 
				.toString();
	}

	public String getProjNam() {
		return projNam;
	}

	public void setProjNam(String projNam) {
		this.projNam = projNam;
	}

	public String getComNam() {
		return comNam;
	}

	public void setComNam(String comNam) {
		this.comNam = comNam;
	}

	public Long getComId() {
		return comId;
	}

	public void setComId(Long comId) {
		this.comId = comId;
	}

	public String getCalllistCode() {
		return calllistCode;
	}

	public void setCalllistCode(String calllistCode) {
		this.calllistCode = calllistCode;
	}

	public String getIsCanClear() {
		return isCanClear;
	}

	public void setIsCanClear(String isCanClear) {
		this.isCanClear = isCanClear;
	}

	
	
//	public ObCom getObCom() {
//	return obCom;
//}
//
//public void setObCom(ObCom obCom) {
//	this.obCom = obCom;
//}

}
