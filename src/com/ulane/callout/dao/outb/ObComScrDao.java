package com.ulane.callout.dao.outb;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.ulane.callout.model.outb.ObComScr;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ObComScrDao extends BaseDao<ObComScr>{
	/**
	 * 根据活动ID查找话术ID（当前业务逻辑为，一个活动捆绑一个话术，状态为——1的才是当前有效话术）
	 * @param comId
	 * @return
	 */
	public Long getScrIdByComId(String comId);
	
}