package com.ulane.know.dao.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.know.model.know.UkKnowKeyword;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UkKnowKeywordDao extends BaseDao<UkKnowKeyword>{
	public List<UkKnowKeyword> findByType(Long keywordTypeId,String keyWord);
	public List<UkKnowKeyword> findByTypeForPage(String keywordTypeId,String keyWord,PagingBean pb);
	public List<UkKnowKeyword> findByTypeDel(Long keywordTypeId);
}