package com.ulane.customer.model.customer;

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
 * ConBwListBusRul Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class ConBwListBusRul extends com.htsoft.core.model.BaseModel {

    protected Short staTime;
    protected Long busObj;
    protected Long bwListBusRulId;
    protected com.ulane.customer.model.customer.ConBwList conBwList;

    /**
     * Default Empty Constructor for class ConBwListBusRul
     */
    public ConBwListBusRul() {
        super();
    }

    /**
     * Default Key Fields Constructor for class ConBwListBusRul
     */
    public ConBwListBusRul(Long in_bwListBusRulId) {
        this.setBwListBusRulId(in_bwListBusRulId);
    }

    public com.ulane.customer.model.customer.ConBwList getConBwList() {
        return conBwList;
    }

    public void setConBwList(com.ulane.customer.model.customer.ConBwList in_conBwList) {
        this.conBwList = in_conBwList;
    }

    /**
     * 黑白名单ID * @return Long
     */
    public Long getBwId() {
        return this.getConBwList() == null ? null : this.getConBwList().getBwId();
    }

    /**
     * Set the bwId
     */
    public void setBwId(Long aValue) {
        if (aValue == null) {
            conBwList = null;
        } else if (conBwList == null) {
            conBwList = new com.ulane.customer.model.customer.ConBwList(aValue);
            conBwList.setVersion(new Integer(0));// set a version to cheat hibernate only
        } else {
            //
            conBwList.setBwId(aValue);
        }
    }

    /**
     * 限制类型：外呼项目、外呼活动、业务&CONXZLX * @return Short
     * 
     * @hibernate.property column="STA_TIME" type="java.lang.Short" length="5" not-null="true" unique="false"
     */
    public Short getStaTime() {
        return this.staTime;
    }

    /**
     * Set the staTime
     * 
     * @spring.validator type="required"
     */
    public void setStaTime(Short aValue) {
        this.staTime = aValue;
    }

    /**
     * 业务对象 * @return Long
     * 
     * @hibernate.property column="BUS_OBJ" type="java.lang.Long" length="18" not-null="true" unique="false"
     */
    public Long getBusObj() {
        return this.busObj;
    }

    /**
     * Set the busObj
     * 
     * @spring.validator type="required"
     */
    public void setBusObj(Long aValue) {
        this.busObj = aValue;
    }

    /**
     * 内码 * @return Long
     * 
     * @hibernate.id column="BW_LIST_BUS_RUL_ID" type="java.lang.Long" generator-class="native"
     */
    public Long getBwListBusRulId() {
        return this.bwListBusRulId;
    }

    /**
     * Set the bwListBusRulId
     */
    public void setBwListBusRulId(Long aValue) {
        this.bwListBusRulId = aValue;
    }

    /**
     * @see java.lang.Object#equals(Object)
     */
    public boolean equals(Object object) {
        if (!(object instanceof ConBwListBusRul)) {
            return false;
        }
        ConBwListBusRul rhs = (ConBwListBusRul) object;
        return new EqualsBuilder().append(this.staTime, rhs.staTime).append(this.busObj, rhs.busObj).append(this.bwListBusRulId, rhs.bwListBusRulId).isEquals();
    }

    /**
     * @see java.lang.Object#hashCode()
     */
    public int hashCode() {
        return new HashCodeBuilder(-82280557, -700257973).append(this.staTime).append(this.busObj).append(this.bwListBusRulId).toHashCode();
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        return new ToStringBuilder(this).append("staTime", this.staTime).append("busObj", this.busObj).append("bwListBusRulId", this.bwListBusRulId).toString();
    }

}
