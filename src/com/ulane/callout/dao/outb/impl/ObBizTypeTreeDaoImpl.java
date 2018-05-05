package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.callout.dao.outb.ObBiztypeTreeDao;
import com.ulane.callout.model.outb.ObComBizTypeTree;
/**
 * 
 * @author lzm
 *
 */

@SuppressWarnings("unchecked")
public class ObBizTypeTreeDaoImpl extends BaseDaoImpl<ObComBizTypeTree> implements ObBiztypeTreeDao{

	public ObBizTypeTreeDaoImpl() {
		super(ObComBizTypeTree.class);
	}
	/**
	 * 根据parentId查询对应的数据加载tree
	 */
	@Override
	public List<ObComBizTypeTree> findByCondition(Long parentId) {
		StringBuffer sb = new StringBuffer(
//				"select j from UL_USERGROUP j where j.delFlag = 0 and j.parentId = ? ");
				"select j from ObComBizTypeTree j where j.parentNodeId ="+parentId); 
		return findByHql(sb.toString());
	}

}