package com.htsoft.oa.service.system;

/*
 *  北京优创融联科技有限公司企业管理平台   -- http://www.ulane.cn
 *  Copyright (C) 2008-20010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.GlobalType;

public interface GlobalTypeService extends BaseService<GlobalType> {
	/**
	 * 取得某种分类下的子结点列表
	 * 
	 * @param parentId
	 * @param catKey
	 * @return
	 */
	public List<GlobalType> getByParentIdCatKey(Long parentId, String catKey);

	/**
	 * 取得某种分类下某个用户的子结点列表
	 * 
	 * @param parentId
	 * @param catKey
	 * @return
	 */
	public List<GlobalType> getByParentIdCatKeyUserId(Long parentId,
			String catKey, Long userId);

	/**
	 * 取得该分类下的数目
	 * 
	 * @param parentId
	 * @return
	 */
	public Integer getCountsByParentId(Long parentId);

	/**
	 * 删除分类，同时删除其下所有子子分类
	 * 
	 * @param parentId
	 */
	public void mulDel(Long parentId);

	/**
	 * 根据当前用户权限产生流程分类树
	 * 
	 * @param curUser
	 * @param catKey
	 * @return
	 */
	public List<GlobalType> getByRightsCatKey(AppUser curUser, String catKey);

	/**
	 * @description 根据当前用户权限产生流程分类树
	 * @param curUser
	 * @param catKey
	 * @return
	 */
	List<GlobalType> getByCatKeyUserId(AppUser curUser,String catKey);
}
