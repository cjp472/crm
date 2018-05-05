package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkKnowKeywordTypeDao;
import com.ulane.know.model.know.UkKnowKeywordType;
import com.ulane.know.service.know.UkKnowKeywordTypeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowKeywordTypeServiceImpl extends BaseServiceImpl<UkKnowKeywordType> implements UkKnowKeywordTypeService{
	private UkKnowKeywordTypeDao dao;
	
	public UkKnowKeywordTypeServiceImpl(UkKnowKeywordTypeDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<UkKnowKeywordType> findByParentId(Long keywordTypeId){
		return dao.findByParentId(keywordTypeId);
	}
}