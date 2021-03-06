package com.htsoft.oa.dao.flow.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.flow.ProcessRunDao;
import com.htsoft.oa.model.flow.ProcessRun;

/**
 * @description 运行中的流程管理
 * @class ProcessRunDaoImpl
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @data 2010-12-28PM
 * 
 */
@SuppressWarnings("unchecked")
public class ProcessRunDaoImpl extends BaseDaoImpl<ProcessRun> implements
		ProcessRunDao {

	public ProcessRunDaoImpl() {
		super(ProcessRun.class);
	}

	/**
	 * get ProcessRun by PiId
	 * 
	 * @param piId
	 * @return
	 */
	public ProcessRun getByPiId(String piId) {
		String hql = "from ProcessRun pr where pr.piId=?";
		return (ProcessRun) findUnique(hql, new Object[] { piId });
	}

	/**
	 * ProcessRun
	 * 
	 * @param defId
	 * @param pb
	 * @return
	 */
	public List<ProcessRun> getByDefId(Long defId, PagingBean pb) {
		String hql = " from ProcessRun pr where pr.proDefinition.defId=? ";
		return findByHql(hql, new Object[] { defId }, pb);
	}

	/**
	 * 按标题模糊查询某个用户所参与的流程列表
	 * 
	 * @param userId
	 * @param processName
	 * @param pb
	 * @return
	 */
	public List<ProcessRun> getByUserIdSubject(Long userId, String subject,
			PagingBean pb) {

		ArrayList params = new ArrayList();
		String hql = "select pr from ProcessRun as pr join pr.processForms as pf where pf.creatorId=? group by pr.runId order by pr.createtime desc";
		params.add(userId);
		if (StringUtils.isNotEmpty(subject)) {
			hql += " and pr.subject like ?";
			params.add("%" + subject + "%");
		}

		return findByHql(hql, params.toArray(), pb);
	}

	/**
	 * 根据流程定义Id查询对应的数据，如果存在：true
	 */
	@Override
	public boolean checkRun(Long defId) {
		String hql = "select r from ProcessRun r where r.proDefinition.defId = ?";
		Object[] paramList = { defId };
		List<ProcessRun> list = findByHql(hql, paramList);
		return list != null && list.size() > 0 ? true : false;
	}

	@Override
	public List<ProcessRun> getProcessRunning(Long defId) {
		String hql = "from ProcessRun r where r.proDefinition.defId = ? and r.runStatus=1";
		Object[] paramList = { defId };
		return findByHql(hql,paramList);
	}
	
}