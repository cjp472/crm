package com.htsoft.core.jbpm.pv;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;

/**
 * 流程变量
 * @author cf0666@gmail.com
 *
 */
public class ParamInfo implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 变量显示的标签
	 */
	private String label;
	/**
	 * 变量名称
	 */
	private String name;
	/**
	 * 变量值  可以为Date,Short,String,Long,Decimal等类型
	 */
	private Object value;
	/**
	 * 是否显示在审批结果中
	 */
	private boolean isShow;
	
	
	public ParamInfo() {
		// TODO Auto-generated constructor stub
	}
	
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}

	public boolean isShow() {
		return isShow;
	}

	public void setShow(boolean isShow) {
		this.isShow = isShow;
	}

}
