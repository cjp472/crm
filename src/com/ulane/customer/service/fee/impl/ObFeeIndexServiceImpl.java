package com.ulane.customer.service.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.fee.ObFeeIndexDao;
import com.ulane.customer.model.fee.ObFeeIndex;
import com.ulane.customer.service.fee.ObFeeIndexService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObFeeIndexServiceImpl extends BaseServiceImpl<ObFeeIndex> implements ObFeeIndexService{
	@SuppressWarnings("unused")
	private ObFeeIndexDao dao;
	
	public ObFeeIndexServiceImpl(ObFeeIndexDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Object findDepId(Long depid) {
		// TODO Auto-generated method stub
		return dao.findDepId(depid);
	}
   
}