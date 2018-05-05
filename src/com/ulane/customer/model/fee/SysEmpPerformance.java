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
public class SysEmpPerformance extends com.htsoft.core.model.BaseModel {
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
    protected String empPerNd;						//年度
    


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
	
	public String getEmpPerNd() {
		return empPerNd;
	}
	public void setEmpPerNd(String empPerNd) {
		this.empPerNd = empPerNd;
	}
    public String getEmpPerQuarter() {
		return empPerQuarter;
	}
	public void setEmpPerQuarter(String empPerQuarter) {
		this.empPerQuarter = empPerQuarter;
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
    

    @Override
	public String toString() {
		return "SysEmpPerformance [backOrderCash=" + backOrderCash
				+ ", backOrders=" + backOrders + ", canceledCash="
				+ canceledCash + ", canceledOrders=" + canceledOrders
				+ ", creDat=" + creDat + ", creUserId=" + creUserId
				+ ", creUserNo=" + creUserNo + ", danshutuotoulv="
				+ danshutuotoulv + ", daxiaolv=" + daxiaolv + ", depNam="
				+ depNam + ", empPerId=" + empPerId + ", empPerNd=" + empPerNd
				+ ", empPerQuarter=" + empPerQuarter + ", employeeId="
				+ employeeId + ", employeeNo=" + employeeNo + ", exchangeCash="
				+ exchangeCash + ", exchangeOrders=" + exchangeOrders
				+ ", jinetuotoulv=" + jinetuotoulv + ", mubiaozhi=" + mubiaozhi
				+ ", orderGoods=" + orderGoods + ", perDat=" + perDat
				+ ", sumDat=" + sumDat + ", totalOrderCash=" + totalOrderCash
				+ ", totalOrders=" + totalOrders + ", totalPhones="
				+ totalPhones + ", updDat=" + updDat + ", updUserId="
				+ updUserId + ", updUserNo=" + updUserNo + ", userNam="
				+ userNam + ", userNo=" + userNo + ", validOrderCash="
				+ validOrderCash + ", validOrders=" + validOrders
				+ ", wanchengliang=" + wanchengliang + ", wanchenglv="
				+ wanchenglv + ", wanchenglvg=" + wanchenglvg + ", yongjin="
				+ yongjin + ", zhibiaoxiang=" + zhibiaoxiang + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((backOrderCash == null) ? 0 : backOrderCash.hashCode());
		result = prime * result
				+ ((backOrders == null) ? 0 : backOrders.hashCode());
		result = prime * result
				+ ((canceledCash == null) ? 0 : canceledCash.hashCode());
		result = prime * result
				+ ((canceledOrders == null) ? 0 : canceledOrders.hashCode());
		result = prime * result + ((creDat == null) ? 0 : creDat.hashCode());
		result = prime * result
				+ ((creUserId == null) ? 0 : creUserId.hashCode());
		result = prime * result
				+ ((creUserNo == null) ? 0 : creUserNo.hashCode());
		long temp;
		temp = Double.doubleToLongBits(danshutuotoulv);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(daxiaolv);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((depNam == null) ? 0 : depNam.hashCode());
		result = prime * result
				+ ((empPerId == null) ? 0 : empPerId.hashCode());
		result = prime * result
				+ ((empPerNd == null) ? 0 : empPerNd.hashCode());
		result = prime * result
				+ ((empPerQuarter == null) ? 0 : empPerQuarter.hashCode());
		result = prime * result
				+ ((employeeId == null) ? 0 : employeeId.hashCode());
		result = prime * result
				+ ((employeeNo == null) ? 0 : employeeNo.hashCode());
		result = prime * result
				+ ((exchangeCash == null) ? 0 : exchangeCash.hashCode());
		result = prime * result
				+ ((exchangeOrders == null) ? 0 : exchangeOrders.hashCode());
		result = prime * result
				+ ((jinetuotoulv == null) ? 0 : jinetuotoulv.hashCode());
		result = prime * result
				+ ((mubiaozhi == null) ? 0 : mubiaozhi.hashCode());
		result = prime * result
				+ ((orderGoods == null) ? 0 : orderGoods.hashCode());
		result = prime * result + ((perDat == null) ? 0 : perDat.hashCode());
		result = prime * result + ((sumDat == null) ? 0 : sumDat.hashCode());
		result = prime * result
				+ ((totalOrderCash == null) ? 0 : totalOrderCash.hashCode());
		result = prime * result
				+ ((totalOrders == null) ? 0 : totalOrders.hashCode());
		result = prime * result
				+ ((totalPhones == null) ? 0 : totalPhones.hashCode());
		result = prime * result + ((updDat == null) ? 0 : updDat.hashCode());
		result = prime * result
				+ ((updUserId == null) ? 0 : updUserId.hashCode());
		result = prime * result
				+ ((updUserNo == null) ? 0 : updUserNo.hashCode());
		result = prime * result + ((userNam == null) ? 0 : userNam.hashCode());
		result = prime * result + ((userNo == null) ? 0 : userNo.hashCode());
		result = prime * result
				+ ((validOrderCash == null) ? 0 : validOrderCash.hashCode());
		result = prime * result
				+ ((validOrders == null) ? 0 : validOrders.hashCode());
		result = prime * result
				+ ((wanchengliang == null) ? 0 : wanchengliang.hashCode());
		temp = Double.doubleToLongBits(wanchenglv);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result
				+ ((wanchenglvg == null) ? 0 : wanchenglvg.hashCode());
		result = prime * result + ((yongjin == null) ? 0 : yongjin.hashCode());
		result = prime * result
				+ ((zhibiaoxiang == null) ? 0 : zhibiaoxiang.hashCode());
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
		SysEmpPerformance other = (SysEmpPerformance) obj;
		if (backOrderCash == null) {
			if (other.backOrderCash != null)
				return false;
		} else if (!backOrderCash.equals(other.backOrderCash))
			return false;
		if (backOrders == null) {
			if (other.backOrders != null)
				return false;
		} else if (!backOrders.equals(other.backOrders))
			return false;
		if (canceledCash == null) {
			if (other.canceledCash != null)
				return false;
		} else if (!canceledCash.equals(other.canceledCash))
			return false;
		if (canceledOrders == null) {
			if (other.canceledOrders != null)
				return false;
		} else if (!canceledOrders.equals(other.canceledOrders))
			return false;
		if (creDat == null) {
			if (other.creDat != null)
				return false;
		} else if (!creDat.equals(other.creDat))
			return false;
		if (creUserId == null) {
			if (other.creUserId != null)
				return false;
		} else if (!creUserId.equals(other.creUserId))
			return false;
		if (creUserNo == null) {
			if (other.creUserNo != null)
				return false;
		} else if (!creUserNo.equals(other.creUserNo))
			return false;
		if (Double.doubleToLongBits(danshutuotoulv) != Double
				.doubleToLongBits(other.danshutuotoulv))
			return false;
		if (Double.doubleToLongBits(daxiaolv) != Double
				.doubleToLongBits(other.daxiaolv))
			return false;
		if (depNam == null) {
			if (other.depNam != null)
				return false;
		} else if (!depNam.equals(other.depNam))
			return false;
		if (empPerId == null) {
			if (other.empPerId != null)
				return false;
		} else if (!empPerId.equals(other.empPerId))
			return false;
		if (empPerNd == null) {
			if (other.empPerNd != null)
				return false;
		} else if (!empPerNd.equals(other.empPerNd))
			return false;
		if (empPerQuarter == null) {
			if (other.empPerQuarter != null)
				return false;
		} else if (!empPerQuarter.equals(other.empPerQuarter))
			return false;
		if (employeeId == null) {
			if (other.employeeId != null)
				return false;
		} else if (!employeeId.equals(other.employeeId))
			return false;
		if (employeeNo == null) {
			if (other.employeeNo != null)
				return false;
		} else if (!employeeNo.equals(other.employeeNo))
			return false;
		if (exchangeCash == null) {
			if (other.exchangeCash != null)
				return false;
		} else if (!exchangeCash.equals(other.exchangeCash))
			return false;
		if (exchangeOrders == null) {
			if (other.exchangeOrders != null)
				return false;
		} else if (!exchangeOrders.equals(other.exchangeOrders))
			return false;
		if (jinetuotoulv == null) {
			if (other.jinetuotoulv != null)
				return false;
		} else if (!jinetuotoulv.equals(other.jinetuotoulv))
			return false;
		if (mubiaozhi == null) {
			if (other.mubiaozhi != null)
				return false;
		} else if (!mubiaozhi.equals(other.mubiaozhi))
			return false;
		if (orderGoods == null) {
			if (other.orderGoods != null)
				return false;
		} else if (!orderGoods.equals(other.orderGoods))
			return false;
		if (perDat == null) {
			if (other.perDat != null)
				return false;
		} else if (!perDat.equals(other.perDat))
			return false;
		if (sumDat == null) {
			if (other.sumDat != null)
				return false;
		} else if (!sumDat.equals(other.sumDat))
			return false;
		if (totalOrderCash == null) {
			if (other.totalOrderCash != null)
				return false;
		} else if (!totalOrderCash.equals(other.totalOrderCash))
			return false;
		if (totalOrders == null) {
			if (other.totalOrders != null)
				return false;
		} else if (!totalOrders.equals(other.totalOrders))
			return false;
		if (totalPhones == null) {
			if (other.totalPhones != null)
				return false;
		} else if (!totalPhones.equals(other.totalPhones))
			return false;
		if (updDat == null) {
			if (other.updDat != null)
				return false;
		} else if (!updDat.equals(other.updDat))
			return false;
		if (updUserId == null) {
			if (other.updUserId != null)
				return false;
		} else if (!updUserId.equals(other.updUserId))
			return false;
		if (updUserNo == null) {
			if (other.updUserNo != null)
				return false;
		} else if (!updUserNo.equals(other.updUserNo))
			return false;
		if (userNam == null) {
			if (other.userNam != null)
				return false;
		} else if (!userNam.equals(other.userNam))
			return false;
		if (userNo == null) {
			if (other.userNo != null)
				return false;
		} else if (!userNo.equals(other.userNo))
			return false;
		if (validOrderCash == null) {
			if (other.validOrderCash != null)
				return false;
		} else if (!validOrderCash.equals(other.validOrderCash))
			return false;
		if (validOrders == null) {
			if (other.validOrders != null)
				return false;
		} else if (!validOrders.equals(other.validOrders))
			return false;
		if (wanchengliang == null) {
			if (other.wanchengliang != null)
				return false;
		} else if (!wanchengliang.equals(other.wanchengliang))
			return false;
		if (Double.doubleToLongBits(wanchenglv) != Double
				.doubleToLongBits(other.wanchenglv))
			return false;
		if (wanchenglvg == null) {
			if (other.wanchenglvg != null)
				return false;
		} else if (!wanchenglvg.equals(other.wanchenglvg))
			return false;
		if (yongjin == null) {
			if (other.yongjin != null)
				return false;
		} else if (!yongjin.equals(other.yongjin))
			return false;
		if (zhibiaoxiang == null) {
			if (other.zhibiaoxiang != null)
				return false;
		} else if (!zhibiaoxiang.equals(other.zhibiaoxiang))
			return false;
		return true;
	}

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


}
