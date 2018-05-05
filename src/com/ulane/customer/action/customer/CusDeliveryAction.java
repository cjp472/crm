package com.ulane.customer.action.customer;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.core.util.HttpUtil;
import com.ulane.customer.model.customer.CusDelivery;
import com.ulane.customer.service.customer.CusDeliveryService;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class CusDeliveryAction extends BaseAction {
	@Resource
	private CusDeliveryService cusDeliveryService;
	private CusDelivery cusDelivery;

	private Long deliveryId;

	private static final String URL = "http://localhost:9999/basic/test/addCustAddr";
	private static final String RESPONE_DATA = "result";

	public Long getDeliveryId() {
		return deliveryId;
	}

	public void setDeliveryId(Long deliveryId) {
		this.deliveryId = deliveryId;
	}

	public CusDelivery getCusDelivery() {
		return cusDelivery;
	}

	public void setCusDelivery(CusDelivery cusDelivery) {
		this.cusDelivery = cusDelivery;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<CusDelivery> list = cusDeliveryService.getAll(filter);

		Type type = new TypeToken<List<CusDelivery>>() {
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
				cusDeliveryService.remove(new Long(id));
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
		CusDelivery cusDelivery = cusDeliveryService.get(deliveryId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(cusDelivery));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (cusDelivery.getDeliveryId() == null) {
			cusDelivery.setCreUseId(ContextUtil.getCurrentUserId());
			cusDelivery.setCreDat(new Date());
			cusDeliveryService.save(cusDelivery);
			// postHttp(cusDelivery);
		} else {
			CusDelivery orgCusDelivery = cusDeliveryService.get(cusDelivery
					.getDeliveryId());
			try {
				BeanUtil.copyNotNullProperties(orgCusDelivery, cusDelivery);
				cusDeliveryService.save(orgCusDelivery);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	/**
	 * 显示一个客户的所有地址列表
	 */
	public String listOne() {
		String cusId = getRequest().getParameter("cusId");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_customer.customerId_L_EQ", cusId);
		List<CusDelivery> list = cusDeliveryService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		// JSONSerializer serializer = new JSONSerializer();
		// serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new
		// String[] { "applyTime"});
		// buff.append(serializer.exclude(new
		// String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));

		JSONSerializer json = JsonUtil.getJSONSerializer();
		buff.append(json.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	private String postHttp(CusDelivery cd) {

		String result = HttpUtil.post(URL, prepareData(cusDelivery), "UTF-8");
		logger.debug("post return: " + result);
		List<Map<String, String>> data = converRespone(result);
		logger.info("客户送货地址同步成功.客户：" + data.get(0).get("cust_id") + ".送货地址"
				+ data.get(0).get("dlv_addr_seq"));
		return result;
	}

	/**
	 * 准备http请求的数据.
	 * 
	 * @param cd
	 * @return
	 */
	private String prepareData(CusDelivery cd) {
		Map<String, String> data = new HashMap<String, String>();
		JSONSerializer json = JsonUtil.getJSONSerializer();
		String data_s = json.serialize(data);
		logger.debug("post data" + data_s);
		return data_s;
	}

	@SuppressWarnings("unchecked")
	private List<Map<String, String>> converRespone(String respone) {
		JSONDeserializer<Map<String, Object>> json_D = new JSONDeserializer<Map<String, Object>>();
		Map<String, Object> respone_m = json_D.deserialize(respone, Map.class);
		return (List<Map<String, String>>) respone_m.get(RESPONE_DATA);
	}

	public static void main(String[] args) {
		CusDeliveryAction o = new CusDeliveryAction();
		String str = o.postHttp(null);
		// JSONDeserializer<Map> json_D = new JSONDeserializer();
		// Map data = json_D.deserialize(str, Map.class);
		// for (Object key : data.keySet()) {
		// System.out.println("key:" + key + "," + key.getClass() + ",value:"
		// + data.get(key) + "," + data.get(key).getClass());
		// if (key.equals("result")) {
		// List l = (List) data.get(key);
		// for (Object tt : l) {
		// System.out.println(tt.getClass() + "-" + tt);
		// }
		// }
		// }
		// System.out.println(data);
	}
}
