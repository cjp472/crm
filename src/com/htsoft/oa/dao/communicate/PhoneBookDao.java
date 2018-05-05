package com.htsoft.oa.dao.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.communicate.PhoneBook;

/**
 * 
 * @author 
 *
 */
public interface PhoneBookDao extends BaseDao<PhoneBook>{
	public List<PhoneBook> sharedPhoneBooks(String fullname,String ownerName,PagingBean pb); 
}