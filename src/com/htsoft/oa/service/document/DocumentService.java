package com.htsoft.oa.service.document;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppUser;

public interface DocumentService extends BaseService<Document>{
	public List<Document> findByIsShared(Document document, Date from, Date to,
			Long userId, ArrayList<Long> roleIds, Long depId, PagingBean pb);
	public List<Document> findByPublic(String path,Document document,Date from,Date to,AppUser appUser,PagingBean pb);
	public List<Document> findByPersonal(Long userId,Document document,Date from,Date to,String path,PagingBean pb);
	/**
	 * 根据文件夹查找文档下面所有层的文档
	 */
	public List<Document> findByFolder(String path);
	/**
	 * 根据当前用户查找他可以看的文档，包括个人文档，共享文档，公共文档。
	 */
	public List<Document> searchDocument(AppUser appUser,String content,PagingBean pb);
	
	/**
	 * 查找某个文件夹的文档
	 */
	public List<Document> findByFolder(Long folderId);
	/**
	 * 根据文件夹个人查找个人文档
	 */
	public List<Document> findByPersonal(Long userId,Document document,Date from,Date to,String path);
	/**
	 * 查找在线文档
	 * @param doc
	 * @param from
	 * @param to
	 * @return
	 */
	public List<Document> findByOnline(Document doc,Date from,Date to,AppUser user);
}


