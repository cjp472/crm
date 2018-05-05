package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.text.ParseException;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.DateUtil;
import com.ulane.callout.dao.outb.ObSaletaskBoDao;
import com.ulane.callout.model.outb.ObSaletaskBo;
import com.ulane.callout.service.outb.ObSaletaskBoService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObSaletaskBoServiceImpl extends BaseServiceImpl<ObSaletaskBo> implements ObSaletaskBoService{
	@SuppressWarnings("unused")
	private ObSaletaskBoDao dao;
	
	public ObSaletaskBoServiceImpl(ObSaletaskBoDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public ObSaletaskBo saveBoBySummary(Map<String, String> param) {
		ObSaletaskBo bo = new ObSaletaskBo();
		bo.setSaletaskId(Long.parseLong(param.get("taskId")));	  	//营销任务内码
		if(StringUtils.isNotBlank(param.get("booTim"))) {
			try {
				bo.setBooTim(DateUtil.parse(param.get("booTim"),"yyyy-MM-dd"));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}

		if(StringUtils.isNotBlank(param.get("conCusId"))) {
			bo.setConCusId(Long.parseLong(param.get("conCusId")));
		}
		if(StringUtils.isNotBlank(param.get("tasMetId"))) {
			bo.setTasMetId(Short.parseShort(param.get("tasMetId")));
		}
		bo.setConNumber(param.get("conNumber"));
		bo.setRemark(param.get("remark"));
		bo.setBooStaId(ObSaletaskBo.BOO_STA_UNDO);
		return dao.save(bo);
	}

}