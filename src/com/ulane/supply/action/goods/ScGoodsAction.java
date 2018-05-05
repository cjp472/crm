package com.ulane.supply.action.goods;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.Region;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObComProduct;
import com.ulane.callout.service.outb.ObComProductService;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.core.util.HttpUtil;
import com.ulane.know.model.know.UkKnowKeyword;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowKeywordService;
import com.ulane.know.service.know.UkSysKnowService;
import com.ulane.supply.model.goods.ScGoods;
import com.ulane.supply.model.goods.ScGoodsPrice;
import com.ulane.supply.model.goods.ScProductClassify;
import com.ulane.supply.model.goods.ScProductCom;
import com.ulane.supply.service.goods.ScGoodsPriceService;
import com.ulane.supply.service.goods.ScGoodsService;
import com.ulane.supply.service.goods.ScProductClassifyService;
import com.ulane.supply.service.goods.ScProductComService;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class ScGoodsAction extends BaseAction {
	Logger log = LoggerFactory.getLogger(ScGoodsAction.class);
	@Resource
	private UkKnowKeywordService ukKnowKeywordService;
	@Resource
	private UkSysKnowService ukSysKnowService;
	@Resource
	private ScGoodsService scGoodsService;
	@Resource
	private ObComService obComService;
	@Resource
	private ObComProductService obComProductService;
	@Resource
	private ScProductComService scProductComService;

	@Resource
	private ScGoodsPriceService scGoodsPriceService;
	@Resource
	private ScProductClassifyService scProductClassifyService;

	private ScGoods scGoods;

	private Long goodsId;

	public Long getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}

	public ScGoods getScGoods() {
		return scGoods;
	}

	public void setScGoods(ScGoods scGoods) {
		this.scGoods = scGoods;
	}

	/**
	 * 选择器产品显示列表
	 * 
	 * @author lzm
	 */
	public String productNamlist() {
		String comid = getRequest().getParameter("comid");
		try{
		QueryFilter filter = new QueryFilter(getRequest());
		// filter.addFilter("Q_numbers_S_EQ ", "1002");
		// 取出所有产品
		List<ScGoods> list = scGoodsService.getAll(filter);
		Iterator it = list.iterator();
		if (!("null").equals(comid) && comid != null) {
			// 已绑定的产品
			ObCom obCom = obComService.get(new Long(comid));
			Set<ObComProduct> productlist = obCom.getObComProduct();
			// 剔除已绑定的名单
			while (it.hasNext()) {
				ScGoods o = (ScGoods) it.next();
				if (o.getScGoodsPrice() != null) {
					ScGoodsPrice scGoodsPrice = new ScGoodsPrice();
					if(o.getScGoodsPrice()!=null ||!("").equals(o.getScGoodsPrice()) ){
						scGoodsPrice = scGoodsPriceService.get(o.getScGoodsPrice().getGoodsPriceId());
						o.setRetailPrice(scGoodsPrice.getRetailPrice());
						o.setReportPrice(scGoodsPrice.getReportPrice());
					}
					if (o.getProductClassifyId() != null && !("").equals(o.getProductClassifyId())) {
						ScProductClassify calssify = scProductClassifyService
								.get(o.getProductClassifyId());
						o.setGoodtype(calssify.getProductClassifyName());
					}
				}
				for (ObComProduct producttwo : productlist) {

					ScGoods good = scGoodsService.get(producttwo.getGoodsId());
					if (good.equals(o)) {
						it.remove();
					}
				}
			}
		} else {
			while (it.hasNext()) {
				ScGoods o = (ScGoods) it.next();
				if (o.getScGoodsPrice() != null) {
					ScGoodsPrice scGoodsPrice = new ScGoodsPrice();
					if(o.getScGoodsPrice()!=null ||!("").equals(o.getScGoodsPrice()) ){
						scGoodsPrice = scGoodsPriceService.get(o.getScGoodsPrice().getGoodsPriceId());
						o.setRetailPrice(scGoodsPrice.getRetailPrice());
						o.setReportPrice(scGoodsPrice.getReportPrice());
					}
					if (o.getProductClassifyId() != null && !("").equals(o.getProductClassifyId())) {
						ScProductClassify calssify = scProductClassifyService
								.get(o.getProductClassifyId());
						o.setGoodtype(calssify.getProductClassifyName());
					}
				}
			}

		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer json = JsonUtil.getJSONSerializer("createtime",
				"updatetime");
		buff.append(json.exclude(new String[] { "class" }).serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		} catch (Exception ex) {
			logger.error(ex.getMessage());
		}
		return SUCCESS;
	}

	/**
	 * 绑定产品显示列表
	 * 
	 * @author lzm
	 */
	public String productBDNamlist() {
		String ids = getRequest().getParameter("comId");
		java.util.Set<ScGoods> obComProductlist = new java.util.HashSet<ScGoods>();
		if (!("null").equals(ids)) {
			ObCom obCom = obComService.get(new Long(ids));
			// 通过中间表找到产品id
			for (ObComProduct producttwo : obCom.getObComProduct()) {
				
				ScGoods good = scGoodsService.get(producttwo.getGoodsId());
				ScGoodsPrice scGoodsPrice = new ScGoodsPrice();
				if(good.getScGoodsPrice()!=null){
				if (good.getScGoodsPrice() != null || !("").equals(good.getScGoodsPrice())) {
					scGoodsPrice = scGoodsPriceService.get(good.getScGoodsPrice().getGoodsPriceId());
					good.setRetailPrice(scGoodsPrice.getRetailPrice());
					good.setReportPrice(scGoodsPrice.getReportPrice());
					good.setComSta(producttwo.getStatus());
					if (good.getProductClassifyId() != null || !("").equals(good.getScProductClassify())) {
						ScProductClassify calssify = scProductClassifyService
								.get(good.getProductClassifyId());
						good.setGoodtype(calssify.getProductClassifyName());
					}
				}
				}
				//活动绑定的产品是否有效
				good.setComSta(producttwo.getStatus());
				obComProductlist.add(good);
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(obComProductlist.size()).append(",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			buff.append(jsonSer.serialize(obComProductlist));
			buff.append("}");

			jsonString = buff.toString();

		}
		return SUCCESS;

	}

	/**
	 * 删除绑定在活动中的产品
	 */

	public String shanChuChanPin() {
		// 活动id
		String ids = getRequest().getParameter("comId"); 
		// 产品id
		String[] goodids = getRequest().getParameterValues("ids");
		if (ids != null) {
			ObCom obcom = obComService.get(Long.parseLong(ids));
			// 删除活动绑定产品
			for (ObComProduct product : obcom.getObComProduct()) {
				if (goodids != null) {
					for (String goodid : goodids) {
						// 删除伪关系表数据
						if (product.getGoodsId() == Long.parseLong(goodid)) {
							obComProductService.remove(product);
						}
					}
				}
			}
			// obComService.save(obcom);
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 注销已绑定产品
	 */

	public String zhuXiaoChanPin() {

		String ids = getRequest().getParameter("comId");
		String[] goodsId = getRequest().getParameterValues("ids");
		if (!("null").equals(ids)) {
			ObCom obCom = obComService.get(new Long(ids));
			java.util.List<ObComProduct> productlist = new java.util.ArrayList<ObComProduct>();
			for (ObComProduct product : obCom.getObComProduct()) {
				if(!("").equals(goodsId) || goodsId!=null){
					for(String goodsid:goodsId)
					if(goodsid.equals(product.getGoodsId().toString()) || goodsid==product.getGoodsId().toString()){
						productlist.add(product);
					}
				}
			}
			for(int i=productlist.size();i>=0;i--){
				try {
					ObComProduct product=productlist.get(i);
					product.setStatus(2l);// 标记产品已注销
					obComProductService.save(product);
					obCom.getObComProduct().add(product);
					obComService.save(obCom);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
			jsonString = "{success:true}";
			}

		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isLocked_SN_EQ", "0");// 未锁定的记录
		List<ScGoods> list = scGoodsService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer json = getShowJsonSer();
		buff.append(json.serialize(list));

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
				scGoodsService.remove(new Long(id));
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
		ScGoods scGoods = scGoodsService.get(goodsId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(scGoods));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (scGoods.getGoodsId() == null) {
			scGoodsService.save(scGoods);
		} else {
			ScGoods orgScGoods = scGoodsService.get(scGoods.getGoodsId());
			try {
				BeanUtil.copyNotNullProperties(orgScGoods, scGoods);
				scGoodsService.save(orgScGoods);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	/**
	 * 获取一个产品的所有信息
	 * 
	 * @return
	 */
	public String getAll() {
		JSONSerializer json = getShowJsonSer();
		StringBuffer sb = new StringBuffer("{success:true,data:{parent:");
		Long id = Long.parseLong(getRequest().getParameter("goodId"));
		ScGoods sg = scGoodsService.get(id);
		// 查询关系表中是否存在该id为父产品的
		QueryFilter qf = new QueryFilter();
		qf.addFilter("Q_productId.goodsId_L_EQ", id.toString());
		List<ScProductCom> spc = scProductComService.getAllNoRequest(qf);

		if (spc.size() != 0) {
			log.debug("产品为组合产品," + sg.getGoodsName());
			sb.append(json.serialize(sg));
			List<ScGoods> sgs = new ArrayList<ScGoods>();
			for (ScProductCom sp_tmp : spc) {
				ScGoods sgone = sp_tmp.getComboGoodsId();
				sgone.setAmount(sp_tmp.getProcomCount());
				sgs.add(sgone);
				log.debug("子产品：" + sp_tmp.getComboGoodsId().getGoodsName());
			}
			sb.append(",sub:" + json.serialize(sgs));
		} else {
			sb.append(json.serialize(sg));
			log.debug("产品为独立产品," + sg.getGoodsName());
			sb.append(",sub:null");
		}
		sb.append("}}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 显示tuijian列表
	 */
	public String tuiJianList() {
		Long comId = Long.parseLong(getRequest().getParameter("comId"));
		ObCom oc = obComService.get(comId);
		List<ScGoods> list = new ArrayList<ScGoods>();
		for (ObComProduct tmp : oc.getObComProduct()) {
			log.debug("商品id" + tmp.getGoodsId());
			list.add(scGoodsService.get(tmp.getGoodsId()));
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");
		JSONSerializer json = getShowJsonSer();
		buff.append(json.serialize(list));

		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	public JSONSerializer getShowJsonSer() {
		JSONSerializer json = JsonUtil.getJSONSerializer();
		json.include("goodsId", "goodsName", "ext1", "ext2", "ext3", "ext4",
				"salesWay", "distribution", "integral", "integralType",
				"introduction", "useMeans", "goodsNote", "afterSales",
				"characteristics", "numbers",
				"scProductClassify.productClassifyName",
				"scProductClassify.productClassifyId",
				"scGoodsPrice.reportPrice", "scGoodsPrice.retailPrice",
				"amount", "fileAttachs.filePath", "style").exclude("*");
		return json;
	}

	public String getFAQ() {
		String goodsId = getRequest().getParameter("id");
		ScGoods scGood = scGoodsService.get(Long.parseLong(goodsId));
		String goodsName = scGood.getGoodsName();
		QueryFilter qf1 = new QueryFilter();
		qf1.addFilter("Q_keyWord_S_LK", goodsName);
		List<UkKnowKeyword> keywords = ukKnowKeywordService
				.getAllNoRequest(qf1);
		List<UkSysKnow> rs = new ArrayList<UkSysKnow>();
		if (keywords.size() != 0) {
			StringBuffer ids = new StringBuffer();
			for (UkKnowKeyword uk : keywords) {
				ids.append(uk.getKeywordId() + ",");
			}
			QueryFilter qf2 = new QueryFilter();
			qf2.addFilter("Q_ukKnowKeywords.keywordId_S_LIN",
					ids.substring(0, ids.length() - 1));
			rs = ukSysKnowService.getAllNoRequest(qf2);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(rs.size()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer();
		json.include("knowId", "sysKnowComment", "tiTle",
				"ukKnowKeywords.keyWord").exclude("*");
		buff.append(json.serialize(rs));

		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	public String getRelKnow() {
		QueryFilter qf = new QueryFilter();
		qf.addFilter("Q_busiType_L_EQ", "3");
		List<UkSysKnow> rs = ukSysKnowService.getAllNoRequest(qf);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(rs.size()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer();
		json.include("knowId", "tiTle").exclude("*");
		buff.append(json.serialize(rs));

		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	public String test() {

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("success", true);

		List<Region> list = new ArrayList<Region>();

		List<ScGoods> rs = scGoodsService.getGoodsByOrderId("3141567");
		data.put("count", list.size());
		data.put("data", list);

		JSONSerializer json = JsonUtil.getJSONSerializer();
		json.include("data");
		setJsonString(json.serialize(data));
		return SUCCESS;
	}

	/**
	 * 根据订单号获取商品信息
	 * 
	 * @return
	 */
	public String getGoodsByOrderId() {
		String bizOrderId = getRequest().getParameter("bizOrderNumber");
		
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
		data_map.put("ord_id", bizOrderId);
		String jsonData = JsonUtil.getJSONSerializer().serialize(data_map);
		String data_result = HttpUtil.post(
				HttpUtil.PROXY_URL + "/getOrderList", jsonData, "UTF-8");

		JSONDeserializer<Map> ds = new JSONDeserializer<Map>();
		Map<String, Object> data = ds.deserialize(data_result);
		List list = (List) data.get("result");
		Map<String, Object> data_goods = new HashMap<String, Object>();
		if(list != null){
			Map goods = (Map) list.get(0);
			data_goods.put("success", true);
			List data_list = new ArrayList();
			for (int i = 0; i < list.size(); i++) {
				for(Object obj : (List)goods.get("goods")){
					Map oneGood = (Map) obj;
					Map tmp = new HashMap();
					tmp.put("goodsId", oneGood.get("good_id"));
					tmp.put("ext1", oneGood.get("color_id"));
					tmp.put("style", oneGood.get("style_id"));
					tmp.put("ext2", oneGood.get("outgo_no"));
					tmp.put("goodsCount", oneGood.get("goodsCount"));
					tmp.put("goodsType", oneGood.get("goodType"));
					tmp.put("goodsName", oneGood.get("good_nm"));
					tmp.put("retailPrice", oneGood.get("good_prc"));
					
					data_list.add(tmp);
				}
				data_goods.put("count", data_list.size());
				data_goods.put("result", data_list);
			}
		}
		
//		if(bizOrderId != null && !bizOrderId.equals("")){
//			List<ScGoods> rs = scGoodsService.getGoodsByOrderId(bizOrderId);
//			if(rs != null){
//				data_goods.put("count", rs.size());
//				data_goods.put("result", rs);
//			}
//		}

		JSONSerializer json = JsonUtil.getJSONSerializer();
		json.include("result");
		setJsonString(json.serialize(data_goods));
		return SUCCESS;
	}
}
