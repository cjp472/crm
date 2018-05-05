package com.ulane.running.action.qucon;
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


import com.ulane.running.model.qucon.QcScoreOpt;
import com.ulane.running.service.qucon.QcScoreOptService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcScoreOptAction extends BaseAction{
	@Resource
	private QcScoreOptService qcScoreOptService;
	private QcScoreOpt qcScoreOpt;
	
	private Long scoreOptId;

	public Long getScoreOptId() {
		return scoreOptId;
	}

	public void setScoreOptId(Long scoreOptId) {
		this.scoreOptId = scoreOptId;
	}

	public QcScoreOpt getQcScoreOpt() {
		return qcScoreOpt;
	}

	public void setQcScoreOpt(QcScoreOpt qcScoreOpt) {
		this.qcScoreOpt = qcScoreOpt;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcScoreOpt> list= qcScoreOptService.getAll(filter);
		
		Type type=new TypeToken<List<QcScoreOpt>>(){}.getType();
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
				qcScoreOptService.remove(new Long(id));
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
		QcScoreOpt qcScoreOpt=qcScoreOptService.get(scoreOptId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcScoreOpt));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcScoreOpt.getScoreOptId()==null){
			qcScoreOptService.save(qcScoreOpt);
		}else{
			QcScoreOpt orgQcScoreOpt=qcScoreOptService.get(qcScoreOpt.getScoreOptId());
			try{
				BeanUtil.copyNotNullProperties(orgQcScoreOpt, qcScoreOpt);
				qcScoreOptService.save(orgQcScoreOpt);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
