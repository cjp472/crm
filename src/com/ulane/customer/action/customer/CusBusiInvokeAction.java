package com.ulane.customer.action.customer;
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


import com.ulane.customer.model.customer.CusBusiInvoke;
import com.ulane.customer.service.customer.CusBusiInvokeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CusBusiInvokeAction extends BaseAction{
	@Resource
	private CusBusiInvokeService cusBusiInvokeService;
	private CusBusiInvoke cusBusiInvoke;
	
	private Long busiHisId;

	public Long getBusiHisId() {
		return busiHisId;
	}

	public void setBusiHisId(Long busiHisId) {
		this.busiHisId = busiHisId;
	}

	public CusBusiInvoke getCusBusiInvoke() {
		return cusBusiInvoke;
	}

	public void setCusBusiInvoke(CusBusiInvoke cusBusiInvoke) {
		this.cusBusiInvoke = cusBusiInvoke;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CusBusiInvoke> list= cusBusiInvokeService.getAll(filter);
		
		Type type=new TypeToken<List<CusBusiInvoke>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
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
				cusBusiInvokeService.remove(new Long(id));
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
		CusBusiInvoke cusBusiInvoke=cusBusiInvokeService.get(busiHisId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(cusBusiInvoke));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(cusBusiInvoke.getBusiHisId()==null){
			cusBusiInvokeService.save(cusBusiInvoke);
		}else{
			CusBusiInvoke orgCusBusiInvoke=cusBusiInvokeService.get(cusBusiInvoke.getBusiHisId());
			try{
				BeanUtil.copyNotNullProperties(orgCusBusiInvoke, cusBusiInvoke);
				cusBusiInvokeService.save(orgCusBusiInvoke);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}