package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcCheckDetailDao;
import com.ulane.running.model.qucon.QcCheckDetail;
import com.ulane.running.service.qucon.QcCheckDetailService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcCheckDetailServiceImpl extends BaseServiceImpl<QcCheckDetail> implements QcCheckDetailService{
	@SuppressWarnings("unused")
	private QcCheckDetailDao dao;
	
	public QcCheckDetailServiceImpl(QcCheckDetailDao dao) {
		super(dao);
		this.dao=dao;
	}

}