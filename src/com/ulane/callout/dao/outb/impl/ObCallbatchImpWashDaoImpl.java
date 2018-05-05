package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.callout.dao.outb.ObCallbatchImpWashDao;
import com.ulane.callout.model.outb.ObCallbatchImpWash;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObCallbatchImpWashDaoImpl extends BaseDaoImpl<ObCallbatchImpWash> implements ObCallbatchImpWashDao{

	public ObCallbatchImpWashDaoImpl() {
		super(ObCallbatchImpWash.class);
	}

	@Override
	public String recoverWashData(String IDS,int iCount,Map<String,String> param) {
		try {
			String washHisId = param.get("washHisId");
			String callbatchId = param.get("callbatchId");
			
			String inserSQL = "insert into OB_CALLBATCH_IMP_TMP select * from OB_CALLBATCH_IMP_WASH WASH where WASH.WASH_CUS_ID in("+IDS+")";
			String delSQL = "delete from OB_CALLBATCH_IMP_WASH WASH where WASH.WASH_CUS_ID in("+IDS+")";
			jdbcTemplate.execute(inserSQL);
			jdbcTemplate.execute(delSQL);
			
			//清洗历史修改
			if(StringUtils.isNotBlank(washHisId)) {
				String updateSQL = "update ob_wash_his set CLEARN_COUNTS=(to_number(CLEARN_COUNTS)-to_number("+iCount+")) where wash_his_id="+washHisId;
				jdbcTemplate.execute(updateSQL);
			} 
			
			//批次修改
			if(StringUtils.isNotBlank(callbatchId)) {
				String updateSQL = "update ob_callbatch set AVLID_COUNT=(to_number(AVLID_COUNT)+to_number("+iCount+")),HOLD_COUNT=(to_number(HOLD_COUNT)+to_number("+iCount+")),INAVLID_COUNT=(to_number(INAVLID_COUNT)-to_number("+iCount+")) where callbatch_id="+callbatchId;
				jdbcTemplate.execute(updateSQL);
			}
		} catch(Exception e) {
			logger.error(e.getMessage());
		} finally { }
		return null;
	}

}