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
 * QcTarCat Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class QcTarCat extends com.htsoft.core.model.BaseModel {

    protected Long tarCatId;
    protected Long parTarCatId;
    protected String catName;
    protected Short disorder;
    protected Long creUseId;
    protected AppUser appUser;
    protected String username;
    protected java.util.Date creDat;
    protected Short staId;
    
    /**
     * 有效
     */
    public static final Short FLAG_ENABLED = 1;
    /**
     * 注销
     */
    public static final Short FLAG_DELETED = 2;

    protected java.util.Set<QcTarget> qcTargets = new java.util.HashSet<QcTarget>();

    /**
     * Default Empty Constructor for class QcTarCat
     */
    public QcTarCat() {
        super();
    }

    /**
     * Default Key Fields Constructor for class QcTarCat
     */
    public QcTarCat(Long in_tarCatId) {
        this.setTarCatId(in_tarCatId);
    }

    public java.util.Set<QcTarget> getQcTargets() {
        return qcTargets;
    }

    public void setQcTargets(java.util.Set<QcTarget> in_qcTargets) {
        this.qcTargets = in_qcTargets;
    }

    /**
     * 指标库内码 * @return Long
     * 
     * @hibernate.id column="TAR_CAT_ID" type="java.lang.Long" generator-class="native"
     */
    public Long getTarCatId() {
        return this.tarCatId;
    }

    /**
     * Set the tarCatId
     */
    public void setTarCatId(Long aValue) {
        this.tarCatId = aValue;
    }

    /**
     * 上级ID * @return Long
     * 
     * @hibernate.property column="PAR_TAR_CAT_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
     */
    public Long getParTarCatId() {
        return this.parTarCatId;
    }

    /**
     * Set the parTarCatId
     */
    public void setParTarCatId(Long aValue) {
        this.parTarCatId = aValue;
    }

    /**
     * 名称 * @return String
     * 
     * @hibernate.property column="CAT_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
     */
    public String getCatName() {
        return this.catName;
    }

    /**
     * Set the catName
     * 
     * @spring.validator type="required"
     */
    public void setCatName(String aValue) {
        this.catName = aValue;
    }

    /**
     * 序号 * @return Short
     * 
     * @hibernate.property column="DISORDER" type="java.lang.Short" length="5" not-null="true" unique="false"
     */
    public Short getDisorder() {
        return this.disorder;
    }

    /**
     * Set the disorder
     * 
     * @spring.validator type="required"
     */
    public void setDisorder(Short aValue) {
        this.disorder = aValue;
    }

    /**
     * 创建人ID * @return Long
     * 
     * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
     */
    public Long getCreUseId() {
        return this.creUseId;
    }

    /**
     * Set the creUseId
     * 
     * @spring.validator type="required"
     */
    public void setCreUseId(Long aValue) {
        this.creUseId = aValue;
    }

    /**
     * 创建日期 * @return java.util.Date
     * 
     * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
     */
    public java.util.Date getCreDat() {
        return this.creDat;
    }

    /**
     * Set the creDat
     * 
     * @spring.validator type="required"
     */
    public void setCreDat(java.util.Date aValue) {
        this.creDat = aValue;
    }

    /**
     * 状态：有效、注销&QC_ZT * @return Short
     * 
     * @hibernate.property column="STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
     */
    public Short getStaId() {
        return this.staId;
    }

    /**
     * Set the staId
     * 
     * @spring.validator type="required"
     */
    public void setStaId(Short aValue) {
        this.staId = aValue;
    }

    /**
     * @see java.lang.Object#equals(Object)
     */
    public boolean equals(Object object) {
        if (!(object instanceof QcTarCat)) {
            return false;
        }
        QcTarCat rhs = (QcTarCat) object;
        return new EqualsBuilder().append(this.tarCatId, rhs.tarCatId).append(this.parTarCatId, rhs.parTarCatId).append(this.catName, rhs.catName).append(this.disorder,
                rhs.disorder).append(this.creUseId, rhs.creUseId).append(this.creDat, rhs.creDat).append(this.staId, rhs.staId).isEquals();
    }

    /**
     * @see java.lang.Object#hashCode()
     */
    public int hashCode() {
        return new HashCodeBuilder(-82280557, -700257973).append(this.tarCatId).append(this.parTarCatId).append(this.catName).append(this.disorder).append(this.creUseId).append(
                this.creDat).append(this.staId).toHashCode();
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        return new ToStringBuilder(this).append("tarCatId", this.tarCatId).append("parTarCatId", this.parTarCatId).append("catName", this.catName)
                .append("disorder", this.disorder).append("creUseId", this.creUseId).append("creDat", this.creDat).append("staId", this.staId).toString();
    }

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
