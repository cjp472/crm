package com.htsoft.oa.dao.flow;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.system.AppUser;

/**
 * 
 * @author
 * 
 */
public interface ProDefinitionDao extends BaseDao<ProDefinition> {
	/**
	 * 按发布ID取得XML
	 * 
	 * @param deployId
	 * @return
	 */
	public ProDefinition getByDeployId(String deployId);

	/**
	 * get by name
	 * 
	 * @param name
	 * @return
	 */
	public ProDefinition getByName(String name);

	public List<ProDefinition> getByRights(AppUser curUser,
			ProDefinition proDefinition, QueryFilter filter);

	public boolean checkNameByVo(ProDefinition proDefinition);

	public boolean checkProcessNameByVo(ProDefinition proDefinition);
	//根据流程实现运行状态来查找流程
	public List<ProDefinition> findRunningPro(ProDefinition proDefinition,Short runstate,PagingBean pb);
}