package com.htsoft.oa.dao.communicate.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.communicate.OutMailUserSetingDao;
import com.htsoft.oa.model.communicate.OutMailUserSeting;

/**
 * @description 外部邮箱设置管理
 * @class OutMailUserSetingDaoImpl
 * @extend BaseDaoImpl
 */
@SuppressWarnings("unchecked")
public class OutMailUserSetingDaoImpl extends BaseDaoImpl<OutMailUserSeting>
		implements OutMailUserSetingDao {

	public OutMailUserSetingDaoImpl() {
		super(OutMailUserSeting.class);
	}

	/*
	 * 根据当前登陆人，取得外部邮箱设置
	 */
	@Override
	public OutMailUserSeting getByLoginId(Long loginid) {
		String hql = "select a from OutMailUserSeting a where a.appUser.userId ="
				+ loginid;
		List<OutMailUserSeting> loginList = getHibernateTemplate().find(hql);
		return (loginList != null && loginList.size() > 0) ? (OutMailUserSeting) loginList
				.get(0)
				: null;
	}

	@Override
	public List findByUserAll() {
		String hql = "select au,vo from OutMailUserSeting au right join au.appUser vo where vo.delFlag = 0";
		return findByHql(hql);
	}

	@Override
	public List<OutMailUserSeting> findByUserAll(String userName,PagingBean pb) {
		List params=new ArrayList();
		String hql = "select au from OutMailUserSeting au right join au.appUser vo where vo.delFlag = 0";
		if(StringUtils.isNotEmpty(userName)){
			hql +="and vo.fullname like ?";
			params.add("%"+userName+"%");
		}
		return findByHql(hql,params.toArray(),pb);
	}
	
}