package com.ulane.base.model.xitong;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.communicate.PhoneGroup;
import com.ulane.customer.model.fee.ObFeeIndex;

/**
 * UlEmployee Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */

public class UlEmployee extends com.htsoft.core.model.BaseModel {

	/**
     * 
     */
	private static final long serialVersionUID = 6628835560348950900L;
	/**
     * 
     */
	// private static final long serialVersionUID = 9216349164288356264L;
	protected String fullname;
	protected Long useid;
	protected String alias;
	protected Long sex;
	protected java.util.Date birthday;
	protected Long type;
	protected Long hujiGuojia;
	protected Long hujiSheng;
	protected Long hujiShi;
	protected Long hujiDiqu;
	protected Long education;
	protected String biyeyuanxiao;
	protected Long ruzhifangshi;
	// protected Long parent;
	// protected Long depid;
	protected String email;
	protected String zhiwei;
	protected String zhiji;
	protected Long status;
	protected java.util.Date zhuanzhengshijian;
	protected java.util.Date hetongdaoqishijian;
	protected Long gongzuodiGuojia;
	protected Long gongzuodiSheng;
	protected Long gongzuodiShi;
	protected Long gongzuodiDiqu;
	protected String note;
	protected Long parent;
	protected String parentName;
	protected java.util.Date ruzhishijian;
	protected String userNo;
	//新增字段  关联机构部门管理信息2015-03-13修改（所属行信息）
	protected Long bankTypeId;//编号
	protected String bankname;//名称
	protected String idcard;//证件号
	protected String phone;//手机号
	
	public String getIdcard() {
		return idcard;
	}

	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	// protected java.util.Set<UlEmployee> ulDepEmployees = new
	// java.util.HashSet<UlEmployee>();
	protected java.util.Set<PhoneGroup> phoneGroups = new java.util.HashSet<PhoneGroup>();
	protected java.util.Set<ObFeeIndex> obFeeIndexs = new java.util.HashSet<ObFeeIndex>();


	// 新增部门名
	protected String deptName;

	// public Long getDepid() {
	// return depid;
	// }
	//
	// public void setDepid(Long depid) {
	// this.depid = depid;
	// }

	public java.util.Set<ObFeeIndex> getObFeeIndexs() {
		return obFeeIndexs;
	}

	public Long getBankTypeId() {
		return bankTypeId;
	}

	public void setBankTypeId(Long bankTypeId) {
		this.bankTypeId = bankTypeId;
	}

	public String getBankname() {
		return bankname;
	}

	public void setBankname(String bankname) {
		this.bankname = bankname;
	}

	public void setObFeeIndexs(java.util.Set<ObFeeIndex> obFeeIndexs) {
		this.obFeeIndexs = obFeeIndexs;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public java.util.Set<PhoneGroup> getPhoneGroups() {
		return phoneGroups;
	}

	public void setPhoneGroups(java.util.Set<PhoneGroup> phoneGroups) {
		this.phoneGroups = phoneGroups;
	}

	protected UlDepartment ulDepartment;
	protected Set<UlContactEmpl> contacts = new HashSet<UlContactEmpl>();

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

	// protected UlEmployee parentEmp;

	public Set<UlContactEmpl> getContacts() {
		return contacts;
	}

	private void setContacts(Set<UlContactEmpl> contacts) {
		this.contacts = contacts;
	}

	public String getUserNo() {
		return userNo;
	}

	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}

	public void addContact(UlContactEmpl ulContactEmpl) {
		this.contacts.add(ulContactEmpl);
	}

	/**
	 * Default Empty Constructor for class UlEmployee
	 */
	public UlEmployee() {
		super();
	}

	public java.util.Date getRuzhishijian() {
		return ruzhishijian;
	}

	public void setRuzhishijian(java.util.Date ruzhishijian) {
		this.ruzhishijian = ruzhishijian;
	}

	/**
	 * Default Key Fields Constructor for class UlEmployee
	 */
	public UlEmployee(Long in_useid) {
		this.setUseid(in_useid);
	}

	public UlDepartment getUlDepartment() {
		return ulDepartment;
	}

	public void setUlDepartment(UlDepartment ulDepartment) {
		this.ulDepartment = ulDepartment;
	}

	/**
	 * 姓名 * @return String
	 * 
	 * @hibernate.property column="FULLNAME" type="java.lang.String" length="50"
	 *                     not-null="true" unique="false"
	 */
	public String getFullname() {
		return this.fullname;
	}

	/**
	 * Set the fullname
	 * 
	 * @spring.validator type="required"
	 */
	public void setFullname(String aValue) {
		this.fullname = aValue;
	}

	/**
	 * 主键 * @return Long
	 * 
	 * @hibernate.id column="USEID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getUseid() {
		return this.useid;
	}

	/**
	 * Set the useid
	 */
	public void setUseid(Long aValue) {
		this.useid = aValue;
	}

	/**
	 * 别名 * @return String
	 * 
	 * @hibernate.property column="ALIAS" type="java.lang.String" length="50"
	 *                     not-null="false" unique="false"
	 */
	public String getAlias() {
		return this.alias;
	}

	/**
	 * Set the alias
	 */
	public void setAlias(String aValue) {
		this.alias = aValue;
	}

	/**
	 * 性别&XB001 * @return Long
	 * 
	 * @hibernate.property column="SEX" type="java.lang.Long" length="22"
	 *                     not-null="true" unique="false"
	 */
	public Long getSex() {
		return this.sex;
	}

	/**
	 * Set the sex
	 * 
	 * @spring.validator type="required"
	 */
	public void setSex(Long aValue) {
		this.sex = aValue;
	}

	/**
	 * 生日 * @return java.util.Date
	 * 
	 * @hibernate.property column="BIRTHDAY" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getBirthday() {
		return this.birthday;
	}

	/**
	 * Set the birthday
	 */
	public void setBirthday(java.util.Date aValue) {
		this.birthday = aValue;
	}

	/**
	 * 类型&YGLX0001 * @return Long
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
	 * 户籍所在地国家 * @return Long
	 * 
	 * @hibernate.property column="HUJI_GUOJIA" type="java.lang.Long"
	 *                     length="22" not-null="false" unique="false"
	 */
	public Long getHujiGuojia() {
		return this.hujiGuojia;
	}

	/**
	 * Set the hujiGuojia
	 */
	public void setHujiGuojia(Long aValue) {
		this.hujiGuojia = aValue;
	}

	/**
	 * 户籍所在地省 * @return Long
	 * 
	 * @hibernate.property column="HUJI_SHENG" type="java.lang.Long" length="22"
	 *                     not-null="false" unique="false"
	 */
	public Long getHujiSheng() {
		return this.hujiSheng;
	}

	/**
	 * Set the hujiSheng
	 */
	public void setHujiSheng(Long aValue) {
		this.hujiSheng = aValue;
	}

	/**
	 * 户籍所在地市 * @return Long
	 * 
	 * @hibernate.property column="HUJI_SHI" type="java.lang.Long" length="22"
	 *                     not-null="false" unique="false"
	 */
	public Long getHujiShi() {
		return this.hujiShi;
	}

	/**
	 * Set the hujiShi
	 */
	public void setHujiShi(Long aValue) {
		this.hujiShi = aValue;
	}

	/**
	 * 户籍所在地区 * @return Long
	 * 
	 * @hibernate.property column="HUJI_DIQU" type="java.lang.Long" length="22"
	 *                     not-null="false" unique="false"
	 */
	public Long getHujiDiqu() {
		return this.hujiDiqu;
	}

	/**
	 * Set the hujiDiqu
	 */
	public void setHujiDiqu(Long aValue) {
		this.hujiDiqu = aValue;
	}

	/**
	 * 学历&YGXL0001 * @return Long
	 * 
	 * @hibernate.property column="EDUCATION" type="java.lang.Long" length="22"
	 *                     not-null="false" unique="false"
	 */
	public Long getEducation() {
		return this.education;
	}

	/**
	 * Set the education
	 */
	public void setEducation(Long aValue) {
		this.education = aValue;
	}

	/**
	 * 毕业院校 * @return String
	 * 
	 * @hibernate.property column="BIYEYUANXIAO" type="java.lang.String"
	 *                     length="30" not-null="false" unique="false"
	 */
	public String getBiyeyuanxiao() {
		return this.biyeyuanxiao;
	}

	/**
	 * Set the biyeyuanxiao
	 */
	public void setBiyeyuanxiao(String aValue) {
		this.biyeyuanxiao = aValue;
	}

	/**
	 * 入职方式&RZFS001 * @return Long
	 * 
	 * @hibernate.property column="RUZHIFANGSHI" type="java.lang.Long"
	 *                     length="22" not-null="false" unique="false"
	 */
	public Long getRuzhifangshi() {
		return this.ruzhifangshi;
	}

	/**
	 * Set the ruzhifangshi
	 */
	public void setRuzhifangshi(Long aValue) {
		this.ruzhifangshi = aValue;
	}

	/**
	 * 所属部门 * @return Long
	 * 
	 * @hibernate.property column="DEPID" type="java.lang.Long" length="18"
	 *                     not-null="false" unique="false"
	 */
	// public Long getDepid() {
	// return this.depid;
	// }
	//
	// /**
	// * Set the depid
	// */
	// public void setDepid(Long aValue) {
	// this.depid = aValue;
	// }

	/**
	 * 邮件 * @return String
	 * 
	 * @hibernate.property column="EMAIL" type="java.lang.String" length="128"
	 *                     not-null="true" unique="false"
	 */
	public String getEmail() {
		return this.email;
	}

	/**
	 * Set the email
	 * 
	 * @spring.validator type="required"
	 */
	public void setEmail(String aValue) {
		this.email = aValue;
	}

	/**
	 * 职位&ZW001 * @return Long
	 * 
	 * @hibernate.property column="ZHIWEI" type="java.lang.Long" length="22"
	 *                     not-null="false" unique="false"
	 */
	public String getZhiwei() {
		return this.zhiwei;
	}

	/**
	 * Set the zhiwei
	 */
	public void setZhiwei(String aValue) {
		this.zhiwei = aValue;
	}

	/**
	 * 职级&ZJ001 * @return Long
	 * 
	 * @hibernate.property column="ZHIJI" type="java.lang.Long" length="22"
	 *                     not-null="false" unique="false"
	 */
	public String getZhiji() {
		return this.zhiji;
	}

	/**
	 * Set the zhiji
	 */
	public void setZhiji(String aValue) {
		this.zhiji = aValue;
	}

	/**
	 * 状态&ZT001
	 * 
	 * @return Long
	 * @hibernate.property column="STATUS" type="java.lang.Long" length="22"
	 *                     not-null="true" unique="false"
	 */
	public Long getStatus() {
		return this.status;
	}

	/**
	 * Set the status
	 * 
	 * @spring.validator type="required"
	 */
	public void setStatus(Long aValue) {
		this.status = aValue;
	}

	/**
	 * 转正时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="ZHUANZHENGSHIJIAN" type="java.util.Date"
	 *                     length="7" not-null="false" unique="false"
	 */
	public java.util.Date getZhuanzhengshijian() {
		return this.zhuanzhengshijian;
	}

	/**
	 * Set the zhuanzhengshijian
	 */
	public void setZhuanzhengshijian(java.util.Date aValue) {
		this.zhuanzhengshijian = aValue;
	}

	/**
	 * 合同到期时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="HETONGDAOQISHIJIAN" type="java.util.Date"
	 *                     length="7" not-null="false" unique="false"
	 */
	public java.util.Date getHetongdaoqishijian() {
		return this.hetongdaoqishijian;
	}

	/**
	 * Set the hetongdaoqishijian
	 */
	public void setHetongdaoqishijian(java.util.Date aValue) {
		this.hetongdaoqishijian = aValue;
	}

	/**
	 * 工作所在地国家 * @return Long
	 * 
	 * @hibernate.property column="GONGZUODI_GUOJIA" type="java.lang.Long"
	 *                     length="22" not-null="false" unique="false"
	 */
	public Long getGongzuodiGuojia() {
		return this.gongzuodiGuojia;
	}

	/**
	 * Set the gongzuodiGuojia
	 */
	public void setGongzuodiGuojia(Long aValue) {
		this.gongzuodiGuojia = aValue;
	}

	/**
	 * 工作所在地省 * @return Long
	 * 
	 * @hibernate.property column="GONGZUODI_SHENG" type="java.lang.Long"
	 *                     length="22" not-null="false" unique="false"
	 */
	public Long getGongzuodiSheng() {
		return this.gongzuodiSheng;
	}

	/**
	 * Set the gongzuodiSheng
	 */
	public void setGongzuodiSheng(Long aValue) {
		this.gongzuodiSheng = aValue;
	}

	/**
	 * 工作所在地市 * @return Long
	 * 
	 * @hibernate.property column="GONGZUODI_SHI" type="java.lang.Long"
	 *                     length="22" not-null="false" unique="false"
	 */
	public Long getGongzuodiShi() {
		return this.gongzuodiShi;
	}

	/**
	 * Set the gongzuodiShi
	 */
	public void setGongzuodiShi(Long aValue) {
		this.gongzuodiShi = aValue;
	}

	/**
	 * 工作所在地区 * @return Long
	 * 
	 * @hibernate.property column="GONGZUODI_DIQU" type="java.lang.Long"
	 *                     length="22" not-null="false" unique="false"
	 */
	public Long getGongzuodiDiqu() {
		return this.gongzuodiDiqu;
	}

	/**
	 * Set the gongzuodiDiqu
	 */
	public void setGongzuodiDiqu(Long aValue) {
		this.gongzuodiDiqu = aValue;
	}

	/**
	 * 备注 * @return String
	 * 
	 * @hibernate.property column="NOTE" type="java.lang.String" length="500"
	 *                     not-null="false" unique="false"
	 */
	public String getNote() {
		return this.note;
	}

	/**
	 * Set the note
	 */
	public void setNote(String aValue) {
		this.note = aValue;
	}

	public Long getParent() {
		return parent;
	}

	public void setParent(Long parent) {
		this.parent = parent;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UlEmployee)) {
			return false;
		}
		UlEmployee rhs = (UlEmployee) object;
		return new EqualsBuilder().append(this.fullname, rhs.fullname)
				.append(this.useid, rhs.useid).append(this.alias, rhs.alias)
				.append(this.sex, rhs.sex).append(this.birthday, rhs.birthday)
				.append(this.type, rhs.type)
				.append(this.hujiGuojia, rhs.hujiGuojia)
				.append(this.hujiSheng, rhs.hujiSheng)
				.append(this.hujiShi, rhs.hujiShi)
				.append(this.hujiDiqu, rhs.hujiDiqu)
				.append(this.education, rhs.education)
				.append(this.biyeyuanxiao, rhs.biyeyuanxiao)
				.append(this.ruzhifangshi, rhs.ruzhifangshi)
				.append(this.email, rhs.email).append(this.zhiwei, rhs.zhiwei)
				.append(this.zhiji, rhs.zhiji).append(this.status, rhs.status)
				.append(this.zhuanzhengshijian, rhs.zhuanzhengshijian)
				.append(this.hetongdaoqishijian, rhs.hetongdaoqishijian)
				.append(this.gongzuodiGuojia, rhs.gongzuodiGuojia)
				.append(this.gongzuodiSheng, rhs.gongzuodiSheng)
				.append(this.gongzuodiShi, rhs.gongzuodiShi)
				.append(this.gongzuodiDiqu, rhs.gongzuodiDiqu)
				.append(this.note, rhs.note).
				append(this.bankTypeId, rhs.bankTypeId).
				append(this.bankname, rhs.bankname).
				isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.fullname)
				.append(this.useid).append(this.alias).append(this.sex)
				.append(this.birthday).append(this.type)
				.append(this.hujiGuojia).append(this.hujiSheng)
				.append(this.hujiShi).append(this.hujiDiqu)
				.append(this.education).append(this.biyeyuanxiao)
				.append(this.ruzhifangshi).append(this.email)
				.append(this.zhiwei).append(this.zhiji).append(this.status)
				.append(this.zhuanzhengshijian).append(this.hetongdaoqishijian)
				.append(this.gongzuodiGuojia).append(this.gongzuodiSheng)
				.append(this.gongzuodiShi).append(this.gongzuodiDiqu)
				.append(this.note).append(this.bankTypeId).
				append(this.bankname).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("fullname", this.fullname)
				.append("useid", this.useid).append("alias", this.alias)
				.append("sex", this.sex).append("birthday", this.birthday)
				.append("type", this.type)
				.append("hujiGuojia", this.hujiGuojia)
				.append("hujiSheng", this.hujiSheng)
				.append("hujiShi", this.hujiShi)
				.append("hujiDiqu", this.hujiDiqu)
				.append("education", this.education)
				.append("biyeyuanxiao", this.biyeyuanxiao)
				.append("ruzhifangshi", this.ruzhifangshi)
				.append("email", this.email).append("zhiwei", this.zhiwei)
				.append("zhiji", this.zhiji).append("status", this.status)
				.append("zhuanzhengshijian", this.zhuanzhengshijian)
				.append("hetongdaoqishijian", this.hetongdaoqishijian)
				.append("gongzuodiGuojia", this.gongzuodiGuojia)
				.append("gongzuodiSheng", this.gongzuodiSheng)
				.append("gongzuodiShi", this.gongzuodiShi)
				.append("gongzuodiDiqu", this.gongzuodiDiqu)
				.append("note", this.note).append("bankTypeId",this.bankTypeId).
				append("bankname",this.bankname).toString();
	}

	// public UlEmployee getParentEmp() {
	// return parentEmp;
	// }
	//
	// public void setParentEmp(UlEmployee parentEmp) {
	// this.parentEmp = parentEmp;
	// }

}