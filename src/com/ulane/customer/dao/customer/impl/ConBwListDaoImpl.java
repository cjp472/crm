package com.ulane.customer.dao.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.customer.dao.customer.ConBwListDao;
import com.ulane.customer.model.customer.ConBwList;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ConBwListDaoImpl extends BaseDaoImpl<ConBwList> implements ConBwListDao{

	public ConBwListDaoImpl() {
		super(ConBwList.class);
	}

	@Override
	public List<ConBwList> getConBwByContact(Short ContactTypeId,
			String MainContactNum) {
		StringBuffer hql= new StringBuffer("from ConBwList bw where bw.bwTypId=1 and bw.contactTypeId="+ContactTypeId.shortValue()+" and bw.mainContactNum='"+MainContactNum+"'");
		return findByHql(hql.toString());
	}

	@Override
	public List<ConBwList> getConWwByContact(Short ContactTypeId,
			String MainContactNum) {
		StringBuffer hql= new StringBuffer("from ConBwList bw where bw.bwTypId=2 and bw.contactTypeId="+ContactTypeId.shortValue()+" and bw.mainContactNum='"+MainContactNum+"'");
		return findByHql(hql.toString());
	}

}