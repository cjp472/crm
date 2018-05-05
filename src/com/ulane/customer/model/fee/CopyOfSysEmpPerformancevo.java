package com.ulane.customer.model.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.htsoft.oa.model.system.AppUser;
import com.ulane.base.model.xitong.UlEmployee;

/**
 * ObFee Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class CopyOfSysEmpPerformancevo extends com.htsoft.core.model.BaseModel {
    protected Long empPerId;
    protected Long employeeId;						//员工内码
    protected String employeeNo; 					//工号
    protected Long totalPhones; 					//总电话量
    protected Long totalOrders;        			    //总订单量TOTAL_ORDERS
    protected java.math.BigDecimal totalOrderCash;  //订单总金额
    protected Long canceledOrders;      			//取消订单数CANCELED_ORDERS
    protected java.math.BigDecimal canceledCash;	//取消订单金额CANCELED_CASH
    protected java.math.BigDecimal exchangeCash;	//换货订单金额EXCHANGE_CASH
    protected Long exchangeOrders;					//换货订单数EXCHANGE_ORDERS
    protected Long validOrders; 					//有效订单数VALID_ORDERS
    protected java.math.BigDecimal validOrderCash;	//有效订单金额 VALID_ORDER_CASH;	
	protected Long backOrders;						//退货订单数BACK_ORDERS
    protected java.math.BigDecimal backOrderCash;	//退货订单金额BACK_ORDER_CASH
    protected java.util.Date perDat;				//年月PER_DAT
    protected java.util.Date sumDat;			 	//汇总时间SUM_DAT
	protected Long orderGoods;				    	//ORDER_GOODS一单多货单数
    protected java.util.Date creDat;				//创建时间CRE_DAT
    protected java.util.Date updDat;				//修改时间CRE_DAT
    protected Long creUserId;						//创建人内码CRE_USER_ID
	protected String creUserNo;						//创建人工号CRE_USER_NO
    protected Long updUserId;						//修改人内码CRE_USER_ID
    protected String updUserNo;						//修改人工号CRE_USER_NO
    protected String empPerQuarter;					//季度
    

	public Long getEmpPerId() {
		return empPerId;
	}
	public void setEmpPerId(Long empPerId) {
		this.empPerId = empPerId;
	}
	public Long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmployeeNo() {
		return employeeNo;
	}
	public void setEmployeeNo(String employeeNo) {
		this.employeeNo = employeeNo;
	}
	public Long getTotalPhones() {
		return totalPhones;
	}
	public void setTotalPhones(Long totalPhones) {
		this.totalPhones = totalPhones;
	}
	public Long getTotalOrders() {
		return totalOrders;
	}
	public void setTotalOrders(Long totalOrders) {
		this.totalOrders = totalOrders;
	}
	public java.math.BigDecimal getTotalOrderCash() {
		return totalOrderCash;
	}
	public void setTotalOrderCash(java.math.BigDecimal totalOrderCash) {
		this.totalOrderCash = totalOrderCash;
	}
	public Long getCanceledOrders() {
		return canceledOrders;
	}
	public void setCanceledOrders(Long canceledOrders) {
		this.canceledOrders = canceledOrders;
	}
	public java.math.BigDecimal getCanceledCash() {
		return canceledCash;
	}
	public void setCanceledCash(java.math.BigDecimal canceledCash) {
		this.canceledCash = canceledCash;
	}
	public java.math.BigDecimal getExchangeCash() {
		return exchangeCash;
	}
	public void setExchangeCash(java.math.BigDecimal exchangeCash) {
		this.exchangeCash = exchangeCash;
	}
	public Long getExchangeOrders() {
		return exchangeOrders;
	}
	public void setExchangeOrders(Long exchangeOrders) {
		this.exchangeOrders = exchangeOrders;
	}
	public Long getValidOrders() {
		return validOrders;
	}
	public void setValidOrders(Long validOrders) {
		this.validOrders = validOrders;
	}
	public java.math.BigDecimal getValidOrderCash() {
		return validOrderCash;
	}
	public void setValidOrderCash(java.math.BigDecimal validOrderCash) {
		this.validOrderCash = validOrderCash;
	}
	public Long getBackOrders() {
		return backOrders;
	}
	public void setBackOrders(Long backOrders) {
		this.backOrders = backOrders;
	}
	public java.math.BigDecimal getBackOrderCash() {
		return backOrderCash;
	}
	public void setBackOrderCash(java.math.BigDecimal backOrderCash) {
		this.backOrderCash = backOrderCash;
	}
	public java.util.Date getPerDat() {
		return perDat;
	}
	public void setPerDat(java.util.Date perDat) {
		this.perDat = perDat;
	}
	public java.util.Date getSumDat() {
		return sumDat;
	}
	public void setSumDat(java.util.Date sumDat) {
		this.sumDat = sumDat;
	}
	public Long getOrderGoods() {
		return orderGoods;
	}
	public void setOrderGoods(Long orderGoods) {
		this.orderGoods = orderGoods;
	}
	public java.util.Date getCreDat() {
		return creDat;
	}
	public void setCreDat(java.util.Date creDat) {
		this.creDat = creDat;
	}
	public java.util.Date getUpdDat() {
		return updDat;
	}
	public void setUpdDat(java.util.Date updDat) {
		this.updDat = updDat;
	}
	public Long getCreUserId() {
		return creUserId;
	}
	public void setCreUserId(Long creUserId) {
		this.creUserId = creUserId;
	}
	public String getCreUserNo() {
		return creUserNo;
	}
	public void setCreUserNo(String creUserNo) {
		this.creUserNo = creUserNo;
	}
	public Long getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(Long updUserId) {
		this.updUserId = updUserId;
	}
	public String getUpdUserNo() {
		return updUserNo;
	}
	public void setUpdUserNo(String updUserNo) {
		this.updUserNo = updUserNo;
	}
	public String getEmpPerQuarter() {
		return empPerQuarter;
	}
	public void setEmpPerQuarter(String empPerQuarter) {
		this.empPerQuarter = empPerQuarter;
	}
	public java.math.BigDecimal getJinetuotoulv() {
		return jinetuotoulv;
	}
	public void setJinetuotoulv(java.math.BigDecimal jinetuotoulv) {
		this.jinetuotoulv = jinetuotoulv;
	}
	public double getDanshutuotoulv() {
		return danshutuotoulv;
	}
	public void setDanshutuotoulv(double danshutuotoulv) {
		this.danshutuotoulv = danshutuotoulv;
	}
	public double getDaxiaolv() {
		return daxiaolv;
	}
	public void setDaxiaolv(double daxiaolv) {
		this.daxiaolv = daxiaolv;
	}
	public double getWanchenglv() {
		return wanchenglv;
	}
	public void setWanchenglv(double wanchenglv) {
		this.wanchenglv = wanchenglv;
	}
	public java.math.BigDecimal getYongjin() {
		return yongjin;
	}
	public void setYongjin(java.math.BigDecimal yongjin) {
		this.yongjin = yongjin;
	}
	public String getUserNam() {
		return userNam;
	}
	public void setUserNam(String userNam) {
		this.userNam = userNam;
	}
	public String getUserNo() {
		return userNo;
	}
	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}
	public String getDepNam() {
		return depNam;
	}
	public void setDepNam(String depNam) {
		this.depNam = depNam;
	}
	public String getZhibiaoxiang() {
		return zhibiaoxiang;
	}
	public void setZhibiaoxiang(String zhibiaoxiang) {
		this.zhibiaoxiang = zhibiaoxiang;
	}
	public java.math.BigDecimal getMubiaozhi() {
		return mubiaozhi;
	}
	public void setMubiaozhi(java.math.BigDecimal mubiaozhi) {
		this.mubiaozhi = mubiaozhi;
	}
	public java.math.BigDecimal getWanchengliang() {
		return wanchengliang;
	}
	public void setWanchengliang(java.math.BigDecimal wanchengliang) {
		this.wanchengliang = wanchengliang;
	}
	public java.math.BigDecimal getWanchenglvg() {
		return wanchenglvg;
	}
	public void setWanchenglvg(java.math.BigDecimal wanchenglvg) {
		this.wanchenglvg = wanchenglvg;
	}
	//处理字段
    protected java.math.BigDecimal jinetuotoulv; 	//金额妥投率
    protected double danshutuotoulv; 				//金额妥投率
    protected double daxiaolv;						//搭销率
    protected double wanchenglv;					//成功率
    protected java.math.BigDecimal yongjin;			//佣金
	protected String userNam;                       //员工名称
	protected String userNo;						//工号
	protected String depNam;                        //部门名称
	protected String zhibiaoxiang;					//指标项
	protected java.math.BigDecimal mubiaozhi;		//目标值
	protected java.math.BigDecimal wanchengliang;	//完成量
	protected java.math.BigDecimal wanchenglvg;     //完成率


}
