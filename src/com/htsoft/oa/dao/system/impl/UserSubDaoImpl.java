package com.htsoft.oa.dao.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.UserSubDao;
import com.htsoft.oa.model.system.UserSub;

public class UserSubDaoImpl extends BaseDaoImpl<UserSub> implements UserSubDao{

	public UserSubDaoImpl() {
		super(UserSub.class);
	}

	@Override
	public List<Long> upUser(Long userId) {
		String hql="from UserSub vo where vo.subAppUser.userId=?";
		Object[] objs={userId};
		List<UserSub> list=findByHql(hql, objs);
		List<Long> idList=new ArrayList<Long>();
		for(UserSub sb:list){
			idList.add(sb.getUserId());
		}
		return idList;
	}

	@Override
	public List<Long> subUsers(Long userId) {
		String hql="from UserSub vo where vo.userId=?";
		Object[] objs={userId};
		List<UserSub> list=findByHql(hql, objs);
		List<Long> idList=new ArrayList<Long>();
		for(UserSub sb:list){
			idList.add(sb.getSubAppUser().getUserId());
		}
		return idList;
	}

}