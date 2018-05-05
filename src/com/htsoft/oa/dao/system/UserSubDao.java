package com.htsoft.oa.dao.system;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.UserSub;

/**
 * 
 * @author 
 *
 */
public interface UserSubDao extends BaseDao<UserSub>{
	
	/**
	 * 查找上属的ID
	 */
	public List<Long> upUser(Long userId);
	
	/**
	 * 查找已经是下属的ID列表
	 */
	public List<Long> subUsers(Long userId);
}