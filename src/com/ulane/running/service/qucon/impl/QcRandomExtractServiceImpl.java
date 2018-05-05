package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.qucon.QcRandomExtractDao;
import com.ulane.running.model.qucon.QcChkRulDetail;
import com.ulane.running.model.qucon.RandomExtractModel;
import com.ulane.running.service.qucon.QcRandomExtractService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcRandomExtractServiceImpl extends BaseServiceImpl implements QcRandomExtractService{

	private QcRandomExtractDao dao;
	
	public QcRandomExtractServiceImpl(QcRandomExtractDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public List<Long> extract(RandomExtractModel rem){
		List<Long> rs = dao.extract(rem);
		return rs;
	}

}