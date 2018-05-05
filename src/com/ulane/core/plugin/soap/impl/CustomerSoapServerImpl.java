package com.ulane.core.plugin.soap.impl;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

//import javax.jws.WebService;

import net.sf.json.JSONArray;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.oa.model.customer.CusLinkman;
import com.htsoft.oa.service.customer.CusLinkmanService;
import com.ulane.core.plugin.soap.CustomerSoapServer;
import com.ulane.customer.dao.customer.CusContactDao;
import com.ulane.customer.dao.customer.CusHisDao;
import com.ulane.customer.dao.customer.CusPersonalDao;
import com.ulane.customer.model.customer.CusContact;
import com.ulane.customer.model.customer.CusDelivery;
import com.ulane.customer.model.customer.CusHis;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.service.customer.CusContactService;
import com.ulane.customer.service.customer.CusDeliveryService;
import com.ulane.customer.service.customer.CusHisService;
import com.ulane.customer.service.customer.CusPersonalService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

//@WebService(endpointInterface = "com.ulane.core.plugin.soap.CustomerSoapServer", serviceName = "cusUserService")
//@WebService
public class CustomerSoapServerImpl implements CustomerSoapServer{
	Logger logger = Logger.getLogger(CustomerSoapServerImpl.class);
	
	@SuppressWarnings("unused")
	private CusPersonalDao cusPersonalDao;
	
	private CusPersonalService cusPersonalService;
	
	private CusContactService cusContactService;
	
	private CusLinkmanService cusLinkmanService;
	
	private CusDeliveryService cusDeliveryService;
	
	private CusPersonal cusPersonal;

	@SuppressWarnings("unused")
	private CusHisDao cusHisDao;
	
	private CusHisService cusHisService;
	
	private CusHis cusHis;

	public CusPersonal getCusPersonal() {
		return cusPersonal;
	}

	public void setCusPersonal(CusPersonal cusPersonal) {
		this.cusPersonal = cusPersonal;
	}
	
	public CusHis getCusHis() {
		return cusHis;
	}

	public void setCusHis(CusHis cusHis) {
		this.cusHis = cusHis;
	}

	/**
	 * 创建单个客户
	 * @param json = {'birthday':'2012-02-01 9:00:00','class':'com.ulane.customer.model.customer.CusPersonal','credNum':'412778172387238871','credTypId':1,'customerNo':'PER0101118111','gender':'1','nameCn':'郭沈厅'}
	 * @return success : true || success : false
	 */
	@Override
	public String addSingleCustomer(String xmlStr) {
		// TODO Auto-generated method stub
		CusPersonal cuspersonal = null;
		Gson gson = new Gson();
		String json = xmlStr.split("}")[0];
		json = json + ",'isDelete':0" + ",'creDat':'" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + "','hasChecked':1,'creUseId':1,'staId':1}";
		
		cusPersonalDao = (CusPersonalDao) AppUtil.getBean("cusPersonalDao");
		cusPersonalService = (CusPersonalService) AppUtil.getBean("cusPersonalService");
		
		CusPersonal cusPerson = gson.fromJson(json, CusPersonal.class);
		StringBuffer buff = new StringBuffer();
		CusPersonal cusper = cusPersonalService.findByCustomerNo(cusPerson.getCustomerNo());
		try {
			if(cusper==null){
				cuspersonal = cusPersonalService.save(cusPerson);
			} else {
				BeanUtil.copyNotNullProperties(cusper, cusPerson);
				cuspersonal = cusPersonalService.save(cusper);
			}
		} catch (Exception e) {
			logger.debug("添加出错");
			buff.append("'添加客户出错，请联系管理员！'");
		}
		if (cuspersonal.getCustomerId() != null){
			buff.append(cuspersonal.getCustomerId());
		}
		
		return buff.toString();
	}
	/**
	 * 创建多个客户
	 * @param json
	 * @return success : true || success : false
	 */
	@Override
	public String addMultiCustomer(String xmlStr) {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		Type type = new TypeToken<List<CusPersonal>>() {}.getType();
		cusPersonalDao = (CusPersonalDao) AppUtil.getBean("cusPersonalDao");
		cusPersonalService = (CusPersonalService) AppUtil.getBean("cusPersonalService");
		cusContactService = (CusContactService) AppUtil.getBean("cusContactService");
		cusLinkmanService = (CusLinkmanService) AppUtil.getBean("cusLinkmanService");
		cusDeliveryService = (CusDeliveryService) AppUtil.getBean("cusDeliveryService");

		StringBuffer buff = new StringBuffer("data:[");

		List<CusPersonal> list = gson.fromJson(xmlStr, type);
		for (int i = 0; i < list.size(); i++) {
			if(i>0){
				buff.append(",");
			}
			CusPersonal cusPerson = list.get(i);
			
			CusPersonal cusper = cusPersonalService.findByCustomerNo(cusPerson.getCustomerNo());
			try {
				if(cusper==null){
					cusPersonal = cusPersonalService.save(cusPerson);
				} else {
					BeanUtil.copyNotNullProperties(cusper, cusPerson);
					cusPersonal = cusPersonalService.save(cusper);
				}
				
				//获取联系方式的set，进行保存
				Set<CusContact> contactSet = cusPerson.getCus_contact();
				if(contactSet!=null){
					for(Iterator it = contactSet.iterator(); it.hasNext();){
						CusContact cusCon = (CusContact)it.next();
						cusCon.setCustomerId(cusPersonal.getCustomerId());
						cusCon.setStatusId(CusContact.FLAG_VALID);
						cusContactService.save(cusCon);
					}
				}
				
				//获取联系人的set，进行保存
				Set<CusLinkman> linkmanSet = cusPerson.getCus_linkman();
				if(linkmanSet!=null){
					for(Iterator it = linkmanSet.iterator(); it.hasNext();){
						CusLinkman cusLink = (CusLinkman)it.next();
						cusLink.setCustomerId(cusPersonal.getCustomerId());
						cusLink.setStaId(CusLinkman.FLAG_VALID);
						cusLink.setCreDat(new Date());
						cusLink.setCreUseId(1L);
						cusLinkmanService.save(cusLink);
					}
				}
				
				//获取配送地址的set，进行保存
				Set<CusDelivery> deliverySet = cusPerson.getCus_delivery();
				if(deliverySet!=null){
					for(Iterator it = deliverySet.iterator(); it.hasNext();){
						CusDelivery cusDel = (CusDelivery)it.next();
						cusDel.setCreDat(new Date());
						cusDeliveryService.save(cusDel);
					}
				}
				
				buff.append("{success:true,'customerNo':'"+cusPerson.getCustomerNo()+"',msg:'操作成功!'}");

			} catch (Exception e) {
				logger.error(e.getMessage());
				e.printStackTrace();
				buff.append("{success:false,'customerNo':'"+cusPerson.getCustomerNo()+"',msg:'操作第"+(i+1)+"条数据失败,请联系管理员!'}");
			}
//			if (i == list.size() - 1) {
//				buff.append("success:true,msg:'操作成功!'");
//			}
		}
		buff.append("]");
		return buff.toString();
	}
	
	/**
	 * 此处xmlStr代表手机号码(callinno)
	 */
	@Override
	public String checkByCallNo(String xmlStr) {
		// TODO Auto-generated method stub
		cusPersonalDao = (CusPersonalDao) AppUtil.getBean("cusPersonalDao");
		cusPersonalService = (CusPersonalService) AppUtil.getBean("cusPersonalService");
		
		StringBuffer msg = new StringBuffer();
		List<CusPersonal> curPersonalList = cusPersonalService.checkNo(xmlStr);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		if(curPersonalList.size()==0){
			msg.append("{success:true ,'customerId': null");
		}else{
			if(curPersonalList.size()==1){
				msg.append("{success:true,'customerId':");
				msg.append(curPersonalList.get(0).getCustomerId());
			}else if(curPersonalList.size()>1){
				msg.append("{success:true,'totals':");
				msg.append(curPersonalList.size());
				msg.append(",'result':");
				msg.append(ser.serialize(curPersonalList));
			}
		}
		msg.append("}");
		
		return msg.toString();
	}
	
	/**
	 * 此处xmlStr代表身份证号和电话号码(cardNo&&callinno)
	 * 
	 */
	@Override
	public String checkByCardAndCallNo(String xmlStr) {
		// TODO Auto-generated method stub
		cusPersonalDao = (CusPersonalDao) AppUtil.getBean("cusPersonalDao");
		cusPersonalService = (CusPersonalService) AppUtil.getBean("cusPersonalService");
		String[] objs = xmlStr.split(",");
		StringBuffer msg = new StringBuffer();
		List<CusPersonal> curPersonalList = cusPersonalService.checkByCredAndNo(objs[0],objs[1]);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		if(curPersonalList.size()==0){
			msg.append("{success:true ,'customerId': null");
		}else{
			if(curPersonalList.size()==1){
				msg.append("{success:true,'customerId':");
				msg.append(curPersonalList.get(0).getCustomerId());
			}else if(curPersonalList.size()>1){
				msg.append("{success:true,'totals':");
				msg.append(curPersonalList.size());
				msg.append(",'result':");
				msg.append(ser.serialize(curPersonalList));
			}
		}
		msg.append("}");
		return msg.toString();
	}
	
	/**
	 * 此处xmlStr代表身份证号(cardNo)
	 */
	@Override
	public String checkByCardNo(String xmlStr) {
		// TODO Auto-generated method stub
		cusPersonalDao = (CusPersonalDao) AppUtil.getBean("cusPersonalDao");
		cusPersonalService = (CusPersonalService) AppUtil.getBean("cusPersonalService");
		StringBuffer msg = new StringBuffer();
		List<CusPersonal> curPersonalList = cusPersonalService.checkCredNum(xmlStr);
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		if(curPersonalList.size()==0){
			msg.append("{success:true ,'customerId': null");
		}else{
			if(curPersonalList.size()==1){
				msg.append("{success:true,'customerId':");
				msg.append(curPersonalList.get(0).getCustomerId());
			}else if(curPersonalList.size()>1){
				msg.append("{success:true,'totals':");
				msg.append(curPersonalList.size());
				msg.append(",'result':");
				msg.append(ser.serialize(curPersonalList));
			}
		}
		msg.append("}");
		return msg.toString();
	}
	/**
	 * 根据客户id查询客户
	 * @param xmlStr=customerId
	 * @return success : true,'customerId':customerId || success : false,'customerId':null
	 */
	@Override
	public String queryByCustomerId(String xmlStr) {
		// TODO Auto-generated method stub
//		Gson gson = new Gson();
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		cusPersonalDao = (CusPersonalDao) AppUtil.getBean("cusPersonalDao");
		cusPersonalService = (CusPersonalService) AppUtil.getBean("cusPersonalService");
		StringBuffer msg = new StringBuffer();
		CusPersonal curPersonal = cusPersonalService.get(Long.parseLong(xmlStr));
		
		if (curPersonal != null)
		{
			if (curPersonal.getCustomerId()!=null && !curPersonal.getCustomerId().equals("")){
				
				msg.append(ser.serialize(curPersonal));
			}
		}else{
			msg.append(ser.serialize(curPersonal));
		}
		
		return msg.toString();
	}

	@Override
	public String queryContactByCusId(String xmlStr) {
		// TODO Auto-generated method stub
		@SuppressWarnings("unused")
		CusContactDao cctdao = (CusContactDao) AppUtil.getBean("cusContactDao");
		CusContactService ccs = (CusContactService) AppUtil.getBean("cusContactService");
		StringBuffer buff = new StringBuffer();
//		Gson gson = new Gson();
//		Type type = new TypeToken<List<CusContact>>(){}.getType();
		JSONSerializer serializer = new JSONSerializer();
		//把日期格式化
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "createTime"});
		
		List<CusContact> list = ccs.queryByCusId(Long.parseLong(xmlStr));
		//去掉json里的customer
		buff.append(serializer.exclude(new String[]{"customer"}).serialize(list));
		
		buff.append(serializer.serialize(list));
		
//		buff.append(gson.toJson(list,type));
		
		return buff.toString();
	}

	/**
	 * 添加操作历史记录wangzhongjin
	 * @param json
	 * @return success : true || success : false
	 */
	@Override
	public String addCusHis(String xmlStr) {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		cusHisDao = (CusHisDao) AppUtil.getBean("cusHisDao");
		cusHisService = (CusHisService) AppUtil.getBean("cusHisService");
		cusHis = gson.fromJson(xmlStr, CusHis.class);
		StringBuffer buff = new StringBuffer();
		cusHis.setRowDat(new Date());
		CusHis his = cusHisService.save(cusHis);
		if(his.getOpeHisId()!=null){
			buff.append("success:true,'opeHisId':"+his.getOpeHisId());
		} else {
			buff.append("error:'添加操作记录出错，请联系管理员！'");
		}
		return buff.toString();
	}

	@Override
	public String addCusContact(String xmlStr) {
		// TODO Auto-generated method stub
		Gson gson = new Gson();
		String arr[] = xmlStr.split("=");
		String param = "{" + arr[1].toString();
		System.out.println();
		CusContactDao cusContactDao = (CusContactDao)AppUtil.getBean("cusContactDao");
		CusContactService cusContactService = (CusContactService)AppUtil.getBean("cusContactService");
		CusContact cusContact = gson.fromJson(param, CusContact.class);
		
		cusContact.setCustomerId(Long.parseLong((arr[0].split(":")[1]).toString()));
		cusContact.setIsChecked(Short.parseShort("1"));
		cusContact.setIsDefault(Short.parseShort("1"));
		cusContact.setCreateTime(new Date());
		CusContact contact = cusContactService.save(cusContact);
		StringBuffer buff = new StringBuffer();
		if (contact != null){
			buff.append("contactId:" + contact.getContactId());
		}else {
			buff.append("contactId:null");
		}
		
		return buff.toString();
	}

}
