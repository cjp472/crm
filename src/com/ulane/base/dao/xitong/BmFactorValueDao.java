package com.ulane.base.dao.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Iterator;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.base.model.xitong.BmFactorValue;

/**
 * 
 * @author 
 *
 */
public interface BmFactorValueDao extends BaseDao<BmFactorValue>{

	Iterator getHql(String string, String string2, String string3);

	List<BmFactorValue> getByFactor(Long factor1Id);

	boolean isHql(String s1, String factorValue);
	
}