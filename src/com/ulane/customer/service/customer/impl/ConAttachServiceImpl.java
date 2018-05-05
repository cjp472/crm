package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.ConAttachDao;
import com.ulane.customer.model.customer.ConAttach;
import com.ulane.customer.service.customer.ConAttachService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConAttachServiceImpl extends BaseServiceImpl<ConAttach> implements ConAttachService{
	
	private ConAttachDao dao;
	
	public ConAttachServiceImpl(ConAttachDao dao) {
		super(dao);
		this.dao=dao;
	}
}