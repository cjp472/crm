package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.ConBwListDao;
import com.ulane.customer.model.customer.ConBwList;
import com.ulane.customer.service.customer.ConBwListService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConBwListServiceImpl extends BaseServiceImpl<ConBwList> implements ConBwListService{
	@SuppressWarnings("unused")
	private ConBwListDao dao;
	@Resource
	protected JdbcTemplate jdbcTemplate;	
	public ConBwListServiceImpl(ConBwListDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public ConBwList getConBwByContact(Short ContactTypeId,
			String MainContactNum) {
		List<ConBwList> conBwList =  dao.getConBwByContact(ContactTypeId, MainContactNum);
		if(conBwList != null && conBwList.size() > 0 ){
			return conBwList.get(0);
		}else{
			return null;
		}
	}

	@Override
	public ConBwList getConWwByContact(Short ContactTypeId,
			String MainContactNum) {
		List<ConBwList> conBwList =  dao.getConBwByContact(ContactTypeId, MainContactNum);
		if(conBwList != null && conBwList.size() > 0 ){
			return conBwList.get(0);
		}else{
			return null;
		}
	}

	@Override
	public void executeInsertSql(String sql) {
		// TODO Auto-generated method stub
		jdbcTemplate.execute(sql);
	}

}