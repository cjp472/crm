package com.ulane.callout.service.outb;

/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
 */
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.callout.model.outb.ObCallbatch;
import com.ulane.callout.model.outb.ObCallbatchAss;
import com.ulane.callout.model.outb.ObCalllist;
import com.ulane.callout.model.outb.ObCom;
import com.ulane.callout.model.outb.ObConCalllist;

/**
 * 
 * @author cf0666@gmail.com
 * 
 */

public interface ObCalllistService extends BaseService<ObCalllist> {
	public List<ObCalllist> getComList();

	public void execJdbcUpdate(String sql);

	public int transfterCusTmp2Customer(ObCallbatch obCallbatch);

	/*
	 * 查询当前批次可分配数量
	 */
	public List queryObCallbatchAsssByParentNullId(Long callbatchId);

	/*
	 * 分配客户给用户
	 */
	public int assignObCallbatchToUser(Long calllistId, Long callbatchId,
			Long callbatchAssId, Long fromUserId, Long toUserId,
			int assignCount, String whereSql);

	public int assignJLObCallbatchToUser(Long calllistId, Long callbatchId,
			Long parentCallbatchAssId, Long callbatchAssId, Long fromUserId,
			Long toUserId, int assignCount, String whereSql);

	public int assignZZObCallbatchToUser(Long calllistId, Long callbatchId,
			Long parentCallbatchAssId, Long callbatchAssId, Long fromUserId,
			Long toUserId, int assignCount, String whereSql);

	public List queryObCallbatchCussByCallbatchAssId(Long callbatchAssId);

	public int assignByInchargeObCallbatchToUser(Long calllistId,
			Long callbatchId, Long callbatchAssId, Long fromUserId,
			String userNo, String cusIds);

	public String getWhereSql(String assignIFGrid);

	public int finishChouqu(String whereSql, Long fromCallbatchId,
			Long toCallbatchId,String staDat) throws Exception;
	
	public int getHoldAssCount(Long fromCallbatchId);
	
	public void createSaleTaskByCus(ObCallbatchAss obCallbatchAss,ObCallbatch obCallbatch,ObCalllist obCalllist,ObCom obCom,Long userId,String staDat);

}
