package com.ulane.customer.service.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.fee.ObFeeIndexProjectDao;
import com.ulane.customer.model.fee.ObFeeIndexProject;
import com.ulane.customer.service.fee.ObFeeIndexProjectService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObFeeIndexProjectServiceImpl extends BaseServiceImpl<ObFeeIndexProject> implements ObFeeIndexProjectService{
	@SuppressWarnings("unused")
	private ObFeeIndexProjectDao dao;
	
	public ObFeeIndexProjectServiceImpl(ObFeeIndexProjectDao dao) {
		super(dao);
		this.dao=dao;
	}

}