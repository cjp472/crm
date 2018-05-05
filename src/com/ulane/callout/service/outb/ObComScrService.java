package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObComScr;
import com.ulane.running.model.comtech.CtScrTemplate;
/**
 * 
 * @author lzm
 *
 */

public interface ObComScrService extends BaseService<ObComScr>{
	/**
	 * 根据活动ID查找话术（当前业务逻辑为，一个活动捆绑一个话术，状态为——1的才是当前有效话术）
	 * @param comId
	 * @return
	 */
	public CtScrTemplate getScrByComId(String comId);
}


