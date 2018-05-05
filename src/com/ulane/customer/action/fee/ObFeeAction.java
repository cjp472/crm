package com.ulane.customer.action.fee;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.callout.model.outb.ObSaletask;
import com.ulane.callout.service.outb.ObSaletaskService;
import com.ulane.customer.model.fee.ObFee;
import com.ulane.customer.model.fee.ObFeeIndex;
import com.ulane.customer.model.fee.ObFeeIndexLevel;
import com.ulane.customer.model.fee.ObFeeRule;
import com.ulane.customer.model.fee.ObFeeRuleValue;
import com.ulane.customer.model.fee.ObFeeSelect;
import com.ulane.customer.model.fee.ObFeeSelectDetail;
import com.ulane.customer.service.fee.ObFeeIndexLevelService;
import com.ulane.customer.service.fee.ObFeeIndexService;
import com.ulane.customer.service.fee.ObFeeRuleService;
import com.ulane.customer.service.fee.ObFeeRuleValueService;
import com.ulane.customer.service.fee.ObFeeService;
import com.ulane.supply.model.sales.ScBizOrderSales;
import com.ulane.supply.model.sales.ScBizOrderSalesJiSuan;
import com.ulane.supply.model.sales.ScBizSalesDetail;
import com.ulane.supply.service.sales.ScBizOrderSalesService;
import com.ulane.supply.service.sales.ScBizSalesDetailService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ObFeeAction extends BaseAction{
	@Resource 
	private ObFeeService obFeeService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private UlDepartmentService ulDepartmentService;
	@Resource
	private ObFeeIndexService obFeeIndexService;
	@Resource
	private ObFeeIndexLevelService obFeeIndexLevelService;
	@Resource
	private ObFeeRuleValueService obFeeRuleValueService;
	@Resource
	private UlEmployeeService ulEmployeeService;
	@Resource
	private ObSaletaskService obSaletaskService;
	@Resource
	private ScBizOrderSalesService scBizOrderSalesService;
	@Resource
	private ObFeeRuleService obFeeRuleService;
	@Resource
	private ScBizSalesDetailService scBizSalesDetailService;
	private ObFee obFee;
	
	private Long feeId;

	public Long getFeeId() {
		return feeId;
	}

	public void setFeeId(Long feeId) {
		this.feeId = feeId;
	}

	public ObFee getObFee() {
		return obFee;
	}

	public void setObFee(ObFee obFee) {
		this.obFee = obFee;
	}

	
	
	/**
	 * 显示列表
	 */
	public String listEmployee(){
		try {
			//指标周期
			String zhouqi=getZhiBiaoZhouQiByUser();
			HashMap<String,String> datetime=getNyOrNy(zhouqi);
			Iterator<String> iterator = datetime.keySet().iterator();
			//总订单金额
			java.math.BigDecimal zongjine=new java.math.BigDecimal("0");
			//取消订单金额
			java.math.BigDecimal quxiaojine=new java.math.BigDecimal("0");
			//换单金额
			java.math.BigDecimal huanjine=new java.math.BigDecimal("0");
			//退单金额
			java.math.BigDecimal tuidan=new java.math.BigDecimal("0");
			//净订单金额
			java.math.BigDecimal jingjine=new java.math.BigDecimal("0");
			//有效订单金额
			java.math.BigDecimal youxiaojine=new java.math.BigDecimal("0");
			//妥投率
			java.math.BigDecimal tuotoulv=new java.math.BigDecimal("0");
			//订单总数
			int zcount=0;
			//取消订单数
			int qcount=0;
			//退单数
			int tcount=0;
			//换单数
			int hcount=0;
			//净订单数
			int jcount=0;
			//有效订单数
			int ycount=0;
			//坐席拨打电话的次数
			int pcount=PhoneCount();
			//单数妥投率
			double dstuotoulv = 0.0;
			//成交率
			double chengjiaolv = 0.0;
			//员工佣金
 			java.math.BigDecimal yongjin=new java.math.BigDecimal("0");
 			//同一订单不同商品
			 int ManyCount=getOneSalesOneG();
			 
			 //同一订单同一商品数量大于1
			 int oneCount=getOneSalesManyG();
			 //一单多货订单数
			 int onemanyCount=oneCount+ManyCount;
			 //搭效率
			double daxiaolv=0.00;
//			List <ObFeeSelect> select =new ArrayList();
//			int  q=0;
//			int  m=0;
//			while(iterator.hasNext()) {
//				q++;
//				m++;
//				String d = iterator.next();
//				String values=datetime.get(d);
//				String [] value=values.split(",");
			     	//总订单金额
//				 zongjine=yongJiJiSuan_ZJE(value[0],value[1]);
				 zongjine=yongJiJiSuan_ZJE("2012-04-01","2012-06-30");
//				     //取消订单金额
//				 quxiaojine=yongJiJiSuan_QXJE(value[0],value[1]);
				 quxiaojine=yongJiJiSuan_QXJE("2012-04-01","2012-06-30");
					//换单金额
//				 huanjine=yongJiJiSuan_HDJE(value[0],value[1]);
				 huanjine=yongJiJiSuan_HDJE("2012-04-01","2012-06-30");
					//退单金额
//				 tuidan=yongJiJiSuan_TJE(value[0],value[1]);
				 tuidan=yongJiJiSuan_TJE("2012-04-01","2012-06-30");
					//净订单金额
				 if(zongjine!=null){
	             if(quxiaojine==null){
					  jingjine=zongjine;
	             }else{
	            	 jingjine=zongjine.subtract(quxiaojine);
	             }
	             
				//有效订单金额
	             if(quxiaojine==null && tuidan==null && huanjine==null){
	            	 youxiaojine=zongjine;
	             }else if(quxiaojine!=null && tuidan==null && huanjine==null){
	            	 youxiaojine=zongjine.subtract(quxiaojine);
	             }else if(quxiaojine!=null && tuidan!=null && huanjine==null){
	            	 youxiaojine=zongjine.subtract(quxiaojine).subtract(tuidan);
	             }else if(quxiaojine!=null && tuidan==null && huanjine!=null){
	            	 youxiaojine=zongjine.subtract(quxiaojine).subtract(huanjine);
	             }else if(quxiaojine==null && tuidan!=null && huanjine!=null){
	            	 youxiaojine=zongjine.subtract(huanjine).subtract(tuidan);
	             }else if(quxiaojine==null && tuidan==null && huanjine!=null){
	            	 youxiaojine=zongjine.subtract(huanjine);
	             }else if(quxiaojine==null && tuidan!=null && huanjine==null){
	            	 youxiaojine=zongjine.subtract(tuidan);
	             }
	             else{
	            	 youxiaojine=zongjine.subtract(huanjine).subtract(tuidan).subtract(quxiaojine);
	             }
					//妥投率
	             if(jingjine!=null){
	            	 tuotoulv=youxiaojine.divide(jingjine,2, java.math.BigDecimal.ROUND_HALF_EVEN);
	             }
					//订单总数
//				 zcount=yongJiJiSuan_ZDDS(value[0],value[1]);
				 zcount=yongJiJiSuan_ZDDS("2012-04-01","2012-06-30");
					//取消订单数
//			     qcount=yongJiJiSuan_QXDDS(value[0],value[1]);
			     qcount=yongJiJiSuan_QXDDS("2012-04-01","2012-06-30");
					//退单数
//			     tcount=yongJiJiSuan_TDDS(value[0],value[1]);
			     tcount=yongJiJiSuan_TDDS("2012-04-01","2012-06-30");
					//换单数
//			     hcount=yongJiJiSuan_HDDS(value[0],value[1]);
			     hcount=yongJiJiSuan_HDDS("2012-04-01","2012-06-30");
					//净订单数
				 jcount=zcount-qcount;
					//有效订单数
				 ycount=zcount-qcount-hcount-tcount;
					//坐席拨打电话的次数
				 pcount=PhoneCount();
				    //单数妥投率
				 if(jcount!=0){
						dstuotoulv=(double)ycount/(double)jcount;
					}
					//成交率
				if(pcount!=0){
						chengjiaolv=(double)jcount/(double)pcount;
					}
	 			//同一订单不同商品
	 			 ManyCount=getOneSalesOneG();
	 			 
	 			 //同一订单同一商品数量大于1
	 			 oneCount=getOneSalesManyG();
	 			 //一单多货订单数
	 			 onemanyCount=oneCount+ManyCount;
				//员工佣金
	 			 yongjin=getYongJi(zongjine,youxiaojine);
	 			 //搭效率
	 			 if(zcount!=0){
	 			  daxiaolv=onemanyCount/zcount;
	 			 }
				 }
// 			
 			System.out.println("搭效率"+daxiaolv);
// 			System.out.println("onemanyCount"+onemanyCount);
// 			System.out.println("ManyCount"+ManyCount);
// 			System.out.println("oneCount"+oneCount);
// 			System.out.println("佣金"+yongjin);
//			System.out.println("佣金"+yongjin);
//			System.out.println("取消"+quxiaojine);
			System.out.println("总金额"+zongjine);
			System.out.println("换单"+huanjine);
			System.out.println("退单"+tuidan);
			System.out.println("有效"+youxiaojine);
//			System.out.println("tuotoulv"+tuotoulv);
//			System.out.println("拨打次数"+pcount);
			System.out.println("总单数"+zcount);
			System.out.println("取消单数"+qcount);
			System.out.println("换单数"+hcount);
			System.out.println("退单数"+tcount);
			System.out.println("净单数"+jcount);
			System.out.println("有效单数"+ycount);
			System.out.println("成交率"+chengjiaolv);
			System.out.println("单数妥投率"+dstuotoulv);
//
//		//当前用户ID
//		String curUserId = String.valueOf(ContextUtil.getCurrentUserId());
//		QueryFilter filter=new QueryFilter(getRequest());
//		
//	    ObFeeSelect obselect =new ObFeeSelect();
////		try{
//			UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
//			UlDepartment ulDepartment = ulDepartmentService.get(new Long(ulEmployee.getUlDepartment().getDepid()));
//			List<ObFeeIndex> obfeeindex=obFeeIndexService.getAll(filter);
//			for(ObFeeIndex ofi:obfeeindex){
//				//绑定员工的指标
//				Set<UlEmployee> emp=ofi.getUlEmployees();
//				for(UlEmployee employee:emp){
//					if(employee.getUseid()==ulEmployee.getUseid()){
//						obselect.setUlEmployee(ulEmployee);
//						obselect.setUserNam(ulEmployee.getFullname());
//						obselect.setUserNo(ulEmployee.getUserNo());
//						obselect.setDepNam(ulDepartment.getDepname());
//						//有效金额
//						obselect.setYouXiaoJinE(youxiaojine);
//						//金额妥投率
//						obselect.setTouTouLv(tuotoulv);
//						//单数妥投率
//						obselect.setDstuotoulv(dstuotoulv);
//						//完成率
//						obselect.setChengjiaolv(chengjiaolv);
//						//佣金
//						obselect.setYongjin(yongjin);
//						//客户结案数
//						obselect.setKehujieanshu(ycount);
//						//搭销率
//						obselect.setDaxiaolv(daxiaolv);
//						//季度
//						if(zhouqi=="2" || zhouqi.equals("2")){
//						if(q==1){
//							obselect.setJidu("1季度");
//						}
//						if(q==2){
//							obselect.setJidu("2季度");
//						}
//						if(q==3){
//							obselect.setJidu("3季度");
//						}
//						if(q==4){
//							obselect.setJidu("4季度");
//						}
//						}
//						if(zhouqi=="1" || zhouqi.equals("1")){
//							if(m==1){
//								obselect.setJidu("1月");
//							}
//							if(m==2){
//								obselect.setJidu("2月");
//							}
//							if(m==3){
//								obselect.setJidu("3月");
//							}
//							if(m==4){
//								obselect.setJidu("4月");
//							}
//							if(m==5){
//								obselect.setJidu("5月");
//							}
//							if(m==6){
//								obselect.setJidu("6月");
//							}
//							if(m==7){
//								obselect.setJidu("7月");
//							}
//							if(m==8){
//								obselect.setJidu("8月");
//							}
//							if(m==9){
//								obselect.setJidu("9月");
//							}
//							if(m==10){
//								obselect.setJidu("10月");
//							}
//							if(m==11){
//								obselect.setJidu("11月");
//							}
//							if(m==12){
//								obselect.setJidu("12月");
//							}
//						}
//						select.add(obselect);
//						
//					}
//				}
//			}
//			}
//			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").
//			append(select.size()).append(",result:");
//			JSONSerializer serializer = new JSONSerializer();
//			serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] { "createDate","updateDate"});
//			buff.append(serializer.exclude(new String[]{"class"}).serialize(select));
//			buff.append("}");
//			jsonString=buff.toString();
//			System.out.println("dddddddddddddd"+jsonString);
		} 
	     catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
		}
	     return SUCCESS;

	}
	//获得坐席拨打电话的次数
	public int PhoneCount(){
		int count =0;
		//当前用户ID
		try{
		String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
		List<ObSaletask> list=obSaletaskService.getPhoneCount(curUserId);
		for(ObSaletask osk:list){
			count=count+osk.getDiaCou();
		}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.getMessage();
		}
		return count;
		
	}
	/**
	    * 佣金计算_退单金额
	    * @author lzm
	 * @throws ParseException 
	    */
		public java.math.BigDecimal yongJiJiSuan_TJE(String datesta,String dateend) throws ParseException{
			java.math.BigDecimal tuije=null;
			//指标周期
			String zhouqi=getZhiBiaoZhouQiByUser();
			HashMap<String,String> datetime=getNyOrNy(zhouqi);
			//当前用户ID
			String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
			QueryFilter filter=new QueryFilter(getRequest());
			UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
			//销售人ID
			filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
			//业务单类型-退单
			filter.addFilter("Q_bizOrderType_SN_EQ",ScBizOrderSales.YONGJIN_TUIDAN.toString());
		    //业务单周期
			if(zhouqi!=null && !("").equals(zhouqi)){
				// 1-12月
				if(zhouqi=="1" || zhouqi.equals("1")){
					filter.addFilter("Q_createTime_D_GT", datesta);
					filter.addFilter("Q_finishTime_D_LT", dateend);
				}
				//第一季度-第四季度
				if(zhouqi=="2" || zhouqi.equals("2") ){
					filter.addFilter("Q_createTime_D_GT", datesta);
					filter.addFilter("Q_finishTime_D_LT", dateend);
				}
				
			}
			//业务单状态-完成
			filter.addFilter("Q_bizOrderStatus_SN_EQ", ScBizOrderSales.YEWUDAN_WANCHENG.toString());
			List<ScBizOrderSales> list= scBizOrderSalesService.getAll(filter);
			List<ScBizOrderSalesJiSuan> listjs=new ArrayList();
			String str="0.00";
			java.math.BigDecimal zdj=new java.math.BigDecimal (str);
			java.math.BigDecimal zdjs=new java.math.BigDecimal (str);
			ScBizOrderSalesJiSuan js=new ScBizOrderSalesJiSuan();
			for(ScBizOrderSales sales:list){
				//退订单金额
				zdjs=zdjs.add(sales.getTotalInAmount());
				js.setTotalInAmount(zdjs);
				tuije=js.getTotalInAmount();
				listjs.add(js);
			
			}
			return tuije;
		}
		
		/**
		    * 佣金计算_退单单数
		    * @author lzm
		 * @throws ParseException 
		    */
			public int yongJiJiSuan_TDDS(String datesta,String dateend) throws ParseException{
				 //退单单数
				int tcount=0;
				//指标周期
				String zhouqi=getZhiBiaoZhouQiByUser();
				HashMap<String,String> datetime=getNyOrNy(zhouqi);
				//当前用户ID
				String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
				QueryFilter filter=new QueryFilter(getRequest());
				UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
				//销售人ID
				filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
				//业务单类型-退单
				filter.addFilter("Q_bizOrderType_SN_EQ",ScBizOrderSales.YONGJIN_TUIDAN.toString());
			    //业务单周期
				if(zhouqi!=null && !("").equals(zhouqi)){
					// 1-12月
					if(zhouqi=="1" || zhouqi.equals("1")){
						filter.addFilter("Q_createTime_D_GT", datesta);
						filter.addFilter("Q_finishTime_D_LT", dateend);
					}
					//第一季度-第四季度
					if(zhouqi=="2" || zhouqi.equals("2") ){
						filter.addFilter("Q_createTime_D_GT", datesta);
						filter.addFilter("Q_finishTime_D_LT", dateend);
					}
					
				}
				//业务单状态-完成
				filter.addFilter("Q_bizOrderStatus_SN_EQ", ScBizOrderSales.YEWUDAN_WANCHENG.toString());
				List<ScBizOrderSales> list= scBizOrderSalesService.getAll(filter);
				//退单单数
				if(list.size()>0){
					tcount=tcount+list.size();
				}
				return tcount;
			}
	   /**
	    * 佣金计算_换单单金额
	    * @author lzm
	 * @throws ParseException 
	    */
		public java.math.BigDecimal yongJiJiSuan_HDJE(String datesta,String dateend) throws ParseException{
			java.math.BigDecimal huandan=null;
			//指标周期
			String zhouqi=getZhiBiaoZhouQiByUser();
			HashMap<String,String> datetime=getNyOrNy(zhouqi);
			//当前用户ID
			String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
			QueryFilter filter=new QueryFilter(getRequest());
			UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
			//销售人ID
			filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
			//业务单类型-换单
			filter.addFilter("Q_bizOrderType_SN_EQ",ScBizOrderSales.YONGJIN_HUANDAN.toString());
		    //业务单周期
			if(zhouqi!=null && !("").equals(zhouqi)){
				// 1-12月
				if(zhouqi=="1" || zhouqi.equals("1")){
					filter.addFilter("Q_createTime_D_GT", datesta);
					filter.addFilter("Q_finishTime_D_LT", dateend);
				}
				//第一季度-第四季度
				if(zhouqi=="2" || zhouqi.equals("2") ){
					filter.addFilter("Q_createTime_D_GT", datesta);
					filter.addFilter("Q_finishTime_D_LT", dateend);
				}
				
			}
			//业务单状态-完成
			filter.addFilter("Q_bizOrderStatus_SN_EQ", ScBizOrderSales.YEWUDAN_WANCHENG.toString());
			List<ScBizOrderSales> list= scBizOrderSalesService.getAll(filter);
			String str="0.00";
			java.math.BigDecimal zdj=new java.math.BigDecimal (str);
			java.math.BigDecimal zdjs=new java.math.BigDecimal (str);
			ScBizOrderSalesJiSuan js=new ScBizOrderSalesJiSuan();
			List<ScBizOrderSalesJiSuan> listjs=new ArrayList();
			for(ScBizOrderSales sales:list){
				//换订单金额
				zdjs=zdjs.add(sales.getTotalInAmount());
				js.setTotalInAmount(zdjs);
				huandan=js.getTotalInAmount();
				listjs.add(js);
			}
			return huandan;
		}
		
		   /**
		    * 佣金计算_换单单数
		    * @author lzm
		 * @throws ParseException 
		    */
			public int yongJiJiSuan_HDDS(String datesta,String dateend) throws ParseException{
				//换单单数
				int hcount=0;
				//指标周期
				String zhouqi=getZhiBiaoZhouQiByUser();
				HashMap<String,String> datetime=getNyOrNy(zhouqi);
				//当前用户ID
				String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
				QueryFilter filter=new QueryFilter(getRequest());
				UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
				//销售人ID
				filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
				//业务单类型-换单
				filter.addFilter("Q_bizOrderType_SN_EQ",ScBizOrderSales.YONGJIN_HUANDAN.toString());
			    //业务单周期
				if(zhouqi!=null && !("").equals(zhouqi)){
					// 1-12月
					if(zhouqi=="1" || zhouqi.equals("1")){
						filter.addFilter("Q_createTime_D_GT", datesta);
						filter.addFilter("Q_finishTime_D_LT", dateend);
					}
					//第一季度-第四季度 
					if(zhouqi=="2" || zhouqi.equals("2") ){
						filter.addFilter("Q_createTime_D_GT", datesta);
						filter.addFilter("Q_finishTime_D_LT", dateend);
					}
				}
				//业务单状态-完成
				filter.addFilter("Q_bizOrderStatus_SN_EQ", ScBizOrderSales.YEWUDAN_WANCHENG.toString());
				List<ScBizOrderSales> list= scBizOrderSalesService.getAll(filter);
				//换单单数
				if(list.size()>0){
					hcount=list.size();
				}
				return hcount;
			}
			
			
	
	   /**
	    * 佣金计算_取消订单金额
	    * @author lzm
	 * @throws ParseException 
	    */
		public java.math.BigDecimal yongJiJiSuan_QXJE(String datesta,String dateend) throws ParseException{
			java.math.BigDecimal quje=null;
			//指标周期
			String zhouqi=getZhiBiaoZhouQiByUser();
			HashMap<String,String> datetime=getNyOrNy(zhouqi);
			//当前用户ID
			String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
			QueryFilter filter=new QueryFilter(getRequest());
			UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
			//销售人ID
			filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
			///业务单类型
			filter.addFilter("Q_bizOrderType_SN_EQ",ScBizOrderSales.YONGJIN_DINGDAN.toString());
		    //业务单周期
			if(zhouqi!=null && !("").equals(zhouqi)){
				// 1-12月
				if(zhouqi=="1" || zhouqi.equals("1")){
					filter.addFilter("Q_createTime_D_GT", datesta);
					filter.addFilter("Q_finishTime_D_LT", dateend);
				}
				//第一季度-第四季度
				if(zhouqi=="2" || zhouqi.equals("2") ){
					filter.addFilter("Q_createTime_D_GT", datesta);
					filter.addFilter("Q_finishTime_D_LT", dateend);
				}
				
			}
			//业务单状态
			filter.addFilter("Q_bizOrderStatus_SN_EQ",ScBizOrderSales.YEWUDAN_ZHUXIAO.toString());
			List<ScBizOrderSales> list= scBizOrderSalesService.getAll(filter);
			List<ScBizOrderSalesJiSuan> listjs=new ArrayList();
			String str="0.00";
			java.math.BigDecimal zdj=new java.math.BigDecimal (str);
			java.math.BigDecimal zdjs=new java.math.BigDecimal (str);
			ScBizOrderSalesJiSuan js=new ScBizOrderSalesJiSuan();
			for(ScBizOrderSales sales:list){
				//取消订单金额
				zdjs=zdjs.add(sales.getTotalInAmount());
				js.setTotalInAmount(zdjs);
				quje=js.getTotalInAmount();
				listjs.add(js);
			}
			return quje;
		}
	
		   /**
		    * 佣金计算_取消订单数量
		    * @author lzm
		 * @throws ParseException 
		    */
			public int yongJiJiSuan_QXDDS(String datesta,String dateend) throws ParseException{
				//取消订单数
				int qcount=0;
				//指标周期
				String zhouqi=getZhiBiaoZhouQiByUser();
				HashMap<String,String> datetime=getNyOrNy(zhouqi);
				//当前用户ID
				String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
				QueryFilter filter=new QueryFilter(getRequest());
				UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
				//销售人ID
				filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
				///业务单类型
				filter.addFilter("Q_bizOrderType_SN_EQ",ScBizOrderSales.YONGJIN_DINGDAN.toString());
			    //   业务单周期
			    //业务单周期
				if(zhouqi!=null && !("").equals(zhouqi)){
					// 1-12月
					if(zhouqi=="1" || zhouqi.equals("1")){
						filter.addFilter("Q_createTime_D_GT", datesta);
						filter.addFilter("Q_finishTime_D_LT", dateend);
					}
					//第一季度-第四季度
					if(zhouqi=="2" || zhouqi.equals("2") ){
						filter.addFilter("Q_createTime_D_GT", datesta);
						filter.addFilter("Q_finishTime_D_LT", dateend);
					}
					
				}
				//业务单状态
				filter.addFilter("Q_bizOrderStatus_SN_EQ",ScBizOrderSales.YEWUDAN_ZHUXIAO.toString());
				List<ScBizOrderSales> list= scBizOrderSalesService.getAll(filter);
				//计算取消订单数
				if(list.size()>0){
					qcount=qcount+list.size();
				}
				return qcount;
			}

	   /**
	    * 佣金计算_总订单金额
	    * @author lzm
	 * @throws ParseException 
	    */
		public java.math.BigDecimal yongJiJiSuan_ZJE(String datesta,String dateend) throws ParseException{
			java.math.BigDecimal zje=null;
			//指标周期
			String zhouqi=getZhiBiaoZhouQiByUser();
			HashMap<String,String> datetime=getNyOrNy(zhouqi);
			
			int pcount=0;
			//当前用户ID
			String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
			UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
			QueryFilter filter=new QueryFilter(getRequest());
			//销售人ID
			filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
			//业务单类型
			filter.addFilter("Q_bizOrderType_SN_EQ",ScBizOrderSales.YONGJIN_DINGDAN.toString());
		    //业务单周期
			if(zhouqi!=null && !("").equals(zhouqi)){
				// 1-12月
				if(zhouqi=="1" || zhouqi.equals("1")){
					filter.addFilter("Q_createTime_D_GT", datesta);
					filter.addFilter("Q_finishTime_D_LT", dateend);
				}
				//第一季度-第四季度
				if(zhouqi=="2" || zhouqi.equals("2") ){
					filter.addFilter("Q_createTime_D_GT", datesta);
					filter.addFilter("Q_finishTime_D_LT", dateend);
				}
				
			}
			//业务单状态
			filter.addFilter("Q_bizOrderStatus_SN_EQ", ScBizOrderSales.YEWUDAN_WANCHENG.toString());
			List<ScBizOrderSales> list= scBizOrderSalesService.getAll(filter);
			if(list.size()>0){
			//计算订单总数
			pcount=list.size();
			}
			List<ScBizOrderSalesJiSuan> listjs=new ArrayList();
			String str="0.00";
			java.math.BigDecimal zdj=new java.math.BigDecimal (str);
			java.math.BigDecimal zdjs=new java.math.BigDecimal (str);
			ScBizOrderSalesJiSuan js=new ScBizOrderSalesJiSuan();
			for(ScBizOrderSales sales:list){
				//总订单金额
			    zdjs=zdjs.add(sales.getTotalInAmount());
				js.setTotalInAmount(zdjs);
				zje=js.getTotalInAmount();
				listjs.add(js);
			}
			return zje;
		}
		
		
		   /**
		    * 佣金计算_总订单数
		    * @author lzm
		 * @throws ParseException 
		    */
			public int yongJiJiSuan_ZDDS(String datesta,String dateend) throws ParseException{
				//指标周期
				String zhouqi=getZhiBiaoZhouQiByUser();
				int zcount=0;
				//当前用户ID
				String curUserId = String.valueOf(ContextUtil.getCurrentUserId()); 
				QueryFilter filter=new QueryFilter(getRequest());
				UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
				//销售人ID
				filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
				//业务单类型
				filter.addFilter("Q_bizOrderType_SN_EQ",ScBizOrderSales.YONGJIN_DINGDAN.toString());
			    //业务单周期
				if(zhouqi!=null && !("").equals(zhouqi)){
					// 1-12月
					if(zhouqi=="1" || zhouqi.equals("1")){
						filter.addFilter("Q_createTime_D_GT", datesta);
						filter.addFilter("Q_finishTime_D_LT", dateend);
					}
					//第一季度-第四季度
					if(zhouqi=="2" || zhouqi.equals("2") ){
						filter.addFilter("Q_createTime_D_GT", datesta);
						filter.addFilter("Q_finishTime_D_LT", dateend);
					}
					
				}
				//业务单状态
				filter.addFilter("Q_bizOrderStatus_SN_EQ", ScBizOrderSales.YEWUDAN_WANCHENG.toString());
				List<ScBizOrderSales> list= scBizOrderSalesService.getAll(filter);
				if(list.size()>0){
				//计算订单总数
					zcount=list.size();
				}
				return zcount;
			}
			
		/**
		 * 搭销率（一单多货_有多个商品）
		 * @author lzm
		 */
		public int getOneSalesManyG(){
	    	int oneCount=0;
	    	List<ScBizOrderSales> listOne=new ArrayList();
	    	try{
	    	//业务单明细
	    	List<ScBizSalesDetail> listdetail=scBizSalesDetailService.getAll();
	    	//业务单
	    	List<ScBizOrderSales> list= scBizOrderSalesService.getAll();
	    	for(ScBizSalesDetail salesd:listdetail){
	    		for(ScBizOrderSales sales:list){
	    			if(sales.getScBizSalesDetails().size()>0){
	    			Set<ScBizSalesDetail> listdetails=sales.getScBizSalesDetails();
	    			for(ScBizSalesDetail detail:listdetails){
	    				if(salesd==detail && detail.equals(salesd)){
	    					listOne.add(sales);
	    				}
	    			}
	    			}
	    		}
	    	}
	    	oneCount=listOne.size();
	    	}
	    	catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	
	    	return oneCount;
	    }
		
		/**
		 * 搭销率（一单多货_一个商品个数大于1）
		 * @author lzm
		 */
		public int getOneSalesOneG(){
			int ManyCount=0;
	    	List<ScBizOrderSales> listOne=new ArrayList();
	    	try{
	    	//业务单明细
	    	List<ScBizSalesDetail> listdetail=scBizSalesDetailService.getAll();
	    	//业务单
	    	List<ScBizOrderSales> list= scBizOrderSalesService.getAll();
	    	for(ScBizSalesDetail salesd:listdetail){
	    		for(ScBizOrderSales sales:list){
	    			if(sales.getScBizSalesDetails().size()>0){
	    			Set<ScBizSalesDetail> listdetails=sales.getScBizSalesDetails();
	    			for(ScBizSalesDetail detail:listdetails){
	    				if(salesd==detail && detail.equals(salesd)){
	    					if(salesd.getGoodsCount()>1){
	    					listOne.add(sales);
	    					}
	    				}
	    			}
	    			}
	    		}
	    	}
	    	ManyCount=listOne.size();
	    	}
	    	catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	
	    	return ManyCount;
	    }
//		/**
//		 * 显示列表
//		 * @author lzm
//		 */
//		public String list(){
//			try {
//				java.math.BigDecimal zje=yongJiJiSuan_ZJE();
//				
//			} catch (ParseException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			QueryFilter filter=new QueryFilter(getRequest());
//			List<ObFee> list= obFeeService.getAll(filter);
//			for(ObFee obfee:list){
//				AppUser appuser=appUserService.get(obfee.getUserid());
//				
//				obfee.setCreateByNam(appuser.getFullname());
//				obfee.setUserNam(appuser.getFamilyName());
//				obfee.setUserNo(appuser.getEmployeeid());
//				obfee.setDeparetNam(appuser.getDepName());
//			}
//			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
//			.append(filter.getPagingBean().getTotalItems()).append(
//					",result:");
//			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
//			jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {"createDate" });
//			buff.append(jsonSer.serialize(list));
//			buff.append("}");
//			
//			jsonString = buff.toString();
//			
//			
//			return SUCCESS;
//		}
		
	/**
	 * 当前用户绑定的指标的 年度
	 * @author lzm
	 */
	public String getZhiBiaoNianDuByUser(){
		//指标年度
		String niandu="";
		//当前用户ID
		String curUserId = String.valueOf(ContextUtil.getCurrentUserId());
		//当前登录的员工
		try{
		UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
		if(ulEmployee!=null){
		if(ulEmployee.getUlDepartment().getDepid()!=null){
				List<ObFeeIndex> obfeeindex=obFeeIndexService.getAll();
				for(ObFeeIndex ofi:obfeeindex){
					//绑定员工的指标
					Set<UlEmployee> emp=ofi.getUlEmployees();
					for(UlEmployee employee:emp){
						if(employee.getUseid()==ulEmployee.getUseid()){
						}
						if(employee.equals(ulEmployee) || employee==ulEmployee ){
							niandu=ofi.getAnnual().toString();
						}
					}
					
				}
			}
		}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return niandu;
	}
	/**
	 * 当前用户绑定的指标的周期
	 * @author lzm
	 */
	public String getZhiBiaoZhouQiByUser(){
		//指标周期
		String zhouqi="";
		//当前用户ID
		String curUserId = String.valueOf(ContextUtil.getCurrentUserId());
		try{
			UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
				if(ulEmployee.getUlDepartment().getDepid()!=null){
					List<ObFeeIndex> obfeeindex=obFeeIndexService.getAll();
					for(ObFeeIndex ofi:obfeeindex){
						//绑定员工的指标
						Set<UlEmployee> emp=ofi.getUlEmployees();
						for(UlEmployee employee:emp){
							if(employee.equals(ulEmployee) || employee==ulEmployee ){
								zhouqi=ofi.getCycle().toString();
							}
						}
					}
			}
		}catch (Exception ex) {
			logger.error(ex.getMessage());
		}
		return zhouqi;
	}
	/**
	 * 处理时间1——12月份
	 * stadate-开始时间月份
	 * enddate-结束时间月份
	 * @throws ParseException 
	 */
	public String inputDate(String stadate,String enddate) throws ParseException{
		String nd=getZhiBiaoNianDuByUser();
		SimpleDateFormat   sdf   =   new   SimpleDateFormat( "yyyy-MM-dd"); 
		Date date1=new Date();
		Date date2=new Date();
		String yista=stadate;
		String yiend=enddate;
		date1=sdf.parse(yista);
		date2=sdf.parse(yiend);
		String str1=sdf.format(date1);
		String str2=sdf.format(date2);
		String yi=str1+","+str2;
		return yi;
	}
	
//	/**
//	 * 按年度、月份
//	 * @throws ParseException 
//	 */
//	public String getNyOrNd(String str) throws ParseException{
//		String zhouqi="";
//		//获得指标年月
//		String nd=getZhiBiaoNianDuByUser();
//		Integer nian=Integer.parseInt(nd);
//		HashMap<String,String> TimeVlaues = new HashMap<String,String>();
//		  if(zhouqi!=null && nd!=null){
//			//指标周期按月份
//			if(str=="1"){
//				String yi=inputDate("-1-1","-1-31");
//				//润年
//				String er;
//				if(nian % 4 == 0 && nian % 100 != 0 || nian % 400 == 0){
//					 er=inputDate("-2-1","-2-29");
//				}
//				//平年
//				else{
//					 er=inputDate("-2-1","-2-28");
//				}
//				String san=inputDate("-3-1","-3-31");
//				String si=inputDate("-4-1","-4-30");
//				String wu=inputDate("-5-1","-5-31");
//				String liu=inputDate("-6-1","-6-30");
//				String qi=inputDate("-7-1","-7-31");
//				String ba=inputDate("-8-1","-8-31");
//				String jiu=inputDate("-9-1","-9-30");
//				String shi=inputDate("-10-1","-1-31");
//				String shiyi=inputDate("-11-1","-11-30");
//				String shier=inputDate("-12-1","-1-31");
//				//将每个月份的起始时间存入Map中
//				TimeVlaues.put("yi", yi);
//				TimeVlaues.put("er", er);
//				TimeVlaues.put("san", san);
//				TimeVlaues.put("si", si);
//				TimeVlaues.put("wu", wu);
//				TimeVlaues.put("liu", liu);
//				TimeVlaues.put("qi", qi);
//				TimeVlaues.put("ba", ba);
//				TimeVlaues.put("jiu", jiu);
//				TimeVlaues.put("shi", shi);
//				TimeVlaues.put("shiyi", shiyi);
//				TimeVlaues.put("shier", shier);
//				
//			}
//			//指标周期按第一季度 返回nd+季度的截止时间
//			else if(str=="2" || str.equals("2")){
//				SimpleDateFormat   sdf   =   new   SimpleDateFormat( "yyyy-MM-dd"); 
//				Date date1=new Date();
//				Date date2=new Date();
//				String yista=nd+"-1-1";
//				String yiend=nd+"-3-31";
//				date1=sdf.parse(yista);
//				date2=sdf.parse(yiend);
//				String str1=sdf.format(date1);
//				String str2=sdf.format(date2);
//				zhouqi=str1+","+str2;
//			}
//			///指标周期按第二季度 返回nd+季度的截止时间
//			else if(str=="3" || str.equals("3")){
//				SimpleDateFormat   sdf   =   new   SimpleDateFormat( "yyyy-MM-dd"); 
//				Date date1=new Date();
//				Date date2=new Date();
//				String yista=nd+"-4-1";
//				String yiend=nd+"-6-30";
//				date1=sdf.parse(yista);
//				date2=sdf.parse(yiend);
//				String str1=sdf.format(date1);
//				String str2=sdf.format(date2);
//				zhouqi=str1+","+str2;
//			}
//			///指标周期按第三季度 返回nd+季度的截止时间
//			else if(str=="4" || str.equals("4")){
//				SimpleDateFormat   sdf   =   new   SimpleDateFormat( "yyyy-MM-dd"); 
//				Date date1=new Date();
//				Date date2=new Date();
//				String yista=nd+"-7-1";
//				String yiend=nd+"-9-30";
//				date1=sdf.parse(yista);
//				date2=sdf.parse(yiend);
//				String str1=sdf.format(date1);
//				String str2=sdf.format(date2);
//				zhouqi=str1+","+str2;
//			}
//			///指标周期按第四季度 返回nd+季度的截止时间
//			else if(str=="5" || str.equals("5")){
//				SimpleDateFormat   sdf   =   new   SimpleDateFormat( "yyyy-MM-dd"); 
//				Date date1=new Date();
//				Date date2=new Date();
//				String yista=nd+"-10-1";
//				String yiend=nd+"-12-30";
//				date1=sdf.parse(yista);
//				date2=sdf.parse(yiend);
//				String str1=sdf.format(date1);
//				String str2=sdf.format(date2);
//				zhouqi=str1+","+str2;
//			}
//			else{
//				
//			}
//		  }
//		return zhouqi;
//	}
	/**
	 * 按年度、月份
	 * @throws ParseException 
	 */
	public HashMap<String,String> getNyOrNy(String str) throws ParseException{
		String zhouqi="";
		//获得指标年月
		String nd=getZhiBiaoNianDuByUser();
		Integer nian=Integer.parseInt(nd);
		HashMap<String,String> TimeVlaues = new HashMap<String,String>();
		  if(zhouqi!=null && nd!=null){
			//指标周期按月份
			if(str=="1"){
				String yi=inputDate("-1-1","-1-31");
				//润年
				String er;
				if(nian % 4 == 0 && nian % 100 != 0 || nian % 400 == 0){
					 er=inputDate("-2-1","-2-29");
				}
				//平年
				else{
					 er=inputDate("-2-1","-2-28");
				}
				String san=inputDate("-3-1","-3-31");
				String si=inputDate("-4-1","-4-30");
				String wu=inputDate("-5-1","-5-31");
				String liu=inputDate("-6-1","-6-30");
				String qi=inputDate("-7-1","-7-31");
				String ba=inputDate("-8-1","-8-31");
				String jiu=inputDate("-9-1","-9-30");
				String shi=inputDate("-10-1","-1-31");
				String shiyi=inputDate("-11-1","-11-30");
				String shier=inputDate("-12-1","-1-31");
				//将每个月份的起始时间存入Map中
				TimeVlaues.put("yi", yi);
				TimeVlaues.put("er", er);
				TimeVlaues.put("san", san);
				TimeVlaues.put("si", si);
				TimeVlaues.put("wu", wu);
				TimeVlaues.put("liu", liu);
				TimeVlaues.put("qi", qi);
				TimeVlaues.put("ba", ba);
				TimeVlaues.put("jiu", jiu);
				TimeVlaues.put("shi", shi);
				TimeVlaues.put("shiyi", shiyi);
				TimeVlaues.put("shier", shier);
				
			}
			
			
			//指标周期按第一季度 返回nd+季度的截止时间
			 if(str=="2" || str.equals("2")){
				String yista1=nd+"-1-1";
				String yiend1=nd+"-3-31";
				String dateny1=inputDate(yista1,yiend1);
				
				String yista2=nd+"-4-1";
				String yiend2=nd+"-6-30";
				String dateny2=inputDate(yista2,yiend2);
				
				String yista3=nd+"-7-1";
				String yiend3=nd+"-9-30";
				String dateny3=inputDate(yista3,yiend3);
				
				String yista4=nd+"-10-1";
				String yiend4=nd+"-12-31";
				String dateny4=inputDate(yista4,yiend4);
				
				TimeVlaues.put("yijd", dateny1);
				TimeVlaues.put("erjd", dateny2);
				TimeVlaues.put("sanjd", dateny3);
				TimeVlaues.put("sijd", dateny4);
				
			}
//			 Iterator iterator = TimeVlaues.keySet().iterator();
//			 while(iterator.hasNext()) {
//				 System.out.println(TimeVlaues.size()+"sssssssssssssss"+iterator.next());
//			 }
//			///指标周期按第二季度 返回nd+季度的截止时间
//			 if(str=="2" || str.equals("2")){
//				String yista=nd+"-4-1";
//				String yiend=nd+"-6-30";
//				String dateny=inputDate(yista,yiend);
//				TimeVlaues.put("erjd", dateny);
//			}
//			///指标周期按第三季度 返回nd+季度的截止时间
//			 if(str=="2" || str.equals("2")){
//				String yista=nd+"-7-1";
//				String yiend=nd+"-9-30";
//				String dateny=inputDate(yista,yiend);
//				TimeVlaues.put("sanjd", dateny);
//			}
//			///指标周期按第四季度 返回nd+季度的截止时间
//			 if(str=="2" || str.equals("2")){
//				String yista=nd+"-10-1";
//				String yiend=nd+"-12-31";
//				String dateny=inputDate(yista,yiend);
//				TimeVlaues.put("sijd", dateny);
//			}
//			else{
//				
//			}
		  }
		return TimeVlaues;
	}
	

    /**
     * 符合佣金规则并计算佣金
     * @author lzm
     */
	public java.math.BigDecimal getYongJi(java.math.BigDecimal zmoney,java.math.BigDecimal sjmoney){
		java.math.BigDecimal yongjin=null;
		List<ObFeeRuleValue> ruleValues=getRuleByUseId();
		for(ObFeeRuleValue rulevale:ruleValues){
			//返回的结果是int类型，-1表示小于，0是等于，1是大于。  
			System.out.println("max"+rulevale.getMaximum());
			System.out.println("min"+rulevale.getMinimum());
			System.out.println("zmoney"+zmoney);
			System.out.println("sjmoney"+sjmoney);
			if(sjmoney!=null){
			int a =rulevale.getMaximum().compareTo(zmoney) ;
			int b =rulevale.getMinimum().compareTo(zmoney) ;
			if(rulevale.getMaximum().compareTo(zmoney)==1 && rulevale.getMinimum().compareTo(zmoney)==-1){
				yongjin=sjmoney.multiply(rulevale.getCoefficient());//实际汇款额*提成比例
				yongjin=yongjin.add(rulevale.getIncrease());        //绩效金额
			}
			}
		}
		
		return yongjin;
	}
	/**
	 * 佣金查询列表
	 * @author lzm
	 */
	public String yongjinList() {
		try {
		//总订单金额
		java.math.BigDecimal zongjine=null;
		//取消订单金额
		java.math.BigDecimal quxiaojine=null;
		//换单金额
		java.math.BigDecimal huanjine=null;
		//退单金额
		java.math.BigDecimal tuidan=null;
		//净订单金额
		java.math.BigDecimal jingjine=null;
		//有效订单金额
		java.math.BigDecimal youxiaojine=null;
		//员工佣金
		java.math.BigDecimal yongjin=null;
		//指标周期
		String zhouqi=getZhiBiaoZhouQiByUser();
		HashMap<String,String> datetime=getNyOrNy(zhouqi);
		Iterator<String> iterator = datetime.keySet().iterator();
		List<ObFeeSelect> select=new ArrayList();
		
		while(iterator.hasNext()) {
			String d = iterator.next();
			String values=datetime.get(d);
			String [] value=values.split(",");
		     	//总订单金额
			 zongjine=yongJiJiSuan_ZJE(value[0],value[1]);
			     //取消订单金额
			 quxiaojine=yongJiJiSuan_QXJE(value[0],value[1]);
				//换单金额
			 huanjine=yongJiJiSuan_HDJE(value[0],value[1]);
				//退单金额
			 tuidan=yongJiJiSuan_TJE(value[0],value[1]);
			 if(zongjine!=null){
             if(quxiaojine==null){
				  jingjine=zongjine;
             }else{
           	  jingjine=zongjine.subtract(quxiaojine);
             }
				//有效订单金额
             if(quxiaojine==null && tuidan==null && huanjine==null){
            	 youxiaojine=zongjine;
             }else if(quxiaojine!=null && tuidan==null && huanjine==null){
            	 youxiaojine=zongjine.subtract(quxiaojine);
             }else if(quxiaojine!=null && tuidan!=null && huanjine==null){
            	 youxiaojine=zongjine.subtract(quxiaojine).subtract(tuidan);
             }else if(quxiaojine!=null && tuidan==null && huanjine!=null){
            	 youxiaojine=zongjine.subtract(quxiaojine).subtract(huanjine);
             }else if(quxiaojine==null && tuidan!=null && huanjine!=null){
            	 youxiaojine=zongjine.subtract(huanjine).subtract(tuidan);
             }else if(quxiaojine==null && tuidan==null && huanjine!=null){
            	 youxiaojine=zongjine.subtract(huanjine);
             }else if(quxiaojine==null && tuidan!=null && huanjine==null){
            	 youxiaojine=zongjine.subtract(tuidan);
             }
             else{
            	 youxiaojine=zongjine.subtract(huanjine).subtract(tuidan).subtract(quxiaojine);
             }
			 }
		//员工佣金
		 yongjin=getYongJi(zongjine,youxiaojine);
	
		List<ObFeeIndexLevel> levels= getRuleValueByUseId();
		//员工佣金
		for(ObFeeIndexLevel level:levels){
			ObFeeSelect osd=new ObFeeSelect();
			osd.setMubiaozhi(level.getFeeIndexValue()); //目标值
			osd.setWanchengliang(youxiaojine);//完成值
//			int r=big_decimal.compareTo(BigDecimal.Zero); //和0，Zero比较
			if(youxiaojine!=null && level.getFeeIndexValue()!=null){
			if(level.getFeeIndexValue().compareTo(java.math.BigDecimal.ZERO)!=0){
			osd.setWanchenglv(youxiaojine.divide(level.getFeeIndexValue(),2, java.math.BigDecimal.ROUND_HALF_EVEN));//完成率
			}
			}
			osd.setYongjin(yongjin);//佣金
			
			if(level.getFeeIndexProjectId()==1){
				osd.setZhibiaoxiang(ObFeeSelect.ZHIBIAOXIANG_JIEANSHU);//结案客户数
			}
			if(level.getFeeIndexProjectId()==2){
				osd.setZhibiaoxiang(ObFeeSelect.ZHIBIAOXIANG_DINGDANCOUNT);//有效订单数
			}
			if(level.getFeeIndexProjectId()==4){
				osd.setZhibiaoxiang(ObFeeSelect.ZHIBIAOXIANG_DINGDANXXE);//订单销售额
			}
			if(level.getFeeIndexProjectId()==3){
				osd.setZhibiaoxiang(ObFeeSelect.ZHIBIAOXIANG_XIAOSHOUE);//指标项
			}
			//指标名称
			if(level.getFeeIndexId()!=null || !("").equals(level.getFeeIndexId())){
			 ObFeeIndex feeindex=obFeeIndexService.get(level.getFeeIndexId());
			 osd.setZhibiaoNam(feeindex.getFeeIndexName());
			}
			//月份
			
			osd.setMonth(level.getMonth());
			select.add(osd);
		}
		}
		QueryFilter filter=new QueryFilter(getRequest());
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").
		append(select.size()).
		append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] {});
		buff.append(serializer.exclude(new String[]{"class"}).serialize(select));
		buff.append("}");
		jsonString=buff.toString();
		}catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		 return SUCCESS;
	}
	
	/**
	 * 获得当前员工所属部门的佣金指标值
	 * @author lzm
	 */
	public List<ObFeeIndexLevel> getRuleValueByUseId(){
		ObFeeRule obFeeRule=new ObFeeRule();
		List<ObFeeRule> rulevalue = null;
		List<ObFeeIndexLevel> obFeeIndexLevel=null;
		//当前用户ID
		String curUserId = String.valueOf(ContextUtil.getCurrentUserId());
		try{
		UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
		UlDepartment ulDepartment = ulDepartmentService.get(new Long(ulEmployee.getUlDepartment().getDepid()));
		if(ulEmployee.getUlDepartment().getDepid()!=null){
				List<ObFeeRule> obfeerule=obFeeRuleService.getAll();
				for(ObFeeRule rules:obfeerule){
					//获得绑定规则的部门
					Set<UlDepartment> dep=rules.getUlDepartment();
					for(UlDepartment deps:dep){
						if(ulDepartment.equals(deps) || ulDepartment==deps ){
							QueryFilter filter=new QueryFilter(getRequest());
							filter.addFilter("Q_obFeeIndexProject.feeIndexProjectId_L_EQ",rules.getObFeeIndexProject().getFeeIndexProjectId().toString());
							obFeeIndexLevel=obFeeIndexLevelService.getAll(filter);
						}
					}
					
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return obFeeIndexLevel;
	}
    
	
    
	/**
	 * 获得当前员工所属部门的佣金规则值
	 * @author lzm
	 */
	public List<ObFeeRuleValue> getRuleByUseId(){
		ObFeeRule obFeeRule=new ObFeeRule();
		List<ObFeeRuleValue> rulevalue = null;
		//当前用户ID
		String curUserId = String.valueOf(ContextUtil.getCurrentUserId());
		try{
		UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
		UlDepartment ulDepartment = ulDepartmentService.get(new Long(ulEmployee.getUlDepartment().getDepid()));
		if(ulEmployee.getUlDepartment().getDepid()!=null){
				List<ObFeeRule> obfeerule=obFeeRuleService.getAll();
				for(ObFeeRule rules:obfeerule){
					//获得绑定规则的部门
					Set<UlDepartment> dep=rules.getUlDepartment();
					for(UlDepartment deps:dep){
						if(ulDepartment.equals(deps) || ulDepartment==deps ){
							Long vid=rules.getFeeRuleId();
							QueryFilter filter=new QueryFilter(getRequest());
							filter.addFilter("Q_obFeeRule.feeRuleId_L_EQ",rules.getFeeRuleId().toString());
							 rulevalue=obFeeRuleValueService.getAll(filter);
						}
					}
					
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rulevalue;
	}
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ObFee obFee=obFeeService.get(feeId);
		
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
			"createDate", "effectiveTime","failureTime" });
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(obFee));
		buff.append("}");
		jsonString = buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 佣金详细信息
	 * @return
	 */
	
	
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				obFeeService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(obFee.getFeeId()==null){
			obFeeService.save(obFee);
		}else{
			ObFee orgObFee=obFeeService.get(obFee.getFeeId());
			try{
				BeanUtil.copyNotNullProperties(orgObFee, obFee);
				obFeeService.save(orgObFee);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
