package com.htsoft.oa.service.admin.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.ConfSummaryDao;
import com.htsoft.oa.model.admin.ConfSummary;
import com.htsoft.oa.service.admin.ConfSummaryService;

/**
 * @description ConfSummarySerivceImpl
 * @author YHZ
 * @data 2010-10-8 PM
 * 
 */
public class ConfSummaryServiceImpl extends BaseServiceImpl<ConfSummary>
		implements ConfSummaryService {
	private ConfSummaryDao dao;

	public ConfSummaryServiceImpl(ConfSummaryDao dao) {
		super(dao);
		this.dao = dao;
	}

	/**
	 * @description 发送
	 * @param cm
	 *            ConfSummary
	 * @param fileIds
	 * @return ConfSummary
	 */
	public ConfSummary send(ConfSummary cm, String fileIds) {
		return dao.send(cm, fileIds);
	}

	/**
	 * @description 保存
	 * @param cm
	 *            ConfSummary
	 * @param fileIds
	 * @return ConfSummary
	 */
	public ConfSummary save(ConfSummary cm, String fileIds) {
		return dao.save(cm, fileIds);
	}

}