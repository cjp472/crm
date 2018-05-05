package com.ulane.know.dao.know;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.know.model.know.UkKnowDimensionality;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UkKnowDimensionalityDao extends BaseDao<UkKnowDimensionality>{
	
	public List<UkKnowDimensionality> findByParent(Long parentId);
	
	/**
	 * 找当前用户的角色是否拥有维度的权限
	 * @param userId
	 * @param roleIds
	 * @return
	 * @author wangzhongjin
	 */
	public List<UkKnowDimensionality> findDimenRole(Long parentId);
}