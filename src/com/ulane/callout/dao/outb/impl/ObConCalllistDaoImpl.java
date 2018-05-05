package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.math.BigDecimal;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.springframework.jdbc.core.JdbcTemplate;

import orm.complex.query.framework.RowSet;
import orm.complex.query.framework.commtable.CommTable;

import com.htsoft.core.dao.DBQuery;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.dao.pool.JdbcPool;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.json.JSONArray;
import com.ulane.callout.dao.outb.ObConCalllistDao;
import com.ulane.callout.model.outb.ObCallbatchAss;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.model.outb.ObSaletask;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObConCalllistDaoImpl extends BaseDaoImpl<ObConCalllist> implements ObConCalllistDao{

	@Resource
	protected JdbcTemplate jdbcTemplate;
	@Resource
	private JdbcPool jdbcPool;
	
	public ObConCalllistDaoImpl() {
		super(ObConCalllist.class);
	}
	public List<ObConCalllist> findConCalllist(long calllistId,String callbatchNam,int start,int limit) {
		StringBuffer sb=new StringBuffer();
		sb.append("select * from  ( select rownum rowindex,a.* from ob_con_calllist a where exists (select b.callbatch_Id from ob_callbatch b  where a.callbatch_Id = b.callbatch_Id and b.calllist_Id=");
		sb.append(calllistId);
		if(callbatchNam!=null&&!callbatchNam.equals("null")) sb.append(" and b.callbatch_Nam like '%").append(callbatchNam).append("%'");
		sb.append(")  ) t WHERE t.rowindex>").append(start).append(" AND t.rowindex <").append(start+limit+1);
		
//        
//        String hql="select * from  ( select rownum rowindex,a.* from ob_con_calllist a where"+  
//				" exists (select b.callbatch_Id from ob_callbatch b  where a.callbatch_Id = b.callbatch_Id and b.calllist_Id="+calllistId+")  ) t"+
//				" WHERE t.rowindex>= "+start+" AND t.rowindex <"+start+limit;
        List<ObConCalllist> obConCalllists =jdbcTemplate.queryForList(sb.toString());
        List<ObConCalllist> obConCalllists2=new ArrayList();
        if(obConCalllists!=null&&obConCalllists.size()>0) {
        	for(int i=0;i<obConCalllists.size();i++) {
        		Map obConCalllist=(Map)obConCalllists.get(i);
//        		ObConCalllist conCalllist=new ObConCalllist();
//        		conCalllist.setCusId(((BigDecimal)obConCalllist.get("cus_id")).longValue());
//        		if(obConCalllist.get("customerid")!=null)
//        		conCalllist.setCustomerId(((BigDecimal)obConCalllist.get("customerid")).longValue());
//        		conCalllist.setNameCn((String)obConCalllist.get("NAME_CN"));
//        		if(obConCalllist.get("GENDER")!=null)
//        		conCalllist.setGender((String)obConCalllist.get("GENDER"));
//        		if(obConCalllist.get("CRED_TYP_ID")!=null)
//        		conCalllist.setCredTypId(((BigDecimal)obConCalllist.get("CRED_TYP_ID")).shortValue());
//        		if(obConCalllist.get("BIRTHDAY")!=null)
//        		conCalllist.setBirthday((String)obConCalllist.get("BIRTHDAY"));
//        		if(obConCalllist.get("CRED_NUM")!=null)
//        		conCalllist.setCredNum((String)obConCalllist.get("CRED_NUM"));
        		
        		obConCalllists2.add(this.get(((BigDecimal)obConCalllist.get("cus_id")).longValue()));
        	}
        }
        return obConCalllists2;
	}	
	
	public long getCount(long calllistId,String callbatchNam) {
		StringBuffer sb=new StringBuffer();
		sb.append(" select * from ob_con_calllist a where exists (select b.callbatch_Id from ob_callbatch b  where a.callbatch_Id = b.callbatch_Id and b.calllist_Id=");
		sb.append(calllistId);
		if(callbatchNam!=null&&!callbatchNam.equals("null")) sb.append(" and b.callbatch_Nam like '%").append(callbatchNam).append("%'");
		sb.append(")");
//        String hql=" select * from ob_con_calllist a where"+  
//				" exists (select b.callbatch_Id from ob_callbatch b  where a.callbatch_Id = b.callbatch_Id and b.calllist_Id="+calllistId+")";
		List<ObConCalllist> obConCalllists =jdbcTemplate.queryForList(sb.toString()) ;
		long count=0;
		if(obConCalllists!=null) {
			count=obConCalllists.size();
		}
        return count;
	}
	
	public List<ObConCalllist> findListCusByAdmin(String callbatchAssIds,int start,int limit,String nameCn,Short dealResId) {
		StringBuffer sb=new StringBuffer();
//		sb.append("select * from (select rownum rowindex,a.* from ob_con_calllist a where exists ");
//		sb.append("(select b.cus_id from ob_callbatch_cus b where b.cus_id=a.customerid and b.callbatch_id=a.callbatch_id and b.callbatch_ass_id in(");
//		sb.append(callbatchAssIds);
//		sb.append("))) c ").append("where rownum>").append(start).append(" and rownum<").append((start+limit+1)); 
//		if(nameCn!=null) sb.append(" and c.name_cn like '%").append(nameCn).append("%'");
//		if(dealResId!=null) sb.append(" and (select  con_sta_id from ob_saletask d where d.cus_id=c.customerid)=").append(dealResId);
//        List<ObConCalllist> obConCalllists =jdbcTemplate.queryForList(sb.toString());
//        List<ObConCalllist> obConCalllists2=new ArrayList();
//        if(obConCalllists!=null&&obConCalllists.size()>0) {
//        	for(int i=0;i<obConCalllists.size();i++) {
//        		Map obConCalllist=(Map)obConCalllists.get(i);
//        		
//        		obConCalllists2.add(this.get(((BigDecimal)obConCalllist.get("cus_id")).longValue()));
//        	}
//        }
        
        sb.append("select vo from ObConCalllist vo where exists (select b.cusId from ObCallbatchCus b where b.cusId=vo.customerId and b.callbatchId=vo.obCallbatch.callbatchId and b.obCallbatchAss.callbatchAssId in(")
        .append(callbatchAssIds).append("))");
        if(nameCn!=null) sb.append(" and vo.nameCn like '%").append(nameCn).append("%'");
        if(dealResId!=null) sb.append(" and (select  d.conStaId from ObSaletask d where d.cusId=vo.customerId)=").append(dealResId);
		Query query = this.getSession().createQuery(sb.toString());	
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();
        //return obConCalllists2;		
	}
	
	public long getCountByAssIds(String callbatchAssIds,String nameCn,Short dealResId) {
//		String sql="select a.* from ob_con_calllist a where exists "+
//                "(select b.cus_id from ob_callbatch_cus b where b.cus_id=a.customerid and b.callbatch_ass_id in("+callbatchAssIds+"))";
//        List<ObConCalllist> obConCalllists =jdbcTemplate.queryForList(sql);
		StringBuffer sb=new StringBuffer();
		sb.append("select vo from ObConCalllist vo where exists (select b.cusId from ObCallbatchCus b where b.cusId=vo.customerId and b.callbatchId=vo.obCallbatch.callbatchId and b.obCallbatchAss.callbatchAssId in(")
        .append(callbatchAssIds).append("))");
        if(nameCn!=null) sb.append(" and vo.nameCn like '%").append(nameCn).append("%'");
        if(dealResId!=null) sb.append(" and (select  d.conStaId from ObSaletask d where d.cusId=vo.customerId)=").append(dealResId);
        
		long count=0;
		List<ObConCalllist> list=findByHql(sb.toString());
		if(list!=null&&list.size()>0) count=list.size();
		return count;	
	}	
	
	public List<ObConCalllist> listConCalllistByUserNo(Long callbatchId,String useNo,String whereSql){
		StringBuffer sql=new StringBuffer("select * from Ob_Con_Calllist con");
		if(whereSql!=null&&!whereSql.equals("")) {
			 sql.append(",Cus_Personal pcus");
		}
		sql.append("  where con.ext_1=").append(useNo);
	    sql.append(" and con.callbatch_id=").append(callbatchId);
		if(whereSql!=null&&!whereSql.equals("")) {
			sql.append(" and  con.customerid=pcus.customerid ");
			sql.append(whereSql);
		}
		
		List<ObConCalllist> obConCalllists =jdbcTemplate.queryForList(sql.toString());
        List<ObConCalllist> obConCalllists2=new ArrayList();
        if(obConCalllists!=null&&obConCalllists.size()>0) {
        	for(int i=0;i<obConCalllists.size();i++) {
        		Map obConCalllist=(Map)obConCalllists.get(i);
        		obConCalllists2.add(this.get(((BigDecimal)obConCalllist.get("cus_id")).longValue()));
        	}
        }		
		return obConCalllists2;
	}
	
	public List<ObConCalllist> listConCalllistByCallbatch(Long obCallbatchId,String whereSql) {
		StringBuffer sql=new StringBuffer("select * from Ob_Con_Calllist con");
		if(whereSql!=null&&!whereSql.equals("")) {
			 sql.append(",Cus_Personal pcus");
		}
		sql.append(" where con.callbatch_id=").append(obCallbatchId);
		if(whereSql!=null&&!whereSql.equals("")) {
			sql.append(" and con.customerid=pcus.customerid ");
			sql.append(whereSql);
		}
		List<ObConCalllist> obConCalllists =jdbcTemplate.queryForList(sql.toString());
        List<ObConCalllist> obConCalllists2=new ArrayList();
        if(obConCalllists!=null&&obConCalllists.size()>0) {
        	for(int i=0;i<obConCalllists.size();i++) {
        		Map obConCalllist=(Map)obConCalllists.get(i);
        		obConCalllists2.add(this.get(((BigDecimal)obConCalllist.get("cus_id")).longValue()));
        	}
        }		
		return obConCalllists2;
		
	}
	@SuppressWarnings("static-access")
	@Override
	public String getComRulPoolCusInfo(Map<String, String> param) {
		String comId = param.get("comId");
		if(StringUtils.isBlank(comId)) {
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':0").append(",result:}");
			return buff.toString();
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append("select *  from OB_CON_CALLLIST conCalllist ");
		sb.append(" where com_id="+comId+" and conCalllist.IS_LOCKED="+ObConCalllist.IS_LOCKED_FALSE);
		
		String SQL = sb.toString();
		
		String pagStart = param.get("pagStart");
		String pageSize = param.get("pageSize");
		Integer start = 0;
		Integer limit = 25;
		if(StringUtils.isNotBlank(pagStart) && StringUtils.isNotBlank(pageSize)) {
			start = Integer.parseInt(pagStart);
			limit = Integer.parseInt(pageSize);
		}
		RowSet rowSet = new RowSet(start,limit);
		Connection conn = null;
		try {
			conn = jdbcPool.getConn();
			DBQuery dbQuery = DBQuery.getDBQuery(conn);
			String selectSQL =  dbQuery.getQuerySQL(SQL, rowSet);					//获取Oracle的分页查询
			
			Long totalCounts = dbQuery.getRecordCount(SQL);							//获取总记录数
			CommTable cTable = dbQuery.getCommTableBySQL(selectSQL);
			
			//转换为客户端对应的JSON串
			List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
			int iCount = cTable.getRecordCount();
			for(int i=0; i<iCount; i++) {
				HashMap<String,String> row = new HashMap<String,String>();
				row.put("cusId", cTable.getRecord(i).get("CUSTOMERID"));					//客户内码
				row.put("cusNo", cTable.getRecord(i).get("CUS_CODE"));						//客户业务编号(用于两个系统之间数据同步)
				row.put("nameCn", cTable.getRecord(i).get("NAME_CN"));						//客户名称
				row.put("gender", cTable.getRecord(i).get("GENDER"));						//客户性别
				row.put("credTypId", cTable.getRecord(i).get("CRED_TYP_ID"));				//证件类型
				row.put("credNum", cTable.getRecord(i).get("CRED_NUM"));					//证件号码
				result.add(row);
			}
			JSONArray json = new JSONArray(result);
			String data = json.toString();
			
			StringBuilder buff = new StringBuilder("{success:true,'totalCounts':").append(totalCounts).append(",result:");
			buff.append(data);
			buff.append("}");
			return buff.toString();
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			jdbcPool.close(conn);
		}
		return null;
	}

}