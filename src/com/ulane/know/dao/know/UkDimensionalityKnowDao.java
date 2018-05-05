package com.ulane.know.dao.know;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.know.model.know.UkDimensionalityKnow;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UkDimensionalityKnowDao extends BaseDao<UkDimensionalityKnow>{
	/**
	 * 根据uk_dimensionality_know查找knowId
	 * @param knowDimenIds
	 * @param type
	 * @author wangzhongjin
	 */
	public List findKnowDimenKnowid(String knowDimenIds,String type);
}