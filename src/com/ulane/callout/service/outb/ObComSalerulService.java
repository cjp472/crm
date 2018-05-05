package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObComSalerul;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObComSalerulService extends BaseService<ObComSalerul>{
	
	/**
	 * 根据规则类型和活动内码，查询规则为拨打时间段的时间段信息
	 * @param rulTypeId
	 * @param comId
	 * @return
	 */
	public String getTimeBetween(String rulTypeId,String comId);
}


