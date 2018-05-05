package com.ulane.base.service.xitong;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import com.htsoft.core.service.BaseService;
import com.ulane.base.model.xitong.BeanExtSet;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface BeanExtSetService extends BaseService<BeanExtSet>{
	/**
	 * 通过数据实体参数查找扩展信息
	 * @author wangzhongjin
	 * @param columnsId
	 * @return
	 */
	public Object getByColumnsId(Long columnsId);
}


