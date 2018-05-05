package com.htsoft.oa.dao.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.UserJob;

/**
 * @description 员工职位管理
 * @class UserJobDao
 * @author 优创融联科技
 * @updater YHZ
 * @createtime 2011-1-12PM
 * 
 */
public interface UserJobDao extends BaseDao<UserJob> {

	/**
	 * @description 根据userId查询该员工是否存在主职位
	 * @param userJobId
	 *            当前数据对应的userJobId
	 * @param userId
	 *            用户id
	 * @return 存在:true
	 */
	Boolean IsExistsjob(Long userJobId, Long userId);

	/**
	 * @description 根据userId查询该用户的所有职位
	 * @param userId
	 *            用户id
	 * @return List<UserJob>
	 */
	List<UserJob> findByUserIdJobs(Long userId);

	/**
	 * @description 添加数据操作判断是否添加相同数据,返回：String
	 * @param userJob
	 *            UserJob对象
	 * @return String
	 */
	String add(UserJob userJob);
	
	/**
	 * 取得某个岗位的所有的人员
	 * @param jobId
	 * @return
	 */
	public List<Long> getUserIdsByJobId(Long jobId);
	
	/**
	 * 
	 * @param jobId
	 * @return
	 */
	public List<AppUser> getUsersByJobId(Long jobId);

}