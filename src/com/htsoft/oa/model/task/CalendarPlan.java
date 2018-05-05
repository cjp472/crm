package com.htsoft.oa.model.task;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.util.Date;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.google.gson.annotations.Expose;

/**
 * CalendarPlan Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 * 
 */
public class CalendarPlan extends com.htsoft.core.model.BaseModel {
	//完成状态
	//未完成 		现在是：处理中
	public static final Short STATUS_UNFINISHED=1;
	//完成 		现在是：已结案
	public static final Short STATUS_FINISHED=2;
	
//	var COM_YXJ = new Map();
//	COM_YXJ.put('0','非常高');
//	COM_YXJ.put('2','中');
//	COM_YXJ.put('3','低');
//	COM_YXJ.put('1','高');
	//重要程度
	//一般	现在是：非常高
	public static final Short URGENT_COMMON=0;
	//重要	现在是：高
	public static final Short URGENT_IMPORTANT=1;
	//紧急	现在是：中
	public static final Short URGENT_INST=2;
	//低
	public static final Short URGENT_LOW=3;
	
	//显示方式
	public static final Short SHOW_STYLE_IN_TASK=1;//仅在任务中显示
	public static final Short SHOW_STYLE_IN_TASK_AND_SCHEDULE=2;//在任务和日程中显示
	
	//任务类型
	public static final Short TASK_STYLE_IN=1;//呼入任务
	public static final Short TASK_STYLE_OUT=2;//呼出任务
	public static final Short TASK_STYLE_DAILY=3;//日常任务
	
	//任务事项为外呼
	public static final Long TASK_CATEGORY_OUTB = 20L;
	//任务类别为外呼
	public static final Long SOURCE_STYLE_OUT=2L;//呼出任务

	@Expose
    protected Long planId;	//内码
	@Expose
	protected java.util.Date startTime;  //开始时间
	@Expose
	protected java.util.Date endTime;	//结束时间
	@Expose
	protected Short urgent; //紧急程度
	@Expose
	protected String content;	//内容
	@Expose
	protected Short status;	//状态
	@Expose
	protected String fullname;
	@Expose
	protected String assignerId; //被分配人
	@Expose
	protected String assignerName;  //分配人名称
	@Expose
	protected String feedback;	//反馈意见
	@Expose
	protected Short showStyle;	//显示方式
	
	@Expose
	protected Long userId;	//用户id
	//protected com.htsoft.oa.model.system.AppUser appUser;
	@Expose
	protected String taskTitle;	//标题
	@Expose
	protected Long sourceId;	//来源id  服务请求id
	@Expose
	protected Long source;	//任务来源     服务请求，外呼营销   字典：SYSSSOURCE
	@Expose
	protected Short taskType;	//任务类型     字典:CONFX
	@Expose
	protected Long taskCategory;	//任务类别     字典：CONTPJYLX
	@Expose
	protected Long taskBusiType;     //任务事项   数据字典：CONTPCLJG
	@Expose
	protected Date completeTime;	//要求完成时间
	@Expose
	protected String planNote;	//备注
	@Expose
	protected Long remindWay;  //提醒方式
	@Expose
	protected Date remindTime; //提醒时间
	@Expose
	protected String remindNote; //提醒内容
	@Expose
	protected Long sponsor;  //发起客户
	@Expose
	protected Long effeciency;//完成率
	@Expose
	protected String linkMan;//联系人
	@Expose
	protected String numAddress;//地址或号码
	@Expose
	protected String cusName;//客户姓名
	@Expose
	protected Long remind;//提醒
	@Expose
	protected Long execType; //执行方式（也就是联系方式） 字典：LXFS001
	@Expose
	protected Long dicTaskType; //临时显示数据字典索引值类型
	@Expose
	protected Long dicTaskCategory; //临时显示类别
	@Expose
	protected Long dicBusiType; //临时显示事项
	
	public static final Short STA_UNDO 		= 1;	//未处理		
	public static final Short STA_EXECUTING = 2;	//处理中
	
	public String getStatusName(){
		if(status == STATUS_FINISHED){
			return "已结案";
		}else{
			return "处理中";
		}
	}
	
	public String getUrgentName(){
		if(urgent == URGENT_COMMON){
			return "非常高";
		}else if(urgent == URGENT_IMPORTANT){
			return "高";
		}else if(urgent == URGENT_INST){
			return "中";
		}else {
			return "低";
		}
	}

	/**
	 * Default Empty Constructor for class CalendarPlan
	 */
	public CalendarPlan () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CalendarPlan
	 */
	public CalendarPlan (
		 Long in_planId
        ) {
		this.setPlanId(in_planId);
    }
	
	public String getColor(){
		if(STATUS_FINISHED == status){
			return "#D5E4BD";
		}
		if(URGENT_INST == urgent){
			return "#94B98D";
		}else if(URGENT_IMPORTANT == urgent){
			return "#FFBDB4";
		}else{
			return "#7799BF";
		}
	}
	
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
//	public com.htsoft.oa.model.system.AppUser getAppUser () {
//		return appUser;
//	}	
//	
//	public void setAppUser (com.htsoft.oa.model.system.AppUser in_appUser) {
//		this.appUser = in_appUser;
//	}
    
	/**
	 * 	 * @return Long
     * @hibernate.id column="planId" type="java.lang.Long" generator-class="native"
	 */
	public Long getPlanId() {
		return this.planId;
	}
	
	/**
	 * Set the planId
	 */	
	public void setPlanId(Long aValue) {
		this.planId = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="startTime" type="java.util.Date" length="19" not-null="false" unique="false"
	 */
	public java.util.Date getStartTime() {
		return this.startTime;
	}
	
	/**
	 * Set the startTime
	 */	
	public void setStartTime(java.util.Date aValue) {
		this.startTime = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="endTime" type="java.util.Date" length="19" not-null="false" unique="false"
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
	 * 紧急程度
            0=一般
            1=重要
            2=紧急	 * @return Short
	 * @hibernate.property column="urgent" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getUrgent() {
		return this.urgent;
	}
	
	/**
	 * Set the urgent
	 * @spring.validator type="required"
	 */	
	public void setUrgent(Short aValue) {
		this.urgent = aValue;
	}	

	/**
	 * 内容	 * @return String
	 * @hibernate.property column="content" type="java.lang.String" length="1200" not-null="true" unique="false"
	 */
	public String getContent() {
		return this.content;
	}
	
	/**
	 * Set the content
	 * @spring.validator type="required"
	 */	
	public void setContent(String aValue) {
		this.content = aValue;
	}	

	/**
	 * 状态
            0=未完成
            1=完成	 * @return Short
	 * @hibernate.property column="status" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 * @spring.validator type="required"
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * 员工ID	 * @return Long
	 */
//	public Long getUserId() {
//		return this.getAppUser()==null?null:this.getAppUser().getUserId();
//	}
//	
//	/**
//	 * Set the userId
//	 */	
//	public void setUserId(Long aValue) {
//	    if (aValue==null) {
//	    	appUser = null;
//	    } else if (appUser == null) {
//	        appUser = new com.htsoft.oa.model.system.AppUser(aValue);
//	        appUser.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//			appUser.setUserId(aValue);
//	    }
//	}	

	/**
	 * 员工名	 * @return String
	 * @hibernate.property column="fullname" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getFullname() {
		return this.fullname;
	}
	
	/**
	 * Set the fullname
	 */	
	public void setFullname(String aValue) {
		this.fullname = aValue;
	}	

	/**
	 * 分配人	 * @return String
	 * @hibernate.property column="assignerId" type="java.lang.String" length="200" not-null="true" unique="false"
	 */
	public String getAssignerId() {
		return this.assignerId;
	}
	
	/**
	 * Set the assignerId
	 * @spring.validator type="required"
	 */	
	public void setAssignerId(String aValue) {
		this.assignerId = aValue;
	}	

	/**
	 * 分配人名	 * @return String
	 * @hibernate.property column="assignerName" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getAssignerName() {
		return this.assignerName;
	}
	
	/**
	 * Set the assignerName
	 */	
	public void setAssignerName(String aValue) {
		this.assignerName = aValue;
	}	

	/**
	 * 反馈意见	 * @return String
	 * @hibernate.property column="feedback" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getFeedback() {
		return this.feedback;
	}
	
	/**
	 * Set the feedback
	 */	
	public void setFeedback(String aValue) {
		this.feedback = aValue;
	}	

	/**
	 * 显示方式
            1=仅在任务中显示
            2=在日程与任务中显示	 * @return Short
	 * @hibernate.property column="showStyle" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getShowStyle() {
		return this.showStyle;
	}
	
	/**
	 * Set the showStyle
	 * @spring.validator type="required"
	 */	
	public void setShowStyle(Short aValue) {
		this.showStyle = aValue;
	}	

	/**
	 * 任务类型
            1=限期任务
            2=非限期任务	 * @return Short
	 * @hibernate.property column="taskType" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getTaskType() {
		return this.taskType;
	}
	
	/**
	 * Set the taskType
	 * @spring.validator type="required"
	 */	
	public void setTaskType(Short aValue) {
		this.taskType = aValue;
	}	

	public String getTaskTitle() {
		return taskTitle;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public Long getSource() {
		return source;
	}

	public void setSource(Long source) {
		this.source = source;
	}

	public Long getSourceId() {
		return sourceId;
	}

	public void setSourceId(Long sourceId) {
		this.sourceId = sourceId;
	}

	public Long getTaskCategory() {
		return taskCategory;
	}

	public void setTaskCategory(Long taskCategory) {
		this.taskCategory = taskCategory;
	}

	public Date getCompleteTime() {
		return completeTime;
	}

	public void setCompleteTime(Date completeTime) {
		this.completeTime = completeTime;
	}

	public Long getTaskBusiType() {
		return taskBusiType;
	}

	public void setTaskBusiType(Long taskBusiType) {
		this.taskBusiType = taskBusiType;
	}

	public String getPlanNote() {
		return planNote;
	}

	public void setPlanNote(String planNote) {
		this.planNote = planNote;
	}

	public Long getRemindWay() {
		return remindWay;
	}

	public void setRemindWay(Long remindWay) {
		this.remindWay = remindWay;
	}

	public Date getRemindTime() {
		return remindTime;
	}

	public void setRemindTime(Date remindTime) {
		this.remindTime = remindTime;
	}

	public String getRemindNote() {
		return remindNote;
	}

	public void setRemindNote(String remindNote) {
		this.remindNote = remindNote;
	}

	public Long getSponsor() {
		return sponsor;
	}

	public void setSponsor(Long sponsor) {
		this.sponsor = sponsor;
	}
	
	public Long getEffeciency() {
		return effeciency;
	}

	public void setEffeciency(Long effeciency) {
		this.effeciency = effeciency;
	}

	public String getLinkMan() {
		return linkMan;
	}

	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}

	public String getNumAddress() {
		return numAddress;
	}

	public void setNumAddress(String numAddress) {
		this.numAddress = numAddress;
	}

	public String getCusName() {
		return cusName;
	}

	public void setCusName(String cusName) {
		this.cusName = cusName;
	}

	public Long getRemind() {
		return remind;
	}

	public void setRemind(Long remind) {
		this.remind = remind;
	}

	public Long getExecType() {
		return execType;
	}

	public void setExecType(Long execType) {
		this.execType = execType;
	}

	
	public Long getDicTaskType() {
		return dicTaskType;
	}

	public void setDicTaskType(Long dicTaskType) {
		this.dicTaskType = dicTaskType;
	}

	public Long getDicTaskCategory() {
		return dicTaskCategory;
	}

	public void setDicTaskCategory(Long dicTaskCategory) {
		this.dicTaskCategory = dicTaskCategory;
	}

	public Long getDicBusiType() {
		return dicBusiType;
	}

	public void setDicBusiType(Long dicBusiType) {
		this.dicBusiType = dicBusiType;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CalendarPlan)) {
			return false;
		}
		CalendarPlan rhs = (CalendarPlan) object;
		return new EqualsBuilder()
				.append(this.planId, rhs.planId)
				.append(this.startTime, rhs.startTime)
				.append(this.endTime, rhs.endTime)
				.append(this.urgent, rhs.urgent)
				.append(this.content, rhs.content)
				.append(this.status, rhs.status)
				.append(this.fullname, rhs.fullname)
				.append(this.userId, rhs.userId)
				.append(this.assignerId, rhs.assignerId)
				.append(this.assignerName, rhs.assignerName)
				.append(this.feedback, rhs.feedback)
				.append(this.showStyle, rhs.showStyle)
				.append(this.taskType, rhs.taskType)
				.append(this.taskTitle, rhs.taskTitle)
				.append(this.source, rhs.source)
				.append(this.sourceId, rhs.sourceId)
				.append(this.taskCategory, rhs.taskCategory)
				.append(this.completeTime, rhs.completeTime)
				.append(this.taskBusiType, rhs.taskBusiType)
				.append(this.planNote, rhs.planNote)
				.append(this.remindTime, rhs.remindTime)
				.append(this.remindWay, rhs.remindWay)
				.append(this.remindNote, rhs.remindNote)
				.append(this.sponsor, rhs.sponsor)
				.append(this.effeciency, rhs.effeciency)
				.append(this.linkMan, rhs.linkMan)
				.append(this.numAddress, rhs.numAddress)
				.append(this.cusName, rhs.cusName)
				.append(this.remind, rhs.remind)
				.append(this.execType, rhs.execType)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.planId) 
				.append(this.startTime) 
				.append(this.endTime) 
				.append(this.urgent) 
				.append(this.content) 
				.append(this.status) 
				.append(this.fullname) 
				.append(this.userId) 
				.append(this.assignerId) 
				.append(this.assignerName) 
				.append(this.feedback) 
				.append(this.showStyle) 
				.append(this.taskType)
				.append(this.taskTitle)
				.append(this.source)
				.append(this.sourceId)
				.append(this.taskCategory)
				.append(this.completeTime)
				.append(this.taskBusiType)
				.append(this.planNote)
				.append(this.remindTime)
				.append(this.remindWay)
				.append(this.remindNote)
				.append(this.sponsor)
				.append(this.effeciency)
				.append(this.linkMan)
				.append(this.numAddress)
				.append(this.cusName)
				.append(this.remind)
				.append(this.execType)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("planId", this.planId) 
				.append("startTime", this.startTime) 
				.append("endTime", this.endTime) 
				.append("urgent", this.urgent) 
				.append("content", this.content) 
				.append("status", this.status) 
				.append("fullname", this.fullname) 
				.append("assignerId", this.assignerId) 
				.append("userId", this.userId) 
				.append("assignerName", this.assignerName) 
				.append("feedback", this.feedback) 
				.append("showStyle", this.showStyle) 
				.append("taskType", this.taskType) 
				.append("taskTitle", this.taskTitle)
				.append("source", this.source)
				.append("sourceId", this.sourceId)
				.append("taskCategory", this.taskCategory)
				.append("completeTime", this.completeTime)
				.append("taskBusiType", this.taskBusiType)
				.append("planNote", this.planNote)
				.append("remindTime", this.remindTime)
				.append("remindWay", this.remindWay)
				.append("remindNote", this.remindNote)
				.append("sponsor", this.sponsor)
				.append("effeciency", this.effeciency)
				.append("linkMan", this.linkMan)
				.append("numAddress", this.numAddress)
				.append("cusName", this.cusName)
				.append("remind", this.remind)
				.append("execType", this.execType)
				.toString();
	}
}
