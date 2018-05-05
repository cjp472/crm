package com.ulane.monitor.dao.unim;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.BaseDao;
import com.ulane.monitor.model.unim.UnimAssetsMap;
import com.ulane.monitor.model.unim.UnimChannelMap;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UnimAssetsMapDao extends BaseDao<UnimAssetsMap>{
	public void removeWhenRemoveMap(Long mapId);
	public UnimAssetsMap getUnimAssetsMapByNavigationId2(Long navigationId,
			Long monitorId) throws Exception;
	public UnimAssetsMap getUnimAssetsMapByNavigationId(Long navigationId,
			Long monitorId);
	
}