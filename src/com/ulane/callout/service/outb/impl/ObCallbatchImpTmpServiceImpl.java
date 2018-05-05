package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObCallbatchImpTmpDao;
import com.ulane.callout.model.outb.ObCallbatchImpTmp;
import com.ulane.callout.service.outb.ObCallbatchImpTmpService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObCallbatchImpTmpServiceImpl extends BaseServiceImpl<ObCallbatchImpTmp> implements ObCallbatchImpTmpService{
	@SuppressWarnings("unused")
	private ObCallbatchImpTmpDao dao;
	
	public ObCallbatchImpTmpServiceImpl(ObCallbatchImpTmpDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<ObCallbatchImpTmp> listImpTmpsByCallbathId(Long callbathId) {
		return dao.listImpTmpsByCallbathId(callbathId);
	}

}