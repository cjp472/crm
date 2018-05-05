package com.htsoft.oa.dao.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.FormTemplateDao;
import com.htsoft.oa.model.flow.FormTemplate;

@SuppressWarnings("unchecked")
public class FormTemplateDaoImpl extends BaseDaoImpl<FormTemplate> implements FormTemplateDao{

	public FormTemplateDaoImpl() {
		super(FormTemplate.class);
	}
	/**
	 * 按映射取到所有的流程表单定义
	 * @param mappingId
	 * @return
	 */
	public List<FormTemplate> getByMappingId(Long mappingId){
		String hql="from FormTemplate ft where ft.formDefMapping.mappingId=?";
		return findByHql(hql, new Object[]{mappingId});
	}
	/**
	 * 取得映射
	 * @param mappingId
	 * @param nodeName
	 * @return
	 */
	public FormTemplate getByMappingIdNodeName(Long mappingId,String nodeName){
		String hql="from FormTemplate ft where ft.formDefMapping.mappingId=? and ft.nodeName=?";
		return (FormTemplate)findUnique(hql, new Object[]{mappingId,nodeName});
	}
	

}