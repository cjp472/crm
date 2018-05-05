package com.ulane.monitor.service.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.monitor.model.unim.UnimChannelTarget;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UnimChannelTargetService extends BaseService<UnimChannelTarget>{
	public List<UnimChannelTarget> findByParentId(Long channelId);
}

