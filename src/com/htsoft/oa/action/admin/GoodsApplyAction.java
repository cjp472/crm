package com.htsoft.oa.action.admin;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.admin.GoodsApply;
import com.htsoft.oa.model.admin.OfficeGoods;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.admin.GoodsApplyService;
import com.htsoft.oa.service.admin.OfficeGoodsService;
import com.htsoft.oa.service.info.ShortMessageService;

import flexjson.transformer.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class GoodsApplyAction extends BaseAction{
	private static short PASS_APPLY=2;//通过审批
	private static short NOTPASS_APPLY=3;//未通过审批
	@Resource
	private GoodsApplyService goodsApplyService;
	private GoodsApply goodsApply;
	@Resource
	private ShortMessageService shortMessageService;
	@Resource
	private OfficeGoodsService officeGoodsService;
	
	private Long applyId;

	public Long getApplyId() {
		return applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}

	public GoodsApply getGoodsApply() {
		return goodsApply;
	}

	public void setGoodsApply(GoodsApply goodsApply) {
		this.goodsApply = goodsApply;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<GoodsApply> list= goodsApplyService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer=JsonUtil.getJSONSerializer("applyDate");
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
				goodsApplyService.remove(new Long(id));
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
		GoodsApply goodsApply=goodsApplyService.get(applyId);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),"applyDate");
		sb.append(serializer.exclude(new String[]{"class"}).serialize(goodsApply));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(goodsApply.getApplyId()!=null){
			GoodsApply orgGoodsApply=goodsApplyService.get(goodsApply.getApplyId());
			
			try {
				
				BeanUtil.copyNotNullProperties(orgGoodsApply, goodsApply);
				
					if(orgGoodsApply.getApprovalStatus()==PASS_APPLY){
						OfficeGoods officeGoods=officeGoodsService.get(orgGoodsApply.getGoodsId());
						Integer con=orgGoodsApply.getUseCounts();
						Integer least=officeGoods.getStockCounts()-con;
						if(least<0){
							setJsonString("{success:false,message:'库存不足!'}");
							return SUCCESS;
						}
						Long receiveId=orgGoodsApply.getUserId();
						String content="你申请的办公用品为"+officeGoods.getGoodsName()+"已经通过审批，请查收";
						shortMessageService.save(AppUser.SYSTEM_USER,receiveId.toString(), content, ShortMessage.MSG_TYPE_SYS);
						officeGoods.setStockCounts(least);
						officeGoodsService.save(officeGoods);
					}
					goodsApplyService.save(orgGoodsApply);
				
			}catch (Exception e) {
				e.printStackTrace();
			}
		}else{
			SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss-SSSS");//自动生成申请号
			goodsApply.setApplyNo("GA"+sdf.format(new Date()));
			goodsApplyService.save(goodsApply);
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
