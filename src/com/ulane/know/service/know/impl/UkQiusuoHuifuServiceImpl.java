package com.ulane.know.service.know.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.dao.know.UkQiusuoHuifuDao;
import com.ulane.know.model.know.UkQiusuoHuifu;
import com.ulane.know.service.know.UkQiusuoHuifuService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UkQiusuoHuifuServiceImpl extends BaseServiceImpl<UkQiusuoHuifu> implements UkQiusuoHuifuService{
	@SuppressWarnings("unused")
	private UkQiusuoHuifuDao dao;
	
	public UkQiusuoHuifuServiceImpl(UkQiusuoHuifuDao dao) {
		super(dao);
		this.dao=dao;
	}

}