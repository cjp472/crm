package com.htsoft.oa.action.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */

import java.util.List;

import javax.annotation.Resource;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.io.File;
import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.XmlUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;

import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * @description 附件管理
 * @class FileAttachAction
 * @author cf0666@gmail.com,yhz
 * @company www.ulane.cn
 * @createtime 2011-1-24PM
 * 
 */
public class FileAttachAction extends BaseAction {
	@Resource
	private FileAttachService fileAttachService;
	private FileAttach fileAttach;

	private Long fileId;

	private String filePath;
	
	private Long userId;

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public FileAttach getFileAttach() {
		return fileAttach;
	}

	public void setFileAttach(FileAttach fileAttach) {
		this.fileAttach = fileAttach;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	/**
	 * 查询我上传附件信息
	 */
	public String list() {
		int start = new QueryFilter(getRequest()).getPagingBean().getStart();
		PagingBean pb = new PagingBean(start, 20);
		String imageOrOthersFile = getRequest().getParameter("type");
		boolean bo = true;// 默认file
		if (imageOrOthersFile != null
				&& imageOrOthersFile.toLowerCase().equals("image")) {
			bo = false; // 图片
			pb = new PagingBean(start, 16);
		}
		String fileType = getRequest().getParameter("fileType");
		List<FileAttach> list = fileAttachService.fileList(pb, fileType, bo);
		return listToJson(list, pb);
	};

	public String listAll() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("fileType", "DESC");
		List<FileAttach> list = fileAttachService.getAll(filter);
		return listToJson(list, filter.getPagingBean());
	}

	/**
	 * 批量删除
	 */
	public String multiDel() {
		String ids = getRequest().getParameter("ids");
		if (ids != null) {
			for (String id : ids.split(",")) {
				fileAttachService.remove(new Long(id));
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 */
	public String get() {
		FileAttach fileAttach = fileAttachService.get(fileId);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
				.create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(fileAttach));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		fileAttachService.save(fileAttach);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 根据附件的路径删除附件,用于重复上传图片,或删除图片,已用于员工管理模块
	 */
	public String delete() {
		fileAttachService.removeByPath(filePath);
		return SUCCESS;
	}
	
	/**
	 * @description 将List集合中的数据转化为JSON格式
	 * @param pb
	 *            PagingBean
	 */
	private String listToJson(List<FileAttach> list, PagingBean pb) {
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(pb.getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
		new String[] { "appUser.accessionTime" });
		buff.append(serializer.serialize(list));

		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	// //////////////////////////////////////////////////////////////
	// /////////////////////读取xml文件/////////////////////////////////
	// //////////////////////////////////////////////////////////////
	@SuppressWarnings("unchecked")
	public String treeLoad() {
		String xmlFilePath = AppUtil.getAppAbsolutePath().replace("\\", "/")
		+ "WEB-INF/classes/attach-file.xml";
		StringBuffer sbf = new StringBuffer("");
		sbf.append("[{id:'0',text:'" + AppUtil.getCompanyName()
				+ "',expanded:true,children:[");
		try {
			Document document = XmlUtil.load(xmlFilePath);
			if (document != null) {
				Element root = document.getRootElement();
				List<Element> list = root.elements();
				for (Element el : list) {
					String id = el.attribute("id").getValue();
					String text = el.attribute("text").getValue();
					sbf.append("{id:'" + id).append("',text:'" + text).append("',");
					sbf.append(findChild(el));
				}
				if (list != null && list.size() > 0)
					sbf.deleteCharAt(sbf.length() - 1);
			}
		} catch (Exception e) {
			logger.debug("FileAttachAction中，加载xml文件失败！");
			e.printStackTrace();
		}
		sbf.append("]}]");
		setJsonString(sbf.toString());
		return SUCCESS;
	}

	/**
	 * 获取子节点
	 */
	@SuppressWarnings("unchecked")
	private String findChild(Element el) {
		List<Element> list = el.elements();
		StringBuffer bf = new StringBuffer("");
		if (list == null || list.size() == 0)
			bf.append("leaf:true},");
		else {
			bf.append("children:[");
			for (Element e : list) {
				String id = e.attribute("id").getValue();
				String text = e.attribute("text").getValue();
				bf.append("{id:'" + id).append("',text:'" + text).append("',");
				bf.append(findChild(e));
			}
			bf.deleteCharAt(bf.length() - 1);
			bf.append("]},");
		}
		return bf.toString();
	}
	// ///////////////////xml reader end ////////////////////////////////

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
