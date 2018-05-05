package com.htsoft.oa.dao.archive;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.archive.ArchivesDoc;

/**
 * 
 * @author 
 *
 */
public interface ArchivesDocDao extends BaseDao<ArchivesDoc>{
	/**
	 * 根据公文ID来查找公文撰稿
	 */
	public List<ArchivesDoc> findByAid(Long archivesId);
}