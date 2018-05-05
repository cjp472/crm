package com.htsoft.oa.dao.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.SysConfig;

/**
 * 
 * @author 
 *
 */
public interface SysConfigDao extends BaseDao<SysConfig>{
	
	public SysConfig findByKey(String key);
	
	public List<SysConfig> findConfigByTypeKey(String typeKey);
	
	public List findTypeKeys();
	
}