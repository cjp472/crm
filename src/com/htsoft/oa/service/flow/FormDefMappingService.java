package com.htsoft.oa.service.flow;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.flow.FormDefMapping;

public interface FormDefMappingService extends BaseService<FormDefMapping> {
	/**
	 * 按jbpm流程发布id取得表单映射
	 * 
	 * @param deployId
	 * @return
	 */
	public FormDefMapping getByDeployId(String deployId);

	/**
	 * @description 根据defId查询是否已经设置表单数据,存在：FormDefMapping,否则：null
	 * @param defId
	 *            流程定义Id
	 * @return FormDefMapping,null
	 */
	FormDefMapping findByDefId(Long defId);
	/**
	 * 检查表单是否已经被映射
	 * @param formDefId
	 * @return
	 */
	public boolean formDefHadMapping(Long formDefId);
}
