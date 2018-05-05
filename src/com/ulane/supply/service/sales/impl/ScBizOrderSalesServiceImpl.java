package com.ulane.supply.service.sales.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.action.flow.FlowRunInfo;
import com.htsoft.oa.util.FillData;
import com.ulane.core.service.FlowResultService;
import com.ulane.supply.dao.sales.ScBizOrderSalesDao;
import com.ulane.supply.model.sales.ScBizOrderSales;
import com.ulane.supply.model.sales.ScBizSalesDetail;
import com.ulane.supply.model.supply.ScBizOrderFee;
import com.ulane.supply.service.goods.ScGoodsService;
import com.ulane.supply.service.sales.ScBizOrderSalesService;
import com.ulane.supply.service.supply.ScBizOrderFeeService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class ScBizOrderSalesServiceImpl extends
		BaseServiceImpl<ScBizOrderSales> implements ScBizOrderSalesService {
	@SuppressWarnings("unused")
	private ScBizOrderSalesDao dao;
	@Resource
	private ScBizOrderFeeService scBizOrderFeeService;
	@Resource
	private FlowResultService flowResultService;
	@Resource
	private ScGoodsService scGoodsService;

	private ScBizOrderSales scBizOrderSales;

	private String pKId;

	public String getpKId() {
		return pKId;
	}

	public void setpKId(String pKId) {
		this.pKId = pKId;
	}

	public ScBizOrderSalesServiceImpl(ScBizOrderSalesDao dao) {
		super(dao);
		this.dao = dao;
	}

	// @Override
	// public String getHistoryOrders(String cusId) {
	// return dao.getHistoryOrders(cusId);
	// }
	@Override
	public void jieSuan(ScBizOrderSales scBizOrderSales, String JiFen,
			String ZanCunKuan, String ChuZhiJin, String s1, String s2,
			String left) {
		dao.save(scBizOrderSales);
		BigDecimal left_a = scBizOrderSales.getTotalInAmount();
		if (JiFen != null && !JiFen.equals("")) {
			Long jifen = Long.parseLong(JiFen);
			ScBizOrderFee sbof = new ScBizOrderFee();
			sbof.setBizOrderId(scBizOrderSales.getBizOrderId());
			sbof.setFeeFlag((short) 1);
			// CHANGED_AMOUN
			sbof.setChangedAmount(new BigDecimal(jifen));
			left_a = left_a.subtract(new BigDecimal(jifen));
			sbof.setChangedTime(new Date());
			scBizOrderFeeService.save(sbof);
		}
		if (ZanCunKuan != null && !ZanCunKuan.equals("")) {
			Long zanCunKuan = Long.parseLong(ZanCunKuan);
			ScBizOrderFee sbof = new ScBizOrderFee();
			sbof.setBizOrderId(scBizOrderSales.getBizOrderId());
			sbof.setFeeFlag((short) 2);
			// CHANGED_AMOUN
			left_a = left_a.subtract(new BigDecimal(zanCunKuan));
			sbof.setChangedAmount(new BigDecimal(zanCunKuan));
			sbof.setChangedTime(new Date());
			scBizOrderFeeService.save(sbof);
		}
		if (ChuZhiJin != null && !ChuZhiJin.equals("")) {
			Long chuZhiJin = Long.parseLong(ChuZhiJin);
			ScBizOrderFee sbof = new ScBizOrderFee();
			sbof.setBizOrderId(scBizOrderSales.getBizOrderId());
			sbof.setFeeFlag((short) 3);
			// CHANGED_AMOUN
			left_a = left_a.subtract(new BigDecimal(chuZhiJin));
			sbof.setChangedAmount(new BigDecimal(chuZhiJin));
			sbof.setChangedTime(new Date());
			scBizOrderFeeService.save(sbof);
		}
		ScBizOrderFee sbof = new ScBizOrderFee();
		sbof.setBizOrderId(scBizOrderSales.getBizOrderId());
		if (left.equals("1")) {
			sbof.setFeeFlag((short) 6);
		} else {
			sbof.setFeeFlag((short) 7);
		}
		// CHANGED_AMOUN
		sbof.setChangedAmount(left_a);
		sbof.setChangedTime(new Date());
		scBizOrderFeeService.save(sbof);
	}

	@Override
	public ScBizOrderSales save(FlowRunInfo flowRunInfo) {
		ScBizOrderSales scBizOrderSales = new ScBizOrderSales();
		scBizOrderSales = (ScBizOrderSales) FillData.fillDataHttpRequest(flowRunInfo.getRequest(), ScBizOrderSales.class);
		if(flowRunInfo.getRequest().getParameter("pKId")!=""&&flowRunInfo.getRequest().getParameter("pKId")!=null){
			scBizOrderSales.setBizOrderId(new Long(flowRunInfo.getRequest().getParameter("pKId")));
		}
		
		if(scBizOrderSales.getBizOrderId() == null){
			scBizOrderSales.setApprovalStatus("待审批");
			scBizOrderSales.setCreateUser(ContextUtil.getCurrentUser());
			String goods = flowRunInfo.getRequest().getParameter("goods");
			if (StringUtils.isNotEmpty(goods)) {
				Gson gson = new Gson();
				ScBizSalesDetail[] salesArr = (ScBizSalesDetail[]) gson.fromJson(
						goods, ScBizSalesDetail[].class);
				scBizOrderSales.getScBizSalesDetails().clear();
				if (salesArr != null) {
					for (ScBizSalesDetail detail : salesArr) {
						detail.setScBizOrderSales(scBizOrderSales);
						detail.setScGoods(scGoodsService.get(detail.scgoodsId));
						scBizOrderSales.addDetsils(detail);
					}
				}
			}
			String yufei = flowRunInfo.getRequest().getParameter("yunfei");
			if(yufei!=null && !yufei.equals("")){
				scBizOrderSales.setExt11(new BigDecimal(yufei));
			}
			
			scBizOrderSales.setBizOrderType((short) 0);
			scBizOrderSales.setCreateUser(ContextUtil.getCurrentUser());
			scBizOrderSales.setBizOrderStatus((short) 0);
			scBizOrderSales.setBizOrderSubStatus((short) 0);
			scBizOrderSales.setCreateTime(new Date());
			scBizOrderSales.setExt1("1");
			// 支付信息
			// SC_ORDER_FEE_TYPE.put(3,'储值金');
			// SC_ORDER_FEE_TYPE.put(1,'积分');
			// SC_ORDER_FEE_TYPE.put(2,'暂存款');
			// SC_ORDER_FEE_TYPE.put(4,'代金券');
			// SC_ORDER_FEE_TYPE.put(5,'礼金');
			String JiFen = flowRunInfo.getRequest().getParameter("useJiFen");
			String ZanCunKuan = flowRunInfo.getRequest().getParameter("useZanCunKuan");
			String ChuZhiJin = flowRunInfo.getRequest().getParameter("useChuZhiJin");
			String left = flowRunInfo.getRequest().getParameter("rb-auto");
			this.jieSuan(scBizOrderSales, JiFen, ZanCunKuan,ChuZhiJin, "", "", left);
			
			dao.save(scBizOrderSales);
		} else {
			ScBizOrderSales orgBizOrderSales = dao.get(scBizOrderSales.getBizOrderId());
			try {
				BeanUtil.copyNotNullProperties(orgBizOrderSales,scBizOrderSales);
				dao.save(orgBizOrderSales);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}

		return scBizOrderSales;
	}
	
	@Override
	public Map<Long, Boolean> getSelectId(int start, int limit, Long userId,
			String type, String firstId) {
		return dao.getSelectId(start, limit, userId, type, firstId);
	}

	@Override
	public Integer saveHeadId(FlowRunInfo flowRunInfo) {
		String bizOrderId = flowRunInfo.getRequest().getParameter("pKId");
		ScBizOrderSales orgBizOrderSales = save(flowRunInfo);
		bizOrderId = orgBizOrderSales.getBizOrderId().toString();
		this.setpKId(bizOrderId);

		flowRunInfo.getVariables().put("bizOrderId", getpKId()); //
		// 放入工作流待办时候的名称
		flowRunInfo.setFlowSubject("销售业务单审批" + getpKId()); //
		return 1;
	}

	@Override
	public Integer saveRunId(FlowRunInfo flowInfo) {
		String flowType = flowInfo.getRequest().getParameter("flowType");

		// 更新runid 和节点名称
		dao.saveRunidAndNodeName(flowInfo.getProcessRun().getRunId(),
				flowInfo.getDestName(), new Long(getpKId()));
		// 流程开始增加状态
		if (flowInfo.isStartFlow() == true) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}
		if (flowInfo.getDestName().contains("驳回")) {
			dao.updateStatusByNodeName("驳回", new Long(getpKId()), false);
		}
		// 流程结束更新业务单据状态
		if (flowInfo.getDestName().contains("结束")) {
			dao.updateStatusByNodeName("审批完毕", new Long(getpKId()), true);
			ScBizOrderSales scBizOrderSales = get(new Long(getpKId()));
			scBizOrderSales.setApprovalStatus("审批完毕");
			save(scBizOrderSales);
		}
		
		if (flowInfo.getDestName().contains("驳回")==false && flowInfo.isStartFlow() == false && flowInfo.getDestName().contains("结束")==false) {
			dao.updateStatusByNodeName("审批中", new Long(getpKId()), false);
		}

		// 更新节点
		flowResultService.flowResultHandle(flowInfo, new Long(getpKId()),
				flowType);
		return 1;
	}
}