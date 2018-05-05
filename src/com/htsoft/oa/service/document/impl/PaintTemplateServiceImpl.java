package com.htsoft.oa.service.document.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.document.PaintTemplateDao;
import com.htsoft.oa.model.document.PaintTemplate;
import com.htsoft.oa.service.document.PaintTemplateService;

public class PaintTemplateServiceImpl extends BaseServiceImpl<PaintTemplate> implements PaintTemplateService{
	@SuppressWarnings("unused")
	private PaintTemplateDao dao;
	
	public PaintTemplateServiceImpl(PaintTemplateDao dao) {
		super(dao);
		this.dao=dao;
	}

}