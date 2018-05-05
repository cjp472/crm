package com.htsoft.oa.service.document.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.document.DocFolderDao;
import com.htsoft.oa.model.document.DocFolder;
import com.htsoft.oa.service.document.DocFolderService;

public class DocFolderServiceImpl extends BaseServiceImpl<DocFolder> implements DocFolderService{
	private DocFolderDao dao;
	
	public DocFolderServiceImpl(DocFolderDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public List<DocFolder> getUserFolderByParentId(Long userId,Long parentId){
		return dao.getUserFolderByParentId(userId, parentId);
	}
	
	/**
	 * 取得某path下的所有Folder
	 * @param path
	 * @return
	 */
	public List<DocFolder> getFolderLikePath(String path){
		return dao.getFolderLikePath(path);
	}

	@Override
	public List<DocFolder> getPublicFolderByParentId(Long parentId) {
		return dao.getPublicFolderByParentId( parentId);
	}

	@Override
	public List<DocFolder> findByParentId(Long parentId) {
		
		return dao.findByParentId(parentId);
	}

	@Override
	public List<DocFolder> findByUserAndName(Long userId, String foleName) {
		return dao.findByUserAndName(userId, foleName);
	}

	@Override
	public List<DocFolder> getOnlineFolderByParentId(Long parentId) {
		return dao.getOnlineFolderByParentId(parentId);
	}

}