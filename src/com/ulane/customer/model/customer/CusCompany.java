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
 * CusCompany Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class CusCompany extends com.htsoft.oa.model.customer.Customer {

	protected String busiCode;
	protected Short cusCatId;
	protected String nameCn;
	protected String nameEn;
	protected String nameAli;
	protected String simpleCode;
	protected String enrollCode;
	protected String taxnumber;
	protected Short occupationId;
	protected Short companyCharacterId;
	protected Short companyTypeId;
	protected Short companyCreditId;
	protected Integer regionId;
	protected String tradeAddress;
	protected String tradeZipcode;
	protected String tradeScope;
	protected String registerAddress;
	protected String registerZipcode;
	protected String legalName;
	protected String registerMoney;
	protected java.util.Date regTime;
	protected String companyUrl;
	protected String companyRemark;
	protected Short hasChecked;
	protected Short staId;
	protected String remark;
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

	protected java.util.Set<CusPersonal> cusPerComRels = new java.util.HashSet<CusPersonal>();

	/**
	 * Default Empty Constructor for class CusCompany
	 */
	public CusCompany () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class CusCompany
	 */
	public CusCompany (
		 Long in_customerid
        ) {
		this.setCustomerId(in_customerid);
    }


	public java.util.Set<CusPersonal> getCusPerComRels () {
		return cusPerComRels;
	}	
	
	public void setCusPerComRels (java.util.Set<CusPersonal> in_cusPerComRels) {
		this.cusPerComRels = in_cusPerComRels;
	}
    
	/**
	 * 业务编码	 * @return String
	 * @hibernate.property column="BUSI_CODE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getBusiCode() {
		return this.busiCode;
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
	 * 简码	 * @return String
	 * @hibernate.property column="SIMPLE_CODE" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getSimpleCode() {
		return this.simpleCode;
	}
	
	/**
	 * Set the simpleCode
	 */	
	public void setSimpleCode(String aValue) {
		this.simpleCode = aValue;
	}	

	/**
	 * 组织结构代码证	 * @return String
	 * @hibernate.property column="ENROLL_CODE" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getEnrollCode() {
		return this.enrollCode;
	}
	
	/**
	 * Set the enrollCode
	 */	
	public void setEnrollCode(String aValue) {
		this.enrollCode = aValue;
	}	

	/**
	 * 税务登记号	 * @return String
	 * @hibernate.property column="TAXNUMBER" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getTaxnumber() {
		return this.taxnumber;
	}
	
	/**
	 * Set the taxnumber
	 */	
	public void setTaxnumber(String aValue) {
		this.taxnumber = aValue;
	}	

	/**
	 * 所属行业	 * @return Short
	 * @hibernate.property column="OCCUPATION_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getOccupationId() {
		return this.occupationId;
	}
	
	/**
	 * Set the occupationId
	 */	
	public void setOccupationId(Short aValue) {
		this.occupationId = aValue;
	}	

	/**
	 * 企业性质，外企、国有、私营等	 * @return Short
	 * @hibernate.property column="COMPANY_CHARACTER_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCompanyCharacterId() {
		return this.companyCharacterId;
	}
	
	/**
	 * Set the companyCharacterId
	 */	
	public void setCompanyCharacterId(Short aValue) {
		this.companyCharacterId = aValue;
	}	

	/**
	 * 企业类型，小规模纳税人等	 * @return Short
	 * @hibernate.property column="COMPANY_TYPE_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCompanyTypeId() {
		return this.companyTypeId;
	}
	
	/**
	 * Set the companyTypeId
	 */	
	public void setCompanyTypeId(Short aValue) {
		this.companyTypeId = aValue;
	}	

	/**
	 * 供应商信用级别，AAA、BBB等	 * @return Short
	 * @hibernate.property column="COMPANY_CREDIT_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCompanyCreditId() {
		return this.companyCreditId;
	}
	
	/**
	 * Set the companyCreditId
	 */	
	public void setCompanyCreditId(Short aValue) {
		this.companyCreditId = aValue;
	}	

	/**
	 * 所在地区	 * @return Integer
	 * @hibernate.property column="REGION_ID" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getRegionId() {
		return this.regionId;
	}
	
	/**
	 * Set the regionId
	 */	
	public void setRegionId(Integer aValue) {
		this.regionId = aValue;
	}	

	/**
	 * 企业经营地址(包括地区和详细信息)	 * @return String
	 * @hibernate.property column="TRADE_ADDRESS" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getTradeAddress() {
		return this.tradeAddress;
	}
	
	/**
	 * Set the tradeAddress
	 */	
	public void setTradeAddress(String aValue) {
		this.tradeAddress = aValue;
	}	

	/**
	 * 经营地址邮编	 * @return String
	 * @hibernate.property column="TRADE_ZIPCODE" type="java.lang.String" length="6" not-null="false" unique="false"
	 */
	public String getTradeZipcode() {
		return this.tradeZipcode;
	}
	
	/**
	 * Set the tradeZipcode
	 */	
	public void setTradeZipcode(String aValue) {
		this.tradeZipcode = aValue;
	}	

	/**
	 * 企业经营范围	 * @return String
	 * @hibernate.property column="TRADE_SCOPE" type="java.lang.String" length="4000" not-null="false" unique="false"
	 */
	public String getTradeScope() {
		return this.tradeScope;
	}
	
	/**
	 * Set the tradeScope
	 */	
	public void setTradeScope(String aValue) {
		this.tradeScope = aValue;
	}	

	/**
	 * 企业注册地址(包括地区和详细信息)	 * @return String
	 * @hibernate.property column="REGISTER_ADDRESS" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getRegisterAddress() {
		return this.registerAddress;
	}
	
	/**
	 * Set the registerAddress
	 */	
	public void setRegisterAddress(String aValue) {
		this.registerAddress = aValue;
	}	

	/**
	 * 注册地址邮编	 * @return String
	 * @hibernate.property column="REGISTER_ZIPCODE" type="java.lang.String" length="6" not-null="false" unique="false"
	 */
	public String getRegisterZipcode() {
		return this.registerZipcode;
	}
	
	/**
	 * Set the registerZipcode
	 */	
	public void setRegisterZipcode(String aValue) {
		this.registerZipcode = aValue;
	}	

	/**
	 * 法人名称	 * @return String
	 * @hibernate.property column="LEGAL_NAME" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getLegalName() {
		return this.legalName;
	}
	
	/**
	 * Set the legalName
	 */	
	public void setLegalName(String aValue) {
		this.legalName = aValue;
	}	

	/**
	 * 注册资金	 * @return String
	 * @hibernate.property column="REGISTER_MONEY" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getRegisterMoney() {
		return this.registerMoney;
	}
	
	/**
	 * Set the registerMoney
	 */	
	public void setRegisterMoney(String aValue) {
		this.registerMoney = aValue;
	}	

	/**
	 * 注册日期	 * @return java.util.Date
	 * @hibernate.property column="REG_TIME" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getRegTime() {
		return this.regTime;
	}
	
	/**
	 * Set the regTime
	 */	
	public void setRegTime(java.util.Date aValue) {
		this.regTime = aValue;
	}	

	/**
	 * 公司网址	 * @return String
	 * @hibernate.property column="COMPANY_URL" type="java.lang.String" length="100" not-null="false" unique="false"
	 */
	public String getCompanyUrl() {
		return this.companyUrl;
	}
	
	/**
	 * Set the companyUrl
	 */	
	public void setCompanyUrl(String aValue) {
		this.companyUrl = aValue;
	}	

	/**
	 * 公司简介	 * @return String
	 * @hibernate.property column="COMPANY_REMARK" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getCompanyRemark() {
		return this.companyRemark;
	}
	
	/**
	 * Set the companyRemark
	 */	
	public void setCompanyRemark(String aValue) {
		this.companyRemark = aValue;
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
		if (!(object instanceof CusCompany)) {
			return false;
		}
		CusCompany rhs = (CusCompany) object;
		return new EqualsBuilder()
				.append(this.customerId, rhs.customerId)
				.append(this.busiCode, rhs.busiCode)
				.append(this.cusCatId, rhs.cusCatId)
				.append(this.nameCn, rhs.nameCn)
				.append(this.nameEn, rhs.nameEn)
				.append(this.nameAli, rhs.nameAli)
				.append(this.simpleCode, rhs.simpleCode)
				.append(this.enrollCode, rhs.enrollCode)
				.append(this.taxnumber, rhs.taxnumber)
				.append(this.occupationId, rhs.occupationId)
				.append(this.companyCharacterId, rhs.companyCharacterId)
				.append(this.companyTypeId, rhs.companyTypeId)
				.append(this.companyCreditId, rhs.companyCreditId)
				.append(this.regionId, rhs.regionId)
				.append(this.tradeAddress, rhs.tradeAddress)
				.append(this.tradeZipcode, rhs.tradeZipcode)
				.append(this.tradeScope, rhs.tradeScope)
				.append(this.registerAddress, rhs.registerAddress)
				.append(this.registerZipcode, rhs.registerZipcode)
				.append(this.legalName, rhs.legalName)
				.append(this.registerMoney, rhs.registerMoney)
				.append(this.regTime, rhs.regTime)
				.append(this.companyUrl, rhs.companyUrl)
				.append(this.companyRemark, rhs.companyRemark)
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
				.append(this.simpleCode) 
				.append(this.enrollCode) 
				.append(this.taxnumber) 
				.append(this.occupationId) 
				.append(this.companyCharacterId) 
				.append(this.companyTypeId) 
				.append(this.companyCreditId) 
				.append(this.regionId) 
				.append(this.tradeAddress) 
				.append(this.tradeZipcode) 
				.append(this.tradeScope) 
				.append(this.registerAddress) 
				.append(this.registerZipcode) 
				.append(this.legalName) 
				.append(this.registerMoney) 
				.append(this.regTime) 
				.append(this.companyUrl) 
				.append(this.companyRemark) 
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
				.append("simpleCode", this.simpleCode) 
				.append("enrollCode", this.enrollCode) 
				.append("taxnumber", this.taxnumber) 
				.append("occupationId", this.occupationId) 
				.append("companyCharacterId", this.companyCharacterId) 
				.append("companyTypeId", this.companyTypeId) 
				.append("companyCreditId", this.companyCreditId) 
				.append("regionId", this.regionId) 
				.append("tradeAddress", this.tradeAddress) 
				.append("tradeZipcode", this.tradeZipcode) 
				.append("tradeScope", this.tradeScope) 
				.append("registerAddress", this.registerAddress) 
				.append("registerZipcode", this.registerZipcode) 
				.append("legalName", this.legalName) 
				.append("registerMoney", this.registerMoney) 
				.append("regTime", this.regTime) 
				.append("companyUrl", this.companyUrl) 
				.append("companyRemark", this.companyRemark) 
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
				.toString();
	}



}
