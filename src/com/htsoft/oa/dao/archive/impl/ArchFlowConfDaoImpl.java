package com.htsoft.oa.dao.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.archive.ArchFlowConfDao;
import com.htsoft.oa.model.archive.ArchFlowConf;

public class ArchFlowConfDaoImpl extends BaseDaoImpl<ArchFlowConf> implements ArchFlowConfDao{

	public ArchFlowConfDaoImpl() {
		super(ArchFlowConf.class);
	}

	@Override
	public ArchFlowConf getByFlowType(Short archType) {
		String hql="from ArchFlowConf vo where vo.archType=?";
		Object[] objs={archType};
		List<ArchFlowConf> list=findByHql(hql, objs);
		if(list.size()==1){
			return list.get(0);
		}else{
		    return null;
		}
	}

}