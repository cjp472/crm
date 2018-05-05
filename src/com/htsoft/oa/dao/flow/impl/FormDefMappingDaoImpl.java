package com.htsoft.oa.dao.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.FormDefMappingDao;
import com.htsoft.oa.model.flow.FormDefMapping;

@SuppressWarnings("unchecked")
public class FormDefMappingDaoImpl extends BaseDaoImpl<FormDefMapping> implements FormDefMappingDao{

	public FormDefMappingDaoImpl() {
		super(FormDefMapping.class);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.flow.FormDefMappingDao#getByDeployId(java.lang.String)
	 */
	public FormDefMapping getByDeployId(String deployId){
		String hql="from FormDefMapping fdm where fdm.deployId=?";
		return (FormDefMapping)findUnique(hql, new Object[]{deployId});
	}
	
	/**
	 * 根据defId判断是否已经设置表单数据
	 */
	@Override
	public FormDefMapping findByDefId(Long defId) {
		String hql = "select m from FormDefMapping m where m.proDefinition.defId = ? ";
		Object[] paramList = { defId };
		List<FormDefMapping> list = findByHql(hql, paramList);
		return (list != null && list.size() > 0) ? list.get(0) : null;
	}
	@Override
	public List<FormDefMapping> getByFormDef(Long formDefId) {
		String hql="from FormDefMapping vo where vo.formDef.formDefId=?";
		return findByHql(hql,new Object[]{formDefId});
	}

}