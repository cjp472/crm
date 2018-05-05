package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkKnowDianpingDao;
import com.ulane.know.model.know.UkKnowDianping;
import com.ulane.know.service.know.UkKnowDianpingService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowDianpingServiceImpl extends BaseServiceImpl<UkKnowDianping> implements UkKnowDianpingService{
	@SuppressWarnings("unused")
	private UkKnowDianpingDao dao;
	
	public UkKnowDianpingServiceImpl(UkKnowDianpingDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Double getAvgValue(Long knowId) {
		// TODO Auto-generated method stub
		return dao.getAvgValue(knowId);
	}

	@Override
	public boolean hasKnowRead(String knowId,String busiType) {
		// TODO Auto-generated method stub
		return dao.hasKnowRead(knowId,busiType);
	}

}