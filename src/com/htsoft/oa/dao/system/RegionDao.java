package com.htsoft.oa.dao.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.Region;

/**
 * 
 * @author
 * 
 */
public interface RegionDao extends BaseDao<Region> {

	public List<Region> getProvince();

	public List<Region> getCity(Long regionId);

	public String getChildrenStoreData(Long region, Integer type);

	/**
	 * @author zhanghao
	 * @param type
	 * @return
	 */
	public List<Region> getChildrenByType(Integer type);

	/**
	 * 获取乡镇街道的数据，分页实现
	 * 
	 * @param start
	 * @param limit
	 * @return
	 */
	public List<Region> getDetailChildrenByType(Integer start, Integer limit);

	public Integer getDetailChildrenByType_count();

	public Region get_Jdbc(Long regionId);
}