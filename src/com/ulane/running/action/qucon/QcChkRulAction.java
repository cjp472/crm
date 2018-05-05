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
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.InvocationTargetException;
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
import com.htsoft.oa.service.system.AppUserService;


import com.ulane.base.model.xitong.UlContactEmpl;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlUsergroupService;
import com.ulane.running.model.qucon.ExtractRule;
import com.ulane.running.model.qucon.QcChkList;
import com.ulane.running.model.qucon.QcChkRul;
import com.ulane.running.model.qucon.QcChkRulDetail;
import com.ulane.running.model.qucon.QcTemplate;
import com.ulane.running.model.qucon.RandomExtract;
import com.ulane.running.model.qucon.RandomExtractModel;
import com.ulane.running.service.qucon.QcChkListService;
import com.ulane.running.service.qucon.QcChkRulService;
import com.ulane.running.service.qucon.QcRandomExtractService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcChkRulAction extends BaseAction{
	@Resource
	private QcChkRulService qcChkRulService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private UlUsergroupService ulUsergroupService;
	@Resource
	private QcRandomExtractService qcRandomExtractService;
	@Resource
	private QcChkListService qcChkListService;
	
	private QcChkRul qcChkRul;
	
	private Long chkRulId;

	public Long getChkRulId() {
		return chkRulId;
	}

	public void setChkRulId(Long chkRulId) {
		this.chkRulId = chkRulId;
	}

	public QcChkRul getQcChkRul() {
		return qcChkRul;
	}

	public void setQcChkRul(QcChkRul qcChkRul) {
		this.qcChkRul = qcChkRul;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcChkRul> list= qcChkRulService.getAll(filter);
		
		setName(list);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
			.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer ser = JsonUtil.getJSONSerializer();
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
				QcChkRul qcr = qcChkRulService.get(Long.parseLong(id));
				qcr.setRulStaId(QcTemplate.DISABLED);
				qcChkRulService.save(qcr);
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 批量启用
	 * @return
	 */
	public String multiEnable(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				QcChkRul qcr = qcChkRulService.get(Long.parseLong(id));
				qcr.setRulStaId(QcTemplate.ENABLED);
				qcChkRulService.save(qcr);
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
		QcChkRul qcChkRul=qcChkRulService.get(chkRulId);
		JSONSerializer json = new JSONSerializer();
		json.transform(new DateTransformer("yyyy-MM-dd"), Date.class);
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.serialize(qcChkRul));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 获取当前考核规则的关于具体类型的考核规则
	 * @return
	 */
	public String getDetail(){
		String ruleId = getRequest().getParameter("ruleId");
		String type = getRequest().getParameter("type");
		if(ruleId == null || type == null || ruleId.equals("undefined")){
			return SUCCESS;
		}
        QcChkRul qcChkRul = qcChkRulService.get(Long.parseLong(ruleId));
        JSONSerializer ser = JsonUtil.getJSONSerializer();
        Iterator<QcChkRulDetail> it = qcChkRul.getQcChkRulDetails().iterator();
        while(it.hasNext()){
        	QcChkRulDetail tmp = it.next();
        	if(tmp.getRulStaId().equals(QcTemplate.DISABLED) ||
        			!tmp.getDetailType().equals(Short.parseShort(type))){
        		it.remove();
        	}
        }
        
        setNameOfDetail(qcChkRul.getQcChkRulDetails());
        
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
        	.append(qcChkRul.getQcChkRulDetails().size()).append(
             ",result:");
        
        buff.append(ser.serialize(qcChkRul.getQcChkRulDetails()));
        buff.append("}");
        jsonString = buff.toString();
    	return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String details_usergroup = getRequest().getParameter("details_usergroup");
		if (StringUtils.isNotEmpty(details_usergroup)) {
			
//			String [] data = details_usergroup.split("undefined");
//			int index = data[1].indexOf("\",\"");
//			String sub = data[1].substring(index+3); 
//			details_usergroup = data[0] + sub;
			
			Gson gson = new Gson();
			QcChkRulDetail [] detail = (QcChkRulDetail[]) gson.fromJson(details_usergroup,
					QcChkRulDetail[].class);
			qcChkRul.getQcChkRulDetails().clear();
			if (detail != null) {
				for (QcChkRulDetail one : detail) {
					one.setQcChkRul(qcChkRul);
					one.setRulStaId(QcTemplate.ENABLED);
					qcChkRul.addQcChkRulDeails(one);
				}
			}
		}
		
		if(qcChkRul.getChkRulId()==null){
			qcChkRul.setCreateBy(ContextUtil.getCurrentUserId());
			qcChkRul.setCreateDate(new Timestamp(System.currentTimeMillis()));
			qcChkRul.setRulStaId(QcTemplate.ENABLED);
			qcChkRulService.save(qcChkRul);
		}else{
			//因为前台没有传递 创建人和创建时间属性，所以保存后，该属性为null
			QcChkRul org = qcChkRulService.get(qcChkRul.getChkRulId());
        	try {
				BeanUtil.copyNotNullProperties(qcChkRul, org);
        	} catch (IllegalAccessException e) {
        		e.printStackTrace();
        	} catch (InvocationTargetException e) {
        		e.printStackTrace();
        	}
//			qcChkRul.setCreateBy(org.getCreateBy());
//			qcChkRul.setCreateDate(org.getCreateDate());
			qcChkRul.setUpdateBy(ContextUtil.getCurrentUserId());
			qcChkRul.setUpdateDate(new Timestamp(System.currentTimeMillis()));
			qcChkRul.setRulStaId(QcTemplate.ENABLED);
			qcChkRulService.merge(qcChkRul);
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public String allocate(){
		String userId = getRequest().getParameter("userId");
		String ruleId = getRequest().getParameter("ruleId");
		QcChkRul qcr = qcChkRulService.get(Long.parseLong(ruleId));
		RandomExtractModel rem = new RandomExtractModel();
		rem.setTableName("CON_HIS");
		rem.setIdColumnName("CON_HIS_ID");
		rem.setUserColumnName("OWNER_ID");
		for(QcChkRulDetail qcd : qcr.getQcChkRulDetails()){
			ExtractRule er = new ExtractRule();
			er.setRuleType(qcd.getDetailType());
			er.setRuleTypeId(qcd.getObjectId());
			er.setExtractType(qcd.getTypId().shortValue());
			er.setExtractTypeValue(Long.parseLong(qcd.getVal()));
			er.setRuleValue(qcd.getRul());
			rem.getRules().add(er);
		}
		
		List<Long> rs = qcRandomExtractService.extract(rem);
		
		for(Long id : rs){//抽取结果填入待考核表
			QcChkList qcl = new QcChkList();
			qcl.setChkUseId(Long.parseLong(userId));
			qcl.setObjTyeId(QcChkRul.CHECK_HIS.longValue());
			qcl.setObjId(id.toString());
			qcl.setAssTime(new Date());
			qcl.setChkStaId(QcTemplate.ENABLED);
			qcChkListService.save(qcl);
		}
		StringBuffer sb = new StringBuffer();
		for(ExtractRule er : rem.getRules()){
			String name;
			if(er.getRuleType().equals(QcChkRul.OBJECT_TYPE_USERGROUP)){
				name = er.toString().replace("?", 
						ulUsergroupService.get(er.getRuleTypeId()).getUsergroupName());
			}else{
				name = er.toString().replace("?", 
						appUserService.get(er.getRuleTypeId()).getFullname());
			}
			sb.append(name + "<br>");
		}
		sb.append("抽取结果共得到"+rs.size()+"条.(可能存在重复记录被删除)");
		setJsonString("{success:true, data:'"+ sb +"'}");
		
		return SUCCESS;
	}
	
	private void setName(List<QcChkRul> rs){
		Iterator<QcChkRul> it = rs.iterator();
		while(it.hasNext()){
			QcChkRul qcr = it.next();
			String name = appUserService.get(qcr.getCreateBy()).getFullname();
			qcr.setCreateByName(name);
		}
	}
	
	private void setNameOfDetail(Set<QcChkRulDetail> rs){
		Iterator<QcChkRulDetail> it = rs.iterator();
		while(it.hasNext()){
			QcChkRulDetail qcr = it.next();
			if(qcr.getDetailType().equals(QcChkRul.OBJECT_TYPE_USERGROUP)){
				String name = ulUsergroupService.get(qcr.getObjectId()).getUsergroupName();
				qcr.setName(name);
			}
		}
	}
}
