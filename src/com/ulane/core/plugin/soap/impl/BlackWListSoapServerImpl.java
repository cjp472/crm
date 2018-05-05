package com.ulane.core.plugin.soap.impl;

import java.util.List;

//import javax.jws.WebService;

import org.apache.log4j.Logger;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.ulane.core.plugin.soap.BlackWListSoapServer;
import com.ulane.customer.dao.customer.ConBwListDao;
import com.ulane.customer.model.customer.ConBwList;
import com.ulane.customer.service.customer.ConBwListService;

import flexjson.JSONSerializer;

/**
 * <p>
 * Company: http://www.ulane.cn
 * </p>
 * 
 * @author washingtin
 * @date 12-6-26
 * @version 1.0
 */

//@WebService
public class BlackWListSoapServerImpl implements BlackWListSoapServer{
	Logger logger = Logger.getLogger(BlackWListSoapServerImpl.class);
	
	private ConBwListDao conBwListDao;
	
	private ConBwListService conBwListService;
	
	private ConBwList conBwList;

	public void setConBwList(ConBwList conBwList) {
		this.conBwList = conBwList;
	}

	public ConBwList getConBwList() {
		return conBwList;
	}
	/**
	 * 黑名单列表
	 */
	@Override
	public String blackList(String xmlStr) {
		// TODO Auto-generated method stub
		conBwListDao = (ConBwListDao) AppUtil.getBean("conBwListDao");
		conBwListService = (ConBwListService) AppUtil.getBean("conBwListService");
		
		StringBuffer buff = new StringBuffer();
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_bwTypId_SN_EQ", "1");
//		filter.addFilter("Q_applyId_L_EQ", xmlStr);
		
		List<ConBwList> list = null;
		JSONSerializer jsonSer = new JSONSerializer();
		
		if (xmlStr != null && !xmlStr.equals("")){
			buff.append("{success : true").append(", result : ");
			list = conBwListService.getAllNoRequest(filter);
			
			buff.append(jsonSer.serialize(list));
			logger.debug("json类型转换错误");
		}else
		{
			buff.append("{success : false,msg : ");
			buff.append("参数不能为空,请重新真写!");
			logger.error("参数不能为空,请重新真写!");
		}
		buff.append("}");
		return buff.toString();
	}
	/**
	 * 白名单列表
	 */
	@Override
	public String whiteList(String xmlStr) {
		// TODO Auto-generated method stub
		conBwListDao = (ConBwListDao) AppUtil.getBean("conBwListDao");
		conBwListService = (ConBwListService) AppUtil.getBean("conBwListService");
		
		StringBuffer buff = new StringBuffer();
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_bwTypId_SN_EQ", "2");
		
		List<ConBwList> list = null;
		JSONSerializer jsonSer = new JSONSerializer();
		
		if (xmlStr != null && !xmlStr.equals("")){
			buff.append("{success : true").append(", result : ");
			list = conBwListService.getAllNoRequest(filter);
			
			buff.append(jsonSer.serialize(list));
			logger.debug("json类型转换错误");
		}else
		{
			buff.append("{success : false,msg : ");
			buff.append("参数不能为空,请重新真写!");
			logger.error("参数不能为空,请重新真写!");
		}
		buff.append("}");
		return buff.toString();
	}
	/**
	 * 根据联系方式和号码检验黑名单
	 * @param 158****9572
	 * @return true or false
	 */
	@Override
	public String checkBwByContact(String xmlStr) {
		// TODO Auto-generated method stub
		conBwListDao = (ConBwListDao) AppUtil.getBean("conBwListDao");
		conBwListService = (ConBwListService) AppUtil.getBean("conBwListService");
		ConBwList conList = conBwListService.getConBwByContact(Short.parseShort("1"), xmlStr);
		if (conList!=null){
			return "true";
		}
		else {
			return "false";
		}
	}
	/**
	 * 根据联系方式和号码检验白名单
	 * @param 158****9527
	 * @return ture or false
	 */
	@Override
	public String checkWwByContact(String xmlStr) {
		// TODO Auto-generated method stub
		conBwListDao = (ConBwListDao) AppUtil.getBean("conBwListDao");
		conBwListService = (ConBwListService) AppUtil.getBean("conBwListService");
		ConBwList conList = conBwListService.getConBwByContact(Short.parseShort("2"), xmlStr);
		if (conList!=null){
			return "true";
		}
		else {
			return "false";
		}
	}

}
