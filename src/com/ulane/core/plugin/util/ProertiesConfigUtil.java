package com.ulane.core.plugin.util;

import java.io.IOException;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.ulane.core.plugin.Constants;

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
 * Company: http://www.lasun.com.cn
 * </p>
 * 
 * @author yongan.liu
 * @date 2011-8-2
 * @version 1.0
 */
public class ProertiesConfigUtil {
	private static final Log log = LogFactory.getLog(ProertiesConfigUtil.class);
	private static Properties props = null;
	private static Properties jdbcConfProps = null;
	public ProertiesConfigUtil() {
	}
	static {
		try {
			props = PropertiesLoaderUtils.loadAllProperties(Constants.IMPL_CONF_FILE);
			jdbcConfProps = PropertiesLoaderUtils.loadAllProperties(Constants.JDBC_CONF_FILE);
		} catch (IOException e) {
			log.info("查找配置文件失败");
			e.printStackTrace();
		}
	}
	
	public static String getProValue(String proKey){
		return props.getProperty(proKey);
	}
	
	public static String getJdbcProValue(String proKey){
		return jdbcConfProps.getProperty(proKey);
	}

	public static void main(String... strings) {
		System.out.println(getProValue("NCSERVICE_URL")); 

	}
}
