package com.htsoft.oa.dao.admin.impl;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.admin.BoardTypeDao;
import com.htsoft.oa.model.admin.BoardType;

/**
 * @description BoardTypeDaoImpl
 * @author 优创融联科技
 * @date 2010-9-25 PM
 * 
 */
@SuppressWarnings("unchecked")
public class BoardTypeDaoImpl extends BaseDaoImpl<BoardType> implements
		BoardTypeDao {
	public BoardTypeDaoImpl() {
		super(BoardType.class);
	}

}
