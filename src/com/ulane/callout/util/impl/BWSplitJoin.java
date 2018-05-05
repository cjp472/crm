package com.ulane.callout.util.impl;

import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.ulane.callout.util.AbsSplitJoin;
import com.ulane.callout.util.ITransform;

public class BWSplitJoin extends AbsSplitJoin{

	public BWSplitJoin(ITransform transform) {
		super(transform);
	}
	
	/**
	 * 黑白名单匹配
	 * @param expFields
	 * @return
	 */
	public String getSplitJoinSQL(String[] flag,Map<String,String> param) {
		/*select TMP.*,(select fullname from ul_employee where useid=incharge_person) incharge_Person_Name from OB_CALLBATCH_IMP_TMP TMP  where exists(
       select * from CUS_PERSONAL CUS where CUS.CUSTOMERID in(select CUS_ID from CON_BW_LIST)  
       and TMP.CUS_CODE=(select CUSTOMERNO from CUSTOMER where CUSTOMERID=CUS.CUSTOMERID)  
       and TMP.BIRTHDAY=CUS.BIRTHDAY  
       ) 
       and TMP.CALLBATCH_ID =to_number(782)*/
		
		if(null==flag || flag.length==0) {
			return null;
		}
		
		StringBuffer sb = new StringBuffer();
		if(param.containsKey("flag") && "WASH_DATA".equals(param.get("flag"))) {
			sb.append("select TMP.TMP_CUS_ID from OB_CALLBATCH_IMP_TMP TMP ");
		} else {
			sb.append("select TMP.*,(select fullname from ul_employee where useid=incharge_person) incharge_Person_Name from OB_CALLBATCH_IMP_TMP TMP ");	
		}
		
		sb.append(" where exists(select * from CUS_PERSONAL CUS where CUS.CUSTOMERID in(select CUS_ID from CON_BW_LIST) ");
		
		//客户编号/邮政编号/移动电话/电子邮件/通讯地址/传真
		sb
		.append(super.getSplitJoinByEQ("TMP.NAME_CN","CUS.NAME_CN",flag[0]))															//客户名称
		.append(super.getSplitJoinByEQ("TMP.CUS_CODE", "(select CUSTOMERNO from CUSTOMER where CUSTOMERID=CUS.CUSTOMERID)", flag[1]))	//客户编号
		.append(super.getSplitJoinByEQ("TMP.GENDER","CUS.GENDER",flag[2]))																//性别
		.append(super.getSplitJoinByEQ("TMP.BIRTHDAY","CUS.BIRTHDAY",flag[3]))															//生日
		.append(super.getSplitJoinByEQ("TMP.CRED_TYP_ID","CUS.CRED_TYP_ID",flag[4]))													//证件类型
		.append(super.getSplitJoinByEQ("TMP.CRED_NUM","CUS.CRED_NUM",flag[5]))															//证件号码
		.append(super.getSplitJoinByEQ("TMP.ADDR_BOOK","(select ADDRESS from CUSTOMER where CUSTOMERID=CUS.CUSTOMERID)",flag[6]))		//通讯地址
		.append(super.getSplitJoinByEQ("TMP.EMAIL","(select EMAIL from CUSTOMER where CUSTOMERID=CUS.CUSTOMERID)",flag[7]))				//电子邮件
		.append(super.getSplitJoinByEQ("TMP.FAX","(select FAX from CUSTOMER where CUSTOMERID=CUS.CUSTOMERID)",flag[8]))					//传真
		.append(super.getSplitJoinByEQ("TMP.TELE_MOBILE","(select PHONE from CUSTOMER where CUSTOMERID=CUS.CUSTOMERID)",flag[9]))		//移动号码
//		.append(super.getSplitJoinByEQ("TMP.TELE_MOBILE","(select PHONE from CUSTOMER where CUSTOMERID=CUS.CUSTOMERID)",flag[10]))		//办公号码（需要通过读取联系方式表取得）
		
//		.append(super.getSplitJoinByEQ("TMP.POST_CODE","(select ZIP from CUSTOMER where CUSTOMERID=CUS.CUSTOMERID)",flag[1]))			//邮政编号
//		.append(super.getSplitJoinByEQ("TMP.CRED_DUR_DAT","CUS.CRED_DUR_DAT",flag[10]))	//证件有效期
//		.append(super.getSplitJoinByEQ("TMP.CRE_USE_ID","CUS.CRE_USE_ID",flag[11]))		//创建人内码
//		.append(super.getSplitJoinByEQ("TMP.CRE_DAT","CUS.CRE_DAT",flag[12]))			//创建日期
//		.append(super.getSplitJoinByEQ("TMP.REMARK","CUS.REMARK",flag[13]))				//备注
//		.append(super.getSplitJoinByEQ("TMP.UPD_USE_ID","CUS.UPD_USE_ID",flag[14]))		//修改人
//		.append(super.getSplitJoinByEQ("TMP.UPD_DAT","CUS.UPD_DAT",flag[15]))			//修改日期
//		.append(super.getSplitJoinByEQ("TMP.CUS_TYP_ID","CUS.CUS_CAT_ID",flag[16]))		//客户类型
//		.append(super.getSplitJoinByEQ("TMP.NAME_ALI","CUS.NAME_ALI",flag[18]))			//简称
//		.append(super.getSplitJoinByEQ("TMP.STA_ID","CUS.STA_ID",flag[19]))				//状态
//		.append(super.getSplitJoinByEQ("TMP.AGE","CUS.CUS_AGE",flag[20]))				//年龄
		;
		sb.append(" )");
		sb.append(super.getSplitJoinByParam("TMP.CALLBATCH_ID","NUMBER","=",param.get("callbatchId")));
		sb.append(super.getSplitJoinByParam("TMP.NAME_CN","VARCHAR","LIKE",StringUtils.trim(param.get("nameCnLK"))));
		sb.append(super.getSplitJoinByParam("TMP.GENDER","VARCHAR","=",param.get("genderEQ")));
		if(param.containsKey("flag") && "WASH_DATA".equals(param.get("flag"))) {
			sb.append(" and TMP.TMP_CUS_ID=IMP_TMP.TMP_CUS_ID");
		}
		return sb.toString();
	}
}
