package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.model.system.AppRole;
import com.ulane.core.util.JdbcHelper;
import com.ulane.core.util.JdbcWork;
import com.ulane.know.dao.know.UkKnowDimensionalityDao;
import com.ulane.know.model.know.UkKnowDimensionality;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowDimensionalityDaoImpl extends BaseDaoImpl<UkKnowDimensionality> implements UkKnowDimensionalityDao{

	public UkKnowDimensionalityDaoImpl() {
		super(UkKnowDimensionality.class);
	}

	@Override
	public List<UkKnowDimensionality> findByParent(Long parentId) {
		StringBuffer sb = new StringBuffer(
				"from UkKnowDimensionality j where j.parentId = ? and j.isDelete = 1"); 
		ArrayList<Object> paramList = new ArrayList<Object>();
		paramList.add(parentId);
		return findByHql(sb.toString(), paramList.toArray());
	}

	@Override
	public List<UkKnowDimensionality> findDimenRole(Long parentId) {
		final String sql=" select t.dimensionality_id as did,t.classify_name as cname,t.visit_manage as vman,t.visit_role as vrole from uk_know_dimensionality t where t.parent_id="+parentId+" and t.is_delete=1 ";
		JdbcHelper helper = new JdbcHelper();
		
		helper.setSql(sql);
		logger.debug("sql : " + sql);
		JdbcWork sqlWork = new JdbcWork() {
			@Override
			public Object fillData(ResultSet rs) {
				List<UkKnowDimensionality> listDimen = new ArrayList<UkKnowDimensionality>();
				try {
					while(rs.next()){
						UkKnowDimensionality uk = new UkKnowDimensionality();
						uk.setDimensionalityId(rs.getLong("did"));
						uk.setClassifyName(rs.getString("cname"));
						uk.setVisitManage(rs.getLong("vman"));
						uk.setVisitRole(rs.getString("vrole"));
						listDimen.add(uk);
					}
				} catch (SQLException e) {
					e.printStackTrace();
				}
				return listDimen;
			}
		};
		helper.setJdbcWork(sqlWork);
		List<UkKnowDimensionality> obj = (List<UkKnowDimensionality>)getHibernateTemplate().execute(helper);
		if(obj!=null){
			List<UkKnowDimensionality> list = new ArrayList<UkKnowDimensionality>();
			boolean manage = false;
			Set<AppRole> ur = ContextUtil.getCurrentUser().getRoles();
			for(UkKnowDimensionality ukd : obj){
				Long vman = ukd.getVisitManage();
				if(vman.equals(new Long(1))){
					list.add(ukd);
				}else{
					String vrole = ukd.getVisitRole();
					if(vrole!=null){
						Object[] urs = ur.toArray();
						for ( Object o : urs){
							String or = ((AppRole)o).getRoleId().toString();
							if(vrole.indexOf(",") >=0){
								manage = vrole.indexOf(or + ",") == -1 ? (vrole.indexOf("," + or) == -1 ? false : true) : true;//[ or, | ,or ]
							} else {
								manage = vrole.equals(or) ;
							}
							if(manage) break ;
						}
						if(manage){
							list.add(ukd);
						}
					}
				}
			}
			return list;
		}else{
			return null;
		}
	}

}