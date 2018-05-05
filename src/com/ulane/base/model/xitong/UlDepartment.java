package com.ulane.base.model.xitong;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * UlDepartment Base Java Bean, base class for the.base.model, mapped directly
 * to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class UlDepartment extends com.htsoft.core.model.BaseModel implements Serializable{

    /**
     * 
     */
//    private static final long serialVersionUID = 4611922256750380730L;
    protected String depname;
    protected Long depid;
    protected Long type;
    protected Long parentid;
    protected String depdesc;
    protected Long jingyingyewu;
    protected String yewushuoming;
    protected Long guojia;
    protected Long sheng;
    protected Long shi;
    protected Long qu;
    protected String xiangxidizhi;
    protected String lianxifangshi;
    protected String path;
    protected Long status;
    protected Short delFlag;
    protected String parentName;
    protected String depNo;

	protected Set <UlContactDep> contacts = new HashSet <UlContactDep>();
	
	protected java.util.Set ukDimensionalityKnows = new java.util.HashSet();
    
	
	public java.util.Set getUkDimensionalityKnows() {
		return ukDimensionalityKnows;
	}

	public void setUkDimensionalityKnows(java.util.Set ukDimensionalityKnows) {
		this.ukDimensionalityKnows = ukDimensionalityKnows;
	}

	/**
     * 代表未启用
     */
    public static final Short FLAG_DISABLED = 0;
    /**
     * 代表已启用
     */
    public static final Short FLAG_ENABLED = 1;
    /**
     * 代表已删除
     */
    public static final Short FLAG_DELETED = 2;
    
    public String getDepNo() {
		return depNo;
	}

	public void setDepNo(String depNo) {
		this.depNo = depNo;
	}
	
    public Set<UlContactDep> getContacts() {
		return contacts;
	}

    public void setContacts(Set<UlContactDep> contacts) {
		this.contacts = contacts;
	}
    
    public void addContact(UlContactDep ulContactDep) {
    	this.contacts.add(ulContactDep);
    }

	public Short getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Short delFlag) {
        this.delFlag = delFlag;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    /**
     * Default Empty Constructor for class UlDepartment
     */
    public UlDepartment() {
        super();
    }

    /**
     * Default Key Fields Constructor for class UlDepartment
     */
    public UlDepartment(Long in_depid) {
        this.setDepid(in_depid);
    }

    /**
     * 部门名称 * @return String
     * 
     * @hibernate.property column="DEPNAME" type="java.lang.String" length="128"
     *                     not-null="true" unique="false"
     */
    public String getDepname() {
        return this.depname;
    }

    /**
     * Set the depname
     * 
     * @spring.validator type="required"
     */
    public void setDepname(String aValue) {
        this.depname = aValue;
    }

    /**
     * 部门内码 * @return Long
     * 
     * @hibernate.id column="DEPID" type="java.lang.Long"
     *               generator-class="native"
     */
    public Long getDepid() {
        return this.depid;
    }

    /**
     * Set the depid
     */
    public void setDepid(Long aValue) {
        this.depid = aValue;
    }

    /**
     * 类型&ZZJGLX0001 * @return Long
     * 
     * @hibernate.property column="TYPE" type="java.lang.Long" length="22"
     *                     not-null="false" unique="false"
     */
    public Long getType() {
        return this.type;
    }

    /**
     * Set the type
     */
    public void setType(Long aValue) {
        this.type = aValue;
    }

    /**
     * 上级部门 * @return Long
     * 
     * @hibernate.property column="PARENTID" type="java.lang.Long" length="18"
     *                     not-null="false" unique="false"
     */
    public Long getParentid() {
        return this.parentid;
    }

    /**
     * Set the parentid
     */
    public void setParentid(Long aValue) {
        this.parentid = aValue;
    }

    /**
     * 部门描述 * @return String
     * 
     * @hibernate.property column="DEPDESC" type="java.lang.String" length="256"
     *                     not-null="false" unique="false"
     */
    public String getDepdesc() {
        return this.depdesc;
    }

    /**
     * Set the depdesc
     */
    public void setDepdesc(String aValue) {
        this.depdesc = aValue;
    }

    /**
     * 经营业务&JYYW0001 * @return Long
     * 
     * @hibernate.property column="JINGYINGYEWU" type="java.lang.Long"
     *                     length="22" not-null="false" unique="false"
     */
    public Long getJingyingyewu() {
        return this.jingyingyewu;
    }

    /**
     * Set the jingyingyewu
     */
    public void setJingyingyewu(Long aValue) {
        this.jingyingyewu = aValue;
    }

    /**
     * 业务说明 * @return String
     * 
     * @hibernate.property column="YEWUSHUOMING" type="java.lang.String"
     *                     length="50" not-null="false" unique="false"
     */
    public String getYewushuoming() {
        return this.yewushuoming;
    }

    /**
     * Set the yewushuoming
     */
    public void setYewushuoming(String aValue) {
        this.yewushuoming = aValue;
    }

    /**
     * 国家 * @return Long
     * 
     * @hibernate.property column="GUOJIA" type="java.lang.Long" length="22"
     *                     not-null="false" unique="false"
     */
    public Long getGuojia() {
        return this.guojia;
    }

    /**
     * Set the guojia
     */
    public void setGuojia(Long aValue) {
        this.guojia = aValue;
    }

    /**
     * 省 * @return Long
     * 
     * @hibernate.property column="SHENG" type="java.lang.Long" length="22"
     *                     not-null="false" unique="false"
     */
    public Long getSheng() {
        return this.sheng;
    }

    /**
     * Set the sheng
     */
    public void setSheng(Long aValue) {
        this.sheng = aValue;
    }

    /**
     * 市 * @return Long
     * 
     * @hibernate.property column="SHI" type="java.lang.Long" length="22"
     *                     not-null="false" unique="false"
     */
    public Long getShi() {
        return this.shi;
    }

    /**
     * Set the shi
     */
    public void setShi(Long aValue) {
        this.shi = aValue;
    }

    /**
     * 区 * @return Long
     * 
     * @hibernate.property column="QU" type="java.lang.Long" length="22"
     *                     not-null="false" unique="false"
     */
    public Long getQu() {
        return this.qu;
    }

    /**
     * Set the qu
     */
    public void setQu(Long aValue) {
        this.qu = aValue;
    }

    /**
     * 详细地址 * @return String
     * 
     * @hibernate.property column="XIANGXIDIZHI" type="java.lang.String"
     *                     length="100" not-null="false" unique="false"
     */
    public String getXiangxidizhi() {
        return this.xiangxidizhi;
    }

    /**
     * Set the xiangxidizhi
     */
    public void setXiangxidizhi(String aValue) {
        this.xiangxidizhi = aValue;
    }

    /**
     * 联系方式 * @return String
     * 
     * @hibernate.property column="LIANXIFANGSHI" type="java.lang.String"
     *                     length="100" not-null="false" unique="false"
     */
    public String getLianxifangshi() {
        return this.lianxifangshi;
    }

    /**
     * Set the lianxifangshi
     */
    public void setLianxifangshi(String aValue) {
        this.lianxifangshi = aValue;
    }

    /**
     * @see java.lang.Object#equals(Object)
     */
    public boolean equals(Object object) {
        if (!(object instanceof UlDepartment)) {
            return false;
        }
        UlDepartment rhs = (UlDepartment) object;
        return new EqualsBuilder().append(this.depname, rhs.depname)
                .append(this.depid, rhs.depid)
                .append(this.type, rhs.type)
                .append(this.parentid, rhs.parentid)
                .append(this.depdesc, rhs.depdesc)
                .append(this.jingyingyewu, rhs.jingyingyewu)
                .append(this.yewushuoming, rhs.yewushuoming)
                .append(this.guojia, rhs.guojia).append(this.sheng, rhs.sheng)
                .append(this.shi, rhs.shi).append(this.qu, rhs.qu)
                .append(this.xiangxidizhi, rhs.xiangxidizhi)
                .append(this.lianxifangshi, rhs.lianxifangshi)
                .append(this.depNo, rhs.depNo).isEquals();
    }

    /**
     * @see java.lang.Object#hashCode()
     */
    public int hashCode() {
        return new HashCodeBuilder(-82280557, -700257973).append(this.depname)
                .append(this.depid).append(this.type).append(this.parentid)
                .append(this.depdesc).append(this.jingyingyewu)
                .append(this.yewushuoming).append(this.guojia)
                .append(this.sheng).append(this.shi).append(this.qu)
                .append(this.xiangxidizhi).append(this.lianxifangshi)
                .append(this.depNo).toHashCode();
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        return new ToStringBuilder(this).append("depname", this.depname)
                .append("depid", this.depid).append("type", this.type)
                .append("parentid", this.parentid)
                .append("depdesc", this.depdesc)
                .append("jingyingyewu", this.jingyingyewu)
                .append("yewushuoming", this.yewushuoming)
                .append("guojia", this.guojia).append("sheng", this.sheng)
                .append("shi", this.shi).append("qu", this.qu)
                .append("xiangxidizhi", this.xiangxidizhi)
                .append("lianxifangshi", this.lianxifangshi).toString();
    }

}
