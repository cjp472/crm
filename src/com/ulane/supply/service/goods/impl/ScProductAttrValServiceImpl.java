package com.ulane.supply.service.goods.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.supply.dao.goods.ScProductAttrValDao;
import com.ulane.supply.model.goods.ScProductAttrVal;
import com.ulane.supply.service.goods.ScProductAttrValService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScProductAttrValServiceImpl extends BaseServiceImpl<ScProductAttrVal> implements ScProductAttrValService{
	@SuppressWarnings("unused")
	private ScProductAttrValDao dao;
	
	public ScProductAttrValServiceImpl(ScProductAttrValDao dao) {
		super(dao);
		this.dao=dao;
	}

}