package com.ulane.callout.util.impl;

import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.ulane.callout.util.AbsSplitJoin;
import com.ulane.callout.util.ITransform;

public class RepairSplitJoin extends AbsSplitJoin{
	public static final String RepairExp = "'([:(:):,:])|([: :])|(\\-)'";
	public RepairSplitJoin(ITransform transform) {
		super(transform);
	}
	
	/**
	 * 业务去重
	 * @param expFields
	 * @return
	 */
	public String getSplitJoinSQL(String[] flag,Map<String,String> param) {
		if(null==flag || flag.length==0) {
			return null;
		}
		
		StringBuffer sb = new StringBuffer();
		if(param.containsKey("flag") && "WASH_DATA".equals(param.get("flag"))) {
			sb.append("select TMP.TMP_CUS_ID from OB_CALLBATCH_IMP_TMP TMP ");
		} else {
			sb.append("select TMP.*,(select fullname from ul_employee where useid=incharge_person) incharge_Person_Name from OB_CALLBATCH_IMP_TMP TMP ");
		}
		sb.append(" where 1=1 and TMP.CALLBATCH_ID ="+param.get("callbatchId")+" ");
		sb.append(super.getSplitJoinByParam("TMP.NAME_CN","VARCHAR","LIKE",StringUtils.trim(param.get("nameCnLK"))));
		sb.append(super.getSplitJoinByParam("TMP.GENDER","VARCHAR","=",param.get("genderEQ")));
		if(param.containsKey("flag") && "WASH_DATA".equals(param.get("flag"))) {
			sb.append(" and TMP.TMP_CUS_ID=IMP_TMP.TMP_CUS_ID");
		}
		String querySQL = sb.toString();
		
		String repairSQLTMP = getFinalSQL(flag);
		if(StringUtils.isNotBlank(repairSQLTMP)) {
			String repairSQL = "update OB_CALLBATCH_IMP_TMP TMP set "+repairSQLTMP+" where TMP.CALLBATCH_ID="+param.get("callbatchId");
			param.put("repairSQL", repairSQL);
		}
		
		return querySQL;
	}
	public String getFinalSQL(String[] flag) {
		StringBuffer sb = new StringBuffer();
		
		String moblePhone = getRepairSQL(flag[9],"TMP.TELE_MOBILE","REGEXP_REPLACE","''",RepairExp);//移动号码
		String officePhone = getRepairSQL(flag[10],"TMP.TELE_OFFICE","REGEXP_REPLACE","''",RepairExp);//办公号码
		String email = getRepairSQL(flag[7],"TMP.EMAIL","REGEXP_REPLACE","''",RepairExp);//电子邮件
		String address = getRepairSQL(flag[6],"TMP.ADDR_BOOK","REGEXP_REPLACE","''",RepairExp);//通讯地址
		String fax = getRepairSQL(flag[8],"TMP.FAX","REGEXP_REPLACE","''",RepairExp);//传真
		
		sb.append(moblePhone);
		if(StringUtils.isNotBlank(sb.toString()) && StringUtils.isNotBlank(officePhone)) {
			sb.append(","+officePhone);
		}
		if(StringUtils.isNotBlank(sb.toString()) && StringUtils.isNotBlank(email)) {
			sb.append(","+email);
		}
		if(StringUtils.isNotBlank(sb.toString()) && StringUtils.isNotBlank(address)) {
			sb.append(","+address);
		}
		if(StringUtils.isNotBlank(sb.toString()) && StringUtils.isNotBlank(fax)) {
			sb.append(","+fax);
		}
		
		return sb.toString();
	}
	
	/**
	 * 调用方法，拼接条件
	 */
	public String getRepairSQL(String flag,String field,String washIf,String washValue,String EXP) {
		if(StringUtils.isNotBlank(flag)) {
			return super.getSplitJoinBySET(field, washIf, washValue, EXP);
		}
		return "";
	}
	
}
