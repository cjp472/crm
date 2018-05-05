package com.ulane.running.service.comtech.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.comtech.CtScrTemGotoRuleDao;
import com.ulane.running.model.comtech.CtScrTemGotoRule;
import com.ulane.running.service.comtech.CtScrTemGotoRuleService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CtScrTemGotoRuleServiceImpl extends BaseServiceImpl<CtScrTemGotoRule> implements CtScrTemGotoRuleService{
	@SuppressWarnings("unused")
	private CtScrTemGotoRuleDao dao;
	
	public CtScrTemGotoRuleServiceImpl(CtScrTemGotoRuleDao dao) {
		super(dao);
		this.dao=dao;
	}

}