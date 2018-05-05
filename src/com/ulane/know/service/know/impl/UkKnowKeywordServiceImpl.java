package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.know.dao.know.UkKnowKeywordDao;
import com.ulane.know.model.know.UkKnowKeyword;
import com.ulane.know.service.know.UkKnowKeywordService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkKnowKeywordServiceImpl extends BaseServiceImpl<UkKnowKeyword> implements UkKnowKeywordService{
	@SuppressWarnings("unused")
	private UkKnowKeywordDao dao;
	
	public UkKnowKeywordServiceImpl(UkKnowKeywordDao dao) {
		super(dao);
		this.dao=dao;
	}

	public List<UkKnowKeyword> findByType(Long keywordTypeId,String keyWord){
		return dao.findByType(keywordTypeId, keyWord);
	}
	public List<UkKnowKeyword> findByTypeForPage(String keywordTypeId,String keyWord,PagingBean pb){
		return dao.findByTypeForPage(keywordTypeId, keyWord, pb);
	}
	public List<UkKnowKeyword> findByTypeDel(Long keywordTypeId){
		return dao.findByTypeDel(keywordTypeId);
	}
}