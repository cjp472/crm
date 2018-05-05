package com.ulane.core.plugin.soap;

import javax.jws.WebService;

/**
 * 
 * @author guost
 * @version 1.0
 * @Date 2012-07-5
 */

@WebService
public interface CustomerSoapServer {
	/**
	 * 根据手机号判断是否有此客户
	 * @param callNo
	 * @return {success:true,'customerId':customerId} || {success : true, 'customerId' : null}
	 */
	public String checkByCallNo(String xmlStr);
	/**
	 * 根据身份证号判断是否有此客户
	 * @param cardNo
	 * @return {success:true,'customerId':customerId} || {success : true, 'customerId' : null}
	 */
	public String checkByCardNo(String xmlStr);
	/**
	 * 根据手机号和身份证号判断是否有此客户
	 * @param cardNo && callInNo
	 * @return {success:true,'customerId':customerId} || {success : true, 'customerId' : null}
	 */
	public String checkByCardAndCallNo(String xmlStr);
	/**
	 * 创建单个客户
	 * @param json
	 * @return success : true || success : false
	 */
	public String addSingleCustomer(String xmlStr);
	/**
	 * 创建多个客户
	 * @param json
	 * @return success : true || success : false
	 */
	public String addMultiCustomer(String xmlStr);
	/**
	 * 根据客户id查询客户
	 * @param customerId
	 * @return {'':'',....} || {'':null}
	 */
	public String queryByCustomerId(String xmlStr);
	/**
	 * 根据客户id查询联系方式
	 * @param customerId
	 * @return {'':'',....}
	 */
	public String queryContactByCusId(String xmlStr);
	/**
	 * 添加操作历史记录
	 * @param json
	 * @return success : true || success : false
	 */
	public String addCusHis(String xmlStr);
	/**
	 * 添加单个联系方式
	 * @param json
	 * @return success : true
	 */
	public String addCusContact(String xmlStr);
}
