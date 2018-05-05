package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObWashHis;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObWashHisService extends BaseService<ObWashHis>{
	
	/**
	 * 根据对应的清洗方式进行清洗数据的查询
	 * @param param
	 * @return
	 */
	public String queryWashCus(Map<String,String> param);
	
	/**
	 * 查询：项目、活动、名单、批次——条件为其中的某一个值查询其他关联数据。
	 * @param param
	 * @return
	 */
	public String queryBaseInfo(Map<String,String> param);
}

