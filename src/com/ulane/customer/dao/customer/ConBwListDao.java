package com.ulane.customer.dao.customer;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.customer.model.customer.ConBwList;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ConBwListDao extends BaseDao<ConBwList>{
	/**
	 * 通过联系方式与地址查看黑名单
	 */
	public List<ConBwList> getConBwByContact(Short ContactTypeId,String MainContactNum);
	/**
	 * 通过联系方式与地址查看白名单
	 */
	public List<ConBwList> getConWwByContact(Short ContactTypeId,String MainContactNum);
}