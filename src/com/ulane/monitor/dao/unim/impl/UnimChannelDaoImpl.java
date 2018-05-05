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
import com.ulane.monitor.dao.unim.UnimChannelDao;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.model.unim.UnimChannelTarget;
import com.ulane.monitor.model.unim.UnimMonitorAgent;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimChannelDaoImpl extends BaseDaoImpl<UnimChannel> implements UnimChannelDao{

	public UnimChannelDaoImpl() {
		super(UnimChannel.class);
	}

	@Override
	public List<UnimChannel> listGeneralChannels() {
//		String hql = "from UnimChannel t";
//		List result = this.findByHql(hql);
//		return result;
		
		String sql = "select * from unim_channel";
		JdbcHelper callBack = new JdbcHelper();
		callBack.setSql(sql);
		logger.debug("sql : " + sql);

		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				return FillData.fillDataJDBC(rs, UnimChannel.class);
			}
		};
		callBack.setJdbcWork(sqlWork);
		return (List<UnimChannel>) getHibernateTemplate().execute(callBack);		
	}

	@Override
	public List<UnimChannel> listMonitorChannels(Long id) throws Exception {
		if(null!=id) {
			String sql = "select * from UNIM_CHANNEL c where exists(select 'X' from UNIM_CHAL_MAP_MON uc where c.channel_id=uc.channel_id and uc.agent_id="+id+")";
			JdbcHelper callBack = new JdbcHelper();
			callBack.setSql(sql);
			logger.debug("sql : " + sql);

			JdbcWork sqlWork = new JdbcWork() {
				@Override
				public Object fillData(ResultSet rs) {
					return FillData.fillDataJDBC(rs, UnimChannel.class);
				}
			};
			callBack.setJdbcWork(sqlWork);
			return (List<UnimChannel>) getHibernateTemplate().execute(callBack);			
		}
		return null;
	}

}