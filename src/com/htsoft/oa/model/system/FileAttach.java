package com.htsoft.oa.model.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.htsoft.oa.model.communicate.Mail;

/**
 * @description FileAttach[附件信息]
 * @class FileAttach
 * @author 优创融联科技
 * @updater YHZ
 * @company www.ulane.cn
 * @createtime 2011-1-14AM
 * 
 */
@SuppressWarnings("serial")
public class FileAttach extends com.htsoft.core.model.BaseModel {

	/**
	 * 删除标识,1=已删除
	 */
	public static final Integer FLAG_DEL = 1;

    /**
	 * 删除标识,0=未删除
	 */
	public static final Integer FLAG_NOT_DEL = 0;
	@Expose
	protected Long fileId;
	@Expose
	protected String fileName;
	@Expose
	protected String filePath;
	@Expose
	protected java.util.Date createtime;
	@Expose
	protected String ext;
	@Expose
	protected String fileType;
	@Expose
	protected String note;
	@Expose
	protected String creator;
	
	@Expose
	protected Long creatorId;
	@Expose
	protected Long totalBytes;
	@Expose
	protected Integer delFlag;
	
	@Expose
	protected AppUser appUser;						//新建字段  上传者对象.
	protected Set<Mail> mails = new HashSet<Mail>();	

    /**
	 * Default Empty Constructor for class FileAttach
	 */
	public FileAttach() {
		super();
	}

    public Set<Mail> getMails() {
        return mails;
    }

    public void setMails(Set<Mail> mails) {
        this.mails = mails;
    }
	/**
	 * Default Key Fields Constructor for class FileAttach
	 */
	public FileAttach(Long in_fileId) {
		this.setFileId(in_fileId);
	}

	/**
	 * * @return Long
	 * 
	 * @hibernate.id column="fileId" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getFileId() {
		return this.fileId;
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	/**
	 * Set the fileId
	 */
	public void setFileId(Long aValue) {
		this.fileId = aValue;
	}

	/**
	 * 文件名 * @return String
	 * 
	 * @hibernate.property column="fileName" type="java.lang.String"
	 *                     length="128" not-null="true" unique="false"
	 */
	public String getFileName() {
		return this.fileName;
	}

	/**
	 * Set the fileName
	 * 
	 * @spring.validator type="required"
	 */
	public void setFileName(String aValue) {
		this.fileName = aValue;
	}

	/**
	 * 文件路径 * @return String
	 * 
	 * @hibernate.property column="filePath" type="java.lang.String"
	 *                     length="128" not-null="true" unique="false"
	 */
	public String getFilePath() {
		return this.filePath;
	}

	/**
	 * Set the filePath
	 * 
	 * @spring.validator type="required"
	 */
	public void setFilePath(String aValue) {
		this.filePath = aValue;
	}

	/**
	 * 创建时间 * @return java.util.Date
	 * 
	 * @hibernate.property column="createtime" type="java.util.Date" length="19"
	 *                     not-null="true" unique="false"
	 */
	public java.util.Date getCreatetime() {
		return this.createtime;
	}

	/**
	 * Set the createtime
	 * 
	 * @spring.validator type="required"
	 */
	public void setCreatetime(java.util.Date aValue) {
		this.createtime = aValue;
	}

	/**
	 * 扩展名 * @return String
	 * 
	 * @hibernate.property column="ext" type="java.lang.String" length="32"
	 *                     not-null="false" unique="false"
	 */
	public String getExt() {
		return this.ext;
	}

	/**
	 * Set the ext
	 */
	public void setExt(String aValue) {
		this.ext = aValue;
	}

	/**
	 * 附件类型 如：邮件附件 * @return String
	 * 
	 * @hibernate.property column="fileType" type="java.lang.String" length="32"
	 *                     not-null="true" unique="false"
	 */
	public String getFileType() {
		return this.fileType;
	}

	/**
	 * Set the type
	 * 
	 * @spring.validator type="required"
	 */
	public void setFileType(String aValue) {
		this.fileType = aValue;
	}

	/**
	 * 说明 * @return String
	 * 
	 * @hibernate.property column="note" type="java.lang.String" length="1024"
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
	 * 上传者 * @return String
	 * 
	 * @hibernate.property column="creator" type="java.lang.String" length="32"
	 *                     not-null="true" unique="false"
	 */
	public String getCreator() {
		return this.creator;
	}

	/**
	 * Set the creator
	 * 
	 * @spring.validator type="required"
	 */
	public void setCreator(String aValue) {
		this.creator = aValue;
	}

	public Long getTotalBytes() {
		return totalBytes;
	}

	public void setTotalBytes(Long totalBytes) {
		this.totalBytes = totalBytes;
	}

	public Integer getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}

	public Long getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FileAttach other = (FileAttach) obj;
		if (appUser == null) {
			if (other.appUser != null)
				return false;
		} else if (!appUser.equals(other.appUser))
			return false;
		if (createtime == null) {
			if (other.createtime != null)
				return false;
		} else if (!createtime.equals(other.createtime))
			return false;
		if (creator == null) {
			if (other.creator != null)
				return false;
		} else if (!creator.equals(other.creator))
			return false;
		if (creatorId == null) {
			if (other.creatorId != null)
				return false;
		} else if (!creatorId.equals(other.creatorId))
			return false;
		if (delFlag == null) {
			if (other.delFlag != null)
				return false;
		} else if (!delFlag.equals(other.delFlag))
			return false;
		if (ext == null) {
			if (other.ext != null)
				return false;
		} else if (!ext.equals(other.ext))
			return false;
		if (fileId == null) {
			if (other.fileId != null)
				return false;
		} else if (!fileId.equals(other.fileId))
			return false;
		if (fileName == null) {
			if (other.fileName != null)
				return false;
		} else if (!fileName.equals(other.fileName))
			return false;
		if (filePath == null) {
			if (other.filePath != null)
				return false;
		} else if (!filePath.equals(other.filePath))
			return false;
		if (fileType == null) {
			if (other.fileType != null)
				return false;
		} else if (!fileType.equals(other.fileType))
			return false;
		if (note == null) {
			if (other.note != null)
				return false;
		} else if (!note.equals(other.note))
			return false;
		if (totalBytes == null) {
			if (other.totalBytes != null)
				return false;
		} else if (!totalBytes.equals(other.totalBytes))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((appUser == null) ? 0 : appUser.hashCode());
		result = prime * result
				+ ((createtime == null) ? 0 : createtime.hashCode());
		result = prime * result + ((creator == null) ? 0 : creator.hashCode());
		result = prime * result
				+ ((creatorId == null) ? 0 : creatorId.hashCode());
		result = prime * result + ((delFlag == null) ? 0 : delFlag.hashCode());
		result = prime * result + ((ext == null) ? 0 : ext.hashCode());
		result = prime * result + ((fileId == null) ? 0 : fileId.hashCode());
		result = prime * result
				+ ((fileName == null) ? 0 : fileName.hashCode());
		result = prime * result
				+ ((filePath == null) ? 0 : filePath.hashCode());
		result = prime * result
				+ ((fileType == null) ? 0 : fileType.hashCode());
		result = prime * result + ((note == null) ? 0 : note.hashCode());
		result = prime * result
				+ ((totalBytes == null) ? 0 : totalBytes.hashCode());
		return result;
	}

	@Override
	public String toString() {
		return "FileAttach [appUser=" + appUser + ", createtime=" + createtime
				+ ", creator=" + creator + ", creatorId=" + creatorId
				+ ", delFlag=" + delFlag + ", ext=" + ext + ", fileId="
				+ fileId + ", fileName=" + fileName + ", filePath=" + filePath
				+ ", fileType=" + fileType + ", note=" + note + ", totalBytes="
				+ totalBytes + "]";
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "fileId";
	}

	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	public Long getId() {
		return fileId;
	}

}
