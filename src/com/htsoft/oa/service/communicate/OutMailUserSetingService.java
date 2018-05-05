package com.htsoft.oa.service.communicate;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.communicate.OutMailUserSeting;

/**
 * @description 外部邮箱管理
 * @class OutMailUserSetingService
 * 
 */
public interface OutMailUserSetingService extends BaseService<OutMailUserSeting> {

	OutMailUserSeting getByLoginId(Long loginid);
	
    public List findByUserAll();
	
    public List<OutMailUserSeting> findByUserAll(String userName,PagingBean pb);
}
