package com.ulane.core.plugin.soap.impl;

import java.lang.reflect.Type;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
//import javax.jws.WebService;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;
import com.ulane.core.plugin.soap.ChanPinSoapServer;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.supply.model.goods.ScGoods;
import com.ulane.supply.model.goods.ScGoodsPrice;
import com.ulane.supply.model.goods.ScProductClassify;
import com.ulane.supply.model.goods.ScProductCom;
import com.ulane.supply.service.goods.ScGoodsPriceService;
import com.ulane.supply.service.goods.ScGoodsService;
import com.ulane.supply.service.goods.ScProductClassifyService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

//@WebService
public class ChanPinSoapServerImpl implements ChanPinSoapServer {
	Logger logger = Logger.getLogger(ChanPinSoapServerImpl.class);// ?
	
	// 商品(sc_goods)
	private ScGoods scGoods;// 声明实体类ScGoods对象的变量

	public ScGoods getScGoods() {
		return scGoods;
	}

	// 商品价目(SC_GOODS_PRICE)
	private ScGoodsPrice scGoodsPrice;// 声明实体类ScGoodsPrice对象的变量

	public ScGoodsPrice getScGoodsPrice() {
		return scGoodsPrice;
	}

	// 产品分组(SC_PRODUCT_COM)
	private ScProductCom scProductCom;// 声明实体类ScGoods对象的变量

	public ScProductCom getScProductCom() {
		return scProductCom;
	}

	// 产品分类(SC_PRODUCT_CLASSIFY)
	private ScProductClassify scProductClassify;// 声明实体类ScProductClassify对象的变量

	public ScProductClassify getScProductClassify() {
		return scProductClassify;
	}

	// SC_商品附件（SC_GOODS_FILE）

	// 产品信息由　LD系统传给　会员经营管理系统，所以需要把传过来的信息添加到数据库里
	@Override
	public String addChanPin(String xmlStr) {
		// TODO Auto-generated method stub
		System.out.println(">>>>>KYQ>>>>>>>xmlStr=" + xmlStr);// 判断xmlStr参数有没有传过来

		Gson gson = new Gson();
		// 商品管理 SC_GOODS4b
		ScGoods scGoods = gson.fromJson(xmlStr, ScGoods.class);// ?ScGoods.class指定对象的类型
		ScGoodsService scGoodsService = (ScGoodsService) AppUtil.getBean("scGoodsService");
		 //商品价目</many-to-one>(SC_GOODS_PRICE) ScGoodsPrice  
		ScGoodsPriceService scGoodsPriceService =(ScGoodsPriceService)AppUtil.getBean("scGoodsPriceService");		
		 //产品分类</many-to-one>(SC_PRODUCT_CLASSIFY) ScProductClassify 
		 ScProductClassifyService scProductClassifyService =(ScProductClassifyService)AppUtil.getBean("scProductClassifyService");				
		// SC_商品附件</many-to-many> SC_GOODS_FILE; File_Attach;
		 FileAttachService fileAttachService = (FileAttachService)AppUtil.getBean("fileAttachService");
		 java.util.Set<FileAttach> fileAttachs = scGoods.getFileAttachs();
 	 
		StringBuffer buff = new StringBuffer(); // 页面输出参数，对结果进行反馈

			// 保存商品价目ScGoodsPrice
			if (scGoods.getScGoodsPrice().getGoodsPriceId() == null) { // 从scGoods对象里判断GoodsPriceId为空，则保存。
				scGoodsPriceService.save(scGoods.getScGoodsPrice());// 对数据进行保存
			}
			// 保存商品附件fileAttachs
			if (fileAttachs != null) {
				for (Iterator it = fileAttachs.iterator(); it.hasNext();) {
					FileAttach filea = (FileAttach) it.next();
					filea.setCreatetime(new Date());
					fileAttachService.save(filea);
				}
			}
			// 保存商品 SC_GOODS
			if (scGoods.getGoodsId() == null || scGoods.getGoodsId().equals("")) {
				// 从json串中获得code值
				String a = scGoods.getScProductClassify().getProductClassifyDispCode();
				// 从数据库里查询与json串相对应的code的id值
				QueryFilter filter = new QueryFilter();
				filter.addFilter("Q_productClassifyDispCode_S_EQ", a);// 根据productClassifyDispCode查id值
				List<ScProductClassify> listspc = scProductClassifyService.getAllNoRequest(filter);
				Long id = listspc.get(0).getProductClassifyId();
				scGoods.setProductClassifyId(id);// set属性
				ScProductClassify spc = scProductClassifyService.get(id);// set对象
				scGoods.setScProductClassify(spc);
				scGoods = scGoodsService.save(scGoods);// 对数据进行保存
			}

		if (scGoods != null) {
			buff.append("{success:true,'orderId':");
			buff.append(scGoods.getGoodsId() + "}");
		} else {
			buff.append("保存失败");
		}

		return buff.toString();
		
	}
}
