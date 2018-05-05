package com.htsoft.oa.service.flow;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.system.AppUser;

public interface ProDefinitionService extends BaseService<ProDefinition> {
	public ProDefinition getByDeployId(String deployId);

	public ProDefinition getByName(String name);

	public List<ProDefinition> getByRights(AppUser curUser,
			ProDefinition proDefinition, QueryFilter filter);

	/**
	 * 返回true则通过,false则重名
	 * 
	 * @param proDefinition
	 * @return
	 */
	public boolean checkNameByVo(ProDefinition proDefinition);

	/**
	 * 返回true则通过,false则重名
	 * 
	 * @param proDefinition
	 * @return
	 */
	public boolean checkProcessNameByVo(ProDefinition proDefinition);

	// 根据流程实现运行状态来查找流程
	public List<ProDefinition> findRunningPro(ProDefinition proDefinition,
			Short runstate, PagingBean pb);
	
	/**
	 * @description 保存流程信息,包含流程发布
	 * @param proDefinition ProDefinition
	 * @param deploy true:保存，并发布;false:只保存
	 * @return 数据操作信息
	 */
	String defSave(ProDefinition proDefinition,Boolean deploy);
}
