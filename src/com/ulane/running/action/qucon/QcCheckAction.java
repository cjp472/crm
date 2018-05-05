package com.ulane.running.action.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;


import com.opensymphony.xwork2.ActionContext;
import com.ulane.running.model.qucon.HTMLHelper;
import com.ulane.running.model.qucon.QcCheck;
import com.ulane.running.model.qucon.QcCheckDetail;
import com.ulane.running.model.qucon.QcScoreOpt;
import com.ulane.running.model.qucon.QcTarget;
import com.ulane.running.model.qucon.QcTempChapcter;
import com.ulane.running.model.qucon.QcTempRelease;
import com.ulane.running.model.qucon.QcTempTar;
import com.ulane.running.model.qucon.QcTemplate;
import com.ulane.running.service.qucon.QcCheckDetailService;
import com.ulane.running.service.qucon.QcCheckService;
import com.ulane.running.service.qucon.QcTempReleaseService;
import com.ulane.running.service.qucon.QcTempTarService;
import com.ulane.running.service.qucon.QcTemplateService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcCheckAction extends BaseAction{
	@Resource
	private QcCheckService qcCheckService;
	private QcCheck qcCheck;
	@Resource
	private QcCheckDetailService qcCheckDetailService;
	@Resource
	private QcTemplateService qcTemplateService;
	@Resource
	private QcTempTarService qcTempTarService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private QcTempReleaseService qcTempReleaseService;
	
	private Long chkId;

	public Long getChkId() {
		return chkId;
	}

	public void setChkId(Long chkId) {
		this.chkId = chkId;
	}

	public QcCheck getQcCheck() {
		return qcCheck;
	}

	public void setQcCheck(QcCheck qcCheck) {
		this.qcCheck = qcCheck;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcCheck> list= qcCheckService.getAll(filter);
		
		for(QcCheck tmp : list){
			tmp.setChkUserName(appUserService.get(tmp.getChkUseId()).getFullname());
			tmp.setToUserName(appUserService.get(tmp.getToUseId()).getFullname());
		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer js = new JSONSerializer();
/*		js.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
			"chkTimeSta", "chkTimeEnd"});*/
		js.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), "chkTimeSta");
		js.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), "chkTimeEnd");
		buff.append(js.serialize(list));
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
				qcCheckService.remove(new Long(id));
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
		QcCheck qcCheck=qcCheckService.get(chkId);
		qcCheck.setChkUserName(appUserService.get(qcCheck.getChkUseId()).getFullname());
		qcCheck.setToUserName(appUserService.get(qcCheck.getToUseId()).getFullname());
		
		JSONSerializer json = JsonUtil.getJSONSerializer();
		//将数据转成JSON格式
		json.exclude("qcTempRelease");
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.serialize(qcCheck));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String toUseId = getRequest().getParameter("toUseId");
		String tempReleId = getRequest().getParameter("tempReleId");
		if(qcCheck.getChkId()==null){
			String ids = getRequest().getParameter("ids");
			//TODO 状态值有那些？？考核人和被考核人呢？
			qcCheck.setChkTimeSta(new Date());
			qcCheck.setChkTimeEnd(new Date());
			qcCheck.setChkUseId(ContextUtil.getCurrentUserId());
			qcCheck.setToUseId(Long.parseLong(toUseId));
			if(qcCheck.getConfirmResult().equals(QcTemplate.YES)){
				qcCheck.setStaId(QcCheck.NEED_CONFIRM);
			}else{
				qcCheck.setStaId(QcCheck.PSSS_UNNEED_CONFIRM);
			}
			qcCheck.setQcTempRelease(qcTempReleaseService.get(Long.parseLong(tempReleId)));
//			qcCheckService.save(qcCheck);
			for(String id_tmp : ids.split(",")){
				String id = id_tmp.substring(0, id_tmp.indexOf("@"));
				QcCheckDetail qcd = new QcCheckDetail();
				if(getRequest().getParameter("score_"+id) == null){//严重错误项未选中时，为null
					qcd.setScore(new BigDecimal(QcCheck.YANZHONG_UNCHECK));
				}else{
					qcd.setScore(new BigDecimal(getRequest().getParameter("score_"+id)));
				}
				qcd.setRemark(getRequest().getParameter("remark_"+id));
				qcd.setQcTempTar(qcTempTarService.get(Long.parseLong(id)));
				qcd.setQcCheck(qcCheck);
				qcCheck.getQcCheckDetails().add(qcd);
			}
			qcCheckService.save(qcCheck);
		}else{
			QcCheck orgQcCheck=qcCheckService.get(qcCheck.getChkId());
			try{
				BeanUtil.copyNotNullProperties(orgQcCheck, qcCheck);
				qcCheckService.save(orgQcCheck);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public String showCheck(){
		Long id = Long.parseLong(getRequest().getParameter("id"));
		QcCheck qc = qcCheckService.get(id);
		QcTemplate qct = qc.getQcTempRelease().getQcTemplate();
		setQcHTML(qct, qc);
		getRequest().setAttribute("template", qct);
		getRequest().setAttribute("check", qc);
		getRequest().setAttribute("disable", true);
		return "show";
	}
	
	/**
	 * 显示打分结果页使用的指标详情的html代码，需填充分数
	 * @param qt
	 */
	public void setQcHTML(QcTemplate qt, QcCheck qc){
		if(qt.getChkTypeId().equals(QcTemplate.SCORE_OPT)){//评分项类型模版的html
			for(QcTempTar qtt : qt.getQcTempTars()){
				if(qtt.getQcTempChapcter().getType().equals(QcTempChapcter.YANZHONG)){
					HTMLHelper one = new HTMLHelper("checkbox");
					one.addAttr("name", "score_"+qtt.getTmpTarId());
					one.addAttr("value", "-1");
					//设置选中
					if(hasChecked_yanzhong(qtt.getTmpTarId(), qc)){
						one.addAttr("checked", "checked");
					}
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
							if(hasChecked_opt(qtt.getTmpTarId(), qso.getOptScore(), qc)){
								one.addAttr("checked", "checked");
							}
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
					one.addAttr("value", "-1");
					if(hasChecked_yanzhong(qtt.getTmpTarId(), qc)){
						one.addAttr("checked", "checked");
					}
					qtt.setQcHTML("<td>" + one + "</td>");
				}else{
					StringBuffer sb = new StringBuffer();
					sb.append("<td>");
					HTMLHelper one = new HTMLHelper("text");
					one.addAttr("name", "score_"+qtt.getTmpTarId());
					one.addAttr("id", "score_"+qtt.getTmpTarId());
					one.addAttr("value", getValue_text(qtt.getTmpTarId(), qc).toString());
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
	
	public boolean hasChecked_yanzhong(Long id, QcCheck qc){
		for(QcCheckDetail qcd : qc.getQcCheckDetails()){
			if(qcd.getQcTempTar().getTmpTarId().equals(id)){
				if(qcd.getScore().equals(new BigDecimal(QcCheck.YANZHONG_CHECK))){
					return true;
				}
			}
		}
		return false;
	}
	
	public BigDecimal getValue_text(Long id, QcCheck qc){
		for(QcCheckDetail qcd : qc.getQcCheckDetails()){
			if(qcd.getQcTempTar().getTmpTarId().equals(id)){
				return qcd.getScore();
			}
		}
		return new BigDecimal(0);
	}
	
	public boolean hasChecked_opt(Long id, BigDecimal value, QcCheck qc){
		for(QcCheckDetail qcd : qc.getQcCheckDetails()){
			if(qcd.getQcTempTar().getTmpTarId().equals(id)){
				if(qcd.getScore().equals(value)){
					return true;
				}
			}
		}
		return false;
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
	/**
	 * 考评中 by KYQ
	 * @return
	 */
	public String approvedOk(){
		System.out.println(chkId);
		String chkId=getRequest().getParameter("chkId");
		if(chkId !=null && chkId !=""){
			 
				QcCheck qcCheck =qcCheckService.get(new Long(chkId));
				qcCheck.setStaId(QcCheck.NEED_CONFIRM);
				qcCheckService.save(qcCheck);
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
/**
 * 	审批被驳回 by KYQ Reject
 * @return
*/	
	public String approvedReject(){
		String chkId = getRequest().getParameter("chkId");
		if(chkId !=null&& chkId !=""){
			QcCheck qcCheck = qcCheckService.get(new Long(chkId));
			qcCheck.setStaId(QcCheck.UNPASSED_CONFIRMFAIL);
			qcCheckService.save(qcCheck);
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
	/**
	 * 	审批通过 by KYQ 
	 * @return
	*/	
		public String approvedHadOk(){
			String chkId = getRequest().getParameter("chkId");
//			System.out.println(chkId);
			if(chkId !=null&& chkId !=""){
				QcCheck qcCheck = qcCheckService.get(new Long(chkId));
				qcCheck.setStaId(QcCheck.PASS_CONFIRMED);
				qcCheckService.save(qcCheck);
			}
			jsonString="{success:true}";
			return SUCCESS;
		}
}
