package com.htsoft.oa.service.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.OutMailDao;
import com.htsoft.oa.model.communicate.OutMail;
import com.htsoft.oa.service.communicate.OutMailService;

public class OutMailServiceImpl extends BaseServiceImpl<OutMail> implements OutMailService{
	private OutMailDao dao;
	
	public OutMailServiceImpl(OutMailDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<OutMail> findByFolderId(Long folderId){
		return dao.findByFolderId( folderId);
	}

	public Long CountByFolderId(Long folderId){
		return dao.CountByFolderId(folderId);
	}
	public Map getUidByUserId(Long userId){
		return dao.getUidByUserId(userId);
	}
	
}