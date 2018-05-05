package com.htsoft.oa.dao.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.RelativeJobDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.RelativeJob;

/**
 * @description 相对岗位管理
 * @author 优创融联科技
 * @company www.ulane.cn
 * @data 2010-12-13AM
 */
@SuppressWarnings("unchecked")
public class RelativeJobDaoImpl extends BaseDaoImpl<RelativeJob> implements RelativeJobDao {

	public RelativeJobDaoImpl() {
		super(RelativeJob.class);
	}

	/**
	 * 方法重写，添加：根据id查询
	 */
	@Override
	public void remove(Long id) {
		String hql = "delete from RelativeJob r where r.path like ? ";
		Query query = getSession().createQuery(hql);
		query.setString(0, get(id).getPath() + "%");
		logger.debug(hql);
		query.executeUpdate();
	}

	/**
	 * 根据parentId查询对应的父节点信息
	 */
	@Override
	public List<RelativeJob> findByParentId(Long parentId) {
		String hql = "select r from RelativeJob r where r.parent = ? ";
		Object[] paramList = { parentId};
		return findByHql(hql, paramList);
	}
	
}