package com.ulane.running.action.pap;
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


import com.ulane.running.model.pap.PapAnsDetail;
import com.ulane.running.service.pap.PapAnsDetailService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class PapAnsDetailAction extends BaseAction{
	@Resource
	private PapAnsDetailService papAnsDetailService;
	private PapAnsDetail papAnsDetail;
	
	private Long ansDetailId;

	public Long getAnsDetailId() {
		return ansDetailId;
	}

	public void setAnsDetailId(Long ansDetailId) {
		this.ansDetailId = ansDetailId;
	}

	public PapAnsDetail getPapAnsDetail() {
		return papAnsDetail;
	}

	public void setPapAnsDetail(PapAnsDetail papAnsDetail) {
		this.papAnsDetail = papAnsDetail;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<PapAnsDetail> list= papAnsDetailService.getAll(filter);
		
		Type type=new TypeToken<List<PapAnsDetail>>(){}.getType();
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
				papAnsDetailService.remove(new Long(id));
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
		PapAnsDetail papAnsDetail=papAnsDetailService.get(ansDetailId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(papAnsDetail));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(papAnsDetail.getAnsDetailId()==null){
			papAnsDetailService.save(papAnsDetail);
		}else{
			PapAnsDetail orgPapAnsDetail=papAnsDetailService.get(papAnsDetail.getAnsDetailId());
			try{
				BeanUtil.copyNotNullProperties(orgPapAnsDetail, papAnsDetail);
				papAnsDetailService.save(orgPapAnsDetail);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
