package com.htsoft.oa.action.flow;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;

import com.htsoft.core.Constants;
import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.core.util.DateUtil;
import com.htsoft.oa.FlowConstants;
import com.htsoft.oa.model.flow.ProcessRun;

/**
 * 流程启动或运行携带的相关信息
 * @author cf0666@gmail.com
 */
public class FlowRunInfo {
	/**
	 * 保存至工作流变量的业务实体ID
	 */
	public final static String ENTITY_PK="entityId";
	/**
	 * 业务对应的实体名
	 */
	public final static String ENTITY_NAME="entityName";
	
	public final static String PROCESS_RUNID="runId";
	
	public final static String START_USER_ID="startUserId";
	
	private Map flowVars=new HashMap();
	
	public Map getFlowVars() {
		return flowVars;
	}

	public void setFlowVars(Map flowVars) {
		this.flowVars = flowVars;
	}
	/**
	 * 是否使用模板表单
	 */
	private boolean useTemplate=false;
	
	private ProcessRun processRun;
		
	/**
	 * 携带流程运行的变量
	 */
	private Map variables=new HashMap();
	
	/**
	 * 用于存储流程任务表单中的数据
	 */
	private Map<String,ParamField> paramFields=new HashMap<String, ParamField>();
	
	/**
	 * 是否启动流程
	 */
	private boolean isStartFlow=false;
	
	/**
	 * 当前流程运行的信息
	 */
	private HttpServletRequest request;
	
	/**
	 * 流程的名称
	 */
	private String processName="通用";
	
	/**
	 * 当前任务名称
	 * 
	 */
	private String activityName="开始";
	
	/**
	 * 目标节点名称
	 */
	private String destName=null;
	
	/**
	 * 流程跳转的路径名称
	 */
	private String transitionName;
	
	/**
	 * 工作流执行时，需要预先执行方法，
	 * 其命名如：orderService.saveOrder，流程引擎将会调用Spring容器中id为orderService的bean的saveOrder方法，
	 * 该方法的第一个参数为HttpServletRequest，并且根据该方法返回的值（Integer类型）（1=代表成功，0=代表失败）
	 */
	private String preHandler;
	/**
	 * 工作流执行后，需要执行方法，其命名如：orderService.saveOrder，流程引擎将会调用Spring容器中id为orderService的bean的saveOrder方法，
	 * 该方法的第一个参数为HttpServletRequest，并且根据该方法返回的值（Integer类型）（1=代表成功，0=代表失败）
	 */
	private String afterHandler;
	
	/**
	 * Jbpm流程的TaskId
	 */
	private String taskId;
	
	/**
	 * 流程实列ID
	 */
	private String piId;
	
	/**
	 * 流程定义Id ProDefintion的主键
	 */
	private String defId;
	
	/**
	 * 流程表单定义Id
	 */
	private String formDefId;
	
	/**
	 * 流程实体PK键值
	 */
	private Serializable entityPK;
	/**
	 * 业务主表实体对应的实体名
	 */
	private String entityName;
	/**
	 * 流程标题
	 */
	private String flowSubject;
	
	/**
	 * 是否为驳回操作
	 */
	private boolean back=false;
	/**
	 * 审批意见
	 */
	private String comments=null;
	
	/**
	 * 会签投票类型
	 */
	private Short signVoteType=null;
	
	/**
	 * 发送消息
	 */
	private boolean sendMsg= false;
	/**
	 * 发送邮件
	 */
	private boolean sendMail=false;
	/**
	 * 新增申请人(外部工单的客户)
	 */
	private Long customerId;
	/**
	 * 新增申请时间
	 */
	private Date customerTime;
	

	/**
	 *新增过期时间是否自定义 
	 */
	private boolean customDate = false;
	/**
	 * 新增要求响应时间
	 */
	private Date flowResponseTime;
	/**
	 * 新增要求完成时间
	 */
	private Date flowCompletionTime;
	/**
	 * 新增pkId  供接受CS接口用 by wangzj
	 */
	private String pkId;
	/**
	 * 新增csOrderType  供接受CS接口用 by wangzj
	 */
	private String csOrderType;
	/**
	 * 
	 */
	public FlowRunInfo(HttpServletRequest request) {
		
		this.request=request;

		//下一任务是否为会签任务,一般在定制的任务中使用
		String signUserIds=request.getParameter(Constants.FLOW_SIGN_USERIDS);
		if(StringUtils.isNotEmpty(signUserIds)){
			variables.put(Constants.FLOW_SIGN_USERIDS, signUserIds);
		}
		
		String flowAssignId=request.getParameter(Constants.FLOW_ASSIGN_ID);
		if(StringUtils.isNotEmpty(flowAssignId)){
			variables.put(Constants.FLOW_ASSIGN_ID, flowAssignId);
		}
		
		String pSignVoteType=request.getParameter(FlowConstants.SIGN_VOTE_TYPE);
		if(StringUtils.isNotEmpty(pSignVoteType)){
			variables.put(FlowConstants.SIGN_VOTE_TYPE, new Short(pSignVoteType));
		}
		
		//是否启动流程
		if("true".equals(request.getParameter("startFlow"))){
			isStartFlow=true;
			defId=request.getParameter("defId");
		}
		
		//在任务中有使用taskId
		String pTaskId=request.getParameter("taskId");
		if(StringUtils.isNotEmpty(pTaskId)){
			taskId=pTaskId;
		}
		
		//表单定义的id
		String pFormDefId=request.getParameter("formDefId");
		if(StringUtils.isNotEmpty(pFormDefId)){
			formDefId=pFormDefId;
		}
		
		//流程实例ID
		String pPiId=request.getParameter("piId");
		
		if(StringUtils.isNotEmpty(pPiId)){
			piId=pPiId;
		}
		
		//当前任务或活动的名称
		String pActivityName=request.getParameter("activityName");
		if(StringUtils.isNotEmpty(pActivityName)){
			activityName=pActivityName;
		}
		//任务名称，传此值等同于activityName
		String pTaskName=request.getParameter("taskName");
		if(StringUtils.isNotEmpty(pTaskName)){
			activityName=pTaskName;
		}
		
		//目标节点名称
		String pDestName=request.getParameter("destName");

		if(StringUtils.isNotEmpty(pDestName)){
			destName=pDestName;
		}
		
		//当前跳转的名称
		String pSignName=request.getParameter("signalName");
		if(StringUtils.isNotEmpty(pSignName)){
			transitionName=pSignName;
		}
		
		String pBack=request.getParameter("back");
		if("true".equals(pBack)){
			back=true;
		}
		//用户备注信息
		String pComments=request.getParameter("comments");
		if(StringUtils.isNotEmpty(pComments)){
			comments=pComments;
		}
		
		//预执行的方法
		String pHandler=request.getParameter("preHandler");
		if(StringUtils.isNotEmpty(pHandler)){
			preHandler=pHandler;
		}
		
		//后执行的方法
		String aHandler=request.getParameter("afterHandler");
		if(StringUtils.isNotEmpty(aHandler)){
			afterHandler=aHandler;
		}
		//发送信息
		String pSendMsg=request.getParameter("sendMsg");
		if("true".equals(pSendMsg)){
			sendMsg=true;
		}
		//发送邮件
		String pSendMail=request.getParameter("sendMail");
		if("true".equals(pSendMail)){
			sendMail=true;
		}
		
		//使用模板表单
		String pUseTemplate=request.getParameter("useTemplate");
		if("true".equals(pUseTemplate)){
			useTemplate=true;
		}
		
		//申请人(客户)
		String pCustomerId=request.getParameter("customerId");
		if(StringUtils.isNotEmpty(pCustomerId)){
			customerId=new Long(pCustomerId);
		}
		
		//申请时间
		String pCustomerTime=request.getParameter("customerTime");
		if(StringUtils.isNotEmpty(pCustomerTime)){
			try {
				customerTime=DateUtils.parseDate(pCustomerTime, new String[]{"yyyy-MM-dd HH:mm:ss"});
			} catch (ParseException e) {
				e.printStackTrace();
			}
//			customerTime=DateUtil.parse(pCustomerTime);
		}
		
		//是否使用自定义时间
		String pCustomDate=request.getParameter("customDate");
		if("true".equals(pCustomDate)){
			customDate=true;
		}
	
//		private Date flowResponseTime;
	
//		private Date flowCompletionTime;
		//要求响应时间
		String pFlowResponseTime=request.getParameter("flowResponseTime");
		if(StringUtils.isNotEmpty(pFlowResponseTime)){
			try {
				flowResponseTime=DateUtils.parseDate(pFlowResponseTime, new String[]{"yyyy-MM-dd HH:mm:ss"});
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		//要求完成时间时间
		String pFlowCompletionTime=request.getParameter("flowCompletionTime");
		if(StringUtils.isNotEmpty(pFlowCompletionTime)){
			try {
				flowCompletionTime=DateUtils.parseDate(pFlowCompletionTime, new String[]{"yyyy-MM-dd HH:mm:ss"});
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
	}
	
	public FlowRunInfo() {
		
	}

	public Map getVariables() {
		return variables;
	}

	public void setVariables(Map variables) {
		this.variables = variables;
	}

	public boolean isStartFlow() {
		return isStartFlow;
	}

	public void setStartFlow(boolean isStartFlow) {
		this.isStartFlow = isStartFlow;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}
	
	public String getActivityName() {
		return activityName;
	}
	
	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public Map<String, ParamField> getParamFields() {
		return paramFields;
	}

	public void setParamFields(Map<String, ParamField> paramFields) {
		this.paramFields = paramFields;
	}

	public String getTransitionName() {
		return transitionName;
	}

	public void setTransitionName(String transitionName) {
		this.transitionName = transitionName;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getPiId() {
		return piId;
	}

	public void setPiId(String piId) {
		this.piId = piId;
	}

	public String getDestName() {
		return destName;
	}

	public void setDestName(String destName) {
		this.destName = destName;
	}

	/**
	 * 添加启动后，任务的执行人员
	 * @param assignId
	 */
	public void setdAssignId(String assignId){
		variables.put(Constants.FLOW_ASSIGN_ID, assignId);
	}
	
	/**
	 * 添加启动流程后，设置该任务
	 * @param userIds
	 */
	public void setMultipleTask(String userIds){
		variables.put(Constants.FLOW_SIGN_USERIDS, userIds);
	}

	public String getPreHandler() {
		return preHandler;
	}

	public void setPreHandler(String preHandler) {
		this.preHandler = preHandler;
	}

	public String getAfterHandler() {
		return afterHandler;
	}

	public void setAfterHandler(String afterHandler) {
		this.afterHandler = afterHandler;
	}

	public String getDefId() {
		return defId;
	}

	public void setDefId(String defId) {
		this.defId = defId;
	}

	public boolean isBack() {
		return back;
	}

	public void setBack(boolean back) {
		this.back = back;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getFormDefId() {
		return formDefId;
	}

	public void setFormDefId(String formDefId) {
		this.formDefId = formDefId;
	}

	public Serializable getEntityPK() {
		return entityPK;
	}

	public void setEntityPK(Serializable entityPK) {
		this.entityPK = entityPK;
	}

	public String getEntityName() {
		return entityName;
	}

	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public String getFlowSubject() {
		return flowSubject;
	}

	public void setFlowSubject(String flowSubject) {
		this.flowSubject = flowSubject;
	}

	public Short getSignVoteType() {
		return signVoteType;
	}

	public void setSignVoteType(Short signVoteType) {
		this.signVoteType = signVoteType;
	}

	public boolean isSendMsg() {
		return sendMsg;
	}

	public void setSendMsg(boolean sendMsg) {
		this.sendMsg = sendMsg;
	}

	public boolean isSendMail() {
		return sendMail;
	}

	public void setSendMail(boolean sendMail) {
		this.sendMail = sendMail;
	}

	public ProcessRun getProcessRun() {
		return processRun;
	}

	public void setProcessRun(ProcessRun processRun) {
		this.processRun = processRun;
	}

	public boolean isUseTemplate() {
		return useTemplate;
	}

	public void setUseTemplate(boolean useTemplate) {
		this.useTemplate = useTemplate;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Date getCustomerTime() {
		return customerTime;
	}

	public void setCustomerTime(Date customerTime) {
		this.customerTime = customerTime;
	}

	public boolean isCustomDate() {
		return customDate;
	}

	public void setCustomDate(boolean customDate) {
		this.customDate = customDate;
	}

	public Date getFlowResponseTime() {
		return flowResponseTime;
	}

	public void setFlowResponseTime(Date flowResponseTime) {
		this.flowResponseTime = flowResponseTime;
	}

	public Date getFlowCompletionTime() {
		return flowCompletionTime;
	}

	public void setFlowCompletionTime(Date flowCompletionTime) {
		this.flowCompletionTime = flowCompletionTime;
	}

	public String getPkId() {
		return pkId;
	}

	public void setPkId(String pkId) {
		this.pkId = pkId;
	}

	public String getCsOrderType() {
		return csOrderType;
	}

	public void setCsOrderType(String csOrderType) {
		this.csOrderType = csOrderType;
	}
	
	
}
