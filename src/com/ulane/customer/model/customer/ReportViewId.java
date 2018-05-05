package com.ulane.customer.model.customer;

//import java.beans.Transient;
import java.io.Serializable;

/**
 * 报表数据字段属性
 * Date 2014/01/15
 * @author Mr.Hu
 *
 */
@SuppressWarnings("serial")
public class ReportViewId implements Serializable {
	//.....此处省略一个ID主键
	//private Long id;  
	
	private String loginname; 	     //座席名
	
	private Long endinboundcount;	 //接听电话个数
	
	private Long avaqueuecalltime;  //平均电话等待时长
	
	private Long xmiaosucccount;     //8X秒后成功接听数
	
	private Long queuecount;        //转接数
	
	private Long inboundtime;        //呼入通话时长
	
	private Long avagecalltime;      //呼入平均通话时长
	
	private String afterworktime;     //呼入跟进时长
	
	private Long avageafterworktime;  //呼入平均跟进时长
	
	private String kongxiantime;      //空闲时长
	
	//private String dates;        //日期
	
//	private String bothtime;    //时间段
//	
//	private Long bothtimetype;  //时间段类型
	
	private String leavetime;   //离开时间
	
	private String lsworktime;  //临时工作时间
	
	private String meetingtime;  //就餐时间
	
	private String managertime;  //管理时间
	
	private String traintime;    //培训时间
	
	private String nologintime;    //未登录时间
	
	private String liyonglv;  	//利用率
	
	private String zongliyonglv;  	//总利用率
	
	private String keyonglv;	//可用率
	
	private Long unansweredcount;  //放弃数
	
	private String endinboundcountlv;	//成功接听率

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public Long getEndinboundcount() {
		return endinboundcount;
	}

	public void setEndinboundcount(Long endinboundcount) {
		this.endinboundcount = endinboundcount;
	}

	public Long getInboundtime() {
		return inboundtime;
	}

	public void setInboundtime(Long inboundtime) {
		this.inboundtime = inboundtime;
	}

	public Long getAvagecalltime() {
		return avagecalltime;
	}

	public void setAvagecalltime(Long avagecalltime) {
		this.avagecalltime = avagecalltime;
	}

	public String getAfterworktime() {
		return afterworktime;
	}

	public void setAfterworktime(String afterworktime) {
		this.afterworktime = afterworktime;
	}

	public Long getAvageafterworktime() {
		return avageafterworktime;
	}

	public void setAvageafterworktime(Long avageafterworktime) {
		this.avageafterworktime = avageafterworktime;
	}

	public String getKongxiantime() {
		return kongxiantime;
	}

	public void setKongxiantime(String kongxiantime) {
		this.kongxiantime = kongxiantime;
	}

//	public String getDates() {
//		return dates;
//	}
//
//	public void setDates(String dates) {
//		this.dates = dates;
//	}
//	@Transient
//	public String getBothtime() {
//		return bothtime;
//	}
//
//	public void setBothtime(String bothtime) {
//		this.bothtime = bothtime;
//	}
//	@Transient
//	public Long getBothtimetype() {
//		return bothtimetype;
//	}
//	
//	public void setBothtimetype(Long bothtimetype) {
//		this.bothtimetype = bothtimetype;
//	}

	public String getLeavetime() {
		return leavetime;
	}

	public void setLeavetime(String leavetime) {
		this.leavetime = leavetime;
	}

	public String getLsworktime() {
		return lsworktime;
	}

	public void setLsworktime(String lsworktime) {
		this.lsworktime = lsworktime;
	}

	public String getMeetingtime() {
		return meetingtime;
	}

	public void setMeetingtime(String meetingtime) {
		this.meetingtime = meetingtime;
	}

	public String getManagertime() {
		return managertime;
	}

	public void setManagertime(String managertime) {
		this.managertime = managertime;
	}

	public String getTraintime() {
		return traintime;
	}

	public void setTraintime(String traintime) {
		this.traintime = traintime;
	}

	public String getLiyonglv() {
		return liyonglv;
	}

	public void setLiyonglv(String liyonglv) {
		this.liyonglv = liyonglv;
	}

	public String getZongliyonglv() {
		return zongliyonglv;
	}

	public void setZongliyonglv(String zongliyonglv) {
		this.zongliyonglv = zongliyonglv;
	}

	public String getKeyonglv() {
		return keyonglv;
	}

	public void setKeyonglv(String keyonglv) {
		this.keyonglv = keyonglv;
	}

	public Long getUnansweredcount() {
		return unansweredcount;
	}

	public void setUnansweredcount(Long unansweredcount) {
		this.unansweredcount = unansweredcount;
	}

	public String getEndinboundcountlv() {
		return endinboundcountlv;
	}

	public void setEndinboundcountlv(String endinboundcountlv) {
		this.endinboundcountlv = endinboundcountlv;
	}

	public Long getAvaqueuecalltime() {
		return avaqueuecalltime;
	}

	public void setAvaqueuecalltime(Long avaqueuecalltime) {
		this.avaqueuecalltime = avaqueuecalltime;
	}

	public Long getXmiaosucccount() {
		return xmiaosucccount;
	}

	public void setXmiaosucccount(Long xmiaosucccount) {
		this.xmiaosucccount = xmiaosucccount;
	}

	public Long getQueuecount() {
		return queuecount;
	}

	public void setQueuecount(Long queuecount) {
		this.queuecount = queuecount;
	}

	public String getNologintime() {
		return nologintime;
	}

	public void setNologintime(String nologintime) {
		this.nologintime = nologintime;
	}
	
	
		
}
