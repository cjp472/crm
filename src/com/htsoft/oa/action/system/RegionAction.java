package com.htsoft.oa.action.system;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
 */
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.Region;
import com.htsoft.oa.model.system.RegionDetail;
import com.htsoft.oa.service.system.RegionDetailService;
import com.htsoft.oa.service.system.RegionService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */
public class RegionAction extends BaseAction {
	@Resource
	private RegionService regionService;
	@Resource
	private RegionDetailService regionDetailService;
	private Region region;

	private Long regionId;

	public Long getRegionId() {
		return regionId;
	}

	public void setRegionId(Long regionId) {
		this.regionId = regionId;
	}

	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	/**
	 * 显示列表
	 */
	public String list() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" + Constants.TOP_REGION
					+ "',expanded:true,children:[");
		}
		List<Region> listParent = regionService.getProvince();// 最顶层父节点
		if (listParent != null)
			for (Region region : listParent) {
				if (region.getDelFlag().equals(Constants.FLAG_UNDELETED)) {
					buff.append("{id:'" + region.getRegionId() + "',text:'"
							+ region.getRegionName() + "',");
					buff.append(findChild(region.getRegionId()));
				}
			}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 寻找子根节点
	 */
	public String findChild(Long regionId) {
		StringBuffer buff1 = new StringBuffer("");
		List<Region> list = regionService.getChildren(regionId);
		Iterator<Region> i_list = list.iterator();
		while (i_list.hasNext()) {
			if (i_list.next().getDelFlag().equals(Constants.FLAG_DELETED))
				i_list.remove();
		}

		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (Region region2 : list) {
				buff1.append("{id:'" + region2.getRegionId() + "',text:'"
						+ region2.getRegionName() + "',");
				buff1.append(findChild(region2.getRegionId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	/**
	 * 显示当前地区的子地区
	 */
	public String list_childReg() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		String strRegionId = getRequest().getParameter("regionid");
		// 表示从上级目录开始进行查找
		String path = "0.";
		if (StringUtils.isNotEmpty(strRegionId)) {
			Long regionId = Long.parseLong(strRegionId);
			Region Region = regionService.get(regionId);
			if (Region != null) {
				path = Region.getPath();
				filter.addFilter("Q_path_S_LK", path);
			}
		}
		List<Region> list = regionService.getAll(filter);
		for (Region re : list) {// 设置父机构的名称
			Region re_parent = regionService.get(re.getParentId());
			if (re_parent != null) {
				re.setParentName(re_parent.getRegionName());
			} else {
				re.setParentName(Constants.TOP_REGION);
			}
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),
				new String[] { "appUser.accessionTime" });
		buff.append(serializer.serialize(list));

		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	public String add() {
		Long parentId = region.getParentId();
		if (region.getRegionType() != 4) {
			String regionPath = "";
			if (parentId < 1) {
				parentId = new Long(0);
				regionPath = "0.";
			} else {
				regionPath = regionService.get(parentId).getPath();
			}
			region.setDelFlag(Constants.FLAG_UNDELETED);
			regionService.save(region);
			if (region != null) {
				regionPath += region.getRegionId().toString() + ".";
				region.setPath(regionPath);
				regionService.save(region);
				setJsonString("{success:true}");
			} else {
				setJsonString("{success:false}");
			}
		} else {
			String regionPath = regionService.get(region.getParentId())
					.getPath();
			region.setDelFlag(Constants.FLAG_UNDELETED);
			RegionDetail tmp = new RegionDetail();
			tmp.setAreaNo(region.getAreaNo());
			tmp.setDelFlag(region.getDelFlag());
			tmp.setParentId(region.getParentId());
			tmp.setParentName(region.getParentName());
			tmp.setPostCode(region.getPostCode());
			tmp.setRegionName(region.getRegionName());
			tmp.setRegionType(region.getRegionType());
			regionDetailService.save(tmp);
			tmp.setPath(regionPath + "." + tmp.getRegionId().toString());
			regionDetailService.save(tmp);
		}
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
				Region r = regionService.get(Long.parseLong(id));
				if (r != null) {// 前三级的地址
					QueryFilter qf = new QueryFilter();
					qf.addFilter("Q_parentId_L_EQ", id);
					List<Region> children = regionService.getAllNoRequest(qf);
					if (children == null || children.size() == 0) {
						regionService.remove(Long.parseLong(id));
					} else {
						setJsonString("{success:false}");
						return SUCCESS;
					}
				} else {
					regionDetailService.remove(Long.parseLong(id));
					setJsonString("{success:true}");
					return SUCCESS;
				}
			}
			setJsonString("{success:true}");
		}
		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		Region region = regionService.get(regionId);

		Gson gson = new Gson();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(region));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	public String getDetail() {
		RegionDetail region = regionDetailService.get(regionId);

		Gson gson = new Gson();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(region));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		regionService.save(region);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	public String remove() {
		Long regionId = Long.parseLong(getRequest().getParameter("regionId"));
		Region r = regionService.get(regionId);
		if (r != null || regionId == 0) {// 前三级的地址
			QueryFilter qf = new QueryFilter();
			qf.addFilter("Q_parentId_L_EQ", regionId.toString());
			List<Region> children = regionService.getAllNoRequest(qf);
			if (children == null || children.size() == 0) {
				regionService.remove(regionId);
				setJsonString("{success:true}");
			} else {
				setJsonString("{success:false}");
			}
		} else {
			regionDetailService.remove(regionId);
			setJsonString("{success:true}");
		}
		return SUCCESS;
	}

	/**
	 * 显示详情
	 */
	public String detail() {
		Long regionId = Long.parseLong(getRequest().getParameter("regionId"));
		setRegion(regionService.get(regionId));
		Gson gson = new Gson();
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(gson.toJson(region));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String listDetail() {
		List<Region> list = null;
		StringBuffer buff = new StringBuffer("[");
		if (regionId == null || regionId == 0) {
			// 查出所有省份
			list = regionService.getProvince();

			for (Region province : list) {
				buff.append("['" + province.getRegionId() + "','"
						+ province.getRegionName() + "'],");
			}
		} else {
			// 根据省份ID查出该省所有市
			list = regionService.getChildren(regionId);
			if (list.size() > 0) {
				for (Region r : list) {
					buff.append("['" + r.getRegionId() + "','"
							+ r.getRegionName() + "'],");
				}
			} else {
				setRegion(regionService.get(regionId));
				buff.append("['" + region.getRegionId() + "','"
						+ region.getRegionName() + "'],");
			}
		}
		buff.deleteCharAt(buff.length() - 1);
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 显示客户省市列表
	 */
	public String listProvince() {
		List<Region> list = null;
		StringBuffer buff = new StringBuffer("[");
		if (regionId == null || regionId == 0) {
			// 查出所有省份
			Region capital = regionService.getProvince().get(0);

			// 根据省份ID查出该省所有市
			list = regionService.getChildren(capital.getRegionId());
			if (list.size() > 0) {
				for (Region r : list) {
					buff.append("['" + r.getRegionId() + "','"
							+ r.getRegionName() + "'],");
				}
			} else {
				setRegion(regionService.get(regionId));
				buff.append("['" + region.getRegionId() + "','"
						+ region.getRegionName() + "'],");
			}
		} else {
			// 根据省份ID查出该省所有市
			list = regionService.getChildren(regionId);
			if (list.size() > 0) {
				for (Region r : list) {
					buff.append("['" + r.getRegionId() + "','"
							+ r.getRegionName() + "'],");
				}
			} else {
				setRegion(regionService.get(regionId));
				buff.append("['" + region.getRegionId() + "','"
						+ region.getRegionName() + "'],");
			}
		}
		buff.deleteCharAt(buff.length() - 1);
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 以树形式展示地区数据(省份)
	 * 
	 * @return
	 */
	public String tree() {
		List<Region> listProvince;
		StringBuffer buff = new StringBuffer("[{id:'" + 0
				+ "',text:'国家',expanded:true,children:[");
		listProvince = regionService.getProvince();// 最顶层父节点
		for (Region province : listProvince) {
			buff.append("{id:'" + province.getRegionId() + "',text:'"
					+ province.getRegionName() + "',");
			buff.append(findCity(province.getRegionId()));
		}
		if (!listProvince.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 寻找子根节点(城市)
	 * 
	 * @return
	 **/

	public String findCity(Long regionId) {
		StringBuffer buff1 = new StringBuffer("");
		List<Region> listCity = regionService.getChildren(regionId);
		if (listCity.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (Region city : listCity) {
				buff1.append("{id:'" + city.getRegionId() + "',text:'"
						+ city.getRegionName() + "',leaf:true},");
				// buff1.append(findChild(city.getRegionId()));//只有两级,这句用不上
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	/**
	 * @author zhanghao
	 * @return
	 */
	public String listNew() {
		int type = Integer.parseInt(getRequest().getParameter("typeId"));
		Long parentId = Long.parseLong(getRequest().getParameter("parentId"));

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("success", true);
		QueryFilter qf = new QueryFilter();
		if (type == 3) {// 县获取乡时
			qf.addFilter("Q_parentId_L_EQ", parentId.toString());
			List<RegionDetail> list = regionDetailService.getAllNoRequest(qf);
			data.put("count", list.size());
			data.put("data", list);
		} else {
			qf.addFilter("Q_parentId_L_EQ", parentId.toString());
			List<Region> list = regionService.getAllNoRequest(qf);
			data.put("count", list.size());
			data.put("data", list);
		}

		JSONSerializer json = JsonUtil.getJSONSerializer();
		json.include("data");
		setJsonString(json.serialize(data));
		return SUCCESS;
	}

	/**
	 * 获取下级下拉框的store的二维数组
	 * 
	 * @author zhanghao
	 * @return
	 */
	public String listDetailNew() {
		if (getRequest().getParameter("regionId").equals("null")) {
			setJsonString("[]");
			return SUCCESS;
		}
		Long parentId = Long.parseLong(getRequest().getParameter("regionId"));
		Integer type = Integer.parseInt(getRequest().getParameter("type"));
		String list = regionService.getChildren_JDBC(parentId, type);
		System.out.println("查询出来的结果list："+list);
		setJsonString(list);
		return SUCCESS;
	}

	/**
	 * 获取当前级别的地址信息,只包含省市县的部分
	 * 
	 * @author zhanghao
	 * @return
	 */
	public String listTypeNew() {

		QueryFilter qf = new QueryFilter(getRequest());
		List<Region> rs = regionService.getAll(qf);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(qf.getPagingBean().getTotalItems()).append(",result:");

		JSONSerializer json = JsonUtil.getJSONSerializer();
		buff.append(json.serialize(rs));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 获取当前级别的地址信息,只包含乡镇街道部分
	 * 
	 * @author zhanghao
	 * @return
	 */
	public String detailListTypeNew() {
		int start = Integer.parseInt(getRequest().getParameter("start"));
		int limit = Integer.parseInt(getRequest().getParameter("limit"));

		int count = regionService.getDetailChildrenByType_count();
		List<Region> rs = regionService.getDetailChildrenByType(start, limit);

		JSONSerializer json = JsonUtil.getJSONSerializer();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(count).append(",result:");
		buff.append(json.serialize(rs));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 显示详情
	 */
	public String detailNew() {
		Long regionId = Long.parseLong(getRequest().getParameter("regionId"));
		String typeId = getRequest().getParameter("typeId");
		if (typeId.equals("4")) {
			setRegion(regionService.get_Jdbc(regionId));
		} else {
			setRegion(regionService.get(regionId));
		}
		JSONSerializer json = JsonUtil.getJSONSerializer();
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(json.serialize(region));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
}
