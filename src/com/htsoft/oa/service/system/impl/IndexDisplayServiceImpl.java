package com.htsoft.oa.service.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.IndexDisplayDao;
import com.htsoft.oa.model.system.IndexDisplay;
import com.htsoft.oa.service.system.IndexDisplayService;

public class IndexDisplayServiceImpl extends BaseServiceImpl<IndexDisplay> implements IndexDisplayService{
	private IndexDisplayDao dao;
	
	public IndexDisplayServiceImpl(IndexDisplayDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<IndexDisplay> findByUser(Long userId) {
		return dao.findByUser(userId);
	}

}