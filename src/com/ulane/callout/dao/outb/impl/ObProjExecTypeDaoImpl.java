package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.ulane.callout.dao.outb.ObProjExecTypeDao;
import com.ulane.callout.model.outb.ObProjExecType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObProjExecTypeDaoImpl extends BaseDaoImpl<ObProjExecType> implements ObProjExecTypeDao{

	public ObProjExecTypeDaoImpl() {
		super(ObProjExecType.class);
	}

	@Override
	public void removeObj(Long id) {
		String SQL = "delete from ob_proj_exec_type where proj_id="+id;
		jdbcTemplate.execute(SQL);
		String SQL2 = "delete from ob_proj_exec_type where proj_id is null";
		jdbcTemplate.execute(SQL2);
	}
}