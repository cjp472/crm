package com.ulane.base.service.xitong.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.ulane.base.dao.xitong.BmFactorDao;
import com.ulane.base.model.xitong.BmFactor;
import com.ulane.base.service.xitong.BmFactorService;

public class BmFactorServiceImpl extends BaseServiceImpl<BmFactor> implements BmFactorService{
	@SuppressWarnings("unused")
	private BmFactorDao dao;
	
	public BmFactorServiceImpl(BmFactorDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public String getField(int factorId,int billType) {
		// TODO Auto-generated method stub
		String returnValue = "";
		switch(billType){
			case 201://入库成本核算单
				switch(factorId){
					case 1: returnValue="";break;  //来源单据类型
					case 21: returnValue="";break; //存货类型
					case 41: returnValue="";break; //业务员
					case 42: returnValue="";break; //部门
					case 43: returnValue="";break; //客户
					case 44: returnValue="";break; //结算方式
				}
				break;
			case 202://出库成本核算单
				
				break;
			case 203://计提存货跌价准备
				
				break;
			case 602://应收单
				switch(factorId){
					case 1: returnValue="";break;  //来源单据类型
					case 21: returnValue="";break; //存货类型
					case 41: returnValue="";break; //业务员
					case 42: returnValue="";break; //部门
					case 43: returnValue="";break; //客户
					case 44: returnValue="";break; //结算方式
				}
				break;
		}
		return returnValue;
	}

	@Override
	public String getObject(int factorId,int billType) {
		// TODO Auto-generated method stub
		String returnValue = "";
		switch(billType){
			case 201://入库成本核算单
				switch(factorId){
					case 1: returnValue="";break;  //来源单据类型
					case 21: returnValue="";break; //存货类型
					case 41: returnValue="";break; //业务员
					case 42: returnValue="";break; //部门
					case 43: returnValue="";break; //客户
					case 44: returnValue="";break; //结算方式
				}
				break;
			case 202://出库成本核算单
				
				break;
			case 203://计提存货跌价准备
				
				break;
			case 602://应收单
				switch(factorId){
					case 1: returnValue="";break;  //来源单据类型
					case 21: returnValue="";break; //存货类型
					case 41: returnValue="";break; //业务员
					case 42: returnValue="";break; //部门
					case 43: returnValue="";break; //客户
					case 44: returnValue="";break; //结算方式
				}
				break;
		}
		return returnValue;
	}

}