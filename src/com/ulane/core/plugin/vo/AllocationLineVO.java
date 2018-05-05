package com.ulane.core.plugin.vo;
/**
 * 要货调拨单行信息VO
 * @author yuying
 *
 */
public class AllocationLineVO {		   
	private String goodsNum;
	private String shortName;
	private String concreateCode;
	private String quantity;                
	private String orderPrice;
	private String infactQuantity;
	private String isGift;
	public String getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(String goodsNum) {
		this.goodsNum = goodsNum;
	}
	public String getShortName() {
		return shortName;
	}
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
	public String getConcreateCode() {
		return concreateCode;
	}
	public void setConcreateCode(String concreateCode) {
		this.concreateCode = concreateCode;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getOrderPrice() {
		return orderPrice;
	}
	public void setOrderPrice(String orderPrice) {
		this.orderPrice = orderPrice;
	}
	public String getInfactQuantity() {
		return infactQuantity;
	}
	public void setInfactQuantity(String infactQuantity) {
		this.infactQuantity = infactQuantity;
	}
	public String getIsGift() {
		return isGift;
	}
	public void setIsGift(String isGift) {
		this.isGift = isGift;
	}
	
}
