package com.htsoft.oa.service.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.info.Section;

public interface SectionService extends BaseService<Section>{
	public Integer getLastColumn();
}


