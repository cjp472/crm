package com.htsoft.oa.service.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.ShortMessage;

public interface ShortMessageService extends BaseService<ShortMessage> {

	public List<ShortMessage> findAll(Long userId,PagingBean pb);
	public List<ShortMessage> findByUser(Long userId);
	public List searchShortMessage(Long userId,ShortMessage shortMessage,Date from,Date to,PagingBean pb,Short readFlag);
	
	public ShortMessage save (Long senderId,String receiveIds,String content,Short msgType);
}
