package com.ulane.base.dao.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.AppUser;
import com.ulane.base.model.xitong.UlBbsJieshou;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface UlBbsJieshouDao extends BaseDao<UlBbsJieshou>{
	
	public List<UlBbsJieshou> findByUser(Long userId);
	
}