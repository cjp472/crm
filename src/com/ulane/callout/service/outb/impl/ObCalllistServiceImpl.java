package com.ulane.callout.service.outb.impl;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.oa.model.customer.Customer;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.customer.CustomerService;
import com.ulane.callout.dao.outb.ObCalllistDao;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.model.outb.ObCallbatchAss;
import com.ulane.callout.model.outb.ObCallbatchCus;
import com.ulane.callout.model.outb.ObCallbatchImpTmp;
import com.ulane.callout.model.outb.ObCalllist;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.service.outb.ObCallbatchCusService;
import com.ulane.callout.service.outb.ObCallbatchImpTmpService;
import com.ulane.callout.service.outb.ObCallbatchService;
import com.ulane.callout.service.outb.ObCalllistService;
import com.ulane.callout.service.outb.ObConCalllistService;
import com.ulane.core.plugin.soap.CustomerSoapServer;
import com.ulane.customer.model.customer.CusContact;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public class ObCalllistServiceImpl extends BaseServiceImpl<ObCalllist>
		implements ObCalllistService {
	@SuppressWarnings("unused")
	private ObCalllistDao dao;
	@Resource
	protected JdbcTemplate jdbcTemplate;
	@Resource
	protected CustomerSoapServer customerSoapServer;
	@Resource
	protected ObCallbatchCusService obCallbatchCusService;
	@Resource 
	protected ObConCalllistService obConCalllistService;
	@Resource 
	protected ObCallbatchImpTmpService obCallbatchImpTmpService;	
	@Resource 
	protected ObCallbatchService obCallbatchService;	
	
	@Resource 
	protected CustomerService customerService;
	
	private static final String[] unValiableField = {"姓名","客户编号","生日","证件号码","性别",
		            "客户级别","会员区域","年收入","家庭结构","积分","礼金","购物频次","上次购物金额","拒收比率","退换货比率","证件类型","拨打次数"};
	private static HashMap<String,String> hsmpConditon = new HashMap<String,String>();
	static {
		//无效数据、名单修复
		hsmpConditon.put("为空", "null");
		hsmpConditon.put("长度小于", "LEN<");
		hsmpConditon.put("包含", "contain");
		hsmpConditon.put("等于", "=");
		hsmpConditon.put("不等于", "<>");
		hsmpConditon.put("大于", ">");
		hsmpConditon.put("小于", "<");
	}
	public ObCalllistServiceImpl(ObCalllistDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public List<ObCalllist> getComList() {
		// TODO Auto-generated method stub
		return dao.getComList();
	}

	public void execJdbcUpdate(String sql) {
		jdbcTemplate.execute(sql);
	}

	public int transfterCusTmp2Customer(ObCallbatch obCallbatch) {
		//Long calllistId = obCallbatch.getCalllistId();
		ObCalllist obCalllist=obCallbatch.getObCalllist();
		Long callbatchId = obCallbatch.getCallbatchId();
		ObCom obCom=obCallbatch.getObCalllist().getObComs().iterator().next();	//com_id
		AppUser user = obCallbatch.getUseId();
		//String rowDat = DateUtil.getCurrentTime();
		
		int validCount=0;
		
		if(obCalllist.getCalllistResouce().equals(ObCalllist.MDLY_LOCAL)) {
			System.out.println("********callbatchId************"+callbatchId);
//			StringBuffer sql=new StringBuffer("insert into ob_con_calllist(CUS_ID,CALLBATCH_ID,IN_CUST_BASE,CRE_USE_ID,CRE_DAT,STA_ID" +
//			    ",NAME_CN,IS_LOCKED,AGE,GENDER,CRED_TYP_ID,CRED_NUM,BIRTHDAY,EXT_1,CUSTOMERID,CUS_CODE)  select SEQ_OB_CON_CALLLIST_ID.nextval,CALLBATCH_ID,'0',CRE_USE_ID," +
//			    "SYSDATE,1,NAME_CN,0,AGE,GENDER,CRED_TYP_ID,CRED_NUM,BIRTHDAY,INCHARGE_PERSON,CUS_ID,CUS_CODE from Ob_Callbatch_Imp_Tmp where  callbatch_Id=");
//		      sql.append(callbatchId)
//		     .append(" and sta_Id=").append(1)
//		     .append(" and CUS_ID is not null and CUS_CODE is not null");
			StringBuffer sql=new StringBuffer("insert into ob_con_calllist(CUS_ID,CALLBATCH_ID,IN_CUST_BASE,CRE_USE_ID,CRE_DAT,STA_ID" +
				    ",NAME_CN,IS_LOCKED,AGE,GENDER,CRED_TYP_ID,CRED_NUM,BIRTHDAY,EXT_1,CUSTOMERID,CUS_CODE)  select SEQ_OB_CON_CALLLIST_ID.nextval,a.CALLBATCH_ID,'0',a.CRE_USE_ID," +
				    "SYSDATE,1,a.NAME_CN,0,a.AGE,a.GENDER,a.CRED_TYP_ID,a.CRED_NUM,a.BIRTHDAY,a.INCHARGE_PERSON,b.CUSTOMERID,a.CUS_CODE from Ob_Callbatch_Imp_Tmp a,customer b where a.cus_code=b.customerno and a.callbatch_Id=");
			      sql.append(callbatchId)
			     .append(" and a.sta_Id=").append(1)
			     //.append(" and a.CUS_ID is not null and a.CUS_CODE is not null");		
			     .append(" and a.CUS_CODE is not null");
		      System.out.println("*************sql.toString()**************"+sql.toString());
			this.execJdbcUpdate(sql.toString());
			
			StringBuffer sqlCount=new StringBuffer("select count(*) from ob_con_calllist where callbatch_Id=").append(callbatchId);
			validCount=jdbcTemplate.queryForInt(sqlCount.toString());
			
			StringBuffer sql2=new StringBuffer("update ob_con_calllist a set a.com_id=").append(obCom.getComId()).append(" where a.CALLBATCH_ID=").append(callbatchId);
			this.execJdbcUpdate(sql2.toString());
			
			StringBuffer sql3=new StringBuffer("delete from Ob_Callbatch_Imp_Tmp where callbatch_Id=").append(callbatchId)
			.append(" and sta_Id=").append(1)
			.append(" and CUS_CODE is not null");
			this.execJdbcUpdate(sql3.toString());
			
			StringBuffer sql4=new StringBuffer("insert into ob_callbatch_cus(CALLBATCH_CUS_ID,ASS_STA_ID,CUS_ID,CALLBATCH_ID) select SEQ_OB_CALLBATCH_CUS_ID.nextval,0,CUSTOMERID,CALLBATCH_ID from ob_con_calllist where CALLBATCH_ID=");
			  sql4.append(callbatchId);
			this.execJdbcUpdate(sql4.toString());

			obCallbatch.setAvlidCount(validCount);
			obCallbatch.setInavlidCount(obCallbatch.getTotalCount()-validCount);
			obCallbatch.setHoldCount(validCount);
			obCallbatchService.merge(obCallbatch);			
		} else {
//    		Customer cus=new Customer();
//    		cus.setCusType(Short.valueOf("8"));//营销名单客户
//    		customerService.save(cus);
//    		//cus.setCustomerNo(cus.get)
//    		conCalllist.setCustomerId(cus.getCustomerId());	
//    		//创建联系方式
//    		addCusContact(cus.getCustomerId(),obCallbatchImpTmp);			
		}
		
		
		
		
/**		
		StringBuffer hql = new StringBuffer(
				"select * from Ob_Callbatch_Imp_Tmp t where t.callbatch_Id=? and t.sta_Id=? order by t.tmp_Cus_Id");
		List<ObCallbatchImpTmp> callbatchImpTmpList = jdbcTemplate
				.queryForList(hql.toString(), new Object[] { callbatchId,
						ObCallbatchImpTmp.CALLBATCH_IMP_TMP_STA_AVALABLE });
		int tmpSize = 0;
		if (callbatchImpTmpList != null
				&& (tmpSize = callbatchImpTmpList.size()) > 0) {
			int validCount=0;
			for (int i = 0; i < tmpSize; i++) {
				validCount++;
				Map obCallbatchImpTmp = (Map)callbatchImpTmpList
						.get(i);
				
				//呼叫记录表
			    ObConCalllist conCalllist=new ObConCalllist();
			    //conCalllist.setCustomerId(customerId);
			    conCalllist.setCallbatchId(callbatchId);
			    conCalllist.setInCustBase("0");
			    conCalllist.setCreUseId( ContextUtil.getCurrentUserId().intValue());
			    conCalllist.setCreDat(new Date());
			    conCalllist.setStaId((short)1);
			    conCalllist.setObCom(obCom);
			    conCalllist.setNameCn((String)obCallbatchImpTmp.get("name_cn"));
			    conCalllist.setIsLocked(ObConCalllist.IS_LOCKED_FALSE);
			    if(obCallbatchImpTmp.get("age")!=null)
			    conCalllist.setAge(((BigDecimal)obCallbatchImpTmp.get("age")).intValue());
			    if(obCallbatchImpTmp.get("gender")!=null)
			    conCalllist.setGender((String)obCallbatchImpTmp.get("gender"));
			    if(obCallbatchImpTmp.get("cred_typ_id")!=null)
			    conCalllist.setCredTypId(((BigDecimal)obCallbatchImpTmp.get("cred_typ_id")).shortValue());
			    if(obCallbatchImpTmp.get("cred_num")!=null)
			    conCalllist.setCredNum((String)obCallbatchImpTmp.get("cred_num"));
			    if(obCallbatchImpTmp.get("birthday")!=null)
			    conCalllist.setBirthday((String)obCallbatchImpTmp.get("birthday"));
			    if(obCallbatchImpTmp.get("incharge_person")!=null)
			    conCalllist.setExt1(((BigDecimal)obCallbatchImpTmp.get("incharge_person")).toString()); //归属人
			    if(obCallbatchImpTmp.get("cus_id")!=null) {
			    	conCalllist.setCustomerId(((BigDecimal)obCallbatchImpTmp.get("cus_id")).longValue());
			    	if(obCallbatchImpTmp.get("cus_code")!=null) {
			    		conCalllist.setCusCode((String)obCallbatchImpTmp.get("cus_code"));
			    	} else {
			    		Customer cus=customerService.get(((BigDecimal)obCallbatchImpTmp.get("cus_id")).longValue());
			    		conCalllist.setCusCode(cus.getCustomerNo());
			    	}
			    } else {
			    	if(obCallbatchImpTmp.get("cus_code")!=null) {
			    		Customer cus=customerService.getCusByCusNo((String)obCallbatchImpTmp.get("cus_code"));
			    		if(cus!=null)
			    		conCalllist.setCustomerId(cus.getCustomerId());	
			    		conCalllist.setCusCode((String)obCallbatchImpTmp.get("cus_code"));
			    	} else {
			    		Customer cus=new Customer();
			    		cus.setCusType(Short.valueOf("8"));//营销名单客户
			    		customerService.save(cus);
			    		//cus.setCustomerNo(cus.get)
			    		conCalllist.setCustomerId(cus.getCustomerId());	
			    		//创建联系方式
			    		addCusContact(cus.getCustomerId(),obCallbatchImpTmp);
			    	}
			    }
			    
			    
			    //创建联系方式
//			    Set<CusContact> cusContacts=addCusContact(obCallbatchImpTmp);
//			    if(cusContacts!=null&&cusContacts.size()>0) conCalllist.setCusContacts(cusContacts);
				
			    obConCalllistService.save(conCalllist);
			    
			    //清空临时表
			    obCallbatchImpTmpService.remove(((BigDecimal)obCallbatchImpTmp.get("tmp_cus_id")).longValue());
			    
			    //客户操作历史
//				StringBuffer sbCusHis = new StringBuffer();
//				sbCusHis.append("{'customer':{'customerId':").append(conCalllist.getCusId()).append("},");
//				sbCusHis.append("'opeUseId':").append(user.getUserId()).append(",");			
//				sbCusHis.append("'opeTypId':").append(ObCallbatchImpTmp.CUSBASE_OPE_HIS_TYP_CREATE_SYS).append(",");
//				sbCusHis.append("'opeResDesc':'").append("名单批次导入创建").append("'}");
//				customerSoapServer.addCusHis(sbCusHis.toString());
                
				//创建批次-客户关联表
				ObCallbatchCus obCallbatchCus = new
				ObCallbatchCus(Short.parseShort(ObCallbatchCus.OB_CALLBATCH_CUS_STA_UNASSIGN), conCalllist.getCustomerId(),callbatchId);
				obCallbatchCusService.save(obCallbatchCus);
			}
			
			obCallbatch.setAvlidCount(validCount);
			obCallbatch.setInavlidCount(obCallbatch.getTotalCount()-validCount);
			obCallbatch.setHoldCount(validCount);
			obCallbatchService.merge(obCallbatch);
		}
		**/
		return 0;
	}
	
	public void addCusContact(long customerId, Map obCallbatchImpTmp) {
		//Set<CusContact> cusContacts=new HashSet<CusContact>();
	    String json = "{'customerId':10425='cusContact':'','contactTypeId':1,'mainContactNum':'88992001','statusId':1}";
	    //地址
		String addr=(String)obCallbatchImpTmp.get("addr_book");
		if(addr!=null) {
//		    CusContact cusContact=new CusContact();
//			cusContact.setIsChecked(Short.parseShort("1"));
//			cusContact.setIsDefault(Short.parseShort("1"));
//			cusContact.setCreateTime(new Date());	
//			cusContact.setContactTypeId(Short.valueOf("7"));
//			cusContact.setContactSubTypeId(null);
//			cusContact.setMainContactNum(addr);
//			cusContact.setStatusId(Short.valueOf("1"));
//			cusContacts.add(cusContact);
			StringBuffer sbCusConAddr=new StringBuffer();
			sbCusConAddr.append("{'customerId':").append(customerId).append("='cusContact':'',");
			sbCusConAddr.append("'contactTypeId':").append(7).append(",");
			sbCusConAddr.append("'contactSubTypeId':null,");
		    sbCusConAddr.append("'mainContactNum':'").append(addr).append("',");
			sbCusConAddr.append("'statusId':").append(1).append("}");
			System.out.println("***********地址*********"+sbCusConAddr.toString());
			customerSoapServer.addCusContact(sbCusConAddr.toString());
		}
        //手机
		String mobile=(String)obCallbatchImpTmp.get("tele_mobile");
		if(mobile!=null) {
//		    CusContact cusContact=new CusContact();
//			cusContact.setIsChecked(Short.parseShort("1"));
//			cusContact.setIsDefault(Short.parseShort("1"));
//			cusContact.setCreateTime(new Date());	
//			cusContact.setContactTypeId(Short.valueOf("2"));
//			cusContact.setContactSubTypeId(null);
//			cusContact.setMainContactNum(mobile);
//			cusContact.setStatusId(Short.valueOf("1"));
//			cusContacts.add(cusContact);			
			StringBuffer sbCusConMobile=new StringBuffer();
			sbCusConMobile.append("{'customerId':").append(customerId).append("='cusContact':'',");
			sbCusConMobile.append("'contactTypeId':").append(2).append(",");
			sbCusConMobile.append("'contactSubTypeId':null,");
			sbCusConMobile.append("'mainContactNum':'").append(mobile).append("',");
			sbCusConMobile.append("'statusId':").append(1).append("}");
			System.out.println("***********手机*********"+sbCusConMobile.toString());
			customerSoapServer.addCusContact(sbCusConMobile.toString());
		}
	    //家庭电话
		String home=(String)obCallbatchImpTmp.get("tele_home");
		if(home!=null) {
//		    CusContact cusContact=new CusContact();
//			cusContact.setIsChecked(Short.parseShort("1"));
//			cusContact.setIsDefault(Short.parseShort("1"));
//			cusContact.setCreateTime(new Date());	
//			cusContact.setContactTypeId(Short.valueOf("1"));
//			cusContact.setContactSubTypeId(Short.valueOf("1"));
//			cusContact.setMainContactNum(home);
//			cusContact.setStatusId(Short.valueOf("1"));
//			cusContacts.add(cusContact);
			
			StringBuffer sbCusConHome=new StringBuffer();
			sbCusConHome.append("{'customerId':").append(customerId).append("='cusContact':'',");
			sbCusConHome.append("'contactTypeId':").append(1).append(",");
			sbCusConHome.append("'contactSubTypeId':'").append(1).append("',");
			sbCusConHome.append("'mainContactNum':'").append(home).append("',");
			sbCusConHome.append("'statusId':").append(1).append("}");
			System.out.println("***********家庭电话*********"+sbCusConHome.toString());
			customerSoapServer.addCusContact(sbCusConHome.toString());	    
		}
	    //办公电话
		String office=(String)obCallbatchImpTmp.get("tele_office");
		if(office!=null) {
//		    CusContact cusContact=new CusContact();
//			cusContact.setIsChecked(Short.parseShort("1"));
//			cusContact.setIsDefault(Short.parseShort("1"));
//			cusContact.setCreateTime(new Date());	
//			cusContact.setContactTypeId(Short.valueOf("1"));
//			cusContact.setContactSubTypeId(Short.valueOf("2"));
//			cusContact.setMainContactNum(office);
//			cusContact.setStatusId(Short.valueOf("1"));
//			cusContacts.add(cusContact);
			
			StringBuffer sbCusConOffice=new StringBuffer();
			sbCusConOffice.append("{'customerId':").append(customerId).append("='cusContact':'',");
			sbCusConOffice.append("'contactTypeId':").append(1).append(",");
			sbCusConOffice.append("'contactSubTypeId':'").append(2).append("',");
		    sbCusConOffice.append("'mainContactNum':'").append(office).append("',");
			sbCusConOffice.append("'statusId':").append(1).append("}");
			System.out.println("***********办公电话*********"+sbCusConOffice.toString());
			customerSoapServer.addCusContact(sbCusConOffice.toString());	
		}
	    //email
		String email=(String)obCallbatchImpTmp.get("email");
		if(email!=null) {
//		    CusContact cusContact=new CusContact();
//			cusContact.setIsChecked(Short.parseShort("1"));
//			cusContact.setIsDefault(Short.parseShort("1"));
//			cusContact.setCreateTime(new Date());	
//			cusContact.setContactTypeId(Short.valueOf("3"));
//			cusContact.setContactSubTypeId(null);
//			cusContact.setMainContactNum(email);
//			cusContact.setStatusId(Short.valueOf("1"));
//			cusContacts.add(cusContact);
			
			StringBuffer sbCusConEmail=new StringBuffer();
			sbCusConEmail.append("{'customerId':").append(customerId).append("='cusContact':'',");
			sbCusConEmail.append("'contactTypeId':").append(3).append(",");
			sbCusConEmail.append("'contactSubTypeId':null,");
			sbCusConEmail.append("'mainContactNum':'").append(email).append("',");
			sbCusConEmail.append("'statusId':").append(1).append("}");
			System.out.println("***********email*********"+sbCusConEmail.toString());
			customerSoapServer.addCusContact(sbCusConEmail.toString());	
		}
	    //传真
		String fax=(String)obCallbatchImpTmp.get("fax");
		if(fax!=null) {
//		    CusContact cusContact=new CusContact();
//			cusContact.setIsChecked(Short.parseShort("1"));
//			cusContact.setIsDefault(Short.parseShort("1"));
//			cusContact.setCreateTime(new Date());	
//			cusContact.setContactTypeId(Short.valueOf("2"));
//			cusContact.setContactSubTypeId(null);
//			cusContact.setMainContactNum(fax);
//			cusContact.setStatusId(Short.valueOf("1"));
//			cusContacts.add(cusContact);			
			StringBuffer sbCusConFax=new StringBuffer();
			sbCusConFax.append("{'customerId':").append(customerId).append("='cusContact':'',");
			sbCusConFax.append("'contactTypeId':").append(2).append(",");
			sbCusConFax.append("'contactSubTypeId':null,");
			sbCusConFax.append("'mainContactNum':'").append(fax).append("',");
			sbCusConFax.append("'statusId':").append(1).append("}");
			System.out.println("***********传真*********"+sbCusConFax.toString());
			customerSoapServer.addCusContact(sbCusConFax.toString());	
		}		
		//return cusContacts;
	}
	
    public List queryObCallbatchAsssByParentNullId(Long callbatchId){
    	  return dao.queryObCallbatchAsssByParentNullId(callbatchId);
    }
    
	public int assignObCallbatchToUser(Long calllistId, Long callbatchId, Long callbatchAssId, 
			Long fromUserId, Long toUserId, int assignCount,String whereSql){
		StringBuffer sql  = 
			new StringBuffer("update OB_CALLBATCH_CUS set ASS_STA_ID=").append(ObCallbatchCus.OB_CALLBATCH_CUS_STA_ASSIGNED)
			.append(",CALLBATCH_ASS_ID=").append(callbatchAssId)
			.append(",FROM_USE_ID=").append(fromUserId)
			.append(",TO_USE_ID=").append(toUserId)
			.append(",ASS_STEP_ID=").append(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN)//管理员分配
			
			.append(" where CALLBATCH_ID=").append(callbatchId)
			.append(" and ASS_STA_ID=").append(ObCallbatchCus.OB_CALLBATCH_CUS_STA_UNASSIGN);//未分配
			 if(whereSql!=null&&!whereSql.equals("")) {
				 sql.append(" and CUS_ID in(select con.customerid from ob_con_calllist con,cus_personal pcus where  con.customerid=pcus.customerid and con.CALLBATCH_ID=").append(callbatchId)
				 .append(whereSql).append(")");
				 
			 }
		     sql.append(" and rownum<=").append(assignCount);
		     System.out.println("%%%%%%%%%%%%%%sql.toString()%%%%%%%%%%%%"+sql.toString());
		this.execJdbcUpdate(sql.toString());
		return dao.getAssignCount(callbatchAssId);
	}    
	
	public int assignJLObCallbatchToUser(Long calllistId, Long callbatchId, Long parentCallbatchAssId,Long callbatchAssId, 
			Long fromUserId, Long toUserId, int assignCount,String whereSql){
		StringBuffer sql  = 
			new StringBuffer("update OB_CALLBATCH_CUS set ASS_STA_ID=").append(ObCallbatchCus.OB_CALLBATCH_CUS_STA_ASSIGNED)
			.append(",CALLBATCH_ASS_ID=").append(callbatchAssId)
			.append(",FROM_USE_ID=").append(fromUserId)
			.append(",TO_USE_ID=").append(toUserId)
			.append(",ASS_STEP_ID=").append(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_JINGLI)//经理分配
			
			.append(" where CALLBATCH_ASS_ID=").append(parentCallbatchAssId);
			 if(whereSql!=null&&!whereSql.equals("")) {
				 sql.append(" and CUS_ID in(select con.customerid from ob_con_calllist con,cus_personal pcus where  con.customerid=pcus.customerid and con.CALLBATCH_ID=").append(callbatchId)
				 .append(whereSql).append(")");
				 
			 }
		    sql.append(" and rownum<=").append(assignCount);
		this.execJdbcUpdate(sql.toString());
		return dao.getAssignCount(callbatchAssId);
	}  
	
	public int assignZZObCallbatchToUser(Long calllistId, Long callbatchId, Long parentCallbatchAssId,Long callbatchAssId, 
			Long fromUserId, Long toUserId, int assignCount,String whereSql){
		StringBuffer sql  = 
			new StringBuffer("update OB_CALLBATCH_CUS set ASS_STA_ID=").append(ObCallbatchCus.OB_CALLBATCH_CUS_STA_ASSIGNED)
			.append(",CALLBATCH_ASS_ID=").append(callbatchAssId)
			.append(",FROM_USE_ID=").append(fromUserId)
			.append(",TO_USE_ID=").append(toUserId)
			.append(",ASS_STEP_ID=").append(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_ZUZHANG)//组长分配
			
			.append(" where CALLBATCH_ASS_ID=").append(parentCallbatchAssId);
			if(whereSql!=null&&!whereSql.equals("")) {
				sql.append(" and CUS_ID in(select con.customerid from ob_con_calllist con,cus_personal pcus where  con.customerid=pcus.customerid and con.CALLBATCH_ID=").append(callbatchId)
				.append(whereSql).append(")");
				
			}
			sql.append(" and rownum<=").append(assignCount);
		this.execJdbcUpdate(sql.toString());
		return dao.getAssignCount(callbatchAssId);
	}  		
	
    public List queryObCallbatchCussByCallbatchAssId(Long callbatchAssId){
		return dao.queryObCallbatchCussByCallbatchAssId(callbatchAssId);
    }	
	
    public int assignByInchargeObCallbatchToUser(Long calllistId, Long callbatchId,Long callbatchAssId, 
			Long fromUserId, String userNo, String cusIds) {
		StringBuffer sql  = 
			new StringBuffer("update OB_CALLBATCH_CUS set ASS_STA_ID=").append(ObCallbatchCus.OB_CALLBATCH_CUS_STA_ASSIGNED)
			.append(",CALLBATCH_ASS_ID=").append(callbatchAssId)
			.append(",FROM_USE_ID=").append(fromUserId)
			
			.append(",TO_USERNO=").append(userNo)
			.append(",ASS_STEP_ID=").append(ObCallbatchAss.OB_CALLBATCH_ASS_ASS_STEP_GUANLIYUAN)//管理员分配
			
			.append(" where CALLBATCH_ID=").append(callbatchId)
			.append(" and ASS_STA_ID=").append(ObCallbatchCus.OB_CALLBATCH_CUS_STA_UNASSIGN)//未分配
			.append(" and cus_id in(").append(cusIds).append(")");	
		
	
		this.execJdbcUpdate(sql.toString());
		return dao.getAssignCount(callbatchAssId);
    	   
    }
    
    public String getWhereSql(String assignIFGrid) {
    	String whereSql="";
    	List<LinkedList<String>> conditionRecords=getUnVableAndRepair(assignIFGrid);
    	if(conditionRecords!=null&&conditionRecords.size()>0) {
    		 whereSql=getFilterSQL(conditionRecords);
    	}
    	return whereSql;
    }
    
	private List<LinkedList<String>> getUnVableAndRepair(String assignIFGrid) {
		//字段：客户姓名、移动电话、电子邮件、客户编号、邮编、生日、身份证
		//条件：为空、长度小于、包含、等于、不等于
		List<LinkedList<String>> conditionRecords = new LinkedList<LinkedList<String>>();
		List<ArrayList<String>> listCondition = paraseJSON2List(assignIFGrid);
		if(null==listCondition || listCondition.size()==0) {
			return null;
		}
		for(ArrayList<String> conditions:listCondition) {
			for(int i=0;i<conditions.size();i++) {
				 System.out.println("^^^^^^^^^^getUnVableAndRepair^^^^^^^^^^^^^^^^^^^"+conditions.get(i));
			}
			LinkedList<String> conditionRecord = new LinkedList<String>();
			String assignField = conditions.get(0);		//字段
			String assignIF = conditions.get(1);			//条件
			String assignVal = conditions.get(2);			//值
			if(StringUtils.isNotBlank(assignIF)) {
				if(assignField.equals(unValiableField[0])) {//客户姓名
					conditionRecord.add("con.NAME_CN");
				}  else if(assignField.equals(unValiableField[1])) {//客户编号
						conditionRecord.add("con.CUS_CODE");
				} else if(assignField.equals(unValiableField[2])) {//生日
					conditionRecord.add("con.BIRTHDAY");	
					//assignVal=DateUtil.getFormatDate(new Date(assignVal));
					//assignVal="'"+assignVal+"'";
				} else if(assignField.equals(unValiableField[3])) {//证件号码
					conditionRecord.add("con.CRED_NUM");
				} else if(assignField.equals(unValiableField[4])) {//性别
					conditionRecord.add("con.GENDER");
					//if(assignVal.indexOf(str)); 
				} else if(assignField.equals(unValiableField[5])) {//客户级别
					conditionRecord.add("pcus.CUS_GRA_ID");
					//if(assignVal.indexOf(str)); 
				} else if(assignField.equals(unValiableField[6])) {//
					System.out.println("*****************会员区域***********************");
					conditionRecord.add("pcus.REGION_ID");
					if(assignVal.split("@").length==1) {
						assignVal=assignVal.substring(0,assignVal.indexOf("@"));
					} else {
						assignVal=assignVal.substring(assignVal.indexOf("@")+1);
					}
				} else if(assignField.equals(unValiableField[7])) {//年收入
					conditionRecord.add("to_number(pcus.EXT9)");
				} else if(assignField.equals(unValiableField[8])) {//家庭结构
					conditionRecord.add("pcus.EXT10");
				} else if(assignField.equals(unValiableField[9])) {//积分
					conditionRecord.add("to_number(pcus.EXT1)");
				} else if(assignField.equals(unValiableField[10])) {//礼金
					conditionRecord.add("to_number(pcus.EXT6)");
				} else if(assignField.equals(unValiableField[11])) {//购物频次
					conditionRecord.add("to_number(pcus.EXT4)");
				} else if(assignField.equals(unValiableField[12])) {//上次购物金额
					conditionRecord.add("to_number(pcus.EXT5)");
				} else if(assignField.equals(unValiableField[13])) {//拒收比率
					conditionRecord.add("to_number(pcus.EXT8)");
				} else if(assignField.equals(unValiableField[14])) {//退换货比率
					conditionRecord.add("pcus.EXT7");
				} else if(assignField.equals(unValiableField[15])) {//证件类型
					conditionRecord.add("pcus.CRED_TYP_ID");
				}  else if(assignField.equals(unValiableField[16])) {//拨打次数
					conditionRecord.add("to_number(pcus.EXT20)");
				} 
				conditionRecord.add(hsmpConditon.get(assignIF));
				conditionRecord.add(assignVal);
				conditionRecords.add(conditionRecord);
			}
		}
		return conditionRecords;
	}
	
	/**
	 * 解析条件拼装串，返回List<ArrayList<String>>
	 * @param json
	 * @return
	 */
	private List<ArrayList<String>> paraseJSON2List(String json) {
		if(StringUtils.isBlank(json)) {
			return null;
		}
		
		List<ArrayList<String>> result = new ArrayList<ArrayList<String>>();
		String[] jsonArray = StringUtils.split(json, ";");
		for(String record : jsonArray) {
			String[] fields = StringUtils.split(record,",");
			ArrayList<String> list = new ArrayList<String>();
			for(String field:fields) {
				list.add(field);
			}
			result.add(list);
		}
		
		if(result.size()>0) {
			return result;
		}
		return null;
	}
	
	/**
	 * 组装过滤条件
	 * @param conditionRecords
	 * @return
	 */
	private String getFilterSQL(List<LinkedList<String>> conditionRecords) {
		if(null==conditionRecords || conditionRecords.size()==0) {
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for(LinkedList<String> linkList:conditionRecords) {
			for(int i=0;i<linkList.size();i++) {
				System.out.println("&&&&&&&&linkList.get(i)&&&&&&&&"+linkList.get(i));
			}
			String assignField = linkList.get(0);
			String assignIF = linkList.get(1);
			String assignVal = linkList.get(2);
			if("null".equals(assignIF)) {													//为空
				sb.append(" and " + assignField +" is "+ assignIF);				
			} else if("LEN<".equals(assignIF) && StringUtils.isNotBlank(assignVal)) {		//长度小于
				sb.append(" and length(to_char(" + assignField +"))<" + assignVal);
			} else if("contain".equals(assignIF) && StringUtils.isNotBlank(assignVal)) {	//包含
				sb.append(" and instr(" + assignField +",'"+ assignVal+"')>0");
			} else if("<>".equals(assignIF) && StringUtils.isNotBlank(assignIF)) {          //不等于
				sb.append(" and "+assignField+" "+assignIF+" '"+assignVal+"' ");
			}  
			else if(StringUtils.isNotBlank(assignIF)) {
				sb.append(" and " + assignField +" "+ assignIF + " '" + assignVal + "' ");
			}
		}
		return sb.toString();
	}	
	
	
	public int finishChouqu(String whereSql,Long fromCallbatchId,Long toCallbatchId,String staDat) throws Exception{
		StringBuffer sql  = 
			new StringBuffer("select callbatch_cus_id from Ob_Callbatch_Cus vo where vo.callbatch_id =").append(fromCallbatchId);
		if(whereSql!=null&&!whereSql.equals("")) {
			sql.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		
		int callbatchCussCount=0;
		List<ObCallbatchCus> callbatchCuss= this.jdbcTemplate.queryForList(sql.toString());
		if(callbatchCuss!=null&&callbatchCuss.size()>0) {
			callbatchCussCount=callbatchCuss.size();
		}
		
		StringBuffer sql4  = 
			new StringBuffer("select cus_id from Ob_Callbatch_Cus vo where vo.callbatch_id =").append(fromCallbatchId);
		if(whereSql!=null&&!whereSql.equals("")) {
			sql4.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}
		
		StringBuffer sql5=new StringBuffer("update ob_saletask set CUS_GRP_ID=null,USE_ID=null,CALLBATCH_ASS_ID=null,BUSI_STA_ID=2,LAST_DIA_DAT=(select to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') from dual)")
		.append(" where  CUS_ID in(").append(sql4).append(")");
		this.jdbcTemplate.execute(sql5.toString());			
		
		
		
		StringBuffer sqlAssId  = 
			new StringBuffer("select callbatch_ass_id from Ob_Callbatch_Cus vo where vo.callbatch_id =").append(fromCallbatchId);
		if(whereSql!=null&&!whereSql.equals("")) {
			sqlAssId.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}	
		
		StringBuffer sql_1  = 
			new StringBuffer("select callbatch_ass_id from Ob_Callbatch_Cus vo where vo.callbatch_Ass_Id in (").append(sqlAssId).append(")");
		if(whereSql!=null&&!whereSql.equals("")) {
			sql_1.append(" and vo.cus_Id in  (select con.customerid from Ob_Con_Calllist con,Cus_Personal pcus where 1=1 and con.customerid=pcus.customerid ")
			.append(whereSql).append(")");
		}	
		
		StringBuffer sql1=new StringBuffer("update ob_callbatch_ass a set a.retrive_count=nvl(a.retrive_count+(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
        sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		sql1.append(" group by callbatch_ass_id),0)");
		
		
		
		sql1.append(" ,a.hold_count=nvl(a.hold_count-(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		sql1.append(" group by callbatch_ass_id),0)");
		
		sql1.append(" ,a.retrive_count_admin=nvl(a.retrive_count_admin+(select count(callbatch_ass_id) from ob_callbatch_cus  where callbatch_ass_id=a.callbatch_ass_id ");
		sql1.append(" and callbatch_cus_id in(").append(sql).append(")");
		sql1.append(" group by callbatch_ass_id),0)");
		
		sql1.append(",a.retrive_dat=(select to_date(to_char(sysdate,'yyyy-mm-dd'),'yyyy-mm-dd') from dual)");
		sql1.append(",a.retrive_use_id=").append(ContextUtil.getCurrentUserId());
		
		sql1.append(" where a.callbatch_ass_id in(").append(sql_1).append(")");
		
		this.jdbcTemplate.execute(sql1.toString());
		System.out.println("************adminsql1*****************************"+sql1);	
		
		
		StringBuffer sql2=
			new StringBuffer("update ob_con_calllist set callbatch_id=").append(toCallbatchId)
			.append(",cre_dat=to_date('").append(staDat).append("','yyyy-mm-dd hh24:mi:ss')")
			.append(" where callbatch_id=").append(fromCallbatchId)
			.append(" and customerid in(").append(sql4).append(")");
		this.jdbcTemplate.execute(sql2.toString());
		System.out.println("************adminsql2*****************************"+sql2);
			
		StringBuffer sql3=new StringBuffer("update ob_callbatch_cus set ass_sta_id=0,ass_step_id=null,callbatch_ass_id=null,from_use_id=null,to_use_id=null,callbatch_id=")
              .append(toCallbatchId).append(" where  callbatch_cus_id in(")			
		.append(sql).append(")");	
		this.jdbcTemplate.execute(sql3.toString());
		System.out.println("************adminsql3*****************************"+sql3);
		
		return callbatchCussCount;
	}
	
    public int getHoldAssCount(Long fromCallbatchId) {
        StringBuffer sql=new StringBuffer("select sum(hold_count) from ob_callbatch_ass where callbatch_id=")
        .append(fromCallbatchId);
        return jdbcTemplate.queryForInt(sql.toString());
    }
    
    public void createSaleTaskByCus(ObCallbatchAss obCallbatchAss,ObCallbatch obCallbatch,ObCalllist obCalllist,ObCom obCom,Long userId,String staDat) {
    	StringBuffer sql=new StringBuffer("insert into ob_saletask(SALETASK_ID,typ_id,USE_ID,CUS_ID,CALLBATCH_ASS_ID,CALLBATCH_ID,CALLBATCH_NAM,CALLLIST_ID,CALLLIST_NAM," +
    			"COM_ID,COM_NAM,ASG_DAT,DIA_COU,BUSI_STA_ID) select SEQ_OB_SALETASK_ID.nextval,0,").append(userId).append(",a.cus_id,").append(obCallbatchAss.getCallbatchAssId()).append(",")
    			.append(obCallbatch.getCallbatchId()).append(",'").append(obCallbatch.getCallbatchNam()).append("',").append(obCalllist.getCalllistId()).append(",'").append(obCalllist.getCalllistNam())
    			.append("',").append(obCom.getComId()).append(",'").append(obCom.getObComNam()).append("',to_date('").append(staDat).append("','yyyy-mm-dd hh24:mi:ss'),0,1 from ob_callbatch_Cus a where a.callbatch_ass_id=")
    			.append(obCallbatchAss.getCallbatchAssId());
    			
    	this.execJdbcUpdate(sql.toString());
    	
    	StringBuffer sql1=new StringBuffer("update cus_personal set EXT20='0' where CUSTOMERID in(select CUS_ID from ob_saletask where callbatch_ass_id=")
    	.append(obCallbatchAss.getCallbatchAssId()).append(")");
    	this.execJdbcUpdate(sql.toString());
    }
    
}