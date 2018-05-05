package com.htsoft.oa.dao.hrm.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.JobDao;
import com.htsoft.oa.model.hrm.Job;

/**
 * @description 岗位管理
 * @class JobDaoImpl
 * @author YHZ
 * @company www.ulane.cn
 * @data 2010-12-22PM
 * 
 */
@SuppressWarnings("unchecked")
public class JobDaoImpl extends BaseDaoImpl<Job> implements JobDao {

	public JobDaoImpl() {
		super(Job.class);
	}

	@Override
	public List<Job> findByDep(Long jobId) {
		String hql = "from Job vo where vo.jobId=?";
		Object[] objs = { jobId};
		return findByHql(hql, objs);
	}

	/**
	 * 根据parentId查询对应的数据加载tree
	 */
	@Override
	public List<Job> findByCondition(Long parentId) {
		StringBuffer sb = new StringBuffer(
				"select j from Job j where j.delFlag = 0 and j.parentId = ? ");
		ArrayList<Object> paramList = new ArrayList<Object>();
		paramList.add(parentId);
		return findByHql(sb.toString(), paramList.toArray());
	}

	/**
	 * 编辑
	 */
	@Override
	public void edit(Job job) {
		String hql = "update Job set jobName=?,memo=?,delFlag=? where jobId = ?";
		Query query = getSession().createQuery(hql);
		query.setString(0, job.getJobName());
		query.setString(1, job.getMemo());
		query.setShort(2, job.getDelFlag());
		query.setLong(3, job.getJobId());
		logger.debug("JobDao中[修改岗位信息jobName,memo,delFlag]：" + hql);
		query.executeUpdate();
	}

}