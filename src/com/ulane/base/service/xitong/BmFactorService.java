package com.ulane.base.service.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.base.model.xitong.BmFactor;

public interface BmFactorService extends BaseService<BmFactor>{
	
	
	
	/**
	 * 获得影响因素对应的字段名
	 */
	public String getField(int factorId,int billType);
	/**
	 * 获得影响因素对应的对象名
	 */
	public String getObject(int factorId,int billType);
	
}


