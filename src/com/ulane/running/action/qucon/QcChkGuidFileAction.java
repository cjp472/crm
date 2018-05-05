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


import com.ulane.running.model.qucon.QcChkGuidFile;
import com.ulane.running.service.qucon.QcChkGuidFileService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcChkGuidFileAction extends BaseAction{
	@Resource
	private QcChkGuidFileService qcChkGuidFileService;
	private QcChkGuidFile qcChkGuidFile;
	
	private Long fileId;

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public QcChkGuidFile getQcChkGuidFile() {
		return qcChkGuidFile;
	}

	public void setQcChkGuidFile(QcChkGuidFile qcChkGuidFile) {
		this.qcChkGuidFile = qcChkGuidFile;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcChkGuidFile> list= qcChkGuidFileService.getAll(filter);
		
		Type type=new TypeToken<List<QcChkGuidFile>>(){}.getType();
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
				qcChkGuidFileService.remove(new Long(id));
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
		QcChkGuidFile qcChkGuidFile=qcChkGuidFileService.get(fileId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcChkGuidFile));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcChkGuidFile.getFileId()==null){
			qcChkGuidFileService.save(qcChkGuidFile);
		}else{
			QcChkGuidFile orgQcChkGuidFile=qcChkGuidFileService.get(qcChkGuidFile.getFileId());
			try{
				BeanUtil.copyNotNullProperties(orgQcChkGuidFile, qcChkGuidFile);
				qcChkGuidFileService.save(orgQcChkGuidFile);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
