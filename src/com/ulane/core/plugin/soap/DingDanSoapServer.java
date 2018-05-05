package com.ulane.core.plugin.soap;

import javax.jws.WebService;


@WebService
public interface DingDanSoapServer {
	/**
	 * 添加工单
	 * @param xmlStr
	 * @return 
	 */
	public String addDingDan(String xmlStr);
	
}
