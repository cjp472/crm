package com.ulane.callout.service.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.base.model.xitong.UlBbsHuati;
import com.ulane.callout.model.outb.ObCom;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObComService extends BaseService<ObCom>{
	public void toRecover(Long comId);
	public void toPause(Long comId);
	public void toClose(Long comId);
	
	//判断该活动是否处于对应的状态
	public boolean isStatusCom(Long comId,Short status);
	public List<ObCom> queryObComs(Long projId);
	
	/**
	 * 查询活动：1.当前登录坐席所在的用户组下的活动。2.除了“未启用”的活动
	 */
	public String queryFilterObComs(PagingBean pagBean,Map<String,String> param);
	
	/**
	 * 获取projId该项目下活动中最迟的结束时间
	 * @param projId
	 * @return
	 */
	public String queryMaxEndTimeCom(Long projId);
	
	/**
	 * 首页营销任务对应的营销活动列表显示
	 * @param param
	 * @return
	 */
	public CommTable homeDisplayTask(Map<String,String> param);
}


