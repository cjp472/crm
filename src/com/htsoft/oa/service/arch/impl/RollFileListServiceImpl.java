package com.htsoft.oa.service.arch.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.arch.RollFileListDao;
import com.htsoft.oa.model.arch.RollFileList;
import com.htsoft.oa.service.arch.RollFileListService;

public class RollFileListServiceImpl extends BaseServiceImpl<RollFileList> implements RollFileListService{
	private RollFileListDao dao;
	
	public RollFileListServiceImpl(RollFileListDao dao) {
		super(dao);
		this.dao=dao;
	}

}