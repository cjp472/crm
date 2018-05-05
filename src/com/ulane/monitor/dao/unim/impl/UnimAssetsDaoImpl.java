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
import com.ulane.monitor.dao.unim.UnimAssetsDao;
import com.ulane.monitor.model.unim.UnimAssets;
import com.ulane.monitor.model.unim.UnimChannel;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UnimAssetsDaoImpl extends BaseDaoImpl<UnimAssets> implements UnimAssetsDao{

	public UnimAssetsDaoImpl() {
		super(UnimAssets.class);
	}
//	@Override
//	public List<UnimAssets> listGeneralUnimAssets() {
//		String hql = "from UnimAssets t";
//		List result = this.findByHql(hql);
//		return result;
//	}
	
	@Override
	public List<UnimAssets> listGeneralUnimAssets() throws Exception {
			String sql = "select * from UNIM_ASSETS ";
			JdbcHelper callBack = new JdbcHelper();
			callBack.setSql(sql);
			logger.debug("sql : " + sql);

			JdbcWork sqlWork = new JdbcWork() {
				@Override
				public Object fillData(ResultSet rs) {
					return FillData.fillDataJDBC(rs, UnimAssets.class);
				}
			};
			callBack.setJdbcWork(sqlWork);
			return (List<UnimAssets>) getHibernateTemplate().execute(callBack);			
	}
	
	@Override
	public List<UnimAssets> listMonitorUnimAssets(Long id) throws Exception {
		if(null!=id) {
			String sql = "select a.* from UNIM_ASSETS a where a.assets_id in" +
					" (select b.assets_id from  UNIM_ASSETS_MAP_MON b where b.agent_id="+id+")";
			JdbcHelper callBack = new JdbcHelper();
			callBack.setSql(sql);
			logger.debug("sql : " + sql);

			JdbcWork sqlWork = new JdbcWork() {
				@Override
				public Object fillData(ResultSet rs) {
					return FillData.fillDataJDBC(rs, UnimAssets.class);
				}
			};
			callBack.setJdbcWork(sqlWork);
			return (List<UnimAssets>) getHibernateTemplate().execute(callBack);			
		}
		return null;
	}

}