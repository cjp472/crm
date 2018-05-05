package com.ulane.callout.model.outb;
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
 * ObComSalerul Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class ObComSalerul extends com.htsoft.core.model.BaseModel {

    protected Long rulId;
	protected String rulNam;
	protected Long rulTypeId;
	protected String rulValMin;
	protected String rulValMax;
	protected Short rulDis;
	protected Short rulStaId;
	protected com.ulane.callout.model.outb.ObCom obCom;
	
	public static final Long TYPE_TIME 		= 0L; 	//拨打时间段
	public static final Long TYPE_ASSIGN 	= 1L;	//分配方式
	public static final Long TYPE_MAX_NUM	= 2L;	//最大拨打次数
	public static final Long TYPE_MAX_SPACE	= 3L;	//最大拨打间隔
	
	public static final String RUL_VAL_MAX_ASSIGN_LIST = "0";	//分配方式：名单分配
	public static final String RUL_VAL_MAX_ASSIGN_POOL = "1";	//分配方式：名单池分配
	
	/**
	 * Default Empty Constructor for class ObComSalerul
	 */
	public ObComSalerul () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObComSalerul
	 */
	public ObComSalerul (
		 Long in_rulId
        ) {
		this.setRulId(in_rulId);
    }

	
	public com.ulane.callout.model.outb.ObCom getObCom () {
		return obCom;
	}	
	
	public void setObCom (com.ulane.callout.model.outb.ObCom in_obCom) {
		this.obCom = in_obCom;
	}
    

	/**
	 * 规则内码	 * @return Long
     * @hibernate.id column="RUL_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getRulId() {
		return this.rulId;
	}
	
	/**
	 * Set the rulId
	 */	
	public void setRulId(Long aValue) {
		this.rulId = aValue;
	}	

	/**
	 * 活动内码	 * @return Long
	 */
	public Long getComId() {
		return this.getObCom()==null?null:this.getObCom().getComId();
	}
	
	/**
	 * Set the comId
	 */	
	public void setComId(Long aValue) {
	    if (aValue==null) {
	    	obCom = null;
	    } else if (obCom == null) {
	        obCom = new com.ulane.callout.model.outb.ObCom(aValue);
	        obCom.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCom.setComId(aValue);
	    }
	}	

	/**
	 * 规则名称	 * @return String
	 * @hibernate.property column="RUL_NAM" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getRulNam() {
		return this.rulNam;
	}
	
	/**
	 * Set the rulNam
	 * @spring.validator type="required"
	 */	
	public void setRulNam(String aValue) {
		this.rulNam = aValue;
	}	

	/**
	 * 规则类型：最大拨打次数、最小拨打次数等&CONOB_COM_SALERUL_GZLX	 * @return Short
	 * @hibernate.property column="RUL_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Long getRulTypeId() {
		return this.rulTypeId;
	}
	
	/**
	 * Set the rulTypeId
	 * @spring.validator type="required"
	 */	
	public void setRulTypeId(Long aValue) {
		this.rulTypeId = aValue;
	}	

	/**
	 * 最小值：只有一个值时填该字段	 * @return Long
	 * @hibernate.property column="RUL_VAL_MIN" type="java.lang.Long" length="18" not-null="true" unique="false"
	 */
	public String getRulValMin() {
		return this.rulValMin;
	}
	
	/**
	 * Set the rulValMin
	 * @spring.validator type="required"
	 */	
	public void setRulValMin(String aValue) {
		this.rulValMin = aValue;
	}	

	/**
	 * 最大值	 * @return Long
	 * @hibernate.property column="RUL_VAL_MAX" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public String getRulValMax() {
		return this.rulValMax;
	}
	
	/**
	 * Set the rulValMax
	 */	
	public void setRulValMax(String aValue) {
		this.rulValMax = aValue;
	}	

	/**
	 * 顺序号&CONOB_COM_SALERUL_SXH	 * @return Short
	 * @hibernate.property column="RUL_DIS" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getRulDis() {
		return this.rulDis;
	}
	
	/**
	 * Set the rulDis
	 * @spring.validator type="required"
	 */	
	public void setRulDis(Short aValue) {
		this.rulDis = aValue;
	}	

	/**
	 * 状态&CONOB_COM_SALERUL_ZT	 * @return Short
	 * @hibernate.property column="RUL_STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getRulStaId() {
		return this.rulStaId;
	}
	
	/**
	 * Set the rulStaId
	 * @spring.validator type="required"
	 */	
	public void setRulStaId(Short aValue) {
		this.rulStaId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObComSalerul)) {
			return false;
		}
		ObComSalerul rhs = (ObComSalerul) object;
		return new EqualsBuilder()
				.append(this.rulId, rhs.rulId)
						.append(this.rulNam, rhs.rulNam)
				.append(this.rulTypeId, rhs.rulTypeId)
				.append(this.rulValMin, rhs.rulValMin)
				.append(this.rulValMax, rhs.rulValMax)
				.append(this.rulDis, rhs.rulDis)
				.append(this.rulStaId, rhs.rulStaId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.rulId) 
						.append(this.rulNam) 
				.append(this.rulTypeId) 
				.append(this.rulValMin) 
				.append(this.rulValMax) 
				.append(this.rulDis) 
				.append(this.rulStaId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("rulId", this.rulId) 
						.append("rulNam", this.rulNam) 
				.append("rulTypeId", this.rulTypeId) 
				.append("rulValMin", this.rulValMin) 
				.append("rulValMax", this.rulValMax) 
				.append("rulDis", this.rulDis) 
				.append("rulStaId", this.rulStaId) 
				.toString();
	}



}
