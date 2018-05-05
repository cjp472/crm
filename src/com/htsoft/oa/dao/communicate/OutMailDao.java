package com.htsoft.oa.dao.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.communicate.OutMail;
import java.util.*;

/**
 * 
 * @author 
 *
 */
public interface OutMailDao extends BaseDao<OutMail>{
	public List<OutMail> findByFolderId(Long folderId);
	public Long CountByFolderId(Long folderId);
	public Map getUidByUserId(Long userId);
}