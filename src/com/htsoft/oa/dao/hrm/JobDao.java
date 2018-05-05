package com.htsoft.oa.dao.hrm;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.hrm.Job;

/**
 * @description 岗位管理
 * @class JobDao
 * @company www.ulane.cn
 * @author YHZ
 * @data 2010-12-22PM
 * 
 */
public interface JobDao extends BaseDao<Job> {

	/**
	 * @author lyy
	 * @param depId
	 *            根据部门的ID来查找部门下面的职位
	 * @return
	 */
	public List<Job> findByDep(Long depId);

	/**
	 * @description 根据parentId条件查询
	 * @param parentId
	 *            父节点Id
	 * @return List<Job>
	 */
	List<Job> findByCondition(Long parentId);

	/**
	 * @description 修改Job中的jobName，memo,delFlag数据
	 * @param job
	 *            Job对象
	 */
	void edit(Job job);
}