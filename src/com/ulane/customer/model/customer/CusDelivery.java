package com.ulane.customer.model.customer;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.model.system.RegionDetail;

/**
 * CusDelivery Base Java Bean, base class for the.base.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * 
 */
public class CusDelivery extends com.htsoft.core.model.BaseModel {

	protected Long deliveryId;
	protected String deliveryAddress;
	protected String deliveryName;
	protected String deliveryPhone;
	protected String deliveryPost;
	protected Long creUseId;
	protected java.util.Date creDat;
	protected Long updUseId;
	protected java.util.Date updDat;
	protected String note;
	protected Customer customer;
	protected Region regionGuojia;
	protected Region regionSheng;
	protected Region regionShi;
	protected Region regionQu;

	protected RegionDetail regionJiedao;
	protected Long cusId;
	protected String tel;
	protected Long addrSeq;

	public Long getAddrSeq() {
		return addrSeq;
	}

	public void setAddrSeq(Long addrSeq) {
		this.addrSeq = addrSeq;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Long getCusId() {
		return cusId;
	}

	public RegionDetail getRegionJiedao() {
		return regionJiedao;
	}

	public void setRegionJiedao(RegionDetail regionJiedao) {
		this.regionJiedao = regionJiedao;
	}

	public void setCusId(Long cusId) {
		this.cusId = cusId;
	}

	/**
	 * Default Empty Constructor for class CusDelivery
	 */
	public CusDelivery() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class CusDelivery
	 */
	public CusDelivery(Long in_deliveryId) {
		this.setDeliveryId(in_deliveryId);
	}

	public String getDeliveryPost() {
		return deliveryPost;
	}

	public void setDeliveryPost(String deliveryPost) {
		this.deliveryPost = deliveryPost;
	}

	public Region getRegionGuojia() {
		return regionGuojia;
	}

	public void setRegionGuojia(Region regionGuojia) {
		this.regionGuojia = regionGuojia;
	}

	public Region getRegionSheng() {
		return regionSheng;
	}

	public void setRegionSheng(Region regionSheng) {
		this.regionSheng = regionSheng;
	}

	public Region getRegionShi() {
		return regionShi;
	}

	public void setRegionShi(Region regionShi) {
		this.regionShi = regionShi;
	}

	public Region getRegionQu() {
		return regionQu;
	}

	public void setRegionQu(Region regionQu) {
		this.regionQu = regionQu;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer in_customer) {
		this.customer = in_customer;
	}

	/**
	 * 配送地址内码 * @return Long
	 * 
	 * @hibernate.id column="DELIVERY_ID" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getDeliveryId() {
		return this.deliveryId;
	}

	/**
	 * Set the deliveryId
	 */
	public void setDeliveryId(Long aValue) {
		this.deliveryId = aValue;
	}

	/**
	 * 客户内码 * @return Long
	 */
	public Long getCustomerid() {
		return this.getCustomer() == null ? null : this.getCustomer()
				.getCustomerId();
	}

	/**
	 * Set the customerid
	 */
	public void setCustomerid(Long aValue) {
		if (aValue == null) {
			customer = null;
		} else if (customer == null) {
			customer = new Customer(aValue);
			customer.setVersion(new Integer(0));// set a version to cheat
												// hibernate only
		} else {
			//
			customer.setCustomerId(aValue);
		}
	}

	/**
	 * 地址 * @return String
	 * 
	 * @hibernate.property column="DELIVERY_ADDRESS" type="java.lang.String"
	 *                     length="255" not-null="false" unique="false"
	 */
	public String getDeliveryAddress() {
		return this.deliveryAddress;
	}

	/**
	 * Set the deliveryAddress
	 */
	public void setDeliveryAddress(String aValue) {
		this.deliveryAddress = aValue;
	}

	/**
	 * 姓名 * @return String
	 * 
	 * @hibernate.property column="DELIVERY_NAME" type="java.lang.String"
	 *                     length="50" not-null="false" unique="false"
	 */
	public String getDeliveryName() {
		return this.deliveryName;
	}

	/**
	 * Set the deliveryName
	 */
	public void setDeliveryName(String aValue) {
		this.deliveryName = aValue;
	}

	/**
	 * 电话 * @return String
	 * 
	 * @hibernate.property column="DELIVERY_PHONE" type="java.lang.String"
	 *                     length="50" not-null="false" unique="false"
	 */
	public String getDeliveryPhone() {
		return this.deliveryPhone;
	}

	/**
	 * Set the deliveryPhone
	 */
	public void setDeliveryPhone(String aValue) {
		this.deliveryPhone = aValue;
	}

	/**
	 * 创建人ID * @return Long
	 * 
	 * @hibernate.property column="CRE_USE_ID" type="java.lang.Long" length="18"
	 *                     not-null="true" unique="false"
	 */
	public Long getCreUseId() {
		return this.creUseId;
	}

	/**
	 * Set the creUseId
	 * 
	 * @spring.validator type="required"
	 */
	public void setCreUseId(Long aValue) {
		this.creUseId = aValue;
	}

	/**
	 * 创建日期 * @return java.util.Date
	 * 
	 * @hibernate.property column="CRE_DAT" type="java.util.Date" length="7"
	 *                     not-null="true" unique="false"
	 */
	public java.util.Date getCreDat() {
		return this.creDat;
	}

	/**
	 * Set the creDat
	 * 
	 * @spring.validator type="required"
	 */
	public void setCreDat(java.util.Date aValue) {
		this.creDat = aValue;
	}

	/**
	 * 修改人ID * @return Long
	 * 
	 * @hibernate.property column="UPD_USE_ID" type="java.lang.Long" length="18"
	 *                     not-null="false" unique="false"
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
	 * 修改日期 * @return java.util.Date
	 * 
	 * @hibernate.property column="UPD_DAT" type="java.util.Date" length="7"
	 *                     not-null="false" unique="false"
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
	 * 备注 * @return String
	 * 
	 * @hibernate.property column="NOTE" type="java.lang.String" length="128"
	 *                     not-null="false" unique="false"
	 */
	public String getNote() {
		return this.note;
	}

	/**
	 * Set the note
	 */
	public void setNote(String aValue) {
		this.note = aValue;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof CusDelivery)) {
			return false;
		}
		CusDelivery rhs = (CusDelivery) object;
		return new EqualsBuilder().append(this.deliveryId, rhs.deliveryId)
				.append(this.deliveryAddress, rhs.deliveryAddress)
				.append(this.deliveryName, rhs.deliveryName)
				.append(this.deliveryPhone, rhs.deliveryPhone)
				.append(this.creUseId, rhs.creUseId)
				.append(this.creDat, rhs.creDat)
				.append(this.updUseId, rhs.updUseId)
				.append(this.updDat, rhs.updDat).append(this.note, rhs.note)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.deliveryId).append(this.deliveryAddress)
				.append(this.deliveryName).append(this.deliveryPhone)
				.append(this.creUseId).append(this.creDat)
				.append(this.updUseId).append(this.updDat).append(this.note)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("deliveryId", this.deliveryId)
				.append("deliveryAddress", this.deliveryAddress)
				.append("deliveryName", this.deliveryName)
				.append("deliveryPhone", this.deliveryPhone)
				.append("creUseId", this.creUseId)
				.append("creDat", this.creDat)
				.append("updUseId", this.updUseId)
				.append("updDat", this.updDat).append("note", this.note)
				.toString();
	}

}
