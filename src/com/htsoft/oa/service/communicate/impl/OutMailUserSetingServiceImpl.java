package com.htsoft.oa.service.communicate.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.communicate.OutMailUserSetingDao;
import com.htsoft.oa.model.communicate.OutMailUserSeting;
import com.htsoft.oa.service.communicate.OutMailUserSetingService;

/**
 * @description 外部邮箱设置管理
 * @class OutMailUserSetingServiceImpl
 * 
 */
public class OutMailUserSetingServiceImpl extends
		BaseServiceImpl<OutMailUserSeting> implements OutMailUserSetingService {
	private OutMailUserSetingDao dao;

	public OutMailUserSetingServiceImpl(OutMailUserSetingDao dao) {
		super(dao);
		this.dao = dao;
	}

	public OutMailUserSeting getByLoginId(Long loginid) {
		return dao.getByLoginId(loginid);
	}

	@Override
	public List findByUserAll() {
		return dao.findByUserAll();
	}

	@Override
	public List<OutMailUserSeting> findByUserAll(String userName,PagingBean pb){
		return dao.findByUserAll(userName,pb);
	}

}