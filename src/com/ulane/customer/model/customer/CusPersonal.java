package com.ulane.customer.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.customer.CusLinkman;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * CusPersonal Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class CusPersonal extends com.htsoft.oa.model.customer.Customer {
	//业务编码
	protected String busiCode;
	//客户类别
	protected Short cusCatId;
	//姓名
	protected String nameCn;
	//英文名
	protected String nameEn;
	//简称
	protected String nameAli;
	//性别
	protected String gender;
	//国家
	protected Short country;
	//区域
	protected Long regionId;
	//证件类型
	protected Short credTypId;
	//证件号码
	protected String credNum;
	//证件有效期
	protected java.util.Date credDurDat;
	//生日或出生日期
	protected java.util.Date birthday;
	//工作单位
	protected String workCompany;
	//称谓
	protected Short cusTitId;
	//教育程度
	protected Short cusEduId;
	//行业
	protected Short cusTraId;
	//职位
	protected Short jobTypId;
	//级别
	protected Short cusGraId;
	//是否已婚
	protected Short hasMarried;
	//是否有子妇
	protected Short haveChild;
	//收入范围
	protected Short salaryId;
	//客户来源
	protected Short cusFromId;
	//是否已复核
	protected Short hasChecked;
	//状态
	protected Short staId;
	//备注
	protected String remark;
	//创建人
	protected Long creUseId;
	//创建日期
	protected java.util.Date creDat;
	//修改人
	protected Long updUseId;
	//修改日期
	protected java.util.Date updDat;
	//伪删除标记 0 正常 1删除
	protected Long isDelete;
	//年龄
	protected Long cusAge;
	//阳历/阴历判断
	protected Long birthdayType;
	
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

	protected java.util.Set<CusCompany> cusPerComRels = new java.util.HashSet<CusCompany>();
//	protected java.util.Set<CusPersonal> cusPerPerRels = new java.util.HashSet<CusPersonal>();
	protected java.util.Set<CusLinkman> cus_linkman = new java.util.HashSet<CusLinkman>();
	protected java.util.Set<CusContact> cus_contact = new java.util.HashSet<CusContact>();
	protected java.util.Set<CusDelivery> cus_delivery = new java.util.HashSet<CusDelivery>();


	public java.util.Set<CusLinkman> getCus_linkman() {
		return cus_linkman;
	}

	public void setCus_linkman(java.util.Set<CusLinkman> cusLinkman) {
		cus_linkman = cusLinkman;
	}

	public java.util.Set<CusContact> getCus_contact() {
		return cus_contact;
	}

	public void setCus_contact(java.util.Set<CusContact> cusContact) {
		cus_contact = cusContact;
	}

	public java.util.Set<CusDelivery> getCus_delivery() {
		return cus_delivery;
	}

	public void setCus_delivery(java.util.Set<CusDelivery> cusDelivery) {
		cus_delivery = cusDelivery;
	}

	/**
	 * Default Empty Constructor for class CusPersonal
	 */
	public CusPersonal () {
		super();
		new CusPersonalEven();
		
	}
	
	/**
	 * Default Key Fields Constructor for class CusPersonal
	 */
	public CusPersonal (
		 Long in_customerid
        ) {
		this.setCustomerId(in_customerid);
    }

	public java.util.Set<CusCompany> getCusPerComRels () {
		return cusPerComRels;
	}	
	
	public void setCusPerComRels (java.util.Set<CusCompany> in_cusPerComRels) {
		this.cusPerComRels = in_cusPerComRels;
	}

//	public java.util.Set<CusPersonal> getCusPerPerRels () {
//		return cusPerPerRels;
//	}	
//	
//	public void setCusPerPerRels (java.util.Set<CusPersonal> in_cusPerPerRels) {
//		this.cusPerPerRels = in_cusPerPerRels;
//	}
    
	/**
	 * 业务编码	 * @return String
	 * @hibernate.property column="BUSI_CODE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getBusiCode() {
		return this.busiCode;
	}
	
	public Long getCusAge() {
		return cusAge;
	}

	public void setCusAge(Long cusAge) {
		this.cusAge = cusAge;
	}

	public Long getBirthdayType() {
		return birthdayType;
	}

	public void setBirthdayType(Long birthdayType) {
		this.birthdayType = birthdayType;
	}

	/**
	 * Set the busiCode
	 */	
	public void setBusiCode(String aValue) {
		this.busiCode = aValue;
	}	

	/**
	 * 客户类别：冠名客户	 * @return Short
	 * @hibernate.property column="CUS_CAT_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusCatId() {
		return this.cusCatId;
	}
	
	/**
	 * Set the cusCatId
	 */	
	public void setCusCatId(Short aValue) {
		this.cusCatId = aValue;
	}	

	/**
	 * 中文名称	 * @return String
	 * @hibernate.property column="NAME_CN" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getNameCn() {
		return this.nameCn;
	}
	
	/**
	 * Set the nameCn
	 * @spring.validator type="required"
	 */	
	public void setNameCn(String aValue) {
		this.nameCn = aValue;
	}	

	/**
	 * 英文名称	 * @return String
	 * @hibernate.property column="NAME_EN" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getNameEn() {
		return this.nameEn;
	}
	
	/**
	 * Set the nameEn
	 */	
	public void setNameEn(String aValue) {
		this.nameEn = aValue;
	}	

	/**
	 * 简称	 * @return String
	 * @hibernate.property column="NAME_ALI" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getNameAli() {
		return this.nameAli;
	}
	
	/**
	 * Set the nameAli
	 */	
	public void setNameAli(String aValue) {
		this.nameAli = aValue;
	}	

	/**
	 * 性别	 * @return String
	 * @hibernate.property column="GENDER" type="java.lang.String" length="5" not-null="false" unique="false"
	 */
	public String getGender() {
		return this.gender;
	}
	
	/**
	 * Set the gender
	 */	
	public void setGender(String aValue) {
		this.gender = aValue;
	}	

	/**
	 * 国籍	 * @return Short
	 * @hibernate.property column="COUNTRY" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCountry() {
		return this.country;
	}
	
	/**
	 * Set the country
	 */	
	public void setCountry(Short aValue) {
		this.country = aValue;
	}	

	/**
	 * 所在区域	 * @return Short
	 * @hibernate.property column="REGION_ID" type="java.lang.Short" length="18" not-null="false" unique="false"
	 */
	public Long getRegionId() {
		return this.regionId;
	}
	
	/**
	 * Set the regionId
	 */	
	public void setRegionId(Long aValue) {
		this.regionId = aValue;
	}	

	/**
	 * 证件类型	 * @return Short
	 * @hibernate.property column="CRED_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCredTypId() {
		return this.credTypId;
	}
	
	/**
	 * Set the credTypId
	 */	
	public void setCredTypId(Short aValue) {
		this.credTypId = aValue;
	}	

	/**
	 * 证件号码	 * @return String
	 * @hibernate.property column="CRED_NUM" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getCredNum() {
		return this.credNum;
	}
	
	/**
	 * Set the credNum
	 */	
	public void setCredNum(String aValue) {
		this.credNum = aValue;
	}	

	/**
	 * 证件有效期	 * @return java.util.Date
	 * @hibernate.property column="CRED_DUR_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCredDurDat() {
		return this.credDurDat;
	}
	
	/**
	 * Set the credDurDat
	 */	
	public void setCredDurDat(java.util.Date aValue) {
		this.credDurDat = aValue;
	}	

	/**
	 * 生日	 * @return java.util.Date
	 * @hibernate.property column="BIRTHDAY" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 工作单位	 * @return String
	 * @hibernate.property column="WORK_COMPANY" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getWorkCompany() {
		return this.workCompany;
	}
	
	/**
	 * Set the workCompany
	 */	
	public void setWorkCompany(String aValue) {
		this.workCompany = aValue;
	}	

	/**
	 * 客户称谓：总经理、先生、女生、教授、其它	 * @return Short
	 * @hibernate.property column="CUS_TIT_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusTitId() {
		return this.cusTitId;
	}
	
	/**
	 * Set the cusTitId
	 */	
	public void setCusTitId(Short aValue) {
		this.cusTitId = aValue;
	}	

	/**
	 * 教育程度	 * @return Short
	 * @hibernate.property column="CUS_EDU_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusEduId() {
		return this.cusEduId;
	}
	
	/**
	 * Set the cusEduId
	 */	
	public void setCusEduId(Short aValue) {
		this.cusEduId = aValue;
	}	

	/**
	 * 客户行业：金融、地产、制造等	 * @return Short
	 * @hibernate.property column="CUS_TRA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusTraId() {
		return this.cusTraId;
	}
	
	/**
	 * Set the cusTraId
	 */	
	public void setCusTraId(Short aValue) {
		this.cusTraId = aValue;
	}	

	/**
	 * 客户职位：CEO、CIO、工程师	 * @return Short
	 * @hibernate.property column="JOB_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getJobTypId() {
		return this.jobTypId;
	}
	
	/**
	 * Set the jobTypId
	 */	
	public void setJobTypId(Short aValue) {
		this.jobTypId = aValue;
	}	

	/**
	 * 客户等级：黑卡、金卡、普卡	 * @return Short
	 * @hibernate.property column="CUS_GRA_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusGraId() {
		return this.cusGraId;
	}
	
	/**
	 * Set the cusGraId
	 */	
	public void setCusGraId(Short aValue) {
		this.cusGraId = aValue;
	}	

	/**
	 * 是否已婚	 * @return Short
	 * @hibernate.property column="HAS_MARRIED" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getHasMarried() {
		return this.hasMarried;
	}
	
	/**
	 * Set the hasMarried
	 */	
	public void setHasMarried(Short aValue) {
		this.hasMarried = aValue;
	}	

	/**
	 * 是否有子女	 * @return Short
	 * @hibernate.property column="HAVE_CHILD" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getHaveChild() {
		return this.haveChild;
	}
	
	/**
	 * Set the haveChild
	 */	
	public void setHaveChild(Short aValue) {
		this.haveChild = aValue;
	}	

	/**
	 * 收入范围	 * @return Short
	 * @hibernate.property column="SALARY_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getSalaryId() {
		return this.salaryId;
	}
	
	/**
	 * Set the salaryId
	 */	
	public void setSalaryId(Short aValue) {
		this.salaryId = aValue;
	}	

	/**
	 * 客户来源	 * @return Short
	 * @hibernate.property column="CUS_FROM_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusFromId() {
		return this.cusFromId;
	}
	
	/**
	 * Set the cusFromId
	 */	
	public void setCusFromId(Short aValue) {
		this.cusFromId = aValue;
	}	

	/**
	 * 是否已复核：1=是、0=否	 * @return Short
	 * @hibernate.property column="HAS_CHECKED" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getHasChecked() {
		return this.hasChecked;
	}
	
	/**
	 * Set the hasChecked
	 * @spring.validator type="required"
	 */	
	public void setHasChecked(Short aValue) {
		this.hasChecked = aValue;
	}	

	/**
	 * 状态：有效、注销	 * @return Short
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
	 * 创建人ID	 * @return Integer
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Integer" length="10" not-null="true" unique="false"
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
	 * 创建日期	 * @return java.util.Date
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="true" unique="false"
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
	 * 修改人ID	 * @return Integer
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Integer" length="10" not-null="false" unique="false"
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
	 * 修改日期	 * @return java.util.Date
	 * @hibernate.property column="UPD_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
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
	 * 删除标记
	 * @return 0或1
	 */
	public Long getIsDelete() {
		return isDelete;
	}
	
	/**
	 * Set the isDelete
	 */	
	public void setIsDelete(Long isDelete) {
		this.isDelete = isDelete;
	}
	
	/**
	 * 扩展字段1	 * @return String
	 * @hibernate.property column="EXT1" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt1() {
		return this.ext1;
	}
	
	/**
	 * Set the ext1
	 */	
	public void setExt1(String aValue) {
		this.ext1 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT2" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt2() {
		return this.ext2;
	}
	
	/**
	 * Set the ext2
	 */	
	public void setExt2(String aValue) {
		this.ext2 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT3" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt3() {
		return this.ext3;
	}
	
	/**
	 * Set the ext3
	 */	
	public void setExt3(String aValue) {
		this.ext3 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT4" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt4() {
		return this.ext4;
	}
	
	/**
	 * Set the ext4
	 */	
	public void setExt4(String aValue) {
		this.ext4 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT5" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt5() {
		return this.ext5;
	}
	
	/**
	 * Set the ext5
	 */	
	public void setExt5(String aValue) {
		this.ext5 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT6" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt6() {
		return this.ext6;
	}
	
	/**
	 * Set the ext6
	 */	
	public void setExt6(String aValue) {
		this.ext6 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT8" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt8() {
		return this.ext8;
	}
	
	/**
	 * Set the ext8
	 */	
	public void setExt8(String aValue) {
		this.ext8 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT7" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt7() {
		return this.ext7;
	}
	
	/**
	 * Set the ext7
	 */	
	public void setExt7(String aValue) {
		this.ext7 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT9" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt9() {
		return this.ext9;
	}
	
	/**
	 * Set the ext9
	 */	
	public void setExt9(String aValue) {
		this.ext9 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT10" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExt10() {
		return this.ext10;
	}
	
	/**
	 * Set the ext10
	 */	
	public void setExt10(String aValue) {
		this.ext10 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT11" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getExt11() {
		return this.ext11;
	}
	
	/**
	 * Set the ext11
	 */	
	public void setExt11(String aValue) {
		this.ext11 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT12" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getExt12() {
		return this.ext12;
	}
	
	/**
	 * Set the ext12
	 */	
	public void setExt12(String aValue) {
		this.ext12 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT13" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getExt13() {
		return this.ext13;
	}
	
	/**
	 * Set the ext13
	 */	
	public void setExt13(String aValue) {
		this.ext13 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT14" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getExt14() {
		return this.ext14;
	}
	
	/**
	 * Set the ext14
	 */	
	public void setExt14(String aValue) {
		this.ext14 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT15" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getExt15() {
		return this.ext15;
	}
	
	/**
	 * Set the ext15
	 */	
	public void setExt15(String aValue) {
		this.ext15 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT16" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getExt16() {
		return this.ext16;
	}
	
	/**
	 * Set the ext16
	 */	
	public void setExt16(String aValue) {
		this.ext16 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT17" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getExt17() {
		return this.ext17;
	}
	
	/**
	 * Set the ext17
	 */	
	public void setExt17(String aValue) {
		this.ext17 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT18" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getExt18() {
		return this.ext18;
	}
	
	/**
	 * Set the ext18
	 */	
	public void setExt18(String aValue) {
		this.ext18 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT19" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getExt19() {
		return this.ext19;
	}
	
	/**
	 * Set the ext19
	 */	
	public void setExt19(String aValue) {
		this.ext19 = aValue;
	}	

	/**
	 * 扩展字段	 * @return String
	 * @hibernate.property column="EXT20" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getExt20() {
		return this.ext20;
	}
	
	/**
	 * Set the ext20
	 */	
	public void setExt20(String aValue) {
		this.ext20 = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CusPersonal)) {
			return false;
		}
		CusPersonal rhs = (CusPersonal) object;
		return new EqualsBuilder()
				.append(this.customerId, rhs.customerId)
				.append(this.busiCode, rhs.busiCode)
				.append(this.cusCatId, rhs.cusCatId)
				.append(this.nameCn, rhs.nameCn)
				.append(this.nameEn, rhs.nameEn)
				.append(this.nameAli, rhs.nameAli)
				.append(this.gender, rhs.gender)
				.append(this.country, rhs.country)
				.append(this.regionId, rhs.regionId)
				.append(this.credTypId, rhs.credTypId)
				.append(this.credNum, rhs.credNum)
				.append(this.credDurDat, rhs.credDurDat)
				.append(this.birthday, rhs.birthday)
				.append(this.workCompany, rhs.workCompany)
				.append(this.cusTitId, rhs.cusTitId)
				.append(this.cusEduId, rhs.cusEduId)
				.append(this.cusTraId, rhs.cusTraId)
				.append(this.jobTypId, rhs.jobTypId)
				.append(this.cusGraId, rhs.cusGraId)
				.append(this.hasMarried, rhs.hasMarried)
				.append(this.haveChild, rhs.haveChild)
				.append(this.salaryId, rhs.salaryId)
				.append(this.cusFromId, rhs.cusFromId)
				.append(this.hasChecked, rhs.hasChecked)
				.append(this.staId, rhs.staId)
				.append(this.remark, rhs.remark)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creDat, rhs.creDat)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updDat, rhs.updDat)
				.append(this.ext1, rhs.ext1)
				.append(this.ext2, rhs.ext2)
				.append(this.ext3, rhs.ext3)
				.append(this.ext4, rhs.ext4)
				.append(this.ext5, rhs.ext5)
				.append(this.ext6, rhs.ext6)
				.append(this.ext8, rhs.ext8)
				.append(this.ext7, rhs.ext7)
				.append(this.ext9, rhs.ext9)
				.append(this.ext10, rhs.ext10)
				.append(this.ext11, rhs.ext11)
				.append(this.ext12, rhs.ext12)
				.append(this.ext13, rhs.ext13)
				.append(this.ext14, rhs.ext14)
				.append(this.ext15, rhs.ext15)
				.append(this.ext16, rhs.ext16)
				.append(this.ext17, rhs.ext17)
				.append(this.ext18, rhs.ext18)
				.append(this.ext19, rhs.ext19)
				.append(this.ext20, rhs.ext20)
				.append(this.isDelete, rhs.isDelete)
				.append(this.cusAge, rhs.cusAge)
				.append(this.birthdayType, rhs.birthdayType)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.customerId) 
				.append(this.busiCode) 
				.append(this.cusCatId) 
				.append(this.nameCn) 
				.append(this.nameEn) 
				.append(this.nameAli) 
				.append(this.gender) 
				.append(this.country) 
				.append(this.regionId) 
				.append(this.credTypId) 
				.append(this.credNum) 
				.append(this.credDurDat) 
				.append(this.birthday) 
				.append(this.workCompany) 
				.append(this.cusTitId) 
				.append(this.cusEduId) 
				.append(this.cusTraId) 
				.append(this.jobTypId) 
				.append(this.cusGraId) 
				.append(this.hasMarried) 
				.append(this.haveChild) 
				.append(this.salaryId) 
				.append(this.cusFromId) 
				.append(this.hasChecked) 
				.append(this.staId) 
				.append(this.remark) 
				.append(this.creUseId) 
				.append(this.creDat) 
				.append(this.updUseId) 
				.append(this.updDat) 
				.append(this.ext1) 
				.append(this.ext2) 
				.append(this.ext3) 
				.append(this.ext4) 
				.append(this.ext5) 
				.append(this.ext6) 
				.append(this.ext8) 
				.append(this.ext7) 
				.append(this.ext9) 
				.append(this.ext10) 
				.append(this.ext11) 
				.append(this.ext12) 
				.append(this.ext13) 
				.append(this.ext14) 
				.append(this.ext15) 
				.append(this.ext16) 
				.append(this.ext17) 
				.append(this.ext18) 
				.append(this.ext19) 
				.append(this.ext20) 
				.append(this.isDelete) 
				.append(this.cusAge)
				.append(this.birthdayType)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("customerid", this.customerId) 
				.append("busiCode", this.busiCode) 
				.append("cusCatId", this.cusCatId) 
				.append("nameCn", this.nameCn) 
				.append("nameEn", this.nameEn) 
				.append("nameAli", this.nameAli) 
				.append("gender", this.gender) 
				.append("country", this.country) 
				.append("regionId", this.regionId) 
				.append("credTypId", this.credTypId) 
				.append("credNum", this.credNum) 
				.append("credDurDat", this.credDurDat) 
				.append("birthday", this.birthday) 
				.append("workCompany", this.workCompany) 
				.append("cusTitId", this.cusTitId) 
				.append("cusEduId", this.cusEduId) 
				.append("cusTraId", this.cusTraId) 
				.append("jobTypId", this.jobTypId) 
				.append("cusGraId", this.cusGraId) 
				.append("hasMarried", this.hasMarried) 
				.append("haveChild", this.haveChild) 
				.append("salaryId", this.salaryId) 
				.append("cusFromId", this.cusFromId) 
				.append("hasChecked", this.hasChecked) 
				.append("staId", this.staId) 
				.append("remark", this.remark) 
				.append("creUseId", this.creUseId) 
				.append("creDat", this.creDat) 
				.append("updUseId", this.updUseId) 
				.append("updDat", this.updDat) 
				.append("ext1", this.ext1) 
				.append("ext2", this.ext2) 
				.append("ext3", this.ext3) 
				.append("ext4", this.ext4) 
				.append("ext5", this.ext5) 
				.append("ext6", this.ext6) 
				.append("ext8", this.ext8) 
				.append("ext7", this.ext7) 
				.append("ext9", this.ext9) 
				.append("ext10", this.ext10) 
				.append("ext11", this.ext11) 
				.append("ext12", this.ext12) 
				.append("ext13", this.ext13) 
				.append("ext14", this.ext14) 
				.append("ext15", this.ext15) 
				.append("ext16", this.ext16) 
				.append("ext17", this.ext17) 
				.append("ext18", this.ext18) 
				.append("ext19", this.ext19) 
				.append("ext20", this.ext20) 
				.append("isDelete", this.isDelete) 
				.append("cusAge", this.cusAge)
				.append("birthdayType", this.birthdayType)
				.toString();
	}



}
