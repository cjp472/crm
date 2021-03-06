package com.htsoft.oa.service.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;
import java.util.Set;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.RelativeUser;

/**
 * @description 相对岗位人员管理
 * @author 优创融联科技
 * @company www.ulane.cn
 * @data 2010-12-13PM
 * 
 */
public interface RelativeUserService extends BaseService<RelativeUser> {

	/**
	 * @description 根据userId和jobUserId查询对应的数据，返回：满足条件数据的总行数
	 * @param userId
	 *            userId
	 * @param jobUserId
	 *            jobUserId
	 * @return AppUser 当前对象
	 */
	AppUser judge(Long userId, Long jobUserId);

	/**
	 * 返回某个用户相对岗位的所有用户（如他主管的所有人）
	 * 
	 * @param userId
	 *            用户ID
	 * @param reJobId
	 *            相对岗位ID
	 * @return
	 */
	List<AppUser> findByUserIdReJobId(Long userId, Long reJobId);

	/**
	 * @description 根据条件搜索
	 * @param appUserId
	 *            userId
	 * @param reJobId
	 *            对应相对岗位的编号
	 * @param pb
	 *            PagingBean
	 * @return List<RelativeUser>
	 */
	List<RelativeUser> list(Long appUserId, Long reJobId, PagingBean pb);
	
	/**
	 * 取得某个用户的相对岗位人员
	 * @param userId 用户ID
	 * @param reJobId  相对岗位ID
	 * @return
	 */
	public List<Long> getReJobUserIds(Long userId,Long reJobId);
	
	/**
	 * 取得某个用户的上级
	 */
	public Set<AppUser> getUpUser(Long userId);
}
