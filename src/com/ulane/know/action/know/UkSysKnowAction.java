package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.io.File;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.AppRoleService;
import com.htsoft.oa.service.system.DictionaryService;
import com.htsoft.oa.service.system.FileAttachService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.know.model.know.UkDimensionalityKnow;
import com.ulane.know.model.know.UkKnowApply;
import com.ulane.know.model.know.UkKnowCollectType;
import com.ulane.know.model.know.UkKnowDianping;
import com.ulane.know.model.know.UkKnowDimensionality;
import com.ulane.know.model.know.UkKnowFankui;
import com.ulane.know.model.know.UkKnowKeyword;
import com.ulane.know.model.know.UkKnowTemplate;
import com.ulane.know.model.know.UkKnowType;
import com.ulane.know.model.know.UkPerKnow;
import com.ulane.know.model.know.UkRelativeKnow;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkDimensionalityKnowService;
import com.ulane.know.service.know.UkKnowApplyService;
import com.ulane.know.service.know.UkKnowDimensionalityService;
import com.ulane.know.service.know.UkKnowKeywordService;
import com.ulane.know.service.know.UkKnowTemplateService;
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
public class UkSysKnowAction extends BaseAction {
	@Resource
	private UkSysKnowService ukSysKnowService;
	@Resource
	private UkKnowTemplateService ukKnowTemplateService;
	@Resource
	private VelocityEngine flowVelocityEngine;
	@Resource
	private FileAttachService fileAttachService;
	@Resource
	private UkKnowKeywordService ukKnowKeywordService;
	@Resource
	private UkKnowApplyService ukKnowApplyService;

	@Resource
	private UkPerKnowService ukPerKnowService;
	@Resource
	private UkKnowTypeService ukKnowTypeService;
	@Resource
	private AppRoleService appRoleService;
	
	@Resource
	private UkDimensionalityKnowService ukDimensionalityKnowService;
	@Resource
	private UkKnowDimensionalityService ukKnowDimensionalityService;
	@Resource
	private UlDepartmentService ulDepartmentService;
	@Resource
	private DictionaryService dictionaryService;
	
	private UkSysKnow ukSysKnow;

	private Long knowId;

	public Long getKnowId() {
		return knowId;
	}

	public void setKnowId(Long knowId) {
		this.knowId = knowId;
	}

	public UkSysKnow getUkSysKnow() {
		return ukSysKnow;
	}

	public void setUkSysKnow(UkSysKnow ukSysKnow) {
		this.ukSysKnow = ukSysKnow;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(serializer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String listApprove() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(serializer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	
	/**
	 * 排行榜 显示列表
	 * 
	 * @author liuzhimin
	 * @createtime 2012年5月15日
	 */
	public String releaseList() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addFilter("Q_sysKnowStatus_N_EQ", "5");// 5表示已发布的
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;

	}
	//归档知识列表
	public String listGuiDang() {
		String dimenId = getRequest().getParameter("dimenId");
		String mark = getRequest().getParameter("mark");
		String keyWord = getRequest().getParameter("ukKnowKeyWord");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addFilter("Q_sysKnowStatus_N_EQ", "7");// 7表示归档的
		filter.addSorted("filingTime", "desc");
		
		if(keyWord!=null && !keyWord.equals("")){
//			filter.addFilter("Q_ukKnowKeywords.keyWord_S_LK", keyWord);
			filter.addFilter("Q_knowKeyWords_S_LK", keyWord);
		}
		
		if(mark!=null && !mark.equals("")){
			if(mark.equals("1")){
				if(dimenId!=null)
					filter.addFilter("Q_ukDimensionalityKnows.ukKnowDimensionality.dimensionalityId_L_EQ", dimenId);
				else
					filter.addFilter("Q_ukDimensionalityKnows.ukKnowDimensionality.dimensionalityId_L_GE", "0");
			}
			else if(mark.equals("2")){
				if(dimenId!=null)
					filter.addFilter("Q_ukDimensionalityKnows.ulDepartment.depid_L_EQ", dimenId);
				else
					filter.addFilter("Q_ukDimensionalityKnows.ulDepartment.depid_L_GE", "0");
			}
			else if(mark.equals("3")){
				if(dimenId!=null)
					filter.addFilter("Q_ukDimensionalityKnows.dictionary.dicId_L_EQ", dimenId);
				else{
					filter.addFilter("Q_ukDimensionalityKnows.dictionary.dicId_L_GE", dimenId);
					filter.addFilter("Q_ukDimensionalityKnows.dictionary.mapName_S_EQ", "ZW001");
				}
			}
		}
		
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate", "filingTime" });
		buff.append(serializer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	/**
	 * 显示知识地图的列表
	 * 
	 * @return
	 */
	public String listMap() {
		String dimenId = getRequest().getParameter("dimenId");
		String mark = getRequest().getParameter("mark");
		String keyWord = getRequest().getParameter("ukKnowKeyWord");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addFilter("Q_sysKnowStatus_N_EQ", "5");// 5表示已发布的
		filter.addSorted("viewCount", "desc");
		
		if(keyWord!=null && !keyWord.equals("")){
//			filter.addFilter("Q_ukKnowKeywords.keyWord_S_LK", keyWord);
			filter.addFilter("Q_knowKeyWords_S_LK", keyWord);
		}
		
		if(mark!=null && !mark.equals("")){
			if(mark.equals("1")){
				if(dimenId!=null)
					filter.addFilter("Q_ukDimensionalityKnows.ukKnowDimensionality.dimensionalityId_L_EQ", dimenId);
				else
					filter.addFilter("Q_ukDimensionalityKnows.ukKnowDimensionality.dimensionalityId_L_GE", "0");
			}
			else if(mark.equals("2")){
				if(dimenId!=null)
					filter.addFilter("Q_ukDimensionalityKnows.ulDepartment.depid_L_EQ", dimenId);
				else
					filter.addFilter("Q_ukDimensionalityKnows.ulDepartment.depid_L_GE", "0");
			}
			else if(mark.equals("3")){
				if(dimenId!=null)
					filter.addFilter("Q_ukDimensionalityKnows.dictionary.dicId_L_EQ", dimenId);
				else{
					filter.addFilter("Q_ukDimensionalityKnows.dictionary.dicId_L_GE", dimenId);
					filter.addFilter("Q_ukDimensionalityKnows.dictionary.mapName_S_EQ", "ZW001");
				}
			}
//			List listIds = ukDimensionalityKnowService.findKnowDimenKnowid(dimenId, mark);
//			if(listIds.size()>0){
//				String strIds = listIds.toString();
//				strIds = strIds.substring(1, strIds.length() - 1).trim();
//				filter.addFilter("Q_knowId_S_LIN", strIds);
//			}else{
//				filter.addFilter("Q_knowId_S_LIN", "-1");
//			}
		}
		
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(serializer
				.include("knowId","tiTle","busiType","knowKeyWords","enableTime","pastTime","sysKnowStatus","viewCount","dianpingCount","sysKnowComment","plus1","plus2","plus3","plus4","plus5","plus6","plus7","plus8","isDel","sysKnowVersion","createDate","updateDate","userid","fankuiShu","busiTypeMapName","delRemark","delReason","accessManage","averageCount")
				.include("ukKnowApprove.knowApproveId","ukKnowApprove.runid","ukKnowTypes.knowTypeId","ukKnowTypes.name","ukKnowKeywords.keywordId","ukKnowKeywords.keyWord","ukKnowApplys.applyId","ukKnowApplys.runid","ukKnowTemplate.knowTmpId","ukKnowTemplate.tmpName","createBy.userId","createBy.fullname","fileAttachs.fileId","fileAttachs.fileName","fileAttachs.filePath")
				.exclude("*")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 通过我的知识维度查找我的知识
	 * @author wangzhongjin
	 * @time 2012年11月10日15:50:28
	 * @return
	 */
	public String listMyKnow() {
		String start = getRequest().getParameter("start");
		String limit = getRequest().getParameter("limit");
		String dimenId = getRequest().getParameter("dimenId");
		String mark = getRequest().getParameter("mark");
		String title = getRequest().getParameter("Q_tiTle_S_LK");
		String keyWordName = getRequest().getParameter("ukKnowKeyWord");
		String dimStrIds = null;
		
		StringBuffer sb = new StringBuffer();
		List<UkKnowDimensionality> ukdList = ukKnowDimensionalityService.findDimenRole(new Long(0));
		for (UkKnowDimensionality ukKnowDimen : ukdList) {
			sb.append(ukKnowDimen.getDimensionalityId()+",");
			sb.append(findChildrenByRole(ukKnowDimen.getDimensionalityId()));
		}
		if(!ukdList.isEmpty()){
			sb.deleteCharAt(sb.length() - 1);
		}
		dimStrIds = sb.toString();
		
		List<UkSysKnow> list = ukSysKnowService.findMyKnow(new Integer(start), new Integer(limit), title, keyWordName, mark, dimenId, dimStrIds);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(ukSysKnowService.countMyKnow(new Integer(start), new Integer(limit), title, keyWordName, mark, dimenId, dimStrIds)).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(serializer
				.include("knowId","tiTle","busiType","knowKeyWords","enableTime","pastTime","sysKnowStatus","viewCount","dianpingCount","sysKnowComment","plus1","plus2","plus3","plus4","plus5","plus6","plus7","plus8","isDel","sysKnowVersion","createDate","updateDate","userid","fankuiShu","busiTypeMapName","delRemark","delReason","accessManage","averageCount")
				.include("ukKnowApprove.knowApproveId","ukKnowApprove.runid","ukKnowTypes.knowTypeId","ukKnowTypes.name","ukKnowKeywords.keywordId","ukKnowKeywords.keyWord","ukKnowApplys.applyId","ukKnowApplys.runid","ukKnowTemplate.knowTmpId","ukKnowTemplate.tmpName","createBy.userId","createBy.fullname","fileAttachs.fileId","fileAttachs.fileName","fileAttachs.filePath")
				.exclude("*")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	/**
	 * 选择子项
	 * @param parentId
	 * @return
	 */
	public String findChildrenByRole(Long parentId) {
		StringBuffer buff = new StringBuffer("");
		List<UkKnowDimensionality> list = ukKnowDimensionalityService.findDimenRole(parentId);
		if (list.isEmpty() || list.size() == 0) {
			return buff.toString();
		}else{
			for(UkKnowDimensionality ukKnowDimen : list){
				buff.append(ukKnowDimen.getDimensionalityId()+",");
				buff.append(findChildrenByRole(ukKnowDimen.getDimensionalityId()));
			}
//			buff.deleteCharAt(buff.length() - 1);
			return buff.toString();
		}
	}

	/**
	 * 从垃圾箱批量删除(假删)
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				// ukSysKnowService.delete_real(new Long(id));
				// ukSysKnowService.remove(Long.parseLong(id));
				UkSysKnow usk = ukSysKnowService.get(Long.parseLong(id));
				usk.setIsDel("true");
				ukSysKnowService.save(usk);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	/**
	 * 从垃圾箱批量删除(真删)
	 * 
	 * @return
	 */
	public String multiDelRs() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) { 
				ukSysKnowService.delete_real(new Long(id));
//				ukSysKnowService.delete_dimensionality_know(new Long(id));
//				UkSysKnow ukSysKnow = ukSysKnowService.get(Long.parseLong(id));
//				ukSysKnow.getUkDimensionalityKnows().clear();
//				ukSysKnow = ukSysKnowService.save(ukSysKnow);
				ukSysKnowService.remove(new Long(id));
				
//				UkSysKnow usk = ukSysKnowService.get(Long.parseLong(id));
//				usk.setIsDel("true");
//				ukSysKnowService.save(usk);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	/**
	 * 注销
	 * 
	 * @return
	 */
	public String multiZhuXiao() {
		String[] ids = getRequest().getParameterValues("ids");
		
		if (ids != null) {
			for (String id : ids) {
				UkSysKnow usk = ukSysKnowService.get(Long.parseLong(id));
				usk.setSysKnowStatus(8);
				ukSysKnowService.save(usk);
			}
		}
		
		jsonString = "{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 批量恢复
	 * 
	 * @return
	 */
	public String recover() {
		String[] ids = getRequest().getParameterValues("ids");
		Integer status = 5;// 表示已发布状态
		if (ids != null) {
			for (String id : ids) {
				UkSysKnow orgUkSysKnow = ukSysKnowService.get(new Long(id));
				try {
					orgUkSysKnow.setSysKnowStatus(status);
					ukSysKnowService.save(orgUkSysKnow);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
					ex.printStackTrace();
				}
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 设置过期知识的有效期
	 * 
	 * @return
	 */
	public String setPastKnow() {
		String ids = getRequest().getParameter("setTimeKnowIds");
		String[] knowId = ids.split(",");
		for (String id : knowId) {
			UkSysKnow orgUkSysKnow = ukSysKnowService.get(new Long(id));
			try {
				orgUkSysKnow.setEnableTime(ukSysKnow.getEnableTime());
				orgUkSysKnow.setPastTime(ukSysKnow.getPastTime());
				ukSysKnowService.merge(orgUkSysKnow);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
				ex.printStackTrace();
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
		UkSysKnow ukSysKnow = ukSysKnowService.get(knowId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		sb.append(jsonSer.serialize(ukSysKnow));
		// sb.append(gson.toJson(ulBbsHuati));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ukSysKnow.getKnowId() == null) {
			ukSysKnow.setIsDel("false");
			ukSysKnowService.save(ukSysKnow);
		} else {
			UkSysKnow orgUkSysKnow = ukSysKnowService
					.get(ukSysKnow.getKnowId());
			try {
				BeanUtil.copyNotNullProperties(orgUkSysKnow, ukSysKnow);
				ukSysKnowService.save(orgUkSysKnow);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	/**
	 * 最新知识 显示列表
	 * 
	 * @author zhangyl
	 * @createtime 2012年5月15日 11:02:55
	 */
	public String newList() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addFilter("Q_sysKnowStatus_N_EQ", "5");// 5表示已发布的
		filter.addSorted("enableTime", "desc");
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;

	}

	/**
	 * 排行榜 显示列表
	 * 
	 * @author liuzhimin
	 * @createtime 2012年5月15日
	 */
	public String paiHangList() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addSorted("viewCount", "desc");
		filter.addFilter("Q_sysKnowStatus_N_EQ", "5");// 5表示已发布的
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;

	}

	/**
	 * 过期知识 显示列表
	 * 
	 * @author liuzhimin
	 * @createtime 2012年5月16日
	 */
	public String guoQiList() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_sysKnowStatus_N_EQ", "5");// 5表示已发布的
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String dateStr = sdf.format(new Date());// 获得当前时间,并将之格式化为yyyy-MM-dd格式
		filter.addFilter("Q_pastTime_DL_LE", dateStr);
		filter.addSorted("pastTime", "ASC");
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		
//		String title = getRequest().getParameter("title");
//		String ukKnowTypeName = getRequest().getParameter("ukKnowTypeName");
//		String ukKnowKeyWord = getRequest().getParameter("ukKnowKeyWord");
//		String minPastTime = getRequest().getParameter("minPastTime");
//		String maxPastTime = getRequest().getParameter("maxPastTime");
//		List<UkSysKnow> list = ukSysKnowService.expiredKnow(ukKnowKeyWord,ukKnowTypeName, minPastTime, maxPastTime,title);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;

	}

	/**
	 * 垃圾箱 显示列表
	 * 
	 * @author liuzhimin
	 * @createtime 2012年5月16日
	 */
	public String rubbishList() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		Integer status = 6;// 表示已作废的
		filter.addFilter("Q_sysKnowStatus_N_EQ", status.toString());
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;

	}

	/**
	 * 知识点评 显示列表
	 * 
	 * @author liuzhimin
	 * @createtime 2012年5月16日
	 */
	public String dianPingList() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addSorted("dianpingCount", "desc");
		filter.addFilter("Q_sysKnowStatus_N_EQ", "5");// 5表示已发布的
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;

	}

	/**
	 * 我的收藏显示列表
	 * 
	 * @author liuzhimin
	 * @createtime 2012年5月21日
	 */
	public String woDeShouCangList() {
		// 获得当前用户的ID
		Long userId = ContextUtil.getCurrentUser().getUserId();
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addFilter("Q_userid_L_EQ", userId.toString());
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);

		Type type = new TypeToken<List<UkSysKnow>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;

	}

	/**
	 * 我的订阅显示列表
	 * 
	 * @author chenfeng
	 * @createtime 2012年5月21日
	 */
	public String woDeDingYueList() {
		// 获得当前用户的ID
		Long userId = ContextUtil.getCurrentUser().getUserId();
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addFilter("Q_userid_L_EQ", userId.toString());
		filter.addFilter("Q_operateType_L_EQ", "1");
		List<UkPerKnow> list = ukPerKnowService.getAll(filter);

		// Type type = new TypeToken<List<UkSysKnow>>() {}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:[");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		int i = 0;
		for (UkPerKnow ukPerKnow : list) {
			buff.append(jsonSer.serialize(ukPerKnow.getUkSysKnow()));
			if (i > 0)
				buff.append(",");
			i++;
		}
		if (list.size() > 0)
			buff.deleteCharAt(buff.length() - 1);
		buff.append("]}");

		jsonString = buff.toString();
		return SUCCESS;

	}

	/**
	 * 下拉列表框
	 * 
	 * @return
	 */
	public String combo() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (UkSysKnow type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getKnowId()).append("','")
					.append(type.getTiTle()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		logger.info("sb:" + sb.toString());
		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String getCollect() {
		ukSysKnowService.saveCount(knowId);
		UkSysKnow ukSysKnow = ukSysKnowService.get(knowId);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		ser.transform(new DateTransformer("yyyy-MM-dd"), "enableTime");
		ser.transform(new DateTransformer("yyyy-MM-dd"), "pastTime");
		ser.transform(new DateTransformer("yyyy-MM-dd"), "createDate");
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.include("knowId","knowKeyWords","tiTle","busiType","enableTime","pastTime","sysKnowStatus","viewCount","dianpingCount","sysKnowComment","plus1","plus2","plus3","plus4","plus5","plus6","plus7","plus8","isDel","sysKnowVersion","createDate","updateDate","userid","fankuiShu","busiTypeMapName","delRemark","delReason","accessManage","contentType")
				.include("ukRelativeKnows.knowId","ukRelativeKnows.tiTle","ukRelativeKnows.sysKnowStatus","ukRelativeKnows.pastTime","ukKnowApprove.knowApproveId","ukKnowTypes.knowTypeId","ukKnowTypes.name","ukDimensionalityKnows.dimensionalityKnowId","ukDimensionalityKnows.dimName","ukDimensionalityKnows.ukKnowDimensionality.dimensionalityId","ukDimensionalityKnows.ulDepartment.depid","ukDimensionalityKnows.dictionary.dicId","ukKnowKeywords.keywordId","ukKnowKeywords.keyWord","ukKnowApplys.applyId","ukKnowTemplate","createBy.userId","createBy.fullname","fileAttachs.fileId","fileAttachs.fileName","fileAttachs.filePath","fileAttachs.ext","fileAttachs.totalBytes")
				.exclude("*").serialize(ukSysKnow));
//		sb.deleteCharAt(sb.length() - 1);
//		java.util.Set<FileAttach> fs = ukSysKnow.getFileAttachs();
//		java.util.Set<UkKnowKeyword> kw = ukSysKnow.getUkKnowKeywords();
//		java.util.Set<UkSysKnow> rk = ukSysKnow.getUkRelativeKnows();
//		java.util.Set<UkKnowType> kt = ukSysKnow.getUkKnowTypes();
//		if (fs.size() > 0)
//			sb.append(",\"fileAttachs\":").append(ser.serialize(fs)); // 获得附件
//		if (kw.size() > 0)
//			sb.append(",\"ukKnowKeywords\":").append(ser.serialize(kw)); // 获得关键字
//		if (rk.size() > 0)
//			sb.append(",\"ukRelativeKnows\":").append(ser.serialize(rk)); // 相关知识
//		if (kt.size() > 0)
//			sb.append(",\"ukKnowTypes\":").append(ser.serialize(kt)); // 知识分类
//		sb.append("}}");
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 知识采集 动态VM调用方法
	 * 
	 * @return formHtml
	 * @throws Exception
	 * @author zhangyl
	 * @createtime 2012年5月24日 17:21:56
	 */
	public String getVm() {
		String knowTmpId = getRequest().getParameter("knowTmpId");
		if (knowTmpId != null) {
			// 表单变量
			UkKnowTemplate ukKnowTemplate = new UkKnowTemplate();
			ukKnowTemplate = ukKnowTemplateService.get(new Long(knowTmpId));
			Map formVars = new HashMap();
			HttpServletRequest request = getRequest();

			String formUiJs = null;
			// 节点路径
			String nodeVmPath = ukKnowTemplate.getKnowVersion() + ".vm";
			// 程序绝对路径
			String absPath = "FormVm/22850/" + knowTmpId + "/";
			formVars.put("activityName", knowTmpId);
			String vmPath = absPath + nodeVmPath;
			String proPath = AppUtil.getAppAbsolutePath() + "WEB-INF/FlowForm/";

			String checkPath = proPath+vmPath;
			File f  = new File(checkPath);
			if(f.exists()){
				try {
					formUiJs = VelocityEngineUtils.mergeTemplateIntoString(
							flowVelocityEngine, vmPath, "UTF-8", formVars);
					request.setAttribute("formUiJs", formUiJs);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
		}
		return "formExt";

	}
	
	
	/**
	 * 知识查看   动态VM调用方法(避免与知识采集查看页面冲突,用于查看知识里面的相关知识)
	 * 
	 * @return formHtml
	 * @throws Exception
	 * @author zhangyl
	 * @createtime 2012年5月24日 17:21:56
	 */
	public String getVmShow() {
		String knowTmpId = getRequest().getParameter("knowTmpId");
		if (knowTmpId != null) {
			// 表单变量
			UkKnowTemplate ukKnowTemplate = new UkKnowTemplate();
			ukKnowTemplate = ukKnowTemplateService.get(new Long(knowTmpId));
			Map formVars = new HashMap();
			HttpServletRequest request = getRequest();

			String formUiJs = null;
			// 节点路径
			String nodeVmPath = ukKnowTemplate.getKnowVersion() + ".vm";
			// 程序绝对路径
			String absPath = "FormVm/22850/" + knowTmpId + "/";
			formVars.put("activityName", knowTmpId);
			String vmPath = absPath + nodeVmPath;
			String proPath = AppUtil.getAppAbsolutePath() + "WEB-INF/FlowForm/";

			String checkPath = proPath+vmPath;
			File f  = new File(checkPath);
			if(f.exists()){
				try {
					formUiJs = VelocityEngineUtils.mergeTemplateIntoString(
							flowVelocityEngine, vmPath, "UTF-8", formVars);
					request.setAttribute("formUiJs", formUiJs);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			
		}
		return "knowTemplateShow";

	}

	/**
	 * 知识采集显示列表
	 * 
	 * @author zhangyl
	 * @createtime 2012年5月28日 09:50:55
	 */
	public String ukCollectlist() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_sysKnowStatus_N_NEQ", "6");
		filter.addFilter("Q_isDel_S_EQ", "false");
		filter.addSorted("knowId", "desc");
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);

		// Type type = new TypeToken<List<UkSysKnow>>() {
		// }.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), "enableTime");
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), "pastTime");
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), "createDate");
		buff.append(jsonSer.include("ukKnowApplys").serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 知识采集 添加及保存操作
	 * 
	 * @author zhangyl
	 * @createtime 2012年5月28日 11:06:56
	 */
	public String saveCollect() {
		//知识维度    1代表维度    2代表机构    3代表岗位
		String weidus = getRequest().getParameter("weidu");
		String weiduname = getRequest().getParameter("weiduname");
		String knowTypeId = getRequest().getParameter("knowTypeId_"); // 知识分类
		String dimensionalKnowId = getRequest().getParameter("dimensionality_know_id");
		String knowKeyWords = getRequest().getParameter("knowKeyWords");
//		List<UkDimensionalityKnow> lists = new ArrayList<UkDimensionalityKnow>();
		
		String weidu = weidus.replaceAll("\\],\\[", "\\]-\\[").substring(1,weidus.length()-1);
		String[] weiduid = weidu.split("-");
		ukSysKnow.getUkDimensionalityKnows().clear();
		for (int i=0; i<weiduid.length; i++){
			String[] weidu_id = weiduid[i].replaceAll("\\[|\\]", "").split(",");
			UkDimensionalityKnow ukDimensionalityKnow;
			if (dimensionalKnowId != null && !dimensionalKnowId.equals("")){
				ukDimensionalityKnow = ukDimensionalityKnowService.get(Long.parseLong(dimensionalKnowId));
			}else {
				ukDimensionalityKnow = new UkDimensionalityKnow();
			}
			
			if (!weidu_id[1].equals("") && weidu_id[1] != null){
				if (weidu_id[1].equals("1")){
					UkKnowDimensionality ukKnowDimensionality = ukKnowDimensionalityService.get(Long.parseLong(weidu_id[0]));
					
					ukDimensionalityKnow.setUkSysKnow(ukSysKnow);
					ukDimensionalityKnow.setUkKnowDimensionality(ukKnowDimensionality);
					ukDimensionalityKnow.setDimName(weiduname);
					ukDimensionalityKnow.setDimensionalityType(new Long(weidu_id[1]));
					ukSysKnow.getUkDimensionalityKnows().add(ukDimensionalityKnow);
				}
				
				if (weidu_id[1].equals("2")){
					UlDepartment uldepartment = ulDepartmentService.get(Long.parseLong(weidu_id[0]));
					ukDimensionalityKnow.setUkSysKnow(ukSysKnow);
					ukDimensionalityKnow.setUlDepartment(uldepartment);
					ukDimensionalityKnow.setDimName(weiduname);
					ukDimensionalityKnow.setDimensionalityType(new Long(weidu_id[1]));
					ukSysKnow.getUkDimensionalityKnows().add(ukDimensionalityKnow);
				}
				
				if (weidu_id[1].equals("3")){
					Dictionary dictionary = dictionaryService.get(Long.parseLong(weidu_id[0]));
					ukDimensionalityKnow.setUkSysKnow(ukSysKnow);
					ukDimensionalityKnow.setDictionary(dictionary);
					ukDimensionalityKnow.setDimName(weiduname);
					ukDimensionalityKnow.setDimensionalityType(new Long(weidu_id[1]));
					ukSysKnow.getUkDimensionalityKnows().add(ukDimensionalityKnow);
				}
			}
			
		}
//		String busiTypeItemIndex = getRequest().getParameter("busiTypeItemIndex"); 	//业务分类数据字典索引项
//		String busiTypeMapName = getRequest().getParameter("busiTypeMapName");		//业务分类数据字典MapName

		String applyId = getRequest().getParameter("applyId"); // 知识申请单
		if (!"-1".equals(applyId)) {
			if (StringUtils.isNotEmpty(applyId)) {
				ukSysKnow.getUkKnowApplys().clear();
				String[] ids = applyId.split(",");
				for (int i = 0; i < ids.length; i++) {
					UkKnowApply ukKnowApply = ukKnowApplyService.get(new Long(ids[i]));
					ukSysKnow.getUkKnowApplys().add(ukKnowApply);
				}
			}
		}

		String sysKnowKeyWordIds = getRequest().getParameter("sysKnowKeyWordIds"); // 关键字
		if (StringUtils.isNotEmpty(sysKnowKeyWordIds)) {
			ukSysKnow.getUkKnowKeywords().clear();
			String[] ids = sysKnowKeyWordIds.split(",");
			for (int i = 0; i < ids.length; i++) {
				UkKnowKeyword ukKnowKeyword = ukKnowKeywordService.get(new Long(ids[i]));
				ukSysKnow.getUkKnowKeywords().add(ukKnowKeyword);
			}
		}
		
		//
		// String fileIds = getRequest().getParameter("fileIds"); // 附件
		// if (StringUtils.isNotEmpty(fileIds)) {
		// ukSysKnow.getFileAttachs().clear();
		// String[] ids = fileIds.split(",");
		// for (int i = 0; i < ids.length; i++) {
		// FileAttach fileAttach = fileAttachService.get(new Long(ids[i]));
		// ukSysKnow.getFileAttachs().add(fileAttach);
		// }
		// }

		String knowDetails = getRequest().getParameter("knowDetails");
		if (StringUtils.isNotEmpty(knowDetails)) {
			Gson gson = new Gson();
			UkSysKnow[] detailArr = (UkSysKnow[]) gson.fromJson(knowDetails,
					UkSysKnow[].class);
			ukSysKnow.getUkRelativeKnows().clear();
			if (detailArr != null) {
				for (UkSysKnow detail : detailArr) {
					UkSysKnow know = ukSysKnowService.get(detail.getKnowId());
					ukSysKnow.getUkRelativeKnows().add(know);
				}
			}
		}

		String fileDetails = getRequest().getParameter("fileDetails");
		if (StringUtils.isNotEmpty(fileDetails)) {
			Gson gson = new Gson();
			FileAttach[] detailArr = (FileAttach[]) gson.fromJson(fileDetails,FileAttach[].class);
			ukSysKnow.getFileAttachs().clear();
			if (detailArr != null) {
				for (FileAttach detail : detailArr) {
					FileAttach fileAttach = fileAttachService.get(detail.getFileId());
					ukSysKnow.getFileAttachs().add(fileAttach);
				}
			}
		}
		//保存模板
		String knowTemplate = getRequest().getParameter("ukSysKnow.knowTmpId");
		if (StringUtils.isNotEmpty(knowTemplate)){
			UkKnowTemplate ukKnowTemplate = ukKnowTemplateService.get(new Long(knowTemplate));
			ukSysKnow.setUkKnowTemplate(ukKnowTemplate);
		}
		
		if (ukSysKnow.getKnowId() == null) {
			
			if (StringUtils.isNotEmpty(knowTypeId)) {
				ukSysKnow.getUkKnowTypes().clear();
				String[] ids = knowTypeId.split(",");
				for (int i = 0; i < ids.length; i++) {
					UkKnowType ukKnowType = ukKnowTypeService.get(new Long(ids[i]));
					ukSysKnow.getUkKnowTypes().add(ukKnowType);
				}
			}
			
			ukSysKnow.setCreateBy(ContextUtil.getCurrentUser());
			ukSysKnow.setSysKnowStatus(0);
			ukSysKnow.setKnowKeyWords(knowKeyWords);
			ukSysKnow.setCreateDate(new Date());
			ukSysKnow.setUpdateDate(new Date());
			ukSysKnow.setUpdateBy(ContextUtil.getCurrentUser());
			ukSysKnow.setIsDel("false");
			ukSysKnow.setViewCount(0);
			ukSysKnow.setDianpingCount(0);
			ukSysKnow.setAverageCount(new Double(0));
//			ukSysKnow.setBusiType(new Long(busiTypeItemIndex));	
//			ukSysKnow.setBusiTypeMapName(busiTypeMapName);
			ukSysKnow.setFankuiShu(0l);
			ukSysKnowService.save(ukSysKnow);
			
		} else {
			
			UkSysKnow orgUkSysKnow = ukSysKnowService.get(ukSysKnow.getKnowId());
			ukSysKnow.setUkKnowTypes(orgUkSysKnow.getUkKnowTypes());
//			String knowTypeIdU = getRequest().getParameter("knowTypeIdU"); // 知识分类
//			if (StringUtils.isNotEmpty(knowTypeIdU)) {
//				ukSysKnow.getUkKnowTypes().clear();
//				String[] ids = knowTypeIdU.split(",");
//				for (int i = 0; i < ids.length; i++) {
//					UkKnowType ukKnowType = ukKnowTypeService.get(new Long(ids[i]));
//					ukSysKnow.getUkKnowTypes().add(ukKnowType);
//				}
//			}
			
			// UkSysKnow know = new UkSysKnow();
			// know = orgUkSysKnow;
			try {
				// if (StringUtils.isEmpty(knowTypeId)) {
				// ukSysKnow.setUkKnowTypes(orgUkSysKnow.getUkKnowTypes());
				// }
				// if (StringUtils.isEmpty(applyId)) {
				// ukSysKnow.setUkKnowApplys(orgUkSysKnow.getUkKnowApplys());
				// }
				
				BeanUtil.copyNotNullProperties(orgUkSysKnow, ukSysKnow);
				orgUkSysKnow.setUpdateBy(ContextUtil.getCurrentUser());
//				orgUkSysKnow.setBusiType(new Long(busiTypeItemIndex));
//				orgUkSysKnow.setBusiTypeMapName(busiTypeMapName);
				orgUkSysKnow.setUpdateDate(new Date());
				ukSysKnow.setSysKnowStatus(0);
				orgUkSysKnow.setKnowKeyWords(knowKeyWords);
				ukSysKnowService.save(orgUkSysKnow);
				
				
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
	
	//提交知识
	public String submitCollect() {
		//知识维度
		String weidus = getRequest().getParameter("weidu");
		String weiduname = getRequest().getParameter("weiduname");
		String dimensionalKnowId = getRequest().getParameter("dimensionality_know_id");
		String knowKeyWords = getRequest().getParameter("knowKeyWords");
//		List<UkDimensionalityKnow> lists = new ArrayList<UkDimensionalityKnow>();
		
		String weidu = weidus.replaceAll("\\],\\[", "\\]-\\[").substring(1,weidus.length()-1);
		String[] weiduid = weidu.split("-");
		ukSysKnow.getUkDimensionalityKnows().clear();
		for (int i=0; i<weiduid.length; i++){
			String[] weidu_id = weiduid[i].replaceAll("\\[|\\]", "").split(",");
			UkDimensionalityKnow ukDimensionalityKnow;
			if (dimensionalKnowId != null && !dimensionalKnowId.equals("")){
				ukDimensionalityKnow = ukDimensionalityKnowService.get(Long.parseLong(dimensionalKnowId));
			}else {
				ukDimensionalityKnow = new UkDimensionalityKnow();
			}
			
			if (!weidu_id[1].equals("") && weidu_id[1] != null){
				if (weidu_id[1].equals("1")){
					UkKnowDimensionality ukKnowDimensionality = ukKnowDimensionalityService.get(Long.parseLong(weidu_id[0]));
					
					ukDimensionalityKnow.setUkSysKnow(ukSysKnow);
					ukDimensionalityKnow.setUkKnowDimensionality(ukKnowDimensionality);
					ukDimensionalityKnow.setDimName(weiduname);
					ukDimensionalityKnow.setDimensionalityType(new Long(weidu_id[1]));
					ukSysKnow.getUkDimensionalityKnows().add(ukDimensionalityKnow);
				}
				
				if (weidu_id[1].equals("2")){
					UlDepartment uldepartment = ulDepartmentService.get(Long.parseLong(weidu_id[0]));
					ukDimensionalityKnow.setUkSysKnow(ukSysKnow);
					ukDimensionalityKnow.setUlDepartment(uldepartment);
					ukDimensionalityKnow.setDimName(weiduname);
					ukDimensionalityKnow.setDimensionalityType(new Long(weidu_id[1]));
					ukSysKnow.getUkDimensionalityKnows().add(ukDimensionalityKnow);
				}
				
				if (weidu_id[1].equals("3")){
					Dictionary dictionary = dictionaryService.get(Long.parseLong(weidu_id[0]));
					ukDimensionalityKnow.setUkSysKnow(ukSysKnow);
					ukDimensionalityKnow.setDictionary(dictionary);
					ukDimensionalityKnow.setDimName(weiduname);
					ukDimensionalityKnow.setDimensionalityType(new Long(weidu_id[1]));
					ukSysKnow.getUkDimensionalityKnows().add(ukDimensionalityKnow);
				}
			}
			
		}
//		String busiTypeItemIndex = getRequest().getParameter("busiTypeItemIndex"); 	//业务分类数据字典索引项
//		String busiTypeMapName = getRequest().getParameter("busiTypeMapName");		//业务分类数据字典MapName
		

		String applyId = getRequest().getParameter("applyId"); // 知识申请单
		if (!"-1".equals(applyId)) {
			if (StringUtils.isNotEmpty(applyId)) {
				ukSysKnow.getUkKnowApplys().clear();
				String[] ids = applyId.split(",");
				for (int i = 0; i < ids.length; i++) {
					UkKnowApply ukKnowApply = ukKnowApplyService.get(new Long(ids[i]));
					ukSysKnow.getUkKnowApplys().add(ukKnowApply);
				}
			}
		}

		String sysKnowKeyWordIds = getRequest().getParameter("sysKnowKeyWordIds"); // 关键字
		if (StringUtils.isNotEmpty(sysKnowKeyWordIds)) {
			ukSysKnow.getUkKnowKeywords().clear();
			String[] ids = sysKnowKeyWordIds.split(",");
			for (int i = 0; i < ids.length; i++) {
				UkKnowKeyword ukKnowKeyword = ukKnowKeywordService.get(new Long(ids[i]));
				ukSysKnow.getUkKnowKeywords().add(ukKnowKeyword);
			}
		}
		
		//
		// String fileIds = getRequest().getParameter("fileIds"); // 附件
		// if (StringUtils.isNotEmpty(fileIds)) {
		// ukSysKnow.getFileAttachs().clear();
		// String[] ids = fileIds.split(",");
		// for (int i = 0; i < ids.length; i++) {
		// FileAttach fileAttach = fileAttachService.get(new Long(ids[i]));
		// ukSysKnow.getFileAttachs().add(fileAttach);
		// }
		// }

		String knowDetails = getRequest().getParameter("knowDetails");
		if (StringUtils.isNotEmpty(knowDetails)) {
			Gson gson = new Gson();
			UkSysKnow[] detailArr = (UkSysKnow[]) gson.fromJson(knowDetails,
					UkSysKnow[].class);
			ukSysKnow.getUkRelativeKnows().clear();
			if (detailArr != null) {
				for (UkSysKnow detail : detailArr) {
					UkSysKnow know = ukSysKnowService.get(detail.getKnowId());
					ukSysKnow.getUkRelativeKnows().add(know);
				}
			}
		}

		String fileDetails = getRequest().getParameter("fileDetails");
		if (StringUtils.isNotEmpty(fileDetails)) {
			Gson gson = new Gson();
			FileAttach[] detailArr = (FileAttach[]) gson.fromJson(fileDetails,FileAttach[].class);
			ukSysKnow.getFileAttachs().clear();
			if (detailArr != null) {
				for (FileAttach detail : detailArr) {
					FileAttach fileAttach = fileAttachService.get(detail.getFileId());
					ukSysKnow.getFileAttachs().add(fileAttach);
				}
			}
		}
		//保存模板
		String knowTemplate = getRequest().getParameter("ukSysKnow.knowTmpId");
		if (StringUtils.isNotEmpty(knowTemplate)){
			UkKnowTemplate ukKnowTemplate = ukKnowTemplateService.get(new Long(knowTemplate));
			ukSysKnow.setUkKnowTemplate(ukKnowTemplate);
		}
		
		if (ukSysKnow.getKnowId() == null) {
			String knowTypeId = getRequest().getParameter("knowTypeId_"); // 知识分类
			if (StringUtils.isNotEmpty(knowTypeId)) {
				ukSysKnow.getUkKnowTypes().clear();
				String[] ids = knowTypeId.split(",");
				for (int i = 0; i < ids.length; i++) {
					UkKnowType ukKnowType = ukKnowTypeService.get(new Long(ids[i]));
					ukSysKnow.getUkKnowTypes().add(ukKnowType);
				}
			}
			ukSysKnow.setCreateBy(ContextUtil.getCurrentUser());
			ukSysKnow.setSysKnowStatus(2); 
//			访问管理 数据字典   1==公共信息   2==授权访问
//			Long knowSys = ukSysKnow.getAccessManage();
//			if (knowSys != null){
//				if (knowSys == 1){
//					ukSysKnow.setSysKnowStatus(5); //5代表这个知识状态是:已发布
//				}
//				if (knowSys == 2){
//					ukSysKnow.setSysKnowStatus(2); //2代表这个知识状态是:待审核
//				}
//			}
			ukSysKnow.setCreateDate(new Date());
			ukSysKnow.setUpdateDate(new Date());
			ukSysKnow.setUpdateBy(ContextUtil.getCurrentUser());
			ukSysKnow.setIsDel("false");
			ukSysKnow.setViewCount(0);
			ukSysKnow.setDianpingCount(0);
//			ukSysKnow.setBusiType(new Long(busiTypeItemIndex));
//			ukSysKnow.setBusiTypeMapName(busiTypeMapName);
			ukSysKnow.setFankuiShu(0l);
			ukSysKnow.setKnowKeyWords(knowKeyWords);
			ukSysKnowService.save(ukSysKnow);
			
		} else {
//			ukSysKnow.getUkDimensionalityKnows().clear();
			UkSysKnow orgUkSysKnow = ukSysKnowService.get(ukSysKnow.getKnowId());
			ukSysKnow.setUkKnowTypes(orgUkSysKnow.getUkKnowTypes());
			//			String knowTypeIdU = getRequest().getParameter("knowTypeIdU"); // 知识分类
//			if (StringUtils.isNotEmpty(knowTypeIdU)) {
//				ukSysKnow.getUkKnowTypes().clear();
//				String[] ids = knowTypeIdU.split(",");
//				for (int i = 0; i < ids.length; i++) {
//					UkKnowType ukKnowType = ukKnowTypeService.get(new Long(ids[i]));
//					ukSysKnow.getUkKnowTypes().add(ukKnowType);
//				}
//			}
			
			// UkSysKnow know = new UkSysKnow();
			// know = orgUkSysKnow;
			try {
				// if (StringUtils.isEmpty(knowTypeId)) {
				// ukSysKnow.setUkKnowTypes(orgUkSysKnow.getUkKnowTypes());
				// }
				// if (StringUtils.isEmpty(applyId)) {
				// ukSysKnow.setUkKnowApplys(orgUkSysKnow.getUkKnowApplys());
				// }
				BeanUtil.copyNotNullProperties(orgUkSysKnow, ukSysKnow);
				orgUkSysKnow.setUpdateBy(ContextUtil.getCurrentUser());
				orgUkSysKnow.setSysKnowStatus(2); 
//				orgUkSysKnow.setBusiType(new Long(busiTypeItemIndex));
//				orgUkSysKnow.setBusiTypeMapName(busiTypeMapName);
				orgUkSysKnow.setUpdateDate(new Date());
				orgUkSysKnow.setKnowKeyWords(knowKeyWords);
				ukSysKnowService.save(orgUkSysKnow);
				
				
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
	
	public String getKnowByType() {
		List<UkKnowType> allTypes = new ArrayList<UkKnowType>();
		Set<UkSysKnow> allUkSysKnows = new HashSet<UkSysKnow>();
		Long typeId = 0L;
		if (getRequest().getParameter("typeId") != null) {
			typeId = Long.parseLong(getRequest().getParameter("typeId"));
			allTypes.add(ukKnowTypeService.get(typeId));
		} else {
			ukCollectlist();
			return SUCCESS;
		}
		findChildType(typeId, allTypes);

		for (UkKnowType type : allTypes) {
			// 找到该类型下的所有知识
			allUkSysKnows.addAll(type.getUkSysKnows());
		}
		removeDeleteKnow(allUkSysKnows);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(allUkSysKnows.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), "enableTime");
		serializer.transform(new DateTransformer("yyyy-MM-dd"), "pastTime");
		serializer.transform(new DateTransformer("yyyy-MM-dd"), "createDate");
		buff.append(serializer.include("ukKnowApplys").serialize(allUkSysKnows));

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
	public void findChildType(Long typeId, List<UkKnowType> result) {
		List<UkKnowType> child = ukKnowTypeService.findByParentId(typeId);
		if (child.size() == 0) {
			return;
		} else {
			for (UkKnowType type : child) {
				result.add(type);
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

	/**
	 * 列出已采集状态的知识
	 * 
	 * @author gst
	 * @createtime 2012年6月2日 11:06:56
	 */
	public String listStatus() {
		// 获得不同时段工作流的状态，然后根据这个状态列出知识
		String statusId = getRequest().getParameter("statusId");
		// 获得审批单 的id
		String _knowApproveId = getRequest().getParameter("_knowApproveId");
		// 从知识采集获得选择的知识，这个可以重新写个action方法
		String ids = getRequest().getParameter("ids");
		// if 是为新选择的知识改状态改为待审批
		// else是进入工作流的知识
		if (ids != null && ids != "") {
			String id[] = ids.split(",");

			List<UkSysKnow> list = new ArrayList<UkSysKnow>();
			for (String sysid : id) {
				if (sysid != null && !sysid.equals("")) {
					UkSysKnow usysKnow = ukSysKnowService.get(Long
							.parseLong(sysid));
					usysKnow.setSysKnowStatus(2);
					ukSysKnowService.save(usysKnow);
					list.add(usysKnow);
				}
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(list.size()).append(",result:");

			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			buff.append(jsonSer.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
		} else {
			if (statusId == null || statusId.equals("")) {
				statusId = "2";
			}
			List<UkSysKnow> list;
			Integer status = Integer.parseInt(statusId);
			if (status == 2) {
				list = ukSysKnowService.findByStatus(status);
				System.out.println(list.size() + " ==根据状态(2)和id获得所有的知识==");
				StringBuffer buff = new StringBuffer(
						"{success:true,'totalCounts':").append(list.size())
						.append(",result:");

				JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
				buff.append(jsonSer.serialize(list));
				buff.append("}");
				jsonString = buff.toString();
			}
			if (status >= 3) {
				System.out.println(status + "=========status=========");
				if (_knowApproveId != null && !_knowApproveId.equals("")) {
					if (status == 10) {
						list = ukSysKnowService.findByApproveId(Long
								.parseLong(_knowApproveId));
					} else {
						list = ukSysKnowService.findByStatusAndId(status,
								Long.parseLong(_knowApproveId));
					}
				} else {
					list = ukSysKnowService.findByStatus(status);
				}

				// System.out.println(list.size() + "==根据状态(3)或id获得所有的知识==");
				StringBuffer buff = new StringBuffer(
						"{success:true,'totalCounts':").append(list.size())
						.append(",result:");

				JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
				jsonSer.transform(new DateTransformer("yyyy-MM-dd"),
						new String[] { "enableTime", "pastTime", "createDate",
								"updateDate" });
				buff.append(jsonSer.serialize(list));
				buff.append("}");
				jsonString = buff.toString();
			}
		}

		return SUCCESS;
	}

	/**
	 * 列出待发布状态的知识
	 * 
	 * @author gst
	 * @createtime 2012年6月2日 18:06:56
	 */
	public String listApprovedStatus() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_sysKnowStatus_N_EQ", "4");
		filter.addSorted("enableTime", "desc");
//		List<UkSysKnow> list = ukSysKnowService.findInStatus("4,5");
		List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer.include("ukKnowKeywords").serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 发布知识
	 * 
	 * @author gst
	 * @createtime 2012年6月2日 19:06:56
	 */
	public String publish() {
		// QueryFilter filter = new QueryFilter(getRequest());
		// Integer status = 4;
		// filter.addFilter("Q_sysKnowStatus_N_EQ", status.toString());
		// List<UkSysKnow> list = ukSysKnowService.getAll(filter);
		// for (UkSysKnow ukSysKnow : list){
		// ukSysKnow.setSysKnowStatus(4);
		// ukSysKnowService.save(ukSysKnow);
		// }
		String _sysKnowIds = getRequest().getParameter("sysKnowIds");
		String roleIdsStr = getRequest().getParameter("roleIds");
		String[] ids = _sysKnowIds.split(",");
		String[] roleIds = roleIdsStr.split(",");
		for (String id : ids) {
			
			UkSysKnow ukSysKnow = ukSysKnowService.get(Long.parseLong(id));
			ukSysKnow.setSysKnowStatus(5);
			ukSysKnow.setUpdateDate(new Date());
			ukSysKnow.setUpdateBy(ContextUtil.getCurrentUser());
			ukSysKnow.getRoleKnows().clear();
			for (int i = 0; i < roleIds.length; i++) {
				AppRole appRole = appRoleService.get(new Long(roleIds[i]));
				ukSysKnow.getRoleKnows().add(appRole);
			}
			
			ukSysKnowService.save(ukSysKnow);
		}

		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * @author Zhangyl
	 * @createtime 2012年6月7日 18:17:56
	 * @method 放入垃圾箱
	 */
	public String rubbish() {
		String knowIds = getRequest().getParameter("knowIds"); // 提交的ID
		String[] ids = knowIds.trim().split(",");
		String delReason = getRequest().getParameter("delReason"); // 放入垃圾箱原因
		String delRemark = getRequest().getParameter("delRemark"); // 放入垃圾箱备注
		if (knowIds != null) {
			for (String id : ids) {
				UkSysKnow orgUkSysKnow = ukSysKnowService.get(new Long(id));
				orgUkSysKnow.setDelReason(Integer.parseInt(delReason));
				orgUkSysKnow.setSysKnowStatus(6);
				orgUkSysKnow.setDelRemark(delRemark);
				ukSysKnowService.merge(orgUkSysKnow);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * @author Zhangyl
	 * @createtime 2012年6月13日 11:24:41
	 * @method 共享知识
	 */
	public String shareTo() {
		String newknowTypeId = getRequest().getParameter("folderId");
		String boxIds = getRequest().getParameter("boxIds");
		if (StringUtils.isNotEmpty(boxIds)) {
			String[] knowIds = boxIds.split(",");
			for (int i = 0; i < knowIds.length; i++) {
				UkSysKnow ukSysKnow = ukSysKnowService
						.get(new Long(knowIds[i])); // 获得知识
				UkKnowType ukKnowType = new UkKnowType();
				// ukSysKnow.getUkKnowTypes().clear();
				if (StringUtils.isNotEmpty(newknowTypeId)) {
					String[] typeId = newknowTypeId.split(",");
					for (int y = 0; y < typeId.length; y++) {
						ukKnowType = ukKnowTypeService.get(new Long(typeId[i]));
						ukSysKnow.getUkKnowTypes().add(ukKnowType);
					}
				}
				ukSysKnowService.save(ukSysKnow);
			}
		}
		return SUCCESS;
	}
	
	/**
	 * @author gst
	 * @createtime 2012年10月19日 
	 * @method 转移知识
	 */
	public String moveTo() {
		String newknowTypeId = getRequest().getParameter("folderId");
		String boxIds = getRequest().getParameter("boxIds");
		if (StringUtils.isNotEmpty(boxIds)) {
			String[] knowIds = boxIds.split(",");
			for (int i = 0; i < knowIds.length; i++) {
				UkSysKnow ukSysKnow = ukSysKnowService
						.get(new Long(knowIds[i])); // 获得知识
				UkKnowType ukKnowType = new UkKnowType();
				ukSysKnow.getUkKnowTypes().clear();
				if (StringUtils.isNotEmpty(newknowTypeId)) {
					String[] typeId = newknowTypeId.split(",");
					for (int y = 0; y < typeId.length; y++) {
						ukKnowType = ukKnowTypeService.get(new Long(typeId[i]));
						ukSysKnow.getUkKnowTypes().add(ukKnowType);
					}
				}
				ukSysKnowService.save(ukSysKnow);
			}
		}
		return SUCCESS;
	}
	
	public String search() {
		PagingBean pb = getInitPagingBean();
		List<UkSysKnow> list = new ArrayList<UkSysKnow>();
		String searchContent = getRequest().getParameter("Q_search_S_LK"); // 搜索内容
		String title = getRequest().getParameter("Q_title_S_LK"); // 标题 (on
																	// 按标题搜索)
		String type = getRequest().getParameter("Q_type_S_LK"); // 业务类型 (on
																// 按业务类型搜索)
		String keyword = getRequest().getParameter("Q_keyword_S_LK"); // 关键字 (on
																		// 按关键字搜索)
		String search = getRequest().getParameter("Q_fullTextSearch_S_LK"); // 全文引擎(on
																			// 按全文搜索
																			// 不按其他类型搜索)
		String old = getRequest().getParameter("Q_old_S_LK"); // 是否过期 (on 已过期)
		String drop = getRequest().getParameter("Q_drop_S_LK"); // 是否废弃 (on 已废弃)
		
		String radio =  getRequest().getParameter("radio"); // 单选框 判断是选中的什么条件
		if("1".equals(radio)){
			title = "on";
		}else if("2".equals(radio)){
			keyword = "on";
		}else{
			search = "on";
		}
		
		String uploadPath = getSession().getServletContext().getRealPath(
				"/attachFiles/indexDir/");
		System.out.println("/attachFiles/indexDir/::::" + uploadPath);
		if ("on".equals(search)|| (!"on".equals(title)&&!"on".equals(type)&&!"on".equals(keyword)&&!"on".equals(search))) {
			list = ukSysKnowService.findBySearch(searchContent, pb, uploadPath,
					old, drop);
		} else {
			list = ukSysKnowService.findByNoSearch(searchContent, pb, title,
					type, keyword, old, drop);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(serializer.include("ukKnowTypes").include("ukKnowKeywords")
				.include("ukKnowTemplate").exclude("createBy.department")
				.exclude("createBy.ulEmployee").exclude("updateBy")
				.serialize(list));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * @author Zhangyl
	 * @createtime 2012年6月7日 18:17:56
	 * @method 根据Id数组查询
	 */
	public String getByKnowIds() {
		String knowIds = getRequest().getParameter("knowIds"); // 提交的ID
		List<UkSysKnow> knowList = new ArrayList<UkSysKnow>();
		String[] ids = knowIds.trim().split(",");
		if (knowIds != null) {
			for (String id : ids) {
//				UkSysKnow orgUkSysKnow = ukSysKnowService.get(new Long(id));
				QueryFilter filter = new QueryFilter();
				filter.addFilter("Q_knowId_L_EQ", id);
				filter.addFilter("Q_sysKnowStatus_N_EQ", "2");
				List<UkSysKnow> uknowList = ukSysKnowService.getAllNoRequest(filter);
				UkSysKnow orgUkSysKnow = uknowList.get(0);
				knowList.add(orgUkSysKnow);
			}
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(knowList.size()).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(knowList));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * @author Zhangyl
	 * @createtime 2012年6月13日 11:24:54
	 * @method 复制
	 * @comment 暂时废弃
	 */
	public String copyTo() {
		String newknowTypeId = getRequest().getParameter("folderId");
		String boxIds = getRequest().getParameter("boxIds");
		if (StringUtils.isNotEmpty(boxIds)) {
			String[] knowIds = boxIds.split(",");
			for (int i = 0; i < knowIds.length; i++) {
				UkSysKnow ukSysKnow = ukSysKnowService.get(new Long(knowIds[i])); // 获得知识
				
				UkSysKnow orgUkSysKnow = new UkSysKnow();
				
				UkKnowType ukKnowType = new UkKnowType();
				// ukSysKnow.getUkKnowTypes().clear();
				if (StringUtils.isNotEmpty(newknowTypeId)) {
					String[] typeId = newknowTypeId.split(",");
					for (int y = 0; y < typeId.length; y++) {
						java.util.Set ukKnowDianpings = new java.util.HashSet();
						java.util.Set ukKnowFankuis = new java.util.HashSet();
						java.util.Set ukPerKnows = new java.util.HashSet();
						java.util.Set ukRelativeKnows = new java.util.HashSet();
						java.util.Set<FileAttach> fileAttachs = new java.util.HashSet<FileAttach>();
						java.util.Set<UkKnowKeyword> ukKnowKeywords = new java.util.HashSet<UkKnowKeyword>();
						java.util.Set<UkKnowType> ukKnowTypes = new java.util.HashSet<UkKnowType>();
						java.util.Set<UkKnowApply> ukKnowApplys = new java.util.HashSet<UkKnowApply>();
						java.util.Set<AppRole> roleKnows = new java.util.HashSet<AppRole>();
						java.util.Set<UkDimensionalityKnow> ukDimensionalityKnows = new java.util.HashSet<UkDimensionalityKnow>();
						java.util.Set<UkKnowCollectType> ukKnowCollectTypes = new java.util.HashSet<UkKnowCollectType>();
						
						ukKnowType = ukKnowTypeService.get(new Long(typeId[i]));
						try {
							BeanUtil.copyNotNullProperties(orgUkSysKnow,ukSysKnow);
						} catch (Exception ex) {
							logger.error(ex.getMessage());
						}
						orgUkSysKnow.setKnowId(null);
						if (orgUkSysKnow.getUkKnowTypes().size() == 0) {
							orgUkSysKnow.setUkKnowTypes(null);
						}else {
							orgUkSysKnow.setUkKnowTypes(null);
							ukKnowTypes.add(ukKnowType);
							orgUkSysKnow.setUkKnowTypes(ukKnowTypes);
						}
						
						if (orgUkSysKnow.getFileAttachs().size() == 0) {
							orgUkSysKnow.setFileAttachs(null);
						}else{
							orgUkSysKnow.setFileAttachs(null);
//							orgUkSysKnow.getFileAttachs().clear();
							
							for (FileAttach fileAttach : ukSysKnow.getFileAttachs()){
								fileAttachs.add(fileAttach);
							}
							orgUkSysKnow.setFileAttachs(fileAttachs);
						}
						
						if (orgUkSysKnow.getUkKnowCollectTypes().size() == 0){
							orgUkSysKnow.setUkKnowCollectTypes(null);
						}else {
							orgUkSysKnow.setUkKnowCollectTypes(null);
							for (UkKnowCollectType collType : ukSysKnow.getUkKnowCollectTypes()){
								ukKnowCollectTypes.add(collType);
							}
							orgUkSysKnow.setUkKnowCollectTypes(ukKnowCollectTypes);
						}
						
						if (orgUkSysKnow.getRoleKnows().size() == 0){
							orgUkSysKnow.setRoleKnows(null);
						}else {
							orgUkSysKnow.setRoleKnows(null);
							
							for (AppRole roleKnow : ukSysKnow.getRoleKnows()){
								roleKnows.add(roleKnow);
							}
							orgUkSysKnow.setRoleKnows(roleKnows);
						}
						if (orgUkSysKnow.getUkKnowDianpings().size() == 0) {
							orgUkSysKnow.setUkKnowDianpings(null);
						}else {
							orgUkSysKnow.setUkKnowDianpings(null);
							Set<UkKnowDianping> dianpingknows = ukSysKnow.getUkKnowDianpings();
							for (UkKnowDianping dianpingKnow : dianpingknows){
								ukKnowDianpings.add(dianpingKnow);
							}
							orgUkSysKnow.setUkKnowDianpings(ukKnowDianpings);
						}
						
						if (orgUkSysKnow.getUkKnowFankuis().size() == 0) {
							orgUkSysKnow.setUkKnowFankuis(null);
						}else {
							orgUkSysKnow.setUkKnowFankuis(null);
							Set<UkKnowFankui> fankuiknows = ukSysKnow.getUkKnowFankuis();
							for (UkKnowFankui fankuiKnow : fankuiknows){
								ukKnowFankuis.add(fankuiKnow);
							}
							orgUkSysKnow.setUkKnowFankuis(ukKnowFankuis);
						}
						
						if (orgUkSysKnow.getUkPerKnows().size() == 0) {
							orgUkSysKnow.setUkPerKnows(null);
						}else{
							orgUkSysKnow.setUkPerKnows(null);
							Set<UkPerKnow> relKnows = ukSysKnow.getUkPerKnows();
							for (UkPerKnow perKnow : relKnows){
								ukPerKnows.add(perKnow);
							}
							orgUkSysKnow.setUkPerKnows(ukPerKnows);
						}
						
						if (orgUkSysKnow.getUkRelativeKnows().size() == 0) {
							orgUkSysKnow.setUkRelativeKnows(null);
						}else {
							orgUkSysKnow.setUkRelativeKnows(null);
							Set<UkSysKnow> relKnows = ukSysKnow.getUkRelativeKnows();
							for (UkSysKnow relativeKnow : relKnows){
								ukRelativeKnows.add(relativeKnow);
							}
							orgUkSysKnow.setUkRelativeKnows(ukRelativeKnows);
						}
						
						if (orgUkSysKnow.getUkKnowApplys().size() == 0) {
							orgUkSysKnow.setUkKnowApplys(null);
						}else{
							orgUkSysKnow.setUkKnowApplys(null);
							for (UkKnowApply knowApply : ukSysKnow.getUkKnowApplys()){
								ukKnowApplys.add(knowApply);
							}
							orgUkSysKnow.setUkKnowApplys(ukKnowApplys);
						}
						
						if (orgUkSysKnow.getUkDimensionalityKnows().size() == 0){
							orgUkSysKnow.setUkDimensionalityKnows(null);
						}else {
							orgUkSysKnow.setUkDimensionalityKnows(null);
							
							for (UkDimensionalityKnow dimensionalityKnow : ukSysKnow.getUkDimensionalityKnows()) {
								ukDimensionalityKnows.add(dimensionalityKnow);
							}
							orgUkSysKnow.setUkKnowKeywords(ukKnowKeywords);
						}
						
						if (orgUkSysKnow.getUkKnowKeywords().size() == 0) {
							orgUkSysKnow.setUkKnowKeywords(null);
						}else {
//							orgUkSysKnow.getUkKnowKeywords().clear();
							orgUkSysKnow.setUkKnowKeywords(null);
							
							for (UkKnowKeyword knowKeyword : ukSysKnow.getUkKnowKeywords()) {
								ukKnowKeywords.add(knowKeyword);
							}
							orgUkSysKnow.setUkKnowKeywords(ukKnowKeywords);
						}
						
					}
				}
				ukSysKnowService.save(orgUkSysKnow);
			}
		}
		return SUCCESS;
	}

	
	/**
	 * 知识查询通用方法
	 * @author zhangyl
	 * @createtime 2012年8月30日 15:39:34
	 */
	public String queryKnowList() {
		String start = getRequest().getParameter("start");						
		String limit = getRequest().getParameter("limit");
		String title = getRequest().getParameter("title");						//知识标题
		String keyWordName = getRequest().getParameter("ukKnowKeyWord");			//关键字名称
		String knowTypeName = getRequest().getParameter("ukKnowTypeName");		//知识类型名称
		String isNew = getRequest().getParameter("isNew");						//是否最新
		String isViewCount = getRequest().getParameter("isViewCount");			//是否是点击排行榜
		String isdianpingCount = getRequest().getParameter("isdianpingCount");			//是否是点评排行榜
		String status = getRequest().getParameter("status");							//知识状态
		String IS_DEL = getRequest().getParameter("IS_DEL");							//是否真删
		String isOverdue = getRequest().getParameter("isOverdue");						//是否过期
		String knowTypeId = getRequest().getParameter("typeId");						//知识类型ID(用于分类树型控件检索)
		String minPastTime = getRequest().getParameter("minPastTime");				//最小过期时间
		String maxPastTime = getRequest().getParameter("maxPastTime");				//最大过期时间
		String NEQStatus = getRequest().getParameter("NEQStatus");					// 状态是否是不等于
		String isPermission = getRequest().getParameter("isPermission");			//是否验证权限. 默认是验证 . 传值不为空则是不验证
		String busiType = getRequest().getParameter("busiType");			//业务类型
		String checkTypeRole = getRequest().getParameter("checkTypeRole");			//分类权限验证
		
		List<UkSysKnow> list = ukSysKnowService.queryKnow(new Integer(start),new Integer(limit),title, keyWordName, knowTypeName, isNew, isViewCount, isdianpingCount, status, IS_DEL, isOverdue, knowTypeId,minPastTime,maxPastTime,NEQStatus,isPermission,busiType,checkTypeRole);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(ukSysKnowService.queryKnowCount(new Integer(start),new Integer(limit),title, keyWordName, knowTypeName, isNew, isViewCount, isdianpingCount, status, IS_DEL, isOverdue, knowTypeId,minPastTime,maxPastTime,NEQStatus,isPermission,busiType,checkTypeRole)).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer(); 
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {"enableTime", "pastTime", "createDate", "updateDate" });
		buff.append(jsonSer
				.include("knowId","tiTle","busiType","knowKeyWords","enableTime","pastTime","sysKnowStatus","viewCount","dianpingCount","sysKnowComment","plus1","plus2","plus3","plus4","plus5","plus6","plus7","plus8","isDel","sysKnowVersion","createDate","updateDate","userid","fankuiShu","busiTypeMapName","delRemark","delReason","accessManage","averageCount")
				.include("ukKnowApprove.knowApproveId","ukKnowApprove.runid","ukKnowTypes.knowTypeId","ukKnowTypes.name","ukKnowKeywords.keywordId","ukKnowKeywords.keyWord","ukKnowApplys.applyId","ukKnowApplys.runid","ukKnowTemplate.knowTmpId","ukKnowTemplate.tmpName","createBy.userId","createBy.fullname","fileAttachs.fileId","fileAttachs.fileName","fileAttachs.filePath","fileAttachs.totalBytes")
				.exclude("*")
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;

	}
	
	/**
	 * 首页个人知识
	 * @author zhangyl
	 * @createtime 2012年8月30日 15:39:34
	 */
	public String display() {
		String start = getRequest().getParameter("start");						
		String limit = getRequest().getParameter("limit");						
		String title = getRequest().getParameter("title");								//知识标题
		String keyWordName = getRequest().getParameter("ukKnowKeyWord");				//关键字名称
		String knowTypeName = getRequest().getParameter("ukKnowTypeName");				//知识类型名称
		String isNew = getRequest().getParameter("isNew");								//是否最新
		String isViewCount = getRequest().getParameter("isViewCount");					//是否是点击排行榜
		String isdianpingCount = getRequest().getParameter("isdianpingCount");			//是否是点评排行榜
		String status = getRequest().getParameter("status");							//知识状态
		String IS_DEL = getRequest().getParameter("IS_DEL");							//是否真删
		String isOverdue = getRequest().getParameter("isOverdue");						//是否过期
		String knowTypeId = getRequest().getParameter("typeId");						//知识类型ID(用于分类树型控件检索)
		String minPastTime = getRequest().getParameter("minPastTime");					//最小过期时间
		String maxPastTime = getRequest().getParameter("maxPastTime");					//最大过期时间
		String NEQStatus = getRequest().getParameter("NEQStatus");						// 状态是否是不等于
		String isPermission = getRequest().getParameter("isPermission");				//是否验证权限. 默认是验证 . 传值不为空则是不验证
		String busiType = getRequest().getParameter("busiType");						//业务类型
		String checkTypeRole = getRequest().getParameter("checkTypeRole");				//分类权限验证
		List<UkSysKnow> list = ukSysKnowService.queryKnow(new Integer(start),new Integer(limit),title, keyWordName, knowTypeName, isNew, isViewCount, isdianpingCount, status, IS_DEL, isOverdue, knowTypeId,minPastTime,maxPastTime,NEQStatus,isPermission,busiType,checkTypeRole);
		String path = "success"; 
		if(isViewCount != null && isViewCount != ""){
			getRequest().setAttribute("hotKnowList", list);
			path = "hot";
		}else if(isNew != null && isNew != ""){
			 getRequest().setAttribute("newKnowList", list);
			path = "new";
		}
		return path;
	}
	
	/**
	 * 知识恢复
	 * @return
	 */
	public String recovery() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				UkSysKnow usk = ukSysKnowService.get(Long.parseLong(id));
				usk.setSysKnowStatus(5);
				ukSysKnowService.save(usk);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	/**
	 * 知识归档
	 * @return
	 */
	public String multiFile() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				UkSysKnow usk = ukSysKnowService.get(Long.parseLong(id));
				usk.setSysKnowStatus(7);
				usk.setFilingTime(new Date());
				ukSysKnowService.save(usk);
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
}
