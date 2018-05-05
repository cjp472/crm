package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.AppUser;
import com.ulane.callout.model.outb.ObCallbatchAss;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObCallbatchAssService extends BaseService<ObCallbatchAss>{
	public List<ObCallbatchAss> getJingLi(AppUser user,int start,int limit) ;
	public int getJingLiCount(AppUser user);
	public List<ObCallbatchAss> getZuZhang(AppUser user,int start,int limit) ;
	public int getZuZhangCount(AppUser user);
	//将对应ID转中文名
	public List<ObCallbatchAss> injectIdToName(List<ObCallbatchAss> list);
	
	public List<ObCallbatchAss> getAssign1(Long userId,String callbatchAssIds,int start,int limit);
	public int getAssign1Count(Long userId,String callbatchAssIds,int start,int limit);
	
	public List<ObCallbatchAss> listAssByParentId(Long callbatchAssId,Integer start,Integer limit);
	public int listAssByParentIdCount(Long callbatchAssId,int start,int limit);
	
	public int getRerivedByAdmin(String allAssIds);
	
	public int getHoldCounts(String allAssIds);
	
	public int getRerivedByJL(String allAssIds);
	
	public int getRerivedByZZ(String allAssIds);
	
	public List listDate(Long userId,int start,int limit,String callbatchNam,String fromUseName);
	
	public int getDateCount(Long userId,String callbatchNam,String fromUseName);
	
	public List<ObCallbatchAss> listAssByDate(Long userId,String date,String callbatchNam,String fromUseName);
	
	
	public List<ObCallbatchAss> listAssByCallbatch(Long callbatchId,String assOrRetr,int start,int limit);
	public int listAssByCallbatchCount(Long callbatchId,String assOrRetr);
	
	public List<ObCallbatchAss> huishouAssList(int start,int limit,String retriveUserNam,String retriveDat);
	public int  huishouAssListCount(String retriveUserNam,String retriveDat);
	
	public List<ObCallbatchAss> listAssByIds(String callbatchAssIds);
	
	public List<ObCallbatchAss> listAssByParentIds(String strJLIds);
	
	public void retriveCusByAdmin(String allAssIds,String whereSql,int realRetrivedCount);
	public void retriveCusByJL(String allAssIds,String whereSql,int realRetrivedCount,ObCallbatchAss parentAss);
	public void retriveCusByZZ(String allAssIds,String whereSql,int realRetrivedCount,ObCallbatchAss parentAss);
}


