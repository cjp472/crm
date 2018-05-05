package com.ulane.customer.dao.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.customer.BankType;
import com.htsoft.oa.model.system.AppRole;

import com.ulane.base.model.info.QJContractHZRecord;
import com.ulane.base.model.info.QJContractRecordId;
import com.ulane.base.model.info.QJAddCard;
import com.ulane.base.model.info.QJIssueCard;
import com.ulane.base.model.info.QJTransferAccounts;
import com.ulane.base.model.xitong.Equipment;
import com.ulane.customer.model.customer.CTI_AfterWork_Info;
import com.ulane.customer.model.customer.CTI_Call_Info;
import com.ulane.customer.model.customer.CTI_Login_Info;
import com.ulane.customer.model.customer.CTI_Rest_Info;
import com.ulane.customer.model.customer.CTI_Ringing_Info;
import com.ulane.customer.model.customer.CallIdOrAgentInfo;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.Examine;
import com.ulane.customer.model.customer.MachineSelf;
import com.ulane.customer.model.customer.MachineSelfAttach;
import com.ulane.customer.model.customer.OperationData;
import com.ulane.customer.model.customer.SysWorkattendance;

/**
 * 
 * @author cf0666@gmail.com
 *
 */
public interface ConHisDao extends BaseDao<ConHis>{
	
	public Long getMaxConHis();
	
	/***
	 * 2014/04/22
	 * hy   
	 * 存储后台对应callid和agentid编号
	 * @param callIdOrAgentInfo
	 */
	public void saveCallIdOrAgentId(String callid ,String agentid,String machineid);
	
	/***
	 * 2014/07/29
	 * hy   
	 * 身份核查补录，后台记录数据，提供报表基础
	 * @param callIdOrAgentInfo
	 */
	public void insertExamineInfo(Examine examine);
	
	/***
	 * 2014/06/03
	 * hy   
	 * 修改自动生成流水号	
	 * @param conhisid
	 * @param cusName
	 * @param dealno
	 */
	public void updateDealNum(String conhisid,String cusName,String dealno);
	
	public Equipment selectEquiName(String eId);
	
	//------------------------------------------补录报表
	/**
	 * 2014/11/7
	 * 补录报表的查询
	 * （带分页）
	 * nk
	 */
	
	public List<Examine>  ExamineReport(Integer start, Integer limit, String dealNum, String cusName,
			 String transactP, String examineP,  String examineD,  String examineR);
	//查询补录报表的总条数
	public Integer ExamineReportCount(String dealNum, String cusName,
			 String transactP, String examineP,  String examineD,  String examineR);
	
	
	/**
	 * 2015/01/30
	 * 质检考核的查询
	 * （带分页）
	 * nk
	 */
	
	public List<SysWorkattendance>  SysWorkattendance(Integer start, Integer limit, String loginTime, String logoutTime);
			
	public Integer SysWorkattendanceCount( String loginTime,String logoutTime);
	
	
	
	
	
	/**
	 * ======================================================================================================
	 * 机构部门的增删改
	 * @author wkj@nk
	 * 
	 * */
	List<BankType> findByParentId(Long long1);
	
	
	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序
	 * @param path
	 * @return
	 */
	public List<BankType> findByParentIdForSql(final int start,final int limit,String path);
	/**
	 * 查找树下面的子节点 子节点信息按照父节点名称排序(获得数量)
	 * @param path
	 * @return
	 */
	public int findByParentIdForSqlCount(final int start,final int limit,String path);
	/**
	 * 查找采集权限树,根据权限
	 * @param parentId
	 * @return
	 */
	public List<BankType> collectFindByParentIdForRole(Long parentId);
	
	/**
	 *2015/1/15 删除bank @author NK
	 * */
	public void getDelBank(Long bankTypeId);
	
	public List<BankType> selectName();
	
	
	
	/*
	 * 2015-01-17
	 * @anthor :wkj@nk 
	 * 机构部门的修改
	 * */


	public void updateBankType(Long bankTypeId,String bankName,String updateDate,String branchId);
	/**
	 * 机构部门的添加及保存操作
	 * @author wkj@nk
	 */
	public void addBankType(String curDate,String bankName,Long parentId,String branchId);
	
	
	/**
	 * 返回根节点下的所有节点(只查找一层)
	 * 
	 * * @return
	 */
	public List<BankType> getProvince();
	public List<BankType> selectparentName(Long id);
	
	/***
	 * 2014/12/18
	 * Hyman   
	 * 存储后台OperationData数据
	 * @param 
	 */
	public void insertOperationData(Long BS_Num ,String agentid,String insertTime,String Stype);
	
	/***
	 * 2014/12/18
	 * Hyman   
	 * 查询OperationData数据中BS_Num字段最大的值
	 * @param 
	 */
	public OperationData selectMaxOpera();
	
	/***
	 * 2014/12/18
	 * Hyman   
	 * 插入Attendance数据值  考勤记录
	 * @param  Long BS_num,String agentid,String loginsystime,String loginctitime,String logoutsystime,String status,String reason
	 */
	public void insertWorkAttendance(Long BS_num,String agentid,String loginsystime,String loginctitime,String logoutsystime,String status,String reason,String remarks);
	
	

	/**
	 * 20150208
	 * 自主终端资料查询
	 * Fernando
	 */
	public List<MachineSelf>  machineSelfList(Integer start, Integer limit, String wdNum, String cusName,
			 String tellernum, String tradedateStart,String tradedateEnd,String traderesult);
	
	public Integer machineSelfCount(String wdNum, String cusName, String tellernum, String tradedateStart,String tradedateEnd,String traderesult);
	
	/**
	 * 20150209
	 * 自助终端详细信息
	 * Fernando
	 */
	public List<MachineSelfAttach> machSelfAttachList(String msid);
	
	
		/**
		 *      业务资料查询
		 * @author wangkaijuan
		 * 2015/05/06
		 */
		
		
		public List<ConHis> conHisList(Integer start, Integer limit,Long userid,String dealStaId, String busTypId,String bulu_S, String serialNum,
				 String startimes, String endtimes,String mainContactNum,String agentName);
		/**
		 *      业务资料总数
		 * @author wangkaijuan
		 * 2015/05/06
		 */
		public int conHisListCount(Long userid,String dealStaId, String busTypId,String bulu_S, String serialNum,
				 String startimes, String endtimes,String mainContactNum,String agentName);
		//显示合约记录
		public List<QJContractRecordId> ContractRecordList(Integer start, Integer limit,
				Long userid, String serialNum, String startimes, String endtimes,
				String mainContactNum);
		public List<QJAddCard> numcount();
		
		public List<QJContractRecordId> ListAdd(Integer start, Integer limit);
		//远程智能柜员易转账明细清单
		public List<QJTransferAccounts> TransferAccountsList(Integer start,
				Integer limit, String branchId, String operatorId,
				String equipmentName, String starts, String endTims);
		
		public int TransferAccountsCount(String branchId, String operatorId,
				String equipmentName, String starts, String endTims);
		

		public List<QJAddCard> qJAddCardList(Integer start, Integer limit,
				String branchId, String operatorId, String equipmentName,
				String starts, String endTims);
		public int qJAddCardCount(String branchId, String operatorId,
				String equipmentName, String starts, String endTims);
		//显示远程智能柜员机重空明细汇总清单
		public List<QJIssueCard> QJIssueCardList(Integer start, Integer limit,
				String branchId, String operatorId, String equipmentName,
				String starts, String endTims);

		public int QJIssueCardCount(String branchId, String operatorId,
				String equipmentName, String starts, String endTims);
		
		
		//远程智能柜员机合约明细清单
		public List<QJContractRecordId> ContractRecordList(Integer start,
				Integer limit, String branchId, String operatorId,
				String equipmentName, String startimes, String endtimes);

		public int ContractRecordCount(String branchId, String operatorId,
				String equipmentName, String startimes, String endtimes);


		//远程智能柜员机合约汇总清单
		public int QJContractRecordZKCount(String branchId, String operatorId,
				String equipmentName, String startimes, String endtimes);

		public List<QJContractHZRecord> QJContractRecordZKlist(Integer start, Integer limit,
				String branchId, String operatorId, String equipmentName,
				String starts, String endTims); 
		public List<Equipment> listEquipmentRole(Integer start, Integer limit,
				String suoshuhang, String branchId, String operatorId);

		public int listEquipmentRoleCount(String suoshuhang, String branchId,
				String operatorId);  
		public List<ConHis> SelectRoleCon(Integer start, Integer limit,
				String dealStaId, String busTypId, String buluS, String serialNum,
				String startimes, String endtimes, String mainContactNum,
				String agentName);

		public int SelectRoleCount(String dealStaId, String busTypId, String buluS,
				String serialNum, String startimes, String endtimes,
				String mainContactNum, String agentName);   
		public List<QJAddCard> SelectAddCardR(String operatorId, String branchId);
		public List<QJAddCard> SelectAddRMX(String operatorId, String branchId,String addId);   
		public List<QJIssueCard> selectIssueR(String operatorId, String branchId,String staDate,String endDate,String addId); 
		public List<QJContractRecordId> selectContraR(String operatorId,
				String branchId, String staDate, String endDate);   
		public List<QJContractHZRecord> SelectQJContractHZR(String operatorId,
				String branchId);   
		public List<AppRole> selectRoleName(Long userId);  
		
		//20150819  getQJAddCardZuiJin
		public List<QJIssueCard> getQJAddCardZuiJin(String MaxDate, String MinDate);
		
		
		public List<QJContractHZRecord> selectConRMX(String operatorId, String branchId,String conId);   
		//带着两个日期来查询合约明细中是否有数据
		public List<QJContractRecordId> selectReoMX(String operatorId, String branchId , String startDate , String endDate);
		
		//20150911 统计易转账总金额接口
		public String CountMoney(String StartT , String EndT);
		public String CountAmount(String startimes, String endtimes, String wdNum,
				String cusName, String tellernum, String traderesult);
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//   2015/10/15 插入登录CTI时间数据记录
		public void saveOrUpdateLoginCTI(CTI_Login_Info loginInfo);
		
		//20151015 拿AgentID查询最大的主键ID数据
		public List<CTI_Login_Info> getMaxLoginInfo(String AgentId);
		
		//20151016 插入CTI小休时间数据记录
		public void saveOrUpdateRestCTI(CTI_Rest_Info restInfo);
		
		//20151016 拿AgentID查询最大的主键ID数据
		public List<CTI_Rest_Info> getMaxRestInfo(String AgentId);
		
		//20151019 插入事后处理CTI时间数据记录
		public void saveOrUpdateAfterWorkCTI(CTI_AfterWork_Info afterWorkInfo);
		
		//20151019 拿AgentID查询最大的主键ID数据
		public List<CTI_AfterWork_Info> getMaxAfterWorkInfo(String AgentId);
		
		//20151019 插入来电振铃CTI时间数据记录
		public void saveOrUpdateRingingCTI(CTI_Ringing_Info ringingInfo);
		
		//20151019 拿AgentID查询最大的主键ID数据
		public List<CTI_Ringing_Info> getMaxRingingInfo(String AgentId);
		
		//20151020 插入来电振通话时间数据记录
		public void saveOrUpdateCallInfoCTI(CTI_Call_Info callInfo);
		
		//20151020 拿AgentID查询最大的主键ID数据
		public List<CTI_Call_Info> getMaxCallInfo(String AgentId);
		
		
		public List<QJTransferAccounts> selectQJTransferAcco(String machineSelfid);
}