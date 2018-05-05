package com.htsoft.oa.service.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.UserJobDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.UserJob;
import com.htsoft.oa.service.system.UserJobService;

/**
 * @description 员工职位管理
 * @class UserJobServiceImpl
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @createtime 2011-1-11PM
 * 
 */
public class UserJobServiceImpl extends BaseServiceImpl<UserJob> implements
		UserJobService {
	private UserJobDao dao;

	public UserJobServiceImpl(UserJobDao dao) {
		super(dao);
		this.dao = dao;
	}

	/**
	 * 根据userId查询该用户是否存在主职位,存在:true
	 */
	@Override
	public Boolean IsExistsjob(Long userJobId, Long userId) {
		return dao.IsExistsjob(userJobId, userId);
	}

	/**
	 * 根据userId查询对应的所有职位信息
	 */
	@Override
	public List<UserJob> findByUserIdJobs(Long userId) {
		return dao.findByUserIdJobs(userId);
	}

	/**
	 * 添加数据操作，同时判断是否存在相同数据
	 */
	@Override
	public String add(UserJob userJob) {
		return dao.add(userJob);
	}
	
	/**
	 * 取得某个岗位的所有的人员
	 * @param jobId
	 * @return
	 */
	public List<Long> getUserIdsByJobId(Long jobId){
		return dao.getUserIdsByJobId(jobId);
	}
	
	/**
	 * 取得用户列表
	 * @param jobId
	 * @return
	 */
	public List<AppUser> getUsersByJobId(Long jobId){
		return dao.getUsersByJobId(jobId);
	}

}