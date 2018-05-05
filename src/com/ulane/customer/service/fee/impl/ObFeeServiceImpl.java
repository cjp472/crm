package com.ulane.customer.service.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.fee.ObFeeDao;
import com.ulane.customer.model.fee.ObFee;
import com.ulane.customer.service.fee.ObFeeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObFeeServiceImpl extends BaseServiceImpl<ObFee> implements ObFeeService{
	@SuppressWarnings("unused")
	private ObFeeDao dao;
	
	public ObFeeServiceImpl(ObFeeDao dao) {
		super(dao);
		this.dao=dao;
	}

}