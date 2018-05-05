package com.ulane.supply.action.goods;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.supply.model.goods.ScPurchasePrice;
import com.ulane.supply.service.goods.ScPurchasePriceService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ScPurchasePriceAction extends BaseAction{
	@Resource
	private ScPurchasePriceService scPurchasePriceService;
	private ScPurchasePrice scPurchasePrice;
	
	private Long purPriceId;

	public Long getPurPriceId() {
		return purPriceId;
	}

	public void setPurPriceId(Long purPriceId) {
		this.purPriceId = purPriceId;
	}

	public ScPurchasePrice getScPurchasePrice() {
		return scPurchasePrice;
	}

	public void setScPurchasePrice(ScPurchasePrice scPurchasePrice) {
		this.scPurchasePrice = scPurchasePrice;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ScPurchasePrice> list= scPurchasePriceService.getAll(filter);
		
		Type type=new TypeToken<List<ScPurchasePrice>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				scPurchasePriceService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ScPurchasePrice scPurchasePrice=scPurchasePriceService.get(purPriceId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(scPurchasePrice));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(scPurchasePrice.getPurPriceId()==null){
			scPurchasePriceService.save(scPurchasePrice);
		}else{
			ScPurchasePrice orgScPurchasePrice=scPurchasePriceService.get(scPurchasePrice.getPurPriceId());
			try{
				BeanUtil.copyNotNullProperties(orgScPurchasePrice, scPurchasePrice);
				scPurchasePriceService.save(orgScPurchasePrice);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
