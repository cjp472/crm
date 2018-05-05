package com.ulane.base.service.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.base.model.xitong.BmBillNum;

public interface BmBillNumService extends BaseService<BmBillNum>{
	
	/**
	 * 获得业务单据对应的单据号字段名
	 */
	public String getField(int billType);
	/**
	 * 获得业务单据对应的单据号对象名
	 */
	public String getObject(int billType);
	public String getCondition(int billType);
	public String getPK(int billType);
	
	/**
	 * 获得新单据号
	 * @param billType  单据类型（在系统管理》数据字典》财务系统设置》单据类型及业务处理   中 后台提交的值）
	 * @param billId    单据号，可以为0
	 * @return
	 */
	public String getBillNum(int billType,Long billId);
	
	
	/**
	 * 获得新单据号
	 * @param billType  业务单据类型（在系统管理》数据字典》财务系统设置》单据类型及业务处理   中 后台提交的值）
	 * @param billId    业务单据主键号，如果没取影响因素可以为0
	 * @param billField 业务单据中单据编号的字段名
	 * @param PKField   业务单据中主键字段名
	 * @param TableName 业务单据对象名
	 * @param condition 业务单据查询条件
	 * @return
	 */	
	String getBillNum(int billType, Long billId, String billField, String PKField, String TableName, String condition);
		
}


