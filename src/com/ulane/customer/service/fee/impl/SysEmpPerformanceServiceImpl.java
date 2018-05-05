package com.ulane.customer.service.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.ulane.base.dao.xitong.UlUsergroupDao;
import com.ulane.customer.dao.fee.SysEmpPerformanceDao;
import com.ulane.customer.model.fee.CopyOfSysEmpPerformancevo;
import com.ulane.customer.model.fee.SysEmpPerformance;
import com.ulane.customer.service.fee.SysEmpPerformanceService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class SysEmpPerformanceServiceImpl extends BaseServiceImpl<SysEmpPerformance> implements SysEmpPerformanceService{
	@SuppressWarnings("unused")
	private SysEmpPerformanceDao dao;
	@Resource
	private UlUsergroupDao ulUsergroupDao;
	public SysEmpPerformanceServiceImpl(SysEmpPerformanceDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public String getSummaryBizOrderFee(String employeeNo) {
		Long deptId = ContextUtil.getCurrentUser().getDepartment().getDepId();
		return dao.getSummaryBizOrderFee(employeeNo, deptId);
	}
	@Override
	public List<SysEmpPerformance> findYongJin(String zhouqi,String jidu,String userNo,String perDatSta,String perDatEnd) {
		// TODO Auto-generated method stub
		return dao.findYongJin(zhouqi,jidu,userNo, perDatSta, perDatEnd);
	}
	@Override
	public List<CopyOfSysEmpPerformancevo> findYongJinByQuarter(String userNo,
			String ny, String zhouqi) {
		// TODO Auto-generated method stub
		return dao.findYongJinByQuarter(userNo, ny, zhouqi);
	}

}