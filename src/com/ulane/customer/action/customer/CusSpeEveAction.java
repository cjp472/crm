package com.ulane.customer.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;


import com.ulane.customer.model.customer.CusContact;
import com.ulane.customer.model.customer.CusSpeEve;
import com.ulane.customer.service.customer.CusSpeEveService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CusSpeEveAction extends BaseAction{
	@Resource
	private CusSpeEveService cusSpeEveService;
	private CusSpeEve cusSpeEve;
	
	private Long eveId;

	public Long getEveId() {
		return eveId;
	}

	public void setEveId(Long eveId) {
		this.eveId = eveId;
	}

	public CusSpeEve getCusSpeEve() {
		return cusSpeEve;
	}

	public void setCusSpeEve(CusSpeEve cusSpeEve) {
		this.cusSpeEve = cusSpeEve;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		String customerId = getRequest().getParameter("Q_customer.customerId_L_EQ");
		QueryFilter filter=new QueryFilter(getRequest());
		StringBuffer buff = new StringBuffer();
		List<CusSpeEve> list= cusSpeEveService.getAll(filter);
		if (customerId != null && !customerId.equals("") && !customerId.equals("undefined")) {
//			Type type=new TypeToken<List<CusSpeEve>>(){}.getType();
			buff.append("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			
//			Gson gson=new Gson();
//			buff.append(gson.toJson(list, type));
	        JSONSerializer ser = JsonUtil.getJSONSerializer();
	        buff.append(ser.serialize(list));
			
		}else {
			buff.append("{success:true,'totalCounts':0,result:[]");
		}

		buff.append("}");
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
	public String listEve() {
		String customerId = getRequest().getParameter("Q_customer.customerId_L_EQ");
		QueryFilter filter=new QueryFilter(getRequest());
		PagingBean pagBean = filter.getPagingBean();
		String pagStart = String.valueOf(pagBean.getStart());
		String pageSize = String.valueOf(pagBean.getPageSize());
		
		if(StringUtils.isNotBlank(customerId)) {
			setJsonString(cusSpeEveService.getEveByCusId(customerId, pagStart, pageSize));
		} else {
			setJsonString("{success:true,'totalCounts':0,result:[]}");
		}
		return SUCCESS;
	}
	
	/**
	 * 增加
	 * @return
	 */
	public String add(){
		String eveContent = getRequest().getParameter("eveContent");
		String eveId = getRequest().getParameter("eveId");
		String customerId = getRequest().getParameter("customerId");
		jsonString = "{success:true";
		if (StringUtils.isNotEmpty(eveContent)) {
			Long userId = ContextUtil.getCurrentUser().getUserId();
			if(StringUtils.isNotEmpty(eveId)){
				CusSpeEve cus = cusSpeEveService.get(Long.parseLong(eveId));
				cus.setEveContent(eveContent);
				cus.setUpdDat(new Date());
				cus.setUpdUseId(userId);
				cusSpeEveService.save(cus);
			}else{
				CusSpeEve cus = new CusSpeEve();
				cus.setCustomerid(Long.parseLong(customerId));
				cus.setEveContent(eveContent);
				cus.setCreUseId(userId);
				cus.setCreDat(new Date());
				cus.setStaId(new Short("1"));
				cusSpeEveService.save(cus);
				jsonString +=",eveId:"+cus.getEveId();
			}
		}
		jsonString += "}";
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[] ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				cusSpeEveService.remove(new Long(id));
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
		CusSpeEve cusSpeEve=cusSpeEveService.get(eveId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(cusSpeEve));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(cusSpeEve.getEveId()==null){
			cusSpeEveService.save(cusSpeEve);
		}else{
			CusSpeEve orgCusSpeEve=cusSpeEveService.get(cusSpeEve.getEveId());
			try{
				BeanUtil.copyNotNullProperties(orgCusSpeEve, cusSpeEve);
				cusSpeEveService.save(orgCusSpeEve);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
