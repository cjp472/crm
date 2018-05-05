package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.BeanExtSetDao;
import com.ulane.base.model.xitong.BeanExtSet;
import com.ulane.base.service.xitong.BeanExtSetService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class BeanExtSetServiceImpl extends BaseServiceImpl<BeanExtSet> implements BeanExtSetService{
	@SuppressWarnings("unused")
	private BeanExtSetDao dao;
	
	public BeanExtSetServiceImpl(BeanExtSetDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Object getByColumnsId(Long columnsId) {
		// TODO Auto-generated method stub
		return dao.getByColumnsId(columnsId);
	}

}