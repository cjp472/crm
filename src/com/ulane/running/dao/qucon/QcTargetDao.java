package com.ulane.running.dao.qucon;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.running.model.qucon.QcTarget;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface QcTargetDao extends BaseDao<QcTarget>{
	List<QcTarget> findByType(Long tarcatId);
	public List<Long> random(final int [] indexs);
}