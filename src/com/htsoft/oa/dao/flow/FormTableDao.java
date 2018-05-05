package com.htsoft.oa.dao.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.flow.FormTable;
import com.htsoft.oa.model.system.AppUser;

/**
 * 
 * @author 
 *
 */
public interface FormTableDao extends BaseDao<FormTable>{
	public List<FormTable> getListFromPro(String typeId,String tableName,AppUser curUser,PagingBean pb); 
	/**
	 * 返回所有表定义及其表的字段
	 * @return
	 */
	public List<FormTable> getAllAndFields();
	/**
	 * 查询是否存在的表key
	 */
	public List<FormTable> findByTableKey(String tableKey);
}