package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.know.dao.know.UkKnowKeywordDao;
import com.ulane.know.model.know.UkKnowKeyword;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowKeywordDaoImpl extends BaseDaoImpl<UkKnowKeyword> implements UkKnowKeywordDao{

	public UkKnowKeywordDaoImpl() {
		super(UkKnowKeyword.class);
	}
	
	public List<UkKnowKeyword> findByType(Long keywordTypeId,String keyWord){
		StringBuffer sb = new StringBuffer();
		sb.append( "from UkKnowKeyword k where k.type.keywordTypeId = "+keywordTypeId); 
		if(keyWord!=null && keyWord!=""){
			sb.append(" and k.keyWord like '%"+keyWord+"%'");
		}
		final String hql = sb.toString(); 
        return findByHql(hql);
	}
	
	public List<UkKnowKeyword> findByTypeForPage(String keywordTypeId,String keyWord,PagingBean pb){
		StringBuffer sb = new StringBuffer();
		List params=new ArrayList();
		sb.append( "from UkKnowKeyword k where k.type.keywordTypeId in( "+keywordTypeId+")"); 
		if(keyWord!=null && keyWord!=""){
			sb.append(" and k.keyWord like ?");
			params.add("%"+keyWord+"%");
		}
		sb.append(" order by keyWord asc");
		final String hql = sb.toString(); 
        return findByHql(hql,params.toArray(),pb);
	}
	
	public List<UkKnowKeyword> findByTypeDel(Long keywordTypeId){
		final String hql = "from UkKnowKeyword k where k.type.keywordTypeId = ?  and knowStatus = 1";
        Object[] params = { keywordTypeId };
        return findByHql(hql, params);
	}
}