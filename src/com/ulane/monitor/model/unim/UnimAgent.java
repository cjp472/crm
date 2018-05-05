package com.ulane.monitor.model.unim;
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
 * UnimAgent Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimAgent extends com.htsoft.core.model.BaseModel {

    protected Long agentId;
	protected String aid;
	protected String agentName;
	protected String agentPass;
	protected String agentCode;
	protected Long ismonitor;
	protected String remark;
	protected Long userId;
	protected Short status;			//状态
	protected String jobType;		//职位
	protected String jobClass;		//职级
	
	protected String userName;
	protected String depName;
	protected String employeeId;
	protected String agentCodeName;
	protected String uaSkgsJson;
	protected String uaMnAgtJson;
	protected String uaMapAgtJson;
	protected String uaThrAgtJson;
	protected String uaChaAgtJson;
	protected String uaAssAgtJson;
	
	protected String uaMapBusJson;
	protected String uaMapAssJson;
	
	//add by liuqh
	protected String jobTypeName;//职位名称
	protected String jobClassName;//职级名称
	protected String agentColor;//监控显示颜色
	
	public static final Short STA_ENABLE 	= 1;		//1——启用&ZZJGZT0001
	public static final Short STA_CANCELED	= 2;		//2——注销&ZZJGZT0001
	
	public static final Long isMonitor_Y	= 1L;		//1——是
	public static final Long isMonitor_N	= 0L;		//0——否
	protected com.ulane.monitor.model.unim.UnimServerConfig unimServerConfig;

	protected java.util.Set<UnimAgentSkillgroup> unimAgentSkillgroups = new java.util.HashSet<UnimAgentSkillgroup>();
	protected java.util.Set<UnimMapAgent> unimMapAgents = new java.util.HashSet<UnimMapAgent>();
	protected java.util.Set<UnimMonitorAgent> unimMonitorAgents = new java.util.HashSet<UnimMonitorAgent>();
	//protected java.util.Set<UnimThrlevl> unimThrlevls = new java.util.HashSet<UnimThrlevl>();
	
	protected java.util.Set<UnimChannel> unimChannels = new java.util.HashSet<UnimChannel>();
	protected java.util.Set<UnimAssets> unimAssetss = new java.util.HashSet<UnimAssets>();
	
	protected java.util.Set<UnimChannelMap> unimMapChannels = new java.util.HashSet<UnimChannelMap>();
	protected java.util.Set<UnimAssetsMap> unimMapAssetss = new java.util.HashSet<UnimAssetsMap>();
	
	/**
	 * Default Empty Constructor for class UnimAgent
	 */
	public UnimAgent () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimAgent
	 */
	public UnimAgent (
		 Long in_agentId
        ) {
		this.setAgentId(in_agentId);
    }

	public java.util.Set<UnimChannel> getUnimChannels() {
		return unimChannels;
	}

	public void setUnimChannels(java.util.Set<UnimChannel> unimChannels) {
		this.unimChannels = unimChannels;
	}

	public java.util.Set<UnimChannelMap> getUnimMapChannels() {
		return unimMapChannels;
	}

	public void setUnimMapChannels(java.util.Set<UnimChannelMap> unimMapChannels) {
		this.unimMapChannels = unimMapChannels;
	}

	public java.util.Set<UnimAssetsMap> getUnimMapAssetss() {
		return unimMapAssetss;
	}

	public void setUnimMapAssetss(java.util.Set<UnimAssetsMap> unimMapAssetss) {
		this.unimMapAssetss = unimMapAssetss;
	}

	public java.util.Set<UnimAssets> getUnimAssetss() {
		return unimAssetss;
	}

	public void setUnimAssetss(java.util.Set<UnimAssets> unimAssetss) {
		this.unimAssetss = unimAssetss;
	}

	public com.ulane.monitor.model.unim.UnimServerConfig getUnimServerConfig () {
		return unimServerConfig;
	}	
	
	public void setUnimServerConfig (com.ulane.monitor.model.unim.UnimServerConfig in_unimServerConfig) {
		this.unimServerConfig = in_unimServerConfig;
	}

	public java.util.Set<UnimAgentSkillgroup> getUnimAgentSkillgroups () {
		return unimAgentSkillgroups;
	}	
	
	public void setUnimAgentSkillgroups (java.util.Set<UnimAgentSkillgroup> in_unimAgentSkillgroups) {
		this.unimAgentSkillgroups = in_unimAgentSkillgroups;
	}

	public java.util.Set<UnimMapAgent> getUnimMapAgents () {
		return unimMapAgents;
	}	
	
	public void setUnimMapAgents (java.util.Set<UnimMapAgent> in_unimMapAgents) {
		this.unimMapAgents = in_unimMapAgents;
	}

	public java.util.Set<UnimMonitorAgent> getUnimMonitorAgents () {
		return unimMonitorAgents;
	}	
	
	public void setUnimMonitorAgents (java.util.Set<UnimMonitorAgent> in_unimMonitorAgents) {
		this.unimMonitorAgents = in_unimMonitorAgents;
	}

//	public java.util.Set<UnimThrlevl> getUnimThrlevls () {
//		return unimThrlevls;
//	}	
//	
//	public void setUnimThrlevls (java.util.Set<UnimThrlevl> in_unimThrlevls) {
//		this.unimThrlevls = in_unimThrlevls;
//	}
    

	/**
	 * ID	 * @return Long
     * @hibernate.id column="AGENT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getAgentId() {
		return this.agentId;
	}
	
	/**
	 * Set the agentId
	 */	
	public void setAgentId(Long aValue) {
		this.agentId = aValue;
	}	

	/**
	 * 工号	 * @return String
	 * @hibernate.property column="AID" type="java.lang.String" length="15" not-null="false" unique="false"
	 */
	public String getAid() {
		return this.aid;
	}
	
	/**
	 * Set the aid
	 */	
	public void setAid(String aValue) {
		this.aid = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="AGENT_NAME" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getAgentName() {
		return this.agentName;
	}
	
	/**
	 * Set the agentName
	 */	
	public void setAgentName(String aValue) {
		this.agentName = aValue;
	}	

	/**
	 * 密码	 * @return String
	 * @hibernate.property column="AGENT_PASS" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getAgentPass() {
		return this.agentPass;
	}
	
	/**
	 * Set the agentPass
	 */	
	public void setAgentPass(String aValue) {
		this.agentPass = aValue;
	}	

	/**
	 * 所属服务器	 * @return Long
	 */
	public Long getServerId() {
		return this.getUnimServerConfig()==null?null:this.getUnimServerConfig().getServerId();
	}
	
	/**
	 * Set the serverId
	 */	
	public void setServerId(Long aValue) {
	    if (aValue==null) {
	    	unimServerConfig = null;
	    } else if (unimServerConfig == null) {
	        unimServerConfig = new com.ulane.monitor.model.unim.UnimServerConfig(aValue);
	        unimServerConfig.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			unimServerConfig.setServerId(aValue);
	    }
	}	

	/**
	 * 分类	 * @return String
	 * @hibernate.property column="AGENT_CODE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getAgentCode() {
		return this.agentCode;
	}
	
	/**
	 * Set the agentCode
	 */	
	public void setAgentCode(String aValue) {
		this.agentCode = aValue;
	}	

	/**
	 * 是否监控1是2否	 * @return Long
	 * @hibernate.property column="ISMONITOR" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getIsmonitor() {
		return this.ismonitor;
	}
	
	/**
	 * Set the ismonitor
	 */	
	public void setIsmonitor(Long aValue) {
		this.ismonitor = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="4000" not-null="false" unique="false"
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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAgentCodeName() {
		return agentCodeName;
	}

	public void setAgentCodeName(String agentCodeName) {
		this.agentCodeName = agentCodeName;
	}

	public Short getStatus() {
		return status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getJobClass() {
		return jobClass;
	}

	public void setJobClass(String jobClass) {
		this.jobClass = jobClass;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getUaSkgsJson() {
		return uaSkgsJson;
	}

	public void setUaSkgsJson(String uaSkgsJson) {
		this.uaSkgsJson = uaSkgsJson;
	}

	public String getUaMnAgtJson() {
		return uaMnAgtJson;
	}

	public void setUaMnAgtJson(String uaMnAgtJson) {
		this.uaMnAgtJson = uaMnAgtJson;
	}

	public String getUaMapAgtJson() {
		return uaMapAgtJson;
	}

	public void setUaMapAgtJson(String uaMapAgtJson) {
		this.uaMapAgtJson = uaMapAgtJson;
	}

	public String getUaThrAgtJson() {
		return uaThrAgtJson;
	}

	public void setUaThrAgtJson(String uaThrAgtJson) {
		this.uaThrAgtJson = uaThrAgtJson;
	}

	public String getUaChaAgtJson() {
		return uaChaAgtJson;
	}

	public void setUaChaAgtJson(String uaChaAgtJson) {
		this.uaChaAgtJson = uaChaAgtJson;
	}

	public String getUaAssAgtJson() {
		return uaAssAgtJson;
	}

	public void setUaAssAgtJson(String uaAssAgtJson) {
		this.uaAssAgtJson = uaAssAgtJson;
	}

	public String getJobTypeName() {
		return jobTypeName;
	}

	public void setJobTypeName(String jobTypeName) {
		this.jobTypeName = jobTypeName;
	}

	public String getJobClassName() {
		return jobClassName;
	}

	public void setJobClassName(String jobClassName) {
		this.jobClassName = jobClassName;
	}

	public String getAgentColor() {
		return agentColor;
	}

	public void setAgentColor(String agentColor) {
		this.agentColor = agentColor;
	}

	public String getUaMapBusJson() {
		return uaMapBusJson;
	}

	public void setUaMapBusJson(String uaMapBusJson) {
		this.uaMapBusJson = uaMapBusJson;
	}

	public String getUaMapAssJson() {
		return uaMapAssJson;
	}

	public void setUaMapAssJson(String uaMapAssJson) {
		this.uaMapAssJson = uaMapAssJson;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UnimAgent)) {
			return false;
		}
		UnimAgent rhs = (UnimAgent) object;
		return new EqualsBuilder()
				.append(this.agentId, rhs.agentId)
				.append(this.aid, rhs.aid)
				.append(this.agentName, rhs.agentName)
				.append(this.agentPass, rhs.agentPass)
						.append(this.agentCode, rhs.agentCode)
				.append(this.ismonitor, rhs.ismonitor)
				.append(this.remark, rhs.remark)
				.append(this.userId,rhs.userId)
				.append(this.status, rhs.status)
				.append(this.jobType, rhs.jobType)
				.append(this.jobClass, rhs.jobClass)
				.append(this.uaSkgsJson, rhs.uaSkgsJson)
				.append(this.uaMapAgtJson, rhs.uaMapAgtJson)
				.append(this.uaMnAgtJson, rhs.uaMnAgtJson)
				.append(this.uaThrAgtJson, rhs.uaThrAgtJson)
				.append(this.uaChaAgtJson, rhs.uaChaAgtJson)
				.append(this.uaAssAgtJson, rhs.uaAssAgtJson)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.agentId) 
				.append(this.aid) 
				.append(this.agentName) 
				.append(this.agentPass) 
						.append(this.agentCode) 
				.append(this.ismonitor) 
				.append(this.remark)
				.append(this.userId)
				.append(this.status)
				.append(this.jobType)
				.append(this.jobClass)
				.append(this.uaSkgsJson)
				.append(this.uaMapAgtJson)
				.append(this.uaThrAgtJson)
				.append(this.uaMnAgtJson)
				.append(this.uaChaAgtJson)
				.append(this.uaAssAgtJson)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("agentId", this.agentId) 
				.append("aid", this.aid) 
				.append("agentName", this.agentName) 
				.append("agentPass", this.agentPass) 
						.append("agentCode", this.agentCode) 
				.append("ismonitor", this.ismonitor) 
				.append("remark", this.remark)
				.append("userId",this.userId)
				.append("status",this.status)
				.append("jobType",this.jobType)
				.append("jobClass",this.jobClass)
				.append("uaSkgsJson",this.uaSkgsJson)
				.append("uaMapAgtJson",this.uaMapAgtJson)
				.append("uaMnAgtJson",this.uaMnAgtJson)
				.append("uaThrAgtJson",this.uaThrAgtJson)
				.append("uaChaAgtJson",this.uaChaAgtJson)
				.append("uaAssAgtJson",this.uaAssAgtJson)
				.toString();
	}



}
