package com.htsoft.core.jbpm.pv;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;
import java.util.LinkedList;

/**
 * 流程表单
 * @author cf0666@gmail.com
 *
 */
public class ProcessForm implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 流程中的活动名称
	 */
	private String activityName;
	/**
	 * 流程中的表单值
	 */
	private LinkedList<ParamInfo> params=new LinkedList<ParamInfo>();
	
	public ProcessForm() {
		
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public LinkedList<ParamInfo> getParams() {
		return params;
	}

	public void setParams(LinkedList<ParamInfo> params) {
		this.params = params;
	}
	
	
}
