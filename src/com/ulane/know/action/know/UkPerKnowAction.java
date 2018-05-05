package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.know.model.know.UkKnowType;
import com.ulane.know.model.know.UkPerKnow;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.model.know.UserBasedRecommender;
import com.ulane.know.service.know.UkKnowTypeService;
import com.ulane.know.service.know.UkPerKnowService;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkPerKnowAction extends BaseAction {
	@Resource
	private UkPerKnowService ukPerKnowService;
	@Resource
	private DataSource dataSource;
	private UkPerKnow ukPerKnow;
	@Resource
	private AppUserService appUserService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	@Resource
	private UkKnowTypeService ukKnowTypeService;

	private static final Logger log = LoggerFactory
			.getLogger(UkPerKnowAction.class);

	private Long perKnowId;

	public Long getPerKnowId() {
		return perKnowId;
	}

	public void setPerKnowId(Long perKnowId) {
		this.perKnowId = perKnowId;
	}

	public UkPerKnow getUkPerKnow() {
		return ukPerKnow;
	}

	public void setUkPerKnow(UkPerKnow ukPerKnow) {
		this.ukPerKnow = ukPerKnow;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<UkPerKnow> list = ukPerKnowService.getAll(filter);

		Type type = new TypeToken<List<UkPerKnow>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		Gson gson = new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
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
				ukPerKnowService.remove(new Long(id));
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
		UkPerKnow ukPerKnow = ukPerKnowService.get(perKnowId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ukPerKnow));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ukPerKnow.getPerKnowId() == null) {
			ukPerKnowService.save(ukPerKnow);
		} else {
			UkPerKnow orgUkPerKnow = ukPerKnowService.get(ukPerKnow
					.getPerKnowId());
			try {
				BeanUtil.copyNotNullProperties(orgUkPerKnow, ukPerKnow);
				ukPerKnowService.save(orgUkPerKnow);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	public String shouCang() {
		String ids_know = getRequest().getParameter("perKnowId");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_ukSysKnow.knowId_L_EQ", ids_know);
		filter.addFilter("Q_userid_L_EQ",ContextUtil.getCurrentUserId().toString());
		filter.addFilter("Q_operateType_L_EQ",UkPerKnow.SHOUCANG.toString());
		List<UkPerKnow> perList = ukPerKnowService.getAll(filter);
		if(perList.size()==0){
			for (String id_know : ids_know.split(",")) {
				UkPerKnow ukPerKnow = new UkPerKnow();
				Long userId = ContextUtil.getCurrentUser().getUserId();
				ukPerKnow.setUserid(userId);
				ukPerKnow.setOperateTime(new Timestamp(System.currentTimeMillis()));
				ukPerKnow.setOperateType(UkPerKnow.SHOUCANG);
				ukPerKnow
						.setUkSysKnow(ukSysKnowService.get(Long.parseLong(id_know)));
				ukPerKnowService.save(ukPerKnow);
				setJsonString("{success:true,msg:'收藏成功!'}");
			}
		}else{
			setJsonString("{success:true,msg:'您已经收藏过该知识,请勿重新收藏!'}");
		}
		
		return SUCCESS;
	}

	public String tuiJian() {
		String ids = getRequest().getParameter("userid");
		String ids_know = getRequest().getParameter("perKnowId");
		for (String id_know : ids_know.split(",")) {
			for (String id_user : ids.split(",")) {
				UkPerKnow ukPerKnow = new UkPerKnow();
				Long userId = ContextUtil.getCurrentUser().getUserId();
				ukPerKnow.setUserid(Long.parseLong(id_user));
				ukPerKnow.setOperateTime(new Timestamp(System
						.currentTimeMillis()));
				ukPerKnow.setOperateType(UkPerKnow.TUIJIAN);
				ukPerKnow.setUkSysKnow(ukSysKnowService.get(Long
						.parseLong(id_know)));
				ukPerKnow.setReferee(userId);
				ukPerKnowService.save(ukPerKnow);
			}
		}
		return SUCCESS;
	}

	public String shouCangList() {
		getList("Q_userid_L_EQ", UkPerKnow.SHOUCANG);
		return SUCCESS;
	}

	public String dingYueList() {
		getList("Q_userid_L_EQ", UkPerKnow.DINGYUE);
		return SUCCESS;
	}

	/**
	 * 别人推荐给我的知识
	 * 
	 * @updator zhangyl
	 * @updatetime 2012年6月19日 15:53:15
	 */
	public String toMeTuiJianList() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_userid_L_EQ", ContextUtil.getCurrentUserId()
				.toString());
		filter.addFilter("Q_operateType_L_EQ", UkPerKnow.TUIJIAN.toString());
		filter.addSorted("operateTime", "desc");
		getJson(filter);
		return SUCCESS;
	}

	/**
	 * 我推荐给别人的知识
	 * 
	 * @return
	 */
	public String myTuiJianList() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_referee_L_EQ", ContextUtil.getCurrentUserId().toString());
		filter.addFilter("Q_operateType_L_EQ", UkPerKnow.TUIJIAN.toString());
		filter.addSorted("operateTime", "desc");
		getJson(filter);
		return SUCCESS;
	}

	public void getJson(QueryFilter filter) {
		List<UkPerKnow> list = ukPerKnowService.getAll(filter);
		for (UkPerKnow u : list) {
			if(u.getUserid()!= null){
				AppUser user = appUserService.get(u.getUserid());
				u.setAccepterName(user.getFullname());
			}
			if(u.getReferee()!= null){
				AppUser user = appUserService.get(u.getReferee());
				u.setStartName(user.getFullname());
			}
		}
		List<UkPerKnow> rsList = new ArrayList<UkPerKnow>();
		removeRepeat(list, rsList);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(rsList.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"ukSysKnow.enableTime", "ukSysKnow.pastTime", "operateTime",
				"ukSysKnow.updateDate" });
		buff.append(serializer.include("ukSysKnow.ukKnowTypes")
				.include("ukSysKnow.ukKnowKeywords")
				.include("ukSysKnow.ukKnowTemplate")
				.exclude("ukSysKnow.createBy")
				.exclude("ukSysKnow.updateBy").serialize(rsList));
		buff.append("}");
		jsonString = buff.toString();

	}

	public void getList(String name, Long typeValue) {
		QueryFilter filter = new QueryFilter(getRequest());
		Long userId = ContextUtil.getCurrentUser().getUserId();
		filter.addFilter(name, userId.toString());
		filter.addFilter("Q_operateType_L_EQ", typeValue.toString());
		filter.addSorted("operateTime", "desc");
		List<UkPerKnow> list = ukPerKnowService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"ukSysKnow.enableTime", "ukSysKnow.pastTime", "operateTime",
				"ukSysKnow.updateDate" });
		buff.append(serializer.include("ukSysKnow.ukKnowTypes")
				.include("ukSysKnow.ukKnowKeywords")
				.include("ukSysKnow.ukKnowTemplate")
				.exclude("ukSysKnow.createBy.department")
				.exclude("ukSysKnow.createBy.ulEmployee")
				.exclude("ukSysKnow.updateBy").serialize(list));
		buff.append("}");
		jsonString = buff.toString();
	}

	public void removeRepeat(List<UkPerKnow> source, List<UkPerKnow> target) {
		for (UkPerKnow tmp : source) {
			addToList(tmp, target);
		}
	}

	public void addToList(UkPerKnow uk, List<UkPerKnow> list) {
		for (UkPerKnow tmp : list) {
			String strSta = tmp.getStartName();
			String strAcc = tmp.getAccepterName();
			if (tmp.getKnowId().equals(uk.getKnowId())) {
				String accName = appUserService.get((uk.getUserid())).getFullname();
				String staName = appUserService.get((uk.getReferee())).getFullname();
				strSta += "," + staName;
				tmp.setStartName(strSta);
				strAcc += "," + accName;
				tmp.setAccepterName(strAcc);
				// tmp.setAccepterName(tmp.getAccepterName().concat(accName));
				// tmp.setStartName(tmp.getStartName().concat(staName));
				return;
			}
		}
		list.add(uk);
	}

	/**
	 * 根据知识类别去查找
	 * 
	 * @createtime 2012年6月20日 11:30:42
	 * @return String
	 */
	public String getListByType() {
		StringBuffer allTypes = new StringBuffer("");
		List<UkPerKnow> ukPerKnowList = new ArrayList<UkPerKnow>();
		Long typeId = 0L;
		if (getRequest().getParameter("typeId") != null) {
			typeId = Long.parseLong(getRequest().getParameter("typeId"));
			UkKnowType ukKnowType = ukKnowTypeService.get(typeId);
			allTypes.append(ukKnowType.getKnowTypeId().toString());
		}
		findChildType(typeId, allTypes); // 获得所有的子节点

		ukPerKnowList = ukPerKnowService.findPerKnowByType(allTypes.toString()); // 获得当前分类极其子节点下的所有收藏

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(ukPerKnowList.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"ukSysKnow.enableTime", "ukSysKnow.pastTime", "operateTime",
				"ukSysKnow.updateDate" });
		buff.append(serializer.include("ukSysKnow.ukKnowTypes")
				.include("ukSysKnow.ukKnowKeywords")
				.include("ukSysKnow.ukKnowTemplate")
				.exclude("ukSysKnow.createBy.department")
				.exclude("ukSysKnow.createBy.ulEmployee")
				.exclude("ukSysKnow.updateBy").serialize(ukPerKnowList));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 查询子节点
	 * 
	 * @param typeId
	 * @param result
	 */
	public void findChildType(Long typeId, StringBuffer result) {
		List<UkKnowType> child = ukKnowTypeService.findByParentId(typeId);
		if (child.size() == 0) {
			return;
		} else {
			for (UkKnowType type : child) {
				if (StringUtils.isNotEmpty(result.toString())) {
					result.append(",");
				}
				result.append(type.getKnowTypeId());
				findChildType(type.getKnowTypeId(), result);
			}
		}
	}

	/**
	 * 将list中的已标记删除的节点去掉
	 * 
	 * @param list
	 * @return
	 */
	public void removeDeleteKnow(Set<UkSysKnow> list) {
		Iterator<UkSysKnow> knowList = list.iterator();
		while (knowList.hasNext()) {
			if (knowList.next().getSysKnowStatus().equals("6"))
				knowList.remove();
		}
	}

	public String sysTuijian() {
		try {
			List<RecommendedItem> rs = new UserBasedRecommender(dataSource)
					.recommend(1, 10);
			for (RecommendedItem tmp : rs) {
				log.debug("ItemId: " + tmp.getItemID() + ", Value:"
						+ tmp.getValue());
			}
		} catch (TasteException e) {
			e.printStackTrace();
		}
		// UkSysKeywordExtract uske = new UkSysKeywordExtract(dataSource,
		// "UK_KEYWORD_CUSTOMER");
		// uske.prepare();
		// uske.extract(10);
		return SUCCESS;
	}
	
	//保存推荐
	public String saveTuiJian(){
		String userIdStr = getRequest().getParameter("userIds");			// 用户集合
		String knowId = getRequest().getParameter("knowId");			//知识ID
		String[] userIds = userIdStr.split(",");
		StringBuffer userName = new StringBuffer();
		if(userIdStr != null && userIdStr!= ""){
			for(String userId : userIds){
				QueryFilter filter = new QueryFilter();
				filter.addFilter("Q_userid_L_EQ", userId);
				filter.addFilter("Q_ukSysKnow.knowId_L_EQ", knowId);
				List<UkPerKnow> perKnowList =  ukPerKnowService.getAllNoRequest(filter);
				if(perKnowList.size()==0){
					UkPerKnow ukPerKnow = new UkPerKnow();
					ukPerKnow.setUserid(new Long(userId));
					ukPerKnow.setUkSysKnow(ukSysKnowService.get(new Long(knowId)));
					ukPerKnow.setOperateType(ukPerKnow.TUIJIAN);
					ukPerKnow.setOperateTime(new Timestamp(System.currentTimeMillis()));
					ukPerKnow.setReferee(ContextUtil.getCurrentUserId());
					ukPerKnowService.save(ukPerKnow);
				}else{
					AppUser appUser = appUserService.get(new Long(userId));
					userName.append(appUser.getFullname());
					userName.append(",");
				}
			}
			if(userName.length()>0){
				setJsonString("{success:true,msg:'推荐成功,但该知识已向     "+userName.deleteCharAt(userName.length()-1)+"  推荐过,请勿重新推荐'}");
			}else{
				setJsonString("{success:true,msg:'推荐成功!'}");
			}
		}else{
			setJsonString("{success:true,msg:'请选择被推荐人!'}");
		}
		
		return SUCCESS;
	}
	
	public String queryTuiJianList(){
		String start = getRequest().getParameter("start");						
		String limit = getRequest().getParameter("limit");
		String keyWordName = getRequest().getParameter("keyWordName");
		String recommender = getRequest().getParameter("recommender");
		String receiver = getRequest().getParameter("receiver");
		String startTime = getRequest().getParameter("Q_operateTime_D_GT");
		String endTime = getRequest().getParameter("Q_operateTime_D_LT");
		String tuijian = getRequest().getParameter("tuijian");
		
		List<UkPerKnow> list = ukPerKnowService.tuiJianList(new Integer(start),new Integer(limit), keyWordName, recommender, receiver, startTime, endTime, new Long(tuijian));
		for (UkPerKnow u : list) {
			if(u.getUserid()!= null){
				AppUser user = appUserService.get(u.getUserid());
				u.setAccepterName(user.getFullname());
			}
			if(u.getReferee()!= null){
				AppUser user = appUserService.get(u.getReferee());
				u.setStartName(user.getFullname());
			}
		}
		List<UkPerKnow> rsList = new ArrayList<UkPerKnow>();
		removeRepeat(list, rsList);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(ukPerKnowService.queryPerKnowCount(new Integer(start),new Integer(limit), keyWordName, recommender, receiver, startTime, endTime, new Long(tuijian))).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"ukSysKnow.enableTime", "ukSysKnow.pastTime", "operateTime",
				"ukSysKnow.updateDate", "readTime"});
		buff.append(serializer.include("ukSysKnow.ukKnowTypes")
				.include("ukSysKnow.ukKnowKeywords")
				.include("ukSysKnow.ukKnowTemplate")
				.exclude("ukSysKnow.createBy")
				.exclude("ukSysKnow.updateBy").serialize(rsList));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
}
