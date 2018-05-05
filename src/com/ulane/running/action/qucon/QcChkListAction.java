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
import com.htsoft.core.util.ContextUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.core.plugin.soap.impl.ConHisSoapServerImpl;
import com.ulane.running.model.qucon.QcChkList;
import com.ulane.running.service.qucon.QcChkListService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcChkListAction extends BaseAction{
	@Resource
	private QcChkListService qcChkListService;
	private QcChkList qcChkList;
	private Long chkListId;

	public Long getChkListId() {
		return chkListId;
	}

	public void setChkListId(Long chkListId) {
		this.chkListId = chkListId;
	}

	public QcChkList getQcChkList() {
		return qcChkList;
	}

	public void setQcChkList(QcChkList qcChkList) {
		this.qcChkList = qcChkList;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcChkList> list= qcChkListService.getAll(filter);
		
		Type type=new TypeToken<List<QcChkList>>(){}.getType();
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
				qcChkListService.remove(new Long(id));
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
		QcChkList qcChkList=qcChkListService.get(chkListId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcChkList));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcChkList.getChkListId()==null){
			qcChkListService.save(qcChkList);
		}else{
			QcChkList orgQcChkList=qcChkListService.get(qcChkList.getChkListId());
			try{
				BeanUtil.copyNotNullProperties(orgQcChkList, qcChkList);
				qcChkListService.save(orgQcChkList);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 显示当前登录用户的待考核列表
	 */
	public String listUserLogin(){
		Long useid = ContextUtil.getCurrentUserId();
		StringBuffer ids_ = new StringBuffer(); 
		int count = 0;
		QueryFilter qf = new QueryFilter();
		qf.addFilter("Q_chkUseId_L_EQ", useid.toString());
		for(QcChkList qcl : qcChkListService.getAllNoRequest(qf)){
			ids_.append(qcl.getObjId()+",");
			count++;
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").
				append(count).append(",result:");
		String result = "";
		if(count != 0){
			String ids = ids_.substring(0, ids_.length() -1);
			ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
			result = chssi.queryByMultId(ids);
		}
		
		buff.append(result);
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
}
