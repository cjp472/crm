package com.ulane.base.model.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * BeanObject Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class BeanExtSet extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = 4808786886172017266L;
	
	protected Long extSetId;
	protected String extName;
	protected Long extType;
	protected String extParam;
	protected Long isStart;
	protected Long beanObjectColumnsId;	
	protected com.ulane.base.model.xitong.BeanObjectColumns BeanObjectColumns;
	
	/**
	 * Default Empty Constructor for class BeanObject
	 */
	public BeanExtSet () {
		super();
	}
	
	public com.ulane.base.model.xitong.BeanObjectColumns getBeanObjectColumns() {
		return BeanObjectColumns;
	}

	public void setBeanObjectColumns(
			com.ulane.base.model.xitong.BeanObjectColumns beanObjectColumns) {
		BeanObjectColumns = beanObjectColumns;
	}

	/**
	 * Default Key Fields Constructor for class BeanObject
	 */
	public BeanExtSet (
		 Long in_ExtId
        ) {
		this.setExtSetId(in_ExtId);
    }

	public Long getExtSetId() {
		return extSetId;
	}

	public void setExtSetId(Long extSetId) {
		this.extSetId = extSetId;
	}

	public String getExtName() {
		return extName;
	}

	public void setExtName(String name) {
		this.extName = name;
	}

	public Long getExtType() {
		return extType;
	}

	public void setExtType(Long type) {
		this.extType = type;
	}

	public String getExtParam() {
		return extParam;
	}

	public void setExtParam(String param) {
		this.extParam = param;
	}

	public Long getIsStart() {
		return isStart;
	}

	public void setIsStart(Long isStart) {
		this.isStart = isStart;
	}

	public Long getBeanObjectColumnsId() {
		return beanObjectColumnsId;
	}

	public void setBeanObjectColumnsId(Long beanObjectColumnsId) {
		this.beanObjectColumnsId = beanObjectColumnsId;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof BeanExtSet)) {
			return false;
		}
		BeanExtSet rhs = (BeanExtSet) object;
		return new EqualsBuilder()
				.append(this.extSetId, rhs.extSetId)
				.append(this.isStart, rhs.isStart)
				.append(this.extParam, rhs.extParam)
				.append(this.extParam, rhs.extParam)
				.append(this.extType, rhs.extType)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.extSetId)
				.append(this.extType)
				.append(this.isStart)
				.append(this.extParam)
				.append(this.extName)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("extSetId", this.extSetId) 
				.append("extType", this.extType) 
				.append("isStart", this.isStart) 
				.append("extParam", this.extParam)
				.append("extName", this.extName)
				.toString();
	}



}
