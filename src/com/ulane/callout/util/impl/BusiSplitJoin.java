package com.ulane.callout.util.impl;

import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.ulane.callout.model.outb.ObProject;
import com.ulane.callout.util.AbsSplitJoin;
import com.ulane.callout.util.ITransform;

public class BusiSplitJoin extends AbsSplitJoin{
	public BusiSplitJoin(ITransform transform) {
		super(transform);
	}
	
	/**
	 * 业务去重
	 * @param expFields
	 * @return
	 */
	public String getSplitJoinSQL(String[] flag,Map<String,String> param) {
		/*select TMP.*,(select fullname from ul_employee where useid=incharge_person) incharge_Person_Name from OB_CALLBATCH_IMP_TMP TMP  where exists(
       select * from OB_CALLBATCH_IMP_TMP EXP_TMP where 1=1  
       and EXP_TMP.CALLBATCH_ID in(1006,621,702,681,644,1002,841,822,746,741,721,682,665,664,663,1004,861,821,802,801,745,744,743,701,601,662,1007,1005,1003,1001,803,742,661,581,145,9,144,102,81,181,761,823,782,1022,1021,1008,781,562,541,563561)  
       and EXP_TMP.TMP_CUS_ID<TMP.TMP_CUS_ID  
       and TMP.CUS_CODE=EXP_TMP.CUS_CODE  and TMP.BIRTHDAY=EXP_TMP.BIRTHDAY
       )*/
		
		if(null==flag || flag.length==0) {
			return null;
		}
		
		StringBuffer sb = new StringBuffer();
		if(param.containsKey("flag") && "WASH_DATA".equals(param.get("flag"))) {
			sb.append("select TMP.TMP_CUS_ID from OB_CALLBATCH_IMP_TMP TMP ");
		} else {
			sb.append("select TMP.*,(select fullname from ul_employee where useid=incharge_person) incharge_Person_Name from OB_CALLBATCH_IMP_TMP TMP ");
		}
		sb.append(" where exists(select 'X' from OB_CALLBATCH_IMP_TMP EXP_TMP where 1=1 ");

		String clearSoundTyp = param.get("clearSoundTyp");
		if("ALL".equals(clearSoundTyp)) {
			sb.append(" and EXP_TMP.PROJ_ID in(select PROJ_ID from OB_PROJECT where PROJ_STA_ID="+ObProject.FLAG_EXECUTING+") ");
		} else if("PROJECT".equals(clearSoundTyp)) {
			sb.append(" and EXP_TMP.PROJ_ID="+param.get("projId")+" ");
		} else if("COM".equals(clearSoundTyp)) {
			sb.append(" and EXP_TMP.COM_ID="+param.get("comId")+" ");
		} else if("CALLLIST".equals(clearSoundTyp)) {
			sb.append(" and EXP_TMP.CALLLIST_ID="+param.get("calllistId")+" ");
		} else if("CALLBATCH".equals(clearSoundTyp)) {
			sb.append(" and EXP_TMP.CALLBATCH_ID="+param.get("callbatchId")+" ");
		}

		sb.append(" and EXP_TMP.TMP_CUS_ID<TMP.TMP_CUS_ID ");
		//客户编号/邮政编号/移动电话/电子邮件/通讯地址/传真
		sb
		.append(super.getSplitJoinByEQ("TMP.NAME_CN","EXP_TMP.NAME_CN",flag[0]))			//客户名称
		.append(super.getSplitJoinByEQ("TMP.CUS_CODE", "EXP_TMP.CUS_CODE", flag[1]))		//客户编号
		.append(super.getSplitJoinByEQ("TMP.GENDER","EXP_TMP.GENDER",flag[2]))				//性别
		.append(super.getSplitJoinByEQ("TMP.BIRTHDAY","EXP_TMP.BIRTHDAY",flag[3]))			//生日
		.append(super.getSplitJoinByEQ("TMP.CRED_TYP_ID","EXP_TMP.CRED_TYP_ID",flag[4]))	//证件类型
		.append(super.getSplitJoinByEQ("TMP.CRED_NUM","EXP_TMP.CRED_NUM",flag[5]))			//证件号码
		.append(super.getSplitJoinByEQ("TMP.ADDR_BOOK","EXP_TMP.ADDR_BOOK",flag[6]))		//通讯地址
		.append(super.getSplitJoinByEQ("TMP.EMAIL","EXP_TMP.EMAIL",flag[7]))				//电子邮件
		.append(super.getSplitJoinByEQ("TMP.FAX","EXP_TMP.FAX",flag[8]))					//传真
		.append(super.getSplitJoinByEQ("TMP.TELE_MOBILE","EXP_TMP.TELE_MOBILE",flag[9]))	//移动号码
		.append(super.getSplitJoinByEQ("TMP.TELE_OFFICE","EXP_TMP.TELE_OFFICE",flag[10]))	//办公号码
		
//		.append(super.getSplitJoinByEQ("TMP.POST_CODE","EXP_TMP.POST_CODE",flag[1]))		//邮政编号
//		.append(super.getSplitJoinByEQ("TMP.CRED_DUR_DAT","EXP_TMP.CRED_DUR_DAT",flag[10]))	//证件有效期
//		.append(super.getSplitJoinByEQ("TMP.CRE_USE_ID","EXP_TMP.CRE_USE_ID",flag[11]))		//创建人内码
//		.append(super.getSplitJoinByEQ("TMP.CRE_DAT","EXP_TMP.CRE_DAT",flag[12]))			//创建日期
//		.append(super.getSplitJoinByEQ("TMP.REMARK","EXP_TMP.REMARK",flag[13]))				//备注
//		.append(super.getSplitJoinByEQ("TMP.UPD_USE_ID","EXP_TMP.UPD_USE_ID",flag[14]))		//修改人
//		.append(super.getSplitJoinByEQ("TMP.UPD_DAT","EXP_TMP.UPD_DAT",flag[15]))			//修改日期
//		.append(super.getSplitJoinByEQ("TMP.CUS_TYP_ID","EXP_TMP.CUS_CAT_ID",flag[16]))		//客户类型
//		.append(super.getSplitJoinByEQ("TMP.NAME_ALI","EXP_TMP.NAME_ALI",flag[18]))			//简称
//		.append(super.getSplitJoinByEQ("TMP.STA_ID","EXP_TMP.STA_ID",flag[19]))				//状态
//		.append(super.getSplitJoinByEQ("TMP.AGE","EXP_TMP.CUS_AGE",flag[20]))				//年龄
		;
		sb.append(" )");
		sb.append(super.getSplitJoinByParam("TMP.NAME_CN","VARCHAR","LIKE",StringUtils.trim(param.get("nameCnLK"))));
		sb.append(super.getSplitJoinByParam("TMP.GENDER","VARCHAR","=",param.get("genderEQ")));
		if(param.containsKey("flag") && "WASH_DATA".equals(param.get("flag"))) {
			sb.append(" and TMP.TMP_CUS_ID=IMP_TMP.TMP_CUS_ID");
		}
		return sb.toString();
	}
}
