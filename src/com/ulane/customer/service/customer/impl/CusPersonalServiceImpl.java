package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.Constants;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.model.customer.CusLinkman;
import com.htsoft.oa.service.customer.CusLinkmanService;
import com.ulane.customer.dao.customer.CusPersonalDao;
import com.ulane.customer.model.customer.CusContact;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.model.customer.CusSpeEve;
import com.ulane.customer.service.customer.CusContactService;
import com.ulane.customer.service.customer.CusPersonalService;
import com.ulane.customer.service.customer.CusSpeEveService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class CusPersonalServiceImpl extends BaseServiceImpl<CusPersonal> implements CusPersonalService{
	private CusPersonalDao dao;
	@SuppressWarnings("unused")
	@Resource
	private CusPersonalService cusPersonalService;
	@Resource
	private CusSpeEveService cusSpeEveService;
	@Resource
	private CusContactService cusContactService;
	@Resource
	private CusLinkmanService cusLinkmanService;
	
	public CusPersonalServiceImpl(CusPersonalDao dao) {
		super(dao);
		this.dao=dao;
	}
	//根据手机号来判断是否有此客户
	@Override
	public List<CusPersonal> checkNo(String phoneNo) {
		// TODO Auto-generated method stub
		return dao.checkNo(phoneNo);
	}
	@Override
	public String saveWeichuliLingyong(String delLines, String special, CusPersonal cusPersonal) {
		// TODO Auto-generated method stub
		if(cusPersonal.getCustomerId()==null||cusPersonal.getCustomerId().equals("")){
			try {
				cusPersonal.setCreUseId(ContextUtil.getCurrentUser().getUserId());
				cusPersonal.setCreDat(new Date());
				cusPersonal.setHasChecked((short)0);
				cusPersonal.setStaId((short)2);
				cusPersonal.setIsDelete(new Long(Constants.FLAG_UNDELETED));
				cusPersonal.setCustomerName(cusPersonal.getNameCn());
				save(cusPersonal);
			} catch (Exception e) {
				logger.error(e.getMessage());
				return "fail";
			}
		}
		
		//删除去掉的特殊事项
		if(!"".equals(delLines)){
			String delLinesId[]=delLines.split(",");
			for(String ids:delLinesId){
				if(!"".equals(ids)){
					try {
						cusSpeEveService.remove(Long.parseLong(ids));
					} catch (Exception ex) {
						logger.error(ex.getMessage());
						return "fail";
                    }
				}
			}
		}

		//保存特殊事项
        if (org.apache.commons.lang.StringUtils.isNotEmpty(special)) {
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            CusSpeEve[] specialArr = (CusSpeEve[]) gson.fromJson(special, CusSpeEve[].class);
            if (specialArr != null) {
                for (CusSpeEve spl : specialArr) {
                    if (spl.getEveId() == null) {  //新增
                        spl.setCreDat(new Date());
                        spl.setCreUseId(ContextUtil.getCurrentUser().getUserId());
                        spl.setCustomerid(cusPersonal.getCustomerId());
                        spl.setStaId((short)1);
                        cusSpeEveService.save(spl);
                    } else {  //修改
                        CusSpeEve orgSpl = cusSpeEveService.get(spl.getEveId());
                        try {
                            BeanUtil.copyNotNullProperties(orgSpl,spl);
                            orgSpl.setUpdDat(new Date()); // 修改时间
                            cusSpeEveService.save(orgSpl);
                        } catch (Exception ex) {
                            logger.error(ex.getMessage());
                            return "fail";
                        }
                    }
                }
            }
        }
        return "success";
	}
	@Override
	public List<CusPersonal> checkCredNum(String credNum) {
		// TODO Auto-generated method stub
		return dao.checkCredNum(credNum);
	}
	@Override
	public List<CusPersonal> checkByCredAndNo(String credNum, String phoneNo) {
		// TODO Auto-generated method stub
		return dao.checkCredAndNo(credNum, phoneNo);
	}
	@Override
	public String saveCusPer(String details,String linkManLines, String delContactLines,
			String delLinkLines, CusPersonal cusPersonal) {
	    cusPersonal.getCusContacts().clear();
//	    cusPersonal.getCusLinkmans().clear();
//	    cusPersonal.getProjects().clear();
	    cusPersonal.getCusPerComRels().clear();
	    cusPersonal.getCustomerRels().clear();
//	    cusPersonal.getCusConnections().clear();
		//删除去掉的联系方式
		if(!"".equals(delContactLines)){
			String delLinesId[]=delContactLines.split(",");
			for(String ids:delLinesId){
				if(!"".equals(ids)){
					try {
						cusContactService.remove(Long.parseLong(ids));
					} catch (Exception ex) {
						logger.error(ex.getMessage());
						return "fail";
                    }
				}
			}
		}
		//删除去掉的联系人
		if(!"".equals(delLinkLines)){
			String delLinesId[]=delLinkLines.split(",");
			for(String ids:delLinesId){
				if(!"".equals(ids)){
					try {
						cusLinkmanService.remove(Long.parseLong(ids));
					} catch (Exception ex) {
						logger.error(ex.getMessage());
						return "fail";
                    }
				}
			}
		}

        if (org.apache.commons.lang.StringUtils.isNotEmpty(details)) {
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            CusContact[] detailArr = (CusContact[]) gson.fromJson(details, CusContact[].class);
            if (detailArr != null) {
                for (CusContact spl : detailArr) {
                    if (spl.getContactId() == null) {  //新增
                        spl.setCreateTime(new Date());
                        spl.setCustomer(cusPersonal);
                        cusPersonal.getCusContacts().add(spl);
                    } else {  //修改
                        CusContact orgSpl = cusContactService.get(spl.getContactId());
                        try {
                            BeanUtil.copyNotNullProperties(orgSpl,spl);
                            orgSpl.setLastUpdateTime(new Date()); // 修改时间
                            orgSpl.setCustomer(cusPersonal);
                            cusPersonal.getCusContacts().add(orgSpl);
                        } catch (Exception ex) {
                            logger.error(ex.getMessage());
                        }
                    }
                    
                }
            }
        }
        
        if (org.apache.commons.lang.StringUtils.isNotEmpty(linkManLines)) {
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            CusLinkman[] linkManArr = (CusLinkman[]) gson.fromJson(linkManLines, CusLinkman[].class);
            if (linkManArr != null) {
                for (CusLinkman spl : linkManArr) {
                    if (spl.getLinkmanId() == null) {  //新增
                    	spl.setCustomerId(cusPersonal.getCustomerId());
                    	spl.setCreDat(new Date());
                    	spl.setCreUseId(ContextUtil.getCurrentUserId());
                    	cusLinkmanService.save(spl);
                    } else {  //修改
                    	CusLinkman orgCusLinkman = cusLinkmanService.get(spl.getLinkmanId());
                        try {
                            BeanUtil.copyNotNullProperties(orgCusLinkman,spl);
                            cusLinkmanService.save(orgCusLinkman);
                        } catch (Exception ex) {
                            logger.error(ex.getMessage());
                        }
                    }
                }
            }
        }

		if(cusPersonal.getCustomerId()==null){
			cusPersonal.setHasChecked(new Short("0"));
			cusPersonal.setStaId(new Short("0"));
		    cusPersonal.setCreUseId(ContextUtil.getCurrentUser().getUserId());
		    cusPersonal.setCreDat(new Date());
			cusPersonalService.save(cusPersonal);
		}else{
			CusPersonal orgCusPersonal=cusPersonalService.get(cusPersonal.getCustomerId());
			try{
				BeanUtil.copyNotNullProperties(orgCusPersonal, cusPersonal);
				orgCusPersonal.setUpdUseId(ContextUtil.getCurrentUser().getUserId());
				orgCusPersonal.setUpdDat(new Date());
				orgCusPersonal.setIsDelete(new Long(Constants.FLAG_UNDELETED));
				cusPersonalService.save(orgCusPersonal);
			}catch(Exception ex){
			    System.out.println(ex.getMessage());
				logger.error(ex.getMessage());
			}
		}

		return "success";
	}
	@Override
	public CusPersonal findByCustomerNo(String customerNo) {
		// TODO Auto-generated method stub
		return dao.findByCustomerNo(customerNo);
	}
}