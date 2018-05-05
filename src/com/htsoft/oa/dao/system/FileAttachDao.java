package com.htsoft.oa.dao.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.FileAttach;

/**
 * @description 附件分类管理
 * @author YHZ
 * @company www.ulane.cn
 * @datatime 2010-11-20PM
 * 
 */
public interface FileAttachDao extends BaseDao<FileAttach> {

	void removeByPath(String filePath);

	/**
	 * 按文件路径取得路径
	 */
	FileAttach getByPath(String filePath);

	/**
	 * 分页查询图片
	 * 参数[pb:PagingBean,filePath:fileType搜索条件,bo:boolean{true:file文件,false:
	 * image图片}]
	 */
	List<FileAttach> fileList(PagingBean pb, String fileType, boolean bo);

	/**
	 * @description 根据fileType查询所有满足条件的数据
	 * @param fileType
	 *            fileType搜索条件
	 * @return List<FileAttach>
	 */
	List<FileAttach> fileList(String fileType);
}