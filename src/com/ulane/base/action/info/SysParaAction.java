package com.ulane.base.action.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import net.sf.json.util.JSONUtils;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.info.SysPara;
import com.ulane.base.model.info.SysParaOpt;
import com.ulane.base.model.xitong.ServiceWsdlManager;
import com.ulane.base.model.xitong.ServiceWsdlMethod;
import com.ulane.base.service.info.SysParaService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class SysParaAction extends BaseAction{
	@Resource
	private SysParaService sysParaService;
	private SysPara sysPara;
	
	private Long sysParaId;

	public Long getSysParaId() {
		return sysParaId;
	}

	public void setSysParaId(Long sysParaId) {
		this.sysParaId = sysParaId;
	}

	public SysPara getSysPara() {
		return sysPara;
	}

	public void setSysPara(SysPara sysPara) {
		this.sysPara = sysPara;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<SysPara> list= sysParaService.getAll(filter);
		
//		Type type=new TypeToken<List<SysPara>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer serializer =JsonUtil.getJSONSerializer();
		buff.append(serializer.serialize(list));
		
//		Gson gson=new Gson();
//		buff.append(gson.toJson(list, type));
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
				sysParaService.remove(new Long(id));
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
		SysPara sysPara=sysParaService.get(sysParaId);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer json = JsonUtil.getJSONSerializer();
		sb.append(json.serialize(sysPara));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String methods = getRequest().getParameter("opt");
		if (StringUtils.isNotEmpty(methods)) {
			Gson gson = new Gson();
			SysParaOpt [] opt_ = (SysParaOpt[]) gson.fromJson(methods,
					SysParaOpt[].class);
			sysPara.getSysParaOpts().clear();
			if (opt_ != null) {
				for (SysParaOpt opt : opt_) {
					opt.setSysPara(sysPara);
					sysPara.addOpt(opt);
				}
			}
		}
		
		if(sysPara.getSysParaId() == null){
			sysParaService.save(sysPara);
		}else{
//			SysPara orgSysPara=sysParaService.get(sysPara.getSysParaId());
//			try{
//				BeanUtil.copyNotNullProperties(orgSysPara, sysPara);
				sysParaService.merge(sysPara);
//			}catch(Exception ex){
//				logger.error(ex.getMessage());
//			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String getOpt(){
		if(sysParaId == null){
			return SUCCESS;
		}
		SysPara sysPara = sysParaService.get(sysParaId);
		
		JSONSerializer json = JsonUtil.getJSONSerializer();
		//将数据转成JSON格式
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
        	.append(sysPara.getSysParaOpts().size())
        	.append(",result:");
        buff.append(json.serialize(sysPara.getSysParaOpts()));
        buff.append("}");
		setJsonString(buff.toString());
		
		return SUCCESS;
	}
}
