package com.htsoft.oa.service.archive;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.archive.ArchFlowConf;

public interface ArchFlowConfService extends BaseService<ArchFlowConf>{
	/**
	 * 根据类型来查找配置
	 * @param archType
	 * @return
	 */
	public ArchFlowConf getByFlowType(Short archType);
	/**
	 * 
	 */
	public Long getDefId(Short archType);
}


