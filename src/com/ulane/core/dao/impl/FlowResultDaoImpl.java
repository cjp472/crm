package com.ulane.core.dao.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.core.dao.FlowResultDao;
import com.ulane.core.model.FlowResult;

@SuppressWarnings("unchecked")
public class FlowResultDaoImpl extends BaseDaoImpl<FlowResult> implements
		FlowResultDao {

	public FlowResultDaoImpl() {
		super(FlowResult.class);
	}

	public void updateFlowResultStatus(Long runid, String status) {
		String hql = "update FlowResult  set flowStatus='" + status
				+ "' where runId=" + runid;
		Query query = getSession().createQuery(hql);
		query.executeUpdate();
	}

	@Override
	public Integer getFlowResultCount(String node, Long runid) {
		ArrayList param = new ArrayList();
		param.add(runid);
		param.add(node);
		String hql = "select count(f.flowResultId) from FlowResult as f where f.runId=? and f.flowNode=?";
		Object obj = findUnique(hql, param.toArray());
		return new Integer(obj.toString());
	}

	@Override
	public List<FlowResult> getFlowResultPK(Long runid) {
		String hql = " from FlowResult where runId=?";
		List<FlowResult> list = findByHql(hql, new Object[] { runid });
		return list;
	}

	@Override
	public List<FlowResult> getFlowResultMap(String flowType, String node,
			String approveStatus) {
		ArrayList<String> param = new ArrayList<String>();
		param.add(flowType);

		String hql = " from FlowResult where flowType=?";
		if (node != null) {
			hql += "and flowNode=?";
			param.add(node);
		}
		if (approveStatus != null && !"全部".equals(approveStatus)) {
			hql += " and flowStatus=?";
			param.add(approveStatus);
		}
		List<FlowResult> list = findByHql(hql, param.toArray());
		return list;
	}

	@Override
	public void deleteFlowResultInfo(Long runid) {
		String hql = "delete from FlowResult where runId=" + runid;
		Query query = getSession().createQuery(hql);
		query.executeUpdate();

	}

}