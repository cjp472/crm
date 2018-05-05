package com.ulane.customer.model.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;
/**
 * 
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
public class ConAttach extends com.htsoft.core.model.BaseModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	protected Long conAttachId; //内码
//	protected Long conId; //联络记录id
	protected Long fileType; //文件类型 (包括：本地文件、关联数据)
	protected Long fileSource;	//文件来源（包括：录音、视频、pdf、二维码pdf、拍照、签字扫描件、身份证照片）
	protected String filePath;	//文件内容
	protected String createBy;	//创建人
	protected java.util.Date createDate;	//创建时间
	protected String cusName;	//客户名称
	protected String credNum;	//证件号
//	protected String terminalId; //设备号
	
	protected com.ulane.customer.model.customer.ConHis conHis; //联络记录
	/**
	 * Default Empty Constructor for class ConAttach
	 */
	public ConAttach () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ConAttach
	 */
	public ConAttach (
		 Long in_conAttachId
        ) {
		this.setConAttachId(in_conAttachId);
    }
	
	public com.ulane.customer.model.customer.ConHis getConHis() {
		return conHis;
	}

	public void setConHis(com.ulane.customer.model.customer.ConHis conHis) {
		this.conHis = conHis;
	}

	/**
	 * 所属联络记录 * @return Long
	 */
	public Long getConHisId() {
		return this.getConHis()==null?null:this.getConHis().getConHisId();
	}
	
	/**
	 * Set the conHisId
	 */	
	public void setConHisId(Long aValue) {
	    if (aValue==null) {
	    	conHis = null;
	    } else if (conHis == null) {
	    	conHis = new com.ulane.customer.model.customer.ConHis(aValue);
	    	conHis.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	conHis.setConHisId(aValue);
	    }
	}
	
	public Long getConAttachId() {
		return conAttachId;
	}

	public void setConAttachId(Long conAttachId) {
		this.conAttachId = conAttachId;
	}

//	public Long getConId() {
//		return conId;
//	}
//
//	public void setConId(Long conId) {
//		this.conId = conId;
//	}

	public Long getFileType() {
		return fileType;
	}

	public void setFileType(Long fileType) {
		this.fileType = fileType;
	}

	public Long getFileSource() {
		return fileSource;
	}

	public void setFileSource(Long fileSource) {
		this.fileSource = fileSource;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public String getCusName() {
		return cusName;
	}

	public void setCusName(String cusName) {
		this.cusName = cusName;
	}

	public String getCredNum() {
		return credNum;
	}

	public void setCredNum(String credNum) {
		this.credNum = credNum;
	}

//	public String getTerminalId() {
//		return terminalId;
//	}
//
//	public void setTerminalId(String terminalId) {
//		this.terminalId = terminalId;
//	}
	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ConAttach)) {
			return false;
		}
		ConAttach rhs = (ConAttach) object;
		return new EqualsBuilder()
				.append(this.conAttachId, rhs.conAttachId)
				.append(this.createBy, rhs.createBy)
				.append(this.createDate, rhs.createDate)
				.append(this.cusName, rhs.cusName)
				.append(this.credNum, rhs.credNum)
				.append(this.filePath, rhs.filePath)
				.append(this.fileSource, rhs.fileSource)
				.append(this.fileType, rhs.fileType)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.conAttachId)
				.append(this.createBy) 
				.append(this.createDate) 
				.append(this.cusName) 
				.append(this.credNum) 
				.append(this.filePath) 
				.append(this.fileSource) 
				.append(this.fileType)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("conAttachId", this.conAttachId)
				.append("createBy", this.createBy) 
				.append("createDate", this.createDate) 
				.append("cusName", this.cusName) 
				.append("credNum", this.credNum) 
				.append("filePath", this.filePath) 
				.append("fileSource", this.fileSource) 
				.append("fileType", this.fileType)
				.toString();
	}
}
