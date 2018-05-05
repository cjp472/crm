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


import com.ulane.running.model.qucon.QcTempTar;
import com.ulane.running.service.qucon.QcTempTarService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcTempTarAction extends BaseAction{
	@Resource
	private QcTempTarService qcTempTarService;
	private QcTempTar qcTempTar;
	
	private Long tmpTarId;

	public Long getTmpTarId() {
		return tmpTarId;
	}

	public void setTmpTarId(Long tmpTarId) {
		this.tmpTarId = tmpTarId;
	}

	public QcTempTar getQcTempTar() {
		return qcTempTar;
	}

	public void setQcTempTar(QcTempTar qcTempTar) {
		this.qcTempTar = qcTempTar;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcTempTar> list= qcTempTarService.getAll(filter);
		
		Type type=new TypeToken<List<QcTempTar>>(){}.getType();
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
				qcTempTarService.remove(new Long(id));
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
		QcTempTar qcTempTar=qcTempTarService.get(tmpTarId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcTempTar));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcTempTar.getTmpTarId()==null){
			qcTempTarService.save(qcTempTar);
		}else{
			QcTempTar orgQcTempTar=qcTempTarService.get(qcTempTar.getTmpTarId());
			try{
				BeanUtil.copyNotNullProperties(orgQcTempTar, qcTempTar);
				qcTempTarService.save(orgQcTempTar);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
