package com.ulane.running.dao.qucon;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.BaseDao;
import com.ulane.running.model.qucon.QcChkRulDetail;
import com.ulane.running.model.qucon.RandomExtractModel;


/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface QcRandomExtractDao extends BaseDao{
	public List<Long> extract(RandomExtractModel rem);
}