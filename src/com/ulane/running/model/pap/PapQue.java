package com.ulane.running.model.pap;
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
 * PapQue Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class PapQue extends com.htsoft.core.model.BaseModel {

    protected Long queId;
	protected String queTopic;
	protected String queContent;
	protected Short queTypeId;
	protected Short displayTypeId;
	protected Short displayStyleId;
	protected Short layloutTypeId;
	protected String initVal;
	protected Short isNeed;
	protected Short optSrcTypeId;
	protected String optSrcObj;
	protected String remark;
	protected Long creUseId;
	protected java.util.Date creDat;
	protected Long updUseId;
	protected java.util.Date updDat;
	protected Short staId;

	protected java.util.Set<PapCat> papCats = new java.util.HashSet<PapCat>();
	protected java.util.Set papQueOpts = new java.util.HashSet();
	protected java.util.Set papTemGotoRules = new java.util.HashSet();
	protected java.util.Set papTemQues = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class PapQue
	 */
	public PapQue () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class PapQue
	 */
	public PapQue (
		 Long in_queId
        ) {
		this.setQueId(in_queId);
    }


	public java.util.Set<PapCat> getPapCats () {
		return papCats;
	}	
	
	public void setPapCats (java.util.Set<PapCat> in_papCatQues) {
		this.papCats = in_papCatQues;
	}

	public java.util.Set getPapQueOpts () {
		return papQueOpts;
	}	
	
	public void setPapQueOpts (java.util.Set in_papQueOpts) {
		this.papQueOpts = in_papQueOpts;
	}

	public java.util.Set getPapTemGotoRules () {
		return papTemGotoRules;
	}	
	
	public void setPapTemGotoRules (java.util.Set in_papTemGotoRules) {
		this.papTemGotoRules = in_papTemGotoRules;
	}

	public java.util.Set getPapTemQues () {
		return papTemQues;
	}	
	
	public void setPapTemQues (java.util.Set in_papTemQues) {
		this.papTemQues = in_papTemQues;
	}
    

	/**
	 * 题目内码	 * @return Long
     * @hibernate.id column="QUE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getQueId() {
		return this.queId;
	}
	
	/**
	 * Set the queId
	 */	
	public void setQueId(Long aValue) {
		this.queId = aValue;
	}	

	/**
	 * 标题	 * @return String
	 * @hibernate.property column="QUE_TOPIC" type="java.lang.String" length="512" not-null="true" unique="false"
	 */
	public String getQueTopic() {
		return this.queTopic;
	}
	
	/**
	 * Set the queTopic
	 * @spring.validator type="required"
	 */	
	public void setQueTopic(String aValue) {
		this.queTopic = aValue;
	}	

	/**
	 * 说明	 * @return String
	 * @hibernate.property column="QUE_CONTENT" type="java.lang.String" length="2048" not-null="false" unique="false"
	 */
	public String getQueContent() {
		return this.queContent;
	}
	
	/**
	 * Set the queContent
	 */	
	public void setQueContent(String aValue) {
		this.queContent = aValue;
	}	

	/**
	 * 题目类型：单选题、多选题、是非题、问答题&PAP_TMLX	 * @return Short
	 * @hibernate.property column="QUE_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getQueTypeId() {
		return this.queTypeId;
	}
	
	/**
	 * Set the queTypeId
	 * @spring.validator type="required"
	 */	
	public void setQueTypeId(Short aValue) {
		this.queTypeId = aValue;
	}	

	/**
	 * 展现方式：下拉选择、展开选择&PAP_ZXFS	 * @return Short
	 * @hibernate.property column="DISPLAY_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDisplayTypeId() {
		return this.displayTypeId;
	}
	
	/**
	 * Set the displayTypeId
	 * @spring.validator type="required"
	 */	
	public void setDisplayTypeId(Short aValue) {
		this.displayTypeId = aValue;
	}	

	/**
	 * 显示尺寸：长中短，对应配置&PAP_XXCC	 * @return Short
	 * @hibernate.property column="DISPLAY_STYLE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDisplayStyleId() {
		return this.displayStyleId;
	}
	
	/**
	 * Set the displayStyleId
	 * @spring.validator type="required"
	 */	
	public void setDisplayStyleId(Short aValue) {
		this.displayStyleId = aValue;
	}	

	/**
	 * 布局：横排、竖排&PAP_BJ	 * @return Short
	 * @hibernate.property column="LAYLOUT_TYPE_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getLayloutTypeId() {
		return this.layloutTypeId;
	}
	
	/**
	 * Set the layloutTypeId
	 * @spring.validator type="required"
	 */	
	public void setLayloutTypeId(Short aValue) {
		this.layloutTypeId = aValue;
	}	

	/**
	 * 初始值：初始显示的内容	 * @return String
	 * @hibernate.property column="INIT_VAL" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getInitVal() {
		return this.initVal;
	}
	
	/**
	 * Set the initVal
	 */	
	public void setInitVal(String aValue) {
		this.initVal = aValue;
	}	

	/**
	 * 是否必填&YorN	 * @return Short
	 * @hibernate.property column="IS_NEED" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getIsNeed() {
		return this.isNeed;
	}
	
	/**
	 * Set the isNeed
	 * @spring.validator type="required"
	 */	
	public void setIsNeed(Short aValue) {
		this.isNeed = aValue;
	}	

	/**
	 * 选项来源：手动、系统参数&PAP_XXLY	 * @return Short
	 * @hibernate.property column="OPT_SRC_TYPE_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
	 */
	public Short getOptSrcTypeId() {
		return this.optSrcTypeId;
	}
	
	/**
	 * Set the optSrcTypeId
	 */	
	public void setOptSrcTypeId(Short aValue) {
		this.optSrcTypeId = aValue;
	}	

	/**
	 * 来源对象：文本，对应参数值	 * @return String
	 * @hibernate.property column="OPT_SRC_OBJ" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getOptSrcObj() {
		return this.optSrcObj;
	}
	
	/**
	 * Set the optSrcObj
	 */	
	public void setOptSrcObj(String aValue) {
		this.optSrcObj = aValue;
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
	 * 创建人ID	 * @return Long
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18" not-null="true" unique="false"
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
	 * 修改人ID	 * @return Long
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Long" length="18" not-null="false" unique="false"
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
	 * 状态：有效、注销&PAP_ZT	 * @return Short
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof PapQue)) {
			return false;
		}
		PapQue rhs = (PapQue) object;
		return new EqualsBuilder()
				.append(this.queId, rhs.queId)
				.append(this.queTopic, rhs.queTopic)
				.append(this.queContent, rhs.queContent)
				.append(this.queTypeId, rhs.queTypeId)
				.append(this.displayTypeId, rhs.displayTypeId)
				.append(this.displayStyleId, rhs.displayStyleId)
				.append(this.layloutTypeId, rhs.layloutTypeId)
				.append(this.initVal, rhs.initVal)
				.append(this.isNeed, rhs.isNeed)
				.append(this.optSrcTypeId, rhs.optSrcTypeId)
				.append(this.optSrcObj, rhs.optSrcObj)
				.append(this.remark, rhs.remark)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creDat, rhs.creDat)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updDat, rhs.updDat)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.queId) 
				.append(this.queTopic) 
				.append(this.queContent) 
				.append(this.queTypeId) 
				.append(this.displayTypeId) 
				.append(this.displayStyleId) 
				.append(this.layloutTypeId) 
				.append(this.initVal) 
				.append(this.isNeed) 
				.append(this.optSrcTypeId) 
				.append(this.optSrcObj) 
				.append(this.remark) 
				.append(this.creUseId) 
				.append(this.creDat) 
				.append(this.updUseId) 
				.append(this.updDat) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("queId", this.queId) 
				.append("queTopic", this.queTopic) 
				.append("queContent", this.queContent) 
				.append("queTypeId", this.queTypeId) 
				.append("displayTypeId", this.displayTypeId) 
				.append("displayStyleId", this.displayStyleId) 
				.append("layloutTypeId", this.layloutTypeId) 
				.append("initVal", this.initVal) 
				.append("isNeed", this.isNeed) 
				.append("optSrcTypeId", this.optSrcTypeId) 
				.append("optSrcObj", this.optSrcObj) 
				.append("remark", this.remark) 
				.append("creUseId", this.creUseId) 
				.append("creDat", this.creDat) 
				.append("updUseId", this.updUseId) 
				.append("updDat", this.updDat) 
				.append("staId", this.staId) 
				.toString();
	}



}
