package com.ulane.monitor.action.unim;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.DozerHelper;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.StringUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.monitor.model.unim.UnimAgent;
import com.ulane.monitor.model.unim.UnimAgentSkillgroup;
import com.ulane.monitor.model.unim.UnimAssets;
import com.ulane.monitor.model.unim.UnimAssetsMap;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.model.unim.UnimChannelMap;
import com.ulane.monitor.model.unim.UnimMapAgent;
import com.ulane.monitor.model.unim.UnimMonitorAgent;
import com.ulane.monitor.service.unim.UnimAgentService;
import com.ulane.monitor.service.unim.UnimCategoryService;
import com.ulane.monitor.service.unim.UnimMonitorAgentService;
import com.ulane.monitor.service.unim.UnimSkillgroupService;

import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UnimAgentAction extends BaseAction {
	public static final Logger logger = Logger.getLogger(UnimAgentAction.class);
	@Resource
	private UnimAgentService unimAgentService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private UnimCategoryService unimCategoryService;
	@Resource 
	private UnimSkillgroupService unimSkillgroupService;
	@Resource 
	private UnimMonitorAgentService unimMonitorAgentService;
	private UnimAgent unimAgent;

	private Long agentId;

	public Long getAgentId() {
		return agentId;
	}

	public void setAgentId(Long agentId) {
		this.agentId = agentId;
	}

	public UnimAgent getUnimAgent() {
		return unimAgent;
	}

	public void setUnimAgent(UnimAgent unimAgent) {
		this.unimAgent = unimAgent;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		
		String empNo = getRequest().getParameter("empNo");
		if(StringUtils.isNotBlank(empNo)) {
			QueryFilter queryFilter = new QueryFilter();
			queryFilter.addFilter("Q_employeeid_S_EQ", StringUtils.trim(empNo));
			List<AppUser> list = appUserService.getAllNoRequest(queryFilter);
			if(list.size()>0) {
				filter.addFilter("Q_userId_L_EQ", String.valueOf(list.get(0).getUserId()));
			}
		}
		
		filter.addSorted("aid", QueryFilter.ORDER_ASC);
		
		List<UnimAgent> list = unimAgentService.getAll(filter);
		for (UnimAgent agt : list) {
			Long userId = agt.getUserId();
			if (null != userId) {
				AppUser appUser = appUserService.get(userId);
				agt.setUserName(appUser.getFullname());
				agt.setDepName(appUser.getDepName());	
				agt.setEmployeeId(appUser.getEmployeeid());
			}
			String agtCode = agt.getAgentCode();
			if (StringUtils.isNotBlank(agtCode)) {
				// unimCategoryService.getAll(filter);
			}
		}
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
	 * 显示列表
	 */
	public String listAgt() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<UnimAgent> list = unimAgentService.getAll(filter);
		for (UnimAgent agt : list) {
			Long userId = agt.getUserId();
			if (null != userId) {
				agt.setUserName(appUserService.get(userId).getFullname());
			}
			String agtCode = agt.getAgentCode();
			if (StringUtils.isNotBlank(agtCode)) {
				// unimCategoryService.getAll(filter);
			}
		}
		System.out.println("----\n" + list.toString());

		StringBuffer buff = new StringBuffer();
		JSONSerializer serializer = new JSONSerializer();
		buff.append(serializer.serialize(list));
		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 显示班长监控的坐席unim/listByMonitorForUnimAgent.do?agentId=1,agentId为班长ID(流水号)
	 */
	public String listByMonitorFor() {
		QueryFilter filter = new QueryFilter(getRequest());
		String agentId = super.getRequest().getParameter("agentId");
		List<UnimAgent> list = unimAgentService
				.listByMonitorForUnimAgent(new Long(agentId));
		System.out.println("----\n" + list.toString());

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		JSONSerializer serializer = new JSONSerializer();
		// serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new
		// String[] { "applyTime"});
		// buff.append(serializer.exclude(new
		// String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));

		buff.append(serializer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 批量注销
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				if (StringUtils.isNotBlank(id)) {
					UnimAgent agt = unimAgentService.get(Long.parseLong(id));
					agt.setStatus(UnimAgent.STA_CANCELED);
					unimAgentService.save(agt);
				}
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
	public String get(){
		UnimAgent unimAgent=unimAgentService.get(agentId);
		
		//获取员工号和组织机构
		Long userId = unimAgent.getUserId();
		if(null!=userId) {
			AppUser appUser = appUserService.get(userId);
			unimAgent.setEmployeeId(appUser.getEmployeeid());
			unimAgent.setDepName(appUser.getDepName());			
		}
		
//		//将坐席所属技能组赋值
//		Set<UnimAgentSkillgroup> sets = unimAgent.getUnimAgentSkillgroups();
//		StringBuilder sber = new StringBuilder();
//		for(UnimAgentSkillgroup uaSkg : sets) {
//			Long skgId = uaSkg.getSkillgroupId();
//			UnimSkillgroup skg = unimSkillgroupService.get(skgId);
//			sber.append(skg.getSkgId()+"_"+skg.getSkgName()+",");
//		}
//		String uaSkgJsonsTmp = sber.toString(); 
//		unimAgent.setUaSkgsJson(uaSkgJsonsTmp);
		
		//将数据转成JSON格式
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.exclude("unimAgentSkillgroups");
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(jsonSer.serialize(unimAgent));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String getMonitorInfo(){
		UnimAgent unimAgent=unimAgentService.get(agentId);
		
		//==获取员工号和组织机构
		Long userId = unimAgent.getUserId();
		if(null!=userId) {
			AppUser appUser = appUserService.get(userId);
			unimAgent.setEmployeeId(appUser.getEmployeeid());
			unimAgent.setDepName(appUser.getDepName());			
		}
		
		//==将坐席所属技能组赋值
		Set<UnimAgentSkillgroup> sets = unimAgent.getUnimAgentSkillgroups();
		StringBuilder sber = new StringBuilder();
		for(UnimAgentSkillgroup uaSkg : sets) {
			Long skgId = uaSkg.getSkillgroupId();
			sber.append(skgId+"_");
		}
		String uaSkgJsonsTmp = sber.toString(); 
		unimAgent.setUaSkgsJson(uaSkgJsonsTmp);
		
		//==将坐席的下属坐席赋值
		Set<UnimMonitorAgent> setsMonitor = unimAgent.getUnimMonitorAgents();
		sber.setLength(0);
		for(UnimMonitorAgent umAgt : setsMonitor) {
			sber.append(umAgt.getComp_id().getMonitorAgentId()+"_");
		}
		String uaMnAgtJsonTmp = sber.toString();
		unimAgent.setUaMnAgtJson(uaMnAgtJsonTmp);
		
		//==坐席地图关系
		Set<UnimMapAgent> setsMapAgt = unimAgent.getUnimMapAgents();
		sber.setLength(0);
		for(UnimMapAgent umAgt : setsMapAgt) {
			sber.append(umAgt.getComp_id().getMapId()+"_");
		}
		String uaMapAgtJsonTmp = sber.toString();
		unimAgent.setUaMapAgtJson(uaMapAgtJsonTmp);

		//==业务视图关系
		Set<UnimChannelMap> setsMapChannel = unimAgent.getUnimMapChannels();
		sber.setLength(0);
		for(UnimChannelMap ch :setsMapChannel) {
			sber.append(ch.getMapId()+"_");
		}
		String uaMapBusJson = sber.toString();
		unimAgent.setUaMapBusJson(uaMapBusJson);
		
		//==资产视图关系
		Set<UnimAssetsMap> setsMapAss = unimAgent.getUnimMapAssetss();
		sber.setLength(0);
		for(UnimAssetsMap uas : setsMapAss) {
			sber.append(uas.getMapId()+"_");
		}
		String uaMapAssJson = sber.toString();
		unimAgent.setUaMapAssJson(uaMapAssJson);
		
		//==监控渠道关系
		Set<UnimChannel> setChs = unimAgent.getUnimChannels();
		sber.setLength(0);
		for(UnimChannel chAgt : setChs) {
			sber.append(chAgt.getChannelId()+"_");
		}
		String uaChaAgtJson = sber.toString();
		unimAgent.setUaChaAgtJson(uaChaAgtJson);
		
		//==监控资产关系
		Set<UnimAssets> setAss = unimAgent.getUnimAssetss();
		sber.setLength(0);
		for(UnimAssets ass : setAss) {
			sber.append(ass.getAssetsId()+"_");
		}
		String uaAssAgtJson = sber.toString();
		unimAgent.setUaAssAgtJson(uaAssAgtJson);
		

		//将数据转成JSON格式
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.exclude("unimAgentSkillgroups");
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(jsonSer.serialize(unimAgent));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	
	/**
	 * 添加及保存操作
	 */
	public String save() {
		String Num = getRequest().getParameter("Num");
		String skgIds = getRequest().getParameter("skgIds");
		String jobType = getRequest().getParameter("jobType");
		String jobClass = getRequest().getParameter("jobClass");
		
		if (unimAgent.getAgentId() == null) {
			//====批量新增
			if(StringUtils.isNotBlank(Num)) {
				int iCount = Integer.parseInt(Num);
				for(int i=0;i<iCount;i++) {
					if(i==0) {
						try {
							unimAgent.setStatus(UnimAgent.STA_ENABLE);
							unimAgent.setJobType(jobType);
							unimAgent.setJobClass(jobClass);
							unimAgent.setAgentName(unimAgent.getAgentCode());
							UnimAgent newAgt = new UnimAgent();
							BeanUtil.copyNotNullProperties(newAgt, unimAgent);
							UnimAgent agt = unimAgentService.save(newAgt);
							
							Map<String,String> param = new HashMap<String,String>();
							param.put("skgIds", skgIds);
							param.put("agtId", String.valueOf(agt.getAgentId()));
							unimAgentService.saveAgtAndSkg(param);
						} catch(Exception ex) {
							ex.printStackTrace();
							logger.error(ex.getMessage());
						}
					} else {
						try {
							UnimAgent newAgt = new UnimAgent();
							unimAgent.setJobType(jobType);
							unimAgent.setJobClass(jobClass);
							unimAgent.setAgentName(unimAgent.getAgentCode());
							BeanUtil.copyNotNullProperties(newAgt, unimAgent);
							String newAid = newAgt.getAid()+i;
							newAgt.setAid(newAid);
							newAgt = unimAgentService.save(newAgt);
							
							Map<String,String> param = new HashMap<String,String>();
							param.put("skgIds", skgIds);
							param.put("agtId", String.valueOf(newAgt.getAgentId()));
							unimAgentService.saveAgtAndSkg(param);
						} catch(Exception ex) {
							ex.printStackTrace();
							logger.error(ex.getMessage());
						}
					}
				}
			}
			//====单个新增
			else {
				unimAgent.setStatus(UnimAgent.STA_ENABLE);
				unimAgent.setJobType(jobType);
				unimAgent.setJobClass(jobClass);
				UnimAgent agt = unimAgentService.save(unimAgent);
				Map<String,String> param = new HashMap<String,String>();
				param.put("skgIds", skgIds);
				param.put("agtId", String.valueOf(agt.getAgentId()));
				unimAgentService.saveAgtAndSkg(param);
			}
		} 
		//====修改
		else {
			UnimAgent orgUnimAgent = unimAgentService.get(unimAgent.getAgentId());
			try {
				unimAgent.setJobType(jobType);
				unimAgent.setJobClass(jobClass);
				BeanUtil.copyNotNullProperties(orgUnimAgent, unimAgent);
				unimAgentService.save(orgUnimAgent);
				Map<String,String> param = new HashMap<String,String>();
				param.put("skgIds", skgIds);
				param.put("agtId", String.valueOf(orgUnimAgent.getAgentId()));
				unimAgentService.saveAgtAndSkg(param);
			} catch (Exception ex) {
				ex.printStackTrace();
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
	
	/**
	 * 权限管理—保存
	 * @return
	 */
	public String saveMonitor() {
		String moAgtId = getRequest().getParameter("moAgtId");
		String agtIds = getRequest().getParameter("agtIds");
		String skgIds = getRequest().getParameter("skgIds");
		String mapIds = getRequest().getParameter("mapIds");
		String chnIds = getRequest().getParameter("chnIds");
		String assIds = getRequest().getParameter("assIds");
		String busIds = getRequest().getParameter("busIds");
		String astIds = getRequest().getParameter("astIds");
		String jobType = getRequest().getParameter("jobType");
		String jobClass = getRequest().getParameter("jobClass");
		
		if (StringUtils.isBlank(moAgtId)) {
			unimAgent.setIsmonitor(UnimAgent.isMonitor_Y);
			unimAgent.setStatus(UnimAgent.STA_ENABLE);
			unimAgent.setJobType(jobType);
			unimAgent.setJobClass(jobClass);
			
			UnimAgent newAgt = unimAgentService.save(unimAgent);
			String newAgtId = newAgt.getAgentId().toString();
			//==保存中间表数据
			saveTemTableData(newAgtId, agtIds, skgIds, mapIds,chnIds,assIds,busIds,astIds);
		} else {
			Long agentId = Long.parseLong(moAgtId);
			UnimAgent orgUnimAgent = unimAgentService.get(agentId);
			try {
				BeanUtil.copyNotNullProperties(orgUnimAgent, unimAgent);
				unimAgent.setAgentId(agentId);
				orgUnimAgent.setJobType(jobType);
				orgUnimAgent.setJobClass(jobClass);
				unimAgentService.save(orgUnimAgent);
				saveTemTableData(moAgtId, agtIds, skgIds, mapIds,chnIds,assIds,busIds,astIds);
			} catch(Exception ex) {
				ex.printStackTrace();
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	private void saveTemTableData(String newAgtId,String agtIds,String skgIds,String mapIds,String chnIds,String assIds,String busIds,String astIds) {
		//====班长监控坐席
		if(StringUtils.isNotBlank(agtIds)) {
			Map<String,String> param = new HashMap<String,String>();
			param.put("agtId", newAgtId);
			param.put("moniterIds", agtIds);
			unimAgentService.saveAgtAndMonitor(param);
		}
		
		//====监控技能组
		if(StringUtils.isNotBlank(skgIds)) {
			Map<String,String> param = new HashMap<String,String>();
			param.put("monitorSaveType", "monitorSaveType");
			param.put("agtId", newAgtId);
			param.put("skgIds", skgIds);
			unimAgentService.saveAgtAndSkg(param);
		}
		
		//====监控地图
		if(StringUtils.isNotBlank(mapIds)) {
			Map<String,String> param = new HashMap<String,String>();
			param.put("maps", mapIds);
			param.put("agtId", newAgtId);
			unimAgentService.saveAgtAndMap(param);
		}

		//====业务视图
		if(StringUtils.isNotBlank(busIds)) {
			Map<String,String> param = new HashMap<String,String>();
			param.put("busIds", busIds);
			param.put("agtId", newAgtId);
			unimAgentService.saveBusAndMap(param);
		}
		
		//====资产视图
		if(StringUtils.isNotBlank(astIds)) {
			Map<String,String> param = new HashMap<String,String>();
			param.put("astIds", astIds);
			param.put("agtId", newAgtId);
			unimAgentService.saveAstAndMap(param);
		}
		
		//====监控渠道
		if(StringUtils.isNotBlank(chnIds)) {
			Map<String,String> param = new HashMap<String,String>();
			param.put("chnIds", chnIds);
			param.put("agtId", newAgtId);
			unimAgentService.saveAgtAndChannel(param);
		}
		
		//====监控资产
		if(StringUtils.isNotBlank(assIds)) {
			Map<String,String> param = new HashMap<String,String>();
			param.put("assIds", assIds);
			param.put("agtId", newAgtId);
			unimAgentService.saveAgtAndAssets(param);
		}

	}
	
	public String isRepeatAid() {
		String aid = getRequest().getParameter("aid");
		if (StringUtils.isNotBlank(aid)) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_aid_S_EQ", aid);
			List<UnimAgent> list = unimAgentService.getAll(filter);
			if (list.size() > 0) {
				setJsonString("{success:true}");
				return SUCCESS;
			}
		}
		setJsonString("{success:false}");
		return SUCCESS;
	}
	
	public String isRepeatUser() {
		String useId = getRequest().getParameter("useId");
		if (StringUtils.isNotBlank(useId)) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_userId_L_EQ", useId);
			List<UnimAgent> list = unimAgentService.getAll(filter);
			if (list.size() > 0) {
				setJsonString("{success:true}");
				return SUCCESS;
			}
		}
		setJsonString("{success:false}");
		return SUCCESS;
	}
	public void search() {
		try {
			Integer searchMode = Integer.valueOf(getRequest().getParameter(
					"searchMode"));
			String searchKey = getRequest().getParameter("searchKey");
			Boolean isIgnoreCase = Boolean.valueOf(getRequest().getParameter(
					"isIgnoreCase"));
			Boolean isAllMatch = Boolean.valueOf(getRequest().getParameter(
					"isAllMatch"));

			if (searchMode == null) {
				writeToPage(Boolean.valueOf(false), "参数searchMode不能为空", null);
				return;
			}

			List list = unimAgentService.search(searchMode, searchKey,
					isIgnoreCase, isAllMatch);
			List list2 = new DozerHelper().convert(list);
			writeToPage(Boolean.valueOf(true), "search查询成功", list2);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	//HTTP接口
	public void updatePass() {
		try {
			String agentNum = getRequest().getParameter("agentNum");
			String pass = getRequest().getParameter("pass");
			if ((agentNum == null) || (agentNum.equals("")) || (pass == null)
					|| (pass.equals(""))) {
				writeToPage(Boolean.valueOf(false), "用户名或密码为空，修改失败", null);
				return;
			}
			List list = unimAgentService.login(agentNum, pass);
			if (list.size() != 1) {
				writeToPage(Boolean.valueOf(false), "旧的用户名或密码错误，重新登录", null);
				return;
			}
			
			String userId = getRequest().getParameter("userId");
			String newPass = getRequest().getParameter("newPass");
			
			AppUser appUser = appUserService.get(new Long(userId));
			appUser.setPassword(StringUtil.encryptSha256(newPass));
			appUserService.save(appUser);
			writeToPage(Boolean.valueOf(true), "密码修改成功", null);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	//HTTP接口
	public void login() {
		try {
			String agentNum = getRequest().getParameter("agentNum");
			String pass = getRequest().getParameter("pass");
			if ((agentNum == null) || (agentNum.equals("")) || (pass == null)
					|| (pass.equals(""))) {
				writeToPage(Boolean.valueOf(false), "用户名或密码为空，登录失败", null);
				return;
			}
			List list = unimAgentService.login(agentNum, pass);
			if (list.size() != 1) {
				writeToPage(Boolean.valueOf(false), "用户名或密码错误，重新登录", null);
				return;
			}
			List list2 = new DozerHelper().convert(list);
			writeToPage(Boolean.valueOf(true), "登录成功", list2);
			return;
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	public void findAll() {
		try {
			List list = unimAgentService.listGeneralAgents();
			List list2 = new DozerHelper().convert(list);

			writeToPage(Boolean.valueOf(true), "查询成功", list2);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

	  public void listMonitorAgents()
	  {
	    try
	    {
	      //坐席分类列表
		  List<UnimCategory> agentCatList = unimCategoryService.listGetCategory(UnimCategory.UNIM_CAT_TYP_AGENT);
		  Map<String, String> acColorMap = new HashMap();
		  for(UnimCategory cat:agentCatList){
			  acColorMap.put(""+cat.getExtend3()+"_"+cat.getExtend4(), cat.getExtend1());
		  }
		  
	      Long monitorId = Long.valueOf(getRequest().getParameter("id"));
	      List list = unimMonitorAgentService.listMonitorAgents(monitorId);
	      List list2 = new ArrayList();
	      UnimAgent agent = null;
	      for (int i = 0; i < list.size(); ++i) {
	        agent = unimAgentService.get(((UnimMonitorAgent)list.get(i)).getComp_id().getMonitorAgentId());
	        agent.setUnimServerConfig(null);
	        agent.setUnimMapAgents(null);
	        agent.setUnimAgentSkillgroups(null);
	        //==获取职务、职级的名称
	        
	        //==获取坐席显示颜色agentColor
	        agent.setAgentCode(acColorMap.get(""+agent.getJobType()+"_"+agent.getJobClass()));
	        
			//==获取员工号和组织机构
			Long userId = agent.getUserId();
			if(null!=userId) {
				AppUser appUser = appUserService.get(userId);
				agent.setEmployeeId(appUser.getEmployeeid());
				agent.setDepName(appUser.getDepName());			
			}
	        list2.add(agent);
	      }
	      List list3 = new DozerHelper().convert(list2);
//	      for (int i = 0; i < list3.size(); ++i) {
//	        agent = (UnimAgent)list3.get(i);
//	      }

	      writeToPage(Boolean.valueOf(true), "监控的坐席查询成功", list3);
	    }
	    catch (Exception e) {
	      e.printStackTrace();

	      writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
	    }
	  }	
}
