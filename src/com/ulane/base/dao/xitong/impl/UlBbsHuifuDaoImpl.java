package com.ulane.base.dao.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;
import com.ulane.base.dao.xitong.UlBbsHuifuDao;
import com.ulane.base.model.xitong.UlBbsHuifu;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class UlBbsHuifuDaoImpl extends BaseDaoImpl<UlBbsHuifu> implements UlBbsHuifuDao{

	public UlBbsHuifuDaoImpl() {
		super(UlBbsHuifu.class);
	}



	@Override
	public List<UlBbsHuifu> findHuaTi(Long sectionId, PagingBean pb) {
		String hql="from UlBbsHuifu vo where vo.paertId = ? order by vo.paertId desc ";
		return findByHql(hql,new Object[]{sectionId},pb);
	}
	





}