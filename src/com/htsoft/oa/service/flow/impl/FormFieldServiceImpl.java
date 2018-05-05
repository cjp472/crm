package com.htsoft.oa.service.flow.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.FormFieldDao;
import com.htsoft.oa.model.flow.FormField;
import com.htsoft.oa.service.flow.FormFieldService;

public class FormFieldServiceImpl extends BaseServiceImpl<FormField> implements FormFieldService{
	@SuppressWarnings("unused")
	private FormFieldDao dao;
	
	public FormFieldServiceImpl(FormFieldDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/**
	 * 取某个表的标题字段
	 * @param tableId
	 * @param isFlowTitle
	 * @return
	 */
	public FormField find(Long tableId,Short isFlowTitle){
		return dao.find(tableId, isFlowTitle);
	}

}