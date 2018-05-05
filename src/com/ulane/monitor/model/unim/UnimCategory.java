package com.ulane.monitor.model.unim;
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
 * UnimCategory Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class UnimCategory extends com.htsoft.core.model.BaseModel {

    protected Long catId;
	protected Short typeId;
	protected String catName;
	protected String catCode;
	protected String extend1;
	protected String extend2;
	protected String statustype;
	protected Long status;
	protected String thrlevladv; //阀值提醒
	protected String thrlevlwar; //阀值警告
	public String getThrlevladv() {
		return thrlevladv;
	}

	public void setThrlevladv(String thrlevladv) {
		this.thrlevladv = thrlevladv;
	}

	public String getThrlevlwar() {
		return thrlevlwar;
	}

	public void setThrlevlwar(String thrlevlwar) {
		this.thrlevlwar = thrlevlwar;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public String getExtend3() {
		return extend3;
	}

	public void setExtend3(String extend3) {
		this.extend3 = extend3;
	}

	public String getExtend4() {
		return extend4;
	}

	public void setExtend4(String extend4) {
		this.extend4 = extend4;
	}

	public static Short getUnimCatTypAgent() {
		return UNIM_CAT_TYP_AGENT;
	}

	protected String remark;
	protected String extend3;
	protected String extend4;
	
	public static final Short UNIM_CAT_TYP_AGENT = 1;	//type=1时，为座席分类
	
	public static final Short STA_ENABLE 	= 1;		//1——启用&ZZJGZT0001
	public static final Short STA_CANCELED	= 2;		//2——注销&ZZJGZT0001
	
	protected java.util.Set unimThrlevls = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class UnimCategory
	 */
	public UnimCategory () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UnimCategory
	 */
	public UnimCategory (
		 Long in_catId
        ) {
		this.setCatId(in_catId);
    }


	public java.util.Set getUnimThrlevls () {
		return unimThrlevls;
	}	
	
	public void setUnimThrlevls (java.util.Set in_unimThrlevls) {
		this.unimThrlevls = in_unimThrlevls;
	}
    

	/**
	 * ID	 * @return Long
     * @hibernate.id column="CAT_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getCatId() {
		return this.catId;
	}
	
	/**
	 * Set the catId
	 */	
	public void setCatId(Long aValue) {
		this.catId = aValue;
	}	

	/**
	 * 类型 1 坐席分类 2 坐席状态 3 示忙原因 4 举手原因	 * @return Short
	 * @hibernate.property column="TYPE_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getTypeId() {
		return this.typeId;
	}
	
	/**
	 * Set the typeId
	 */	
	public void setTypeId(Short aValue) {
		this.typeId = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="CAT_NAME" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getCatName() {
		return this.catName;
	}
	
	/**
	 * Set the catName
	 */	
	public void setCatName(String aValue) {
		this.catName = aValue;
	}	

	/**
	 * 值(可以是编号)	 * @return String
	 * @hibernate.property column="CAT_CODE" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getCatCode() {
		return this.catCode;
	}
	
	/**
	 * Set the catCode
	 */	
	public void setCatCode(String aValue) {
		this.catCode = aValue;
	}	

	/**
	 * 扩展字段1	 * @return String
	 * @hibernate.property column="EXTEND1" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend1() {
		return this.extend1;
	}
	
	/**
	 * Set the extend1
	 */	
	public void setExtend1(String aValue) {
		this.extend1 = aValue;
	}	

	/**
	 * 扩展字段2	 * @return String
	 * @hibernate.property column="EXTEND2" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getExtend2() {
		return this.extend2;
	}
	
	/**
	 * Set the extend2
	 */	
	public void setExtend2(String aValue) {
		this.extend2 = aValue;
	}	

	/**
	 * 状态类别	 * @return String
	 * @hibernate.property column="STATUSTYPE" type="java.lang.String" length="255" not-null="false" unique="false"
	 */
	public String getStatustype() {
		return this.statustype;
	}
	
	/**
	 * Set the statustype
	 */	
	public void setStatustype(String aValue) {
		this.statustype = aValue;
	}	

	/**
	 * 备注	 * @return String
	 * @hibernate.property column="REMARK" type="java.lang.String" length="512" not-null="false" unique="false"
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

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UnimCategory other = (UnimCategory) obj;
		if (catCode == null) {
			if (other.catCode != null)
				return false;
		} else if (!catCode.equals(other.catCode))
			return false;
		if (catId == null) {
			if (other.catId != null)
				return false;
		} else if (!catId.equals(other.catId))
			return false;
		if (catName == null) {
			if (other.catName != null)
				return false;
		} else if (!catName.equals(other.catName))
			return false;
		if (extend1 == null) {
			if (other.extend1 != null)
				return false;
		} else if (!extend1.equals(other.extend1))
			return false;
		if (extend2 == null) {
			if (other.extend2 != null)
				return false;
		} else if (!extend2.equals(other.extend2))
			return false;
		if (extend3 == null) {
			if (other.extend3 != null)
				return false;
		} else if (!extend3.equals(other.extend3))
			return false;
		if (extend4 == null) {
			if (other.extend4 != null)
				return false;
		} else if (!extend4.equals(other.extend4))
			return false;
		if (remark == null) {
			if (other.remark != null)
				return false;
		} else if (!remark.equals(other.remark))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (statustype == null) {
			if (other.statustype != null)
				return false;
		} else if (!statustype.equals(other.statustype))
			return false;
		if (thrlevladv == null) {
			if (other.thrlevladv != null)
				return false;
		} else if (!thrlevladv.equals(other.thrlevladv))
			return false;
		if (thrlevlwar == null) {
			if (other.thrlevlwar != null)
				return false;
		} else if (!thrlevlwar.equals(other.thrlevlwar))
			return false;
		if (typeId == null) {
			if (other.typeId != null)
				return false;
		} else if (!typeId.equals(other.typeId))
			return false;
		if (unimThrlevls == null) {
			if (other.unimThrlevls != null)
				return false;
		} else if (!unimThrlevls.equals(other.unimThrlevls))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((catCode == null) ? 0 : catCode.hashCode());
		result = prime * result + ((catId == null) ? 0 : catId.hashCode());
		result = prime * result + ((catName == null) ? 0 : catName.hashCode());
		result = prime * result + ((extend1 == null) ? 0 : extend1.hashCode());
		result = prime * result + ((extend2 == null) ? 0 : extend2.hashCode());
		result = prime * result + ((extend3 == null) ? 0 : extend3.hashCode());
		result = prime * result + ((extend4 == null) ? 0 : extend4.hashCode());
		result = prime * result + ((remark == null) ? 0 : remark.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result
				+ ((statustype == null) ? 0 : statustype.hashCode());
		result = prime * result
				+ ((thrlevladv == null) ? 0 : thrlevladv.hashCode());
		result = prime * result
				+ ((thrlevlwar == null) ? 0 : thrlevlwar.hashCode());
		result = prime * result + ((typeId == null) ? 0 : typeId.hashCode());
		result = prime * result
				+ ((unimThrlevls == null) ? 0 : unimThrlevls.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "UnimCategory [catCode=" + catCode + ", catId=" + catId
				+ ", catName=" + catName + ", extend1=" + extend1
				+ ", extend2=" + extend2 + ", extend3=" + extend3
				+ ", extend4=" + extend4 + ", remark=" + remark + ", status="
				+ status + ", statustype=" + statustype + ", thrlevladv="
				+ thrlevladv + ", thrlevlwar=" + thrlevlwar + ", typeId="
				+ typeId + ", unimThrlevls=" + unimThrlevls + "]";
	}



}
