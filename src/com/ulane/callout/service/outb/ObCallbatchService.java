package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.callout.model.outb.ObCallbatch;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObCallbatchService extends BaseService<ObCallbatch>{
	
	/**
	 * 查询清洗名单列表
	 * @param param
	 * @return
	 */
	public String listClearnBatch(Map<String,String> param, PagingBean pagBean);
	
}


