package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcTargetDao;
import com.ulane.running.model.qucon.QcTarget;
import com.ulane.running.service.qucon.QcTargetService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcTargetServiceImpl extends BaseServiceImpl<QcTarget> implements QcTargetService{
	@SuppressWarnings("unused")
	private QcTargetDao dao;
	
	public QcTargetServiceImpl(QcTargetDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<QcTarget> findByType(Long tarcatId){
		return dao.findByType(tarcatId);
	}
	
	public List<Long> random(final int [] indexs){
		return dao.random(indexs);
	}
}