package com.ulane.monitor.service.unim.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.monitor.dao.unim.UnimChannelDao;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.model.unim.UnimMonitorAgent;
import com.ulane.monitor.service.unim.UnimChannelService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class UnimChannelServiceImpl extends BaseServiceImpl<UnimChannel> implements UnimChannelService{
	@SuppressWarnings("unused")
	private UnimChannelDao dao;
	
	public UnimChannelServiceImpl(UnimChannelDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<UnimChannel> listGeneralChannels() {
		return dao.listGeneralChannels();
	}

	@Override
	public List<UnimChannel> listMonitorChannels(Long paramInteger)
			throws Exception {
		return dao.listMonitorChannels(paramInteger);
	}

}