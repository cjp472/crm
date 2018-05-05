package com.ulane.supply.action.sales;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.jbpm.api.task.Task;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.StringUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.customer.CustomerService;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.core.plugin.client.NcSoapClientManager;
import com.ulane.core.util.HttpUtil;
import com.ulane.customer.model.customer.CusDelivery;
import com.ulane.customer.service.customer.CusDeliveryService;
import com.ulane.supply.model.goods.ScGoods;
import com.ulane.supply.model.sales.ScBizOrderSales;
import com.ulane.supply.model.sales.ScBizSalesDetail;
import com.ulane.supply.model.supply.ScBizOrderFee;
import com.ulane.supply.service.goods.ScGoodsService;
import com.ulane.supply.service.sales.ScBizOrderSalesService;
import com.ulane.supply.service.sales.ScBizSalesDetailService;
import com.ulane.supply.service.supply.ScBizOrderFeeService;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class ScBizOrderSalesAction extends BaseAction {
	// 家有商品订购历史查询接口(临时放这) by wangzj
	// private static final String URL =
	// "http://192.168.222.42:8080/Interface/service/";

	@Resource
	private ScBizOrderSalesService scBizOrderSalesService;
	private ScBizOrderSales scBizOrderSales;
	@Resource
	private ScGoodsService scGoodsService;
	@Resource
	private ScBizOrderFeeService scBizOrderFeeService;

	@Resource
	private ScBizSalesDetailService scBizSalesDetailService;
	@Resource
	private CusDeliveryService cusDeliveryService;
	@Resource
	private NcSoapClientManager ncSoapClientManager;

	@Resource
	private JbpmService jbpmService;
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private AppUserService appUserService;
	private Long bizOrderId;
	@Resource
	private AppUserService userService;
	@Resource
	private CustomerService customerService;

	public Long getBizOrderId() {
		return bizOrderId;
	}

	public void setBizOrderId(Long bizOrderId) {
		this.bizOrderId = bizOrderId;
	}

	public ScBizOrderSales getScBizOrderSales() {
		return scBizOrderSales;
	}

	public void setScBizOrderSales(ScBizOrderSales scBizOrderSales) {
		this.scBizOrderSales = scBizOrderSales;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<ScBizOrderSales> list = scBizOrderSalesService.getAll(filter);

		for (ScBizOrderSales sbos : list) {
			if (sbos.getCustId() != null) {
				sbos.cusName = customerService.get(sbos.getCustId())
						.getCustomerName();
			}
		}

		// Type type=new TypeToken<List<ScBizOrderSales>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "applyTime" });
		buff.append(serializer.exclude(
				new String[] { "class", "conHiss", "conBwListBusRuls" })
				.serialize(list));

		// Gson gson=new Gson();
		// buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String listByCus() {
		String customerNo = getRequest().getParameter("customerNo");
		QueryFilter filter = new QueryFilter(getRequest());
		if (customerNo != null && !customerNo.equals("")) {
			QueryFilter cusFilter = new QueryFilter();
			cusFilter.addFilter("Q_customerNo_S_EQ", customerNo);
			List<Customer> listCus = customerService.getAllNoRequest(cusFilter);
			Customer customer = listCus.get(0);
			filter.addFilter("Q_custId_L_EQ", customer.getCustomerId()
					.toString());
		}
		List<ScBizOrderSales> list = scBizOrderSalesService.getAll(filter);

		for (ScBizOrderSales sbos : list) {
			if (sbos.getCustId() != null) {
				sbos.cusName = customerService.get(sbos.getCustId())
						.getCustomerName();
			}
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "applyTime" });
		buff.append(serializer.include(
				new String[] { "bizOrderId", "cusName", "bizOrderNumber" })
				.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 通过接口展示订单列表
	 */
	public String listSoapByCus() {
		String customerNo = getRequest().getParameter("customerNo");
		String orderNumber = getRequest().getParameter("bizOrderNumber");
		String start = "0";
		String limit = "12";
		String sta = getRequest().getParameter("start");
		String lim = getRequest().getParameter("limit");
		if (sta != null && lim != null) {
			start = sta;
			limit = lim;
		}
		String url = HttpUtil.PROXY_URL + "/getOrderList";
		Map<String, String> data_map = new HashMap<String, String>();
		data_map.put("start", start);
		data_map.put("limit", limit);
		data_map.put("cust_id", customerNo);
		if (orderNumber != null && !orderNumber.equals("")) {
			data_map.put("ord_id", orderNumber);
		}
		String jsonData = JsonUtil.getJSONSerializer().serialize(data_map);
		String data_result = HttpUtil.post(
				HttpUtil.PROXY_URL + "/getOrderList", jsonData, "UTF-8");
		// System.out.println(data_result);

		JSONDeserializer<Map> ds = new JSONDeserializer<Map>();
		Map<String, Object> data = ds.deserialize(data_result);
		List list = (List) data.get("result");
		// Map data_one = (Map) list.get(0);
		// String prc = (String)data_one.get("prc");//金额
		// System.out.println("one : " + data_one.get("ord_id"));
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(data.get("count")).append(",result:[");
		if (list != null) {
			for (int i = 0; i < list.size(); i++) {
				if (i > 0)
					buff.append(",");
				Map map = (Map) list.get(i);
				buff.append("{\"bizOrderNumber\":\"" + map.get("ord_id")
						+ "\",\"totalInAmount\":\"" + map.get("prc") + "\",");
				buff.append("\"state\":\"" + map.get("ord_stat_cd")
						+ "\",\"deliverState\":\"" + map.get("dlv_cd") + "\"}");
			}
		}
		buff.append("]}");

		setJsonString(buff.toString());

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
				scBizOrderSalesService.remove(new Long(id));
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
		ScBizOrderSales scBizOrderSales = scBizOrderSalesService
				.get(bizOrderId);

		// Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		// sb.append(gson.toJson(scBizOrderSales));

		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),
				new String[] { "alertTime", "createTime", "updateTime",
						"finishTime" });
		sb.append(serializer.serialize(scBizOrderSales));

		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (scBizOrderSales.getBizOrderId() == null) {
			scBizOrderSales.setCreateUser(ContextUtil.getCurrentUser());
			scBizOrderSales.setCreateTime(new Date());
			scBizOrderSalesService.save(scBizOrderSales);
		} else {
			ScBizOrderSales orgScBizOrderSales = scBizOrderSalesService
					.get(scBizOrderSales.getBizOrderId());
			try {
				BeanUtil.copyNotNullProperties(orgScBizOrderSales,
						scBizOrderSales);
				scBizOrderSalesService.save(orgScBizOrderSales);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	/**
	 * 订单结算
	 * 
	 * @return
	 */
	public String jiesuan() {
		String goods = getRequest().getParameter("goods");
		if (StringUtils.isNotEmpty(goods)) {
			Gson gson = new Gson();
			ScBizSalesDetail[] salesArr = (ScBizSalesDetail[]) gson.fromJson(
					goods, ScBizSalesDetail[].class);
			scBizOrderSales.getScBizSalesDetails().clear();
			if (salesArr != null) {
				for (ScBizSalesDetail detail : salesArr) {
					detail.setScBizOrderSales(scBizOrderSales);
					detail.setScGoods(scGoodsService.get(detail.scgoodsId));
					scBizOrderSales.addDetsils(detail);
				}
			}
		}
		String yufei = getRequest().getParameter("yunFei");
		scBizOrderSales.setExt11(new BigDecimal(yufei));
		scBizOrderSales.setBizOrderType((short) 0);
		scBizOrderSales.setCreateUser(ContextUtil.getCurrentUser());
		scBizOrderSales.setBizOrderStatus((short) 0);
		scBizOrderSales.setBizOrderSubStatus((short) 0);
		scBizOrderSales.setCreateTime(new Date());
		scBizOrderSales.setExt1("1");
		// 支付信息
		// SC_ORDER_FEE_TYPE.put(3,'储值金');
		// SC_ORDER_FEE_TYPE.put(1,'积分');
		// SC_ORDER_FEE_TYPE.put(2,'暂存款');
		// SC_ORDER_FEE_TYPE.put(4,'代金券');
		// SC_ORDER_FEE_TYPE.put(5,'礼金');
		String JiFen = getRequest().getParameter("useJiFen");
		String ZanCunKuan = getRequest().getParameter("useZanCunKuan");
		String ChuZhiJin = getRequest().getParameter("useChuZhiJin");
		String left = getRequest().getParameter("rb-auto");
		scBizOrderSalesService.jieSuan(scBizOrderSales, JiFen, ZanCunKuan,
				ChuZhiJin, "", "", left);
		return SUCCESS;
	}

	/**
	 * 工作流显示列表
	 */
	public String listFlow() {

		int start = Integer.parseInt(getRequest().getParameter("start"));
		int limit = Integer.parseInt(getRequest().getParameter("limit"));

		QueryFilter qf = new QueryFilter(getRequest());
		List<ScBizOrderSales> rs_first = scBizOrderSalesService.getAll(qf);
		StringBuffer ids_first = new StringBuffer();
		if (rs_first.size() > 0) {
			for (ScBizOrderSales uka : rs_first) {
				ids_first.append(uka.getBizOrderId() + ",");
			}
		}
		if (ids_first.length() == 0) {
			ids_first.append("-1");
		}
		Map<Long, Boolean> ids = scBizOrderSalesService.getSelectId(start,
				limit, ContextUtil.getCurrentUserId().toString(),
				"ScBizOrderSalesFlowView", ids_first.toString());

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':"
				+ scBizOrderSalesService.getSelectIdCount(start, limit,
						ContextUtil.getCurrentUserId().toString(),
						"ScBizOrderSalesFlowView", ids_first.toString())
				+ ",result:[");

		for (Long id : ids.keySet()) {
			ScBizOrderSales sbos = scBizOrderSalesService.get(id);
			if (sbos != null) {
				fillData_apply(sbos, buff, ids.get(id));
			}
		}
		// 删除,
		if (ids.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}

		buff.append("]}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	private void fillData_apply(ScBizOrderSales ai, StringBuffer buff,
			Boolean isFinish) {
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.create();
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		List<Task> curTasks = new ArrayList<Task>();
		// if (map.containsKey(ai.getApplyId())) {
		if (ai.getRunid() != null) {// 把当前正在运行的任务加载出来，以方便用户查找,但会影响性能
			ProcessRun processRun = processRunService.get(ai.getRunid()
					.longValue());
			buff.append(ser.include("createBy").exclude("createBy")
					.exclude("updateBy").serialize(ai));
			buff.deleteCharAt(buff.length() - 1);// 对于一个
			if (isFinish) {
				buff.append(",'approveResult':'流程结束'");
			} else {
				buff.append(",'approveResult':'待审批'");
			}
			if (processRun.getPiId() != null) {
				curTasks = jbpmService.getTasksByPiId(processRun.getPiId());
				// 添加状态
				buff.append(",'piId':'").append(processRun.getPiId())
						.append("'");
				buff.append(",'tasks':");
				List<Map<String, Object>> tasks = new ArrayList<Map<String, Object>>();

				for (Task task : curTasks) {
					if (task.getAssignee() != null) {
						String[] assigneeArr = task.getAssignee().split(",");
						for (String id : assigneeArr) {
							if (!"".equals(id)) {
								Map<String, Object> m = new HashMap<String, Object>();
								m.put("taskId", task.getId());
								m.put("taskName", task.getName());
								// TODO assignee String类型 暂需转化
								AppUser user = appUserService.get(new Long(id));
								if (user != null) {
									m.put("userId", id);
									m.put("fullname", user.getFullname());
								}
								tasks.add(m);
							}
						}
					} else {
						Map<String, Object> m = new HashMap<String, Object>();
						m.put("taskId", task.getId());
						m.put("taskName", task.getName());
						m.put("userId", "");
						m.put("fullname", "无");
						tasks.add(m);
					}
				}
				buff.append(JsonUtil.getJSONSerializer().serialize(tasks));
				buff.append("},");
			} else {
				buff.append(",'piId':null");
				buff.append(",'tasks':[]},");
			}
		}
	}

	public String validatChuzhijin() {
		StringBuffer sb = new StringBuffer("{success:");
		Boolean vali_user = false;
		Boolean vali_role = false;
		String msg = "认证成功";
		String username = getRequest().getParameter("username");
		String password = getRequest().getParameter("password");
		// 用户名不为空
		if (!"".equals(username) && username != null) {
			AppUser user = userService.findByUserName(username);
			// 验证用户是否存在
			if (user != null) {
				// 密码不为空
				if (StringUtils.isNotEmpty(password)) {
					// 密码加密
					String newPassword = StringUtil.encryptSha256(password);
					// 密码验证
					if (user.getPassword().equalsIgnoreCase(newPassword)) {
						vali_user = true;
						for (AppRole r : user.getRoles()) {
							if (r.getRoleName().equals("储值金授权")) {
								vali_role = true;
								break;
							}
						}
					}
				}
			}
		}
		if (!vali_user) {
			msg = "用户信息填写错误.";
		}
		if (!vali_role) {
			msg = "用户没有权限.";
		}

		sb.append(vali_role + ",data:'" + msg + "'}");
		jsonString = sb.toString();
		return SUCCESS;
	}

	public String validatzancunkuan() {
		StringBuffer sb = new StringBuffer("{success:");
		Boolean vali_user = false;
		Boolean vali_role = false;
		String msg = "认证成功";
		String username = getRequest().getParameter("username");
		String password = getRequest().getParameter("password");
		// 用户名不为空
		if (!"".equals(username) && username != null) {
			AppUser user = userService.findByUserName(username);
			// 验证用户是否存在
			if (user != null) {
				// 密码不为空
				if (StringUtils.isNotEmpty(password)) {
					// 密码加密
					String newPassword = StringUtil.encryptSha256(password);
					// 密码验证
					if (user.getPassword().equalsIgnoreCase(newPassword)) {
						vali_user = true;
						for (AppRole r : user.getRoles()) {
							if (r.getRoleName().equals("暂存款授权")) {
								vali_role = true;
								break;
							}
						}
					}
				}
			}
		}
		if (!vali_user) {
			msg = "用户信息填写错误.";
		}
		if (!vali_role) {
			msg = "用户没有权限.";
		}

		sb.append(vali_role + ",data:'" + msg + "'}");
		jsonString = sb.toString();
		return SUCCESS;
	}

	/**
	 * 暂存结算
	 * 
	 * @return
	 */
	public String zancun() {
		String goods = getRequest().getParameter("goods");
		if (StringUtils.isNotEmpty(goods)) {
			Gson gson = new Gson();
			ScBizSalesDetail[] salesArr = (ScBizSalesDetail[]) gson.fromJson(
					goods, ScBizSalesDetail[].class);
			scBizOrderSales.getScBizSalesDetails().clear();
			if (salesArr != null) {
				for (ScBizSalesDetail detail : salesArr) {
					detail.setScBizOrderSales(scBizOrderSales);
					detail.setScGoods(scGoodsService.get(detail.scgoodsId));
					scBizOrderSales.addDetsils(detail);
				}
			}
		}
		String yufei = getRequest().getParameter("yunFei");
		scBizOrderSales.setExt11(new BigDecimal(yufei));
		scBizOrderSales.setBizOrderType((short) 0);
		scBizOrderSales.setCreateUser(ContextUtil.getCurrentUser());
		scBizOrderSales.setBizOrderStatus((short) 0);
		scBizOrderSales.setBizOrderSubStatus((short) 0);
		scBizOrderSales.setCreateTime(new Date());
		scBizOrderSales.setExt1("0");
		// 支付信息
		// SC_ORDER_FEE_TYPE.put(3,'储值金');
		// SC_ORDER_FEE_TYPE.put(1,'积分');
		// SC_ORDER_FEE_TYPE.put(2,'暂存款');
		// SC_ORDER_FEE_TYPE.put(4,'代金券');
		// SC_ORDER_FEE_TYPE.put(5,'礼金');
		String JiFen = getRequest().getParameter("useJiFen");
		String ZanCunKuan = getRequest().getParameter("useZanCunKuan");
		String ChuZhiJin = getRequest().getParameter("useChuZhiJin");
		String left = getRequest().getParameter("rb-auto");
		scBizOrderSalesService.jieSuan(scBizOrderSales, JiFen, ZanCunKuan,
				ChuZhiJin, "", "", left);
		return SUCCESS;
	}

	/**
	 * 历史订单
	 * 
	 * @return
	 */
	public String getHistory() {

		Long cusId = Long.parseLong(getRequest().getParameter("cusId"));
		QueryFilter qf = new QueryFilter();
		qf.addFilter("Q_custId_L_EQ", cusId.toString());
		List<ScBizOrderSales> rs = scBizOrderSalesService.getAllNoRequest(qf);

		for (ScBizOrderSales sos : rs) {
			QueryFilter qf2 = new QueryFilter();
			qf2.addFilter("Q_bizOrderId_L_EQ", sos.getBizOrderId().toString());
			List<ScBizOrderFee> tmp_rs = scBizOrderFeeService
					.getAllNoRequest(qf2);
			StringBuffer sb = new StringBuffer();
			for (ScBizOrderFee tmp : tmp_rs) {
				sb.append(zhifuType.get(tmp.getFeeFlag().toString()) + "+");
			}
			if (tmp_rs.size() != 0) {
				sos.payInfo = sb.substring(0, sb.length() - 1);
			} else {
				sos.payInfo = "";
			}
		}

		JSONSerializer json = JsonUtil.getJSONSerializer();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(rs.size()).append(",result:");

		buff.append(json.serialize(rs));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	static Map<String, String> zhifuType = new HashMap<String, String>();
	static {
		zhifuType.put("3", "储值金");
		zhifuType.put("1", "积分");
		zhifuType.put("2", "暂存款");
		zhifuType.put("4", "代金券");
		zhifuType.put("5", "礼金");
	}

	public String getByCurName() {
		String cusName = getRequest().getParameter("cusName");
		QueryFilter qf = new QueryFilter();
		qf.addFilter("Q_customerName_S_LK", cusName);
		List<Customer> cs = customerService.getAllNoRequest(qf);
		StringBuffer csId = new StringBuffer();
		for (Customer tmp : cs) {
			csId.append(tmp.getCustomerId() + ",");
		}

		List<ScBizOrderSales> rs;
		if (csId.length() != 0) {
			QueryFilter qf2 = new QueryFilter();
			qf2.addFilter("Q_custId_L_LIN",
					csId.substring(0, csId.length() - 1));
			rs = scBizOrderSalesService.getAllNoRequest(qf2);
			for (ScBizOrderSales sbos : rs) {
				sbos.cusName = customerService.get(sbos.getCustId())
						.getCustomerName();
			}
		} else {
			rs = new ArrayList<ScBizOrderSales>();
		}

		JSONSerializer json = JsonUtil.getJSONSerializer();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(rs.size()).append(",result:");

		buff.append(json.serialize(rs));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 显示订单详情
	 * 
	 * @return
	 */
	public String detail() {
		Long id = Long.parseLong(getRequest().getParameter("bizOrderId"));
		ScBizOrderSales sbps = scBizOrderSalesService.get(id);
		Map<Long, Integer> id_amount = new HashMap<Long, Integer>();

		// 根据订单获取商品
		StringBuffer sb = new StringBuffer();
		for (ScBizSalesDetail tmp : sbps.getScBizSalesDetails()) {
			sb.append(tmp.getGoodsId() + ",");
			id_amount.put(tmp.getGoodsId(), tmp.getGoodsCount().intValue());
		}
		QueryFilter qf = new QueryFilter();
		List<ScGoods> goods = null;
		if (sb.length() > 0) {
			qf.addFilter("Q_goodsId_S_LIN", sb.substring(0, sb.length() - 1));
			goods = scGoodsService.getAllNoRequest(qf);
			for (ScGoods tmp : goods) {
				tmp.setAmount(id_amount.get(tmp.getGoodsId()));
			}
		}

		// 获取支付信息
		QueryFilter qf2 = new QueryFilter();
		qf2.addFilter("Q_bizOrderId_L_EQ", id.toString());
		List<ScBizOrderFee> fees = scBizOrderFeeService.getAllNoRequest(qf2);

		JSONSerializer json = JsonUtil.getJSONSerializer();
		// json.exclude("*.handler");
		StringBuffer buff = new StringBuffer("{success:true,data:");
		buff.append(json.serialize(sbps));
		buff.append(",goods:");
		buff.append(json.serialize(goods));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	// 订单接口　KYQ （将数据库里的数据取出来）
	public String getDingDan() {
		// String jsongd
		// ="{'orderType': '1','customerName': '段三','customerGender': '2','customerNo': '090999999','contacta': '110','contactb': '112','orderSorce': '1','order': '1','orderProject': '2','level': '1','responseTime': '2012-8-14 15:00:00','completionTime': '2012-8-14 15:21:06','content': '天气太热','noteAppeal': '吃冰棍','detailType':'0','detailId':'1','orderTime':'2012-8-14 15:21:06'}";

		// SC_销售业务单(SC_BIZ_ORDER_SALES)
		String bizOrderId = getRequest().getParameter("bizOrderId");
		ScBizOrderSales scBizOrderSales = scBizOrderSalesService.get(new Long(
				bizOrderId));

		// SC_业务单费用(SC_BIZ_ORDER_FEE) 一对多的关系
		java.util.Set scBizOrderFees = scBizOrderSales.getScBizOrderFees();

		// SC_销售业务单明细（SC_BIZ_SALES_DETAIL）一对多的关系
		java.util.Set scBizSalesDetails = scBizOrderSales
				.getScBizSalesDetails();

		// CUS配送地址(CUS_DELIVERY) 一对一的关系
		String deliveryId = getRequest().getParameter("deliveryId");
		CusDelivery cusDelivery = cusDeliveryService.get(new Long(deliveryId));
		String regionName = cusDelivery.getRegionGuojia().getRegionName();

		JSONSerializer ser = JsonUtil.getJSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.exclude(
				new String[] { "planOutAmount", "planInAmount",
						"discountAfterSubtotal", "ext1", "ext2", "ext3",
						"ext4", "ext5", "ext6", "ext7", "ext8", "ext9",
						"ext10", "ext11", "ext12", "ext13", "ext14", "ext15",
						"ext16", "ext17", "ext18", "ext19", "ext20",
						"cusDelivery", "approvalStatus", "nodeName", "runid" })
				.serialize(scBizOrderSales));
		sb.deleteCharAt(sb.length() - 1); // 去掉最后的大括号
		sb.append("\"scBizOrderFees\":\"");
		sb.append(ser.serialize(scBizOrderFees));
		sb.append("\",");
		sb.append("\"scBizSalesDetails\":\"");
		sb.append(ser
				.exclude(
						new String[] { "scgoodsId", "ext1", "ext2", "ext3",
								"ext4", "ext5", "ext6", "ext7", "ext8", "ext9",
								"ext10", "ext11", "ext12", "ext13", "ext14",
								"ext15", "ext16", "ext17", "ext18", "ext19",
								"ext20", "scBizOrderSales", "scGoods",
								"scWarehouse", "bizOrderId", "warehouseId" })
				.serialize(scBizSalesDetails));
		sb.append("\",");
		sb.append("\"CusDelivery\":\"");
		sb.append(ser.exclude(
				new String[] { "deliveryPost", "creUseId", "creDat",
						"updUseId", "updDat", "note", "customer",
						"regionSheng", "regionShi", "regionQu", "customerid",
						"regionGuojia" }).serialize(cusDelivery));
		sb.deleteCharAt(sb.length() - 1); // 去掉最后的大括号
		sb.append(",\"regionGuojia\":\"").append(regionName);
		sb.append("\"");
		sb.append("}\"");
		sb.append("}}");

		ncSoapClientManager.getDingDan(sb.toString());
		System.out.println("sb=" + sb);
		return SUCCESS;
	}
}
