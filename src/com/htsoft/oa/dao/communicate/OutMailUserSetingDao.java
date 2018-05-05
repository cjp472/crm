package com.htsoft.oa.dao.communicate;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.communicate.OutMailUserSeting;

/**
 * @description 外部邮箱管理
 * @class OutMailUserSetingDao
 * @extend BaseDao
 * 
 */
public interface OutMailUserSetingDao extends BaseDao<OutMailUserSeting> {

	/**
	 * 根据当前登陆人，取得外部邮箱设置
	 */
	OutMailUserSeting getByLoginId(Long loginId);
	
	public List findByUserAll();
	
	/**
	 *根据用户名查询邮箱设置 
	 */
	public List<OutMailUserSeting> findByUserAll(String userName,PagingBean pb);
}