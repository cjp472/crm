package com.ulane.base.action.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.xitong.BeanObject;
import com.ulane.base.model.xitong.BeanObjectColumns;
import com.ulane.base.model.xitong.UlContactEmpl;
import com.ulane.base.model.xitong.UlDepEmployee;
import com.ulane.base.service.xitong.BeanObjectService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class BeanObjectAction extends BaseAction{
	@Resource
	private BeanObjectService beanObjectService;
	private BeanObject beanObject;
	
	private Long beanObjectId;

	public Long getBeanObjectId() {
		return beanObjectId;
	}

	public void setBeanObjectId(Long beanObjectId) {
		this.beanObjectId = beanObjectId;
	}

	public BeanObject getBeanObject() {
		return beanObject;
	}

	public void setBeanObject(BeanObject beanObject) {
		this.beanObject = beanObject;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<BeanObject> list= beanObjectService.getAll(filter);
		
//		Type type=new TypeToken<List<BeanObject>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "applyTime"});
//		buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));

		JSONSerializer ser = JsonUtil.getJSONSerializer();
		buff.append(ser.serialize(list));
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
				beanObjectService.remove(new Long(id));
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
		BeanObject beanObject=beanObjectService.get(beanObjectId);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
//		sb.append(gson.toJson(beanObject));
		sb.append(ser.serialize(beanObject));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		String details = getRequest().getParameter("details");
		if (StringUtils.isNotEmpty(details)) {
			Gson gson = new Gson();
			BeanObjectColumns[] detailArr = (BeanObjectColumns[]) gson.fromJson(details,
					BeanObjectColumns[].class);
			beanObject.getBeanObjectColumnss().clear();
			if (detailArr != null) {
				for (BeanObjectColumns detail : detailArr) {
					detail.setBeanObject(beanObject);
					beanObject.getBeanObjectColumnss().add(detail);
				}
			}
		}
		if(beanObject.getBeanObjectId()==null){
			beanObjectService.save(beanObject);
		}else{
				beanObjectService.save(beanObject);
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
