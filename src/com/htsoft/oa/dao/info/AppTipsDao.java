package com.htsoft.oa.dao.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.info.AppTips;

/**
 * 
 * @author 
 *
 */
public interface AppTipsDao extends BaseDao<AppTips>{
	/**
	 * 根据名称去查找TIP
	 */
	public List<AppTips> findByName(String name);
	
}