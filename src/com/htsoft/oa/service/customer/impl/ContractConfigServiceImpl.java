package com.htsoft.oa.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.ContractConfigDao;
import com.htsoft.oa.model.customer.ContractConfig;
import com.htsoft.oa.service.customer.ContractConfigService;

public class ContractConfigServiceImpl extends BaseServiceImpl<ContractConfig> implements ContractConfigService{
	private ContractConfigDao dao;
	
	public ContractConfigServiceImpl(ContractConfigDao dao) {
		super(dao);
		this.dao=dao;
	}

}