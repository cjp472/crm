package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.system.FileAttach;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.running.model.pap.PapRelease;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * ObProject Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObProject extends com.htsoft.core.model.BaseModel {

    private Long projId;
	protected String projNam;
	protected String projAliNam;
	protected String projCod;
	protected Short projTypId;
	protected Long ownerTeam;
	protected Long perIncharge;
	protected Short srouceId;
	protected java.util.Date staDat;
	protected java.util.Date endDat;
	protected Short execTypId;
	protected String projJianjie;
	protected String projConFile;
	protected String remark;
	protected Long creUseId;
	protected java.util.Date creTime;
	protected Long updUseId;
	protected java.util.Date updTime;
	protected Short projStaId;
	protected Long runid;

	protected Short busiTypId;
	
	/***
	 * 新增转换字段
	 */
	protected String ownerTeamName;			//所属机构名
	protected String PerInchargeName;		//负责人名
	protected String projExecTypeStr;		//执行方式字符串
	/**
	 * 新增工作流字段
	 */
	protected String nodeName;			//节点名称
	protected String aprovalStatus;	//审批状态
	
	protected java.util.Set<ObCalllist> obCalllists = new java.util.HashSet<ObCalllist>();
	protected java.util.Set<ObCom> obComs = new java.util.HashSet<ObCom>();
	protected java.util.Set<FileAttach> fileAttachs = new java.util.HashSet<FileAttach>();
//	protected java.util.Set obProjProducts = new java.util.HashSet();
	protected java.util.Set<PapRelease> papReleases = new java.util.HashSet<PapRelease>();
	protected java.util.Set<UlUsergroup> ulUsergroups = new java.util.HashSet<UlUsergroup>();
	
	protected java.util.Set<ObProjExecType> obProjExecTypes = new java.util.HashSet<ObProjExecType>();
	
	public static final Short STAGE_PLAN    	= 1;			//策划阶段
	public static final Short STAGE_AUDIT		= 2;			//审核阶段
	public static final Short STAGE_EXEC		= 3;			//执行阶段
	public static final Short STAGE_ANLSYS		= 4;			//分析阶段
	public static final Short STAGE_CLOSE		= 5;			//结束阶段
	
	public static final Short FLAG_DISABLED 	= 0;			//未启动
	public static final Short FLAG_CHECKING 	= 1;			//审核中
	public static final Short FLAG_EXECUTING 	= 2;			//执行中
	public static final Short FLAG_PAUSE 		= 3;			//停止
	public static final Short FLAG_CLOSE 		= 4;			//关闭
	public static final Short FLAG_CANCELED 	= 5;			//取消
	
	public static final String G_FLAG_ENABLE 	= "1";//对应项目启动
	public static final String G_FLAG_ALL		= "2";//对应项目的全部（无其他限制）

	/**
	 * Default Empty Constructor for class ObProject
	 */
	public ObProject () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObProject
	 */
	public ObProject (
		 Long in_projId
        ) {
		this.setProjId(in_projId);
    }


	public java.util.Set<ObCalllist> getObCalllists () {
		return obCalllists;
	}	
	
	public void setObCalllists (java.util.Set<ObCalllist> in_obCalllists) {
		this.obCalllists = in_obCalllists;
	}

	public java.util.Set<ObCom> getObComs () {
		return obComs;
	}	
	
	public void setObComs (java.util.Set<ObCom> in_obComs) {
		this.obComs = in_obComs;
	}

	public java.util.Set<FileAttach> getFileAttachs () {
		return fileAttachs;
	}	
	
	public void setFileAttachs (java.util.Set<FileAttach> in_fileAttachs) {
		this.fileAttachs = in_fileAttachs;
	}

//	public java.util.Set getObProjProducts () {
//		return obProjProducts;
//	}	
//	
//	public void setObProjProducts (java.util.Set in_obProjProducts) {
//		this.obProjProducts = in_obProjProducts;
//	}

	public java.util.Set<PapRelease> getPapReleases () {
		return papReleases;
	}	
	
	public void setPapReleases (java.util.Set<PapRelease> in_papReleases) {
		this.papReleases = in_papReleases;
	}

	public java.util.Set<UlUsergroup> getUlUsergroups () {
		return ulUsergroups;
	}	
	
	public void setUlUsergroups (java.util.Set<UlUsergroup> in_ulUsergroups) {
		this.ulUsergroups = in_ulUsergroups;
	}
    

	/**
	 * 项目内码	 * @return Long
     * @hibernate.id column="PROJ_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getProjId() {
		return this.projId;
	}
	
	/**
	 * Set the projId
	 */	
	public void setProjId(Long aValue) {
		this.projId = aValue;
	}	

	/**
	 * 项目名称	 * @return String
	 * @hibernate.property column="PROJ_NAM" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getProjNam() {
		return this.projNam;
	}
	
	/**
	 * Set the projNam
	 * @spring.validator type="required"
	 */	
	public void setProjNam(String aValue) {
		this.projNam = aValue;
	}	

	/**
	 * 项目简称	 * @return String
	 * @hibernate.property column="PROJ_ALI_NAM" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getProjAliNam() {
		return this.projAliNam;
	}
	
	/**
	 * Set the projAliNam
	 */	
	public void setProjAliNam(String aValue) {
		this.projAliNam = aValue;
	}	

	/**
	 * 项目编号	 * @return String
	 * @hibernate.property column="PROJ_COD" type="java.lang.String" length="36" not-null="false" unique="false"
	 */
	public String getProjCod() {
		return this.projCod;
	}
	
	/**
	 * Set the projCod
	 */	
	public void setProjCod(String aValue) {
		this.projCod = aValue;
	}	

	/**
	 * 项目类别：自定义&CONOB_PROJECT_XMLB	 * @return Short
	 * @hibernate.property column="PROJ_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getProjTypId() {
		return this.projTypId;
	}
	
	/**
	 * Set the projTypId
	 */	
	public void setProjTypId(Short aValue) {
		this.projTypId = aValue;
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
	 * 负责人	 * @return Long
	 * @hibernate.property column="PER_INCHARGE" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getPerIncharge() {
		return this.perIncharge;
	}
	
	/**
	 * Set the perIncharge
	 */	
	public void setPerIncharge(Long aValue) {
		this.perIncharge = aValue;
	}	

	/**
	 * 来源：自定义&CONOB_PROJECT_LY	 * @return Short
	 * @hibernate.property column="SROUCE_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getSrouceId() {
		return this.srouceId;
	}
	
	/**
	 * Set the srouceId
	 */	
	public void setSrouceId(Short aValue) {
		this.srouceId = aValue;
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
	 * 截止时间	 * @return java.util.Date
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
	 * 执行方式：电话、邮件、传真、短信、邮寄等&CONOB_PROJECT_ZXFS	 * @return Short
	 * @hibernate.property column="EXEC_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getExecTypId() {
		return this.execTypId;
	}
	
	/**
	 * Set the execTypId
	 */	
	public void setExecTypId(Short aValue) {
		this.execTypId = aValue;
	}	

	/**
	 * 项目简介	 * @return String
	 * @hibernate.property column="PROJ_JIANJIE" type="java.lang.String" length="4000" not-null="false" unique="false"
	 */
	public String getProjJianjie() {
		return this.projJianjie;
	}
	
	/**
	 * Set the projJianjie
	 */	
	public void setProjJianjie(String aValue) {
		this.projJianjie = aValue;
	}	

	/**
	 * 项目描述：文件路径	 * @return String
	 * @hibernate.property column="PROJ_CON_FILE" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getProjConFile() {
		return this.projConFile;
	}
	
	/**
	 * Set the projConFile
	 */	
	public void setProjConFile(String aValue) {
		this.projConFile = aValue;
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
	 * 创建人	 * @return Long
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
	 * 修改人	 * @return Long
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
	 * 状态：0=未启动 1=启用 2=关闭&CONOB_PROJECT_ZT	 * @return Short
	 * @hibernate.property column="PROJ_STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getProjStaId() {
		return this.projStaId;
	}
	
	/**
	 * Set the projStaId
	 * @spring.validator type="required"
	 */	
	public void setProjStaId(Short aValue) {
		this.projStaId = aValue;
	}	

	/**
	 * 流程内码	 * @return Long
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


	public String getAprovalStatus() {
		return aprovalStatus;
	}

	public void setAprovalStatus(String aprovalStatus) {
		this.aprovalStatus = aprovalStatus;
	}

	public String getOwnerTeamName() {
		return ownerTeamName;
	}

	public void setOwnerTeamName(String ownerTeamName) {
		this.ownerTeamName = ownerTeamName;
	}

	public String getPerInchargeName() {
		return PerInchargeName;
	}

	public void setPerInchargeName(String perInchargeName) {
		PerInchargeName = perInchargeName;
	}

	public java.util.Set<ObProjExecType> getObProjExecTypes() {
		return obProjExecTypes;
	}

	public void setObProjExecTypes(java.util.Set<ObProjExecType> obProjExecTypes) {
		this.obProjExecTypes = obProjExecTypes;
	}

	public String getProjExecTypeStr() {
		return projExecTypeStr;
	}

	public void setProjExecTypeStr(String projExecTypeStr) {
		this.projExecTypeStr = projExecTypeStr;
	}

	public Short getBusiTypId() {
		return busiTypId;
	}

	public void setBusiTypId(Short busiTypId) {
		this.busiTypId = busiTypId;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObProject)) {
			return false;
		}
		ObProject rhs = (ObProject) object;
		return new EqualsBuilder()
				.append(this.projId, rhs.projId)
				.append(this.projNam, rhs.projNam)
				.append(this.projAliNam, rhs.projAliNam)
				.append(this.projCod, rhs.projCod)
				.append(this.projTypId, rhs.projTypId)
				.append(this.ownerTeam, rhs.ownerTeam)
				.append(this.perIncharge, rhs.perIncharge)
				.append(this.srouceId, rhs.srouceId)
				.append(this.staDat, rhs.staDat)
				.append(this.endDat, rhs.endDat)
				.append(this.execTypId, rhs.execTypId)
				.append(this.projJianjie, rhs.projJianjie)
				.append(this.projConFile, rhs.projConFile)
				.append(this.remark, rhs.remark)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creTime, rhs.creTime)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updTime, rhs.updTime)
				.append(this.projStaId, rhs.projStaId)
				.append(this.runid, rhs.runid)
				.append(this.nodeName, rhs.nodeName)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.projId) 
				.append(this.projNam) 
				.append(this.projAliNam) 
				.append(this.projCod) 
				.append(this.projTypId) 
				.append(this.ownerTeam) 
				.append(this.perIncharge) 
				.append(this.srouceId) 
				.append(this.staDat) 
				.append(this.endDat) 
				.append(this.execTypId) 
				.append(this.projJianjie) 
				.append(this.projConFile) 
				.append(this.remark) 
				.append(this.creUseId) 
				.append(this.creTime) 
				.append(this.updUseId) 
				.append(this.updTime) 
				.append(this.projStaId) 
				.append(this.runid) 
				.append(this.nodeName) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("projId", this.projId) 
				.append("projNam", this.projNam) 
				.append("projAliNam", this.projAliNam) 
				.append("projCod", this.projCod) 
				.append("projTypId", this.projTypId) 
				.append("ownerTeam", this.ownerTeam) 
				.append("perIncharge", this.perIncharge) 
				.append("srouceId", this.srouceId) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("execTypId", this.execTypId) 
				.append("projJianjie", this.projJianjie) 
				.append("projConFile", this.projConFile) 
				.append("remark", this.remark) 
				.append("creUseId", this.creUseId) 
				.append("creTime", this.creTime) 
				.append("updUseId", this.updUseId) 
				.append("updTime", this.updTime) 
				.append("projStaId", this.projStaId) 
				.append("runid", this.runid) 
				.append("nodeName", this.nodeName) 
				.toString();
	}



}
