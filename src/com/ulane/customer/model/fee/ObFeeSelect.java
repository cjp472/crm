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
public class ObFeeSelect extends com.htsoft.core.model.BaseModel {

    protected Long feeId;
	protected String month;
	protected String quarter;
	protected java.math.BigDecimal amount;
	protected Long createBy;
	protected Long updateBy;
	protected java.util.Date createDate;
	protected java.util.Date updateDate;
	protected java.math.BigDecimal changedAmount;
	protected String comments;
	protected Short staId;
	protected com.ulane.customer.model.fee.ObFeeIndexProject obFeeIndexProject;
	protected com.ulane.base.model.xitong.UlEmployee  ulEmployee ;
	protected String feeValue;                     
	protected String userNam;                      
	protected String userNo;
	protected String depNam;                        //部门名称
	protected java.math.BigDecimal touTouLv;        //金额妥投率
	protected java.math.BigDecimal youXiaoJinE;     //有效金额
	protected double dstuotoulv;                    //单数妥投率
	protected double chengjiaolv;                   //完成率
	protected String jidu;                          //季度
	protected Long jieanshu;						//结案数
	protected java.math.BigDecimal yongjin;			//佣金
	protected int kehujieanshu;                     //客户结案数
	protected double daxiaolv;						//搭销率
	protected String  zhibiaoxiang;					//指标项
	protected java.math.BigDecimal mubiaozhi;		//目标值
	protected java.math.BigDecimal wanchengliang;	//完成量
	protected java.math.BigDecimal wanchenglv;		//完成率
	protected String zhibiaoNam;					//指标名
	
	public String getZhibiaoNam() {
		return zhibiaoNam;
	}
	public void setZhibiaoNam(String zhibiaoNam) {
		this.zhibiaoNam = zhibiaoNam;
	}
	public static final String ZHIBIAOXIANG_XIAOSHOUE      = "销售额";	
	public static final String ZHIBIAOXIANG_DINGDANCOUNT      = "有效订单数";	
	public static final String ZHIBIAOXIANG_JIEANSHU     = "结案客户数";	
	public static final String ZHIBIAOXIANG_DINGDANXXE     = "订单销售额";	
	
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
	public java.math.BigDecimal getWanchenglv() {
		return wanchenglv;
	}
	public void setWanchenglv(java.math.BigDecimal wanchenglv) {
		this.wanchenglv = wanchenglv;
	}
	public double getDaxiaolv() {
		return daxiaolv;
	}
	public void setDaxiaolv(double daxiaolv) {
		this.daxiaolv = daxiaolv;
	}
	public int getKehujieanshu() {
		return kehujieanshu;
	}
	public void setKehujieanshu(int kehujieanshu) {
		this.kehujieanshu = kehujieanshu;
	}
	public Long getJieanshu() {
		return jieanshu;
	}
	public void setJieanshu(Long jieanshu) {
		this.jieanshu = jieanshu;
	}
	public java.math.BigDecimal getYongjin() {
		return yongjin;
	}
	public void setYongjin(java.math.BigDecimal yongjin) {
		this.yongjin = yongjin;
	}
	public String getJidu() {
		return jidu;
	}
	public void setJidu(String jidu) {
		this.jidu = jidu;
	}
	public double getDstuotoulv() {
		return dstuotoulv;
	}
	public void setDstuotoulv(double dstuotoulv) {
		this.dstuotoulv = dstuotoulv;
	}
	public double getChengjiaolv() {
		return chengjiaolv;
	}
	public void setChengjiaolv(double chengjiaolv) {
		this.chengjiaolv = chengjiaolv;
	}
	public java.math.BigDecimal getYouXiaoJinE() {
		return youXiaoJinE;
	}
	public void setYouXiaoJinE(java.math.BigDecimal youXiaoJinE) {
		this.youXiaoJinE = youXiaoJinE;
	}
	public java.math.BigDecimal getTouTouLv() {
		return touTouLv;
	}
	public void setTouTouLv(java.math.BigDecimal touTouLv) {
		this.touTouLv = touTouLv;
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
	@Override
	public String toString() {
		return "ObFeeSelect [amount=" + amount + ", changedAmount="
				+ changedAmount + ", chengjiaolv=" + chengjiaolv
				+ ", comments=" + comments + ", createBy=" + createBy
				+ ", createDate=" + createDate + ", daxiaolv=" + daxiaolv
				+ ", depNam=" + depNam + ", dstuotoulv=" + dstuotoulv
				+ ", feeId=" + feeId + ", feeValue=" + feeValue + ", jidu="
				+ jidu + ", jieanshu=" + jieanshu + ", kehujieanshu="
				+ kehujieanshu + ", month=" + month + ", mubiaozhi="
				+ mubiaozhi + ", obFeeIndexProject=" + obFeeIndexProject
				+ ", quarter=" + quarter + ", staId=" + staId + ", touTouLv="
				+ touTouLv + ", ulEmployee=" + ulEmployee + ", updateBy="
				+ updateBy + ", updateDate=" + updateDate + ", userNam="
				+ userNam + ", userNo=" + userNo + ", wanchengliang="
				+ wanchengliang + ", wanchenglv=" + wanchenglv + ", yongjin="
				+ yongjin + ", youXiaoJinE=" + youXiaoJinE + ", zhibiaoNam="
				+ zhibiaoNam + ", zhibiaoxiang=" + zhibiaoxiang + "]";
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((amount == null) ? 0 : amount.hashCode());
		result = prime * result
				+ ((changedAmount == null) ? 0 : changedAmount.hashCode());
		long temp;
		temp = Double.doubleToLongBits(chengjiaolv);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result
				+ ((comments == null) ? 0 : comments.hashCode());
		result = prime * result
				+ ((createBy == null) ? 0 : createBy.hashCode());
		result = prime * result
				+ ((createDate == null) ? 0 : createDate.hashCode());
		temp = Double.doubleToLongBits(daxiaolv);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((depNam == null) ? 0 : depNam.hashCode());
		temp = Double.doubleToLongBits(dstuotoulv);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((feeId == null) ? 0 : feeId.hashCode());
		result = prime * result
				+ ((feeValue == null) ? 0 : feeValue.hashCode());
		result = prime * result + ((jidu == null) ? 0 : jidu.hashCode());
		result = prime * result
				+ ((jieanshu == null) ? 0 : jieanshu.hashCode());
		result = prime * result + kehujieanshu;
		result = prime * result + ((month == null) ? 0 : month.hashCode());
		result = prime * result
				+ ((mubiaozhi == null) ? 0 : mubiaozhi.hashCode());
		result = prime
				* result
				+ ((obFeeIndexProject == null) ? 0 : obFeeIndexProject
						.hashCode());
		result = prime * result + ((quarter == null) ? 0 : quarter.hashCode());
		result = prime * result + ((staId == null) ? 0 : staId.hashCode());
		result = prime * result
				+ ((touTouLv == null) ? 0 : touTouLv.hashCode());
		result = prime * result
				+ ((ulEmployee == null) ? 0 : ulEmployee.hashCode());
		result = prime * result
				+ ((updateBy == null) ? 0 : updateBy.hashCode());
		result = prime * result
				+ ((updateDate == null) ? 0 : updateDate.hashCode());
		result = prime * result + ((userNam == null) ? 0 : userNam.hashCode());
		result = prime * result + ((userNo == null) ? 0 : userNo.hashCode());
		result = prime * result
				+ ((wanchengliang == null) ? 0 : wanchengliang.hashCode());
		result = prime * result
				+ ((wanchenglv == null) ? 0 : wanchenglv.hashCode());
		result = prime * result + ((yongjin == null) ? 0 : yongjin.hashCode());
		result = prime * result
				+ ((youXiaoJinE == null) ? 0 : youXiaoJinE.hashCode());
		result = prime * result
				+ ((zhibiaoNam == null) ? 0 : zhibiaoNam.hashCode());
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
		ObFeeSelect other = (ObFeeSelect) obj;
		if (amount == null) {
			if (other.amount != null)
				return false;
		} else if (!amount.equals(other.amount))
			return false;
		if (changedAmount == null) {
			if (other.changedAmount != null)
				return false;
		} else if (!changedAmount.equals(other.changedAmount))
			return false;
		if (Double.doubleToLongBits(chengjiaolv) != Double
				.doubleToLongBits(other.chengjiaolv))
			return false;
		if (comments == null) {
			if (other.comments != null)
				return false;
		} else if (!comments.equals(other.comments))
			return false;
		if (createBy == null) {
			if (other.createBy != null)
				return false;
		} else if (!createBy.equals(other.createBy))
			return false;
		if (createDate == null) {
			if (other.createDate != null)
				return false;
		} else if (!createDate.equals(other.createDate))
			return false;
		if (Double.doubleToLongBits(daxiaolv) != Double
				.doubleToLongBits(other.daxiaolv))
			return false;
		if (depNam == null) {
			if (other.depNam != null)
				return false;
		} else if (!depNam.equals(other.depNam))
			return false;
		if (Double.doubleToLongBits(dstuotoulv) != Double
				.doubleToLongBits(other.dstuotoulv))
			return false;
		if (feeId == null) {
			if (other.feeId != null)
				return false;
		} else if (!feeId.equals(other.feeId))
			return false;
		if (feeValue == null) {
			if (other.feeValue != null)
				return false;
		} else if (!feeValue.equals(other.feeValue))
			return false;
		if (jidu == null) {
			if (other.jidu != null)
				return false;
		} else if (!jidu.equals(other.jidu))
			return false;
		if (jieanshu == null) {
			if (other.jieanshu != null)
				return false;
		} else if (!jieanshu.equals(other.jieanshu))
			return false;
		if (kehujieanshu != other.kehujieanshu)
			return false;
		if (month == null) {
			if (other.month != null)
				return false;
		} else if (!month.equals(other.month))
			return false;
		if (mubiaozhi == null) {
			if (other.mubiaozhi != null)
				return false;
		} else if (!mubiaozhi.equals(other.mubiaozhi))
			return false;
		if (obFeeIndexProject == null) {
			if (other.obFeeIndexProject != null)
				return false;
		} else if (!obFeeIndexProject.equals(other.obFeeIndexProject))
			return false;
		if (quarter == null) {
			if (other.quarter != null)
				return false;
		} else if (!quarter.equals(other.quarter))
			return false;
		if (staId == null) {
			if (other.staId != null)
				return false;
		} else if (!staId.equals(other.staId))
			return false;
		if (touTouLv == null) {
			if (other.touTouLv != null)
				return false;
		} else if (!touTouLv.equals(other.touTouLv))
			return false;
		if (ulEmployee == null) {
			if (other.ulEmployee != null)
				return false;
		} else if (!ulEmployee.equals(other.ulEmployee))
			return false;
		if (updateBy == null) {
			if (other.updateBy != null)
				return false;
		} else if (!updateBy.equals(other.updateBy))
			return false;
		if (updateDate == null) {
			if (other.updateDate != null)
				return false;
		} else if (!updateDate.equals(other.updateDate))
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
		if (wanchengliang == null) {
			if (other.wanchengliang != null)
				return false;
		} else if (!wanchengliang.equals(other.wanchengliang))
			return false;
		if (wanchenglv == null) {
			if (other.wanchenglv != null)
				return false;
		} else if (!wanchenglv.equals(other.wanchenglv))
			return false;
		if (yongjin == null) {
			if (other.yongjin != null)
				return false;
		} else if (!yongjin.equals(other.yongjin))
			return false;
		if (youXiaoJinE == null) {
			if (other.youXiaoJinE != null)
				return false;
		} else if (!youXiaoJinE.equals(other.youXiaoJinE))
			return false;
		if (zhibiaoNam == null) {
			if (other.zhibiaoNam != null)
				return false;
		} else if (!zhibiaoNam.equals(other.zhibiaoNam))
			return false;
		if (zhibiaoxiang == null) {
			if (other.zhibiaoxiang != null)
				return false;
		} else if (!zhibiaoxiang.equals(other.zhibiaoxiang))
			return false;
		return true;
	}
	public Long getFeeId() {
		return feeId;
	}
	public void setFeeId(Long feeId) {
		this.feeId = feeId;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getQuarter() {
		return quarter;
	}
	public void setQuarter(String quarter) {
		this.quarter = quarter;
	}
	public java.math.BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(java.math.BigDecimal amount) {
		this.amount = amount;
	}
	public Long getCreateBy() {
		return createBy;
	}
	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}
	public Long getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	public java.util.Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}
	public java.util.Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(java.util.Date updateDate) {
		this.updateDate = updateDate;
	}
	public java.math.BigDecimal getChangedAmount() {
		return changedAmount;
	}
	public void setChangedAmount(java.math.BigDecimal changedAmount) {
		this.changedAmount = changedAmount;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public Short getStaId() {
		return staId;
	}
	public void setStaId(Short staId) {
		this.staId = staId;
	}
	public com.ulane.customer.model.fee.ObFeeIndexProject getObFeeIndexProject() {
		return obFeeIndexProject;
	}
	public void setObFeeIndexProject(
			com.ulane.customer.model.fee.ObFeeIndexProject obFeeIndexProject) {
		this.obFeeIndexProject = obFeeIndexProject;
	}
	public com.ulane.base.model.xitong.UlEmployee getUlEmployee() {
		return ulEmployee;
	}
	public void setUlEmployee(com.ulane.base.model.xitong.UlEmployee ulEmployee) {
		this.ulEmployee = ulEmployee;
	}
	public String getFeeValue() {
		return feeValue;
	}
	public void setFeeValue(String feeValue) {
		this.feeValue = feeValue;
	}





}
