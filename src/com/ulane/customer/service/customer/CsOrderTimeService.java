package com.ulane.customer.service.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.customer.model.customer.CsOrderTime;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface CsOrderTimeService extends BaseService<CsOrderTime>{
	
	/**
	 * 根据时间配置名称获取工单时间设置项
	 */
	public CsOrderTime getByDicId(Long dicId);
}


