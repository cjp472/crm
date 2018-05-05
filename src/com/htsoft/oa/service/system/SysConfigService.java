package com.htsoft.oa.service.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.SysConfig;

public interface SysConfigService extends BaseService<SysConfig>{
	/**
	 * 根据KEY来取配置对象
	 * @param key
	 * @return
	 */
	public SysConfig findByKey(String key);
	
	/**
	 * 按类查找配置列表
	 * @return
	 */
	public Map findByType();
}


