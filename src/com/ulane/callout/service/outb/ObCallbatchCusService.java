package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObCallbatchCus;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObCallbatchCusService extends BaseService<ObCallbatchCus>{
	public List<ObCallbatchCus> listCallbatchCusByAssids(String allAssIds,String whereSql);
	public List<ObCallbatchCus> listCusByCallbatch(Long fromCallbatchId,String whereSql);

}

