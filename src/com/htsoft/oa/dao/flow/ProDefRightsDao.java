package com.htsoft.oa.dao.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.ProDefRights;

/**
 * 
 * @author 
 *
 */
public interface ProDefRightsDao extends BaseDao<ProDefRights>{

	public ProDefRights findByDefId(Long defId);

	public ProDefRights findByTypeId(Long proTypeId);
	
}