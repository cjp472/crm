package com.htsoft.oa.service.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.FieldRights;

public interface FieldRightsService extends BaseService<FieldRights>{
	/**
	 * 根据映射字段和节点来查找权限
	 * @param mappingId
	 * @param fieldId
	 * @param taskName
	 * @return
	 */
	public List<FieldRights> getByMappingFieldTaskName(Long mappingId,Long fieldId,String taskName);
	/**
	 * 根据映射和任务节点来查找表单的权限列表
	 * @param mappingId
	 * @param taskName
	 * @return
	 */
	public List<FieldRights> getByMappingIdAndTaskName(Long mappingId,String taskName);
	/**
	 * 根据映射ID来查找权限
	 * @param mappingId
	 * @return
	 */
	public List<FieldRights> getByMappingId(Long mappingId);
}


