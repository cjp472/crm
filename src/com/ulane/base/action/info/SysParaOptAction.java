package com.ulane.base.action.info;
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


import com.ulane.base.model.info.SysParaOpt;
import com.ulane.base.service.info.SysParaOptService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class SysParaOptAction extends BaseAction{
	@Resource
	private SysParaOptService sysParaOptService;
	private SysParaOpt sysParaOpt;
	
	private Long sysParaOptId;

	public Long getSysParaOptId() {
		return sysParaOptId;
	}

	public void setSysParaOptId(Long sysParaOptId) {
		this.sysParaOptId = sysParaOptId;
	}

	public SysParaOpt getSysParaOpt() {
		return sysParaOpt;
	}

	public void setSysParaOpt(SysParaOpt sysParaOpt) {
		this.sysParaOpt = sysParaOpt;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<SysParaOpt> list= sysParaOptService.getAll(filter);
		
		Type type=new TypeToken<List<SysParaOpt>>(){}.getType();
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
				sysParaOptService.remove(new Long(id));
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
		SysParaOpt sysParaOpt=sysParaOptService.get(sysParaOptId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(sysParaOpt));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(sysParaOpt.getSysParaOptId()==null){
			sysParaOptService.save(sysParaOpt);
		}else{
			SysParaOpt orgSysParaOpt=sysParaOptService.get(sysParaOpt.getSysParaOptId());
			try{
				BeanUtil.copyNotNullProperties(orgSysParaOpt, sysParaOpt);
				sysParaOptService.save(orgSysParaOpt);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
