package com.ulane.callout.action.outb;
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


import com.ulane.callout.model.outb.ObSaletaskBo;
import com.ulane.callout.service.outb.ObSaletaskBoService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObSaletaskBoAction extends BaseAction{
	@Resource
	private ObSaletaskBoService obSaletaskBoService;
	private ObSaletaskBo obSaletaskBo;
	
	private Long saletaskBoId;

	public Long getSaletaskBoId() {
		return saletaskBoId;
	}

	public void setSaletaskBoId(Long saletaskBoId) {
		this.saletaskBoId = saletaskBoId;
	}

	public ObSaletaskBo getObSaletaskBo() {
		return obSaletaskBo;
	}

	public void setObSaletaskBo(ObSaletaskBo obSaletaskBo) {
		this.obSaletaskBo = obSaletaskBo;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ObSaletaskBo> list= obSaletaskBoService.getAll(filter);
		
		Type type=new TypeToken<List<ObSaletaskBo>>(){}.getType();
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
				obSaletaskBoService.remove(new Long(id));
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
		ObSaletaskBo obSaletaskBo=obSaletaskBoService.get(saletaskBoId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(obSaletaskBo));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obSaletaskBo.getSaletaskBoId()==null){
			obSaletaskBoService.save(obSaletaskBo);
		}else{
			ObSaletaskBo orgObSaletaskBo=obSaletaskBoService.get(obSaletaskBo.getSaletaskBoId());
			try{
				BeanUtil.copyNotNullProperties(orgObSaletaskBo, obSaletaskBo);
				obSaletaskBoService.save(orgObSaletaskBo);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
