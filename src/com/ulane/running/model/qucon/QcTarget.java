package com.ulane.running.model.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.system.AppUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * QcTarget Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcTarget extends com.htsoft.core.model.BaseModel {

    protected Long tarId;
	protected String tarTopic;
	protected String tarContent;
	protected String remark;
	protected Long creUseId;
	private AppUser appUser1;
	private String username1;
	protected java.util.Date creDat;
	protected Long updUseId;
	private AppUser appUser2;
	private String username2;
	protected java.util.Date updDat;
	protected Short staId;
	protected QcTarCat qcTarCat;
	protected Long tarCatId;

    /**
     * 未启用
     */
    public static final Short FLAG_UNENABLED = 0;
    /**
     * 启用
     */
    public static final Short FLAG_ENABLED = 1;
    /**
    * 注销
    */
   public static final Short FLAG_INVALID = 2;
	
	//protected java.util.Set<QcTarCat> qcTarcats = new java.util.HashSet<QcTarCat>();
   protected java.util.Set<QcTempTar> qcTempTars = new java.util.HashSet<QcTempTar>();

	/**
	 * Default Empty Constructor for class QcTarget
	 */
	public QcTarget () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcTarget
	 */
	public QcTarget (
		 Long in_tarId
        ) {
		this.setTarId(in_tarId);
    }


//	public java.util.Set<QcTarCat> getQcTarcats () {
//		return qcTarcats;
//	}	
//	
//	public void setQcTarcats (java.util.Set<QcTarCat> in_qcTarcats) {
//		this.qcTarcats = in_qcTarcats;
//	}

	public java.util.Set getQcTempTars () {
		return qcTempTars;
	}	
	
	public void setQcTempTars (java.util.Set in_qcTempTars) {
		this.qcTempTars = in_qcTempTars;
	}
    

	/**
	 * 指标内码	 * @return Long
     * @hibernate.id column="TAR_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTarId() {
		return this.tarId;
	}
	
	/**
	 * Set the tarId
	 */	
	public void setTarId(Long aValue) {
		this.tarId = aValue;
	}	

	/**
	 * 标题	 * @return String
	 * @hibernate.property column="TAR_TOPIC" type="java.lang.String" length="512" not-null="true" unique="false"
	 */
	public String getTarTopic() {
		return this.tarTopic;
	}
	
	/**
	 * Set the tarTopic
	 * @spring.validator type="required"
	 */	
	public void setTarTopic(String aValue) {
		this.tarTopic = aValue;
	}	

	/**
	 * 描述	 * @return String
	 * @hibernate.property column="TAR_CONTENT" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getTarContent() {
		return this.tarContent;
	}
	
	/**
	 * Set the tarContent
	 */	
	public void setTarContent(String aValue) {
		this.tarContent = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getRemark() {
		return this.remark;
	}
	
	/**
	 * Set the remark
	 */	
	public void setRemark(String aValue) {
		this.remark = aValue;
	}	

	/**
	 * 创建人ID	 * @return Long
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public Long getCreUseId() {
		return this.creUseId;
	}
	
	/**
	 * Set the creUseId
	 * @spring.validator type="required"
	 */	
	public void setCreUseId(Long aValue) {
		this.creUseId = aValue;
	}	

	/**
	 * 创建日期	 * @return String
	 * @hibernate.property column="CRE_DAT" type="java.lang.String" length="20" not-null="true" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}
	
	/**
	 * Set the creDat
	 * @spring.validator type="required"
	 */	
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}	

	/**
	 * 修改人ID	 * @return Long
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getUpdUseId() {
		return this.updUseId;
	}
	
	/**
	 * Set the updUseId
	 */	
	public void setUpdUseId(Long aValue) {
		this.updUseId = aValue;
	}	

	/**
	 * 修改日期	 * @return String
	 * @hibernate.property column="UPD_DAT" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public java.util.Date getUpdDat() {
		return this.updDat;
	}
	
	/**
	 * Set the updDat
	 */	
	public void setUpdDat(java.util.Date aValue) {
		this.updDat = aValue;
	}	

	/**
	 * 状态：有效、注销&QC_ZT	 * @return Short
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

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcTarget)) {
			return false;
		}
		QcTarget rhs = (QcTarget) object;
		return new EqualsBuilder()
				.append(this.tarId, rhs.tarId)
				.append(this.tarTopic, rhs.tarTopic)
				.append(this.tarContent, rhs.tarContent)
				.append(this.remark, rhs.remark)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creDat, rhs.creDat)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updDat, rhs.updDat)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.tarId) 
				.append(this.tarTopic) 
				.append(this.tarContent) 
				.append(this.remark) 
				.append(this.creUseId) 
				.append(this.creDat) 
				.append(this.updUseId) 
				.append(this.updDat) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("tarId", this.tarId) 
				.append("tarTopic", this.tarTopic) 
				.append("tarContent", this.tarContent) 
				.append("remark", this.remark) 
				.append("creUseId", this.creUseId) 
				.append("creDat", this.creDat) 
				.append("updUseId", this.updUseId) 
				.append("updDat", this.updDat) 
				.append("staId", this.staId) 
				.toString();
	}

	public AppUser getAppUser1() {
		return appUser1;
	}

	public void setAppUser1(AppUser appUser1) {
		this.appUser1 = appUser1;
	}

	public AppUser getAppUser2() {
		return appUser2;
	}

	public void setAppUser(AppUser appUser2) {
		this.appUser2 = appUser2;
	}

	public String getUsername1() {
		return username1;
	}

	public void setUsername1(String username1) {
		this.username1 = username1;
	}

	public String getUsername2() {
		return username2;
	}

	public void setUsername2(String username2) {
		this.username2 = username2;
	}

	public void setAppUser2(AppUser appUser2) {
		this.appUser2 = appUser2;
	}

	public QcTarCat getQcTarCat() {
		return qcTarCat;
	}

	public void setQcTarCat(QcTarCat qcTarCat) {
		this.qcTarCat = qcTarCat;
	}

	public Long getTarCatId() {
		return tarCatId;
	}

	public void setTarCatId(Long tarCatId) {
		this.tarCatId = tarCatId;
	}



}
