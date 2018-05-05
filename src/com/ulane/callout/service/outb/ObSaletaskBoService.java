package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObSaletaskBo;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObSaletaskBoService extends BaseService<ObSaletaskBo>{
	
	/**
	 * 外拨过程：联络小结保存预约信息
	 * @param param
	 * @return
	 */
	public ObSaletaskBo saveBoBySummary(Map<String,String> param);
	
}


