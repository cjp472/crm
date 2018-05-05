package com.htsoft.oa.dao.archive;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.archive.ArchDispatch;
import com.htsoft.oa.model.system.AppUser;

/**
 * 
 * @author 
 *
 */
public interface ArchDispatchDao extends BaseDao<ArchDispatch>{
	/**
	 * 根据当前用户的角色和用户ID来查找相关的分发人记录
	 */
	public List<ArchDispatch> findByUser(AppUser user,PagingBean pb);
	/**
	 * 根据当前公文ID来查找阅读和处理的记录
	 */
	public List<ArchDispatch> findRecordByArc(Long archivesId);
}