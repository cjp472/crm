package com.ulane.shsh.service.shhq.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.shsh.dao.shhq.ShBugRepaireDao;
import com.ulane.shsh.model.shhq.ShBugRepaire;
import com.ulane.shsh.service.shhq.ShBugRepaireService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ShBugRepaireServiceImpl extends BaseServiceImpl<ShBugRepaire> implements ShBugRepaireService{
	@SuppressWarnings("unused")
	private ShBugRepaireDao dao;
	
	public ShBugRepaireServiceImpl(ShBugRepaireDao dao) {
		super(dao);
		this.dao=dao;
	}

}