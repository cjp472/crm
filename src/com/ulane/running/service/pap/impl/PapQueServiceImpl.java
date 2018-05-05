package com.ulane.running.service.pap.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.pap.PapQueDao;
import com.ulane.running.model.pap.PapQue;
import com.ulane.running.service.pap.PapQueService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class PapQueServiceImpl extends BaseServiceImpl<PapQue> implements PapQueService{
	@SuppressWarnings("unused")
	private PapQueDao dao;
	
	public PapQueServiceImpl(PapQueDao dao) {
		super(dao);
		this.dao=dao;
	}

}