package com.ulane.customer.service.customer.impl;

import java.util.List;

import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.model.system.AgentReport;
import com.ulane.customer.dao.customer.CusReportDao;
import com.ulane.customer.model.customer.CusSpeEve;
import com.ulane.customer.service.customer.CusReportService;

public class CusReportServiceImpl implements CusReportService {


	private CusReportDao cusReportDao;
	
	
	
	public CusReportDao getCusReportDao() {
		return cusReportDao;
	}



	public void setCusReportDao(CusReportDao cusReportDao) {
		this.cusReportDao = cusReportDao;
	}



	@Override
	public List getAllReport() {
		System.out.println("111service --- > list");
		List list = cusReportDao.getAllReport();
		System.out.println("222service --- > list"+list.size());
		return list;
	}
	
}
