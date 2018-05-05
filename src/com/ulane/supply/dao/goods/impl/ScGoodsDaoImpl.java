package com.ulane.supply.dao.goods.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.oa.util.FillData;
import com.htsoft.oa.util.SqlBuilder;
import com.ulane.core.util.HttpUtil;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.supply.dao.goods.ScGoodsDao;
import com.ulane.supply.model.goods.ScGoods;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

@SuppressWarnings("unchecked")
public class ScGoodsDaoImpl extends BaseDaoImpl<ScGoods> implements ScGoodsDao {
	protected transient final Log logger = LogFactory.getLog(getClass());

	public ScGoodsDaoImpl() {
		super(ScGoods.class);
	}

	@Override
	public List<ScGoods> getGoodsByNumber(String no) {

		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("*");
		SqlBuilder.FROM("SC_GOODS t");
		SqlBuilder.WHERE("t.numbers = ?");
		SqlBuilder.WHERE("t.ext_1 = ?");
		String sql = SqlBuilder.SQL();

		JdbcHelper callBack = new JdbcHelper();
		callBack.setSql(sql);
		callBack.addPara("108473");
		callBack.addPara("0");
		logger.debug("sql : " + sql);

		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				return FillData.fillDataJDBC(rs, ScGoods.class);
			}
		};
		callBack.setJdbcWork(sqlWork);
		return (List<ScGoods>) getHibernateTemplate().execute(callBack);
	}

	public List<Map<String, Object>> getGoodsOfOrder(String orderId) {
		Map<String, String> post_data = new HashMap<String, String>();
		post_data.put("subsystem", HttpUtil.SYS);
		post_data.put("account", HttpUtil.ACCOUNT);
		post_data.put("password", HttpUtil.PASSWORD);
		post_data.put("ord_id", orderId);
		post_data.put("cust_id", "1289823");
		post_data.put("start", "0");
		post_data.put("limit", "5");

		JSONSerializer json = JsonUtil.getJSONSerializer();
		String post_data_ = json.serialize(post_data);
		String url = HttpUtil.PROXY_URL + "/getOrderList";

		String result_json = HttpUtil.post(url, post_data_, "UTF-8");
		JSONDeserializer<Map<String, Object>> djson = new JSONDeserializer<Map<String, Object>>();
		Map<String, Object> response = djson.deserialize(result_json);
		List<Map<String, Object>> result = (List<Map<String, Object>>) response
				.get("result");
		if (result != null) {
			return (List<Map<String, Object>>) result.get(0).get("goods");
		} else {
			return null;
		}
	}

	@Override
	public List<ScGoods> getGoodsByOrderId(String orderId) {
		JdbcHelper helper = new JdbcHelper();
		List<Map<String, Object>> goods = getGoodsOfOrder(orderId);

		if (goods != null) {
			SqlBuilder.BEGIN();
			SqlBuilder
					.SELECT("t.*, spc.PRODUCT_CLASSIFY_NAME, sgp.retail_price");
			SqlBuilder.FROM("SC_GOODS t");
			SqlBuilder
					.LEFT_OUTER_JOIN("SC_PRODUCT_CLASSIFY spc on t.PRODUCT_CLASSIFY_ID = spc.PRODUCT_CLASSIFY_ID");
			SqlBuilder
					.LEFT_OUTER_JOIN("SC_GOODS_PRICE sgp on t.GOODS_PRICE_ID = sgp.GOODS_PRICE_ID");
			for (int i = 0; i < goods.size(); i++) {
				Map<String, Object> oneGood = goods.get(i);
				SqlBuilder.WHERE("t.numbers = ?");
				helper.addPara(oneGood.get("good_id"));
				SqlBuilder.WHERE("t.ext_1 = ?");
				helper.addPara(oneGood.get("color_id"));
				SqlBuilder.WHERE("t.style = ?");
				helper.addPara(oneGood.get("style_id"));
				SqlBuilder.WHERE("t.ext_2 = ?");
				helper.addPara(oneGood.get("outgo_no"));
				if (i < goods.size() - 1) {
					SqlBuilder.OR();
				}
			}
			String sql = SqlBuilder.SQL();
			helper.setSql(sql);
			logger.debug("sql : " + sql);

			JdbcWork sqlWork = new JdbcWork() {
				@Override
				public Object fillData(ResultSet rs) {
					return FillData.fillDataJDBC(rs, ScGoods.class);
				}
			};

			helper.setJdbcWork(sqlWork);
			getHibernateTemplate().getSessionFactory().getCurrentSession()
					.createSQLQuery(sql).addEntity(ScGoods.class);
			return (List<ScGoods>) getHibernateTemplate().execute(helper);
		} else {
			return null;
		}
	}
}