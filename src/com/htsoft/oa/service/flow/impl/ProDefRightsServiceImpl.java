package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProDefRightsDao;
import com.htsoft.oa.model.flow.ProDefRights;
import com.htsoft.oa.service.flow.ProDefRightsService;

public class ProDefRightsServiceImpl extends BaseServiceImpl<ProDefRights> implements ProDefRightsService{
	@SuppressWarnings("unused")
	private ProDefRightsDao dao;
	
	public ProDefRightsServiceImpl(ProDefRightsDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public ProDefRights findByDefId(Long defId) {
		return dao.findByDefId(defId);
	}

	@Override
	public ProDefRights findByTypeId(Long proTypeId) {
		return dao.findByTypeId(proTypeId);
	}

}