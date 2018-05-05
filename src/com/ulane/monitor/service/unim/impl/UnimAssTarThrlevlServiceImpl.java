package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimAssTarThrlevlDao;
import com.ulane.monitor.model.unim.UnimAssTarThrlevl;
import com.ulane.monitor.service.unim.UnimAssTarThrlevlService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimAssTarThrlevlServiceImpl extends BaseServiceImpl<UnimAssTarThrlevl> implements UnimAssTarThrlevlService{
	@SuppressWarnings("unused")
	private UnimAssTarThrlevlDao dao;
	
	public UnimAssTarThrlevlServiceImpl(UnimAssTarThrlevlDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimAssTarThrlevl> getByCatId(Long targetId) {
		// TODO Auto-generated method stub
		return dao.getByCatId(targetId);
	}

}