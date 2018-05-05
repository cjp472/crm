package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/

import java.util.Map;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObWashHisDao;
import com.ulane.callout.model.outb.ObWashHis;
import com.ulane.callout.service.outb.ObWashHisService;
import com.ulane.callout.util.AbsSplitJoin;
import com.ulane.callout.util.impl.BWSplitJoin;
import com.ulane.callout.util.impl.BusiSplitJoin;
import com.ulane.callout.util.impl.InvalidSplitJoin;
import com.ulane.callout.util.impl.ListSplitJoin;
import com.ulane.callout.util.impl.OracleSqlTransform;
import com.ulane.callout.util.impl.RepairSplitJoin;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObWashHisServiceImpl extends BaseServiceImpl<ObWashHis> implements ObWashHisService{
	@SuppressWarnings("unused")
	private ObWashHisDao dao;
	public ObWashHisServiceImpl(ObWashHisDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	@Override
	public String queryWashCus(Map<String, String> param) {
		String clearnTyp = param.get("clearnTyp");
		AbsSplitJoin splitJoin = null;
		//清洗方式：无效数据
		if(ObWashHis.CLEARN_TYP_UNVAILABLE.toString().equals(clearnTyp)) {
			splitJoin = new InvalidSplitJoin(new OracleSqlTransform(null));
			String splitJoinSQL = splitJoin.getSplitJoinSQL(param);
			return dao.queryWashCus(param, splitJoinSQL);
//			return dao.getUnValiableData(param, getUnVableAndRepair(param));
		}
		//清洗方式：名单修复
		if(ObWashHis.CLEARN_TYP_LIST_REPAIR.toString().equals(clearnTyp)) {
			splitJoin = new RepairSplitJoin(new OracleSqlTransform(null));
			String splitJoinSQL = splitJoin.getSplitJoinSQL(splitJoin.getClearSameField(param),param);
			return dao.queryWashCus(param, splitJoinSQL);
		}
		
		
		////////////////////////////////////////////////////////////////////////////
		//////////// 			去重				////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////
		//清洗方式：黑白名单
		if(ObWashHis.CLEARN_TYP_BLACK_LIST.toString().equals(clearnTyp)) {
			splitJoin = new BWSplitJoin(new OracleSqlTransform(null));
			String splitJoinSQL = splitJoin.getSplitJoinSQL(splitJoin.getClearSameField(param), param);
			return dao.queryWashCus(param, splitJoinSQL);
		}
		//清洗方式：名单去重
		if(ObWashHis.CLEARN_TYP_LIST_CLEAR_SAME.toString().equals(clearnTyp)) {
			splitJoin = new ListSplitJoin(new OracleSqlTransform(null));
			String splitJoinSQL = splitJoin.getSplitJoinSQL(splitJoin.getClearSameField(param), param);
			return dao.queryWashCus(param, splitJoinSQL);
		}
		//清洗方式：业务去重
		if(ObWashHis.CLEARN_TYP_BUSI_CALEAR_SAME.toString().equals(clearnTyp)) {
			splitJoin = new BusiSplitJoin(new OracleSqlTransform(null));
			String splitJoinSQL = splitJoin.getSplitJoinSQL(splitJoin.getClearSameField(param), param);
			return dao.queryWashCus(param, splitJoinSQL);
		}
		return null;
	}

	@Override
	public String queryBaseInfo(Map<String, String> param) {
		return dao.queryBaseInfo(param);
	}

}