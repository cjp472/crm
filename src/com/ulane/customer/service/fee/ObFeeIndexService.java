package com.ulane.customer.service.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.customer.model.fee.ObFeeIndex;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface ObFeeIndexService extends BaseService<ObFeeIndex>{
	public Object findDepId(Long depid);

}


