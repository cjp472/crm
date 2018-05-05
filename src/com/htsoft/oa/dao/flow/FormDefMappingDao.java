package com.htsoft.oa.dao.flow;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.FormDefMapping;

/**
 * 
 * @author
 * 
 */
public interface FormDefMappingDao extends BaseDao<FormDefMapping> {
	/**
	 * 按jbpm流程发布id取得表单映射
	 * 
	 * @param deployId
	 * @return
	 */
	public FormDefMapping getByDeployId(String deployId);

	/**
	 * @description 根据defId判断表单数据是否存在,存在：formDefMapping对应的数据,否则:null
	 * @param defId
	 *            流程定义id
	 * @return FormDefMapping对象
	 */
	FormDefMapping findByDefId(Long defId);
	/**
	 * 根据表单定义去查找表单映射
	 * @param formDefId
	 * @return
	 */
	public List<FormDefMapping> getByFormDef(Long formDefId);
}