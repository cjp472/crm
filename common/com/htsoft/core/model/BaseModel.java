package com.htsoft.core.model;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.io.Serializable;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import flexjson.JSON;
/**
 * Base model
 * @author 
 *
 */
public class BaseModel implements Serializable{
	protected Log logger=LogFactory.getLog(BaseModel.class);
	private Integer version;
	@JSON(include=false)
	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}
	
//	public boolean equals(Object obj) {
//		return EqualsBuilder.reflectionEquals(this, obj);
//	}
//
//	public int hashCode() {
//		return HashCodeBuilder.reflectionHashCode(this);
//	}
//
//	public String toString() {
//		return ToStringBuilder.reflectionToString(this);
//	}
	
}
