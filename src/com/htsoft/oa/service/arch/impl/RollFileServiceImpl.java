package com.htsoft.oa.service.arch.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.arch.RollFileDao;
import com.htsoft.oa.model.arch.RollFile;
import com.htsoft.oa.service.arch.RollFileService;

public class RollFileServiceImpl extends BaseServiceImpl<RollFile> implements RollFileService{
	private RollFileDao dao;
	
	public RollFileServiceImpl(RollFileDao dao) {
		super(dao);
		this.dao=dao;
	}

}