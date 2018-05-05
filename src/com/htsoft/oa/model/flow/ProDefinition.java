package com.htsoft.oa.model.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.GlobalType;

import flexjson.JSON;

/**
 * ProDefinition Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 流程定义
 */
public class ProDefinition extends com.htsoft.core.model.BaseModel {
	/**
	 * 激活
	 */
	public final static Short STATUS_ENABLE = 1;
	/**
	 * 禁用
	 */
	public final static Short STATUS_DISABLE = 0;
	
	public final static Short IS_DEFAULT=1;
	public final static Short IS_NOT_DEFAULT=0;
	
    protected Long defId;
    protected String processName;
	protected String name;
	protected String description;
	protected java.util.Date createtime;
	protected String deployId;
	protected String defXml;
	
	protected Integer newVersion; 
	protected String drawDefXml;
	protected Short status;
	//是否为系统缺省流程
	protected Short isDefault=IS_NOT_DEFAULT;
	
	protected GlobalType proType;
	
	
	/**
	 * 新增字段
	 * @author zhanyl
	 * busType;			//工单类型 ; 请假单.知识申请单等
	 * busClasses;		//工单类别 : 内部工单,外部工单
	 */
	protected Long busType;					//工单类型 ; 请假单.知识申请单等
	protected Long busClasses;				//工单类别 : 内部工单,外部工单
	protected java.util.Date updateTime;	//修改时间 	
	protected AppUser createBy;				//创建人
	protected AppUser updateBy;				//修改人
	protected AppUser startBy;				//启动人
	protected java.util.Date startTime;		//启动时间
	
	protected String createUserName;
	protected String updateUserName;
	protected String startUserName;
	@JSON
	public String getDefXml() {
		return defXml;
	}

	public void setDefXml(String defXml) {
		this.defXml = defXml;
	}
	

	public Long getBusType() {
		return busType;
	}

	public void setBusType(Long busType) {
		this.busType = busType;
	}

	public Long getBusClasses() {
		return busClasses;
	}

	public void setBusClasses(Long busClasses) {
		this.busClasses = busClasses;
	}

	/**
	 * Default Empty Constructor for class ProDefinition
	 */
	public ProDefinition () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ProDefinition
	 */
	public ProDefinition (
		 Long in_defId
        ) {
		this.setDefId(in_defId);
    }

	
	public GlobalType getProType () {
		return proType;
	}	
	
	public void setProType (GlobalType in_proType) {
		this.proType = in_proType;
	}
	
	public void setProTypeId(Long proTypeId){
		if(proType==null){
			proType=new GlobalType();
		}
		proType.setProTypeId(proTypeId);
	}
	
	public Long getProTypeId(){
		return proType==null?null:proType.getProTypeId();
	}

	/**
	 * 	 * @return Long
     * @hibernate.id column="defId" type="java.lang.Long" generator-class="native"
	 */
	public Long getDefId() {
		return this.defId;
	}
	
	/**
	 * Set the defId
	 */	
	public void setDefId(Long aValue) {
		this.defId = aValue;
	}	

	/**
	 * 分类ID	 * @return Long
	 */
	public Long getTypeId() {
		return this.getProType()==null?null:this.getProType().getProTypeId();
	}
	
	/**
	 * Set the typeId
	 */	
	public void setTypeId(Long aValue) {
	    if (aValue==null) {
	    	proType = null;
	    } else if (proType == null) {
	        proType = new GlobalType(aValue);
	        //proType.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			proType.setProTypeId(aValue);
	    }
	}	

	/**
	 * 流程的名称	 * @return String
	 * @hibernate.property column="name" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getName() {
		return this.name;
	}
	
	/**
	 * Set the name
	 * @spring.validator type="required"
	 */	
	public void setName(String aValue) {
		this.name = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="description" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getDescription() {
		return this.description;
	}
	
	/**
	 * Set the description
	 */	
	public void setDescription(String aValue) {
		this.description = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="createtime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getCreatetime() {
		return this.createtime;
	}
	
	/**
	 * Set the createtime
	 */	
	public void setCreatetime(java.util.Date aValue) {
		this.createtime = aValue;
	}	

	/**
	 * Jbpm 工作流id	 * @return String
	 * @hibernate.property column="deployId" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getDeployId() {
		return this.deployId;
	}
	
	/**
	 * Set the deployId
	 * @spring.validator type="required"
	 */	
	public void setDeployId(String aValue) {
		this.deployId = aValue;
	}	
	

	public String getDrawDefXml() {
		return drawDefXml;
	}

	public void setDrawDefXml(String drawDefXml) {
		this.drawDefXml = drawDefXml;
	}



	public Short getIsDefault() {
		return isDefault;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public Integer getNewVersion() {
		return newVersion;
	}

	public void setNewVersion(Integer newVersion) {
		this.newVersion = newVersion;
	}

	public void setIsDefault(Short isDefault) {
		this.isDefault = isDefault;
	}

	public Short getStatus() {
		return status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	public java.util.Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(java.util.Date updateTime) {
		this.updateTime = updateTime;
	}

	public AppUser getCreateBy() {
		return createBy;
	}

	public void setCreateBy(AppUser createBy) {
		this.createBy = createBy;
	}

	public AppUser getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(AppUser updateBy) {
		this.updateBy = updateBy;
	}

	public AppUser getStartBy() {
		return startBy;
	}

	public void setStartBy(AppUser startBy) {
		this.startBy = startBy;
	}

	public java.util.Date getStartTime() {
		return startTime;
	}

	public void setStartTime(java.util.Date startTime) {
		this.startTime = startTime;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getUpdateUserName() {
		return updateUserName;
	}

	public void setUpdateUserName(String updateUserName) {
		this.updateUserName = updateUserName;
	}

	public String getStartUserName() {
		return startUserName;
	}

	public void setStartUserName(String startUserName) {
		this.startUserName = startUserName;
	}
	
	
}
