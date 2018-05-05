package com.ulane.supply.service.goods.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.goods.ScGoodsPriceRuleDao;
import com.ulane.supply.model.goods.ScGoodsPriceRule;
import com.ulane.supply.service.goods.ScGoodsPriceRuleService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScGoodsPriceRuleServiceImpl extends BaseServiceImpl<ScGoodsPriceRule> implements ScGoodsPriceRuleService{
	@SuppressWarnings("unused")
	private ScGoodsPriceRuleDao dao;
	
	public ScGoodsPriceRuleServiceImpl(ScGoodsPriceRuleDao dao) {
		super(dao);
		this.dao=dao;
	}

}