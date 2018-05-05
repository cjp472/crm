package com.ulane.running.action.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.service.system.AppUserService;


import com.ulane.running.model.qucon.QcTempReCha;
import com.ulane.running.model.qucon.QcTempReObj;
import com.ulane.running.model.qucon.QcTempRelease;
import com.ulane.running.model.qucon.QcTemplate;
import com.ulane.running.service.qucon.QcTempReChaService;
import com.ulane.running.service.qucon.QcTempReObjService;
import com.ulane.running.service.qucon.QcTempReleaseService;
import com.ulane.running.service.qucon.QcTemplateService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcTempReleaseAction extends BaseAction{
	@Resource
	private QcTempReleaseService qcTempReleaseService;
	private QcTempRelease qcTempRelease;
	
	@Resource
	private QcTempReObjService qcTempReObjService;
	@Resource
	private QcTempReChaService qcTempReChaService;
	@Resource
	private QcTemplateService qcTemplateService;
	@Resource
	private AppUserService appUserService;
	
	private Long tempReleId;

	public Long getTempReleId() {
		return tempReleId;
	}

	public void setTempReleId(Long tempReleId) {
		this.tempReleId = tempReleId;
	}

	public QcTempRelease getQcTempRelease() {
		return qcTempRelease;
	}

	public void setQcTempRelease(QcTempRelease qcTempRelease) {
		this.qcTempRelease = qcTempRelease;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcTempRelease> list= qcTempReleaseService.getAll(filter);
		
		Type type=new TypeToken<List<QcTempRelease>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示一个用户的所有指定渠道的发布模版列表
	 */
	public String getOneList(){
		String channel = getRequest().getParameter("channel");
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_qcTempReObjs.usrId_L_LIN", ContextUtil.getCurrentUserId().toString());
		filter.addFilter("Q_qcTempReChas.chaId_SN_SNIN", channel);
		List<QcTempRelease> list= qcTempReleaseService.getAll(filter);
		
		setName(list);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer json = JsonUtil.getJSONSerializer();
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
				qcTempReleaseService.remove(new Long(id));
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
		QcTempRelease qcTempRelease=qcTempReleaseService.get(tempReleId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcTempRelease));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcTempRelease.getTempReleId()==null){
			qcTempReleaseService.save(qcTempRelease);
		}else{
			QcTempRelease orgQcTempRelease=qcTempReleaseService.get(qcTempRelease.getTempReleId());
			try{
				BeanUtil.copyNotNullProperties(orgQcTempRelease, qcTempRelease);
				qcTempReleaseService.save(orgQcTempRelease);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String publish(){
		String userIds = getRequest().getParameter("userIds");
		String qudaoId = getRequest().getParameter("qudao");
		String tempId = getRequest().getParameter("tempId");
		
		QcTemplate qt = qcTemplateService.get(Long.parseLong(tempId));
		QcTempRelease qtr = new QcTempRelease();
		fillData(qt, qtr);
		//TODO 开始时间，结束时间？？？
		qtr.setStaDat(new Date());
		qtr.setEndDat(new Date());
		qtr.setReleaseFilePath("待续");
		qtr.setRelaseUseId(ContextUtil.getCurrentUserId());
		qtr.setRelaseDat(new Date());
		qtr.setStaId(QcTemplate.ENABLED);
		qtr.setQcTemplate(qt);
		qtr.setChkChannel(Short.parseShort(qudaoId));
		qcTempReleaseService.save(qtr);
		
		QcTempReCha qtrc = new QcTempReCha();
		qtrc.setChaId(Short.parseShort(qudaoId));
		qtrc.setQcTempRelease(qtr);
		qcTempReChaService.save(qtrc);
		
		for(String userId : userIds.split(",")){
			QcTempReObj qtro = new QcTempReObj();
			qtro.setUsrId(Long.parseLong(userId));
			qtro.setQcTempRelease(qtr);
			qcTempReObjService.save(qtro);
		}
		return SUCCESS;
	}
	
	private void fillData(QcTemplate qt, QcTempRelease qtr){
		qtr.setReleName(qt.getTmpName());
		qtr.setReleContent(qt.getTmpContent());
		qtr.setChkTypeId(qt.getChkTypeId());
		qtr.setAllowRecheck(qt.getAllowRecheck());
		qtr.setAllowRemark(qt.getAllowRemark());
		//TODO qtr是否说明
		qtr.setBaseScore(qt.getBaseScore());
		qtr.setMinScore(qt.getMinScore());
		qtr.setMaxScore(qt.getMaxScore());
		qtr.setRemark(qt.getRemark());
	}
	
	private void setName(List<QcTempRelease> rs){
		Iterator<QcTempRelease> it_rs = rs.iterator();
		while(it_rs.hasNext()){
			QcTempRelease tmp = it_rs.next();
			tmp.setRelaseUerName(appUserService.get(tmp.getRelaseUseId()).getFullname());
		}
	}
}
