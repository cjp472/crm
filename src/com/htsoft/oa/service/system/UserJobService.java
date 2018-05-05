package com.htsoft.oa.service.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.UserJob;

/**
 * @description 员工职位管理
 * @class UserJobService
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @createtime 2011-1-12PM
 * 
 */
public interface UserJobService extends BaseService<UserJob> {

	/**
	 * @description 根据userId判断该用户是否存在主职位
	 * @param userJobId
	 *            当前数据对应的userJobId
	 * @param userId
	 *            用户id
	 * @return 存在：true
	 */
	Boolean IsExistsjob(Long userJobId, Long userId);

	/**
	 * @description 根据userId查询对应的所有职位信息
	 * @param userId
	 *            用户id
	 * @return List<UserJob>
	 */
	List<UserJob> findByUserIdJobs(Long userId);

	/**
	 * @description 添加数据操作，同时判断是否添加相同数据，返回:String
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
	 * 取得用户列表
	 * @param jobId
	 * @return
	 */
	public List<AppUser> getUsersByJobId(Long jobId);
}
