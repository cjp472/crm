package com.ulane.running.service.pap.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.pap.PapReleaseDao;
import com.ulane.running.model.pap.PapRelease;
import com.ulane.running.service.pap.PapReleaseService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class PapReleaseServiceImpl extends BaseServiceImpl<PapRelease> implements PapReleaseService{
	@SuppressWarnings("unused")
	private PapReleaseDao dao;
	
	public PapReleaseServiceImpl(PapReleaseDao dao) {
		super(dao);
		this.dao=dao;
	}

}