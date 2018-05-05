package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkKnowDingyueDao;
import com.ulane.know.model.know.UkKnowDingyue;
import com.ulane.know.service.know.UkKnowDingyueService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowDingyueServiceImpl extends BaseServiceImpl<UkKnowDingyue> implements UkKnowDingyueService{
	@SuppressWarnings("unused")
	private UkKnowDingyueDao dao;
	
	public UkKnowDingyueServiceImpl(UkKnowDingyueDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public UkKnowDingyue findByUserid(Long userid){
		return this.dao.findByUserid(userid);
	}

}