package com.htsoft.oa.service.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.UserSubDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.UserSub;
import com.htsoft.oa.service.system.UserSubService;

public class UserSubServiceImpl extends BaseServiceImpl<UserSub> implements UserSubService{
	private UserSubDao dao;
	
	public UserSubServiceImpl(UserSubDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Set<Long> findAllUpUser(Long userId) {
		List<Long> list=dao.upUser(userId);
		Set<Long> set=new HashSet<Long>();
		for(Long l:list){
			set.add(l);
			List<Long> newlist=dao.upUser(l);
			Set<Long> sets=new HashSet<Long>();
			for(Long lon:newlist){
				set.add(lon);
				sets.add(lon);
			}
			findUp(set,sets);
		}
		return set;
	}
	/**
	 * 
	 * @param setNew 储存上一级ID
	 * @param setOld 储存ID
	 * @return
	 */
	
	public void findUp(Set<Long> setOld,Set<Long> setNew){
		Iterator<Long> it=setNew.iterator();
		while(it.hasNext()){
			Long userId=it.next();
			List<Long> newlist=dao.upUser(userId);
			setOld.add(userId);
			Set<Long> set=new HashSet<Long>();
			for(Long lon:newlist){
				if(!setOld.contains(lon)){
				  set.add(lon);
				}
			}
			findUp(setOld,set);
		}
   }

	@Override
	public List<Long> subUsers(Long userId) {
		return dao.subUsers(userId);
	}

	@Override
	public List<Long> upUser(Long userId) {
		return dao.upUser(userId);
	}

}