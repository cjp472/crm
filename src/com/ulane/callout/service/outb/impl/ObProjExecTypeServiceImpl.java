package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.callout.dao.outb.ObProjExecTypeDao;
import com.ulane.callout.model.outb.ObProjExecType;
import com.ulane.callout.model.outb.ObProject;
import com.ulane.callout.service.outb.ObProjExecTypeService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObProjExecTypeServiceImpl extends BaseServiceImpl<ObProjExecType> implements ObProjExecTypeService{
	@SuppressWarnings("unused")
	private ObProjExecTypeDao dao;

	public ObProjExecTypeServiceImpl(ObProjExecTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public void save(String typesStr, ObProject obProject) {
		if(null!=typesStr) {
			String[] types = StringUtils.split(typesStr, ",");
			int iCount = types.length;
			if(iCount>0) {
				for(int i=0;i<iCount;i++) {
					ObProjExecType petObj = new ObProjExecType();
					petObj.setProjectZxfs(Short.valueOf(StringUtils.trim(types[i])));
					petObj.setObProject(obProject);
					dao.save(petObj);
				}
			}
		}
	}

	@Override
	public void removeObj(Long projId) {
			dao.removeObj(projId);
	}
	
}