package com.htsoft.oa.service.flow.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.FormDefMappingDao;
import com.htsoft.oa.model.flow.FormDefMapping;
import com.htsoft.oa.service.flow.FormDefMappingService;

public class FormDefMappingServiceImpl extends BaseServiceImpl<FormDefMapping>
		implements FormDefMappingService {

	private FormDefMappingDao dao;

	public FormDefMappingServiceImpl(FormDefMappingDao dao) {
		super(dao);
		this.dao = dao;
	}

	/**
	 * 按jbpm流程发布id取得表单映射
	 * 
	 * @param deployId
	 * @return
	 */
	public FormDefMapping getByDeployId(String deployId) {
		return dao.getByDeployId(deployId);
	}

	// 根据defId查询是否已经设置表单数据
	@Override
	public FormDefMapping findByDefId(Long defId) {
		return dao.findByDefId(defId);
	}

	@Override
	public boolean formDefHadMapping(Long formDefId) {
		List<FormDefMapping> mps=dao.getByFormDef(formDefId);
		if(mps.size()>0){
			return true;
		}
		return false;
	}
}