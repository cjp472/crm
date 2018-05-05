package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.UlUgroupUserDao;
import com.ulane.base.model.xitong.UlUgroupUser;
import com.ulane.base.service.xitong.UlUgroupUserService;
/**
 * 
 * @author 
 *
 */

public class UlUgroupUserServiceImpl extends BaseServiceImpl<UlUgroupUser> implements UlUgroupUserService{
	private UlUgroupUserDao dao;
	
	public UlUgroupUserServiceImpl(UlUgroupUserDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public UlUgroupUser findByGroupAndUser(Long ugroupId, Long userId) {
		return (UlUgroupUser)dao.findByGroupAndUser(ugroupId, userId);
	}
	
	@Override
	public List<UlUgroupUser> findByUserId(Long Id) {
		return dao.findByUserId(Id);
	}

}