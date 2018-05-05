package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObConCalllist;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObConCalllistService extends BaseService<ObConCalllist>{
	public List<ObConCalllist> findConCalllist(long calllistId,String callbatchNam,int start,int limit);
	public long getCount(long calllistId,String callbatchNam);
	public List<ObConCalllist> findListCusByAdmin(String callbatchAssIds,int start,int limit,String nameCn,Short dealResId);
	public long getCountByAssIds(String callbatchAssIds,String nameCn,Short dealResId);
	public List<ObConCalllist> listConCalllistByUserNo(Long obCallbatchId,String useNo,String whereSql);
	public List<ObConCalllist> listConCalllistByCallbatch(Long obCallbatchId,String whereSql);
	
	/**
	 * 查询任务池列表
	 * @param comId
	 * @return
	 */
	public String getComRulPoolCusInfo(Map<String,String> param);
	
}


