package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlContactDepDao;
import com.ulane.base.model.xitong.UlContactDep;
import com.ulane.base.service.xitong.UlContactDepService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UlContactDepServiceImpl extends BaseServiceImpl<UlContactDep> implements UlContactDepService{
	@SuppressWarnings("unused")
	private UlContactDepDao dao;
	
	public UlContactDepServiceImpl(UlContactDepDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UlContactDep> getAllByDepId(Long depId) {
		return dao.getAllByDepId(depId);
	}
	

}