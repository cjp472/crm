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


import com.ulane.running.model.qucon.QcChkBasis;
import com.ulane.running.service.qucon.QcChkBasisService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcChkBasisAction extends BaseAction{
	@Resource
	private QcChkBasisService qcChkBasisService;
	private QcChkBasis qcChkBasis;
	
	private Long chkBasId;

	public Long getChkBasId() {
		return chkBasId;
	}

	public void setChkBasId(Long chkBasId) {
		this.chkBasId = chkBasId;
	}

	public QcChkBasis getQcChkBasis() {
		return qcChkBasis;
	}

	public void setQcChkBasis(QcChkBasis qcChkBasis) {
		this.qcChkBasis = qcChkBasis;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcChkBasis> list= qcChkBasisService.getAll(filter);
		
		Type type=new TypeToken<List<QcChkBasis>>(){}.getType();
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
				qcChkBasisService.remove(new Long(id));
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
		QcChkBasis qcChkBasis=qcChkBasisService.get(chkBasId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcChkBasis));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcChkBasis.getChkBasId()==null){
			qcChkBasisService.save(qcChkBasis);
		}else{
			QcChkBasis orgQcChkBasis=qcChkBasisService.get(qcChkBasis.getChkBasId());
			try{
				BeanUtil.copyNotNullProperties(orgQcChkBasis, qcChkBasis);
				qcChkBasisService.save(orgQcChkBasis);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
