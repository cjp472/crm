package com.htsoft.oa.service.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.Region;

public interface RegionService extends BaseService<Region> {

	/**
	 * 返回根节点下的所有节点(只查找一层)
	 * 
	 * * @return
	 */
	public List<Region> getProvince();

	/**
	 * 返回指定节点下的所有节点(只查找一层)
	 * 
	 * @param regionId
	 *            指定节点的id
	 * @return
	 */
	public List<Region> getChildren(Long regionId);

	/**
	 * 返回指定节点下的所有节点(只查找一层),使用jdbc实现
	 * 
	 * @return
	 */
	public String getChildren_JDBC(Long region, Integer type);

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
