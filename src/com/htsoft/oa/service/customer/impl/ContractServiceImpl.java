package com.htsoft.oa.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.ContractDao;
import com.htsoft.oa.model.customer.Contract;
import com.htsoft.oa.service.customer.ContractService;

public class ContractServiceImpl extends BaseServiceImpl<Contract> implements ContractService{
	private ContractDao dao;
	
	public ContractServiceImpl(ContractDao dao) {
		super(dao);
		this.dao=dao;
	}

}