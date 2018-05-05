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
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.FileAttachService;
import com.ulane.know.model.know.UkQiusuo;
import com.ulane.know.model.know.UkQiusuoHuifu;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkQiusuoHuifuService;
import com.ulane.know.service.know.UkQiusuoService;
import com.ulane.know.service.know.UkSysKnowService;

import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UkQiusuoHuifuAction extends BaseAction {
	@Resource
	private UkQiusuoHuifuService ukQiusuoHuifuService;
	private UkQiusuoHuifu ukQiusuoHuifu;
	@Resource
	private UkSysKnowService ukSysKnowService;
	@Resource
	private FileAttachService FileAttachService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private UkQiusuoService ukQiusuoService;
	private Long qiusuoHuifuId;

	public Long getQiusuoHuifuId() {
		return qiusuoHuifuId;
	}

	public void setQiusuoHuifuId(Long qiusuoHuifuId) {
		this.qiusuoHuifuId = qiusuoHuifuId;
	}

	public UkQiusuoHuifu getUkQiusuoHuifu() {
		return ukQiusuoHuifu;
	}

	public void setUkQiusuoHuifu(UkQiusuoHuifu ukQiusuoHuifu) {
		this.ukQiusuoHuifu = ukQiusuoHuifu;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<UkQiusuoHuifu> list = ukQiusuoHuifuService.getAll(filter);

		Type type = new TypeToken<List<UkQiusuoHuifu>>() {
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
				ukQiusuoHuifuService.remove(new Long(id));
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
		UkQiusuoHuifu ukQiusuoHuifu = ukQiusuoHuifuService.get(qiusuoHuifuId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ukQiusuoHuifu));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (ukQiusuoHuifu.getQiusuoHuifuId() == null) {
			Timestamp now = new Timestamp(System.currentTimeMillis());
			ukQiusuoHuifu.setReplytime(now);
			ukQiusuoHuifu.setReply(ContextUtil.getCurrentUser());
			String knowIds = getRequest().getParameter("knowIds");
			if (!knowIds.equals("")) {
				for (String id_know : knowIds.split(",")) {
					UkSysKnow usk = ukSysKnowService.get(Long
							.parseLong(id_know));
					ukQiusuoHuifu.getUkQiusuoHuifuKnows().add(usk);
				}
			}

			String fileIds = getRequest().getParameter("fileIds");
			if (!fileIds.equals("")) {
				for (String id_file : fileIds.split(",")) {
					FileAttach fa = FileAttachService.get(Long
							.parseLong(id_file));
					ukQiusuoHuifu.getUkQiusuoHuifuFiles().add(fa);
				}
			}
			Long id = ukQiusuoHuifu.getUkQiusuo().getQiusuoId();
			UkQiusuo uq = ukQiusuoService.get(id);
			uq.setHuifuCount(uq.getHuifuCount() + 1);
			ukQiusuoService.save(uq);
			ukQiusuoHuifuService.save(ukQiusuoHuifu);
		} else {
			UkQiusuoHuifu orgUkQiusuoHuifu = ukQiusuoHuifuService
					.get(ukQiusuoHuifu.getQiusuoHuifuId());
			try {
				BeanUtil.copyNotNullProperties(orgUkQiusuoHuifu, ukQiusuoHuifu);
				ukQiusuoHuifuService.save(orgUkQiusuoHuifu);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	public String listOne() {
		String qiusuoId = getRequest().getParameter("id");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_ukQiusuo.qiusuoId_L_EQ", qiusuoId);
		List<UkQiusuoHuifu> list = ukQiusuoHuifuService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer serializer = JsonUtil.getJSONSerializer();
		buff.append(serializer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}
}
