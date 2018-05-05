package com.htsoft.oa.dao.archive;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.archive.Archives;
import com.htsoft.oa.model.system.AppRole;

/**
 * 
 * @author 
 *
 */
public interface ArchivesDao extends BaseDao<Archives>{
	/**
	 * 根据用户的ID或角色来查找当前用户的分发公文
	 */
	public List<Archives> findByUserOrRole(Long userId,Set<AppRole> roles,PagingBean pb);
}