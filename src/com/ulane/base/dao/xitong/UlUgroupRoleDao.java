package com.ulane.base.dao.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.ulane.base.model.xitong.UlUgroupRole;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UlUgroupRoleDao extends BaseDao<UlUgroupRole>{
	Object findByGroupAndRole(Long ugroupId,Long roleId);
}