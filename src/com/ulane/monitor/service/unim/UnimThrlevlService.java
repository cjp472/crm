package com.ulane.monitor.service.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.model.unim.UnimThrlevl;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UnimThrlevlService extends BaseService<UnimThrlevl>{
	
	public List<UnimThrlevl> getByMonitorId(Long monitorId);
	  public List<UnimThrlevl> getByCatId(Long catid);
	
	public void initThrlevl(Long monitorId, List<UnimCategory> categoryList);
	
}


