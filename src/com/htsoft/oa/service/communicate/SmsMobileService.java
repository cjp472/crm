package com.htsoft.oa.service.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.SmsMobile;

public interface SmsMobileService extends BaseService<SmsMobile>{
	public List<SmsMobile> getNeedToSend();
	public void saveSms(String userIds,String content);
	public void sendSms();
	public void sendOneSms(SmsMobile smsMobile);
}


