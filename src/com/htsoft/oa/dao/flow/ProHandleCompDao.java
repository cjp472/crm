package com.htsoft.oa.dao.flow;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.flow.ProHandleComp;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ProHandleCompDao extends BaseDao<ProHandleComp>{
	/**
	 * 取得某个流程的某个节点的各事件及监听对应的列表
	 * @param deployId
	 * @param activityName
	 * @return
	 */
	public List<ProHandleComp> getByDeployIdActivityName(String deployId,String activityName);
	/**
	 * 
	 * @param deployId
	 * @param activityName
	 * @param handleType
	 * @return
	 */
	public List<ProHandleComp> getByDeployIdActivityNameHandleType(String deployId,String activityName,Short handleType);
	/**
	 * 
	 * @param deployId
	 * @param activityName
	 * @param eventName
	 * @return
	 */
	public ProHandleComp getProHandleComp(String deployId,String activityName,String eventName);
}