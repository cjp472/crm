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


import com.ulane.running.model.qucon.QcChkGuid;
import com.ulane.running.service.qucon.QcChkGuidService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcChkGuidAction extends BaseAction{
	@Resource
	private QcChkGuidService qcChkGuidService;
	private QcChkGuid qcChkGuid;
	
	private Long chkGuidId;

	public Long getChkGuidId() {
		return chkGuidId;
	}

	public void setChkGuidId(Long chkGuidId) {
		this.chkGuidId = chkGuidId;
	}

	public QcChkGuid getQcChkGuid() {
		return qcChkGuid;
	}

	public void setQcChkGuid(QcChkGuid qcChkGuid) {
		this.qcChkGuid = qcChkGuid;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcChkGuid> list= qcChkGuidService.getAll(filter);
		
		Type type=new TypeToken<List<QcChkGuid>>(){}.getType();
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
				qcChkGuidService.remove(new Long(id));
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
		QcChkGuid qcChkGuid=qcChkGuidService.get(chkGuidId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcChkGuid));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcChkGuid.getChkGuidId()==null){
			qcChkGuidService.save(qcChkGuid);
		}else{
			QcChkGuid orgQcChkGuid=qcChkGuidService.get(qcChkGuid.getChkGuidId());
			try{
				BeanUtil.copyNotNullProperties(orgQcChkGuid, qcChkGuid);
				qcChkGuidService.save(orgQcChkGuid);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}