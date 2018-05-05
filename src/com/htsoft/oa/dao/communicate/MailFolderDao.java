package com.htsoft.oa.dao.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.communicate.MailFolder;
import com.htsoft.oa.model.document.DocFolder;

/**
 * 
 * @author 
 *
 */
public interface MailFolderDao extends BaseDao<MailFolder>{

	public List<MailFolder> getUserFolderByParentId(Long userId, Long parentId);

	public List<MailFolder> getAllUserFolderByParentId(Long userId,Long parentId);

	public List<MailFolder> getFolderLikePath(String path);
	
}