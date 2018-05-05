package com.ulane.callout.model.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/


/**
 * ObCom Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class ObComProduct extends com.htsoft.core.model.BaseModel {

    protected Long comId;
    protected Long goodsId;
    protected Long  comProductId;
    protected Long status;
	public Long getComProductId() {
		return comProductId;
	}
	public void setComProductId(Long comProductId) {
		this.comProductId = comProductId;
	}

	public Long getComId() {
		return comId;
	}
	public void setComId(Long comId) {
		this.comId = comId;
	}
	public Long getGoodsId() {
		return goodsId;
	}
	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}
	public Long getStatus() {
		return status;
	}
	public void setStatus(Long status) {
		this.status = status;
	}
	
	

	@Override
	public String toString() {
		return "ObComProduct [comId=" + comId + ", comProductId="
				+ comProductId + ", goodsId=" + goodsId + ", status=" + status
				+ ", logger=" + logger + ", getComId()=" + getComId()
				+ ", getComProductId()=" + getComProductId()
				+ ", getGoodsId()=" + getGoodsId() + ", getStatus()="
				+ getStatus() + ", hashCode()=" + hashCode()
				+ ", getVersion()=" + getVersion() + ", getClass()="
				+ getClass() + ", toString()=" + super.toString() + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((comId == null) ? 0 : comId.hashCode());
		result = prime * result
				+ ((comProductId == null) ? 0 : comProductId.hashCode());
		result = prime * result + ((goodsId == null) ? 0 : goodsId.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ObComProduct other = (ObComProduct) obj;
		if (comId == null) {
			if (other.comId != null)
				return false;
		} else if (!comId.equals(other.comId))
			return false;
		if (comProductId == null) {
			if (other.comProductId != null)
				return false;
		} else if (!comProductId.equals(other.comProductId))
			return false;
		if (goodsId == null) {
			if (other.goodsId != null)
				return false;
		} else if (!goodsId.equals(other.goodsId))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		return true;
	}

	public ObComProduct() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ObComProduct(Long comProductId) {
		this.setComProductId(comProductId);
	}



}
