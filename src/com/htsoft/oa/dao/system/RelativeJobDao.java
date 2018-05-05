package com.htsoft.oa.dao.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.RelativeJob;

/**
 * @description 相对岗位管理
 * @author YHZ
 * @company www.ulane.cn
 * @data 2010-12-13AM
 */
public interface RelativeJobDao extends BaseDao<RelativeJob> {

	/**
	 * @description 根据parentId查询对应的相对岗位信息
	 * @param parentId
	 *            父节点Id
	 * @return List<RelativeJob>
	 */
	List<RelativeJob> findByParentId(Long parentId);
}