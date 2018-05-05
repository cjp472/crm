package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.jbpm.api.Execution;
import org.jbpm.pvm.internal.model.ExecutionImpl;
import org.jbpm.pvm.internal.task.TaskImpl;

import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.flow.TaskDao;
import com.htsoft.oa.model.flow.JbpmTask;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.flow.TaskService;
import com.htsoft.oa.service.system.AppUserService;

public class TaskServiceImpl extends BaseServiceImpl<TaskImpl> implements TaskService{

	@Resource
	private ProcessRunService processRunService;
	private TaskDao dao;
	public TaskServiceImpl(TaskDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Resource
	private AppUserService appUserService;
	
	public List<TaskImpl> getTasksByUserId(String userId,PagingBean pb){
		return dao.getTasksByUserId(userId,pb);
	}
	/**
	 * 取得所有任务
	 * @param taskName
	 * @param pb
	 * @return
	 */
	public List<TaskInfo> getAllTaskInfos(String taskName,PagingBean pb){
		List<TaskImpl> list=dao.getAllTasks(taskName, pb);
		List<TaskInfo> taskInfoList=constructTaskInfos(list);;
		return taskInfoList;
	}
	
	
	protected List<TaskInfo> constructTaskInfos(List<TaskImpl> taskImpls){
		List<TaskInfo> taskInfoList=new ArrayList<TaskInfo>();
		for(TaskImpl taskImpl:taskImpls){
			TaskInfo taskInfo=new TaskInfo(taskImpl);
			if(taskImpl.getAssignee()!=null&&!taskImpl.getAssignee().trim().equalsIgnoreCase("null")){
				try{
					AppUser user=appUserService.get(new Long(taskImpl.getAssignee()));
					taskInfo.setAssignee(user.getFullname());
				}catch(Exception ex){
					logger.error(ex);
				}
			}
			if(taskImpl.getSuperTask()!=null){
				taskImpl=taskImpl.getSuperTask();
			}
			ProcessRun processRun=processRunService.getByPiId(taskInfo.getPiId());
			if(processRun!=null){
				taskInfo.setTaskName(processRun.getSubject() + "--" + taskImpl.getActivityName());
				taskInfo.setActivityName(taskImpl.getActivityName());
			}
			//显示任务，需要加上流程的名称
			taskInfoList.add(taskInfo);
		}
		return taskInfoList;
	}
	/**
	 * 显示自定义的任务信息
	 */
	public List<TaskInfo> getTaskInfosByUserId(String userId,PagingBean pb){
		List<TaskImpl> list=getTasksByUserId(userId, pb);
//		List<TaskInfo> taskInfoList=new ArrayList<TaskInfo>();
//		for(TaskImpl taskImpl:list){
//			TaskInfo taskInfo=new TaskInfo(taskImpl);
//			if(taskImpl.getAssignee()!=null){
//				AppUser user=appUserService.get(new Long(taskImpl.getAssignee()));
//				taskInfo.setAssignee(user.getFullname());
//				
//			}
//			ProcessRun processRun=processRunService.getByPiId(taskImpl.getExecutionId());
//			if(processRun!=null){
//				taskInfo.setTaskName(processRun.getProDefinition().getName() + "--" + taskImpl.getActivityName());
//				taskInfo.setActivityName(taskImpl.getActivityName());
//			}
//			//显示任务，需要加上流程的名称
//			taskInfoList.add(taskInfo);
//		}
		
		return constructTaskInfos(list);
		
		
	}

	@Override
	public Set<Long> getHastenByActivityNameVarKeyLongVal(String activityName,
			String varKey, Long value) {
		List<JbpmTask> jtasks=dao.getByActivityNameVarKeyLongVal(activityName, varKey, value);
		Set<Long> userIds=new HashSet<Long>();
		for(JbpmTask jtask:jtasks){
			if(jtask.getAssignee()==null){
				List<Long> userlist=dao.getUserIdByTask(jtask.getTaskId());
				userIds.addAll(userlist);
				List<Long> groupList=dao.getGroupByTask(jtask.getTaskId());
				for(Long l:groupList){
					List<AppUser> uList=appUserService.findByRoleId(l);
					List<Long> idList=new ArrayList<Long>();
					for(AppUser appUser:uList){
						idList.add(appUser.getUserId());
					}
					userIds.addAll(idList);
				}
			}else{
				userIds.add(new Long(jtask.getAssignee()));
			}
		}
		return userIds;
	}
	@Override
	public List<TaskImpl> getCandidateTasks(String userId, PagingBean pb) {
		return dao.getCandidateTasks(userId, pb);
	}
	
	@Override
	public List<TaskImpl> getPersonTasks(String userId, PagingBean pb) {
		return dao.getPersonTasks(userId, pb);
	}
	
	/**
	 * 按主键查找execution实体
	 * @param dbid
	 * @return
	 */
	public Execution getExecutionByDbid(Long dbid){
		return dao.getExecutionByDbid(dbid);
	}
	
	/**
	 * 保存executionimpl
	 * @param executionImpl
	 */
	public void save(ExecutionImpl executionImpl){
		dao.save(executionImpl);
	}
	
	/**
	 * 去掉某个execution的子execution及其相关联的记录
	 * @param parentDbid
	 */
	public void removeExeByParentId(Long parentDbid){
		dao.removeExeByParentId(parentDbid);
	}
	
	/**
	 * 根据executionId去查找task Id集合
	 * @param executionId
	 * @return
	 * @author zhangyl
	 * @createtime 2012年7月26日 17:51:32
	 */
	public String findbyTaskId(String executionId){
		return dao.findbyTaskId(executionId);
	}
	
	/**
	 * 更改过期时间
	 * @param id
	 * @param dueDate
	 * @author zhangyl
	 * @createtime 2012年7月26日 17:50:59
	 */
	public void updateDueDate(String id,String dueDate){
		dao.updateDueDate(id, dueDate);
	}
}
