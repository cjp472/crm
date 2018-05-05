package com.htsoft.oa.service.admin;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.admin.ConfSummary;

/**
 * @description ConfSummaryService
 * @author YHZ
 * @date 2010-10-8 PM
 * 
 */
public interface ConfSummaryService extends BaseService<ConfSummary> {

	/**
	 * @description 发送
	 * @param cm
	 *            ConfSummary
	 * @param fileIds
	 *            附件ids
	 * @return ConfSummary
	 */
	ConfSummary send(ConfSummary cm, String fileIds);

	/**
	 * @description 保存
	 * @param cm
	 *            ConfSummary
	 * @param fileIds
	 * @return ConfSummary
	 */
	ConfSummary save(ConfSummary cm, String fileIds);
}
