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
import com.ulane.monitor.dao.unim.UnimChannelTargetDao;
import com.ulane.monitor.model.unim.UnimChannelTarget;
import com.ulane.supply.model.goods.ScGoods;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimChannelTargetDaoImpl extends BaseDaoImpl<UnimChannelTarget> implements UnimChannelTargetDao{

	public UnimChannelTargetDaoImpl() {
		super(UnimChannelTarget.class);
	}

	@Override
	public List<UnimChannelTarget> findByParentId(Long channelId) {
		String sql = "select * from UNIM_CHANNEL_TARGET where CHANNEL_ID="+channelId;
		JdbcHelper callBack = new JdbcHelper();
		callBack.setSql(sql);
		logger.debug("sql : " + sql);

		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				return FillData.fillDataJDBC(rs, UnimChannelTarget.class);
			}
		};
		callBack.setJdbcWork(sqlWork);
		return (List<UnimChannelTarget>) getHibernateTemplate().execute(callBack);
	}

}