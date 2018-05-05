package com.htsoft.oa.service.document;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.document.DocFolder;

public interface DocFolderService extends BaseService<DocFolder>{
	/**
	 * 按父Id取得某目录下的所有子文件夹
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getUserFolderByParentId(Long userId,Long parentId);
	
	/**
	 * 取得某path下的所有Folder
	 * @param path
	 * @return
	 */
	public List<DocFolder> getFolderLikePath(String path);
	/**
	 * 获取公共文件夹
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getPublicFolderByParentId(Long parentId);
	/**
	 * 查找目录下的子目录 
	 */
	public List<DocFolder> findByParentId(Long parentId);
	/**
	 * 根据用户和名字查找
	 */
	public List<DocFolder> findByUserAndName(Long userId,String foleName);
	/**
	 * 根据父节点查找在线文件夹
	 */
	public List<DocFolder> getOnlineFolderByParentId(Long parentId);
}


