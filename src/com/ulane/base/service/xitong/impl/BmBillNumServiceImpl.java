//package com.ulane.base.service.xitong.impl;
///*
// *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
// *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
//*/
//import java.util.Date;
//import java.util.Iterator;
//import java.util.List;
//
//import javax.annotation.Resource;
//
//import com.htsoft.core.Constants;
//import com.htsoft.core.service.impl.BaseServiceImpl;
//import com.ulane.base.dao.xitong.BmBillNumDao;
//import com.ulane.base.model.xitong.BmBillNum;
//import com.ulane.base.model.xitong.BmFactor;
//import com.ulane.base.model.xitong.BmFactorValue;
//import com.ulane.base.service.xitong.BmBillNumService;
//import com.ulane.base.service.xitong.BmFactorService;
//import com.ulane.base.service.xitong.BmFactorValueService;
//
//public class BmBillNumServiceImpl extends BaseServiceImpl<BmBillNum> implements
//		BmBillNumService {
//	@SuppressWarnings("unused")
//	private BmBillNumDao dao;
//
//	@Resource
//	private BmFactorValueService bmFactorValueService;
//	@Resource
//	private BmFactorService bmFactorService;
//
//	public BmBillNumServiceImpl(BmBillNumDao dao) {
//		super(dao);
//		this.dao = dao;
//	}
//
//	/**
//	 * 业务单据ID
//	 */
//	@Override
//	public String getPK(int billType) {
//		// TODO Auto-generated method stub
//		String returnValue = "";
//		switch (billType) {
//		case 201:// 入库成本核算单
//
//			break;
//		case 202:// 出库成本核算单
//
//			break;
//		case 203:// 计提存货跌价准备
//			break;
//		case 502:// 应付单
//			returnValue = "PayableHeaderId";
//			break;
//
//		case 501:// 付款单
//			returnValue = "paymentHeaderId";
//			break;
//		case 503:// 采购发票
//			returnValue = "paymentInvoiceHeaderId";
//			break;
//		case 505:// 付款申請单
//			returnValue = "payAppHeaderId";
//			break;
//		case 601:// 收款单
//			returnValue = "incomeHeaderId";
//			break;
//		case 602:// 应收单
//			returnValue = "ReceivableHeaderId";
//			break;
//		case 603:// 销售发票
//			returnValue = "incomeInvoiceHeaderId";
//			break;
//		case 1:// 凭证
//			returnValue = "CertificateHeaderId";
//			break;
//		}
//		return returnValue;
//	}
//
//	/**
//	 * 字段名
//	 */
//	@Override
//	public String getField(int billType) {
//		// TODO Auto-generated method stub
//		String returnValue = "";
//		switch (billType) {
//		case 201:// 入库成本核算单
//
//			break;
//		case 202:// 出库成本核算单
//
//			break;
//		case 203:// 计提存货跌价准备
//
//			break;
//		case 501:// 付款单
//			returnValue = "paymentNum";
//			break;
//		case 502:// 应付单
//			returnValue = "payableNum";
//			break;
//		case 503:// 采购发票
//			returnValue = "paymentInvoiceNo";
//			break;
//		case 505:// 付款申請单
//			returnValue = "paymentNum";
//			break;
//		case 601:// 收款单
//			returnValue = "incomeNum";
//			break;
//		case 602:// 应收单
//			returnValue = "receivableNum";
//			break;
//		case 603:// 销售发票
//			returnValue = "incomeInvoiceNum";
//			break;
//		case 1:// 凭证
//			returnValue = "certificateNum";
//			break;
//		}
//		return returnValue;
//	}
//
//	/**
//	 * 对象名称
//	 */
//	@Override
//	public String getObject(int billType) {
//		// TODO Auto-generated method stub
//		String returnValue = "";
//		switch (billType) {
//		case 201:// 入库成本核算单
//
//			break;
//		case 202:// 出库成本核算单
//
//			break;
//		case 203:// 计提存货跌价准备
//
//			break;
//		case 501:// 付款单
//			returnValue = "ApPaymentHeader";
//			break;
//		case 502:// 应付单
//			returnValue = "ApPayableHeader";
//			break;
//		case 503:// 采购发票
//			returnValue = "ApPaymentInvoiceHeader";
//			break;
//		case 505:// 付款申請单
//			returnValue = "ApPayAppHeader";
//			break;
//		case 601:// 收款单
//			returnValue = "ArIncomeHeader";
//			break;
//		case 602:// 应收单
//			returnValue = "ArReceivableHeader";
//			break;
//		case 603:// 销售发票
//			returnValue = "ArIncomeInvoiceHeader";
//			break;
//		case 1:// 凭证
//			returnValue = "GlCertificateHeader";
//			break;
//		}
//		return returnValue;
//	}
//
//	/**
//	 * 查询条件
//	 */
//	@Override
//	public String getCondition(int billType) {
//		// TODO Auto-generated method stub
//		String returnValue = "";
//		switch (billType) {
//		case 201:// 入库成本核算单
//
//			break;
//		case 202:// 出库成本核算单
//
//			break;
//		case 203:// 计提存货跌价准备
//
//			break;
//		case 501:// 付款单
//			returnValue = "";
//			break;
//		case 502:// 应付单
//			returnValue = "";
//			break;
//		case 503:// 采购发票
//			returnValue = "";
//			break;
//		case 505:// 付款申請单
//			returnValue = "";
//			break;
//		case 601:// 收款单
//			returnValue = "";
//			break;
//		case 602:// 应收单
//			returnValue = "";
//			break;
//		case 603:// 销售发票
//			returnValue = "";
//			break;
//		case 1:// 凭证
//			returnValue = " and isDelete = 0 ";
//			break;
//		}
//		return returnValue;
//	}
//
//	@Override
//	public String getBillNum(int billType, Long billId) {
//		return getBillNum(billType,billId,getField(billType),getPK(billType),getObject(billType),getCondition(billType));
//	}
//
//	@Override
//	public String getBillNum(int billType, Long billId,String billField,String PKField,String TableName,String condition) {
//		// TODO Auto-generated method stub
//		BmBillNum bmBillNum = dao.getByBillType(billType);
//		StringBuffer billNum = new StringBuffer();
//		if(bmBillNum==null||bmBillNum.getBillNumId()==null){
//			System.out.println("***无此单据编号规则设置***");
//		}
//		else{
//			billNum.append(bmBillNum.getPrefix());// 前缀(生成的新单号用)
//			StringBuffer billNumHql = new StringBuffer(bmBillNum.getPrefix());// 前缀(查询流水号用)
//
//			if (bmBillNum.getFactor1Median() == (long) Constants.ISTRUE) {// 对象一位数大于0
//
//				List<BmFactorValue> bmFactorValueArr = bmFactorValueService.getByFactor(bmBillNum.getFactor1Id());
//				for (BmFactorValue obj : bmFactorValueArr) {
//					if (bmFactorValueService.isHql(TableName,
//							TableName + " = " + billId + " "
//									+ obj.getFactorValue())) {
//						billNum.append(obj.getFactorNum());
//						for (int i = 0; i < obj.getFactorNum().toString().length(); i++) {
//							billNumHql.append("_");
//						}
//					}
//				}
//			}
//			if (bmBillNum.getFactor2Median() == (long) Constants.ISTRUE) {// 对象二位数大于0
//
//				List<BmFactorValue> bmFactorValueArr = bmFactorValueService
//						.getByFactor(bmBillNum.getFactor2Id());
//				for (BmFactorValue obj : bmFactorValueArr) {
//					if (bmFactorValueService.isHql(TableName,
//							TableName + " = " + billId + " "
//									+ obj.getFactorValue())) {
//						billNum.append(obj.getFactorNum());
//						for (int i = 0; i < obj.getFactorNum().toString().length(); i++) {
//							billNumHql.append("_");
//						}
//					}
//				}
//
//				billNum.append("");
//				billNumHql.append("");
//			}
//			Date date = new Date();
//			if (bmBillNum.getIsYear() == (long) Constants.ISTRUE) {// 年操作
//				int year = date.getYear();
//				String yearStr = year < 10 ? "0" + year : year + "";
////				String yearStr = ((BmAcScheduleY) bmAcScheduleYService.getNow()).getAcScheduleYIdName();
//				if (yearStr.length() > bmBillNum.getYearMedian().intValue()) {
//					billNum.append(yearStr.substring(yearStr.length()- bmBillNum.getYearMedian().intValue()));
//					if (bmBillNum.getZeroLogo().intValue() != 0) {
//						billNumHql.append(yearStr.substring(yearStr.length()- bmBillNum.getYearMedian().intValue()));
//					}
//				} else if (yearStr.length() == bmBillNum.getYearMedian()) {
//					billNum.append(yearStr);
//					if (bmBillNum.getZeroLogo().intValue() != 0) {
//						billNumHql.append(yearStr);
//					}
//				}
//			}
//			if (bmBillNum.getIsMonth() == (long) Constants.ISTRUE) {// 月操作
//				int month = date.getMonth()+1;
//				String monthStr = month < 10 ? "0" + month : month + "";
////				String monthStr = ((BmAcScheduleM) bmAcScheduleMService.getNow()).getAcScheduleMIdName();
//				if (monthStr.length() > bmBillNum.getMonthMedian().intValue()) {
//					billNum.append(monthStr.substring(monthStr.length()- bmBillNum.getMonthMedian().intValue()));
//					if (bmBillNum.getZeroLogo().intValue() == 2|| bmBillNum.getZeroLogo().intValue() == 3) {
//						billNumHql.append(monthStr.substring(monthStr.length()- bmBillNum.getMonthMedian().intValue()));
//					}
//				} else if (monthStr.length() == bmBillNum.getMonthMedian()) {
//					billNum.append(monthStr);
//					if (bmBillNum.getZeroLogo().intValue() != 0) {
//						billNumHql.append(monthStr);
//					}
//				}
//			}
////			if (bmBillNum.getIsDay() == (long) Constants.ISTRUE) {// 日操作
//				int day = date.getDate();
//				String dayStr = day < 10 ? "0" + day : day + "";
//				if (dayStr.length() > bmBillNum.getDayMedian().intValue()) {
//					billNum.append(dayStr.substring(dayStr.length()- bmBillNum.getDayMedian().intValue()));
//					if (bmBillNum.getZeroLogo().intValue() == 3) {
//						billNumHql.append(dayStr.substring(dayStr.length()- bmBillNum.getDayMedian().intValue()));
//					}
//				} else if (dayStr.length() == bmBillNum.getDayMedian()) {
//					billNum.append(dayStr);
//					if (bmBillNum.getZeroLogo().intValue() != 0) {
//						billNumHql.append(dayStr);
//					}
//				}
////			}
//			// 查找最新单据号
//			String SerialNumber = "";
//			for (int i = 0; i < bmBillNum.getNumberMedian().intValue(); i++)
//				SerialNumber += "0";
//			String oldNum = billNum.toString() + SerialNumber;
//			Iterator iter = bmFactorValueService.getHql(billField,TableName, billField + " like '" + billNumHql.toString() + "%' " + condition);
//			Iterator iterShadow = iter;
//			if (iterShadow.hasNext()) {
//				// Object[] result=(Object[])iterShadow.next();
//				// oldNum = (String)result[0];
//				oldNum = (String) iterShadow.next();
//			}
//
////			if (bmBillNum.getIsAutoFill() == (long) Constants.ISTRUE) { // 断号补号
//				// 查找断号
//				StringBuffer noOff = null;
//				long u = Long.parseLong(oldNum.substring(oldNum.length() - bmBillNum.getNumberMedian().intValue()));//当前流水号
//				u--;
//				while (iter.hasNext()) {
//					String v = iter.next().toString();
//					long w = Long.parseLong(v.substring(v.length() - bmBillNum.getNumberMedian().intValue()));
//					if (u < 2) { // 已是最小值
//						break;
//					}else{
//						if (w == u){// 连续的
//							u--;
//						}else {// 断点 需补当前单号的前一个号码
//							String newSNum = SerialNumber + u;
//							noOff = billNum.append(newSNum.substring(newSNum.length() - bmBillNum.getNumberMedian().intValue()));
//							break;
//						}
//					}
//				}
//
//				if (noOff != null) {// 断号
//					billNum = noOff;
//				} else {// 没有断号
//					// 加一
//					int x = Integer.parseInt(oldNum.substring(oldNum.length() - bmBillNum.getNumberMedian().intValue()));
//					x++;
//					String newSNum = SerialNumber + x;
//					billNum.append(newSNum.substring(newSNum.length() - bmBillNum.getNumberMedian().intValue()));
//				}
//			} else {// 断号不补
//				// 加一
//				int x = Integer.parseInt(oldNum.substring(oldNum.length()- bmBillNum.getNumberMedian().intValue()));
//				x++;
//				String newSNum = SerialNumber + x;
//				billNum.append(newSNum.substring(newSNum.length()- bmBillNum.getNumberMedian().intValue()));
//			}	
//		}
//		return billNum.toString();
//	}
//
//}