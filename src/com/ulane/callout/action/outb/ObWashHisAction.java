package com.ulane.callout.action.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.model.outb.ObWashHis;
import com.ulane.callout.service.outb.ObCallbatchService;
import com.ulane.callout.service.outb.ObCalllistService;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.callout.service.outb.ObProjectService;
import com.ulane.callout.service.outb.ObWashHisService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObWashHisAction extends BaseAction{
	@Resource
	private ObWashHisService obWashHisService;
	@Resource
	private ObProjectService obProjectService;
	@Resource
	private ObComService obComService;
	@Resource
	private ObCalllistService obCalllistService;
	@Resource
	private ObCallbatchService obCallbatchService;
	@Resource
	private AppUserService appUserService;

	private ObWashHis obWashHis;
	
	private Long washHisId;

	public ObWashHis getObWashHis() {
		return obWashHis;
	}
	public void setObWashHis(ObWashHis obWashHis) {
		this.obWashHis = obWashHis;
	}
	public Long getWashHisId() {
		return washHisId;
	}
	public void setWashHisId(Long washHisId) {
		this.washHisId = washHisId;
	}
	
	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		String startTime = getRequest().getParameter("startTime");
		String endTime = getRequest().getParameter("endTime");
		String clearnTyp = getRequest().getParameter("clearnTyp");
		filter.addFilter("Q_clearnDat_D_GE", startTime);
		filter.addFilter("Q_clearnDat_D_LE", endTime);
		filter.addFilter("Q_clearnTyp_SN_EQ", clearnTyp);
		filter.addSorted("clearnDat", QueryFilter.ORDER_DESC);
		
		List<ObWashHis> list= obWashHisService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		
		for(ObWashHis obWashHis :list) {
			if(obWashHis.getCalllistId()!=null) {
				obWashHis.setCalllistName(obCalllistService.get(obWashHis.getCalllistId()).getCalllistNam());
			}
			if(obWashHis.getCallbatchId()!=null) {
				ObCallbatch obCallbatch = obCallbatchService.get(obWashHis.getCallbatchId());
				if(null!=obCallbatch) {
					obWashHis.setCallbatchName(obCallbatch.getCallbatchNam());
					obWashHis.setIsCallbatchEnable(obCallbatch.getCallbatchStaId());
				}
			}
			if(obWashHis.getProjId()!=null) {
				obWashHis.setProjName(obProjectService.get(obWashHis.getProjId()).getProjNam());			
			}
			if(obWashHis.getComId()!=null) {
				obWashHis.setComName(obComService.get(obWashHis.getComId()).getObComNam());
			}
			if(obWashHis.getClearnOpt()!=null) {
				obWashHis.setClearnOptName(appUserService.get(obWashHis.getClearnOpt()).getFullname());
			}
		}
		buff.append(jsonSer.serialize(list));
		buff.append("}");
		jsonString=buff.toString();
		System.out.println(jsonString);
		return SUCCESS;
	}
	
	/**
	 * 清洗数据查询
	 */
	public String queryWashCus() {
		String projId = getRequest().getParameter("projId");
		String comId = getRequest().getParameter("comId");
		String calllistId = getRequest().getParameter("calllistId");
		String callbatchId = getRequest().getParameter("callbatchId");
		String clearnTyp = getRequest().getParameter("clearnTyp");
		String washIFGrid = getRequest().getParameter("washIFGrid");
		String clearSoundTyp = getRequest().getParameter("clearSoundTyp");

		
		Map<String,String> param = new HashMap<String,String>();
		param.put("projId", projId);
		param.put("comId", comId);
		param.put("calllistId", calllistId);
		param.put("callbatchId", callbatchId);
		param.put("clearnTyp", clearnTyp);
		param.put("washIFGrid", washIFGrid);
		param.put("clearSoundTyp", clearSoundTyp);

		//搜索框 查询
		String nameCnLK = getRequest().getParameter("Q_nameCn_S_LK");//姓名
		String genderEQ = getRequest().getParameter("Q_gender_SN_EQ");//性别
		if(StringUtils.isNotBlank(nameCnLK) || StringUtils.isNotBlank(genderEQ)) {
			QueryFilter filter = new QueryFilter(getRequest());
			PagingBean paging = filter.getPagingBean();
			if(null!=paging) {//将分页产生传入
				Integer start = paging.getStart();
				Integer limit = paging.getPageSize();
				param.put("start", start.toString());
				param.put("limit", limit.toString());
			}
			if(StringUtils.isNotBlank(nameCnLK)) {
				param.put("nameCnLK", nameCnLK);//姓名
			}
			if(StringUtils.isNotBlank(genderEQ)) {
				param.put("genderEQ", genderEQ);//性别
			}
		}
				
		String result = obWashHisService.queryWashCus(param);
		System.out.println(result);
		setJsonString(result);
		return SUCCESS;
	}
	
	/**
	 * 确认清洗
	 */
	public String confirmWashImpTmp() {
		String projId = getRequest().getParameter("projId");
		String comId = getRequest().getParameter("comId");
		String calllistId = getRequest().getParameter("calllistId");
		String callbatchId = getRequest().getParameter("callbatchId");
		String clearnTyp = getRequest().getParameter("clearnTyp");
		String washIFGrid = getRequest().getParameter("washIFGrid");
		String clearSoundTyp = getRequest().getParameter("clearSoundTyp");
		String clearnRual = getRequest().getParameter("clearnRual");
		
		Map<String,String> param = new HashMap<String,String>();
		param.put("projId", projId);
		param.put("comId", comId);
		param.put("calllistId", calllistId);
		param.put("callbatchId", callbatchId);
		param.put("clearnTyp", clearnTyp);
		param.put("washIFGrid", washIFGrid);
		param.put("clearSoundTyp", clearSoundTyp);
		param.put("currentUserId", ContextUtil.getCurrentUserId().toString());
		param.put("clearnRual", clearnRual);
		
		//搜索框 查询
		String nameCnLK = getRequest().getParameter("Q_nameCn_S_LK");//姓名
		String genderEQ = getRequest().getParameter("Q_gender_SN_EQ");//性别
		if(StringUtils.isNotBlank(nameCnLK) || StringUtils.isNotBlank(genderEQ)) {
			param.put("nameCnLK", nameCnLK);//姓名
			param.put("genderEQ", genderEQ);//性别
		}
		param.put("flag", "WASH_DATA");//清洗数据标志
		
		//第一步：清洗数据
		String totalCountsAndIDS = obWashHisService.queryWashCus(param);
		if(StringUtils.isBlank(totalCountsAndIDS)) {
			HashMap<String,String> hsmp = new HashMap<String,String>();
			hsmp.put("totalCounts", "0");
			setJsonString(JsonUtil.hsmp2JSON(hsmp));
			return SUCCESS;
		}
		
		HashMap<String,String> hsmpChange = JsonUtil.json2HashMap(totalCountsAndIDS);
		String totalCounts = hsmpChange.get("totalCounts");
		
		HashMap<String,String> hsmp = new HashMap<String,String>();
		if(StringUtils.isNotBlank(totalCounts)) {
			hsmp.put("totalCounts", totalCounts);
		} else {
			hsmp.put("totalCounts", "0");
		}
		setJsonString(JsonUtil.hsmp2JSON(hsmp));
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
				obWashHisService.remove(Long.parseLong(id));
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 根据批次查询项目、活动、名单等基本信息
	 * @return
	 */
	public String getBaseInfo() {
		String callbatchId = getRequest().getParameter("callbatchId");
		String calllistId = getRequest().getParameter("calllistId");
		HashMap<String,String> hsmp = new HashMap<String,String>();
		if(StringUtils.isNotBlank(callbatchId)) {
			hsmp.put("callbatchId", callbatchId);
			String result = obWashHisService.queryBaseInfo(hsmp);
			setJsonString(result);
		} 
		else if(StringUtils.isNotBlank(calllistId)) {
			hsmp.put("calllistId", calllistId);
			String result = obWashHisService.queryBaseInfo(hsmp);
			setJsonString(result);
		}
		
		return SUCCESS;
	}
	
}
