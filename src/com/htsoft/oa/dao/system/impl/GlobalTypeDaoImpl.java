package com.htsoft.oa.dao.system.impl;
/*
 *  北京优创融联科技有限公司企业管理平台   -- http://www.ulane.cn
 *  Copyright (C) 2008-20010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.GlobalTypeDao;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.GlobalType;

public class GlobalTypeDaoImpl extends BaseDaoImpl<GlobalType> implements GlobalTypeDao{

	public GlobalTypeDaoImpl() {
		super(GlobalType.class);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.ent.dao.system.GlobalTypeDao#getByParentIdCatKey(java.lang.Long, java.lang.String)
	 */
	public List<GlobalType> getByParentIdCatKey(Long parentId,String catKey){
		String hql=" from GlobalType gt where gt.parentId = ? and gt.catKey = ? order by gt.sn asc";
		return findByHql(hql, new Object[]{parentId,catKey});
	}
	
	public Integer getCountsByParentId(Long parentId){
		ArrayList param=new ArrayList();
		String hql= " select count(proTypeId) from GlobalType gt ";
		if(parentId!=null && parentId!=0){
			hql+=" where gt.parentId=?";
			param.add(parentId);
		}else{
			hql+=" where gt.parentId is null";
		}
		
		Object obj=findUnique(hql, param.toArray());
		return new Integer(obj.toString());
		
	}
	
	public List<GlobalType> getByParentId(Long parentId){
		ArrayList param=new ArrayList();
		String hql= " from GlobalType gt ";
		if(parentId!=null && parentId!=0){
			hql+=" where gt.parentId=?";
			param.add(parentId);
		}else{
			hql+=" where gt.parentId is null";
		}
		
		return findByHql(hql, param.toArray());
	}
	
	/**
	 * 
	 * @param path
	 * @return
	 */
	public List<GlobalType> getByPath(String path){
		String hql=" from GlobalType gt where gt.path like ?";
		return findByHql(hql,new Object[]{path+"%"});
	}
	@Override
	public GlobalType findByTypeName(String typeName) {
		String hql=" from GlobalType gt where gt.typeName = ?";
		List<GlobalType> list = findByHql(hql,new Object[]{typeName});
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
		
	}
	@Override
	public List<GlobalType> getByParentIdCatKeyUserId(Long parentId,
			String catKey, Long userId) {
		String hql=" from GlobalType gt where gt.parentId = ? and gt.catKey = ? and gt.userId=?";
		return findByHql(hql, new Object[]{parentId,catKey,userId});
	}
	
	@SuppressWarnings("unchecked")
    @Override
	public List<GlobalType> getByRightsCatKey(AppUser curUser, String catKey) {
		String uIds = "%,"+curUser.getUserId()+",%";
		String dIds = "%,"+curUser.getDepartment().getDepId()+",%";
		List params = new ArrayList();
		StringBuffer hql =new StringBuffer("select gt from ProDefRights pr right join pr.globalType gt  where gt.catKey = ? and (pr.userIds like ?  or pr.depIds like ? ");
		params.add(catKey);
		params.add(uIds);
		params.add(dIds);
		
		Set<AppRole> roles = curUser.getRoles();
		for(Iterator it = roles.iterator();it.hasNext();){
			AppRole role = (AppRole)it.next();
			hql.append("or pr.roleIds like ? ");
			String rIds = "%,"+role.getRoleId()+",%";
			params.add(rIds);
		}
		
		hql.append(")");
				
		return findByHql(hql.toString(),params.toArray());
	}

}