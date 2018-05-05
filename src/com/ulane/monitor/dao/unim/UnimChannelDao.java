package com.ulane.monitor.dao.unim;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.monitor.model.unim.UnimChannel;
import com.ulane.monitor.model.unim.UnimMonitorAgent;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UnimChannelDao extends BaseDao<UnimChannel>{
	public List<UnimChannel> listGeneralChannels();
	public List<UnimChannel> listMonitorChannels(Long id) throws Exception;
}