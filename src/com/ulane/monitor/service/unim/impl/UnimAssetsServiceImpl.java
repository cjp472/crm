package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAssetsDao;
import com.ulane.monitor.model.unim.UnimAssets;
import com.ulane.monitor.service.unim.UnimAssetsService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimAssetsServiceImpl extends BaseServiceImpl<UnimAssets> implements UnimAssetsService{
	@SuppressWarnings("unused")
	private UnimAssetsDao dao;
	
	public UnimAssetsServiceImpl(UnimAssetsDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimAssets> listGeneralUnimAssets() throws Exception {
		// TODO Auto-generated method stub
		return dao.listGeneralUnimAssets();
	}

	@Override
	public List<UnimAssets> listMonitorUnimAssets(Long id) throws Exception {
		// TODO Auto-generated method stub
		return dao.listMonitorUnimAssets(id);
	}

}