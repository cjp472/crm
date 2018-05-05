package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.ContextUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;

import com.ulane.base.model.xitong.BmFactor;
import com.ulane.base.service.xitong.BmFactorService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author 陈峰
 *
 */
public class BmFactorAction extends BaseAction{
	@Resource
	private BmFactorService bmFactorService;
	private BmFactor bmFactor;
	
	private Long factorId;

	public Long getFactorId() {
		return factorId;
	}

	public void setFactorId(Long factorId) {
		this.factorId = factorId;
	}

	public BmFactor getBmFactor() {
		return bmFactor;
	}

	public void setBmFactor(BmFactor bmFactor) {
		this.bmFactor = bmFactor;
	}

	/**
	 * 	根据类型选择器 feng chen
	 * @return
	 */
		public String select() {
			PagingBean pb = getInitPagingBean();
			List<BmFactor> list = bmFactorService.getAll(pb);
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pb.getTotalItems()).append(",result:");
			JSONSerializer serializer = new JSONSerializer();
			serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "createDate","updateDate" });
			buff.append(serializer.serialize(list));
			buff.append("}");

			jsonString = buff.toString();
			return SUCCESS;
		}

	/**
	 * combo  陈峰
	 */
	public String combo(){
		List<BmFactor> list = bmFactorService.getAll();
		StringBuffer sb= new StringBuffer("[");
		int i=0;
		for(BmFactor type:list){
			if(i++>0) sb.append(",");
			sb.append("['").append(type.getFactorId()).append("','").append(type.getFactorName()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		logger.info("sb:"+sb.toString());
		return SUCCESS;
	}

	/**
	 * combo  陈峰
	 */
	public String comboGoodsType(){
		setJsonString("[['1','一类商品'],['2','二类商品']]");
		return SUCCESS;
	}
	
	
	/**
	 * combo  陈峰
	 */
	public String getGoodsType(){
		
		int x = 1;
		try{
			x=Integer.parseInt(getRequest().getParameter("goodsTypeId"));
		}
		catch(Exception e){}
		StringBuffer sb = new StringBuffer("{success:true,data:");
		switch(x){
		case 1:
			sb.append("{\"goodsTypeId\":\"1\",\"goodsTypeName\":\"一类商品\"}");
			break;
		case 2:
			sb.append("{\"goodsTypeId\":\"2\",\"goodsTypeName\":\"二类商品\"}");
			break;
		}
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}


	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BmFactor> list= bmFactorService.getAll(filter);
		
//		Type type=new TypeToken<List<BmFactor>>(){}.getType();

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
		
    	JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));
		
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
				//bmFactorService.remove(new Long(id));
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
		BmFactor bmFactor=bmFactorService.get(factorId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
    	JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		sb.append(jsonSer.serialize(bmFactor));
//		sb.append(gson.toJson(bmFactor));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(bmFactor.getFactorId()==null){
            bmFactor.setCreateDate(new Date());
            bmFactor.setCreateBy(ContextUtil.getCurrentUser().getFamilyName());
			bmFactorService.save(bmFactor);
		}else{
			BmFactor orgBmFactor=bmFactorService.get(bmFactor.getFactorId());
			try{
				BeanUtil.copyNotNullProperties(orgBmFactor, bmFactor);
                orgBmFactor.setUpdateDate(new Date());
                orgBmFactor.setUpdateBy(ContextUtil.getCurrentUser().getFamilyName());
				bmFactorService.save(orgBmFactor);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
