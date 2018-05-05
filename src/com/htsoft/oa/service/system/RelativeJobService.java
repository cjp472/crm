package com.htsoft.oa.service.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.RelativeJob;

/**
 * @description 相对岗位管理
 * @author 优创融联科技
 * @company www.ulane.cn
 * @data 2010-12-13PM
 * 
 */
public interface RelativeJobService extends BaseService<RelativeJob> {

	/**
	 * @description 根据parentId查询子节点信息
	 * @param parentId
	 *            父节点id
	 * @return List<RelativeJob>
	 */
	List<RelativeJob> findByParentId(Long parentId);
	
}
