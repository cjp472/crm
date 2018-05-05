package com.htsoft.oa.dao.document;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.document.DocFolder;

/**
 * 
 * @author 
 *
 */
public interface DocFolderDao extends BaseDao<DocFolder>{
	
	/**
	 * 根据父节点来获取用户文件夹列表
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getUserFolderByParentId(Long userId,Long parentId);
	/**
	 * 根据父节点来获取所有子文件夹
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getPublicFolderByParentId(Long parentId);
	/**
	 * 取得某path下的所有Folder
	 * @param path
	 * @return
	 */
	public List<DocFolder> getFolderLikePath(String path);
	
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