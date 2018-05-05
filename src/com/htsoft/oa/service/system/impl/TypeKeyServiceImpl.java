package com.htsoft.oa.service.system.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.TypeKeyDao;
import com.htsoft.oa.model.system.TypeKey;
import com.htsoft.oa.service.system.TypeKeyService;

public class TypeKeyServiceImpl extends BaseServiceImpl<TypeKey> implements TypeKeyService{
	private TypeKeyDao dao;
	
	public TypeKeyServiceImpl(TypeKeyDao dao) {
		super(dao);
		this.dao=dao;
	}

}