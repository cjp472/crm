package com.ulane.core.plugin.service;


import java.text.SimpleDateFormat;

import javax.annotation.Resource;


import com.htsoft.oa.dao.system.AppUserDao;
import com.ulane.customer.model.customer.CusPersonal;

/**
 * <p>Title: Demosss.java</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2009-2011</p>
 * <p>Company: http://www.lasun.com.cn </p>
 * @author yongan.liu
 * @date 2011-8-2
 * @version 1.0
 */
public class NcSoapObjectManager{

	

	@Resource
	private AppUserDao appUserDao;

	/** 将个人客户对象转换为接口定义的XML格式
	 * @author yuying 2011-8-10     
	 * @param CusPersonal
	 * @return
	 */
	public String sendVouchers(CusPersonal cusPersonal){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sb=new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<ufinterface account=\"1\" billtype=\"gl\" filename=\"\" isexchange=\"Y\" proc=\"\" receiver=\"\" replace=\"Y\" roottag=\"\" sender=\"\" subbilltype=\"\">");
			if(cusPersonal!=null){
				sb.append("<cusPersonal>");
    				//用户内码
    				sb.append("<cusPersonal_id>");
    				sb.append(cusPersonal.getCustomerId());				
    				sb.append("</cusPersonal_id>");
    				//用户编码customerNo
    				sb.append("<cusPersonal_no>");
                    sb.append(cusPersonal.getCustomerNo());             
                    sb.append("</cusPersonal_no>");
                    //业务编码
                    sb.append("<busiCode>");
                    sb.append(cusPersonal.getBusiCode());             
                    sb.append("</busiCode>");
                    //客户类别
                    sb.append("<cusCatId>");
                    sb.append(cusPersonal.getCusCatId());             
                    sb.append("</cusCatId>");
                    //中文名称
                    sb.append("<nameCn>");
                    sb.append(cusPersonal.getNameCn());             
                    sb.append("</nameCn>");
                    //英文名称
                    sb.append("<nameEn>");
                    sb.append(cusPersonal.getNameEn());             
                    sb.append("</nameEn>");
                    //性别    
                    sb.append("<gender>");
                    sb.append(cusPersonal.getGender());             
                    sb.append("</gender>");
                    //证件类型
                    sb.append("<credTypId>");
                    sb.append(cusPersonal.getCredTypId());             
                    sb.append("</credTypId>");
                    //证件号码
                    sb.append("<nameEn>");
                    sb.append(cusPersonal.getCredNum());             
                    sb.append("</nameEn>");

                sb.append("</cusPersonal>");
			}
			sb.append("</ufinterface>");
		return sb.toString();
	}
}
