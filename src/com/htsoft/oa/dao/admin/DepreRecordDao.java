package com.htsoft.oa.dao.admin;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.DepreRecord;

/**
 * 
 * @author 
 *
 */
public interface DepreRecordDao extends BaseDao<DepreRecord>{
	/**
	 * 查找出最近折旧的时间
	 * @param assetsId
	 * @return
	 */
	
	public Date findMaxDate(Long assetsId);
}