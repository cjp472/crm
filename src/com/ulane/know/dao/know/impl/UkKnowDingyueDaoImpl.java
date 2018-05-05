package com.ulane.know.dao.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.model.system.AppUser;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.know.dao.know.UkKnowDingyueDao;
import com.ulane.know.model.know.UkKnowDingyue;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UkKnowDingyueDaoImpl extends BaseDaoImpl<UkKnowDingyue> implements UkKnowDingyueDao{

	public UkKnowDingyueDaoImpl() {
		super(UkKnowDingyue.class);
	}
	
	@Override
	public UkKnowDingyue findByUserid(Long userid) {
		final String hql = "from UkKnowDingyue uk where uk.userid=?";
		Object[] params ={userid};
		List<UkKnowDingyue> list = findByHql(hql, params);
		UkKnowDingyue ukKnowDingyue = null;
		if (list.size() != 0) {
			ukKnowDingyue = list.get(0);
		}
		return ukKnowDingyue;
	}

}