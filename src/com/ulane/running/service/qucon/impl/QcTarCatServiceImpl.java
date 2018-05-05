package com.ulane.running.service.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.know.model.know.UkKnowKeywordType;
import com.ulane.running.dao.qucon.QcTarCatDao;
import com.ulane.running.model.qucon.QcTarCat;
import com.ulane.running.service.qucon.QcTarCatService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class QcTarCatServiceImpl extends BaseServiceImpl<QcTarCat> implements QcTarCatService{
	@SuppressWarnings("unused")
	private QcTarCatDao dao;
	
	public QcTarCatServiceImpl(QcTarCatDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public List<QcTarCat> findByParentId(Long qcTarCatId){
		return dao.findByParentId(qcTarCatId);
	}
}