package com.ulane.callout.action.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.jbpm.api.task.Task;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.FileAttachService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObProjExecType;
import com.ulane.callout.model.outb.ObProject;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.callout.service.outb.ObProjExecTypeService;
import com.ulane.callout.service.outb.ObProjectService;
import com.ulane.core.model.FlowResult;
import com.ulane.core.service.FlowResultService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObProjectAction extends BaseAction{
	public static final Logger logger = Logger.getLogger(ObProjectAction.class);
	
	@Resource
	private ObProjectService obProjectService;
	@Resource
	private FileAttachService fileAttachService; 
	@Resource
	private UlDepartmentService ulDepartmentService;
	@Resource
	private UlEmployeeService ulEmployeeService;
	@Resource
	private FlowResultService flowResultService;
	@Resource
	private JbpmService jbpmService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private ObProjExecTypeService obProjExecTypeService;
	@Resource
	private ObComService obComService;
	
	private ObProject obProject;
	
	private Long projId;

	public Long getProjId() {
		return projId;
	}

	public void setProjId(Long projId) {
		this.projId = projId;
	}

	public ObProject getObProject() {
		return obProject;
	}

	public void setObProject(ObProject obProject) {
		this.obProject = obProject;
	}

	/**
	 * 选择器显示列表
	 */
	public String Selectorlist(){
		String flag = getRequest().getParameter("flag");
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("creTime", QueryFilter.ORDER_DESC);
		try{
			if(ObProject.G_FLAG_ENABLE.equals(flag)) {
				//启用状态的项目
				filter.addFilter("Q_projStaId_SN_EQ", ObProject.FLAG_EXECUTING.toString());
			} else if(ObProject.G_FLAG_ALL.equals(flag)) {
				//全部的项目
			} else {
				//执行中的项目
				filter.addFilter("Q_projStaId_SN_EQ", ObProject.FLAG_EXECUTING.toString());
	//			filter.addFilter("Q_perIncharge_L_EQ", ContextUtil.getCurrentUser().getUlEmployee().getUseid().toString());
			}
			List<ObProject> list= obProjectService.getAll(filter);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {	"staDat", "endDat" });
			//将负责人和所属机构名称注入到Bean中
			nameOwnerTeamAndPerIncharge(list);
			buff.append(jsonSer.serialize(list));
			buff.append("}");
			jsonString=buff.toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		}
		return SUCCESS;
	}
	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("staDat", QueryFilter.ORDER_DESC);
		try{
			List<ObProject> list= obProjectService.getAll(filter);
			
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[]{"creTime","updTime"});
			//将负责人和所属机构名称注入到Bean中
			nameOwnerTeamAndPerIncharge(list);
			buff.append(jsonSer.serialize(list));
			buff.append("}");
			jsonString=buff.toString();
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	//注入ownerTeamName和perInchargeName
	private void nameOwnerTeamAndPerIncharge(List<ObProject> list){
		if (null!=list && list.size()>0) {
			int iCount = list.size();
			for (int i=0;i<iCount;i++) {
				ObProject obj = list.get(i);
				obj.setOwnerTeamName(getOwnerTeamName(obj.getOwnerTeam()));
				obj.setPerInchargeName(getPerInchargeName(obj.getPerIncharge()));
			}
		}
	}
	
	/**
	 * 工作流显示列表
	 */
	public String listFlow() {

		String flowNode = getRequest().getParameter("flowNode");
		String flowType = getRequest().getParameter("flowType");
		String approveStatus = getRequest().getParameter("approveStatus");

		logger.debug("节点名称 " + flowNode);
		Map<Long, FlowResult> map = flowResultService.getFlowResultMap(flowType, flowNode, approveStatus);
		QueryFilter filter = new QueryFilter(getRequest());

		Collection<FlowResult> c = map.values();
		Iterator it = c.iterator();
		String qIdLIN = "";
		int i = 0;
		for (; it.hasNext();) {
			FlowResult f = (FlowResult) it.next();
			if (i > 0)
				qIdLIN += ",";
			qIdLIN += f.getFlowPk().toString();
			i++;
		}
		if (i > 1) {
			filter.addFilter("Q_projId_S_LIN", qIdLIN);
		} else if (i == 1) {
			filter.addFilter("Q_projId_L_EQ", qIdLIN);
		}

		filter.addSorted("createDate", "desc");
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.create();
		List<ObProject> list = obProjectService.getAll(filter);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).
				append(",result:[");
		int TotalCount = 0;

		for (ObProject op : list) {
			if (map.containsKey(op.getProjId())) {

				TotalCount++;
				buff.append(ser.serialize(op));
				buff.deleteCharAt(buff.length() - 1);// 对于一个

				buff.append(",approveResult:'").append(map.get(op.getProjId()).getFlowStatus()).append("'");

				if (op.getRunid() != null) {// 把当前正在运行的任务加载出来，以方便用户查找,但会影响性能
					ProcessRun processRun = processRunService.get(op.getRunid());
					if (processRun.getPiId() != null) {
						buff.append(",piId:'").append(processRun.getPiId()).append("'");
						List<Task> curTasks = jbpmService.getTasksByPiId(processRun.getPiId());
						buff.append(",tasks:[");
						for (Task task : curTasks) {
							buff.append("{taskId:").append(task.getId())
									.append(",taskName:")
									.append(gson.toJson(task.getName()));
							if (task.getAssignee() != null) {
								AppUser user = appUserService.get(new Long(task.getAssignee()));
								if (user != null) {
									buff.append(",userId:").append(
											task.getAssignee()).append(",fullname:")
											.append(gson.toJson(user.getFullname()));
								}
							}
							buff.append("},");
						}
						if (curTasks.size() > 0) {
							buff.deleteCharAt(buff.length() - 1);
						}
						buff.append("]");
					}
				}
				buff.append("},");

			}

		}

		if (list.size() > 0 && map.size() != 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");
		jsonString = buff.toString();

		return SUCCESS;
	}
	

	
	/**
	 * 项目内码列表
	 * @return
	 */
	public String listProj() {
		QueryFilter filter=new QueryFilter(getRequest());
		try{
			List<ObProject> list= obProjectService.getAll(filter);
			int iCount = list.size();
			HashMap<String,String> hsmp = new HashMap<String,String>();
			for(int i=0; i<iCount; i++) {
				hsmp.put(String.valueOf(list.get(i).getProjId()), list.get(i).getProjNam());
			}
			jsonString = JsonUtil.hsmp2JSONArray(hsmp);
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		try {
			String[]ids=getRequest().getParameterValues("ids");
			if(ids!=null){
				for(String id:ids){
					ObProject obj = obProjectService.get(Long.parseLong(id));
					Short sStatus = obj.getProjStaId();
					//如果项目状态为0——未启用，那么删除该项目；状态为1——启用，改为状态2——关闭
					if(ObProject.FLAG_DISABLED.equals(sStatus)) {
						obProjectService.remove(new Long(id));
					} else if(ObProject.FLAG_EXECUTING.equals(sStatus)) {
						obj.setProjStaId(ObProject.FLAG_CLOSE);
						obProjectService.save(obj);
					}
				}
			}
			jsonString="{success:true}";
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 关闭项目，及项目下所属活动中处于“启用”状态的活动
	 */
	public String close() {
		try {
			String sProjId= getRequest().getParameter("ids");
			Long projId = Long.parseLong(sProjId);
			this.closeProject(projId);
			this.closeOrPauseComs(projId, ObCom.STATUS_CLOSE);
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 关闭项目
	 */
	private void closeProject(Long projId) {
		ObProject obj = obProjectService.get(projId);
		obj.setProjStaId(ObProject.FLAG_CLOSE);
		obProjectService.save(obj);
	}
	
	public String disable() {
		try {
			String[]ids=getRequest().getParameterValues("ids");
			if(ids!=null){
				for(String id:ids){
					ObProject obj = obProjectService.get(Long.parseLong(id));
					Short sStatus = obj.getProjStaId();
					//如果项目状态为0——未启用，那么删除该项目；状态为1——启用，改为状态2——关闭
					if(ObProject.FLAG_EXECUTING.equals(sStatus)) {
						obj.setProjStaId(ObProject.FLAG_CLOSE);
						obProjectService.save(obj);
					}
				}
			}
			jsonString="{success:true}";
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		try {
			ObProject obProject=obProjectService.get(projId);
			
			//查询执行方式
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_obProject.projId_L_EQ", String.valueOf(projId));
			List<ObProjExecType> listExecType = obProjExecTypeService.getAll(filter);
			StringBuilder sber = new StringBuilder();
			for(ObProjExecType obj : listExecType) {
				sber.append(obj.getProjectZxfs()+",");
			}
			obProject.setProjExecTypeStr(sber.toString());
			
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[]{"staDat","endDat","creTime","updTime"});
			//将数据转成JSON格式fileAttachs
			jsonSer.exclude("fileAttachs.filePath").exclude("fileAttachs.createtime")			//需要去除的字段
					.exclude("fileAttachs.ext").exclude("fileAttachs.fileType")
					.exclude("fileAttachs.note").exclude("fileAttachs.creator")
					.exclude("fileAttachs.creatorId").exclude("fileAttachs.totalBytes")
					.exclude("fileAttachs.delFlag").exclude("fileAttachs.appUser")
					;
			StringBuffer sb = new StringBuffer("{success:true,data:");
			
			obProject.setOwnerTeamName(getOwnerTeamName(obProject.getOwnerTeam()));
			obProject.setPerInchargeName(getPerInchargeName(obProject.getPerIncharge()));
			sb.append(jsonSer.serialize(obProject));
			sb.append("}");
			setJsonString(sb.toString());
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 获取所属机构名称
	 * @return
	 */
	public String getOwnerTeamName(Long ownerTeam) {
		if (null==ownerTeam) {
			return "";
		}
		UlDepartment ulDepartment = ulDepartmentService.get(ownerTeam);
		return ulDepartment.getDepname();
	}
	
	/**
	 * 获取负责人姓名
	 * @return
	 */
	public String getPerInchargeName(Long perIncharge) {
		if (null==perIncharge) {
			return "";
		}
		UlEmployee ulEmployee = ulEmployeeService.get(perIncharge);
		return (ulEmployee.getFullname()+"("+ulEmployee.getUserNo()+")");
	}
	
	/**
	 * 添加及保存操作
	 */
	public String save(){
		try {
			String fileIds=getRequest().getParameter("fileIds");							//附件
			String itemIndex = getRequest().getParameter("itemIndex");
			
			if(StringUtils.isNotBlank(itemIndex)) {
				obProject.setBusiTypId(Short.parseShort(itemIndex));
			}
			
			if(StringUtils.isNotEmpty(fileIds)){
				obProject.getFileAttachs().clear();
				String[] ids=fileIds.split(",");
				for(int i=0;i<ids.length;i++){
				   FileAttach fileAttach=fileAttachService.get(new Long(ids[i]));
				   obProject.getFileAttachs().add(fileAttach);
				}
			}
			
			//执行方式——对于项目来说，可以有多种执行方式，执行方式之间用,隔开
			String typesStr = StringUtils.trim(getRequest().getParameter("obProject.execTypId_form"));	//执行方式串
			String projTypId = getRequest().getParameter("OB_Project_Combo_ProjTypId_value");			//阶段
			String typesStrHidden = getRequest().getParameter("execTypId_hidden");
			String busiTypId = getRequest().getParameter("busiTypId");
			
			if(obProject.getProjId()==null){
				//保存新添加的项目内容
				obProject.setCreUseId(ContextUtil.getCurrentUserId());						//创建人
				obProject.setCreTime(new Date());											//创建时间
				obProject.setProjTypId(Short.parseShort(projTypId));						//阶段
				obProject.setProjStaId(ObProject.FLAG_DISABLED);							//初始状态：未启动
				ObProject obj= obProjectService.save(obProject);							//保存：项目
				saveProjExe(typesStr, obj);													//保存：执行方式
			}else{
				String sProjStaId = getRequest().getParameter("projStaIdVal");
				Short projStaId =  Short.parseShort(sProjStaId);
				ObProject orgObProject=obProjectService.get(obProject.getProjId());
				obProject.setUpdUseId(ContextUtil.getCurrentUserId());						//修改人
				obProject.setUpdTime(new Date());											//修改时间
				if(StringUtils.isNotBlank(busiTypId)) {										//业务类型
					obProject.setBusiTypId(Short.parseShort(busiTypId));
				}
				obProject.setProjTypId(Short.parseShort(projTypId)); 						//阶段
				obProject.setProjStaId(projStaId);											//状态
				
				try{
					//第一步：保存项目
					if(ObProject.FLAG_CLOSE.equals(obProject.getProjStaId())) {
						obProject.setProjTypId(ObProject.STAGE_CLOSE);//如果是关闭状态，那么将该阶段也关闭
						obProject.setEndDat(new Date());	//如果是“项目结束”阶段，并且状态是“关闭”状态，那么将项目结束时间修改为当前系统时间
					}
					BeanUtil.copyNotNullProperties(orgObProject, obProject);
					ObProject obj = obProjectService.save(orgObProject);
					
					//第二部：保存执行方式
					if(StringUtils.isBlank(typesStr) && StringUtils.isNotBlank(typesStrHidden)) {
						saveProjExe(typesStrHidden, obj);
					} else {
						saveProjExe(typesStr, obj);
					}
					
					//第三部：如果projStatId是关闭或取消状态，则关闭该项目下的所有“启动”的活动
					if(ObProject.FLAG_CLOSE.equals(projStaId) || ObProject.FLAG_CANCELED.equals(projStaId)) {
						this.closeOrPauseComs(obProject.getProjId(),ObCom.STATUS_CLOSE);
					} else if(ObProject.FLAG_PAUSE.equals(projStaId)) {
						this.closeOrPauseComs(obProject.getProjId(), ObCom.STATUS_PAUSE);
					} else if(ObProject.FLAG_CANCELED.equals(projStaId)) {
						this.closeOrPauseComs(obProject.getProjId(), ObCom.STATUS_ZHUXIAO);
					}
				}catch(Exception ex){
					logger.error(ex.getMessage());
				}
			}
			setJsonString("{success:true}");
		} catch(Exception e) {
			logger.error(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 保存执行方式
	 */
	public void saveProjExe(String typesStr,ObProject obProject) {
		if(null!=typesStr) {
			String[] types = StringUtils.split(typesStr, ",");
			int iCount = types.length;
			if(iCount>0) {
				//先删除该项目已经存在的执行方式
				if(null!=obProject && null!=types && types.length>0) {
					obProjExecTypeService.removeObj(obProject.getProjId());
				}
				
				for(int i=0;i<iCount;i++) {
					if(StringUtils.isNotBlank(types[i])) {
						ObProjExecType petObj = new ObProjExecType();
						petObj.setProjectZxfs(Short.valueOf(StringUtils.trim(types[i])));
						petObj.setObProject(obProject);
						obProjExecTypeService.save(petObj);
					}
				}
			}
		}
	}
	
	//状态值切换
	public String changeStatus() {
		try {
			String id = getRequest().getParameter("projId");
			Long projId = Long.parseLong(id);							//项目ID
			ObProject obProject = obProjectService.get(projId);
			Short projStatus = obProject.getProjStaId();
			//项目：“执行中”——>改为“停止”状态
			if(ObProject.FLAG_EXECUTING.equals(projStatus)) {
				boolean isClose = obProjectService.isStatusComs(projId,ObCom.STATUS_PAUSE);	//判断项目下的活动是否有处于“启动”状态
				if(isClose) {
					obProject.setProjStaId(ObProject.FLAG_PAUSE);
				} else {
					//存在有“启用”状态的活动，因此给出提示信息
					jsonString="{success:false}";
					return SUCCESS;
				}
			} 
			
			obProjectService.pauseProj(projId);
			jsonString="{success:true}";
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 判断该项目下是否还有处于“启用”状态的活动
	 */
	public String isProjComsEnable() {
		try {
			String id = getRequest().getParameter("projId");
			Long projId = Long.parseLong(id);							//项目ID
			boolean isClose = obProjectService.isStatusComs(projId,ObCom.STATUS_PAUSE);	//判断项目下的活动是否有处于“启动”状态
			if(isClose) {
				//不存在有“启用”状态的活动，因此给出提示信息
				jsonString="{success:true}";
			} else {
				//存在有“启用”状态的活动，因此给出提示信息
				jsonString="{success:false}";
			}
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	/**
	 * 恢复项目
	 */
	public String recover() {
		try {
			String id = getRequest().getParameter("ids");
			Long projId = Long.parseLong(id);							//项目ID
			ObProject obProject = obProjectService.get(projId);
			Short projStatus = obProject.getProjStaId();
			//项目：“停止”——>改为“执行中”状态
			if(ObProject.FLAG_PAUSE.equals(projStatus)) {
				obProject.setProjStaId(ObProject.FLAG_EXECUTING);
			}
			obProjectService.save(obProject);
			jsonString="{success:true}";
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 停止项目，包括项目下所有处于“启用”状态下的活动
	 */
	public String pause() {
		try {
			//暂停项目
			String id = getRequest().getParameter("ids");
			Long projId = Long.parseLong(id);							//项目ID
			ObProject obj = obProjectService.get(projId);
			obj.setProjStaId(ObProject.FLAG_PAUSE);
			obProjectService.save(obj);
			
			//暂停项目下的所有活动
			this.closeOrPauseComs(projId,ObCom.STATUS_PAUSE);
			jsonString="{success:true}";
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}

	/**
	 * 关闭或暂停项目下的所有活动
	 */
	private void closeOrPauseComs(Long projId,Short status) {
		List<ObCom> comList = obComService.queryObComs(projId);
		for(ObCom obCom : comList) {
			//只对处于“启用”状态的活动进行操作
			if(ObCom.STATUS_ENABLED.equals(Short.valueOf(String.valueOf(obCom.getObComStaId())))) {
				if(obCom.STATUS_PAUSE.equals(status)) {				//入参为：暂停
					obCom.setObComStaId(ObCom.STATUS_PAUSE_LONG);
				} else if(ObCom.STATUS_CLOSE.equals(status)) {		//入参为：关闭
					obCom.setObComStaId(ObCom.STATUS_CLOSE_LONG);
				}
				obComService.save(obCom);
			}
		}
		/**
		 * 需要优化代码：pause()和save()同时调用该方法时，如果采用如下的方式进行操作
		 * 				pause()方法可以暂停所有活动，但通过save()方式，obProjectInst.getObComs()
		 * 				无法取得活动集合
		 */
//		ObProject obProjectInst = obProjectService.get(projId);
//		Set<ObCom> comSet = obProjectInst.getObComs();
//		for(ObCom obCom : comSet) {
//			//只对处于“启用”状态的活动进行操作
//			if(ObCom.STATUS_ENABLED.equals(Short.valueOf(String.valueOf(obCom.getObComStaId())))) {
//				if(obCom.STATUS_PAUSE.equals(status)) {				//入参为：暂停
//					obCom.setObComStaId(ObCom.STATUS_PAUSE_LONG);
//				} else if(ObCom.STATUS_CLOSE.equals(status)) {		//入参为：关闭
//					obCom.setObComStaId(ObCom.STATUS_CLOSE_LONG);
//				}
//				obComService.save(obCom);
//			}
//		}
	}
	
	/**
	 * 启用项目
	 */
	public String enable() {
		try {
			String[]ids=getRequest().getParameterValues("ids");
			if(null!=ids){
				for(String id:ids){
					ObProject obProject = obProjectService.get(Long.parseLong(id));
					obProject.setProjStaId(ObProject.FLAG_EXECUTING);
					obProjectService.save(obProject);
				}
			} 
			jsonString="{success:true}";
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 查找projId该项目下最晚执行的活动时间
	 */
	public String getMaxEndDatCom() {
		try {
			String projId = getRequest().getParameter("projId");
			String maxEndDatCom = obComService.queryMaxEndTimeCom(Long.parseLong(projId));
			HashMap<String,String> hsmp = new HashMap<String,String>();
			hsmp.put("maxEndDatCom", maxEndDatCom);
			setJsonString(JsonUtil.hsmp2JSON(hsmp));	
		} catch(Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}
}
