package com.ulane.customer.service.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.customer.model.customer.CusContact;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface CusContactService extends BaseService<CusContact>{
	public List<CusContact> queryByCusId(Long cusId);
	
	/**
	 * 更加客户内码，查询客户联系方式（呼入呼出弹屏界面的联系方式）
	 * @param cusId
	 * @return
	 */
	public String listCus(String cusId);
}


