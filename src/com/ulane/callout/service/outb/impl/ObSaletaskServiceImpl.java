package com.ulane.callout.service.outb.impl;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.task.CalendarPlan;
import com.ulane.callout.dao.outb.ObSaletaskDao;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.model.outb.ObSaletask;
import com.ulane.callout.service.outb.ObCallbatchService;
import com.ulane.callout.service.outb.ObSaletaskService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public class ObSaletaskServiceImpl extends BaseServiceImpl<ObSaletask> implements ObSaletaskService{
	@SuppressWarnings("unused")
	private ObSaletaskDao dao;
	@Resource
	private ObCallbatchService obCallbatchService;
	public ObSaletaskServiceImpl(ObSaletaskDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public String getTaskCount(String comId) {
		return dao.getTaskCount(comId);
	}
	
	public List<ObSaletask> getTaskByCusId(Long cusId) {
		return dao.getTaskByCusId(cusId);
	}

	@Override
	public List<ObSaletask> getPhoneCount(String useId) {
		// TODO Auto-generated method stub
		return dao.getPhoneCount(useId);
	}

	@Override
	public ObSaletask createTaskByConCalllist(ObConCalllist obConCalllist,ObCom com) {

		return null;
	}

//	public String queryTaskByComId(String comId,String busiStaId,int start,,Map<String,String> queryParam);
	@Override
	public String queryTaskByComId(Map<String, String> queryParam) {
		String MARKET_TYPE = queryParam.get("MARKET_TYPE");				//类型
		String comId = queryParam.get("comId" );						//活动ID
		int start = Integer.parseInt(queryParam.get("pagStart"));		//分页start
		int limit = Integer.parseInt(queryParam.get("pagSize"));		//分页pageSize
		
		String startTime = queryParam.get("startTime");								//开始时间
		String endTime = queryParam.get("endTime");									//结束时间
		
		String busiRelId = queryParam.get("busiRelId");			//营销结果——搁置原因
		String busiStagId = queryParam.get("busiStagId"); 		//营销阶段
		String conStaId = queryParam.get("conStaId"); 			//拨打结果——联络结果
		String servStaId = queryParam.get("servStaId"); 		//服务状态——销售状态
		String taskExecType = queryParam.get("taskExecType"); 	//处理类型——失败原因/任务来源
		
		/***********未执行************/
		if("NO_EXEC".equals(MARKET_TYPE)) {
			String typeId = queryParam.get("typeId"); 							//分配来源、分配时间
			queryParam.put("field", "ASG_DAT");									//分配时间
			if(StringUtils.isBlank(startTime) && StringUtils.isBlank(endTime) && StringUtils.isBlank(typeId)) {
				return dao.queryTaskByComId(comId, ObSaletask.MARKET_NO_EXEC.toString(), start, limit);
			}
			return dao.queryTaskByComId(comId, ObSaletask.MARKET_NO_EXEC.toString(), start, limit, queryParam);
		}
		
		/***********搁置*************/
		else if("LAY_UP".equals(MARKET_TYPE)) {
			if(StringUtils.isBlank(busiRelId) && StringUtils.isBlank(busiStagId)) {	//搁置任务、营销阶段
				return dao.queryTaskByComId(comId, ObSaletask.MARKET_LAY_UP.toString(), start, limit);
			}
			return dao.queryTaskByComId(comId, ObSaletask.MARKET_LAY_UP.toString(), start, limit, queryParam);
		}
		
		/***********预约**************/
		else if("PLAN".equals(MARKET_TYPE)) {		
			queryParam.put("field", "BOO_TIM");									//预约时间
			if(StringUtils.isBlank(startTime) && StringUtils.isBlank(endTime)) {	//预约时间
				return dao.queryTaskByComId(comId, ObSaletask.MARKET_PLAN.toString(), start, limit);
			} else {
				return dao.queryTaskByComId(comId, ObSaletask.MARKET_PLAN.toString(), start, limit, queryParam);
			}
		}
		
		/***********待跟踪***********/
		else if("FLOWING".equals(MARKET_TYPE)) {
			if(StringUtils.isBlank(conStaId) && StringUtils.isBlank(busiStagId)) {	//联络结果、营销阶段
				return dao.queryTaskByComId(comId, ObSaletask.MARKET_FLOWING.toString(), start, limit);
			}
			return dao.queryTaskByComId(comId, ObSaletask.MARKET_FLOWING.toString(), start, limit, queryParam);
		}
		
		/***********已成功结案*******/
		else if("SUCC_CASE".equals(MARKET_TYPE)) {									//结案时间、销售状态
			queryParam.put("field", "LAST_OPE_DAT");									//最后处理时间
			if(StringUtils.isBlank(servStaId) && StringUtils.isBlank(startTime) && StringUtils.isBlank(endTime)) {	
				return dao.queryTaskByComId(comId, ObSaletask.MARKET_SUCC_CASE.toString(), start, limit);
			}
			return dao.queryTaskByComId(comId, ObSaletask.MARKET_SUCC_CASE.toString(), start, limit, queryParam);
		}
		
		/**********已失败结案********/
		else if("FAIL_CASE".equals(MARKET_TYPE)) {									//结案时间、失败原因
			queryParam.put("field", "LAST_OPE_DAT");									//最后处理时间
			if(StringUtils.isBlank(taskExecType) && StringUtils.isBlank(startTime) && StringUtils.isBlank(endTime)) {	
				return dao.queryTaskByComId(comId, ObSaletask.MARKET_FAIL_CASE.toString(), start, limit);
			}
			return dao.queryTaskByComId(comId, ObSaletask.MARKET_FAIL_CASE.toString(), start, limit, queryParam);
		}
		
		/*********已取消***********/
		else if("CANCELED".equals(MARKET_TYPE)) {									//回收时间、回收来源
			queryParam.put("field", "LAST_OPE_DAT");									//最后处理时间
			if(StringUtils.isBlank(taskExecType) && StringUtils.isBlank(startTime) && StringUtils.isBlank(endTime)) {	
				return dao.queryTaskByComId(comId, ObSaletask.MARKET_CANCELED.toString(), start, limit);
			}
			return dao.queryTaskByComId(comId, ObSaletask.MARKET_CANCELED.toString(), start, limit, queryParam);
		}
		
		/*********全部任务***********/
		else if("ALL".equals(MARKET_TYPE)) {
			if(StringUtils.isBlank(conStaId) && StringUtils.isBlank(busiStagId)) {
				return dao.queryTaskByComId(comId, null, start, limit);
			}
			return dao.queryTaskByComId(comId, null, start, limit, queryParam);
		}
		return null;
	}

}