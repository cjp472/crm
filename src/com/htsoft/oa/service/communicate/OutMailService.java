package com.htsoft.oa.service.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.MailBox;
import com.htsoft.oa.model.communicate.OutMail;

public interface OutMailService extends BaseService<OutMail>{
	public List<OutMail> findByFolderId(Long folderId);
	public Long CountByFolderId(Long folderId);
	public Map getUidByUserId(Long userId);
	
}


