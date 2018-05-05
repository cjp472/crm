package com.htsoft.oa.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Product;
import com.htsoft.oa.service.customer.ProductService;
import com.ulane.callout.model.outb.ObCalllist;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.service.outb.ObComService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class ProductAction extends BaseAction{
	@Resource
	private ProductService productService;
	@Resource
	private ObComService obComService;
	private Product product;
	
	private Long productId;

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Product> list= productService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer json = JsonUtil.getJSONSerializer("createtime","updatetime");
		buff.append(json.exclude(new String[]{"class"}).serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 选择器产品显示列表
	 */
	public String productNamlist(){
		String comid = getRequest().getParameter("comid");
		QueryFilter filter=new QueryFilter(getRequest());
		List<Product> list= productService.getAll(filter);
		if(!("null").equals(comid) && comid!=null){
			ObCom obCom = obComService.get(new Long(comid));
			Set<Product> productlist =obCom.getProducts();
			//剔除已绑定的名单
			Iterator it = list.iterator();
			while(it.hasNext()){
				Product o=(Product)it.next();
				for(Product producttwo:productlist){
				 if(producttwo.equals(o)){
					it.remove();
				 }
				}
			}
			}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer json = JsonUtil.getJSONSerializer("createtime","updatetime");
		buff.append(json.exclude(new String[]{"class"}).serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 绑定产品显示列表
	 */
	public String productBDNamlist(){
		String ids=getRequest().getParameter("comId");
		if(!("null").equals(ids)){
		ObCom obCom=obComService.get(new Long(ids));
		Type type=new TypeToken<List<ObCalllist>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(obCom.getProducts().size()).append(
				",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(obCom.getProducts()));
		buff.append("}");
		
		jsonString=buff.toString();

		}
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
				productService.remove(new Long(id));
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
		Product product=productService.get(productId);
		
		//Gson gson=new Gson();
		JSONSerializer json = JsonUtil.getJSONSerializer("createtime","updatetime");
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.exclude(new String[]{"class"}).serialize(product));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		product.setUpdatetime(new Date());
		productService.save(product);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
