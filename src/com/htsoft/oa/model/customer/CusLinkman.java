package com.htsoft.oa.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * CusLinkman Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ���������������
 */
public class CusLinkman extends com.htsoft.core.model.BaseModel {
	/**
	 * 代表状态正常
	 */
	public static final Short FLAG_VALID=1;
	/**
	 * 代表状态注销
	 */
	public static final Short FLAG_INVALID=0;
	
    protected Long linkmanId;
	protected String fullname;
	protected String nameEn;
	protected Short sex;
	protected String depName;
	protected Short position;
	protected Short customerType;
    protected String mobile;
    protected String homePhone;
	protected String phone;
	protected String email;
    protected String fax;
    protected Short staId;
    protected Short isPrimary;
    protected String msn;
	protected String qq;
	protected java.util.Date birthday;
	protected String homeAddress;
	protected String homeZip;
	protected String hobby;
	protected String notes;
	protected Long creUseId;
	protected java.util.Date creDat;
	protected Long updUseId;
	protected java.util.Date updDat;
	protected String ext1;
    protected String ext2;
    protected String ext3;
    protected String ext4;
    protected String ext5;
    protected String ext6;
    protected String ext8;
    protected String ext7;
    protected String ext9;
    protected String ext10;
    protected String ext11;
    protected String ext12;
    protected String ext13;
    protected String ext14;
    protected String ext15;
    protected String ext16;
    protected String ext17;
    protected String ext18;
    protected String ext19;
    protected String ext20;
	//protected Long customerId;
    protected String linkmanNo;
	protected com.htsoft.oa.model.customer.Customer customer;


	/**
	 * Default Empty Constructor for class CusLinkman
	 */
	public CusLinkman () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CusLinkman
	 */
	public CusLinkman (
		 Long in_linkmanId
        ) {
		this.setLinkmanId(in_linkmanId);
    }

	
	public com.htsoft.oa.model.customer.Customer getCustomer () {
		return customer;
	}	
	
	public void setCustomer (com.htsoft.oa.model.customer.Customer in_customer) {
		this.customer = in_customer;
	}
    

	public String getLinkmanNo() {
		return linkmanNo;
	}

	public void setLinkmanNo(String linkmanNo) {
		this.linkmanNo = linkmanNo;
	}

	/**
	 * 	 * @return Long
     * @hibernate.id column="linkmanId" type="java.lang.Long" generator-class="native"
	 */
	public Long getLinkmanId() {
		return this.linkmanId;
	}
	
	/**
	 * Set the linkmanId
	 */	
	public void setLinkmanId(Long aValue) {
		this.linkmanId = aValue;
	}	

	/**
	 * 所属客户	 * @return Long
	 */
	public Long getCustomerId() {
		return this.getCustomer()==null?null:this.getCustomer().getCustomerId();
	}
	
	/**
	 * Set the customerId
	 */	
	public void setCustomerId(Long aValue) {
	    if (aValue==null) {
	    	customer = null;
	    } else if (customer == null) {
	        customer = new com.htsoft.oa.model.customer.Customer(aValue);
	        customer.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			customer.setCustomerId(aValue);
	    }
	}	

	/**
	 * 姓名	 * @return String
	 * @hibernate.property column="fullname" type="java.lang.String" length="32" not-null="true" unique="false"
	 */
	public String getFullname() {
		return this.fullname;
	}
	
	/**
	 * Set the fullname
	 * @spring.validator type="required"
	 */	
	public void setFullname(String aValue) {
		this.fullname = aValue;
	}	

	/**
	 * 性别	 * @return Short
	 * @hibernate.property column="sex" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getSex() {
		return this.sex;
	}
	
	/**
	 * Set the sex
	 * @spring.validator type="required"
	 */	
	public void setSex(Short aValue) {
		this.sex = aValue;
	}	

	/**
	 * 职位	 * @return String
	 * @hibernate.property column="position" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public Short getPosition() {
		return this.position;
	}
	
	/**
	 * Set the position
	 */	
	public void setPosition(Short aValue) {
		this.position = aValue;
	}	

	/**
	 * 电话	 * @return String
	 * @hibernate.property column="phone" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getPhone() {
		return this.phone;
	}
	
	/**
	 * Set the phone
	 */	
	public void setPhone(String aValue) {
		this.phone = aValue;
	}	

	/**
	 * 手机	 * @return String
	 * @hibernate.property column="mobile" type="java.lang.String" length="32" not-null="true" unique="false"
	 */
	public String getMobile() {
		return this.mobile;
	}
	
	/**
	 * Set the mobile
	 * @spring.validator type="required"
	 */	
	public void setMobile(String aValue) {
		this.mobile = aValue;
	}	

	/**
	 * Email	 * @return String
	 * @hibernate.property column="Email" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getEmail() {
		return this.email;
	}
	
	/**
	 * Set the email
	 */	
	public void setEmail(String aValue) {
		this.email = aValue;
	}	

	/**
	 * MSN	 * @return String
	 * @hibernate.property column="MSN" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getMsn() {
		return msn;
	}

	public void setMsn(String msn) {
		this.msn = msn;
	}

	/**
	 * QQ	 * @return String
	 * @hibernate.property column="QQ" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	

	/**
	 * 生日	 * @return java.util.Date
	 * @hibernate.property column="birthday" type="java.util.Date" length="10" not-null="false" unique="false"
	 */
	public java.util.Date getBirthday() {
		return this.birthday;
	}
	
	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}
	
	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	/**
	 * Set the birthday
	 */	
	public void setBirthday(java.util.Date aValue) {
		this.birthday = aValue;
	}	

	/**
	 * 家庭住址	 * @return String
	 * @hibernate.property column="homeAddress" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getHomeAddress() {
		return this.homeAddress;
	}
	
	/**
	 * Set the homeAddress
	 */	
	public void setHomeAddress(String aValue) {
		this.homeAddress = aValue;
	}	

	/**
	 * 邮编	 * @return String
	 * @hibernate.property column="homeZip" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getHomeZip() {
		return this.homeZip;
	}
	
	/**
	 * Set the homeZip
	 */	
	public void setHomeZip(String aValue) {
		this.homeZip = aValue;
	}	

	/**
	 * 家庭电话	 * @return String
	 * @hibernate.property column="homePhone" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getHomePhone() {
		return this.homePhone;
	}
	
	/**
	 * Set the homePhone
	 */	
	public void setHomePhone(String aValue) {
		this.homePhone = aValue;
	}	

	/**
	 * 爱好	 * @return String
	 * @hibernate.property column="hobby" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getHobby() {
		return this.hobby;
	}
	
	/**
	 * Set the hobby
	 */	
	public void setHobby(String aValue) {
		this.hobby = aValue;
	}	

	/**
	 * 是否为主要联系人	 * @return Short
	 * @hibernate.property column="isPrimary" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getIsPrimary() {
		return this.isPrimary;
	}
	
	/**
	 * Set the isPrimary
	 * @spring.validator type="required"
	 */	
	public void setIsPrimary(Short aValue) {
		this.isPrimary = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="notes" type="java.lang.String" length="500" not-null="false" unique="false"
	 */
	public String getNotes() {
		return this.notes;
	}
	
	/**
	 * Set the notes
	 */	
	public void setNotes(String aValue) {
		this.notes = aValue;
	}	
	
	
//	public Long getCustomerId() {
//		return customerId;
//	}
//
//	public void setCustomerId(Long customerId) {
//		this.customerId = customerId;
//	}

	public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getDepName() {
        return depName;
    }

    public void setDepName(String depName) {
        this.depName = depName;
    }

    public Short getCustomerType() {
        return customerType;
    }

    public void setCustomerType(Short customerType) {
        this.customerType = customerType;
    }

    public Short getStaId() {
        return staId;
    }

    public void setStaId(Short staId) {
        this.staId = staId;
    }

    public Long getCreUseId() {
        return creUseId;
    }

    public void setCreUseId(Long creUseId) {
        this.creUseId = creUseId;
    }

    public java.util.Date getCreDat() {
        return creDat;
    }

    public void setCreDat(java.util.Date creDat) {
        this.creDat = creDat;
    }

    public Long getUpdUseId() {
        return updUseId;
    }

    public void setUpdUseId(Long updUseId) {
        this.updUseId = updUseId;
    }

    public java.util.Date getUpdDat() {
        return updDat;
    }

    public void setUpdDat(java.util.Date updDat) {
        this.updDat = updDat;
    }

    public String getExt1() {
        return ext1;
    }

    public void setExt1(String ext1) {
        this.ext1 = ext1;
    }

    public String getExt2() {
        return ext2;
    }

    public void setExt2(String ext2) {
        this.ext2 = ext2;
    }

    public String getExt3() {
        return ext3;
    }

    public void setExt3(String ext3) {
        this.ext3 = ext3;
    }

    public String getExt4() {
        return ext4;
    }

    public void setExt4(String ext4) {
        this.ext4 = ext4;
    }

    public String getExt5() {
        return ext5;
    }

    public void setExt5(String ext5) {
        this.ext5 = ext5;
    }

    public String getExt6() {
        return ext6;
    }

    public void setExt6(String ext6) {
        this.ext6 = ext6;
    }

    public String getExt8() {
        return ext8;
    }

    public void setExt8(String ext8) {
        this.ext8 = ext8;
    }

    public String getExt7() {
        return ext7;
    }

    public void setExt7(String ext7) {
        this.ext7 = ext7;
    }

    public String getExt9() {
        return ext9;
    }

    public void setExt9(String ext9) {
        this.ext9 = ext9;
    }

    public String getExt10() {
        return ext10;
    }

    public void setExt10(String ext10) {
        this.ext10 = ext10;
    }

    public String getExt11() {
        return ext11;
    }

    public void setExt11(String ext11) {
        this.ext11 = ext11;
    }

    public String getExt12() {
        return ext12;
    }

    public void setExt12(String ext12) {
        this.ext12 = ext12;
    }

    public String getExt13() {
        return ext13;
    }

    public void setExt13(String ext13) {
        this.ext13 = ext13;
    }

    public String getExt14() {
        return ext14;
    }

    public void setExt14(String ext14) {
        this.ext14 = ext14;
    }

    public String getExt15() {
        return ext15;
    }

    public void setExt15(String ext15) {
        this.ext15 = ext15;
    }

    public String getExt16() {
        return ext16;
    }

    public void setExt16(String ext16) {
        this.ext16 = ext16;
    }

    public String getExt17() {
        return ext17;
    }

    public void setExt17(String ext17) {
        this.ext17 = ext17;
    }

    public String getExt18() {
        return ext18;
    }

    public void setExt18(String ext18) {
        this.ext18 = ext18;
    }

    public String getExt19() {
        return ext19;
    }

    public void setExt19(String ext19) {
        this.ext19 = ext19;
    }

    public String getExt20() {
        return ext20;
    }

    public void setExt20(String ext20) {
        this.ext20 = ext20;
    }

    /**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CusLinkman)) {
			return false;
		}
		CusLinkman rhs = (CusLinkman) object;
		return new EqualsBuilder()
				.append(this.linkmanId, rhs.linkmanId)
						.append(this.fullname, rhs.fullname)
				.append(this.sex, rhs.sex)
				.append(this.position, rhs.position)
				.append(this.phone, rhs.phone)
				.append(this.mobile, rhs.mobile)
				.append(this.email, rhs.email)
				.append(this.msn, rhs.msn)
				.append(this.qq, rhs.qq)
				.append(this.fax, rhs.fax)
				.append(this.birthday, rhs.birthday)
				.append(this.homeAddress, rhs.homeAddress)
				.append(this.homeZip, rhs.homeZip)
				.append(this.homePhone, rhs.homePhone)
				.append(this.hobby, rhs.hobby)
				.append(this.isPrimary, rhs.isPrimary)
				.append(this.notes, rhs.notes)
				//.append(this.customerId, rhs.customerId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.linkmanId) 
						.append(this.fullname) 
				.append(this.sex) 
				.append(this.position) 
				.append(this.phone) 
				.append(this.mobile) 
				.append(this.email) 
				.append(this.msn) 
				.append(this.qq) 
				.append(this.fax)
				.append(this.birthday) 
				.append(this.homeAddress) 
				.append(this.homeZip) 
				.append(this.homePhone) 
				.append(this.hobby) 
				.append(this.isPrimary) 
				.append(this.notes) 
				//.append(this.customerId)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("linkmanId", this.linkmanId) 
						.append("fullname", this.fullname) 
				.append("sex", this.sex) 
				.append("position", this.position) 
				.append("phone", this.phone) 
				.append("mobile", this.mobile) 
				.append("email", this.email) 
				.append("msn", this.msn) 
				.append("qq", this.qq) 
				.append("fax",this.fax)
				.append("birthday", this.birthday) 
				.append("homeAddress", this.homeAddress) 
				.append("homeZip", this.homeZip) 
				.append("homePhone", this.homePhone) 
				.append("hobby", this.hobby) 
				.append("isPrimary", this.isPrimary) 
				.append("notes", this.notes) 
				//.append("customerId",this.customerId)
				.toString();
	}



}
