package com.htsoft.oa.service.communicate;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.communicate.MailBox;

public interface MailBoxService extends BaseService<MailBox>{

	public Long CountByFolderId(Long folderId);
	
	public List<MailBox> findByFolderId(Long folderId);

	public List<MailBox> findBySearch(String searchContent, PagingBean pb);

	public List<MailBox> findBySearch(String searchContent, PagingBean pb, String uploadPath);
}


