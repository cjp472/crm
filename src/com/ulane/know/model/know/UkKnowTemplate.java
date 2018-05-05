package com.ulane.know.model.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.system.Dictionary;
import com.ulane.base.model.xitong.SysTemType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * UkKnowTemplate Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UkKnowTemplate extends com.htsoft.core.model.BaseModel {

    protected Long knowTmpId;
	protected String tmpName;
	protected String tmpDescribe;
	protected java.util.Date beginTime;
	protected java.util.Date closeTime;
	protected java.util.Date updateTime;
	protected Integer knowStatus;
	protected Long knowVersion;
	protected String createBy;
	protected String updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected Long isDelete;

	
	/**
	 * 新增字段
	 * @author zhangyl
	 */
	protected String tempContent;
	protected String extDef;
	protected Dictionary  knowTmpType;	//KNOW_TMP_TYPE	模版分类

	protected java.util.Set ukKnowTypes = new java.util.HashSet();
	protected java.util.Set ukSysKnows = new java.util.HashSet();
	
	protected Dictionary knowTmpClass;	//KNOW_TMP_CLASS 类别
	protected Dictionary knowTmpRange;  	//KNOW_TMP_RANGE 范围

	/**
	 * Default Empty Constructor for class UkKnowTemplate
	 */
	public UkKnowTemplate () {
		super();
	}
	
	
	
	public Dictionary getKnowTmpClass() {
		return knowTmpClass;
	}



	public void setKnowTmpClass(Dictionary knowTmpClass) {
		this.knowTmpClass = knowTmpClass;
	}



	public Dictionary getKnowTmpRange() {
		return knowTmpRange;
	}



	public void setKnowTmpRange(Dictionary knowTmpRange) {
		this.knowTmpRange = knowTmpRange;
	}



	public String getTempContent() {
		return tempContent;
	}

	public void setTempContent(String tempContent) {
		this.tempContent = tempContent;
	}

	public String getExtDef() {
		return extDef;
	}

	public void setExtDef(String extDef) {
		this.extDef = extDef;
	}
	
	public Dictionary getKnowTmpType() {
		return knowTmpType;
	}

	public void setKnowTmpType(Dictionary knowTmpType) {
		this.knowTmpType = knowTmpType;
	}

	/**
	 * Default Key Fields Constructor for class UkKnowTemplate
	 */
	public UkKnowTemplate (
		 Long in_knowTmpId
        ) {
		this.setKnowTmpId(in_knowTmpId);
    }


	public Long getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Long isDelete) {
		this.isDelete = isDelete;
	}

	public java.util.Set getUkKnowTypes () {
		return ukKnowTypes;
	}	
	
	public void setUkKnowTypes (java.util.Set in_ukKnowTypes) {
		this.ukKnowTypes = in_ukKnowTypes;
	}

	public java.util.Set getUkSysKnows () {
		return ukSysKnows;
	}	
	
	public void setUkSysKnows (java.util.Set in_ukSysKnows) {
		this.ukSysKnows = in_ukSysKnows;
	}
    

	/**
	 * 知识模板编号	 * @return Long
     * @hibernate.id column="KNOW_TMP_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getKnowTmpId() {
		return this.knowTmpId;
	}
	
	/**
	 * Set the knowTmpId
	 */	
	public void setKnowTmpId(Long aValue) {
		this.knowTmpId = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="TMP_NAME" type="java.lang.String" length="30" not-null="false" unique="false"
	 */
	public String getTmpName() {
		return this.tmpName;
	}
	
	/**
	 * Set the tmpName
	 */	
	public void setTmpName(String aValue) {
		this.tmpName = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="TMP_DESCRIBE" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getTmpDescribe() {
		return this.tmpDescribe;
	}
	
	/**
	 * Set the tmpDescribe
	 */	
	public void setTmpDescribe(String aValue) {
		this.tmpDescribe = aValue;
	}	

	/**
	 * 启用时间	 * @return java.util.Date
	 * @hibernate.property column="BEGIN_TIME" type="java.util.Date" length="11" not-null="false" unique="false"
	 */
	public java.util.Date getBeginTime() {
		return this.beginTime;
	}
	
	/**
	 * Set the beginTime
	 */	
	public void setBeginTime(java.util.Date aValue) {
		this.beginTime = aValue;
	}	

	/**
	 * 关闭时间	 * @return java.util.Date
	 * @hibernate.property column="CLOSE_TIME" type="java.util.Date" length="11" not-null="false" unique="false"
	 */
	public java.util.Date getCloseTime() {
		return this.closeTime;
	}
	
	/**
	 * Set the closeTime
	 */	
	public void setCloseTime(java.util.Date aValue) {
		this.closeTime = aValue;
	}	

	/**
	 * 更新时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="11" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}
	
	/**
	 * Set the updateTime
	 */	
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}	

	/**
	 * 状态&KNOW_STATUS	 * @return Integer
	 * @hibernate.property column="KNOW_STATUS" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getKnowStatus() {
		return this.knowStatus;
	}
	
	/**
	 * Set the knowStatus
	 */	
	public void setKnowStatus(Integer aValue) {
		this.knowStatus = aValue;
	}	

	/**
	 * 版本号	 * @return Long
	 * @hibernate.property column="KNOW_VERSION" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getKnowVersion() {
		return this.knowVersion;
	}
	
	/**
	 * Set the knowVersion
	 */	
	public void setKnowVersion(Long aValue) {
		this.knowVersion = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.String" length="38" not-null="false" unique="false"
	 */
	public String getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(String aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.String" length="38" not-null="false" unique="false"
	 */
	public String getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(String aValue) {
		this.updateBy = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="11" not-null="false" unique="false"
	 */
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	/**
	 * Set the createDate
	 */	
	public void setCreateDate(java.util.Date aValue) {
		this.createDate = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="UPDATE_DATE" type="java.util.Date" length="11" not-null="false" unique="false"
	 */
	public java.util.Date getUpdateDate() {
		return this.updateDate;
	}
	
	/**
	 * Set the updateDate
	 */	
	public void setUpdateDate(java.util.Date aValue) {
		this.updateDate = aValue;
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UkKnowTemplate other = (UkKnowTemplate) obj;
		if (beginTime == null) {
			if (other.beginTime != null)
				return false;
		} else if (!beginTime.equals(other.beginTime))
			return false;
		if (closeTime == null) {
			if (other.closeTime != null)
				return false;
		} else if (!closeTime.equals(other.closeTime))
			return false;
		if (createBy == null) {
			if (other.createBy != null)
				return false;
		} else if (!createBy.equals(other.createBy))
			return false;
		if (createDate == null) {
			if (other.createDate != null)
				return false;
		} else if (!createDate.equals(other.createDate))
			return false;
		if (extDef == null) {
			if (other.extDef != null)
				return false;
		} else if (!extDef.equals(other.extDef))
			return false;
		if (isDelete == null) {
			if (other.isDelete != null)
				return false;
		} else if (!isDelete.equals(other.isDelete))
			return false;
		if (knowStatus == null) {
			if (other.knowStatus != null)
				return false;
		} else if (!knowStatus.equals(other.knowStatus))
			return false;
		if (knowTmpClass == null) {
			if (other.knowTmpClass != null)
				return false;
		} else if (!knowTmpClass.equals(other.knowTmpClass))
			return false;
		if (knowTmpId == null) {
			if (other.knowTmpId != null)
				return false;
		} else if (!knowTmpId.equals(other.knowTmpId))
			return false;
		if (knowTmpRange == null) {
			if (other.knowTmpRange != null)
				return false;
		} else if (!knowTmpRange.equals(other.knowTmpRange))
			return false;
		if (knowTmpType == null) {
			if (other.knowTmpType != null)
				return false;
		} else if (!knowTmpType.equals(other.knowTmpType))
			return false;
		if (knowVersion == null) {
			if (other.knowVersion != null)
				return false;
		} else if (!knowVersion.equals(other.knowVersion))
			return false;
		if (tempContent == null) {
			if (other.tempContent != null)
				return false;
		} else if (!tempContent.equals(other.tempContent))
			return false;
		if (tmpDescribe == null) {
			if (other.tmpDescribe != null)
				return false;
		} else if (!tmpDescribe.equals(other.tmpDescribe))
			return false;
		if (tmpName == null) {
			if (other.tmpName != null)
				return false;
		} else if (!tmpName.equals(other.tmpName))
			return false;
		if (ukKnowTypes == null) {
			if (other.ukKnowTypes != null)
				return false;
		} else if (!ukKnowTypes.equals(other.ukKnowTypes))
			return false;
		if (ukSysKnows == null) {
			if (other.ukSysKnows != null)
				return false;
		} else if (!ukSysKnows.equals(other.ukSysKnows))
			return false;
		if (updateBy == null) {
			if (other.updateBy != null)
				return false;
		} else if (!updateBy.equals(other.updateBy))
			return false;
		if (updateDate == null) {
			if (other.updateDate != null)
				return false;
		} else if (!updateDate.equals(other.updateDate))
			return false;
		if (updateTime == null) {
			if (other.updateTime != null)
				return false;
		} else if (!updateTime.equals(other.updateTime))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((beginTime == null) ? 0 : beginTime.hashCode());
		result = prime * result
				+ ((closeTime == null) ? 0 : closeTime.hashCode());
		result = prime * result
				+ ((createBy == null) ? 0 : createBy.hashCode());
		result = prime * result
				+ ((createDate == null) ? 0 : createDate.hashCode());
		result = prime * result + ((extDef == null) ? 0 : extDef.hashCode());
		result = prime * result
				+ ((isDelete == null) ? 0 : isDelete.hashCode());
		result = prime * result
				+ ((knowStatus == null) ? 0 : knowStatus.hashCode());
		result = prime * result
				+ ((knowTmpClass == null) ? 0 : knowTmpClass.hashCode());
		result = prime * result
				+ ((knowTmpId == null) ? 0 : knowTmpId.hashCode());
		result = prime * result
				+ ((knowTmpRange == null) ? 0 : knowTmpRange.hashCode());
		result = prime * result
				+ ((knowTmpType == null) ? 0 : knowTmpType.hashCode());
		result = prime * result
				+ ((knowVersion == null) ? 0 : knowVersion.hashCode());
		result = prime * result
				+ ((tempContent == null) ? 0 : tempContent.hashCode());
		result = prime * result
				+ ((tmpDescribe == null) ? 0 : tmpDescribe.hashCode());
		result = prime * result + ((tmpName == null) ? 0 : tmpName.hashCode());
		result = prime * result
				+ ((ukKnowTypes == null) ? 0 : ukKnowTypes.hashCode());
		result = prime * result
				+ ((ukSysKnows == null) ? 0 : ukSysKnows.hashCode());
		result = prime * result
				+ ((updateBy == null) ? 0 : updateBy.hashCode());
		result = prime * result
				+ ((updateDate == null) ? 0 : updateDate.hashCode());
		result = prime * result
				+ ((updateTime == null) ? 0 : updateTime.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UkKnowTemplate [beginTime=" + beginTime + ", closeTime="
				+ closeTime + ", createBy=" + createBy + ", createDate="
				+ createDate + ", extDef=" + extDef + ", isDelete=" + isDelete
				+ ", knowStatus=" + knowStatus + ", knowTmpClass="
				+ knowTmpClass + ", knowTmpId=" + knowTmpId + ", knowTmpRange="
				+ knowTmpRange + ", knowTmpType=" + knowTmpType
				+ ", knowVersion=" + knowVersion + ", tempContent="
				+ tempContent + ", tmpDescribe=" + tmpDescribe + ", tmpName="
				+ tmpName + ", ukKnowTypes=" + ukKnowTypes + ", ukSysKnows="
				+ ukSysKnows + ", updateBy=" + updateBy + ", updateDate="
				+ updateDate + ", updateTime=" + updateTime + "]";
	}



}
