package com.ulane.running.model.comtech;

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
 * CtScrCat Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class CtScrCat extends com.htsoft.core.model.BaseModel {

    protected Long queCatId;
    protected Long parQueCatId;
    protected String queCatName;
    protected Short disorder;
    protected Long creUseId;
    protected java.util.Date creDat;
    protected Short staId;

    protected java.util.Set ctScrQues = new java.util.HashSet();

    /**
     * Default Empty Constructor for class CtScrCat
     */
    public CtScrCat() {
        super();
    }

    /**
     * Default Key Fields Constructor for class CtScrCat
     */
    public CtScrCat(Long in_queCatId) {
        this.setQueCatId(in_queCatId);
    }

    public java.util.Set getCtScrQues() {
        return ctScrQues;
    }

    public void setCtScrQues(java.util.Set in_ctScrQues) {
        this.ctScrQues = in_ctScrQues;
    }

    /**
     * 题库内码 * @return Long
     * 
     * @hibernate.id column="QUE_CAT_ID" type="java.lang.Long" generator-class="native"
     */
    public Long getQueCatId() {
        return this.queCatId;
    }

    /**
     * Set the queCatId
     */
    public void setQueCatId(Long aValue) {
        this.queCatId = aValue;
    }

    /**
     * 父级题库 * @return Long
     * 
     * @hibernate.property column="PAR_QUE_CAT_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
     */
    public Long getParQueCatId() {
        return this.parQueCatId;
    }

    /**
     * Set the parQueCatId
     */
    public void setParQueCatId(Long aValue) {
        this.parQueCatId = aValue;
    }

    /**
     * 名称 * @return String
     * 
     * @hibernate.property column="QUE_CAT_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
     */
    public String getQueCatName() {
        return this.queCatName;
    }

    /**
     * Set the queCatName
     * 
     * @spring.validator type="required"
     */
    public void setQueCatName(String aValue) {
        this.queCatName = aValue;
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
     * 创建人 * @return Long
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
     * 状态：有效、注销&CT_ZT * @return Short
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
        if (!(object instanceof CtScrCat)) {
            return false;
        }
        CtScrCat rhs = (CtScrCat) object;
        return new EqualsBuilder().append(this.queCatId, rhs.queCatId).append(this.parQueCatId, rhs.parQueCatId).append(this.queCatName, rhs.queCatName).append(this.disorder,
                rhs.disorder).append(this.creUseId, rhs.creUseId).append(this.creDat, rhs.creDat).append(this.staId, rhs.staId).isEquals();
    }

    /**
     * @see java.lang.Object#hashCode()
     */
    public int hashCode() {
        return new HashCodeBuilder(-82280557, -700257973).append(this.queCatId).append(this.parQueCatId).append(this.queCatName).append(this.disorder).append(this.creUseId)
                .append(this.creDat).append(this.staId).toHashCode();
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        return new ToStringBuilder(this).append("queCatId", this.queCatId).append("parQueCatId", this.parQueCatId).append("queCatName", this.queCatName).append("disorder",
                this.disorder).append("creUseId", this.creUseId).append("creDat", this.creDat).append("staId", this.staId).toString();
    }

}
