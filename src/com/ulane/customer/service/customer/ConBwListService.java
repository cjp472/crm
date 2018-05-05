package com.ulane.customer.service.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.customer.model.customer.ConBwList;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ConBwListService extends BaseService<ConBwList>{
	/**
	 * 通过联系方式与地址查看黑名单
	 */
	public ConBwList getConBwByContact(Short ContactTypeId,String MainContactNum);
	/**
	 * 通过联系方式与地址查看白名单
	 */
	public ConBwList getConWwByContact(Short ContactTypeId,String MainContactNum);
	/**
	 * 导入黑名单的SQL插入操作
	 */
	public void executeInsertSql(String sql);
}


