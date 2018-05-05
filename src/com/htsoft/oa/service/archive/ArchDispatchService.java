package com.htsoft.oa.service.archive;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.archive.ArchDispatch;
import com.htsoft.oa.model.system.AppUser;

public interface ArchDispatchService extends BaseService<ArchDispatch>{
	public List<ArchDispatch> findByUser(AppUser user,PagingBean pb);
	/**
	 * 根据公文的ID来查找阅读处理的记录数
	 */
	public int countArchDispatch(Long archivesId);
}


