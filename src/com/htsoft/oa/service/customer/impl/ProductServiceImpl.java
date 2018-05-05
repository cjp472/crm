package com.htsoft.oa.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.ProductDao;
import com.htsoft.oa.model.customer.Product;
import com.htsoft.oa.service.customer.ProductService;

public class ProductServiceImpl extends BaseServiceImpl<Product> implements ProductService{
	private ProductDao dao;
	
	public ProductServiceImpl(ProductDao dao) {
		super(dao);
		this.dao=dao;
	}

}