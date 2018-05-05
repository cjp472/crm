package com.ulane.supply.action.goods;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.Iterator;
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.Constants;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.ulane.base.model.xitong.UlContactDep;
import com.ulane.base.model.xitong.UlDepartment;
import com.ulane.running.model.qucon.QcTarCat;
import com.ulane.running.model.qucon.QcTarget;
import com.ulane.supply.model.goods.ScProductClassify;
import com.ulane.supply.service.goods.ScProductClassifyService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class ScProductClassifyAction extends BaseAction{
	@Resource
	private ScProductClassifyService scProductClassifyService;
	private ScProductClassify scProductClassify;
	
	private Long productClassifyId;

	public Long getProductClassifyId() {
		return productClassifyId;
	}

	public void setProductClassifyId(Long productClassifyId) {
		this.productClassifyId = productClassifyId;
	}

	public ScProductClassify getScProductClassify() {
		return scProductClassify;
	}

	public void setScProductClassify(ScProductClassify scProductClassify) {
		this.scProductClassify = scProductClassify;
	}
	
	/**
	 * 显示列表  TreeList(获取商品分类管理信息，提供给tree显示)
	 */
	public String list() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" +"商品分类管理"
					+ "',expanded:true,children:[");
		}
		List<ScProductClassify> listParent = scProductClassifyService.findByParentId(new Long(0));// 最顶层父节点
		for (ScProductClassify type : removeDeleted(listParent)) {
			buff.append("{id:'" + type.getProductClassifyId() + "',text:'"
					+ type.getProductClassifyName() + "',");
			buff.append(findChild(type.getProductClassifyId()));
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
	 * 显示列表GridTree（当前商品分类的自商品列表）
	 */
	public String list_childPro() {
		QueryFilter filter = new QueryFilter(getRequest());
		String strProId = getRequest().getParameter("productClassifyId");
		// 表示从上级目录开始进行查找
		String path = "0.";
		if (StringUtils.isNotEmpty(strProId)) {//strDepId为空，说明为查找根节点下的所有信息
			Long proId = Long.parseLong(strProId);
			ScProductClassify pro = scProductClassifyService.get(proId);
			if (pro != null) {
				path = pro.getPath();
				filter.addFilter("Q_path_S_LK", path);  //注意哈 模糊查询
			}
		}
		
		List<ScProductClassify> list = scProductClassifyService.getAll(filter);
		
		for (ScProductClassify pro : removeDeleted(list)) {// 设置父机构的名称
			ScProductClassify pro_parent = scProductClassifyService.get(pro.getMasterProductClassifyId());
			if (pro_parent != null) {
				pro.setParentName(pro_parent.getProductClassifyName());
			} else {
				pro.setParentName("商品分类管理");
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

	/**
	 * 寻找子根节点
	 */
	public String findChild(Long typeId) {
		StringBuffer buff1 = new StringBuffer("");
		List<ScProductClassify> list = scProductClassifyService.findByParentId(typeId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (ScProductClassify type : list) {
				buff1.append("{id:'" + type.getProductClassifyId() + "',text:'"
						+ type.getProductClassifyName() + "',");
				buff1.append(findChild(type.getProductClassifyId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}
	
   /**
     * 将list中的已标记删除的节点去掉
     * @param list
     * @return
     */
    public List<ScProductClassify> removeDeleted(List<ScProductClassify>  list){
    	Iterator<ScProductClassify> i_list = list.iterator();
    	while(i_list.hasNext()){
    		if(i_list.next().getStatus()==ScProductClassify.FLAG_DELETED.shortValue())
    			i_list.remove();
    	}
    	return list;
    }
    
	/**
	 * 添加商品分类信息或者更新商品分类信息
	 * @return
	 */
	public String add() {
		if (scProductClassify.getProductClassifyId() == null) {
			//添加商品分类信息
			 Long parentId = scProductClassify.getMasterProductClassifyId();
//			 Long parentId = Long.parseLong(getRequest().getParameter("MasterProductClassifyId"));
			String depPath = "";
			if (parentId < 1) {
				parentId = new Long(0);
				depPath = "0.";
			} else {
				depPath = scProductClassifyService.get(parentId).getPath();
			}
			
			scProductClassify.setStatus(ScProductClassify.FLAG_DISABLED);
			scProductClassifyService.save(scProductClassify);//新增商品分类信息的时候，必须先保存，才会获得id，然后设置path值		
			scProductClassify.setPath(depPath + scProductClassify.getProductClassifyId()+".");
			scProductClassifyService.save(scProductClassify);
		}else{
			scProductClassifyService.save(scProductClassify); //更新商品分类信息
		}
		setJsonString("{success:true}");
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
				remove(new Long(id));
			}
		}

		jsonString = "{success:true}";

		return SUCCESS;
	}
	
	/**
	 * 删除单个产品分类
	 * @return
	 */
	public String del() {
		Long proId = Long.parseLong(getRequest().getParameter("productClassifyId"));
		remove(proId);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 删除产品分类的方法
	 * @param productClassifyId
	 */
	public void remove(long productClassifyId) {
		ScProductClassify scp = scProductClassifyService.get(productClassifyId);
		scp.setStatus(ScProductClassify.FLAG_DELETED);
		scProductClassifyService.save(scp);

	}
	
	/**
	 * 启用部门
	 * 
	 * @return
	 */
	public String multiEnable() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				enable(new Long(id));
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 启用单个部门
	 * @return
	 */
	public String enable() {
		Long proId = Long.parseLong(getRequest().getParameter("productClassifyId"));
		enable(proId);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 启用部门的方法
	 * @param depId
	 */
	public void enable(long proId) {
		ScProductClassify pro = scProductClassifyService.get(proId);
		pro.setStatus(ScProductClassify.FLAG_ENABLED);
		scProductClassifyService.save(pro);
	}
	
	/**
	 * 获取产品分类信息
	 * 
	 * @return
	 */
	public String get() {
		
		Long proId = Long.parseLong(getRequest().getParameter("productClassifyId"));
		ScProductClassify scProductClassify = scProductClassifyService.get(proId);
		
		JSONSerializer ser = JsonUtil.getJSONSerializer();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(ser.serialize(scProductClassify));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	
}
