package com.ulane.supply.service.purchase.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.purchase.ScBoPurchaseDetailDao;
import com.ulane.supply.model.purchase.ScBoPurchaseDetail;
import com.ulane.supply.service.purchase.ScBoPurchaseDetailService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScBoPurchaseDetailServiceImpl extends BaseServiceImpl<ScBoPurchaseDetail> implements ScBoPurchaseDetailService{
	@SuppressWarnings("unused")
	private ScBoPurchaseDetailDao dao;
	
	public ScBoPurchaseDetailServiceImpl(ScBoPurchaseDetailDao dao) {
		super(dao);
		this.dao=dao;
	}

}