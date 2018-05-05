package com.htsoft.oa.dao.admin;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.ConfSummary;

/**
 * @description ConfSummaryDao
 * @author YHZ
 * @data 2010-10-8 PM
 * 
 */
public interface ConfSummaryDao extends BaseDao<ConfSummary> {

	/**
	 * @description 发送
	 */
	ConfSummary send(ConfSummary cm, String fileIds);

	/**
	 * @description 保存
	 */
	ConfSummary save(ConfSummary cm, String fileIds);

}