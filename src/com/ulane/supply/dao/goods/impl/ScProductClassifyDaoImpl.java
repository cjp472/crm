package com.ulane.supply.dao.goods.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.running.model.qucon.QcTarCat;
import com.ulane.supply.dao.goods.ScProductClassifyDao;
import com.ulane.supply.model.goods.ScProductClassify;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ScProductClassifyDaoImpl extends BaseDaoImpl<ScProductClassify> implements ScProductClassifyDao{

	public ScProductClassifyDaoImpl() {
		super(ScProductClassify.class);
	}
	public List<ScProductClassify> findByParentId(Long productClassifyId){
		final String hql = "from ScProductClassify scpc where scpc.masterProductClassifyId = ?";
		Object[] params = { productClassifyId};
        return findByHql(hql, params);

	}

}