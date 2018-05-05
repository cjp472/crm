package com.ulane.core.plugin.soap.impl;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import javax.jws.WebService;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.core.plugin.soap.ConHisSoapServer;
import com.ulane.customer.dao.customer.ConHisDao;
import com.ulane.customer.dao.customer.ConHushouDao;
import com.ulane.customer.dao.customer.ConLanjieDao;
import com.ulane.customer.dao.customer.ConWeichuliDao;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.ConHushou;
import com.ulane.customer.model.customer.ConLanjie;
import com.ulane.customer.model.customer.ConWeichuli;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.service.customer.ConHisService;
import com.ulane.customer.service.customer.ConHushouService;
import com.ulane.customer.service.customer.ConLanjieService;
import com.ulane.customer.service.customer.ConWeichuliService;
import com.ulane.customer.service.customer.CusPersonalService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * <p>
 * Company: http://www.ulane.cn
 * </p>
 * 
 * @author washingtin
 * @date 12-6-13
 * @version 1.0
 */
//@WebService(endpointInterface = "com.ulane.core.plugin.soap.ConHisSoapServer", serviceName = "conHisService")
//@WebService
public class ConHisSoapServerImpl implements ConHisSoapServer {
	Logger logger = Logger.getLogger(ConHisSoapServerImpl.class);
	
	private ConHisService conHisService;
	@SuppressWarnings("unused")
	private ConHisDao conHisDao;
	
	private CusPersonalService cusPersonalService;
	
	private ConHis conHis;

	public ConHis getConHis() {
		return conHis;
	}

	public void setConHis(ConHis conHis) {
		this.conHis = conHis;
	}
	/**
	 * <pre>
	 * 描述：3.1新增接口
	 * 接口类型：服务器端
	 * *******************************************************
	 * 传人参数（客户端传入）：联络历史
	 * <?xml version="1.0" encoding="utf-8"?>
	 * <root>
	 * 	<item>
	 * 		<conHisId></conHisId>
	 * 		<srcTypeId></srcTypeId>
	 * 		<dirId></dirId>
     * 		<contactTypeId></contactTypeId>
     * 		<preContactNum></preContactNum>
     * 		<mainContactNum></mainContactNum>
     * 		<lastContactNum></lastContactNum>
     * 		<staTime></staTime>
     * 		<endTime></endTime>
     * 		<busTypId></busTypId>
     * 		<conResId></conResId>
     * 		<conResRemarks></conResRemarks>
     * 		<content></content>
     * 		<dealStaId></dealStaId>
     * 		<remarks></remarks>
     * 		<ownerId></ownerId>
     * 		<statusId></statusId>
     * 		<userid></userid>
	 * 	</item>
	 * </root>
	 * 
	 * ********************************************************
	 * 传出参数(服务器端返回)：进销存项目传出参数
	 * <?xml version="1.0" encoding="utf-8"?>
	 * <root>
	 *  	<success></success >
	 * 		<msg></msg>
	 * </root>
	 * 
	 * @return
	 */
	
	@Override
	public String list(String xmlStr){
		// TODO Auto-generated method stub
		conHisDao=(ConHisDao) AppUtil.getBean("conHisDao");
        conHisService =(ConHisService)AppUtil.getBean("conHisService");

        JSONSerializer serializer = JsonUtil.getJSONSerializer();
        serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "staTime","endTime" });
        
		HashMap<String,String> param = JsonUtil.json2HashMap(xmlStr);
		//拼装查询参数
		QueryFilter filter = splitQueryParam(param);
		//分页参数
		PagingBean pb = new PagingBean(Integer.parseInt(param.get("start")),Integer.parseInt(param.get("limit")));
		filter.setPagingBean(pb);
		
		filter.addSorted("conHisId", "DESC");
        
		List<ConHis> list = conHisService.getAllNoRequest(filter);
		
		StringBuffer buff = new StringBuffer();
		if (xmlStr != null && !xmlStr.equals("")){
			buff.append("{success : true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(", result : ");
			buff.append(serializer.serialize(list));
			logger.debug("gson类型转换错误");
		}else
		{
			buff.append("{success : false,msg : ");
			buff.append("参数不能为空,请重新真写!");
		}
		buff.append("}");
		return buff.toString();
	}
	private QueryFilter splitQueryParam(HashMap<String,String> param) {
		QueryFilter filter=new QueryFilter();
		//客户内码
		if (param.containsKey("Q_customer.customerId_L_EQ")){
			String customerId = param.get("Q_customer.customerId_L_EQ");
			if(StringUtils.isNotBlank(customerId)) {
				filter.addFilter("Q_customer.customerId_L_EQ", customerId);
			}
		}
		//服务内码
		if (param.containsKey("serviceId")){
			String serviceId = param.get("serviceId");
			if(StringUtils.isNotBlank(serviceId)) {
				filter.addFilter("Q_serviceId_L_EQ", serviceId);
			}
		}
		
		//搜索框查询参数
		if(param.containsKey("startTime")) {
			String startTime = param.get("startTime");
			if(StringUtils.isNotBlank(startTime)) {
				filter.addFilter("Q_staTime_D_GT", startTime);
			}
		}
		if(param.containsKey("endTime")) {
			String endTime = param.get("endTime");
			if(StringUtils.isNotBlank(endTime)) {
				filter.addFilter("Q_staTime_D_LT", endTime);
			}
		}
		if(param.containsKey("inChargeMan")) {
			String inChargeMan = param.get("inChargeMan");
			if(StringUtils.isNotBlank(inChargeMan)) {
				filter.addFilter("Q_owner.fullname_S_LK", StringUtils.trim(inChargeMan));
			}
		}
		if(param.containsKey("conResId")) {
			String conResId = param.get("conResId");
			if(StringUtils.isNotBlank(conResId)) {
				filter.addFilter("Q_conResId_SN_EQ", conResId);
			}
		}
		if(param.containsKey("dirId")) {
			String dirId = param.get("dirId");
			if(StringUtils.isNotBlank(dirId)) {
				filter.addFilter("Q_dirId_SN_EQ", dirId);
			}
		}
		return filter;
	}
	//添加联络历史
	@Override
	public String createConHis(String xmlStr) {
		// TODO Auto-generated method stub
		logger.debug("come in ... ConHisSoapServerImpl.class createConHis() is Param @ string-xmlStr ==>"+xmlStr);
		Gson gson = new Gson();
		conHis = gson.fromJson(xmlStr, ConHis.class);
		conHisDao=(ConHisDao) AppUtil.getBean("conHisDao");
        conHisService =(ConHisService)AppUtil.getBean("conHisService");
        cusPersonalService = (CusPersonalService) AppUtil.getBean("cusPersonalService");
        
		StringBuffer buff = new StringBuffer();
		conHis.setStaTime(new Date());
		if (conHis.getConHisId() == null || conHis.getConHisId().equals("")) {
			if (conHis.getCustomer() != null){
				String cusNo = conHis.getCustomer().getCustomerNo();
				if(cusNo!=null && !cusNo.equals("")){
					CusPersonal cusPersonal = cusPersonalService.findByCustomerNo(cusNo);
					conHis.setCustomer(cusPersonal);
				}
			}
			
			conHis = conHisService.save(conHis);
		} else {
			ConHis orgConHis = conHisService.get(conHis.getConHisId());
			try {
				BeanUtil.copyNotNullProperties(orgConHis, conHis);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		if(conHis!=null){
            if(conHis.getConHisId()!=null){
                buff.append("{success:true,'conHisId':" + conHis.getConHisId() + ",'msg':'操作成功!'}");
            }else{
                buff.append("{success: false,'msg': '创建联络历史失败，请联系管理员！'}");
            }
        }      
		return buff.toString();
	}
	//添加损呼请求（放弃的请求）
	@Override
	public String createConHuXun(String xmlStr) {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		ConHushou conHuXun = gson.fromJson(xmlStr, ConHushou.class);
		
		@SuppressWarnings("unused")
		ConHushouDao conHuXunDao=(ConHushouDao) AppUtil.getBean("conHushouDao");
        ConHushouService conHuXunService =(ConHushouService)AppUtil.getBean("conHushouService");
        
		StringBuffer buff = new StringBuffer();
		if (conHuXun.getConId() == null || conHuXun.getConId().equals("")){
			conHuXun = conHuXunService.save(conHuXun);
		}
		else 
		{
			ConHushou orgConHuxun=conHuXunService.get(conHuXun.getConId());
			try{
				BeanUtil.copyNotNullProperties(orgConHuxun, conHuXun);
				conHuXun = conHuXunService.save(orgConHuxun);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		if(conHuXun!=null){
            
            if(conHuXun.getConId()!=null){
                buff.append("更新联系历史成功");
            }else{
                buff.append("更新联系历史失败");
            }
        }      
		return "success";
	}
	//添加拦截记录
	@Override
	public String createConLanJie(String xmlStr) {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		ConLanjie conLanjie = gson.fromJson(xmlStr, ConLanjie.class);
		
		@SuppressWarnings("unused")
		ConLanjieDao conLanjieDao=(ConLanjieDao) AppUtil.getBean("conLanjieDao");
        ConLanjieService conLanjieService =(ConLanjieService)AppUtil.getBean("conLanjieService");
        
		StringBuffer buff = new StringBuffer();
		if (conLanjie.getConId() == null || conLanjie.getConId().equals("")){
			conLanjie = conLanjieService.save(conLanjie);
		}
		else 
		{
			ConLanjie orgConLanjie=conLanjieService.get(conLanjie.getConId());
			try{
				BeanUtil.copyNotNullProperties(orgConLanjie, conLanjie);
				conLanjie = conLanjieService.save(orgConLanjie);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		if(conLanjie!=null){
            
            if(conLanjie.getConId()!=null){
                buff.append("");
            }else{
                buff.append("");
            }
        }      
		return "success";
	}
	//添加未处理的请求
	@Override
	public String createConWeiChuLi(String xmlStr) {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		ConWeichuli conWeichuli = gson.fromJson(xmlStr, ConWeichuli.class);
		
		@SuppressWarnings("unused")
		ConWeichuliDao conWeichuliDao=(ConWeichuliDao) AppUtil.getBean("conWeichuliDao");
        ConWeichuliService conWeichuliService =(ConWeichuliService)AppUtil.getBean("conWeichuliService");
        
		StringBuffer buff = new StringBuffer();
		if (conWeichuli.getConId() == null || conWeichuli.getConId().equals("")){
			conWeichuli = conWeichuliService.save(conWeichuli);
		}
		else 
		{
			ConWeichuli orgConWeichuli=conWeichuliService.get(conWeichuli.getConId());
			try{
				BeanUtil.copyNotNullProperties(orgConWeichuli, conWeichuli);
				conWeichuli = conWeichuliService.save(orgConWeichuli);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		if(conWeichuli!=null){
            
            if(conWeichuli.getConId()!=null){
                buff.append("");
            }else{
                buff.append("");
            }
        }      
		return "success";
	}
	//更新联络历史
	@Override
	public String updateConHis(String xmlStr) {
		logger.debug("进入ConHisSoapServerImpl类中进行updateConHis(String xmlStr) @Param[xmlStr]-->:" + xmlStr);
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		//gson.toJson("");
		conHis = gson.fromJson(xmlStr, ConHis.class);
		conHisDao=(ConHisDao) AppUtil.getBean("conHisDao");
        conHisService =(ConHisService)AppUtil.getBean("conHisService");
        
		StringBuffer buff = new StringBuffer();
		conHis.setEndTime(new Date());
		logger.debug("存储交易中的结束时间：" + conHis.getEndTime().toString());
		ConHis orgConHis=conHisService.get(conHis.getConHisId());
		try{
			BeanUtil.copyNotNullProperties(orgConHis, conHis);
			orgConHis.setEndTime(new Date());
			conHis = conHisService.save(orgConHis);
			buff.append("{success: true}");
		}catch(Exception ex){
			logger.error(ex.getMessage());
			buff.append("{success: false,'msg': '更新联络历史失败，请联系管理员！'}");
		}
		
		return buff.toString();
	}

	@Override
	public String queryById(String xmlStr) {
		// TODO Auto-generated method stub
		conHisDao=(ConHisDao) AppUtil.getBean("conHisDao");
        conHisService =(ConHisService)AppUtil.getBean("conHisService");
        Gson gson = new Gson();
        StringBuffer buff = new StringBuffer();
        ConHis conHis = conHisService.get(Long.parseLong(xmlStr));
        if (conHis != null){
        	buff.append(gson.toJson(conHis));
        }else{
        	logger.error("传来的id没有对应的联络记录，请联系管理员！对应的id=" + xmlStr);
        	buff.append("[]");
        }
        
		return buff.toString();
	}

	@Override
	public String queryByMultId(String xmlStr) {
		// TODO Auto-generated method stub
		String[] ids = xmlStr.split(",");
		conHisDao=(ConHisDao) AppUtil.getBean("conHisDao");
        conHisService =(ConHisService)AppUtil.getBean("conHisService");
        List<ConHis> list = new ArrayList<ConHis>();
        Type type = new TypeToken<List<ConHis>>() {}.getType();
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();;
        StringBuffer buff = new StringBuffer();
        for (int i=0; i<ids.length; i++)
        {
        	if (!ids[i].equals("") && ids[i] != null)
        	{
        		ConHis conhis = conHisService.get(Long.parseLong(ids[i]));
            	if (conhis != null){
            		list.add(conhis);
            	}else {
            		logger.error("传来的id无对应的联系记录，请联系管理员！id=" + ids[i]);
            	}
        	}
        }
        if (list != null)
        {
        	buff.append(gson.toJson(list, type));
        }else {
        	logger.error("得到的联络记录为空，请联系管理员！");
        }
        
		return buff.toString();
	}
	
}
