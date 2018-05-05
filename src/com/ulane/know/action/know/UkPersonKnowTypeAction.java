package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.know.model.know.UkPersonKnowType;
import com.ulane.know.service.know.UkPersonKnowTypeService;

import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkPersonKnowTypeAction extends BaseAction {
	@Resource
	private UkPersonKnowTypeService ukPersonKnowTypeService;
	private UkPersonKnowType ukPersonKnowType;

	private Long personKnowTypeId;

	public Long getPersonKnowTypeId() {
		return personKnowTypeId;
	}

	public void setPersonKnowTypeId(Long personKnowTypeId) {
		this.personKnowTypeId = personKnowTypeId;
	}

	public UkPersonKnowType getUkPersonKnowType() {
		return ukPersonKnowType;
	}

	public void setUkPersonKnowType(UkPersonKnowType ukPersonKnowType) {
		this.ukPersonKnowType = ukPersonKnowType;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		Map<String, Object> root = new HashMap<String, Object>();
		root.put("id", "0");
		root.put("text", UkPersonKnowType.DESC);
		root.put("expanded", true);

		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_parentId_L_EQ", "0");
		List<UkPersonKnowType> list = ukPersonKnowTypeService
				.getAllNoRequest(filter);
		List<Map<String, Object>> sub = new ArrayList<Map<String, Object>>();
		for (UkPersonKnowType tmp : list) {
			Map<String, Object> map_tmp = new HashMap<String, Object>();
			map_tmp.put("id", tmp.getPersonKnowTypeId());
			map_tmp.put("text", tmp.getComMent());
			appendChild(map_tmp);
			sub.add(map_tmp);
		}
		root.put("children", sub);

		List<Object> all = new ArrayList<Object>();
		all.add(root);
		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		jsonString = serializer.deepSerialize(all);

		return SUCCESS;
	}

	public void appendChild(Map<String, Object> one) {

		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_parentId_L_EQ", one.get("id").toString());
		List<UkPersonKnowType> list = ukPersonKnowTypeService
				.getAllNoRequest(filter);
		if (list.size() == 0) {
			one.put("leaf", true);
		} else {
			List<Map<String, Object>> sub = new ArrayList<Map<String, Object>>();
			for (UkPersonKnowType tmp_sub : list) {
				Map<String, Object> map_tmp = new HashMap<String, Object>();
				map_tmp.put("id", tmp_sub.getPersonKnowTypeId());
				map_tmp.put("text", tmp_sub.getComMent());
				appendChild(map_tmp);
				sub.add(map_tmp);
			}
			one.put("children", sub);
		}
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
				ukPersonKnowTypeService.remove(new Long(id));
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
		UkPersonKnowType ukPersonKnowType = ukPersonKnowTypeService
				.get(personKnowTypeId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ukPersonKnowType));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ukPersonKnowType.getPersonKnowTypeId() == null) {
			ukPersonKnowTypeService.save(ukPersonKnowType);
		} else {
			UkPersonKnowType orgUkPersonKnowType = ukPersonKnowTypeService
					.get(ukPersonKnowType.getPersonKnowTypeId());
			try {
				BeanUtil.copyNotNullProperties(orgUkPersonKnowType,
						ukPersonKnowType);
				ukPersonKnowTypeService.save(orgUkPersonKnowType);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
}
