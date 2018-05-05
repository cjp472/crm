package com.htsoft.oa.service.communicate.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.OutMailFolderDao;
import com.htsoft.oa.model.communicate.MailFolder;
import com.htsoft.oa.model.communicate.OutMailFolder;
import com.htsoft.oa.service.communicate.OutMailFolderService;

public class OutMailFolderServiceImpl extends BaseServiceImpl<OutMailFolder> implements OutMailFolderService{
	private OutMailFolderDao dao;
	
	public OutMailFolderServiceImpl(OutMailFolderDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public List<OutMailFolder> getAllUserFolderByParentId(Long userId,
			Long parentId) {
		return dao.getAllUserFolderByParentId(userId,parentId);
	}
	@Override
	public List<OutMailFolder> getUserFolderByParentId(Long userId,Long parentId){
		return dao.getUserFolderByParentId(userId,parentId);
	}
	@Override
	public List<OutMailFolder> getFolderLikePath(String path){
		return dao.getFolderLikePath(path);
	}

}