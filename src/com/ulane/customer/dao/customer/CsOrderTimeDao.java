package com.ulane.customer.dao.customer;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.ulane.customer.model.customer.CsOrderTime;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface CsOrderTimeDao extends BaseDao<CsOrderTime>{
	//根据配置名称ID去查找
	public CsOrderTime getByDicId(Long dicId);
}