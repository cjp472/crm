package com.ulane.callout.action.outb;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.util.AppUtil;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.callout.model.outb.ObComBizTypeTree;
import com.ulane.callout.service.outb.ObBizTypeTreeService;
/**
 * 
 * @author lzm
 *
 */
public class ObBizTypeTreeComAction extends BaseAction{
	@Resource
	private ObBizTypeTreeService obBizTypeTreeService;
	
	public ObComBizTypeTree getObComBizTypeTree() {
		return obComBizTypeTree;
	}
	public void setObComBizTypeTree(ObComBizTypeTree obComBizTypeTree) {
		this.obComBizTypeTree = obComBizTypeTree;
	}
	private ObComBizTypeTree obComBizTypeTree;
	

	/**
	 * 加载tree节点
	 */
	public String treeLoad() {
		ObComBizTypeTree botree=obBizTypeTreeService.get(2l);
		StringBuffer sb = new StringBuffer("{'menus':[");
		// 查询顶级父节点
		List<ObComBizTypeTree> list = obBizTypeTreeService
				.findByCondition(botree.getParentNodeId());
		for (ObComBizTypeTree jb : list) {
			sb.append("{'code':'" + jb.getNodeId() + "','name':'"
					+ jb.getNodeName() + "',"+"'leaf':0"+",'parentcode':''},");
			sb.append(findChildren(jb.getNodeId()));
		}
		if (!list.isEmpty()) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]}");
		jsonString = sb.toString();
		return SUCCESS;
	}


	/**
	 * 根据parentId查询对应的节点
	 */
	public String findChildren(Long parentid) {
		StringBuffer sb = new StringBuffer();
		List<ObComBizTypeTree> list = obBizTypeTreeService.findByCondition(parentid);
		if (list.isEmpty() || list.size() == 0) { // 不存在子节点
//			sb.append("{leaf:true},");
			return sb.toString();
		} else { // 存在子节点
//			sb.append("{");
			for (ObComBizTypeTree jb : list) {
				
				sb.append("{'code':'" + jb.getNodeId() + "','name':'"
						+ jb.getNodeName() + "',"+"'leaf':1"+",'parentcode':'"+jb.getParentNodeId()+"'},");
				sb.append(findChildren(jb.getNodeId()));
			}
//			sb.deleteCharAt(sb.length() - 1);
//			sb.append("]},");
			
			return sb.toString();
		}
	}


//	/**
//	 * 加载tree节点
//	 */
//	public String treeLoad() {
//		ObComBizTypeTree botree=obBizTypeTreeService.get(2l);
//		StringBuffer sb = new StringBuffer("{id:"+botree.getNodeId()+",text:'"
//				+ botree.getNodeName() + "',expanded:true,children:[");
//		// 查询顶级父节点
//		List<ObComBizTypeTree> list = obBizTypeTreeService
//				.findByCondition(botree.getParentNodeId());
//		for (ObComBizTypeTree jb : list) {
//			sb.append("{id:'" + jb.getNodeId() + "',text:'"
//					+ jb.getNodeName() + "',");
//			sb.append(findChildren(jb.getNodeId()));
//		}
//		if (!list.isEmpty()) {
//			sb.deleteCharAt(sb.length() - 1);
//		}
//		sb.append("]}");
//		System.out.println("ddddddddddddddd"+sb.toString());
//		jsonString = sb.toString();
//		return SUCCESS;
//	}
//
//
//	/**
//	 * 根据parentId查询对应的节点
//	 */
//	public String findChildren(Long parentid) {
//		StringBuffer sb = new StringBuffer();
//		List<ObComBizTypeTree> list = obBizTypeTreeService.findByCondition(parentid);
//		if (list.isEmpty() || list.size() == 0) { // 不存在子节点
//			sb.append("leaf:true},");
//			return sb.toString();
//		} else { // 存在子节点
//			sb.append("expanded:true,children:[");
//			for (ObComBizTypeTree jb : list) {
//				sb.append("{id:'" + jb.getNodeId() + "',text:'"
//						+ jb.getNodeName() + "',");
//				sb.append(findChildren(jb.getNodeId()));
//			}
//			sb.deleteCharAt(sb.length() - 1);
//			sb.append("]},");
//			
//			return sb.toString();
//		}
//	}


}
