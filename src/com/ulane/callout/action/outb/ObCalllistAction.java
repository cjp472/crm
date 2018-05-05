package com.ulane.callout.action.outb;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.io.File;
import java.io.FileInputStream;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.system.AppUserService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.model.outb.ObCallbatchAss;
import com.ulane.callout.model.outb.ObCallbatchCus;
import com.ulane.callout.model.outb.ObCallbatchExtract;
import com.ulane.callout.model.outb.ObCallbatchImpTmp;
import com.ulane.callout.model.outb.ObCalllist;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObConCalllist;
import com.ulane.callout.model.outb.ObProject;
import com.ulane.callout.service.outb.ObCallbatchAssService;
import com.ulane.callout.service.outb.ObCallbatchCusService;
import com.ulane.callout.service.outb.ObCallbatchExtractService;
import com.ulane.callout.service.outb.ObCallbatchService;
import com.ulane.callout.service.outb.ObCalllistService;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.callout.service.outb.ObConCalllistService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class ObCalllistAction extends BaseAction {
	public static final Logger logger = Logger.getLogger(ObCalllistAction.class);
	
	@Resource
	private ObCalllistService obCalllistService;
	private ObCalllist obCalllist;
	@Resource
	private ObComService obComService;
	@Resource
	private UlDepartmentService ulDepartmentService;
	@Resource
	private UlEmployeeService ulEmployeeService;
	@Resource
	private ObCallbatchService obCallbatchService;
	@Resource
	private ObCallbatchCusService obCallbatchCusService;
	@Resource
	private ObCallbatchAssService obCallbatchAssService;
	@Resource
	private ObConCalllistService obConCalllistService;
	@Resource
	private ObCallbatchExtractService obCallbatchExtractService;	
	
	@Resource
	private AppUserService appUserService;	
	

	private Long calllistId;

	private ObCallbatch obCallbatch;// 名单批次ID

	public Long getCalllistId() {
		return calllistId;
	}

	public void setCalllistId(Long calllistId) {
		this.calllistId = calllistId;
	}

	public ObCalllist getObCalllist() {
		return obCalllist;
	}

	public void setObCalllist(ObCalllist obCalllist) {
		this.obCalllist = obCalllist;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("staDat", "desc");
		try {
		List<ObCalllist> list = obCalllistService.getAll(filter);
//		Type type = new TypeToken<List<ObCalllist>>() {
//		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		if (null != list && list.size() > 0) {
			int iCount = list.size();
			for (int i = 0; i < iCount; i++) {
				ObCalllist obj = list.get(i);
				obj.setOwnerTeamName(getOwnerTeamName(obj.getOwnerTeam()));
				Set<ObCom> obComs=obj.getObComs();
				if(obComs!=null&&obComs.size()>0) {
					obj.setComNam(((ObCom)obComs.iterator().next()).getObComNam());
					obj.setComId(((ObCom)obComs.iterator().next()).getComId());
				} else {
					obj.setComNam("");
					obj.setComId(null);
				}

				Set<ObCallbatch>  callbatchs=obj.getObCallbatchs();
				if(callbatchs!=null&&callbatchs.size()>0) {
					for(ObCallbatch callbatch:callbatchs) {
						if(callbatch.getCallbatchStaId().equals(ObCallbatch.FLAG_UNENABLED)) {
							obj.setIsCanClear("1");
							break;
						} else {
							obj.setIsCanClear("2");
						}
					}
				} else {
					obj.setIsCanClear("2");
				}
				
			} 
		}
        buff.append(jsonSer
        		.include("calllistNam","calllistCode","calllistTypId","calllistResouce","comNam","ownerTeamName","staDat","endDat","calllistStaId","isCanClear","comId","calllistId")
		        .exclude("*")
		        .serialize(list));		

		//buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		} catch(Exception e) {
			logger.error(e.getMessage());
		}
		return SUCCESS;
	}


	/**
	 * 显示呼叫名单的批次列表
	 * 
	 * @return
	 */
	public String listCalBth() {
		String calllistID = (String) getRequest().getParameter("calllistID");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_obCalllist.calllistId_L_EQ", calllistID);
		List<ObCallbatch> list = obCallbatchService.getAll(filter);
		if (null != calllistID) {
			Type type = new TypeToken<List<ObCalllist>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(filter.getPagingBean().getTotalItems()).append(
							",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
	        buff.append(jsonSer
	        		.include("callbatchNam", "callbatchTypId",
							"obCalllist.calllistResouce", "callbatchRegion", "totalCount",
							"avlidCount", "callbatchStaId")
			        .exclude("*")
			        .serialize(list));			
			//buff.append(jsonSer.serialize(list));
			buff.append("}");
			jsonString = buff.toString();
		}
		return SUCCESS;
	}
	
	/**
	 * 注销名单
	 * @author lzm
	 */
	public String zhuXiaoMingDan(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
			try{
				ObCalllist call=obCalllistService.get(new Long(id));
				call.setCalllistStaId(ObCalllist.INVALID);//注销名单
				obCalllistService.save(call);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}

	/**
	 * 绑定名单选择器显示列表
	 * @author lzm
	 */
	public String callNamlist() {
		String comid = getRequest().getParameter("comid");
		QueryFilter filter = new QueryFilter(getRequest());
		List<ObCalllist> list = obCalllistService.getAll(filter);
		if (!("null").equals(comid) && comid != null) {
			ObCom obCom = obComService.get(new Long(comid));
			Set<ObCalllist> calllist = obCom.getObCalllists();
			// 剔除已绑定的名单
			Iterator it = list.iterator();
			while (it.hasNext()) {
				ObCalllist o = (ObCalllist) it.next();
				for (ObCalllist calltwo : calllist) {
					if (calltwo.equals(o)) {
						it.remove();
					}
				}
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		if (null != list && list.size() > 0) {
			int iCount = list.size();
			for (int i = 0; i < iCount; i++) {
				ObCalllist obj = list.get(i);
				obj.setOwnerTeamName(getOwnerTeamName(obj.getOwnerTeam()));
			}
		}

		buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 绑定名单显示列表
	 * @author lzm
	 */
	public String callBDNamlist() {
		String ids = getRequest().getParameter("comId");
		if (!("null").equals(ids)) {
			ObCom obCom = obComService.get(new Long(ids));
			Type type = new TypeToken<List<ObCalllist>>() {
			}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
					.append(obCom.getObCalllists().size()).append(",result:");
			JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
			for (ObCalllist o : obCom.getObCalllists()) {
				if (null != o.getOwnerTeam() && !"".equals(o.getOwnerTeam())) {
					UlDepartment ulDepartment = ulDepartmentService
							.get(new Long(o.getOwnerTeam()));
					o.setOwnerTeamName(ulDepartment.getDepname());
					obCom.getObCalllists().add(o);
				}
			}
			buff.append(jsonSer.serialize(obCom.getObCalllists()));
			buff.append("}");

			jsonString = buff.toString();
		}
		return SUCCESS;

	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		//有效-》关闭  关闭-》无效  无效-》删除
		
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				//呼叫名单列表——批量删除：1无效的则删除，  0有效的则关闭
				ObCalllist obj = obCalllistService.get(Long.parseLong(id));
				if(ObCalllist.VALID.equals(obj.getCalllistStaId())) {
					obj.setCalllistStaId(ObCalllist.CLOSE);
					obCalllistService.save(obj);
					continue;
				}
				if(ObCalllist.CLOSE.equals(obj.getCalllistStaId())) {
					obj.setCalllistStaId(ObCalllist.INVALID);
					obCalllistService.save(obj);
					continue;
				}
				if(ObCalllist.INVALID.equals(obj.getCalllistStaId())) {
					//obCalllistService.remove(new Long(id));
					obj.setCalllistStaId(ObCalllist.INVALID);
					obCalllistService.save(obj);					
					continue;
				}	
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 启用
	 */
	public String enable() {
		String[]ids=getRequest().getParameterValues("ids");
		if(null!=ids){
			for(String id:ids){
				ObCalllist obCalllist = obCalllistService.get(Long.parseLong(id));
				obCalllist.setCalllistStaId(ObCalllist.VALID);
				obCalllistService.save(obCalllist);
			}
		} 
		jsonString="{success:true}";
		return SUCCESS;
	}	

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		ObCalllist obCalllist = obCalllistService.get(calllistId);

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"staDat", "endDat", "creTime", "updTime" });

		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");

		obCalllist
				.setOwnerTeamName(getOwnerTeamName(obCalllist.getOwnerTeam()));
		Set obComs=obCalllist.getObComs();
		if(obComs.size()>0) {
			Long comId=((ObCom)obComs.iterator().next()).getComId();
			obCalllist.setComId(comId);
			obCalllist.setComNam(getComNam(comId));
		}
		obCalllist.setCreUseName(getOptName(obCalllist.getCreUseId()));
		obCalllist.setUpdUseName(getOptName(obCalllist.getUpdUseId()));
//		AppUser creUser=appUserService.get(obCalllist.getCreUseId());
//		AppUser updUser=appUserService.get(obCalllist.getUpdUseId());
//		obCalllist.setCreUseName(creUser.getFullname());
//		obCalllist.setUpdUseName(updUser.getFullname());		
		String json = jsonSer.serialize(obCalllist);
		sb.append(json);
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		if (obCalllist.getCalllistId() == null) {
			obCalllist.setCreUseId(ContextUtil.getCurrentUserId()); // 创建人为当前操作用户
			obCalllist.setCreTime(new Date()); // 创建时间
			obCalllist.setCusTypId(obCalllist.CUSTYPE); //客户类型
			obCalllist.setCalllistStaId(ObCalllist.VALID); // 状态：0=有效 1=无效 2=关闭
		    Long calllistComId=Long.valueOf(getRequest().getParameter("calllistComId"));
		    Set<ObCom> obComs=new HashSet<ObCom>();
		    obComs.add(obComService.get(calllistComId));
		    obCalllist.setObComs(obComs);
			obCalllistService.save(obCalllist);
		} else {
			ObCalllist orgObCalllist = obCalllistService.get(obCalllist
					.getCalllistId());
			orgObCalllist.setUpdUseId(ContextUtil.getCurrentUserId()); // 修改人为当前操作用户
			orgObCalllist.setUpdTime(new Date()); // 修改时间
		    Long calllistComId=Long.valueOf(getRequest().getParameter("calllistComId"));
		    Set<ObCom> obComs=new HashSet<ObCom>();
		    obComs.add(obComService.get(calllistComId));
		    obCalllist.setObComs(obComs);			
			try {
				BeanUtil.copyNotNullProperties(orgObCalllist, obCalllist);
				obCalllistService.save(orgObCalllist);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	/**
	 * 导入--第二步it
	 */
	public String importCalllist2() {

		// System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"+obCallbatch);
		// JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		//
		// //将数据转成JSON格式
		// StringBuffer sb = new StringBuffer("{success:true,data:");
		// String json = jsonSer.serialize(obCallbatch);
		// json = json.substring(0, json.length()-1);
		// sb.append(json);
		// sb.append("}");
		//		
		// sb.append("}");
		// System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$"+sb.toString());
		// setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 获取所属机构名称
	 * 
	 * @return
	 */
	public String getOwnerTeamName(Long ownerTeam) {
		if (null == ownerTeam) {
			return "";
		}
		UlDepartment ulDepartment = ulDepartmentService.get(ownerTeam);
		return ulDepartment.getDepname();
	}
	
	/**
	 * 获取活动名称
	 * 
	 * @return
	 */
	public String getComNam(Long comId) {
		if (null == comId) {
			return "";
		}
		ObCom obCom = obComService.get(comId);
		return obCom.getObComNam();
	}	

	/**
	 * 获取操作人姓名
	 * 
	 * @return
	 */
	public String getOptName(Long userID) {
		if (null == userID) {
			return "";
		}
		if(appUserService.get(userID).getUlEmployee()==null) {
			return "";
		} else {
			userID=appUserService.get(userID).getUlEmployee().getUseid();
			UlEmployee ulEmployee = ulEmployeeService.get(userID);
			return ulEmployee.getFullname();			
		}
	}

	public String doImportCalllist() throws Exception {
		String columnData = getRequest().getParameter("columnData");
		String comId=getRequest().getParameter("comId");
		
		String[] columnDataArr=null;
//		if (columnData.length > 0)
//			columnData = columnData[0].split(",");
		if (!columnData.equals(""))
			columnDataArr = columnData.split(",");
		String fileData = getRequest().getParameter("fileData");
		String[] fileDataArr=null;
		if (!fileData.equals(""))
			fileDataArr = fileData.split(",");
		String fileName = getRequest().getParameter("fileName");

		// 导入条件
		// String[] col1Array=getRequest().getParameterValues("col1Array");
		// String[] col2Array=getRequest().getParameterValues("col2Array");
		// String[] col3Array=getRequest().getParameterValues("col3Array");

		Map filefVsDbfMap = new HashMap();
		// 将文件列号与数据库字段对应关系保存起来
		for (int i = 0; i < columnDataArr.length; i++) {
			String filef = fileDataArr[i];// 文件列号
			String dbf = columnDataArr[i];// 数据库列明
			if (filef != null && !filef.equals("0")
					&& filef.trim().length() > 0) {
//				dbf=dbf.substring(0, dbf.length()-1);
				dbf = StringUtils.replace(dbf, "'", "");
				filefVsDbfMap.put(filef.trim(), dbf);
				System.out.println("" + filef + "=" + dbf);
			}
		}

		// 逐行读取文件数据,插入名单临时表中
		// parseXlsFile(filefVsDbfMap, fileName,col1Array,col2Array,col3Array);
		String batchIdJson=parseXlsFile(filefVsDbfMap, fileName,comId);
		setJsonString(batchIdJson);
		return SUCCESS;
	}

	private String parseXlsFile(Map filefVsDbfMap, String fileFileName,String comId)
			throws Exception {
		Date staDat = DateUtil.parse(DateUtil.getCurrentTime());
		Date endDat = null;
		int impDur = 0;
		int totalCount = 0;
		int avlidCount = 0;
		int inavlidCount = 0;
		int holdCount = 0;

		AppUser userId = ContextUtil.getCurrentUser();

		// obCalllist = ObCalllistService.getObCalllistById(calllistId);

		Map filefVsColumn = new HashMap();// 列名与列编号对应表
		Workbook wb = null;// 文件workbook
		int intRows = 0;// 行数
		int intColumns = 0;// 列数

		// FtpBase ftpBase=(FtpBase)ContainerManager.getComponent("ftpBase");
		// String uploadFold = ftpBase.getCalllistImpRealPath();
		String uploadFold = System.getProperty("user.dir");

		File file = new File(uploadFold, fileFileName);
		String excelFilePath = file.toString();
		try {
			FileInputStream excelFile = new FileInputStream(excelFilePath);
			if (excelFile != null) {
				// wb = Workbook.getWorkbook(excelFile);
				wb = new HSSFWorkbook(excelFile);
				if (wb != null) {
					// Sheet[] sheet = wb.getSheets();
					// if ((sheet != null) && (sheet.length > 0)) {
					// for (int ss = 0; ss < 1; ++ss) {//只读取第一页
					Sheet sheet = wb.getSheetAt(0);
					filefVsColumn.clear();

					intRows = sheet.getLastRowNum() + 1;// 行数
					intColumns = sheet.getRow(0).getLastCellNum();// 列数
					System.out.println("@@@@@@@@@@intRows" + intRows
							+ "$$$$$$$$$$$$$$$intColumns" + intColumns);
					// if ((intRows <= 0) || (intColumns <= 0))
					// continue;

					for (int i = 0; i < intColumns; i++) {
						Cell cell = sheet.getRow(0).getCell(i);
						String columnName = cell.getStringCellValue();
						if (filefVsDbfMap.containsKey(String.valueOf(i + 1))) {
							filefVsColumn.put(columnName, i + 1);// 列名与列号关系
						}
					}

					// for (int col = 0; col < intColumns; ++col)
					// {//读取第一行,解析列名与列编号的关系
					// String columnName = sheet[ss].getCell(col,
					// 0).getContents();
					// if(filefVsDbfMap.containsKey(columnName)){
					// filefVsColumn.put(columnName, col);//列名与列号关系
					// }
					// }

					String[] tempCusAliIds = new String[intRows - 1];// 存储名单主键,以判断是否重复
					// if (this.titleCol[2] != -1)
					// {
					// String contentOfCell2;
					// for (int row = 1; row < intRows; ++row) {
					// contentOfCell2 = sheet[ss].getCell(this.titleCol[2],
					// row).getContents().trim();
					// if (contentOfCell2 != null)
					// tempCusAliIds[(row - 1)] = contentOfCell2;
					// else tempCusAliIds[(row - 1)] = " ";
					// }
					//
					// if (repeatContentInArray(tempCusAliIds)) {
					// String message = "客户编号有重复，请检查excel文件!";
					// setRequestAttribute("REQUEST_PROMPT_INFO", message);
					// contentOfCell2 = "prompt";
					// return contentOfCell2;
					// }
					// }
					obCallbatch.setImpDur(impDur);
					obCallbatch.setTotalCount(totalCount);
					obCallbatch.setAvlidCount(avlidCount);
					obCallbatch.setInavlidCount(inavlidCount);
					obCallbatch.setHoldCount(holdCount);
					obCallbatch.setCallbatchSrcId(ObCallbatch.BATCH_SRC_LOCALFILE);
					obCallbatch.setCalllistId(calllistId);
					obCallbatch.setCallbatchStaId(ObCallbatch.FLAG_UNENABLED);
					obCallbatch.setCreDat(staDat);
					obCallbatch.setStaDat(staDat);
					obCallbatch.setUseId(userId);
					obCallbatchService.save(obCallbatch);
					
					ObCalllist obCalllist=obCallbatch.getObCalllist();
					//ObCom obCom=obCallbatch.getObCalllist().getObComs().iterator().next();;
				    ObProject project=obComService.get(Long.valueOf(comId)).getObProject();

					int colSize = filefVsColumn.size();
					String[] columnName = new String[colSize];// 列名
					int[] columnNum = new int[colSize];// 列号

					java.util.Iterator it = filefVsColumn.keySet().iterator();
					int kk = 0;
					StringBuffer sql = null;
					StringBuffer sqlInsert = new StringBuffer(
							"insert into OB_CALLBATCH_IMP_TMP(TMP_CUS_ID,CALLBATCH_ID,CRE_USE_ID,CRE_DAT,calllist_id,com_id,proj_id");

					while (it.hasNext()) {
						sqlInsert.append(",");
						columnName[kk] = (String) it.next();// 文件列名
						columnNum[kk] = Integer.parseInt(filefVsColumn.get(
								columnName[kk]).toString());// 文件列号
						sqlInsert.append(filefVsDbfMap.get(String
								.valueOf(columnNum[kk])));// 数据库字段
						kk++;
					}
					sqlInsert.append(",STA_ID,INAVAILABLE_ID)");
					Cell cell = sheet.getRow(0).getCell(0);
					String contentOfCell = "";
					StringBuffer sqlValues = null;

					// 导入条件
					// if(col1Array.length>0) col1Array=col1Array[0].split(",");
					// if(col2Array.length>0) col2Array=col2Array[0].split(",");
					// if(col3Array.length>0) col3Array=col3Array[0].split(",");
					//                  
					// Map map1=new HashMap();
					// for(int i=0;i<col1Array.length;i++) {
					// Map map2=new HashMap();
					// map2.put(col2Array[i], col3Array[i]);
					// if(filefVsDbfMap.containsValue(col1Array[i]))
					//                		  
					// map1.put(col1Array[i], map2);
					// }

					for (int row = 1; row < intRows; ++row) {// 逐行读取
						// if(row%10==1) {
						// tmpCusId =
						// com.unihub.core.persistence.idbroker.IdGeneratorFactory.getIdGenerator("ob_callbatch_imp_tmp").nextLongValue();
						// tmpCusId = Long.valueOf(UUIDGenerator.getUUID());
						// }else {
						// tmpCusId ++;
						// }

						sqlValues = new StringBuffer(" values(").append(
								"SEQ_OB_CALLBATCH_IMP_TMP_ID.nextval").append(
								",").append(obCallbatch.getCallbatchId())
								.append(",").append(userId.getUserId()).append(",").append(
										"to_date('"
												+ DateUtil
														.getFormatTime(staDat)
												+ "','yyyy-mm-dd hh24:mi:ss')").
												append(","+obCalllist.getCalllistId())
												.append(","+comId)
												.append(","+project.getProjId());
						int nullCol = 0;

						for (int icol = 0; icol < colSize; icol++) {// 读取需要的列
							sqlValues.append(",");

							cell = sheet.getRow(row).getCell(
									columnNum[icol] - 1); // 格子
							if (cell != null) {
								if (cell.getCellType() == 0) {
									contentOfCell = String.valueOf(cell
											.getNumericCellValue());
									if(contentOfCell.indexOf(".")>0){
										if(contentOfCell.indexOf("E")>0) {
											contentOfCell=contentOfCell.substring(0, contentOfCell.indexOf("."))+contentOfCell.substring(contentOfCell.indexOf(".")+1, contentOfCell.indexOf("E")) ;   
										} else {
											contentOfCell=contentOfCell.substring(0, contentOfCell.indexOf("."));
										}
									}
								} else {
									contentOfCell = cell.getStringCellValue();
								}
							}
							if (contentOfCell == null
									|| contentOfCell.trim().length() == 0) {
								sqlValues.append("null");
								nullCol++;
							} else {
								sqlValues.append("'").append(contentOfCell)
										.append("'");
							}
						}
						if (nullCol == colSize)
							break;// 遇到列全部为空的行 说明已经读取完毕
						totalCount++;// 总行数

						// 将临时表中的数据根据过滤规则处理，分为有效和无效的数据
						// sqlValues.append(",").append(CommonTokens.CALLBATCH_IMP_TMP_STA_AVALABLE).append(",null");
						sqlValues.append(",").append(ObCallbatchImpTmp.CALLBATCH_IMP_TMP_STA_AVALABLE).append(",null");
						sql = new StringBuffer(sqlInsert).append(sqlValues)
								.append(")");
//						System.out
//								.println("**************sql.toString()**********"
//										+ sql.toString());
						obCalllistService.execJdbcUpdate(sql.toString());// 执行写入操作

						avlidCount++;// 有效的名单数

					}

					inavlidCount = totalCount - avlidCount;

					// 将名单临时表中有效的记录批量转入客户表--放在批次启用时调用
					//obCalllistService.transfterCusTmp2Customer(obCallbatch);

					// 回写名单批次表的相关统计信息
					endDat = DateUtil.parse(DateUtil.getCurrentTime());
					impDur = getTimeDur(DateUtil.getFormatTime(staDat),
							DateUtil.getFormatTime(endDat));
					holdCount = avlidCount;

					obCallbatch.setEndDat(endDat);
					obCallbatch.setImpDur(impDur);
					obCallbatch.setTotalCount(totalCount);
					obCallbatch.setAvlidCount(avlidCount);
					obCallbatch.setInavlidCount(inavlidCount);
					obCallbatch.setHoldCount(holdCount);
					obCallbatch.setCallbatchStaId(ObCallbatch.FLAG_UNENABLED);
					obCallbatchService.merge(obCallbatch);
					// }
					//
					// }

				}

			}

			File f = new File(excelFilePath);
			if (f != null)
				f.delete();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (wb != null) {
				// wb.close();
			}
		}
		StringBuffer sb=new StringBuffer("{success:true,'staDat':'");
        sb.append(DateUtil.getFormatTime(obCallbatch.getStaDat())).append("',");
        sb.append("'endDat':'").append(DateUtil.getFormatTime(obCallbatch.getEndDat())).append("',");
        sb.append("'impDur':'").append(obCallbatch.getImpDur()).append("',");
        sb.append("'toltalCount':'").append(obCallbatch.getTotalCount()).append("',");
        sb.append("'avlidCount':'").append(obCallbatch.getAvlidCount()).append("',");
        sb.append("'inavlidCount':'").append(obCallbatch.getInavlidCount()).append("'}");
        return sb.toString();  		
	}

	public static int getTimeDur(String beginTime, String endTime) {
		int interval = 0;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date beginDateTime = sdf.parse(beginTime);
			// 将截取到的时间字符串转化为时间格式的字符串
			Date endDateTime = sdf.parse(endTime);
			// 默认为毫秒，除以1000是为了转换成秒
			interval = (int) (endDateTime.getTime() - beginDateTime.getTime()) / 1000;// 秒
			// long day=interval/(24*3600);//天
			// long hour=interval%(24*3600)/3600;//小时
			// long minute=interval%3600/60;//分钟
			// long second=interval%60;//秒
			// System.out.println("两个时间相差："+day+"天"+hour+"小时"+minute+"分"+second+"秒");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return interval;
	}

	public ObCallbatch getObCallbatch() {
		return obCallbatch;
	}

	public void setObCallbatch(ObCallbatch obCallbatch) {
		this.obCallbatch = obCallbatch;
	}
	
	public String doChouqu() throws Exception{
		Date staDat = DateUtil.parse(DateUtil.getCurrentTime());
		AppUser userId = ContextUtil.getCurrentUser();
		String targetTypeFlag=getRequest().getParameter("targetTypeFlag");
		String fromCallbatchId=getRequest().getParameter("fromCallbatchId");
		ObCallbatch fromCallbatch=obCallbatchService.get(Long.valueOf(fromCallbatchId));
		if(targetTypeFlag.equals("0")) {
			Long calllistId=Long.valueOf(getRequest().getParameter("calllistId"));
			String callbatchNam=getRequest().getParameter("callbatchNam");
			String district=getRequest().getParameter("district");
			String remark=getRequest().getParameter("remark");
			ObCallbatch obCallbatch=new ObCallbatch();
			obCallbatch.setCalllistId(calllistId);
			obCallbatch.setCallbatchNam(callbatchNam);
			obCallbatch.setCallbatchRegion(district);
			obCallbatch.setCallbatchDes(remark);
			obCallbatch.setCallbatchTypId(ObCallbatch.BATCH_TYPE_CALLLIST);
			obCallbatch.setCallbatchSrcId(ObCallbatch.BATCH_SRC_CHOUQU);
			obCallbatch.setTotalCount(0);
			obCallbatch.setAvlidCount(0);
			obCallbatch.setInavlidCount(0);
			obCallbatch.setHoldCount(0);
			obCallbatch.setCallbatchStaId(ObCallbatch.FLAG_ENABLED);
			obCallbatch.setCreDat(staDat);
			obCallbatch.setStaDat(staDat);
			obCallbatch.setEndDat(staDat);
			obCallbatch.setUseId(userId);			
			obCallbatchService.save(obCallbatch);	
			Long toCallbatchId=obCallbatch.getCallbatchId();
		    finishChouqu(fromCallbatch,toCallbatchId);
		} else if(targetTypeFlag.equals("1")) {
			String callbatchIdYiYou=getRequest().getParameter("callbatchIdYiYou");
			finishChouqu(fromCallbatch,Long.valueOf(callbatchIdYiYou));
			
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public void finishChouqu(ObCallbatch fromCallbatch,Long toCallbatchId) throws Exception{
		
//		QueryFilter filter = new QueryFilter(getRequest());
//		filter.addFilter("Q_callbatchId_L_EQ", fromCallbatch.getCallbatchId().toString());
//		List<ObCallbatchCus> callbatchCuss = obCallbatchCusService.getAll(filter);
		String staDat = (DateUtil.getCurrentTime());
		AppUser userId = ContextUtil.getCurrentUser();		
		ObCallbatch toCallbatch=obCallbatchService.get(toCallbatchId);
	    //处理抽取条件
	    String whereSql="";
	    String assignIFGrid=getRequest().getParameter("assignIFGrid");
	    if(assignIFGrid!=null&&!assignIFGrid.equals("")) {
	    	whereSql=obCalllistService.getWhereSql(assignIFGrid);
	    }
	    
	    
	    int callbatchCussCount=obCalllistService.finishChouqu(whereSql,fromCallbatch.getCallbatchId(),toCallbatchId,staDat);
/*	    
		List<ObCallbatchCus> callbatchCuss = obCallbatchCusService.listCusByCallbatch(fromCallbatch.getCallbatchId(),whereSql);
		if(callbatchCuss!=null&&callbatchCuss.size()>0) {
			int callbatchCussCount=callbatchCuss.size();
			for(ObCallbatchCus obCallbatchCus:callbatchCuss) {
				if(obCallbatchCus.getCallbatchAssId()!=null) {
					ObCallbatchAss ass=obCallbatchAssService.get(obCallbatchCus.getCallbatchAssId());
					ass.setRetriveCount(ass.getRetriveCount()+1);
					ass.setHoldCount(ass.getHoldCount()-1);
					ass.setRetriveCountAdmin(ass.getRetriveCountAdmin()+1);
					obCallbatchAssService.merge(ass);	
				}
				
				QueryFilter filterConCalllist = new QueryFilter(getRequest());
				filterConCalllist.addFilter("Q_customerId_L_EQ", obCallbatchCus.getCusId().toString());
				filterConCalllist.addFilter("Q_obCallbatch.callbatchId_L_EQ", fromCallbatch.getCallbatchId().toString());
				List<ObConCalllist> conCalllists = obConCalllistService.getAll(filterConCalllist);
				if(conCalllists!=null&&conCalllists.size()>0) {
					ObConCalllist obConCalllist=conCalllists.get(0);
					obConCalllist.setObCallbatch(toCallbatch);
					obConCalllist.setCreDat(staDat);
					obConCalllistService.merge(obConCalllist);
				}
				
				obCallbatchCus.setAssStaId(Short.valueOf(ObCallbatchCus.OB_CALLBATCH_CUS_STA_UNASSIGN));//未分配
				obCallbatchCus.setAssStepId(null);//步骤为空
				obCallbatchCus.setCallbatchAssId(null);
				obCallbatchCus.setFromUseId(null);
				obCallbatchCus.setToUseId(null);
				obCallbatchCus.setCallbatchId(toCallbatchId);
				obCallbatchCusService.merge(obCallbatchCus);
				
			}
			
//			QueryFilter assByCallbatch = new QueryFilter(getRequest());
//			assByCallbatch.addFilter("Q_obCallbatch.callbatchId_L_EQ", fromCallbatch.getCallbatchId().toString());
//			List<ObCallbatchAss> asss = obCallbatchAssService.getAll(assByCallbatch);	
//			int holdCounts=0;
//			if(asss!=null&&asss.size()>0) {
//				for(ObCallbatchAss ass:asss) {
//					holdCounts+=ass.getHoldCount();
//				}
//			}
			
			fromCallbatch.setAvlidCount(fromCallbatch.getAvlidCount()-callbatchCussCount);
			obCallbatchService.merge(fromCallbatch);
//			fromCallbatch.setHoldCount(fromCallbatch.getAvlidCount()-holdCounts);
			fromCallbatch.setHoldCount(fromCallbatch.getHoldCount()-callbatchCussCount);
			obCallbatchService.merge(fromCallbatch);
			
			toCallbatch.setHoldCount(toCallbatch.getHoldCount()+callbatchCussCount);
			toCallbatch.setTotalCount(toCallbatch.getTotalCount()+callbatchCussCount);
			toCallbatch.setAvlidCount(toCallbatch.getAvlidCount()+callbatchCussCount);
			toCallbatch.setInavlidCount(toCallbatch.getTotalCount()-toCallbatch.getAvlidCount());
			obCallbatchService.merge(toCallbatch);	
		}
 */	
	    if(callbatchCussCount>0) {
	    	
	    	int holdAssCount=obCalllistService.getHoldAssCount(fromCallbatch.getCallbatchId());

			fromCallbatch.setAvlidCount(fromCallbatch.getAvlidCount()-callbatchCussCount);
//			obCallbatchService.merge(fromCallbatch);
//			fromCallbatch.setHoldCount(fromCallbatch.getAvlidCount()-holdCounts);

			fromCallbatch.setHoldCount(fromCallbatch.getAvlidCount()-holdAssCount);
			obCallbatchService.merge(fromCallbatch);	    	
	    	
			toCallbatch.setHoldCount(toCallbatch.getHoldCount()+callbatchCussCount);
			toCallbatch.setTotalCount(toCallbatch.getTotalCount()+callbatchCussCount);
			toCallbatch.setAvlidCount(toCallbatch.getAvlidCount()+callbatchCussCount);
			toCallbatch.setInavlidCount(toCallbatch.getTotalCount()-toCallbatch.getAvlidCount());
			obCallbatchService.merge(toCallbatch);	
	    	
	    }
	    
		ObCallbatchExtract obCallbatchExtract=new ObCallbatchExtract();
		obCallbatchExtract.setFromObCallbatch(fromCallbatch);
		obCallbatchExtract.setToObCallbatch(toCallbatch);
		obCallbatchExtract.setStaDat(DateUtil.parse(staDat));
		obCallbatchExtract.setUser(userId);
		obCallbatchExtractService.save(obCallbatchExtract);
		
	}
	//判断呼叫名单是否有效
	public String checkCalllist() {
		String calllistId=getRequest().getParameter("calllistId");
		ObCalllist obCalllist=obCalllistService.get(Long.valueOf(calllistId));
		if(ObCalllist.VALID.equals(obCalllist.getCalllistStaId())) {
			jsonString="{success:true}";
			return SUCCESS;
		} else {
			jsonString="{success:false}";
			return SUCCESS;			
		}		
	}

}
