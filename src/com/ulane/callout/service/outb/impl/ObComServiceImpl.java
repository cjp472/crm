package com.ulane.callout.service.outb.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.callout.dao.outb.ObComDao;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.service.outb.ObComService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class ObComServiceImpl extends BaseServiceImpl<ObCom> implements
		ObComService {
	@SuppressWarnings("unused")
	private ObComDao dao;

	public ObComServiceImpl(ObComDao dao) {
		super(dao);
		this.dao = dao;
	}

	/**
	 * @author lzm 恢复活动
	 */
	@Override
	public void toRecover(Long comId) {
		if (comId != null) {
			try {
				ObCom com = new ObCom();
				com = dao.get(comId);
				com.setObComStaId(Long.valueOf(ObCom.STATUS_ENABLED));
				dao.save(com);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
	}

	/**
	 * @author lzm 暂停活动
	 */
	@Override
	public void toPause(Long comId) {
		if (comId != null) {
			try {
				ObCom com = dao.get(comId);
				com.setObComStaId(new Long(3));
				dao.save(com);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
	}

	/**
	 * @author lzm 关闭活动
	 * 
	 */
	@Override
	public void toClose(Long comId) {
		if (comId != null) {
			try {
				ObCom com = new ObCom();
				com = dao.get(comId);
				com.setObComStaId(Long.valueOf(ObCom.STATUS_CLOSE));
				dao.save(com);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
	}
	
	/**
	 * @author huchao 判断该活动是否处于status状态
	 */
	@Override
	public boolean isStatusCom(Long comId, Short status) {
		if(null!=comId) {
			ObCom obCom = dao.get(comId);
			if(status.equals(Short.valueOf(String.valueOf(obCom.getObComStaId())))) {
				return true;
			}
		}
		return false;
	}

	@Override
	public List<ObCom> queryObComs(Long projId) {
		if(null!=projId) {
			return dao.queryObComs(projId);
		} else {
			return null;
		}
		
	}


	@Override
	public String queryFilterObComs(PagingBean pagBean,Map<String,String> param) {
		return dao.queryFilterObComs(pagBean,param);
	}

	@Override
	public String queryMaxEndTimeCom(Long projId) {
		return dao.queryMaxEndTimeCom(projId);
	}
	
	@Override
	public CommTable homeDisplayTask(Map<String, String> param) {
		return dao.homeDisplayTask(param);
	}
	
}