package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObComBizTypeTree;
/**
 * 
 * @author lzm
 *
 */

public interface ObBizTypeTreeService extends BaseService<ObComBizTypeTree>{
	public List<ObComBizTypeTree> findByCondition(Long parentId) ;
	
}


