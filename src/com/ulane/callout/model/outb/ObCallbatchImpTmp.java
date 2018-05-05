package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import javax.persistence.SequenceGenerator;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * ObCallbatchImpTmp Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
//@SequenceGenerator(name="SEQ_STORE", sequenceName="SEQ_OB_CALLBATCH_IMP_TMP_ID")
public class ObCallbatchImpTmp extends com.htsoft.core.model.BaseModel {

    protected Long tmpCusId;
	protected String inCustBase;
	protected String nameCn;
	protected String nameAli;
	protected Short cusTypId;
	protected String gender;
	protected String birthday;
	protected Short credTypId;
	protected String credNum;
	protected java.util.Date credDurDat;
	protected String remark;
	protected Integer creUseId;
	protected java.util.Date creDat;
	protected Integer updUseId;
	protected java.util.Date updDat;
	protected String ext1;
	protected String ext2;
	protected String ext3;
	protected String ext4;
	protected String ext5;
	protected String ext6;
	protected String ext7;
	protected String ext8;
	protected String ext9;
	protected String ext10;
	protected Short staId;
	protected Short inavailableId;
	protected com.ulane.callout.model.outb.ObCallbatch obCallbatch;
	//protected com.ulane.callout.model.outb.ObConCalllist obConCalllist;
	
	protected String cusCode;
	protected Integer inchargePerson;
	protected String teleOffice;
	protected String teleMobile;
	protected String teleOthers;
	protected String fax;
	protected String email;
	protected String addrBook;
	protected String postCode;
	protected Integer age;
	protected String teleHome;
	
	protected Long cusId;
	
	
	
	//有效
	public static final Short CALLBATCH_IMP_TMP_STA_AVALABLE = 1;
	//无效
	public static final Short CALLBATCH_IMP_TMP_STA_INAVALABLE = 0;
	
	
    public static final String CUSBASE_OPE_HIS_TYP_CREATE_MAN="0";//手工录入	
    public static final String CUSBASE_OPE_HIS_TYP_CREATE_SYS="1";//导入	
    public static final String CUSBASE_OPE_HIS_TYP_MODIFT="2";//赋值生成	
    public static final String CUSBASE_OPE_HIS_TYP_DEREPEAT="3";//修改	
    public static final String CUSBASE_OPE_HIS_TYP_CLEAN="4";//分配	
    public static final String CUSBASE_OPE_HIS_TYP_CLOSE="5";//回收 
    public static final String CUSBASE_OPE_HIS_OPER_TYPE="6";//拨打
    
    protected String fullname;

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getTeleOffice() {
		return teleOffice;
	}

	public void setTeleOffice(String teleOffice) {
		this.teleOffice = teleOffice;
	}

	public String getTeleMobile() {
		return teleMobile;
	}

	public void setTeleMobile(String teleMobile) {
		this.teleMobile = teleMobile;
	}

	public String getTeleOthers() {
		return teleOthers;
	}

	public void setTeleOthers(String teleOthers) {
		this.teleOthers = teleOthers;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddrBook() {
		return addrBook;
	}

	public void setAddrBook(String addrBook) {
		this.addrBook = addrBook;
	}

	public String getPostCode() {
		return postCode;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getTeleHome() {
		return teleHome;
	}

	public void setTeleHome(String teleHome) {
		this.teleHome = teleHome;
	}

	/**
	 * Default Empty Constructor for class ObCallbatchImpTmp
	 */
	public ObCallbatchImpTmp () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObCallbatchImpTmp
	 */
	public ObCallbatchImpTmp (
		 Long in_tmpCusId
        ) {
		this.setTmpCusId(in_tmpCusId);
    }

	
	public com.ulane.callout.model.outb.ObCallbatch getObCallbatch () {
		return obCallbatch;
	}	
	
	public void setObCallbatch (com.ulane.callout.model.outb.ObCallbatch in_obCallbatch) {
		this.obCallbatch = in_obCallbatch;
	}
	
//	public com.ulane.callout.model.outb.ObConCalllist getObConCalllist () {
//		return obConCalllist;
//	}	
//	
//	public void setObConCalllist (com.ulane.callout.model.outb.ObConCalllist in_obConCalllist) {
//		this.obConCalllist = in_obConCalllist;
//	}
    

	/**
	 * 临时客户内码	 * @return Long
     * @hibernate.id column="TMP_CUS_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getTmpCusId() {
		return this.tmpCusId;
	}
	
	/**
	 * Set the tmpCusId
	 */	
	public void setTmpCusId(Long aValue) {
		this.tmpCusId = aValue;
	}	

	/**
	 * 名单批次内码	 * @return Long
	 */
	public Long getCallbatchId() {
		return this.getObCallbatch()==null?null:this.getObCallbatch().getCallbatchId();
	}
	
	/**
	 * Set the callbatchId
	 */	
	public void setCallbatchId(Long aValue) {
	    if (aValue==null) {
	    	obCallbatch = null;
	    } else if (obCallbatch == null) {
	        obCallbatch = new com.ulane.callout.model.outb.ObCallbatch(aValue);
	        obCallbatch.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCallbatch.setCallbatchId(aValue);
	    }
	}	

	/**
	 * 联络名单客户内码	 * @return Long
	 */
//	public Long getCusId() {
//		return this.getObConCalllist()==null?null:this.getObConCalllist().getCusId();
//	}
//	
//	/**
//	 * Set the cusId
//	 */	
//	public void setCusId(Long aValue) {
//	    if (aValue==null) {
//	    	obConCalllist = null;
//	    } else if (obConCalllist == null) {
//	        obConCalllist = new com.ulane.callout.model.outb.ObConCalllist(aValue);
//	        obConCalllist.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//			obConCalllist.setCusId(aValue);
//	    }
//	}	

	/**
	 * 是否已绑定客户：生成了客户基础表后回写该字段。0-否，1-是&CONOB_CALLBATCH_IMP_TMP_SFBDKH	 * @return String
	 * @hibernate.property column="IN_CUST_BASE" type="java.lang.String" length="5" not-null="true" unique="false"
	 */
	public String getInCustBase() {
		return this.inCustBase;
	}
	
	/**
	 * Set the inCustBase
	 * @spring.validator type="required"
	 */	
	public void setInCustBase(String aValue) {
		this.inCustBase = aValue;
	}	

	/**
	 * 客户名称	 * @return String
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
	 * 客户类型：个人客户、联系人	 * @return Short
	 * @hibernate.property column="CUS_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getCusTypId() {
		return this.cusTypId;
	}
	
	/**
	 * Set the cusTypId
	 */	
	public void setCusTypId(Short aValue) {
		this.cusTypId = aValue;
	}	

	/**
	 * 性别：0-女，1-男&CONOB_CALLBATCH_IMP_TMP_SEX	 * @return String
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
	 * 生日	 * @return String
	 * @hibernate.property column="BIRTHDAY" type="java.lang.String" length="10" not-null="false" unique="false"
	 */
	public String getBirthday() {
		return this.birthday;
	}
	
	/**
	 * Set the birthday
	 */	
	public void setBirthday(String aValue) {
		this.birthday = aValue;
	}	

	/**
	 * 证件类型：0-身份证，1-户口薄&CONOB_CALLBATCH_IMP_TMP_ZJLX	 * @return Short
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
	 * 创建人内码	 * @return Integer
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getCreUseId() {
		return this.creUseId;
	}
	
	/**
	 * Set the creUseId
	 * @spring.validator type="required"
	 */	
	public void setCreUseId(Integer aValue) {
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
	 * 修改人	 * @return Integer
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getUpdUseId() {
		return this.updUseId;
	}
	
	/**
	 * Set the updUseId
	 */	
	public void setUpdUseId(Integer aValue) {
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
	 * 扩展1	 * @return String
	 * @hibernate.property column="EXT_1" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展2	 * @return String
	 * @hibernate.property column="EXT_2" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展3	 * @return String
	 * @hibernate.property column="EXT_3" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展4	 * @return String
	 * @hibernate.property column="EXT_4" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展5	 * @return String
	 * @hibernate.property column="EXT_5" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展6	 * @return String
	 * @hibernate.property column="EXT_6" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展7	 * @return String
	 * @hibernate.property column="EXT_7" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展8	 * @return String
	 * @hibernate.property column="EXT_8" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展9	 * @return String
	 * @hibernate.property column="EXT_9" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 扩展10	 * @return String
	 * @hibernate.property column="EXT_10" type="java.lang.String" length="256" not-null="false" unique="false"
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
	 * 状态：0-无效、有效-1&CONOB_CALLBATCH_IMP_TMP_ZT	 * @return Short
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
	 * 无效原因：0-黑名单、1-数据不完整、2-字段格式不正确、3-合并&CONOB_CALLBATCH_IMP_TMP_WXYY	 * @return Short
	 * @hibernate.property column="INAVAILABLE_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getInavailableId() {
		return this.inavailableId;
	}
	
	/**
	 * Set the inavailableId
	 */	
	public void setInavailableId(Short aValue) {
		this.inavailableId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObCallbatchImpTmp)) {
			return false;
		}
		ObCallbatchImpTmp rhs = (ObCallbatchImpTmp) object;
		return new EqualsBuilder()
				.append(this.tmpCusId, rhs.tmpCusId)
								.append(this.inCustBase, rhs.inCustBase)
				.append(this.nameCn, rhs.nameCn)
				.append(this.nameAli, rhs.nameAli)
				.append(this.cusTypId, rhs.cusTypId)
				.append(this.gender, rhs.gender)
				.append(this.birthday, rhs.birthday)
				.append(this.credTypId, rhs.credTypId)
				.append(this.credNum, rhs.credNum)
				.append(this.credDurDat, rhs.credDurDat)
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
				.append(this.ext7, rhs.ext7)
				.append(this.ext8, rhs.ext8)
				.append(this.ext9, rhs.ext9)
				.append(this.ext10, rhs.ext10)
				.append(this.staId, rhs.staId)
				.append(this.inavailableId, rhs.inavailableId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.tmpCusId) 
								.append(this.inCustBase) 
				.append(this.nameCn) 
				.append(this.nameAli) 
				.append(this.cusTypId) 
				.append(this.gender) 
				.append(this.birthday) 
				.append(this.credTypId) 
				.append(this.credNum) 
				.append(this.credDurDat) 
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
				.append(this.ext7) 
				.append(this.ext8) 
				.append(this.ext9) 
				.append(this.ext10) 
				.append(this.staId) 
				.append(this.inavailableId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("tmpCusId", this.tmpCusId) 
								.append("inCustBase", this.inCustBase) 
				.append("nameCn", this.nameCn) 
				.append("nameAli", this.nameAli) 
				.append("cusTypId", this.cusTypId) 
				.append("gender", this.gender) 
				.append("birthday", this.birthday) 
				.append("credTypId", this.credTypId) 
				.append("credNum", this.credNum) 
				.append("credDurDat", this.credDurDat) 
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
				.append("ext7", this.ext7) 
				.append("ext8", this.ext8) 
				.append("ext9", this.ext9) 
				.append("ext10", this.ext10) 
				.append("staId", this.staId) 
				.append("inavailableId", this.inavailableId) 
				.toString();
	}

	public String getCusCode() {
		return cusCode;
	}

	public void setCusCode(String cusCode) {
		this.cusCode = cusCode;
	}

	public Integer getInchargePerson() {
		return inchargePerson;
	}

	public void setInchargePerson(Integer inchargePerson) {
		this.inchargePerson = inchargePerson;
	}

	public Long getCusId() {
		return cusId;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}



}
