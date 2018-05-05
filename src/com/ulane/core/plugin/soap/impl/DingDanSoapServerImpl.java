package com.ulane.core.plugin.soap.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;

//import javax.jws.WebService;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.htsoft.core.util.AppUtil;
import com.ulane.core.plugin.soap.DingDanSoapServer;
import com.ulane.customer.dao.customer.CusDeliveryDao;
import com.ulane.customer.model.customer.CusDelivery;
import com.ulane.customer.service.customer.CusDeliveryService;
import com.ulane.supply.dao.sales.ScBizOrderSalesDao;
import com.ulane.supply.dao.sales.ScBizSalesDetailDao;
import com.ulane.supply.dao.supply.ScBizOrderFeeDao;
import com.ulane.supply.model.sales.ScBizOrderSales;
import com.ulane.supply.model.sales.ScBizSalesDetail;
import com.ulane.supply.model.supply.ScBizOrderFee;
import com.ulane.supply.service.sales.ScBizOrderSalesService;
import com.ulane.supply.service.sales.ScBizSalesDetailService;
import com.ulane.supply.service.supply.ScBizOrderFeeService;

//@WebService
public class DingDanSoapServerImpl implements DingDanSoapServer{
	Logger logger = Logger.getLogger(DingDanSoapServerImpl.class);//?
	
	//SC_销售业务单 (SC_BIZ_ORDER_SALES)
	private ScBizOrderSales scBizOrderSales;//声明实体类scBizOrderSales对象的变量
	public ScBizOrderSales  getScBizOrderSales(){
		return scBizOrderSales;
	}
	//SC_业务单费用 (SC_BIZ_ORDER_FEE)
	private ScBizOrderFee scBizOrderFee;//声明实体类scBizOrderFee对象的变量
	public ScBizOrderFee  getScBizOrderFee(){
		return scBizOrderFee;
	}
	//SC_销售业务单明细 (SC_BIZ_SALES_DETAIL)
	private ScBizSalesDetail scBizSalesDetail;//声明实体类scBizSalesDetail对象的变量
	public ScBizSalesDetail  getScBizSalesDetail(){
		return scBizSalesDetail;
	}
	//CUS配送地址 (CUS_DELIVERY)
	private CusDelivery cusDelivery;//声明实体类scBizOrderSales对象的变量
	public CusDelivery  getCusDelivery(){
		return cusDelivery;
	}
	
	@Override
	public String addDingDan(String xmlStr) {
		// TODO Auto-generated method stub
//SC_销售业务单
//		String  jsondd ="{'createUserId':'1','createTime':'2012-8-22 14:44:00'}";
//		SC_销售业务单 + SC_业务单费用
//		String  jsondd ="{'createUserId':'1','createTime':'2012-8-22 14:44:00','scBizOrderFees':[{'feeFlag':'1','changedAmount':'1','changedTime':'2012-8-22 17:00:00'},{'feeFlag':'2','changedAmount':'2','changedTime':'2012-8-22 18:00:00'}]}";
//		SC_销售业务单 + SC_业务单费用 +	SC_销售业务单明细
//		String  jsondd ="{'createUserId':'1','createTime':'2012-8-22 14:44:00','scBizOrderFees':[{'feeFlag':'1','changedAmount':'1','changedTime':'2012-8-22 17:00:00'},{'feeFlag':'2','changedAmount':'2','changedTime':'2012-8-22 18:00:00'}],'scBizSalesDetails':[{'goodsUnitPrice':'110.00'},{'goodsUnitPrice':'111.00'}]}";
//		SC_销售业务单 + SC_业务单费用 +	SC_销售业务单明细 + CUS配送地址
//		String  jsondd ="{'createUserId':'1','createTime':'2012-8-22 15:41:00','scBizOrderFees':[{'feeFlag':'1','changedAmount':'1','changedTime':'2012-8-22 15:41:00'},{'feeFlag':'2','changedAmount':'2','changedTime':'2012-8-22 15:41:00'}],'scBizSalesDetails':[{'goodsUnitPrice':'113.00'},{'goodsUnitPrice':'114.00'}],'cusDelivery':{'creUseId':'1','creDat':'2012-8-22 15:41:06'}}";

		System.out.println(">>>>>KYQ>>>>>>>xmlStr="+xmlStr);//判断xmlStr参数有没有传过来
		
		Gson gson = new Gson();
		
		//SC_销售业务单 (SC_BIZ_ORDER_SALES) 
		scBizOrderSales = gson.fromJson(xmlStr, ScBizOrderSales.class);
		ScBizOrderSalesDao scBizOrderSalesDao = (ScBizOrderSalesDao)AppUtil.getBean("scBizOrderSalesDao");
		ScBizOrderSalesService scBizOrderSalesService = (ScBizOrderSalesService)AppUtil.getBean("scBizOrderSalesService");
		
		//第一步，将业面上的数据以对象的型式取出来
		//SC_业务单费用 (SC_BIZ_ORDER_FEE)
		ScBizOrderFeeDao scBizOrderFeeDao = (ScBizOrderFeeDao)AppUtil.getBean("scBizOrderFeeDao");
 		ScBizOrderFeeService scBizOrderFeeService = (ScBizOrderFeeService)AppUtil.getBean("scBizOrderFeeService");
 		
 		//SC_销售业务单明细 (SC_BIZ_SALES_DETAIL)
		ScBizSalesDetailDao scBizSalesDetailDao = (ScBizSalesDetailDao)AppUtil.getBean("scBizSalesDetailDao");
		ScBizSalesDetailService scBizSalesDetailService = (ScBizSalesDetailService)AppUtil.getBean("scBizSalesDetailService");
		
		//CUS配送地址 (CUS_DELIVERY)
		CusDeliveryDao cusDeliveryDao = (CusDeliveryDao)AppUtil.getBean("cusDeliveryDao");
		CusDeliveryService cusDeliveryService = (CusDeliveryService)AppUtil.getBean("cusDeliveryService");
		//保存 CUS配送地址 (CUS_DELIVERY)
		if(scBizOrderSales.getCusDelivery().getCustomerid() == null){
			cusDeliveryService.save(scBizOrderSales.getCusDelivery());	
		}
		
		StringBuffer buff = new StringBuffer(); //页面输出参数，对结果进行反馈
		//第二步，将对象以集合的形式取出来并保存	
		//保存SC_销售业务单
		if (scBizOrderSales.getBizOrderId() == null || scBizOrderSales.getBizOrderId().equals("")){
			scBizOrderSales = scBizOrderSalesService.save(scBizOrderSales);//对数据进行保存
			
			//保存SC_业务单费用
			java.util.Set<ScBizOrderFee> scBizOrderFees = scBizOrderSales.getScBizOrderFees();
			if(scBizOrderFees != null){
				for(Iterator it = scBizOrderFees.iterator();it.hasNext();){
					ScBizOrderFee bizOrderFee = (ScBizOrderFee)it.next();
					scBizOrderFeeService.save(bizOrderFee);
				}
			}		
			//保存SC_销售业务单明细 
			java.util.Set<ScBizSalesDetail> scBizSalesDetails = scBizOrderSales.getScBizSalesDetails();
			if(scBizSalesDetails != null){
				for(Iterator it = scBizSalesDetails.iterator();it.hasNext();){
					ScBizSalesDetail scBizSalesDetail = (ScBizSalesDetail)it.next();
					scBizSalesDetailService.save(scBizSalesDetail);
				}
			}
			
		}

		if (scBizOrderSales != null){
			buff.append("{success:true,'BizOrderId':");
			buff.append(scBizOrderSales.getBizOrderId() + "}");
		}else {
			buff.append("保存失败");
		}
		
		return buff.toString();
	}
	
	
}
