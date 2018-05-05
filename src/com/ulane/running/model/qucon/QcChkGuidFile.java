package com.ulane.running.model.qucon;
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
 * QcChkGuidFile Base Java Bean, base class for the.base.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class QcChkGuidFile extends com.htsoft.core.model.BaseModel {

    protected Long fileId;
	protected String url;
	protected String uploadFileName;
	protected String systemFileName;
	protected String fileSuffix;
	protected String fileSize;
	protected String createTime;
	protected Short staId;
	protected com.ulane.running.model.qucon.QcChkGuid qcChkGuid;


	/**
	 * Default Empty Constructor for class QcChkGuidFile
	 */
	public QcChkGuidFile () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class QcChkGuidFile
	 */
	public QcChkGuidFile (
		 Long in_fileId
        ) {
		this.setFileId(in_fileId);
    }

	
	public com.ulane.running.model.qucon.QcChkGuid getQcChkGuid () {
		return qcChkGuid;
	}	
	
	public void setQcChkGuid (com.ulane.running.model.qucon.QcChkGuid in_qcChkGuid) {
		this.qcChkGuid = in_qcChkGuid;
	}
    

	/**
	 * 文件ID	 * @return Long
     * @hibernate.id column="FILE_ID" type="java.lang.Long" generator-class="native"
	 */
	public Long getFileId() {
		return this.fileId;
	}
	
	/**
	 * Set the fileId
	 */	
	public void setFileId(Long aValue) {
		this.fileId = aValue;
	}	

	/**
	 * 考核辅导内码	 * @return Long
	 */
	public Long getChkGuidId() {
		return this.getQcChkGuid()==null?null:this.getQcChkGuid().getChkGuidId();
	}
	
	/**
	 * Set the chkGuidId
	 */	
	public void setChkGuidId(Long aValue) {
	    if (aValue==null) {
	    	qcChkGuid = null;
	    } else if (qcChkGuid == null) {
	        qcChkGuid = new com.ulane.running.model.qucon.QcChkGuid(aValue);
	        qcChkGuid.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
	    	//
			qcChkGuid.setChkGuidId(aValue);
	    }
	}	

	/**
	 * 文件系统路径(从文件服务器根目录开始,不带斜杠)	 * @return String
	 * @hibernate.property column="URL" type="java.lang.String" length="1024" not-null="true" unique="false"
	 */
	public String getUrl() {
		return this.url;
	}
	
	/**
	 * Set the url
	 * @spring.validator type="required"
	 */	
	public void setUrl(String aValue) {
		this.url = aValue;
	}	

	/**
	 * 文件上传名称	 * @return String
	 * @hibernate.property column="UPLOAD_FILE_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getUploadFileName() {
		return this.uploadFileName;
	}
	
	/**
	 * Set the uploadFileName
	 * @spring.validator type="required"
	 */	
	public void setUploadFileName(String aValue) {
		this.uploadFileName = aValue;
	}	

	/**
	 * 文件系统保存名称	 * @return String
	 * @hibernate.property column="SYSTEM_FILE_NAME" type="java.lang.String" length="256" not-null="true" unique="false"
	 */
	public String getSystemFileName() {
		return this.systemFileName;
	}
	
	/**
	 * Set the systemFileName
	 * @spring.validator type="required"
	 */	
	public void setSystemFileName(String aValue) {
		this.systemFileName = aValue;
	}	

	/**
	 * 文件后缀，如pdf、jpg、gif、doc等	 * @return String
	 * @hibernate.property column="FILE_SUFFIX" type="java.lang.String" length="10" not-null="false" unique="false"
	 */
	public String getFileSuffix() {
		return this.fileSuffix;
	}
	
	/**
	 * Set the fileSuffix
	 */	
	public void setFileSuffix(String aValue) {
		this.fileSuffix = aValue;
	}	

	/**
	 * 文件大小(bt)	 * @return String
	 * @hibernate.property column="FILE_SIZE" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getFileSize() {
		return this.fileSize;
	}
	
	/**
	 * Set the fileSize
	 */	
	public void setFileSize(String aValue) {
		this.fileSize = aValue;
	}	

	/**
	 * 创建时间 YYYY-MM-DD hh:mm:ss	 * @return String
	 * @hibernate.property column="CREATE_TIME" type="java.lang.String" length="20" not-null="false" unique="false"
	 */
	public String getCreateTime() {
		return this.createTime;
	}
	
	/**
	 * Set the createTime
	 */	
	public void setCreateTime(String aValue) {
		this.createTime = aValue;
	}	

	/**
	 * 状态：有效 无效	 * @return Short
	 * @hibernate.property column="STA_ID" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStaId() {
		return this.staId;
	}
	
	/**
	 * Set the staId
	 * @spring.validator type="required"
	 */	
	public void setStaId(Short aValue) {
		this.staId = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof QcChkGuidFile)) {
			return false;
		}
		QcChkGuidFile rhs = (QcChkGuidFile) object;
		return new EqualsBuilder()
				.append(this.fileId, rhs.fileId)
						.append(this.url, rhs.url)
				.append(this.uploadFileName, rhs.uploadFileName)
				.append(this.systemFileName, rhs.systemFileName)
				.append(this.fileSuffix, rhs.fileSuffix)
				.append(this.fileSize, rhs.fileSize)
				.append(this.createTime, rhs.createTime)
				.append(this.staId, rhs.staId)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.fileId) 
						.append(this.url) 
				.append(this.uploadFileName) 
				.append(this.systemFileName) 
				.append(this.fileSuffix) 
				.append(this.fileSize) 
				.append(this.createTime) 
				.append(this.staId) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("fileId", this.fileId) 
						.append("url", this.url) 
				.append("uploadFileName", this.uploadFileName) 
				.append("systemFileName", this.systemFileName) 
				.append("fileSuffix", this.fileSuffix) 
				.append("fileSize", this.fileSize) 
				.append("createTime", this.createTime) 
				.append("staId", this.staId) 
				.toString();
	}



}
