package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.FieldRightsDao;
import com.htsoft.oa.model.flow.FieldRights;
import com.htsoft.oa.service.flow.FieldRightsService;

public class FieldRightsServiceImpl extends BaseServiceImpl<FieldRights> implements FieldRightsService{
	@SuppressWarnings("unused")
	private FieldRightsDao dao;
	
	public FieldRightsServiceImpl(FieldRightsDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<FieldRights> getByMappingFieldTaskName(Long mappingId,
			Long fieldId, String taskName) {
		return dao.getByMappingFieldTaskName(mappingId, fieldId, taskName);
	}

	@Override
	public List<FieldRights> getByMappingIdAndTaskName(Long mappingId,
			String taskName) {
		return dao.getByMappingIdAndTaskName(mappingId, taskName);
	}

	@Override
	public List<FieldRights> getByMappingId(Long mappingId) {
		return dao.getByMappingId(mappingId);
	}

}