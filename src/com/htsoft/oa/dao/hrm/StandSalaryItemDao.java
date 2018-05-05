package com.htsoft.oa.dao.hrm;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.hrm.StandSalaryItem;

/**
 * 
 * @author 
 *
 */
public interface StandSalaryItemDao extends BaseDao<StandSalaryItem>{

	public List<StandSalaryItem> getAllByStandardId(Long standardId);
	
}