package com.ulane.base.dao.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.base.model.xitong.UlUsergroup;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UlUsergroupDao extends BaseDao<UlUsergroup>{
	/**
	 * @description 根据parentId条件查询
	 * @param parentId
	 *            父节点Id
	 * @return List<Job>
	 */
	List<UlUsergroup> findByCondition(Long parentId);
	
	public List<UlUsergroup> findByParentId(Long parentId);
	public List<UlUsergroup> findByUsergroupName(String usergroupName);
	public List<UlUsergroup> findByPath(String path);
	
	/**
	 * 取得该用户所在用户组下的所有用户的内码
	 * @param userId
	 * @return
	 */
	public String getCurrentGroupUserIDS(Long deptId);
	
	/**
	 * 取得该用户所在部门下的所有用户的工号
	 * @param deptId
	 * @return
	 */
	public String getCurrentGroupUserNOS(Long deptId);
}