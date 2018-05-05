package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlBbsJieshouDao;
import com.ulane.base.model.xitong.UlBbsJieshou;
import com.ulane.base.service.xitong.UlBbsJieshouService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UlBbsJieshouServiceImpl extends BaseServiceImpl<UlBbsJieshou> implements UlBbsJieshouService{
	@SuppressWarnings("unused")
	private UlBbsJieshouDao dao;
	
	public UlBbsJieshouServiceImpl(UlBbsJieshouDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UlBbsJieshou> findByUser(Long userId) {
		return dao.findByUser(userId);
	}
	
	

}