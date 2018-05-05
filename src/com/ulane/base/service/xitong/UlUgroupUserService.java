package com.ulane.base.service.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.base.model.xitong.UlUgroupUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UlUgroupUserService extends BaseService<UlUgroupUser>{
	UlUgroupUser findByGroupAndUser(Long ugroupId,Long userId);
	List<UlUgroupUser> findByUserId(Long long1);
}
