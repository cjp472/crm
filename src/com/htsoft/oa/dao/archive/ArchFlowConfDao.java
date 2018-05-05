package com.htsoft.oa.dao.archive;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.archive.ArchFlowConf;

/**
 * 
 * @author 
 *
 */
public interface ArchFlowConfDao extends BaseDao<ArchFlowConf>{
	/**
	 * 根据类型来查找配置
	 * @param archType
	 * @return
	 */
	public ArchFlowConf getByFlowType(Short archType);
}