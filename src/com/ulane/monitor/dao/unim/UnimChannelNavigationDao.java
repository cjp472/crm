package com.ulane.monitor.dao.unim;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.ulane.monitor.model.unim.UnimChannelNavigation;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UnimChannelNavigationDao extends BaseDao<UnimChannelNavigation>{
	public List<UnimChannelNavigation> findByParentId(Long parentId);
	
	public void updateWhenRemoveMap(Long mapId);
	
	public void removeWhenRemoveMap(Long mapId);
}