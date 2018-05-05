package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.know.dao.know.UkKnowCollectTypeDao;
import com.ulane.know.model.know.UkKnowCollectType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowCollectTypeDaoImpl extends BaseDaoImpl<UkKnowCollectType> implements UkKnowCollectTypeDao{

	public UkKnowCollectTypeDaoImpl() {
		super(UkKnowCollectType.class);
	}

	@Override
	public List<UkKnowCollectType> findByParent(Long parentId,Long userId) {
		StringBuffer sb = new StringBuffer(
				"from UkKnowCollectType t where t.parentId = ? and t.appUser.userId = ?");
		ArrayList<Object> paramList = new ArrayList<Object>();
		paramList.add(parentId);
		paramList.add(userId);
		return findByHql(sb.toString(), paramList.toArray());
	}

}