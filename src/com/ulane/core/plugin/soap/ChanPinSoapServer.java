package com.ulane.core.plugin.soap;

import javax.jws.WebService;


@WebService
public interface ChanPinSoapServer {
	/**
	 * 添加工单
	 * @param xmlStr
	 * @return 
	 */
	public String addChanPin(String xmlStr);
	
}
