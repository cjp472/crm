package com.ulane.customer.service.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.fee.ObFeeRuleDao;
import com.ulane.customer.model.fee.ObFeeRule;
import com.ulane.customer.service.fee.ObFeeRuleService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObFeeRuleServiceImpl extends BaseServiceImpl<ObFeeRule> implements ObFeeRuleService{
	@SuppressWarnings("unused")
	private ObFeeRuleDao dao;
	
	public ObFeeRuleServiceImpl(ObFeeRuleDao dao) {
		super(dao);
		this.dao=dao;
	}

}