package com.ulane.customer.service.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.fee.ObFeeRuleValueDao;
import com.ulane.customer.model.fee.ObFeeRuleValue;
import com.ulane.customer.service.fee.ObFeeRuleValueService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObFeeRuleValueServiceImpl extends BaseServiceImpl<ObFeeRuleValue> implements ObFeeRuleValueService{
	@SuppressWarnings("unused")
	private ObFeeRuleValueDao dao;
	
	public ObFeeRuleValueServiceImpl(ObFeeRuleValueDao dao) {
		super(dao);
		this.dao=dao;
	}

}