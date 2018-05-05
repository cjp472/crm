package com.ulane.callout.action.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import orm.complex.query.framework.commtable.CommTable;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.QueryUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.task.CalendarPlan;
import com.htsoft.oa.model.task.CalendarPlanHandle;
import com.htsoft.oa.service.task.CalendarPlanHandleService;
import com.htsoft.oa.service.task.CalendarPlanService;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.model.outb.ObCalllist;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObComSalerul;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.model.outb.ObProject;
import com.ulane.callout.model.outb.ObSaletask;
import com.ulane.callout.model.outb.ObSaletaskBase;
import com.ulane.callout.model.outb.ObSaletaskBo;
import com.ulane.callout.service.outb.ObCallbatchService;
import com.ulane.callout.service.outb.ObCalllistService;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.callout.service.outb.ObConCalllistService;
import com.ulane.callout.service.outb.ObProjectService;
import com.ulane.callout.service.outb.ObSaletaskBoService;
import com.ulane.callout.service.outb.ObSaletaskService;
import com.ulane.core.DateUtil;
import com.ulane.core.plugin.soap.impl.ConHisSoapServerImpl;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.service.customer.ConHisService;
import com.ulane.customer.service.customer.CusPersonalService;
import com.ulane.customer.service.fee.ObFeeIndexLevelService;
import com.ulane.customer.service.fee.SysEmpPerformanceService;
import com.ulane.supply.service.supply.ScBizOrderFeeService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObSaletaskAction extends BaseAction{
	public static Logger logger = Logger.getLogger(ObSaletaskAction.class);
	
	@Resource
	private ObSaletaskService obSaletaskService;
	@Resource
	private ObComService obComService;
	@Resource
	private ObProjectService obProjectService;
	private ObSaletask obSaletask;
	@Resource
	private ObConCalllistService obConCalllistService;
	@Resource
	private ObSaletaskBoService obSaletaskBoService;
	@Resource
	private ObCallbatchService obCallbatchService;
	@Resource
	private ObCalllistService obCalllistService;
	@Resource
	private SysEmpPerformanceService sysEmpPerformanceService;
	@Resource
	private CalendarPlanHandleService calendarPlanHandleService;
	@Resource
	private CusPersonalService cusPersonalService;

	public ObSaletask getObSaletask() {
		return obSaletask;
	}

	public void setObSaletask(ObSaletask obSaletask) {
		this.obSaletask = obSaletask;
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////
	///////////////// 						营销（活动）功能									//
	//////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 添加及保存操作
	 */
	public String save(){
		try {
			if(obSaletask.getSaletaskId()==null){
				obSaletaskService.save(obSaletask);
			}else{
				ObSaletask orgObSaletask=obSaletaskService.get(obSaletask.getSaletaskId());
				try{
					BeanUtil.copyNotNullProperties(orgObSaletask, obSaletask);
					obSaletaskService.save(orgObSaletask);
				}catch(Exception ex){
					logger.error(ex.getMessage());
				}
			}
			setJsonString("{success:true}");			
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list(){
		try {
			QueryFilter filter=new QueryFilter(getRequest());
			List<ObSaletask> list= obSaletaskService.getAll(filter);
			
			Type type=new TypeToken<List<ObSaletask>>(){}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
//			JSONSerializer serializer = new JSONSerializer();
//			serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//			buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
			
			Gson gson=new Gson();
			buff.append(gson.toJson(list, type));
			buff.append("}");
			
			jsonString=buff.toString();			
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////
	///////////////// 						营销进度功能										//
	//////////////////////////////////////////////////////////////////////////////////////////
	@Resource
	private ObFeeIndexLevelService obFeeIndexLevelService;
	@Resource
	private ScBizOrderFeeService scBizOrderFeeService;
	@Resource
	private CalendarPlanService calendarPlanService;
	@Resource
	private ConHisService conHisService;
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		try {
			String comIdTmp = getRequest().getParameter("comId");
			logger.debug("营销执行—>营销活动明细：comId="+comIdTmp);
			if(StringUtils.isNotBlank(comIdTmp)) {
				ObCom obCom = obComService.get(Long.parseLong(comIdTmp));
				//营销项目
				ObProject obProject = obProjectService.get(obCom.getProjId());
				
				ObSaletaskBase base = new ObSaletaskBase();
				
				base.setProjName(obProject.getProjNam());					//营销项目名
				base.setObComNam(obCom.getObComNam());						//活动名称
				
				base.setProducts(obCom.getProducts());						//产品
				base.setCtScrTemplates(obCom.getCtScrTemplates());			//话术
				JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
				StringBuffer sb = new StringBuffer("{success:true,data:");
				
				//将数据转成JSON格式fileAttachs		
//				sb.append("projName:"+obProject.getProjNam());
				sb.append(jsonSer.serialize(base));
				sb.append("}");
				setJsonString(sb.toString());
			}			
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	// 显示任务列表
	public String listTask() {
		try {
			QueryFilter filter=new QueryFilter(getRequest());
			PagingBean pagBean = filter.getPagingBean();
			String pagStart = String.valueOf(pagBean.getStart());
			String pageSize = String.valueOf(pagBean.getPageSize());
			
			String assTypId = getRequest().getParameter("assTypId");
			logger.debug("分配方式字典：assTypId="+assTypId);
			//对于名单池执行方式，未执行任务
			if(StringUtils.isNotBlank(assTypId)) {
				logger.debug("任务列表——>显示名单池中任务"+assTypId);
				String queryType = getRequest().getParameter("type");
				if(ObComSalerul.RUL_VAL_MAX_ASSIGN_POOL.equals(assTypId) && "NO_EXEC".equals(queryType)) {
					Map<String,String> param = new HashMap<String,String>();
					param.put("comId", getRequest().getParameter("comId"));	//活动内码
					param.put("pagStart", pagStart);						//分页start
					param.put("pageSize", pageSize);						//分页pageSize
					
					String result = obConCalllistService.getComRulPoolCusInfo(param);
					setJsonString(result);
					return SUCCESS;
				}
			}
			
			Map<String,String> queryParam = new HashMap<String,String>();
			String comId = getRequest().getParameter("comId");
			String type = getRequest().getParameter("type");
			String startTime = getRequest().getParameter("startTime");
			String endTime = getRequest().getParameter("endTime");
			queryParam.put("comId", comId);							//活动ID
			queryParam.put("pagStart", pagStart);					//分页start
			queryParam.put("pagSize", pageSize);					//分页pageSize
			queryParam.put("MARKET_TYPE", type);					//查询类型
			
			//搜索框查询参数
			queryParam.put("startTime", startTime);				//开始时间
			queryParam.put("endTime", endTime);					//结束时间
			
			queryParam.put("busiRelId", getRequest().getParameter("Q_busiRelId_SN_EQ"));		//营销结果——搁置原因
			queryParam.put("busiStagId", getRequest().getParameter("Q_busiStagId_SN_EQ")); 		//营销阶段
			queryParam.put("conStaId", getRequest().getParameter("Q_conStaId_SN_EQ")); 			//拨打结果——联络结果
			queryParam.put("servStaId", getRequest().getParameter("Q_servStaId_SN_EQ")); 		//服务状态——销售状态
			queryParam.put("taskExecType", getRequest().getParameter("QtaskExecType")); 		//处理类型——失败原因/任务来源
			queryParam.put("typeId", getRequest().getParameter("Q_typId_SN_EQ")); 				//分配来源
			
			logger.debug("查询参数：comId="+comId+";type="+type+";startTime="+startTime+";endTime="+endTime);
			String result = obSaletaskService.queryTaskByComId(queryParam);
			
			setJsonString(result);
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	//组装时间段查询条件
	public Map<String,String> betweenTime(String field,String startTime,String endTime) {
		Map<String,String> queryParam = new HashMap<String,String>();
		if(StringUtils.isNotBlank(field)) {
			queryParam.put("field", field);
		}
		if(StringUtils.isNotBlank(startTime)) {
			queryParam.put("startTime", startTime);
		}
		if(StringUtils.isNotBlank(endTime)) {
			queryParam.put("endTime", endTime);
		}
		return queryParam;
	}
	
	/**
	 * 饼图：数据显示，各种任务等。
	 */
	public String listCounts() {
		try {
			String comId = getRequest().getParameter("comId");
			String result = obSaletaskService.getTaskCount(comId);
			setJsonString(result);	
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 获取指标、销售额及完成率
	 * 获取方式：通过我方系统数据库统计得出的数据
	 */
	public String getStatisticsDataOrg() {
		try {
			Long userId = ContextUtil.getCurrentUserId();
			String employeeid = ContextUtil.getCurrentUser().getEmployeeid();
			Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
			//获取个人指标、小组指标和指标平均值：selfFeeIndex、goupFeeIndex和avgFeeIndex
			String groupAndAvgIndex = obFeeIndexLevelService.getGroupAndAvgIndex(deptId);	
			HashMap<String,String> hsmp = JsonUtil.json2HashMap(groupAndAvgIndex);
			String selfFeeIndex = "0"; 															//个人指标
			String goupFeeIndex = "0";															//小组指标
			String avgFeeIndex = "0";															//平均指标
			String tmpselfFeeIndex = obFeeIndexLevelService.getSelfOrderIndex(employeeid);						
			if(StringUtils.isNotBlank(tmpselfFeeIndex)) selfFeeIndex = tmpselfFeeIndex;
			if(StringUtils.isNotBlank(hsmp.get("goupFeeIndex"))) goupFeeIndex = hsmp.get("goupFeeIndex");		
			if(StringUtils.isNotBlank(hsmp.get("avgFeeIndex"))) avgFeeIndex = hsmp.get("avgFeeIndex");										
			
			String groupAndAvgSales = scBizOrderFeeService.getGroupAndAvgSaleFee(deptId);
			CommTable cTable = QueryUtil.toCommTable(groupAndAvgSales);
			String perSales = "0";																//个人销售额
			String groupSales="0";																//小组销售额
			String avgSales="0";																//平均销售额
			
			DecimalFormat df = new DecimalFormat("0.00");
			String tmpperSales = scBizOrderFeeService.getPersonalSaleFee(userId);
			String tmpgroupSales = cTable.getRecord(0).get("SUM_FEE");
			String tmpavgSales = cTable.getRecord(0).get("AVG_FEE");
			if(StringUtils.isNotBlank(tmpperSales) && !"0".equals(tmpperSales))		{
				perSales = df.format(Double.parseDouble(tmpperSales));
			}
			if(StringUtils.isNotBlank(tmpgroupSales) && !"0".equals(tmpgroupSales))	{
				groupSales = df.format(Double.parseDouble(tmpgroupSales));
			}
			if(StringUtils.isNotBlank(tmpavgSales) && !"0".equals(tmpavgSales))	{
				avgSales = df.format(Double.parseDouble(tmpavgSales));
			}
			
			String perFinishRate = "";														//个人完成率
			String groupFinishRate = "";													//小组完成率
			String avgFinishRate = "";														//平均完成率
			if(!"0".equals(perSales) && !"0".equals(selfFeeIndex)) {
				perFinishRate = df.format(((Double.parseDouble(perSales)/Double.parseDouble(selfFeeIndex))*100));
			} else if("0".equals(perSales) && !"0".equals(selfFeeIndex)) {
				perFinishRate = "";
			} else {
				perFinishRate = "";
			}
			
			if(!"0".equals(groupSales) && !"0".equals(goupFeeIndex)) {
				groupFinishRate = df.format((Double.parseDouble(groupSales)/Double.parseDouble(goupFeeIndex))*100);	
			} else if("0".equals(groupSales) && !"0".equals(goupFeeIndex)) {
				groupFinishRate = "0";
			} else {
				groupFinishRate = "";
			}
			
			if(!"0".equals(avgSales) && !"0".equals(avgFeeIndex)) {
				avgFinishRate = df.format((Double.parseDouble(avgSales)/Double.parseDouble(avgFeeIndex))*100);		
			} else if("0".equals(avgSales) && !"0".equals(avgFeeIndex)) {
				avgFinishRate = "0";
			}else {
				avgFinishRate = "";
			}
			
			hsmp.clear();
			hsmp.put("selfFeeIndex", selfFeeIndex);hsmp.put("goupFeeIndex", goupFeeIndex);hsmp.put("avgFeeIndex", avgFeeIndex);					//指标
			hsmp.put("perSales", perSales);hsmp.put("groupSales", groupSales);hsmp.put("avgSales", avgSales);									//销售额
			hsmp.put("perFinishRate", perFinishRate);hsmp.put("groupFinishRate", groupFinishRate);hsmp.put("avgFinishRate", avgFinishRate);		//完成率
			setJsonString(JsonUtil.hsmp2JSON(hsmp));
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 获取指标、销售额及完成率
	 * 获取方式：通过他方系统同步统计数据到我方数据库方式
	 */
	public String getStatisticsData() {
		try {
			String employeeid = ContextUtil.getCurrentUser().getEmployeeid();
			Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
			//获取个人指标、小组指标和指标平均值：selfFeeIndex、goupFeeIndex和avgFeeIndex
			String groupAndAvgIndex = obFeeIndexLevelService.getGroupAndAvgIndex(deptId);	
			HashMap<String,String> hsmp = JsonUtil.json2HashMap(groupAndAvgIndex);
			String selfFeeIndex = "0"; 															//个人指标
			String goupFeeIndex = "0";															//小组指标
			String avgFeeIndex = "0";															//平均指标
			String tmpselfFeeIndex = obFeeIndexLevelService.getSelfOrderIndex(employeeid);						
			if(StringUtils.isNotBlank(tmpselfFeeIndex)) selfFeeIndex = tmpselfFeeIndex;
			if(StringUtils.isNotBlank(hsmp.get("goupFeeIndex"))) goupFeeIndex = hsmp.get("goupFeeIndex");		
			if(StringUtils.isNotBlank(hsmp.get("avgFeeIndex"))) avgFeeIndex = hsmp.get("avgFeeIndex");										
			
			String perSales = "0";																//个人销售额
			String groupSales="0";																//小组销售额
			String avgSales="0";																//平均销售额
			String sales  = sysEmpPerformanceService.getSummaryBizOrderFee(employeeid);
			HashMap<String,String> salesHsmp = JsonUtil.json2HashMap(sales);
			
			DecimalFormat df = new DecimalFormat("0.00");
			String tmpperSales = salesHsmp.get("selfSales");
			String tmpgroupSales = salesHsmp.get("sumSales");
			String tmpavgSales = salesHsmp.get("avgSales");
			if(StringUtils.isNotBlank(tmpperSales) && !"0".equals(tmpperSales))		{
				perSales = df.format(Double.parseDouble(tmpperSales));
			}
			if(StringUtils.isNotBlank(tmpgroupSales) && !"0".equals(tmpgroupSales))	{
				groupSales = df.format(Double.parseDouble(tmpgroupSales));
			}
			if(StringUtils.isNotBlank(tmpavgSales) && !"0".equals(tmpavgSales))	{
				avgSales = df.format(Double.parseDouble(tmpavgSales));
			}
			
			String perFinishRate = "";														//个人完成率
			String groupFinishRate = "";													//小组完成率
			String avgFinishRate = "";														//平均完成率
			if(!"0".equals(perSales) && !"0".equals(selfFeeIndex)) {
				perFinishRate = df.format(((Double.parseDouble(perSales)/Double.parseDouble(selfFeeIndex))*100));
			} else if("0".equals(perSales) && !"0".equals(selfFeeIndex)) {
				perFinishRate = "";
			} else {
				perFinishRate = "";
			}
			
			if(!"0".equals(groupSales) && !"0".equals(goupFeeIndex)) {
				groupFinishRate = df.format((Double.parseDouble(groupSales)/Double.parseDouble(goupFeeIndex))*100);	
			} else if("0".equals(groupSales) && !"0".equals(goupFeeIndex)) {
				groupFinishRate = "0";
			} else {
				groupFinishRate = "";
			}
			
			if(!"0".equals(avgSales) && !"0".equals(avgFeeIndex)) {
				avgFinishRate = df.format((Double.parseDouble(avgSales)/Double.parseDouble(avgFeeIndex))*100);		
			} else if("0".equals(avgSales) && !"0".equals(avgFeeIndex)) {
				avgFinishRate = "0";
			}else {
				avgFinishRate = "";
			}
			
			hsmp.clear();
			hsmp.put("selfFeeIndex", selfFeeIndex);hsmp.put("goupFeeIndex", goupFeeIndex);hsmp.put("avgFeeIndex", avgFeeIndex);					//指标
			hsmp.put("perSales", perSales);hsmp.put("groupSales", groupSales);hsmp.put("avgSales", avgSales);									//销售额
			hsmp.put("perFinishRate", perFinishRate);hsmp.put("groupFinishRate", groupFinishRate);hsmp.put("avgFinishRate", avgFinishRate);		//完成率
			setJsonString(JsonUtil.hsmp2JSON(hsmp));			
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * “取任务”功能——如果活动分配方式为名单池时，从名单池中取出任务
	 */
	public String getTaskFromPool() {
		try {
			HashMap<String,String> hsmp = new HashMap<String,String>();
			
			//第一步：通过活动ID——>获得名单——>获得批次（从呼叫名单表中只能查找与当前活动有关批次的活动）
			String comId = getRequest().getParameter("comId");
			ObCom com = obComService.get(Long.parseLong(comId));
			
			//第二步：从呼叫名单表中取出一条记录（该处可以优化，实际上只需要取一条记录即可）
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_obCom.comId_L_EQ", comId);
			filter.addFilter("Q_staId_SN_EQ", ObConCalllist.STATUS_VALID.toString());			//状态是有效的
			filter.addFilter("Q_isLocked_SN_EQ", ObConCalllist.IS_LOCKED_FALSE.toString());		//该任务未被占用
			List<ObConCalllist> list = obConCalllistService.getAll(filter);
			//如果名单池中的记录已经取空，直接返回
			if(null==list || list.size()==0) {
				setJsonString("{success:false}");
				return SUCCESS;
			}
			
			ObConCalllist obConCalllist = list.get(0);
			
			if(obConCalllist.getCustomerId()==null) {
				setJsonString("{success:'error'}");
				return SUCCESS;
			}
			
			//第四步：更改呼叫名单锁定状态为锁定
			obConCalllist.setIsLocked(ObConCalllist.IS_LOCKED_TRUE);							//将该任务锁定
			logger.error("呼叫记录："+obConCalllist.getCusId()+",加锁！");
			ObConCalllist conCalllist2 = obConCalllistService.save(obConCalllist);											//保存任务
			ObSaletask obSaletask = null;
			
			//第五步：生成一条营销任务记录（营销执行的任务）
			boolean isLocked = true;
			try{
				ObCallbatch obCallbatch = obCallbatchService.get(obConCalllist.getCallbatchId());
				ObCalllist obCalllist = obCalllistService.get(obCallbatch.getCalllistId());
				AppUser user = ContextUtil.getCurrentUser();
				ObSaletask task = new ObSaletask();
				task.setTypId(ObSaletask.TYPE_ID_POOL);																//任务获取方式
				task.setCusGrpId(user.getDepartment().getDepId());													//执行坐席部门ID
				task.setUseId(user.getUserId());																	//执行坐席内码
				task.setCusId(obConCalllist.getCustomerId());														//客户内码
				task.setCallbatchNam(obCallbatch.getCallbatchNam());												//批次名称
				task.setCalllistNam(obCalllist.getCalllistNam());													//名单名称
				task.setCalllistId(obCallbatch.getCalllistId());													//名单列表内码
				task.setComNam(com.getObComNam());																	//活动主题
				task.setObCom(com);																					//外拨活动
				task.setAsgDat(new Date());																			//分配时间
				task.setBusiStaId(ObSaletask.MARKET_FLOWING);														//营销状态：初始为待追踪
				task.setBusiStagId(ObSaletask.BUSI_STAG_UNDO);														//营销阶段：未开始
				task.setServStaId(ObSaletask.SERV_UNDO);															//服务状态
				task.setTaskStaId(ObSaletask.TASK_STA_UNDO);														//任务状态：待执行
				task.setCallbatchId(obConCalllist.getCallbatchId());												//名单批次ID
				task.setObCallbatch(obCallbatchService.get(obConCalllist.getCallbatchId()));						//名单批次
				task.setDiaCou(Short.valueOf("0"));																	//已外拨次数：默认为0
				obSaletask = obSaletaskService.save(task);
				
				CusPersonal cusPersonal=cusPersonalService.get(task.getCusId());
				cusPersonal.setExt20("0");
				cusPersonalService.merge(cusPersonal);
				
				
			} catch(Exception e1) {
				logger.error(e1.getMessage());
				try{
					obConCalllist.setIsLocked(ObConCalllist.IS_LOCKED_FALSE);							//将该任务解锁
					obConCalllistService.save(obConCalllist);											//保存任务
				} catch(Exception ex1) {
					logger.error("呼叫记录："+conCalllist2.getCusId()+",解锁失败！");
					logger.error("堆栈信息："+ex1.getMessage());
				}
				logger.error("呼叫记录："+conCalllist2.getCusId()+",解锁成功！");
				isLocked = false;
			}
			if(isLocked) {
				logger.error("呼叫记录："+obConCalllist.getCusId()+",加锁成功！");
			}
			
			hsmp.put("cusId", obSaletask.getCusId().toString());								//客户内码
			hsmp.put("cusNo", obConCalllist.getCusCode());										//客户编号（业务编号，用于系统中数据同步）
			hsmp.put("busiStaId", obSaletask.getBusiStaId().toString());
			hsmp.put("taskId", obSaletask.getSaletaskId().toString());
			hsmp.put("diaCou", obSaletask.getDiaCou().toString());
			hsmp.put("lastDiaDat",DateUtil.getCurrentDateTime());
			hsmp.put("success", "true");
			setJsonString(JsonUtil.hsmp2JSON(hsmp));			
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 保存联络小结
	 * @return
	 */
	public String saveSummary() {
		try {
			Map<String,String> hsmp = new HashMap<String,String>();
			String busiStaId = getRequest().getParameter("busiStaId");
			String busiStagId = getRequest().getParameter("busiStagId");
			String conStaId = getRequest().getParameter("conStaIdParam");
			String taskId = getRequest().getParameter("taskId");
			String conhisId = getRequest().getParameter("conhisId");
			String conCusId = getRequest().getParameter("conCusId");
			String conNumber = getRequest().getParameter("conNumber");
			String customerId = getRequest().getParameter("customerId");
			
			hsmp.put("taskId", taskId);											//营销任务ID
			hsmp.put("busiStagId", busiStagId);									//营销阶段
			hsmp.put("busiStaId",  busiStaId);									//营销状态
			hsmp.put("conStaId", conStaId);										//呼叫结果
			hsmp.put("booTim", getRequest().getParameter("booTim"));			//预约时间
			hsmp.put("conCusId", "1");											//联系人
			hsmp.put("conNumber", getRequest().getParameter("conNumber"));		//联系号码
			hsmp.put("taskExecType", getRequest().getParameter("taskExecType"));//失败原因
			hsmp.put("remark", getRequest().getParameter("remark"));			//备注
//			,
			hsmp.put("conhisId",getRequest().getParameter("conhisId"));			//联络历史ID
			
			HashMap<String,String> backHsmp = new HashMap<String,String>();
			
			//第一步：更新“Ob营销任务”
			ObSaletask obSaletask = obSaletaskService.get(Long.parseLong(hsmp.get("taskId")));
			obSaletask.setBusiStagId(Short.parseShort(hsmp.get("busiStagId")));
			obSaletask.setBusiStaId(Short.parseShort(hsmp.get("busiStaId")));
			obSaletask.setConStaId(Long.parseLong(StringUtils.trim(hsmp.get("conStaId"))));
			Date booTime = null;
			if(StringUtils.isNotBlank(hsmp.get("booTim"))) {
				try {
					booTime = DateUtil.parse(hsmp.get("booTim"), "yyyy-MM-dd");
				} catch (ParseException e) {
					logger.error(e.getMessage());
				}
				obSaletask.setBooTim(booTime);
			}
			
			obSaletask.setBooRemark(hsmp.get("remark"));
			obSaletask.setLastDiaDat(new Date());
			ObSaletask task = obSaletaskService.save(obSaletask);
			backHsmp.put("saletaskId", task.getSaletaskId().toString());
			//如果是预约//第二步：生成“Ob营销任务-预约”
			if(ObSaletask.MARKET_PLAN.toString().equals(busiStaId)) {
				CalendarPlan calPlan = new CalendarPlan();
				calPlan.setStartTime(new Date());						//开始时间
				calPlan.setUrgent(CalendarPlan.URGENT_COMMON);			//紧急程度
				calPlan.setContent(hsmp.get("remark"));					//内容
				calPlan.setStatus(CalendarPlan.STA_UNDO);				//状态：1——未处理、2——处理中、2——已完成、默认——已取消
				calPlan.setUserId(Long.parseLong(ContextUtil.getCurrentUser().getEmployeeid()));	//员工号					
				calPlan.setFullname(ContextUtil.getCurrentUser().getFullname());					//员工名
				if(StringUtils.isNotBlank(customerId)) {
					calPlan.setSponsor(Long.parseLong(customerId));									//客户号
				}
				
				calPlan.setLinkMan(conCusId);														//联系人
				calPlan.setNumAddress(conNumber);													//联系号码
				calPlan.setCompleteTime(booTime);													//要求完成时间——预约时间
				calPlan.setTaskBusiType(0L);														//任务事项：预约事项
				calPlan.setTaskCategory(2L);														//任务类别：外呼营销
				calPlan.setTaskType(CalendarPlan.TASK_STYLE_OUT);									//任务类型：呼出
				
				CalendarPlan plan = calendarPlanService.save(calPlan);
				backHsmp.put("saletaskBoId",plan.getPlanId().toString());
			}
			
			//第三步：更新“Ob联络历史”
//			String conhisId = getRequest().getParameter("conhisId");
			if(StringUtils.isNotBlank(conhisId)) {
				Map<String,String> param = new HashMap<String,String>();
				param.put("conhisId", conhisId);
				param.put("conResId", ConHis.CON_RES_SUCCESS.toString());
				param.put("dealResult", null);
				param.put("busiType_form", null);
				param.put("callContent", getRequest().getParameter("remark"));
				param.put("statusId", busiStaId);
				String conHisJson = conHisService.updateConHis(param);
			}			
		} catch(Exception ex) {
			logger.equals(ex.getMessage());
		}

//		HashMap<String,String> dd = new HashMap<String,String>();
//		dd.put("boId", "12345678");
//		setJsonString(JsonUtil.hsmp2JSON(dd));
//		在座席外呼过程中可以点击联络小结，记录联络小结内容
//		在座席或客户挂机后，自动弹出联络小结信息，提醒座席记录联络小结。联络小结必填
		return SUCCESS;
	}
	
	/**
	 * 获得联络小结信息
	 * @return
	 */
	public String getSummary() {
		try {
			String saletaskId = getRequest().getParameter("saletaskId");
			String saletaskBoId = getRequest().getParameter("saletaskBoId");
			String conhisId = getRequest().getParameter("conhisId");
			
			HashMap<String,String> hsmp = new HashMap<String,String>();
			
			ObSaletask task = obSaletaskService.get(Long.parseLong(saletaskId));
			hsmp.put("busiStagId", String.valueOf(task.getBusiStagId()));
			hsmp.put("busiStaId", String.valueOf(task.getBusiStaId()));
			hsmp.put("conStaId", String.valueOf(task.getConStaId()));
			hsmp.put("taskExecType", task.getTaskExecType());
			hsmp.put("remark", task.getBooRemark());
			if(StringUtils.isNotBlank(saletaskBoId)) {
				ObSaletaskBo taskBo = obSaletaskBoService.get(Long.parseLong(saletaskBoId));
				hsmp.put("booTim", taskBo.getBooTim().toString());
				hsmp.put("conCusId", String.valueOf(taskBo.getConCusId()));
				hsmp.put("conNumber", taskBo.getConNumber());
				
			}
			
//			ConHis conHis = conHisService.get(Long.parseLong(conhisId));
			
//			System.out.println(saletaskId+";"+saletaskBoId+";"+conhisId);
			setJsonString(JsonUtil.hsmp2JSON(hsmp));			
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////
	///////////////// 						外呼拨打功能										//
	//////////////////////////////////////////////////////////////////////////////////////////
//	@Resource
//	private ObComScrService obComScrService;
//	
//	/**
//	 * 查询根据活动ID查询话术
//	 */
//	public String getScrTemplate() {
////		String comId = getRequest().getParameter("comId");
////		CtScrTemplate ctScr = obComScrService.getScrByComId(comId);
////		JSONSerializer serializer = JsonUtil.getJSONSerializer();
////		String result = serializer.serialize(ctScr);
////		setJsonString(result);
////		System.out.println("=======>"+result);
//		return SUCCESS;
//	}
	
	/**
	 * 获取：下一个客户
	 */
	public String nextCus() {
		try {
			String currCusId = getRequest().getParameter("customerId");
			String busiStaId = getRequest().getParameter("busiStaId");
			String next = getRequest().getParameter("nextCus");
			String comId = getRequest().getParameter("comId");
			
			Long userId = ContextUtil.getCurrentUserId();
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_useId_L_EQ", userId.toString());
			filter.addFilter("Q_busiStaId_SN_EQ", busiStaId);
			filter.addFilter("Q_obCom.comId_L_EQ", comId);
			
			List<ObSaletask> list = obSaletaskService.getAll(filter);
			HashMap<String,String> hsmp = new HashMap<String,String>();
			
			int cusIndex = Integer.parseInt(next);
			if(null!=list && list.size()>0 && cusIndex<list.size()) {
				ObSaletask task = list.get(cusIndex);
				if(task.getCusId().toString().equals(currCusId)) {
					task = list.get(cusIndex++);
				}
				hsmp.put("success", "true");
				hsmp.put("cusId", String.valueOf(task.getCusId()));
				hsmp.put("comId", String.valueOf(task.getComId()));
				hsmp.put("busiStaId", String.valueOf(task.getBusiStaId()));
				hsmp.put("taskId", String.valueOf(task.getSaletaskId()));
				setJsonString(JsonUtil.hsmp2JSON(hsmp));
			} else {
				hsmp.put("success", "false");
				hsmp.put("busiStaId", busiStaId);
				setJsonString(JsonUtil.hsmp2JSON(hsmp));
			}			
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	/**
	 * 首页营销任务——营销活动列表
	 * @return
	 */
	public String homeDisplayTask() {
		String path = "success";
		try {
			String start = getRequest().getParameter("start");						
			String limit = getRequest().getParameter("limit");						
			Map<String,String> queryParam = new HashMap<String,String>();
			queryParam.put("start", start);
			queryParam.put("limit", limit);
			CommTable cTable = obComService.homeDisplayTask(queryParam);
			
			
			if(cTable != null){
				getRequest().setAttribute("cTable", cTable);
				path = "homeTask";
			}
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return path;
	}
	
	/**
	 * 更新营销任务的拨打次数与最后拨打时间
	 */
	public String updateSaleTask() {
		try {
			String diaCou = getRequest().getParameter("diaCou");
//			String maxDiaNum = getRequest().getParameter("maxDiaNum"); 
			String taskId = getRequest().getParameter("taskId");
			
			ObSaletask obSaletask = obSaletaskService.get(Long.parseLong(taskId));
			HashMap<String,String> hsmp = new HashMap<String,String>();
			if(StringUtils.isNotBlank(diaCou)) {
				//首次拨打时间和最后拨打时间的更新
				if("0".equals(diaCou)) {
					obSaletask.setFirstDiaDat(new Date());
				}
				obSaletask.setLastDiaDat(new Date());
				
				//拨打次数加1
				int tmpDiaCou = Integer.parseInt(diaCou);
				tmpDiaCou++;
				obSaletask.setDiaCou(Short.valueOf(String.valueOf(tmpDiaCou)));
				ObSaletask task = obSaletaskService.save(obSaletask);
				hsmp.put("diaCou", task.getDiaCou().toString());
				hsmp.put("lastDiaDat", DateUtil.formatDate(task.getLastDiaDat(), "yyyy-MM-dd mm:ss"));
				
				CusPersonal cusPersonal=cusPersonalService.get(task.getCusId());
				cusPersonal.setExt20(String.valueOf(Integer.valueOf(cusPersonal.getExt20())+tmpDiaCou));
				cusPersonalService.merge(cusPersonal);
			}
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 创建外呼任务
	 */
	public String createOutbPlan() {
		try {
			String saletaskIdS = getRequest().getParameter("saletaskId");
			String customerId = getRequest().getParameter("customerId");
			String numAddress = getRequest().getParameter("numAddress");
			String cusName = getRequest().getParameter("cusName");
			String execType = getRequest().getParameter("execType");
			String busiTypeId = getRequest().getParameter("busiTypeId");
			Long saletaskId = Long.parseLong(saletaskIdS);
			
			//第一步：创建任务
			CalendarPlan plan = new CalendarPlan();
			plan.setStartTime(new Date());						//开始时间
			plan.setEndTime(null);								//结束时间
			plan.setUrgent(CalendarPlan.URGENT_COMMON);
			plan.setContent(null);
			plan.setStatus(CalendarPlan.STATUS_FINISHED);		//默认状态——已完成
			plan.setFullname(ContextUtil.getCurrentUser().getFullname());//用户全名
			plan.setUserId(ContextUtil.getCurrentUserId());		//用户内码
			plan.setAssignerId(ContextUtil.getCurrentUserId().toString());		//分配人内码
			plan.setAssignerName(ContextUtil.getCurrentUser().getFullname());	//分配人名称
			plan.setTaskTitle("会员营销外呼");
			
			plan.setTaskType(CalendarPlan.TASK_STYLE_OUT);			//任务类型：呼出
			plan.setTaskCategory(CalendarPlan.TASK_CATEGORY_OUTB);	//任务类别：外呼营销
			plan.setSource(CalendarPlan.SOURCE_STYLE_OUT);			//任务来源：2——外呼营销
			plan.setSourceId(saletaskId);							//来源id：对应营销任务
			
			if(StringUtils.isNotBlank(busiTypeId)) {
				plan.setTaskCategory(Long.parseLong(busiTypeId));	//任务类别（来源于活动类型）
				plan.setTaskBusiType(Long.parseLong(busiTypeId));   //任务事项
			}
			plan.setNumAddress(numAddress);							//地址或号码
			plan.setCusName(cusName);								//客户姓名
			if(StringUtils.isNotBlank(customerId)) {
				plan.setSponsor(Long.parseLong(customerId));		//客户号
			}
			
			if(StringUtils.isNotBlank(execType)) {
				plan.setExecType(Long.parseLong(execType));			//执行方式
			}
			CalendarPlan plan2 = calendarPlanService.save(plan);
			String planId = plan2.getPlanId().toString();
			
			//第二步：创建分配给自己的处理任务
			CalendarPlanHandle planHandle = new CalendarPlanHandle();
			planHandle.setPlanId(plan2.getPlanId());
			planHandle.setAssignerId(ContextUtil.getCurrentUser().getUserId());
			planHandle.setAssignerName(ContextUtil.getCurrentUser().getFullname());
			planHandle.setAssignTime(new Date());
			planHandle.setExecutor(ContextUtil.getCurrentUserId());
			calendarPlanHandleService.save(planHandle);
			
			//第三步：创建联络历史
			String msg = createOutHis(numAddress,customerId,planId,saletaskIdS,busiTypeId);
			
			setJsonString(msg);			
		} catch(Exception e) {
			logger.equals(e.getMessage());
		}
		return SUCCESS;
	}
	
	private String createOutHis(String phoneNo,String customerId,String planId,String sourceId,String busiTypeId) {
		StringBuilder sb = new StringBuilder();
		ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
		Long ownerId = ContextUtil.getCurrentUserId();
		sb.append("{'statusId':"+ConHis.STA_FINISH)//状态
		.append(",'dirId': "+ConHis.DIR_OUT)//方向
		.append(",'class':'com.ulane.customer.model.customer.ConHis'")
		.append(",'contactTypeId':1")//联系方式：1——电话
		.append(",'planId':"+planId)//任务内码（CalendarPlan）
		.append(",'ownerId':"+ownerId)
		.append(",'mainContactNum':" + phoneNo)
		.append(",'srcTypeId':"+ConHis.SRC_TYPE_CUS_MARKET)
		.append(",'serviceId':"+sourceId);
		sb.append(",'srcTypeId':"+ConHis.SRC_TYPE_PHONE+"")
		.append(",'busTypId':"+busiTypeId);
		if (customerId != null && !customerId.equals("")){
			sb.append(",'customer':{'customerId':" + new Long(customerId) + "}");
		}
		sb.append("}");
		return chssi.createConHis(sb.toString());
	}
	
}