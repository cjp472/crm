package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObBiztypeTreeDao;
import com.ulane.callout.dao.outb.ObComDao;
import com.ulane.callout.model.outb.ObComBizTypeTree;
import com.ulane.callout.service.outb.ObBizTypeTreeService;
/**
 * 
 * @author lzm
 *
 */

public class ObBizTypeTreeServiceImpl extends BaseServiceImpl<ObComBizTypeTree> implements ObBizTypeTreeService{
	@SuppressWarnings("unused")
	private ObBiztypeTreeDao dao;
	
	public ObBizTypeTreeServiceImpl(ObBiztypeTreeDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<ObComBizTypeTree> findByCondition(Long parentId) {
		// TODO Auto-generated method stub
		return dao.findByCondition(parentId);
	}

}