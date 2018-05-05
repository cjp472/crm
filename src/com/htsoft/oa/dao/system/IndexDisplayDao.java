package com.htsoft.oa.dao.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.IndexDisplay;

/**
 * 
 * @author 
 *
 */
public interface IndexDisplayDao extends BaseDao<IndexDisplay>{
	/**
	 * 根据当前用户查找相应的模块。
	 * @param userId
	 * @return
	 */
	public List<IndexDisplay> findByUser(Long userId);
}