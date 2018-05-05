package com.ulane.monitor.action.unim;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.monitor.model.unim.UnimCategory;
import com.ulane.monitor.model.unim.UnimThrLevlDTO;
import com.ulane.monitor.model.unim.UnimThrlevl;
import com.ulane.monitor.service.unim.UnimCategoryService;
import com.ulane.monitor.service.unim.UnimThrlevlService;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class UnimThrlevlAction extends BaseAction {
	@Resource
	private UnimThrlevlService unimThrlevlService;
	@Resource
	private UnimCategoryService unimCategoryService;

	private UnimThrlevl unimThrlevl;

	private Long thrlevlId;

	public Long getThrlevlId() {
		return thrlevlId;
	}

	public void setThrlevlId(Long thrlevlId) {
		this.thrlevlId = thrlevlId;
	}

	public UnimThrlevl getUnimThrlevl() {
		return unimThrlevl;
	}

	public void setUnimThrlevl(UnimThrlevl unimThrlevl) {
		this.unimThrlevl = unimThrlevl;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filterstatus = new QueryFilter(getRequest());
		QueryFilter filterfazhi = new QueryFilter(getRequest());
		List<UnimThrlevl> list = unimThrlevlService.getAll(filterfazhi);
		filterstatus.addFilter("Q_typeId_SN_EQ", "2");
		List<UnimCategory> listca = unimCategoryService.getAll(filterstatus);
		// for(UnimThrlevl levl:list){
		// if(levl.get)
		// }
		Type type = new TypeToken<List<UnimThrlevl>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filterstatus.getPagingBean().getTotalItems()).append(
						",result:");

		// JSONSerializer serializer = new JSONSerializer();
		// serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),new
		// String[] { "applyTime"});
		// buff.append(serializer.exclude(new
		// String[]{"class","conHiss","conBwListBusRuls"}).serialize(list));

		Gson gson = new Gson();
		buff.append(gson.toJson(listca, type));
		buff.append("}");

		jsonString = buff.toString();

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
				unimThrlevlService.remove(new Long(id));
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
		UnimThrlevl unimThrlevl = unimThrlevlService.get(thrlevlId);

		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(unimThrlevl));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 置空阀值操作
	 */
	public String clearFZ() {
		String[] ids = getRequest().getParameterValues("ids");
		try {
			if (ids != null) {
				for (String id : ids) {
					UnimCategory cat = unimCategoryService.get(new Long(id));
					List<UnimThrlevl> listlevl = unimThrlevlService
							.getByCatId(new Long(id));
					for(UnimThrlevl levl:listlevl){
						unimThrlevlService.remove(levl);
					}
				}
			}
			// unimCategoryService.save(cat);
		} catch (Exception ex) {
			logger.error(ex.getMessage());
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		String shi = getRequest().getParameter("shi");
		String fen = getRequest().getParameter("fen");
		String miao = getRequest().getParameter("miao");
		String catid = getRequest().getParameter("catid");
		String oneshi = getRequest().getParameter("oneshi");
		String onefen = getRequest().getParameter("onefen");
		String onemiao = getRequest().getParameter("onemiao");
		if (null == unimThrlevl.getThrlevlId()) {
			unimThrlevl.setThrlevladv(shi + "," + fen + "," + miao); // 注意阀值
			unimThrlevl.setThrlevlwar(oneshi + "," + onefen + "," + onemiao); // 警告阀值
			UnimCategory cat = unimCategoryService.get(new Long(catid));
			unimThrlevl.setUnimCategory(cat);
			unimThrlevlService.save(unimThrlevl);
		} else {
			UnimThrlevl orgUnimThrlevl = unimThrlevlService.get(unimThrlevl
					.getThrlevlId());
			try {
				BeanUtil.copyNotNullProperties(orgUnimThrlevl, unimThrlevl);
				orgUnimThrlevl.setThrlevladv(shi + "," + fen + "," + miao); // 注意阀值
				orgUnimThrlevl.setThrlevlwar(oneshi + "," + onefen + ","
						+ onemiao); // 警告阀值
				UnimCategory cat = unimCategoryService.get(new Long(catid));
				orgUnimThrlevl.setUnimCategory(cat);
				unimThrlevlService.save(orgUnimThrlevl);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;

	}

	//HTTP接口
	public void getByMonitorId() {
		try {
			//Long MonitorId = Long.valueOf(getRequest().getParameter("MonitorId"));
//			List list = unimThrlevlService.getByMonitorId(MonitorId);
//			if (list.size() == 0) {
//				List categoryList = unimCategoryService.listGetCategory(Short
//						.valueOf("2"));
//				unimThrlevlService.initThrlevl(MonitorId, categoryList);
//			}
//			list = unimThrlevlService.getByMonitorId(MonitorId);
			
			// List list2 = convert_ThrLevlDTO(list);

			List<UnimThrlevl> listThr = unimThrlevlService.getAll();
			List<UnimCategory> listca = unimCategoryService.listGetCategory(new Short("2"));//unimCategoryService.getAll();
			
			List<UnimThrLevlDTO> listDto = new ArrayList<UnimThrLevlDTO>();
			for(UnimCategory sta:listca){
				//if(sta.getTypeId()==null || !sta.getTypeId().toString().equals("2")) continue;
				//if(sta.getStatus()==null || !sta.getStatus().toString().equals(UnimCategory.STA_ENABLE.toString())) continue;
				UnimThrLevlDTO dto = new UnimThrLevlDTO();
				//状态信息
				dto.setCategoryId(sta.getCatId());
				dto.setName(sta.getCatName());
				dto.setCode(sta.getCatCode());
				dto.setAgentColor(sta.getExtend1());
				//阀值信息
				for(UnimThrlevl thr:listThr){
					if(sta.getCatId().equals(thr.getStatusId())){
						dto.setId(thr.getThrlevlId());
						dto.setThrLevlAdv(thr.getThrlevladv());
						dto.setThrLevlWar(thr.getThrlevlwar());
						break;
					}
				}
				listDto.add(dto);
			}
			
			writeToPage(Boolean.valueOf(true), "状态及阀值查询成功", listDto);
		} catch (Exception e) {
			e.printStackTrace();

			writeToPage(Boolean.valueOf(false), "操作失败，请重新操作或联系管理员", null);
		}
	}

}
