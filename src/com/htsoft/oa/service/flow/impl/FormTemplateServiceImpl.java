package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.FormTemplateDao;
import com.htsoft.oa.model.flow.FormDefMapping;
import com.htsoft.oa.model.flow.FormTemplate;
import com.htsoft.oa.service.flow.FormTemplateService;

public class FormTemplateServiceImpl extends BaseServiceImpl<FormTemplate> implements FormTemplateService{
	@SuppressWarnings("unused")
	private FormTemplateDao dao;
	
	public FormTemplateServiceImpl(FormTemplateDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/**
	 * 按映射取到所有的流程表单定义
	 * @param mappingId
	 * @return
	 */
	public List<FormTemplate> getByMappingId(Long mappingId){
		return dao.getByMappingId(mappingId);
	}

	@Override
	public void batchAddDefault(List<String> nodeNames, FormDefMapping fdm) {
		for(String nodeName:nodeNames){
			FormTemplate formTemplate=new FormTemplate();
			formTemplate.setFormDefMapping(fdm);
			formTemplate.setNodeName(nodeName);
			save(formTemplate);
		}
		
	}
	
	/**
	 * 取得映射
	 * @param mappingId
	 * @param nodeName
	 * @return
	 */
	public FormTemplate getByMappingIdNodeName(Long mappingId,String nodeName){
		return dao.getByMappingIdNodeName(mappingId, nodeName);
	}
}