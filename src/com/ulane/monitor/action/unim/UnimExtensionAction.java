package com.ulane.monitor.action.unim;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.DozerHelper;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimExtension;
import com.ulane.monitor.service.unim.UnimExtensionService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UnimExtensionAction extends BaseAction {
	@Resource
	private UnimExtensionService unimExtensionService;
	private UnimExtension unimExtension;

	private Long extId;

	public Long getExtId() {
		return extId;
	}

	public void setExtId(Long extId) {
		this.extId = extId;
	}

	public UnimExtension getUnimExtension() {
		return unimExtension;
	}

	public void setUnimExtension(UnimExtension unimExtension) {
		this.unimExtension = unimExtension;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("extCode", QueryFilter.ORDER_ASC);
		List<UnimExtension> list = unimExtensionService.getAll(filter);

		Type type = new TypeToken<List<UnimExtension>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		// JSONSerializer serializer = new JSONSerializer();
		// serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new
		// String[] { "applyTime"});
		// buff.append(serializer.exclude(new
		// String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));

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
				unimExtensionService.remove(new Long(id));
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
		UnimExtension unimExtension = unimExtensionService.get(extId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimExtension));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (unimExtension.getExtId() == null) {
			unimExtensionService.save(unimExtension);
		} else {
			UnimExtension orgUnimExtension = unimExtensionService
					.get(unimExtension.getExtId());
			try {
				BeanUtil.copyNotNullProperties(orgUnimExtension, unimExtension);
				unimExtensionService.save(orgUnimExtension);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

	public String isRepeat() {
		String extCode = getRequest().getParameter("extCode");
		if (StringUtils.isNotBlank(extCode)) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_extCode_S_EQ", extCode);
			List<UnimExtension> list = unimExtensionService.getAll(filter);
			if (list.size() > 0) {
				setJsonString("{success:true}");
				return SUCCESS;
			}
		}
		setJsonString("{success:false}");
		return SUCCESS;
	}

	public void findAll() {
		try {
			List list = unimExtensionService.getAll();
			List list2 = new DozerHelper().convert(list);
			writeToPage(Boolean.valueOf(true), "查询分机查询成功", list2);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}
}
