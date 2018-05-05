package com.ulane.running.action.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.web.action.BaseAction;

import com.ulane.running.model.qucon.QcTempChapcter;
import com.ulane.running.model.qucon.QcTempTar;
import com.ulane.running.model.qucon.QcTemplate;
import com.ulane.running.service.qucon.QcScoreOptService;
import com.ulane.running.service.qucon.QcTargetService;
import com.ulane.running.service.qucon.QcTempChapcterService;
import com.ulane.running.service.qucon.QcTempTarService;
import com.ulane.running.service.qucon.QcTemplateService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcTempChapcterAction extends BaseAction{
	@Resource
	private QcTempChapcterService qcTempChapcterService;
	@Resource
	private QcTemplateService qcTemplateService;
	@Resource
	private QcTempTarService qcTempTarService;
	@Resource
	private QcTargetService qcTargetService;
	@Resource
	private QcScoreOptService qcScoreOptService;
	
	private QcTempChapcter qcTempChapcter;
	
	private Long tempCatId;

	public Long getTempCatId() {
		return tempCatId;
	}

	public void setTempCatId(Long tempCatId) {
		this.tempCatId = tempCatId;
	}

	public QcTempChapcter getQcTempChapcter() {
		return qcTempChapcter;
	}

	public void setQcTempChapcter(QcTempChapcter qcTempChapcter) {
		this.qcTempChapcter = qcTempChapcter;
	}

	/**
	 * 显示指定模版的章节列表
	 */
	public String list(){
		Long TemplateId = Long.parseLong(getRequest().getParameter("id"));
		QcTemplate tem = qcTemplateService.get(TemplateId);
		StringBuffer buff = new StringBuffer();

		buff.append("[{id:'" + 0 + "',text:'"+tem.getTmpName()+"',expanded:true,children:[");
		List<QcTempChapcter> list = new ArrayList<QcTempChapcter>();
		for(QcTempChapcter tmp : tem.getQcTempChapcters()){
			list.add(tmp);
		}
		removeDeletedChapcter(list);
		for(QcTempChapcter tmp : list){
			buff.append("{id:'" + tmp.getTempCatId() + "',text:'"
					+ tmp.getCatName() + "',leaf:true},");
		}
		if (!list.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}]");
		setJsonString(buff.toString());
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
				qcTempChapcterService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 删除
	 * @return
	 */
	public String del(){
//		Long templateId =Long.parseLong(getRequest().getParameter("templateId"));
		Long id =Long.parseLong(getRequest().getParameter("id"));
		if(id != null ){
			QcTempChapcter temp = qcTempChapcterService.get(id);
			temp.setStaId(QcTemplate.DISABLED);
			Iterator<QcTempTar> it = temp.getQcTempTars().iterator();
			while(it.hasNext()){
				QcTempTar t = it.next();
				t.setStaId(QcTemplate.DISABLED);
			}
			qcTempChapcterService.save(temp);
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		QcTempChapcter qcTempChapcter=qcTempChapcterService.get(tempCatId);
		
		JSONSerializer json = JsonUtil.getJSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.serialize(qcTempChapcter));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcTempChapcter.getTempCatId()==null){
			Long templateId = Long.parseLong(getRequest().getParameter("tmpId"));
			qcTempChapcter.setQcTemplate(qcTemplateService.get(templateId));
			qcTempChapcter.setStaId(QcTemplate.ENABLED);
			qcTempChapcterService.save(qcTempChapcter);
		}else{
			QcTempChapcter orgQcTempChapcter=qcTempChapcterService.get(qcTempChapcter.getTempCatId());
			try{
				BeanUtil.copyNotNullProperties(orgQcTempChapcter, qcTempChapcter);
				qcTempChapcterService.save(orgQcTempChapcter);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	public void removeDeletedChapcter(List<QcTempChapcter> list){
		Iterator<QcTempChapcter> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getStaId().equals(QcTemplate.DISABLED))
				i_list.remove();
		}
	}
	
	public String saveMyQcTarget(){
		String data = getRequest().getParameter("data");
		Gson gson = new Gson();
		QcTempTar[] qtt = (QcTempTar[]) gson.fromJson(data,
				QcTempTar[].class);
		String checked = getRequest().getParameter("checked");
//		TODO 设置评分项详情的选择情况
		Map<String, List<String>> rs = new HashMap<String, List<String>>();
		if(checked.contains("@")){
			rs = format(checked);
		}

		for(QcTempTar tmp : qtt){
			Long chapId = tmp.getTempCatId();
			Long tarId = tmp.getQcTarget().getTarId();
			
			QcTempChapcter qtc = qcTempChapcterService.get(chapId);
			tmp.setQcTemplate(qtc.getQcTemplate());
			tmp.setQcTempChapcter(qtc);
			tmp.setQcTarget(qcTargetService.get(tarId));
			
			if(checked.contains("@")){
				for(String scoreOptId : rs.get(tarId.toString())){
					Long id = Long.parseLong(scoreOptId);
					tmp.getQcScoreOpts().add(qcScoreOptService.get(id));
				}
			}
			tmp.setStaId(QcTemplate.ENABLED);
			qcTempTarService.save(tmp);
		}
		return SUCCESS;
	}
	
	public String delMyTarget(){
		String [] ids = getRequest().getParameterValues("ids");
		if(ids != null){
			for(String id : ids){
				qcTempTarService.remove(Long.parseLong(id));
			}
		}
		return SUCCESS;
	}
	
	public Map<String, List<String>> format(String value){

		String data = value.substring(1, value.length()-1);
		Map<String, List<String>> rs = new HashMap<String, List<String>>();
		
		for(String one : data.split(",")){
			boolean keyExist = false;
			int index_spilt = one.indexOf("@");
			String key = one.substring(index_spilt+1);
			String value_one = one.substring(0, index_spilt);
			System.out.println("key="+key+", value="+value_one);
			
			for(String key_tmp : rs.keySet()){
				if(key_tmp.equals(key)){
					rs.get(key).add(value_one);
					keyExist = true;
					break;
				}
			}
			
			if(!keyExist){
				List<String> values = new ArrayList<String>();
				values.add(value_one);
				rs.put(key, values);
			}
		}
		
		return rs;
	}
}
