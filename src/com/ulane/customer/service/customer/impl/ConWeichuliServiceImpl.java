package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import javax.annotation.Resource;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.customer.dao.customer.ConWeichuliDao;
import com.ulane.customer.model.customer.ConLanjie;
import com.ulane.customer.model.customer.ConWeichuli;
import com.ulane.customer.service.customer.ConLanjieService;
import com.ulane.customer.service.customer.ConWeichuliService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConWeichuliServiceImpl extends BaseServiceImpl<ConWeichuli> implements ConWeichuliService{
	@SuppressWarnings("unused")
	private ConWeichuliDao dao;
	@Resource
	private ConLanjieService conLanjieService;
	public ConWeichuliServiceImpl(ConWeichuliDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public boolean moveToConWeichuli(String[] ids,String lanjieMove,String dealResId,String dealRemarks){
		for(String id : ids){
			ConLanjie conLanjie = conLanjieService.get(new Long(id));
			ConWeichuli conWeichuli = new ConWeichuli();
			conWeichuli.setSrcTypeId(conLanjie.getSrcTypeId());
			conWeichuli.setDirId(conLanjie.getDirId());
			conWeichuli.setContactTypeId(conLanjie.getContactTypeId());
			conWeichuli.setPreContactNum(conLanjie.getPreContactNum());
			conWeichuli.setMainContactNum(conLanjie.getMainContactNum());
			conWeichuli.setLastContactNum(conLanjie.getLastContactNum());
			conWeichuli.setContent(conLanjie.getContent());
			conWeichuli.setCreTime(conLanjie.getInterceptTime());
			conWeichuli.setSynTime(conLanjie.getSynTime());
			if(lanjieMove.equals("lajixiang")){
				conWeichuli.setDealStaId((short)2);
				conWeichuli.setDealResId(Short.parseShort(dealResId));
				conWeichuli.setDealRemarks(dealRemarks);
			}
			if(lanjieMove.equals("weichuli")){
				conWeichuli.setDealStaId((short)1);
			}
			ConWeichuli weichuli = dao.save(conWeichuli);//将转移的记录保存到未处理中
			
			//设置拦截记录为转移状态
			conLanjie.setIsMove((short)1);
			ConLanjie lanjie = conLanjieService.merge(conLanjie);
			if(weichuli!=null&&lanjie!=null){
				return true;
			}
		}
		return false;
	}

}