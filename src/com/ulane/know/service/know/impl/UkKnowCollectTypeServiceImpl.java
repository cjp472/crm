package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkKnowCollectTypeDao;
import com.ulane.know.model.know.UkKnowCollectType;
import com.ulane.know.service.know.UkKnowCollectTypeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowCollectTypeServiceImpl extends BaseServiceImpl<UkKnowCollectType> implements UkKnowCollectTypeService{
	@SuppressWarnings("unused")
	private UkKnowCollectTypeDao dao;
	
	public UkKnowCollectTypeServiceImpl(UkKnowCollectTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UkKnowCollectType> findByParent(Long parentId,Long userId) {
		// TODO Auto-generated method stub
		return dao.findByParent(parentId,userId);
	}

}