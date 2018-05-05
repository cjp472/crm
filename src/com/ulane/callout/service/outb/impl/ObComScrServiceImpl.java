package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import javax.annotation.Resource;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObComScrDao;
import com.ulane.callout.model.outb.ObComScr;
import com.ulane.callout.service.outb.ObComScrService;
import com.ulane.running.dao.comtech.CtScrTemplateDao;
import com.ulane.running.model.comtech.CtScrTemplate;
/**
 * 
 * @author lzm
 *
 */

public class ObComScrServiceImpl extends BaseServiceImpl<ObComScr> implements ObComScrService{
	@SuppressWarnings("unused")
	private ObComScrDao dao;
	@Resource
	private CtScrTemplateDao ctScrTemplateDao;
	
	public ObComScrServiceImpl(ObComScrDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public CtScrTemplate getScrByComId(String comId) {
		//取得话术ID
		Long tmpId = dao.getScrIdByComId(comId);
		//取得话术
		CtScrTemplate ctScrTemplate = ctScrTemplateDao.get(tmpId);
		return ctScrTemplate;
	}

}