package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.BeanObjectDao;
import com.ulane.base.model.xitong.BeanObject;
import com.ulane.base.service.xitong.BeanObjectService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class BeanObjectServiceImpl extends BaseServiceImpl<BeanObject> implements BeanObjectService{
	@SuppressWarnings("unused")
	private BeanObjectDao dao;
	
	public BeanObjectServiceImpl(BeanObjectDao dao) {
		super(dao);
		this.dao=dao;
	}

}