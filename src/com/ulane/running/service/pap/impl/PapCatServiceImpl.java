package com.ulane.running.service.pap.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.dao.pap.PapCatDao;
import com.ulane.running.model.pap.PapCat;
import com.ulane.running.service.pap.PapCatService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class PapCatServiceImpl extends BaseServiceImpl<PapCat> implements PapCatService{
	@SuppressWarnings("unused")
	private PapCatDao dao;
	
	public PapCatServiceImpl(PapCatDao dao) {
		super(dao);
		this.dao=dao;
	}

}