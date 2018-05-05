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


import com.ulane.supply.model.goods.ScProductInstNote;
import com.ulane.supply.service.goods.ScProductInstNoteService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ScProductInstNoteAction extends BaseAction{
	@Resource
	private ScProductInstNoteService scProductInstNoteService;
	private ScProductInstNote scProductInstNote;
	
	private Long instStockId;

	public Long getInstStockId() {
		return instStockId;
	}

	public void setInstStockId(Long instStockId) {
		this.instStockId = instStockId;
	}

	public ScProductInstNote getScProductInstNote() {
		return scProductInstNote;
	}

	public void setScProductInstNote(ScProductInstNote scProductInstNote) {
		this.scProductInstNote = scProductInstNote;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ScProductInstNote> list= scProductInstNoteService.getAll(filter);
		
		Type type=new TypeToken<List<ScProductInstNote>>(){}.getType();
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
				scProductInstNoteService.remove(new Long(id));
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
		ScProductInstNote scProductInstNote=scProductInstNoteService.get(instStockId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(scProductInstNote));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(scProductInstNote.getInstStockId()==null){
			scProductInstNoteService.save(scProductInstNote);
		}else{
			ScProductInstNote orgScProductInstNote=scProductInstNoteService.get(scProductInstNote.getInstStockId());
			try{
				BeanUtil.copyNotNullProperties(orgScProductInstNote, scProductInstNote);
				scProductInstNoteService.save(orgScProductInstNote);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
