package com.htsoft.oa.service.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Set;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.UserSub;

public interface UserSubService extends BaseService<UserSub>{
	/**
	 *  查找所有上属IDs
	 */
	public Set<Long> findAllUpUser(Long userId);
	
	/**
	 * 查找已经是下属的ID列表
	 */
	public List<Long> subUsers(Long userId);
	
	/**
	 * 查找上一级的ID
	 */
	public List<Long> upUser(Long userId);
	
}


