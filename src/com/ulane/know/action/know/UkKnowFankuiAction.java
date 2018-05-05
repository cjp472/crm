package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.FileAttachService;
import com.ulane.know.model.know.UkKnowFankui;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowFankuiService;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkKnowFankuiAction extends BaseAction {
	@Resource
	private UkKnowFankuiService ukKnowFankuiService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	private UkKnowFankui ukKnowFankui;
	@Resource
	private FileAttachService fileAttachService;
	@Resource
	private UkSysKnowService sysKnowService;
	@Resource
	protected AppUserService appUserService;

	private Long fankuiId;

	public Long getFankuiId() {
		return fankuiId;
	}

	public void setFankuiId(Long fankuiId) {
		this.fankuiId = fankuiId;
	}

	public UkKnowFankui getUkKnowFankui() {
		return ukKnowFankui;
	}

	public void setUkKnowFankui(UkKnowFankui ukKnowFankui) {
		this.ukKnowFankui = ukKnowFankui;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("fankuiTime", "desc");
		List<UkKnowFankui> list = ukKnowFankuiService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		int i = 0;
		for (UkKnowFankui type : list) {
			if (i++ > 0)
				buff.append(",");
			buff.append(jsonSer.include("ukKnowFankuiFile").serialize(type));
			buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
			buff.append(",\"userName\":\""
					+ appUserService.get(type.getUserid()).getFullname()+ "\"");
			buff.append("}");
		}
		buff.append("]}");
		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String dianpinglist() {

		QueryFilter filter = new QueryFilter(getRequest());
		String start = getRequest().getParameter("start");
		List<UkKnowFankui> list = ukKnowFankuiService.getAll(filter);

		Gson gson = new Gson();
		SimpleDateFormat simpleDate = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
		for (UkKnowFankui ukdp : list) {
			AppUser appuser = appUserService.get(ukdp.getUserid());
			buff.append("{commentId:'")
					.append(ukdp.getFankuiId())
					.append("',subject:")
					.append(gson.toJson("特殊"))
					// 为什么必须有这个字段才展示点评列表呢？
					.append(",content:")
					.append(gson.toJson(ukdp.getFankuiContent()))
					.append(",createtime:'")
					.append(simpleDate.format(ukdp.getFankuiTime()))
					.append("',fullname:'").append(appuser.getFullname())
					.append("',start:'").append(start).append("'},");
		}

		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");

		jsonString = buff.toString();
		// jsonString =
		// "{success:true,'totalCounts':3,result:[{commentId:'10160',subject:\"中方:菲外长称中国是许多南海国家威胁误导舆论\",content:\"我们不要惧怕战争！美国人自认他们的生命最珍贵，但他们的战争没停止过，美国人喜欢把战火燃烧在他国，但他们也必须知道，中国有能力把战火引向美国，一定程度上，美国对中 国是有顾忌的。菲佣别错判形势，中国打到你们妈里那（马尼拉）是很容易的。\",createtime:'2012-04-26 12:55:59',fullname:'超级管理员',start:'0'}]}";
		// jsonString =
		// "{success:true,'totalCounts':1,result:[{commentId:'1',subject:\"靠\",content:\"hahahhahah\",createtime:'2012-03-15 00:00:00',fullname:'1',start:'0'}]}";
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
				ukKnowFankuiService.remove(new Long(id));
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
		UkKnowFankui ukKnowFankui = ukKnowFankuiService.get(fankuiId);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ukKnowFankui));
		sb.deleteCharAt(sb.length() - 1);
		sb.append(",\"knowId\":" + ukKnowFankui.getKnowId()
				+ ",\"userName\":\""
				+ ContextUtil.getCurrentUser().getFullname() + "\"");
		sb.append("}}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	// /**
	// * 添加及保存操作
	// */
	// public String save(){
	// String fileIds=getRequest().getParameter("ukKnowFankui.fileIds");
	// if(StringUtils.isNotEmpty(fileIds)){
	// ukKnowFankui.getUkKnowFankuiFile().clear();
	// String[] ids=fileIds.split(",");
	// for(int i=0;i<ids.length;i++){
	// FileAttach fileAttach=fileAttachService.get(new Long(ids[i]));
	// ukKnowFankui.getUkKnowFankuiFile().add(fileAttach);
	// }
	// }
	//
	// String timestamp= getRequest().getParameter("ukKnowFankui.fankuiTime");
	// Timestamp ts = Timestamp.valueOf(timestamp);
	// if(ukKnowFankui.getFankuiId()==null){
	// ukKnowFankui.setFankuiTime(ts);
	// ukKnowFankui.setFileid(fileIds);
	// ukKnowFankui.setUserid(ContextUtil.getCurrentUserId());
	// ukKnowFankuiService.save(ukKnowFankui);
	// }else{
	// UkKnowFankui
	// orgUkKnowFankui=ukKnowFankuiService.get(ukKnowFankui.getFankuiId());
	// try{
	// BeanUtil.copyNotNullProperties(orgUkKnowFankui, ukKnowFankui);
	// orgUkKnowFankui.setFankuiTime(ts);
	// ukKnowFankuiService.save(orgUkKnowFankui);
	// }catch(Exception ex){
	// logger.error(ex.getMessage());
	// }
	// }
	// setJsonString("{success:true}");
	// return SUCCESS;
	//
	// }

	/**
	 * 添加及保存操作
	 */
	public String save() {
		// 被回复的新闻回复次数加1
		ukKnowFankui = new UkKnowFankui();
		Long knowId = Long.parseLong(getRequest().getParameter("knowId"));
		UkSysKnow know = ukSysKnowService.get(knowId);
		if (know.getSysKnowStatus().equals(5)) {
			know.setFankuiShu(know.getFankuiShu() + 1);
		}
		ukSysKnowService.save(know);
		
		ukKnowFankui.setFankuiContent(getRequest().getParameter("content"));
		ukKnowFankui.setFankuiTitle(getRequest().getParameter("title"));

		String ids_file = getRequest().getParameter("ids_file");
		String ids_know = getRequest().getParameter("ids_know");
//		System.out.println("ids_file:" + ids_file);
		if (ids_file != null && !ids_file.equals(""))
			for (String tmp_file_id : ids_file.split(",")) {
				FileAttach tmp_file = fileAttachService.get(Long
						.parseLong(tmp_file_id));
				ukKnowFankui.getUkKnowFankuiFile().add(tmp_file);
			}
		if (ids_know != null && !ids_know.equals(""))
			for (String tmp_know_id : ids_know.split(",")) {
				UkSysKnow tmp_know = ukSysKnowService.get(Long
						.parseLong(tmp_know_id));
				ukKnowFankui.getReKnow().add(tmp_know);
			}
		String fankuiId = getRequest().getParameter("funkuiId");
		if(fankuiId != null && fankuiId != ""){
			ukKnowFankui.setFankuiId(new Long(fankuiId));
		}
		ukKnowFankui.setUserid(ContextUtil.getCurrentUserId());
		ukKnowFankui.setFankuiTime(new Timestamp(new Date().getTime()));
		ukKnowFankui.setUkSysKnow(know);
		ukKnowFankui.setKnowStatus(1);
		ukKnowFankuiService.save(ukKnowFankui);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String saveInfo() {
		// 被回复的新闻回复次数加1
		ukKnowFankui = new UkKnowFankui();
		Long knowId = Long.parseLong(getRequest().getParameter("ukKnowFankui.ukSysKnow.knowId"));
		UkSysKnow know = ukSysKnowService.get(knowId);
		if (know.getSysKnowStatus().equals(5)) {
			know.setFankuiShu(know.getFankuiShu() + 1);
		}
		ukSysKnowService.save(know);
		
		ukKnowFankui.setFankuiContent(getRequest().getParameter("ukKnowFankui.fankuiContent"));
		ukKnowFankui.setFankuiTitle(know.getTiTle());

		String ids_file = getRequest().getParameter("ids_file");
		String ids_know = getRequest().getParameter("ids_know");
//		System.out.println("ids_file:" + ids_file);
		if (ids_file != null && !ids_file.equals(""))
			for (String tmp_file_id : ids_file.split(",")) {
				FileAttach tmp_file = fileAttachService.get(Long
						.parseLong(tmp_file_id));
				ukKnowFankui.getUkKnowFankuiFile().add(tmp_file);
			}
		if (ids_know != null && !ids_know.equals(""))
			for (String tmp_know_id : ids_know.split(",")) {
				UkSysKnow tmp_know = ukSysKnowService.get(Long
						.parseLong(tmp_know_id));
				ukKnowFankui.getReKnow().add(tmp_know);
			}
		String fankuiId = getRequest().getParameter("funkuiId");
		if(fankuiId != null && fankuiId != ""){
			ukKnowFankui.setFankuiId(new Long(fankuiId));
		}
		ukKnowFankui.setUserid(ContextUtil.getCurrentUserId());
		ukKnowFankui.setFankuiTime(new Timestamp(new Date().getTime()));
		ukKnowFankui.setUkSysKnow(know);
		ukKnowFankui.setKnowStatus(1);
		ukKnowFankuiService.save(ukKnowFankui);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 显示反馈信息列表
	 */
	public String fankuilist() {

		QueryFilter filter = new QueryFilter(getRequest());
		// String start = getRequest().getParameter("start");
		filter.addSorted("fankuiTime", "asc");
		List<UkKnowFankui> list = ukKnowFankuiService.getAll(filter);
		Gson gson = new Gson();
		SimpleDateFormat simpleDate = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
		for (UkKnowFankui knowFankui : list) {
			buff.append("{fankuiId:'")
					.append(knowFankui.getFankuiId())
					.append("',fankuiContent:")
					.append(gson.toJson(knowFankui.getFankuiContent()))
					.append(",userid:")
					.append(gson.toJson(appUserService.get(
							knowFankui.getUserid()).getFullname()))
					.append(",fankuiTime:'")
					.append(simpleDate.format(knowFankui.getFankuiTime()))
					.append("'},");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String fankuisave() {
		// 反馈的次数加1
		UkSysKnow sysKnow = sysKnowService.get(ukKnowFankui.getKnowId());

		if ("".equals(sysKnow.getFankuiShu()) || null == sysKnow.getFankuiShu()) {
			sysKnow.setFankuiShu(new Long(1));
			sysKnowService.merge(sysKnow);
		} else {
			sysKnow.setFankuiShu(sysKnow.getFankuiShu() + 1);
			sysKnowService.merge(sysKnow);
		}
		ukKnowFankui.setUkSysKnow(sysKnow);
		ukKnowFankui.setUserid(ContextUtil.getCurrentUserId());
		ukKnowFankui.setFankuiTime(new Timestamp(System.currentTimeMillis()));
		ukKnowFankuiService.save(ukKnowFankui);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String listSysKnow() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_ukKnowFankuis.userid_L_EQ", ContextUtil.getCurrentUserId().toString());
//		filter.addSorted("viewCount", "desc");
		filter.addSorted("ukKnowFankuis.fankuiTime", "desc");
		List<UkSysKnow> list = sysKnowService.getAll(filter);
		Set set = new HashSet();// 保持快速去重复值，必须用HashSet
		for (Iterator it = list.iterator(); it.hasNext();) {
			UkSysKnow item = (UkSysKnow) it.next();
			if (set.add(item) == false) {
				it.remove();
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime" , "ukKnowFankuis.fankuiTime"});
		buff.append(serializer.include("ukKnowTypes").include("ukKnowKeywords").include("ukKnowFankuis.fankuiTime")
				.exclude("createBy.department").exclude("createBy.ulEmployee")
				.exclude("ukSysKnow.updateBy").serialize(list));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;

	}

}
