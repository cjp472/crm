package com.ulane.callout.dao.outb;
/*
 *  北京优创融联科技有限公司 UniCC综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.callout.model.outb.ObCom;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ObComDao extends BaseDao<ObCom>{
	//根据项目ID查询活动列表
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
	 * 首页营销任务列表显示
	 * @param param
	 * @return
	 */
	public CommTable homeDisplayTask(Map<String,String> param);

}