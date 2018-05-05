package com.htsoft.oa.action.admin;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.admin.Car;
import com.htsoft.oa.model.admin.CarApply;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.admin.CarApplyService;
import com.htsoft.oa.service.admin.CarService;
import com.htsoft.oa.service.info.ShortMessageService;
import com.htsoft.oa.service.system.AppUserService;

import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class CarApplyAction extends BaseAction{
	@Resource
	private CarApplyService carApplyService;
	private CarApply carApply;
	@Resource
	private ShortMessageService shortMessageService;
	@Resource
	private CarService carService;
	
	private Long applyId;

	public Long getApplyId() {
		return applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}

	public CarApply getCarApply() {
		return carApply;
	}

	public void setCarApply(CarApply carApply) {
		this.carApply = carApply;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CarApply> list= carApplyService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer=JsonUtil.getJSONSerializer("applyDate","startTime","endTime");
		buff.append(serializer.exclude(new String[]{"class"}).serialize(list));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				carApplyService.remove(new Long(id));
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		CarApply carApply=carApplyService.get(applyId);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer=JsonUtil.getJSONSerializer("applyDate","startTime","endTime");
		sb.append(serializer.exclude(new String[]{"class","car.carApplys"}).serialize(carApply));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(carApply.getApplyId()!=null){
			CarApply orgCarApply=carApplyService.get(carApply.getApplyId());
			try {
				BeanUtil.copyNotNullProperties(orgCarApply, carApply);
				carApplyService.save(orgCarApply);
				if(orgCarApply.getApprovalStatus()==Car.PASS_APPLY){
					Long receiveId=orgCarApply.getUserId();
					Car car=carService.get(orgCarApply.getCar().getCarId());
					String content="你申请的车牌号为"+car.getCarNo()+"已经通过审批，请注意查收";
					shortMessageService.save(AppUser.SYSTEM_USER, receiveId.toString(), content, ShortMessage.MSG_TYPE_SYS);
				}
			}catch (Exception e) {
				e.printStackTrace();
			}
			
		}else{
			carApplyService.save(carApply);
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
