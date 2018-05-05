package com.ulane.running.dao.qucon.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.know.model.know.UkKnowKeywordType;
import com.ulane.running.dao.qucon.QcTarCatDao;
import com.ulane.running.model.qucon.QcTarCat;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class QcTarCatDaoImpl extends BaseDaoImpl<QcTarCat> implements QcTarCatDao{

	public QcTarCatDaoImpl() {
		super(QcTarCat.class);
	}
	public List<QcTarCat> findByParentId(Long qcTarCatId){
		final String hql = "from QcTarCat qccat where qccat.parTarCatId=? and staId=?";
        Object[] params = { qcTarCatId, QcTarCat.FLAG_ENABLED};
        return findByHql(hql, params);
	}
}