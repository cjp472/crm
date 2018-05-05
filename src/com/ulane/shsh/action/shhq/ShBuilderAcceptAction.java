package com.ulane.shsh.action.shhq;
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


import com.ulane.shsh.model.shhq.ShBuilderAccept;
import com.ulane.shsh.service.shhq.ShBuilderAcceptService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ShBuilderAcceptAction extends BaseAction{
	@Resource
	private ShBuilderAcceptService shBuilderAcceptService;
	private ShBuilderAccept shBuilderAccept;
	
	private Long acptId;

	public Long getAcptId() {
		return acptId;
	}

	public void setAcptId(Long acptId) {
		this.acptId = acptId;
	}

	public ShBuilderAccept getShBuilderAccept() {
		return shBuilderAccept;
	}

	public void setShBuilderAccept(ShBuilderAccept shBuilderAccept) {
		this.shBuilderAccept = shBuilderAccept;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ShBuilderAccept> list= shBuilderAcceptService.getAll(filter);
		
		Type type=new TypeToken<List<ShBuilderAccept>>(){}.getType();
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
				shBuilderAcceptService.remove(new Long(id));
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
		ShBuilderAccept shBuilderAccept=shBuilderAcceptService.get(acptId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(shBuilderAccept));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(shBuilderAccept.getAcptId()==null){
			shBuilderAcceptService.save(shBuilderAccept);
		}else{
			ShBuilderAccept orgShBuilderAccept=shBuilderAcceptService.get(shBuilderAccept.getAcptId());
			try{
				BeanUtil.copyNotNullProperties(orgShBuilderAccept, shBuilderAccept);
				shBuilderAcceptService.save(orgShBuilderAccept);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
