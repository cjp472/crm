package com.ulane.running.service.pap.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.pap.PapReleaseObjDao;
import com.ulane.running.model.pap.PapReleaseObj;
import com.ulane.running.service.pap.PapReleaseObjService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class PapReleaseObjServiceImpl extends BaseServiceImpl<PapReleaseObj> implements PapReleaseObjService{
	@SuppressWarnings("unused")
	private PapReleaseObjDao dao;
	
	public PapReleaseObjServiceImpl(PapReleaseObjDao dao) {
		super(dao);
		this.dao=dao;
	}

}