package com.ulane.callout.util.impl;

import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.ulane.callout.util.AbsSplitJoin;
import com.ulane.callout.util.ITransform;

public class InvalidSplitJoin extends AbsSplitJoin{

	public InvalidSplitJoin(ITransform transform) {
		super(transform);
	}
	
	/**
	 * 无效数据
	 * @param expFields
	 * @return
	 */
	public String getSplitJoinSQL(Map<String,String> param) {
		StringBuffer sb = new StringBuffer();
		
		String[] washIf = getUseIfFlag(param);
		String[] washVal = getUseValueFlag(param);
		
		if(washIf == null || washIf.length == 0) {
			return null;
		}
		if(param.containsKey("flag") && "WASH_DATA".equals(param.get("flag"))) {
			sb.append("select TMP.TMP_CUS_ID from OB_CALLBATCH_IMP_TMP TMP ");
		} else {
			sb.append("select TMP.*,(select fullname from ul_employee where useid=incharge_person) incharge_Person_Name from OB_CALLBATCH_IMP_TMP TMP ");
		}
		
		sb.append(" where 1=1 ");
		sb.append(super.getSplitJoinByParam("TMP.CALLBATCH_ID","NUMBER","=",param.get("callbatchId")));
		
		if(null!=washIf && washVal!=null) {
			StringBuffer buff = new StringBuffer();
			//客户编号/邮政编号/移动电话/电子邮件/通讯地址/传真
			
			buff
			.append(super.getSplitJoinBy4Param("TMP.NAME_CN","VARCHAR",washIf[0],washVal[0]))			//客户名称
			.append(super.getSplitJoinBy4Param("TMP.CUS_CODE", "VARCHAR", washIf[1],washVal[1]))		//客户编号
			.append(super.getSplitJoinBy4Param("TMP.GENDER","VARCHAR",washIf[2],washVal[2]))			//性别
			.append(super.getSplitJoinBy4Param("TMP.BIRTHDAY","VARCHAR",washIf[3],washVal[3]))			//生日
			.append(super.getSplitJoinBy4Param("TMP.CRED_TYP_ID","NUMBER",washIf[4],washVal[4]))		//证件类型
			.append(super.getSplitJoinBy4Param("TMP.CRED_NUM","VARCHAR",washIf[5],washVal[5]))			//证件号码
			.append(super.getSplitJoinBy4Param("TMP.ADDR_BOOK","VARCHAR.",washIf[6],washVal[6]))		//通讯地址
			.append(super.getSplitJoinBy4Param("TMP.EMAIL","VARCHAR.",washIf[7],washVal[7]))			//电子邮件
			.append(super.getSplitJoinBy4Param("TMP.FAX","VARCHAR.",washIf[8],washVal[8]))				//传真
			.append(super.getSplitJoinBy4Param("TMP.TELE_MOBILE","VARCHAR.",washIf[9],washVal[9]))		//移动号码
			.append(super.getSplitJoinBy4Param("TMP.TELE_OFFICE","VARCHAR.",washIf[10],washVal[10]))	//办公号码
			

			
//			.append(super.getSplitJoinBy4Param("TMP.POST_CODE","VARCHAR.",washIf[1],washVal[1]))		//邮政编号
//			.append(super.getSplitJoinBy4Param("TMP.CRED_DUR_DAT","DATE",washIf[10],washVal[10]))		//证件有效期
//			.append(super.getSplitJoinBy4Param("TMP.CRE_USE_ID","NUMBER",washIf[11],washVal[11]))		//创建人内码
//			.append(super.getSplitJoinBy4Param("TMP.CRE_DAT","DATE",washIf[12],washVal[12]))			//创建日期
//			.append(super.getSplitJoinBy4Param("TMP.REMARK","VARCHAR",washIf[13],washVal[13]))			//备注
//			.append(super.getSplitJoinBy4Param("TMP.UPD_USE_ID","NUMBER",washIf[14],washVal[14]))		//修改人
//			.append(super.getSplitJoinBy4Param("TMP.UPD_DAT","DATE",washIf[15],washVal[15]))			//修改日期
//			.append(super.getSplitJoinBy4Param("TMP.CUS_TYP_ID","NUMBER",washIf[16],washVal[16]))		//客户类型
//			.append(super.getSplitJoinBy4Param("TMP.NAME_ALI","VARCHAR",washIf[18],washVal[18]))		//简称
//			.append(super.getSplitJoinBy4Param("TMP.STA_ID","NUMBER",washIf[19],washVal[19]))			//状态
//			.append(super.getSplitJoinBy4Param("TMP.AGE","NUMBER",washIf[20],washVal[20]))				//年龄
			;
			
			ITransform trans = new OracleSqlTransform(buff.toString());
			AbsSplitJoin join = new InvalidSplitJoin(trans);
			System.out.println(join.getSplitJoinByParam());
			sb.append(join.getSplitJoinByParam());
		}
		
		sb.append(super.getSplitJoinByParam("TMP.NAME_CN","VARCHAR","LIKE",StringUtils.trim(param.get("nameCnLK"))));
		sb.append(super.getSplitJoinByParam("TMP.GENDER","VARCHAR","=",param.get("genderEQ")));
		if(param.containsKey("flag") && "WASH_DATA".equals(param.get("flag"))) {
			sb.append(" and TMP.TMP_CUS_ID=IMP_TMP.TMP_CUS_ID");
		}
		return sb.toString();
	}
	
}
