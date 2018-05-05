package com.htsoft.oa.service.info.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.info.SuggestBoxDao;
import com.htsoft.oa.model.info.SuggestBox;
import com.htsoft.oa.service.info.SuggestBoxService;

public class SuggestBoxServiceImpl extends BaseServiceImpl<SuggestBox> implements SuggestBoxService{
	private SuggestBoxDao dao;
	
	public SuggestBoxServiceImpl(SuggestBoxDao dao) {
		super(dao);
		this.dao=dao;
	}

}