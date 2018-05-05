package com.htsoft.oa.dao.system.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.RegionDao;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.util.SqlBuilder;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;

public class RegionDaoImpl extends BaseDaoImpl<Region> implements RegionDao {

	public RegionDaoImpl() {
		super(Region.class);
	}

	/**
	 * 查出所有的省份
	 */
	@Override
	public List<Region> getProvince() {
		Long parentId = 0l;
		String hql = "from Region r where r.parentId = ? order by r.regionId asc";   
		return findByHql(hql, new Object[] { parentId });
	}

	/**
	 * 根据省份的ID查出该省所有的市
	 */
	@Override
	public List<Region> getCity(Long regionId) {
		String hql = "from Region r where r.parentId = ? order by r.regionId asc";
		return findByHql(hql, new Object[] { regionId });
	}

	@Override
	public String getChildrenStoreData(Long region, Integer type) {
		JdbcHelper helper = new JdbcHelper();
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("REGIONID, REGIONNAME");
		SqlBuilder.FROM("REGION");
		SqlBuilder.WHERE("PARENTID = ?");
		helper.addPara(region);
		SqlBuilder.WHERE("REGIONTYPE = ?");
		helper.addPara(type);
		String sql = SqlBuilder.SQL();
		helper.setSql(sql);
		logger.debug("sql : " + sql);

		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				StringBuffer buff = new StringBuffer("[");
				try {
					while (rs.next()) {
						buff.append("['" + rs.getLong("REGIONID") + "','"
								+ rs.getString("REGIONNAME") + "'],");
					}
					if (buff.length() != 1) {
						buff.deleteCharAt(buff.length() - 1);
					}
					buff.append("]");
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return buff.toString();
			}
		};
		helper.setJdbcWork(sqlWork);
		return (String) getHibernateTemplate().execute(helper);
	}

	@Override
	public List<Region> getChildrenByType(Integer type) {
		JdbcHelper helper = new JdbcHelper();
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("REGIONID, REGIONNAME");
		SqlBuilder.FROM("REGION");
		if (type > 0) {
			SqlBuilder.WHERE("REGIONTYPE = ?");
			helper.addPara(type);
		}
		String sql = SqlBuilder.SQL();
		helper.setSql(sql);
		logger.debug("sql : " + sql);

		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				List<Region> result = new ArrayList<Region>();
				try {
					while (rs.next()) {
						Region r = new Region();
						r.setRegionId(rs.getLong("REGIONID"));
						r.setRegionName(rs.getString("REGIONNAME"));
						r.setRegionType(rs.getShort("REGIONTYPE"));
						r.setAreaNo(rs.getString("AREANO"));
						result.add(r);
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return result;
			}
		};
		helper.setJdbcWork(sqlWork);
		return (List<Region>) getHibernateTemplate().execute(helper);
	}

	@Override
	public List<Region> getDetailChildrenByType(Integer start, Integer limit) {

		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("*");
		SqlBuilder.FROM("region_detail");
		String sql = SqlBuilder.SQL();

		JdbcWork getdata = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				List<Region> result = new ArrayList<Region>();
				try {
					while (rs.next()) {
						Region r = new Region();
						r.setRegionId(rs.getLong("REGIONID"));
						r.setRegionName(rs.getString("REGIONNAME"));
						r.setRegionType(rs.getShort("REGIONTYPE"));
						r.setAreaNo(rs.getString("AREANO"));
						r.setParentName(rs.getString("PARENTREGIONNAME"));
						r.setPath(rs.getString("path"));
						result.add(r);
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return result;
			}
		};
		JdbcHelper help = new JdbcHelper();
		help.setJdbcWork(getdata);
		help.setSql(JdbcHelper.getPagingSql(sql, start, limit));
		return (List<Region>) getHibernateTemplate().execute(help);
	}

	@Override
	public Integer getDetailChildrenByType_count() {
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("count(*)");
		SqlBuilder.FROM("region_detail");
		String sql_getCount = SqlBuilder.SQL();

		JdbcWork getCount = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				int result = 0;
				try {
					rs.next();
					result = rs.getInt(1);
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return result;
			}
		};
		JdbcHelper help = new JdbcHelper();
		help.setJdbcWork(getCount);
		help.setSql(sql_getCount);

		return (Integer) getHibernateTemplate().execute(help);
	}

	@Override
	public Region get_Jdbc(Long regionId) {
		JdbcHelper help = new JdbcHelper();
		SqlBuilder.BEGIN();
		SqlBuilder.SELECT("*");
		SqlBuilder.FROM("region_detail");
		SqlBuilder.WHERE("regionid = ?");
		help.addPara(regionId);
		String sql = SqlBuilder.SQL();

		JdbcWork getdata = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				Region r = new Region();
				try {
					while (rs.next()) {
						r.setRegionId(rs.getLong("REGIONID"));
						r.setRegionName(rs.getString("REGIONNAME"));
						r.setRegionType(rs.getShort("REGIONTYPE"));
						r.setAreaNo(rs.getString("AREANO"));
						r.setParentName(rs.getString("PARENTREGIONNAME"));
						r.setPath(rs.getString("path"));
						r.setPostCode(rs.getString("POSTCODE"));
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return r;
			}
		};

		help.setJdbcWork(getdata);
		help.setSql(sql);
		return (Region) getHibernateTemplate().execute(help);
	}
}