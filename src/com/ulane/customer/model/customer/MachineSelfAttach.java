package com.ulane.customer.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 * @author cf0666@gmail.com
 *
 */

/**
 * ConHis Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
@SuppressWarnings("serial")
public class MachineSelfAttach extends com.htsoft.core.model.BaseModel {
	
    protected Long msattachid; //id
    
    protected String filetype; //文件类型
    
    protected String filepath; //文件路径
    
    protected String createtime;  //创建时间
    
    protected String machineSelfid; //联络记录
    
    //protected String dealnum;   //业务流水号
    
	public Long getMsattachid() {
		return msattachid;
	}

	public void setMsattachid(Long msattachid) {
		this.msattachid = msattachid;
	}

	public String getFilepath() {
		return filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

	public String getCreatetime() {
		return createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}

	public String getFiletype() {
		return filetype;
	}

	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}

	public String getMachineSelfid() {
		return machineSelfid;
	}

	public void setMachineSelfid(String machineSelfid) {
		this.machineSelfid = machineSelfid;
	}

//	public String getDealnum() {
//		return dealnum;
//	}
//
//	public void setDealnum(String dealnum) {
//		this.dealnum = dealnum;
//	}

    
    
}
