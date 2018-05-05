package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAssetsTargetDao;
import com.ulane.monitor.model.unim.UnimAssetsTarget;
import com.ulane.monitor.model.unim.UnimChannelTarget;
import com.ulane.monitor.service.unim.UnimAssetsTargetService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimAssetsTargetServiceImpl extends BaseServiceImpl<UnimAssetsTarget> implements UnimAssetsTargetService{
	@SuppressWarnings("unused")
	private UnimAssetsTargetDao dao;
	
	public UnimAssetsTargetServiceImpl(UnimAssetsTargetDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimAssetsTarget> findByParentId(Long assetsId) {
		return dao.findByParentId(assetsId);
	}

}