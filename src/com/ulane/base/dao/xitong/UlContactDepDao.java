package com.ulane.base.dao.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.base.model.xitong.UlContactDep;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UlContactDepDao extends BaseDao<UlContactDep>{
	/**
	 * 根据部门名称查询
	 * @param DepId
	 * @return
	 */
	public List<UlContactDep> getAllByDepId(Long depId);
	
}