package com.ulane.running.action.qucon;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.know.model.know.UkKnowKeywordType;
import com.ulane.running.model.qucon.QcTarCat;
import com.ulane.running.model.qucon.QcTarget;
import com.ulane.running.service.qucon.QcTarCatService;
import com.ulane.running.service.qucon.QcTargetService;
/**
 * 
 * @author cf0666@gmail.com
 *
 */
public class QcTarCatAction extends BaseAction{
	@Resource
	private QcTarCatService qcTarCatService;
	@Resource
	private QcTargetService qcTargetService;
	private QcTarCat qcTarCat;
	
	private Long tarCatId;

	public Long getTarCatId() {
		return tarCatId;
	}

	public void setTarCatId(Long tarCatId) {
		this.tarCatId = tarCatId;
	}

	public QcTarCat getQcTarCat() {
		return qcTarCat;
	}

	public void setQcTarCat(QcTarCat qcTarCat) {
		this.qcTarCat = qcTarCat;
	}

	
	/**
	 * 获取关键字分类的信息，提供给tree显示
	 * 
	 * @return
	 */
	public String treeList() {
		StringBuffer buff = new StringBuffer();
		buff.append("[{id:'" + 0 + "',text:'考核指标分类',expanded:true,children:[");
		List<QcTarCat> listParent = qcTarCatService.findByParentId(new Long(0));// 最顶层父节点
		for (QcTarCat type : listParent) {
			buff.append("{id:'" + type.getTarCatId() + "',text:'"
					+ type.getCatName() + "',");
			buff.append(findChild(type.getTarCatId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 寻找关键字分类的子根节点
	 */
	public String findChild(Long typeId) {
		StringBuffer buff1 = new StringBuffer("");
		List<QcTarCat> list = qcTarCatService.findByParentId(typeId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("children:[");
			for (QcTarCat type : list) {
				buff1.append("{id:'" + type.getTarCatId() + "',text:'"
						+ type.getCatName() + "',");
				buff1.append(findChild(type.getTarCatId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	public String delCat() {
		Long tarCatId = Long.parseLong(getRequest().getParameter("tarCatId"));
		QcTarCat qcTarCat = qcTarCatService.get(tarCatId);
		List <QcTarget> result = qcTargetService.findByType(tarCatId);
		if (result.size() == 0) {
			qcTarCat.setStaId(QcTarCat.FLAG_DELETED);
			qcTarCatService.save(qcTarCat);
			setJsonString("{success:true}");
		} else {
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<QcTarCat> list= qcTarCatService.getAll(filter);
		
		Type type=new TypeToken<List<QcTarCat>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				qcTarCatService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 * 	
	 */
	public String get(){
		QcTarCat qcTarCat=qcTarCatService.get(tarCatId);
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(qcTarCat));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(qcTarCat.getTarCatId()==null){
			qcTarCat.setCreUseId(ContextUtil.getCurrentUser().getUserId());
			qcTarCat.setCreDat(new Timestamp(System.currentTimeMillis()));
			qcTarCat.setStaId(qcTarCat.FLAG_ENABLED);
			qcTarCatService.save(qcTarCat);
		}else{
			QcTarCat orgQcTarCat=qcTarCatService.get(qcTarCat.getTarCatId());
			try{
				BeanUtil.copyNotNullProperties(orgQcTarCat, qcTarCat);
				qcTarCatService.save(orgQcTarCat);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
		
	}
}
