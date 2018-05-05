package com.ulane.running.action.comtech;
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


import com.ulane.running.model.comtech.CtScrAnsDetail;
import com.ulane.running.service.comtech.CtScrAnsDetailService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CtScrAnsDetailAction extends BaseAction{
	@Resource
	private CtScrAnsDetailService ctScrAnsDetailService;
	private CtScrAnsDetail ctScrAnsDetail;
	
	private Long ctScrAnsDetailId;

	public Long getCtScrAnsDetailId() {
		return ctScrAnsDetailId;
	}

	public void setCtScrAnsDetailId(Long ctScrAnsDetailId) {
		this.ctScrAnsDetailId = ctScrAnsDetailId;
	}

	public CtScrAnsDetail getCtScrAnsDetail() {
		return ctScrAnsDetail;
	}

	public void setCtScrAnsDetail(CtScrAnsDetail ctScrAnsDetail) {
		this.ctScrAnsDetail = ctScrAnsDetail;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CtScrAnsDetail> list= ctScrAnsDetailService.getAll(filter);
		
		Type type=new TypeToken<List<CtScrAnsDetail>>(){}.getType();
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
				ctScrAnsDetailService.remove(new Long(id));
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
		CtScrAnsDetail ctScrAnsDetail=ctScrAnsDetailService.get(ctScrAnsDetailId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(ctScrAnsDetail));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(ctScrAnsDetail.getCtScrAnsDetailId()==null){
			ctScrAnsDetailService.save(ctScrAnsDetail);
		}else{
			CtScrAnsDetail orgCtScrAnsDetail=ctScrAnsDetailService.get(ctScrAnsDetail.getCtScrAnsDetailId());
			try{
				BeanUtil.copyNotNullProperties(orgCtScrAnsDetail, ctScrAnsDetail);
				ctScrAnsDetailService.save(orgCtScrAnsDetail);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
