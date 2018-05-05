package com.ulane.core;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/

import java.lang.reflect.Type;
import java.sql.SQLException;
import java.util.List;
import javax.annotation.Resource;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.BaseService;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.action.BaseAction;
import com.ulane.core.service.MtBaseService;
import flexjson.JSONSerializer;

/**
 * Ext Base Action for all the request.
 * 
 * @author 陈峰
 * 
 */
@SuppressWarnings("unused")
public class MtBaseAction<T> extends BaseAction{
    
    @Resource
    private MtBaseService<T> mtbaseService;

    /**
     * 显示列表
     */
    @SuppressWarnings("unchecked")
    public String list(){
        
        QueryFilter filter=new QueryFilter(getRequest());
        List<T> list= mtbaseService.getAll(filter);
        
        Type type=new TypeToken<List<T>>(){}.getType();
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        
        JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
        buff.append(jsonSer.serialize(list));
        buff.append("}");
        
        jsonString=buff.toString();
        
        return SUCCESS;
    }
    /**
     * 显示列表（多条件）
     */
    public String multiList(){
        
        final QueryFilter filter=new QueryFilter(getRequest());
        String hql = getRequest().getParameter("HQL");
        
        List<T> list= mtbaseService.getMultiAll(filter,hql);
        
        Type type=new TypeToken<List<T>>(){}.getType();
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        
        JSONSerializer jsonSer = JsonUtil.getJSONSerializer();
        buff.append(jsonSer.serialize(list));
        buff.append("}");
        
        jsonString=buff.toString();
        
        return SUCCESS;
    }

}

