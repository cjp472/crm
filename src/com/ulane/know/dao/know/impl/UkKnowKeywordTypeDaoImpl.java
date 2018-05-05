package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.know.dao.know.UkKnowKeywordTypeDao;
import com.ulane.know.model.know.UkKnowKeywordType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowKeywordTypeDaoImpl extends BaseDaoImpl<UkKnowKeywordType> implements UkKnowKeywordTypeDao{

	public UkKnowKeywordTypeDaoImpl() {
		super(UkKnowKeywordType.class);
	}

	public List<UkKnowKeywordType> findByParentId(Long keywordTypeId){
		final String hql = "from UkKnowKeywordType k where k.parentId=?";
        Object[] params = { keywordTypeId };
        return findByHql(hql, params);
	}
}