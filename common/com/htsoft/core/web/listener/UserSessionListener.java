package com.htsoft.core.web.listener;
/*
 *  北京优创融联科技有限公司 综合客服管理系统   -- http://www.ulane.cn
 *  Copyright (C) 2008-2009 Beijing Ulane Technology Co., LTD
*/
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.htsoft.core.util.AppUtil;

/**
 * 主要用于监听在线用户的信息
 *
 */
public class UserSessionListener implements HttpSessionListener {

    /**
     * Default constructor. 
     */
    public UserSessionListener() {
        
    }

	/**
     * @see HttpSessionListener#sessionCreated(HttpSessionEvent)
     */
    public void sessionCreated(HttpSessionEvent arg0) {
        
    }

	/**
     * @see HttpSessionListener#sessionDestroyed(HttpSessionEvent)
     */
    public void sessionDestroyed(HttpSessionEvent event) {
        //移除该在线用户
    	String sessionId=event.getSession().getId();
        AppUtil.removeOnlineUser(sessionId);
    }
	
}
