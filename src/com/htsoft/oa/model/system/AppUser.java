package com.htsoft.oa.model.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.xml.bind.annotation.XmlTransient;

import org.jbpm.api.identity.User;
import org.springframework.security.GrantedAuthority;
import org.springframework.security.GrantedAuthorityImpl;
import org.springframework.security.userdetails.UserDetails;

import com.google.gson.annotations.Expose;
import com.htsoft.core.menu.TopModule;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlUsergroup;

/**
 * AppUser Base Java Bean, base class for the.oa.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * TODO: add class/table comments
 */
@SuppressWarnings("serial")
public class AppUser extends com.htsoft.core.model.BaseModel implements
		UserDetails, User {
	/**
	 * 系统用户ID，由初始化数据加入
	 */
	public static final Long SYSTEM_USER = new Long(1);
	/**
	 * 超级管理员ID,由初始化数据加入
	 */
	public static final Long SUPER_USER = new Long(1);
	/**
	 * 动态密码状态，０＝未绑定，１＝绑定
	 */
	public static final Short DYNPWD_STATUS_BIND = 1;
	public static final Short DYNPWD_STATUS_UNBIND = 0;
	
	public static final short APPUSER_DELETE_NO=0;//为删除
	public static final short APPUSER_DELETE_YES=1;//已删除
	
	//状态
	public static final short APPUSER_STATUS_ACTIV=1;//激活
	public static final short APPUSER_STATUS_DISABLED=0;//禁用
	public static final short APPUSER_STATUS_DEPARTURE=2;//离职
	
	//职位
	public static final short APPUSER_ZHIWEI_JL=44;//呼叫中心销售经理
	public static final short APPUSER_ZHIWEI_BZ=51;//班长
	public static final short APPUSER_ZHIWEI_ZX=50;//坐席
	
	@Expose
	protected Long userId;
	@Expose
	protected String username;
	protected String password;
	protected String arrpwd;
	protected Long buLu;   //是否设置补录的权限
	
	@Expose
	protected String email;
	@Expose
	protected Department department;
	@Expose
	protected UlEmployee ulEmployee;


	@Expose
	protected String phone;
	@Expose
	protected String mobile;
	@Expose
	protected String fax;
	@Expose
	protected String address;
	@Expose
	protected String zip;
	@Expose
	protected String photo;
	
	protected java.util.Date accessionTime;
	@Expose
	protected Short status;
	@Expose
	protected String education;
	@Expose
	protected Short title;
	@Expose
	protected String fullname;
	@Expose
	protected Short delFlag;
	@Expose
	protected String dynamicPwd;
	@Expose
	protected Short dyPwdStatus;
	@XmlTransient
	protected Set<AppRole> roles;

//	protected com.ulane.base.model.xitong.UlUsergroup ulUsergroup;
//	@XmlTransient
//	@ManyToMany(mappedBy = "appusers")
	private Set<UlUsergroup> ulUsergroups;
	@Expose
	protected String userType;
	@Expose
	protected java.util.Date beginDate;
	@Expose
	protected java.util.Date endDate;
	
	@Expose
	protected String yonghuzu;
	
	@Expose
	protected String employeeid;//工号，不是员工id
	
	
//	protected Long useid;//数据库中的useid存的是用户和员工映射关系（员工id）。
	
	protected String depName;
	
	protected String createBy;
	
	protected String updateBy;

	protected java.util.Date createDate;
	
	protected java.util.Date updateDate;
	
	protected String note;
	
	protected String depPath;
	//新增字段  关联机构部门管理信息2015-03-13修改（所属行信息）
	protected Long bankTypeId;//编号
	protected String bankname;//名称
	//protected Integer holdCount;//可回收数量

//	protected java.util.Set<com.ulane.customer.model.fee.ObFeeIndex> obFeeIndexUsers = new java.util.HashSet<com.ulane.customer.model.fee.ObFeeIndex>();
	public String getDepName() {
		return depName;
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

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public String getEmployeeid() {
		return employeeid;
	}

	public void setEmployeeid(String employeeid) {
		this.employeeid = employeeid;
	}

	public UlEmployee getUlEmployee() {
		return ulEmployee;
	}

	public void setUlEmployee(UlEmployee ulEmployee) {
		this.ulEmployee = ulEmployee;
	}
	
	public String getYonghuzu() {
		return yonghuzu;
	}

	public void setYonghuzu(String yonghuzu) {
		this.yonghuzu = yonghuzu;
	}

	public Set<UlUsergroup> getUlUsergroups() {
		return ulUsergroups;
	}

	public void setUlUsergroups(Set<UlUsergroup> ulUsergroup) {
		this.ulUsergroups = ulUsergroup;
	}
	/**
	 * * @return java.lang.String
	 * 
	 * @hibernate.property column="userType" type="java.lang.String"
	 *                     length="128" not-null="true" unique="false"
	 */
	public String getUserType() {
		return userType;
	}
	
	/**
	 * Set the userType
	 * 
	 * @spring.validator type="required"
	 */
	public void setUserType(String userType) {
		this.userType = userType;
	}
	/**
	 * * @return java.util.Date
	 * 
	 * @hibernate.property column="beginDate" type="java.util.Date"
	 *                     length="19" not-null="false" unique="false"
	 */
	public java.util.Date getBeginDate() {
		return beginDate;
	}
	
	/**
	 * Set the beginDate
	 * 
	 * @spring.validator type="required"
	 */
	public void setBeginDate(java.util.Date beginDate) {
		this.beginDate = beginDate;
	}
	/**
	 * * @return java.util.Date
	 * 
	 * @hibernate.property column="endDate" type="java.util.Date"
	 *                     length="19" not-null="false" unique="false"
	 */
	public java.util.Date getEndDate() {
		return endDate;
	}
	/**
	 * Set the endDate
	 * 
	 * @spring.validator type="required"
	 */
	public void setEndDate(java.util.Date endDate) {
		this.endDate = endDate;
	}

	/**
	 * 用户头部的模块菜单，由用户登录后设置 
	 */
	private Map<String,TopModule> topModules=new LinkedHashMap<String,TopModule>();
	
	/**
	 * 用于存储该用户的权限
	 */
	protected Set<String> rights = new HashSet<String>();
	

	public Set<String> getRights() {
		return rights;
	}

	public Map<String, TopModule> getTopModules() {
		return topModules;
	}
	public void setTopModules(Map<String, TopModule> topModules) {
		this.topModules = topModules;
	}

	/**
	 * 取得所有的Function的权限，则以_为开头的权限
	 * 
	 * @return
	 */
	public String getFunctionRights() {
		StringBuffer sb = new StringBuffer();

		Iterator<String> it = rights.iterator();

		while (it.hasNext()) {
			sb.append(it.next()).append(",");
		}

		if (rights.size() > 0) {
			sb.deleteCharAt(sb.length() - 1);
		}

		return sb.toString();
	}

	public void setRights(Set<String> rights) {
		this.rights = rights;
	}

	/**
	 * Default Empty Constructor for class AppUser
	 */
	public AppUser() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class AppUser
	 */
	public AppUser(Long in_userId) {
		this.setUserId(in_userId);
	}

	/**
	 * * @return Long
	 * 
	 * @hibernate.id column="userId" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getUserId() {
		return this.userId;
	}

	/**
	 * Set the userId
	 */
	public void setUserId(Long aValue) {
		this.userId = aValue;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="username" type="java.lang.String"
	 *                     length="128" not-null="true" unique="false"
	 */
	public String getUsername() {
		return this.username;
	}

	/**
	 * Set the username
	 * 
	 * @spring.validator type="required"
	 */
	public void setUsername(String aValue) {
		this.username = aValue;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="password" type="java.lang.String"
	 *                     length="128" not-null="true" unique="false"
	 */
	public String getPassword() {
		return this.password;
	}

	/**
	 * Set the password
	 * 
	 * @spring.validator type="required"
	 */
	public void setPassword(String aValue) {
		this.password = aValue;
	}
	
	/**
	 * 添加授权密码字段set get方法
	 * @return
	 */
	public String getArrpwd() {
		return this.arrpwd;
	}

	/**
	 * Set the arrpwd
	 * 
	 * @spring.validator type="required"
	 */
	public void setArrpwd(String aValue) {
		this.arrpwd = aValue;
	}

	
	
	public Long getBuLu() {
		return buLu;
	}

	public void setBuLu(Long buLu) {
		this.buLu = buLu;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="email" type="java.lang.String" length="128"
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

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="phone" type="java.lang.String" length="32"
	 *                     not-null="false" unique="false"
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
	 * * @return String
	 * 
	 * @hibernate.property column="mobile" type="java.lang.String" length="32"
	 *                     not-null="false" unique="false"
	 */
	public String getMobile() {
		return this.mobile;
	}

	/**
	 * Set the mobile
	 */
	public void setMobile(String aValue) {
		this.mobile = aValue;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="fax" type="java.lang.String" length="32"
	 *                     not-null="false" unique="false"
	 */
	public String getFax() {
		return this.fax;
	}

	/**
	 * Set the fax
	 */
	public void setFax(String aValue) {
		this.fax = aValue;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="address" type="java.lang.String" length="64"
	 *                     not-null="false" unique="false"
	 */
	public String getAddress() {
		return this.address;
	}

	/**
	 * Set the address
	 */
	public void setAddress(String aValue) {
		this.address = aValue;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="zip" type="java.lang.String" length="32"
	 *                     not-null="false" unique="false"
	 */
	public String getZip() {
		return this.zip;
	}

	/**
	 * Set the zip
	 */
	public void setZip(String aValue) {
		this.zip = aValue;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="photo" type="java.lang.String" length="128"
	 *                     not-null="false" unique="false"
	 */
	public String getPhoto() {
		return this.photo;
	}

	/**
	 * Set the photo
	 */
	public void setPhoto(String aValue) {
		this.photo = aValue;
	}

	/**
	 * * @return java.util.Date
	 * 
	 * @hibernate.property column="accessionTime" type="java.util.Date"
	 *                     length="19" not-null="true" unique="false"
	 */
	public java.util.Date getAccessionTime() {
		return this.accessionTime;
	}

	/**
	 * Set the accessionTime
	 * 
	 * @spring.validator type="required"
	 */
	public void setAccessionTime(java.util.Date aValue) {
		this.accessionTime = aValue;
	}

	/**
	 * * @return Short
	 * 
	 * @hibernate.property column="status" type="java.lang.Short" length="5"
	 *                     not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}

	/**
	 * Set the status
	 * 
	 * @spring.validator type="required"
	 */
	public void setStatus(Short aValue) {
		this.status = aValue;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="education" type="java.lang.String"
	 *                     length="64" not-null="false" unique="false"
	 */
	public String getEducation() {
		return this.education;
	}

	/**
	 * Set the education
	 */
	public void setEducation(String aValue) {
		this.education = aValue;
	}

	/**
	 * * @return Short
	 * 
	 * @hibernate.property column="title" type="java.lang.Short" length="32"
	 *                     not-null="false" unique="false"
	 */
	public Short getTitle() {
		return this.title;
	}

	/**
	 * Set the title
	 */
	public void setTitle(Short aValue) {
		this.title = aValue;
	}

	/**
	 * * @return String
	 * 
	 * @hibernate.property column="fullname" type="java.lang.String"
	 *                     length="128" not-null="false" unique="false"
	 */
	public String getFullname() {
		return this.fullname;
	}

	/**
	 * Set the fullname
	 */
	public void setFullname(String aValue) {
		this.fullname = aValue;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}

	public String getDynamicPwd() {
		return dynamicPwd;
	}

	public void setDynamicPwd(String dynamicPwd) {
		this.dynamicPwd = dynamicPwd;
	}

	public Short getDyPwdStatus() {
		return dyPwdStatus;
	}

	public void setDyPwdStatus(Short dyPwdStatus) {
		this.dyPwdStatus = dyPwdStatus;
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "userId";
	}

	public Set<AppRole> getRoles() {
		return roles;
	}

	public void setRoles(Set<AppRole> roles) {
		this.roles = roles;
	}

	public GrantedAuthority[] getAuthorities() {
		GrantedAuthority[] rights = roles.toArray(new GrantedAuthority[roles
				.size() + 1]);
		rights[rights.length - 1] = new GrantedAuthorityImpl("ROLE_PUBLIC");
		return rights;
	}

	public boolean isAccountNonExpired() {
		return true;
	}

	public boolean isAccountNonLocked() {
		return true;
	}

	public boolean isCredentialsNonExpired() {
		return true;
	}

	public boolean isEnabled() {
		if (status == 1) {
			return true;
		}
		return false;
	}

	// overwrite for

	/**
	 * Return the Id (pk) of the entity
	 */
	public String getId() {
		return userId.toString();
	}

	@Override
	public String getBusinessEmail() {
		return email;
	}

	@Override
	public String getFamilyName() {
		return fullname;
	}

	@Override
	public String getGivenName() {
		return fullname;
	}

	public boolean isSupperManage() {
		Set<AppRole> roles = getRoles();
		boolean flag = false;
		for (Iterator<AppRole> it = roles.iterator(); it.hasNext();) {
			AppRole role = it.next();
			if (role.getRoleId().shortValue() == AppRole.SUPER_ROLEID
					.shortValue()) {
				flag = true;
			}
		}
		return flag;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public java.util.Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(java.util.Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getDepPath() {
		return depPath;
	}

	public void setDepPath(String depPath) {
		this.depPath = depPath;
	}

//	public java.util.Set<com.ulane.customer.model.fee.ObFeeIndex> getObFeeIndexUsers() {
//		return obFeeIndexUsers;
//	}
//
//	public void setObFeeIndexUsers(
//			java.util.Set<com.ulane.customer.model.fee.ObFeeIndex> obFeeIndexUsers) {
//		this.obFeeIndexUsers = obFeeIndexUsers;
//	}

//	public Integer getHoldCount() {
//		return holdCount;
//	}
//
//	public void setHoldCount(Integer holdCount) {
//		this.holdCount = holdCount;
//	}

	
}
