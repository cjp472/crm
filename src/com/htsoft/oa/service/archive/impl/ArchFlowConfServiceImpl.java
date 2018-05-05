package com.htsoft.oa.service.archive.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.archive.ArchFlowConfDao;
import com.htsoft.oa.model.archive.ArchFlowConf;
import com.htsoft.oa.service.archive.ArchFlowConfService;

public class ArchFlowConfServiceImpl extends BaseServiceImpl<ArchFlowConf> implements ArchFlowConfService{
	private ArchFlowConfDao dao;
	
	public ArchFlowConfServiceImpl(ArchFlowConfDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public ArchFlowConf getByFlowType(Short archType) {
		return dao.getByFlowType(archType);
	}

	@Override
	public Long getDefId(Short archType) {
		ArchFlowConf ac=  getByFlowType(archType);
		if(ac !=null){
			return ac.getDefId();
		}else{
			return null;
		}
		
	}

}