package com.htsoft.oa.dao.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.UserJobDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.UserJob;

/**
 * @description 职工人员管理
 * @class UserJobDaoImpl
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @data 2011-1-11PM
 * 
 */
@SuppressWarnings("unchecked")
public class UserJobDaoImpl extends BaseDaoImpl<UserJob> implements UserJobDao {

	public UserJobDaoImpl() {
		super(UserJob.class);
	}

	/**
	 * 根据userId判断该用户是否存在主职位，存在：true
	 */
	@Override
	public Boolean IsExistsjob(Long userJobId, Long userId) {
		StringBuffer hql = new StringBuffer(
				"select u from UserJob u where u.isMain = 1 and u.appUser.userId = ? ");
		if (userJobId != null && !userJobId.equals(""))// sql
			hql.append("and u.userJobId not in(" + userJobId + ") ");
		Object[] paramList = { userId };
		List<UserJob> list = findByHql(hql.toString(), paramList);
		logger.debug("自定义[UserJobImpl]:" + hql);
		return list != null && list.size() > 0 ? true : false;
	}

	/**
	 * 根据userId查询对应的所有职位
	 */
	@Override
	public List<UserJob> findByUserIdJobs(Long userId) {
		String hql = "select u from UserJob u where u.appUser.userId = ? ";
		Object[] paramList = { userId };
		return findByHql(hql, paramList);
	}

	/**
	 * 添加数据操作，同时判断是否添加相同数据
	 */
	@Override
	public String add(UserJob userJob) {
		String msg = "{success:true,msg:'数据操作成功！'}";
		String hql = "select u from UserJob u where u.appUser.userId = ? and u.job.jobId = ? ";
		Object[] paramList = { userJob.getAppUser().getUserId(),
				userJob.getJob().getJobId() };
		List<UserJob> list = findByHql(hql, paramList);
		if (list != null && list.size() > 0)
			msg = "{failure:true,msg:'对不起，该用户["
					+ userJob.getAppUser().getUsername() + "]已经添加了该职位["
					+ userJob.getJob().getJobName() + "]！'}";
		else
			save(userJob);
		return msg;
	}

	/**
	 * 取得某个岗位的所有的人员
	 * 
	 * @param jobId
	 * @return
	 */
	public List<Long> getUserIdsByJobId(Long jobId) {
		String hql = "select u.appUser.userId from UserJob u where u.job.jobId=?";
		List userIds = findByHql(hql, new Object[] { jobId });
		return userIds;
	}
	
	/**
	 * 取得用户列表
	 * @param jobId
	 * @return
	 */
	public List<AppUser> getUsersByJobId(Long jobId){
		String hql="select u.appUser from UserJob u where u.job.jobId=?";
		List list=findByHql(hql, new Object[]{jobId});
		return list;
	}

}