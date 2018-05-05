package com.htsoft.oa.action.flow;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.jbpm.api.TaskService;
import org.jbpm.api.task.Task;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.model.TaskLink;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.info.ShortMessageService;
import com.htsoft.oa.service.system.AppUserService;
import com.ibm.icu.text.SimpleDateFormat;

import flexjson.JSONSerializer;

/**
 * 流程中的任务的显示及操作
 * 
 * @author cf0666@gmail.com
 * 
 */
public class TaskAction extends BaseAction {
	@Resource(name = "flowTaskService")
	private com.htsoft.oa.service.flow.TaskService flowTaskService;
	@Resource
	private TaskService taskService;
	@Resource
	private ShortMessageService shortMessageService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private JbpmService jbpmService;
	@Resource
	private AppUserService appUserService;

	/**
	 * 按分页取得目前所有的正在进行的任务
	 * 
	 * @return
	 */
	public String all() {
		String taskName = getRequest().getParameter("taskName");
		PagingBean pb = new PagingBean(start, limit);
		List<TaskInfo> tasks = flowTaskService.getAllTaskInfos(taskName, pb);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:[");
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		for (TaskInfo taskInfo : tasks) {
			buff.append(ser.serialize(taskInfo));
			buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
			String[] piId = taskInfo.getExecutionId().split("\\.");
			if (piId.length > 0) {
				buff.append(",\"defId\":").append(piId[1]);
				buff.append(",\"taskType\":\"").append(piId[0]).append("\"");
			}
			buff.append("}");
		}
		buff.append("]}");
		jsonString = buff.toString();
		return SUCCESS;
		// String taskName=getRequest().getParameter("taskName");
		// PagingBean pb=new PagingBean(start, limit);
		// List<TaskInfo> tasks=flowTaskService.getAllTaskInfos(taskName, pb);
		// setJsonString(gsonFormat(tasks, pb.getTotalItems()));
		// return SUCCESS;
	}

	/**
	 * 取得某个任务的处理用户
	 * 
	 * @return
	 */
	public String users() {
		String taskId = getRequest().getParameter("taskId");
		String activityName = getRequest().getParameter("activityName");
		Set<AppUser> users = jbpmService.getNodeHandlerUsers(taskId,
				activityName);
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

		jsonString = "{success:true,userIds:'" + uIds.toString()
				+ "',userNames:'" + uNames.toString() + "'}";

		return SUCCESS;
	}

	/**
	 * 设置任务过期时间
	 * 
	 * @return
	 */
	public String due() {
		String taskIds = getRequest().getParameter("taskIds");
		String dueDateStr = getRequest().getParameter("dueDate");
		if (logger.isDebugEnabled()) {
			logger.debug("taskIds:" + taskIds + " dueDate:" + dueDateStr);
		}
		if (StringUtils.isNotEmpty(taskIds)) {
			String[] taskIdArr = taskIds.split("[,]");
			try {
				Date dueDate = DateUtils.parseDate(dueDateStr,
						new String[] { "yyyy-MM-dd HH:mm:ss" });
				for (String taskId : taskIdArr) {
					Task task = taskService.getTask(taskId);
					task.setDuedate(dueDate);
					taskService.saveTask(task);
				}
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}

		return SUCCESS;
	}

	// 任务指派
	public String handler() {
		String taskIds = getRequest().getParameter("taskIds");
		String userId = getRequest().getParameter("userId");
		String id = "," + userId + ",";
		if (logger.isDebugEnabled()) {
			logger.debug("taskIds:" + taskIds + " userId:" + userId);
		}
		if (StringUtils.isNotEmpty(taskIds)) {
			String[] taskIdArr = taskIds.split("[,]");
			for (String taskId : taskIdArr) {
				taskService.assignTask(taskId, id);
			}
		}

		return SUCCESS;

	}

	public String list() {
		// PagingBean pb=new PagingBean(start, limit);
		// List<TaskInfo>
		// tasks=flowTaskService.getTaskInfosByUserId(ContextUtil.getCurrentUserId().toString(),pb);
		// StringBuffer buff = new
		// StringBuffer("{success:true,'totalCounts':").append(pb.getTotalItems()).append(",result:[");
		// JSONSerializer ser = JsonUtil.getJSONSerializer();
		// for(TaskInfo taskInfo:tasks){
		// buff.append(ser.serialize(taskInfo));
		// buff.deleteCharAt(buff.length() - 1); //去掉最后的大括号
		// String[] piId=taskInfo.getExecutionId().split("\\.");
		// if(piId.length>0){
		// buff.append(",\"defId\":").append(piId[1]);
		// buff.append(",\"taskType\":\"").append(piId[0]).append("\"");
		// }
		// buff.append("}");
		// }
		// buff.append("]}");
		// jsonString=buff.toString();
		// return SUCCESS;
		PagingBean pb = new PagingBean(start, limit);
		List<TaskInfo> tasks = flowTaskService.getTaskInfosByUserId(ContextUtil
				.getCurrentUserId().toString(), pb);
		setJsonString(gsonFormat(tasks, pb.getTotalItems()));
		return SUCCESS;
	}

	public String change() {
		HttpServletRequest request = getRequest();
		String taskId = request.getParameter("taskId");
		String userId = request.getParameter("userId");
		String isOk = request.getParameter("isOk");
		String curUserId = "," + ContextUtil.getCurrentUserId().toString()
				+ ",";

		if ("true".equals(isOk)) {
			taskService.assignTask(taskId, "," + userId + ",");
			String msg = request.getParameter("msg");
			if (StringUtils.isNotEmpty(msg)) {
				// 添加短信息提示
				shortMessageService.save(AppUser.SYSTEM_USER, userId, msg,
						ShortMessage.MSG_TYPE_TASK);
			}
			setJsonString("{success:true,msg:'任务已经成功转交代办人来处理！'}");
		} else {
			Task task = taskService.getTask(taskId);
			if (task != null && curUserId.equals(task.getAssignee())) {
				taskService.assignTask(taskId, userId);
				String msg = request.getParameter("msg");
				if (StringUtils.isNotEmpty(msg)) {
					// 添加短信息提示
					shortMessageService.save(AppUser.SYSTEM_USER, userId, msg,
							ShortMessage.MSG_TYPE_TASK);
				}
				setJsonString("{success:true,msg:'任务已经成功转交代办人来处理！'}");
			} else {
				setJsonString("{success:true,msg:'对不起,您不是该单据的处理人,您无法做该操作!'}");
			}
		}

		return SUCCESS;
	}

	/**
	 * 释放任务
	 * 
	 * @return
	 */
	public String unlock() {
		String taskId = getRequest().getParameter("taskId");
		Task task = taskService.getTask(taskId);

		String curUserId = ContextUtil.getCurrentUserId().toString();

		if (task != null && curUserId.equals(task.getAssignee())) {// 为本人的任务，并且尚未完成才能解锁
			taskService.assignTask(task.getId(), null);
			setJsonString("{success:true,unlocked:true}");
		} else {
			setJsonString("{success:true,unlocked:false}");
		}

		return SUCCESS;
	}

	/**
	 * 锁定任务
	 * 
	 * @return
	 */
	public String lock() {

		String taskId = getRequest().getParameter("taskId");
		Task task = taskService.getTask(taskId);

		if (task != null && task.getAssignee() == null) {// 该任务尚未被分配，或该任务已经被处理完毕
			taskService.assignTask(task.getId(), ","
					+ ContextUtil.getCurrentUserId().toString() + ",");
			setJsonString("{success:true,hasAssigned:false}");
		} else {
			setJsonString("{success:true,hasAssigned:true}");
		}

		return SUCCESS;
	}

	/**
	 * 批量锁定任务
	 * 
	 * @return
	 */
	public String locks() {

		String taskIds = getRequest().getParameter("taskIds");
		boolean flag = false;
		if (StringUtils.isNotEmpty(taskIds)) {
			String[] taskIdArr = taskIds.split("[,]");
			for (String taskId : taskIdArr) {
				Task task = taskService.getTask(taskId);
				if (task != null && task.getAssignee() == null) {// 该任务尚未被分配，或该任务已经被处理完毕
					taskService.assignTask(task.getId(), ","
							+ ContextUtil.getCurrentUserId().toString() + ",");
				} else {
					flag = true;
				}
			}
		}
		StringBuffer sb = new StringBuffer();
		sb.append("{success:true,hasAssigned:");
		sb.append(flag);
		if (flag) {
			sb.append("msg:'对不起,选中的单据中被占用的未领用成功!'}");
		} else {
			sb.append("}");
		}
		setJsonString(sb.toString());

		return SUCCESS;
	}

	public String display() {

		// PagingBean pb=new PagingBean(0, 8);//获取前八条数据
		// List<TaskInfo>
		// tasks=flowTaskService.getTaskInfosByUserId(ContextUtil.getCurrentUserId().toString(),pb);
		// getRequest().setAttribute("taskList", tasks);
		// return "display";

		String createrId = "";
		StringBuffer sb = new StringBuffer();
		int start = 0;
		if (getRequest().getParameter("start") != null
				&& getRequest().getParameter("start") != "") {
			start = Integer.parseInt(getRequest().getParameter("start"));
		}
		int limit = 10;
		if (getRequest().getParameter("limit") != null
				&& getRequest().getParameter("limit") != "") {
			limit = Integer.parseInt(getRequest().getParameter("limit"));
		}
		String creater = getRequest().getParameter("creater"); // 申请人

		String taskUser = ContextUtil.getCurrentUserId().toString();
		if (getRequest().getParameter("taskUser") != null
				&& getRequest().getParameter("taskUser") != "") {
			taskUser = getRequest().getParameter("taskUser"); // 处理人
		}

		String busType = getRequest().getParameter("busType"); // 单据状态
		String runStatus = "1";
		if (getRequest().getParameter("runStatus") != null
				&& getRequest().getParameter("runStatus") != "") {
			runStatus = getRequest().getParameter("runStatus"); // 运行状态 (0=尚未启动
																// 1=已经启动流程
																// 2=运行结束)
		}

		String isOverdue = getRequest().getParameter("isOverdue"); // 是否过期(值为true则过期)
		String orderBy = "dueDate_";
		if (getRequest().getParameter("orderBy") != null
				&& getRequest().getParameter("orderBy") != "") {
			orderBy = getRequest().getParameter("orderBy"); // 按指定参数倒序排列
		}
		// 开始查找申请人
		if (creater != "" && creater != null) {
			sb = new StringBuffer();
			QueryFilter filter = new QueryFilter();
			filter.addFilter("Q_fullname_S_LK", creater);
			List<AppUser> userList = appUserService.getAllNoRequest(filter);
			for (AppUser appUser : userList) {
				sb.append(appUser.getUserId());
				sb.append(",");
			}
			if (userList.size() > 0)
				sb.deleteCharAt(sb.length() - 1);
		}
		String proDefinitionName = getRequest().getParameter(
				"proDefinitionName"); // 流程名
		createrId = sb.toString();

		List<TaskLink> linkList = flowTaskService.taskLinkList(start, limit,
				createrId, taskUser, busType, runStatus, isOverdue,
				proDefinitionName, orderBy);
		// 开始处理临时变量
		List<TaskLink> newTaskList = new ArrayList<TaskLink>();
		StringBuffer name = new StringBuffer(); // 处理人临时变量(存储前台显示的姓名)
		String applyName = "";
		Date applyDate = new Date();
		// 渲染某个索引对象的其他属性值
		for (TaskLink link : linkList) {
			if (link.getTaskUser() != null) { // 渲染所有待处理人的姓名(根据获得的受理人ID字符串集合读取)
				name = new StringBuffer();
				String[] taskUserArr = link.getTaskUser().trim().split("[,]");
				for (String userId : taskUserArr) {
					if (!"".equals(userId)) {
						AppUser appUser = appUserService.get(new Long(userId));
						name.append(appUser.getFullname());
						name.append(",");
					}
				}
				name.deleteCharAt(name.length() - 1);
				link.setTaskUserName(name.toString());
			}
			if (link.getCustomer() != null) { // 渲染申请人(申请人分为内部工单和外部工单 内部工单为工单创建人
												// 外部工单为客户)
				applyName = link.getCustomer().getCustomerName();
				link.setApplyName(applyName);
			} else {
				applyName = link.getCreater().getFamilyName();
				link.setApplyName(applyName);
			}
			if (link.getCustomerTime() != null) { // 渲染申请时间(申请时间分为内部工单和外部工单
													// 内部工单为工单创建时间 外部工单为客户申请时间)
				applyDate = link.getCustomerTime();
				link.setApplyTime(applyDate);
			} else {
				applyDate = link.getCreateTime();
				link.setApplyTime(applyDate);
			}
			if (link.getNeedsTime() != null) { // 换算剩余时长 (单位:小时)
				SimpleDateFormat format = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				SimpleDateFormat format1 = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String date1 = format1.format(new Date());
				String date2 = format.format(link.getNeedsTime());
				String passDate = DateUtil.getFSFromTwoDate(date1, date2,
						"yyyy-MM-dd HH:mm:ss");
				if (link.getNeedsTime().before(new Date())) {
					passDate = "-" + passDate;
				}
				link.setResidueTime(passDate);
			}
			if (link.getDueDate() != null) { // 换算任务剩余时长 (单位:小时)
				SimpleDateFormat format = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				SimpleDateFormat format1 = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String date1 = format1.format(new Date());
				String date2 = format.format(link.getDueDate());
				String passDate = DateUtil.getFSFromTwoDate(date1, date2,
						"yyyy-MM-dd HH:mm:ss");
				Date due = new Date(link.getDueDate().getTime());
				Date now = new Date();
				if (due.before(now) && due.equals(now)) {
					link.setDueDatePass("false");
				}
				if (link.getDueDate().before(new Date())) {
					passDate = "-" + passDate;
				}
				link.setDueDateStr(passDate);
			}
			newTaskList.add(link);
		}
		getRequest().setAttribute("taskList", newTaskList);
		return "display";
	}

	/**
	 * 检测当前任务是否被锁定，如果是自己的或者未锁定，则返回TRUE, 已经被他人锁定，则返回FALSE
	 * 
	 * @return
	 */
	public String check() {
		String taskId = getRequest().getParameter("taskId");
		Task task = taskService.getTask(taskId);
		// 修改是否被锁定的判断.执行人可为多个
		String cruUserId = ContextUtil.getCurrentUserId().toString();
		if (task != null && task.getAssignee() != null) {
			String[] assigneeIds = task.getAssignee().split(",");
			for (String assigneeId : assigneeIds) {
				if (assigneeId.equals(cruUserId)) {
					setJsonString("{success:true}");
					return SUCCESS;
				}
			}
		} else if (task != null && task.getAssignee() == null) {
			taskService.assignTask(task.getId(), cruUserId);
			setJsonString("{success:true,assigned:true}");
			return SUCCESS;
		} else {
			setJsonString("{success:true,assigned:false}");
			return SUCCESS;
		}

		return SUCCESS;

		// if(task!=null
		// &&task.getAssignee()!=null&&task.getAssignee().equals(cruUserId)){//该任务尚未被分配，或该任务已经被处理完毕
		// setJsonString("{success:true}");
		// }else if(task!=null &&task.getAssignee()==null){
		// taskService.assignTask(task.getId(),cruUserId );
		// setJsonString("{success:true,assigned:true}");
		// }else{
		// setJsonString("{success:true,assigned:false}");
		// }
		// return SUCCESS;
	}

	/**
	 * 用于显示所有任务.
	 * 
	 * @return
	 */

	public String taskList() {
		String createrId = "";
		StringBuffer sb = new StringBuffer();
		int start = Integer.parseInt(getRequest().getParameter("start"));
		int limit = Integer.parseInt(getRequest().getParameter("limit"));
		String creater = getRequest().getParameter("creater"); // 申请人
		String taskUser = getRequest().getParameter("taskUser"); // 处理人
		String busType = getRequest().getParameter("busType"); // 单据状态
		String runStatus = getRequest().getParameter("runStatus"); // 运行状态
																	// (0=尚未启动
																	// 1=已经启动流程
																	// 2=运行结束)
		String isOverdue = getRequest().getParameter("isOverdue"); // 是否过期(值为true则过期)
		String orderBy = getRequest().getParameter("orderBy"); // 按指定参数倒序排列
		String proDefinitionName = getRequest().getParameter(
				"proDefinitionName"); // 流程名
		// 开始查找申请人
		if (creater != "" && creater != null) {
			sb = new StringBuffer();
			QueryFilter filter = new QueryFilter();
			filter.addFilter("Q_fullname_S_LK", creater);
			List<AppUser> userList = appUserService.getAllNoRequest(filter);
			for (AppUser appUser : userList) {
				sb.append(appUser.getUserId());
				sb.append(",");
			}
			if (userList.size() > 0)
				sb.deleteCharAt(sb.length() - 1);
		}
		createrId = sb.toString();

		// Long type = -1L;
		// if(busType != null && busType != ""){
		// type = Long.parseLong(busType);
		// }
		// Long status = -1L;
		// if(runStatus != null && runStatus != ""){
		// status = Long.parseLong(runStatus);
		// }
		List<TaskLink> linkList = flowTaskService.taskLinkList(start, limit,
				createrId, taskUser, busType, runStatus, isOverdue,
				proDefinitionName, orderBy);
		// 开始处理临时变量
		List<TaskLink> newTaskList = new ArrayList<TaskLink>();
		StringBuffer name = new StringBuffer(); // 处理人临时变量(存储前台显示的姓名)
		String applyName = "";
		Date applyDate = new Date();
		// 渲染某个索引对象的其他属性值
		for (TaskLink link : linkList) {
			if (link.getTaskUser() != null) { // 渲染所有待处理人的姓名(根据获得的受理人ID字符串集合读取)
				name = new StringBuffer();
				String[] taskUserArr = link.getTaskUser().trim().split("[,]");
				for (String userId : taskUserArr) {
					if (!"".equals(userId)) {
						AppUser appUser = appUserService.get(new Long(userId));
						name.append(appUser.getFullname());
						name.append(",");
					}
				}
				if (name.length() > 0) {
					name.deleteCharAt(name.length() - 1);
				}
				link.setTaskUserName(name.toString());
			}
			if (link.getCustomer() != null) { // 渲染申请人(申请人分为内部工单和外部工单 内部工单为工单创建人
												// 外部工单为客户)
				applyName = link.getCustomer().getCustomerName();
				link.setApplyName(applyName);
			} else {
				applyName = link.getCreater().getFullname();
				link.setApplyName(applyName);
			}
			if (link.getCustomerTime() != null) { // 渲染申请时间(申请时间分为内部工单和外部工单
													// 内部工单为工单创建时间 外部工单为客户申请时间)
				applyDate = link.getCustomerTime();
				link.setApplyTime(applyDate);
			} else {
				applyDate = link.getCreateTime();
				link.setApplyTime(applyDate);
			}
			if (link.getNeedsTime() != null) { // 换算剩余时长 (单位:小时)
				SimpleDateFormat format = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				SimpleDateFormat format1 = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String date1 = format1.format(new Date());
				String date2 = format.format(link.getNeedsTime());
				String passDate = DateUtil.getFSFromTwoDate(date1, date2,
						"yyyy-MM-dd HH:mm:ss");
				if (link.getNeedsTime().before(new Date())) {
					passDate = "-" + passDate;
				}
				link.setResidueTime(passDate);
			}

			if (link.getDueDate() != null) { // 换算任务剩余时长 (单位:小时)
				SimpleDateFormat format = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				SimpleDateFormat format1 = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String date1 = format1.format(new Date());
				String date2 = format.format(link.getDueDate());
				String passDate = DateUtil.getFSFromTwoDate(date1, date2,
						"yyyy-MM-dd HH:mm:ss");
				if (link.getDueDate().before(new Date())) {
					passDate = "-" + passDate;
				}
				link.setDueDateStr(passDate);
			}

			newTaskList.add(link);
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(flowTaskService.getTaskLinkListCount(start, limit,
						createrId, taskUser, busType, runStatus, isOverdue,
						proDefinitionName)).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(newTaskList));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 设置流程过期时间 (process_run)
	 * 
	 * @return
	 */
	public String updateNeeds() {
		String taskIds = getRequest().getParameter("taskIds");
		String dueDateStr = getRequest().getParameter("dueDate");
		if (logger.isDebugEnabled()) {
			logger.debug("taskIds:" + taskIds + " dueDate:" + dueDateStr);
		}
		if (StringUtils.isNotEmpty(taskIds)) {
			String[] taskIdArr = taskIds.split("[,]");
			try {
				Date dueDate = DateUtils.parseDate(dueDateStr,
						new String[] { "yyyy-MM-dd HH:mm:ss" });
				for (String taskId : taskIdArr) {
					ProcessRun processRun = processRunService.get(new Long(
							taskId));
					processRun.setNeedsTime(dueDate);
					processRunService.save(processRun);
				}
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}

		return SUCCESS;
	}
}
