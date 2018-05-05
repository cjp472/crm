package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import org.apache.cxf.binding.corba.wsdl.Object;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.base.dao.xitong.UlBbsHuatiDao;
import com.ulane.base.model.xitong.UlBbsHuati;
import com.ulane.base.model.xitong.UlBbsHuifu;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlBbsHuatiDaoImpl extends BaseDaoImpl<UlBbsHuati> implements UlBbsHuatiDao{

	public UlBbsHuatiDaoImpl() {
		super(UlBbsHuati.class);
	}

	@Override
	public List<UlBbsHuati> findHuaTi() {
		String hql="from UlBbsHuati vo where vo.status =1 order by vo.bbsHuatiId desc";
		return findByHql(hql);
	}

	@Override
	public List<UlBbsHuati> getMy(Long userId) {
		String hql = "select distinct vo from UlBbsHuati vo,UlBbsJieshou js where  vo.appUser.userId = "+userId+" or(vo.bbsHuatiId =js.ulBbsHuati.bbsHuatiId or js.appUser.userId = "+userId+")  order by vo.bbsHuatiId desc";
		return findByHql(hql);
	}
	@Override
	public List<UlBbsHuati> display(PagingBean pagingBean){
		String hql = "from UlBbsHuati t order by t.createtime desc";
		return findByHql(hql,new Object[]{},pagingBean);
	}
	

}