package com.ulane.core.plugin.soap;

import javax.jws.WebService;

/**
 * 
 * @author washingtin
 * @version 1.0
 * @Date 2012-06-25
 */

@WebService
public interface BlackWListSoapServer {
	/**
	 * 列出所有的黑名单
	 * @param xmlStr
	 */
	public String blackList(String xmlStr);
	/**
	 * 列出所有的白名单
	 * @param xmlStr
	 */
	public String whiteList(String xmlStr);
	/**
	 * 根据电话号码查询是否在黑名单列表
	 */
	public String checkBwByContact(String xmlStr);
	/**
	 * 根据电话号码查询是否在白名单列表
	 */
	public String checkWwByContact(String xmlStr);
}
