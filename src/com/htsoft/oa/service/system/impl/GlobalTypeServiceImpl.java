package com.htsoft.oa.service.system.impl;

/*
 *  北京优创融联科技有限公司企业管理平台   -- http://www.ulane.cn
 *  Copyright (C) 2008-20010 Beijing Ulane Technology Co., LTD
 */
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.GlobalTypeDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.GlobalType;
import com.htsoft.oa.service.system.GlobalTypeService;

public class GlobalTypeServiceImpl extends BaseServiceImpl<GlobalType>
		implements GlobalTypeService {
	private GlobalTypeDao dao;

	public GlobalTypeServiceImpl(GlobalTypeDao dao) {
		super(dao);
		this.dao = dao;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.htsoft.ent.service.system.GlobalTypeService#getByParentIdCatKey(java
	 * .lang.Long, java.lang.String)
	 */
	public List<GlobalType> getByParentIdCatKey(Long parentId, String catKey) {
		return dao.getByParentIdCatKey(parentId, catKey);
	}

	@Override
	public Integer getCountsByParentId(Long parentId) {
		return dao.getCountsByParentId(parentId);
	}

	/**
	 * 删除分类，同时删除其下所有子子分类
	 * 
	 * @param parentId
	 */
	public void mulDel(Long proTypeId) {
		GlobalType globalType = get(proTypeId);
		dao.evict(globalType);

		List<GlobalType> subList = dao.getByPath(globalType.getPath());

		for (GlobalType gt : subList) {
			dao.remove(gt);
		}

	}

	@Override
	public List<GlobalType> getByParentIdCatKeyUserId(Long parentId,
			String catKey, Long userId) {
		return dao.getByParentIdCatKeyUserId(parentId, catKey, userId);
	}

	@Override
	public List<GlobalType> getByRightsCatKey(AppUser curUser, String catKey) {
		return dao.getByRightsCatKey(curUser, catKey);
	}

	@Override
	public List<GlobalType> getByCatKeyUserId(AppUser curUser,String catKey) {
		List<GlobalType> typeList = null;
		if (curUser.isSupperManage()) // 假如是超级管理员,则有全部权限
			typeList = getByParentIdCatKey(new Long(0l), catKey);
		else
			typeList = getByRightsCatKey(curUser, catKey);
		List<GlobalType> record = new ArrayList<GlobalType>();
		for (GlobalType type : typeList) {
			if (!record.contains(type)) {
				evict(type);
				String str = "";
				for (int i = 0; i < type.getDepth(); i++) {
					str += "—";
				}
				type.setTypeName(str + type.getTypeName());
				record.add(type);
				getTypeByRights(type.getProTypeId(), catKey, record);
			}
		}
		return record;
	}

	private void getTypeByRights(Long parentId, String catKey,
			List<GlobalType> record) {
		List<GlobalType> typeList = getByParentIdCatKey(parentId, catKey);
		for (GlobalType type : typeList) {
			if (!record.contains(type)) { 
				evict(type);
				String str = "";
				for (int i = 0; i < type.getDepth(); i++) {
					str += "—";
				}
				type.setTypeName(str + type.getTypeName());
				record.add(type);
				getTypeByRights(type.getProTypeId(), catKey, record);
			} else
				System.out.print("已经存在" + type.getTypeName());
		}
	}

}