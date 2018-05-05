package com.htsoft.oa.action.system;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.json.JSONArray;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.model.system.GlobalType;
import com.htsoft.oa.service.system.DictionaryService;
import com.htsoft.oa.service.system.GlobalTypeService;

import flexjson.JSONSerializer;

/**
 * 
 * @author
 * 
 */
public class DictionaryAction extends BaseAction {
	@Resource
	private DictionaryService dictionaryService;
	@Resource
	private GlobalTypeService globalTypeService;

	private Dictionary dictionary;

	private Long dicId;

	private String itemName;
	
	private String proTypeId;
	
	

	public String getProTypeId() {
		return proTypeId;
	}

	public void setProTypeId(String proTypeId) {
		this.proTypeId = proTypeId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Long getDicId() {
		return dicId;
	}

	public void setDicId(Long dicId) {
		this.dicId = dicId;
	}

	public Dictionary getDictionary() {
		return dictionary;
	}

	public void setDictionary(Dictionary dictionary) {
		this.dictionary = dictionary;
	}

	public String mulSave() {
		System.out.println("DictionaryAction mulsave() come in ....");
		String data = getRequest().getParameter("data");

		if (StringUtils.isNotEmpty(data)) {
			Gson gson = new Gson();
			Dictionary[] dics = gson.fromJson(data, Dictionary[].class);

			for (int i = 0; i < dics.length; i++) {
				Dictionary dic = dictionaryService.get(dics[i].getDicId());
				try {
					BeanUtil.copyNotNullProperties(dic, dics[i]);
//					if(dic.getRelDic()!=null && !dic.getRelDic().equals("")){
//						dic.setParentId(new Short(dic.getRelDic().toString()));
//					}
					dictionaryService.save(dic);
				} catch (Exception ex) {
					logger.error(ex.getMessage());
				}
				;
			}
		}

		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		String sParentId = getRequest().getParameter("parentId");
		if (StringUtils.isNotEmpty(sParentId) && !"0".equals(sParentId)) {
			GlobalType globalType = globalTypeService.get(new Long(sParentId));
			if(null!=globalType) {
				filter.addFilter("Q_globalType.path_S_LFK", globalType.getPath());
			}
		}
		List<Dictionary> list = dictionaryService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:[");

		JSONSerializer json = new JSONSerializer();

		int i = 0;
		for (Dictionary dic : list) {
			
			if(dic.getRelDic() != null && !dic.getRelDic().equals("")){
				Dictionary relDic = dictionaryService.get(dic.getRelDic());
				dic.setRelDictionary(relDic);
				dic.setRelGlobalType(relDic.getGlobalType());
			}
//			if(dic.getRelType() != null && !dic.getRelType().equals("")){
//				GlobalType relType = globalTypeService.get(dic.getRelType());
//				dic.setGlobalType(relType);
//			}
			
			if (i++ > 0)
				buff.append(",");
			json.include("relDictionary.itemValue").exclude("relDictionary.*");
			json.include("relGlobalType.typeName").exclude("relGlobalType.*");
			buff.append(json.serialize(dic));
//			if (dic.getParentId() != null && !dic.getParentId().equals("")) {
//				buff.deleteCharAt(buff.length() - 1);
//				buff.append(",\"parentName\":\""
//						+ dictionaryService.get(new Long(dic.getParentId()))
//								.getItemValue() + "\"");
//				buff.append("}");
//			}

		}

		buff.append("]}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 根据条目查询出字典的value并返回数组
	 * 
	 * @return
	 */
	public String load() {
		List<String> list = dictionaryService.getAllByItemName(itemName);
		StringBuffer buff = new StringBuffer("[");
		for (String itemName : list) {
			buff.append("'").append(itemName).append("',");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String loadItem() {
		List<Dictionary> list = dictionaryService.getByItemName(itemName);
		
		StringBuffer buff = new StringBuffer("[");
		for (Dictionary dic : list) {
			buff.append("['").append(dic.getItemIndex()).append("','")
					.append(dic.getItemValue()).append("'],");

		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	public String loadItemByType() {
		List<Dictionary> list = dictionaryService.getByProTypeId(new Long(proTypeId));
		
		StringBuffer buff = new StringBuffer("[");
		for (Dictionary dic : list) {
			buff.append("['").append(dic.getItemIndex()).append("','")
					.append(dic.getItemValue()).append("'],");

		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	// 获取导入方案字段列
	public String loadColumns() {
		List<Dictionary> list = dictionaryService.getByItemName(itemName);
		Type type = new TypeToken<List<Dictionary>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");

		Gson gson = new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;

	}

	public String loadItemRecord() {
		List<Dictionary> list = dictionaryService.getByItemName(itemName);
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(list));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String typeChange() {
		System.out.println("DictionaryAction is typeChange come in...");
		String dicIds = getRequest().getParameter("dicIds");
		String dicTypeId = getRequest().getParameter("dicTypeId");

		if (StringUtils.isNotEmpty(dicIds) && StringUtils.isNotEmpty(dicTypeId)) {
			GlobalType globalType = globalTypeService.get(new Long(dicTypeId));

			String[] ids = dicIds.split("[,]");
			if (ids != null) {
				for (String id : ids) {
					Dictionary dic = dictionaryService.get(new Long(id));
					dic.setGlobalType(globalType);
					dic.setItemName(globalType.getTypeName());
					dic.setMapName(globalType.getNodeKey());
					dictionaryService.save(dic);
				}
			}
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
				dictionaryService.remove(new Long(id));
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
		Dictionary dictionary = dictionaryService.get(dicId);

//		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
//				.create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		JSONSerializer serializer = new JSONSerializer();
		sb.append(serializer.exclude("class","globalType.class").serialize(dictionary));
//		sb.append(gson.toJson(dictionary));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		System.out.println("DicetionaryAction.class save() come in...");
		if (dictionary.getDicId() != null) {
			Dictionary orgDic = dictionaryService.get(dictionary.getDicId());
			try {
				BeanUtil.copyNotNullProperties(orgDic, dictionary);
				dictionaryService.save(orgDic);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		} else {
			String parentId = getRequest().getParameter("parentId");
			String dicParentId = getRequest().getParameter("dicParentId");
			if (StringUtils.isNotEmpty(parentId)) {
				GlobalType globalType = globalTypeService
						.get(new Long(parentId));
//				if (dicParentId != null && !dicParentId.equals("")) {
//					dictionary.setParentId(new Short(dicParentId));
//				}
				if (dictionary.getProTypeId() == null
						|| dictionary.getProTypeId().equals("")) {
					dictionary.setGlobalType(globalType);
				}
//				if(dictionary.getRelDic()!=null && !dictionary.getRelDic().equals("")){
//					dictionary.setParentId(new Short(dictionary.getRelDic().toString()));
//				}
				dictionary.setMapName(globalType.getNodeKey());
				if (dictionary.getSn() == null) {
					dictionary.setSn((short) 0);
				}
			}
			dictionaryService.save(dictionary);
		}
		setJsonString("{success:true,msg:'成功保存信息！'}");
		return SUCCESS;
	}

	/**
	 * 获得条目
	 * 
	 * @return
	 */
	public String items() {
		List<String> list = dictionaryService.getAllItems();
		StringBuffer buff = new StringBuffer("[");
		for (String str : list) {
			buff.append("'").append(str).append("',");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * combo 陈峰
	 */
	public String loadKey() {
		String itemKey = getRequest().getParameter("itemKey");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_mapName_S_EQ", itemKey);
		filter.addSorted("sn", "DESC");
		List<Dictionary> list = dictionaryService.getAll(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (Dictionary type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getItemIndex()).append("','")
					.append(type.getItemValue()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		//System.err.println("LoadKey   "+sb.toString());
		return SUCCESS;
	}

	/**
	 * combo(dicId,itemValue) 王忠进 2012/08/16
	 */
	public String combo() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("dicId", "DESC");
		List<Dictionary> list = dictionaryService.getAllNoRequest(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (Dictionary type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getDicId()).append("','")
					.append(type.getItemValue()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * combo(dicId,itemValue) 王忠进 2012/08/16
	 */
	public String comboByParent() {
		QueryFilter filter = new QueryFilter();
		filter.addSorted("dicId", "DESC");
		String sParentId = getRequest().getParameter("parentId");
		if (StringUtils.isNotEmpty(sParentId) && !"0".equals(sParentId)) {
			GlobalType globalType = globalTypeService.get(new Long(sParentId));
			filter.addFilter("Q_globalType.path_S_LFK", globalType.getPath());
		}
		List<Dictionary> list = dictionaryService.getAllNoRequest(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (Dictionary type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getDicId()).append("','")
					.append(type.getItemValue()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * combo(dicId,itemValue) 王忠进 通过父节点Id去查找数据字典的combo 2012/08/16
	 */
	public String comboParentId() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("dicId", "DESC");
		List<Dictionary> list = dictionaryService.getAllNoRequest(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (Dictionary type : list) {
			Dictionary dic = dictionaryService.get(new Long(type.getRelDic()));
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(dic.getDicId()).append("','")
					.append(dic.getItemValue()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * combo(dicId,itemValue) 王忠进 通过级联参数Id去查找数据字典的combo 2012/09/13
	 */
	public String comboByReldic() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("sn", "DESC");
		List<Dictionary> list = dictionaryService.getAll(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (Dictionary type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getDicId()).append("','")
					.append(type.getItemValue()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String createJs() {
		List<String> list = dictionaryService.getAllMap();
		String jsFile = AppUtil.getAppAbsolutePath() + "/js/util/DicMap.js";
		StringBuffer buffer = new StringBuffer();
		for (String str : list) {
			List<Dictionary> dicList = dictionaryService.getByMapName(str);

			if (dicList.size() != 0) {
				buffer.append("var " + dicList.get(0).getMapName()
						+ " = new Map();\n");
				for (Dictionary d : dicList) {
					buffer.append(d.getMapName() + ".put('" + d.getItemIndex()
							+ "','" + d.getItemValue() + "');\n");
				}
			}

			logger.debug(buffer.toString());
			newFile(jsFile, new String(buffer.toString()));
		}
		return SUCCESS;
	}

	public static void newFile(String filePathAndName, String fileContent) {
		try {
			String filePath = filePathAndName;
			filePath = filePath.toString();
			File myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				myFilePath.createNewFile();
			}
			File file = new File(filePathAndName);
			OutputStream out = null;
			out = new FileOutputStream(file, false);
			OutputStreamWriter writer = new OutputStreamWriter(out, "UTF-8");
			writer.write(fileContent);
			writer.close();
			out.close();

		} catch (Exception e) {
			System.out.println("新建目录操作出错");
			e.printStackTrace();
		}
	}

	/**
	 * 根据传入的dicID产生字典树
	 * 
	 * @author huchao 2012年9月12日11:20
	 * @return
	 */
	public String treeById() {
		String dicIDS = getRequest().getParameter("dicID");
		if (StringUtils.isBlank(dicIDS)) {
			return SUCCESS;
		}

		Long dicID = Long.parseLong(dicIDS);
		Dictionary dictionary = dictionaryService.get(dicID);
		StringBuffer buff = new StringBuffer("[{id:'" + dictionary.getDicId()
				+ "',text:'" + dictionary.getItemValue() + "',attributes:'"
				+ dictionary.getItemIndex() + "',expanded:false,children:[");

		List<Dictionary> list = dictionaryService.getByMapName(dictionary
				.getMapName());
		for (Dictionary dic : list) {
			buff.append("{id:'" + dic.getDicId())
					.append("',text:'" + dic.getItemValue())
					.append("',attributes:'" + dic.getItemIndex()
							+ "',isTree:'false")
					.append("',nodekey:'" + dic.getMapName()).append("',");
			buff.append(getChildTypes(dic.getDicId()));
		}
		if (!list.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}]");
		setJsonString(buff.toString());

		logger.info("tree json:" + buff.toString());
		return SUCCESS;
	}

	public String getChildTypes(Long parentId) {
		StringBuffer buff = new StringBuffer();
		if (null == parentId) {
			buff.append("leaf:true,expanded:true},");
			return buff.toString();
		}

		List<Dictionary> typeList = dictionaryService
				.getByParentDicId(parentId);
		if (typeList.size() == 0) {
			buff.append("leaf:true,expanded:true},");
			return buff.toString();
		} else {
			buff.append("expanded:true,children:[");
			for (Dictionary dic : typeList) {
				buff.append("{id:'" + dic.getDicId())
						.append("',text:'" + dic.getItemValue())
						.append("',attributes:'" + dic.getItemIndex()
								+ "',isTree:'false").append("',");
				buff.append(getChildTypes(dic.getDicId()));
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]},");
			return buff.toString();
		}
	}
	
	/**
	 * @category 根据mapName(例LXFS001)和itemIndex查询级联
	 * @return [itemIndex,itemValue]
	 * @author guost
	 * @createtime 2012年9月19日
	 */
	public String comboByMapName() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("itemIndex", "ASC");
		List<Dictionary> list = dictionaryService.getAllNoRequest(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (Dictionary type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getItemIndex()).append("','")
					.append(type.getItemValue()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * @category 根据mapName(例LXFS001)和itemIndex查询级联,返回dicId
	 * @author guost
	 * @return dicId
	 */
	public String dicIdByCombo() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("itemIndex", "ASC");
		List<Dictionary> list = dictionaryService.getAllNoRequest(filter);
		StringBuffer sb = new StringBuffer("{dicId : ");
		for (Dictionary type : list) {
			if (type != null){
				sb.append(type.getDicId());
			}else{
				sb.append("");
			}
		}
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * @category 根据dicId返回下级列表,并可以添加其它参数进行列表过滤
	 * @author guost
	 * @return [itemIndex,itemValue]
	 */
	public String comboByDicId() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("sn", "DESC");
		List<Dictionary> list = dictionaryService.getAll(filter);
		StringBuffer sb = new StringBuffer("[");
		int i = 0;
		for (Dictionary type : list) {
			if (i++ > 0)
				sb.append(",");
			sb.append("['").append(type.getItemIndex()).append("','")
					.append(type.getItemValue()).append("']");
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	/**
	 * 根据传入的dicID产生字典树
	 * 
	 * @author zhangyl 
	 * @createtime 2012年9月14日 17:53:00
	 * @return
	 */
	public String treeByMapName() {
		String mapName = getRequest().getParameter("mapName");
		String relDic = getRequest().getParameter("relDic");
		String dicId = getRequest().getParameter("dicID");
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_mapName_S_EQ", mapName);
		
		//relDic限制
		if(StringUtils.isNotBlank(relDic)) {
			filter.addFilter("Q_relDic_L_EQ", relDic);
		}
		//dicId限制
		if(StringUtils.isNotBlank(dicId)) {
			filter.addFilter("Q_dicId_L_EQ", dicId);
		}
		
		List<Dictionary> dicList = dictionaryService.getAllNoRequest(filter); // 多个父节点

		List<Map<String, Object>> all = new ArrayList<Map<String, Object>>();
		for (Dictionary dic : dicList) {
			Map<String, Object> dic_one = new HashMap<String, Object>();

			dic_one.put("id", dic.getDicId());
			dic_one.put("text", dic.getItemValue());
			dic_one.put("attributes", dic.getItemIndex());
			dic_one.put("isTree", false);
			dic_one.put("mapName", dic.getMapName());
			dic_one = getChildType(dic.getDicId(), dic_one);
			all.add(dic_one);
		}
		JSONArray json = new JSONArray(all);
		setJsonString(json.toString());
		return SUCCESS;
	}

	public Map<String,Object> getChildType(Long parentId, Map<String, Object> one) {

		StringBuffer buff = new StringBuffer();
		if (null == parentId) {
			one.put("leaf", true);
			one.put("expanded", true);
			return one;
		}

		List<Dictionary> typeList = dictionaryService.getByParentDicId(parentId);
		if (typeList.size() == 0) {
			one.put("leaf", true);
			one.put("expanded", true);
			return one;
		} else {
			List<Map<String, Object>> child = new ArrayList<Map<String, Object>>();
			one.put("expanded", true);
			for (Dictionary dic : typeList) {
				Map<String, Object> oneChild = new HashMap<String, Object>();
				oneChild.put("id", dic.getDicId());
				oneChild.put("text", dic.getItemValue());
				oneChild.put("attributes", dic.getItemIndex());
				oneChild.put("isTree", false);
				getChildType(dic.getDicId(), oneChild);
				child.add(oneChild);
			}
			one.put("children", child);
			return one;
		}

	}
}
