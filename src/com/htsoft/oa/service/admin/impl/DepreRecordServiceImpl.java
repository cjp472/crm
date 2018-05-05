package com.htsoft.oa.service.admin.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.DepreRecordDao;
import com.htsoft.oa.model.admin.DepreRecord;
import com.htsoft.oa.service.admin.DepreRecordService;

public class DepreRecordServiceImpl extends BaseServiceImpl<DepreRecord> implements DepreRecordService{
	private DepreRecordDao dao;
	
	public DepreRecordServiceImpl(DepreRecordDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public Date findMaxDate(Long assetsId) {
		return dao.findMaxDate(assetsId);
	}

}