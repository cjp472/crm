package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.base.dao.xitong.UlBbsHuatiDao;
import com.ulane.base.model.xitong.UlBbsHuati;
import com.ulane.base.model.xitong.UlBbsHuifu;
import com.ulane.base.service.xitong.UlBbsHuatiService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UlBbsHuatiServiceImpl extends BaseServiceImpl<UlBbsHuati> implements UlBbsHuatiService{
	@SuppressWarnings("unused")
	private UlBbsHuatiDao dao;
	
	public UlBbsHuatiServiceImpl(UlBbsHuatiDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UlBbsHuati> findHuaTi() {
		// TODO Auto-generated method stub
		return dao.findHuaTi();
	}

	@Override
	public List<UlBbsHuati> getMy(Long userId) {
		// TODO Auto-generated method stub
		return dao.getMy(userId);
	}

	@Override
	public List<UlBbsHuati> display(PagingBean pagingBean) {
		return dao.display(pagingBean);
	}
	
	
}