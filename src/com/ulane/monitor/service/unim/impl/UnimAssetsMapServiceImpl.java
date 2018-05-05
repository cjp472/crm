package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAssetsMapDao;
import com.ulane.monitor.model.unim.UnimAssetsMap;
import com.ulane.monitor.service.unim.UnimAssetsMapService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimAssetsMapServiceImpl extends BaseServiceImpl<UnimAssetsMap> implements UnimAssetsMapService{
	@SuppressWarnings("unused")
	private UnimAssetsMapDao dao;
	
	public UnimAssetsMapServiceImpl(UnimAssetsMapDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public UnimAssetsMap getUnimAssetsMapByNavigationId2(Long navigationId,
			Long monitorId) throws Exception {
		// TODO Auto-generated method stub
		return dao.getUnimAssetsMapByNavigationId2(navigationId, monitorId);
	}

	@Override
	public UnimAssetsMap getUnimAssetsMapByNavigationId(Long navigationId,
			Long monitorId) {
		// TODO Auto-generated method stub
		return dao.getUnimAssetsMapByNavigationId(navigationId, monitorId);
	}

}