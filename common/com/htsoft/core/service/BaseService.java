package com.htsoft.core.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.htsoft.core.model.TaskLink;


/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
/**
 * 
 * @author cf0666@gmail.com
 *
 * @param <T>实体类
 */
public interface BaseService<T> extends GenericService<T, Long>{
	
	
	/**
	 * 上传
	 * @param req
	 * @param upload
	 * @param fileName
	 * @return
	 */
	public String uploadFile(HttpServletRequest req,File upload,String fileName);
	/**
	 * 创建路径
	 * @param filePath
	 * @return
	 */
	public String fileName(String filePath);
	
	/**
	 * 分页计算函数
	 * 
	 * @param start
	 * @param limit
	 * @param userId
	 * @return
	 */
	public Map<Long, Boolean> getSelectId(final int start, final int limit,
			final String userId, final String type, String firstId);

	/**
	 * 分页计算得到记录数
	 * 
	 * @param start
	 * @param limit
	 * @param userId
	 * @return
	 */
	public int getSelectIdCount(final int start, final int limit,
			final String userId, final String type, String firstId);
	
	/**
	 * 根据条件获取工单
	 * @param start				开始页
	 * @param limit				结束页
	 * @param createrId			创建人(or 受理人)
	 * @param taskUserId		处理人
	 * @param busType			工单类型
	 * @param runStatus			运行状态
	 * @param isOverdue			是否过期
	 * @return List<TaskLink>
	 */
	public List<TaskLink> taskLinkList(final int start,final int limit,final String createrId,final String taskUserId, final String busType,final String runStatus,final String isOverdue,String proDefinitionName,final String orderBy);
	/**
	 * 获得工单的条数
	 * @param start				开始页
	 * @param limit				结束页
	 * @param createrId			创建人(or 受理人)
	 * @param taskUserId		处理人
	 * @param busType			工单类型
	 * @param runStatus			运行状态
	 * @param isOverdue			是否过期
	 * @return List<TaskLink>
	 */
	public int getTaskLinkListCount(final int start,final int limit,final String createrId,final String taskUserId, final String busType,final String runStatus,final String isOverdue,String proDefinitionName);
}
