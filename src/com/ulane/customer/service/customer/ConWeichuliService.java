package com.ulane.customer.service.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.customer.model.customer.ConWeichuli;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ConWeichuliService extends BaseService<ConWeichuli>{
	public boolean moveToConWeichuli(String[] ids,String lanjieMove,String dealResId,String dealRemarks);
}

