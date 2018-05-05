package com.ulane.running.action.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.know.model.know.UkKnowKeyword;
import com.ulane.know.model.know.UkKnowKeywordType;
import com.ulane.running.model.qucon.QcTarCat;
import com.ulane.running.model.qucon.QcTarget;
import com.ulane.running.service.qucon.QcTarCatService;
import com.ulane.running.service.qucon.QcTargetService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcTargetAction extends BaseAction{
	@Resource
	private QcTargetService qcTargetService;
	private QcTarget qcTarget;
	@Resource
	private QcTarCatService qcTarCatService;
	
	private Long tarId;

	public Long getTarId() {
		return tarId;
	}

	public void setTarId(Long tarId) {
		this.tarId = tarId;
	}

	public QcTarget getQcTarget() {
		return qcTarget;
	}

	public void setQcTarget(QcTarget qcTarget) {
		this.qcTarget = qcTarget;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("tarId", "desc");
		List<QcTarget> list= qcTargetService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
			.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
//		Gson gson=new Gson();
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(list));
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
//				qcTargetService.remove(new Long(id));  //修改删除功能为注销功能
				QcTarget qcTarget =qcTargetService.get(new Long(id));
				qcTarget.setStaId(QcTarget.FLAG_INVALID);
				qcTargetService.save(qcTarget);
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	/**
	 * 批量和单个启用
	 * @return
	 */
	public String multiEnable(){
		
		String[]ids=getRequest().getParameterValues("ids");						//批量启用
		String tarId = getRequest().getParameter("tarId");								//单个启用
		if(ids!=null){
			for(String id:ids){
				QcTarget qcTarget=qcTargetService.get(new Long(id));
				qcTarget.setStaId(QcTarget.FLAG_ENABLED);
				qcTargetService.save(qcTarget);
			}
		}
		if(tarId != null && tarId != ""){
				QcTarget qcTarget=qcTargetService.get(new Long(tarId));
				qcTarget.setStaId(QcTarget.FLAG_ENABLED);
				qcTargetService.save(qcTarget);
		}
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		QcTarget qcTarget=qcTargetService.get(tarId);
		qcTarget.setUsername1(qcTarget.getAppUser1().getUsername());
		qcTarget.setUsername2(qcTarget.getAppUser2().getUsername());
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		JSONSerializer json = JsonUtil.getJSONSerializer();
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.serialize(qcTarget));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcTarget.getTarId()==null){
			qcTarget.setCreUseId(ContextUtil.getCurrentUser().getUserId());
			qcTarget.setUpdUseId(ContextUtil.getCurrentUser().getUserId());
			qcTarget.setCreDat(new Timestamp(System.currentTimeMillis()));
			qcTarget.setUpdDat(new Timestamp(System.currentTimeMillis()));
			qcTarget.setStaId(QcTarget.FLAG_UNENABLED);
			qcTargetService.save(qcTarget);
		}else{
			QcTarget orgQcTarget=qcTargetService.get(qcTarget.getTarId());
			try{
				BeanUtil.copyNotNullProperties(orgQcTarget, qcTarget);
				orgQcTarget.setUpdDat(new Date());
				qcTargetService.save(orgQcTarget);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String childlist_target(){
		List<QcTarCat> allTypes = new ArrayList<QcTarCat>(); 
		List<QcTarget> allTarget = new ArrayList<QcTarget>(); 
		Long typeId = 0L;
		if(getRequest().getParameter("typeId") != null){
			typeId = Long.parseLong(getRequest().getParameter("typeId"));
			allTypes.add(qcTarCatService.get(typeId));
		}
		findChildType(typeId ,allTypes);
		
		for(QcTarCat type : allTypes ){
			QueryFilter qf = new QueryFilter(getRequest());
			qf.addFilter("Q_qcTarCat.tarCatId_L_EQ", type.getTarCatId().toString());
			allTarget.addAll(qcTargetService.getAll(qf));
		}
//		removeDeletedTarget(allTarget);
		
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
			.append(allTarget.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), "updDat");		//2012-07-12 KYQ
//		serializer.transform(new DateTransformer("yyyy-MM-dd"),
//				new String[] { "appUser.accessionTime" });
		buff.append(serializer.serialize(allTarget));

		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	public void findChildType(Long typeId, List<QcTarCat> result) {
//		QueryFilter qf = new QueryFilter();
//		qf.addFilter("Q_parTarCatId_L_EQ", typeId.toString());
//		List<QcTarCat> child = qcTarCatService.getAll(qf);
		List<QcTarCat> child = qcTarCatService.findByParentId(typeId);
		if(child.size() == 0){
			return;
		}
		else{
			for (QcTarCat type : child) {
				result.add(type);
				findChildType(type.getTarCatId(), result);
			}
		}
	}
	
	public void removeDeletedTarget(List<QcTarget> list){
		Iterator<QcTarget> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getStaId().equals(QcTarget.FLAG_INVALID))
				i_list.remove();
		}
	}
}
