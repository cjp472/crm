package com.ulane.core.plugin.util; 

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.apache.cxf.jaxws.endpoint.dynamic.JaxWsDynamicClientFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.ulane.core.plugin.Constants;

/**
 * <p>
 * Title: WebServiceClientHelper.java
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009-2011
 * </p>
 * <p>
 * Company: http://www.lasun.com.cn
 * </p>
 * 
 * @author yongan.liu
 * @date 2011-8-7
 * @version 1.0
 */
public class WebServiceClientHelper { 

	/**
	 * webservice 公共接口类
	 * 
	 * @param url webservice远程地址
	 *            
	 * @param cls 接口参数
	 *            
	 * @return
	 */
	public static <T> T getService(String url, Class<T> cls) {
		JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
		factory.setServiceClass(cls);
		factory.setAddress(url);
		@SuppressWarnings("unchecked")
		T service = (T) factory.create();
		return service;
	}
	
	public static String callService(String wsMethod , Object[] objArr) throws Exception {
		Resource resource = new ClassPathResource(Constants.HAS_CHARGE_BILL_URL);
		org.codehaus.xfire.client.Client client = new org.codehaus.xfire.client.Client(resource.getInputStream(), null); 
		Object[] results = client.invoke(wsMethod, objArr);
		return (String)results[0];
	}

	/**
	 * 
	 * @param wsUrl
	 * @param method
	 * @param arg
	 * @return
	 */
	public static String callService(String wsUrl, String method, Object arg) {
		JaxWsDynamicClientFactory dcf = JaxWsDynamicClientFactory.newInstance();
		Client client = dcf.createClient(wsUrl);
		Object[] res = null;
		try {
			res = client.invoke(method, arg);
			client.destroy();
			System.out.println((String) res[0]);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (String) res[0];
	}
}
