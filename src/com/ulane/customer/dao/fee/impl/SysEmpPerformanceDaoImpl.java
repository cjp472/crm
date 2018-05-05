package com.ulane.customer.dao.fee.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.springframework.orm.hibernate3.HibernateCallback;

import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.htsoft.core.model.TaskLink;
import com.htsoft.core.util.JsonUtil;
import com.ulane.customer.dao.fee.SysEmpPerformanceDao;
import com.ulane.customer.model.fee.CopyOfSysEmpPerformancevo;
import com.ulane.customer.model.fee.SysEmpPerformance;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class SysEmpPerformanceDaoImpl extends BaseDaoImpl<SysEmpPerformance> implements SysEmpPerformanceDao {
	@Resource
	private JdbcPool jdbcPool;
	public SysEmpPerformanceDaoImpl() {
		super(SysEmpPerformance.class);
	}

	@SuppressWarnings("static-access")
	@Override
	public String getSummaryBizOrderFee(String employeeNo, Long deptId) {
		HashMap<String,String> hsmp = new HashMap<String,String>();
		//个人销售额
		String SQL1 = "select VALID_ORDER_CASH from SYS_EMP_PERFORMANCE where employee_no='"+employeeNo+"'";
		
		//小组销售额和平均销售额
		StringBuilder sb = new StringBuilder();
		sb.append("select sum(VALID_ORDER_CASH) SUM_CASH,avg(VALID_ORDER_CASH) AVG_CASH from SYS_EMP_PERFORMANCE emp_per ")
		.append("where exists(select userno from ul_employee ul where depid="+deptId+" and emp_per.employee_no=ul.userno)");
		String SQL2 = sb.toString();
		
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			
			CommTable cTable1 = dbQuery.getCommTableBySQL(SQL1);
			if(null!=cTable1 && cTable1.getRecordCount()>0) {
				if(null!=cTable1.getRecord(0)) {
					hsmp.put("selfSales", cTable1.getRecord(0).get("VALID_ORDER_CASH"));
				}
			}
			
			CommTable cTable2 = dbQuery.getCommTableBySQL(SQL2);
			if(null!=cTable2 && cTable2.getRecordCount()>0) {
				if(null!=cTable2.getRecord(0)) {
					hsmp.put("sumSales", cTable2.getRecord(0).get("SUM_CASH"));
					hsmp.put("avgSales", cTable2.getRecord(0).get("AVG_CASH"));
				}
			}
			return JsonUtil.hsmp2JSON(hsmp);
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			jdbcPool.close(conn);
		}
		return null;
	}
    /**
     * @author lzm
     * 员工每个月的佣金
     * zhouqi-年度
     * jidu-季度
     * userNo-工号
     * perDatSta-年月
     * 
     */
	@Override
	public List<SysEmpPerformance> findYongJin(String zhouqi,String jidu,String userNo,String perDatSta,String perDatEnd) {
		String hql="";
		String nysta="";
		String nyend="";
		//统计月份季度为空 年月不为空
		if(jidu==null || ("null").endsWith(jidu)){
			if( !("").equals(perDatSta)){
				//当前月份佣金
				hql="from SysEmpPerformance vo where vo.perDat =to_date('"+perDatSta+"','yyyy-mm-dd') and vo.employeeNo='"+userNo+"'";
			}
//			if( !("").equals(perDatSta) && )
			else{
				//当前月份佣金
				hql="from SysEmpPerformance vo where vo.perDat =to_date('"+perDatSta+"','yyyy-mm-dd') or vo.employeeNo='"+userNo+"'";
			}
		}
		else{
			//统计季度季度部位空月份为空
	        if(!("").equals(zhouqi) && !("").equals(jidu)){
	        	//第一季度
	        	if(jidu.equals("1")){
	        		nysta=zhouqi+"-01-01";
	        		nyend=zhouqi+"03-31";
	        	}
	        	//第二季度
	        	if(jidu.equals("2")){
	        		nysta=zhouqi+"-04-30";
	        		nyend=zhouqi+"06-30";
	        	}
	        	//第三季度
	        	if(jidu.equals("3")){
	        		nysta=zhouqi+"-07-31";
	        		nyend=zhouqi+"09-30";
	        	}
	        	//第四季度
	        	if(jidu.equals("4")){
	        		nysta=zhouqi+"-10-31";
	        		nyend=zhouqi+"12-31";
	        	}
				//当前季度佣金
				hql="from SysEmpPerformance vo where vo.perDat >=to_date('"+nysta+"','yyyy-mm-dd') and vo.perDat <=to_date('"+nyend +"','yyyy-mm-dd') and vo.employeeNo='"+userNo+"'";
			}
		}
		return findByHql(hql);
	}
    //员工每个季度的佣金
	@Override
	public List<CopyOfSysEmpPerformancevo> findYongJinByQuarter(final String userNo,
			final String ny, final String zhouqi) {
		final List<CopyOfSysEmpPerformancevo> sysemps = new ArrayList<CopyOfSysEmpPerformancevo>();
		final String sql="select  t.employee_no as employee_no, to_char(sysdate,'q') as empPerQuarter,sum(t.TOTAL_ORDERS) as TOTAL_ORDERS "+
		 ",sum(t.TOTAL_ORDER_CASH) as TOTAL_ORDER_CASH , sum(t.CANCELED_ORDERS) as CANCELED_ORDERS,sum(t.CANCELED_CASH) as CANCELED_CASH,"+
		"sum(t.EXCHANGE_CASH) as EXCHANGE_CASH,sum(t.EXCHANGE_ORDERS) as EXCHANGE_ORDERS,sum(t.VALID_ORDERS) as VALID_ORDERS,"+
		"sum(t.VALID_ORDER_CASH) as VALID_ORDER_CASH,sum(t.BACK_ORDERS) as BACK_ORDERS,sum(t.BACK_ORDER_CASH)  as BACK_ORDER_CASH,sum(t.ORDER_GOODS) as ORDER_GOODS,"+
		"sum(t.TOTAL_PHONES) as TOTAL_PHONES  from  sys_emp_performance t  where t.employee_no='"+userNo+"' and  t.emp_per_quarter is null group by to_char(sysdate,'q') ,t.employee_no  ";
		getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException, SQLException {
				session.doWork(new Work() {
					@Override
					public void execute(Connection con) throws SQLException {
						PreparedStatement ps = con.prepareStatement(sql,
								ResultSet.TYPE_SCROLL_SENSITIVE,
								ResultSet.CONCUR_UPDATABLE);
						java.sql.ResultSet rs = ps.executeQuery();
						if (rs.next()) {// 至少有一条记录，才可以定位
							listAdds(sysemps,rs);
						}
						rs.close();
						ps.close();
					}
				});
				return null;
			}
		}); 
		return sysemps;
	}
	//用于存储用工每个季度的佣金 处理类
	public List<CopyOfSysEmpPerformancevo> listAdds(List<CopyOfSysEmpPerformancevo> taskLinkList,java.sql.ResultSet rs) throws SQLException{
		CopyOfSysEmpPerformancevo taskLink = new CopyOfSysEmpPerformancevo();
		taskLink.setEmployeeNo(rs.getString("employee_no"));			//工号
//		taskLink.setPerDat(rs.getDate("PER_DAT"));						//粘液
		taskLink.setTotalOrderCash(rs.getBigDecimal("TOTAL_ORDER_CASH"));//总金额
		taskLink.setTotalOrders(rs.getLong("TOTAL_ORDERS"));				//总单数
		taskLink.setCanceledOrders(rs.getLong("CANCELED_ORDERS"));    		
		taskLink.setCanceledCash(rs.getBigDecimal("CANCELED_CASH"));
		taskLink.setExchangeOrders(rs.getLong("EXCHANGE_ORDERS"));
		taskLink.setExchangeCash(rs.getBigDecimal("EXCHANGE_CASH"));
		taskLink.setValidOrders(rs.getLong("VALID_ORDERS"));
		taskLink.setValidOrderCash(rs.getBigDecimal("VALID_ORDER_CASH"));
		taskLink.setBackOrders(rs.getLong("BACK_ORDERS"));
		taskLink.setBackOrderCash(rs.getBigDecimal("BACK_ORDER_CASH"));
		taskLink.setOrderGoods(rs.getLong("ORDER_GOODS"));
		taskLink.setTotalPhones(rs.getLong("TOTAL_PHONES"));
		taskLink.setEmpPerQuarter(rs.getString("empPerQuarter"));
		taskLinkList.add(taskLink);
		return taskLinkList;
	}
	

}