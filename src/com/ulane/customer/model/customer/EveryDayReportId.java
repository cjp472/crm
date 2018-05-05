package com.ulane.customer.model.customer;

import java.io.Serializable;



/**
 * 系统日报表数据字段属性
 * Date 2014/01/20
 * @author Mr.Hu
 * update time： 2014/04/21
 */
@SuppressWarnings("serial")
public class EveryDayReportId implements Serializable {
	
	//private Long id;
	
	private String bothtime;     //时间段范围
	
	private Long datetimeType;   //时间段范围类型   int
	
	private Long logincount;     //该半小时登录过的座席数
	
	private String dates;			 //日期
	
	private Long endinboundcount;    //呼入数
	
	private String fwshuiping;       //服务水平
	
	private Long queueendcallcount; //QUEUEENDCALLCOUNT;\ 成功接听数
	
	private Long avaafterworktime;  //平均跟进时长
	
	private String succendinbountcall; //成功接听率
	
	private String averagecalltime;	//平均通话时长
	
	private String liyonglv;       //利用率
	
	private String keyonglv;	   //可用率
	
	private Long avaqueuetime;      //队列平均等待时长
	
	private Long maxqueuetime;      //队列最大等待时长
	
	private Long sixtyreturn;      //60秒返回首页数
	
	//...  暂时差含15 和 不含15 的字段
	//private String infifteen;       	    //15秒内
	
	//private String outfifteen;			// 15秒外

//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
	
	public Long getLogincount() {
		return logincount;
	}

	public void setLogincount(Long logincount) {
		this.logincount = logincount;
	}
	
	public String getDates() {
		return dates;
	}

	public void setDates(String dates) {
		this.dates = dates;
	}

	public Long getEndinboundcount() {
		return endinboundcount;
	}

	public void setEndinboundcount(Long endinboundcount) {
		this.endinboundcount = endinboundcount;
	}

	public String getBothtime() {
		return bothtime;
	}

	public void setBothtime(String bothtime) {
		this.bothtime = bothtime;
	}

	public Long getDatetimeType() {
		return datetimeType;
	}

	public void setDatetimeType(Long datetimeType) {
		this.datetimeType = datetimeType;
	}

	public String getFwshuiping() {
		return fwshuiping;
	}

	public void setFwshuiping(String fwshuiping) {
		this.fwshuiping = fwshuiping;
	}

	public Long getAvaafterworktime() {
		return avaafterworktime;
	}

	public void setAvaafterworktime(Long avaafterworktime) {
		this.avaafterworktime = avaafterworktime;
	}

	public String getLiyonglv() {
		return liyonglv;
	}

	public void setLiyonglv(String liyonglv) {
		this.liyonglv = liyonglv;
	}

	public String getKeyonglv() {
		return keyonglv;
	}

	public void setKeyonglv(String keyonglv) {
		this.keyonglv = keyonglv;
	}

	public Long getAvaqueuetime() {
		return avaqueuetime;
	}

	public void setAvaqueuetime(Long avaqueuetime) {
		this.avaqueuetime = avaqueuetime;
	}

	public Long getMaxqueuetime() {
		return maxqueuetime;
	}

	public void setMaxqueuetime(Long maxqueuetime) {
		this.maxqueuetime = maxqueuetime;
	}

	public Long getQueueendcallcount() {
		return queueendcallcount;
	}

	public void setQueueendcallcount(Long queueendcallcount) {
		this.queueendcallcount = queueendcallcount;
	}

	public String getSuccendinbountcall() {
		return succendinbountcall;
	}

	public void setSuccendinbountcall(String succendinbountcall) {
		this.succendinbountcall = succendinbountcall;
	}

	public String getAveragecalltime() {
		return averagecalltime;
	}

	public void setAveragecalltime(String averagecalltime) {
		this.averagecalltime = averagecalltime;
	}

	public Long getSixtyreturn() {
		return sixtyreturn;
	}

	public void setSixtyreturn(Long sixtyreturn) {
		this.sixtyreturn = sixtyreturn;
	}

	
	
}
