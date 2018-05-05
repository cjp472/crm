package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.customer.Product;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.running.model.comtech.CtScrTemplate;
import com.ulane.running.model.pap.PapRelease;
import com.ulane.supply.model.goods.ScGoods;

/**
 * ObCom Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObCom extends com.htsoft.core.model.BaseModel {

    protected Long comId;
	protected String obComNam;
	protected String comCod;
	protected String obComDes;
	protected Long ownerTeam;
	protected Long perIncharge;
	protected String ownerTeamNam;
	protected String perInchargeNam;
	protected java.util.Date staDat;
	protected java.util.Date endDat;
	protected Long busiTypId;
	protected String projectNam;
	protected String yeWuLeiXing;
	protected Long execTypId; 
	protected Long obComStaId;
	protected Long papReleasesstaId;//问卷状态
	protected Integer assCount; 


	protected com.ulane.callout.model.outb.ObProject obProject;
//	protected com.ulane.callout.model.outb.ObComBizTypeTree obComBizTypeTree; //业务类型
	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchAsss = new java.util.HashSet(); //名单批次_分配历史
	@SuppressWarnings("unchecked")
    protected java.util.Set obCallbatchHiss = new java.util.HashSet();  //名单批次
    protected java.util.Set<ObCalllist> obCalllists = new java.util.HashSet<ObCalllist>(); //名单
    protected java.util.Set<Product> products = new java.util.HashSet<Product>(); //产品
    protected  java.util.Set<ObComProduct> obComProduct = new java.util.HashSet<ObComProduct>(); //产品
	protected java.util.Set<PapRelease> papReleases = new java.util.HashSet<PapRelease>();//问卷
	protected java.util.Set<ObComPap> obComPap = new java.util.HashSet<ObComPap>();//问卷
	@SuppressWarnings("unchecked")
    protected java.util.Set<ObComSalerul> obComSalerul = new java.util.HashSet<ObComSalerul>();//规则
	protected java.util.Set<CtScrTemplate> ctScrTemplates = new java.util.HashSet<CtScrTemplate>();//话术模版
    protected java.util.Set<ObComScr> obComScr = new java.util.HashSet<ObComScr>();//话术模版
    protected java.util.Set<UlUsergroup> ulUsergroups = new java.util.HashSet<UlUsergroup>(); //用户组
	@SuppressWarnings("unchecked")
    protected java.util.Set obSaletasks = new java.util.HashSet();//坐席
	
	public static final Short STATUS_DISABLED   = 1;			//未启用
	public static final Short STATUS_ENABLED    = 2;			//执行中
	public static final Short STATUS_PAUSE      = 3;			//停止
	public static final Short STATUS_RECOVER   = 2;				//执行中
	public static final Short STATUS_CLOSE      = 5;			//关闭
	public static final Short STATUS_ZHUXIAO     = 6;			//注销
	
	public static final Long STATUS_PAUSE_LONG = 3L;
	public static final Long STATUS_CLOSE_LONG = 5L;
	
	public static final String G_FLAG_ENABLE_LIMIT 	= "1";//对应活动启动（限制：分配方式为手动分配）
	public static final String G_FLAG_ALL				= "2";//对应项目的全部（无其他限制）
	public static final String G_FLAG_ENABLE			= "3";//对应活动启动（无限制）
	/**  
	 * Default Empty Constructor for class ObCom
	 */
	public ObCom () {
		super();
	}
	public Long getPapReleasesstaId() {
		return papReleasesstaId;
	}

	public void setPapReleasesstaId(Long papReleasesstaId) {
		this.papReleasesstaId = papReleasesstaId;
	}
	
	public Long getBusiTypId() {
		return busiTypId;
	}

	public void setBusiTypId(Long busiTypId) {
		this.busiTypId = busiTypId;
	}
	/**
	 * Default Key Fields Constructor for class ObCom
	 */
	public ObCom (
		 Long in_comId
        ) {
		this.setComId(in_comId);
    }

	
	public String getProjectNam() {
		return projectNam;
	}

	public java.util.Set<ObComScr> getObComScr() {
		return obComScr;
	}

	public void setObComScr(java.util.Set<ObComScr> obComScr) {
		this.obComScr = obComScr;
	}
	public java.util.Set<ObComPap> getObComPap() {
		return obComPap;
	}

	public void setObComPap(java.util.Set<ObComPap> obComPap) {
		this.obComPap = obComPap;
	}

	public void setProjectNam(String projectNam) {
		this.projectNam = projectNam;
	}

	public String getYeWuLeiXing() {
		return yeWuLeiXing;
	}

	public void setYeWuLeiXing(String yeWuLeiXing) {
		this.yeWuLeiXing = yeWuLeiXing;
	}

	public String getPerInchargeNam() {
		return perInchargeNam;
	}

    public java.util.Set<ObComSalerul> getObComSalerul() {
		return obComSalerul;
	}

	public void setObComSalerul(java.util.Set<ObComSalerul> obComSalerul) {
		this.obComSalerul = obComSalerul;
	}

	public void setPerInchargeNam(String perInchargeNam) {
		this.perInchargeNam = perInchargeNam;
	}
	public java.util.Set<Product> getProducts() {
		return products;
	}

	public void setProducts(java.util.Set<Product> products) {
		this.products = products;
	}
	
	public com.ulane.callout.model.outb.ObProject getObProject () {
		return obProject;
	}	
	
	public void setObProject (com.ulane.callout.model.outb.ObProject in_obProject) {
		this.obProject = in_obProject;
	}

//	public com.ulane.callout.model.outb.ObComBizTypeTree getObComBizTypeTree() {
//		return obComBizTypeTree;
//	}
//
//	public void setObComBizTypeTree(
//			com.ulane.callout.model.outb.ObComBizTypeTree obComBizTypeTree) {
//		this.obComBizTypeTree = obComBizTypeTree;
//	}
	
	@SuppressWarnings("unchecked")
    public java.util.Set getObCallbatchAsss () {
		return obCallbatchAsss;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObCallbatchAsss (java.util.Set in_obCallbatchAsss) {
		this.obCallbatchAsss = in_obCallbatchAsss;
	}

	@SuppressWarnings("unchecked")
    public java.util.Set getObCallbatchHiss () {
		return obCallbatchHiss;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObCallbatchHiss (java.util.Set in_obCallbatchHiss) {
		this.obCallbatchHiss = in_obCallbatchHiss;
	}

    public java.util.Set<ObCalllist> getObCalllists () {
		return obCalllists;
	}	
	
    public void setObCalllists (java.util.Set<ObCalllist> in_obCalllists) {
		this.obCalllists = in_obCalllists;
	}

	public String getOwnerTeamNam() {
		return ownerTeamNam;
	}

	public void setOwnerTeamNam(String ownerTeamNam) {
		this.ownerTeamNam = ownerTeamNam;
	}

	public java.util.Set<ObComProduct> getObComProduct() {
		return obComProduct;
	}

	public void setObComProduct(java.util.Set<ObComProduct> obComProduct) {
		this.obComProduct = obComProduct;
	}


    public java.util.Set<PapRelease> getPapReleases () {
        return papReleases;
    }   
    
    public void setPapReleases (java.util.Set<PapRelease> in_papReleases) {
        this.papReleases = in_papReleases;
    }

//	@SuppressWarnings("unchecked")
//    public java.util.Set getObComProducts () {
//		return obComProducts;
//	}	
//	
//	@SuppressWarnings("unchecked")
//    public void setObComProducts (java.util.Set in_obComProducts) {
//		this.obComProducts = in_obComProducts;
//	}



    public java.util.Set<CtScrTemplate> getCtScrTemplates () {
		return ctScrTemplates;
	}	
	
    public void setCtScrTemplates (java.util.Set<CtScrTemplate> in_ctScrTemplates) {
		this.ctScrTemplates = in_ctScrTemplates;
	}

    public java.util.Set<UlUsergroup> getUlUsergroups () {
		return ulUsergroups;
	}	
	
    public void setUlUsergroups (java.util.Set<UlUsergroup> in_ulUsergroups) {
		this.ulUsergroups = in_ulUsergroups;
	}

	@SuppressWarnings("unchecked")
    public java.util.Set getObSaletasks () {
		return obSaletasks;
	}	
	
	@SuppressWarnings("unchecked")
    public void setObSaletasks (java.util.Set in_obSaletasks) {
		this.obSaletasks = in_obSaletasks;
	}
    

	/**
	 * 活动内码	 * @return Long
     * @hibernate.id column="COM_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getComId() {
		return this.comId;
	}
	
	/**
	 * Set the comId
	 */	
	public void setComId(Long aValue) {
		this.comId = aValue;
	}	
	
//	/**
//	 * 业务类型：自定义&CONOB_COM_YWLX	 * @return Short
//	 * @hibernate.property column="BUSI_TYP_ID" type="java.lang.Short" length="5" not-null="false" unique="false"
//	 */
//	public Long getBusiTypId() {
//		return this.getObComBizTypeTree()==null?null:this.getObComBizTypeTree().getNodeId();
//	}
//	
//	/**
//	 * Set the busiTypId
//	 */	
//	public void setBusiTypId(Long aValue) {
//	    if (aValue==null) {
//	    	obComBizTypeTree = null;
//	    } else if (obComBizTypeTree == null) {
//	    	obComBizTypeTree = new com.ulane.callout.model.outb.ObComBizTypeTree(aValue);
//	    	obComBizTypeTree.setVersion(new Integer(0));//set a version to cheat hibernate only
//	    } else {
//	    	//
//	    	obComBizTypeTree.setNodeId(aValue);
//			
//	    }
//	}	

	
	/**
	 * 项目内码	 * @return Long
	 */
	public Long getProjId() {
		return this.getObProject()==null?null:this.getObProject().getProjId();
	}

	
	/**
	 * Set the projId
	 */	
	public void setProjId(Long aValue) {
	    if (aValue==null) {
	    	obProject = null;
	    } else if (obProject == null) {
	        obProject = new com.ulane.callout.model.outb.ObProject(aValue);
	        obProject.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			obProject.setProjId(aValue);
	    }
	}	

	/**
	 * 活动主题	 * @return String
	 * @hibernate.property column="OB_COM_NAM" type="java.lang.String" length="1024" not-null="true" unique="false"
	 */
	public String getObComNam() {
		return this.obComNam;
	}
	
	/**
	 * Set the obComNam
	 * @spring.validator type="required"
	 */	
	public void setObComNam(String aValue) {
		this.obComNam = aValue;
	}	

	/**
	 * 活动编码	 * @return String
	 * @hibernate.property column="COM_COD" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getComCod() {
		return this.comCod;
	}
	
	/**
	 * Set the comCod
	 */	
	public void setComCod(String aValue) {
		this.comCod = aValue;
	}	

	/**
	 * 活动描述	 * @return String
	 * @hibernate.property column="OB_COM_DES" type="java.lang.String" length="4000" not-null="false" unique="false"
	 */
	public String getObComDes() {
		return this.obComDes;
	}
	
	/**
	 * Set the obComDes
	 */	
	public void setObComDes(String aValue) {
		this.obComDes = aValue;
	}	

	/**
	 * 所属机构	 * @return Long
	 * @hibernate.property column="OWNER_TEAM" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getOwnerTeam() {
		return this.ownerTeam;
	}
	
	/**
	 * Set the ownerTeam
	 */	
	public void setOwnerTeam(Long aValue) {
		this.ownerTeam = aValue;
	}	

	/**
	 * 负责人	 * @return Long
	 * @hibernate.property column="PER_INCHARGE" type="java.lang.Long" length="18" not-null="false" unique="false"
	 */
	public Long getPerIncharge() {
		return this.perIncharge;
	}
	
	/**
	 * Set the perIncharge
	 */	
	public void setPerIncharge(Long aValue) {
		this.perIncharge = aValue;
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
	 * 执行渠道方式：同<渠道类型>&CONOB_COM_ZXQDFS	 * @return Short
	 * @hibernate.property column="EXEC_TYP_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Long getExecTypId() {
		return this.execTypId;
	}
	
	/**
	 * Set the execTypId
	 * @spring.validator type="required"
	 */	
	public void setExecTypId(Long aValue) {
		this.execTypId = aValue;
	}	

	/**
	 * 活动状态&CONOB_COM_HDZT	 * @return Short
	 * @hibernate.property column="OB_COM_STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Long getObComStaId() {
		return this.obComStaId;
	}
	
	/**
	 * Set the obComStaId
	 * @spring.validator type="required"
	 */	
	public void setObComStaId(Long aValue) {
		this.obComStaId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ObCom)) {
			return false;
		}
		ObCom rhs = (ObCom) object;
		return new EqualsBuilder()
				.append(this.comId, rhs.comId)
						.append(this.obComNam, rhs.obComNam)
				.append(this.comCod, rhs.comCod)
				.append(this.obComDes, rhs.obComDes)
				.append(this.ownerTeam, rhs.ownerTeam)
				.append(this.perIncharge, rhs.perIncharge)
				.append(this.staDat, rhs.staDat)
				.append(this.endDat, rhs.endDat)
				.append(this.busiTypId, rhs.busiTypId)
				.append(this.execTypId, rhs.execTypId)
				.append(this.obComStaId, rhs.obComStaId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.comId) 
						.append(this.obComNam) 
				.append(this.comCod) 
				.append(this.obComDes) 
				.append(this.ownerTeam) 
				.append(this.perIncharge) 
				.append(this.staDat) 
				.append(this.endDat) 
				.append(this.busiTypId) 
				.append(this.execTypId) 
				.append(this.obComStaId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("comId", this.comId) 
						.append("obComNam", this.obComNam) 
				.append("comCod", this.comCod) 
				.append("obComDes", this.obComDes) 
				.append("ownerTeam", this.ownerTeam) 
				.append("perIncharge", this.perIncharge) 
				.append("staDat", this.staDat) 
				.append("endDat", this.endDat) 
				.append("busiTypId", this.busiTypId) 
				.append("execTypId", this.execTypId) 
				.append("obComStaId", this.obComStaId) 
				.toString();
	}
	public Integer getAssCount() {
		return assCount;
	}
	public void setAssCount(Integer assCount) {
		this.assCount = assCount;
	}



}
