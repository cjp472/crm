package com.htsoft.oa.service.hrm.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.EmpProfileDao;
import com.htsoft.oa.model.hrm.EmpProfile;
import com.htsoft.oa.service.hrm.EmpProfileService;

public class EmpProfileServiceImpl extends BaseServiceImpl<EmpProfile> implements EmpProfileService{
	private EmpProfileDao dao;
	
	public EmpProfileServiceImpl(EmpProfileDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean checkProfileNo(String profileNo) {
		return dao.checkProfileNo(profileNo);
	}

}