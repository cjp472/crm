package com.ulane.monitor.service.unim;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.monitor.model.unim.UnimAssTarThrlevl;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UnimAssTarThrlevlService extends BaseService<UnimAssTarThrlevl>{
	  //当前状态下的阀值
	  public List<UnimAssTarThrlevl> getByCatId(Long targetId);
	
}


