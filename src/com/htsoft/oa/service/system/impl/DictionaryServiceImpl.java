package com.htsoft.oa.service.system.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.DictionaryDao;
import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.system.DictionaryService;

public class DictionaryServiceImpl extends BaseServiceImpl<Dictionary> implements DictionaryService{
	private DictionaryDao dao;
	
	public DictionaryServiceImpl(DictionaryDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<String> getAllItems() {
		return dao.getAllItems();
	}
	@Override
	public List<String> getAllMap() {
		return dao.getAllMap();
	}
	@Override
	public List<String> getAllByItemName(String itemName) {
		return dao.getAllByItemName(itemName);
	}
	
	@Override
	public List<Dictionary> getByItemName(String itemName) {
		return dao.getByItemName(itemName);
	}
	
	/**
	 * 根据proTypeId去查找
	 * @param proTypeId
	 * @return
	 */
	@Override
	public List<Dictionary> getByProTypeId(final Long proTypeId){
		return dao.getByProTypeId(proTypeId);
	}
	
	@Override
	public List<Dictionary> getByMapName(String mapName) {
		return dao.getByMapName(mapName);
	}
	@Override
	public List<String> getByItemNameAndItemValue(String itemName,
			String itemIndex) {
		return dao.getByItemNameAndItemValue(itemName, itemIndex);
	}

	@Override
	public Map<String,String> getValueByTypeName(String itemName) {
		List<Dictionary> list = getByItemName(itemName);
		
		Map<String,String> dicMap = new HashMap<String,String>();
		for (Dictionary dictionary : list) {
			dicMap.put(dictionary.getItemIndex(), dictionary.getItemValue());
		}
		return dicMap;
	}
	
	@Override
	public Map<String,String> getKeyByTypeName(String itemName) {
		List<Dictionary> list = getByItemName(itemName);
		
		Map<String,String> dicMap = new HashMap<String,String>();
		for (Dictionary dictionary : list) {
			dicMap.put(dictionary.getItemValue(), dictionary.getItemIndex());
		}
		return dicMap;
	}

	/* (non-Javadoc)
	 * 新增通过mapName和itemIndex数组查询数据字典
	 * @author wangzhongjin
	 * @see com.htsoft.oa.service.system.DictionaryService#getByMapNameAndItemIndex(java.lang.String, java.lang.String[])
	 */
	@Override
	public List<Dictionary> getByMapNameAndItemIndex(final String mapName, final String[] itemIndex) {
		// TODO Auto-generated method stub
		return dao.getByMapNameAndItemIndex(mapName, itemIndex);
	}

	@Override
	public List<Dictionary> getByParentDicId(Long parentId) {
		return dao.getByParentDicId(parentId);
	}
	
	/**
	 * 获取职务的根节点
	 * @param itemName
	 * @return
	 */
	@Override
	public List<Dictionary>  getZwRoot(final String itemName) {
		return dao.getZwRoot(itemName);
	}
}