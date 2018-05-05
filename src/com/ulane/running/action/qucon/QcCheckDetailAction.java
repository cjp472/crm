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


import com.ulane.running.model.qucon.QcCheckDetail;
import com.ulane.running.service.qucon.QcCheckDetailService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcCheckDetailAction extends BaseAction{
	@Resource
	private QcCheckDetailService qcCheckDetailService;
	private QcCheckDetail qcCheckDetail;
	
	private Long checkDetailId;

	public Long getCheckDetailId() {
		return checkDetailId;
	}

	public void setCheckDetailId(Long checkDetailId) {
		this.checkDetailId = checkDetailId;
	}

	public QcCheckDetail getQcCheckDetail() {
		return qcCheckDetail;
	}

	public void setQcCheckDetail(QcCheckDetail qcCheckDetail) {
		this.qcCheckDetail = qcCheckDetail;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcCheckDetail> list= qcCheckDetailService.getAll(filter);
		
		Type type=new TypeToken<List<QcCheckDetail>>(){}.getType();
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
				qcCheckDetailService.remove(new Long(id));
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
		QcCheckDetail qcCheckDetail=qcCheckDetailService.get(checkDetailId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcCheckDetail));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcCheckDetail.getCheckDetailId()==null){
			qcCheckDetailService.save(qcCheckDetail);
		}else{
			QcCheckDetail orgQcCheckDetail=qcCheckDetailService.get(qcCheckDetail.getCheckDetailId());
			try{
				BeanUtil.copyNotNullProperties(orgQcCheckDetail, qcCheckDetail);
				qcCheckDetailService.save(orgQcCheckDetail);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
