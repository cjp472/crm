package com.htsoft.oa.dao.system;
/*
 *  北京优创融联科技有限公司企业管理平台   -- http://www.ulane.cn
 *  Copyright (C) 2008-20010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.GlobalType;

/**
 * 
 * @author 
 *
 */
public interface GlobalTypeDao extends BaseDao<GlobalType>{
	/**
	 * 取得某种分类下的子结点列表
	 * @param parentId
	 * @param catKey
	 * @return
	 */
	public List<GlobalType> getByParentIdCatKey(Long parentId,String catKey);
	/**
	 * 取得某种分类下某个用户的子结点列表
	 * @param parentId
	 * @param catKey
	 * @return
	 */
	public List<GlobalType> getByParentIdCatKeyUserId(Long parentId,String catKey,Long userId);
	/**
	 * 取得该分类下的数目
	 * @param parentId
	 * @return
	 */
	public Integer getCountsByParentId(Long parentId);
	
	/**
	 * 取得该分类下的所有子分类
	 * @param parentId
	 * @return
	 */
	public List<GlobalType> getByParentId(Long parentId);
	
	/**
	 * 
	 * @param path
	 * @return
	 */
	public List<GlobalType> getByPath(String path);

	/**
	 * 根据分类名称查找
	 * @param mapName
	 * @return
	 */
	public GlobalType findByTypeName(String typeName);
	/**
	 * 根据当前用户权限产生流程分类树
	 * @param curUser
	 * @param catKey
	 * @return
	 */
	public List<GlobalType> getByRightsCatKey(AppUser curUser, String catKey);
	
}