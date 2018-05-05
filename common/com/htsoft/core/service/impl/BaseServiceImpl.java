package com.htsoft.core.service.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.model.TaskLink;
import com.htsoft.core.service.BaseService;
import com.htsoft.core.util.DateUtil;
import com.ulane.core.FileUtils;
import com.ulane.core.PathUtil;


public class BaseServiceImpl<T> extends GenericServiceImpl<T, Long> implements BaseService<T>{

	public BaseServiceImpl(GenericDao dao) {
		super(dao);
	}

	/**
	 * 创建路径
	 * @param filePath
	 * @return
	 */
	@Override
	public String fileName(String filePath) {
		PathUtil p=new PathUtil();
		Date date = new Date();
		String ux = DateUtil.formatUxDate(date);
		String fileDir=ux.substring(0,6);
		String fileName="";
		FileUtils fileUtils=new FileUtils();
		String s;
		String a;
		try {
			s = fileUtils.createFolder(p.getWebRoot()+ "attachFiles/"+filePath);
			a = fileUtils.createFolder(s+"/"+fileDir);
			fileName = p.getWebRoot()+ "attachFiles/"+filePath+"/"+fileDir+"/exports" + ux + ".xls";} 
		catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return fileName;
	}
	/**
	 * 上传
	 * @param req
	 * @param upload
	 * @param fileName
	 * @return
	 */
	@Override
	public String uploadFile(HttpServletRequest req, File upload, String fileName) {
		try {
			req.setCharacterEncoding("UTF-8");
			FileOutputStream fos = new FileOutputStream(fileName);
			FileInputStream fis = new FileInputStream(upload);
			byte[] buffer = new byte[1024];
			int len = 0;
			while ((len = fis.read(buffer)) > 0) {
				fos.write(buffer, 0, len);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fileName;
	}
	
	
	@Override
	public Map<Long, Boolean> getSelectId(final int start, final int limit,
			final String userId, final String type, String firstId) {
		return dao.getSelectId(start, limit, userId, type, firstId);
	}

	@Override
	public int getSelectIdCount(final int start, final int limit,
			final String userId, final String type, String firstId) {
		return dao.getSelectIdCount(start, limit, userId, type, firstId);
	}
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
	public List<TaskLink> taskLinkList(final int start,final int limit,final String createrId,final String taskUserId, final String busType,final String runStatus,final String isOverdue,String proDefinitionName,final String orderBy){
		return dao.taskLinkList(start, limit, createrId, taskUserId, busType, runStatus, isOverdue, proDefinitionName, orderBy);
	}
	
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
	@Override
	public int getTaskLinkListCount(final int start,final int limit,final String createrId,final String taskUserId, final String busType,final String runStatus,final String isOverdue,String proDefinitionName) {
		return dao.getTaskLinkListCount(start, limit, createrId, taskUserId, busType, runStatus, isOverdue, proDefinitionName);
	}

}
