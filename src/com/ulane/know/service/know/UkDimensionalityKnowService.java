package com.ulane.know.service.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.know.model.know.UkDimensionalityKnow;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UkDimensionalityKnowService extends BaseService<UkDimensionalityKnow>{
	/**
	 * 根据中间表uk_dimensionality_know查找knowId
	 * @param knowDimenIds
	 * @param type
	 * @author wangzhongjin
	 */
	public List findKnowDimenKnowid(String knowDimenIds,String type);
}


