package com.ulane.callout.action.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.callout.model.outb.ObCallbatchImpWash;
import com.ulane.callout.service.outb.ObCallbatchImpWashService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObCallbatchImpWashAction extends BaseAction{
	@Resource
	private ObCallbatchImpWashService obCallbatchImpWashService;
	private ObCallbatchImpWash obCallbatchImpWash;
	
	private Long washCusId;

	public Long getWashCusId() {
		return washCusId;
	}

	public void setWashCusId(Long washCusId) {
		this.washCusId = washCusId;
	}

	public ObCallbatchImpWash getObCallbatchImpWash() {
		return obCallbatchImpWash;
	}

	public void setObCallbatchImpWash(ObCallbatchImpWash obCallbatchImpWash) {
		this.obCallbatchImpWash = obCallbatchImpWash;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ObCallbatchImpWash> list= obCallbatchImpWashService.getAll(filter);
		
		Type type=new TypeToken<List<ObCallbatchImpWash>>(){}.getType();
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
				obCallbatchImpWashService.remove(new Long(id));
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
		ObCallbatchImpWash obCallbatchImpWash=obCallbatchImpWashService.get(washCusId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(obCallbatchImpWash));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obCallbatchImpWash.getWashCusId()==null){
			obCallbatchImpWashService.save(obCallbatchImpWash);
		}else{
			ObCallbatchImpWash orgObCallbatchImpWash=obCallbatchImpWashService.get(obCallbatchImpWash.getWashCusId());
			try{
				BeanUtil.copyNotNullProperties(orgObCallbatchImpWash, obCallbatchImpWash);
				obCallbatchImpWashService.save(orgObCallbatchImpWash);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 判断清洗临时表中对应的清洗历史内码是否存在
	 * @return
	 */
	public String isExistByWashId() {
		QueryFilter filter=new QueryFilter(getRequest());
		List<ObCallbatchImpWash> list= obCallbatchImpWashService.getAll(filter);
		if(null!=list && list.size()!=0) {
			setJsonString("{success:true}");//清洗历史下对应的清洗临时表中还有记录未被清空。
		} else {
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}
	
	public String recover() {
		String washHisId = getRequest().getParameter("washHisId");
		String callbatchId = getRequest().getParameter("callbatchId");
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			StringBuffer sb = new StringBuffer();
			int iCount = ids.length;
			for(int i=0; i<iCount; i++) {
				sb.append(ids[i]);
				if(i<iCount-1) {
					sb.append(",");
				}
			}
			Map<String,String> paramHsmp = new HashMap<String,String>();
			paramHsmp.put("washHisId", washHisId);
			paramHsmp.put("callbatchId", callbatchId);
			obCallbatchImpWashService.recoverWashData(sb.toString(),iCount,paramHsmp);
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
	
}
