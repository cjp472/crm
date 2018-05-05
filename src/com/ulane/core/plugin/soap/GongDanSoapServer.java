package com.ulane.core.plugin.soap;

import javax.jws.WebService;


@WebService
public interface GongDanSoapServer {
	/**
	 * 添加工单
	 * @param xmlStr
	 * @return 
	 */
	public String addGongDan(String xmlStr);
	
}
