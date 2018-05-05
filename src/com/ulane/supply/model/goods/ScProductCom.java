package com.ulane.supply.model.goods;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */

/**
 * ScGoods Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class ScProductCom extends com.htsoft.core.model.BaseModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5138059777843307710L;

	protected Long productComId;
	protected ScGoods productId;// 父产品
	protected ScGoods comboGoodsId;
	protected Integer procomCount;

	public Long getProductComId() {
		return productComId;
	}

	public void setProductComId(Long productComId) {
		this.productComId = productComId;
	}

	public ScGoods getProductId() {
		return productId;
	}

	public void setProductId(ScGoods productId) {
		this.productId = productId;
	}

	public ScGoods getComboGoodsId() {
		return comboGoodsId;
	}

	public void setComboGoodsId(ScGoods comboGoodsId) {
		this.comboGoodsId = comboGoodsId;
	}

	public Integer getProcomCount() {
		return procomCount;
	}

	public void setProcomCount(Integer procomCount) {
		this.procomCount = procomCount;
	}

}
