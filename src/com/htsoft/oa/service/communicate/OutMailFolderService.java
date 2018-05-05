package com.htsoft.oa.service.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.MailFolder;
import com.htsoft.oa.model.communicate.OutMailFolder;

public interface OutMailFolderService extends BaseService<OutMailFolder>{
	public List<OutMailFolder> getAllUserFolderByParentId(Long userId, Long parentId);
	public List<OutMailFolder> getUserFolderByParentId(Long userId,Long parentId);
	public List<OutMailFolder> getFolderLikePath(String path);
}

