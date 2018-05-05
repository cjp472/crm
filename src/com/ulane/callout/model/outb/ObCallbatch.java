package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.htsoft.oa.model.system.AppUser;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

/**
 * ObCallbatch Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObCallbatch extends com.htsoft.core.model.BaseModel {

    protected Long callbatchId;			//名单批次内码
	protected String callbatchNam;		//批次名称
	protected String callbatchDes;
	protected Short callbatchTypId;		//批次类型
	protected Short callbatchSrcId;		//来源
	protected String callbatchRegion;	//所属地区
	protected String numberSta;
	protected String numberEnd;
	protected java.util.Date staDat;
	protected java.util.Date endDat;
	protected Integer impDur;
	protected Integer totalCount;		//总数
	protected Integer avlidCount;		//有效数量
	protected Integer inavlidCount;
	protected Integer holdCount;
	protected AppUser useId;
	protected java.util.Date creDat;
	protected Short callbatchStaId;		//状态
	protected com.ulane.callout.model.outb.ObCalllist obCalllist;

	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchAsss = new java.util.HashSet();
	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchCuss = new java.util.HashSet();
	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchHiss = new java.util.HashSet();
	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchImpTmps = new java.util.HashSet();
	@SuppressWarnings("unchecked")
    protected java.util.Set obConCalllists = new java.util.HashSet();
	@SuppressWarnings("unchecked")
    protected java.util.Set obSaletasks = new java.util.HashSet();
	
	//新增字段
	protected Short clearnTyp;					//清洗方式
	protected java.util.Date clearnDat;			//清洗时间
	protected Long clearnOpt;					//清洗操作人
	protected Integer clearnCounts;				//清洗数量

	public static final String G_FLAG_ENABLE 	 = "1";//对应批次启动（无其他限制）
	public static final String G_FLAG_ALL		 = "2";//对应批次的全部（无其他限制）
	public static final String G_FLAG_UN_ENABLE = "0";//对应批次的未启用（无其他限制）
	
	protected String comNam;
	 /**
     * 未启用
     */
    public static final Short FLAG_UNENABLED = 0;
    /**
     * 启用
     */
    public static final Short FLAG_ENABLED = 2;
    /**
    * 注销
    */
   public static final Short FLAG_INVALID = 1;	
   
	 /**
    * 号码段
    */
   public static final Short BATCH_TYPE_NUMBER = 0;
   /**
    * 客户名单
    */
   public static final Short BATCH_TYPE_CALLLIST= 1;
   
	 /**
    * 本地文件
    */
   public static final Short BATCH_SRC_LOCALFILE = 0;
   /**
    *名单抽取
    */
   public static final Short BATCH_SRC_CHOUQU = 1;
   /**
   * 客户资料
   */
  public static final Short BATCH_SRC_CUS = 2;	

	/**
	 * Default Empty Constructor for class ObCallbatch
	 */
	public ObCallbatch () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ObCallbatch
	 */
	public ObCallbatch (
		 Long in_callbatchId
        ) {
		this.setCallbatchId(in_callbatchId);
    }

	
	public com.ulane.callout.model.outb.ObCalllist getObCalllist () {
		return obCalllist;
	}	
	
	public void setObCalllist (com.ulane.callout.model.outb.ObCalllist in_obCalllist) {
		this.obCalllist = in_obCalllist;
	}

	public java.util.Set getObCallbatchAsss () {
		return obCallbatchAsss;
	}	
	
	public void setObCallbatchAsss (java.util.Set in_obCallbatchAsss) {
		this.obCallbatchAsss = in_obCallbatchAsss;
	}

	public java.util.Set getObCallbatchCuss () {
		return obCallbatchCuss;
	}	
	
	public void setObCallbatchCuss (java.util.Set in_obCallbatchCuss) {
		this.obCallbatchCuss = in_obCallbatchCuss;
	}

	public java.util.Set getObCallbatchHiss () {
		return obCallbatchHiss;
	}	
	
	public void setObCallbatchHiss (java.util.Set in_obCallbatchHiss) {
		this.obCallbatchHiss = in_obCallbatchHiss;
	}

	public java.util.Set getObCallbatchImpTmps () {
		return obCallbatchImpTmps;
	}	
	
	public void setObCallbatchImpTmps (java.util.Set in_obCallbatchImpTmps) {
		this.obCallbatchImpTmps = in_obCallbatchImpTmps;
	}

	public java.util.Set getObConCalllists () {
		return obConCalllists;
	}	
	
	public void setObConCalllists (java.util.Set in_obConCalllists) {
		this.obConCalllists = in_obConCalllists;
	}

	public java.util.Set getObSaletasks () {
		return obSaletasks;
	}	
	
	public void setObSaletasks (java.util.Set in_obSaletasks) {
		this.obSaletasks = in_obSaletasks;
	}
    

	/**
	 * 名单批次内码	 * @return Long
     * @hibernate.id column="CALLBATCH_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getCallbatchId() {
		return this.callbatchId;
	}
	
	/**
	 * Set the callbatchId
	 */	
	public void setCallbatchId(Long aValue) {
		this.callbatchId = aValue;
	}	

	/**
	 * 名单列表内码	 * @return Long
	 */
	public Long getCalllistId() {
		return this.getObCalllist()==null?null:this.getObCalllist().getCalllistId();
	}
	
	/**
	 * Set the calllistId
	 */	
	public void setCalllistId(Long aValue) {
	    if (aValue==null) {
	    	obCalllist = null;
	    } else if (obCalllist == null) {
	        obCalllist = new com.ulane.callout.model.outb.ObCalllist(aValue);
	        obCalllist.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obCalllist.setCalllistId(aValue);
	    }
	}	

	/**
	 * 批次名称	 * @return String
	 * @hibernate.property column="CALLBATCH_NAM" type="java.lang.String" length="512" not-null="true" unique="false"
	 */
	public String getCallbatchNam() {
		return this.callbatchNam;
	}
	
	/**
	 * Set the callbatchNam
	 * @spring.validator type="required"
	 */	
	public void setCallbatchNam(String aValue) {
		this.callbatchNam = aValue;
	}	

	/**
	 * 批次描述	 * @return String
	 * @hibernate.property column="CALLBATCH_DES" type="java.lang.String" length="4000" not-null="false" unique="false"
	 */
	public String getCallbatchDes() {
		return this.callbatchDes;
	}
	
	/**
	 * Set the callbatchDes
	 */	
	public void setCallbatchDes(String aValue) {
		this.callbatchDes = aValue;
	}	

	/**
	 * 批次类型：号码段、客户名单&CONOB_CALLBATCH_PCLX	 * @return Short
	 * @hibernate.property column="CALLBATCH_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getCallbatchTypId() {
		return this.callbatchTypId;
	}
	
	/**
	 * Set the callbatchTypId
	 * @spring.validator type="required"
	 */	
	public void setCallbatchTypId(Short aValue) {
		this.callbatchTypId = aValue;
	}	

	/**
	 * 批次来源：本地文件、名单抽取、客户资料&CONOB_CALLBATCH_PCLY	 * @return Short
	 * @hibernate.property column="CALLBATCH_SRC_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getCallbatchSrcId() {
		return this.callbatchSrcId;
	}
	
	/**
	 * Set the callbatchSrcId
	 * @spring.validator type="required"
	 */	
	public void setCallbatchSrcId(Short aValue) {
		this.callbatchSrcId = aValue;
	}	

	/**
	 * 所属地区,手工输入	 * @return String
	 * @hibernate.property column="CALLBATCH_REGION" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getCallbatchRegion() {
		return this.callbatchRegion;
	}
	
	/**
	 * Set the callbatchRegion
	 */	
	public void setCallbatchRegion(String aValue) {
		this.callbatchRegion = aValue;
	}	

	/**
	 * 号码段开始，批次类型为号码段时必填	 * @return String
	 * @hibernate.property column="NUMBER_STA" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getNumberSta() {
		return this.numberSta;
	}
	
	/**
	 * Set the numberSta
	 */	
	public void setNumberSta(String aValue) {
		this.numberSta = aValue;
	}	

	/**
	 * 号码段结束，批次类型为号码段时必填	 * @return String
	 * @hibernate.property column="NUMBER_END" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getNumberEnd() {
		return this.numberEnd;
	}
	
	/**
	 * Set the numberEnd
	 */	
	public void setNumberEnd(String aValue) {
		this.numberEnd = aValue;
	}	

	/**
	 * 开始时间	 * @return java.util.Date
	 * @hibernate.property column="STA_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getStaDat() {
		return this.staDat;
	}
	
	/**
	 * Set the staDat
	 */	
	public void setStaDat(java.util.Date aValue) {
		this.staDat = aValue;
	}	

	/**
	 * 结束时间	 * @return java.util.Date
	 * @hibernate.property column="END_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getEndDat() {
		return this.endDat;
	}
	
	/**
	 * Set the endDat
	 */	
	public void setEndDat(java.util.Date aValue) {
		this.endDat = aValue;
	}	

	/**
	 * 导入时长(秒)	 * @return Integer
	 * @hibernate.property column="IMP_DUR" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getImpDur() {
		return this.impDur;
	}
	
	/**
	 * Set the impDur
	 */	
	public void setImpDur(Integer aValue) {
		this.impDur = aValue;
	}	

	/**
	 * 总数	 * @return Integer
	 * @hibernate.property column="TOTAL_COUNT" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getTotalCount() {
		return this.totalCount;
	}
	
	/**
	 * Set the totalCount
	 */	
	public void setTotalCount(Integer aValue) {
		this.totalCount = aValue;
	}	

	/**
	 * 有效数量	 * @return Integer
	 * @hibernate.property column="AVLID_COUNT" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getAvlidCount() {
		return this.avlidCount;
	}
	
	/**
	 * Set the avlidCount
	 * @spring.validator type="required"
	 */	
	public void setAvlidCount(Integer aValue) {
		this.avlidCount = aValue;
	}	

	/**
	 * 无效名单数	 * @return Integer
	 * @hibernate.property column="INAVLID_COUNT" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getInavlidCount() {
		return this.inavlidCount;
	}
	
	/**
	 * Set the inavlidCount
	 * @spring.validator type="required"
	 */	
	public void setInavlidCount(Integer aValue) {
		this.inavlidCount = aValue;
	}	

	/**
	 * 剩余数量，数据管理员可分配的数量。默认等于导入有效数量。	 * @return Integer
	 * @hibernate.property column="HOLD_COUNT" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getHoldCount() {
		return this.holdCount;
	}
	
	/**
	 * Set the holdCount
	 * @spring.validator type="required"
	 */	
	public void setHoldCount(Integer aValue) {
		this.holdCount = aValue;
	}	

	public AppUser getUseId() {
		return useId;
	}

	public void setUseId(AppUser useId) {
		this.useId = useId;
	}

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7" not-null="false" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}
	
	/**
	 * Set the creDat
	 */	
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}	

	/**
	 * 状态：未分配完毕、已分配完毕、已关闭&CONOB_CALLBATCH_ZT	 * @return Short
	 * @hibernate.property column="CALLBATCH_STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getCallbatchStaId() {
		return this.callbatchStaId;
	}
	
	/**
	 * Set the callbatchStaId
	 * @spring.validator type="required"
	 */	
	public void setCallbatchStaId(Short aValue) {
		this.callbatchStaId = aValue;
	}	

	public Short getClearnTyp() {
		return clearnTyp;
	}

	public void setClearnTyp(Short clearnTyp) {
		this.clearnTyp = clearnTyp;
	}

	public java.util.Date getClearnDat() {
		return clearnDat;
	}

	public void setClearnDat(java.util.Date clearnDat) {
		this.clearnDat = clearnDat;
	}

	public Long getClearnOpt() {
		return clearnOpt;
	}

	public void setClearnOpt(Long clearnOpt) {
		this.clearnOpt = clearnOpt;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObCallbatch)) {
			return false;
		}
		ObCallbatch rhs = (ObCallbatch) object;
		return new EqualsBuilder()
				.append(this.callbatchId, rhs.callbatchId)
						.append(this.callbatchNam, rhs.callbatchNam)
				.append(this.callbatchDes, rhs.callbatchDes)
				.append(this.callbatchTypId, rhs.callbatchTypId)
				.append(this.callbatchSrcId, rhs.callbatchSrcId)
				.append(this.callbatchRegion, rhs.callbatchRegion)
				.append(this.numberSta, rhs.numberSta)
				.append(this.numberEnd, rhs.numberEnd)
				.append(this.staDat, rhs.staDat)
				.append(this.endDat, rhs.endDat)
				.append(this.impDur, rhs.impDur)
				.append(this.totalCount, rhs.totalCount)
				.append(this.avlidCount, rhs.avlidCount)
				.append(this.inavlidCount, rhs.inavlidCount)
				.append(this.holdCount, rhs.holdCount)
				.append(this.useId, rhs.useId)
				.append(this.creDat, rhs.creDat)
				.append(this.callbatchStaId, rhs.callbatchStaId)
				.append(this.clearnCounts, rhs.clearnCounts)
				.append(this.clearnDat, rhs.clearnDat)
				.append(this.clearnOpt, rhs.clearnOpt)
				.append(this.clearnTyp, rhs.clearnTyp)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.callbatchId) 
						.append(this.callbatchNam) 
				.append(this.callbatchDes) 
				.append(this.callbatchTypId) 
				.append(this.callbatchSrcId) 
				.append(this.callbatchRegion) 
				.append(this.numberSta) 
				.append(this.numberEnd) 
				.append(this.staDat) 
				.append(this.endDat) 
				.append(this.impDur) 
				.append(this.totalCount) 
				.append(this.avlidCount) 
				.append(this.inavlidCount) 
				.append(this.holdCount) 
				.append(this.useId) 
				.append(this.creDat) 
				.append(this.callbatchStaId)
				.append(this.clearnCounts)
				.append(this.clearnDat)
				.append(this.clearnOpt)
				.append(this.clearnTyp)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("callbatchId", this.callbatchId) 
						.append("callbatchNam", this.callbatchNam) 
				.append("callbatchDes", this.callbatchDes) 
				.append("callbatchTypId", this.callbatchTypId) 
				.append("callbatchSrcId", this.callbatchSrcId) 
				.append("callbatchRegion", this.callbatchRegion) 
				.append("numberSta", this.numberSta) 
				.append("numberEnd", this.numberEnd) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("impDur", this.impDur) 
				.append("totalCount", this.totalCount) 
				.append("avlidCount", this.avlidCount) 
				.append("inavlidCount", this.inavlidCount) 
				.append("holdCount", this.holdCount) 
				.append("useId", this.useId) 
				.append("creDat", this.creDat) 
				.append("callbatchStaId", this.callbatchStaId)
				.append("clearnCounts",this.clearnCounts)
				.append("clearnDat",this.clearnDat)
				.append("clearnOpt",this.clearnOpt)
				.append("clearnTyp",this.clearnTyp)
				.toString();
	}

	public String getComNam() {
		return comNam;
	}

	public void setComNam(String comNam) {
		this.comNam = comNam;
	}



}
