package com.ulane.customer.action.fee;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.callout.service.outb.ObSaletaskService;
import com.ulane.customer.model.fee.CopyOfSysEmpPerformancevo;
import com.ulane.customer.model.fee.ObFeeIndex;
import com.ulane.customer.model.fee.ObFeeIndexLevel;
import com.ulane.customer.model.fee.ObFeeRule;
import com.ulane.customer.model.fee.ObFeeRuleValue;
import com.ulane.customer.model.fee.ObFeeSelect;
import com.ulane.customer.model.fee.SysEmpPerformance;
import com.ulane.customer.service.fee.ObFeeIndexLevelService;
import com.ulane.customer.service.fee.ObFeeIndexService;
import com.ulane.customer.service.fee.ObFeeRuleService;
import com.ulane.customer.service.fee.ObFeeRuleValueService;
import com.ulane.customer.service.fee.SysEmpPerformanceService;
import com.ulane.supply.service.sales.ScBizOrderSalesService;
import com.ulane.supply.service.sales.ScBizSalesDetailService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

public class SysEmpPerformanceAction extends BaseAction {
	private static final boolean UlEmployee = false;
	@Resource
	SysEmpPerformanceService sysEmpPerformanceService;
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
	private ObFeeRuleService obFeeRuleService;
	@Resource
	private AppUserService appUserService;
	
	/**
	 * 显示列表
	 */
	public String list(){
		String jiduDat = getRequest().getParameter("Q_empPerNd_S_EQ_pams");
		String Q_perDat_D_EQ_RW = getRequest().getParameter("Q_perDat_D_EQ_RW");
		String nyr = getRequest().getParameter("Q_perDat_D_EQ_pams");
		String jidukey = getRequest().getParameter("jiduvalue");
 		String zhouqikey = getRequest().getParameter("value");
		java.math.BigDecimal jingde=new java.math.BigDecimal("0");;
		java.math.BigDecimal youde=new java.math.BigDecimal("0");
		//佣金妥投率
		java.math.BigDecimal tuotoulvMonye=new java.math.BigDecimal("0");
		//单数妥投率
		double tuotoulvCount=0.0;
		//净订单金额
		java.math.BigDecimal jingjine=new java.math.BigDecimal("0");
		//净订单单数
		Long jingd=0l;
		//成交率
		double chenglv=0.0;
		//搭销率
		double daxiaolv=0.0;
		//佣金
		java.math.BigDecimal  yongjin=new java.math.BigDecimal("0");
		//当前用户ID
		try{
		if(ContextUtil.getCurrentUser().getUlEmployee()==null){
		}else{
//		String curUserId =ContextUtil.getCurrentUserId(); 
		AppUser users=appUserService.get(new Long(ContextUtil.getCurrentUserId()));
		UlEmployee ulEmployee = ulEmployeeService.getEmployeeByUserNo(users.getEmployeeid());
//		UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
		List<SysEmpPerformance> list=null;
	   //通过定时器 计算每个周期的佣金
//		List<CopyOfSysEmpPerformancevo> list1=sysEmpPerformanceService.findYongJinByQuarter(ulEmployee.getUserNo(),null,null);
//		List<SysEmpPerformance> list  =null;
//		for(int i=0;i<list1.size();i++){
//			SysEmpPerformance sys=new SysEmpPerformance();
//			CopyOfSysEmpPerformancevo sysvo=new CopyOfSysEmpPerformancevo();
//			sysvo=list1.get(i);
//			SimpleDateFormat sdf=new SimpleDateFormat("yyyy");//小写的mm表示的是分钟  
//			String dstr="2008-4-24";  
//			String nd=sdf.format(sysvo.getPerDat());
////		    CopyOfSysEmpPerformancevo sysvo=(CopyOfSysEmpPerformancevo)s;
//		    sys.setTotalOrderCash(sysvo.getTotalOrderCash());  //总 金额
//		    sys.setTotalOrders(sysvo.getTotalOrders());        //总订单
//		    sys.setExchangeCash(sysvo.getExchangeCash());	   //换货金额
//		    sys.setExchangeOrders(sysvo.getExchangeOrders());   //换货单数
//		    sys.setValidOrderCash(sysvo.getValidOrderCash());	//有效金额
//		    sys.setValidOrders(sysvo.getValidOrders());			// 有效单数
//		    sys.setBackOrderCash(sysvo.getBackOrderCash());		//退货金额
//		    sys.setBackOrders(sysvo.getBackOrders());			//退货单数
//		    sys.setCanceledCash(sysvo.getCanceledCash());		//取消金额
//		    sys.setCanceledOrders(sysvo.getCanceledOrders());	//取消单数
//		    sys.setEmpPerQuarter(sysvo.getEmpPerQuarter());		//季度
//		    sys.setPerDat(sysvo.getPerDat());					//ny
//		    sys.setTotalPhones(sysvo.getTotalPhones());		   //总电话
//		    sys.setOrderGoods(sysvo.getOrderGoods());		   //一单多货
//		    sys.setEmployeeNo(sysvo.getEmployeeNo());		   //
//		    sys.setEmpPerNd(nd);
//		    sysEmpPerformanceService.save(sys);
//		    System.out.println("ssssssssssssssss"+sys.getEmpPerNd());
//		    System.out.println("ssssssssssssssss"+sys.getEmployeeNo());
//		    System.out.println("ssssssssssssssss"+sys.getTotalOrders());
//		    System.out.println("ssssssssssssssss"+sys.getTotalOrderCash());
//		    System.out.println("ssssssssssssssss"+sys.getExchangeOrders());
//		    System.out.println("ssssssssssssssss"+sys.getExchangeCash());
//		    System.out.println("ssssssssssssssss"+sys.getValidOrders());
//		    System.out.println("ssssssssssssssss"+sys.getValidOrderCash());
//		    System.out.println("ssssssssssssssss"+sys.getBackOrders());
//		    System.out.println("ssssssssssssssss"+sys.getBackOrderCash());
//		    System.out.println("ssssssssssssssss"+sys.getCanceledCash());
//		    System.out.println("ssssssssssssssss"+sys.getOrderGoods());
//		    System.out.println("ssssssssssssssss"+sys.getEmpPerQuarter());
//		    System.out.println("ssssssssssssssss"+sys.getPerDat());
//		    System.out.println("ssssssssssssssss"+sys.getTotalPhones());
//		    System.out.println("ssssssssssssssss"+sysvo.getCanceledOrders());
//		    
//		}
		//周期不为空
		if(zhouqikey!=null ){
		//按季度统计佣金
		if(zhouqikey=="1" || ("1").equals(zhouqikey)){
		QueryFilter filter=new QueryFilter(getRequest());
		//销售人ID
		filter.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
		filter.addFilter("Q_empPerNd_S_EQ",jiduDat);
		filter.addFilter("Q_empPerQuarter_S_EQ",jidukey);
	    list= sysEmpPerformanceService.getAll(filter);
		for(SysEmpPerformance sysEmpPerformance:list){
			//净订单金额
            if(sysEmpPerformance.getCanceledCash()==null){
				  jingjine=sysEmpPerformance.getTotalOrderCash();
	          }else{
	          	  jingjine=sysEmpPerformance.getTotalOrderCash().subtract(sysEmpPerformance.getCanceledCash());
	           }
			//净订单单数
            if(sysEmpPerformance.getCanceledOrders()==null){
            	jingd=sysEmpPerformance.getTotalOrders();
	        }else{
	            jingd=sysEmpPerformance.getTotalOrders()-sysEmpPerformance.getCanceledOrders();
	           }
			//金额妥投率
            if(jingjine!=null){
            	tuotoulvMonye=sysEmpPerformance.getValidOrderCash().divide(jingjine,2, java.math.BigDecimal.ROUND_HALF_EVEN);
            	sysEmpPerformance.setJinetuotoulv(tuotoulvMonye);
            }
			//单数妥投率
            if(jingd!=0){
            	tuotoulvCount=(double)sysEmpPerformance.getValidOrders()/jingd;
            	sysEmpPerformance.setDanshutuotoulv(tuotoulvCount);
            }
            //成交率
            if(sysEmpPerformance.getTotalPhones()!=0){
            	chenglv=(double)jingd/sysEmpPerformance.getTotalPhones();
            	sysEmpPerformance.setWanchenglv(chenglv);
            }
            //搭销率
            if(sysEmpPerformance.getTotalOrders()!=0){
                daxiaolv=(double)sysEmpPerformance.getOrderGoods()/sysEmpPerformance.getTotalOrders();
                sysEmpPerformance.setDaxiaolv(daxiaolv);
            }
            yongjin=getYongJi(sysEmpPerformance.getTotalOrderCash(),sysEmpPerformance.getValidOrderCash());
            if(yongjin!=null){
            	sysEmpPerformance.setYongjin(yongjin); 
            }
			UlDepartment ulDepartment = ulDepartmentService.get(new Long(ulEmployee.getUlDepartment().getDepid()));
			List<ObFeeIndex> obfeeindex=obFeeIndexService.getAll();
			int q=0;
			for(ObFeeIndex ofi:obfeeindex){
				//绑定员工的指标
				Set<UlEmployee> emp=ofi.getUlEmployees();
				for(UlEmployee employee:emp){
					if(employee.getUseid()==ulEmployee.getUseid()){
						sysEmpPerformance.setUserNam(ulEmployee.getFullname());
						sysEmpPerformance.setDepNam(ulDepartment.getDepname());
					}
				}
			}
		}
			Type type=new TypeToken<List<SysEmpPerformance>>(){}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"perDat", "sumDat","creDat","updDat" });
			buff.append(jsonSer.serialize(list));
			buff.append("}");
			jsonString=buff.toString();
			}
		//按月份统计佣金
		if(zhouqikey=="2" || ("2").equals(zhouqikey)){
		  if(nyr!=null || !("").equals(nyr)){
				QueryFilter filter1=new QueryFilter(getRequest());
				//销售人ID
				filter1.addFilter("Q_employeeNo_S_EQ", ulEmployee.getUserNo());
	//			filter.addFilter("Q_empPerNd_S_EQ",);
				filter1.addFilter("Q_perDat_D_EQ",nyr);
			    list= sysEmpPerformanceService.getAll(filter1);
				for(SysEmpPerformance sysEmpPerformance:list){
					sysEmpPerformance.getTotalOrderCash();
					//净订单金额
		            if(sysEmpPerformance.getCanceledCash()==null){
						  jingjine=sysEmpPerformance.getTotalOrderCash();
			          }else{
			          	  jingjine=sysEmpPerformance.getTotalOrderCash().subtract(sysEmpPerformance.getCanceledCash());
			           }
					//净订单单数
		            if(sysEmpPerformance.getCanceledOrders()==null){
		            	jingd=sysEmpPerformance.getTotalOrders();
			        }else{
			            jingd=sysEmpPerformance.getTotalOrders()-sysEmpPerformance.getCanceledOrders();
			           }
					//金额妥投率
		            if(jingjine!=null){
		            	tuotoulvMonye=sysEmpPerformance.getValidOrderCash().divide(jingjine,2, java.math.BigDecimal.ROUND_HALF_EVEN);
		            	sysEmpPerformance.setJinetuotoulv(tuotoulvMonye);
		            }
					//单数妥投率
		            if(jingd!=0){
		            	tuotoulvCount=(double)sysEmpPerformance.getValidOrders()/jingd;
		            	sysEmpPerformance.setDanshutuotoulv(tuotoulvCount);
		            }
		            //成交率
		            if(sysEmpPerformance.getTotalPhones()!=0){
		            	chenglv=(double)jingd/sysEmpPerformance.getTotalPhones();
		            	sysEmpPerformance.setWanchenglv(chenglv);
		            }
		            //搭销率
		            if(sysEmpPerformance.getTotalOrders()!=0){
		                daxiaolv=(double)sysEmpPerformance.getOrderGoods()/sysEmpPerformance.getTotalOrders();
		                sysEmpPerformance.setDaxiaolv(daxiaolv);
		            }
		            yongjin=getYongJi(sysEmpPerformance.getTotalOrderCash(),sysEmpPerformance.getValidOrderCash());
		            if(yongjin!=null){
		            	sysEmpPerformance.setYongjin(yongjin);
		            }
					UlDepartment ulDepartment = ulDepartmentService.get(new Long(ulEmployee.getUlDepartment().getDepid()));
					List<ObFeeIndex> obfeeindex=obFeeIndexService.getAll();
					int q=0;
					for(ObFeeIndex ofi:obfeeindex){
						//绑定员工的指标
						Set<UlEmployee> emp=ofi.getUlEmployees();
						for(UlEmployee employee:emp){
							if(employee.getUseid()==ulEmployee.getUseid()){
								sysEmpPerformance.setUserNam(ulEmployee.getFullname());
								sysEmpPerformance.setDepNam(ulDepartment.getDepname());
							}
						}
					}
				}
				Type type=new TypeToken<List<SysEmpPerformance>>(){}.getType();
				StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter1.getPagingBean().getTotalItems()).append(",result:");
				JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
				jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
					"perDat", "sumDat","creDat","updDat" });
				buff.append(jsonSer.serialize(list));
				buff.append("}");
				jsonString=buff.toString();
			}
		  }
		}
		}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	
	
	/**
	 * 我的任务显示列表
	 */
	public String listWoDeZhiBiao(){
		String jiduDat = getRequest().getParameter("Q_empPerNd_S_EQ_pams");
		//年月
		String Q_perDat_D_EQ_RW = getRequest().getParameter("Q_perDat_D_EQ_RW");
        //指标名
		String Q_zhiBiaoName_S_EQ = getRequest().getParameter("zhiBiaoName");
		String nyr = getRequest().getParameter("Q_perDat_D_EQ_pams");
		String jidukey = getRequest().getParameter("jiduvalue");
 		String zhouqikey = getRequest().getParameter("value");
		java.math.BigDecimal jingde=new java.math.BigDecimal("0");;
		java.math.BigDecimal youde=new java.math.BigDecimal("0");
		//佣金妥投率
		java.math.BigDecimal tuotoulvMonye=new java.math.BigDecimal("0");
		//单数妥投率
		double tuotoulvCount=0.0;
		//净订单金额
		java.math.BigDecimal jingjine=new java.math.BigDecimal("0");
		//净订单单数
		Long jingd=0l;
		//成交率
		double chenglv=0.0;
		//搭销率
		double daxiaolv=0.0;
		//佣金
		java.math.BigDecimal  yongjin=new java.math.BigDecimal("0");
		//当前用户ID
		try{
		if(ContextUtil.getCurrentUser().getUlEmployee()==null){
		}
		else{
		String curUserId = String.valueOf(ContextUtil.getCurrentUser().getUlEmployee().getUseid()); 
		if(curUserId!=null || !("").equals(curUserId)){
		AppUser users=appUserService.get(new Long(ContextUtil.getCurrentUserId()));
		UlEmployee ulEmployee = ulEmployeeService.getEmployeeByUserNo(users.getEmployeeid());
		List<SysEmpPerformance> list=null;
		if(zhouqikey!=null ){
		if(zhouqikey=="2" || ("2").equals(zhouqikey)){
			//我的任务
			if(Q_perDat_D_EQ_RW!=null || !("null").equals(Q_perDat_D_EQ_RW) ){
				//当前月
				String ny_quarter_nd = getRequest().getParameter("ny_quarter_nd");
				//指标年度
				String nian=getZhiBiaoNianDuByUser();
				String ny="";
				QueryFilter filter=new QueryFilter();
				//销售人ID
				if(Q_perDat_D_EQ_RW!=null){
					list= sysEmpPerformanceService.findYongJin(null,null,ulEmployee.getUserNo(), Q_perDat_D_EQ_RW, null);
				}
				List<ObFeeIndexLevel> levels= getRuleValueByUseId();
				//时间指标list
				List<ObFeeSelect> select=new ArrayList();
				//指标list
				List<ObFeeSelect> selectzhibiao=new ArrayList();
				//指标+年月list
				List<ObFeeSelect> selectzhibiaoandny=new ArrayList();
				//员工佣金
				if(levels!=null && list!=null){
				for(SysEmpPerformance sysEmpPerformance:list){
				for(ObFeeIndexLevel level:levels){
				  ObFeeSelect osd=new ObFeeSelect();
				  String zhibiaony=null;
				  String sysny=null;
				  zhibiaony=nian+"-"+level.getMonth();
				  if(null!=sysEmpPerformance.getPerDat()){
				  sysny=sysEmpPerformance.getPerDat().toString().substring(0, 7);
				  if(!("").equals(sysny) && !("").equals(zhibiaony)){
				  if(zhibiaony==sysny || zhibiaony.equals(sysny) ){
			        yongjin=getYongJi(sysEmpPerformance.getTotalOrderCash(),sysEmpPerformance.getValidOrderCash());
			        if(yongjin!=null){
			        	sysEmpPerformance.setYongjin(yongjin);
			        }
					osd.setMubiaozhi(level.getFeeIndexValue()); //目标值
					osd.setWanchengliang(sysEmpPerformance.getValidOrderCash());//完成值
					osd.setMonth(level.getMonth());								//月份
//					int r=big_decimal.compareTo(BigDecimal.Zero); //和0，Zero比较
					if(yongjin!=null && level.getFeeIndexValue()!=null){
					if(level.getFeeIndexValue().compareTo(java.math.BigDecimal.ZERO)!=0){
					osd.setWanchenglv(yongjin.divide(level.getFeeIndexValue(),2, java.math.BigDecimal.ROUND_HALF_EVEN));//完成率
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
					select.add(osd);
					if(!("").equals(Q_zhiBiaoName_S_EQ)){
						if(osd.getZhibiaoNam().equals(Q_zhiBiaoName_S_EQ)){
						selectzhibiao.add(osd);
						}
					}
				}
				}
				}
				}
				}
				}
				//根据指标查询年月为空   && Q_perDat_D_EQ_RW==null || ("null").equals(Q_perDat_D_EQ_RW)
				if(!("").equals(Q_zhiBiaoName_S_EQ) ){
					Type type=new TypeToken<List<SysEmpPerformance>>(){}.getType();
					StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
					JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
					jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
						"perDat", "sumDat","creDat","updDat" });
					buff.append(jsonSer.serialize(selectzhibiao));
					buff.append("}");
					
					jsonString=buff.toString();
				}
				//根据年月 或指标
				if(!("").equals(Q_perDat_D_EQ_RW)  ){
					Type type=new TypeToken<List<SysEmpPerformance>>(){}.getType();
					StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
					JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
					jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
						"perDat", "sumDat","creDat","updDat" });
					buff.append(jsonSer.serialize(select));
					buff.append("}");
					
					jsonString=buff.toString();
				}
				//默认查询
				if(("").equals(Q_perDat_D_EQ_RW) && ("").equals(Q_zhiBiaoName_S_EQ) ){
					Type type=new TypeToken<List<SysEmpPerformance>>(){}.getType();
					StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
					JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
					jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
						"perDat", "sumDat","creDat","updDat" });
					buff.append(jsonSer.serialize(select));
					buff.append("}");
					
					jsonString=buff.toString();
				}
			}  
	      }
		}
	   }
	  }
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 详细信息显示列表
	 * @throws ParseException 
	 */
	@SuppressWarnings("deprecation")
	public String listdetail() throws ParseException{
		try{
		//当前月
		String ny_quarter_nd = getRequest().getParameter("ny_quarter_nd");
		//当前年度/季度/年度 
		String[] pams={};
		if(ny_quarter_nd!=null || !("").equals(ny_quarter_nd)){
		   pams=ny_quarter_nd.split(",");
		}
		//佣金
		java.math.BigDecimal  yongjin=new java.math.BigDecimal("0");
		//当前用户ID
		String curUserId = String.valueOf(ContextUtil.getCurrentUser().getUlEmployee().getUseid()); 
		if(ContextUtil.getCurrentUser().getUlEmployee()==null){
		}else{
			
		
		UlEmployee ulEmployee = ulEmployeeService.get(new Long(curUserId));
		//指标年度
		String nian=getZhiBiaoNianDuByUser();
		String ny="";
		QueryFilter filter=new QueryFilter();
		//销售人ID
		List<SysEmpPerformance> list =null;
		if(ny_quarter_nd!=null){
			list= sysEmpPerformanceService.findYongJin(pams[1],pams[2],ulEmployee.getUserNo(), pams[0], null);
		}
		List<ObFeeIndexLevel> levels= getRuleValueByUseId();
		List<ObFeeSelect> select=new ArrayList();
		//员工佣金
		for(SysEmpPerformance sysEmpPerformance:list){
		for(ObFeeIndexLevel level:levels){
			ObFeeSelect osd=new ObFeeSelect();
			String zhibiaony=nian+"-"+level.getMonth();
			String sysny=sysEmpPerformance.getPerDat().toString().substring(0, 7);
		  if(!("").equals(sysny) && !("").equals(zhibiaony)){
		  if(zhibiaony==sysny || zhibiaony.equals(sysny) ){
	        yongjin=getYongJi(sysEmpPerformance.getTotalOrderCash(),sysEmpPerformance.getValidOrderCash());
	        if(yongjin!=null){
	        	sysEmpPerformance.setYongjin(yongjin);
	        }
			osd.setMubiaozhi(level.getFeeIndexValue()); //目标值
			osd.setWanchengliang(sysEmpPerformance.getValidOrderCash());//完成值
			osd.setMonth(level.getMonth());								//月份
//			int r=big_decimal.compareTo(BigDecimal.Zero); //和0，Zero比较
			if(yongjin!=null && level.getFeeIndexValue()!=null){
			if(level.getFeeIndexValue().compareTo(java.math.BigDecimal.ZERO)!=0){
			osd.setWanchenglv(yongjin.divide(level.getFeeIndexValue(),2, java.math.BigDecimal.ROUND_HALF_EVEN));//完成率
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
			select.add(osd);
		  }
		 }
		}
		}
		Type type=new TypeToken<List<SysEmpPerformance>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
			"perDat", "sumDat","creDat","updDat" });
		buff.append(jsonSer.serialize(select));
		buff.append("}");
		
		jsonString=buff.toString();
		}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return SUCCESS;
	}
	/**
	 * 获得当前员工所属部门的佣金规则值
	 * @author lzm
	 */
	public List<ObFeeRuleValue> getRuleByUseId(){
		ObFeeRule obFeeRule=new ObFeeRule();
		List<ObFeeRuleValue> rulevalue = null;
		QueryFilter filter1=new QueryFilter();
		//当前用户ID
		String curUserId = String.valueOf(ContextUtil.getCurrentUserId());
		try{
		AppUser users=appUserService.get(new Long(curUserId));
				List<ObFeeRule> obfeerule=obFeeRuleService.getAll();
				for(ObFeeRule rules:obfeerule){
					//获得绑定规则的部门
					Set<UlDepartment> dep=rules.getUlDepartment();
					for(UlDepartment deps:dep){
						UlEmployee ulEmployee = ulEmployeeService.get(users.getUlEmployee().getUseid());
						UlDepartment ulDepartment = ulDepartmentService.get(new Long(ulEmployee.getUlDepartment().getDepid()));
						if(ulEmployee.getUlDepartment().getDepid()!=null){
						if(ulDepartment.equals(deps) || ulDepartment==deps ){
							Long vid=rules.getFeeRuleId();
							filter1.addFilter("Q_obFeeRule.feeRuleId_L_EQ",rules.getFeeRuleId().toString());
							 rulevalue=obFeeRuleValueService.getAllNoRequest(filter1);
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
		AppUser users=appUserService.get(new Long(curUserId));
		UlEmployee ulEmployee = ulEmployeeService.getEmployeeByUserNo(users.getEmployeeid());
		UlDepartment ulDepartment = ulDepartmentService.get(new Long(ulEmployee.getUlDepartment().getDepid()));
		//指定责任人的指标
		QueryFilter filterzre=new QueryFilter();
		filterzre.addFilter("Q_ulEmployees.useid_L_EQ",ulEmployee.getUseid().toString());
		List<ObFeeIndex> obfeeindex=obFeeIndexService.getAll();
		ObFeeIndex obinx=new ObFeeIndex();
		Long emyid=null;
		for(ObFeeIndex index:obfeeindex){
			for(UlEmployee uses:index.getUlEmployees()){
				if(uses.getUseid()==ulEmployee.getUseid()){
					emyid=uses.getUseid();
					obinx=index;
				}
			}
		}
	
		if(ulEmployee.getUlDepartment().getDepid()!=null){
				List<ObFeeRule> obfeerule=obFeeRuleService.getAll();
				for(ObFeeRule rules:obfeerule){
					//获得绑定规则的部门
					Set<UlDepartment> dep=rules.getUlDepartment();
					for(UlDepartment deps:dep){
						if(ulDepartment.equals(deps) || ulDepartment==deps ){
							if(obfeeindex!=null){
							QueryFilter filter=new QueryFilter(getRequest());
							filter.addFilter("Q_obFeeIndex.feeIndexId_L_EQ",obinx.getFeeIndexId().toString());
							obFeeIndexLevel=obFeeIndexLevelService.getAll(filter);
							}
						}
					}
				}
			}
		for(ObFeeIndexLevel a:obFeeIndexLevel ){
			
			System.out.println(a.getObFeeIndex().getFeeIndexName()+"aaaaaaaaaaaaaa"+a.getFeeIndexLevelId());
		}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return obFeeIndexLevel;
	}
    
    /**
     * 符合佣金规则并计算佣金
     * @author lzm
     */
	public java.math.BigDecimal getYongJi(java.math.BigDecimal zmoney,java.math.BigDecimal sjmoney){
		java.math.BigDecimal yongjin=null;
		java.math.BigDecimal jixiaofangshione=new java.math.BigDecimal("60000");
		java.math.BigDecimal jixiaofangshitwo=new java.math.BigDecimal("80000");
		java.math.BigDecimal jixiaofangshithree=new java.math.BigDecimal("100000");
		try{
		List<ObFeeRuleValue> ruleValues=getRuleByUseId();
		if(ruleValues!=null ){
		for(ObFeeRuleValue rulevale:ruleValues){
			//返回的结果是int类型，-1表示小于，0是等于，1是大于。  
			if(sjmoney!=null){
			int a =sjmoney.compareTo(rulevale.getMaximum()) ;
			int b =sjmoney.compareTo(rulevale.getMinimum()) ;
			
			if(a <=1 && a <1 && b >=-1 && b>-1){
				yongjin=sjmoney.multiply(rulevale.getCoefficient());//实际汇款额*提成比例
				yongjin=yongjin.add(rulevale.getIncrease());        //绩效金额
				if(sjmoney.compareTo(jixiaofangshione)>=0 && sjmoney.compareTo(jixiaofangshitwo)<1  ){
					//满6万增加200奖金
					yongjin.add(new java.math.BigDecimal("200"));
				}
				if(sjmoney.compareTo(jixiaofangshitwo)>=0 && sjmoney.compareTo(jixiaofangshithree)<1 ){
					//满8万增加500奖金
					yongjin.add(new java.math.BigDecimal("500"));
				}
				if(sjmoney.compareTo(jixiaofangshithree)>=0){
					//满10万增加1000奖金
					yongjin.add(new java.math.BigDecimal("1000"));
				}
			  }
			}
		}
		}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return yongjin;
	}
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
		AppUser users=appUserService.get(new Long(curUserId));
		UlEmployee ulEmployee = ulEmployeeService.get(users.getUlEmployee().getUseid());
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
		  }
		return TimeVlaues;
	}
}
