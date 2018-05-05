package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimChannelTargetDao;
import com.ulane.monitor.model.unim.UnimChannelTarget;
import com.ulane.monitor.service.unim.UnimChannelTargetService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimChannelTargetServiceImpl extends BaseServiceImpl<UnimChannelTarget> implements UnimChannelTargetService{
	@SuppressWarnings("unused")
	private UnimChannelTargetDao dao;
	
	public UnimChannelTargetServiceImpl(UnimChannelTargetDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimChannelTarget> findByParentId(Long channelId) {
		return dao.findByParentId(channelId);
	}

}