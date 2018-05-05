package com.ulane.know.action.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.know.model.know.UkQiusuo;
import com.ulane.know.model.know.UkQiusuoHuifu;
import com.ulane.know.service.know.UkQiusuoHuifuService;
import com.ulane.know.service.know.UkQiusuoService;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkQiusuoAction extends BaseAction {
	@Resource
	private UkQiusuoService ukQiusuoService;
	@Resource
	private UkQiusuoHuifuService ukQiusuoHuifuService;
	private UkQiusuo ukQiusuo;

	private Long qiusuoId;

	public Long getQiusuoId() {
		return qiusuoId;
	}

	public void setQiusuoId(Long qiusuoId) {
		this.qiusuoId = qiusuoId;
	}

	public UkQiusuo getUkQiusuo() {
		return ukQiusuo;
	}

	public void setUkQiusuo(UkQiusuo ukQiusuo) {
		this.ukQiusuo = ukQiusuo;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<UkQiusuo> list = ukQiusuoService.getAll(filter);

		Type type = new TypeToken<List<UkQiusuo>>() {
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
				ukQiusuoService.remove(new Long(id));
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
		UkQiusuo ukQiusuo = ukQiusuoService.get(qiusuoId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ukQiusuo));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ukQiusuo.getQiusuoId() == null) {
			ukQiusuo.setCreateby(ContextUtil.getCurrentUser());
			ukQiusuo.setCreatetime(new Timestamp(System.currentTimeMillis()));
			ukQiusuo.setHuifuCount(0);
			ukQiusuo.setStatus(UkQiusuo.ON);
			ukQiusuoService.save(ukQiusuo);
		} else {
			UkQiusuo orgUkQiusuo = ukQiusuoService.get(ukQiusuo.getQiusuoId());
			try {
				BeanUtil.copyNotNullProperties(orgUkQiusuo, ukQiusuo);
				ukQiusuoService.save(orgUkQiusuo);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	/**
	 * 显示未关闭列表
	 */
	public String listOn() {
		// 获得当前用户的ID
		// Long userId = ContextUtil.getCurrentUser().getUserId();
		// List<UlBbsHuati> htList = ulBbsHuatiService.getMy(userId);

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_status_L_EQ", UkQiusuo.ON.toString());
		filter.addSorted("createtime", "desc");
		List<UkQiusuo> htList = ukQiusuoService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(htList.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer("createtime");
		buff.append(jsonSer.serialize(htList));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 显示关闭列表
	 */
	public String listOff() {
		// 获得当前用户的ID
		// Long userId = ContextUtil.getCurrentUser().getUserId();
		// List<UlBbsHuati> htList = ulBbsHuatiService.getMy(userId);

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_status_L_NE", UkQiusuo.ON.toString());
		filter.addSorted("closetime", "desc");
		List<UkQiusuo> htList = ukQiusuoService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(htList.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer("createtime");
		buff.append(jsonSer.serialize(htList));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 显示未关闭列表
	 */
	public String listOnMy() {
		// 获得当前用户的ID
		Long userId = ContextUtil.getCurrentUser().getUserId();
		// List<UlBbsHuati> htList = ulBbsHuatiService.getMy(userId);

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_status_L_EQ", UkQiusuo.ON.toString());
		filter.addFilter("Q_createby.userId_L_EQ", userId.toString());
		filter.addSorted("createtime", "desc");
		List<UkQiusuo> htList = ukQiusuoService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(htList.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer("createtime");
		buff.append(jsonSer.serialize(htList));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 显示关闭列表
	 */
	public String listOffMy() {
		// 获得当前用户的ID
		Long userId = ContextUtil.getCurrentUser().getUserId();
		// List<UlBbsHuati> htList = ulBbsHuatiService.getMy(userId);

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_status_L_NE", UkQiusuo.ON.toString());
		filter.addFilter("Q_createby.userId_L_EQ", userId.toString());
		filter.addSorted("closetime", "desc");
		List<UkQiusuo> htList = ukQiusuoService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(htList.size()).append(",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer("createtime");
		buff.append(jsonSer.serialize(htList));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	public String loadData() {
		String id = getRequest().getParameter("id");
		if (id == null || id.equals("")) {
			return SUCCESS;
		}
		QueryFilter filter = new QueryFilter(getRequest());
		// filter.addFilter("Q_status_L_EQ", UkQiusuo.ON.toString());
		filter.addFilter("Q_qiusuoId_L_EQ", id);
		List<UkQiusuo> htList = ukQiusuoService.getAll(filter);
		StringBuffer sb = new StringBuffer("{success:true,data:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer("createtime");
		sb.append(jsonSer.serialize(htList.get(0)));
		sb.append("}");

		jsonString = sb.toString();
		return SUCCESS;
	}

	public String close() {
		String id = getRequest().getParameter("id");
		UkQiusuo uq = ukQiusuoService.get(Long.parseLong(id));
		String result = getRequest().getParameter("result");
		String ids = getRequest().getParameter("ids");
		if (result.equals("2")) {
			uq.setStatus(UkQiusuo.CANCLE);
		}
		if (result.equals("1")) {
			JSONDeserializer<List<Integer>> jd = new JSONDeserializer<List<Integer>>();
			List<Integer> ids_huifu = jd.deserialize(ids);
			for (Integer id_tmp : ids_huifu) {
				UkQiusuoHuifu uqh = ukQiusuoHuifuService
						.get(id_tmp.longValue());
				uq.getHuifusOff().add(uqh);
				uq.setStatus(UkQiusuo.OFF);
			}
		}
		uq.setClosetime(new Timestamp(System.currentTimeMillis()));
		ukQiusuoService.save(uq);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
