package com.ulane.know.service.know;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.know.model.know.UkSysKnow;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public interface UkSysKnowService extends BaseService<UkSysKnow> {
	/**
	 * 点评排行
	 * 
	 * @return
	 */
	public List<UkSysKnow> findDianPing();

	// 根据状态取得所有知识列表
	public List<UkSysKnow> findByStatus(int status);

	// 根据状态和审批id取得知识列表
	public List<UkSysKnow> findByStatusAndId(int status, long knowApproveId);

	// 根据审批id取得知识列表
	public List<UkSysKnow> findByApproveId(long knowApproveId);
	public List<UkSysKnow> findInStatus(String status);
	/**
	 * 过期知识查询
	 * @param keyWordName
	 * @param knowTypeName
	 * @param minPastTime
	 * @param maxPastTime
	 * @param title
	 * @return
	 * @updateTime 2012年8月30日 12:21:19
	 */
	public List<UkSysKnow> expiredKnow(String keyWordName, String knowTypeName,
			String minPastTime, String maxPastTime,String title);

	/**
	 * @methodName 知识全文搜索(*用于知识搜索*)
	 * @param searchContent
	 *            搜索内容
	 * @param pb
	 *            分页
	 * @param uploadPath
	 *            索引路径
	 * @param old
	 *            是否过期
	 * @param drop
	 *            是否废弃
	 * @return List<UkSysKnow>
	 * @author zhangyl
	 * @createtime 2012年6月29日 16:49:04
	 */
	public List<UkSysKnow> findBySearch(String searchContent, PagingBean pb,
			String uploadPath, String old, String drop);

	/**
	 * @methodName 根据标题,业务类型,关键字,是否过期,是否作废查询(*用于知识搜索*)
	 * @param searchContent
	 *            搜索内容
	 * @param pb
	 *            分页
	 * @param title
	 *            标题
	 * @param type
	 *            业务类型
	 * @param keyword
	 *            关键字
	 * @param old
	 *            是否过期
	 * @param drop
	 *            是否作废
	 * @return List<UkSysKnow>
	 * @author zhangyl
	 * @createtime 2012年6月29日 16:49:04
	 */
	public List<UkSysKnow> findByNoSearch(String searchContent, PagingBean pb,
			String title, String type, String keyword, String old, String drop);
	//删除中间表uk_sys_know_customer
	public boolean delete_real(Long ukKnowId);
	//删除中间表uk_dimensionality_know
	public boolean delete_dimensionality_know(Long ukKnowId);
	/**
	 *  知识查询通用方法
	 *  @param title 知识标题
	 *  @param keyWordName 关键字名称
	 *  @param knowTypeName 知识类型名称
	 *  @param isNew  是否是最新的
	 *  @param isViewCount 是否是排行榜
	 *  @param isdianpingCount 点评榜
	 *  @param status 知识状态
	 *  @param isDel 是否删除
	 *  @param isOverdue 是否过期
	 *  @param knowTypeId 知识类型ID(用于知识分类树型控件检索)
	 *  @param minPastTime 最小过期时间
	 *  @param maxPastTime 最大过期时间
	 *  @param NEQStatus  不等于什么状态
	 *  @param isPermission 是否验证权限
	 *  @param busiType 业务类型
	 *  @param checkTypeRole 分类权限验证
	 *  @author zhangyl
	 *  @createtime 2012年8月30日 10:44:29
	 */
	public List<UkSysKnow> queryKnow(final int start,final int limit,String title,String keyWordName, String knowTypeName , String isNew, String isViewCount, String isdianpingCount , String status , String IS_DEL , String isOverdue ,String knowTypeId,String minPastTime, String maxPastTime , String NEQStatus , String isPermission,String busiType,String checkTypeRole);
	/**
	 *  知识查询通用方法(获得查询条数)
	 *  @param title 知识标题
	 *  @param keyWordName 关键字名称
	 *  @param knowTypeName 知识类型名称
	 *  @param isNew  是否是最新的
	 *  @param isViewCount 是否是排行榜
	 *  @param isdianpingCount 点评榜
	 *  @param status 知识状态
	 *  @param isDel 是否删除
	 *  @param isOverdue 是否过期
	 *  @param knowTypeId 知识类型ID(用于知识分类树型控件检索)
	 *  @param minPastTime 最小过期时间
	 *  @param maxPastTime 最大过期时间
	 *  @param NEQStatus  不等于什么状态
	 *  @param isPermission 是否验证权限
	 *  @param busiType 业务类型
	 *  @param checkTypeRole 分类权限验证
	 *  @author zhangyl
	 *  @createtime 2012年8月30日 10:44:29
	 */
	public int queryKnowCount(final int start,final int limit,String title,String keyWordName, String knowTypeName , String isNew, String isViewCount, String isdianpingCount , String status , String IS_DEL , String isOverdue ,String knowTypeId,String minPastTime, String maxPastTime , String NEQStatus , String isPermission , String busiType,String checkTypeRole);

	
	//保存浏览数
	public void saveCount(Long knowId);
	
	/**
	 * 查询知识订阅
	 * @param start
	 * @param limit
	 * @param busiType
	 * @param knowType
	 * @param keyWord
	 * @param STitle
	 * @param SBusiType
	 * @return
	 */
	public List<UkSysKnow> findByDingYue(final int start,final int limit,String busiType,String knowType,String keyWord,String STitle,String SBusiType);
	
	/**
	 * 查询知识订阅(条目)
	 * @param start
	 * @param limit
	 * @param busiType
	 * @param knowType
	 * @param keyWord
	 * @param STitle
	 * @param SBusiType
	 * @return
	 */
	public int findByDingYueCount(final int start,final int limit,String busiType,String knowType,String keyWord,String STitle,String SBusiType);
	
	/**
	 * 修改知识的状态
	 * @param knowId
	 */
	public void updateKnowStatus(String knowId,String knowStatus);
	/**
	 * 查询我的知识
	 * @param start
	 * @param limit
	 * @param title
	 * @param keyWordName
	 * @param mark
	 * @param dimenId
	 * @param dimStrIds
	 * @return
	 */
	public List<UkSysKnow> findMyKnow(final int start,final int limit,String title,String keyWordName,String mark,String dimenId,String dimStrIds);
	
	/**
	 * 获得我的知识条数
	 * @param start
	 * @param limit
	 * @param title
	 * @param keyWordName
	 * @param mark
	 * @param dimenId
	 * @param dimStrIds
	 * @return
	 */
	public int countMyKnow(final int start,final int limit,String title,String keyWordName,String mark,String dimenId,String dimStrIds);
}
