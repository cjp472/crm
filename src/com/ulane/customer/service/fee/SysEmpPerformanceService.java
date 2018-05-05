package com.ulane.customer.service.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.customer.model.fee.CopyOfSysEmpPerformancevo;
import com.ulane.customer.model.fee.SysEmpPerformance;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface SysEmpPerformanceService extends BaseService<SysEmpPerformance>{
	
	/**
	 * 查询汇总信息中的销售额：个人销售额、小组销售额、平均销售额
	 * @return
	 */
	public String getSummaryBizOrderFee(String employeeNo);
	//佣金详细信息（季度and月份）
	public List<SysEmpPerformance> findYongJin(String zhouqi,String jidu,String userNo,String perDatSta,String perDatEnd); 
	//统计季度佣金
	public List<CopyOfSysEmpPerformancevo> findYongJinByQuarter(String userNo,String ny, String zhouqi);
	
}


