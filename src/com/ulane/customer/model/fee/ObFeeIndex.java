package com.ulane.customer.model.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/

/**
 * ObFeeIndex Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObFeeIndex extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = -2188143452549460751L;
	
	protected Long feeIndexId;
	protected String feeIndexName;
	protected String annual;
	protected Short cycle;
	protected String comments;
	protected Long createBy;
	protected Long updateBy;
//	protected Long depId;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected Short staId;
	protected java.util.Set<com.ulane.customer.model.fee.ObFeeIndexLevel> obFeeIndexLevels = new java.util.HashSet<com.ulane.customer.model.fee.ObFeeIndexLevel>();
	protected java.util.Set<com.htsoft.oa.model.system.AppUser> obFeeIndexUsers = new java.util.HashSet<com.htsoft.oa.model.system.AppUser>();
	protected java.util.Set<com.ulane.base.model.xitong.UlEmployee> ulEmployees = new java.util.HashSet<com.ulane.base.model.xitong.UlEmployee>();
	
	
	//处理字段
	protected String depNam;
	public String getDepNam() {
		return depNam;
	}


	public void setDepNam(String depNam) {
		this.depNam = depNam;
	}


	public String getUseNam() {
		return useNam;
	}


	public void setUseNam(String useNam) {
		this.useNam = useNam;
	}

	protected String useNam;
	
	/**
	 * Default Empty Constructor for class ObFeeIndex
	 */
	public ObFeeIndex () {
		super();
	}
	

	public java.util.Set<com.htsoft.oa.model.system.AppUser> getObFeeIndexUsers() {
		return obFeeIndexUsers;
	}


	public void setObFeeIndexUsers(
			java.util.Set<com.htsoft.oa.model.system.AppUser> obFeeIndexUsers) {
		this.obFeeIndexUsers = obFeeIndexUsers;
	}

	public java.util.Set<com.ulane.base.model.xitong.UlEmployee> getUlEmployees() {
		return ulEmployees;
	}



	public void setUlEmployees(
			java.util.Set<com.ulane.base.model.xitong.UlEmployee> ulEmployees) {
		this.ulEmployees = ulEmployees;
	}



	/**
	 * Default Key Fields Constructor for class ObFeeIndex
	 */
	public ObFeeIndex (
		 Long in_feeIndexId
        ) {
		this.setFeeIndexId(in_feeIndexId);
    }


//	public Long getDepId() {
//		return depId;
//	}
//
//	public void setDepId(Long depId) {
//		this.depId = depId;
//	}

	public java.util.Set<com.ulane.customer.model.fee.ObFeeIndexLevel> getObFeeIndexLevels () {
		return obFeeIndexLevels;
	}	
	
	public void setObFeeIndexLevels (java.util.Set<com.ulane.customer.model.fee.ObFeeIndexLevel> in_obFeeIndexLevels) {
		this.obFeeIndexLevels = in_obFeeIndexLevels;
	}

//	public java.util.Set<com.htsoft.oa.model.system.AppUser> getObFeeIndexUsers () {
//		return obFeeIndexUsers;
//	}	
//	
//	public void setObFeeIndexUsers (java.util.Set<com.htsoft.oa.model.system.AppUser> in_obFeeIndexUsers) {
//		this.obFeeIndexUsers = in_obFeeIndexUsers;
//	}
    

	/**
	 * 内码	 * @return Long
     * @hibernate.id column="FEE_INDEX_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFeeIndexId() {
		return this.feeIndexId;
	}
	
	/**
	 * Set the feeIndexId
	 */	
	public void setFeeIndexId(Long aValue) {
		this.feeIndexId = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="FEE_INDEX_NAME" type="java.lang.String" length="120" not-null="false" unique="false"
	 */
	public String getFeeIndexName() {
		return this.feeIndexName;
	}
	
	/**
	 * Set the feeIndexName
	 */	
	public void setFeeIndexName(String aValue) {
		this.feeIndexName = aValue;
	}	

	/**
	 * 年度	 * @return String
	 * @hibernate.property column="ANNUAL" type="java.lang.String" length="4" not-null="false" unique="false"
	 */
	public String getAnnual() {
		return this.annual;
	}
	
	/**
	 * Set the annual
	 */	
	public void setAnnual(String aValue) {
		this.annual = aValue;
	}	

	/**
	 * 周期	 * @return Short
	 * @hibernate.property column="CYCLE" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCycle() {
		return this.cycle;
	}
	
	/**
	 * Set the cycle
	 */	
	public void setCycle(Short aValue) {
		this.cycle = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="COMMENTS" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getComments() {
		return this.comments;
	}
	
	/**
	 * Set the comments
	 */	
	public void setComments(String aValue) {
		this.comments = aValue;
	}	

	/**
	 * 创建人	 * @return Long
	 * @hibernate.property column="CREATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getCreateBy() {
		return this.createBy;
	}
	
	/**
	 * Set the createBy
	 */	
	public void setCreateBy(Long aValue) {
		this.createBy = aValue;
	}	

	/**
	 * 修改人	 * @return Long
	 * @hibernate.property column="UPDATE_BY" type="java.lang.Long" length="38" not-null="false" unique="false"
	 */
	public Long getUpdateBy() {
		return this.updateBy;
	}
	
	/**
	 * Set the updateBy
	 */	
	public void setUpdateBy(Long aValue) {
		this.updateBy = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CREATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * @hibernate.property column="UPDATE_DATE" type="java.util.Date" length="7" not-null="false" unique="false"
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

	/**
	 * 状态	 * @return Short
	 * @hibernate.property column="STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStaId() {
		return this.staId;
	}
	
	/**
	 * Set the staId
	 * @spring.validator type="required"
	 */	
	public void setStaId(Short aValue) {
		this.staId = aValue;
	}	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ObFeeIndex other = (ObFeeIndex) obj;
		if (annual == null) {
			if (other.annual != null)
				return false;
		} else if (!annual.equals(other.annual))
			return false;
		if (comments == null) {
			if (other.comments != null)
				return false;
		} else if (!comments.equals(other.comments))
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
		if (cycle == null) {
			if (other.cycle != null)
				return false;
		} else if (!cycle.equals(other.cycle))
			return false;
//		if (depId == null) {
//			if (other.depId != null)
//				return false;
//		} else if (!depId.equals(other.depId))
//			return false;
		if (feeIndexId == null) {
			if (other.feeIndexId != null)
				return false;
		} else if (!feeIndexId.equals(other.feeIndexId))
			return false;
		if (feeIndexName == null) {
			if (other.feeIndexName != null)
				return false;
		} else if (!feeIndexName.equals(other.feeIndexName))
			return false;
		if (obFeeIndexLevels == null) {
			if (other.obFeeIndexLevels != null)
				return false;
		} else if (!obFeeIndexLevels.equals(other.obFeeIndexLevels))
			return false;
		if (obFeeIndexUsers == null) {
			if (other.obFeeIndexUsers != null)
				return false;
		} else if (!obFeeIndexUsers.equals(other.obFeeIndexUsers))
			return false;
		if (staId == null) {
			if (other.staId != null)
				return false;
		} else if (!staId.equals(other.staId))
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
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((annual == null) ? 0 : annual.hashCode());
		result = prime * result
				+ ((comments == null) ? 0 : comments.hashCode());
		result = prime * result
				+ ((createBy == null) ? 0 : createBy.hashCode());
		result = prime * result
				+ ((createDate == null) ? 0 : createDate.hashCode());
		result = prime * result + ((cycle == null) ? 0 : cycle.hashCode());
//		result = prime * result + ((depId == null) ? 0 : depId.hashCode());
		result = prime * result
				+ ((feeIndexId == null) ? 0 : feeIndexId.hashCode());
		result = prime * result
				+ ((feeIndexName == null) ? 0 : feeIndexName.hashCode());
		result = prime
				* result
				+ ((obFeeIndexLevels == null) ? 0 : obFeeIndexLevels.hashCode());
		result = prime * result
				+ ((obFeeIndexUsers == null) ? 0 : obFeeIndexUsers.hashCode());
		result = prime * result + ((staId == null) ? 0 : staId.hashCode());
		result = prime * result
				+ ((updateBy == null) ? 0 : updateBy.hashCode());
		result = prime * result
				+ ((updateDate == null) ? 0 : updateDate.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "ObFeeIndex [annual=" + annual + ", comments=" + comments
				+ ", createBy=" + createBy + ", createDate=" + createDate
				+ ", cycle=" + cycle +
//				", depId=" + depId +
				", feeIndexId="
				+ feeIndexId + ", feeIndexName=" + feeIndexName
				+ ", obFeeIndexLevels=" + obFeeIndexLevels
				+ ", obFeeIndexUsers=" + obFeeIndexUsers + ", staId=" + staId
				+ ", updateBy=" + updateBy + ", updateDate=" + updateDate + "]";
	}



}
