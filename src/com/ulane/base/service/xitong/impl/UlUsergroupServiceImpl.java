package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlUsergroupDao;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.xitong.UlUsergroupService;
/**
 * 
 * @author 
 *
 */

public class UlUsergroupServiceImpl extends BaseServiceImpl<UlUsergroup> implements UlUsergroupService{
	
	private UlUsergroupDao dao;
	
	public UlUsergroupServiceImpl(UlUsergroupDao dao) {
		super(dao);
		this.dao=dao;
	}
	/**
	 * 根据parentId查询
	 */
	@Override
	public List<UlUsergroup> findByCondition(Long parentId) {
		return dao.findByCondition(parentId);
	}
	
}