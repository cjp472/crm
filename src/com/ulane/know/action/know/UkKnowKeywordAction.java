package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.know.model.know.UkKnowKeyword;
import com.ulane.know.model.know.UkKnowKeywordType;
import com.ulane.know.service.know.UkKnowKeywordService;
import com.ulane.know.service.know.UkKnowKeywordTypeService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkKnowKeywordAction extends BaseAction {
	@Resource
	private UkKnowKeywordService ukKnowKeywordService;
	@Resource
	private UkKnowKeywordTypeService ukKnowKeywordTypeService;
	private UkKnowKeyword ukKnowKeyword;
	private UkKnowKeywordType ukKnowKeywordType;

	private Long keywordId;
	private String keywordIdStrs;

	public String getKeywordIdStrs() {
		return keywordIdStrs;
	}

	public void setKeywordIdStrs(String keywordIdStrs) {
		this.keywordIdStrs = keywordIdStrs;
	}

	public UkKnowKeywordType getUkKnowKeywordType() {
		return ukKnowKeywordType;
	}

	public void setUkKnowKeywordType(UkKnowKeywordType ukKnowKeywordType) {
		this.ukKnowKeywordType = ukKnowKeywordType;
	}

	public Long getKeywordId() {
		return keywordId;
	}

	public void setKeywordId(Long keywordId) {
		this.keywordId = keywordId;
	}

	public UkKnowKeyword getUkKnowKeyword() {
		return ukKnowKeyword;
	}

	public void setUkKnowKeyword(UkKnowKeyword ukKnowKeyword) {
		this.ukKnowKeyword = ukKnowKeyword;
	}

	/**
	 * 获取关键字分类的信息，提供给tree显示
	 * 
	 * @return
	 */
	public String typeList() {
		StringBuffer buff = new StringBuffer();
		buff.append("[{id:'" + 0 + "',text:'关键字分类',expanded:true,children:[");
		List<UkKnowKeywordType> listParent = ukKnowKeywordTypeService
				.findByParentId(new Long(0));// 最顶层父节点
		removeDeletedType(listParent);
		for (UkKnowKeywordType type : listParent) {
			buff.append("{id:'" + type.getKeywordTypeId() + "',text:'"
					+ type.getName() + "',");
			buff.append(findChild(type.getKeywordTypeId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 寻找关键字分类的子根节点
	 */
	public String findChild(Long typeId) {
		StringBuffer buff1 = new StringBuffer("");
		List<UkKnowKeywordType> list = ukKnowKeywordTypeService
				.findByParentId(typeId);
		removeDeletedType(list);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (UkKnowKeywordType type : list) {
				buff1.append("{id:'" + type.getKeywordTypeId() + "',text:'"
						+ type.getName() + "',");
				buff1.append(findChild(type.getKeywordTypeId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	public String saveType() {
		if (ukKnowKeywordType.getKeywordTypeId() == null) {
			ukKnowKeywordType
					.setKeywordTypeStatus(UkKnowKeywordType.FLAG_ENABLED
							.longValue());
			ukKnowKeywordTypeService.save(ukKnowKeywordType);
		} else {
			UkKnowKeywordType orgUkKnowKeywordType = ukKnowKeywordTypeService
					.get(ukKnowKeywordType.getKeywordTypeId());
			try {
				BeanUtil.copyNotNullProperties(orgUkKnowKeywordType,
						ukKnowKeywordType);
				ukKnowKeywordTypeService.save(orgUkKnowKeywordType);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

	public String delType() {
		Long typeId = Long.parseLong(getRequest().getParameter("typeId"));
		UkKnowKeywordType ukKnowKeywordType = ukKnowKeywordTypeService
				.get(typeId);
		List<UkKnowKeyword> result = ukKnowKeywordService.findByType(typeId,"");
		if (result.size() == 0) {
			ukKnowKeywordType
					.setKeywordTypeStatus(UkKnowKeywordType.FLAG_DELETED
							.longValue());
			ukKnowKeywordTypeService.save(ukKnowKeywordType);
			setJsonString("{success:true}");
		} else {
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}

	public String detailType() {
		Long typeId = Long.parseLong(getRequest().getParameter("typeId"));
		UkKnowKeywordType ukKnowKeywordType = ukKnowKeywordTypeService
				.get(typeId);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ukKnowKeywordType));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		String check = getRequest().getParameter("check");
		final QueryFilter filter = new QueryFilter(getRequest());
		
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"createDate", "updateDate" });
		
		// filter.addFilter("Q_knowStatus_L_EQ",
		// ukKnowKeyword.FLAG_ENABLED.toString());
		filter.addSorted("keywordId", "desc");
		List<UkKnowKeyword> list = ukKnowKeywordService.getAll(filter);
		if (check == null || check.equals("false")) {
			// removeDeletedKeyword(list);
		}
		Type type = new TypeToken<List<UkKnowKeyword>>() {}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		Gson gson = new Gson();
//		buff.append(gson.toJson(list, type));
		buff.append(serializer.exclude("ukSysKnows").serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	public String like() {
		final QueryFilter filter = new QueryFilter(getRequest());
		List<UkKnowKeyword> list = ukKnowKeywordService.getAll(filter);
		Type type = new TypeToken<List<UkKnowKeyword>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		Gson gson = new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 批量删除关键字
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 删除单个关键字
	 * 
	 * @return
	 */
	public String del() {
		Long keywordId = Long.parseLong(getRequest().getParameter("keywordId"));
		remove(keywordId);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 删除关键字的方法
	 * 
	 * @param depId
	 */
	public void remove(long keywordId) {
		UkKnowKeyword keyword = ukKnowKeywordService.get(keywordId);
		keyword.setKnowStatus(UkKnowKeyword.FLAG_DELETED.longValue());
		ukKnowKeywordService.save(keyword);
		// 子关键字不用删除，因为父被删除，子关键字找不到
		// List<UlDepartment> list = ulDepartmentService.findByParentId(depId);
		// if (list != null)
		// for (UlDepartment dep : list) {
		// dep.setDelFlag((short) 1);
		// ulDepartmentService.save(dep);
		// }
	}

	/**
	 * 启用关键字
	 * 
	 * @return
	 */
	public String multiEnable() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				enable(new Long(id));
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 启用单个关键字
	 * 
	 * @return
	 */
	public String enable() {
		Long keywordId = Long.parseLong(getRequest().getParameter("keywordId"));
		enable(keywordId);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 启用关键字的方法
	 * 
	 * @param depId
	 */
	public void enable(long keywordId) {
		UkKnowKeyword keyword = ukKnowKeywordService.get(keywordId);
		keyword.setKnowStatus(UkKnowKeyword.FLAG_ENABLED.longValue());
		ukKnowKeywordService.save(keyword);
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		UkKnowKeyword ukKnowKeyword = ukKnowKeywordService.get(keywordId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"enableTime", "pastTime", "createDate", "updateDate" });
		sb.append(jsonSer.serialize(ukKnowKeyword));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ukKnowKeyword.getKeywordId() == null) {
			ukKnowKeyword
					.setKnowStatus(UkKnowKeyword.FLAG_DISABLED.longValue());
			ukKnowKeywordService.save(ukKnowKeyword);
		} else {
			UkKnowKeyword orgUkKnowKeyword = ukKnowKeywordService
					.get(ukKnowKeyword.getKeywordId());
			try {
				BeanUtil.copyNotNullProperties(orgUkKnowKeyword, ukKnowKeyword);
				ukKnowKeywordService.save(orgUkKnowKeyword);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	public String childlist_type() {
		PagingBean pb=new PagingBean(start, limit);
		List<UkKnowKeywordType> allTypes = new ArrayList<UkKnowKeywordType>();
		List<UkKnowKeyword> allKeywords = new ArrayList<UkKnowKeyword>();
		Long typeId = 0L;
		String keyWord = getRequest().getParameter("keyWord");
		if (getRequest().getParameter("typeId") != null) {
			typeId = Long.parseLong(getRequest().getParameter("typeId"));
			allTypes.add(ukKnowKeywordTypeService.get(typeId));
		}
		findChildType(typeId, allTypes,pb);
		
		String typeIds = "";
		for (UkKnowKeywordType type : allTypes) {
			typeIds += type.getKeywordTypeId();
			typeIds += ",";
		}
		String a = "";
		if(typeIds != ""){
			 a  = typeIds.substring(0, typeIds.length() -1);
		}
		allKeywords = ukKnowKeywordService.findByTypeForPage(a,keyWord,pb);
		// removeDeletedKeyword(allKeywords);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "appUser.accessionTime" });
		buff.append(serializer.serialize(allKeywords));

		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	public void findChildType(Long typeId, List<UkKnowKeywordType> result, PagingBean pb) {
		List<UkKnowKeywordType> child = ukKnowKeywordTypeService
				.findByParentId(typeId);
		if (child.size() == 0) {
			return;
		} else {
			for (UkKnowKeywordType type : child) {
				result.add(type);
				findChildType(type.getKeywordTypeId(), result,pb);
			}
		}
	}
	
	
	
	public String childlist_typeDel() {
		List<UkKnowKeywordType> allTypes = new ArrayList<UkKnowKeywordType>();
		List<UkKnowKeyword> allKeywords = new ArrayList<UkKnowKeyword>();
		Long typeId = 0L;
		if (getRequest().getParameter("typeId") != null) {
			typeId = Long.parseLong(getRequest().getParameter("typeId"));
			allTypes.add(ukKnowKeywordTypeService.get(typeId));
		}
		findChildTypeDel(typeId, allTypes);

		for (UkKnowKeywordType type : allTypes) {
			// 找到该类型下的所有关键字
			allKeywords.addAll(ukKnowKeywordService.findByTypeDel(type
					.getKeywordTypeId()));
		}
		// removeDeletedKeyword(allKeywords);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(allKeywords.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "appUser.accessionTime" });
		buff.append(serializer.serialize(allKeywords));

		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	public void findChildTypeDel(Long typeId, List<UkKnowKeywordType> result) {
		List<UkKnowKeywordType> child = ukKnowKeywordTypeService
				.findByParentId(typeId);
		if (child.size() == 0) {
			return;
		} else {
			for (UkKnowKeywordType type : child) {
				result.add(type);
				findChildTypeDel(type.getKeywordTypeId(), result);
			}
		}
	}

	public void validate() {

	}

	/**
	 * 将list中的已标记删除的节点去掉
	 * 
	 * @param list
	 * @return
	 */
	public void removeDeletedType(List<UkKnowKeywordType> list) {
		Iterator<UkKnowKeywordType> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getKeywordTypeStatus()
					.equals(UkKnowKeywordType.FLAG_DELETED.longValue()))
				i_list.remove();
		}
	}

	/**
	 * 将list中的已标记删除的节点去掉
	 * 
	 * @param list
	 * @return
	 */
	public void removeDeletedKeyword(List<UkKnowKeyword> list) {
		Iterator<UkKnowKeyword> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getKnowStatus()
					.equals(UkKnowKeyword.FLAG_DELETED.longValue()))
				i_list.remove();
		}
	}

	/**
	 * 供关键字选择器使用. 根据已有的ID加载选择器中的已选关键字 2012年5月29日 09:33:31
	 */
	public String findbyKeywordStr() {
		if (keywordIdStrs != null && keywordIdStrs.length() > 0
				&& !keywordIdStrs.equals("null")) {
			String[] keywordId = keywordIdStrs.trim().split(",");
			List<UkKnowKeyword> keyList = new ArrayList<UkKnowKeyword>();
			for (int i = 0; i < keywordId.length; i++) {
				UkKnowKeyword knowKeyword = ukKnowKeywordService.get(new Long(
						keywordId[i]));
				keyList.add(knowKeyword);
			}

			StringBuffer sb = new StringBuffer("[");
			for (UkKnowKeyword knowKey : keyList) {
				if (knowKey.getKeywordId() != null
						&& !knowKey.getKeywordId().equals("")) {
					sb.append("['" + knowKey.getKeywordId() + "','"
							+ knowKey.getKeyWord() + "','" + knowKey.getType()
							+ "'],");
				}

			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;

	}

	/**
	 * 根据关键字多个ID查询,获得list
	 * 
	 * @author zhangyl 2012年6月1日 14:04:58
	 */
	public String findbyIdStr() {
		String keyWordIdStr = getRequest().getParameter("keyWordIdStr");
		if (keyWordIdStr != null && keyWordIdStr.length() > 0
				&& !keyWordIdStr.equals("null")) {
			String[] keyWordId = keyWordIdStr.trim().split(",");
			List<UkKnowKeyword> ukKnowKeywordList = new ArrayList<UkKnowKeyword>();
			for (int i = 0; i < keyWordId.length; i++) {
				UkKnowKeyword ukKnowKeyword = ukKnowKeywordService
						.get(new Long(keyWordId[i]));
				ukKnowKeywordList.add(ukKnowKeyword);
			}
			StringBuffer sb = new StringBuffer("[");
			for (UkKnowKeyword keyword : ukKnowKeywordList) {
				if (keyword.getKeywordId() != null
						&& !"".equals(keyword.getKeywordId())) {
					sb.append("['" + keyword.getKeywordId() + "','"
							+ keyword.getKeyWord() + "'],");
				}

			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;

	}
	
	/**
	 * 转移关键字
	 * @return
	 */
	public String movenode(){
//		String actionMode = getRequest().getParameter("actionMode");
		String parentId = getRequest().getParameter("folderId");
		//选择的关键字id
		String newknowKeywordId = getRequest().getParameter("newknowTypeId");
		String ids[] = newknowKeywordId.split(",");
		for(String id : ids){
//			moveOneNode(id, actionMode);
			UkKnowKeyword ukKnowKeyword = ukKnowKeywordService.get(new Long(id));
			UkKnowKeywordType ukKnowKeywordType = ukKnowKeywordTypeService.get(new Long(parentId));
			ukKnowKeyword.setType(ukKnowKeywordType);
			ukKnowKeywordService.merge(ukKnowKeyword);
		}
		return SUCCESS;
	}
}
