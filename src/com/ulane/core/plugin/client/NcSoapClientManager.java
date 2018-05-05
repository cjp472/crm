package com.ulane.core.plugin.client;


import com.ulane.core.plugin.Constants;

import com.ulane.core.plugin.util.*;

/**
 * <p>
 * Title: Demosss.java
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009-2011
 * </p>
 * <p>
 * Company: http://www.ulane.cn
 * </p>
 * 
 * @author yongan.liu
 * @date 2011-8-2
 * @version 1.0
 */
public class NcSoapClientManager {

	/**
	 * <pre>
	 * 已出账单接口
	 * 接口类型：客户端
	 * *************************************************
	 * 传人参数（客户端传入）：List<CusPersonal> ListBean<HasChargeBill>
	 * </pre>
	 * 
	 * @return 0为成功，其他为失败
	 */
	public String getListHasChargeBill(String x){
	    return getList(x,Constants.HAS_CHARGE_BILL_METHOD);
	}

    public String getListRMBCunKuan(String string) {
        // TODO Auto-generated method stub
        return getList(string,Constants.RMBCunKuan_METHOD);
    }

    public String getListRMBDaiKuan(String string) {
        // TODO Auto-generated method stub
        return getList(string,Constants.RMBDaiKuan_METHOD);
    }

    public String getListWBCunKuan(String string) {
        // TODO Auto-generated method stub
        return getList(string,Constants.WBCunKuan_METHOD);
    }

    public String getListWHPaiJia(String string) {
        // TODO Auto-generated method stub
        return getList(string,Constants.WHPaiJia_METHOD);
    }

    public String getListYeWuFeiLv(String string) {
        // TODO Auto-generated method stub
        return getList(string,Constants.YeWuFeiLv_METHOD);
    }

    public String getListHangMingHangHao(String string) {
        // TODO Auto-generated method stub
        return getList(string,Constants.HangMingHangHao_METHOD);
    }

    public String getListJiGou(String string) {
        // TODO Auto-generated method stub
        return getList(string,Constants.JiGou_METHOD);
    }
    
    //增加根据客户号查找电话号方法wangzj
    public String getListPhoneNum(String string) {
    	// TODO Auto-generated method stub
    	return getList(string,Constants.PhoneNum_METHOD);
    }
    //增加根据客户号查找电话号方法wangzj
    public String getListCustomerNo(String string) {
    	// TODO Auto-generated method stub
    	return getList(string,Constants.CustomerNo_METHOD);
    }

    //增加工单接口
    public String getGongDan(String string) {
    	// TODO Auto-generated method stub
    	return getList(string,Constants.GongDan_METHOD);
    }
    
  //增加订单接口
    public String getDingDan(String string) {
    	// TODO Auto-generated method stub
    	return getList(string,Constants.DingDan_METHOD);
    }
    public String getList(String x,String METHOD){
        Object[] objArr = new Object[1];
        objArr[0] = x;
        String HCBStr=new String();
        try {
            HCBStr = WebServiceClientHelper.callService(METHOD, objArr);
            //HCBStr = WebServiceClientHelper.callService(Constants.HAS_CHARGE_BILL_SUURL, Constants.HAS_CHARGE_BILL_METHOD, objArr);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return HCBStr;
    }	
	
//	   public String certificatePort(CusPersonal cusPersonal){
//	        String xmlStr=ncSoapManager.sendVouchers(cusPersonal);
//	        System.out.println("传入参数:"+xmlStr);
//	        Object[] objArr = new Object[1];
//	        objArr[0] = xmlStr;
//	        String str = null;
//	        try {
//	            str = WebServiceClientHelper.callService(Constants.NC_SAVEVOUCHER_METHOD, objArr);
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	        }
//	        return XmlHelps.analyzeReturnXml(str);
//	    }

}
