package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObConCalllistDao;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.service.outb.ObConCalllistService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObConCalllistServiceImpl extends BaseServiceImpl<ObConCalllist> implements ObConCalllistService{
	@SuppressWarnings("unused")
	private ObConCalllistDao dao;
	
	public ObConCalllistServiceImpl(ObConCalllistDao dao) {
		super(dao);
		this.dao=dao;
	}
	public List<ObConCalllist> findConCalllist(long calllistId,String callbatchNam,int start,int limit) {
		return dao.findConCalllist(calllistId,callbatchNam,start,limit);
	}
	
	public long getCount(long calllistId,String callbatchNam) {
	   return dao.getCount(calllistId,callbatchNam);	
	}
	
	public List<ObConCalllist> findListCusByAdmin(String callbatchAssIds,int start,int limit,String nameCn,Short dealResId) {
		return dao.findListCusByAdmin(callbatchAssIds,start,limit,nameCn,dealResId);
	}
	
	public long getCountByAssIds(String callbatchAssIds,String nameCn,Short dealResId) {
		   return dao.getCountByAssIds(callbatchAssIds,nameCn,dealResId);	
		}
	
	public List<ObConCalllist> listConCalllistByUserNo(Long obCallbatchId,String useNo,String whereSql) {
		return dao.listConCalllistByUserNo(obCallbatchId,useNo,whereSql);
	}
	public List<ObConCalllist> listConCalllistByCallbatch(Long obCallbatchId,String whereSql) {
		return dao.listConCalllistByCallbatch(obCallbatchId,whereSql);
	}
	@Override
	public String getComRulPoolCusInfo(Map<String, String> param) {
		return dao.getComRulPoolCusInfo(param);
	}

}