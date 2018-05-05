package com.ulane.supply.model.goods;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.htsoft.oa.model.system.FileAttach;
import com.ulane.callout.model.outb.ObComProduct;

/**
 * ScGoods Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class ScGoods extends com.htsoft.core.model.BaseModel {

	protected Long goodsId;
	protected Long productClassifyId;
	protected String goodsName;
	protected Short isLocked;
	protected String path;
	protected Long goodsCount;
	protected Short productModelFlag;
	protected Long createUserId;
	protected java.util.Date createTime;
	protected Long updateUserId;
	protected java.util.Date updateTime;
	protected String goodsDesc;
	protected Long status;
	protected String goodsModel;
	protected String numbers;
	protected Short goodsType;
	protected int amount = 1;

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
	protected java.math.BigDecimal ext11;
	protected java.math.BigDecimal ext12;
	protected java.math.BigDecimal ext13;
	protected java.math.BigDecimal ext14;
	protected java.math.BigDecimal ext15;
	protected java.util.Date ext16;
	protected java.util.Date ext17;
	protected java.util.Date ext18;
	protected java.util.Date ext19;
	protected java.util.Date ext20;

	protected String style;

	protected Short salesWay;
	protected Short distribution;
	protected Short integral;
	protected Short integralType;
	protected String introduction;
	protected String useMeans;
	protected String goodsNote;
	protected String afterSales;
	protected String characteristics;
	protected java.math.BigDecimal retailPrice;// 零售见
    protected String goodtype;                 //商品类型
	protected java.math.BigDecimal reportPrice;//  市场价
	@NotFound(action=NotFoundAction.IGNORE)
	protected com.ulane.supply.model.goods.ScGoodsPrice scGoodsPrice;// 价格
	protected com.ulane.supply.model.goods.ScProductClassify scProductClassify;// 分类
	protected com.ulane.supply.model.goods.ScPurchasePrice scPurchasePrice;// 采购价目
	protected Long comSta;//标识商品在活动中是否可以进行销售
	protected Set<FileAttach> fileAttachs = new HashSet<FileAttach>();
	
	public String productClassifyName;
	// protected java.util.Set scBizSalesDetails = new java.util.HashSet();
	// protected java.util.Set scBoPurchaseDetails = new java.util.HashSet();
	// protected java.util.Set scBoStockDetails = new java.util.HashSet();
	// protected com.ulane.supply.model.goods.ScComboProduct scComboProduct;
	// protected java.util.Set scGoodsPriceGoodss = new java.util.HashSet();
	// protected java.util.Set scGoodsPriceHiss = new java.util.HashSet();
	// protected java.util.Set scGoodsPriceRuleGoodss = new java.util.HashSet();
	// protected java.util.Set scGoodsStocks = new java.util.HashSet();
	// protected com.ulane.supply.model.goods.ScProduct scProduct;
	// protected java.util.Set scProductInsts = new java.util.HashSet();
	// protected java.util.Set scPurchasePriceGoodss = new java.util.HashSet();
	// protected java.util.Set scPurchaseProducts = new java.util.HashSet();
	// protected java.util.Set scThresholdLevels = new java.util.HashSet();
	// 外拨活动_营销产品
	protected java.util.Set<ObComProduct> obComProduct = new java.util.HashSet<ObComProduct>();
	// 商品分组
	protected java.util.Set<ScProductCom> scProductComs = new java.util.HashSet<ScProductCom>();

	public String getGoodtype() {
		return goodtype;
	}

	public void setGoodtype(String goodtype) {
		this.goodtype = goodtype;
	}
	public java.math.BigDecimal getReportPrice() {
		return reportPrice;
	}

	public void setReportPrice(java.math.BigDecimal reportPrice) {
		this.reportPrice = reportPrice;
	}

	public Long getComSta() {
		return comSta;
	}

	public void setComSta(Long comSta) {
		this.comSta = comSta;
	}
	public java.math.BigDecimal getRetailPrice() {
		return retailPrice;
	}

	public void setRetailPrice(java.math.BigDecimal retailPrice) {
		this.retailPrice = retailPrice;
	}

	public java.util.Set<ScProductCom> getScProductComs() {
		return scProductComs;
	}

	public void setScProductComs(java.util.Set<ScProductCom> scProductComs) {
		this.scProductComs = scProductComs;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public Set<FileAttach> getFileAttachs() {
		return fileAttachs;
	}

	public void setFileAttachs(Set<FileAttach> fileAttachs) {
		this.fileAttachs = fileAttachs;
	}

	public java.util.Set<ObComProduct> getObComProduct() {
		return obComProduct;
	}

	public void setObComProduct(java.util.Set<ObComProduct> obComProduct) {
		this.obComProduct = obComProduct;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	/**
	 * Default Empty Constructor for class ScGoods
	 */
	public ScGoods() {
		super();
	}

	public Short getSalesWay() {
		return salesWay;
	}

	public void setSalesWay(Short salesWay) {
		this.salesWay = salesWay;
	}

	public Short getDistribution() {
		return distribution;
	}

	public void setDistribution(Short distribution) {
		this.distribution = distribution;
	}

	public Short getIntegral() {
		return integral;
	}

	public void setIntegral(Short integral) {
		this.integral = integral;
	}

	public Short getIntegralType() {
		return integralType;
	}

	public void setIntegralType(Short integralType) {
		this.integralType = integralType;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public String getUseMeans() {
		return useMeans;
	}

	public void setUseMeans(String useMeans) {
		this.useMeans = useMeans;
	}

	public String getGoodsNote() {
		return goodsNote;
	}

	public void setGoodsNote(String goodsNote) {
		this.goodsNote = goodsNote;
	}

	public String getAfterSales() {
		return afterSales;
	}

	public void setAfterSales(String afterSales) {
		this.afterSales = afterSales;
	}

	public String getCharacteristics() {
		return characteristics;
	}

	public void setCharacteristics(String characteristics) {
		this.characteristics = characteristics;
	}

	public Short getGoodsType() {
		return goodsType;
	}

	public void setGoodsType(Short goodsType) {
		this.goodsType = goodsType;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public String getGoodsDesc() {
		return goodsDesc;
	}

	public void setGoodsDesc(String goodsDesc) {
		this.goodsDesc = goodsDesc;
	}

	public String getGoodsModel() {
		return goodsModel;
	}

	public void setGoodsModel(String goodsModel) {
		this.goodsModel = goodsModel;
	}

	public String getNumbers() {
		return numbers;
	}

	public void setNumbers(String numbers) {
		this.numbers = numbers;
	}

	/**
	 * 扩展1 * @return String
	 * 
	 * @hibernate.property column="EXT_1" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展2 * @return String
	 * 
	 * @hibernate.property column="EXT_2" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展3 * @return String
	 * 
	 * @hibernate.property column="EXT_3" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展4 * @return String
	 * 
	 * @hibernate.property column="EXT_4" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展5 * @return String
	 * 
	 * @hibernate.property column="EXT_5" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展6 * @return String
	 * 
	 * @hibernate.property column="EXT_6" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展7 * @return String
	 * 
	 * @hibernate.property column="EXT_7" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展8 * @return String
	 * 
	 * @hibernate.property column="EXT_8" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展9 * @return String
	 * 
	 * @hibernate.property column="EXT_9" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展10 * @return String
	 * 
	 * @hibernate.property column="EXT_10" type="java.lang.String" length="60"
	 *                     not-null="false" unique="false"
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
	 * 扩展11 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_11" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt11() {
		return this.ext11;
	}

	/**
	 * Set the ext11
	 */
	public void setExt11(java.math.BigDecimal aValue) {
		this.ext11 = aValue;
	}

	/**
	 * 扩展12 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_12" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt12() {
		return this.ext12;
	}

	/**
	 * Set the ext12
	 */
	public void setExt12(java.math.BigDecimal aValue) {
		this.ext12 = aValue;
	}

	/**
	 * 扩展13 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_13" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt13() {
		return this.ext13;
	}

	/**
	 * Set the ext13
	 */
	public void setExt13(java.math.BigDecimal aValue) {
		this.ext13 = aValue;
	}

	/**
	 * 扩展14 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_14" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt14() {
		return this.ext14;
	}

	/**
	 * Set the ext14
	 */
	public void setExt14(java.math.BigDecimal aValue) {
		this.ext14 = aValue;
	}

	/**
	 * 扩展15 * @return java.math.BigDecimal
	 * 
	 * @hibernate.property column="EXT_15" type="java.math.BigDecimal"
	 *                     length="15" not-null="false" unique="false"
	 */
	public java.math.BigDecimal getExt15() {
		return this.ext15;
	}

	/**
	 * Set the ext15
	 */
	public void setExt15(java.math.BigDecimal aValue) {
		this.ext15 = aValue;
	}

	/**
	 * 扩展16 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_16" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt16() {
		return this.ext16;
	}

	/**
	 * Set the ext16
	 */
	public void setExt16(java.util.Date aValue) {
		this.ext16 = aValue;
	}

	/**
	 * 扩展17 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_17" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt17() {
		return this.ext17;
	}

	/**
	 * Set the ext17
	 */
	public void setExt17(java.util.Date aValue) {
		this.ext17 = aValue;
	}

	/**
	 * 扩展18 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_18" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt18() {
		return this.ext18;
	}

	/**
	 * Set the ext18
	 */
	public void setExt18(java.util.Date aValue) {
		this.ext18 = aValue;
	}

	/**
	 * 扩展19 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_19" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt19() {
		return this.ext19;
	}

	/**
	 * Set the ext19
	 */
	public void setExt19(java.util.Date aValue) {
		this.ext19 = aValue;
	}

	/**
	 * 扩展20 * @return java.util.Date
	 * 
	 * @hibernate.property column="EXT_20" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getExt20() {
		return this.ext20;
	}

	/**
	 * Set the ext20
	 */
	public void setExt20(java.util.Date aValue) {
		this.ext20 = aValue;
	}

	/**
	 * Default Key Fields Constructor for class ScGoods
	 */
	public ScGoods(Long in_goodsId) {
		this.setGoodsId(in_goodsId);
	}

	public com.ulane.supply.model.goods.ScGoodsPrice getScGoodsPrice() {
		return scGoodsPrice;
	}

	public void setScGoodsPrice(
			com.ulane.supply.model.goods.ScGoodsPrice in_scGoodsPrice) {
		this.scGoodsPrice = in_scGoodsPrice;
	}

	public com.ulane.supply.model.goods.ScProductClassify getScProductClassify() {
		return scProductClassify;
	}

	public void setScProductClassify(
			com.ulane.supply.model.goods.ScProductClassify in_scProductClassify) {
		this.scProductClassify = in_scProductClassify;
	}

	public com.ulane.supply.model.goods.ScPurchasePrice getScPurchasePrice() {
		return scPurchasePrice;
	}

	public void setScPurchasePrice(
			com.ulane.supply.model.goods.ScPurchasePrice in_scPurchasePrice) {
		this.scPurchasePrice = in_scPurchasePrice;
	}

	// public java.util.Set getScBizSalesDetails () {
	// return scBizSalesDetails;
	// }
	//
	// public void setScBizSalesDetails (java.util.Set in_scBizSalesDetails) {
	// this.scBizSalesDetails = in_scBizSalesDetails;
	// }

	// public java.util.Set getScBoPurchaseDetails () {
	// return scBoPurchaseDetails;
	// }
	//
	// public void setScBoPurchaseDetails (java.util.Set in_scBoPurchaseDetails)
	// {
	// this.scBoPurchaseDetails = in_scBoPurchaseDetails;
	// }
	//
	// public java.util.Set getScBoStockDetails () {
	// return scBoStockDetails;
	// }
	//
	// public void setScBoStockDetails (java.util.Set in_scBoStockDetails) {
	// this.scBoStockDetails = in_scBoStockDetails;
	// }
	//
	// public com.ulane.supply.model.goods.ScComboProduct getScComboProduct () {
	// return scComboProduct;
	// }
	//
	// public void setScComboProduct
	// (com.ulane.supply.model.goods.ScComboProduct in_scComboProduct) {
	// this.scComboProduct = in_scComboProduct;
	// }
	//
	// public java.util.Set getScGoodsPriceGoodss () {
	// return scGoodsPriceGoodss;
	// }
	//
	// public void setScGoodsPriceGoodss (java.util.Set in_scGoodsPriceGoodss) {
	// this.scGoodsPriceGoodss = in_scGoodsPriceGoodss;
	// }
	//
	// public java.util.Set getScGoodsPriceHiss () {
	// return scGoodsPriceHiss;
	// }
	//
	// public void setScGoodsPriceHiss (java.util.Set in_scGoodsPriceHiss) {
	// this.scGoodsPriceHiss = in_scGoodsPriceHiss;
	// }
	//
	// public java.util.Set getScGoodsPriceRuleGoodss () {
	// return scGoodsPriceRuleGoodss;
	// }
	//
	// public void setScGoodsPriceRuleGoodss (java.util.Set
	// in_scGoodsPriceRuleGoodss) {
	// this.scGoodsPriceRuleGoodss = in_scGoodsPriceRuleGoodss;
	// }
	//
	// public java.util.Set getScGoodsStocks () {
	// return scGoodsStocks;
	// }
	//
	// public void setScGoodsStocks (java.util.Set in_scGoodsStocks) {
	// this.scGoodsStocks = in_scGoodsStocks;
	// }
	//
	// public com.ulane.supply.model.goods.ScProduct getScProduct () {
	// return scProduct;
	// }
	//
	// public void setScProduct (com.ulane.supply.model.goods.ScProduct
	// in_scProduct) {
	// this.scProduct = in_scProduct;
	// }
	//
	// public java.util.Set getScProductInsts () {
	// return scProductInsts;
	// }
	//
	// public void setScProductInsts (java.util.Set in_scProductInsts) {
	// this.scProductInsts = in_scProductInsts;
	// }
	//
	// public java.util.Set getScPurchasePriceGoodss () {
	// return scPurchasePriceGoodss;
	// }
	//
	// public void setScPurchasePriceGoodss (java.util.Set
	// in_scPurchasePriceGoodss) {
	// this.scPurchasePriceGoodss = in_scPurchasePriceGoodss;
	// }
	//
	// public java.util.Set getScPurchaseProducts () {
	// return scPurchaseProducts;
	// }
	//
	// public void setScPurchaseProducts (java.util.Set in_scPurchaseProducts) {
	// this.scPurchaseProducts = in_scPurchaseProducts;
	// }
	//
	// public java.util.Set getScThresholdLevels () {
	// return scThresholdLevels;
	// }
	//
	// public void setScThresholdLevels (java.util.Set in_scThresholdLevels) {
	// this.scThresholdLevels = in_scThresholdLevels;
	// }

	/**
	 * 商品内码 * @return Long
	 * 
	 * @hibernate.id column="GOODS_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getGoodsId() {
		return this.goodsId;
	}

	/**
	 * Set the goodsId
	 */
	public void setGoodsId(Long aValue) {
		this.goodsId = aValue;
	}

	/**
	 * 产品分类内码
	 */
	public Long getProductClassifyId() {
		return productClassifyId;
	}

	public void setProductClassifyId(Long productClassifyId) {
		this.productClassifyId = productClassifyId;
	}

	// /**
	// * 产品分类内码 * @return Long
	// */
	// public Long getProductClassifyId() {
	// return
	// this.getScProductClassify()==null?null:this.getScProductClassify().getProductClassifyId();
	// }
	//
	// /**
	// * Set the productClassifyId
	// */
	// public void setProductClassifyId(Long aValue) {
	// if (aValue==null) {
	// scProductClassify = null;
	// } else if (scProductClassify == null) {
	// scProductClassify = new
	// com.ulane.supply.model.goods.ScProductClassify(aValue);
	// scProductClassify.setVersion(new Integer(0));//set a version to cheat
	// hibernate only
	// } else {
	// //
	// scProductClassify.setProductClassifyId(aValue);
	// }
	// }

	/**
	 * 商品名称 * @return String
	 * 
	 * @hibernate.property column="GOODS_NAME" type="java.lang.String"
	 *                     length="60" not-null="false" unique="false"
	 */
	public String getGoodsName() {
		return this.goodsName;
	}

	/**
	 * Set the goodsName
	 */
	public void setGoodsName(String aValue) {
		this.goodsName = aValue;
	}

	/**
	 * 是否锁定：0--未锁定、1--锁定&CON_T_IS_LOCK * @return Short
	 * 
	 * @hibernate.property column="IS_LOCKED" type="java.lang.Short" length="5"
	 *                     not-null="true" unique="false"
	 */
	public Short getIsLocked() {
		return this.isLocked;
	}

	/**
	 * Set the isLocked
	 * 
	 * @spring.validator type="required"
	 */
	public void setIsLocked(Short aValue) {
		this.isLocked = aValue;
	}

	/**
	 * PATH * @return String
	 * 
	 * @hibernate.property column="PATH" type="java.lang.String" length="200"
	 *                     not-null="false" unique="false"
	 */
	public String getPath() {
		return this.path;
	}

	/**
	 * Set the path
	 */
	public void setPath(String aValue) {
		this.path = aValue;
	}

	// /**
	// * 商品价目内码 * @return Long
	// */
	// public Long getGoodsPriceId() {
	// return
	// this.getScGoodsPrice()==null?null:this.getScGoodsPrice().getGoodsPriceId();
	// }
	//
	// /**
	// * Set the goodsPriceId
	// */
	// public void setGoodsPriceId(Long aValue) {
	// if (aValue==null) {
	// scGoodsPrice = null;
	// } else if (scGoodsPrice == null) {
	// scGoodsPrice = new com.ulane.supply.model.goods.ScGoodsPrice(aValue);
	// scGoodsPrice.setVersion(new Integer(0));//set a version to cheat
	// hibernate only
	// } else {
	// //
	// scGoodsPrice.setGoodsPriceId(aValue);
	// }
	// }
	//
	// /**
	// * 商品采购价目内码 * @return Long
	// */
	// public Long getPurPriceId() {
	// return
	// this.getScPurchasePrice()==null?null:this.getScPurchasePrice().getPurPriceId();
	// }
	//
	// /**
	// * Set the purPriceId
	// */
	// public void setPurPriceId(Long aValue) {
	// if (aValue==null) {
	// scPurchasePrice = null;
	// } else if (scPurchasePrice == null) {
	// scPurchasePrice = new
	// com.ulane.supply.model.goods.ScPurchasePrice(aValue);
	// scPurchasePrice.setVersion(new Integer(0));//set a version to cheat
	// hibernate only
	// } else {
	// //
	// scPurchasePrice.setPurPriceId(aValue);
	// }
	// }

	/**
	 * 库存数量 * @return Long
	 * 
	 * @hibernate.property column="GOODS_COUNT" type="java.lang.Long"
	 *                     length="15" not-null="false" unique="false"
	 */
	public Long getGoodsCount() {
		return this.goodsCount;
	}

	/**
	 * Set the goodsCount
	 */
	public void setGoodsCount(Long aValue) {
		this.goodsCount = aValue;
	}

	/**
	 * 0--配件、1--产品&CON_T_PMODEL_FLAG * @return Short
	 * 
	 * @hibernate.property column="PRODUCT_MODEL_FLAG" type="java.lang.Short"
	 *                     length="5" not-null="true" unique="false"
	 */
	public Short getProductModelFlag() {
		return this.productModelFlag;
	}

	/**
	 * Set the productModelFlag
	 * 
	 * @spring.validator type="required"
	 */
	public void setProductModelFlag(Short aValue) {
		this.productModelFlag = aValue;
	}

	/**
	 * 创建人 * @return Long
	 * 
	 * @hibernate.property column="CREATE_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getCreateUserId() {
		return this.createUserId;
	}

	/**
	 * Set the createUserId
	 */
	public void setCreateUserId(Long aValue) {
		this.createUserId = aValue;
	}

	/**
	 * 创建时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="CREATE_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getCreateTime() {
		return this.createTime;
	}

	/**
	 * Set the createTime
	 */
	public void setCreateTime(java.util.Date aValue) {
		this.createTime = aValue;
	}

	/**
	 * 修改人 * @return Long
	 * 
	 * @hibernate.property column="UPDATE_USER_ID" type="java.lang.Long"
	 *                     length="18" not-null="false" unique="false"
	 */
	public Long getUpdateUserId() {
		return this.updateUserId;
	}

	/**
	 * Set the updateUserId
	 */
	public void setUpdateUserId(Long aValue) {
		this.updateUserId = aValue;
	}

	/**
	 * 修改时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="UPDATE_TIME" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}

	/**
	 * Set the updateTime
	 */
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}

	/**
	 * 备注 * @return String
	 * 
	 * @hibernate.property column="DESC" type="java.lang.String" length="500"
	 *                     not-null="false" unique="false"
	 */

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ScGoods other = (ScGoods) obj;
		if (createTime == null) {
			if (other.createTime != null)
				return false;
		} else if (!createTime.equals(other.createTime))
			return false;
		if (createUserId == null) {
			if (other.createUserId != null)
				return false;
		} else if (!createUserId.equals(other.createUserId))
			return false;
		if (goodsDesc == null) {
			if (other.goodsDesc != null)
				return false;
		} else if (!goodsDesc.equals(other.goodsDesc))
			return false;

		if (goodsCount == null) {
			if (other.goodsCount != null)
				return false;
		} else if (!goodsCount.equals(other.goodsCount))
			return false;
		if (goodsId == null) {
			if (other.goodsId != null)
				return false;
		} else if (!goodsId.equals(other.goodsId))
			return false;
		if (goodsName == null) {
			if (other.goodsName != null)
				return false;
		} else if (!goodsName.equals(other.goodsName))
			return false;
		if (isLocked == null) {
			if (other.isLocked != null)
				return false;
		} else if (!isLocked.equals(other.isLocked))
			return false;
		if (goodsModel == null) {
			if (other.goodsModel != null)
				return false;
		} else if (!goodsModel.equals(other.goodsModel))
			return false;
		if (numbers == null) {
			if (other.numbers != null)
				return false;
		} else if (!numbers.equals(other.numbers))
			return false;
		if (obComProduct == null) {
			if (other.obComProduct != null)
				return false;
		} else if (!obComProduct.equals(other.obComProduct))
			return false;
		if (path == null) {
			if (other.path != null)
				return false;
		} else if (!path.equals(other.path))
			return false;
		if (productModelFlag == null) {
			if (other.productModelFlag != null)
				return false;
		} else if (!productModelFlag.equals(other.productModelFlag))
			return false;

		// if (scBizSalesDetails == null) {
		// if (other.scBizSalesDetails != null)
		// return false;
		// } else if (!scBizSalesDetails.equals(other.scBizSalesDetails))
		// return false;
		// if (scBoPurchaseDetails == null) {
		// if (other.scBoPurchaseDetails != null)
		// return false;
		// } else if (!scBoPurchaseDetails.equals(other.scBoPurchaseDetails))
		// return false;
		// if (scBoStockDetails == null) {
		// if (other.scBoStockDetails != null)
		// return false;
		// } else if (!scBoStockDetails.equals(other.scBoStockDetails))
		// return false;
		// if (scComboProduct == null) {
		// if (other.scComboProduct != null)
		// return false;
		// } else if (!scComboProduct.equals(other.scComboProduct))
		// return false;
		// if (scGoodsPrice == null) {
		// if (other.scGoodsPrice != null)
		// return false;
		// } else if (!scGoodsPrice.equals(other.scGoodsPrice))
		// return false;
		// if (scGoodsPriceGoodss == null) {
		// if (other.scGoodsPriceGoodss != null)
		// return false;
		// } else if (!scGoodsPriceGoodss.equals(other.scGoodsPriceGoodss))
		// return false;
		// if (scGoodsPriceHiss == null) {
		// if (other.scGoodsPriceHiss != null)
		// return false;
		// } else if (!scGoodsPriceHiss.equals(other.scGoodsPriceHiss))
		// return false;
		// if (scGoodsPriceRuleGoodss == null) {
		// if (other.scGoodsPriceRuleGoodss != null)
		// return false;
		// } else if
		// (!scGoodsPriceRuleGoodss.equals(other.scGoodsPriceRuleGoodss))
		// return false;
		// if (scGoodsStocks == null) {
		// if (other.scGoodsStocks != null)
		// return false;
		// } else if (!scGoodsStocks.equals(other.scGoodsStocks))
		// return false;
		// if (scProduct == null) {
		// if (other.scProduct != null)
		// return false;
		// } else if (!scProduct.equals(other.scProduct))
		// return false;
		// if (scProductClassify == null) {
		// if (other.scProductClassify != null)
		// return false;
		// } else if (!scProductClassify.equals(other.scProductClassify))
		// return false;
		// if (scProductInsts == null) {
		// if (other.scProductInsts != null)
		// return false;
		// } else if (!scProductInsts.equals(other.scProductInsts))
		// return false;
		// if (scPurchasePrice == null) {
		// if (other.scPurchasePrice != null)
		// return false;
		// } else if (!scPurchasePrice.equals(other.scPurchasePrice))
		// return false;
		// if (scPurchasePriceGoodss == null) {
		// if (other.scPurchasePriceGoodss != null)
		// return false;
		// } else if
		// (!scPurchasePriceGoodss.equals(other.scPurchasePriceGoodss))
		// return false;
		// if (scPurchaseProducts == null) {
		// if (other.scPurchaseProducts != null)
		// return false;
		// } else if (!scPurchaseProducts.equals(other.scPurchaseProducts))
		// return false;
		// if (scThresholdLevels == null) {
		// if (other.scThresholdLevels != null)
		// return false;
		// } else if (!scThresholdLevels.equals(other.scThresholdLevels))
		// return false;
		// if (status == null) {
		// if (other.status != null)
		// return false;
		// } else if (!status.equals(other.status))
		// return false;
		if (updateTime == null) {
			if (other.updateTime != null)
				return false;
		} else if (!updateTime.equals(other.updateTime))
			return false;
		if (updateUserId == null) {
			if (other.updateUserId != null)
				return false;
		} else if (!updateUserId.equals(other.updateUserId))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((createTime == null) ? 0 : createTime.hashCode());
		result = prime * result
				+ ((createUserId == null) ? 0 : createUserId.hashCode());
		result = prime * result
				+ ((goodsDesc == null) ? 0 : goodsDesc.hashCode());

		result = prime * result
				+ ((goodsCount == null) ? 0 : goodsCount.hashCode());
		result = prime * result + ((goodsId == null) ? 0 : goodsId.hashCode());
		result = prime * result
				+ ((goodsName == null) ? 0 : goodsName.hashCode());
		result = prime * result
				+ ((isLocked == null) ? 0 : isLocked.hashCode());
		result = prime * result
				+ ((goodsModel == null) ? 0 : goodsModel.hashCode());
		result = prime * result + ((numbers == null) ? 0 : numbers.hashCode());
		result = prime * result
				+ ((obComProduct == null) ? 0 : obComProduct.hashCode());

		result = prime * result + ((path == null) ? 0 : path.hashCode());
		result = prime
				* result
				+ ((productModelFlag == null) ? 0 : productModelFlag.hashCode());

		// result = prime
		// * result
		// + ((scBizSalesDetails == null) ? 0 : scBizSalesDetails
		// .hashCode());
		// result = prime
		// * result
		// + ((scBoPurchaseDetails == null) ? 0 : scBoPurchaseDetails
		// .hashCode());
		// result = prime
		// * result
		// + ((scBoStockDetails == null) ? 0 : scBoStockDetails.hashCode());
		// result = prime * result
		// + ((scComboProduct == null) ? 0 : scComboProduct.hashCode());
		// result = prime * result
		// + ((scGoodsPrice == null) ? 0 : scGoodsPrice.hashCode());
		// result = prime
		// * result
		// + ((scGoodsPriceGoodss == null) ? 0 : scGoodsPriceGoodss
		// .hashCode());
		// result = prime
		// * result
		// + ((scGoodsPriceHiss == null) ? 0 : scGoodsPriceHiss.hashCode());
		// result = prime
		// * result
		// + ((scGoodsPriceRuleGoodss == null) ? 0
		// : scGoodsPriceRuleGoodss.hashCode());
		// result = prime * result
		// + ((scGoodsStocks == null) ? 0 : scGoodsStocks.hashCode());
		// result = prime * result
		// + ((scProduct == null) ? 0 : scProduct.hashCode());
		// result = prime
		// * result
		// + ((scProductClassify == null) ? 0 : scProductClassify
		// .hashCode());
		// result = prime * result
		// + ((scProductInsts == null) ? 0 : scProductInsts.hashCode());
		// result = prime * result
		// + ((scPurchasePrice == null) ? 0 : scPurchasePrice.hashCode());
		// result = prime
		// * result
		// + ((scPurchasePriceGoodss == null) ? 0 : scPurchasePriceGoodss
		// .hashCode());
		// result = prime
		// * result
		// + ((scPurchaseProducts == null) ? 0 : scPurchaseProducts
		// .hashCode());
		// result = prime
		// * result
		// + ((scThresholdLevels == null) ? 0 : scThresholdLevels
		// .hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result
				+ ((updateTime == null) ? 0 : updateTime.hashCode());
		result = prime * result
				+ ((updateUserId == null) ? 0 : updateUserId.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "ScGoods [createTime=" + createTime + ", createUserId="
				+ createUserId + ", desc=" + goodsDesc + ", goodsClassifyCode="
				+ ", goodsCount=" + goodsCount
				+ ", goodsId="
				+ goodsId
				+ ", goodsName="
				+ goodsName
				+ ", isLocked="
				+ isLocked
				+ ", model="
				+ goodsDesc
				+ ", numbers="
				+ numbers
				+ ", obComProduct="
				+ obComProduct
				+ ", origGuidePrice="
				+ ", path="
				+ path
				+ ", productModelFlag="
				+ productModelFlag
				+ ", retailPrice="
				// + ", scBizSalesDetails=" + scBizSalesDetails
				// + ", scBoPurchaseDetails=" + scBoPurchaseDetails
				// + ", scBoStockDetails=" + scBoStockDetails
				// + ", scComboProduct=" + scComboProduct + ", scGoodsPrice="
				// + scGoodsPrice + ", scGoodsPriceGoodss=" + scGoodsPriceGoodss
				// + ", scGoodsPriceHiss=" + scGoodsPriceHiss
				// + ", scGoodsPriceRuleGoodss=" + scGoodsPriceRuleGoodss
				// + ", scGoodsStocks=" + scGoodsStocks + ", scProduct="
				// + scProduct + ", scProductClassify=" + scProductClassify
				// + ", scProductInsts=" + scProductInsts + ", scPurchasePrice="
				// + scPurchasePrice + ", scPurchasePriceGoodss="
				// + scPurchasePriceGoodss + ", scPurchaseProducts="
				// + scPurchaseProducts + ", scThresholdLevels="
				// + scThresholdLevels
				+ ", status=" + status + ", updateTime=" + updateTime
				+ ", updateUserId=" + updateUserId + "]";
	}

}
