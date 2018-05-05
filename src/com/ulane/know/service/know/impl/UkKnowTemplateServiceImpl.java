package com.ulane.know.service.know.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.Constants;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.ulane.know.dao.know.UkKnowTemplateDao;
import com.ulane.know.model.know.UkKnowTemplate;
import com.ulane.know.model.know.UkSysKnow;
import com.ulane.know.service.know.UkKnowTemplateService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class UkKnowTemplateServiceImpl extends BaseServiceImpl<UkKnowTemplate>
		implements UkKnowTemplateService {
	@SuppressWarnings("unused")
	private UkKnowTemplateDao dao;
	@Resource
	private UkKnowTemplateService ukKnowTemplateService;

	public UkKnowTemplateServiceImpl(UkKnowTemplateDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public UkKnowTemplate saveUkKnowTemplate(UkKnowTemplate ukKnowTemplate) {
		UkKnowTemplate ukKnowTemplateVersion = new UkKnowTemplate();
		// 默认的版本号
		long ukKnowVersion = 1;
		if (ukKnowTemplate.getKnowTmpId() == null) {
			ukKnowTemplate.setCreateBy(ContextUtil.getCurrentUser()
					.getFamilyName());
			ukKnowTemplate.setIsDelete((long) Constants.FLAG_UNDELETED);
			ukKnowTemplate.setCreateDate(new Date());
			ukKnowTemplate.setKnowVersion(ukKnowVersion);
			ukKnowTemplateService.save(ukKnowTemplate);
		} else {
			UkKnowTemplate orgUkKnowTemplate = ukKnowTemplateService
					.get(ukKnowTemplate.getKnowTmpId());
			try {
				BeanUtil.copyNotNullProperties(orgUkKnowTemplate,
						ukKnowTemplate);
				orgUkKnowTemplate.setKnowVersion(orgUkKnowTemplate
						.getKnowVersion() + 1);
				ukKnowTemplateVersion = ukKnowTemplateService.merge(orgUkKnowTemplate);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}

		}

		return ukKnowTemplateVersion;
	}

	/**
	 * 根据是否删除和key查询
	 * @param isDelete
	 * @param key
	 * @return List
	 * @author zhangyl
	 * @createtime 2012年5月29日 18:21:25
	 */
	@Override
	public List<UkKnowTemplate> getByIsDelete(Long isDelete,String key) {
		return dao.getByIsDelete(isDelete,key);
	}

	/**
	 * 根据模版类型查找 (in)
	 * @param TypeId    (如 : 1,2,3)
	 * @return List<UkKnowTemplate>
	 * @author zhangyl
	 * @createtime 2012年7月5日 16:59:25
	 */
	@Override
	public List<UkKnowTemplate> getByInTypeId(String TypeId) {
		return dao.getByInTypeId(TypeId);
	}

	
	
}