package com.ulane.running.action.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.annotation.Resource;

import net.sf.json.util.JSONUtils;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;


import com.ulane.base.model.xitong.UlContactEmpl;
import com.ulane.running.model.qucon.HTMLHelper;
import com.ulane.running.model.qucon.QcCheck;
import com.ulane.running.model.qucon.QcScoreOpt;
import com.ulane.running.model.qucon.QcTempChapcter;
import com.ulane.running.model.qucon.QcTempTar;
import com.ulane.running.model.qucon.QcTemplate;
import com.ulane.running.model.qucon.ShowDetail;
import com.ulane.running.service.qucon.QcTempTarService;
import com.ulane.running.service.qucon.QcTemplateService;

import edu.emory.mathcs.backport.java.util.Collections;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcTemplateAction extends BaseAction{
	@Resource
	private QcTemplateService qcTemplateService;
	private QcTemplate qcTemplate;
	@Resource
	private QcTempTarService qcTempTarService;
	@Resource
	private AppUserService appUserService;
	
	private Long tmpId;

	public Long getTmpId() {
		return tmpId;
	}

	public void setTmpId(Long tmpId) {
		this.tmpId = tmpId;
	}

	public QcTemplate getQcTemplate() {
		return qcTemplate;
	}

	public void setQcTemplate(QcTemplate qcTemplate) {
		this.qcTemplate = qcTemplate;
	}

	public String showTemplate(){
		Long id = Long.parseLong(getRequest().getParameter("id"));
		QcTemplate qt = qcTemplateService.get(id);
		removeDelChap(qt);
		setQcHTML(qt);
		getRequest().setAttribute("template", qt);
		return "show";
	}
	
	
	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcTemplate> list= qcTemplateService.getAll(filter);
		
		removeDisable(list);
		setUpdName(list);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(list.size()).append(",result:");
		
        JSONSerializer ser = JsonUtil.getJSONSerializer();
		buff.append(ser.serialize(list));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	/**
	 * 显示模版下的评分详细信息
	 */
	public String listQcTempTar(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("disorder", "desc");
		List<QcTempTar> list= qcTempTarService.getAll(filter);
		setShowDetail(list);
		removeDeletedTempTar(list);
		if(getRequest().getParameter("id") != null){
			list = new ArrayList<QcTempTar>();
		}
//		Collections.sort(list, new Comparator<QcTempTar>(){
//			@Override
//			public int compare(QcTempTar o1, QcTempTar o2) {
//				return o1.getDisorder() - o2.getDisorder();
//			}
//		});
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(list.size()).append(",result:");
		
        JSONSerializer ser = JsonUtil.getJSONSerializer();
        ser.exclude("qcTarget.appUser").exclude("qcTarget.appUser1").exclude("qcTarget.appUser2")
        	.exclude("qcTarget.creDat").exclude("qcTarget.creUseId").exclude("qcTarget.qcTarCat")
        	.exclude("qcTarget.staId").exclude("qcTarget.tarCatId").exclude("qcTarget.updDat")
        	.exclude("qcTarget.updUseId").exclude("qcTarget.username1").exclude("qcTarget.username2")
        	.exclude("qcTempChapcter.catName").exclude("qcTarget.disorder").exclude("qcTarget.qcTemplate")
        	.exclude("qcTarget.score").exclude("qcTarget.staId")
        	.exclude("qcTarget.tmpId").exclude("qcTemplate").exclude("qcTempChapcter.qcTemplate");
        buff.append(ser.serialize(list));
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
				QcTemplate qc = qcTemplateService.get(Long.parseLong(id));
				qc.setStaId(QcTemplate.DISABLED);
				qcTemplateService.save(qc);
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
		QcTemplate qcTemplate=qcTemplateService.get(tmpId);

		setAllHTML(qcTemplate);
		removeDelChap(qcTemplate);
		
//		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		JSONSerializer json = new JSONSerializer();
		StringBuffer sb = new StringBuffer("{success:true,data:");
		json.include("qcScoreOpts");
		sb.append(json.serialize(qcTemplate));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcTemplate.getTmpId()==null){
			addpingFenXiangSet();
			addZhangJieSet();
			qcTemplate.setCreUseId(ContextUtil.getCurrentUser().getUserId());
			qcTemplate.setCreDat(new Date());
			qcTemplate.setStaId(QcTemplate.ENABLED);
			qcTemplateService.save(qcTemplate);
		}else{
			QcTemplate orgQcTemplate=qcTemplateService.get(qcTemplate.getTmpId());
			try{
				BeanUtil.copyNotNullProperties(orgQcTemplate, qcTemplate);
				orgQcTemplate.setUpdDat(new Date());
				orgQcTemplate.setUpdUseId(ContextUtil.getCurrentUserId());
				qcTemplateService.save(orgQcTemplate);
			}catch(Exception ex){
				ex.printStackTrace();
				logger.error(ex.getMessage());
			}
		}
//		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public void addpingFenXiangSet(){
		String details = getRequest().getParameter("pingFenXiangDetails");
		if (StringUtils.isNotEmpty(details)) {
			Gson gson = new Gson();
			QcScoreOpt[] pingFenXiangDetails = (QcScoreOpt[]) gson.fromJson(details,
					QcScoreOpt[].class);
	//			QcScoreOpt[] pingFenXiangDetails =
	//					new JSONDeserializer<QcScoreOpt[]>().deserialize(details);
				
			qcTemplate.getQcScoreOpts().clear();
			for (QcScoreOpt detail : pingFenXiangDetails) {
				detail.setQcTemplate(qcTemplate);
				qcTemplate.getQcScoreOpts().add(detail);
			}
		}
	}
	
	public void addZhangJieSet(){
		String details = getRequest().getParameter("zhangJieDetails");
		if (StringUtils.isNotEmpty(details)) {
			Gson gson = new Gson();
			QcTempChapcter[] zhangJieDetails = (QcTempChapcter[]) gson.fromJson(details,
					QcTempChapcter[].class);
	//			QcScoreOpt[] pingFenXiangDetails =
	//					new JSONDeserializer<QcScoreOpt[]>().deserialize(details);
				
			qcTemplate.getQcTempChapcters().clear();
			for (QcTempChapcter detail : zhangJieDetails) {
				detail.setQcTemplate(qcTemplate);
				detail.setStaId(QcTemplate.ENABLED);
				qcTemplate.getQcTempChapcters().add(detail);
			}
		}
	}
	
	/**
	 * 显示一个指标章节下的所有指标
	 * @return
	 */
	public String childlist_tarcat(){
		return SUCCESS;
	}
	
	public void setShowDetail(List<QcTempTar> list){
		for(QcTempTar tmp : list){
			if(tmp.getQcTempChapcter().getType().equals(QcTempChapcter.YANZHONG)){
				tmp.setDesignHTML("严重错误章节,选项无效!");
				
			}else{
				StringBuffer sb = new StringBuffer();
				for(QcScoreOpt qso : tmp.getQcTemplate().getQcScoreOpts()){
					sb.append("<input type=\"checkbox\" value=\""+qso.getScoreOptId()+
							"\" id=\"scoreOpt_"+tmp.getQcTarget().getTarId()+"_" + qso.getScoreOptId()  +"\"");
					if(hasThisScoreOpt(qso, tmp))
						sb.append("checked=\"checked\"");
					sb.append("/>"+qso.getOptName()+"&nbsp;&nbsp;&nbsp;");
				}
				tmp.setDesignHTML(sb.toString());
			}
		}
	}
	
	public void removeDelChap(QcTemplate qt){
		Iterator<QcTempChapcter> i = qt.getQcTempChapcters().iterator();
		while(i.hasNext()){
			if(i.next().getStaId().equals(QcTemplate.DISABLED)){
				i.remove();
			}
		}
	}
	
	/**
	 * 设置一个模版的allHTML为显示所有的checkbox代码
	 * @param qt
	 */
	public void setAllHTML(QcTemplate qt){
		StringBuffer sb = new StringBuffer();
		for(QcScoreOpt qso : qt.getQcScoreOpts()){
			sb.append("<input type=\"checkbox\" value=\""+qso.getScoreOptId()+
					"\" id=\"scoreOpt_"+qso.getScoreOptId()  +"\" checked=\"checked\" />"+qso.getOptName()+"&nbsp;&nbsp;&nbsp;");
		}
		qt.setAllHTML(sb.toString());
	}
	
	/**
	 * 显示模版页使用的指标详情的html代码
	 * @param qt
	 */
	public void setQcHTML(QcTemplate qt){
		if(qt.getChkTypeId().equals(QcTemplate.SCORE_OPT)){//评分项类型模版的html
			for(QcTempTar qtt : qt.getQcTempTars()){
				if(qtt.getQcTempChapcter().getType().equals(QcTempChapcter.YANZHONG)){
					HTMLHelper one = new HTMLHelper("checkbox");
					one.addAttr("name", "score_"+qtt.getTmpTarId());
					one.addAttr("value", QcCheck.YANZHONG_CHECK.toString());
					one.addAttr("onclick", "javascript:yanzhong_opt(event)");
					qtt.setQcHTML("<td colspan=\"" + qt.getQcScoreOpts().size() + "\">" +
						one.toString() + "</td>");
				}else{
					StringBuffer sb = new StringBuffer();
					for(QcScoreOpt qso : qt.getQcScoreOpts()){
						sb.append("<td>");
						if(hasThisScoreOpt(qso, qtt)){
							HTMLHelper one = new HTMLHelper("radio");
							one.addAttr("name", "score_"+qtt.getTmpTarId());
							one.addAttr("value", qso.getOptScore().toString());
							one.addAttr("onclick", "javascript:calc()");
							sb.append(one.toString());
						}
						sb.append("</td>");
					}
					qtt.setQcHTML(sb.toString());
				}
			}
		}else{//打分项模版的html
			for(QcTempTar qtt : qt.getQcTempTars()){
				if(qtt.getQcTempChapcter().getType().equals(QcTempChapcter.YANZHONG)){
					HTMLHelper one = new HTMLHelper("checkbox");
					one.addAttr("name", "score_"+qtt.getTmpTarId());
					one.addAttr("value", QcCheck.YANZHONG_CHECK.toString());
					one.addAttr("onclick", "javascript:yanzhong_input(event)");
					qtt.setQcHTML("<td>" + one + "</td>");
				}else{
					StringBuffer sb = new StringBuffer();
					sb.append("<td>");
					HTMLHelper one = new HTMLHelper("text");
					one.addAttr("name", "score_"+qtt.getTmpTarId());
					one.addAttr("id", "score_"+qtt.getTmpTarId());
					one.addAttr("onkeyup", "javascript:validateAndCala(" + qtt.getTmpTarId() + ")");
					sb.append(one.toString());
					HTMLHelper hidden_min = new HTMLHelper("hidden");
					hidden_min.addAttr("value", qtt.getMinScore().toString());
					hidden_min.addAttr("id", "min_" + qtt.getTmpTarId());
					sb.append(hidden_min);
					HTMLHelper hidden_max = new HTMLHelper("hidden");
					hidden_max.addAttr("value", qtt.getMaxScore().toString());
					hidden_max.addAttr("id", "max_" + qtt.getTmpTarId());
					sb.append(hidden_max);
					sb.append("</td>");
					qtt.setQcHTML(sb.toString());
				}
			}
		}
	}
	
	/**
	 * 查找一个评分详情项中是否存在一个可选分数项
	 * @param qso
	 * @param qtt
	 * @return
	 */
	public boolean hasThisScoreOpt(QcScoreOpt qso, QcTempTar qtt){
		for(QcScoreOpt tmp : qtt.getQcScoreOpts()){
			if(tmp.getScoreOptId().equals(qso.getScoreOptId())){
				return true;
			}
		}
		return false;
	}
	
	private void removeDisable(List<QcTemplate> list){
		Iterator<QcTemplate> it = list.iterator();
		while(it.hasNext()){
			if(it.next().getStaId().equals(QcTemplate.DISABLED)){
				it.remove();
			}
		}
	}
	
	private void setUpdName(List<QcTemplate> list){
		Iterator<QcTemplate> it = list.iterator();
		while(it.hasNext()){
			QcTemplate qt = it.next();
			if(qt.getUpdUseId() != null){
				String updName = appUserService.get(qt.getUpdUseId()).getFullname();
				qt.setUpdName(updName);
			}
		}
	}
	
	public void removeDeletedTempTar(List<QcTempTar> list){
		Iterator<QcTempTar> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getStaId().equals(QcTemplate.DISABLED))
				i_list.remove();
		}
	}
}
