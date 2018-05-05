package com.ulane.running.dao.pap.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.running.dao.pap.PapReleaseDao;
import com.ulane.running.model.pap.PapRelease;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class PapReleaseDaoImpl extends BaseDaoImpl<PapRelease> implements PapReleaseDao{

	public PapReleaseDaoImpl() {
		super(PapRelease.class);
	}

}