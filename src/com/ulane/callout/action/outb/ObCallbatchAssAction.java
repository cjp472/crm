package com.ulane.callout.action.outb;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.task.CalendarPlan;
import com.htsoft.oa.model.task.CalendarPlanHandle;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.task.CalendarPlanHandleService;
import com.htsoft.oa.service.task.CalendarPlanService;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.model.outb.ObCallbatchAss;
import com.ulane.callout.model.outb.ObCallbatchCus;
import com.ulane.callout.model.outb.ObCalllist;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObComSalerul;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.model.outb.ObSaletask;
import com.ulane.callout.service.outb.ObCallbatchAssService;
import com.ulane.callout.service.outb.ObCallbatchCusService;
import com.ulane.callout.service.outb.ObCallbatchService;
import com.ulane.callout.service.outb.ObCalllistService;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.callout.service.outb.ObConCalllistService;
import com.ulane.callout.service.outb.ObSaletaskService;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.service.customer.CusPersonalService;

import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class ObCallbatchAssAction extends BaseAction {
	@Resource
	private ObCallbatchAssService obCallbatchAssService;
	@Resource
	private ObComService obComService;
	@Resource
	private ObCalllistService obCalllistService;
	@Resource
	private ObCallbatchService obCallbatchService;
	@Resource
	private UlDepartmentService ulDepartmentService;
	@Resource
	private CalendarPlanService calendarPlanService;
	@Resource
	private ObCallbatchCusService obCallbatchCusService; 
	@Resource
	private ObConCalllistService obConCalllistService;
	@Resource
	private CalendarPlanHandleService calendarPlanHandleService;
	
	@Resource 
	private AppUserService appUserService;
	@Resource
	private ObSaletaskService obSaletaskService;
	
	@Resource
	private UlEmployeeService ulEmployeeService;
	
	@Resource
	private CusPersonalService cusPersonalService;
	
	private ObCallbatchAss obCallbatchAss;

	private Long callbatchAssId;
	private String callbatchAssIds;

	public String getCallbatchAssIds() {
		return callbatchAssIds;
	}

	public void setCallbatchAssIds(String callbatchAssIds) {
		this.callbatchAssIds = callbatchAssIds;
	}

	public Long getCallbatchAssId() {
		return callbatchAssId;
	}

	public void setCallbatchAssId(Long callbatchAssId) {
		this.callbatchAssId = callbatchAssId;
	}

	public ObCallbatchAss getObCallbatchAss() {
		return obCallbatchAss;
	}

	public void setObCallbatchAss(ObCallbatchAss obCallbatchAss) {
		this.obCallbatchAss = obCallbatchAss;
	}

	/**
	 * 管理员分配显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_assStepId_L_EQ", ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);	//管理员分配
		List<ObCallbatchAss> list = obCallbatchAssService.getAll(filter);
		Type type = new TypeToken<List<ObCallbatchAss>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	
	/**
	 * 回收名单
	 * @author lzm
	 */
	public String huiShoulist() {
//		int start=Integer.valueOf(getRequest().getParameter("start"));
//		int limit=Integer.valueOf(getRequest().getParameter("limit"));	
//		AppUser user= ContextUtil.getCurrentUser();
//		String rights=user.getFunctionRights();
//		String assStep="";
//		if(rights.indexOf("__ALL")>=0||rights.indexOf(",__ALL")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN;
//		} else if(rights.indexOf("_ObCalllistJFeipei")>=0||rights.indexOf(",_ObCalllistJFeipei")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI;
//		} else if(rights.indexOf("_ObCalllistZFeipei")>=0||rights.indexOf(",_ObCalllistZFeipei")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_ZUZHANG;
//		} else {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN;
//		}
//		QueryFilter filter = new QueryFilter(getRequest());
//		filter.addFilter("Q_fromUseId_L_EQ", ContextUtil.getCurrentUser().getUserId().toString());
//		filter.addFilter("Q_assStepId_L_EQ", assStep);
//		filter.addFilter("Q_retriveDat_D_NOTNULL","0");
//		List<ObCallbatchAss> list= obCallbatchAssService.getAll(filter);
//		list=obCallbatchAssService.injectIdToName(list);
//		generateAssList(list,null);
//		Type type = new TypeToken<List<ObCallbatchAss>>() {
//		}.getType();
		
		String retriveUserNam=getRequest().getParameter("retriveUserNam");
		String retriveDat=getRequest().getParameter("retriveDat");			
		List<ObCallbatchAss> list= obCallbatchAssService.huishouAssList(start,limit,retriveUserNam,retriveDat);
		int listCount=obCallbatchAssService.huishouAssListCount(retriveUserNam,retriveDat);
		//list=obCallbatchAssService.injectIdToName(list);
		list=generateAssList(list,listCount,null);
		
		StringBuffer buff = new StringBuffer();
		buff = new StringBuffer("{success:true,'totalCounts':")
		.append(listCount).append(
		",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
        buff.append(jsonSer
        		.include("callbatchAssId","retriveAppUser.ulEmployee","retriveAppUser.ulEmployee.userNo","retriveAppUser.fullname","retriveDat","obCom.obComNam","obCom.obProject.projNam",
        				"obCalllist.calllistNam","obCallbatch.callbatchNam","retriveCount","canReceiveCount")
		        .exclude("*")
		        .serialize(list));				
		//buff.append(jsonSer.serialize(list));
		
		buff.append("}");

		jsonString = buff.toString();	

		return SUCCESS;
	}
	
	/**
	 * @author lzm
	 * 组长分配显示列表
	 */
	public String assign3List() {
		int retriveIndex=Integer.valueOf(getRequest().getParameter("retriveIndex"));
		Long assStepId=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI);
//		int start=Integer.valueOf(getRequest().getParameter("start"));
//		int limit=Integer.valueOf(getRequest().getParameter("limit"));
//		int listCount=0;
//		List<ObCallbatchAss> list = obCallbatchAssService.getZuZhang(ContextUtil.getCurrentUser(),start,limit);
//		listCount=obCallbatchAssService.getZuZhangCount(ContextUtil.getCurrentUser());
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_assStepId_L_EQ", assStepId.toString());
		filter.addFilter("Q_toAppUser.userId_L_EQ", ContextUtil.getCurrentUser().getUserId().toString());
		
		filter.addFilter("Q_obCalllist.calllistStaId_SN_EQ","0");
		filter.addFilter("Q_obCom.obComStaId_L_EQ","2");
		//filter.addFilter("Q_obCom.obProject.projStaId_SN_EQ","2");
		
		filter.addSorted("staDat", "desc");
		List<ObCallbatchAss> list = obCallbatchAssService.getAll(filter);		
		
		list=generateAssList(list,filter.getPagingBean().getTotalItems(),retriveIndex);	
		
		StringBuffer buff = new StringBuffer();
		buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(
		",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
        buff.append(jsonSer
        		.include("callbatchAssId","assStepId","staDat","assignCount", "holdCount","assignedCount","retriveCount","canReceiveCount")
        		.include("obCom.obComNam","obCom.comId","obCalllist.calllistNam","obCallbatch.callbatchNam","obCallbatch.callbatchId",
        				"fromAppUser.ulEmployee","fromAppUser.ulEmployee.userNo","fromAppUser.fullname","toAppUser.fullname","toAppUser.ulEmployee.userNo")		
		        .exclude("*")
		        .serialize(list));			
		//buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();	
		
		return SUCCESS;
	}
	
	/**@author lzm
	 * 经理分配显示列表
	 */
	public String assign2List() {
//		int start=Integer.valueOf(getRequest().getParameter("start"));
//		int limit=Integer.valueOf(getRequest().getParameter("limit"));
		int retriveIndex=Integer.valueOf(getRequest().getParameter("retriveIndex"));
//		int listCount=0;
//		List<ObCallbatchAss> list = obCallbatchAssService.getJingLi(ContextUtil.getCurrentUser(),start,limit);
//		listCount=obCallbatchAssService.getJingLiCount(ContextUtil.getCurrentUser());
		
		Long assStepId=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_assStepId_L_EQ", assStepId.toString());
		filter.addFilter("Q_toAppUser.userId_L_EQ", ContextUtil.getCurrentUser().getUserId().toString());
		
		filter.addFilter("Q_obCalllist.calllistStaId_SN_EQ","0");
		filter.addFilter("Q_obCom.obComStaId_L_EQ","2");
		//filter.addFilter("Q_obCom.obProject.projStaId_SN_EQ","2");
		
		filter.addSorted("staDat", "desc");
		List<ObCallbatchAss> list = obCallbatchAssService.getAll(filter);
		list=generateAssList(list,filter.getPagingBean().getTotalItems(),retriveIndex);
		
		StringBuffer buff = new StringBuffer();
		buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(
		",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
        buff.append(jsonSer
        		.include("callbatchAssId","assStepId","staDat","assignCount", "holdCount","assignedCount","retriveCount","canReceiveCount")
        		.include("obCom.obComNam","obCom.comId","obCalllist.calllistNam","obCallbatch.callbatchNam","obCallbatch.callbatchId",
        				"fromAppUser.ulEmployee","fromAppUser.ulEmployee.userNo","fromAppUser.fullname","toAppUser.fullname","toAppUser.ulEmployee.userNo")		
		        .exclude("*")
		        .serialize(list));			
		//buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();	
		
		return SUCCESS;
		//vo.obCalllist.calllistStaId=0 and vo.obCom.obComStaId=2 and vo.obCom.obProject.projStaId=2 and
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				obCallbatchAssService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		Long callbatchAssId=Long.valueOf(callbatchAssIds.split(",")[0]);
		ObCallbatchAss obCallbatchAss = obCallbatchAssService
				.get(callbatchAssId);
		obCallbatchAss.setComNam(obCallbatchAss.getObCom().getObComNam());
		obCallbatchAss.setProjNam(obCallbatchAss.getObCom().getObProject().getProjNam());
		obCallbatchAss.setCalllistNam(obCallbatchAss.getObCalllist().getCalllistNam());
		obCallbatchAss.setCallbatchNam(obCallbatchAss.getObCallbatch().getCallbatchNam());
		obCallbatchAss.setFromUseName(obCallbatchAss.getFromAppUser().getFullname());

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		//Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(jsonSer.serialize(obCallbatchAss));
		//sb.append(gson.toJson(obCallbatchAss));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (obCallbatchAss.getCallbatchAssId() == null) {
			obCallbatchAssService.save(obCallbatchAss);
		} else {
			ObCallbatchAss orgObCallbatchAss = obCallbatchAssService
					.get(obCallbatchAss.getCallbatchAssId());
			try {
				BeanUtil.copyNotNullProperties(orgObCallbatchAss,
						obCallbatchAss);
				obCallbatchAssService.save(orgObCallbatchAss);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	//管理员分配
	public String assign1List() {
		int retriveIndex=Integer.valueOf(getRequest().getParameter("retriveIndex"));
		int start=Integer.valueOf(getRequest().getParameter("start"));
		int limit=Integer.valueOf(getRequest().getParameter("limit"));
		
		String callbatchNam = getRequest().getParameter("callbatchNam");
		String fromUseNo = getRequest().getParameter("fromUseNo");
		
		String assDat = getRequest().getParameter("assDat");

//		QueryFilter filter = new QueryFilter(getRequest());
//		filter.addFilter("Q_assStepId_L_EQ", ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_1MANAGER);	//管理员分配
		//List<ObCallbatchAss> list = obCallbatchAssService.getAssign1(ContextUtil.getCurrentUserId(),null);
		List<ObCallbatchAss> list=new ArrayList<ObCallbatchAss>();
		List  dateList=obCallbatchAssService.listDate(ContextUtil.getCurrentUserId(),start,limit,callbatchNam,fromUseNo);
		int dateListCount=obCallbatchAssService.getDateCount(ContextUtil.getCurrentUserId(),callbatchNam,fromUseNo);
		QueryFilter filter =null;
		if(dateList!=null&&dateList.size()>0) {
			int dateCount=dateList.size();
			for(int i=0;i<dateCount;i++) {
				//Map dateMap=(Map)dateList.get(i);
				//filter = new QueryFilter(getRequest());
				String mapDate=dateList.get(i).toString();
				//filter.addFilter("Q_staDat_D_EQ", mapDate.substring(0,mapDate.length()-2));	
				//List<ObCallbatchAss> assListByDate=obCallbatchAssService.getAll(filter);
				List<ObCallbatchAss> assListByDate=obCallbatchAssService.listAssByDate(ContextUtil.getCurrentUserId(),mapDate.substring(0,mapDate.length()-2),callbatchNam,fromUseNo);
				if(assListByDate!=null&&assListByDate.size()>0) {
					ObCallbatchAss assAll=new ObCallbatchAss();
					String callbatchAssIds="";int totalAssignCount=0;int totalHoldCount=0;int totalAssignedCount=0;int totalCanRetrivedCount=0;int totalRetriveCount=0;
					String projNam=null; ObCom obCom=null;ObCalllist obCalllist=null;ObCallbatch obCallbatch=null;Long assStepId=null;Date staDat=null;Long fromUseId=null;
					assListByDate=initAssListByDate(assListByDate,retriveIndex);
					for(ObCallbatchAss ass:assListByDate) {
				        if(callbatchAssIds=="") {
				        	callbatchAssIds=ass.getCallbatchAssId().toString();
				        } else {
				        	callbatchAssIds+=","+ass.getCallbatchAssId().toString();
				        }
				        totalAssignCount+=ass.getAssignCount();
				        totalHoldCount+=ass.getHoldCount();
				        totalAssignedCount+=ass.getAssignedCount();
				        totalCanRetrivedCount+=ass.getCanReceiveCount();
				        totalRetriveCount+=ass.getRetriveCount();
				        obCom=ass.getObCom();projNam=obCom.getObProject().getProjNam();obCalllist=ass.getObCalllist();obCallbatch=ass.getObCallbatch();assStepId=ass.getAssStepId();staDat=ass.getStaDat();fromUseId=ass.getFromAppUser().getUserId();
					}
					assAll.setProjNam(projNam) ;assAll.setCallbatchAssIds(callbatchAssIds);assAll.setObCom(obCom);assAll.setObCalllist(obCalllist);assAll.setObCallbatch(obCallbatch);assAll.setAssStepId(assStepId);
					assAll.setAssignCount(totalAssignCount);assAll.setHoldCount(totalHoldCount);assAll.setAssignedCount(totalAssignedCount);assAll.setStaDat(staDat);
					assAll.setCanReceiveCount(totalCanRetrivedCount);assAll.setRetriveCount(totalRetriveCount);
					//assAll.setFromUseName(appUserService.get(fromUseId).getFullname()+"("+appUserService.get(fromUseId).getUlEmployee().getUserNo()+")");
//					if(appUserService.get(fromUseId).getUlEmployee()!=null) {
//						assAll.setFromUseName(appUserService.get(fromUseId).getFullname()+"("+appUserService.get(fromUseId).getUlEmployee().getUserNo()+")");
//					} else {
						assAll.setFromUseName(appUserService.get(fromUseId).getFullname());
//					}
					if(assDat==null) {
						list.add(assAll);
					} else {
						if(assAll.getStaDat().toString().indexOf(assDat)>=0) {
							list.add(assAll);
						} 
					}
				} 
				
			}
		}
		StringBuffer buff=new StringBuffer();
		if(list!=null) {
			buff = new StringBuffer("{success:true,'totalCounts':")
			.append(dateListCount).append(
			",result:");
		}

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
        buff.append(jsonSer
        		.include("callbatchAssIds","assStepId","staDat","fromUseName","assignCount", "holdCount","assignedCount","retriveCount","canReceiveCount","projNam")
        		.include("obCom.obComNam","obCalllist.calllistNam","obCallbatch.callbatchNam","obCallbatch.callbatchId")		
		        .exclude("*")
		        .serialize(list));			
		//buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();		
		//generateAssList(list,retriveIndex);		
		
		return SUCCESS;
	}
	
	public List<ObCallbatchAss> initAssListByDate(List<ObCallbatchAss> list,Integer retriveIndex) {
		 for(ObCallbatchAss a:list) {
			 if(a.getToUserNo()==null) {
				 a.setToUserNo(appUserService.get(a.getToAppUser().getUserId()).getEmployeeid());
			 }
			 List<ObCallbatchAss> listJL=listChilderAss(a);
			 listJL.add(a);
			String allAssIds="";
			if(listJL!=null&&listJL.size()>0) {
				for(ObCallbatchAss allAss:listJL) {
					if(allAssIds=="") {
					allAssIds=allAss.getCallbatchAssId().toString();
				} else {
					allAssIds+=","+allAss.getCallbatchAssId().toString();
					}
				}
			}
            //已分配数量
			a.setAssignedCount(obCallbatchAssService.getHoldCounts(allAssIds)-a.getHoldCount());
			if(retriveIndex!=null) {
				if(retriveIndex==0) {
					int rerivedByAdminCount=obCallbatchAssService.getRerivedByAdmin(allAssIds);
					a.setRetriveCount(rerivedByAdminCount);
				} else if(retriveIndex==1) {
					int rerivedByJLCount=obCallbatchAssService.getRerivedByJL(allAssIds)+obCallbatchAssService.getRerivedByAdmin(allAssIds);
					a.setRetriveCount(rerivedByJLCount);
				} else if(retriveIndex==2) {
					int rerivedByJLCount=obCallbatchAssService.getRerivedByZZ(allAssIds)+obCallbatchAssService.getRerivedByJL(allAssIds)+obCallbatchAssService.getRerivedByAdmin(allAssIds);
					a.setRetriveCount(rerivedByJLCount);
				}	
			}else {
				int retriveCount=obCallbatchAssService.getRerivedByZZ(allAssIds)+obCallbatchAssService.getRerivedByJL(allAssIds)+obCallbatchAssService.getRerivedByAdmin(allAssIds);
			    a.setRetriveCount(retriveCount);
			}
			
			//获取剩余总量(可回收数量)
			int holdCounts=obCallbatchAssService.getHoldCounts(allAssIds);
			a.setCanReceiveCount(holdCounts);	
		 }
		 return list;
	}	
	
	/**
	 * 加载活动列表项
	 */
	public String getObCom() {
		String projId = getRequest().getParameter("projId");
		String flag = getRequest().getParameter("flag");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_obProject.projId_L_EQ", projId);
		
		List<ObCom> list2=new ArrayList<ObCom>();
		HashMap<String,String> hsmp = new HashMap<String,String>();
		if(ObCom.G_FLAG_ALL.equals(flag)) {
			List<ObCom> list = obComService.getAll(filter);
			for(ObCom com : list) {
				hsmp.put(String.valueOf(com.getComId()), com.getObComNam());
			}
		} else if(ObCom.G_FLAG_ENABLE.equals(flag)) {
//			filter.addFilter("Q_obComStaId_L_EQ", ObCom.STATUS_ENABLED.toString());
//			List<ObCom> list = obComService.getAll(filter);
//			for(ObCom com : list) {
//				hsmp.put(String.valueOf(com.getComId()), com.getObComNam());
//			}
			List<ObCom> list = new ArrayList<ObCom>();
			if(projId!=null&&!projId.equals("")) {
				list =obComService.queryObComs(Long.valueOf(projId));
			}
			if(list!=null&&list.size()>0) {
				for(ObCom obCom:list) {
					if(obCom.getObComStaId().equals(Long.valueOf(ObCom.STATUS_ENABLED.toString()))||
							obCom.getObComStaId().equals(Long.valueOf(ObCom.STATUS_PAUSE.toString()))) {
						    list2.add(obCom);
					}
				}
				for(ObCom com : list2) {
					hsmp.put(String.valueOf(com.getComId()), com.getObComNam());
				}	
			}
			
		} else if(ObCom.G_FLAG_ENABLE_LIMIT.equals(flag)) {
			filter.addFilter("Q_obComStaId_L_EQ", ObCom.STATUS_ENABLED.toString());
			List<ObCom> list = obComService.getAll(filter);
			if(list!=null&&list.size()>0) {
				for(ObCom com:list) {
					Set<ObComSalerul> obComSalerul=com.getObComSalerul();
				    if(obComSalerul!=null&&obComSalerul.size()>0) {
				    	for(ObComSalerul obComSale:obComSalerul) {
				    		if(obComSale.getRulTypeId().equals(ObComSalerul.TYPE_ASSIGN)&&obComSale.getRulValMax().equals(ObComSalerul.RUL_VAL_MAX_ASSIGN_LIST)) {
				    			list2.add(com);
				    		}
				    	}
				    }
				}
			}
			for(ObCom com : list2) {
				hsmp.put(String.valueOf(com.getComId()), com.getObComNam());
			}
		} else {
			filter.addFilter("Q_obComStaId_L_EQ", ObCom.STATUS_ENABLED.toString());
			List<ObCom> list = obComService.getAll(filter);
			for(ObCom com : list) {
				hsmp.put(String.valueOf(com.getComId()), com.getObComNam());
			}
		}

		setJsonString(JsonUtil.hsmp2JSONArray(hsmp)); 
		return SUCCESS;
	}
	
	/**
	 * 加载活动列表项：名单清洗
	 */
	public String getObComByWash() {
		String projId = getRequest().getParameter("projId");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_obProject.projId_L_EQ", projId);	
		filter.addFilter("Q_obComStaId_L_EQ", ObCom.STATUS_ENABLED.toString());
		List<ObCom> list = obComService.getAll(filter);
		
		HashMap<String,String> hsmp = new HashMap<String,String>();
		for(ObCom com : list) {
			hsmp.put(String.valueOf(com.getComId()), com.getObComNam());
		}
		setJsonString(JsonUtil.hsmp2JSONArray(hsmp)); 
		return SUCCESS;
	}
	
	/**
	 * 加载呼叫名单列表 
	 */
	public String getObCalllist() {
		String flag = getRequest().getParameter("flag");
		String comId = getRequest().getParameter("comId");
		ObCom obCom = obComService.get(Long.parseLong(comId));
		Set<ObCalllist> list = obCom.getObCalllists();
		HashMap<String,String> hsmp = new HashMap<String,String>();
		for(ObCalllist calist : list) {
			if(ObCalllist.G_FLAG_ENABLE.equals(flag)) {
				if(calist.getCalllistStaId().equals(ObCalllist.VALID)) {
					hsmp.put(String.valueOf(calist.getCalllistId()), calist.getCalllistNam());
				}
				hsmp.put(String.valueOf(calist.getCalllistId()), calist.getCalllistNam());
			} else if(ObCalllist.G_FLAG_ALL.equals(flag)) {
				hsmp.put(String.valueOf(calist.getCalllistId()), calist.getCalllistNam());
			} else {
				if(calist.getCalllistStaId().equals(ObCalllist.VALID)) {
					hsmp.put(String.valueOf(calist.getCalllistId()), calist.getCalllistNam());
				}
			}
		}
		setJsonString(JsonUtil.hsmp2JSONArray(hsmp));
		return SUCCESS;
	}
	
	/**
	 * 加载批次
	 */
	public String getObCallbatch() {
		String calllistId = getRequest().getParameter("calllistId");
		String flag = getRequest().getParameter("flag");
		QueryFilter filter = new QueryFilter(getRequest());
		if(ObCallbatch.G_FLAG_ENABLE.equals(flag)) {
			filter.addFilter("Q_obCalllist.calllistId_L_EQ", calllistId);
			filter.addFilter("Q_callbatchStaId_SN_EQ", ObCallbatch.FLAG_ENABLED.toString());
		} else if(ObCallbatch.G_FLAG_ALL.equals(flag)) {
			filter.addFilter("Q_obCalllist.calllistId_L_EQ",calllistId);
		} else if(ObCallbatch.G_FLAG_UN_ENABLE.equals(flag)) {
			filter.addFilter("Q_obCalllist.calllistId_L_EQ", calllistId);
			filter.addFilter("Q_callbatchStaId_SN_EQ", ObCallbatch.FLAG_UNENABLED.toString());			
		} else {
			filter.addFilter("Q_obCalllist.calllistId_L_EQ", calllistId);
			filter.addFilter("Q_callbatchStaId_SN_EQ", ObCallbatch.FLAG_ENABLED.toString());
		}
		List<ObCallbatch> list = obCallbatchService.getAll(filter);
		HashMap<String,String> hsmp = new HashMap<String,String>();
		for(ObCallbatch calBatch : list) {
			hsmp.put(String.valueOf(calBatch.getCallbatchId()), calBatch.getCallbatchNam());
		}
		setJsonString(JsonUtil.hsmp2JSONArray(hsmp));
		return SUCCESS;
	}
	
	/**
	 * 可分配人列表
	 * type=0 -- 管理员分配页面查询可分配 type=1 -- 经理分配页面查询可分配 type=2 -- 组长分配页面查询可分配 
	 */
	public String listManagers() {
//		int start=Integer.valueOf(getRequest().getParameter("start"));
//		int limit=Integer.valueOf(getRequest().getParameter("limit"));
		String type=getRequest().getParameter("type");
		String comId=getRequest().getParameter("comId");
		
		ObCom obCom=obComService.get(Long.valueOf(comId));
		Set<UlUsergroup> userGroups=obCom.getUlUsergroups();
		String groupIds="";
		if(userGroups!=null&&userGroups.size()>0) {
			for(UlUsergroup userGroup:userGroups) {
                if(groupIds.length()==0) {
        	       groupIds=userGroup.getPkUsergroupId().toString();
                } else {
        	       groupIds+=","+userGroup.getPkUsergroupId().toString();
                }	
			}
		}
		
		
		
		//String rightType=null;
//		if(type==0) {
//			rightType="_ObCalllistJFeipei";
//		} else if(type==1) {
//			rightType="_ObCalllistZFeipei";
//		} else if(type==2) {
//			rightType="";
//		}
		List<AppUser> list=appUserService.getUserIdsOrCalllistAssign(type,groupIds);
		if(list!=null&&list.size()>0) {
			list = injectName(list);
			StringBuffer buff = new StringBuffer("{success:true")
			.append(
			",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
	        buff.append(jsonSer
	        		.include("userId","fullname","employeeid","depName")
			        .exclude("*")
			        .serialize(list));					
			
			//buff.append(jsonSer.serialize(list));
			buff.append("}");
			
			jsonString = buff.toString();
		}		
		
		
		/**
		long count=appUserService.getCount();
		if(list!=null&&list.size()>0) {
			list = injectName(list);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(count)
			.append(
			",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			buff.append(jsonSer.serialize(list));
			buff.append("}");
			
			jsonString = buff.toString();
		}		
		**/
		
		return SUCCESS;
	}
	
	private List<AppUser> injectName(List<AppUser> list) {
		for(AppUser e:list) {
			e.setFullname(e.getUlEmployee().getFullname());
			e.setEmployeeid(e.getUlEmployee().getUserNo());
			e.setDepName(e.getUlEmployee().getUlDepartment().getDepname());
		}
		return list;
	}
	
	public String listNewAssignCallbatch() {
		Long callbatchId = Long.valueOf(getRequest().getParameter("callbatchId"));
		ObCallbatch obCallbatch=obCallbatchService.get(callbatchId);
		int holdTotalCount = (int)(obCallbatch.getHoldCount());
		int realHoldCount = (int)obCallbatch.getAvlidCount();
    	List<ObCallbatchAss> obCallbatchAsss = obCalllistService.queryObCallbatchAsssByParentNullId(callbatchId);
    	if(obCallbatchAsss!=null && !obCallbatchAsss.isEmpty()){
    		for(int i=0; i<obCallbatchAsss.size(); i++){
    			ObCallbatchAss obCallbatchAss = (ObCallbatchAss)obCallbatchAsss.get(i);
    			realHoldCount -= (obCallbatchAss.getAssignCount()-obCallbatchAss.getRetriveCount());
    		}
    	}
    	
    	//校验实际未分配的数量
    	if(realHoldCount!=holdTotalCount){
    		if(realHoldCount<0) realHoldCount = 0;
    		obCallbatch.setHoldCount(realHoldCount);
    	    obCallbatchService.merge(obCallbatch);
    		
    		holdTotalCount = realHoldCount;
    	}		
    	StringBuffer sb=new StringBuffer();
    	sb.append("{success:true,'holdTotalCount':").append(holdTotalCount).append("}");
    	setJsonString(sb.toString());
		return SUCCESS;
		
	}
	//确定分配--管理员分配
	public String doNewAssignCallbatch() throws Exception{
		
		Date staDat = DateUtil.parse(DateUtil.getCurrentTime());
		Long fromUseId =ContextUtil.getCurrentUserId();
		Long callbatchId = Long.valueOf(getRequest().getParameter("callbatchId"));
		ObCallbatch obCallbatch=obCallbatchService.get(callbatchId);
		ObCalllist obCalllist=obCallbatch.getObCalllist();
		ObCom obCom=obCalllist.getObComs().iterator().next();		
		String assignRuleType=getRequest().getParameter("assignRuleType");//分配方式
   	    int realCountToUser = 0;//此次分配给用户的实际数量
	    int totalAssigned = 0;//此次分配总共分配的数量
	    
	    
	    //处理分配条件
	    String whereSql="";
	    String assignIFGrid=getRequest().getParameter("assignIFGrid");
	    if(assignIFGrid!=null&&!assignIFGrid.equals("")) {
	    	whereSql=obCalllistService.getWhereSql(assignIFGrid);
	    }
	    
    
	    
//		Map<String,String> useridsCounts=new HashMap<String,String>();
		String[] counts=getRequest().getParameterValues("counts");
		List<ObConCalllist> listConCalllist=new ArrayList<ObConCalllist>(); 
		if(assignRuleType.equals(ObCallbatchAss.OB_ASSIGN_TYPE_INCHARGE)) {//按负责人分配
//			 QueryFilter filterConCalllist = new QueryFilter(getRequest());
//			 filterConCalllist.addFilter("Q_obCallbatch.callbatchId_L_EQ", callbatchId.toString());
//			 listConCalllist = obConCalllistService.getAll(filterConCalllist);	
			 listConCalllist = obConCalllistService.listConCalllistByCallbatch(callbatchId,whereSql);
			 /**获取用户
			 List<Long> userIds=new ArrayList<Long>();
			 Map<Long,String> userCus=new HashMap<Long,String>();
			 **/
			 List<String> userNoes=new ArrayList<String>();
			 Map<String,String> userNoCus=new HashMap<String,String>();
			 Set<String> userNos=new HashSet<String>();
			 if(listConCalllist!=null&&listConCalllist.size()>0) {
				 for(ObConCalllist obConCalllist:listConCalllist) {
					     String userNo=obConCalllist.getExt1();
					     if(userNo!=null&&!userNo.equals("")) {
					    	 userNos.add(userNo);
					     }
//					     
//					     if(userNo!=null&&!userNo.equals("")) {
//					    	 QueryFilter filterConCalllist2 = new QueryFilter(getRequest());
//					    	 filterConCalllist2.addFilter("Q_ext1_S_EQ", userNo);
//					    	 List<ObConCalllist> listConCalllistByUserNO = obConCalllistService.getAll(filterConCalllist2);	
//					    	 System.out.println("&&&&&&&&&&&&&listConCalllistByUserNO&&&&&&&&&&&&&&&&"+listConCalllistByUserNO.size());
//					    	 String cusIds="";
//					    	 if(listConCalllistByUserNO!=null&&listConCalllistByUserNO.size()>0) {
//				    			 if(cusIds.equals("")) {
//				    				 cusIds=obConCalllist.getCustomerId().toString();
//				    			 }else {
//				    				 cusIds+=","+obConCalllist.getCustomerId().toString();
//				    			 }
//					    	 }
//		    			     QueryFilter filterUserByUserNo = new QueryFilter(getRequest());
//		    			     filterUserByUserNo.addFilter("Q_employeeid_S_EQ", userNo);
//		    			     List<AppUser> listUserByUserNO = appUserService.getAll(filterUserByUserNo);
//		    				 for(AppUser user:listUserByUserNO) {
//		    					 userCus.put(user.getUserId(), cusIds);		
//		    					 userIds.add(user.getUserId());
//		    				 }
//					     }
					     
					     
					     //userNos.add(obConCalllist.getExt1());
				 }
				 if(userNos!=null&&userNos.size()>0) {
					 for(String userNo:userNos) {
//						 QueryFilter filterConCalllist2 = new QueryFilter(getRequest());
//						 filterConCalllist2.addFilter("Q_ext1_S_EQ", userNo);
//						 List<ObConCalllist> listConCalllistByUserNO = obConCalllistService.getAll(filterConCalllist2);	
						 List<ObConCalllist> listConCalllistByUserNO = obConCalllistService.listConCalllistByUserNo(callbatchId,userNo,whereSql);	
						 
						 String cusIds="";
						 if(listConCalllistByUserNO!=null&&listConCalllistByUserNO.size()>0) {
							 for(ObConCalllist obConCalllist:listConCalllistByUserNO) {
								 if(cusIds.equals("")) {
									 cusIds=obConCalllist.getCustomerId().toString();
								 }else {
									 cusIds+=","+obConCalllist.getCustomerId().toString();
								 }
							 }
						 }
						 /**获取用户
						 QueryFilter filterUserByUserNo = new QueryFilter(getRequest());
						 filterUserByUserNo.addFilter("Q_employeeid_S_EQ", userNo);
						 List<AppUser> listUserByUserNO = appUserService.getAll(filterUserByUserNo);
						 for(AppUser user:listUserByUserNO) {
							 System.out.println("************user.getUserId()**********"+user.getUserId());
							 userCus.put(user.getUserId(), cusIds);		
							 userIds.add(user.getUserId());
						 }
						 **/
						 userNoCus.put(userNo, cusIds);
						 userNoes.add(userNo);
					 }
				 }	 
				 /**获取用户
				 int userIdsCount=userIds.size();
				 **/
				 if(userNos!=null&&userNos.size()>0) {
					 int userNoCount=userNos.size();
					 for(int i=0;i<userNoCount;i++) {
						 //创建分配历史
						 ObCallbatchAss obCallbatchAss = new ObCallbatchAss();
						 obCallbatchAss.setComId(obCallbatch.getObCalllist().getObComs().iterator().next().getComId());
						 obCallbatchAss.setCalllistId(obCallbatch.getObCalllist().getCalllistId());
						 obCallbatchAss.setCallbatchId(callbatchId);
						 
						 obCallbatchAss.setFromAppUser(ContextUtil.getCurrentUser());
//		    			QueryFilter filterUserByUserNo = new QueryFilter(getRequest());
//		    			filterUserByUserNo.addFilter("Q_employeeid_S_EQ", userNo);
//		    			List<AppUser> listUserByUserNO = appUserService.getAll(filterUserByUserNo);	
//		    			if(listUserByUserNO!=null&&listUserByUserNO.size()>0) {
//		    				for(AppUser user:listUserByUserNO) {
//		    					obCallbatchAss.setToUseId(user.getUserId());
//		    				}
//		    			}
						 /**获取用户
					 obCallbatchAss.setToUseId(userIds.get(i));
						  **/
						 obCallbatchAss.setToUserNo(userNoes.get(i));
						 obCallbatchAss.setAssStepId(Long.parseLong(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN));//数据管理员分配
						 obCallbatchAss.setAssTypId(Long.parseLong(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_TYP_CUS));//手动分配
						 obCallbatchAss.setAssignCount(0);
						 obCallbatchAss.setHoldCount(0);
						 obCallbatchAss.setRetriveCount(0);
						 obCallbatchAss.setStaDat(staDat);
						 obCallbatchAss.setRetriveCountAdmin(0);
						 obCallbatchAss.setRetriveCountJL(0);
						 obCallbatchAss.setRetriveCountZZ(0);
						 obCallbatchAss.setParentCallbatchAssId(null);
//		    			obCallbatchAss.setFromUse(super.getCurrentUser());
//		    			obCallbatchAss.setToUse(new User(toUseId, super.getRequestParameter("userName_"+toUseId)));
						 obCallbatchAssService.save(obCallbatchAss);  
						 
						 
						 //批量分配一批名单给单个用户
						 realCountToUser = obCalllistService.assignByInchargeObCallbatchToUser(
								 obCallbatch.getObCalllist().getCalllistId(), callbatchId, obCallbatchAss.getCallbatchAssId(), 
								 ContextUtil.getCurrentUserId(), userNoes.get(i), userNoCus.get(userNoes.get(i)));
						 totalAssigned += realCountToUser;//分配数量汇总  
						 //obCom.setAssCount(obCom.getAssCount()+totalAssigned);
						 
						 //修改分配历史
						 if(realCountToUser>0) {
							 Date endDat = DateUtil.parse(DateUtil.getCurrentTime());
							 obCallbatchAss.setAssignCount(realCountToUser);
							 obCallbatchAss.setHoldCount(realCountToUser);
							 obCallbatchAss.setEndDat(endDat);
							 obCallbatchAssService.merge(obCallbatchAss);
							 
							 //此次分配历史对应的客户
							 List<ObCallbatchCus> obCallbatchAssCusList = obCalllistService.queryObCallbatchCussByCallbatchAssId(obCallbatchAss.getCallbatchAssId());  
							 if(obCallbatchAssCusList!=null&&obCallbatchAssCusList.size()>0) {
								 for(ObCallbatchCus obCallbatchCus:obCallbatchAssCusList) {
									 
									 //创建营销任务
									 ObSaletask obSaletask = new ObSaletask();
									 obSaletask.setTypId(ObSaletask.TYPE_ID_CALLLIST);//
									 obSaletask.setCusGrpId(null); //名单池营销必填
									 /**获取用户
									 obSaletask.setUseId(userIds.get(i));
									 **/
									 obSaletask.setToUserNo(userNoes.get(i));
									 //obSaletask.setTasId(calendarPlan.getPlanId());//
									 obSaletask.setCusId(obCallbatchCus.getCusId());//
									 obSaletask.setCallbatchAssId(obCallbatchAss.getCallbatchAssId());
									 obSaletask.setCallbatchId(callbatchId);
									 obSaletask.setCallbatchNam(obCallbatch.getCallbatchNam());
									 obSaletask.setCalllistId(obCalllist.getCalllistId());//
									 obSaletask.setCalllistNam(obCalllist.getCalllistNam());
									 obSaletask.setComId(obCom.getComId());//
									 obSaletask.setComNam(obCom.getObComNam());
									 obSaletask.setAsgDat(staDat);//
									 obSaletask.setBooTim(null);
									 obSaletask.setDiaCou((short)0);//
									 obSaletask.setFirstDiaDat(null);
									 obSaletask.setLastDiaDat(null);
									 obSaletask.setConStaId(null);
									 obSaletask.setDes(null);
									 //营销状态（结束码）
									 obSaletask.setBusiStaId(ObSaletask.MARKET_NO_EXEC);
									 //名单营销结果
									 obSaletask.setBusiRelId(null);
									 obSaletask.setServTypId(null);
									 obSaletask.setServStaId(null);
									 obSaletaskService.save(obSaletask);
									 
									 CusPersonal cusPersonal=cusPersonalService.get(obSaletask.getCusId());
									 cusPersonal.setExt20("0");
									 cusPersonalService.merge(cusPersonal);										 
									 
//									 //创建任务
//			    					 CalendarPlan calendarPlan=new CalendarPlan();
//			    					 calendarPlan.setUrgent(CalendarPlan.URGENT_IMPORTANT);
//			    					 calendarPlan.setContent("组长分配阶段");
//			    					 calendarPlan.setStatus(CalendarPlan.STATUS_UNFINISHED);
//			    					 calendarPlan.setUserId(fromUseId);
//			    					 calendarPlan.setShowStyle(CalendarPlan.SHOW_STYLE_IN_TASK);
//			    					 calendarPlan.setTaskType(CalendarPlan.TASK_STYLE_OUT);
//			    					 calendarPlan.setSource(2L);
//			    					 calendarPlan.setSourceId(obSaletask.getSaletaskId());
//			    					 calendarPlan.setTaskCategory(2L);
//			    					 calendarPlan.setBusiType(obCom.getBusiTypId());
//			    					 calendarPlan.setStartTime(staDat);
//			    					 calendarPlan.setTaskTitle("外呼营销");
//			    					 calendarPlanService.save(calendarPlan);
//			    					 
//				   	   				 CalendarPlanHandle planHandle = new CalendarPlanHandle();
//									 planHandle.setPlanId(calendarPlan.getPlanId());
//									 planHandle.setAssignerId(fromUseId);
//									 //AppUser toUser=appUserService.get(toUserId);
//									 planHandle.setAssignerName(ContextUtil.getCurrentUser().getFullname());
//									 planHandle.setAssignTime(staDat);
//									 planHandle.setExecutor(toUserId);
//									 calendarPlanHandleService.save(planHandle);										 
									 
								 }
							 }
						 }		    			
						 
					 }
				 }
			 }
			 
	    		 //修改批次的可分配数量
	    		 obCallbatch.setHoldCount(new Integer(obCallbatch.getHoldCount()-totalAssigned));
	    		 obCallbatchService.merge(obCallbatch);		
		    	 
		     } else {
		    	 String[] userids=getRequest().getParameterValues("ids");
		    	 int count=counts.length;//接收人数量
//		for(int i=0;i<count;i++) {
//			useridsCounts.put(userids[i], counts[i]);
//		}
		    	 int assignTotalCount=Integer.valueOf(getRequest().getParameter("assignTotalCount"));//分配数量
		    	 if(true) {
		    		 int perAssignCount = 0;
		    		 for(int i=0;i<count;i++) {
		    			 Long toUserId=Long.valueOf(userids[i]);
		    			 perAssignCount = 0;
		    			 if(assignRuleType.equals(ObCallbatchAss.OB_ASSIGN_TYPE_PERCENT)) {//按比例分配
		    				 String percent=counts[i];
		    				 if(i<count-1) {
		    					 perAssignCount = new BigDecimal(percent).multiply(new BigDecimal(100)).multiply(new BigDecimal(assignTotalCount)).intValueExact()/10000;
		    				 } else {
		    					 perAssignCount = assignTotalCount - totalAssigned;
		    				 }
		    			 } else if(assignRuleType.equals(ObCallbatchAss.OB_ASSIGN_TYPE_SETCOUNT)) {//指定数量分配
		    				 perAssignCount=Integer.valueOf(counts[i]);
		    			 } else {//按负责人分配
		    				 
		    			 }
		    			 if(perAssignCount<=0) continue;
		    			 
		    			 //创建分配历史
		    			 ObCallbatchAss obCallbatchAss = new ObCallbatchAss();
		    			 obCallbatchAss.setComId(obCallbatch.getObCalllist().getObComs().iterator().next().getComId());
		    			 obCallbatchAss.setCalllistId(obCallbatch.getObCalllist().getCalllistId());
		    			 obCallbatchAss.setCallbatchId(callbatchId);
		    			 obCallbatchAss.setFromAppUser(ContextUtil.getCurrentUser());
		    			 obCallbatchAss.setToAppUser(appUserService.get(toUserId));
		    			 obCallbatchAss.setAssStepId(Long.parseLong(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN));//数据管理员分配
		    			 obCallbatchAss.setAssTypId(Long.parseLong(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_TYP_CUS));//名单分配
		    			 obCallbatchAss.setAssignCount(0);
		    			 obCallbatchAss.setHoldCount(0);
		    			 obCallbatchAss.setRetriveCount(0);
		    			 obCallbatchAss.setStaDat(staDat);
		    			 obCallbatchAss.setRetriveCountAdmin(0);
		    			 obCallbatchAss.setRetriveCountJL(0);
		    			 obCallbatchAss.setRetriveCountZZ(0);
		    			 obCallbatchAss.setParentCallbatchAssId(null);
//    			obCallbatchAss.setFromUse(super.getCurrentUser());
//    			obCallbatchAss.setToUse(new User(toUseId, super.getRequestParameter("userName_"+toUseId)));
		    			 obCallbatchAssService.save(obCallbatchAss);  
		    			 
		    			 //批量分配一批名单给单个用户
		    			 realCountToUser = obCalllistService.assignObCallbatchToUser(
		    					 obCallbatch.getObCalllist().getCalllistId(), callbatchId, obCallbatchAss.getCallbatchAssId(), 
		    					 fromUseId, toUserId, perAssignCount,whereSql);
		    			 
		    			 totalAssigned += realCountToUser;//分配数量汇总  
		    			 
		    			 //修改分配历史
		    			 if(realCountToUser>0) {
		    				 Date endDat = DateUtil.parse(DateUtil.getCurrentTime());
		    				 obCallbatchAss.setAssignCount(realCountToUser);
		    				 obCallbatchAss.setHoldCount(realCountToUser);
		    				 obCallbatchAss.setEndDat(endDat);
		    				 obCallbatchAssService.merge(obCallbatchAss);
		    				 
		    				 //创建任务
		    				 CalendarPlan calendarPlan=new CalendarPlan();
		    				 calendarPlan.setUrgent(CalendarPlan.URGENT_IMPORTANT);
		    				 calendarPlan.setContent("管理员分配阶段，共分配 "+realCountToUser+" 个名单");
		    				 calendarPlan.setStatus(CalendarPlan.STATUS_UNFINISHED);
		    				 calendarPlan.setUserId(fromUseId);
		    				 calendarPlan.setShowStyle(CalendarPlan.SHOW_STYLE_IN_TASK);
		    				 calendarPlan.setTaskType(CalendarPlan.TASK_STYLE_DAILY);
		    				 calendarPlan.setSource(3L);
		    				 calendarPlan.setSourceId(obCallbatchAss.getCallbatchAssId());
		    				 calendarPlan.setTaskCategory(32L);
		    				 calendarPlan.setTaskBusiType(900L);
		    				 calendarPlan.setStartTime(staDat);
		    				 calendarPlan.setTaskTitle("外呼营销名单分配");
		    				 calendarPlan.setFullname(ContextUtil.getCurrentUser().getFullname());
		    				 calendarPlan.setAssignerId(toUserId.toString()); //被分配人
		    				 calendarPlan.setAssignerName(appUserService.get(toUserId).getFullname());
		    				 calendarPlanService.save(calendarPlan);	
		    				 
		    				 CalendarPlanHandle planHandle = new CalendarPlanHandle();
							 planHandle.setPlanId(calendarPlan.getPlanId());
							 planHandle.setAssignerId(fromUseId);
							 //AppUser toUser=appUserService.get(toUserId);
							 planHandle.setAssignerName(ContextUtil.getCurrentUser().getFullname());
							 planHandle.setAssignTime(staDat);
							 planHandle.setExecutor(toUserId);
							 calendarPlanHandleService.save(planHandle);		    				 
		    			 }
		    			 
		    		 }
		    		 
		    		 //修改批次的可分配数量
		    		 obCallbatch.setHoldCount(new Integer(obCallbatch.getHoldCount()-totalAssigned));
		    		 obCallbatchService.merge(obCallbatch);			
		    		 
		    	 }
		    	 
		     }
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	//管理员分配明细页面分配明细
	public String listAssignsByAdmin() {
		int retriveIndex=Integer.valueOf(getRequest().getParameter("retriveIndex"));
		String callbatchAssIds=(String) getRequest().getParameter("callbatchAssIds");
		int index=Integer.valueOf(getRequest().getParameter("index"));
		int start=Integer.valueOf(getRequest().getParameter("start"));
		int limit=Integer.valueOf(getRequest().getParameter("limit"));		
		List<ObCallbatchAss> list =null;int listCount=0;
		if(index==0) {//管理员分配页面的查看请求
			 list = obCallbatchAssService.getAssign1(ContextUtil.getCurrentUserId(),callbatchAssIds,start,limit);
			 listCount=obCallbatchAssService.getAssign1Count(ContextUtil.getCurrentUserId(),callbatchAssIds,start,limit);
		} else if(index==1) {//经理分配页面的查看请求
//			 QueryFilter filterAss = new QueryFilter(getRequest());
//			 filterAss.addFilter("Q_parentCallbatchAssId_L_EQ", Long.valueOf(callbatchAssIds).toString());
//			 list = obCallbatchAssService.getAll(filterAss);	
			 
			 list=obCallbatchAssService.listAssByParentId(Long.valueOf(callbatchAssIds),start,limit);
			 listCount=obCallbatchAssService.listAssByParentIdCount(Long.valueOf(callbatchAssIds),start,limit);
		}
		list=generateAssList(list,listCount,retriveIndex);
		
		StringBuffer buff = new StringBuffer();
		buff = new StringBuffer("{success:true,'totalCounts':")
		.append(listCount).append(
		",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
        buff.append(jsonSer
        		.include("callbatchAssId","staDat","assignCount","retriveCount","toUserName", "toUserNo","holdCount","canReceiveCount","obCallbatch.callbatchId")
		        .exclude("*")
		        .serialize(list));				
		//buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();	
		
		return SUCCESS;        
	}
	
	public List<ObCallbatchAss> generateAssList(List<ObCallbatchAss> list,Integer listCount,Integer retriveIndex) {
		Type type = new TypeToken<List<ObCallbatchAss>>() {
		}.getType();
		//int listCount=0;
		StringBuffer buff = new StringBuffer();
		if(list!=null&&list.size()>0) {
			//listCount=list.size();
			 for(ObCallbatchAss a:list) {
				 if(a.getToUserNo()==null) {
					 a.setToUserNo(appUserService.get(a.getFromAppUser().getUserId()).getEmployeeid());
				 } 
				 List<ObCallbatchAss> listJL=listChilderAss(a);
				 listJL.add(a);
				String allAssIds="";
				if(listJL!=null&&listJL.size()>0) {
					for(ObCallbatchAss allAss:listJL) {
						if(allAssIds=="") {
						allAssIds=allAss.getCallbatchAssId().toString();
					} else {
						allAssIds+=","+allAss.getCallbatchAssId().toString();
						}
					}
				}
				
                //已分配数量
				//a.setAssignedCount(a.getAssignCount()-a.getHoldCount()-a.getRetriveCount());
				a.setAssignedCount(obCallbatchAssService.getHoldCounts(allAssIds)-a.getHoldCount());
				
				//获取已回收总量
//				QueryFilter filterBatchCus = new QueryFilter(getRequest());
//				filterBatchCus.addFilter("Q_retriveAssId_S_LIN", allAssIds);
//				List<ObCallbatchCus> callbatchCuss = obCallbatchCusService.getAll(filterBatchCus);		
//				if(callbatchCuss!=null) {
//					a.setRetriveCount(callbatchCuss.size());
//				}
				if(retriveIndex!=null) {
					if(retriveIndex==0) {
						int rerivedByAdminCount=obCallbatchAssService.getRerivedByAdmin(allAssIds);
						a.setRetriveCount(rerivedByAdminCount);
					} else if(retriveIndex==1) {
						int rerivedByJLCount=obCallbatchAssService.getRerivedByJL(allAssIds)+obCallbatchAssService.getRerivedByAdmin(allAssIds);
						a.setRetriveCount(rerivedByJLCount);
					} else if(retriveIndex==2) {
						int rerivedByJLCount=obCallbatchAssService.getRerivedByZZ(allAssIds)+obCallbatchAssService.getRerivedByJL(allAssIds)+obCallbatchAssService.getRerivedByAdmin(allAssIds);
						a.setRetriveCount(rerivedByJLCount);
					}	
				}else {
					int retriveCount=obCallbatchAssService.getRerivedByZZ(allAssIds)+obCallbatchAssService.getRerivedByJL(allAssIds)+obCallbatchAssService.getRerivedByAdmin(allAssIds);
				    a.setRetriveCount(retriveCount);
				}
				
				//获取剩余总量(可回收数量)
				int holdCounts=obCallbatchAssService.getHoldCounts(allAssIds);
				a.setCanReceiveCount(holdCounts);					
//				QueryFilter filterholdCuss = new QueryFilter(getRequest());
//				filterholdCuss.addFilter("Q_obCallbatchAss.callbatchAssId_S_LIN", allAssIds);
//				List<ObCallbatchCus> callHoldCuss = obCallbatchCusService.getAll(filterholdCuss);		
//				if(callHoldCuss!=null) {
//				a.setCanReceiveCount(callHoldCuss.size());
//				}		
//				//可分配數量
//				QueryFilter filterholdCus = new QueryFilter(getRequest());
//				filterholdCus.addFilter("Q_obCallbatchAss.callbatchAssId_L_EQ", a.getCallbatchAssId().toString());
//				List<ObCallbatchCus> callHoldCus = obCallbatchCusService.getAll(filterholdCus);		
//				if(callHoldCuss!=null) {
//					a.setHoldCount(callHoldCus.size());
//				}				
//				
			 }
		}else{
			list = new ArrayList<ObCallbatchAss>();
		}
        return list;
	}
//	//可回收人(任务)
//	public String listUsersRetrive() {
//		String callbatchAssIds=(String) getRequest().getParameter("callbatchAssIds"); 
//		System.out.println("*************callbatchAssIds*********************"+callbatchAssIds);
//		//List<AppUser> 
//		QueryFilter filter = new QueryFilter(getRequest());
//		callbatchAssIds.substring(1, callbatchAssIds.length() - 1).trim();
//		filter.addFilter("Q_callbatchAssId_S_LIN", callbatchAssIds);
//		List<ObCallbatchAss> list = obCallbatchAssService.getAll(filter);
//		System.out.println("################list################################"+list.size());
//		if(list!=null&&list.size()>0) {
//			for(ObCallbatchAss obCallbatchAss:list) {
//				
//			}
//		}
//		
//		Map<Long,Integer> userIdholdCount=new HashMap<Long,Integer> ();
//		String userIds="";
//		if(list!=null&&list.size()>0) {
//              for(ObCallbatchAss ass:list) {
//            	  userIdholdCount.put(ass.getToUseId(), ass.getHoldCount());
//            	  if(userIds=="") {
//            		  userIds=ass.getToUseId().toString();
//            	  } else {
//            		  userIds+=","+ass.getToUseId().toString();
//            	  }
//              }
//		}
//		System.out.println("*************userIds******************"+userIds);
//		QueryFilter filter2 = new QueryFilter(getRequest());
//		filter2.addFilter("Q_userId_S_LIN",userIds);
//		List<AppUser> users=appUserService.getAll(filter2);
//		if(users.size()>0) {
//			for(AppUser user:users) {
//				user.setHoldCount(userIdholdCount.get(user.getUserId()));
//			}
//			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//					.append(filter2.getPagingBean().getTotalItems()).append(
//							",result:");
//			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
//			
//			buff.append(jsonSer.serialize(users));
//			buff.append("}");
//
//			jsonString = buff.toString();
//			System.out.println(jsonString);
//		}
//		return SUCCESS;		
//	}

	//确定回收--管理员回收	
	public String doRetriveAssignedCallbatch() throws Exception{
		int retriveIndex=Integer.valueOf(getRequest().getParameter("retriveIndex"));
		int parentFlag=Integer.valueOf(getRequest().getParameter("parentFlag"));
		String callbatchAssIds=getRequest().getParameter("ids");
		String[] counts=getRequest().getParameterValues("counts");
		//被管理员分配的任务
		QueryFilter filter = new QueryFilter(getRequest());
		//callbatchAssIds.toString().substring(1, callbatchAssIds.toString().length() - 1).trim();
		filter.addFilter("Q_callbatchAssId_S_LIN", callbatchAssIds.toString());
		List<ObCallbatchAss> list = obCallbatchAssService.getAll(filter);	
		ObCallbatch obCallbatch=null;
		String assignRuleType=getRequest().getParameter("assignRuleType");//分配方式
		if(list!=null&&list.size()>0) {
			int assCount=list.size();
			for(int i=0;i<assCount;i++) {
				ObCallbatchAss obCallbatchAss=list.get(i);
				obCallbatch=obCallbatchAss.getObCallbatch();
				List<ObCallbatchAss> listJL=listChilderAss(obCallbatchAss);
				listJL.add(obCallbatchAss);
				String allAssIds="";
				if(listJL!=null&&listJL.size()>0) {
					for(ObCallbatchAss allAss:listJL) {
						if(allAssIds=="") {
							allAssIds=allAss.getCallbatchAssId().toString();
						} else {
							allAssIds+=","+allAss.getCallbatchAssId().toString();
						}
					}
				}
//				QueryFilter filterBatchCus = new QueryFilter(getRequest());
//				filterBatchCus.addFilter("Q_obCallbatchAss.callbatchAssId_S_LIN", allAssIds);
//				List<ObCallbatchCus> callbatchCuss = obCallbatchCusService.getAll(filterBatchCus);
				
			    //处理分配条件
			    String whereSql="";
			    String assignIFGrid=getRequest().getParameter("assignIFGrid");
			    if(assignIFGrid!=null&&!assignIFGrid.equals("")) {
			    	whereSql=obCalllistService.getWhereSql(assignIFGrid);//为1时是回收和抽取操作
			    }
			    
				List<ObCallbatchCus> callbatchCuss = obCallbatchCusService.listCallbatchCusByAssids(allAssIds,whereSql);
				if(callbatchCuss!=null&&callbatchCuss.size()>0) {
					retriveBycallbatchCuss(callbatchAssIds,callbatchCuss,allAssIds,whereSql,assignRuleType,retriveIndex,parentFlag,obCallbatch,counts,i);
				}
			}	
			obCallbatchService.merge(obCallbatch);
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	//根据分配任务获取所有子任务
	public List<ObCallbatchAss> listChilderAss(ObCallbatchAss obCallbatchAss) {
		//被经理分配的任务
//		QueryFilter filterJL = new QueryFilter(getRequest());
//		filterJL.addFilter("Q_parentCallbatchAssId_L_EQ", obCallbatchAss.getCallbatchAssId().toString());
		List<ObCallbatchAss> listJL = obCallbatchAssService.listAssByParentId(obCallbatchAss.getCallbatchAssId(),null,null);
		//被组长分配的任务
		List JLAssIds=new ArrayList();
		if(listJL!=null&&listJL.size()>0) {
			int JLcount=listJL.size();
			for(ObCallbatchAss obCallbatchAssJL:listJL) {
				JLAssIds.add(obCallbatchAssJL.getCallbatchAssId());
			}
		}	
		if(JLAssIds!=null&&JLAssIds.size()>0) {
			String strJLIds=JLAssIds.toString().substring(1, JLAssIds.toString().length() - 1).trim();
//			QueryFilter filterZZ = new QueryFilter(getRequest());
//			filterZZ.addFilter("Q_parentCallbatchAssId_S_LIN", strJLIds);
//			List<ObCallbatchAss> listZZ = obCallbatchAssService.getAll(filterZZ);	
			List<ObCallbatchAss> listZZ = obCallbatchAssService.listAssByParentIds(strJLIds);	
			if(listZZ!=null&&listZZ.size()>0)
			listJL.addAll(listZZ);
		}
		//listJL.add(obCallbatchAss);	
		return listJL;
	}
	
	//根据批次客户进行回收
	public void retriveBycallbatchCuss(String callbatchAssIds,List<ObCallbatchCus> callbatchCuss,String allAssIds,String whereSql,String assignRuleType,int retriveIndex,Integer parentFlag,ObCallbatch obCallbatch,String[] counts,Integer i) throws Exception{
		Long parentCallbatchAssId=null;
		ObCallbatchAss parentAss=null;
		Date retriveDat=DateUtil.parse(DateUtil.getCurrentDate(),"yyyy-MM-dd");
		if(retriveIndex==1||retriveIndex==2) {
			if(parentFlag!=null&&parentFlag==1) {
				parentCallbatchAssId=obCallbatchAssService.get(Long.valueOf(callbatchAssIds)).getParentCallbatchAssId();
				parentAss=obCallbatchAssService.get(parentCallbatchAssId);
			} else {
				parentCallbatchAssId=Long.valueOf(callbatchAssIds);
				parentAss=obCallbatchAssService.get(parentCallbatchAssId);
			}
		}
		
//		Map<Long,Long> cusId2assId=new HashMap<Long,Long>();
//		if(callbatchCuss!=null&&callbatchCuss.size()>0) {
//		        for(ObCallbatchCus obCallbatchCus:callbatchCuss) {
//		        	cusId2assId.put(obCallbatchCus.getCallbatchCusId(), obCallbatchCus.getCallbatchAssId());
//		        }
//		}
		
		int realRetrivedCount = 0;	
		if(assignRuleType!=null&&callbatchCuss!=null&&callbatchCuss.size()>0) {
			if(assignRuleType.equals(ObCallbatchAss.OB_RETIRVE_TYPE_ALL)) {//全部回收
				realRetrivedCount=callbatchCuss.size();
			} else {//指定数量回收
				realRetrivedCount=Integer.valueOf(counts[i]);
				if(callbatchCuss.size()<realRetrivedCount)
					realRetrivedCount=callbatchCuss.size();
			}
		} else {
			realRetrivedCount=callbatchCuss.size();
		}
		if(retriveIndex==0) {//管理员分配模块回收
			obCallbatchAssService.retriveCusByAdmin(allAssIds,whereSql,realRetrivedCount);
		} else if(retriveIndex==1) {//经理分配模块回收
			obCallbatchAssService.retriveCusByJL(allAssIds,whereSql,realRetrivedCount,parentAss);
		} else {
			obCallbatchAssService.retriveCusByZZ(allAssIds,whereSql,realRetrivedCount,parentAss);
		}
		
/*		
		for(int j=0; j<realRetrivedCount; j++){
			ObCallbatchCus obCallbatchCus = callbatchCuss.get(j);
			if(retriveIndex==0) {//管理员分配模块回收
				obCallbatchCus.setAssStaId(Short.valueOf(ObCallbatchCus.OB_CALLBATCH_CUS_STA_UNASSIGN));//未分配
				obCallbatchCus.setAssStepId(null);//步骤为空
				obCallbatchCus.setCallbatchAssId(null);
				obCallbatchCus.setFromUseId(null);
				obCallbatchCus.setToUseId(null);
				obCallbatchCusService.merge(obCallbatchCus);				
				ObCallbatchAss ass=obCallbatchAssService.get(cusId2assId.get(obCallbatchCus.getCallbatchCusId()));
				ass.setRetriveCount(ass.getRetriveCount()+1);
				ass.setHoldCount(ass.getHoldCount()-1);
				ass.setRetriveCountAdmin(ass.getRetriveCountAdmin()+1);
				ass.setRetriveDat(retriveDat);
				ass.setRetriveAppUser(ContextUtil.getCurrentUser());
				obCallbatchAssService.merge(ass);
				//obCallbatchCus.setRetriveAssId(ass.getCallbatchAssId());
			} else if(retriveIndex==1) {//经理分配模块回收
				obCallbatchCus.setAssStaId(Short.valueOf(ObCallbatchCus.OB_CALLBATCH_CUS_STA_ASSIGNED));//已分配
				obCallbatchCus.setAssStepId(Short.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN));//管理员分配
				obCallbatchCus.setObCallbatchAss(parentAss);
				obCallbatchCus.setFromUseId(parentAss.getFromAppUser().getUserId());
				obCallbatchCus.setToUseId(parentAss.getToAppUser().getUserId());
				obCallbatchCusService.merge(obCallbatchCus);				
				ObCallbatchAss ass=obCallbatchAssService.get(cusId2assId.get(obCallbatchCus.getCallbatchCusId()));
				ass.setRetriveCount(ass.getRetriveCount()+1);
				ass.setHoldCount(ass.getHoldCount()-1);
				ass.setRetriveCountJL(ass.getRetriveCountJL()+1);
				ass.setRetriveDat(retriveDat);
				ass.setRetriveAppUser(ContextUtil.getCurrentUser());
				obCallbatchAssService.merge(ass);
				//obCallbatchCus.setRetriveAssId(ass.getCallbatchAssId());
			} else if(retriveIndex==2) {//组长分配模块回收
				obCallbatchCus.setAssStaId(Short.valueOf(ObCallbatchCus.OB_CALLBATCH_CUS_STA_ASSIGNED));//已分配
				obCallbatchCus.setAssStepId(Short.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI));//经理分配
				obCallbatchCus.setObCallbatchAss(parentAss);
				obCallbatchCus.setFromUseId(parentAss.getFromAppUser().getUserId());
				obCallbatchCus.setToUseId(parentAss.getToAppUser().getUserId());
				obCallbatchCusService.merge(obCallbatchCus);				
				ObCallbatchAss ass=obCallbatchAssService.get(cusId2assId.get(obCallbatchCus.getCallbatchCusId()));
				ass.setRetriveCount(ass.getRetriveCount()+1);
				ass.setHoldCount(ass.getHoldCount()-1);
				ass.setRetriveCountZZ(ass.getRetriveCountZZ()+1);
				ass.setRetriveDat(retriveDat);
				ass.setRetriveAppUser(ContextUtil.getCurrentUser());
				obCallbatchAssService.merge(ass);				
			}
//			ObCallbatchAss ass=obCallbatchAssService.get(cusId2assId.get(obCallbatchCus.getCallbatchCusId()));
//			ass.setRetriveCount(ass.getRetriveCount()+1);
//			ass.setHoldCount(ass.getHoldCount()-1);
//			obCallbatchAssService.merge(ass);
//			obCallbatchCus.setRetriveAssId(ass.getCallbatchAssId());
//			obCallbatchCusService.merge(obCallbatchCus);
			
			List<ObSaletask> saletasks=obSaletaskService.getTaskByCusId(obCallbatchCus.getCusId());
			if(saletasks!=null&&saletasks.size()>0) {
				for(ObSaletask saletask:saletasks) {
					saletask.setCusGrpId(null);
					saletask.setUseId(null);
					saletask.setCallbatchAssId(null);
					saletask.setBusiStaId(ObSaletask.TASK_STA_CLOSE);//回收
					saletask.setLastDiaDat(retriveDat);
					obSaletaskService.merge(saletask);
					
				}
			}
		}	
**/		
		if(retriveIndex==0) {
			obCallbatch.setHoldCount(obCallbatch.getHoldCount()+realRetrivedCount);
			obCallbatchService.save(obCallbatch);
		} else if(retriveIndex==1||retriveIndex==2) {
			parentAss.setHoldCount(parentAss.getHoldCount()+realRetrivedCount);
			obCallbatchAssService.save(parentAss);
		}
	}
	
	//管理员分配明细页面名单明细
	public String listCusByAdmin() throws Exception{
		int index=Integer.valueOf(getRequest().getParameter("index"));
		String callbatchAssIds=getRequest().getParameter("callbatchAssIds");
		String dealRes=getRequest().getParameter("dealResId");
		Short dealResId=null;
		if(dealRes!=null&&dealRes.trim()!="") dealResId=Short.valueOf(dealRes);
		String nameCn=getRequest().getParameter("nameCn");
		if(nameCn!=null) nameCn=new String(nameCn.getBytes("iso8859-1"),"utf-8");
		//被管理员分配的任务
//		QueryFilter filter = new QueryFilter(getRequest());
//		//callbatchAssIds.toString().substring(1, callbatchAssIds.toString().length() - 1).trim();
//		filter.addFilter("Q_callbatchAssId_S_LIN", callbatchAssIds.toString());
//		List<ObCallbatchAss> listAss = obCallbatchAssService.getAll(filter);
		List<ObCallbatchAss> listAss = obCallbatchAssService.listAssByIds(callbatchAssIds);
		List<ObCallbatchAss> listAssAll=new ArrayList<ObCallbatchAss>();
		if(listAss!=null&&listAss.size()>0) {
			int assCount=listAss.size();
			for(int i=0;i<assCount;i++) {
				ObCallbatchAss ass=listAss.get(i);
				List<ObCallbatchAss> asss=listChilderAss(ass);
				listAssAll.addAll(asss);
				if(index==0) listAssAll.add(ass);
			}			
		}
		String allAssIds=null;
		if(listAssAll!=null&&listAssAll.size()>0) {
			for(ObCallbatchAss allAss:listAssAll) {
				if(allAssIds=="") {
					allAssIds=allAss.getCallbatchAssId().toString();
				} else {
					allAssIds+=","+allAss.getCallbatchAssId().toString();
				}
			}
		}		
		int start=Integer.valueOf(getRequest().getParameter("start"));
		int limit=Integer.valueOf(getRequest().getParameter("limit"));
		List<ObConCalllist> list=obConCalllistService.findListCusByAdmin(allAssIds,start,limit,nameCn,dealResId);
		long count=obConCalllistService.getCountByAssIds(allAssIds,nameCn,dealResId);
		if(list!=null&&list.size()>0) {
			//initConCalllist(list);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(count)
			.append(
			",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			
	        buff.append(jsonSer
	        		.include("cusCode", "customerId", "age","nameCn", "gender","credTypId", "birthday","credNum","obCallbatch.callbatchNam")
			        .exclude("*")
			        .serialize(list));					
			//buff.append(jsonSer.serialize(list));
			buff.append("}");
			
			jsonString = buff.toString();
		}
		return SUCCESS;		
	}	
	
//	public List<ObConCalllist> initConCalllist(List<ObConCalllist> list) {
//		 for(ObConCalllist obConCalllist:list) {
//			 ObSaletask obSaletask=obSaletaskService.getTaskByCusId(obConCalllist.getCustomerId());
//			 if(obSaletask!=null) {
//				 obConCalllist.setConStaId(obSaletask.getConStaId());
//				 obConCalllist.setBusiStaId(obSaletask.getBusiStaId());
//			 }
//		 }
//		return list;
//			 
//	}
	
	//回收客户
	public String doRetriveCus() throws Exception{
		int retriveIndex=Integer.valueOf(getRequest().getParameter("retriveIndex"));
		String callbatchAssIds=getRequest().getParameter("callbatchAssIds");
		String cusIds=getRequest().getParameter("ids");
		String callbatchId=getRequest().getParameter("callbatchId");
		QueryFilter filterBatchCus = new QueryFilter(getRequest());
		filterBatchCus.addFilter("Q_cusId_S_LIN", cusIds);
		filterBatchCus.addFilter("Q_callbatchId_L_EQ", callbatchId);
		List<ObCallbatchCus> callbatchCuss = obCallbatchCusService.getAll(filterBatchCus);
		Set<ObCallbatchCus> callbatchCuss2 = new HashSet<ObCallbatchCus>();
		String allAssIds="";
		ObCallbatch obCallbatch=null;
		if(callbatchCuss!=null&&callbatchCuss.size()>0) {
			for(ObCallbatchCus callbatchCus:callbatchCuss) {
				callbatchCuss2.add(callbatchCus);
			}
			for(ObCallbatchCus callbatchCus:callbatchCuss2) {
				if(allAssIds=="") {
					allAssIds=callbatchCus.getCallbatchAssId().toString();
				} else {
					allAssIds+=","+callbatchCus.getCallbatchAssId().toString();
				}	
			}
			
			
			obCallbatch=obCallbatchService.get(callbatchCuss.get(0).getCallbatchId());
			retriveBycallbatchCuss(callbatchAssIds,callbatchCuss,allAssIds,null,null,retriveIndex,null,obCallbatch,null,null);
		}
		return SUCCESS;	
		
	}
	
	//确定分配--经理分配
	public String doJLNewAssignCallbatch() throws Exception{
		
		Date staDat = DateUtil.parse(DateUtil.getCurrentTime());
		Long callbatchId = Long.valueOf(getRequest().getParameter("callbatchId"));
		ObCallbatch obCallbatch=obCallbatchService.get(callbatchId);
		ObCalllist obCalllist=obCallbatch.getObCalllist();
		//ObCom obCom=obCalllist.getObComs().iterator().next();			
		Long callbatchAssId = Long.valueOf(getRequest().getParameter("callbatchAssId"));
		//上级分配历史
		ObCallbatchAss parentCallbatchAss=obCallbatchAssService.get(callbatchAssId);
    	//上级分配历史下可分配数量
    	int holdTotalCount = (int)(parentCallbatchAss.getHoldCount());		
    	//指定分配数量
    	int assignTotalCount=Integer.valueOf(getRequest().getParameter("assignTotalCount"));
    	//分配方式
    	String assignRuleType=getRequest().getParameter("assignRuleType");
    	
    	
	    //处理分配条件
	    String whereSql="";
	    String assignIFGrid=getRequest().getParameter("assignIFGrid");
	    if(assignIFGrid!=null&&!assignIFGrid.equals("")) {
	    	whereSql=obCalllistService.getWhereSql(assignIFGrid);
	    }
    	
		String[] counts=getRequest().getParameterValues("counts");
		String[] userids=getRequest().getParameterValues("ids");
		int count=counts.length;//接收人数量
		int realCountToUser = 0;//此次分配给用户的实际数量
		int totalAssigned = 0;//此次分配总共分配的数量
		Long fromUseId =ContextUtil.getCurrentUserId();   	
		if(true) {
			int perAssignCount = 0;
			for(int i=0;i<count;i++) {
				Long toUserId=Long.valueOf(userids[i]);
				perAssignCount = 0;
				if(assignRuleType.equals(ObCallbatchAss.OB_ASSIGN_TYPE_PERCENT)) {//按比例分配
					 String percent=counts[i];
					 if(i<count-1) {
						 perAssignCount = new BigDecimal(percent).multiply(new BigDecimal(100)).multiply(new BigDecimal(assignTotalCount)).intValueExact()/10000;
					 } else {
						 perAssignCount = assignTotalCount - totalAssigned;
					 }
				} else if(assignRuleType.equals(ObCallbatchAss.OB_ASSIGN_TYPE_SETCOUNT)) {//指定数量分配
					perAssignCount=Integer.valueOf(counts[i]);
				} 
				if(perAssignCount<=0) continue;
				
				//创建分配历史
    			ObCallbatchAss obCallbatchAss = new ObCallbatchAss();
    			obCallbatchAss.setComId(obCallbatch.getObCalllist().getObComs().iterator().next().getComId());
    			obCallbatchAss.setCalllistId(obCallbatch.getObCalllist().getCalllistId());
    			obCallbatchAss.setCallbatchId(callbatchId);
    			obCallbatchAss.setFromAppUser(ContextUtil.getCurrentUser());
    			obCallbatchAss.setToAppUser(appUserService.get(toUserId));
    			obCallbatchAss.setAssStepId(Long.parseLong(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI));//经理分配
    			obCallbatchAss.setAssTypId(Long.parseLong(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_TYP_CUS));//名单分配
    			obCallbatchAss.setAssignCount(0);
    			obCallbatchAss.setHoldCount(0);
    			obCallbatchAss.setRetriveCount(0);
    			obCallbatchAss.setStaDat(staDat);
    			obCallbatchAss.setRetriveCountAdmin(0); 
    			obCallbatchAss.setRetriveCountJL(0);
    			obCallbatchAss.setRetriveCountZZ(0);
    			obCallbatchAss.setParentCallbatchAssId(callbatchAssId);
//    			obCallbatchAss.setFromUse(super.getCurrentUser());
//    			obCallbatchAss.setToUse(new User(toUseId, super.getRequestParameter("userName_"+toUseId)));
    			obCallbatchAssService.save(obCallbatchAss);    			
    			
    			//批量分配一批名单给单个用户
    			realCountToUser = obCalllistService.assignJLObCallbatchToUser(
    					obCallbatch.getObCalllist().getCalllistId(), callbatchId,callbatchAssId, obCallbatchAss.getCallbatchAssId(), 
    					fromUseId, toUserId, perAssignCount,whereSql);

				totalAssigned += realCountToUser;//分配数量汇总  
				
				//修改分配历史
				if(realCountToUser>0) {
					Date endDat = DateUtil.parse(DateUtil.getCurrentTime());
	    			obCallbatchAss.setAssignCount(realCountToUser);
	    			obCallbatchAss.setHoldCount(realCountToUser);
	    			obCallbatchAss.setEndDat(endDat);
	    			obCallbatchAssService.merge(obCallbatchAss);
	    			
		    		//创建任务
		   			 CalendarPlan calendarPlan=new CalendarPlan();
					 calendarPlan.setUrgent(CalendarPlan.URGENT_IMPORTANT);
					 calendarPlan.setContent("经理分配阶段，共分配 "+realCountToUser+" 个名单");
					 calendarPlan.setStatus(CalendarPlan.STATUS_UNFINISHED);
					 calendarPlan.setUserId(fromUseId);
					 calendarPlan.setShowStyle(CalendarPlan.SHOW_STYLE_IN_TASK);
					 calendarPlan.setTaskType(CalendarPlan.TASK_STYLE_DAILY);
					 calendarPlan.setSource(3L);
					 calendarPlan.setSourceId(obCallbatchAss.getCallbatchAssId());
					 calendarPlan.setTaskCategory(32L);
					 calendarPlan.setTaskBusiType(901L);
					 calendarPlan.setStartTime(staDat);
					 calendarPlan.setTaskTitle("经理分配");
					 calendarPlan.setFullname(ContextUtil.getCurrentUser().getFullname());
					 calendarPlan.setAssignerId(toUserId.toString()); //被分配人
					 calendarPlan.setAssignerName(appUserService.get(toUserId).getFullname());
					 calendarPlanService.save(calendarPlan);
	   				 CalendarPlanHandle planHandle = new CalendarPlanHandle();
					 planHandle.setPlanId(calendarPlan.getPlanId());
					 planHandle.setAssignerId(fromUseId);
					 //AppUser toUser=appUserService.get(toUserId);
					 planHandle.setAssignerName(ContextUtil.getCurrentUser().getFullname());
					 planHandle.setAssignTime(staDat);
					 planHandle.setExecutor(toUserId);
					 calendarPlanHandleService.save(planHandle);		    			
				}
			}
    		//修改上级分配历史的可分配数量
			parentCallbatchAss.setHoldCount(holdTotalCount-totalAssigned);
    		obCallbatchAssService.merge(parentCallbatchAss);		
			
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}	
	
	//确定分配--组长分配
	public String doZZNewAssignCallbatch() throws Exception{
		
		String staDat = DateUtil.getCurrentTime();
		Long callbatchId = Long.valueOf(getRequest().getParameter("callbatchId"));
		ObCallbatch obCallbatch=obCallbatchService.get(callbatchId);
		ObCalllist obCalllist=obCallbatch.getObCalllist();
		ObCom obCom=obCalllist.getObComs().iterator().next();
		Long callbatchAssId = Long.valueOf(getRequest().getParameter("callbatchAssId"));
		//上级分配历史
		ObCallbatchAss parentCallbatchAss=obCallbatchAssService.get(callbatchAssId);
    	//上级分配历史下可分配数量
    	int holdTotalCount = (int)(parentCallbatchAss.getHoldCount());		
    	//指定分配数量
    	int assignTotalCount=Integer.valueOf(getRequest().getParameter("assignTotalCount"));
    	//分配方式
    	String assignRuleType=getRequest().getParameter("assignRuleType");
    	
	    //处理分配条件
	    String whereSql="";
	    String assignIFGrid=getRequest().getParameter("assignIFGrid");
	    if(assignIFGrid!=null&&!assignIFGrid.equals("")) {
	    	whereSql=obCalllistService.getWhereSql(assignIFGrid);
	    }
    	
		String[] counts=getRequest().getParameterValues("counts");
		String[] userids=getRequest().getParameterValues("ids");
		int count=counts.length;//接收人数量
		int realCountToUser = 0;//此次分配给用户的实际数量
		int totalAssigned = 0;//此次分配总共分配的数量
		Long fromUseId =ContextUtil.getCurrentUserId();   	
		if(true) {
			int perAssignCount = 0;
			for(int i=0;i<count;i++) {
				Long toUserId=Long.valueOf(userids[i]);
				perAssignCount = 0;
				if(assignRuleType.equals(ObCallbatchAss.OB_ASSIGN_TYPE_PERCENT)) {//按比例分配
					 String percent=counts[i];
					 if(i<count-1) {
						 perAssignCount = new BigDecimal(percent).multiply(new BigDecimal(100)).multiply(new BigDecimal(assignTotalCount)).intValueExact()/10000;
					 } else {
						 perAssignCount = assignTotalCount - totalAssigned;
					 }
				} else if(assignRuleType.equals(ObCallbatchAss.OB_ASSIGN_TYPE_SETCOUNT)) {//指定数量分配
					perAssignCount=Integer.valueOf(counts[i]);
				} 
				if(perAssignCount<=0) continue;
				
				//创建分配历史
    			ObCallbatchAss obCallbatchAss = new ObCallbatchAss();
    			obCallbatchAss.setComId(obCallbatch.getObCalllist().getObComs().iterator().next().getComId());
    			obCallbatchAss.setCalllistId(obCallbatch.getObCalllist().getCalllistId());
    			obCallbatchAss.setCallbatchId(callbatchId);
    			obCallbatchAss.setFromAppUser(ContextUtil.getCurrentUser());
    			obCallbatchAss.setToAppUser(appUserService.get(toUserId));
    			obCallbatchAss.setAssStepId(Long.parseLong(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_ZUZHANG));//数据管理员分配
    			obCallbatchAss.setAssTypId(Long.parseLong(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_TYP_CUS));//名单分配
    			obCallbatchAss.setAssignCount(0);
    			obCallbatchAss.setHoldCount(0);
    			obCallbatchAss.setRetriveCount(0);
    			obCallbatchAss.setStaDat(DateUtil.parse(staDat));
    			obCallbatchAss.setRetriveCountAdmin(0);
    			obCallbatchAss.setRetriveCountJL(0);
    			obCallbatchAss.setRetriveCountZZ(0);
    			obCallbatchAss.setParentCallbatchAssId(callbatchAssId);
//    			obCallbatchAss.setFromUse(super.getCurrentUser());
//    			obCallbatchAss.setToUse(new User(toUseId, super.getRequestParameter("userName_"+toUseId)));
    			obCallbatchAssService.save(obCallbatchAss);  
    			
    			
    			//批量分配一批名单给单个用户
    			realCountToUser = obCalllistService.assignZZObCallbatchToUser(
    					obCallbatch.getObCalllist().getCalllistId(), callbatchId,callbatchAssId, obCallbatchAss.getCallbatchAssId(), 
    					fromUseId, toUserId, perAssignCount,whereSql);

				totalAssigned += realCountToUser;//分配数量汇总  
				
				//obCom.setAssCount(obCom.getAssCount()+totalAssigned);
				
	    		//创建任务
	   			 CalendarPlan calendarPlan=new CalendarPlan();
				 calendarPlan.setUrgent(CalendarPlan.URGENT_IMPORTANT);
				 calendarPlan.setContent("组长分配阶段，共分配 "+realCountToUser+" 个名单");
				 calendarPlan.setStatus(CalendarPlan.STATUS_UNFINISHED);
				 calendarPlan.setUserId(fromUseId);//分配人
				 calendarPlan.setShowStyle(CalendarPlan.SHOW_STYLE_IN_TASK);
				 calendarPlan.setTaskType(CalendarPlan.TASK_STYLE_OUT);
				 calendarPlan.setSource(2L);
				 calendarPlan.setSourceId(obCallbatchAss.getCallbatchAssId());
				 calendarPlan.setTaskCategory(32L);
				 //calendarPlan.setTaskBusiType(901L);
				 calendarPlan.setStartTime(DateUtil.parse(staDat));
				 calendarPlan.setTaskTitle("组长分配");
				 calendarPlan.setFullname(ContextUtil.getCurrentUser().getFullname());
				 calendarPlan.setAssignerId(toUserId.toString()); //被分配人
				 calendarPlan.setAssignerName(appUserService.get(toUserId).getFullname());
				 calendarPlanService.save(calendarPlan);
 				 CalendarPlanHandle planHandle = new CalendarPlanHandle();
				 planHandle.setPlanId(calendarPlan.getPlanId());
				 planHandle.setAssignerId(fromUseId);//分配人
				 //AppUser toUser=appUserService.get(toUserId);
				 planHandle.setAssignerName(ContextUtil.getCurrentUser().getFullname());
				 planHandle.setAssignTime(DateUtil.parse(staDat));
				 planHandle.setExecutor(toUserId);//被分配人
				 calendarPlanHandleService.save(planHandle);
				 
				 
				//修改分配历史
				if(realCountToUser>0) {
					Date endDat = DateUtil.parse(DateUtil.getCurrentTime());
	    			obCallbatchAss.setAssignCount(realCountToUser);
	    			obCallbatchAss.setHoldCount(realCountToUser);
	    			obCallbatchAss.setEndDat(endDat);
	    			obCallbatchAssService.merge(obCallbatchAss);
	    			
    				//此次分配历史对应的客户
    				//List<ObCallbatchCus> obCallbatchAssCusList = obCalllistService.queryObCallbatchCussByCallbatchAssId(obCallbatchAss.getCallbatchAssId());  
    				obCalllistService.createSaleTaskByCus(obCallbatchAss,obCallbatch,obCalllist,obCom,toUserId,staDat);
    				
 /*   			
    				if(obCallbatchAssCusList!=null&&obCallbatchAssCusList.size()>0) {
	    				for(ObCallbatchCus obCallbatchCus:obCallbatchAssCusList) {
	    					
	    					//创建营销任务
			    			ObSaletask obSaletask = new ObSaletask();
			    			obSaletask.setTypId(ObSaletask.TYPE_ID_CALLLIST);//
			    			obSaletask.setCusGrpId(null); //名单池营销必填
			    			obSaletask.setUseId(toUserId);
			    			//obSaletask.setTasId(calendarPlan.getPlanId());//
			    			obSaletask.setCusId(obCallbatchCus.getCusId());//
			    			obSaletask.setCallbatchAssId(obCallbatchAss.getCallbatchAssId());
			    			obSaletask.setCallbatchId(callbatchId);
			    			obSaletask.setCallbatchNam(obCallbatch.getCallbatchNam());
			    			obSaletask.setCalllistId(obCalllist.getCalllistId());//
			    			obSaletask.setCalllistNam(obCalllist.getCalllistNam());
			    			obSaletask.setComId(obCom.getComId());//
			    			obSaletask.setComNam(obCom.getObComNam());
			    			obSaletask.setAsgDat(DateUtil.parse(staDat));//
			    			obSaletask.setBooTim(null);
			    			obSaletask.setDiaCou((short)0);//
			    			obSaletask.setFirstDiaDat(null);
			    			obSaletask.setLastDiaDat(null);
			    			obSaletask.setConStaId(null);
			    			obSaletask.setDes(null);
			    		    //营销状态（结束码）
			    			obSaletask.setBusiStaId(ObSaletask.MARKET_NO_EXEC);
			    		    //名单营销结果
			    			obSaletask.setBusiRelId(null);
			    			obSaletask.setServTypId(null);
			    			obSaletask.setServStaId(null);
			    			obSaletaskService.save(obSaletask);
			    			
							CusPersonal cusPersonal=cusPersonalService.get(obSaletask.getCusId());
							cusPersonal.setExt20("0");
							cusPersonalService.merge(cusPersonal);	
							
//	    					//创建任务
//	    					 CalendarPlan calendarPlan=new CalendarPlan();
//	    					 calendarPlan.setUrgent(CalendarPlan.URGENT_IMPORTANT);
//	    					 calendarPlan.setContent("组长分配阶段");
//	    					 calendarPlan.setStatus(CalendarPlan.STATUS_UNFINISHED);
//	    					 calendarPlan.setUserId(fromUseId);
//	    					 calendarPlan.setShowStyle(CalendarPlan.SHOW_STYLE_IN_TASK);
//	    					 calendarPlan.setTaskType(CalendarPlan.TASK_STYLE_OUT);
//	    					 calendarPlan.setSource(2L);
//	    					 calendarPlan.setSourceId(obSaletask.getSaletaskId());
//	    					 calendarPlan.setTaskCategory(2L);
//	    					 calendarPlan.setBusiType(obCom.getBusiTypId());
//	    					 calendarPlan.setStartTime(staDat);
//	    					 calendarPlan.setTaskTitle("外呼营销");
//	    					 calendarPlanService.save(calendarPlan);
//	    					 
//		   	   				 CalendarPlanHandle planHandle = new CalendarPlanHandle();
//							 planHandle.setPlanId(calendarPlan.getPlanId());
//							 planHandle.setAssignerId(fromUseId);
//							 //AppUser toUser=appUserService.get(toUserId);
//							 planHandle.setAssignerName(ContextUtil.getCurrentUser().getFullname());
//							 planHandle.setAssignTime(staDat);
//							 planHandle.setExecutor(toUserId);
//							 calendarPlanHandleService.save(planHandle);				    			
	    					
	    				}
	   			}
*/   			
				}
    			
			}
    		//修改上级分配历史的可分配数量
			parentCallbatchAss.setHoldCount(holdTotalCount-totalAssigned);
    		obCallbatchAssService.merge(parentCallbatchAss);		
			
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}		
	
	//名单回收模块--可回收人
	public String listAssByCallbatchId() {
		AppUser user= ContextUtil.getCurrentUser();
//		String rights=user.getFunctionRights();
//		String assStep="";
//		if(rights.indexOf("__ALL")>=0||rights.indexOf(",__ALL")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN;
//		} else if(rights.indexOf("_ObCalllistJFeipei")>=0||rights.indexOf(",_ObCalllistJFeipei")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI;
//		} else if(rights.indexOf("_ObCalllistZFeipei")>=0||rights.indexOf(",_ObCalllistZFeipei")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_ZUZHANG;
//		}
		
		//System.out.println("^^^^^^^^^^^^^^^user.getFunctionRights();^^^^^^^^^^^^"+user.getFunctionRights());
		String callbatchId=getRequest().getParameter("callbatchId");
		String projId=getRequest().getParameter("projId");
		String comId=getRequest().getParameter("comId");
		String calllistId=getRequest().getParameter("calllistId");
		QueryFilter filterAss = new QueryFilter(getRequest());
		if(callbatchId!=null&&!callbatchId.equals("")) {
			filterAss.addFilter("Q_obCallbatch.callbatchId_L_EQ", callbatchId);
		}else if(calllistId!=null&&!calllistId.equals("")) {
			filterAss.addFilter("Q_obCalllist.calllistId_L_EQ", calllistId);
		} else if(comId!=null&&!comId.equals("")) {
			filterAss.addFilter("Q_obCom.comId_L_EQ", comId);
		} else if(projId!=null&&!projId.equals("")) {
			filterAss.addFilter("Q_obCom.obProject.projId_L_EQ", projId);
		}

		//filterAss.addFilter("Q_fromAppUser.userId_L_EQ", ContextUtil.getCurrentUser().getUserId().toString());
		//filterAss.addFilter("Q_assStepId_L_EQ", assStep);
		filterAss.addFilter("Q_holdCount_N_GT", "0");
		filterAss.addSorted("staDat", "desc");
		List<ObCallbatchAss> list = obCallbatchAssService.getAll(filterAss);
		List<ObCallbatchAss> list2=new ArrayList<ObCallbatchAss>();
		for(ObCallbatchAss ass:list) {
			if(ass.getFromAppUser().getUserId().equals(user.getUserId())) {
				list2.add(ass);
			}
		}
		list2=obCallbatchAssService.injectIdToName(list2);
		list2=generateAssList(list2,filterAss.getPagingBean().getTotalItems(),null);
		
		StringBuffer buff = new StringBuffer();
		buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filterAss.getPagingBean().getTotalItems()).append(
		",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list2));
		buff.append("}");

		jsonString = buff.toString();	
		
		return SUCCESS;   		
	}
	
	public String listAssIdsByCallbatch() {
		AppUser user= ContextUtil.getCurrentUser();
//		String rights=user.getFunctionRights();
//		System.out.println("*********rights********************"+rights);
//		String assStep="";
//		if(rights.indexOf("__ALL")>=0||rights.indexOf(",__ALL")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN;
//		} else if(rights.indexOf("_ObCalllistJFeipei")>=0||rights.indexOf(",_ObCalllistJFeipei")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI;
//		} else if(rights.indexOf("_ObCalllistZFeipei")>=0||rights.indexOf(",_ObCalllistZFeipei")>=0) {
//			assStep=ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_ZUZHANG;
//		}		
		
		String callbatchId= getRequest().getParameter("callbatchId");
		String projId=getRequest().getParameter("projId");
		String comId=getRequest().getParameter("comId");
		String calllistId=getRequest().getParameter("calllistId");		
		QueryFilter filter = new QueryFilter(getRequest());
		if(callbatchId!=null&&!callbatchId.equals("")) {
			filter.addFilter("Q_obCallbatch.callbatchId_L_EQ", callbatchId);
		}else if(calllistId!=null&&!calllistId.equals("")) {
			filter.addFilter("Q_obCalllist.calllistId_L_EQ", calllistId);
		} else if(comId!=null&&!comId.equals("")) {
			filter.addFilter("Q_obCom.comId_L_EQ", comId);
		} else if(projId!=null&&!projId.equals("")) {
			filter.addFilter("Q_obCom.obProject.projId_L_EQ", projId);
		}		
		//filter.addFilter("Q_fromAppUser.userId_L_EQ", ContextUtil.getCurrentUser().getUserId().toString());
		//filter.addFilter("Q_assStepId_L_EQ", assStep);
		filter.addFilter("Q_holdCount_N_GT", "0");
		List<ObCallbatchAss> list= obCallbatchAssService.getAll(filter);
		List<ObCallbatchAss> list2=new ArrayList<ObCallbatchAss>();
		for(ObCallbatchAss ass:list) {
			if(ass.getFromAppUser().getUserId().equals(user.getUserId())) {
				list2.add(ass);
			}
		}
		
		String assIds="";
		if(list2!=null&&list2.size()>0) {
			for(ObCallbatchAss obCallbatchAss:list2) {
                if(assIds.equals("")) {
                	assIds=obCallbatchAss.getCallbatchAssId().toString();
                } else {
                	assIds+=","+obCallbatchAss.getCallbatchAssId().toString();
                }
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,").append("data:'");
		buff.append(assIds);
		buff.append("'}");
		jsonString = buff.toString();
		return SUCCESS;
	}	
	
	//确定回收--名单回收
	public String doRetriveAssignedByCallbatch() throws Exception{
		String callbatchAssIds=getRequest().getParameter("ids");
		int  retriveIndex=0; int parentFlag=0;
		AppUser user= ContextUtil.getCurrentUser();
//		if(user.getEmployeeid()!=null&&!user.getEmployeeid().equals("")) {
//			UlEmployee employee=ulEmployeeService.getEmployeeByUserNo(user.getEmployeeid());
//			if(employee!=null&&employee.getZhiwei()!=null) {
//				if(employee.getZhiwei().equals("44")) {
//					retriveIndex=1;parentFlag=1;
//				} else if(employee.getZhiwei().equals("51")) {
//					retriveIndex=2;parentFlag=1;
//				}
//			}
//		}
//		String rights=user.getFunctionRights();
//		if(rights.indexOf("__ALL")>=0||rights.indexOf(",__ALL")>=0) {
//			retriveIndex=0; 
//		} else if(rights.indexOf("_ObCalllistJFeipei")>=0||rights.indexOf(",_ObCalllistJFeipei")>=0) {
//			retriveIndex=1;parentFlag=1;
//		} else if(rights.indexOf("_ObCalllistZFeipei")>=0||rights.indexOf(",_ObCalllistZFeipei")>=0) {
//			retriveIndex=2;parentFlag=1;
//		}	
		
		String[] counts=getRequest().getParameterValues("counts");
 
		QueryFilter filter = new QueryFilter(getRequest());
		//callbatchAssIds.toString().substring(1, callbatchAssIds.toString().length() - 1).trim();
		filter.addFilter("Q_callbatchAssId_S_LIN", callbatchAssIds.toString());
		List<ObCallbatchAss> list = obCallbatchAssService.getAll(filter);	
		ObCallbatch obCallbatch=null;
		String assignRuleType=getRequest().getParameter("assignRuleType");//分配方式
		if(list!=null&&list.size()>0) {
			int assCount=list.size();
			for(int i=0;i<assCount;i++) {
				ObCallbatchAss obCallbatchAss=list.get(i);
				obCallbatch=obCallbatchAss.getObCallbatch();
				List<ObCallbatchAss> listJL=listChilderAss(obCallbatchAss);
				listJL.add(obCallbatchAss);
				String allAssIds="";
				if(listJL!=null&&listJL.size()>0) {
					for(ObCallbatchAss allAss:listJL) {
						if(allAssIds=="") {
							allAssIds=allAss.getCallbatchAssId().toString();
						} else {
							allAssIds+=","+allAss.getCallbatchAssId().toString();
						}
					}
				}
//				QueryFilter filterBatchCus = new QueryFilter(getRequest());
//				filterBatchCus.addFilter("Q_obCallbatchAss.callbatchAssId_S_LIN", allAssIds);
//				List<ObCallbatchCus> callbatchCuss = obCallbatchCusService.getAll(filterBatchCus);	
				
			    //处理分配条件
			    String whereSql="";
			    String assignIFGrid=getRequest().getParameter("assignIFGrid");
			    if(assignIFGrid!=null&&!assignIFGrid.equals("")) {
			    	whereSql=obCalllistService.getWhereSql(assignIFGrid);
			    }
			    
				List<ObCallbatchCus> callbatchCuss = obCallbatchCusService.listCallbatchCusByAssids(allAssIds,whereSql);				
				
				if(callbatchCuss!=null&&callbatchCuss.size()>0) {
					retriveBycallbatchCuss(callbatchAssIds,callbatchCuss,allAssIds,whereSql,assignRuleType,retriveIndex,parentFlag,obCallbatch,counts,i);
				}
			}	
			obCallbatchService.merge(obCallbatch);
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 名单管理——>导入批次——>批次导入详细——>分配历史、回收历史
	 * @return
	 */
	public String listAssHis() {
		String callbatchID = getRequest().getParameter("callbatchID");
		String assOrRetr = getRequest().getParameter("assOrRetr");
		int start=Integer.valueOf(getRequest().getParameter("start"));
		int limit=Integer.valueOf(getRequest().getParameter("limit"));		
		if(null!=callbatchID) {
//			QueryFilter filter = new QueryFilter(getRequest());
//			filter.addFilter("Q_obCallbatch.callbatchId_L_EQ", callbatchID);
//			if(assOrRetr.equals("0")) {//分配历史
//				System.out.println("*******分配历史*********");
//				filter.addFilter("Q_staDat_D_NOTEMP", "0");
//			} else if(assOrRetr.equals("1")) {//
//				System.out.println("*******回收历史*********");
//				filter.addFilter("Q_retriveDat_D_NOTEMP", "0");
//			}
//			List<ObCallbatchAss> list= obCallbatchAssService.getAll(filter);
//			list = obCallbatchAssService.injectIdToName(list);
			
			List<ObCallbatchAss> list= obCallbatchAssService.listAssByCallbatch(Long.valueOf(callbatchID),assOrRetr,start,limit);
			int listCount=obCallbatchAssService.listAssByCallbatchCount(Long.valueOf(callbatchID),assOrRetr);
			list = obCallbatchAssService.injectIdToName(list);
			
			list=generateAssList(list,listCount,null);
			
			StringBuffer buff = new StringBuffer();
			buff = new StringBuffer("{success:true,'totalCounts':")
			.append(listCount).append(
			",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
	        buff.append(jsonSer
	        		.include("fromUseName", "assStepId", "assignCount","callbatchAssId",
							"staDat","canReceiveCount","toUserName", "retriveDat", "retriveCount",
							"holdCount")
			        .exclude("*")
			        .serialize(list));					
			
			//buff.append(jsonSer.serialize(list));
			buff.append("}");

			jsonString = buff.toString();	
			
		}
		return SUCCESS;
	}	
	
}
