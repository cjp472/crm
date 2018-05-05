package com.ulane.running.service.pap.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.pap.PapTemGotoRuleDao;
import com.ulane.running.model.pap.PapTemGotoRule;
import com.ulane.running.service.pap.PapTemGotoRuleService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class PapTemGotoRuleServiceImpl extends BaseServiceImpl<PapTemGotoRule> implements PapTemGotoRuleService{
	@SuppressWarnings("unused")
	private PapTemGotoRuleDao dao;
	
	public PapTemGotoRuleServiceImpl(PapTemGotoRuleDao dao) {
		super(dao);
		this.dao=dao;
	}

}