package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.base.dao.xitong.UlBbsHuifuDao;
import com.ulane.base.model.xitong.UlBbsHuifu;
import com.ulane.base.service.xitong.UlBbsHuifuService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UlBbsHuifuServiceImpl extends BaseServiceImpl<UlBbsHuifu> implements UlBbsHuifuService{
	@SuppressWarnings("unused")
	private UlBbsHuifuDao dao;
	
	public UlBbsHuifuServiceImpl(UlBbsHuifuDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UlBbsHuifu> findHuaTi(Long sectionId, PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.findHuaTi(sectionId,pb);
	}

	

}