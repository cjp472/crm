package com.htsoft.oa.dao.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.SysConfigDao;
import com.htsoft.oa.model.system.SysConfig;

public class SysConfigDaoImpl extends BaseDaoImpl<SysConfig> implements SysConfigDao{

	public SysConfigDaoImpl() {
		super(SysConfig.class);
	}

	@Override
	public SysConfig findByKey(String key) {
		String hql="from SysConfig vo where vo.configKey=?";
		Object[] objs={key};
		List<SysConfig> list=findByHql(hql, objs);
		if(list.size()>0)
		return (SysConfig)list.get(0);
		else return null;
	}

	@Override
	public List<SysConfig> findConfigByTypeKey(String typeKey) {
		String hql="from SysConfig vo where vo.typeKey=?";
		Object[] objs={typeKey};
		return findByHql(hql, objs);
	}

	@Override
	public List findTypeKeys() {
		String sql="select vo.typeKey from SysConfig vo group by vo.typeKey";
		Query query=getSession().createQuery(sql);
		return query.list();
	}
}