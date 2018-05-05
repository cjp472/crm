package com.htsoft.oa.action.task;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.time.DateUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.StringUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.model.task.CalendarPlan;
import com.htsoft.oa.model.task.CalendarPlanHandle;
import com.htsoft.oa.model.task.PlanInfo;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.DictionaryService;
import com.htsoft.oa.service.task.CalendarPlanHandleService;
import com.htsoft.oa.service.task.CalendarPlanService;
import com.ibm.icu.text.SimpleDateFormat;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CalendarPlanAction extends BaseAction{
	@Resource
	private CalendarPlanService calendarPlanService;
	private CalendarPlan calendarPlan;
	@Resource
	private AppUserService appUserService;
	@Resource
	private CalendarPlanHandleService calendarPlanHandleService;
	@Resource
	private DictionaryService dicService;
	
	private List<CalendarPlan> list;
	private Long planId;

	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public CalendarPlan getCalendarPlan() {
		return calendarPlan;
	}

	public void setCalendarPlan(CalendarPlan calendarPlan) {
		this.calendarPlan = calendarPlan;
	}
	
	public List<CalendarPlan> getList() {
		return list;
	}

	public void setList(List<CalendarPlan> list) {
		this.list = list;
	}
	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		 
		//是否查看自己的任务列表,若Q_assignerId_L_EQ不为空，则代表是查看自己分配的任务
		if(getRequest().getParameter("Q_userId_L_EQ")!=null){
			filter.addFilter("Q_userId_L_EQ", String.valueOf(ContextUtil.getCurrentUserId()));
		}
		
		if(getRequest().getParameter("Q_assignerId_S_EQ")!=null){
			
		}
		
		List<CalendarPlan> list= calendarPlanService.getAll(filter);
		
//		Type type=new TypeToken<List<CalendarPlan>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		
//		List<CalendarPlan> plans = new ArrayList<CalendarPlan>();
		
//		for (int i=0; i<list.size(); i++){
//			CalendarPlan cdPlan = list.get(i);
//			Short tskType = cdPlan.getTaskType();
//			Long taskTypeL = 0L;
//			if (tskType != null){
//				taskTypeL = new Long(tskType.shortValue());
//			}
//			
//			Long taskCatL = cdPlan.getTaskCategory();
//			
//			Long taskBuiL = cdPlan.getTaskBusiType();
//			
//			if (taskTypeL != null){
//				Dictionary dic1 = dicService.get(taskTypeL);
//				if (dic1 != null){
//					String indexValue = dic1.getItemIndex();
//					if (indexValue != null && !indexValue.equals("")){
//						cdPlan.setDicTaskType(Long.parseLong(dic1.getItemIndex()));
//					}
//				}
//				
//			}
//			
//			if (taskCatL != null) {
//				Dictionary dic2 = dicService.get(taskCatL);
//				if (dic2 != null){
//					String indexValue = dic2.getItemIndex();
//					
//					if (indexValue != null && !indexValue.equals("")){
//						cdPlan.setDicTaskCategory(Long.parseLong(dic2.getItemIndex()));
//					}
//				}
//				
//			}
//			
//			if (taskBuiL != null){
//				Dictionary dic3 = dicService.get(taskBuiL);
//				if (dic3 != null){
//					String indexValue = dic3.getItemIndex();
//					
//					if (indexValue != null && !indexValue.equals("")){
//						cdPlan.setDicBusiType(Long.parseLong(dic3.getItemIndex()));
//					}
//				}
//				
//			}
//			
//			plans.add(cdPlan);
//		}
		JSONSerializer jsonSer = new JSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), new String[]{"startTime","endTime","completeTime"});
		buff.append(jsonSer.serialize(list));
//		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
//		buff.append(gson.toJson(plans, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
    /**
     * 过期任务列表
     */
    @SuppressWarnings("deprecation")
	public String listExpired(){
        
        QueryFilter filter=new QueryFilter(getRequest());
         
        //是否查看自己的任务列表,若Q_assignerId_L_EQ不为空，则代表是查看自己分配的任务
        if(getRequest().getParameter("Q_assignerId_L_EQ")==null){
            
        }
        String dangQianShiJian = new Date().toLocaleString();
//      filter.addFilter("Q_endTime_D_LE", dangQianShiJian);
        filter.addFilter("Q_userId_L_EQ", ContextUtil.getCurrentUserId().toString());
        
        List<CalendarPlan> list= calendarPlanService.getAll(filter);
        for(CalendarPlan calendar : list){
       	 if(calendar.getCompleteTime() != null){				//换算剩余时长  
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String date1 = format1.format(new Date());
				String date2 = format.format(calendar.getCompleteTime());
				if (calendar.getEndTime() != null && !calendar.getEndTime().equals("")){
					String date3 = format.format(calendar.getEndTime());
					String passDate = "";
					if(calendar.getStatus()==2){
						//如果是已完成的任务，则剩余时间=结束时间-要求完成时间（赋值于content）
						passDate = DateUtil.getFSFromTwoDate(date3, date2, "yyyy-MM-dd HH:mm:ss");
					}else{
						//如果是未完成的任务，则剩余时间=当前时间-要求完成时间
						 passDate = DateUtil.getFSFromTwoDate(date1, date2, "yyyy-MM-dd HH:mm:ss");
					}
					calendar.setContent(passDate);
				}
       	 }
       }
        Type type=new TypeToken<List<CalendarPlan>>(){}.getType();
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        
        Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        buff.append(gson.toJson(list, type));
        buff.append("}");
        
        jsonString=buff.toString();
        
        return SUCCESS;
    }
    /**
     * 待办任务列表(这个暂时没有用，用的是下面的listPlanHandle)
     */
    @SuppressWarnings("deprecation")
	public String listToDo(){
        
        QueryFilter filter=new QueryFilter(getRequest());
         
        //是否查看自己的任务列表,若Q_assignerId_L_EQ不为空，则代表是查看自己分配的任务
        if(getRequest().getParameter("Q_assignerId_L_EQ")==null){
            filter.addFilter("Q_userId_L_EQ", ContextUtil.getCurrentUserId().toString());
        }
        String dangQianShiJian = new Date().toLocaleString();
        filter.addFilter("Q_startTime_D_GT", dangQianShiJian);
        List<CalendarPlan> list= calendarPlanService.getAll(filter);
        for(CalendarPlan calendar : list){
        	 //换算剩余时长
        	 if(calendar.getCompleteTime() != null){	
        		//剩余时间=当前时间-要求完成时间  （赋值于content）
 				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
 				SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
 				String date1 = format1.format(new Date());
				String date2 = format.format(calendar.getCompleteTime());
				String passDate = DateUtil.getFSFromTwoDate(date1, date2, "yyyy-MM-dd HH:mm:ss");
				calendar.setContent(passDate);
        	 }
        }
        Type type=new TypeToken<List<CalendarPlan>>(){}.getType();
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        
        Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        buff.append(gson.toJson(list, type));
        buff.append("}");
        
        jsonString=buff.toString();
        
        return SUCCESS;
    }
	
	/**
	 * 首页显示列表 
	 */
	 public String display(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		 
		//是否查看自己的任务列表,若Q_assignerId_L_EQ不为空，则代表是查看自己分配的任务
		filter.addFilter("Q_userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		filter.addSorted("planId","desc");
		List<CalendarPlan> list= calendarPlanService.getAll(filter);
		getRequest().setAttribute("calendarList", list);
		return "display";
	}
	
	/**
	 * 今日常务
	 * @return
	 */
	public String today(){
		PagingBean pb= new PagingBean(start, limit);
		List<CalendarPlan> list=calendarPlanService.getTodayPlans(ContextUtil.getCurrentUserId(),pb);
		List<PlanInfo>planList=new ArrayList<PlanInfo>();
		
		for(CalendarPlan plan:list){
			planList.add(new PlanInfo(plan));
		}
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		Type type=new TypeToken<List<PlanInfo>>(){}.getType();
		buff.append(gson.toJson(planList, type));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				calendarPlanService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		CalendarPlan calendarPlan=calendarPlanService.get(planId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(calendarPlan));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		if(calendarPlan.getPlanId()==null){
			calendarPlan.setStatus(CalendarPlan.STATUS_UNFINISHED);
			
			AppUser appUser=ContextUtil.getCurrentUser();
			calendarPlan.setUserId(appUser.getUserId());
			calendarPlan.setFullname(appUser.getFullname());
			
			calendarPlanService.save(calendarPlan);
			
			CalendarPlanHandle planHandle = new CalendarPlanHandle();
			
			String assignerIds = calendarPlan.getAssignerId();
			if (assignerIds != null && !assignerIds.equals("")){
				String[] assignerid = assignerIds.split(",");
				if (assignerid.length > 0){
					for (int i=0; i<assignerid.length; i++){
						AppUser user = appUserService.get(new Long(assignerid[i]));
						planHandle.setPlanId(calendarPlan.getPlanId());
						planHandle.setAssignerId(user.getUserId());
						planHandle.setAssignerName(user.getFullname());
						planHandle.setAssignTime(new Date());
						planHandle.setExecutor(appUser.getUserId());
						calendarPlanHandleService.save(planHandle);
					}
				}
			}else{
				planHandle.setPlanId(calendarPlan.getPlanId());
				planHandle.setAssignerId(ContextUtil.getCurrentUser().getUserId());
				planHandle.setAssignerName(ContextUtil.getCurrentUser().getFullname());
				planHandle.setAssignTime(new Date());
				planHandle.setExecutor(appUser.getUserId());
				calendarPlanHandleService.save(planHandle);
			}
			
		}else{
			
			CalendarPlan cp=calendarPlanService.get(calendarPlan.getPlanId());
			try{
				BeanUtil.copyNotNullProperties(cp, calendarPlan);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
			calendarPlanService.save(cp);
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 返回我的任务
	 * @return
	 */
	public String my(){
		
		HttpServletRequest request=getRequest();
		String datafn=request.getParameter("action");
		 
		Date startDate=null;
		Date endDate=null;
		
		if("month".equals(datafn)){
		
			String monthday=request.getParameter("monthday");
			try{
				Date reqDate=DateUtils.parseDate(monthday, new String[]{"MM/dd/yyyy"});
				Calendar cal=Calendar.getInstance();
				cal.setTime(reqDate);
				
				cal.set(Calendar.DAY_OF_MONTH, 1);
				//开始日期为本月1号 00时00分00秒
				startDate=DateUtil.setStartDay(cal).getTime();
				
				cal.add(Calendar.MONTH, 1);
				cal.add(Calendar.DAY_OF_MONTH, -1);
				
				//结束日期为本月最后一天的23时59分59秒
				
				endDate=DateUtil.setEndDay(cal).getTime();
				
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}else if("day".equals(datafn)){
			//$str = $_POST['day']; 12/12/2008
			
			String day=request.getParameter("day");
			logger.info("day:" + day);
			try{
				Date reqDay=DateUtils.parseDate(day, new String[]{"MM/dd/yyyy"});
				
				Calendar cal=Calendar.getInstance();
				cal.setTime(reqDay);
			
				//开始日期为本月1号 00时00分00秒
				startDate=DateUtil.setStartDay(cal).getTime();
				
				cal.add(Calendar.MONTH, 1);
				cal.add(Calendar.DAY_OF_MONTH, -1);
				
				//结束日期为本月最后一天的23时59分59秒
				endDate=DateUtil.setEndDay(cal).getTime();
				
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
			
		}else if("week".equals(datafn)){
			//weeknumber 50
			//String weeknumber=request.getParameter("weeknumber");
			
			String startweek=request.getParameter("startweek");
			String endweek=request.getParameter("endweek");
			try{
				Date reqStartWeek=DateUtils.parseDate(startweek, new String[]{"MM/dd/yyyy"});
				Date reqEndWeek=DateUtils.parseDate(endweek, new String[]{"MM/dd/yyyy"});
				Calendar cal=Calendar.getInstance();
				
				cal.setTime(reqStartWeek);
				
				startDate=DateUtil.setStartDay(cal).getTime();
				cal.setTime(reqEndWeek);

				endDate=DateUtil.setEndDay(cal).getTime();
				
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
			//logger.info("weeknumber:" + weeknumber + " startweek:" + startweek + " endweek:" + endweek);
		}else if("period".equals(datafn)){
			String start=request.getParameter("start");
			String end=request.getParameter("end");
			try
			{
				Date reqStartDate=DateUtils.parseDate(start, new String[]{"MM/dd/yyyy"});
				Date reqEndDate=DateUtils.parseDate(end, new String[]{"MM/dd/yyyy"});
				
				Calendar cal=Calendar.getInstance();
				
				cal.setTime(reqStartDate);
				
				startDate=DateUtil.setStartDay(cal).getTime();
				
				cal.setTime(reqEndDate);
				
				endDate=DateUtil.setEndDay(cal).getTime();
				
			}catch(Exception ex){
				logger.info(ex.getMessage());
			}
		}else{
			jsonString="{success:false,errors:'there's enough arguments to generate data'}";
		}
		
		StringBuffer sb=new StringBuffer();
		
//		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		logger.info("startDate:" + sdf.format(startDate) + " endDate:" + sdf.format(endDate));
		
		List<CalendarPlan> planList=calendarPlanService.getByPeriod(ContextUtil.getCurrentUserId(), startDate, endDate);
		
		sb.append("{success:true,totalCount:").append(planList.size()).append(",records:[");

		//SimpleDateFormat sdf=new SimpleDateFormat("MM/dd/yyyy HH:mm:ss a");
		
		for(CalendarPlan plan:planList){
			
			sb.append("{id:'").append(plan.getPlanId()).append("',");
			
			String subject=plan.getContent();
			if(subject.length()>12){
				subject=subject.substring(1,12)+ "...";
			}
			//获取结束时间,若为空，则加上50年，表示这种没有结束时间，用于防止前台展示日历任务时出现异常
			Date endTime=plan.getEndTime();
			if(endTime==null){
				Calendar curCal=Calendar.getInstance();
				curCal.add(Calendar.YEAR, 50);
				endTime=curCal.getTime();
			}
			
			Date startTime=plan.getStartTime();
			if(start==null){
				Calendar curCal=Calendar.getInstance();
				startTime=curCal.getTime();
			}
			
			sb.append("subject:'").append(StringUtil.convertQuot(subject)).append("',");
			sb.append("description:'").append(StringUtil.convertQuot(plan.getContent())).append("',");
			sb.append("startdate:'").append(DateUtil.formatEnDate(startTime)).append("',");
			sb.append("enddate:'").append(DateUtil.formatEnDate(endTime)).append("',");
			sb.append("color:'").append(plan.getColor()).append("',");
			sb.append("parent:'0',");
			sb.append("priority:'").append(plan.getUrgent()).append("'},");
		}
		
		if(planList.size()>0){
			sb.deleteCharAt(sb.length()-1);
		}
		sb.append("]}");
		
		jsonString=sb.toString();
		return SUCCESS;
	}
	
	/**
	 * 添加任务
	 */
	public String add(){
		String customerId = getRequest().getParameter("customerId");
		String serviceRequestId = getRequest().getParameter("serviceRequestId");
		StringBuffer buff = new StringBuffer();
		CalendarPlan calPlan = new CalendarPlan();
		calPlan.setTaskTitle("呼入任务");
		calPlan.setStatus(CalendarPlan.STATUS_UNFINISHED);
		//添加任务来源内码
		if (serviceRequestId != null && !serviceRequestId.equals("")){
			calPlan.setSourceId(Long.parseLong(serviceRequestId));
		}
		
		AppUser appUser=ContextUtil.getCurrentUser();
		if (customerId != null && !customerId.equals("")){
			calPlan.setSponsor(new Long(customerId));
		}
		calPlan.setSource(1L); // 任务来源       :   1代表服务请求
		calPlan.setTaskType(Short.valueOf("1")); // 任务类别   :  1代表呼入 
		
		calPlan.setUserId(appUser.getUserId());
		calPlan.setFullname(appUser.getFullname());
		calPlan.setStartTime(new Date());
		
		calPlan.setAssignerId(appUser.getUserId().toString());
		calPlan.setAssignerName(appUser.getFullname());
		
		calendarPlan = calendarPlanService.save(calPlan);
		
		CalendarPlanHandle planHandle = new CalendarPlanHandle();
		
		planHandle.setPlanId(calendarPlan.getPlanId());
		planHandle.setAssignerId(ContextUtil.getCurrentUser().getUserId());
		planHandle.setAssignerName(ContextUtil.getCurrentUser().getFullname());
		planHandle.setAssignTime(new Date());
		planHandle.setExecutor(appUser.getUserId());
		calendarPlanHandleService.save(planHandle);
		
		buff.append("{success:true,'planId':" + calendarPlan.getPlanId() + "}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/**
	 * 修改任务
	 */
	public String update(){
		String pId = getRequest().getParameter("planId");
		String customerId = getRequest().getParameter("customerId");
		//服务类型
		String conResId = getRequest().getParameter("conResId");
		//处理结果
		String dealResult = getRequest().getParameter("dealResult");
		//来电事项
		String busiType_form = getRequest().getParameter("busiType_form");
		//联络内容
		String callContent = getRequest().getParameter("callContent");
		
//		System.out.println(pId + "=任务=" + conResId + "---" + busiType_form + "***" + callContent);
		
		CalendarPlan cp = calendarPlanService.get(new Long(pId));
		if (customerId != null && !customerId.equals("")){
			cp.setSponsor(Long.parseLong(customerId));
		}
//		cp.setSource(Long.parseLong(conResId));
		cp.setContent(callContent);
		if (busiType_form != null && !busiType_form.equals("")){
			cp.setTaskBusiType(Long.parseLong(busiType_form));
		}
		if (conResId != null && !conResId.equals("")){
			cp.setTaskCategory(Long.parseLong(conResId));
		}
		if (dealResult != null && !dealResult.equals("")){
			cp.setStatus(Short.parseShort(dealResult));
		}
		
		calendarPlanService.save(cp);
		
		setJsonString("{success:true,'msg':'更新成功!'}");
		return SUCCESS;
	}
	
	/**
	 * 根据客户Id或服务请求id查询任务
	 */
	public String listPlan(){
		String customerId = getRequest().getParameter("customerId");
		String serviceId = getRequest().getParameter("serviceId");
		String taskBusiType = getRequest().getParameter("Q_taskBusiType_L_EQ");
		String fullname = getRequest().getParameter("Q_fullname_S_LK");
		String status = getRequest().getParameter("Q_status_SN_EQ");
		
		String start = getRequest().getParameter("start");
		String limit = getRequest().getParameter("limit");
		
		if(customerId !=null && customerId.equals("-1")){
			customerId = "";
		}
		
		QueryFilter filter=new QueryFilter();
		PagingBean pb = new PagingBean(Integer.parseInt(start),Integer.parseInt(limit));
		filter.setPagingBean(pb);
		if (customerId != null && !customerId.equals("")){
			filter.addFilter("Q_sponsor_L_EQ", customerId);
		}else if(serviceId != null ){
			filter.addFilter("Q_sourceId_L_EQ", serviceId);
		}
		if(taskBusiType!=null && !taskBusiType.equals("")){
			filter.addFilter("Q_taskBusiType_L_EQ", taskBusiType);
		}
		if(fullname!=null && !fullname.equals("")){
			filter.addFilter("Q_fullname_S_LK", fullname);
		}
		if(status!=null && !status.equals("")){
			filter.addFilter("Q_status_SN_EQ", status);
		}
		filter.addSorted("planId", "DESC");
		
		Type type=new TypeToken<List<CalendarPlan>>(){}.getType();
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		
		List<CalendarPlan> list = calendarPlanService.getAllNoRequest(filter);
		JSONSerializer serializer = new JSONSerializer();
		StringBuffer buff = null;
		if(list!=null && list.size()>0){
			buff = new StringBuffer("{success:true,result:");
			serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "starttime","endtime"});
			buff.append(gson.toJson(list, type));
		}else{
			buff = new StringBuffer("{success:true,result:[]");
		}
		
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
	
	public String getHandle(){
		String planId = getRequest().getParameter("planId");
		
		calendarPlan = calendarPlanService.get(Long.parseLong(planId));
		CalendarPlanHandle handle = calendarPlanHandleService.getHandleByPlan(Long.parseLong(planId));
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		
		String plan = gson.toJson(calendarPlan);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(plan.substring(0,plan.length()-1));
		if (handle != null){
			sb.append(",'dealHandleResult':" + handle.getDealHandleResult() + ",'dealHandleReason':'" + handle.getHandleReason() + "','executor':" + handle.getExecutor() + ",'dealUser':" + handle.getDealUser() + ",'planHandleId':" + handle.getHandleId() + "}");
		}else {
			sb.append("}");
		}
		
		sb.append("}");
		
		jsonString=sb.toString();
		return SUCCESS;
	}
	//列出处理任务列表
	public String listHandle(){
		QueryFilter filter=new QueryFilter(getRequest());
		String planId = getRequest().getParameter("planId");
		filter.addFilter("Q_planId_L_EQ", planId);
		List<CalendarPlanHandle> list1 = new ArrayList<CalendarPlanHandle>();
		List<CalendarPlanHandle> list= calendarPlanHandleService.getAll(filter);
		for (int i=0; i<list.size(); i++){
			CalendarPlanHandle handle = list.get(i);
			AppUser appUser = appUserService.get(handle.getExecutor());
			handle.setExecutorName(appUser.getFullname());
			list1.add(handle);
		}
		Type type=new TypeToken<List<CalendarPlanHandle>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		buff.append(gson.toJson(list1, type));
		buff.append("}");
		
		jsonString=buff.toString();
		return SUCCESS;
	}
	//分配给我的任务
	public String listPlanHandle(){
		QueryFilter filter=new QueryFilter(getRequest());
		
		List<CalendarPlanHandle> listHandle = new ArrayList<CalendarPlanHandle>();
		
		List<CalendarPlan> list = new ArrayList<CalendarPlan>();
		//查看分配给我的任务
		String executor = getRequest().getParameter("Q_executor_L_EQ");
		if(executor !=null){
			filter.clearFilter();
			filter.addFilter("Q_executor_L_EQ", executor);
			filter.addSorted("handleId", "DESC");
			listHandle = calendarPlanHandleService.getAll(filter);
			for (int i=0; i<listHandle.size(); i++){
				if (listHandle.get(i).getPlanId() != null)
				{
					CalendarPlan cPlan = calendarPlanService.get(listHandle.get(i).getPlanId());
					if (cPlan.getStatus() == 1){
						list.add(cPlan);
					}
				}
			}
		}
		String Q_taskType_SN_EQ = getRequest().getParameter("Q_taskType_SN_EQ");
		String Q_startTime_D_GE = getRequest().getParameter("Q_startTime_D_GE");
		String Q_fullname_S_LK = getRequest().getParameter("Q_fullname_S_LK");
		String Q_userId_L_EQ = getRequest().getParameter("Q_userId_L_EQ");
		if(Q_taskType_SN_EQ !=null || Q_startTime_D_GE !=null || Q_fullname_S_LK !=null || Q_userId_L_EQ !=null){
			filter.clearFilter();
			filter.addFilter("Q_taskType_SN_EQ", Q_taskType_SN_EQ);
			filter.addFilter("Q_startTime_D_GE", Q_startTime_D_GE);
			filter.addFilter("Q_fullname_S_LK", Q_fullname_S_LK);
			filter.addFilter("Q_userId_L_EQ", Q_userId_L_EQ);
			
			filter.addFilter("Q_status_SN_EQ", "1");
			filter.addSorted("planId", "DESC");
			list = calendarPlanService.getAll(filter);
		}
		
//		List<CalendarPlan> plans = new ArrayList<CalendarPlan>();
//		
//		for (int i=0; i<list.size(); i++){
//			CalendarPlan cdPlan = list.get(i);
//			Short tskType = cdPlan.getTaskType();
//			Long taskTypeL = 0L;
//			if (tskType != null){
//				taskTypeL = new Long(tskType.shortValue());
//			}
//			
//			Long taskCatL = cdPlan.getTaskCategory();
//			
//			Long taskBuiL = cdPlan.getTaskBusiType();
//			
//			
//			plans.add(cdPlan);
//		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer jsonSer = new JSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd  HH:mm:ss"), new String[]{"startTime","endTime","completeTime"});
		buff.append(jsonSer.serialize(list));
//		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
//		buff.append(gson.toJson(list, type));
		
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 根据任务来源查询任务列表
	 * 
	 */
	public String listByServiceId(){
		String serviceId = getRequest().getParameter("serviceId");
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_sourceId_L_EQ", serviceId);
		List<CalendarPlan> list = calendarPlanService.getAll(filter);
		
		Type type=new TypeToken<List<CalendarPlan>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 处理任务保存
	 */
	public String saveHandlePlan()
	{
		String dHandleId = getRequest().getParameter("dHandleId"); //处理任务id
//		String dReason = getRequest().getParameter("dReason");  //原因
		String dResult = getRequest().getParameter("dResult");  //处理结果
		String dEffec = getRequest().getParameter("dEffec");	//完成率
		String dDesc = getRequest().getParameter("dDesc");	//处理说明
		
		CalendarPlanHandle handlePlan = calendarPlanHandleService.get(new Long(dHandleId));
		if (dResult != null && !dResult.equals("")){
			//判断是否是数字
			if (isNumeric(dResult)){
				handlePlan.setDealHandleResult(Long.parseLong(dResult));
			}
		}
		if (dEffec != null && !dEffec.equals("")){
			
		}
		handlePlan.setExecuteTime(new Date());
		handlePlan.setHandleReason(dDesc);
		calendarPlanHandleService.save(handlePlan);
		
		Long planId = handlePlan.getPlanId();
		Long assignerId = handlePlan.getAssignerId();
		Long executor = handlePlan.getExecutor();
		if (planId != null){
			CalendarPlan calendarPlan = calendarPlanService.get(planId);
			if (String.valueOf(assignerId).equals(String.valueOf(executor))){
				if (dResult != null && !dResult.equals("")){
					//判断是否是数字
					if (isNumeric(dResult)){
						calendarPlan.setStatus(Short.valueOf(dResult));
						calendarPlanService.save(calendarPlan);
					}
				}
			}
		}
		
		return SUCCESS;
	}
	
	//首页显示的待办任务，按时间升序，按优先级排序
	public String listTopPlan(){
		QueryFilter filter=new QueryFilter(getRequest());
//		filter.addFilter("Q_status_SN_EQ", "1");
//		filter.addSorted("urgent", "asc");
//		List<CalendarPlan> list = calendarPlanService.getAll(filter);
		
		//查看分配给我的任务
		if(getRequest().getParameter("Q_executor_L_EQ")!=null){
			filter.addFilter("Q_executor_L_EQ", String.valueOf(ContextUtil.getCurrentUserId()));
		}
		filter.addSorted("handleId", "DESC");
		List<CalendarPlanHandle> listHandle = calendarPlanHandleService.getAll(filter);
		
		List<CalendarPlan> list = new ArrayList<CalendarPlan>();
		for (int i=0; i<listHandle.size(); i++){
			if (listHandle.get(i).getPlanId() != null)
			{
				CalendarPlan cPlan = calendarPlanService.get(listHandle.get(i).getPlanId());
				if (cPlan.getStatus() == 1){
					list.add(cPlan);
				}
			}
		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer jsonSer = new JSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[]{"startTime","endTime","completeTime"});
		buff.append(jsonSer.serialize(list));
		
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	//正则表达式方法判断是否只含数字
	public boolean isNumeric(String str)
    {
      Pattern pattern = Pattern.compile("[0-9]*");
      Matcher isNum = pattern.matcher(str);
      if( !isNum.matches() )
      {
            return false;
      }
      return true;
    }
}
