package com.htsoft.oa.dao.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.ReportParamDao;
import com.htsoft.oa.model.system.ReportParam;

public class ReportParamDaoImpl extends BaseDaoImpl<ReportParam> implements ReportParamDao{

	public ReportParamDaoImpl() {
		super(ReportParam.class);
	}

	@Override
	public List<ReportParam> findByRepTemp(Long reportId) {
		String hql="from ReportParam vo where vo.reportTemplate.reportId=? order by vo.sn asc";
		Object []objs={reportId};
		return findByHql(hql, objs);
	}

}