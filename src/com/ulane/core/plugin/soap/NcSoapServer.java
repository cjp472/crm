package com.ulane.core.plugin.soap;

import javax.jws.WebService;

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
@WebService
public interface NcSoapServer {

/**
 * 测试已出账单接口用，正式发布时请删除
 * @param xmlStr
 * @return
 */
    public String hasChargeBill(String xmlStr);
    public String rMBCunKuan(String xmlStr);
    public String rMBDaiKuan(String xmlStr);
    public String wBCunKuan(String xmlStr);
    public String wHPaiJia(String xmlStr);
    public String yeWuFeiLv(String xmlStr);
    public String hangMingHangHao(String xmlStr);
    public String jiGou(String xmlStr);
	/**
	 * <pre>
	 * 描述：3.4.调拨要货单传递接口
	 * 接口类型：服务器端
	 * *******************************************************
	 * 传人参数（客户端传入）：要货调拨单头信息
	 * <?xml version="1.0" encoding="utf-8"?>
	 * <root>
	 * 		<item>
	 * 			<ALLOCATION_APPLY_HEADER_NUM></ ALLOCATION_APPLY_HEADER_NUM>
	 * 			<ORDER_HEADER_NUM></ ORDER_HEADER_NUM>
	 * 			< ALLOCATION_BY></ALLOCATION_BY >
	 * 			< ALLOCATION_DEPT></ALLOCATION_DEPT >
	 * 			<MADE_BY></ MADE_BY>
	 * 			<CREATE_DATE></ CREATE_DATE>
	 * 			<COMMENTS></ COMMENTS>
	 * 			<items>
	 * 				<item>
	 * 					<GOODS_NUM></GOODS_NUM>
	 * 					< SHORT_NAME></SHORT_NAME>
	 * 					<CONCREATE_CODE></ CONCREATE_CODE>
	 * 					<QUANTITY></ QUANTITY>
	 * 					<ORDER_PRICE></ ORDER_PRICE>
	 * 					<INFACT_QUANTITY></ INFACT_QUANTITY>
	 * 					<IS_GIFT></ IS_GIFT>
	 * 				</item>
	 * 			</items>
	 * 		</item>
	 * </root>
	 * 
	 * ********************************************************
	 * 传出参数(服务器端返回)：进销存项目传出参数
	 * <?xml version="1.0" encoding="utf-8"?>
	 * <root>
	 * 		<code></ code >
	 * 		<message></message>
	 * </root>
	 * </pre>
	 * 
	 * @return
	 */
	public String allocationApprovedBack(String xmlStr);
	
	
	
	
}
