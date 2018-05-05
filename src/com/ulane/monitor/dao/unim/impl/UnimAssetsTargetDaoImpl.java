package com.ulane.monitor.dao.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.ResultSet;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.util.FillData;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.monitor.dao.unim.UnimAssetsTargetDao;
import com.ulane.monitor.model.unim.UnimAssetsTarget;
import com.ulane.monitor.model.unim.UnimChannelTarget;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimAssetsTargetDaoImpl extends BaseDaoImpl<UnimAssetsTarget> implements UnimAssetsTargetDao{

	public UnimAssetsTargetDaoImpl() {
		super(UnimAssetsTarget.class);
	}

	@Override
	public List<UnimAssetsTarget> findByParentId(Long assetsId) {
		String sql = "select * from UNIM_ASSETS_TARGET where ASSETS_ID="+assetsId;
		JdbcHelper callBack = new JdbcHelper();
		callBack.setSql(sql);
		logger.debug("sql : " + sql);

		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				return FillData.fillDataJDBC(rs, UnimAssetsTarget.class);
			}
		};
		callBack.setJdbcWork(sqlWork);
		return (List<UnimAssetsTarget>) getHibernateTemplate().execute(callBack);
	}

}