package com.htsoft.oa.dao.archive;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.archive.ArchHasten;

/**
 * 
 * @author 
 *
 */
public interface ArchHastenDao extends BaseDao<ArchHasten>{
	/**
	 * 获取最后一次发送催办信息的时间
	 * @param archivesId
	 * @param userId
	 * @return
	 */
	public Date getLeastRecordByUser(Long archivesId);
}