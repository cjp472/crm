package com.htsoft.oa.dao.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.customer.Project;

/**
 * 
 * @author 
 *
 */
public interface ProjectDao extends BaseDao<Project>{

	public boolean checkProjectNo(String projectNo);
	
}