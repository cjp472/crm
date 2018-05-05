package com.ulane.customer.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.ConHushou;
import com.ulane.customer.service.customer.ConHushouService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ConHushouAction extends BaseAction{
	@Resource
	private ConHushouService conHushouService;
	@Resource
	private AppUserService appUserService;
	private ConHushou conHushou;
	
	private Long conId;

	public Long getConId() {
		return conId;
	}

	public void setConId(Long conId) {
		this.conId = conId;
	}

	public ConHushou getConHushou() {
		return conHushou;
	}

	public void setConHushou(ConHushou conHushou) {
		this.conHushou = conHushou;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ConHushou> list= conHushouService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:[");
        JSONSerializer serializer = JsonUtil.getJSONSerializer();
        serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "enterTime","endTime","assignTime","acceptTime" });
        for(ConHushou conHushou:list){
            buff.append(serializer.serialize(conHushou)); 
            if(conHushou.getOwnerId()!=null){
            	buff.deleteCharAt(buff.length() - 1);  //去掉最后的大括号
                buff.append(",\"ownerName\":\"").append(appUserService.get(new Long(conHushou.getOwnerId())).getUsername()).append("\"");
                buff.append("}");
            }
            buff.append(",");
        }
        if(list.size()>0){
            buff.deleteCharAt(buff.length()-1);//去掉最后的,号
        }
		buff.append("]}");

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
				conHushouService.remove(new Long(id));
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
		ConHushou conHushou=conHushouService.get(conId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(conHushou));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(conHushou.getConId()==null){
			conHushouService.save(conHushou);
		}else{
			ConHushou orgConHushou=conHushouService.get(conHushou.getConId());
			try{
				BeanUtil.copyNotNullProperties(orgConHushou, conHushou);
				conHushouService.save(orgConHushou);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	/**
	 * 分配操作
	 * @author wangzhongjin
	 */
	public String assign(){
		String[] husunIds = getRequest().getParameterValues("husunIds");
		String userId = getRequest().getParameter("userId");
		for(String id : husunIds){
			ConHushou orgConHushou = conHushouService.get(new Long(id));
			orgConHushou.setAssignTime(new Date());
			orgConHushou.setOwnerId(Integer.parseInt(ContextUtil.getCurrentUserId().toString()));
			orgConHushou.setDealResId((short)1);
			conHushouService.save(orgConHushou);
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
