package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.CsOrderTimeDao;
import com.ulane.customer.model.customer.CsOrderTime;
import com.ulane.customer.service.customer.CsOrderTimeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CsOrderTimeServiceImpl extends BaseServiceImpl<CsOrderTime> implements CsOrderTimeService{
	@SuppressWarnings("unused")
	private CsOrderTimeDao dao;
	
	public CsOrderTimeServiceImpl(CsOrderTimeDao dao) {
		super(dao);
		this.dao=dao;
	}

	/**
	 * 根据时间配置名称获取工单时间设置项
	 */
	@Override
	public CsOrderTime getByDicId(Long dicId) {
		return dao.getByDicId(dicId);
	}
	
	

}