package com.ulane.callout.dao.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.model.system.AppUser;
import com.ulane.callout.dao.outb.ObCallbatchAssDao;
import com.ulane.callout.model.outb.ObCallbatchAss;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

@SuppressWarnings("unchecked")
public class ObCallbatchAssDaoImpl extends BaseDaoImpl<ObCallbatchAss> implements ObCallbatchAssDao{

	public ObCallbatchAssDaoImpl() {
		super(ObCallbatchAss.class);
	}
     /**
      * 经理分配名单
      * @author lzm
      */
	@Override
	public List<ObCallbatchAss> getJingLi(AppUser user,int start,int limit) {
		
		
		Long assStepId1=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);
		Long assStepId2=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI);
		StringBuffer sb=new StringBuffer("select distinct vo from ObCallbatchAss vo where vo.assStepId =");
		sb.append(assStepId1)
		.append(" and (vo.toAppUser.userId =").append(user.getUserId()).append(" or vo.toUserNo='").append(user.getEmployeeid()).append("') order by vo.staDat desc");
		Query query = this.getSession().createQuery(sb.toString());	
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();		
	}
	
	public int getJingLiCount(AppUser user) {
		
		int count=0;
		Long assStepId1=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);
		Long assStepId2=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI);
		StringBuffer sb=new StringBuffer("select distinct vo from ObCallbatchAss vo where vo.assStepId =");
		sb.append(assStepId1)
		.append(" and (vo.toAppUser.userId =").append(user.getUserId()).append(" or vo.toUserNo='").append(user.getEmployeeid()).append("')");
		List<ObCallbatchAss> list=findByHql(sb.toString());
		if(list!=null&&list.size()>0) {
			count=list.size();
		}
		return count;
	}	
	
    /**
     * 组长分配名单
     * @author lzm
     */
	@Override
	public List<ObCallbatchAss> getZuZhang(AppUser user,int start,int limit) {
		Long assStepId1=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI);
		Long assStepId2=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_ZUZHANG);
		StringBuffer sb=new StringBuffer("select distinct vo from ObCallbatchAss vo where vo.assStepId =");
		sb.append(assStepId1)
		.append(" and (vo.toAppUser.userId =").append(user.getUserId()).append(" or vo.toUserNo='").append(user.getEmployeeid()).append("') order by vo.staDat desc");	
		Query query = this.getSession().createQuery(sb.toString());	
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();	
	}
	
	public int getZuZhangCount(AppUser user) {
		
		int count=0;
		Long assStepId1=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI);
		Long assStepId2=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_ZUZHANG);
		StringBuffer sb=new StringBuffer("select distinct vo from ObCallbatchAss vo where vo.assStepId =");
		sb.append(assStepId1)
		.append(" and (vo.toAppUser.userId =").append(user.getUserId()).append(" or vo.toUserNo='").append(user.getEmployeeid()).append("')");
		List<ObCallbatchAss> list=findByHql(sb.toString());
		if(list!=null&&list.size()>0) {
			count=list.size();
		}
		return count;
	}		
	
    /**
     * 管理员分配
     * @author lzm
     */
	@Override
	public List<ObCallbatchAss> getAssign1(Long userId,String callbatchAssIds,int start,int limit) {
		Long assStepId=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);
		String hql="";
		if(callbatchAssIds !=null&&!callbatchAssIds.equals("")) {
			hql="select vo from ObCallbatchAss vo where vo.callbatchAssId in("+callbatchAssIds+") order by vo.staDat desc";
			Query query = this.getSession().createQuery(hql);	
			query.setFirstResult(start);
			query.setMaxResults(limit);
			return query.list();
		} else {
			hql = "select distinct vo from ObCallbatchAss vo where  vo.assStepId = "+assStepId+" and vo.fromAppUser.userId="+userId+" order by vo.staDat desc";
			Query query = this.getSession().createQuery(hql);	
			query.setFirstResult(start);
			query.setMaxResults(limit);
			return query.list();
		}
	}	
	
	public int getAssign1Count(Long userId,String callbatchAssIds,int start,int limit) {
		Long assStepId=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);
		String hql="";int count=0;
		if(callbatchAssIds !=null&&!callbatchAssIds.equals("")) {
			hql="select vo from ObCallbatchAss vo where vo.callbatchAssId in("+callbatchAssIds+")";
		} else {
			hql = "select distinct vo from ObCallbatchAss vo where  vo.assStepId = "+assStepId+" and vo.fromAppUser.userId="+userId;
		}
		List<ObCallbatchAss> list=findByHql(hql);
		if(list!=null&&list.size()>0) count=list.size();
		return count;
	}		
	
	
	public List<ObCallbatchAss> listAssByParentId(Long callbatchAssId,Integer start,Integer limit) {
		String hql="select distinct vo from ObCallbatchAss vo where vo.parentCallbatchAssId="+callbatchAssId+" order by vo.staDat desc";
		if(start==null||limit==null) {
			return findByHql(hql);
		} else {
			Query query = this.getSession().createQuery(hql);	
			query.setFirstResult(start);
			query.setMaxResults(limit);
			return query.list();
		}
	}
	
	public int listAssByParentIdCount(Long callbatchAssId,int start,int limit) {
		int count=0;
		String hql="select distinct vo from ObCallbatchAss vo where vo.parentCallbatchAssId="+callbatchAssId;
		List<ObCallbatchAss> list=findByHql(hql);
		if(list!=null&&list.size()>0) count=list.size();
		return count;
	}	
	
	public int getRerivedByAdmin(String allAssIds) {
		int count=0;
		String hql="select sum(retriveCountAdmin)  from ObCallbatchAss vo   where vo.callbatchAssId in("+allAssIds+")";
		List l=findByHql(hql);
		if(l!=null&&l.size()>0) count=((Long)l.get(0)).intValue();
		return count;
	} 
	
	public List<ObCallbatchAss> listAssByIds(String callbatchAssIds) {
		String hql="select vo  from ObCallbatchAss vo   where vo.callbatchAssId in("+callbatchAssIds+")";
		return findByHql(hql);
	}
	
	
	public List<ObCallbatchAss> listAssByParentIds(String strJLIds) {
		String hql="select vo  from ObCallbatchAss vo   where vo.parentCallbatchAssId in("+strJLIds+")";
		return findByHql(hql);
	}
	
	public int getHoldCounts(String allAssIds) {
		int count=0;
		String hql="select sum(holdCount)  from ObCallbatchAss vo   where vo.callbatchAssId in("+allAssIds+")";
		List l=findByHql(hql);
		if(l!=null&&l.size()>0) count=((Long)l.get(0)).intValue();
		return count;
	}
	
	public int getRerivedByJL(String allAssIds) {
		int count=0;
		String hql="select sum(retriveCountJL)  from ObCallbatchAss vo   where vo.callbatchAssId in("+allAssIds+")";
		List l=findByHql(hql);
		if(l!=null&&l.size()>0) count=((Long)l.get(0)).intValue();
		return count;
	} 
	
	public int getRerivedByZZ(String allAssIds){
		int count=0;
		String hql="select sum(retriveCountZZ)  from ObCallbatchAss vo   where vo.callbatchAssId in("+allAssIds+")";
		List l=findByHql(hql);
		if(l!=null&&l.size()>0) count=((Long)l.get(0)).intValue();
		return count;		
	}
	
	public List listDate(Long userId,int start,int limit,String callbatchNam,String fromUseName) {
		 Long assStepId=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);
//    	 String sql="select  sta_dat from ( select rownum rowindex,sta_dat from(select sta_dat from ob_callbatch_ass where from_use_id="+userId+" and ass_Step_Id="+assStepId+"  group by sta_dat order by sta_dat desc)) t " +
//    	 		"where t.rowindex>"+start+" and t.rowindex<"+(start+limit+1);
//    	 List dateList=this.jdbcTemplate.queryForList(sql);
//    	 return dateList;
//    	 
		 StringBuffer hql=new StringBuffer("select vo.staDat from ObCallbatchAss vo where vo.fromAppUser.userId=").append(userId)
		 .append(" and vo.assStepId=").append(assStepId);
		 
		 if(callbatchNam!=null&&!callbatchNam.equals("")) {
			 hql.append(" and vo.obCallbatch.callbatchNam like '%").append(callbatchNam).append("%'");
		 } 
		 if(fromUseName!=null&&!fromUseName.equals("")) {
			// hql.append(" and (select user.employeeid from AppUser user where user.userId=").append(userId).append(") like '%").append(fromUseName).append("%'");
		    hql.append(" and vo.fromAppUser.ulEmployee.userNo like '%").append(fromUseName).append("%'");
		 }
		 hql.append("  group by vo.staDat order by vo.staDat desc ");
		 Query query = this.getSession().createQuery(hql.toString());	
		 query.setFirstResult(start);
		 query.setMaxResults(limit);
		 return query.list();    	 
    	 
    }	
	
	public int getDateCount(Long userId,String callbatchNam,String fromUseName) {
	   int count=0;
	   Long assStepId=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);
//   	   String sql="select  sta_dat from(select sta_dat from ob_callbatch_ass where from_use_id="+userId+" and ass_Step_Id="+assStepId+"group by sta_dat order by sta_dat) ";
//       List<Date> dateList=this.jdbcTemplate.queryForList(sql);
		 StringBuffer hql=new StringBuffer("select vo.staDat from ObCallbatchAss vo where vo.fromAppUser.userId=").append(userId)
		 .append(" and vo.assStepId=").append(assStepId);
		 
		 if(callbatchNam!=null&&!callbatchNam.equals("")) {
			 hql.append(" and vo.obCallbatch.callbatchNam like '%").append(callbatchNam).append("%'");
		 } else if(fromUseName!=null&&!fromUseName.equals("")) {
			 //hql.append(" and (select user.fullname from AppUser user where user.userId=").append(userId).append(") like '%").append(fromUseName).append("%'");
			 hql.append(" and vo.fromAppUser.ulEmployee.userNo like '%").append(fromUseName).append("%'");
		 }
		 hql.append("  group by vo.staDat order by vo.staDat desc ");
		 List dateList=findByHql(hql.toString()); 
       if(dateList!=null&&dateList.size()>0) {
    	   count=dateList.size();
       } else {
    	   count= 0;
       }
       return count;
	}
	
	public List<ObCallbatchAss> listAssByDate(Long userId,String date,String callbatchNam,String fromUseName) {
		 Long assStepId=Long.valueOf(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN);
		 StringBuffer hql=new StringBuffer("select vo from ObCallbatchAss vo   where vo.obCalllist.calllistStaId=0 and vo.obCom.obComStaId=2 and vo.obCom.obProject.projStaId=2 and vo.staDat=to_date('"+date+"','yyyy-MM-dd HH24:mi:ss') and vo.fromAppUser.userId="+userId+" and assStepId="+assStepId);
		 if(callbatchNam!=null&&!callbatchNam.equals("")) {
			 hql.append(" and vo.obCallbatch.callbatchNam like '%").append(callbatchNam).append("%'");
		 } else if(fromUseName!=null&&!fromUseName.equals("")) {
			 //hql.append(" and (select user.fullname from AppUser user where user.userId=").append(userId).append(") like '%").append(fromUseName).append("%'");
			 hql.append(" and vo.fromAppUser.ulEmployee.userNo like '%").append(fromUseName).append("%'");
		 }
		 hql.append("  order by vo.staDat desc");
		 return findByHql(hql.toString());
	}

	public List<ObCallbatchAss> listAssByCallbatch(Long callbatchId,String assOrRetr,int start,int limit) {
		 StringBuffer hql=new StringBuffer("select ass from ObCallbatchAss ass where ass.obCallbatch.callbatchId=").append(callbatchId);
		 if(assOrRetr.equals("0")) {//分配历史
			 hql.append(" and ass.staDat is not null");
		 } else if(assOrRetr.equals("1")) {
			 hql.append(" and ass.retriveDat is not null");
		 }
		 Query query = this.getSession().createQuery(hql.toString());	
		 query.setFirstResult(start);
		 query.setMaxResults(limit);
		 return query.list();
	}
	
	public int listAssByCallbatchCount(Long callbatchId,String assOrRetr) {
		 int count=0;
		 StringBuffer hql=new StringBuffer("select ass from ObCallbatchAss ass where ass.obCallbatch.callbatchId=").append(callbatchId);
		 if(assOrRetr.equals("0")) {//分配历史
			 hql.append(" and ass.staDat is not null");
		 } else if(assOrRetr.equals("1")) {
			 hql.append(" and ass.retriveDat is not null");
		 }
		 List<ObCallbatchAss> list=findByHql(hql.toString());
		 if(list!=null&&list.size()>0)count=list.size();
		 return count;
	}	
	
	public List<ObCallbatchAss> huishouAssList(int start,int limit,String retriveUserNam,String retriveDat) {
		 StringBuffer hql=new StringBuffer("select ass from ObCallbatchAss ass where ass.retriveDat is not null  ");
		 if(retriveUserNam!=null&&!retriveUserNam.equals("")) {
			 hql.append(" and ass.retriveAppUser.ulEmployee.userNo like '%").append(retriveUserNam).append("%'");
		 }
		 if(retriveDat!=null&&!retriveDat.equals("")) {
			 hql.append(" and ass.retriveDat = to_date('"+retriveDat+"','yyyy-mm-dd')");
		 }
		  hql.append(" order by ass.retriveDat desc");
		 Query query = this.getSession().createQuery(hql.toString());	
		 query.setFirstResult(start);
		 query.setMaxResults(limit);
		 return query.list();
	}
	
	public int  huishouAssListCount(String retriveUserNam,String retriveDat) {
		int count=0; 
		 StringBuffer hql=new StringBuffer("select ass from ObCallbatchAss ass where ass.retriveDat is not null  ");
		 if(retriveUserNam!=null&&!retriveUserNam.equals("")) {
			 hql.append(" and ass.retriveAppUser.ulEmployee.userNo like '%").append(retriveUserNam).append("%'");
		 }
		 if(retriveDat!=null&&!retriveDat.equals("")) {
			 hql.append(" and ass.retriveDat = to_date('"+retriveDat+"','yyyy-mm-dd')");
		 }		 
		 hql.append(" order by ass.retriveDat desc");
		 List<ObCallbatchAss> list=findByHql(hql.toString());
		 if(list!=null&&list.size()>0)count=list.size();
		 return count;
			 
	}
	
}