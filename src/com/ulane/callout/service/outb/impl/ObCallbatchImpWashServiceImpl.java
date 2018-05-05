package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObCallbatchImpWashDao;
import com.ulane.callout.model.outb.ObCallbatchImpWash;
import com.ulane.callout.service.outb.ObCallbatchImpWashService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObCallbatchImpWashServiceImpl extends BaseServiceImpl<ObCallbatchImpWash> implements ObCallbatchImpWashService{
	@SuppressWarnings("unused")
	private ObCallbatchImpWashDao dao;
	
	public ObCallbatchImpWashServiceImpl(ObCallbatchImpWashDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public String recoverWashData(String IDS,int iCount,Map<String,String> param) {
		if(StringUtils.isBlank(param.get("washHisId"))) {
			// 通过其中一条清洗记录，查找清洗历史内码，更新清洗历史
			if(StringUtils.isNotBlank(IDS)) {
				String IDSArr[] = StringUtils.split(IDS, ",");
				if(null!=IDSArr && IDSArr.length>0) {
					String getWashHisIdIDS = IDSArr[0];
					ObCallbatchImpWash obj = dao.get(Long.parseLong(StringUtils.trim(getWashHisIdIDS)));
					if(null!=obj) {
						param.put("washHisId", String.valueOf(obj.getWashHisId()));
					}
				}
			}
		}
		return dao.recoverWashData(IDS,iCount,param);
	}

}