package com.ulane.callout.action.outb;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.util.json.JSONArray;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.service.customer.ProductService;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.base.model.xitong.UlEmployee;
import com.ulane.base.model.xitong.UlUsergroup;
import com.ulane.base.service.xitong.UlDepartmentService;
import com.ulane.base.service.xitong.UlEmployeeService;
import com.ulane.base.service.xitong.UlUsergroupService;
import com.ulane.callout.model.outb.ObCalllist;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObComPap;
import com.ulane.callout.model.outb.ObComProduct;
import com.ulane.callout.model.outb.ObComSalerul;
import com.ulane.callout.model.outb.ObComScr;
import com.ulane.callout.model.outb.ObProjExecType;
import com.ulane.callout.model.outb.ObProject;
import com.ulane.callout.service.outb.ObCalllistService;
import com.ulane.callout.service.outb.ObComPapService;
import com.ulane.callout.service.outb.ObComProductService;
import com.ulane.callout.service.outb.ObComSalerulService;
import com.ulane.callout.service.outb.ObComScrService;
import com.ulane.callout.service.outb.ObComService;
import com.ulane.callout.service.outb.ObProjExecTypeService;
import com.ulane.callout.service.outb.ObProjectService;
import com.ulane.running.service.comtech.CtScrTemplateService;
import com.ulane.running.service.pap.PapReleaseService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class ObComAction extends BaseAction {
	@Resource
	private ObComService obComService;
	@Resource
	private ObProjectService obProjectService;
	@Resource
	private ObCalllistService obCalllistService;
	@Resource
	private ProductService productService;
	@Resource
	private CtScrTemplateService ctScrTemplateService;
	@Resource
	private PapReleaseService papReleaseService;
	@Resource
	private UlUsergroupService ulUsergroupService;
	@Resource
	private UlEmployeeService ulEmployeeService;
	@Resource
	private UlDepartmentService ulDepartmentService;
	@Resource
	private ObComPapService obComPapService;
	@Resource
	private ObComScrService obComScrService;
	@Resource
	private ObComSalerulService obComSalerulService;
	@Resource
	private ObComProductService obComProductService;
	@Resource
	private ObProjExecTypeService obProjExecTypeService;

	private ObCom obCom;

	private Long comId;

	public Long getComId() {
		return comId;
	}

	public void setComId(Long comId) {
		this.comId = comId;
	}

	public ObCom getObCom() {
		return obCom;
	}

	public void setObCom(ObCom obCom) {
		this.obCom = obCom;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("staDat", "desc");
		List<ObCom> list = obComService.getAll(filter);
		// 查询执行人名称
		for (ObCom o : list) {
			//负责人名称
			if (o.getPerIncharge() != null && !("").equals(o.getPerIncharge())) {
				UlEmployee ulEmployee = ulEmployeeService.get(new Long(o
						.getPerIncharge()));
				if(ulEmployee!=null ){
				o.setPerInchargeNam(ulEmployee.getFullname()+"("+ulEmployee.getUserNo()+")");
				}
			}
			//项目名称
			if (o.getProjId() != null && !("").equals(o.getProjId())) {
				ObProject obProject = obProjectService.get(new Long(o.getProjId()));
			    o.setProjectNam(obProject.getProjNam());
			}
			    //业务类型
//				o.setYeWuLeiXing(o.getObComBizTypeTree().getNodeName());
		}
		Type type = new TypeToken<List<ObCom>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		buff.append(jsonSer.serialize(list));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}
	
	/**
	 * 查询活动：1.当前登录坐席所在的用户组下的活动。2.除了“未启用”的活动
	 */
	public String listFilter() {
		String busiTypNode = getRequest().getParameter("obCom.busiTypId");
		String comStaId = getRequest().getParameter("Q_obComStaId_L_EQ");
		Map<String,String> param = new HashMap<String,String>();
		param.put("busiTypNode", busiTypNode);						//活动类型
		param.put("comStaId", comStaId);							//活动状态
		
		QueryFilter filter = new QueryFilter(getRequest());
		PagingBean pagBean = filter.getPagingBean();
		String result = obComService.queryFilterObComs(pagBean,param);
		setJsonString(result);
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {

		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				ObComScr scr=new ObComScr();
				ObCom obcom=obComService.get(new Long(id));
				//删除活动绑定话术
				for(ObComScr scrs:obcom.getObComScr()){
					if(scrs!=null){
					 obComScrService.remove(scrs);
					}
				}
				//删除活动绑定问卷
				for(ObComPap paps:obcom.getObComPap()){
					if(paps!=null){
					obComPapService.remove(paps);
					}
				}
				//删除活动绑定产品
				for(ObComProduct product:obcom.getObComProduct()){
					if(product!=null){
					obComProductService.remove(product);
					}
				}
				//删除活动绑定规则
				for(ObComSalerul obComSalerul:obcom.getObComSalerul()){
					if(obComSalerul!=null){
						obComSalerulService.remove(obComSalerul);
					}
				}
				obComService.remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 批量启用活动
	 * 
	 * @return
	 */
	public String qiYongHuoDong() {
		String[] ids = getRequest().getParameterValues("ids");
		SimpleDateFormat   sdf   =   new   SimpleDateFormat( "yyyy-MM-dd"); 
		try {
		if (ids != null) {
			Long zt = 2l;//执行中
			for (String id : ids) {
				try {
					obCom = obComService.get(new Long(id));
					Date date1=new Date();
					Date stadate=obCom.getStaDat();
					Date enddate=obCom.getEndDat();
					date1= sdf.parse(sdf.format(new Date()));
					if(obCom.getObComStaId()!=null){
					if(1==obCom.getObComStaId()){
						//启用时间要在活动起止时间内// test >= start && test <= end
						if((date1.equals(stadate) || date1.after(stadate)) && (date1.equals(enddate) || date1.before(enddate))){
							obCom.setObComStaId(zt);
							obCom.setStaDat(date1);
							obComService.save(obCom);
						}
					}
					}
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}
		} catch (Exception ex) {
			logger.error(ex.getMessage());
		}
		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 暂停活动
	 * 
	 * @return
	 */
	public String zanTingHuoDong() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			Long zt = 3l;// 暂停
			for (String id : ids) {
				try {
					obCom = obComService.get(new Long(id));
					obCom.setObComStaId(zt);
					obComService.save(obCom);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}
		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 恢复活动
	 * 
	 * @return
	 */
	public String huiFuHuoDong() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			Long zt = 2l;// 恢复
			for (String id : ids) {
				try {
					obCom = obComService.get(new Long(id));
					obCom.setObComStaId(zt);
					obComService.save(obCom);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 注销活动
	 * @return
	 */
	public String zhuXiaoHuoDong() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			Long zt = 6l;// 注销
			for (String id : ids) {
				try {
					obCom = obComService.get(new Long(id));
					obCom.setObComStaId(zt);
					obComService.save(obCom);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	/**
	 * 注销名单
	 * 
	 * @return
	 */
	public String zhuXiaoCallNamHuoDong() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			Long zt = 5l;// 恢复obCalllists
			for (String id : ids) {
				try {
					obCom = obComService.get(new Long(id));
					obCom.setObComStaId(zt);
					obComService.save(obCom);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
			}
		}
		jsonString = "{success:true}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		ObCom obCom = obComService.get(comId);
		UlDepartment ulDepartment = new UlDepartment();
		UlEmployee ulEmployee = new UlEmployee();
		if (!"".equals(obCom.getOwnerTeam()) && obCom.getOwnerTeam() != null) {
			ulDepartment = ulDepartmentService.get(obCom.getOwnerTeam());
			obCom.setOwnerTeamNam(ulDepartment.getDepname());
		}
		if (!"".equals(obCom.getPerIncharge())
				&& obCom.getPerIncharge() != null) {
			ulEmployee = ulEmployeeService.get(obCom.getPerIncharge());
			obCom.setPerInchargeNam(ulEmployee.getFullname());
		}
		JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
		jsonSer.transform(new DateTransformer("yyyy-MM-dd"), new String[] {
				"staDat", "endDat","obProject.staDat","obProject.endDat" });
		StringBuffer buff = new StringBuffer("{success:true,").append("data:");
		buff.append(jsonSer.serialize(obCom));
		buff.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}
	/**
	 * 项目绑定的执行方式
	 * @author lzm
	 */
	public String loadKeyZhiXingFangShi() {
		// 项目id
		String projId = getRequest().getParameter("projId");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_obProject.projId_L_EQ", projId);
		List<ObProjExecType> list = obProjExecTypeService.getAll(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (ObProjExecType type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getProjExecTypeId()).append("','")
					.append(type.getProjectZxfs()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		//活动状态
		String status = getRequest().getParameter("status");
		//规则
		String rulkeys = getRequest().getParameter("rulkeys");
		String rulvalues = getRequest().getParameter("rulvalues");
		String rulids = getRequest().getParameter("rulids");
		// 业务类型
		String ywlx = getRequest().getParameter("ywlx");
		// 名单id
		String calllistId = getRequest().getParameter("pid");
		// 项目id
		String projId = getRequest().getParameter("projId");
		// 负责人id
		String perIncharge = getRequest().getParameter("perIncharge");
		// 产品id
		String productids = getRequest().getParameter("productids");
		// 话术id
		String ctscrids = getRequest().getParameter("ctscr");
		// 问卷id
		String paprelease = getRequest().getParameter("paprelease");
		// 执行人id
		String usergroupids = getRequest().getParameter("usergroupids");
		// 组织机构id
		String ownerTeam = getRequest().getParameter("ownerTeam");
		String[] str = calllistId.split(",");
		String[] productid = productids.split(",");
		String[] ctscrid = ctscrids.split(",");
		String[] papreleaseid = paprelease.split(",");
		String[] usergroupid = usergroupids.split(",");
		String[] rulkey=rulkeys.split(",");
		String[] rulvalue=rulvalues.split(",");
        String []ruleid=rulids.split(",");
		if (obCom.getComId() == null) {
			try {
				Long zt = 1l; // 自定义状态
				obCom.setObComStaId(zt);
				// 绑定业务类型
				if(ywlx!=null || !"".equals(ywlx)){
				obCom.setBusiTypId(new Long(ywlx));
//					ObComBizTypeTree biz = obBizTypeTreeService.get(new Long(ywlx));
//					obCom.setObComBizTypeTree(biz);
				}
//	
					
				// 绑定执行人
				if (perIncharge != null && !"".equals(perIncharge)) {
					UlEmployee ulEmployee = ulEmployeeService.get(new Long(
							perIncharge));
					obCom.setPerIncharge(ulEmployee.getUseid());
					obCom.setPerInchargeNam(ulEmployee.getFullname());
				}
				// 绑定组织机构
				if (ownerTeam != null && !"".equals(ownerTeam)) {
					UlDepartment ulDepartment = ulDepartmentService
							.get(new Long(ownerTeam));
					obCom.setOwnerTeamNam(ulDepartment.getDepname());
					obCom.setOwnerTeam(ulDepartment.getDepid());
				}
				// 绑定项目
				if (projId != null && !"".equals(projId)) {
					ObProject obProject = obProjectService
							.get(new Long(projId));
					obCom.setObProject(obProject);
				}
				// 绑定名单
				if (str.length >= 1) {
					for (String callid : str) {
						if (callid != null && !"".equals(callid)) {
							ObCalllist obCalllist = obCalllistService
									.get(new Long(callid));
							if (null != obCalllist.getOwnerTeam()
									&& !"".equals(obCalllist.getOwnerTeam())) {
								UlDepartment ulDepartment = ulDepartmentService
										.get(new Long(obCalllist.getOwnerTeam()));
								obCalllist.setOwnerTeamName(ulDepartment
										.getDepname());
								obCom.getObCalllists().add(obCalllist);
							}
						}
					}
				}
				// 绑定执行人
				if (usergroupid.length >= 1) {
					for (String usergroup : usergroupid) {
						if (usergroup != null && !"".equals(usergroup)) {
							UlUsergroup ulUsergroup = ulUsergroupService
									.get(new Long(usergroup));
							obCom.getUlUsergroups().add(ulUsergroup);
						}
					}
				}
				ObCom oc=obComService.save(obCom);
				//绑定规则
				if(rulkeys.length()>=1){
					if(rulkey.length==rulvalue.length){
						for(int i=0;i<rulkey.length;i++){
							ObComSalerul rulv=new ObComSalerul();
							rulv.setComId(oc.getComId());
							rulv.setRulTypeId(Long.parseLong(rulkey[i]));
							if(rulkey[i]=="0"){
							String[] times=rulvalue[i].split("-");
							for(int j=0;j<=times.length;j++){
								rulv.setRulValMin(times[0]);
								rulv.setRulValMax(times[1]);
							}
							}
							rulv.setRulValMax(rulvalue[i]);
							rulv=obComSalerulService.save(rulv);
							oc.getObComSalerul().add(rulv);
						}
						}
				}

				// 绑定问卷
				if (papreleaseid.length >= 1) {
					for (String papreleas : papreleaseid) {
						if (papreleas != null && !"".equals(papreleas)) {
							ObComPap obcompap=new ObComPap();
							obcompap.setPapId(new Long(papreleas));
							//问卷有效状态1ObComPap.STATUS_STAR
							obcompap.setStatus(1l);
							obcompap.setComId(oc.getComId());
							ObComPap ss=obComPapService.save(obcompap);
							oc.getObComPap().add(ss);
						}
					}
				}
				// 绑定产品
				if (productid.length >= 1) {
					for (String prodcut : productid) {
						if (prodcut != null && !"".equals(prodcut)) {
							ObComProduct obcomproduct=new ObComProduct();
							obcomproduct.setGoodsId(new Long(prodcut));
							obcomproduct.setStatus(1l);// 产品有效状态
							obcomproduct.setComId(oc.getComId());
							ObComProduct pro=obComProductService.save(obcomproduct);
							oc.getObComProduct().add(pro);
						}
					}
				}
				// 绑定话术
				if (ctscrid.length >= 1) {
					for (String ctscr : ctscrid) {
						if (ctscr != null && !"".equals(ctscr)) {
							ObComScr obcomscr=new ObComScr();
							obcomscr.setTmpId(new Long(ctscr));
							//话术问有效状态1ObComPap.STATUS_STAR
							obcomscr.setStatus(1l);
							obcomscr.setComId(oc.getComId());
							ObComScr scr=obComScrService.save(obcomscr);
							oc.getObComScr().add(scr);
						}
					}
				}
				 obComService.save(oc);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		} else {
			try {
				ObCom orgObCom = obComService.get(obCom.getComId());
				if(status!=null){
					orgObCom.setObComStaId( Long.parseLong(status));
				}
				orgObCom.setBusiTypId(new Long(ywlx));
//				// 绑定业务类型
//				ObComBizTypeTree biz = obBizTypeTreeService.get(new Long(ywlx));
//				orgObCom.setObComBizTypeTree(biz);

				// 绑定项目
				if (projId != null || !"".equals(projId)) {
					ObProject obProject = obProjectService
							.get(new Long(projId));
					orgObCom.setObProject(obProject);
				}
				// 绑定组织机构
				if (ownerTeam != null && !"".equals(ownerTeam)) {
					UlDepartment ulDepartment = ulDepartmentService
							.get(new Long(ownerTeam));
					orgObCom.setOwnerTeamNam(ulDepartment.getDepname());
					orgObCom.setOwnerTeam(ulDepartment.getDepid());
				}
				// 绑定执行人
				if (perIncharge != null && !"".equals(perIncharge)) {
					UlEmployee ulEmployee = ulEmployeeService.get(new Long(
							perIncharge));
					orgObCom.setPerIncharge(ulEmployee.getUseid());
					orgObCom.setPerInchargeNam(ulEmployee.getFullname());
				}
				ObCalllist obCalllist = new ObCalllist();
				// 绑定名单
				if (str.length >= 1) {
					for (String callid : str) {
						if (callid != null && "" != callid) {
							obCalllist = obCalllistService
									.get(new Long(callid));
							if (null != obCalllist.getOwnerTeam()
									&& !"".equals(obCalllist.getOwnerTeam())) {
								UlDepartment department = ulDepartmentService
										.get(obCalllist.getOwnerTeam());
								obCalllist.setOwnerTeamName(department
										.getDepname());
								orgObCom.getObCalllists().add(obCalllist);
							}
						}
					}
				}
				// 绑定产品
				if (productid.length >= 1) {
					for (String prodcut : productid) {
						if (prodcut != null && "" != prodcut) {
							ObComProduct obcomproduct=new ObComProduct();
							obcomproduct.setGoodsId(new Long(prodcut));
							obcomproduct.setStatus(1l);// 产品有效状态
							obcomproduct.setComId(orgObCom.getComId());
							ObComProduct pro=obComProductService.save(obcomproduct);
							orgObCom.getObComProduct().add(pro);
						}
					}
				}
				// 绑定话术
				if (str.length >= 1) {
					for (String ctscr : ctscrid) {
						if (ctscr != null && "" != ctscr) {
							ObComScr obcomscr=new ObComScr();
							obcomscr.setTmpId(new Long(ctscr));
							//话术问有效状态1ObComPap.STATUS_STAR
							obcomscr.setStatus(1l);
							obcomscr.setComId(orgObCom.getComId());
							ObComScr scr=obComScrService.save(obcomscr);
							orgObCom.getObComScr().add(scr);
						}
					}
				}

				// 绑定问卷
				if (papreleaseid.length >= 1) {
					for (String papreleas : papreleaseid) {
						if (papreleas != null && !"".equals(papreleas)) {
							ObComPap obcompap=new ObComPap();
							obcompap.setPapId(new Long(papreleas));
							//问卷注销状态1ObComPap.STATUS_STAR
							obcompap.setStatus(1l);
							obcompap.setComId(orgObCom.getComId());
							ObComPap obcomsta=obComPapService.save(obcompap);
							orgObCom.getObComPap().add(obcomsta);
						}
					}
				}
				//删除已绑定规则
				if(rulids.length()>=1){
					if(ruleid.length==rulvalue.length){
						for(String rulid:ruleid){
							if(!("undefined").equals(rulid)){
							obComSalerulService.remove(new Long(rulid));
							}
						}
					}
				}
				//绑定规则
				if(rulkeys.length()>=1){
					if(rulkey.length==rulvalue.length){
						for(int i=0;i<rulkey.length;i++){
							ObComSalerul rulv=new ObComSalerul();
							rulv.setComId(orgObCom.getComId());
							rulv.setRulTypeId(Long.parseLong(rulkey[i]));
							if(rulkey[i]=="0"){
								String[] times=rulvalue[i].split("-");
								for(int j=0;j<=times.length;j++){
									rulv.setRulValMin(times[0]);
									rulv.setRulValMax(times[1]);
								}
								}
							rulv.setRulValMax(rulvalue[i]);
							rulv=obComSalerulService.save(rulv);
							obCom.getObComSalerul().add(rulv);
						}
						}
				}

				// 绑定执行人
				if (usergroupid.length >= 1) {
					for (String usergroup : usergroupid) {
						if (usergroup != null && !"".equals(usergroup)) {
							UlUsergroup ulUsergroup =new UlUsergroup();
							ulUsergroup=ulUsergroupService
									.get(new Long(usergroup));
							obCom.getUlUsergroups().add(ulUsergroup);
						}
					}
				}
				BeanUtil.copyNotNullProperties(orgObCom, obCom);
				obComService.merge(orgObCom);

			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}
	
	/**
	 * 根据活动，获取活动下的规则信息
	 * @return
	 */
	public String getComRual() {
		String comId = getRequest().getParameter("comId");
		ObCom obCom = obComService.get(Long.parseLong(comId));
		Set<ObComSalerul> setRul = obCom.getObComSalerul();
		List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
		for(ObComSalerul rul : setRul) {
			HashMap<String,String> row = new HashMap<String,String>();
			Long rulTypeId = rul.getRulTypeId();
			if(ObComSalerul.TYPE_MAX_NUM.equals(rulTypeId)) {
				row.put("maxNumDia", rul.getRulValMax());
			} else if(ObComSalerul.TYPE_MAX_SPACE.equals(rulTypeId)) {
				row.put("maxSpace", rul.getRulValMax());
			} else if(ObComSalerul.TYPE_TIME.equals(rulTypeId)) {
				//拨打时间段可能会有多个
				row.put("timeBetween", rul.getRulValMax());
			}
			result.add(row);
		}
		JSONArray json = new JSONArray(result);
		setJsonString(json.toString());
		return SUCCESS;
	}
}
