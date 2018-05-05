package com.htsoft.oa.dao.system;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.Dictionary;

/**
 * 
 * @author 
 *
 */
public interface DictionaryDao extends BaseDao<Dictionary>{

	public List<String> getAllItems();
	
	public List<String> getAllMap();

	public List<String> getAllByItemName(String itemName);
	
	public List<Dictionary> getByItemName(final String itemName);
	/**
	 * 根据proTypeId去查找
	 * @param proTypeId
	 * @return
	 */
	public List<Dictionary> getByProTypeId(final Long proTypeId);
	
	public List<Dictionary> getByMapName(final String mapName);
	
	public List<String>  getByItemNameAndItemValue(String itemName,String itemIndex);
	
	/**
	 * 通过mapName和itemIndex数组查询数据字典
	 * @author wangzhongjin
	 * @param mapName
	 * @param itemIndex
	 * @return
	 */
	public List<Dictionary> getByMapNameAndItemIndex(final String mapName, final String[] itemIndex);
	
	/**
	 * 根据父级节点，查找所有子节点项
	 * @param parentId
	 * @return
	 */
	public List<Dictionary> getByParentDicId(Long parentId);
	
	/**
	 * 获取职务的根节点
	 * @param itemName
	 * @return
	 */
	public List<Dictionary>  getZwRoot(final String itemName);
}