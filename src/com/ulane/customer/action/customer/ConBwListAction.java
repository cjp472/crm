package com.ulane.customer.action.customer;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.io.File;
import java.io.FileInputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.ArrayList;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.customer.Customer;
import com.ulane.customer.model.customer.ConBwList;
import com.ulane.customer.model.customer.ConBwListTimeRul;
import com.ulane.customer.model.customer.ConHis;
import com.ulane.customer.model.customer.CusCompany;
import com.ulane.customer.model.customer.CusPersonal;
import com.ulane.customer.service.customer.ConBwListService;
import com.ulane.customer.service.customer.ConBwListTimeRulService;
import com.ulane.customer.service.customer.CusCompanyService;
import com.ulane.customer.service.customer.CusPersonalService;
import com.ulane.know.model.know.UkSysKnow;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ConBwListAction extends BaseAction{
	@Resource
	private ConBwListService conBwListService;
	@Resource
    private ConBwListTimeRulService conBwListTimeRulService;
	@Resource
	private ConBwListTimeRulService bwListTimeRulService;
	@Resource
	private CusPersonalService cusPersonalService;
	@Resource
	private CusCompanyService cusCompanyService;
	
	private ConBwList conBwList;
	
	private Long bwId;

	public Long getBwId() {
		return bwId;
	}

	public void setBwId(Long bwId) {
		this.bwId = bwId;
	}

	public ConBwList getConBwList() {
		return conBwList;
	}

	public void setConBwList(ConBwList conBwList) {
		this.conBwList = conBwList;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		String checkStateId = getRequest().getParameter("Q_checkStateId_SN_EQ");
		QueryFilter filter=new QueryFilter(getRequest());
//		filter.addSorted("bwId", "desc");
		if(checkStateId!=null && checkStateId.equals("1")){
			filter.addSorted("applyTime", "desc");
		}
		List<ConBwList> list= conBwListService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");
       JSONSerializer serializer = new JSONSerializer();
        serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "applyTime", "approveTime"});
//        buff.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls","conBwListTimeRuls","apply.department","apply.ulEmployee","apply.password","apply.class","customer.class"}).serialize(list));
		int i = 0;
		for(ConBwList bwList : list){
			try {
				if(i++>0)buff.append(",");
				buff.append(serializer
						.exclude(
								new String[] { "class", "conHiss",
										"conBwListBusRuls", "conBwListTimeRuls",
										"apply.department", "apply.ulEmployee",
										"apply.password", "apply.class",
										"customer.class", "conBwlistApprove",
										"approveUser.department", "approveUser.ulEmployee",
										"approveUser.password", "approveUser.class"})
						.serialize(bwList));
				if(bwList.getCustomer()!=null && bwList.getCustomer().getCusType() != null){
					if(bwList.getCustomerId()!=null && bwList.getCustomer().getCusType() == 1){//个人客户
						CusPersonal cusPersonal = cusPersonalService.get(bwList.getCustomerId());
						buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
						buff.append(",\"cusInfo\":"+serializer.serialize(cusPersonal));
						buff.append("}");
					}
					if(bwList.getCustomerId()!=null && bwList.getCustomer().getCusType() == 2){//企业客户
						CusCompany cusCompany = cusCompanyService.get(bwList.getCustomerId());
						buff.deleteCharAt(buff.length() - 1); // 去掉最后的大括号
						buff.append(",\"cusInfo\":"+serializer.serialize(cusCompany));
						buff.append("}");
					}
				}
			} catch (Exception e) {
//				e.printStackTrace();
				bwList.setCustomer(null);
				buff.append(serializer
						.exclude(
								new String[] { "class", "conHiss",
										"conBwListBusRuls", "conBwListTimeRuls",
										"apply.department", "apply.ulEmployee",
										"apply.password", "apply.class",
										"customer", "conBwlistApprove",
										"approveUser.department", "approveUser.ulEmployee",
										"approveUser.password", "approveUser.class"})
						.serialize(bwList));
			}
		}
        buff.append("]}");
		jsonString=buff.toString();
		return SUCCESS;
	}

	/**
	 * 批量注销
	 * @return
	 */
	public String multiDel(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
			    ConBwList conBwList = conBwListService.get(new Long(id));
			    conBwList.setStatusId((short)2);
			    conBwListService.save(conBwList);
				//conBwListService.remove(new Long(id));
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
	/**
	 * 删除未审核通过的
	 * @return
	 */
	public String removeUnpassed(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				conBwListService.remove(new Long(id));
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
    /**
     * 批量启用
     * @return
     */
    public String multiStr(){
        String[]ids=getRequest().getParameterValues("ids");
        if(ids!=null){
            for(String id:ids){
                ConBwList conBwList = conBwListService.get(new Long(id));
                conBwList.setStatusId((short)1);
                conBwListService.save(conBwList);
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
		ConBwList conBwList=conBwListService.get(bwId);
		
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new String[] {"conBwListTimeRuls.staTime","conBwListTimeRuls.staTime", "approveTime"});
        sb.append(serializer.exclude(new String[]{"class","conHiss","conBwListBusRuls", "applyTime","apply.department","apply.ulEmployee","apply.password","apply.class","customer.class","conBwlistApprove"}).serialize(conBwList));
        if(conBwList.getCustomerId()!=null && !conBwList.getCustomerId().equals("")){
        	CusPersonal cusPersonal = cusPersonalService.get(conBwList.getCustomerId());
			sb.deleteCharAt(sb.length() - 1); // 去掉最后的大括号
			sb.append(",\"nameCn\":\""+cusPersonal.getNameCn()+"\"");
			sb.append("}");
        }
        
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
	    
	    String details = getRequest().getParameter("details"); // 得到传过来的行信息。
	    conBwList.getConBwListTimeRuls().clear();
	    ConBwList bwList = null;
		if(conBwList.getBwId()==null){
		    conBwList.setApplyTime(new java.util.Date());
		    conBwList.setStatusId((short)1);
		    conBwList.setApply(ContextUtil.getCurrentUser());
		    conBwList.setCheckStateId((short)1);
		    //需要获取CusPersonal中的数据by wangzj
		    if(conBwList.getCustomer() != null){
		    	 if (conBwList.getCustomer().getCustomerId() == null)
				    {
				    	conBwList.setCustomer(null);
				    }
		    }
//		    if(conBwList.getCusPersonal() != null){
//		    	if (conBwList.getCusPersonal().getCustomerId() == null)
//		    	{
//		    		conBwList.setCusPersonal(null);
//		    	}
//		    }
		    bwList = conBwListService.save(conBwList);
		}else{
			ConBwList orgConBwList=conBwListService.get(conBwList.getBwId());
			try{
				BeanUtil.copyNotNullProperties(orgConBwList, conBwList);
				if(orgConBwList.getCustomer()!=null){
					if(orgConBwList.getCustomer().getCustomerId() == null || orgConBwList.getCustomer().getCustomerId().equals("null")){
						orgConBwList.setCustomer(null);
					}
				}
				bwList = conBwListService.save(orgConBwList);
			}catch(Exception ex){
				logger.error(ex.getMessage());
				ex.printStackTrace();
			}
		}
		if(bwList!=null && StringUtils.isNotEmpty(details)){
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            ConBwListTimeRul[] detailArr = (ConBwListTimeRul[]) gson.fromJson(details, ConBwListTimeRul[].class);
            if (detailArr != null) {
                for (ConBwListTimeRul spl : detailArr) {
                	String staTime = spl.getStaTime();
                	String endTime = spl.getEndTime();
                	if(staTime != null && !staTime.equals("") && endTime != null && !endTime.equals("")){
                		spl.setStaTime(staTime.substring(staTime.indexOf("T")+1));
                    	spl.setEndTime(endTime.substring(endTime.indexOf("T")+1));
                	}
					if (spl.getBwListTimeRulId() == null) { // 新增
						spl.setConBwList(bwList);
//						conBwList.getConBwListTimeRuls().add(spl);
						bwListTimeRulService.save(spl);
					} else { // 修改
						ConBwListTimeRul orgSpl = conBwListTimeRulService.get(spl.getBwListTimeRulId());
						try {
							BeanUtil.copyNotNullProperties(orgSpl, spl);
							orgSpl.setConBwList(bwList);
//							conBwList.getConBwListTimeRuls().add(orgSpl);
							bwListTimeRulService.merge(spl);
						} catch (Exception ex) {
							logger.error(ex.getMessage());
						}
					}
                }
            }
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
	
	/**
	 * 是否存在該客戶
	 */
	public String getMessageByCusId(){
		String customerId = getRequest().getParameter("customerId");
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_customer.customerId_L_EQ", customerId);
		List<ConBwList> list=conBwListService.getAll(filter);
		if(list!=null && list.size()>0){
			setJsonString("{success:false}");
		}else{
			setJsonString("{success:true}");
		}
		return SUCCESS;
	}
	
	/**
	 * 是否存在該客戶
	 */
	public String isExistBW(){
		String customerId = getRequest().getParameter("customerId");
		String mainContactNum = getRequest().getParameter("mainContactNum");
		
		QueryFilter filter=new QueryFilter(getRequest());
		if(StringUtils.isNotBlank(customerId)) {
			filter.addFilter("Q_customer.customerId_L_EQ", customerId);
		}
		
		if(StringUtils.isNotBlank(mainContactNum)) {
			filter.addFilter("Q_mainContactNum_S_EQ", mainContactNum);
		}
		
		List<ConBwList> list=conBwListService.getAll(filter);
		if(list!=null && list.size()>0){
			setJsonString("{success:true}");
		}else{
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}
	/**
	 * 批量添加及保存操作
	 */
	public String saveMost(){
		String details = getRequest().getParameter("details"); // 得到传过来的行信息。
//		String serviceId = getRequest().getParameter("serviceId");
//		String planId = getRequest().getParameter("planId");
	    conBwList.getConBwListTimeRuls().clear();
	    if (StringUtils.isNotEmpty(details)) {
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            ConBwListTimeRul[] detailArr = (ConBwListTimeRul[]) gson.fromJson(details, ConBwListTimeRul[].class);
            if (detailArr != null && detailArr.length > 0 ) {
                for (ConBwListTimeRul spl : detailArr) {
                	String staTime = spl.getStaTime();
                	String endTime = spl.getEndTime();
                	if(staTime != null && !staTime.equals("") && endTime != null && !endTime.equals("")){
                		spl.setStaTime(staTime.substring(staTime.indexOf("T")+1));
                    	spl.setEndTime(endTime.substring(endTime.indexOf("T")+1));
                	}
                    if (spl.getBwListTimeRulId() == null) {  //新增
                       spl.setConBwList(conBwList);
                       conBwList.getConBwListTimeRuls().add(spl);
                    } else {  //修改
                        ConBwListTimeRul orgSpl = conBwListTimeRulService.get(spl.getBwListTimeRulId());
                        try {
                            BeanUtil.copyNotNullProperties(orgSpl,spl);
                       } catch (Exception ex) {
                            logger.error(ex.getMessage());
                        }
                        orgSpl.setConBwList(conBwList);
                        conBwList.getConBwListTimeRuls().add(orgSpl);
                    }
                }
            }
//            else{
//            	ConBwListTimeRul spl = new ConBwListTimeRul();
//            	Date dateStart = new Date();
//            	Calendar calendar = Calendar.getInstance();
//            	calendar.add(Calendar.YEAR, 100);
//            	Date dateEnd = calendar.getTime();
//            	spl.setStaDate(dateStart);
//            	spl.setEndDate(dateEnd);
//            	spl.setConBwList(conBwList);
//            	conBwList.getConBwListTimeRuls().add(spl);
//            	 
//            }
	    }
 	    conBwList.setApplyTime(new java.util.Date());
	    conBwList.setStatusId((short)1);
	    conBwList.setApply(ContextUtil.getCurrentUser());
	    conBwList.setCheckStateId((short)1);
	  //需要获取CusPersonal中的数据by wangzj
//	    if(conBwList.getCusPersonal() != null){
//	    	if (conBwList.getCusPersonal().getCustomerId() == null)
//	    	{
//	    		conBwList.setCusPersonal(null);
//	    	}
//	    }
	    if(conBwList.getCustomer() != null){
	    	 if (conBwList.getCustomer().getCustomerId() == null)
			    {
			    	conBwList.setCustomer(null);
			    }
	    }
		String weiChuLiList = getRequest().getParameter("root");
		String[] weiChuLiAttr = weiChuLiList.split(";");
//		String messageStart = "{success:false,msg:'很抱歉！联系方式(";
//		for(String weichuli : weiChuLiAttr){
//			String[] weichuliVal = weichuli.split(",");
//			ConBwList conBw = conBwListService.getConBwByContact(Short.parseShort(weichuliVal[0]), weichuliVal[1]);
//			if(conBw != null && conBw.getCheckStateId()==1 ){
//				messageStart += weichuliVal[1]+"、";
//			}else if(conBw != null &&  conBw.getCheckStateId()==2){
//				messageStart += weichuliVal[1]+"、";
//			}
//		}
//		if(messageStart.contains("、")){
//			messageStart = messageStart.substring(0, messageStart.length()-1);
//		}
//		messageStart += ")不能重复提交,请查看黑名单！'}";
//		if(!messageStart.equals("{success:false,msg:'很抱歉！联系方式()不能重复提交,请查看黑名单！'}")){
//			setJsonString(messageStart);
//			return SUCCESS;
//		}
		try {
			for(String weichuli : weiChuLiAttr){
				ConBwList orgConBwList = new ConBwList();
				Set<ConBwListTimeRul> conBwListTimeRul = new HashSet<ConBwListTimeRul>();
				BeanUtil.copyNotNullProperties(orgConBwList, conBwList);
				String[] weichuliVal = weichuli.split(",");
				orgConBwList.setContactTypeId(Short.parseShort(weichuliVal[0]));
				orgConBwList.setMainContactNum(weichuliVal[1]);
				ConBwList conBw = conBwListService.getConBwByContact(Short.parseShort(weichuliVal[0]), weichuliVal[1]);
				
//				if(conBw == null){
					Set<ConBwListTimeRul> conBwListTimeRuls = orgConBwList.getConBwListTimeRuls();
					if(conBwListTimeRuls!=null && conBwListTimeRuls.size()>0){
						for(ConBwListTimeRul cons : conBwListTimeRuls){
							cons.setConBwList(orgConBwList);
							ConBwListTimeRul ConBwListTime = new ConBwListTimeRul();
							BeanUtil.copyNotNullProperties(ConBwListTime, cons);
							conBwListTimeRul.add(ConBwListTime);
						}
						orgConBwList.setConBwListTimeRuls(conBwListTimeRul);
					}
					if(orgConBwList.getCustomer()!=null){
						if(orgConBwList.getCustomer().getCustomerId()!=null && orgConBwList.getCustomer().getCustomerId()==-1){
							orgConBwList.setCustomer(null);
						}
					}
					conBwListService.save(orgConBwList);
//				}else if(conBw.getCheckStateId()==3){
//					
//					Set<ConBwListTimeRul> conBwTimeRulsOld = conBw.getConBwListTimeRuls();
//					for(ConBwListTimeRul cons : conBwTimeRulsOld){
//						conBwListTimeRulService.remove(cons);
//					}
//					
//					
//					BeanUtil.copyNotNullProperties(conBw, orgConBwList);
//					Set<ConBwListTimeRul> conBwTimeRuls = conBw.getConBwListTimeRuls();
//					if(conBwTimeRuls!=null && conBwTimeRuls.size()>0){
//						for(ConBwListTimeRul cons : conBwTimeRuls){
//							cons.setConBwList(conBw);
//						}
//					}
//					conBwListService.save(conBw);
//				}
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			logger.error(e.getMessage());
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
		/**
	 * 检验黑名单中是否存在此号码
	 * @return
	 */
	public String checkByCallinNO()
	{
		String callinno = getRequest().getParameter("callinno");
		List<ConBwList> list= conBwListService.getAll();
		StringBuffer buff = new StringBuffer();
		boolean isTrue;
		buff.append("{success:true,msg:");
		for (int i=0; i<list.size(); i++){
			String no = list.get(i).getMainContactNum();
			if (no.equals(callinno)){
				isTrue = true;
				buff.append(isTrue);
				return SUCCESS;
			}
		}
		buff.append("}");
		return SUCCESS;
	}
	
	/**
	 * 导入黑白名单(仅限于EXCEL)
	 * @author wangzhongjin
	 * @return
	 * @throws Exception
	 */
	public String doImportBwlist() throws Exception {
		String bwFlag = getRequest().getParameter("bwFlag");
		String[] columnData = getRequest().getParameterValues("columnData");
		if (columnData.length > 0)
			columnData = columnData[0].split(",");
		String[] fileData = getRequest().getParameterValues("fileData");
		if (fileData.length > 0)
			fileData = fileData[0].split(",");
		String fileName = getRequest().getParameter("fileName");
		Map filefVsDbfMap = new HashMap();
		// 将文件列号与数据库字段对应关系保存起来
		for (int i = 0; i < columnData.length; i++) {
			String filef = fileData[i];// 文件列号
			String dbf = columnData[i];// 数据库列明
			if (filef != null && !filef.equals("0")
					&& filef.trim().length() > 0) {
//				dbf=dbf.substring(1, dbf.length()-1);//去掉配置的字段前后的''(如没写就不用这句话)
				filefVsDbfMap.put(filef.trim(), dbf);
				System.out.println("" + filef + "=" + dbf);
			}
		}
		String bwListJson = parseXlsFile(filefVsDbfMap,fileName,bwFlag);
		setJsonString(bwListJson);
		return SUCCESS;
	}
	private String parseXlsFile(Map filefVsDbfMap, String fileName,String bwFlag) throws Exception {
		Long userId = ContextUtil.getCurrentUserId();
		Map filefVsColumn = new HashMap();// 列名与列编号对应表
		Workbook wb = null;// 文件workbook
		Date staDat = DateUtil.parse(DateUtil.getCurrentTime());//导入开始时间
		Date endDat = null;//导入结束时间
		int intRows = 0;// 行数
		int intColumns = 0;// 列数
		int totalCount = 0;
		String uploadFold = System.getProperty("user.dir");
		StringBuffer sb=new StringBuffer();
		File file = new File(uploadFold, fileName);
		String excelFilePath = file.toString();
		try {
			FileInputStream excelFile = new FileInputStream(excelFilePath);
			wb = new HSSFWorkbook(excelFile);
			if (wb != null) {
				Sheet sheet = wb.getSheetAt(0);
				filefVsColumn.clear();
				intRows = sheet.getLastRowNum()+1;//行数
				intColumns = sheet.getRow(0).getLastCellNum();//列数
//				System.out.println("------intRows-------"+intRows+"+++++++++-------"+intColumns);
				for (int i = 0; i < intColumns; i++) {
					Cell cell = sheet.getRow(0).getCell(i);
					String columnName = cell.getStringCellValue();
					if (filefVsDbfMap.containsKey(String.valueOf(i + 1))) {
						filefVsColumn.put(columnName, i + 1);// 列名与列号关系
					}
				}
				int colSize = filefVsColumn.size();
				String[] columnName = new String[colSize];// 列名
				int[] columnNum = new int[colSize];// 列号
				java.util.Iterator it = filefVsColumn.keySet().iterator();
				int i = 0;
				StringBuffer sql = null;
				StringBuffer sqlInsert = new StringBuffer(
						"insert into CON_BW_LIST(BW_ID,BW_TYP_ID,APPLY_ID,APPLY_TIME,CHECK_STATE_ID,STATUS_ID");
				while (it.hasNext()) {
					sqlInsert.append(",");
					columnName[i] = (String) it.next();// 文件列名
					columnNum[i] = Integer.parseInt(filefVsColumn.get(columnName[i]).toString());// 文件列号
					sqlInsert.append(filefVsDbfMap.get(String.valueOf(columnNum[i])));// 数据库字段
					i++;
				}
				sqlInsert.append(") ");
				Cell cell = sheet.getRow(0).getCell(0);
				String contentOfCell = "";
				StringBuffer sqlValues = null;
				for (int row = 1; row < intRows; ++row) {// 逐行读取
					sqlValues = new StringBuffer(" values(").append(
							"SEQ_CON_BW_LIST_ID.nextval");
					if(bwFlag.equals("1")){
						sqlValues.append(",1");
					}
					if(bwFlag.equals("2")){
						sqlValues.append(",2");
					}
					sqlValues.append(
							"," + userId + ",").append(
							"to_date('" + DateUtil.getFormatTime(staDat)
									+ "','yyyy-mm-dd hh24:mi:ss')").append(",1,1");
					int nullCol = 0;
					for (int icol = 0; icol < colSize; icol++) {// 读取需要的列
						sqlValues.append(",");
						cell = sheet.getRow(row).getCell(columnNum[icol] - 1); // 格子
						if (cell != null) {
							if (cell.getCellType() == 0) {
								contentOfCell = String.valueOf(cell.getNumericCellValue());
							} else {
								contentOfCell = cell.getStringCellValue();
							}
						}

						if (contentOfCell == null || contentOfCell.trim().length() == 0) {
							sqlValues.append("null");
							nullCol++;
						} else {
							sqlValues.append("'").append(contentOfCell).append("'");
						}
					}
					if (nullCol == colSize)
						break;// 遇到列全部为空的行 说明已经读取完毕
					sql = new StringBuffer(sqlInsert).append(sqlValues).append(")");
//					System.out.println("**************sql.toString()**********" + sql.toString());
					conBwListService.executeInsertSql(sql.toString());//往表中插入数据
					totalCount++;// 总行数
					endDat = DateUtil.parse(DateUtil.getCurrentTime());
				}
				String formatStaDat = DateUtil.getFormatTime(staDat);
				String formatEndDat = DateUtil.getFormatTime(endDat);
				int impDur = getTimeDur(formatStaDat,formatEndDat);
				sb.append("{success:true,'staDat':'");
		        sb.append(formatStaDat).append("',");
		        sb.append("'endDat':'").append(formatEndDat).append("',");
		        sb.append("'impDur':'").append(impDur).append("',");
		        sb.append("'toltalCount':'").append(totalCount).append("'}");
			}
			File fileTemp = new File(excelFilePath);
			if (fileTemp != null)
				fileTemp.delete();
		} catch (Exception e) {
//			e.printStackTrace();
			File fileTemp = new File(excelFilePath);
			if (fileTemp != null)
				fileTemp.delete();
			sb.append("{success:false}");
		}
		return sb.toString();
	}
	
	/**
	 * 求时间差
	 * @param beginTime
	 * @param endTime
	 * @return
	 */
	public static int getTimeDur(String beginTime, String endTime) {
		int interval = 0;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date beginDateTime = sdf.parse(beginTime);
			// 将截取到的时间字符串转化为时间格式的字符串
			Date endDateTime = sdf.parse(endTime);
			// 默认为毫秒，除以1000是为了转换成秒
			interval = (int) (endDateTime.getTime() - beginDateTime.getTime()) / 1000;// 秒
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return interval;
	}
	
	
	/**
	 * @author Zhangyl
	 * @createtime 2012年6月7日 18:17:56
	 * @method 根据Id数组查询
	 */
	public String getByBwIds() {
		String bwIds = getRequest().getParameter("bwIds"); // 提交的ID
		List<ConBwList> bwList = new ArrayList<ConBwList>();
		String[] ids = bwIds.trim().split(",");
		if (bwIds != null) {
			for (String id : ids) {
				ConBwList orgConBwList = conBwListService.get(new Long(id));
				bwList.add(orgConBwList);
			}
		}

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(bwList.size()).append(",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(bwList));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	
	/**
	 * 外呼：加入黑名单
	 */
	public String saveHMD(){
		String details = getRequest().getParameter("details"); // 得到传过来的行信息。
	    //清空时间限制实例
		conBwList.getConBwListTimeRuls().clear();
		
	    //时间限制
	    if (StringUtils.isNotEmpty(details)) {
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            ConBwListTimeRul[] detailArr = (ConBwListTimeRul[]) gson.fromJson(details, ConBwListTimeRul[].class);
            if (detailArr != null && detailArr.length > 0 ) {
                for (ConBwListTimeRul spl : detailArr) {
                	String staTime = spl.getStaTime();
                	String endTime = spl.getEndTime();
                	if(staTime != null && !staTime.equals("") && endTime != null && !endTime.equals("")){
                		spl.setStaTime(staTime.substring(staTime.indexOf("T")+1));
                    	spl.setEndTime(endTime.substring(endTime.indexOf("T")+1));
                	}
                    if (spl.getBwListTimeRulId() == null) {  //新增
                       spl.setConBwList(conBwList);
                        conBwList.getConBwListTimeRuls().add(spl);
                    } else {  //修改
                        ConBwListTimeRul orgSpl = conBwListTimeRulService.get(spl.getBwListTimeRulId());
                        try {
                            BeanUtil.copyNotNullProperties(orgSpl,spl);
                       } catch (Exception ex) {
                            logger.error(ex.getMessage());
                        }
                        orgSpl.setConBwList(conBwList);
                        conBwList.getConBwListTimeRuls().add(orgSpl);
                    }
                }
            }
            else{
            	ConBwListTimeRul spl = new ConBwListTimeRul();
            	Date dateStart = new Date();
            	Calendar calendar = Calendar.getInstance();
            	calendar.add(Calendar.YEAR, 100);
            	Date dateEnd = calendar.getTime();
            	spl.setStaDate(dateStart);
            	spl.setEndDate(dateEnd);
            	spl.setConBwList(conBwList);
            	conBwList.getConBwListTimeRuls().add(spl);
            	 
            }
	    }
 	    conBwList.setApplyTime(new java.util.Date());
	    conBwList.setStatusId((short)1);
	    conBwList.setApply(ContextUtil.getCurrentUser());
	    conBwList.setCheckStateId((short)1);
	  //需要获取CusPersonal中的数据by wangzj
//	    if(conBwList.getCusPersonal() != null){
//	    	if (conBwList.getCusPersonal().getCustomerId() == null)
//	    	{
//	    		conBwList.setCusPersonal(null);
//	    	}
//	    }
	    if(conBwList.getCustomer() != null){
	    	 if (conBwList.getCustomer().getCustomerId() == null)
			    {
			    	conBwList.setCustomer(null);
			    }
	    }
	    
	    //将联系方式拉黑
		String weiChuLiList = getRequest().getParameter("root");
		String[] weiChuLiAttr = weiChuLiList.split(";");
		String messageStart = "{success:false,msg:'很抱歉！联系方式(";
		for(String weichuli : weiChuLiAttr){
			String[] weichuliVal = weichuli.split(",");
			ConBwList conBw = conBwListService.getConBwByContact(Short.parseShort(weichuliVal[0]), weichuliVal[1]);
			if(conBw != null && conBw.getCheckStateId()==1 ){
				messageStart += weichuliVal[1]+"、";
			}else if(conBw != null &&  conBw.getCheckStateId()==2){
				messageStart += weichuliVal[1]+"、";
			}
		}
		if(messageStart.contains("、")){
			messageStart = messageStart.substring(0, messageStart.length()-1);
		}
		messageStart += ")不能重复提交,请查看黑名单！'}";
		if(!messageStart.equals("{success:false,msg:'很抱歉！联系方式()不能重复提交,请查看黑名单！'}")){
			setJsonString(messageStart);
			return SUCCESS;
		}
	    
		try {
			
			for(String weichuli : weiChuLiAttr){
				ConBwList orgConBwList = new ConBwList();
				Set<ConBwListTimeRul> conBwListTimeRul = new HashSet<ConBwListTimeRul>();
				BeanUtil.copyNotNullProperties(orgConBwList, conBwList);
				String[] weichuliVal = weichuli.split(",");
				orgConBwList.setContactTypeId(Short.parseShort(weichuliVal[0]));
				orgConBwList.setMainContactNum(weichuliVal[1]);
				ConBwList conBw = conBwListService.getConBwByContact(Short.parseShort(weichuliVal[0]), weichuliVal[1]);
				
				if(conBw == null){
					Set<ConBwListTimeRul> conBwListTimeRuls = orgConBwList.getConBwListTimeRuls();
					if(conBwListTimeRuls!=null && conBwListTimeRuls.size()>0){
						for(ConBwListTimeRul cons : conBwListTimeRuls){
							cons.setConBwList(orgConBwList);
							ConBwListTimeRul ConBwListTime = new ConBwListTimeRul();
							BeanUtil.copyNotNullProperties(ConBwListTime, cons);
							conBwListTimeRul.add(ConBwListTime);
						}
						orgConBwList.setConBwListTimeRuls(conBwListTimeRul);
					}
					conBwListService.save(orgConBwList);
				}else if(conBw.getCheckStateId()==3){
					
					Set<ConBwListTimeRul> conBwTimeRulsOld = conBw.getConBwListTimeRuls();
					for(ConBwListTimeRul cons : conBwTimeRulsOld){
						
						conBwListTimeRulService.remove(cons);
					}
					
					BeanUtil.copyNotNullProperties(conBw, orgConBwList);
					Set<ConBwListTimeRul> conBwTimeRuls = conBw.getConBwListTimeRuls();
					if(conBwTimeRuls!=null && conBwTimeRuls.size()>0){
						for(ConBwListTimeRul cons : conBwTimeRuls){
							cons.setConBwList(conBw);
						}
					}
					conBwListService.save(conBw);
				}
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
//			logger.error(e.getMessage());
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public String saveApprove(){
		if(conBwList.getBwId()!=null && !conBwList.getBwId().equals("")){
			ConBwList orgConBwList=conBwListService.get(conBwList.getBwId());
			try{
				BeanUtil.copyNotNullProperties(orgConBwList, conBwList);
				if(orgConBwList.getCustomer().getCustomerId() == null || orgConBwList.getCustomer().getCustomerId().equals("null")){
					orgConBwList.setCustomer(null);
				}
				orgConBwList.setApproveTime(new Date());
				orgConBwList.setApproveUser(ContextUtil.getCurrentUser());
				conBwListService.save(orgConBwList);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
