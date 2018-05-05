package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObCallbatchImpWash;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObCallbatchImpWashService extends BaseService<ObCallbatchImpWash>{
	
	/**
	 * 恢复清洗数据到临时表中
	 * @param IDS
	 * @return
	 */
	public String recoverWashData(String IDS,int iCount,Map<String,String> param);
}


