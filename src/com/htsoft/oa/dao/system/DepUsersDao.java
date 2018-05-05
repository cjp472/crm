package com.htsoft.oa.dao.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.DepUsers;

/**
 * @description 部门人员管理
 * @class DepUsersDao
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @createtime 2011-1-15AM
 * 
 */
public interface DepUsersDao extends BaseDao<DepUsers> {
	public List<DepUsers> findByDepartment(String path, PagingBean pb);

	/**
	 * @description 根据对应条件查询DepUsers信息
	 * @param path
	 *            路径
	 * @param depUsers
	 *            DepUsers对象
	 * @param pb
	 *            PagingBena分页
	 * @return List<DepUsers>
	 */
	List<DepUsers> search(String path, DepUsers depUsers, PagingBean pb);

	/**
	 * @description 根据userId查询该用户的所有部门信息
	 * @param userId
	 *            用户Id
	 * @return List<DepUsers>
	 */
	List<DepUsers> findByUserIdDep(Long userId);

	/**
	 * @description 根据userId查询该用户是否存在主部门
	 * @param depUserId
	 *            要修改的数据id
	 * @param userId
	 *            用户id
	 * @return 存在：true
	 */
	Boolean existsDep(Long depUserId, Long userId);

	/**
	 * @description 单纯的添加操作,同时判断是否添加相同的数据,返回:String
	 * @param depUsers
	 *            DepUsers对象
	 * @return String消息
	 */
	String add(DepUsers depUsers);
}