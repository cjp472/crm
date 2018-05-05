package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.flow.FormTableDao;
import com.htsoft.oa.model.flow.FormTable;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.flow.FormTableService;

public class FormTableServiceImpl extends BaseServiceImpl<FormTable> implements FormTableService{
	@SuppressWarnings("unused")
	private FormTableDao dao;
	
	public FormTableServiceImpl(FormTableDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<FormTable> getListFromPro(String typeId,String tableName,AppUser curUser,PagingBean pb){
		
		return this.dao.getListFromPro( typeId, tableName, curUser, pb);
	}
	
	/**
	 * 返回所有表定义及其表的字段
	 * @return
	 */
	public List<FormTable> getAllAndFields(){
		return dao.getAllAndFields();
	}
	@Override
	public List<FormTable> findByTableKey(String tableKey) {
		return dao.findByTableKey(tableKey);
	}

}