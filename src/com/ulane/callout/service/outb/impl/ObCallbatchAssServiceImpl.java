package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.callout.dao.outb.ObCallbatchAssDao;
import com.ulane.callout.model.outb.ObCallbatchAss;
import com.ulane.callout.service.outb.ObCallbatchAssService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObCallbatchAssServiceImpl extends BaseServiceImpl<ObCallbatchAss> implements ObCallbatchAssService{
	@SuppressWarnings("unused")
	private ObCallbatchAssDao dao;
	@Resource
	private AppUserService appUserService;
	@Resource
	protected JdbcTemplate jdbcTemplate;
	@Resource
	private UlEmployeeService ulEmployeeService;
	
	public ObCallbatchAssServiceImpl(ObCallbatchAssDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override 
	public List<ObCallbatchAss> getJingLi(AppUser user,int start,int limit) {
		// TODO Auto-generated method stub
		List<ObCallbatchAss>  ObCallbatchAsss=injectIdToName(dao.getJingLi(user,start,limit));
		return ObCallbatchAsss;
	}
	
	public int getJingLiCount(AppUser user) {
		return dao.getJingLiCount(user);
	}

	@Override
	public List<ObCallbatchAss> getZuZhang(AppUser user,int start,int limit) {
		// TODO Auto-generated method stub
		List<ObCallbatchAss>  ObCallbatchAsss=injectIdToName(dao.getZuZhang(user,start,limit));
		return ObCallbatchAsss;
	}
	
	public int getZuZhangCount(AppUser user) {
		return dao.getZuZhangCount(user);
	}

	@Override
	public List<ObCallbatchAss> injectIdToName(List<ObCallbatchAss> list) {
		if(null==list || list.size()==0) return null;
		for(ObCallbatchAss obj:list) {
			obj.setFromUseName(getNameFromId(obj.getFromAppUser().getUserId().toString(),0));			//将分配人转中文名
			if(obj.getToAppUser()!=null) {
				obj.setToUserName(getNameFromId(obj.getToAppUser().getUserId().toString(),0));				//将回收人转中文名
			} else {
				obj.setToUserName(getNameFromId(obj.getToUserNo(),1));
			}
		}
		return list;
	}
	
	/**
	 * 根据ID查找姓名
	 * @param id
	 * @param flag 为0时用户id 为1时用户工号
	 * @return
	 */
	private String getNameFromId(String id,int flag) {
		String name="";
		if(flag==0) {
			name= appUserService.get(Long.valueOf(id)).getFullname();
		} else if(flag==1) {
			name= ulEmployeeService.getEmployeeByUserNo(id).getFullname();
		}
		return name;
	}
	
	@Override
	public List<ObCallbatchAss> getAssign1(Long userId,String callbatchAssIds,int start,int limit) {
		List<ObCallbatchAss>  ObCallbatchAsss=injectIdToName(dao.getAssign1(userId,callbatchAssIds,start,limit));
		return ObCallbatchAsss;
	}	
	
	public int getAssign1Count(Long userId,String callbatchAssIds,int start,int limit) {
		return dao.getAssign1Count(userId, callbatchAssIds, start, limit);
	}
	
	public List<ObCallbatchAss> listAssByParentId(Long callbatchAssId,Integer start,Integer limit) {
		List<ObCallbatchAss> ass=dao.listAssByParentId(callbatchAssId,start,limit);
		if(ass!=null&&ass.size()>0) {
			return injectIdToName(ass);
		} else {
			return new ArrayList<ObCallbatchAss>();
		}
	}
	
	public List<ObCallbatchAss> listAssByIds(String callbatchAssIds) {
          return dao.listAssByIds(callbatchAssIds);
	}
	
	public List<ObCallbatchAss> listAssByParentIds(String strJLIds) {
        return dao.listAssByParentIds(strJLIds);
	}

	
	public int listAssByParentIdCount(Long callbatchAssId,int start,int limit) {
		return dao.listAssByParentIdCount(callbatchAssId, start, limit);
	}
	
	public int getRerivedByAdmin(String allAssIds) {
		return dao.getRerivedByAdmin(allAssIds);
	}
	
	public int getHoldCounts(String allAssIds) {
		return dao.getHoldCounts(allAssIds);
	}
	
	public int getRerivedByJL(String allAssIds) {
		return dao.getRerivedByJL(allAssIds);
	}
	
	public int getRerivedByZZ(String allAssIds) {
		return dao.getRerivedByZZ(allAssIds);
	}	

	public List listDate(Long userId,int start,int limit,String callbatchNam,String fromUseName ){
    	return dao.listDate(userId,start,limit,callbatchNam,fromUseName);
    }
	
	public int getDateCount(Long userId,String callbatchNam,String fromUseName) {
		return dao.getDateCount(userId,callbatchNam,fromUseName);
	}
	
	public List<ObCallbatchAss> listAssByDate(Long userId,String date,String callbatchNam,String fromUseName) {
		return dao.listAssByDate(userId,date,callbatchNam,fromUseName);
	}
	
	public List<ObCallbatchAss> listAssByCallbatch(Long callbatchId,String assOrRetr,int start,int limit) {
		return dao.listAssByCallbatch(callbatchId,assOrRetr,start,limit);
	}
	
	public int listAssByCallbatchCount(Long callbatchId,String assOrRetr) {
		return dao.listAssByCallbatchCount(callbatchId,assOrRetr);
	}
	
	public List<ObCallbatchAss> huishouAssList(int start,int limit,String retriveUserNam,String retriveDat) {
		return dao.huishouAssList(start,limit,retriveUserNam,retriveDat);
	}
	public int  huishouAssListCount(String retriveUserNam,String retriveDat) {
		return dao.huishouAssListCount(retriveUserNam,retriveDat);
	}
	
	public void retriveCusByAdmin(String allAssIds,String whereSql,int realRetrivedCount) {
		StringBuffer sql  = 
			new StringBuffer("select callbatch_cus_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql.append(" and rownum<=").append(realRetrivedCount);
		
		
		StringBuffer sql_1  = 
			new StringBuffer("select callbatch_ass_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql_1.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql_1.append(" and rownum<=").append(realRetrivedCount);
		
		
		StringBuffer sql3  = 
			new StringBuffer("select cus_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql3.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql3.append(" and rownum<=").append(realRetrivedCount);	
		
		StringBuffer sql4=new StringBuffer("update ob_saletask set CUS_GRP_ID=null,USE_ID=null,CALLBATCH_ASS_ID=null,BUSI_STA_ID=2,LAST_DIA_DAT=(select to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') from dual)");
		sql4.append(" where  CUS_ID in(").append(sql3).append(")");
		this.jdbcTemplate.execute(sql4.toString());		
		
		StringBuffer sql1=new StringBuffer("update ob_callbatch_ass a set a.retrive_count=nvl(a.retrive_count+(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		
		sql1.append(" ,a.hold_count=nvl(a.hold_count-(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		sql1.append(" ,a.retrive_count_admin=nvl(a.retrive_count_admin+(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		sql1.append(",a.retrive_dat=(select to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') from dual)");
		sql1.append(",a.retrive_use_id=").append(ContextUtil.getCurrentUserId());
		
		sql1.append(" where a.callbatch_ass_id in(").append(sql_1).append(")");
		
		this.jdbcTemplate.execute(sql1.toString());
		System.out.println("************adminsql1*****************************"+sql1);
		
		StringBuffer sql2=new StringBuffer("update ob_callbatch_cus set ass_sta_id=0,ass_step_id=null,callbatch_ass_id=null,from_use_id=null,to_use_id=null  where  callbatch_cus_id in(");
		sql2.append(sql).append(")");	
		this.jdbcTemplate.execute(sql2.toString());
		System.out.println("************adminsql2*****************************"+sql2);
		
	}
	
	public void retriveCusByJL(String allAssIds,String whereSql,int realRetrivedCount,ObCallbatchAss parentAss) {
		StringBuffer sql  = 
			new StringBuffer("select callbatch_cus_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql.append(" and rownum<=").append(realRetrivedCount);
		
		StringBuffer sql_1  = 
			new StringBuffer("select callbatch_ass_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql_1.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql_1.append(" and rownum<=").append(realRetrivedCount);		
		
		
		StringBuffer sql3  = 
			new StringBuffer("select cus_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql3.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql3.append(" and rownum<=").append(realRetrivedCount);	
		
		StringBuffer sql4=new StringBuffer("update ob_saletask set CUS_GRP_ID=null,USE_ID=null,CALLBATCH_ASS_ID=null,BUSI_STA_ID=2,LAST_DIA_DAT=(select to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') from dual)");
		sql4.append(" where CUS_ID in(").append(sql3).append(")");	
		this.jdbcTemplate.execute(sql4.toString());		
		
		StringBuffer sql1=new StringBuffer("update ob_callbatch_ass a set a.retrive_count=nvl(a.retrive_count+(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		
		sql1.append(" ,a.hold_count=nvl(a.hold_count-(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		sql1.append(" ,a.retrive_count_JL=nvl(a.retrive_count_JL+(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		sql1.append(",a.retrive_dat=(select to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') from dual)");
		sql1.append(",a.retrive_use_id=").append(ContextUtil.getCurrentUserId());
		sql1.append(" where a.callbatch_ass_id in(").append(sql_1).append(")");
		this.jdbcTemplate.execute(sql1.toString());
		System.out.println("************JLsql1*****************************"+sql1);
		
		StringBuffer sql2=new StringBuffer("update ob_callbatch_cus set ass_sta_id=1,ass_step_id=0,callbatch_ass_id=").append(parentAss.getCallbatchAssId())
		.append(",from_use_id=").append(parentAss.getFromAppUser().getUserId())
		.append(",to_use_id=").append(parentAss.getToAppUser().getUserId())
		.append(" where  callbatch_cus_id in(").append(sql).append(")");	
		this.jdbcTemplate.execute(sql2.toString());
		System.out.println("************JLsql2*****************************"+sql2);
		
	}	
	
	public void retriveCusByZZ(String allAssIds,String whereSql,int realRetrivedCount,ObCallbatchAss parentAss) {
		
		StringBuffer sql  = 
			new StringBuffer("select callbatch_cus_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql.append(" and rownum<=").append(realRetrivedCount);
		
		StringBuffer sql_1  = 
			new StringBuffer("select callbatch_ass_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql_1.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql_1.append(" and rownum<=").append(realRetrivedCount);			
		
		StringBuffer sql3  = 
			new StringBuffer("select cus_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(allAssIds).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql3.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		sql3.append(" and rownum<=").append(realRetrivedCount);	
		
		StringBuffer sql4=new StringBuffer("update ob_saletask set CUS_GRP_ID=null,USE_ID=null,CALLBATCH_ASS_ID=null,BUSI_STA_ID=2,LAST_DIA_DAT=(select to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') from dual)");
		sql4.append(" where CUS_ID in(").append(sql3).append(")");	
		this.jdbcTemplate.execute(sql4.toString());			
		
		
		
		StringBuffer sql1=new StringBuffer("update ob_callbatch_ass a set a.retrive_count=nvl(a.retrive_count+(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		
		sql1.append(" ,a.hold_count=nvl(a.hold_count-(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		sql1.append(" ,a.retrive_count_ZZ=nvl(a.retrive_count_ZZ+(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		if(!allAssIds.equals("")) {
			sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		}
		sql1.append(" group by callbatch_ass_id),0)");
		sql1.append(",a.retrive_dat=(select to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') from dual)");
		sql1.append(",a.retrive_use_id=").append(ContextUtil.getCurrentUserId());
		sql1.append(" where a.callbatch_ass_id in(").append(sql_1).append(")");
		this.jdbcTemplate.execute(sql1.toString());
		
		StringBuffer sql2=new StringBuffer("update ob_callbatch_cus set ass_sta_id=1,ass_step_id=1,callbatch_ass_id=").append(parentAss.getCallbatchAssId())
		.append(",from_use_id=").append(parentAss.getFromAppUser().getUserId())
		.append(",to_use_id=").append(parentAss.getToAppUser().getUserId())
		.append(" where  callbatch_cus_id in(").append(sql).append(")");	
		this.jdbcTemplate.execute(sql2.toString());
		
	}
}