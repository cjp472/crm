package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkKnowDimensionalityDao;
import com.ulane.know.model.know.UkKnowDimensionality;
import com.ulane.know.service.know.UkKnowDimensionalityService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowDimensionalityServiceImpl extends BaseServiceImpl<UkKnowDimensionality> implements UkKnowDimensionalityService{
	@SuppressWarnings("unused")
	private UkKnowDimensionalityDao dao;
	
	public UkKnowDimensionalityServiceImpl(UkKnowDimensionalityDao dao) {
		super(dao);
		this.dao=dao;
	}

	public List<UkKnowDimensionality> findByParent(Long parentId){
		return dao.findByParent(parentId);
	}

	@Override
	public List<UkKnowDimensionality> findDimenRole(Long parentId) {
		// TODO Auto-generated method stub
		return dao.findDimenRole(parentId);
	}
}