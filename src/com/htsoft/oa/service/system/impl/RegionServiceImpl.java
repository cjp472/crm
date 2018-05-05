package com.htsoft.oa.service.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.RegionDao;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.service.system.RegionService;

public class RegionServiceImpl extends BaseServiceImpl<Region> implements
		RegionService {
	private RegionDao dao;

	public RegionServiceImpl(RegionDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public List<Region> getProvince() {
		return dao.getProvince();
	}

	@Override
	public List<Region> getChildren(Long regionId) {
		return dao.getCity(regionId);
	}

	@Override
	public String getChildren_JDBC(Long region, Integer type) {
		return dao.getChildrenStoreData(region, type);
	}

	@Override
	public List<Region> getChildrenByType(Integer type) {
		return dao.getChildrenByType(type);
	}

	@Override
	public List<Region> getDetailChildrenByType(Integer start, Integer limit) {
		return dao.getDetailChildrenByType(start, limit);
	}

	@Override
	public Integer getDetailChildrenByType_count() {
		return dao.getDetailChildrenByType_count();
	}

	public Region get_Jdbc(Long regionId) {
		return dao.get_Jdbc(regionId);
	}
}