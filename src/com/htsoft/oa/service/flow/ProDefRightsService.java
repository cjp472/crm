package com.htsoft.oa.service.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.ProDefRights;

public interface ProDefRightsService extends BaseService<ProDefRights>{

	public ProDefRights findByTypeId(Long proTypeId);

	public ProDefRights findByDefId(Long defId);
	
}


