package com.ulane.supply.service.goods.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.running.model.qucon.QcTarCat;
import com.ulane.supply.dao.goods.ScProductClassifyDao;
import com.ulane.supply.model.goods.ScProductClassify;
import com.ulane.supply.service.goods.ScProductClassifyService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ScProductClassifyServiceImpl extends BaseServiceImpl<ScProductClassify> implements ScProductClassifyService{
	@SuppressWarnings("unused")
	private ScProductClassifyDao dao;
	
	public ScProductClassifyServiceImpl(ScProductClassifyDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public List<ScProductClassify> findByParentId(Long productClassifyId){
		return dao.findByParentId(productClassifyId);
	}

}