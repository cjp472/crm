package com.ulane.know.service.know;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   --  http://www.ulane.cn
 *  Copyright (C) 2008-2010 Beijing Ulane Technology Co., LTD
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.ulane.know.model.know.UkKnowKeywordType;
/**
 * 
 * @author cf0666@gmail.com
 *
 */

public interface UkKnowKeywordTypeService extends BaseService<UkKnowKeywordType>{
	 public List<UkKnowKeywordType> findByParentId(Long keywordTypeId);
}


