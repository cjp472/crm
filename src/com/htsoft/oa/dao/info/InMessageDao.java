package com.htsoft.oa.dao.info;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;

public interface InMessageDao extends BaseDao<InMessage> {

	public InMessage findByRead(Long userId);
	public Integer findByReadFlag(Long userId);
	public List<InMessage> findAll(Long userId,PagingBean pb);
	public List<InMessage> findByShortMessage(ShortMessage shortMessage,PagingBean pb);
	public List findByUser(Long userId,PagingBean pb);
	public List findByUser(Long userId);
    /**
     * 查询发送出去的信息
     * @param userId
     * @param inMessage
     * @param shortMessage
     * @param from
     * @param to
     * @param pb
     * @return
     */
	public List searchInMessage(Long userId,InMessage inMessage,ShortMessage shortMessage,Date from,Date to,PagingBean pb);
	/**
	 * 查找最新的一条信息
	 * @param userId
	 * @return
	 */
	public InMessage findLatest(Long userId);
	
	public List searchInMessageMonitor(Long userId);
	
	public List searchReceivedMsgInMessageMonitor(Long userId);
}
