package com.ulane.customer.service.customer.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.Region;

import com.htsoft.core.jbpm.pv.TaskInfo;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.customer.BankType;
import com.htsoft.oa.model.system.AppRole;

import com.ulane.base.model.info.QJContractHZRecord;
import com.ulane.base.model.info.QJContractRecordId;
import com.ulane.base.model.info.QJAddCard;
import com.ulane.base.model.info.QJIssueCard;
import com.ulane.base.model.info.QJTransferAccounts;
import com.ulane.base.model.xitong.Equipment;
import com.ulane.core.plugin.soap.impl.ConHisSoapServerImpl;
import com.ulane.customer.dao.customer.ConHisDao;
import com.ulane.customer.model.customer.CTI_AfterWork_Info;
import com.ulane.customer.model.customer.CTI_Call_Info;
import com.ulane.customer.model.customer.CTI_Login_Info;
import com.ulane.customer.model.customer.CTI_Rest_Info;
import com.ulane.customer.model.customer.CTI_Ringing_Info;
import com.ulane.customer.model.customer.CallIdOrAgentInfo;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.EveryDayReport;
import com.ulane.customer.model.customer.EveryDayReportId;
import com.ulane.customer.model.customer.Examine;
import com.ulane.customer.model.customer.MachineSelf;
import com.ulane.customer.model.customer.MachineSelfAttach;
import com.ulane.customer.model.customer.OperationData;
import com.ulane.customer.model.customer.SysWorkattendance;
import com.ulane.customer.service.customer.ConHisService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ConHisServiceImpl extends BaseServiceImpl<ConHis> implements ConHisService{

	private ConHisDao dao;
	
	public ConHisServiceImpl(ConHisDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public String updateConHis(Map<String, String> param) {
		//从弹屏页面获得交易类型（联络事项）、处理结果（对应联络记录的处理状态）、联络结果、备注（对应联络历史中的联络内容）
 		ConHisSoapServerImpl chssi = new ConHisSoapServerImpl();
		String conhisId = param.get("conhisId");
		String conResId = param.get("conResId");//联络结果
		String dealResult = param.get("dealResult");//处理结果
		String busiType_formx = param.get("busiType_form");//联络事项
		String callContent = param.get("callContent");//联络内容
		String statusId = param.get("statusId");	//营销状态
		String serviceId = param.get("serviceId");	//来源id
		
		StringBuffer str = new StringBuffer("{'statusId':"+statusId+",'dirId': "+ConHis.DIR_OUT+",'class':'com.ulane.customer.model.customer.ConHis','contactTypeId':"+ConHis.CON_TYPE_PHONE+",'ownerId':"+ContextUtil.getCurrentUserId());
		str.append(",'conHisId':");
		str.append(conhisId + ",'busTypId':" + busiType_formx);
		str.append(",'conResId':" + conResId + ",'dealResult':" + dealResult);
		if (!callContent.equals(""))
		{
			str.append(",'content':'" + callContent+"'");
		}else {
			str.append(",'content':" + null);
		}
		
		str.append("}");
		//更新的字符串
//		System.out.println(str.toString() + "更新的字符串 conHisId=" + conhisId);
		String msg = chssi.updateConHis(str.toString());
		return msg;
	}
	
	public Long getMaxConHis(){
		return dao.getMaxConHis();
	}

	@Override
	public void saveCallIdOrAgentId(String callid,String agentid,String machineid) {
		// TODO Auto-generated method stub
		dao.saveCallIdOrAgentId(callid,agentid,machineid);
	}

	@Override
	public void updateDealNum(String conhisid, String cusName, String dealno) {
		dao.updateDealNum(conhisid, cusName, dealno);
		
	}

	@Override
	public Equipment selectEquiName(String eId) {
		
		return dao.selectEquiName(eId);
	}

	/***
	 * 2014/07/29
	 * 身份核查补录，后台记录数据，提供报表基础
	 * @param callIdOrAgentInfo
	 */
	@Override
	public void insertExamineInfo(Examine examine) {
		System.out.println("[ConHisServiceImpl.java] - insertExamineInfo()");
		dao.insertExamineInfo(examine);
	}
	
	
	/**
	 * 2014/11/7
	 * 补录报表的查询
	 * （带分页）
	 * nk
	 */
	@Override
	public List<Examine> ExamineReport(Integer start, Integer limit, String dealNum,
			String cusName, String transactP, String examineP, String examineD,
			String examineR) {
		System.out.println("[ConHisServiceImpl.java] - ExamineReport()");
		return dao.ExamineReport(start, limit, dealNum, cusName, transactP, examineP, examineD, examineR);
	}
// 查询补录报表的总条数
	@Override
	public Integer ExamineReportCount(String dealNum, String cusName,
			String transactP, String examineP, String examineD, String examineR) {
		System.out.println("[ConHisServiceImpl.java] - ExamineReportCount()");
		return dao.ExamineReportCount(dealNum, cusName, transactP, examineP, examineD, examineR);
	}
	
	
	
	@Override
	public List<SysWorkattendance> SysWorkattendance(
			Integer start, Integer limit, String loginTime, String logoutTime) {
		System.out.println("[ConHisServiceImpl.java] - SysWorkattendance()");
		return dao.SysWorkattendance(start, limit, loginTime, logoutTime);
	}

	@Override
	public Integer SysWorkattendanceCount(String loginTime, String logoutTime) {
		System.out.println("[ConHisServiceImpl.java] - SysWorkattendanceCount()");
		return dao.SysWorkattendanceCount(loginTime, logoutTime);
	}

	
	
	
	
	
	/**
	 * ======================================================================================================
	 * 机构部门的增删改
	 * @author wkj@nk
	 * 
	 * */
	@Override
	public List<BankType> findByParentId(Long long1) {
		//System.out.println("[ConHisServiceImpl.java] - findByParentId()");
		return dao.findByParentId(long1);
	}

	@Override
	public List<BankType> findByParentIdForSql(int start, int limit, String path) {
		//System.out.println("================findByParentIdForSql()=");
		return dao.findByParentIdForSql(start, limit, path);
	}

	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序(获得数量)
	 * @param path
	 * @return
	 */
	@Override
	public int findByParentIdForSqlCount(final int start,final int limit,String path) {
		//System.out.println("[ConHisServiceImpl.java] - findByParentIdForSqlCount()");
		return dao.findByParentIdForSqlCount(start, limit, path);
	}

	/**
	 * 机构部门的添加及保存操作
	 * @author wkj
	 */
	public void addBankType(String curDate, String bankName,Long parentId,String branchId) {
		System.out.println("[ConHisServiceImpl.java] - addBankType()");
		dao.addBankType(curDate, bankName, parentId,branchId);
	}


	@Override
	public List<BankType> collectFindByParentIdForRole(Long parentId) {
		//System.out.println("[ConHisServiceImpl.java] - collectFindByParentIdForRole()");
		return dao.collectFindByParentIdForRole(parentId);
	}

	/**
	 *2015/1/15 删除bank @author NK
	 * */
	public void getDelBank(Long bankTypeId) {
		//System.out.println("[ConHisServiceImpl.java] - getDelBank()");
		dao.getDelBank(bankTypeId);
	}

	/*
	 * 2015-01-17
	 * @anthor :wkj@nk 
	 * 机构部门的修改
	 * */

	public void updateBankType(Long bankTypeId,
			String bankName,String updateDate,String branchId) {
		System.out.println("[ConHisServiceImpl.java] - updateBankType()");
		dao.updateBankType(bankTypeId,bankName,updateDate,branchId);
		
	}

	@Override
	public List<BankType> getProvince() {
		System.out.println("[ConHisServiceImpl.java] - getProvince()");
		return dao.getProvince();
	}

	@Override
	public List<BankType> selectparentName(Long id) {
		System.out.println("[ConHisServiceImpl.java] - selectparentName()");
		return dao.selectparentName(id);
	}

	
	
	/***
	 * 2014/12/18
	 * Hyman   
	 * 存储后台OperationData数据
	 * @param 
	 */
	@Override
	public void insertOperationData(Long BS_num, String agentid,
			String insertTime, String Stype) {
		System.out.println("[ConHisServiceImpl.java] - insertOperationData()");
		dao.insertOperationData(BS_num, agentid, insertTime, Stype);
	}

	@Override
	public OperationData selectMaxOpera() {
		// TODO Auto-generated method stub
		System.out.println("[ConHisServiceImpl.java] - selectMaxOpera()");
		return dao.selectMaxOpera();
	}

	
	@Override
	public void insertWorkAttendance(Long BS_num, String agentid,
			String loginsystime, String loginctitime, String logoutsystime,
			String status, String reason,String remarks) {
		System.out.println("[ConHisServiceImpl.java] - insertWorkAttendance()");
		dao.insertWorkAttendance(BS_num, agentid, loginsystime, loginctitime, logoutsystime, status, reason, remarks);
	}
	
	
	/**
	 * 20150208
	 * 自主终端资料查询
	 * Fernando 
	 */
	@Override
	public List<MachineSelf> machineSelfList(Integer start, Integer limit,
			String wdNum, String cusName, String tellernum, String tradedateStart,String tradedateEnd,String traderesult) {
		// TODO Auto-generated method stub
		System.out.println("[ConHisServiceImpl.java] - machineSelfList()");
		return dao.machineSelfList(start, limit, wdNum, cusName, tellernum, tradedateStart,tradedateEnd,traderesult);
	}

	@Override
	public Integer machineSelfCount(String wdNum, String cusName,
			String tellernum, String tradedateStart,String tradedateEnd,String traderesult) {
		System.out.println("[ConHisServiceImpl.java] - machineSelfCount()");
		return dao.machineSelfCount(wdNum, cusName, tellernum, tradedateStart,tradedateEnd,traderesult);
	}

	@Override
	public List<MachineSelfAttach> machSelfAttachList(String msid) {
		// TODO Auto-generated method stub
		System.out.println("[ConHisServiceImpl.java] - machSelfAttachList()");
		return dao.machSelfAttachList(msid);
	}

	
	/**
	 *      业务资料查询
	 * @author wangkaijuan
	 * 2015/05/06
	 */
	public List<ConHis> conHisList(Integer start, Integer limit,
			Long userid,String dealStaId, String busTypId, String buluS, String serialNum,
			String startimes, String endtimes, String mainContactNum,
			String agentName) {
		// TODO Auto-generated method stub
		return dao.conHisList(start, limit,userid, dealStaId, busTypId, buluS, serialNum, startimes, endtimes, mainContactNum, agentName);
	}
	/**
	 *      业务资料总数
	 * @author wangkaijuan
	 * 2015/05/06
	 */
	@Override
	public int conHisListCount(Long userid, String dealStaId, String busTypId,
			String buluS, String serialNum, String startimes, String endtimes,
			String mainContactNum, String agentName) {
		// TODO Auto-generated method stub
		//return dao.conHisListCount(userid, dealStaId, busTypId, buluS, serialNum, startimes, endtimes, mainContactNum, agentName);
	return dao.conHisListCount(userid, dealStaId, busTypId, buluS, serialNum, startimes, endtimes, mainContactNum, agentName);
	}

	@Override
	public List<BankType> selectName() {
		// TODO Auto-generated method stub
		return dao.selectName();
	}

	@Override
	public List<QJContractRecordId> ContractRecordList(Integer start, Integer limit,
			Long userid, String serialNum, String startimes, String endtimes,
			String mainContactNum) {
		// TODO Auto-generated method stub
		return dao.ContractRecordList(start, limit, userid, serialNum, startimes, endtimes, mainContactNum);
	}

	@Override
	public List<QJContractRecordId> ListAdd(Integer start, Integer limit) {
		// TODO Auto-generated method stub
		return dao.ListAdd(start, limit);
	}
	//远程智能柜员易转账明细清单
	@Override
	public List<QJTransferAccounts> TransferAccountsList(Integer start,
			Integer limit, String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		// TODO Auto-generated method stub
		return dao.TransferAccountsList(start, limit, branchId, operatorId, equipmentName, starts, endTims);
	}
	//远程智能柜员易转账明细清单
	@Override
	public int TransferAccountsCount(String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		// TODO Auto-generated method stub
		return dao.TransferAccountsCount(branchId, operatorId, equipmentName, starts, endTims);
	}

	@Override
	public int qJAddCardCount(String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		// TODO Auto-generated method stub
		return dao.qJAddCardCount(branchId, operatorId, equipmentName, starts, endTims);
	}

	@Override
	public List<QJAddCard> qJAddCardList(Integer start, Integer limit,
			String branchId, String operatorId, String equipmentName,
			String starts, String endTims) {
		// TODO Auto-generated method stub
		return dao.qJAddCardList(start, limit, branchId, operatorId, equipmentName, starts, endTims);
	}

	@Override
	public List<QJAddCard> numcount() {
		// TODO Auto-generated method stub
		return dao.numcount();
	}

	//显示远程智能柜员机重空明细汇总清单
	public int QJIssueCardCount(String branchId, String operatorId,
			String equipmentName, String starts, String endTims) {
		// TODO Auto-generated method stub
		return dao.QJIssueCardCount(branchId, operatorId, equipmentName, starts, endTims);
	}

	@Override
	public List<QJIssueCard> QJIssueCardList(Integer start, Integer limit,
			String branchId, String operatorId, String equipmentName,
			String starts, String endTims) {
		// TODO Auto-generated method stub
		return dao.QJIssueCardList(start, limit, branchId, operatorId, equipmentName, starts, endTims);
	}


	
	//远程智能柜员机合约明细清单
	@Override
	public int ContractRecordCount(String branchId, String operatorId,
			String equipmentName, String startimes, String endtimes) {
		
		return dao.ContractRecordCount(branchId, operatorId, equipmentName, startimes, endtimes);
	}

	@Override
	public List<QJContractRecordId> ContractRecordList(Integer start,
			Integer limit, String branchId, String operatorId,
			String equipmentName, String startimes, String endtimes) {
		
		return dao.ContractRecordList(start, limit, branchId, operatorId, equipmentName, startimes, endtimes);
	}
	
	//远程智能柜员机合约汇总清单
	public List<QJContractHZRecord> QJContractRecordZKlist(Integer start, Integer limit,
			String branchId, String operatorId, String equipmentName,
			String starts, String endTims) {
		// TODO Auto-generated method stub
		return dao.QJContractRecordZKlist(start, limit, branchId, operatorId, equipmentName, starts, endTims);
	}

	@Override
	public int QJContractRecordZKCount(String branchId, String operatorId,
			String equipmentName, String startimes, String endtimes) {
		// TODO Auto-generated method stub
		return dao.QJContractRecordZKCount(branchId, operatorId, equipmentName, startimes, endtimes);
	}
	
	public List<Equipment> listEquipmentRole(Integer start, Integer limit,
			String suoshuhang, String branchId, String operatorId) {
		return dao.listEquipmentRole(start, limit, suoshuhang, branchId, operatorId);
	}

	public int listEquipmentRoleCount(String suoshuhang, String branchId,
			String operatorId) {
		return dao.listEquipmentRoleCount(suoshuhang, branchId, operatorId);
	}  

	
	public List<ConHis> SelectRoleCon(Integer start, Integer limit,
			String dealStaId, String busTypId, String buluS, String serialNum,
			String startimes, String endtimes, String mainContactNum,
			String agentName) {
		return dao.SelectRoleCon(start, limit, dealStaId, busTypId, buluS, serialNum, startimes, endtimes, mainContactNum, agentName);
	}

	public int SelectRoleCount(String dealStaId, String busTypId, String buluS,
			String serialNum, String startimes, String endtimes,
			String mainContactNum, String agentName) {
		return dao.SelectRoleCount(dealStaId, busTypId, buluS, serialNum, startimes, endtimes, mainContactNum, agentName);
	}   
	
	public List<QJAddCard> SelectAddCardR(String operatorId, String branchId) {
		return dao.SelectAddCardR(operatorId, branchId);
	}   
	
	public List<QJAddCard> SelectAddRMX(String operatorId, String branchId,String addId) {
		return dao.SelectAddRMX(operatorId, branchId,addId);
	}   
	public List<QJIssueCard> selectIssueR(String operatorId, String branchId,String staDate,String endDate,String addId) {
		return dao.selectIssueR(operatorId, branchId,staDate,endDate,addId);
		

	} 
	public List<QJContractRecordId> selectContraR(String operatorId,
			String branchId, String staDate, String endDate) {
		return dao.selectContraR(operatorId, branchId, staDate, endDate);
	}   
	public List<QJContractHZRecord> SelectQJContractHZR(String operatorId,
			String branchId) {
		return dao.SelectQJContractHZR(operatorId, branchId);
	}   
	public List<AppRole> selectRoleName(Long userId) {
		return dao.selectRoleName(userId);
	}

	@Override   // 20150819
	public List<QJIssueCard> getQJAddCardZuiJin(String MaxDate, String MinDate) {
		
		return dao.getQJAddCardZuiJin(MaxDate, MinDate);
	}

	@Override
	public List<QJContractHZRecord> selectConRMX(String operatorId,
			String branchId, String conId) {
		
		return dao.selectConRMX(operatorId,branchId,conId);
	}

	@Override
	public List<QJContractRecordId> selectReoMX(String operatorId,
			String branchId, String startDate, String endDate) {
		// TODO Auto-generated method stub
		return dao.selectReoMX(operatorId,branchId,startDate,endDate);
	}

	@Override  //20150911 统计易转账总金额接口
	public String CountMoney(String StartT, String EndT) {
		// TODO Auto-generated method stub
		return dao.CountMoney(StartT, EndT);
	}  
	public String CountAmount(String startimes, String endtimes, String wdNum,
			String cusName, String tellernum, String traderesult) {
		return dao.CountAmount(startimes, endtimes, wdNum, cusName, tellernum, traderesult);
	}
	
	

	//2015/10/15 插入登录CTI时间数据记录
	public void saveOrUpdateLoginCTI(CTI_Login_Info loginInfo) {
		// TODO Auto-generated method stub
		dao.saveOrUpdateLoginCTI(loginInfo);
	}

	@Override
	public List<CTI_Login_Info> getMaxLoginInfo(String AgentId) {
		// TODO Auto-generated method stub
		return dao.getMaxLoginInfo(AgentId);
	}

	@Override
	public void saveOrUpdateRestCTI(CTI_Rest_Info restInfo) {
		// TODO Auto-generated method stub
		dao.saveOrUpdateRestCTI(restInfo);
	}
	
	@Override
	public List<CTI_Rest_Info> getMaxRestInfo(String AgentId) {
		// TODO Auto-generated method stub
		return dao.getMaxRestInfo(AgentId);
	} 

	@Override
	public void saveOrUpdateAfterWorkCTI(CTI_AfterWork_Info afterWorkInfo) {
		// TODO Auto-generated method stub
		dao.saveOrUpdateAfterWorkCTI(afterWorkInfo);
	}

	@Override
	public List<CTI_AfterWork_Info> getMaxAfterWorkInfo(String AgentId) {
		// TODO Auto-generated method stub
		return dao.getMaxAfterWorkInfo(AgentId);
	}

	@Override
	public void saveOrUpdateRingingCTI(CTI_Ringing_Info ringingInfo) {
		// TODO Auto-generated method stub
		dao.saveOrUpdateRingingCTI(ringingInfo);
	}

	@Override
	public List<CTI_Ringing_Info> getMaxRingingInfo(String AgentId) {
		// TODO Auto-generated method stub
		return dao.getMaxRingingInfo(AgentId);
	}

	@Override
	public void saveOrUpdateCallInfoCTI(CTI_Call_Info callInfo) {
		// TODO Auto-generated method stub
		dao.saveOrUpdateCallInfoCTI(callInfo);
	}

	@Override
	public List<CTI_Call_Info> getMaxCallInfo(String AgentId) {
		// TODO Auto-generated method stub
		return dao.getMaxCallInfo(AgentId);
	}
	
	@Override
	public List<QJTransferAccounts> selectQJTransferAcco(String machineSelfid) {
		return dao.selectQJTransferAcco(machineSelfid);
}

}