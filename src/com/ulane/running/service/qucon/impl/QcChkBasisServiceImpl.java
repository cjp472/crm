package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcChkBasisDao;
import com.ulane.running.model.qucon.QcChkBasis;
import com.ulane.running.service.qucon.QcChkBasisService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcChkBasisServiceImpl extends BaseServiceImpl<QcChkBasis> implements QcChkBasisService{
	@SuppressWarnings("unused")
	private QcChkBasisDao dao;
	
	public QcChkBasisServiceImpl(QcChkBasisDao dao) {
		super(dao);
		this.dao=dao;
	}

}