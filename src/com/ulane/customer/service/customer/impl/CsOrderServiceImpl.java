package com.ulane.customer.service.customer.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Attribute;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.jbpm.api.ExecutionService;
import org.jbpm.api.ProcessDefinition;
import org.jbpm.api.ProcessEngine;
import org.jbpm.api.ProcessInstance;
import org.jbpm.api.RepositoryService;
import org.jbpm.api.model.Activity;
import org.jbpm.api.model.Transition;
import org.jbpm.api.task.Participation;
import org.jbpm.api.task.Task;
import org.jbpm.jpdl.internal.activity.TaskActivity;
import org.jbpm.pvm.internal.env.EnvironmentFactory;
import org.jbpm.pvm.internal.env.EnvironmentImpl;
import org.jbpm.pvm.internal.model.ActivityImpl;
import org.jbpm.pvm.internal.model.ExecutionImpl;
import org.jbpm.pvm.internal.model.ProcessDefinitionImpl;
import org.jbpm.pvm.internal.model.TransitionImpl;
import org.jbpm.pvm.internal.svc.TaskServiceImpl;
import org.jbpm.pvm.internal.task.ParticipationImpl;
import org.jbpm.pvm.internal.task.TaskDefinitionImpl;
import org.jbpm.pvm.internal.task.TaskImpl;

import com.htsoft.core.Constants;
import com.htsoft.core.jms.MailMessageProducer;
import com.htsoft.core.jms.MobileMessageProducer;
import com.htsoft.core.model.DynaModel;
import com.htsoft.core.model.MailModel;
import com.htsoft.core.service.DynamicService;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.StringUtil;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.dao.flow.JbpmDao;
import com.htsoft.oa.dao.flow.ProcessRunDao;
import com.htsoft.oa.dao.system.DictionaryDao;
import com.htsoft.oa.model.communicate.SmsMobile;
import com.htsoft.oa.model.flow.FormDef;
import com.htsoft.oa.model.flow.FormDefMapping;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProUserAssign;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.flow.Transform;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.communicate.SmsMobileService;
import com.htsoft.oa.service.flow.FlowFormService;
import com.htsoft.oa.service.flow.FormDefMappingService;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProDefinitionService;
import com.htsoft.oa.service.flow.ProUserAssignService;
import com.htsoft.oa.service.flow.ProcessFormService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.flow.ProcessService;
import com.htsoft.oa.service.flow.RunDataService;
import com.htsoft.oa.service.flow.TaskService;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.RelativeUserService;
import com.htsoft.oa.service.system.UserJobService;
import com.ulane.core.DateUtil;
import com.ulane.core.service.FlowResultService;
import com.ulane.customer.dao.customer.CsOrderDao;
import com.ulane.customer.model.customer.CsOrder;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.service.customer.CsOrderService;
import com.ulane.customer.service.customer.CusPersonalService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class CsOrderServiceImpl extends BaseServiceImpl<CsOrder> implements
		CsOrderService {
	@SuppressWarnings("unused")
	private CsOrderDao dao;
	@Resource
	private CsOrderService csOrderService;
	@Resource
	private FlowResultService flowResultService;
	@Resource
	private CusPersonalService cusPersonalService;
	@Resource
	private ProDefinitionService proDefinitionService;
	@Resource
	private TaskService flowTaskService;
	@Resource
	private ProUserAssignService proUserAssignService;
	@Resource
	private FlowFormService flowFormService;
	@Resource
	private RunDataService runDataService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private MailMessageProducer mailMessageProducer;
	@Resource
	private MobileMessageProducer mobileMessageProducer;
	@Resource
	private SmsMobileService smsMobileService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private FormDefMappingService formDefMappingService;
	@Resource
	private RepositoryService repositoryService;
	@Resource
	private ExecutionService executionService;
	@Resource
	private org.jbpm.api.TaskService taskService;
	@Resource
	private ProcessEngine processEngine;
	@Resource
	private UserJobService userJobService;
	@Resource
	private RelativeUserService relativeUserService;
	@Resource
	private ProcessFormService processFormService;
	@Resource
	private JbpmDao jbpmDao;
	@Resource
	private ProcessRunDao processRunDao;
	@Resource
	private DictionaryDao dictionaryDao; 

	public CsOrderServiceImpl(CsOrderDao dao) {
		super(dao);
		this.dao = dao;
	}

	private String pKId;

	public String getpKId() {
		return pKId;
	}

	public void setpKId(String pKId) {
		this.pKId = pKId;
	}

	@Override
	public CsOrder save(FlowRunInfo flowRunInfo) {
		CsOrder csOrder = new CsOrder();
		if (flowRunInfo.getRequest().getParameter("pKId") != ""
				&& flowRunInfo.getRequest().getParameter("pKId") != null) {
			csOrder.setOrderId(new Long(flowRunInfo.getRequest().getParameter(
					"pKId")));
		}
		String orderType = flowRunInfo.getRequest().getParameter(
				"csOrder.orderType");
		String customerName = flowRunInfo.getRequest().getParameter(
				"cusPersonal.nameCn");
		String cusGraId = flowRunInfo.getRequest().getParameter(
				"cusPersonal.cusGraId");
		String contacta = flowRunInfo.getRequest().getParameter(
				"csOrder.contacta");
		String order = flowRunInfo.getRequest().getParameter("csOrder.order");
		String orderSorce = flowRunInfo.getRequest().getParameter(
				"csOrder.orderSorce");
		String responseTime = flowRunInfo.getRequest().getParameter(
				"flowResponseTime");
		String customerNo = flowRunInfo.getRequest().getParameter(
				"cusPersonal.customerNo");
		String regionId = flowRunInfo.getRequest().getParameter(
				"csOrder.region.regionId");
		String contactb = flowRunInfo.getRequest().getParameter(
				"csOrder.contactb");
		String orderProject = flowRunInfo.getRequest().getParameter(
				"csOrder.orderProject");
		String level = flowRunInfo.getRequest().getParameter("csOrder.level");
		String completionTime = flowRunInfo.getRequest().getParameter(
				"flowCompletionTime");
		String gender = flowRunInfo.getRequest().getParameter(
				"csOrder.customerGender");
		String depid = flowRunInfo.getRequest().getParameter(
				"csOrder.ulDepartment.depid");
		String detailId = flowRunInfo.getRequest().getParameter(
				"csOrder.detailId");
		String content = flowRunInfo.getRequest().getParameter(
				"csOrder.content");
		String noteAppeal = flowRunInfo.getRequest().getParameter(
				"csOrder.noteAppeal");

		if (csOrder.getOrderId() == null) {

			CusPersonal cusPersonal = cusPersonalService
					.findByCustomerNo(customerNo);
			if (cusPersonal != null) {
				csOrder.setCustomerid(cusPersonal.getCustomerId());
			}
			csOrder.setCustomerName(customerName);
			csOrder.setContacta(contacta);
			csOrder.setCustomerNo(customerNo);
			csOrder.setContactb(contactb);
			csOrder.setContent(content);
			csOrder.setNoteAppeal(noteAppeal);

			if (orderType != null && !orderType.equals("")) {
				csOrder.setOrderType(new Short(orderType));
			}
			if (order != null && !order.equals("")) {
				csOrder.setOrder(new Short(order));
			}
			if (orderSorce != null && !orderSorce.equals("")) {
				csOrder.setOrderSorce(new Short(orderSorce));
			}
			if (regionId != null && !regionId.equals("")) {
				csOrder.setRegionid(new Long(regionId));
			}
			if (orderProject != null && !orderProject.equals("")) {
				csOrder.setOrderProject(new Short(orderProject));
			}
			if (level != null && !level.equals("")) {
				csOrder.setLevel(new Short(level));
			}
			if (gender != null && !gender.equals("")) {
				csOrder.setCustomerGender(new Short(gender));
			}
			if (cusGraId != null && !cusGraId.equals("")) {
				csOrder.setCustomerGrade(new Short(cusGraId));
			}
			if (depid != null && !depid.equals("")) {
				csOrder.setDepid(new Long(depid));
			}
			if (detailId != null && !detailId.equals("")) {
				csOrder.setDetailId(new Long(detailId));
			}
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			try {
				Date date1 = df.parse(responseTime);
				Date date2 = df.parse(completionTime);
				csOrder.setCompletionTime(date2);
				csOrder.setResponseTime(date1);
			} catch (ParseException e) {
				e.printStackTrace();
			}

			csOrder.setApprovalStatus("待审批");
			csOrder.setAppUser(ContextUtil.getCurrentUser());
			dao.save(csOrder);
		} else {
			CsOrder orgCsOrder = dao.get(csOrder.getOrderId());
			try {
				BeanUtil.copyNotNullProperties(orgCsOrder, csOrder);
				dao.save(orgCsOrder);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}

		return csOrder;
	}

	@Override
	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId) {
		return dao.getSelectId(start, limit, userId, type, firstId);
	}

	@Override
	public Integer saveHeadId(FlowRunInfo flowRunInfo) {
		String orderId = flowRunInfo.getRequest().getParameter("pKId");
		CsOrder csOrder = save(flowRunInfo);
		orderId = csOrder.getOrderId().toString();
		this.setpKId(orderId);

		flowRunInfo.getVariables().put("orderId", getpKId()); //
		// 放入工作流待办时候的名称
		String type = flowRunInfo.getRequest()
				.getParameter("csOrder.orderType");
		if ("1".equals(type)) {
			flowRunInfo.setFlowSubject("投诉工单审批" + getpKId()); //	
		} else if ("2".equals(type)) {
			flowRunInfo.setFlowSubject("业务办理审批" + getpKId()); //	
		} else {
			flowRunInfo.setFlowSubject("CS工单未知类型" + getpKId()); //	
		}

		return 1;
	}

	@Override
	public Integer saveRunId(FlowRunInfo flowInfo) {
		String flowType = flowInfo.getRequest().getParameter("flowType");

		// 更新runid 和节点名称
		dao.saveRunidAndNodeName(flowInfo.getProcessRun().getRunId(), flowInfo
				.getDestName(), new Long(getpKId()));
		//为processRun增加单据类型
		CsOrder csOrder1 = dao.get(new Long(getpKId()));
		if(csOrder1.getOrder()!= null){
			Dictionary dic = dictionaryDao.get(new Long(csOrder1.getOrder()));
			ProcessRun processRun = processRunDao.get(flowInfo.getProcessRun().getRunId());
			processRun.setRunType(dic);
			processRunDao.save(processRun);
		}
		// 流程开始增加状态
		if (flowInfo.isStartFlow() == true) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}
		if (flowInfo.getDestName().indexOf("驳回") > 0) {
			dao.updateStatusByNodeName("驳回", new Long(getpKId()), false);
		}
		if (flowInfo.getDestName().indexOf("接单处理部门") > 0) {
			// TODO
		}
		// 流程结束更新业务单据状态
		if (flowInfo.getDestName().contains("结束")) {
			dao.updateStatusByNodeName("审批完毕", new Long(getpKId()), true);
			CsOrder csOrder = get(new Long(getpKId()));
			csOrder.setApprovalStatus("审批完毕");
			save(csOrder);
		}

		if (flowInfo.getDestName().contains("驳回") == false
				&& flowInfo.isStartFlow() == false
				&& flowInfo.getDestName().contains("结束") == false) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}

		// 更新节点
		flowResultService.flowResultHandle(flowInfo, new Long(getpKId()),
				flowType);
		return 1;
	}

	@Override
	public String startTrans(Long defId) {
		String result = "";
		ProDefinition proDef = proDefinitionService.get(defId);
		if (proDef != null) {
			// 取得最新版的流程定义了
			List<Transition> trans = getStartOutTransByDeployId(proDef.getDeployId());

			// 取得该任务对应的所有
			List allTrans = new ArrayList();

			for (Transition tran : trans) {
				if (tran != null && tran.getDestination() != null) {
					// allTrans.add(new Transform(tran));
					Transform transform = new Transform(tran);
					result = transform.getDestination();
				}
			}
			// JSONSerializer serializer = JsonUtil.getJSONSerializer();
			// result = serializer.serialize(allTrans);
			// setJsonString("{success:true,data:" + result + "}");

		}

		return result;
	}

	@Override
	public String users(Long defId, String destName, Long userId) {
		String result = "";
		ProcessDefinition pd = getProcessDefinitionByDefId(defId);
		Set<AppUser> users = getNodeHandlerUsers(pd, destName,
				userId);

		StringBuffer uIds = new StringBuffer();
		StringBuffer uNames = new StringBuffer();
		Iterator<AppUser> it = users.iterator();
		int i = 0;
		while (it.hasNext()) {
			AppUser user = it.next();
			if (i > 0) {
				uIds.append(",");
				uNames.append(",");
			}
			uIds.append(user.getUserId());
			uNames.append(user.getFullname());
			i++;
		}

		// jsonString = "{success:true,userIds:'" + uIds.toString() +
		// "',userNames:'" + uNames.toString() + "'}";
		result = uIds.toString();

		return result;
	}

	@Override
	public Integer saveSoapHeadId(FlowRunInfo flowRunInfo) {
		this.setpKId(flowRunInfo.getPkId());

		flowRunInfo.getVariables().put("orderId", getpKId());
		// 放入工作流待办时候的名称
		if ("1".equals(flowRunInfo.getCsOrderType())) {
			flowRunInfo.setFlowSubject("投诉工单审批" + getpKId());
		} else if ("2".equals(flowRunInfo.getCsOrderType())) {
			flowRunInfo.setFlowSubject("业务办理审批" + getpKId());
		} else {
			flowRunInfo.setFlowSubject("CS工单未知类型" + getpKId());
		}

		return 1;

	}

	@Override
	public Integer saveSoapRunId(FlowRunInfo flowRunInfo) {
		// 更新runid 和节点名称
		dao.saveRunidAndNodeName(flowRunInfo.getProcessRun().getRunId(),
				flowRunInfo.getDestName(), new Long(getpKId()));
		//为processRun增加单据类型
		CsOrder csOrder1 = dao.get(new Long(getpKId()));
		if(csOrder1.getOrder()!= null){
			Dictionary dic = dictionaryDao.get(new Long(csOrder1.getOrder()));
			ProcessRun processRun = processRunDao.get(flowRunInfo.getProcessRun().getRunId());
			processRun.setRunType(dic);
			processRunDao.save(processRun);
		}
		
		// 流程开始增加状态
		if (flowRunInfo.isStartFlow() == true) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}
		if (flowRunInfo.getDestName().indexOf("驳回") > 0) {
			dao.updateStatusByNodeName("驳回", new Long(getpKId()), false);
		}
		if (flowRunInfo.getDestName().indexOf("接单处理部门") > 0) {
			// TODO
		}
		// 流程结束更新业务单据状态
		if (flowRunInfo.getDestName().contains("结束")) {
			dao.updateStatusByNodeName("审批完毕", new Long(getpKId()), true);
			CsOrder csOrder = get(new Long(getpKId()));
			csOrder.setApprovalStatus("审批完毕");
			save(csOrder);
		}

		if (flowRunInfo.getDestName().contains("驳回") == false
				&& flowRunInfo.isStartFlow() == false
				&& flowRunInfo.getDestName().contains("结束") == false) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}

		// 更新节点
		if (flowRunInfo.getDefId().equals("10260")) {// 表示投诉工单
			flowResultService.flowResultHandle(flowRunInfo,
					new Long(getpKId()), "CsOrderFlowView");
		}
		if (flowRunInfo.getDefId().equals("10280")) {// 表示业务办理
			flowResultService.flowResultHandle(flowRunInfo,
					new Long(getpKId()), "CsOrderYWFlowView");
		}
		return 1;

	}

	@Override
	public String saveSoapStart(FlowRunInfo flowRunInfo,AppUser curUser) {
		ProcessRun processRun = null;
		if (logger.isDebugEnabled()) {
			logger.info("start process..............");
		}
		try {
			processRun = csOrderService.doStartFlowNoRequest(flowRunInfo,curUser);
			String ids = flowTaskService.findbyTaskId(processRun.getPiId());
			// 获得proUserAssign 任务执行对象
			if (!"".equals(ids)) {
				if (flowRunInfo.isCustomDate() != true) {
					ProUserAssign proUserAssign = proUserAssignService
							.getByDeployIdActivityName(processRun
									.getProDefinition().getDeployId(),
									flowRunInfo.getDestName()); // 获得ProUserAssign对象
					if (proUserAssign.getRequiredTime() != null) {
						Date d = new Date();
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(d);
						calendar.add(Calendar.HOUR_OF_DAY, Integer
								.parseInt(proUserAssign.getRequiredTime()
										.toString()));

						flowTaskService.updateDueDate(ids, DateUtil.formatDate(
								calendar.getTime(), "yyyy-MM-dd HH:mm:ss"));
					}
				} else {
					flowTaskService.updateDueDate(ids, DateUtil.formatDate(
							flowRunInfo.getFlowResponseTime(),
							"yyyy-MM-dd HH:mm:ss"));
				}
			}

			return "success";
		} catch (Exception ex) {
			logger.error("error:" + ex.getMessage());
			ex.printStackTrace();
			return "failure";
		}
	}
	 /**
	  * 取得开始节点的跳出路线列表
	  * @param deployId
	  * @return
	  */
	 public List<Transition> getStartOutTransByDeployId(String deployId){
		 ProcessDefinitionImpl pd=(ProcessDefinitionImpl)repositoryService.createProcessDefinitionQuery().deploymentId(deployId).uniqueResult();
		 //取得开始节点的名称
		 String startName=getStartNodeNameByDeployId(deployId);
		 EnvironmentFactory environmentFactory = (EnvironmentFactory) processEngine;
			EnvironmentImpl env = environmentFactory.openEnvironment();
			try {
				if(startName!=null){//开始节点有名字
					ActivityImpl activityFind = pd.findActivity(startName);
					if (activityFind != null) {
						List outTrans=activityFind.getOutgoingTransitions();
			            return outTrans;
					}
				}else{//若无名字，则设置
					List activitys=pd.getActivities();
					for(int i=0;i<activitys.size();i++){
						Activity act=(Activity)activitys.get(i);
						if("start".equals(act.getType())){
							List outTrans=act.getOutgoingTransitions();
				            return outTrans;
						}
					}
				}
				
			} finally {
				env.close();
			}
			return new ArrayList();
	 }

	public ProcessDefinition getProcessDefinitionByDefId(Long defId) {
		ProDefinition proDef = proDefinitionService.get(defId);
		if (proDef != null) {
			ProcessDefinition processDefinition = repositoryService
					.createProcessDefinitionQuery().deploymentId(
							proDef.getDeployId()).uniqueResult();
			return processDefinition;
		}
		return null;
	}
	
    public Set<AppUser> getNodeHandlerUsers(ProcessDefinition pd,String activityName,Long startUserId){
    	
    	Set users=new HashSet<AppUser>();
    	
    	ProUserAssign proUserAssign=proUserAssignService.getByDeployIdActivityName(pd.getDeploymentId(), activityName);
    	
    	if(proUserAssign!=null){
    		if(Constants.FLOW_START_ID.equals(proUserAssign.getUserId())){
				if(startUserId!=null){//流程启动人不为空
					users.add(appUserService.get(startUserId));
				}else{
					users.add(ContextUtil.getCurrentUser());
				}
			}else if(StringUtils.isNotEmpty(proUserAssign.getUserId())){//设置了固定的人员
				String str = proUserAssign.getUserId();
				if(str.charAt(0) == ','){
					str = str.substring(1);
				}
				if(str.charAt(str.length()-1) == ','){
					str = str.substring(0, str.length()-1);
				}
				
				if(str.length() > 0){
					String[] userIds = str.split("[,]");
    				for(int i=0;i<userIds.length;i++){
    					AppUser appUser=appUserService.get(new Long(userIds[i]));
    					users.add(appUser);
    				}
				}
    		}
    		
    		if(StringUtils.isNotEmpty(proUserAssign.getRoleId())){//取得角色列表下所有用户
    			List<AppUser> userList=appUserService.findUsersByRoleIds(proUserAssign.getRoleId());
    			users.addAll(userList);
    		}
    		
    		if(StringUtils.isNotEmpty(proUserAssign.getJobId())){//按绝对岗位取所有的用户
    			String[]jobIds=proUserAssign.getJobId().split("[,]");
    			for(String jobId:jobIds){
    				List jobUsers=userJobService.getUsersByJobId(new Long(jobId));
    				users.addAll(jobUsers);
    			}
    		}
    		
    		if(StringUtils.isNotEmpty(proUserAssign.getReJobId())){//相对岗位
    			String[] reJobIds=proUserAssign.getReJobId().split("[,]");
    			for(String jobId:reJobIds){
    				List userList=relativeUserService.findByUserIdReJobId(startUserId,new Long(jobId));
    				users.addAll(userList);
    			}
    		} 		
    	}
    	
    	//若流程没有指定人员，直接转至启动人员那里 
    	if(users.size()==0){
    		if(startUserId!=null){
    			users.add(appUserService.get(startUserId));
    		}else{
    			users.add(ContextUtil.getCurrentUser());
    		}
    	}
    	return users;
    }

	/**
	 * 启动工作流 传入defId 没有request请求
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public ProcessRun doStartFlowNoRequest(FlowRunInfo startInfo,AppUser curUser)
			throws Exception {
		// FlowRunInfo startInfo=getFlowRunInfo(request);
		ProcessRun processRun = null;

		String useTemplate = String.valueOf(startInfo.isUseTemplate());

		// 若在提交参数中指定启动工作流前需要预处理
		int result = invokeHandler(startInfo, "PRE");

		if (result == -1 || result >= 1) {// 正常
			DynaModel entity = null;
			if (!"true".equals(useTemplate)) {
				// 保存业务数据
				entity = flowFormService.doSaveData(startInfo);
				// 把业务数据也放至流程中
				startInfo.getVariables().putAll(entity.getDatas());
			}
			// 启动流程
			processRun = doStartProcess(startInfo,curUser);

			// if("true".equals(useTemplate)){
			// startInfo.getVariables().putAll(BeanUtil.getMapFromRequest(request));
			// }
			// 保存后，把流程中相关的变量及数据全部提交至run_data表中，以方便后续的展示
			runDataService.saveFlowVars(processRun.getRunId(), startInfo
					.getVariables());

			// 加上，以方便第三方业务读取流程相关的数据
			startInfo.setProcessRun(processRun);

			// 发送邮件或短信通知相关人员
			notice(processRun, startInfo);

			if (entity != null) {
				// 更新runId，通过runId，可以取到该审批业务的所有审批信息
				try {
					entity.set("runId", processRun.getRunId());
					DynamicService service = BeanUtil
							.getDynamicServiceBean((String) entity
									.get(FlowRunInfo.ENTITY_NAME));
					service.save(entity.getDatas());
				} catch (Exception ex) {
					ex.printStackTrace();
					logger.debug("error:" + ex.getMessage());
				}
			}
		}
		// 若在提交参数中指定启动工作流后需要后处理
		invokeHandler(startInfo, "AFT");

		return processRun;
	}

	/**
	 * 流程执行前后触发
	 * 
	 * @param flowRunInfo
	 * @param preAfterMethodFlag
	 *            前后标识，PRE代表前置，AFT代表后置
	 * @return 0 代表失败 1代表成功，-1代表不需要执行
	 */
	public int invokeHandler(FlowRunInfo flowRunInfo, String preAfterMethodFlag)
			throws Exception {
		String handler = null;
		// 前置方法
		if ("PRE".equals(preAfterMethodFlag)) {
			handler = flowRunInfo.getPreHandler();
		} else {// 后置方法
			handler = flowRunInfo.getAfterHandler();
		}
		// 没有指定方法
		if (handler == null)
			return -1;

		Integer result = 0;

		String[] beanMethods = handler.split("[.]");
		if (beanMethods != null) {
			String beanId = beanMethods[0];
			String method = beanMethods[1];
			// 触发该Bean下的业务方法
			Object serviceBean = AppUtil.getBean(beanId);
			if (serviceBean != null) {
				Method invokeMethod = serviceBean.getClass().getDeclaredMethod(
						method, new Class[] { FlowRunInfo.class });
				result = (Integer) invokeMethod
						.invoke(serviceBean, flowRunInfo);
			}
		}
		// 为after 添加流程变量
		if ("AFT".equals(preAfterMethodFlag)
				&& flowRunInfo.getFlowVars().size() > 0) {
			String piId = flowRunInfo.getPiId();
			if (piId != null) {
				setProcessVars(piId, flowRunInfo.getFlowVars());
			}
		}

		return result;
	}

	/**
	 * 使用邮件或短信通知相关的人员处理
	 * 
	 * @param piId
	 */
	private void notice(ProcessRun processRun, FlowRunInfo flowInfo) {
		if (processRun.getPiId() == null)
			return;
		List<Task> taskList = getTasksByPiId(processRun.getPiId());

		for (Task task : taskList) {
			TaskImpl taskImpl = (TaskImpl) task;
			if (taskImpl.getAssignee() == null) {
				Iterator<ParticipationImpl> partIt = taskImpl
						.getAllParticipants().iterator();
				while (partIt.hasNext()) {
					ParticipationImpl part = partIt.next();
					if (part.getGroupId() != null
							&& StringUtil.isNumeric(part.getGroupId())) {
						// 发送邮件
						List<AppUser> appUserList = appUserService
								.findByRoleId(new Long(part.getGroupId()));
						for (AppUser appUser : appUserList) {
							sendMailNotice(processRun.getSubject(), taskImpl,
									appUser, flowInfo);
						}
					} else if (part.getUserId() != null
							&& StringUtil.isNumeric(part.getUserId())) {
						AppUser appUser = appUserService.get(new Long(part
								.getUserId()));
						sendMailNotice(processRun.getSubject(), taskImpl,
								appUser, flowInfo);
					}
				}
			} else if (StringUtil.isNumeric(taskImpl.getAssignee())) {
				AppUser appUser = appUserService.get(new Long(taskImpl
						.getAssignee()));
				sendMailNotice(processRun.getSubject(), taskImpl, appUser,
						flowInfo);
			}
		}
	}

	/**
	 * 发送邮件及短信通知
	 * 
	 * @param task
	 * @param appUser
	 */
	private void sendMailNotice(String piSubject, Task task, AppUser appUser,
			FlowRunInfo flowRunInfo) {
		Date curDate = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String curDateStr = sdf.format(curDate);
		if (flowRunInfo.isSendMail()) {
			// 发送邮件
			if (appUser.getEmail() != null) {
				if (logger.isDebugEnabled()) {
					logger.info("Notice " + appUser.getFullname() + " by mail:"
							+ appUser.getEmail());
				}

				String tempPath = "mail/flowMail.vm";
				Map model = new HashMap();
				model.put("curDateStr", curDateStr);
				model.put("appUser", appUser);
				model.put("task", task);
				String subject = "来自" + AppUtil.getCompanyName() + "办公系统的待办任务("
						+ piSubject + "--" + task.getName() + ")提醒";

				MailModel mailModel = new MailModel();
				mailModel.setMailTemplate(tempPath);
				mailModel.setTo(appUser.getEmail());
				mailModel.setSubject(subject);
				mailModel.setMailData(model);
				// 把邮件加至发送列队中去
				mailMessageProducer.send(mailModel);
			}
		}
		if (flowRunInfo.isSendMsg()) {
			// 发送手机短信
			if (appUser.getMobile() != null) {
				if (logger.isDebugEnabled()) {
					logger.info("Notice " + appUser.getFullname()
							+ " by mobile:" + appUser.getMobile());
				}

				if (appUser.getMobile() != null) {
					String content = AppUtil.getCompanyName() + "办公系统于"
							+ curDateStr + "产生了一项待办事项(" + piSubject + "--"
							+ task.getName() + ")，请您在规定时间内完成审批~";
					SmsMobile smsMobile = new SmsMobile();
					smsMobile.setPhoneNumber(appUser.getMobile());
					smsMobile.setSmsContent(content);
					smsMobile.setSendTime(new Date());
					smsMobile.setUserId(-1l);
					smsMobile.setUserName("system user");
					smsMobile.setStatus(SmsMobile.STATUS_NOT_SENDED);

					smsMobileService.save(smsMobile);
					// 放置发送队列
					mobileMessageProducer.send(smsMobile);
				}
			}
		}
	}

	/**
	 * 执行启动流程
	 * 
	 * @param startInfo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public ProcessRun doStartProcess(FlowRunInfo startInfo,AppUser curUser) {
		// 初始化流程运行
		ProcessRun processRun = getInitFromFlowRunInfo(startInfo,curUser);
		// 对于在线表单，设置其对应的formDefId,即流程对应的流程表单
		if (!startInfo.isUseTemplate()) {
			ProDefinition proDefinition = proDefinitionService.get(new Long(
					startInfo.getDefId()));
			// 缺省使用默认的表单
			Long formDefId = FormDef.DEFAULT_FLOW_FORMID;
			FormDefMapping fdm = formDefMappingService
					.getByDeployId(proDefinition.getDeployId().toString());
			// 若在后台设置了指定的表单
			if (fdm != null) {
				formDefId = fdm.getFormDefId();
			}
			processRun.setFormDefId(formDefId);
		}

		// 若存在使用实体的方式
		if (startInfo.getEntityPK() != null) {
			// 设置他们的实体主键值及实体名
			processRun.setEntityId(startInfo.getEntityPK().toString());
			processRun.setEntityName(startInfo.getEntityName());
		}
		processRunService.save(processRun);
		// 1.add the common variable here
		// 设置流程启者人ID
		startInfo.getVariables().put(FlowRunInfo.START_USER_ID,
				ContextUtil.getCurrentUserId());
		// 设置流程运行ID
		startInfo.getVariables().put(FlowRunInfo.PROCESS_RUNID,
				processRun.getRunId());
		// 设置业务实体ID
		startInfo.getVariables().put(FlowRunInfo.ENTITY_PK,
				startInfo.getEntityPK());
		// 设置业务实体类
		startInfo.getVariables().put(FlowRunInfo.ENTITY_NAME,
				startInfo.getEntityName());

		// 2.启动流程
		ProcessInstance pi = startProcess(processRun.getProDefinition()
				.getDeployId(), startInfo.getDestName(), startInfo
				.getVariables());
		// 3.保存回其状态
		processRun.setPiId(pi.getId());
		processRun.setRunStatus(ProcessRun.RUN_STATUS_RUNNING);

		processRunService.save(processRun);
		// 4.保存流程启动的历史信息
		saveInitProcessForm(processRun, startInfo, curUser);

		// 5.进行启动后的人员指派
		String flowAssignId = (String) startInfo.getVariables().get(
				Constants.FLOW_ASSIGN_ID);
		assignTask(pi, flowAssignId);
		if (pi.getSubProcessInstance() != null) {
			logger.info("debug for subProcessinstance...........");
			assignTask((ProcessInstance) pi.getSubProcessInstance(),
					flowAssignId);
		}

		// 6.临时插入工单要求完成时间
		if (startInfo.isCustomDate() != true) {
			List<ProUserAssign> assignList = proUserAssignService
					.getByDeployId(processRun.getProDefinition().getDeployId());
			if (assignList.size() > 0) {
				int times = 0;
				for (ProUserAssign assign : assignList) {
					if (assign.getRequiredTime() != null
							&& !"".equals(assign.getRequiredTime())) {
						times += Integer.parseInt(assign.getRequiredTime());
					}
				}
				Date d = new Date();
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(d);
				calendar.add(Calendar.HOUR_OF_DAY, times);
				processRun.setNeedsTime(calendar.getTime());
			}
			processRunService.save(processRun);
		} else {
			processRun.setNeedsTime(startInfo.getFlowCompletionTime());
			processRunService.save(processRun);
		}
		return processRun;
	}
	/**
	 * 从流程运行提交的信息中初始化ProcessRun
	 * @param runInfo
	 * @return
	 */
	public ProcessRun getInitFromFlowRunInfo(FlowRunInfo runInfo,AppUser curUser){
		ProDefinition proDefinition=proDefinitionService.get(new Long(runInfo.getDefId()));
		ProcessRun processRun=getInitNewProcessRun(proDefinition,curUser);
		if(runInfo.getFlowSubject()!=null){
			processRun.setSubject(runInfo.getFlowSubject());
		}
		return processRun;
	}

	/**
	 * 初始化一个新的流程
	 * @return
	 */
	public ProcessRun getInitNewProcessRun(ProDefinition proDefinition,AppUser curUser){
		
		ProcessRun processRun=new ProcessRun();
		
		Date curDate=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd-HHmmss");
		
		processRun.setSubject(proDefinition.getName()+sdf.format(curDate));
		processRun.setCreator(curUser.getFullname());
		processRun.setAppUser(curUser);
		processRun.setCreatetime(curDate);
		processRun.setProDefinition(proDefinition);
		
		return processRun;
	}

	/**
	 * 启动工作流
	 * 
	 * @param deployId
	 * @param variables
	 */
	public ProcessInstance startProcess(String deployId, String destTaskName,
			Map variables) {
		ProcessDefinition pd = repositoryService.createProcessDefinitionQuery()
				.deploymentId(deployId).uniqueResult();

		// 启动工作流
		ProcessInstance pi = executionService.startProcessInstanceById(pd
				.getId(), variables);

		// 说明：由于JBPM4在启动的时候，会跳至第一个节点，并且产生对应的任务实例，以下的代码就是为了让他们跳回用户在界面指定的节点
		if (destTaskName != null) {// 需要跳转
			List<Task> tasks = getTasksByPiId(pi.getId());

			for (int i = 0; i < tasks.size(); i++) {
				Task task = tasks.get(i);
				if (i == 0 && destTaskName.equals(task.getName())) {// 已经跳到用户指定的节点
					break;
				}
				jumpTaskToAnother(task, destTaskName, variables);
			}
		}

		return pi;
	}

	/**
	 * 任务指派
	 * 
	 * @param pi
	 * @param flowAssignId
	 *            指定执行人的ID或ID列表，格式如：
	 *            领导审批:财务审核:...|1,2:3,4:...),也只可为1,2,3(当下一步仅有一任务时）
	 * @param parentTaskName
	 *            父任务名
	 */
	public void assignTask(ProcessInstance pi, String flowAssignId) {
		// 取到该流程实例的流程定义
		ProcessDefinition pd = repositoryService.createProcessDefinitionQuery()
				.processDefinitionId(pi.getProcessDefinitionId())
				.uniqueResult();

		// 取得当前任务的名称，然后根据该任务名称以及流程定义，查看该任务将由哪一个用户或用户组来处理比较合适
		List<Task> taskList = getTasksByPiId(pi.getId());

		// 用于下一任务的人员授予 。格式为<任务名,用户ID1,ID2...>
		Map<String, String> taskUserIdsMap = getUserIdsMap(flowAssignId);

		ExecutionImpl piExeImpl = (ExecutionImpl) pi;
		String piId = null;
		if (piExeImpl.getSuperProcessExecution() != null) {// 是否存在父流程
			piId = piExeImpl.getSuperProcessExecution().getId();
			// 若为子流程，则检查其processRun是否已经存在记录，若不存在，则产生新的
			ProcessRun subProcessRun = processRunService.getByPiId(pi.getId());
			if (subProcessRun == null) {
				initSuProcessRun(piId, pi.getId());
			}

			taskUserIdsMap = null;
		} else {
			piId = pi.getId();
		}
		// 取得流程启动者ID
		Long flowStartUserId = (Long) executionService.getVariable(piId,
				FlowRunInfo.START_USER_ID);
		// 取得流程的启动者
		if (flowStartUserId == null) {
			ProcessRun processRun = processRunService.getByPiId(piId);
			flowStartUserId = processRun.getUserId();
		}
		/**
		 * 查找目前该流程实例中的所有任务，为其指定相应的执行人员
		 */
		for (Task task : taskList) {
			TaskImpl taskImpl = (TaskImpl) task;
			// 1.若原来的任务已有执行人,则保持不变.
			if (task.getAssignee() != null
					|| taskImpl.getAllParticipants().size() > 0)
				continue;

			// 若该任务为父任务，则跳过(注：只有子任务才有人员参与)
			if (taskImpl.getSubTasks().size() > 0)
				continue;

			// 检查任务是否有授予人员
			boolean isAssign = false;
			// 单一执行人
			Long exeUserId = null;
			// 候选执行人员
			HashSet<Long> candidateUserIds = new HashSet<Long>();
			// 候选组
			HashSet<Long> candidateGroupIds = new HashSet<Long>();

			// 取得该任务的后台人员配置
			ProUserAssign assignSetting = proUserAssignService
					.getByDeployIdActivityName(pd.getDeploymentId(), task
							.getActivityName());

			if (taskUserIdsMap != null && taskUserIdsMap.size() > 0) {// 若在流程执行过程中，用户在表单指定了下一步的执行人员，则流程会自动指派至该人来执行
				String userIds = "";
				// 取得任务的人员
				if (taskUserIdsMap.containsKey("CommonTask")) {
					userIds = taskUserIdsMap.get("CommonTask");
				} else {
					userIds = taskUserIdsMap.get(taskImpl.getName());
				}
				String[] assignIds = userIds.split("[,]");
				if (assignIds != null && assignIds.length > 1) {
					for (String aId : assignIds) {
						candidateUserIds.add(new Long(aId));
					}
				} else {
					exeUserId = new Long(userIds);
				}
			} else if (assignSetting != null) {// 3.由后台流程设置中来指定用户

				if (StringUtils.isNotEmpty(assignSetting.getUserId())) {// 设置了由单一用户来处理
					// 流程需要重新转回给流程启动者
					if (Constants.FLOW_START_ID.equals(assignSetting
							.getUserId())) {// 由启动人来处理
						exeUserId = flowStartUserId;
					} else {// 由设置人来处理
						String[] exeUserIds = assignSetting.getUserId().split(
								"[,]");
						if (exeUserIds != null && exeUserIds.length == 1) {// 单个用户
							exeUserId = new Long(exeUserIds[0]);
						} else {
							String[] userIds = assignSetting.getUserId().split(
									"[,]");
							for (String userId : userIds) {
								candidateUserIds.add(new Long(userId));
							}
						}
					}
				}
				if (StringUtils.isNotEmpty(assignSetting.getRoleId())) {// 由角色处理
					// TODO 转成由人员来处理
					candidateGroupIds.add(new Long(assignSetting.getRoleId()));
				}
				if (StringUtils.isNotEmpty(assignSetting.getJobId())) {// 由岗位的人员来处理
					// 取得对应的岗位的所有的人员
					String[] jobIds = assignSetting.getJobId().split("[,]");
					for (String jbId : jobIds) {
						List userIds = userJobService
								.getUserIdsByJobId(new Long(jbId));
						candidateUserIds.addAll(userIds);
					}
				}
				if (StringUtils.isNotEmpty(assignSetting.getReJobId())) {// 相对岗位的人员来处理
					// 启动人员的相对岗位对应的人员
					String[] reJobIds = assignSetting.getReJobId().split("[,]");
					for (String reJbId : reJobIds) {
						List userIds = relativeUserService.getReJobUserIds(
								flowStartUserId, new Long(reJbId));
						candidateUserIds.addAll(userIds);
					}
				}
			}

			// //////////////////为任务进行授权///////////////////////////////////////////////////

			// 1.是否为会签任务
			if (assignSetting != null
					&& ProUserAssign.IS_SIGNED_TASK.equals(assignSetting
							.getIsSigned())) {
				if (candidateUserIds.size() > 1) {// 会签参与人员要多于一人
					Long[] uIds = candidateUserIds.toArray(new Long[] {});
					newSubTask(task.getId(), uIds);
					continue;
				}
			}

			if (exeUserId != null) {// 为任务直接分配用户
				taskService.assignTask(task.getId(), exeUserId.toString());
				isAssign = true;
			}
			if (candidateUserIds.size() == 1) {// 若候选人员仅有一个，即直接授予该任务
				taskService.assignTask(task.getId(), candidateUserIds
						.iterator().next().toString());
				isAssign = true;
			} else if (candidateUserIds.size() > 1) {
				isAssign = true;
				Iterator<Long> its = candidateUserIds.iterator();
				while (its.hasNext()) {
					Long userId = its.next();
					taskService.addTaskParticipatingUser(task.getId(), userId
							.toString(), Participation.CANDIDATE);
				}
			}
			if (candidateGroupIds.size() > 0) {// 把任务分配给角色组
				isAssign = true;
				Iterator<Long> its = candidateGroupIds.iterator();
				while (its.hasNext()) {
					Long roleId = its.next();
					taskService.addTaskParticipatingGroup(task.getId(), roleId
							.toString(), Participation.CANDIDATE);
				}
			}

			if (!isAssign) {// 若没有授予任何人员，则把任务交回到启动者那里(可不要此功能）
				if (logger.isDebugEnabled()) {
					logger.debug("------->Task " + task.getActivityName()
							+ " is assign to the flow start there:");
				}
				taskService
						.assignTask(task.getId(), flowStartUserId.toString());
			}

		}// end of for

	}

	/**
	 * 创建新的任务
	 * 
	 * @param parentTaskId
	 *            父任务 ID
	 * @param assignIds
	 *            任务执行人IDs
	 */
	public void newSubTask(String parentTaskId, Long[] userIds) {

		TaskServiceImpl taskServiceImpl = (TaskServiceImpl) taskService;
		Task parentTask = taskServiceImpl.getTask(parentTaskId);

		// 为该父任务加上会签的人员数，方便后面对会签的投票进行统计
		Map vars = new HashMap();
		vars.put("taskSignCounts", new Integer(userIds.length));
		taskServiceImpl.setVariables(parentTaskId, vars);

		for (int i = 0; i < userIds.length; i++) {
			String userId = userIds[i].toString();
			TaskImpl task = (TaskImpl) taskServiceImpl.newTask(parentTaskId);
			task.setAssignee(userId);
			task.setName(parentTask.getName() + "-" + (i + 1));
			task.setActivityName(parentTask.getName());
			task.setDescription(parentTask.getDescription());
			// 保存
			taskServiceImpl.saveTask(task);
		}
	}

	/**
	 * 从用户提交的参数中取得用户的Map
	 * 
	 * @param flowAssignId
	 *            flowAssignId 指定执行人的ID或ID列表，格式如：
	 *            领导审批:财务审核:...|1,2:3,4:...),也只可为1,2,3(当下一步仅有一任务时）
	 * @return
	 */
	private Map<String, String> getUserIdsMap(String flowAssignId) {
		HashMap<String, String> taskUserIdsMap = new HashMap();
		// assignId格式如下
		if (StringUtils.isNotEmpty(flowAssignId)) {// 若在流程执行过程中，用户在表单指定了下一步的执行人员，则流程会自动指派至该人来执行
			if (logger.isDebugEnabled()) {
				logger.debug("===>assignId:" + flowAssignId);
			}
			String[] assignIds = flowAssignId.split("[|]");
			if (assignIds != null && assignIds.length == 2) {// flowAssignId
																// 格式如：领导审批:财务审核:...|1,2:3,4:...
				String[] destTasks = assignIds[0].split("[:]");
				String[] destUserIds = assignIds[1].split("[:]");

				if (destTasks != null && destUserIds != null) {
					for (int i = 0; i < destTasks.length; i++) {
						taskUserIdsMap.put(destTasks[i], destUserIds[i]);
					}
				}

			} else if (assignIds.length == 1) {// flowAssignId 格式如：1,2,3...
				taskUserIdsMap.put("CommonTask", flowAssignId);
			}
		}
		return taskUserIdsMap;
	}

	/**
	 * 通过父实例更新子实例
	 * 
	 * @param parentPiId
	 * @param subPiId
	 * @return
	 */
	public ProcessRun initSuProcessRun(String parentPiId, String subPiId) {
		// 取得父流程实例
		ProcessRun parentProcessRun = processRunService.getByPiId(parentPiId);
		ProcessRun subProcessRun = new ProcessRun();

		subProcessRun.setAppUser(parentProcessRun.getAppUser());
		subProcessRun.setBusDesc(parentProcessRun.getBusDesc());
		subProcessRun.setSubject(parentProcessRun.getSubject());
		subProcessRun.setCreatetime(new Date());
		subProcessRun.setCreator(parentProcessRun.getCreator());
		subProcessRun.setRunStatus(ProcessRun.RUN_STATUS_INIT);
		subProcessRun.setPiId(subPiId);
		subProcessRun.setEntityId(parentProcessRun.getEntityId());
		subProcessRun.setEntityName(parentProcessRun.getEntityName());
		subProcessRun.setFormDefId(parentProcessRun.getFormDefId());
		ProDefinition proDefinition = getProDefinitionByPiId(subPiId);
		subProcessRun.setProDefinition(proDefinition);

		processRunService.save(subProcessRun);

		return subProcessRun;

	}

	/**
	 * 按流程实例取得流程定义
	 * 
	 * @param piId
	 * @return
	 */
	public ProDefinition getProDefinitionByPiId(String piId) {
		ProcessInstance pi = getProcessInstance(piId);
		ProcessDefinition processDefinition = repositoryService
				.createProcessDefinitionQuery().processDefinitionId(
						pi.getProcessDefinitionId()).uniqueResult();
		return proDefinitionService.getByDeployId(processDefinition
				.getDeploymentId());
	}

	/**
	 * 取得流程实例
	 * 
	 * @param piId
	 * @return
	 */
	public ProcessInstance getProcessInstance(String piId) {
		ProcessInstance pi = executionService.createProcessInstanceQuery()
				.processInstanceId(piId).uniqueResult();
		return pi;
	}

	/**
	 * 取得某流程实例对应的任务列表
	 * 
	 * @param piId
	 * @return
	 */
	public List<Task> getTasksByPiId(String piId) {
		List<Task> taskList = taskService.createTaskQuery().processInstanceId(
				piId).list();
		return taskList;
	}

	/**
	 * 任务从一节点跳至另一目标
	 * 
	 * @param task
	 * @param destTaskName
	 *            //目标任务名称
	 * @return 1=为正常的任务跳转（即流程图上两线是有关联） 0=自由的任务跳转
	 */
	private Integer jumpTaskToAnother(Task task, String destTaskName,
			Map variables) {
		// 正常跳转
		Integer formalJump = 1;

		ProcessDefinition pd = getProcessDefinitionByTaskId(task.getId());
		String signalName = null;
		List<Transition> trans = getTransitionsByTaskId(task.getId(), false);
		// 两节点是否存在连接
		boolean isExistTran = false;

		for (Transition tran : trans) {
			if (destTaskName.equals(tran.getDestination().getName())) {
				signalName = tran.getName();
				isExistTran = true;
				break;
			}
		}

		if (!isExistTran) {// 创建连接
			addOutTransition((ProcessDefinitionImpl) pd,
					task.getActivityName(), destTaskName);
			signalName = "to" + destTaskName;
		}
		taskService.setVariables(task.getId(), variables);
		taskService.completeTask(task.getId(), signalName);

		if (!isExistTran) {// 删除连接
			removeOutTransition((ProcessDefinitionImpl) pd, task
					.getActivityName(), destTaskName);
			formalJump = 0;
		}
		return formalJump;
	}

	/**
	 * 通过任务取得流程节义
	 * 
	 * @param taskId
	 * @return
	 */
	public ProcessDefinition getProcessDefinitionByTaskId(String taskId) {
		TaskImpl task = (TaskImpl) taskService.getTask(taskId);
		ProcessInstance pi = null;
		if (task.getSuperTask() != null) {
			pi = task.getSuperTask().getProcessInstance();
		} else {
			pi = task.getProcessInstance();
		}
		ProcessDefinition pd = repositoryService.createProcessDefinitionQuery()
				.processDefinitionId(pi.getProcessDefinitionId())
				.uniqueResult();
		return pd;
	}

	/**
	 * 取得某个任务节点的所有出口或入口连接
	 * 
	 * @param taskId
	 * @param isInTransition
	 *            是否为入口连接 true为外连接，false为入连接
	 * @return
	 */
	public List<Transition> getTransitionsByTaskId(String taskId,
			boolean isInTransition) {
		TaskImpl task = (TaskImpl) taskService.getTask(taskId);
		if (task.getSuperTask() != null) {// 取得其父任务对应的输出transition
			task = task.getSuperTask();
		}
		EnvironmentFactory environmentFactory = (EnvironmentFactory) processEngine;
		EnvironmentImpl env = environmentFactory.openEnvironment();
		try {
			ProcessDefinitionImpl pd = (ProcessDefinitionImpl) task
					.getProcessInstance().getProcessDefinition();
			ActivityImpl activityFind = pd.findActivity(task.getActivityName());
			if (activityFind != null) {
				List outTrans = null;
				if (isInTransition) {
					outTrans = activityFind.getIncomingTransitions();
				} else {
					outTrans = activityFind.getOutgoingTransitions();
				}
				return outTrans;
			}
		} finally {
			env.close();
		}
		return new ArrayList();
	}

	/**
	 * 动态创建连接当前任务节点至名称为destName的节点的Transition
	 * 
	 * @param taskId
	 *            任务节点ID
	 * @param sourceName
	 *            源节点名称
	 * @param destName
	 *            目标节点名称
	 */
	public void addOutTransition(ProcessDefinitionImpl pd, String sourceName,
			String destName) {

		EnvironmentFactory environmentFactory = (EnvironmentFactory) processEngine;
		EnvironmentImpl env = null;
		try {
			env = environmentFactory.openEnvironment();

			// 取得当前流程的活动定义
			ActivityImpl sourceActivity = pd.findActivity(sourceName);
			// 取得目标的活动定义
			ActivityImpl destActivity = pd.findActivity(destName);

			// 为两个节点创建连接
			TransitionImpl transition = sourceActivity
					.createOutgoingTransition();
			transition.setName("to" + destName);
			transition.setDestination(destActivity);

			TaskActivity taskAt;
			TaskDefinitionImpl tdi;

			sourceActivity.addOutgoingTransition(transition);

		} catch (Exception ex) {
			logger.error(ex.getMessage());
		} finally {
			if (env != null)
				env.close();
		}
	}

	/**
	 * 动态删除连接sourceName与destName的Transition
	 * 
	 * @param taskId
	 * @param sourceName
	 * @param destName
	 */
	@SuppressWarnings("unchecked")
	public void removeOutTransition(ProcessDefinitionImpl pd,
			String sourceName, String destName) {
		EnvironmentFactory environmentFactory = (EnvironmentFactory) processEngine;
		EnvironmentImpl env = null;
		try {
			env = environmentFactory.openEnvironment();
			// 取得当前流程的活动定义
			ActivityImpl sourceActivity = pd.findActivity(sourceName);

			// 若存在这个连接，则需要把该连接删除
			List trans = sourceActivity.getOutgoingTransitions();
			for (int i = 0; i < trans.size(); i++) {
				Transition tran = (Transition) trans.get(i);
				if (destName.equals(tran.getDestination().getName())) {// 删除该连接
					trans.remove(tran);
					break;
				}
			}
		} catch (Exception ex) {
			logger.error(ex.getMessage());
		} finally {
			if (env != null)
				env.close();
		}
	}

	/**
	 * 保存流程启动时表单历史
	 * 
	 * @param processRun
	 *            流程实例
	 * @param startTrans
	 *            开始节点的跳转名称
	 */
	private void saveInitProcessForm(ProcessRun processRun,
			FlowRunInfo startInfo,AppUser curUser) {
		// 保存系统本身的启动流程历史
		String startNode = getStartNodeName(processRun.getProDefinition());
		ProcessForm startForm = getInitProcessForm(curUser);
		startForm.setActivityName(startNode);
		startForm.setProcessRun(processRun);
		String transName = startInfo.getTransitionName();
		// 取得开始跳转路径名
		if (transName == null) {
			List<String> trans = getStartNodeTransByDeployId(processRun
					.getProDefinition().getDeployId());
			if (trans.size() > 0) {
				transName = trans.get(0);
			}
		}
		startForm.setComments(startInfo.getComments());
		startForm.setStatus(ProcessForm.STATUS_PASS);
		startForm.setTransTo(transName);

		processFormService.save(startForm);

		// 保存下一步流程任务历史

		List<Task> tasks = getTasksByPiId(processRun.getPiId());
		// 产生该任务对应的表单及历史信息
		for (Task task : tasks) {
			ProcessForm taskForm = new ProcessForm();
			taskForm.setActivityName(task.getActivityName());
			taskForm.setCreatetime(new Date());
			taskForm.setTaskId(task.getId());
			taskForm.setFromTask(startNode);
			taskForm.setFromTaskId(null);
			taskForm.setPreFormId(startForm.getFormId());

			taskForm.setStatus(ProcessForm.STATUS_INIT);
			taskForm.setProcessRun(processRun);
			processFormService.save(taskForm);
		}
	}
	
	/**
	 * 初始一个未持久化的历史 
	 * @return
	 */
	public ProcessForm getInitProcessForm(AppUser curUser){
		ProcessForm processForm=new ProcessForm();
		
		processForm.setCreatetime(new Date());
		processForm.setCreatorId(curUser.getUserId());
		processForm.setCreatorName(curUser.getFullname());
		
		processForm.setStatus(ProcessForm.STATUS_INIT);
		processForm.setDurTimes(0);
		processForm.setEndtime(new Date());
		
		return processForm;
	}

	/**
	 * 取得开始节点名称
	 * 
	 * @param proDefinition
	 * @return
	 */
	public String getStartNodeName(ProDefinition proDefinition) {
		return getStartNodeNameByDeployId(proDefinition.getDeployId());
	}
	
	private String getStartNodeNameByDeployId(String deployId){
		try{
			String defXml=jbpmDao.getDefXmlByDeployId(deployId);
			Element root = DocumentHelper.parseText(defXml).getRootElement();
			 for (Element elem : (List<Element>) root.elements()) {
				 	String tagName=elem.getName();
				 	if("start".equals(tagName)){
				 		Attribute nameAttr=elem.attribute("name");
						if(nameAttr!=null){
							return nameAttr.getValue();
						}
				 		break;
				 	}
			 }
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}
		return null;
	}
	/**
	 * 取得流程定义节点的跳转名称
	 * @param proDefinition
	 * @return
	 */
	public List<String> getStartNodeTransByDeployId(String deployId){
			String defXml=jbpmDao.getDefXmlByDeployId(deployId);		
			return getStartNodeTransByXml(defXml);
	}
	/**
	 * 取得流程定义节点的跳转名称
	 * @param proDefinition
	 * @return
	 */
	public List<String> getStartNodeTransByXml(String defXml){
		List<String>trans=new ArrayList();
		try{
			
			Element root = DocumentHelper.parseText(defXml).getRootElement();
			 for (Element elem : (List<Element>) root.elements()) {
				 	String tagName=elem.getName();
				 	if("start".equals(tagName)){
				 		Iterator<Element> tranIt=elem.elementIterator();
				 		while(tranIt.hasNext()){
				 			trans.add(tranIt.next().attributeValue("name"));
				 		}
				 		break;
				 	}
			 }
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}
		return trans;
	}
	
	public void setProcessVars(String piId, Map variables) {
		executionService.setVariables(piId, variables);
	}

}
